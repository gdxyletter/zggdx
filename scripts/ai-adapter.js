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
            // 前端只调用后端代理，不保存、不拼接任何 DeepSeek API Key。
            chatEndpoint: '/api/deepseek/chat',
            autoNotesEndpoint: '/api/auto-notes/llm',
            localBackendOrigin: 'http://localhost:3000',
            supabaseEndpoint: 'https://jvpigxbiwmwvxiawcjml.supabase.co/functions/v1/deepseek-chat',
            staticHostSuffixes: ['github.io'],
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
            const requestEndpoints = lantaiResolveAIEndpoints(endpoint);
            const timeoutMs = Number(options.timeoutMs || window.LantaiAIAdapter.endpoints.timeoutMs || 45000);
            const controller = new AbortController();
            const timer = window.setTimeout(() => controller.abort(), timeoutMs);
            lantaiSetAILoading(true, options.loadingMessage || 'AI 请求中');
            let lastError = null;
            let lastEndpoint = requestEndpoints[0] || String(endpoint || '');

            try {
                for (let i = 0; i < requestEndpoints.length; i += 1) {
                    const requestEndpoint = requestEndpoints[i];
                    lastEndpoint = requestEndpoint;
                    try {
                        const data = await lantaiFetchAIRequest(requestEndpoint, body, controller.signal);
                        window.LantaiAIAdapter.lastError = null;
                        window.LantaiAIAdapter.lastEndpoint = requestEndpoint;
                        return data;
                    } catch (error) {
                        lastError = error;
                        if (!shouldRetryAIEndpoint(error, requestEndpoint, requestEndpoints, i)) {
                            throw error;
                        }
                    }
                }
            } catch (error) {
                const message = lantaiDescribeAIError(error, lastEndpoint);
                window.LantaiAIAdapter.lastError = message;
                throw new Error(message);
            } finally {
                window.clearTimeout(timer);
                lantaiSetAILoading(false);
            }

            const message = lantaiDescribeAIError(lastError || new Error('AI 请求失败'), lastEndpoint);
            window.LantaiAIAdapter.lastError = message;
            throw new Error(message);
        }

        async function lantaiFetchAIRequest(requestEndpoint, body, signal) {
            const response = await fetch(requestEndpoint, {
                method: 'POST',
                headers: lantaiBuildAIHeaders(requestEndpoint),
                body: JSON.stringify(body),
                signal
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

            return data;
        }

        function lantaiResolveAIEndpoint(endpoint) {
            return lantaiResolveAIEndpoints(endpoint)[0] || String(endpoint || '');
        }

        function lantaiResolveAIEndpoints(endpoint) {
            const value = String(endpoint || '');
            if (/^https?:\/\//i.test(value)) return [value];
            const endpoints = [];
            const remoteEndpoint = String(window.LantaiAIAdapter.endpoints.supabaseEndpoint || '').trim();
            const addEndpoint = candidate => {
                const normalized = String(candidate || '').trim();
                if (normalized && !endpoints.includes(normalized)) endpoints.push(normalized);
            };
            if (value.startsWith('/api/') && shouldUseConfiguredLocalAIOrigin()) {
                const origin = (window.LantaiAIAdapter.endpoints.localBackendOrigin || 'http://localhost:3000').replace(/\/+$/, '');
                addEndpoint(origin + value);
                addEndpoint(remoteEndpoint);
                return endpoints;
            }
            if (window.location.protocol === 'file:' && value.startsWith('/api/')) {
                const origin = (window.LantaiAIAdapter.endpoints.localBackendOrigin || 'http://localhost:3000').replace(/\/+$/, '');
                addEndpoint(origin + value);
                addEndpoint(remoteEndpoint);
                return endpoints;
            }
            if (value.startsWith('/api/') && shouldUseStaticHostAIProxy()) {
                addEndpoint(remoteEndpoint);
                return endpoints;
            }
            addEndpoint(value);
            if (value.startsWith('/api/') && isLocalAIPage()) {
                addEndpoint(remoteEndpoint);
            }
            return endpoints;
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

        function isLocalAIPage() {
            if (!window.location || window.location.protocol === 'file:') return true;
            return ['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname);
        }

        function shouldUseStaticHostAIProxy() {
            if (!window.location || window.location.protocol === 'file:') return false;
            const remoteEndpoint = String(window.LantaiAIAdapter.endpoints.supabaseEndpoint || '').trim();
            if (!remoteEndpoint) return false;
            const hostname = String(window.location.hostname || '').toLowerCase();
            const configuredSuffixes = window.LantaiAIAdapter.endpoints.staticHostSuffixes || [];
            const staticHostSuffixes = Array.isArray(configuredSuffixes) ? configuredSuffixes : String(configuredSuffixes).split(',');
            return staticHostSuffixes.some(suffix => {
                const normalizedSuffix = String(suffix || '').toLowerCase().replace(/^\.+/, '');
                return normalizedSuffix && (hostname === normalizedSuffix || hostname.endsWith('.' + normalizedSuffix));
            });
        }

        function shouldRetryAIEndpoint(error, endpoint, endpoints, index) {
            if (index >= endpoints.length - 1) return false;
            if (error && error.name === 'AbortError') return false;
            return isLocalAIEndpoint(endpoint) || isRecoverableAIEndpointError(error);
        }

        function isLocalAIEndpoint(endpoint) {
            const value = String(endpoint || '');
            if (value.startsWith('/api/')) return true;
            try {
                const url = new URL(value);
                return ['localhost', '127.0.0.1', '0.0.0.0'].includes(url.hostname);
            } catch {
                return false;
            }
        }

        function isRecoverableAIEndpointError(error) {
            const message = error && error.message ? error.message : '';
            return /Failed to fetch|NetworkError|Load failed|HTTP 404|HTTP 405|后端接口不存在|后端接口返回了非 JSON 错误/i.test(message);
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

            if (String(endpoint || '').includes('supabase.co/functions')) {
                return 'Supabase Function 请求失败：请确认已部署 deepseek-chat 函数，并配置 DEEPSEEK_API_KEY 环境变量。';
            }

            if (window.location.protocol === 'file:' && isLocalAIEndpoint(endpoint)) {
                return '本地 API 未连通，且远端代理重试未完成：请检查网络后刷新页面，或双击 start-local.bat 使用本地后端。';
            }

            const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
            if (isLocalHost && isLocalAIEndpoint(endpoint)) {
                return '后端未启动或端口不一致：请确认已运行 npm start，或检查远端代理是否可访问。';
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
