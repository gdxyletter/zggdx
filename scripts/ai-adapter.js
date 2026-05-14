        const LANTAI_AI_TASK_TYPES = [
            'prepare_materials',
            'generate_reading_note',
            'split_note_fragments',
            'convert_to_database_json',
            'analyze_word_cloud',
            'analyze_comparison_table',
            'analyze_mind_map',
            'analyze_argument_structure',
            'analyze_knowledge_graph'
        ];

        const LANTAI_AI_DEFAULTS = {
            // 前端只调用站内接口，不保存、不拼接任何 DeepSeek API Key。
            chatEndpoint: '/api/deepseek/chat',
            autoNotesEndpoint: '/api/auto-notes/llm',
            localBackendOrigin: 'http://localhost:3000',
            supabaseEndpoint: 'https://jvpigxbiwmwvxiawcjml.supabase.co/functions/v1/deepseek-chat',
            model: 'deepseek-chat',
            timeoutMs: 120000
        };

        window.LantaiAIAdapter = window.LantaiAIAdapter || {
            isLoading: false,
            lastError: null,
            taskTypes: LANTAI_AI_TASK_TYPES.slice(),
            endpoints: { ...LANTAI_AI_DEFAULTS }
        };
        window.LantaiAIAdapter.taskTypes = LANTAI_AI_TASK_TYPES.slice();
        window.LantaiAIAdapter.endpoints = {
            ...LANTAI_AI_DEFAULTS,
            ...(window.LantaiAIAdapter.endpoints || {})
        };

        async function callDeepSeekChat(messages, options = {}) {
            if (!Array.isArray(messages) || messages.length === 0) {
                throw new Error('AI 请求缺少 messages。');
            }

            const endpoint = options.endpoint || window.LantaiAIAdapter.endpoints.chatEndpoint;
            const requestBody = {
                model: options.model || window.LantaiAIAdapter.endpoints.model,
                messages,
                temperature: options.temperature,
                response_format: options.responseFormat
            };

            const data = await lantaiAIRequest(endpoint, requestBody, {
                timeoutMs: options.timeoutMs,
                loadingMessage: options.loadingMessage || 'AI 正在处理请求'
            });

            if (typeof data === 'string') return data;
            if (data.content) return data.content;
            if (data.message && data.message.content) return data.message.content;
            if (data.choices && data.choices[0] && data.choices[0].message) {
                return data.choices[0].message.content || '';
            }

            throw new Error('AI 返回格式无法识别。');
        }

        async function callAutoNotesLLM(taskType, payload, options = {}) {
            if (!LANTAI_AI_TASK_TYPES.includes(taskType)) {
                throw new Error(`不支持的札记 AI 任务类型：${taskType}`);
            }

            const endpoint = options.endpoint || window.LantaiAIAdapter.endpoints.autoNotesEndpoint;
            const data = await lantaiAIRequest(endpoint, {
                taskType,
                payload,
                model: options.model || window.LantaiAIAdapter.endpoints.model,
                options
            }, {
                timeoutMs: options.timeoutMs,
                loadingMessage: options.loadingMessage || '札记 AI 正在处理请求'
            });

            if (options.expectJson === false) return data;
            return lantaiNormalizeAutoNotesResponse(data);
        }

        async function lantaiAIRequest(endpoint, body, options = {}) {
            const requestEndpoint = lantaiResolveAIEndpoint(endpoint);
            const timeoutMs = Number(options.timeoutMs || window.LantaiAIAdapter.endpoints.timeoutMs || 45000);
            const controller = new AbortController();
            const timer = window.setTimeout(() => controller.abort(), timeoutMs);
            lantaiSetAILoading(true, options.loadingMessage || 'AI 请求中');

            try {
                const response = await fetch(requestEndpoint, {
                    method: 'POST',
                    headers: lantaiBuildAIHeaders(requestEndpoint),
                    body: JSON.stringify(body),
                    signal: controller.signal
                });

                const rawText = await response.text();
                let data;
                try {
                    data = rawText ? JSON.parse(rawText) : {};
                } catch (error) {
                    if (!response.ok && response.status === 404) {
                        throw new Error(`后端接口不存在：${requestEndpoint}`);
                    }
                    if (!response.ok) {
                        throw new Error(`后端接口返回了非 JSON 错误：HTTP ${response.status}`);
                    }
                    throw new Error('AI 服务返回内容不是合法 JSON，请检查后端接口。');
                }

                if (!response.ok) {
                    throw new Error(lantaiExtractAIError(data) || `AI 服务请求失败：HTTP ${response.status}`);
                }
                if (data && data.error) {
                    throw new Error(lantaiExtractAIError(data));
                }

                window.LantaiAIAdapter.lastError = null;
                return data;
            } catch (error) {
                const message = lantaiDescribeAIError(error, requestEndpoint);
                window.LantaiAIAdapter.lastError = message;
                throw new Error(message);
            } finally {
                window.clearTimeout(timer);
                lantaiSetAILoading(false);
            }
        }

        function lantaiResolveAIEndpoint(endpoint) {
            const value = String(endpoint || '');
            if (/^https?:\/\//i.test(value)) return value;
            if (value.startsWith('/api/') && shouldUseConfiguredLocalAIOrigin()) {
                const origin = (window.LantaiAIAdapter.endpoints.localBackendOrigin || 'http://localhost:3000').replace(/\/+$/, '');
                return origin + value;
            }
            if (window.location.protocol === 'file:' && value.startsWith('/api/')) {
                const origin = (window.LantaiAIAdapter.endpoints.localBackendOrigin || 'http://localhost:3000').replace(/\/+$/, '');
                return origin + value;
            }
            return value;
        }

        function shouldUseConfiguredLocalAIOrigin() {
            if (!window.location || window.location.protocol === 'file:') return false;
            const endpointOrigin = (window.LantaiAIAdapter.endpoints.localBackendOrigin || 'http://localhost:3000').replace(/\/+$/, '');
            let parsedOrigin;
            try {
                parsedOrigin = new URL(endpointOrigin);
            } catch {
                return false;
            }

            const localHosts = ['localhost', '127.0.0.1', '0.0.0.0'];
            const pageIsLocal = localHosts.includes(window.location.hostname);
            const backendIsLocal = localHosts.includes(parsedOrigin.hostname);
            if (!pageIsLocal || !backendIsLocal) return false;

            const pagePort = window.location.port || (window.location.protocol === 'https:' ? '443' : '80');
            const backendPort = parsedOrigin.port || (parsedOrigin.protocol === 'https:' ? '443' : '80');
            return pagePort !== backendPort;
        }

        function lantaiBuildAIHeaders(endpoint) {
            const headers = { 'Content-Type': 'application/json; charset=utf-8' };
            if (String(endpoint || '').includes('supabase.co/functions')) {
                const sbKey = localStorage.getItem('sbKey') || '';
                if (sbKey) {
                    headers.apikey = sbKey;
                    headers.Authorization = 'Bearer ' + sbKey;
                }
            }
            return headers;
        }

        function lantaiNormalizeAutoNotesResponse(data) {
            if (!data) throw new Error('AI 服务未返回数据。');
            if (typeof data === 'string') {
                return lantaiParsePossibleJson(data);
            }
            if (data.result !== undefined) {
                return typeof data.result === 'string' ? lantaiParsePossibleJson(data.result) : data.result;
            }
            if (data.content !== undefined) {
                return typeof data.content === 'string' ? lantaiParsePossibleJson(data.content) : data.content;
            }
            if (data.choices && data.choices[0] && data.choices[0].message) {
                const content = data.choices[0].message.content || '';
                return lantaiParsePossibleJson(content);
            }
            return data;
        }

        function lantaiParsePossibleJson(value) {
            const text = String(value || '').trim();
            if (!text) return '';
            try {
                return JSON.parse(text);
            } catch {
                const objectMatch = text.match(/\{[\s\S]*\}/);
                const arrayMatch = text.match(/\[[\s\S]*\]/);
                const jsonText = objectMatch ? objectMatch[0] : (arrayMatch ? arrayMatch[0] : '');
                if (!jsonText) return text;
                try {
                    return JSON.parse(jsonText);
                } catch {
                    throw new Error('AI 返回内容无法解析为 JSON，已停止自动处理。');
                }
            }
        }

        function lantaiExtractAIError(data) {
            if (!data) return '';
            if (typeof data.error === 'string') return data.error;
            if (data.error && data.error.code === 'MISSING_DEEPSEEK_API_KEY') return data.error.message || '后端未配置 DeepSeek API Key';
            if (data.error && data.error.code === 'API_NOT_FOUND') return data.error.message || '后端接口不存在';
            if (data.error && data.error.code === 'DEEPSEEK_API_ERROR') return data.error.message || 'DeepSeek API 返回错误';
            if (data.error && data.error.code === 'DEEPSEEK_NETWORK_ERROR') return data.error.message || '后端请求 DeepSeek API 失败';
            if (data.error && data.error.message) return data.error.message;
            if (data.message) return data.message;
            return '';
        }

        function lantaiDescribeAIError(error, endpoint) {
            if (error.name === 'AbortError') {
                return 'AI 请求超时，请稍后重试或缩短输入内容。';
            }

            const message = error.message || '';
            if (message && message !== 'Failed to fetch') {
                return message;
            }

            if (window.location.protocol === 'file:') {
                return '本地 API 未连通：请先双击 start-local.bat，再刷新当前页面。';
            }

            const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
            if (isLocalHost && String(endpoint || '').startsWith('/api/')) {
                return '后端未启动或端口不一致：请确认已运行 npm start，并从同一地址打开页面。';
            }
            if (String(endpoint || '').includes('supabase.co/functions')) {
                return 'Supabase Function 请求失败：请确认已部署 deepseek-chat 函数，并配置 DEEPSEEK_API_KEY 环境变量。';
            }

            return '网络或 CORS 错误：浏览器无法连接后端接口，请检查后端服务、代理和跨域配置。';
        }

        function lantaiSetAILoading(isLoading, message = '') {
            window.LantaiAIAdapter.isLoading = !!isLoading;
            window.LantaiAIAdapter.loadingMessage = isLoading ? message : '';
            window.dispatchEvent(new CustomEvent('lantai-ai-loading', {
                detail: {
                    isLoading: !!isLoading,
                    message: window.LantaiAIAdapter.loadingMessage
                }
            }));
        }

        window.callDeepSeekChat = callDeepSeekChat;
        window.callAutoNotesLLM = callAutoNotesLLM;
