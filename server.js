const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

loadEnvFile(path.join(ROOT_DIR, '.env'));
const PORT = Number(process.env.PORT || 3000);

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml; charset=utf-8',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8'
};

const AUTO_NOTES_TASK_PROMPTS = {
    prepare_materials: '整理用户提供的古籍、注疏、论文、图片 OCR 或札记材料，识别材料类型、核心概念、来源线索和不确定处。请返回合法 JSON。',
    generate_reading_note: '生成一份可读、可校对的完整读书会札记，不要拆成碎片卡片。必须保留资料来源线索，遇到 OCR 或解析不确定内容要标注“不确定”。请返回合法 JSON。',
    split_note_fragments: '把用户校对后的完整读书会札记拆分为适合分析、建库、检索和知识图谱使用的结构化片段。请返回合法 JSON。',
    convert_to_database_json: '把碎片化札记转换为数据库可插入前的标准 JSON。如果用户提供模板，优先贴合模板；否则使用默认 schema。请只返回合法 JSON。',
    analyze_word_cloud: '基于 fragments 生成词云数据。请返回 JSON：{ "terms": [{ "text": "仁", "weight": 10, "category": "义理" }] }。',
    analyze_comparison_table: '基于 fragments 生成对比表。请返回 JSON：{ "columns": ["概念", "原文", "何晏", "朱熹", "刘宝楠", "现代解释"], "rows": [] }。',
    analyze_mind_map: '基于 fragments 生成思维导图数据。请返回 JSON：{ "root": { "id": "root", "label": "...", "children": [] } }。',
    analyze_argument_structure: '基于 fragments 生成义理逻辑或论证结构图。请返回 JSON：{ "nodes": [], "edges": [] }。',
    analyze_knowledge_graph: '基于 fragments 生成人物、事件、关键词、正文之间的知识图谱。请返回 JSON：{ "nodes": [], "edges": [] }。'
};

const server = http.createServer(async (req, res) => {
    setCorsHeaders(res);

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    try {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

        if (req.method === 'POST' && url.pathname === '/api/deepseek/chat') {
            await handleDeepSeekChat(req, res);
            return;
        }

        if (req.method === 'POST' && url.pathname === '/api/auto-notes/llm') {
            await handleAutoNotesLLM(req, res);
            return;
        }

        if (url.pathname.startsWith('/api/')) {
            sendJson(res, 404, {
                ok: false,
                error: {
                    code: 'API_NOT_FOUND',
                    message: `后端接口不存在：${url.pathname}`
                }
            });
            return;
        }

        serveStaticFile(url.pathname, res);
    } catch (error) {
        sendJson(res, 500, {
            ok: false,
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: error.message || '后端服务异常'
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`数字兰台本地服务已启动: http://localhost:${PORT}`);
    console.log('DeepSeek Key 状态:', process.env.DEEPSEEK_API_KEY ? '已配置' : '未配置');
});

async function handleDeepSeekChat(req, res) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
        sendMissingDeepSeekKey(res);
        return;
    }

    const body = await readJsonBody(req);
    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (messages.length === 0) {
        sendJson(res, 400, {
            ok: false,
            error: {
                code: 'INVALID_MESSAGES',
                message: '请求缺少 messages'
            }
        });
        return;
    }

    const result = await callDeepSeek(apiKey, {
        model: body.model || 'deepseek-chat',
        messages,
        temperature: body.temperature,
        response_format: body.response_format
    });
    sendJson(res, result.status, result.data);
}

async function handleAutoNotesLLM(req, res) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
        sendMissingDeepSeekKey(res);
        return;
    }

    const body = await readJsonBody(req);
    const taskType = body.taskType || '';
    const payload = body.payload || {};
    if (!AUTO_NOTES_TASK_PROMPTS[taskType]) {
        sendJson(res, 400, {
            ok: false,
            error: {
                code: 'UNSUPPORTED_AUTO_NOTES_TASK',
                message: `不支持的札记任务类型：${taskType}`
            }
        });
        return;
    }

    const messages = buildAutoNotesMessages(taskType, payload);
    const result = await callDeepSeek(apiKey, {
        model: body.model || 'deepseek-chat',
        messages
    });
    sendJson(res, result.status, result.data);
}

function buildAutoNotesMessages(taskType, payload) {
    const userPrompt = [
        AUTO_NOTES_TASK_PROMPTS[taskType],
        payload && payload.promptInstructions ? `\n补充要求：\n${payload.promptInstructions}` : '',
        '\n用户材料 JSON：',
        JSON.stringify(payload || {}, null, 2)
    ].join('\n');

    return [
        {
            role: 'system',
            content: '你是“古典学园数字兰台”的中国古典学研究助手。请严格遵循用户指定的数据结构，尽量返回合法 JSON，不要伪造来源。'
        },
        {
            role: 'user',
            content: userPrompt
        }
    ];
}

async function callDeepSeek(apiKey, requestBody) {
    const body = {
        model: requestBody.model || 'deepseek-chat',
        messages: requestBody.messages || []
    };
    if (requestBody.temperature !== undefined) body.temperature = requestBody.temperature;
    if (requestBody.response_format !== undefined) body.response_format = requestBody.response_format;

    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        });
        const text = await response.text();
        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch {
            data = {
                ok: false,
                error: {
                    code: 'DEEPSEEK_INVALID_JSON',
                    message: 'DeepSeek API 返回了非 JSON 内容',
                    raw: text.slice(0, 1000)
                }
            };
        }

        if (!response.ok) {
            return {
                status: response.status,
                data: {
                    ok: false,
                    error: {
                        code: 'DEEPSEEK_API_ERROR',
                        message: extractDeepSeekError(data) || `DeepSeek API 返回错误：HTTP ${response.status}`,
                        detail: data
                    }
                }
            };
        }

        return { status: 200, data };
    } catch (error) {
        return {
            status: 502,
            data: {
                ok: false,
                error: {
                    code: 'DEEPSEEK_NETWORK_ERROR',
                    message: '后端请求 DeepSeek API 失败，请检查网络或代理配置',
                    detail: error.message || String(error)
                }
            }
        };
    }
}

function sendMissingDeepSeekKey(res) {
    sendJson(res, 500, {
        ok: false,
        error: {
            code: 'MISSING_DEEPSEEK_API_KEY',
            message: '后端未配置 DeepSeek API Key'
        }
    });
}

function extractDeepSeekError(data) {
    if (!data) return '';
    if (typeof data.error === 'string') return data.error;
    if (data.error && data.error.message) return data.error.message;
    if (data.message) return data.message;
    return '';
}

function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let raw = '';
        req.on('data', chunk => {
            raw += chunk;
            if (raw.length > 8 * 1024 * 1024) {
                reject(new Error('请求体过大'));
                req.destroy();
            }
        });
        req.on('end', () => {
            try {
                resolve(raw ? JSON.parse(raw) : {});
            } catch {
                reject(new Error('请求体不是合法 JSON'));
            }
        });
        req.on('error', reject);
    });
}

function serveStaticFile(urlPath, res) {
    const decodedPath = decodeURIComponent(urlPath.split('?')[0]);
    const relativePath = decodedPath === '/' ? 'index.html' : decodedPath.replace(/^\/+/, '');
    const filePath = path.resolve(ROOT_DIR, relativePath);

    if (!filePath.startsWith(ROOT_DIR)) {
        sendText(res, 403, 'Forbidden');
        return;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            sendText(res, 404, 'Not Found');
            return;
        }
        const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
}

function sendJson(res, status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
}

function sendText(res, status, text) {
    res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(text);
}

function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function loadEnvFile(envPath) {
    if (!fs.existsSync(envPath)) return;
    const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex <= 0) return;
        const key = trimmed.slice(0, eqIndex).trim();
        let value = trimmed.slice(eqIndex + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
    });
}
