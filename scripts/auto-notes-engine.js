        const AN_SOURCE_TYPE_OPTIONS = [
            { value: 'commentary', label: '注疏' },
            { value: 'collation', label: '校勘记' },
            { value: 'variant', label: '版本异文' },
            { value: 'paper', label: '现代论文' },
            { value: 'userNote', label: '个人札记' },
            { value: 'other', label: '其他' }
        ];

        const AN_TONGJIA_GROUPS = [
            { group: '說/说/悦', chars: ['說', '说', '悦'], note: '“說”与“悦”在古籍训释中常需结合语境判断。' },
            { group: '仁/人', chars: ['仁', '人'], note: '仅作候选提示，不自动替换。' },
            { group: '為/为', chars: ['為', '为'], note: '繁简兼容候选。' },
            { group: '學/学', chars: ['學', '学'], note: '繁简兼容候选。' },
            { group: '禮/礼', chars: ['禮', '礼'], note: '繁简兼容候选。' }
        ];

        function anAddSource(shouldFocus = true, sourceData = {}) {
            if (!window.autoNotesState) {
                window.autoNotesState = createAutoNotesProject();
            }

            const now = new Date().toISOString();
            const source = {
                id: sourceData.id || generateAutoNotesId('source'),
                type: sourceData.type || 'commentary',
                title: sourceData.title || '',
                content: sourceData.content || '',
                fileName: sourceData.fileName || '',
                metadata: sourceData.metadata || {},
                createdAt: sourceData.createdAt || now
            };

            window.autoNotesState.sources.push(source);
            saveAutoNotesProject();
            anRenderSources();

            if (shouldFocus) {
                const items = document.querySelectorAll('.auto-notes-source-title');
                const lastItem = items[items.length - 1];
                if (lastItem) lastItem.focus();
            }

            return source;
        }

        function anRemoveSource(sourceId) {
            if (!window.autoNotesState || !sourceId) return;
            window.autoNotesState.sources = window.autoNotesState.sources.filter(source => source.id !== sourceId);
            saveAutoNotesProject();
            anRenderSources();
        }

        function anUpdateSource(sourceId, field, value) {
            const source = window.autoNotesState && window.autoNotesState.sources.find(item => item.id === sourceId);
            if (!source) return;
            source[field] = value;
            if (typeof scheduleAutoNotesAutosave === 'function') {
                scheduleAutoNotesAutosave();
            } else {
                saveAutoNotesProject();
            }
        }

        function anCollectInputToState() {
            if (!window.autoNotesState) return null;
            const state = window.autoNotesState;
            const notePreview = document.getElementById('anNotePreview');
            const noteType = anGetValue('anNoteType', anGetSetting('noteType', 'auto'));
            const fileInput = document.getElementById('anFileUpload');

            state.baseText = anGetValue('anBaseText', state.baseText);
            state.researchQuestion = anGetValue('anResearchQuestion', state.researchQuestion);
            state.keywordOrConcept = anGetValue('anKeywordOrConcept', state.keywordOrConcept || '');
            state.firstDraftNote = anGetValue('anFirstDraftNote', state.firstDraftNote || '');
            state.databaseJsonRaw = anGetValue('anDatabaseJsonPreview', state.databaseJsonRaw || '');
            state.projectTitle = state.researchQuestion.trim() || state.projectTitle || '未命名札记项目';
            state.settings.noteType = noteType;
            state.settings.fragmentSplitStrategy = anGetRadioValue('anFragmentStrategy', anGetSetting('fragmentSplitStrategy', 'auto'));
            state.settings.stageThreeMode = anGetRadioValue('anStageThreeMode', anGetSetting('stageThreeMode', 'database'));
            state.settings.databaseTemplate = anGetValue('anDatabaseTemplate', anGetSetting('databaseTemplate', ''));
            state.settings.analysisType = anGetRadioValue('anAnalysisType', anGetSetting('analysisType', 'word_cloud'));
            state.settings.knowledgeGraphMode = anGetRadioValue('anKnowledgeGraphMode', anGetSetting('knowledgeGraphMode', 'simple'));
            const rawAnalysis = anGetValue('anAnalysisRawJson', '');
            if (rawAnalysis && state.analysisResults && state.settings.analysisType && state.analysisResults[state.settings.analysisType]) {
                state.analysisResults[state.settings.analysisType].rawJson = rawAnalysis;
            }
            state.settings.normalizeOptions = {
                trimWhitespace: anGetChecked('anTrimWhitespace', true),
                normalizePunctuation: anGetChecked('anNormalizePunctuation', true),
                traditionalCompatible: anGetChecked('anTraditionalCompatible', false),
                keepOriginal: anGetChecked('anKeepOriginal', true),
                splitMode: anGetRadioValue('anSplitMode', 'punctuation')
            };

            if (fileInput && fileInput.files) {
                state.settings.uploadedFiles = Array.from(fileInput.files).map(file => ({
                    fileName: file.name,
                    size: file.size,
                    type: file.type || '',
                    updatedAt: new Date().toISOString()
                }));
            }

            return state;
        }

        function anRenderSources() {
            const container = document.getElementById('anSourcesList');
            if (!container || !window.autoNotesState) return;

            if (window.autoNotesState.sources.length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">暂无多源材料，点击“添加材料”开始记录。</div>';
                return;
            }

            container.innerHTML = window.autoNotesState.sources.map(source => `
                <div class="auto-notes-source-item">
                    <div class="auto-notes-source-head">
                        <select class="doc-name-input" onchange="anUpdateSource('${anEscapeAttr(source.id)}', 'type', this.value)">
                            ${AN_SOURCE_TYPE_OPTIONS.map(type => `<option value="${type.value}"${source.type === type.value ? ' selected' : ''}>${type.label}</option>`).join('')}
                        </select>
                        <input class="doc-name-input auto-notes-source-title" type="text" value="${anEscapeHtml(source.title)}" placeholder="来源标题" oninput="anUpdateSource('${anEscapeAttr(source.id)}', 'title', this.value)">
                        <button type="button" class="auto-notes-delete-btn" onclick="anRemoveSource('${anEscapeAttr(source.id)}')">删除</button>
                    </div>
                    <textarea class="textarea-area auto-notes-source-content" placeholder="粘贴来源内容..." oninput="anUpdateSource('${anEscapeAttr(source.id)}', 'content', this.value)">${anEscapeHtml(source.content)}</textarea>
                </div>
            `).join('');
        }

        async function anHandleFileUpload(input) {
            const files = input && input.files ? Array.from(input.files) : [];
            if (files.length === 0) return;

            for (const file of files) {
                var task = createFileTask(file.name, showFileTaskOverlay);
                try {
                    const content = await anParseUploadedFile(file, task);
                    if (task && task.cancelled) break;
                    if (!content || !content.trim()) continue;
                    anAddSource(false, {
                        type: 'other',
                        title: file.name.replace(/\.[^.]+$/, ''),
                        content,
                        fileName: file.name,
                        metadata: {
                            fileType: file.type || anGetFileExtension(file.name),
                            fileSize: file.size,
                            parsedAt: new Date().toISOString()
                        }
                    });
                    anRememberUploadedExtractedText(file, content);
                    updateFileProgress(task, FileTask.DONE, 100, '加载完成');
                } catch (error) {
                    updateFileProgress(task, FileTask.ERROR, 0, '解析失败: ' + (error.message || error));
                    alert(file.name + ' 解析失败：' + (error.message || error));
                }
            }

            if (input) input.value = '';
            anRenderSources();
        }

        async function anParseUploadedFile(file, task) {
            const extension = anGetFileExtension(file.name);
            if (extension === 'txt' || extension === 'md') {
                updateFileProgress(task, FileTask.PARSING, 50, '正在读取文件...');
                return anReadFileAsText(file);
            }

            if (extension === 'pdf') {
                if (typeof parsePdf === 'function') {
                    updateFileProgress(task, FileTask.PARSING, 5, '正在解析 PDF...');
                    return parsePdf(file, task);
                }
                alert('PDF 将使用已有解析器；当前解析器不可用，请先粘贴文本。');
                return '';
            }

            if (extension === 'docx') {
                if (typeof parseDocx === 'function') {
                    updateFileProgress(task, FileTask.EXTRACTING, 5, '正在解析 Word...');
                    const result = await parseDocx(file, task);
                    return typeof convertToPlainText === 'function' ? convertToPlainText(result) : result;
                }
                alert('DOCX 将使用已有解析器；当前解析器不可用，请先粘贴文本。');
                return '';
            }

            if (['jpg', 'jpeg', 'png'].includes(extension)) {
                if (typeof performOCR === 'function') {
                    updateFileProgress(task, FileTask.OCR, 5, '正在识别图片...');
                    return performOCR(file, task);
                }
                alert('图片将使用已有 OCR 解析器；当前解析器不可用，请先粘贴文本。');
                return '';
            }

            throw new Error('暂不支持该文件类型');
        }

        function anRememberUploadedExtractedText(file, content) {
            if (!window.autoNotesState) return;
            const settings = window.autoNotesState.settings || (window.autoNotesState.settings = {});
            const extractedTexts = Array.isArray(settings.uploadedExtractedTexts) ? settings.uploadedExtractedTexts : [];
            const item = {
                fileName: file.name,
                fileType: file.type || anGetFileExtension(file.name),
                fileSize: file.size,
                extractedText: String(content || '').slice(0, 50000),
                extractedAt: new Date().toISOString()
            };
            settings.uploadedExtractedTexts = extractedTexts.filter(text => text.fileName !== file.name).concat(item).slice(-20);
            saveAutoNotesProject();
        }

        async function generateFirstReadingNote() {
            const state = anCollectInputToState();
            if (!state) return null;

            const hasBaseText = String(state.baseText || '').trim();
            const hasKeyword = String(state.keywordOrConcept || '').trim();
            const hasSources = (state.sources || []).some(source => String(source.content || '').trim());
            if (!hasBaseText && !hasKeyword && !hasSources) {
                alert('请先输入核心概念、古籍原文，或上传/粘贴至少一条材料。');
                return null;
            }
            if (typeof callAutoNotesLLM !== 'function') {
                anSetFirstDraftStatus('AI Adapter 未加载，无法生成第一版札记。', true);
                alert('AI Adapter 未加载，无法调用 DeepSeek。');
                return null;
            }

            const button = document.getElementById('anGenerateFirstDraftBtn');
            if (button) {
                button.disabled = true;
                button.textContent = '正在生成札记...';
            }
            anSetFirstDraftStatus('正在调用 DeepSeek 整理材料...', false);

            const payload = {
                baseText: state.baseText || '',
                researchQuestion: state.researchQuestion || '',
                keywordOrConcept: state.keywordOrConcept || '',
                sources: (state.sources || []).map(source => ({
                    id: source.id,
                    type: source.type,
                    title: source.title || source.fileName || '未命名材料',
                    content: String(source.content || '').slice(0, 30000),
                    fileName: source.fileName || '',
                    metadata: source.metadata || {}
                })),
                uploadedExtractedTexts: (state.settings && state.settings.uploadedExtractedTexts) || [],
                locale: 'zh-CN',
                promptInstructions: anBuildFirstReadingNotePrompt()
            };

            try {
                const result = await callAutoNotesLLM('generate_reading_note', payload, {
                    expectJson: true,
                    loadingMessage: 'DeepSeek 正在生成第一版读书会札记',
                    timeoutMs: 60000
                });
                const markdown = anFormatFirstReadingNoteResponse(result, payload);
                state.firstDraftNote = markdown;
                state.firstDraftMeta = {
                    generatedAt: new Date().toISOString(),
                    model: window.LantaiAIAdapter && window.LantaiAIAdapter.endpoints && window.LantaiAIAdapter.endpoints.model,
                    keyTerms: result && Array.isArray(result.keyTerms) ? result.keyTerms : [],
                    uncertainPoints: result && Array.isArray(result.uncertainPoints) ? result.uncertainPoints : [],
                    sourceWarnings: result && Array.isArray(result.sourceWarnings) ? result.sourceWarnings : []
                };
                const draftTextarea = document.getElementById('anFirstDraftNote');
                if (draftTextarea) draftTextarea.value = markdown;
                saveAutoNotesProject();
                anSetFirstDraftStatus('第一版札记已生成，可继续校对修改。', false);
                return markdown;
            } catch (error) {
                const message = error && error.message ? error.message : String(error);
                anSetFirstDraftStatus('生成失败：' + message, true);
                alert('DeepSeek 生成第一版札记失败：' + message);
                return null;
            } finally {
                if (button) {
                    button.disabled = false;
                    button.textContent = '生成第一版读书会札记';
                }
            }
        }

        function confirmFirstReadingNote() {
            const state = anCollectInputToState();
            if (!state) return false;
            const draft = String(state.firstDraftNote || '').trim();
            if (!draft) {
                alert('请先生成或填写第一版札记，再进入碎片化处理。');
                return false;
            }

            const now = new Date().toISOString();
            const existing = (state.sources || []).find(source => source.metadata && source.metadata.autoNotesFirstDraft);
            const sourceData = {
                type: 'userNote',
                title: '第一版读书会札记',
                content: draft,
                fileName: '',
                metadata: {
                    autoNotesFirstDraft: true,
                    confirmedAt: now,
                    source: 'auto-notes-first-draft'
                }
            };
            if (existing) {
                Object.assign(existing, sourceData);
            } else {
                state.sources.push({
                    id: generateAutoNotesId('source'),
                    createdAt: now,
                    ...sourceData
                });
            }

            state.readingNoteConfirmed = true;
            state.readingNoteConfirmedAt = now;
            upsertPrimaryAutoNote(draft, 'comprehensive');
            saveAutoNotesProject();
            anRenderSources();
            anSetFirstDraftStatus('第一版札记已确认，并作为“个人札记”进入后续处理。', false);
            switchAutoNotesStep(2);
            return true;
        }

        function exportFirstReadingNoteMarkdown() {
            const state = anCollectInputToState();
            if (!state) return;
            const draft = String(state.firstDraftNote || '').trim();
            if (!draft) {
                alert('暂无第一版札记可导出。');
                return;
            }
            downloadAutoNotesFile(`${anSafeFilename(state.projectTitle || '第一版读书会札记')}-第一版.md`, draft, 'text/markdown');
        }

        function anBuildFirstReadingNotePrompt() {
            return [
                '请生成一份可读、可校对的完整读书会札记，不要拆成碎片卡片。',
                '请识别古籍原文、核心概念、研究问题、注疏/论文/个人札记等来源边界。',
                '正文建议包含：标题、问题意识、原文或核心材料、材料释义、来源综述、初步解释、可讨论问题、待核查项。',
                '必须保留资料来源线索，例如来源标题、文件名、材料类型或片段依据。',
                '遇到 OCR、PDF/DOCX 解析不确定或材料残缺处，请明确标注“不确定”。',
                '请返回 JSON：{ "title": "...", "researchQuestion": "...", "sourceSummary": "...", "readingNoteMarkdown": "...", "keyTerms": [], "uncertainPoints": [], "sourceWarnings": [] }。'
            ].join('\n');
        }

        function anFormatFirstReadingNoteResponse(result, payload) {
            if (typeof result === 'string') return result;
            const data = result && typeof result === 'object' ? result : {};
            if (data.readingNoteMarkdown) return String(data.readingNoteMarkdown);

            const sourceLines = (payload.sources || []).map((source, index) => {
                return `${index + 1}. [${anGetSourceTypeLabel(source.type)}] ${source.title || source.fileName || '未命名材料'}`;
            });
            const keyTerms = Array.isArray(data.keyTerms) ? data.keyTerms : [];
            const uncertainPoints = Array.isArray(data.uncertainPoints) ? data.uncertainPoints : [];
            const warnings = Array.isArray(data.sourceWarnings) ? data.sourceWarnings : [];

            return [
                `# ${data.title || payload.keywordOrConcept || payload.researchQuestion || '第一版读书会札记'}`,
                '',
                '## 研究问题',
                data.researchQuestion || payload.researchQuestion || '（未填写）',
                '',
                '## 核心概念 / 检索词 / 原文线索',
                payload.keywordOrConcept || '（未填写）',
                '',
                '## 材料来源',
                sourceLines.length ? sourceLines.join('\n') : '（暂无外部材料）',
                '',
                '## 材料初步整理',
                data.sourceSummary || 'AI 未返回材料综述，请人工补充。',
                '',
                '## 关键词',
                keyTerms.length ? keyTerms.map(term => `- ${term}`).join('\n') : '（待补充）',
                '',
                '## 待核查 / 不确定',
                uncertainPoints.concat(warnings).length
                    ? uncertainPoints.concat(warnings).map(item => `- ${item}`).join('\n')
                    : '- 需人工核对引文、OCR 结果和解释是否过度延伸。'
            ].join('\n');
        }

        function anSetFirstDraftStatus(message, isError) {
            const el = document.getElementById('anFirstDraftStatus');
            if (!el) return;
            el.textContent = message || '';
            el.classList.toggle('error', !!isError);
        }

        async function generateNoteFragments() {
            const state = anCollectInputToState();
            if (!state) return [];
            const confirmedReadingNote = String(state.firstDraftNote || (typeof getPrimaryAutoNoteBody === 'function' ? getPrimaryAutoNoteBody() : '') || '').trim();
            if (!confirmedReadingNote) {
                alert('请先确认或填写第一版读书会札记。');
                return [];
            }

            const splitStrategy = anGetSetting('fragmentSplitStrategy', 'auto');
            const payload = {
                confirmedReadingNote,
                baseText: state.baseText || '',
                sources: (state.sources || []).map(source => ({
                    id: source.id,
                    type: source.type,
                    title: source.title || source.fileName || '未命名材料',
                    content: String(source.content || '').slice(0, 30000),
                    fileName: source.fileName || '',
                    metadata: source.metadata || {}
                })),
                splitStrategy,
                researchQuestion: state.researchQuestion || '',
                locale: 'zh-CN',
                promptInstructions: anBuildFragmentPrompt(splitStrategy)
            };

            const container = document.getElementById('anFragmentsList');
            if (container) container.innerHTML = '<div class="auto-notes-empty">正在生成结构化 fragments...</div>';

            try {
                if (typeof callAutoNotesLLM !== 'function') {
                    throw new Error('AI Adapter 未加载，无法调用 DeepSeek。');
                }
                const result = await callAutoNotesLLM('split_note_fragments', payload, {
                    expectJson: true,
                    loadingMessage: 'DeepSeek 正在拆分碎片化札记',
                    timeoutMs: 60000
                });
                state.fragments = anNormalizeFragments(result, confirmedReadingNote);
            } catch (error) {
                const message = error && error.message ? error.message : String(error);
                alert('DeepSeek 生成 fragments 失败，已使用本地轻量规则生成草稿：' + message);
                state.fragments = anSplitFragmentsLocally(confirmedReadingNote, splitStrategy);
            }

            saveAutoNotesProject();
            renderNoteFragments();
            return state.fragments;
        }

        function addNoteFragment(fragmentData = {}) {
            if (!window.autoNotesState) window.autoNotesState = createAutoNotesProject();
            window.autoNotesState.fragments = Array.isArray(window.autoNotesState.fragments) ? window.autoNotesState.fragments : [];
            window.autoNotesState.fragments.push(anCreateFragment(fragmentData, window.autoNotesState.fragments.length));
            saveAutoNotesProject();
            renderNoteFragments();
        }

        function deleteNoteFragment(fragmentId) {
            if (!window.autoNotesState) return;
            window.autoNotesState.fragments = (window.autoNotesState.fragments || []).filter(fragment => fragment.fragmentId !== fragmentId);
            saveAutoNotesProject();
            renderNoteFragments();
        }

        function updateNoteFragment(fragmentId, field, value) {
            const state = window.autoNotesState;
            const fragment = state && (state.fragments || []).find(item => item.fragmentId === fragmentId);
            if (!fragment) return;
            if (field === 'keywords' || field === 'sourceRefs') {
                fragment[field] = anParseListField(value);
            } else if (field === 'confidence') {
                fragment.confidence = Math.max(0, Math.min(1, Number(value) || 0));
            } else if (field === 'fragmentId') {
                fragment.fragmentId = String(value || fragment.fragmentId).trim() || fragment.fragmentId;
            } else {
                fragment[field] = value;
            }
            fragment.userEdited = true;
            if (typeof scheduleAutoNotesAutosave === 'function') {
                scheduleAutoNotesAutosave();
            } else {
                saveAutoNotesProject();
            }
        }

        function renderNoteFragments() {
            const container = document.getElementById('anFragmentsList');
            if (!container || !window.autoNotesState) return;
            const fragments = window.autoNotesState.fragments || [];
            if (fragments.length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">暂无碎片。确认第一版札记后，可点击“生成碎片化札记”。</div>';
                return;
            }

            container.innerHTML = fragments.map(fragment => `
                <div class="auto-notes-fragment" data-fragment-id="${anEscapeAttr(fragment.fragmentId)}">
                    <div class="auto-notes-fragment-head">
                        <input class="doc-name-input" value="${anEscapeHtml(fragment.fragmentId)}" placeholder="fragmentId" onchange="updateNoteFragment('${anEscapeAttr(fragment.fragmentId)}', 'fragmentId', this.value); renderNoteFragments();">
                        <input class="doc-name-input" value="${anEscapeHtml(fragment.title || '')}" placeholder="标题" oninput="updateNoteFragment('${anEscapeAttr(fragment.fragmentId)}', 'title', this.value)">
                        <select class="doc-name-input" onchange="updateNoteFragment('${anEscapeAttr(fragment.fragmentId)}', 'category', this.value)">
                            ${anFragmentCategoryOptions(fragment.category)}
                        </select>
                        <button type="button" class="auto-notes-delete-btn" onclick="deleteNoteFragment('${anEscapeAttr(fragment.fragmentId)}')">删除</button>
                    </div>
                    <div class="auto-notes-fragment-grid">
                        <label>原文 / 对应材料
                            <textarea class="textarea-area" oninput="updateNoteFragment('${anEscapeAttr(fragment.fragmentId)}', 'originalText', this.value)">${anEscapeHtml(fragment.originalText || '')}</textarea>
                        </label>
                        <label>札记内容
                            <textarea class="textarea-area" oninput="updateNoteFragment('${anEscapeAttr(fragment.fragmentId)}', 'noteText', this.value)">${anEscapeHtml(fragment.noteText || '')}</textarea>
                        </label>
                    </div>
                    <div class="auto-notes-fragment-meta">
                        <label>来源线索
                            <input class="doc-name-input" value="${anEscapeHtml((fragment.sourceRefs || []).join('；'))}" placeholder="来源标题、页码、材料片段，可用分号分隔" oninput="updateNoteFragment('${anEscapeAttr(fragment.fragmentId)}', 'sourceRefs', this.value)">
                        </label>
                        <label>关键词
                            <input class="doc-name-input" value="${anEscapeHtml((fragment.keywords || []).join('、'))}" placeholder="关键词，可用顿号/逗号分隔" oninput="updateNoteFragment('${anEscapeAttr(fragment.fragmentId)}', 'keywords', this.value)">
                        </label>
                        <label>置信度
                            <input class="doc-name-input" type="number" min="0" max="1" step="0.05" value="${Number(fragment.confidence || 0).toFixed(2)}" oninput="updateNoteFragment('${anEscapeAttr(fragment.fragmentId)}', 'confidence', this.value)">
                        </label>
                    </div>
                    ${(fragment.warnings || []).length ? `<p><strong>提示：</strong>${anEscapeHtml((fragment.warnings || []).join('；'))}</p>` : ''}
                </div>
            `).join('');
        }

        function confirmNoteFragments() {
            const state = anCollectInputToState();
            if (!state) return false;
            const fragments = state.fragments || [];
            if (fragments.length === 0) {
                alert('请先生成或新增至少一个 fragment。');
                return false;
            }

            state.textUnits = fragments.map((fragment, index) => {
                const text = fragment.originalText || fragment.noteText || fragment.title || '';
                const normalized = normalizeClassicalText(text, anGetSetting('normalizeOptions', {}));
                return {
                    id: generateAutoNotesId('unit'),
                    index: index + 1,
                    rawText: text,
                    normalizedText: normalized.normalizedText,
                    book: '',
                    chapter: '',
                    keywords: Array.from(new Set((fragment.keywords || []).concat(normalized.keywords || []))).slice(0, 12),
                    entities: [],
                    tongjiaCandidates: normalized.tongjiaCandidates,
                    status: 'fragment_confirmed',
                    fragmentId: fragment.fragmentId,
                    fragmentCategory: fragment.category || '其他',
                    sourceRefs: fragment.sourceRefs || []
                };
            });
            state.selectedUnitId = state.textUnits[0] ? state.textUnits[0].id : '';
            state.fragmentsConfirmedAt = new Date().toISOString();
            saveAutoNotesProject();
            renderTextUnitsList();
            switchAutoNotesStep(3);
            return true;
        }

        function exportNoteFragmentsJSON() {
            const state = anCollectInputToState();
            if (!state) return;
            if (!state.fragments || state.fragments.length === 0) {
                alert('暂无 fragments 可导出。');
                return;
            }
            const payload = {
                exportType: 'lantai_auto_notes_fragments',
                exportedAt: new Date().toISOString(),
                projectId: state.projectId,
                projectTitle: state.projectTitle,
                researchQuestion: state.researchQuestion,
                splitStrategy: anGetSetting('fragmentSplitStrategy', 'auto'),
                fragments: state.fragments
            };
            downloadAutoNotesFile(`${anSafeFilename(state.projectTitle || 'fragments')}-fragments.json`, JSON.stringify(payload, null, 2), 'application/json');
        }

        function exportNoteFragmentsMarkdown() {
            const state = anCollectInputToState();
            if (!state) return;
            if (!state.fragments || state.fragments.length === 0) {
                alert('暂无 fragments 可导出。');
                return;
            }
            downloadAutoNotesFile(`${anSafeFilename(state.projectTitle || 'fragments')}-fragments.md`, anBuildFragmentsMarkdown(state), 'text/markdown');
        }

        function anBuildFragmentPrompt(splitStrategy) {
            return [
                '请把用户校对后的完整读书会札记拆分为适合后续分析、建库、检索和知识图谱使用的结构化片段。',
                '不要只按段落机械切分；应综合概念、论点、引文、注解层级、来源线索和可独立检索性。',
                `当前碎片化策略：${anGetFragmentStrategyLabel(splitStrategy)}。`,
                '每个 fragment 应尽量表达一个相对独立的知识点、解释点、证据点或问题点。',
                '保留资料来源线索；遇到 OCR、引文边界或解释不确定处，请放入 warnings 并标注“不确定”。',
                '请严格返回 JSON：{ "fragments": [{ "fragmentId": "frag_001", "title": "...", "originalText": "...", "noteText": "...", "sourceRefs": [], "keywords": [], "category": "训诂/义理/人物/制度/校勘/版本/地理/其他", "confidence": 0.0, "warnings": [] }] }。'
            ].join('\n');
        }

        function anNormalizeFragments(result, sourceText) {
            const raw = Array.isArray(result) ? result : (result && Array.isArray(result.fragments) ? result.fragments : []);
            if (!raw.length) return anSplitFragmentsLocally(sourceText, 'auto');
            return raw.map((fragment, index) => anCreateFragment(fragment, index));
        }

        function anCreateFragment(fragmentData = {}, index = 0) {
            const fragmentId = fragmentData.fragmentId || fragmentData.id || `frag_${String(index + 1).padStart(3, '0')}`;
            const noteText = fragmentData.noteText || fragmentData.body || fragmentData.summary || '';
            const originalText = fragmentData.originalText || fragmentData.target || '';
            const keywords = Array.isArray(fragmentData.keywords)
                ? fragmentData.keywords.map(anStringifyFragmentListItem).filter(Boolean)
                : anParseListField(fragmentData.keywords || extractBasicKeywords(`${originalText}\n${noteText}`).join('、'));
            return {
                fragmentId,
                title: fragmentData.title || anBuildFragmentTitle(noteText || originalText, index),
                originalText,
                noteText,
                sourceRefs: Array.isArray(fragmentData.sourceRefs)
                    ? fragmentData.sourceRefs.map(anStringifyFragmentListItem).filter(Boolean)
                    : anParseListField(fragmentData.sourceRefs || ''),
                keywords,
                category: fragmentData.category || anInferFragmentCategory(`${fragmentData.title || ''}\n${originalText}\n${noteText}`),
                confidence: Math.max(0, Math.min(1, Number(fragmentData.confidence == null ? 0.6 : fragmentData.confidence))),
                warnings: Array.isArray(fragmentData.warnings)
                    ? fragmentData.warnings.map(anStringifyFragmentListItem).filter(Boolean)
                    : anParseListField(fragmentData.warnings || ''),
                userEdited: !!fragmentData.userEdited
            };
        }

        function anSplitFragmentsLocally(text, strategy) {
            const normalized = normalizeWhitespace(text);
            const headingBlocks = normalized.split(/\n(?=#{1,3}\s+)/g).filter(Boolean);
            let parts = headingBlocks.length > 2 ? headingBlocks : normalized.split(/\n{2,}/g);
            if (strategy === 'punctuation') {
                parts = normalized.match(/[^。！？；;.!?\n]+[。！？；;.!?]?/g) || parts;
            }
            return parts
                .map(part => part.trim())
                .filter(Boolean)
                .slice(0, 40)
                .map((part, index) => anCreateFragment({
                    fragmentId: `frag_${String(index + 1).padStart(3, '0')}`,
                    title: anBuildFragmentTitle(part, index),
                    originalText: '',
                    noteText: part,
                    keywords: extractBasicKeywords(part),
                    category: anInferFragmentCategory(part),
                    confidence: 0.45,
                    warnings: ['DeepSeek 不可用，当前 fragment 由本地轻量规则生成，需人工校对。']
                }, index));
        }

        function anBuildFragmentsMarkdown(state) {
            const lines = [
                `# ${state.projectTitle || '碎片化札记'}`,
                '',
                `- 研究问题：${state.researchQuestion || '（未填写）'}`,
                `- 碎片化策略：${anGetFragmentStrategyLabel(anGetSetting('fragmentSplitStrategy', 'auto'))}`,
                '',
                '## Fragments'
            ];
            (state.fragments || []).forEach(fragment => {
                lines.push(
                    '',
                    `### ${fragment.fragmentId} ${fragment.title || ''}`,
                    `- 分类：${fragment.category || '其他'}`,
                    `- 置信度：${fragment.confidence}`,
                    `- 关键词：${(fragment.keywords || []).join('、') || '（无）'}`,
                    `- 来源线索：${(fragment.sourceRefs || []).join('；') || '（无）'}`,
                    '',
                    '#### 原文 / 对应材料',
                    fragment.originalText || '（无）',
                    '',
                    '#### 札记内容',
                    fragment.noteText || '（无）'
                );
            });
            return lines.join('\n');
        }

        function anBuildFragmentTitle(text, index) {
            const cleaned = String(text || '').replace(/^#+\s*/gm, '').replace(/\s+/g, ' ').trim();
            return cleaned ? cleaned.slice(0, 24) : `札记片段 ${index + 1}`;
        }

        function anParseListField(value) {
            if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean);
            return String(value || '').split(/[、,，;；\n]+/g).map(item => item.trim()).filter(Boolean);
        }

        function anStringifyFragmentListItem(item) {
            if (item == null) return '';
            if (typeof item === 'string') return item.trim();
            if (typeof item === 'number') return String(item);
            return String(item.title || item.sourceTitle || item.text || item.label || JSON.stringify(item)).trim();
        }

        function anFragmentCategoryOptions(selected) {
            return ['训诂', '义理', '人物', '制度', '校勘', '版本', '地理', '其他'].map(category => (
                `<option value="${category}"${selected === category ? ' selected' : ''}>${category}</option>`
            )).join('');
        }

        function anInferFragmentCategory(text) {
            const value = String(text || '');
            if (anContainsAny(value, ['异文', '版本', '本作', '一本', '宋本', '阮刻'])) return '版本';
            if (anContainsAny(value, ['校', '讹', '衍', '脱', '校勘'])) return '校勘';
            if (anContainsAny(value, ['礼制', '官制', '井田', '宗法', '封建', '郡县', '制度'])) return '制度';
            if (anContainsAny(value, ['孔子', '孟子', '颜回', '子路', '子贡', '周公'])) return '人物';
            if (anContainsAny(value, ['鲁', '齐', '卫', '宋', '郑', '晋', '楚', '秦', '地理', '城', '邑'])) return '地理';
            if (anContainsAny(value, ['仁', '义', '礼', '道', '德', '性', '天命', '义理'])) return '义理';
            return '训诂';
        }

        function anGetFragmentStrategyLabel(value) {
            const labels = {
                punctuation: '按标点',
                paragraph: '按段落',
                semantic: '按语义',
                annotation: '按注解层级',
                concept: '按核心概念',
                auto: '自动判断'
            };
            return labels[value] || labels.auto;
        }

        const AN_DEFAULT_DATABASE_SCHEMA = {
            classic_title: '',
            chapter: '',
            scripture_content: '',
            note_heyan: '',
            note_zhuxi: '',
            note_liubaonan: '',
            modern_interpretation: '',
            keywords: [],
            source_refs: [],
            fragments: [],
            created_at: '',
            updated_at: ''
        };

        function switchAutoNotesStageThreeMode(mode) {
            if (!window.autoNotesState) window.autoNotesState = createAutoNotesProject();
            window.autoNotesState.settings.stageThreeMode = mode === 'analysis' ? 'analysis' : 'database';
            saveAutoNotesProject();
            renderAutoNotesStageThreeMode();
        }

        function renderAutoNotesStageThreeMode() {
            const mode = anGetSetting('stageThreeMode', 'database');
            const dbPanel = document.getElementById('anDatabaseModePanel');
            const analysisPanel = document.getElementById('anAnalysisModePanel');
            if (dbPanel) dbPanel.classList.toggle('hidden', mode !== 'database');
            if (analysisPanel) analysisPanel.classList.toggle('hidden', mode !== 'analysis');
            renderAnalysisResult();
            const preview = document.getElementById('anDatabaseJsonPreview');
            if (preview && window.autoNotesState) preview.value = window.autoNotesState.databaseJsonRaw || preview.value || '';
            const template = document.getElementById('anDatabaseTemplate');
            if (template && window.autoNotesState) template.value = anGetSetting('databaseTemplate', template.value || '');
        }

        async function generateDatabaseJSON() {
            const state = anCollectInputToState();
            if (!state) return null;
            if (!state.fragments || state.fragments.length === 0) {
                alert('请先在第二阶段生成并确认碎片化札记。');
                return null;
            }

            const button = document.getElementById('anGenerateDatabaseJsonBtn');
            if (button) {
                button.disabled = true;
                button.textContent = '正在生成 JSON...';
            }
            anSetDatabaseJsonStatus('正在调用 DeepSeek 转换数据库 JSON...', false);

            const payload = {
                fragments: state.fragments || [],
                confirmedReadingNote: state.firstDraftNote || '',
                baseText: state.baseText || '',
                sources: (state.sources || []).map(source => ({
                    id: source.id,
                    type: source.type,
                    title: source.title || source.fileName || '未命名材料',
                    content: String(source.content || '').slice(0, 20000),
                    fileName: source.fileName || '',
                    metadata: source.metadata || {}
                })),
                userDatabaseTemplate: anGetSetting('databaseTemplate', ''),
                defaultSchema: AN_DEFAULT_DATABASE_SCHEMA,
                locale: 'zh-CN',
                promptInstructions: anBuildDatabaseJsonPrompt()
            };

            try {
                if (typeof callAutoNotesLLM !== 'function') {
                    throw new Error('AI Adapter 未加载，无法调用 DeepSeek。');
                }
                const result = await callAutoNotesLLM('convert_to_database_json', payload, {
                    expectJson: false,
                    loadingMessage: 'DeepSeek 正在生成数据库 JSON',
                    timeoutMs: 60000
                });
                const raw = anExtractDatabaseJsonRaw(result);
                state.databaseJsonRaw = raw;
                anSetDatabasePreview(raw);
                validateDatabaseJSON(false);
                saveAutoNotesProject();
                return raw;
            } catch (error) {
                const message = error && error.message ? error.message : String(error);
                const fallback = JSON.stringify(anBuildLocalDatabaseJSON(state), null, 2);
                state.databaseJsonRaw = fallback;
                anSetDatabasePreview(fallback);
                anSetDatabaseJsonStatus('DeepSeek 转换失败，已生成本地默认 schema 草稿：' + message, true);
                saveAutoNotesProject();
                return fallback;
            } finally {
                if (button) {
                    button.disabled = false;
                    button.textContent = '生成数据库 JSON';
                }
            }
        }

        function validateDatabaseJSON(shouldAlert = true) {
            const state = anCollectInputToState();
            if (!state) return false;
            const raw = String(state.databaseJsonRaw || '').trim();
            if (!raw) {
                anSetDatabaseJsonStatus('暂无 JSON 可校验。', true);
                if (shouldAlert) alert('暂无 JSON 可校验。');
                return false;
            }
            try {
                const parsed = JSON.parse(raw);
                state.databaseJsonValidated = {
                    valid: true,
                    validatedAt: new Date().toISOString(),
                    error: '',
                    metadata: anBuildDatabaseMetadata(state)
                };
                state.databaseJsonRaw = JSON.stringify(parsed, null, 2);
                anSetDatabasePreview(state.databaseJsonRaw);
                saveAutoNotesProject();
                anSetDatabaseJsonStatus('JSON 校验通过。', false);
                if (shouldAlert) alert('JSON 校验通过。');
                return true;
            } catch (error) {
                state.databaseJsonValidated = {
                    valid: false,
                    validatedAt: new Date().toISOString(),
                    error: error.message || String(error),
                    metadata: anBuildDatabaseMetadata(state)
                };
                saveAutoNotesProject();
                anSetDatabaseJsonStatus('JSON 校验失败：' + state.databaseJsonValidated.error, true);
                if (shouldAlert) alert('JSON 校验失败：' + state.databaseJsonValidated.error);
                return false;
            }
        }

        function exportDatabaseJSON() {
            const state = anCollectInputToState();
            if (!state) return;
            if (!String(state.databaseJsonRaw || '').trim()) {
                alert('暂无数据库 JSON 可导出。');
                return;
            }
            const payload = {
                metadata: anBuildDatabaseMetadata(state),
                sources: state.sources || [],
                fragments: state.fragments || [],
                databaseJson: anParseDatabaseJsonForExport(state.databaseJsonRaw),
                rawDatabaseJson: state.databaseJsonRaw
            };
            downloadAutoNotesFile(`${anSafeFilename(state.projectTitle || 'database-json')}-database.json`, JSON.stringify(payload, null, 2), 'application/json');
        }

        async function copyDatabaseJSON() {
            const state = anCollectInputToState();
            if (!state || !String(state.databaseJsonRaw || '').trim()) {
                alert('暂无数据库 JSON 可复制。');
                return false;
            }
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(state.databaseJsonRaw);
                } else {
                    const textarea = document.getElementById('anDatabaseJsonPreview');
                    if (!textarea) throw new Error('复制组件不可用');
                    textarea.focus();
                    textarea.select();
                    document.execCommand('copy');
                }
                anSetDatabaseJsonStatus('JSON 已复制到剪贴板。', false);
                return true;
            } catch (error) {
                alert('复制失败：' + (error.message || error));
                return false;
            }
        }

        function anBuildDatabaseJsonPrompt() {
            return [
                '请把碎片化札记转换为数据库可插入前的标准 JSON。',
                '如果 userDatabaseTemplate 非空，优先贴合用户模板的字段名、层级和数据类型。',
                '如果 userDatabaseTemplate 为空，请使用 defaultSchema 的字段。',
                '输出必须是一个合法 JSON 对象，不要使用 Markdown 代码块，不要添加解释性文字。',
                '必须保留 metadata、sources、fragments 或等价来源信息，便于追溯。',
                '不要伪造资料来源；无法确定的字段留空字符串、空数组，或在 metadata.warnings 中说明。'
            ].join('\n');
        }

        function anExtractDatabaseJsonRaw(result) {
            if (typeof result === 'string') return anStripJsonFence(result);
            if (!result || typeof result !== 'object') return '';
            if (typeof result.result === 'string') return anStripJsonFence(result.result);
            if (typeof result.content === 'string') return anStripJsonFence(result.content);
            if (result.choices && result.choices[0] && result.choices[0].message) {
                return anStripJsonFence(result.choices[0].message.content || '');
            }
            if (result.databaseJson) return JSON.stringify(result.databaseJson, null, 2);
            if (result.result && typeof result.result === 'object') return JSON.stringify(result.result, null, 2);
            return JSON.stringify(result, null, 2);
        }

        function anStripJsonFence(text) {
            return String(text || '').trim()
                .replace(/^```(?:json)?\s*/i, '')
                .replace(/```$/i, '')
                .trim();
        }

        function anBuildLocalDatabaseJSON(state) {
            const now = new Date().toISOString();
            const keywords = Array.from(new Set((state.fragments || []).flatMap(fragment => fragment.keywords || []))).slice(0, 30);
            const sourceRefs = Array.from(new Set((state.fragments || []).flatMap(fragment => fragment.sourceRefs || []))).slice(0, 50);
            return {
                metadata: anBuildDatabaseMetadata(state),
                record: {
                    ...AN_DEFAULT_DATABASE_SCHEMA,
                    scripture_content: state.baseText || '',
                    modern_interpretation: state.firstDraftNote || '',
                    keywords,
                    source_refs: sourceRefs,
                    fragments: state.fragments || [],
                    created_at: state.createdAt || now,
                    updated_at: now
                },
                sources: state.sources || [],
                fragments: state.fragments || []
            };
        }

        function anBuildDatabaseMetadata(state) {
            return {
                exportType: 'lantai_auto_notes_database_json',
                projectId: state.projectId,
                projectTitle: state.projectTitle,
                researchQuestion: state.researchQuestion,
                generatedAt: new Date().toISOString(),
                sourceCount: (state.sources || []).length,
                fragmentCount: (state.fragments || []).length,
                hasUserDatabaseTemplate: !!String(anGetSetting('databaseTemplate', '')).trim()
            };
        }

        function anParseDatabaseJsonForExport(raw) {
            try {
                return JSON.parse(raw);
            } catch {
                return null;
            }
        }

        function anSetDatabasePreview(raw) {
            const textarea = document.getElementById('anDatabaseJsonPreview');
            if (textarea) textarea.value = raw || '';
        }

        function anSetDatabaseJsonStatus(message, isError) {
            const el = document.getElementById('anDatabaseJsonStatus');
            if (!el) return;
            el.textContent = message || '';
            el.classList.toggle('error', !!isError);
        }

        function anSetAnalysisStatus(message, isError) {
            const el = document.getElementById('anAnalysisStatus');
            if (!el) return;
            el.textContent = message || '';
            el.classList.toggle('error', !!isError);
        }

        async function generateWordCloudData() {
            return anGenerateAnalysisResult('word_cloud', 'analyze_word_cloud');
        }

        async function generateComparisonTable() {
            return anGenerateAnalysisResult('comparison_table', 'analyze_comparison_table');
        }

        async function generateMindMapData() {
            return anGenerateAnalysisResult('mind_map', 'analyze_mind_map');
        }

        async function generateArgumentStructure() {
            return anGenerateAnalysisResult('argument_structure', 'analyze_argument_structure');
        }

        async function generateKnowledgeGraph() {
            return anGenerateAnalysisResult('knowledge_graph', 'analyze_knowledge_graph');
        }

        function switchAutoNotesAnalysisType(type) {
            if (!window.autoNotesState) window.autoNotesState = createAutoNotesProject();
            window.autoNotesState.settings.analysisType = type || 'word_cloud';
            saveAutoNotesProject();
            renderAnalysisResult();
        }

        async function anGenerateAnalysisResult(analysisType, taskType) {
            const state = anCollectInputToState();
            if (!state) return null;
            if (!state.fragments || state.fragments.length === 0) {
                alert('请先在第二阶段生成 fragments。');
                return null;
            }

            state.settings.analysisType = analysisType;
            const payload = anBuildAnalysisPayload(state, analysisType);
            anSetAnalysisStatus('正在生成结构化分析数据...', false);

            try {
                if (typeof callAutoNotesLLM !== 'function') {
                    throw new Error('AI Adapter 未加载，无法调用 DeepSeek。');
                }
                const result = await callAutoNotesLLM(taskType, payload, {
                    expectJson: false,
                    loadingMessage: 'DeepSeek 正在生成分析数据',
                    timeoutMs: 60000
                });
                const rawJson = anExtractDatabaseJsonRaw(result);
                const parsed = anParseAnalysisJson(rawJson);
                anStoreAnalysisResult(analysisType, parsed, rawJson);
                anSetAnalysisStatus('分析数据已生成。', false);
            } catch (error) {
                const message = error && error.message ? error.message : String(error);
                const fallback = anBuildLocalAnalysisResult(state, analysisType);
                anStoreAnalysisResult(analysisType, fallback, JSON.stringify(fallback, null, 2));
                anSetAnalysisStatus('DeepSeek 生成失败，已使用本地规则生成草稿：' + message, true);
            }

            var echartsChartTypes = ['word_cloud', 'mind_map', 'argument_structure', 'knowledge_graph'];
            if (echartsChartTypes.indexOf(analysisType) >= 0) {
                await ensureECharts();
            }

            saveAutoNotesProject();
            renderAnalysisResult();
            return window.autoNotesState.analysisResults[analysisType];
        }

        function anBuildAnalysisPayload(state, analysisType) {
            return {
                fragments: state.fragments || [],
                confirmedReadingNote: state.firstDraftNote || '',
                baseText: state.baseText || '',
                sources: state.sources || [],
                researchQuestion: state.researchQuestion || '',
                analysisType,
                knowledgeGraphMode: anGetSetting('knowledgeGraphMode', 'simple'),
                locale: 'zh-CN',
                promptInstructions: anBuildAnalysisPrompt(analysisType)
            };
        }

        function anBuildAnalysisPrompt(analysisType) {
            const prompts = {
                word_cloud: '请返回 JSON：{ "terms": [{ "text": "仁", "weight": 10, "category": "义理" }] }。weight 为 1-20。',
                comparison_table: '请返回 JSON：{ "columns": ["概念", "原文", "何晏", "朱熹", "刘宝楠", "现代解释"], "rows": [] }。rows 中每行与 columns 对齐。',
                mind_map: '请返回 JSON：{ "root": { "id": "root", "label": "...", "children": [] } }。children 可递归。',
                argument_structure: '请返回 JSON：{ "nodes": [], "edges": [] }。nodes 表示论点/证据/结论，edges 表示支持、反驳、推导等关系。',
                knowledge_graph: `请返回 JSON：{ "nodes": [{ "id": "孔子", "label": "孔子", "type": "person" }], "edges": [{ "source": "孔子", "target": "弟子", "relation": "师生" }] }。当前子模式：${anGetSetting('knowledgeGraphMode', 'simple') === 'complex' ? '复杂关系库' : '简单关系库'}。`
            };
            return [
                '请基于碎片化札记生成可分析、可研究、可视化的数据结构。',
                '只返回合法 JSON，不要 Markdown 代码块，不要解释文字。',
                '保留可追溯信息，不确定关系请降低权重或在字段中标记 uncertain。',
                prompts[analysisType] || prompts.word_cloud
            ].join('\n');
        }

        function anParseAnalysisJson(rawJson) {
            const text = anStripJsonFence(rawJson);
            try {
                return JSON.parse(text);
            } catch (error) {
                throw new Error('分析结果不是合法 JSON：' + (error.message || error));
            }
        }

        function anStoreAnalysisResult(analysisType, data, rawJson) {
            if (!window.autoNotesState.analysisResults) window.autoNotesState.analysisResults = {};
            window.autoNotesState.analysisResults[analysisType] = {
                type: analysisType,
                data,
                rawJson,
                generatedAt: new Date().toISOString(),
                knowledgeGraphMode: anGetSetting('knowledgeGraphMode', 'simple')
            };
        }

        let anCurrentEChartsInstance = null;

        function anDisposeECharts() {
            if (anCurrentEChartsInstance) {
                try {
                    anCurrentEChartsInstance.dispose();
                } catch (e) {}
                anCurrentEChartsInstance = null;
            }
        }

        function anResizeECharts() {
            if (anCurrentEChartsInstance) {
                try {
                    anCurrentEChartsInstance.resize();
                } catch (e) {}
            }
        }

        function anGetAnalysisTypeLabel(type) {
            const labels = {
                word_cloud: '词云',
                comparison_table: '对比表',
                mind_map: '思维导图',
                argument_structure: '结构图',
                knowledge_graph: '知识图谱'
            };
            return labels[type] || type;
        }

        function anExportAnalysisImage(format = 'png') {
            if (!anCurrentEChartsInstance) {
                alert('暂无可视化图表可导出。');
                return null;
            }

            try {
                const type = anGetSetting('analysisType', 'word_cloud');
                const typeLabel = anGetAnalysisTypeLabel(type);
                const timestamp = new Date().toISOString().slice(0, 10);
                const filename = `${typeLabel}_${timestamp}.${format}`;

                const dataUrl = anCurrentEChartsInstance.getDataURL({
                    type: format === 'jpg' ? 'jpeg' : 'png',
                    pixelRatio: 2,
                    backgroundColor: '#fff'
                });

                const link = document.createElement('a');
                link.download = filename;
                link.href = dataUrl;
                link.click();

                return dataUrl;
            } catch (error) {
                console.error('导出图片失败:', error);
                alert('导出图片失败：' + (error.message || error));
                return null;
            }
        }

        function anExportAnalysisImagePNG() {
            return anExportAnalysisImage('png');
        }

        function anExportAnalysisImageJPG() {
            return anExportAnalysisImage('jpg');
        }

        function anExportAnalysisMarkdown() {
            const type = anGetSetting('analysisType', 'word_cloud');
            const result = window.autoNotesState && window.autoNotesState.analysisResults
                ? window.autoNotesState.analysisResults[type]
                : null;

            if (!result) {
                alert('暂无分析结果可导出。');
                return null;
            }

            const typeLabel = anGetAnalysisTypeLabel(type);
            const timestamp = new Date().toISOString().slice(0, 10);
            const filename = `${typeLabel}_${timestamp}.md`;

            let imageDataUrl = null;
            if (anCurrentEChartsInstance) {
                try {
                    imageDataUrl = anCurrentEChartsInstance.getDataURL({
                        type: 'png',
                        pixelRatio: 2,
                        backgroundColor: '#fff'
                    });
                } catch (e) {}
            }

            const projectTitle = window.autoNotesState ? (window.autoNotesState.projectTitle || typeLabel) : typeLabel;
            const generatedAt = result.generatedAt || new Date().toISOString();

            let dataSummary = '';
            if (result.data) {
                if (type === 'word_cloud' && result.data.terms) {
                    dataSummary = '### 词云数据\n\n';
                    dataSummary += '| 关键词 | 权重 | 分类 |\n';
                    dataSummary += '|--------|------|------|\n';
                    const terms = result.data.terms.slice(0, 30);
                    terms.forEach(term => {
                        dataSummary += `| ${term.text || ''} | ${term.weight || 1} | ${term.category || '-'} |\n`;
                    });
                } else if (type === 'comparison_table' && result.data.columns) {
                    dataSummary = '### 对比表数据\n\n';
                    dataSummary += '| ' + result.data.columns.join(' | ') + ' |\n';
                    dataSummary += '| ' + result.data.columns.map(() => '---').join(' | ') + ' |\n';
                    if (result.data.rows) {
                        result.data.rows.forEach(row => {
                            const cells = Array.isArray(row) ? row : result.data.columns.map(col => row && row[col]);
                            dataSummary += '| ' + cells.map(c => (c == null ? '' : String(c))).join(' | ') + ' |\n';
                        });
                    }
                } else if (type === 'mind_map' && result.data.root) {
                    dataSummary = '### 思维导图数据\n\n';
                    function renderTree(node, depth = 0) {
                        if (!node) return '';
                        const prefix = '  '.repeat(depth) + '- ';
                        let output = prefix + (node.label || node.id || '节点') + '\n';
                        const children = Array.isArray(node.children) ? node.children : [];
                        children.forEach(child => {
                            output += renderTree(child, depth + 1);
                        });
                        return output;
                    }
                    dataSummary += renderTree(result.data.root);
                } else if ((type === 'knowledge_graph' || type === 'argument_structure') && result.data.nodes) {
                    const title = type === 'knowledge_graph' ? '知识图谱' : '结构图';
                    dataSummary = `### ${title}数据\n\n`;
                    if (result.data.nodes && result.data.nodes.length > 0) {
                        dataSummary += '#### 节点列表\n\n';
                        dataSummary += '| ID/名称 | 类型 |\n';
                        dataSummary += '|----------|------|\n';
                        result.data.nodes.forEach(node => {
                            dataSummary += `| ${node.label || node.id || '-'} | ${node.type || 'node'} |\n`;
                        });
                    }
                    if (result.data.edges && result.data.edges.length > 0) {
                        dataSummary += '\n#### 关系列表\n\n';
                        dataSummary += '| 源 | 目标 | 关系 |\n';
                        dataSummary += '|-----|------|------|\n';
                        result.data.edges.forEach(edge => {
                            dataSummary += `| ${edge.source || '-'} | ${edge.target || '-'} | ${edge.relation || edge.label || '-'} |\n`;
                        });
                    }
                }
            }

            let markdownContent = `# ${typeLabel}分析报告\n\n`;
            markdownContent += `> 生成时间：${generatedAt}\n\n`;

            if (imageDataUrl) {
                markdownContent += `## 可视化图表\n\n`;
                markdownContent += `![${typeLabel}](${imageDataUrl})\n\n`;
            }

            if (dataSummary) {
                markdownContent += `## 数据明细\n\n`;
                markdownContent += dataSummary + '\n';
            }

            markdownContent += `---\n\n`;
            markdownContent += `*由古典学园数字兰台文档审核助手生成*\n`;

            const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = filename;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);

            return {
                filename,
                markdownContent,
                imageDataUrl
            };
        }

        function anExportAnalysisWordDoc() {
            const type = anGetSetting('analysisType', 'word_cloud');
            const result = window.autoNotesState && window.autoNotesState.analysisResults
                ? window.autoNotesState.analysisResults[type]
                : null;

            if (!result) {
                alert('暂无分析结果可导出。');
                return null;
            }

            const typeLabel = anGetAnalysisTypeLabel(type);
            const timestamp = new Date().toISOString().slice(0, 10);
            const filename = `${typeLabel}_${timestamp}.doc`;

            let imageDataUrl = null;
            if (anCurrentEChartsInstance) {
                try {
                    imageDataUrl = anCurrentEChartsInstance.getDataURL({
                        type: 'png',
                        pixelRatio: 2,
                        backgroundColor: '#fff'
                    });
                } catch (e) {}
            }

            const projectTitle = window.autoNotesState ? (window.autoNotesState.projectTitle || typeLabel) : typeLabel;
            const generatedAt = result.generatedAt || new Date().toISOString();

            let dataSummaryHtml = '';
            if (result.data) {
                if (type === 'word_cloud' && result.data.terms) {
                    dataSummaryHtml += '<h3>词云数据</h3>';
                    dataSummaryHtml += '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:80%;">';
                    dataSummaryHtml += '<thead><tr style="background-color:#f0f0f0;"><th>关键词</th><th>权重</th><th>分类</th></tr></thead>';
                    dataSummaryHtml += '<tbody>';
                    const terms = result.data.terms.slice(0, 30);
                    terms.forEach(term => {
                        dataSummaryHtml += `<tr><td>${term.text || ''}</td><td>${term.weight || 1}</td><td>${term.category || '-'}</td></tr>`;
                    });
                    dataSummaryHtml += '</tbody></table>';
                } else if (type === 'comparison_table' && result.data.columns) {
                    dataSummaryHtml += '<h3>对比表数据</h3>';
                    dataSummaryHtml += '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:100%;">';
                    dataSummaryHtml += '<thead><tr style="background-color:#f0f0f0;">';
                    result.data.columns.forEach(col => {
                        dataSummaryHtml += `<th>${col}</th>`;
                    });
                    dataSummaryHtml += '</tr></thead>';
                    dataSummaryHtml += '<tbody>';
                    if (result.data.rows) {
                        result.data.rows.forEach(row => {
                            dataSummaryHtml += '<tr>';
                            const cells = Array.isArray(row) ? row : result.data.columns.map(col => row && row[col]);
                            cells.forEach(cell => {
                                dataSummaryHtml += `<td>${cell == null ? '' : String(cell)}</td>`;
                            });
                            dataSummaryHtml += '</tr>';
                        });
                    }
                    dataSummaryHtml += '</tbody></table>';
                } else if (type === 'mind_map' && result.data.root) {
                    dataSummaryHtml += '<h3>思维导图数据</h3>';
                    function renderTreeHtml(node, depth = 0) {
                        if (!node) return '';
                        const indent = depth * 20;
                        let output = `<div style="margin-left:${indent}px; padding:4px 0;">• ${node.label || node.id || '节点'}</div>`;
                        const children = Array.isArray(node.children) ? node.children : [];
                        children.forEach(child => {
                            output += renderTreeHtml(child, depth + 1);
                        });
                        return output;
                    }
                    dataSummaryHtml += renderTreeHtml(result.data.root);
                } else if ((type === 'knowledge_graph' || type === 'argument_structure') && result.data.nodes) {
                    const title = type === 'knowledge_graph' ? '知识图谱' : '结构图';
                    dataSummaryHtml += `<h3>${title}数据</h3>`;
                    if (result.data.nodes && result.data.nodes.length > 0) {
                        dataSummaryHtml += '<h4>节点列表</h4>';
                        dataSummaryHtml += '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:60%;">';
                        dataSummaryHtml += '<thead><tr style="background-color:#f0f0f0;"><th>ID/名称</th><th>类型</th></tr></thead>';
                        dataSummaryHtml += '<tbody>';
                        result.data.nodes.forEach(node => {
                            dataSummaryHtml += `<tr><td>${node.label || node.id || '-'}</td><td>${node.type || 'node'}</td></tr>`;
                        });
                        dataSummaryHtml += '</tbody></table>';
                    }
                    if (result.data.edges && result.data.edges.length > 0) {
                        dataSummaryHtml += '<h4 style="margin-top:20px;">关系列表</h4>';
                        dataSummaryHtml += '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:80%;">';
                        dataSummaryHtml += '<thead><tr style="background-color:#f0f0f0;"><th>源</th><th>目标</th><th>关系</th></tr></thead>';
                        dataSummaryHtml += '<tbody>';
                        result.data.edges.forEach(edge => {
                            dataSummaryHtml += `<tr><td>${edge.source || '-'}</td><td>${edge.target || '-'}</td><td>${edge.relation || edge.label || '-'}</td></tr>`;
                        });
                        dataSummaryHtml += '</tbody></table>';
                    }
                }
            }

            const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${typeLabel}分析报告</title>
    <style>
        body { font-family: 'SimSun', 'Microsoft YaHei', serif; font-size: 14px; line-height: 1.8; padding: 20px; }
        h1 { font-size: 24px; color: #2d3748; border-bottom: 2px solid #5470c6; padding-bottom: 10px; }
        h2 { font-size: 18px; color: #2d3748; margin-top: 25px; }
        h3 { font-size: 16px; color: #4a5568; margin-top: 20px; }
        h4 { font-size: 14px; color: #4a5568; margin-top: 15px; }
        .meta { color: #718096; font-size: 12px; margin-bottom: 20px; }
        .chart-container { text-align: center; margin: 20px 0; }
        .chart-container img { max-width: 100%; border: 1px solid #ddd; }
        hr { border: none; border-top: 1px solid #ddd; margin: 30px 0; }
        .footer { color: #718096; font-size: 12px; text-align: center; }
    </style>
</head>
<body>
    <h1>${typeLabel}分析报告</h1>
    <div class="meta">
        <strong>项目：</strong>${projectTitle}<br>
        <strong>生成时间：</strong>${generatedAt}
    </div>

    ${imageDataUrl ? `
    <h2>可视化图表</h2>
    <div class="chart-container">
        <img src="${imageDataUrl}" alt="${typeLabel}">
    </div>
    ` : ''}

    ${dataSummaryHtml ? `<h2>数据明细</h2>${dataSummaryHtml}` : ''}

    <hr>
    <div class="footer">由古典学园数字兰台文档审核助手生成</div>
</body>
</html>
            `.trim();

            const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
            const downloadUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.download = filename;
            downloadLink.href = downloadUrl;
            downloadLink.click();
            URL.revokeObjectURL(downloadUrl);

            return {
                filename,
                htmlContent,
                imageDataUrl
            };
        }

        function anRenderExportButtons(container) {
            const type = anGetSetting('analysisType', 'word_cloud');
            const echartsTypes = ['word_cloud', 'mind_map', 'argument_structure', 'knowledge_graph'];
            const hasEChartsChart = echartsTypes.includes(type) && anCurrentEChartsInstance;

            if (!hasEChartsChart) {
                return '';
            }

            return `
                <div class="auto-notes-export-toolbar">
                    <span class="auto-notes-export-label">导出：</span>
                    <button type="button" class="auto-notes-export-btn" onclick="anExportAnalysisImagePNG()" title="导出为 PNG 图片">
                        📷 PNG
                    </button>
                    <button type="button" class="auto-notes-export-btn" onclick="anExportAnalysisImageJPG()" title="导出为 JPG 图片">
                        📷 JPG
                    </button>
                    <button type="button" class="auto-notes-export-btn primary" onclick="anExportAnalysisMarkdown()" title="导出为 Markdown 文档">
                        📄 Markdown
                    </button>
                </div>
            `;
        }

        function anRenderWordCloudECharts(container, data) {
            const terms = Array.isArray(data && data.terms) ? data.terms : [];
            if (!terms.length) {
                container.innerHTML = '<div class="auto-notes-empty">暂无词云数据。</div>';
                return null;
            }

            container.innerHTML = '<div class="auto-notes-echarts-container" id="auto-notes-wordcloud"></div>';
            const chartDom = document.getElementById('auto-notes-wordcloud');
            if (!chartDom || typeof echarts === 'undefined') {
                return anRenderWordCloud(data);
            }

            const chart = echarts.init(chartDom);
            const wordCloudData = terms.map(term => ({
                name: term.text || '',
                value: Math.max(1, Math.min(100, Number(term.weight || 1) * 5)),
                category: term.category || ''
            }));

            const categories = [...new Set(terms.map(t => t.category || '默认').filter(c => c))];
            const colorPalette = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
            const categoryColors = {};
            categories.forEach((cat, i) => {
                categoryColors[cat] = colorPalette[i % colorPalette.length];
            });

            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return `<strong>${params.name}</strong><br/>权重: ${Math.round(params.value / 5)}${params.data.category ? '<br/>分类: ' + params.data.category : ''}`;
                    }
                },
                series: [{
                    type: 'wordCloud',
                    gridSize: 8,
                    sizeRange: [14, 60],
                    rotationRange: [-45, 45],
                    rotationStep: 15,
                    shape: 'cardioid',
                    drawOutOfBound: false,
                    textStyle: {
                        fontFamily: 'Inter, "Crimson Pro", serif',
                        fontWeight: 'bold',
                        color: function(params) {
                            if (params.data && params.data.category && categoryColors[params.data.category]) {
                                return categoryColors[params.data.category];
                            }
                            const colors = ['#2d3748', '#4a5568', '#718096', '#5470c6', '#91cc75', '#ee6666'];
                            return colors[Math.floor(Math.random() * colors.length)];
                        }
                    },
                    emphasis: {
                        textStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    },
                    data: wordCloudData
                }]
            };

            chart.setOption(option);
            return chart;
        }

        function anRenderMindMapECharts(container, data) {
            const root = data && data.root ? data.root : null;
            if (!root) {
                container.innerHTML = '<div class="auto-notes-empty">暂无思维导图数据。</div>';
                return null;
            }

            container.innerHTML = '<div class="auto-notes-echarts-container" id="auto-notes-mindmap"></div>';
            const chartDom = document.getElementById('auto-notes-mindmap');
            if (!chartDom || typeof echarts === 'undefined') {
                return anRenderMindMap(data);
            }

            const chart = echarts.init(chartDom);

            function convertTreeData(node) {
                if (!node) return null;
                const children = Array.isArray(node.children) ? node.children : [];
                return {
                    name: node.label || node.id || '节点',
                    children: children.length ? children.map(convertTreeData) : undefined
                };
            }

            const treeData = convertTreeData(root);
            if (!treeData) return null;

            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                series: [{
                    type: 'tree',
                    data: [treeData],
                    layout: 'orthogonal',
                    orient: 'LR',
                    symbol: 'rect',
                    symbolSize: [120, 40],
                    label: {
                        show: true,
                        position: 'inside',
                        verticalAlign: 'middle',
                        align: 'center',
                        fontSize: 13,
                        fontFamily: 'Inter, "Crimson Pro", serif',
                        color: '#fff'
                    },
                    itemStyle: {
                        color: '#5470c6',
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    lineStyle: {
                        color: '#ccc',
                        width: 2,
                        curveness: 0.5
                    },
                    emphasis: {
                        focus: 'descendant'
                    },
                    expandAndCollapse: true,
                    initialTreeDepth: 3,
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left',
                            color: '#2d3748'
                        },
                        itemStyle: {
                            color: '#91cc75'
                        }
                    }
                }]
            };

            chart.setOption(option);
            return chart;
        }

        function anRenderGraphECharts(container, data, title) {
            const nodes = Array.isArray(data && data.nodes) ? data.nodes : [];
            const edges = Array.isArray(data && data.edges) ? data.edges : [];

            if (!nodes.length && !edges.length) {
                container.innerHTML = '<div class="auto-notes-empty">暂无图谱数据。</div>';
                return null;
            }

            container.innerHTML = '<div class="auto-notes-echarts-container" id="auto-notes-graph"></div>';
            const chartDom = document.getElementById('auto-notes-graph');
            if (!chartDom || typeof echarts === 'undefined') {
                return anRenderGraphList(data, title);
            }

            const chart = echarts.init(chartDom);

            const nodeIdMap = {};
            const chartNodes = nodes.map((node, index) => {
                const id = node.id || node.label || `node_${index}`;
                nodeIdMap[id] = index;
                return {
                    id: id,
                    name: node.label || node.id || '',
                    symbolSize: 50,
                    category: node.type || 'node',
                    draggable: true
                };
            });

            const chartLinks = edges.map(edge => ({
                source: edge.source || '',
                target: edge.target || '',
                label: {
                    show: true,
                    formatter: edge.relation || edge.label || '',
                    fontSize: 11,
                    color: '#666'
                },
                lineStyle: {
                    curveness: 0.2
                }
            }));

            const categories = [...new Set(chartNodes.map(n => n.category))];
            const chartCategories = categories.map(cat => ({ name: cat }));

            const colorPalette = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'];
            const categoryColorMap = {};
            categories.forEach((cat, i) => {
                categoryColorMap[cat] = colorPalette[i % colorPalette.length];
            });

            const option = {
                title: {
                    text: title || '知识图谱',
                    left: 'center',
                    top: 10,
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2d3748',
                        fontFamily: 'Inter, "Crimson Pro", serif'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        if (params.dataType === 'edge') {
                            return `${params.data.source} → ${params.data.target}<br/>关系: ${params.data.label && params.data.label.formatter ? params.data.label.formatter : ''}`;
                        }
                        return `<strong>${params.name}</strong><br/>类型: ${params.data.category || 'node'}`;
                    }
                },
                legend: {
                    data: chartCategories.map(c => c.name),
                    left: 'center',
                    top: 40
                },
                animation: true,
                animationDuration: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [{
                    type: 'graph',
                    layout: 'force',
                    roam: true,
                    draggable: true,
                    data: chartNodes.map(node => ({
                        ...node,
                        itemStyle: {
                            color: categoryColorMap[node.category] || '#5470c6'
                        }
                    })),
                    links: chartLinks,
                    categories: chartCategories,
                    label: {
                        show: true,
                        position: 'bottom',
                        fontSize: 12,
                        fontFamily: 'Inter, "Crimson Pro", serif',
                        color: '#2d3748'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3,
                        width: 2
                    },
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: 4
                        }
                    },
                    force: {
                        repulsion: 400,
                        edgeLength: 120,
                        gravity: 0.1
                    }
                }]
            };

            chart.setOption(option);
            return chart;
        }

        function renderAnalysisResult() {
            const type = anGetSetting('analysisType', 'word_cloud');
            const kgOptions = document.getElementById('anKnowledgeGraphOptions');
            if (kgOptions) kgOptions.classList.toggle('hidden', type !== 'knowledge_graph');

            const result = window.autoNotesState && window.autoNotesState.analysisResults
                ? window.autoNotesState.analysisResults[type]
                : null;
            const raw = document.getElementById('anAnalysisRawJson');
            if (raw) raw.value = result ? result.rawJson || JSON.stringify(result.data || {}, null, 2) : '';
            const preview = document.getElementById('anAnalysisPreview');
            if (!preview) return;

            anDisposeECharts();

            if (!result) {
                preview.innerHTML = '<div class="auto-notes-empty">请选择一种分析方式并生成结构化结果。</div>';
                return;
            }

            const echartsTypes = ['word_cloud', 'mind_map', 'argument_structure', 'knowledge_graph'];
            if (echartsTypes.includes(type) && typeof echarts !== 'undefined') {
                if (type === 'word_cloud') {
                    anCurrentEChartsInstance = anRenderWordCloudECharts(preview, result.data);
                } else if (type === 'mind_map') {
                    anCurrentEChartsInstance = anRenderMindMapECharts(preview, result.data);
                } else if (type === 'argument_structure') {
                    anCurrentEChartsInstance = anRenderGraphECharts(preview, result.data, '结构图');
                } else if (type === 'knowledge_graph') {
                    anCurrentEChartsInstance = anRenderGraphECharts(preview, result.data, '知识图谱');
                }
            } else {
                preview.innerHTML = anRenderAnalysisPreview(type, result.data);
            }
        }

        function anRenderAnalysisPreview(type, data) {
            if (type === 'word_cloud') return anRenderWordCloud(data);
            if (type === 'comparison_table') return anRenderComparisonTable(data);
            if (type === 'mind_map') return anRenderMindMap(data);
            if (type === 'argument_structure') return anRenderGraphList(data, '结构图');
            if (type === 'knowledge_graph') return anRenderGraphList(data, '知识图谱');
            return `<pre>${anEscapeHtml(JSON.stringify(data || {}, null, 2))}</pre>`;
        }

        function anRenderWordCloud(data) {
            const terms = Array.isArray(data && data.terms) ? data.terms : [];
            if (!terms.length) return '<div class="auto-notes-empty">暂无词云数据。</div>';
            return `<div class="auto-notes-word-cloud">${terms.map(term => {
                const weight = Math.max(1, Math.min(20, Number(term.weight || 1)));
                return `<span style="font-size:${12 + weight}px" title="${anEscapeAttr(term.category || '')}">${anEscapeHtml(term.text || '')}</span>`;
            }).join('')}</div>`;
        }

        function anRenderComparisonTable(data) {
            const columns = Array.isArray(data && data.columns) ? data.columns : [];
            const rows = Array.isArray(data && data.rows) ? data.rows : [];
            if (!columns.length) return '<div class="auto-notes-empty">暂无表格数据。</div>';
            return `
                <div class="auto-notes-table-wrap">
                    <table class="auto-notes-analysis-table">
                        <thead><tr>${columns.map(col => `<th>${anEscapeHtml(col)}</th>`).join('')}</tr></thead>
                        <tbody>${rows.map(row => {
                            const cells = Array.isArray(row) ? row : columns.map(col => row && row[col]);
                            return `<tr>${columns.map((_, index) => `<td>${anEscapeHtml(cells[index] == null ? '' : cells[index])}</td>`).join('')}</tr>`;
                        }).join('')}</tbody>
                    </table>
                </div>
            `;
        }

        function anRenderMindMap(data) {
            const root = data && data.root ? data.root : null;
            if (!root) return '<div class="auto-notes-empty">暂无思维导图数据。</div>';
            return `<div class="auto-notes-mindmap">${anRenderMindMapNode(root)}</div>`;
        }

        function anRenderMindMapNode(node) {
            const children = Array.isArray(node.children) ? node.children : [];
            return `
                <div class="auto-notes-mindmap-node">
                    <strong>${anEscapeHtml(node.label || node.id || '节点')}</strong>
                    ${children.length ? `<div>${children.map(child => anRenderMindMapNode(child)).join('')}</div>` : ''}
                </div>
            `;
        }

        function anRenderGraphList(data, title) {
            const nodes = Array.isArray(data && data.nodes) ? data.nodes : [];
            const edges = Array.isArray(data && data.edges) ? data.edges : [];
            return `
                <div class="auto-notes-graph-list">
                    <h4>${anEscapeHtml(title)}节点</h4>
                    <div class="auto-notes-node-list">${nodes.length ? nodes.map(node => `
                        <div class="auto-notes-node-card">
                            <strong>${anEscapeHtml(node.label || node.id || '')}</strong>
                            <span>${anEscapeHtml(node.type || 'node')}</span>
                        </div>
                    `).join('') : '<div class="auto-notes-empty">暂无节点。</div>'}</div>
                    <h4>${anEscapeHtml(title)}边</h4>
                    <div class="auto-notes-edge-list">${edges.length ? edges.map(edge => `
                        <div class="auto-notes-edge-card">
                            ${anEscapeHtml(edge.source || '')} → ${anEscapeHtml(edge.target || '')}
                            <span>${anEscapeHtml(edge.relation || edge.label || '')}</span>
                        </div>
                    `).join('') : '<div class="auto-notes-empty">暂无关系。</div>'}</div>
                </div>
            `;
        }

        function exportAnalysisResultJSON() {
            const state = anCollectInputToState();
            if (!state) return;
            const type = anGetSetting('analysisType', 'word_cloud');
            const result = state.analysisResults && state.analysisResults[type];
            if (!result) {
                alert('暂无当前分析结果可导出。');
                return;
            }
            const payload = {
                metadata: {
                    exportType: 'lantai_auto_notes_analysis_result',
                    projectId: state.projectId,
                    projectTitle: state.projectTitle,
                    researchQuestion: state.researchQuestion,
                    analysisType: type,
                    generatedAt: result.generatedAt,
                    knowledgeGraphMode: result.knowledgeGraphMode || ''
                },
                sources: state.sources || [],
                fragments: state.fragments || [],
                result: result.data,
                rawJson: result.rawJson
            };
            downloadAutoNotesFile(`${anSafeFilename(state.projectTitle || type)}-${type}.json`, JSON.stringify(payload, null, 2), 'application/json');
        }

        function getCurrentAnalysisRawJson() {
            const state = window.autoNotesState;
            const type = anGetSetting('analysisType', 'word_cloud');
            const result = state && state.analysisResults ? state.analysisResults[type] : null;
            return result ? result.rawJson || JSON.stringify(result.data || {}, null, 2) : '';
        }

        function anBuildLocalAnalysisResult(state, analysisType) {
            const fragments = state.fragments || [];
            const keywordCounts = {};
            fragments.forEach(fragment => (fragment.keywords || []).forEach(keyword => {
                keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
            }));
            const terms = Object.keys(keywordCounts).map(text => ({
                text,
                weight: Math.min(20, keywordCounts[text] * 4),
                category: anInferFragmentCategory(text)
            }));
            if (analysisType === 'word_cloud') return { terms };
            if (analysisType === 'comparison_table') {
                return {
                    columns: ['概念', '原文', '何晏', '朱熹', '刘宝楠', '现代解释'],
                    rows: fragments.slice(0, 20).map(fragment => [
                        (fragment.keywords || [fragment.title || ''])[0] || '',
                        fragment.originalText || '',
                        '',
                        '',
                        '',
                        fragment.noteText || ''
                    ])
                };
            }
            if (analysisType === 'mind_map') {
                return {
                    root: {
                        id: 'root',
                        label: state.researchQuestion || state.projectTitle || '札记结构',
                        children: fragments.slice(0, 20).map(fragment => ({
                            id: fragment.fragmentId,
                            label: fragment.title || fragment.fragmentId,
                            children: (fragment.keywords || []).slice(0, 5).map(keyword => ({ id: `${fragment.fragmentId}_${keyword}`, label: keyword, children: [] }))
                        }))
                    }
                };
            }
            const nodes = fragments.map(fragment => ({ id: fragment.fragmentId, label: fragment.title || fragment.fragmentId, type: fragment.category || 'fragment' }));
            const edges = fragments.slice(1).map((fragment, index) => ({ source: fragments[index].fragmentId, target: fragment.fragmentId, relation: '相邻论述' }));
            return { nodes, edges };
        }

        function normalizeClassicalText(text, options = {}) {
            const rawText = String(text || '');
            let normalizedText = rawText;

            if (options.trimWhitespace !== false) {
                normalizedText = normalizeWhitespace(normalizedText);
            }
            if (options.normalizePunctuation !== false) {
                normalizedText = normalizePunctuation(normalizedText);
            }
            if (options.traditionalCompatible) {
                normalizedText = normalizeVariantChars(normalizedText);
            }

            return {
                rawText,
                normalizedText,
                keywords: extractBasicKeywords(normalizedText),
                tongjiaCandidates: detectTongjiaCandidates(rawText)
            };
        }

        function normalizeWhitespace(text) {
            return String(text || '')
                .replace(/\r\n/g, '\n')
                .replace(/\t/g, ' ')
                .replace(/[ \u00a0\u3000]+/g, ' ')
                .replace(/ *\n+ */g, '\n')
                .replace(/\n{3,}/g, '\n\n')
                .trim();
        }

        function normalizePunctuation(text) {
            return String(text || '')
                .replace(/，+/g, '，')
                .replace(/,+/g, '，')
                .replace(/。+/g, '。')
                .replace(/\.+/g, '。')
                .replace(/；+/g, '；')
                .replace(/;+/g, '；')
                .replace(/：+/g, '：')
                .replace(/:+/g, '：')
                .replace(/？+/g, '？')
                .replace(/\?+/g, '？')
                .replace(/！+/g, '！')
                .replace(/!+/g, '！')
                .replace(/（/g, '(')
                .replace(/）/g, ')')
                .replace(/\s*([，。！？；：])\s*/g, '$1')
                .trim();
        }

        function normalizeVariantChars(text) {
            const conservativeMap = {
                '為': '为',
                '學': '学',
                '禮': '礼'
            };
            return String(text || '').replace(/[為學禮]/g, char => conservativeMap[char] || char);
        }

        function detectTongjiaCandidates(text) {
            const value = String(text || '');
            return AN_TONGJIA_GROUPS
                .map(item => ({
                    group: item.group,
                    chars: item.chars,
                    found: item.chars.filter(char => value.includes(char)),
                    note: item.note
                }))
                .filter(item => item.found.length > 0);
        }

        function extractBasicKeywords(text) {
            const value = String(text || '');
            const knownTerms = ['仁', '义', '礼', '智', '信', '道', '德', '学', '君子', '小人', '天命', '礼乐', '名分', '王道', '孔子', '孟子', '史记', '论语'];
            const foundTerms = knownTerms.filter(term => value.includes(term));
            const chars = value
                .replace(/[^\u4e00-\u9fff]/g, '')
                .split('')
                .reduce((acc, char) => {
                    acc[char] = (acc[char] || 0) + 1;
                    return acc;
                }, {});
            const frequentChars = Object.keys(chars)
                .filter(char => chars[char] > 1 && !'之其而以于为者也矣乎焉'.includes(char))
                .sort((a, b) => chars[b] - chars[a])
                .slice(0, 8);

            return Array.from(new Set(foundTerms.concat(frequentChars))).slice(0, 12);
        }

        function splitIntoTextUnits(baseText, method, options = {}) {
            if (!window.autoNotesState) {
                window.autoNotesState = createAutoNotesProject();
            }

            const sourceText = String(baseText == null ? window.autoNotesState.baseText : baseText);
            const splitMode = method || options.splitMode || 'punctuation';
            let parts;

            if (splitMode === 'newline' || splitMode === 'manual') {
                parts = sourceText.split(/\n+/g);
            } else {
                parts = sourceText.match(/[^。！？；;.!?\n]+[。！？；;.!?]?/g) || [];
            }

            window.autoNotesState.textUnits = parts
                .map(part => part.trim())
                .filter(Boolean)
                .slice(0, 80)
                .map((part, index) => {
                    const normalized = normalizeClassicalText(part, options);
                    return {
                        id: generateAutoNotesId('unit'),
                        index: index + 1,
                        rawText: part,
                        normalizedText: normalized.normalizedText,
                        book: '',
                        chapter: '',
                        keywords: normalized.keywords,
                        entities: [],
                        tongjiaCandidates: normalized.tongjiaCandidates,
                        status: 'draft'
                    };
                });

            window.autoNotesState.selectedUnitId = window.autoNotesState.textUnits[0] ? window.autoNotesState.textUnits[0].id : '';
            saveAutoNotesProject();
            return window.autoNotesState.textUnits;
        }

        function renderTextUnits() {
            const state = anCollectInputToState();
            if (!state) return [];
            if (!anRequireProjectReady('split')) return [];
            const options = anGetSetting('normalizeOptions', {});
            splitIntoTextUnits(state.baseText || state.firstDraftNote, options.splitMode || 'punctuation', options);
            renderTextUnitsList();
            return window.autoNotesState.textUnits;
        }

        function renderTextUnitsList() {
            const container = document.getElementById('anCanonicalUnits');
            const alignContainer = document.getElementById('anAlignUnits');
            const html = getTextUnitsHtml();

            if (container) container.innerHTML = html;
            if (alignContainer) alignContainer.innerHTML = html;
        }

        function getTextUnitsHtml() {
            if (!window.autoNotesState || window.autoNotesState.textUnits.length === 0) {
                return '<div class="auto-notes-empty">暂无文本单元。填写古籍原文后点击“开始规范化与切分”。</div>';
            }

            return window.autoNotesState.textUnits.map(unit => {
                const candidates = (unit.tongjiaCandidates || []).map(item => item.group).join('；');
                const keywords = (unit.keywords || []).join('、');
                return `
                    <div class="auto-notes-unit">
                        <div class="auto-notes-unit-head">
                            <span>CTU-${String(unit.index).padStart(3, '0')}</span>
                            <div class="auto-notes-evidence-actions">
                                ${keywords ? `<span class="auto-notes-badge">${anEscapeHtml(keywords)}</span>` : ''}
                                <button type="button" class="auto-notes-delete-btn" onclick="deleteTextUnit('${anEscapeAttr(unit.id)}')">删除</button>
                            </div>
                        </div>
                        <textarea class="textarea-area" oninput="updateTextUnit('${anEscapeAttr(unit.id)}', this.value)">${anEscapeHtml(unit.normalizedText)}</textarea>
                        ${candidates ? `<p><strong>候选字词：</strong>${anEscapeHtml(candidates)}</p>` : ''}
                    </div>
                `;
            }).join('');
        }

        function updateTextUnit(unitId, newText) {
            const unit = window.autoNotesState && window.autoNotesState.textUnits.find(item => item.id === unitId);
            if (!unit) return;
            const normalized = normalizeClassicalText(newText, anGetSetting('normalizeOptions', {}));
            unit.normalizedText = newText;
            unit.keywords = normalized.keywords;
            unit.tongjiaCandidates = normalized.tongjiaCandidates;
            unit.status = 'edited';
            if (typeof scheduleAutoNotesAutosave === 'function') {
                scheduleAutoNotesAutosave();
            } else {
                saveAutoNotesProject();
            }
        }

        function deleteTextUnit(unitId) {
            if (!window.autoNotesState) return;
            window.autoNotesState.textUnits = window.autoNotesState.textUnits
                .filter(unit => unit.id !== unitId)
                .map((unit, index) => ({ ...unit, index: index + 1 }));
            saveAutoNotesProject();
            renderTextUnitsList();
        }

        function buildAlignmentsForAllUnits() {
            const state = anCollectInputToState();
            if (!state) return [];
            if (!anRequireProjectReady('align')) return [];

            const units = Array.isArray(state.textUnits) ? state.textUnits : [];
            const sources = (Array.isArray(state.sources) ? state.sources : []).filter(source => String(source.content || '').trim());
            const evidenceContainer = document.getElementById('anEvidenceCandidates');

            if (units.length === 0) {
                if (evidenceContainer) evidenceContainer.innerHTML = '<div class="auto-notes-empty">请先完成文本切分。</div>';
                return [];
            }
            if (sources.length === 0) {
                if (evidenceContainer) evidenceContainer.innerHTML = '<div class="auto-notes-empty">请先添加注疏、校勘、论文或札记材料。</div>';
                return [];
            }

            const nextAlignments = [];
            units.forEach(unit => {
                const unitAlignments = alignTextUnitWithSources(unit, sources);
                const grouped = anGroupBy(unitAlignments, alignment => alignment.sourceType || 'other');
                Object.keys(grouped).forEach(type => {
                    grouped[type]
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 5)
                        .forEach(alignment => nextAlignments.push(alignment));
                });
            });

            state.alignments = nextAlignments;
            state.selectedUnitId = state.selectedUnitId || (units[0] ? units[0].id : '');
            saveAutoNotesProject();
            renderAlignmentWorkspace();
            return nextAlignments;
        }

        function alignTextUnitWithSources(textUnit, sources) {
            const showLowConfidence = !!(window.autoNotesState && window.autoNotesState.settings && window.autoNotesState.settings.showLowConfidenceEvidence);
            return (sources || [])
                .map(source => {
                    const result = calculateAlignmentScore(textUnit, source);
                    return {
                        id: generateAutoNotesId('align'),
                        textUnitId: textUnit.id,
                        sourceId: source.id,
                        sourceType: source.type || 'other',
                        sourceTitle: source.title || source.fileName || '未命名来源',
                        matchedText: result.matchedText,
                        score: result.score,
                        reasons: generateAlignmentReasons(result.scoreParts),
                        accepted: result.score >= 65,
                        scoreParts: result.scoreParts
                    };
                })
                .filter(alignment => showLowConfidence || alignment.score >= 40)
                .sort((a, b) => b.score - a.score);
        }

        function calculateAlignmentScore(textUnit, source) {
            const textUnitText = String(textUnit.normalizedText || textUnit.rawText || '').slice(0, 2000);
            const sourceText = String(source.content || '').slice(0, 30000);
            const scoreParts = {
                quote: quoteMatchScore(textUnitText, sourceText),
                lexical: lexicalOverlapScore(textUnitText, sourceText),
                semantic: semanticLiteScore(textUnitText, sourceText),
                entity: entityOverlapScore(textUnit, source),
                location: locationHintScore(textUnit, source)
            };
            const score = Math.round(
                scoreParts.quote * 0.30 +
                scoreParts.lexical * 0.25 +
                scoreParts.semantic * 0.20 +
                scoreParts.entity * 0.15 +
                scoreParts.location * 0.10
            );

            return {
                score: Math.max(0, Math.min(100, score)),
                scoreParts,
                matchedText: anFindMatchedSnippet(textUnitText, sourceText, textUnit)
            };
        }

        function quoteMatchScore(textUnitText, sourceText) {
            const unit = anCompactForMatch(textUnitText);
            const source = anCompactForMatch(sourceText);
            if (!unit || !source) return 0;
            if (source.includes(unit)) return 100;

            const unitLength = unit.length;
            const candidateLengths = [18, 14, 10, 8, 6, 4].filter(length => length < unitLength);
            let bestLength = 0;

            candidateLengths.forEach(length => {
                if (bestLength >= length) return;
                for (let i = 0; i <= unit.length - length; i += Math.max(1, Math.floor(length / 2))) {
                    const fragment = unit.slice(i, i + length);
                    if (source.includes(fragment)) {
                        bestLength = length;
                        break;
                    }
                }
            });

            if (bestLength === 0) return 0;
            return Math.min(95, Math.round((bestLength / Math.max(unitLength, 1)) * 100));
        }

        function lexicalOverlapScore(textUnitText, sourceText) {
            const unitBigrams = anGetBigrams(anCompactForMatch(textUnitText));
            const sourceBigrams = anGetBigrams(anCompactForMatch(sourceText).slice(0, 5000));
            if (unitBigrams.length === 0 || sourceBigrams.length === 0) return 0;
            return anJaccardScore(unitBigrams, sourceBigrams);
        }

        function semanticLiteScore(textUnitText, sourceText) {
            const unitTerms = anExpandSemanticTerms(extractBasicKeywords(textUnitText).concat(anTokenizeChineseTerms(textUnitText)));
            const sourceTerms = anExpandSemanticTerms(extractBasicKeywords(sourceText).concat(anTokenizeChineseTerms(sourceText.slice(0, 5000))));
            if (unitTerms.length === 0 || sourceTerms.length === 0) return 0;
            return anJaccardScore(unitTerms, sourceTerms);
        }

        function entityOverlapScore(textUnit, source) {
            const unitEntities = anExtractLiteEntities(`${textUnit.rawText || ''} ${textUnit.normalizedText || ''}`)
                .concat(textUnit.keywords || []);
            const sourceEntities = anExtractLiteEntities(`${source.title || ''} ${String(source.content || '').slice(0, 8000)}`)
                .concat(extractBasicKeywords(String(source.content || '').slice(0, 5000)));
            if (unitEntities.length === 0 || sourceEntities.length === 0) return 0;
            return anContainmentScore(unitEntities, sourceEntities);
        }

        function locationHintScore(textUnit, source) {
            const title = String(source.title || source.fileName || '');
            const contentHead = String(source.content || '').slice(0, 3000);
            const haystack = title + '\n' + contentHead;
            const hints = []
                .concat(textUnit.book ? [textUnit.book] : [])
                .concat(textUnit.chapter ? [textUnit.chapter] : [])
                .concat(anExtractBookHints(textUnit.rawText || textUnit.normalizedText || ''))
                .concat(textUnit.keywords || []);

            if (hints.length === 0) return 0;
            const score = anContainmentScore(hints, [haystack]);
            return Math.min(100, Math.round(score + (title && hints.some(hint => title.includes(hint)) ? 25 : 0)));
        }

        function generateAlignmentReasons(scoreParts) {
            const reasons = [];
            if (scoreParts.quote >= 80) reasons.push('原文或较长连续片段直接命中。');
            else if (scoreParts.quote >= 35) reasons.push('存在连续短片段命中。');

            if (scoreParts.lexical >= 35) reasons.push('字符词面重合度较高。');
            if (scoreParts.semantic >= 35) reasons.push('关键词扩展后的主题邻近。');
            if (scoreParts.entity >= 35) reasons.push('关键词、人名或地名提示有重合。');
            if (scoreParts.location >= 35) reasons.push('来源标题或正文含书名、篇章、关键词提示。');

            if (reasons.length === 0) {
                reasons.push('轻量规则发现弱相关，可人工复核。');
            }
            return reasons;
        }

        function buildEvidencePacks() {
            const state = anCollectInputToState();
            if (!state) return [];
            if (!anRequireProjectReady('evidence')) return [];
            if (!state.textUnits || state.textUnits.length === 0) {
                renderEvidencePackPreview('<div class="auto-notes-empty">请先完成文本切分。</div>');
                return [];
            }
            if (!state.sources || state.sources.filter(source => String(source.content || '').trim()).length === 0) {
                renderEvidencePackPreview('<div class="auto-notes-empty">请先添加注疏、校勘、论文或札记材料。</div>');
                return [];
            }
            if (!state.alignments || state.alignments.length === 0) {
                buildAlignmentsForAllUnits();
            }

            state.evidencePacks = state.textUnits.map(unit => buildEvidencePackForUnit(unit));
            saveAutoNotesProject();
            renderEvidencePackPreview();
            return state.evidencePacks;
        }

        function buildEvidencePackForUnit(textUnit) {
            const state = window.autoNotesState;
            const accepted = (state.alignments || []).filter(alignment => alignment.textUnitId === textUnit.id && alignment.accepted === true);
            const grouped = groupEvidenceByType(accepted);
            const sourceMetadata = accepted.map(alignment => {
                const source = (state.sources || []).find(item => item.id === alignment.sourceId) || {};
                return {
                    sourceId: alignment.sourceId,
                    sourceTitle: alignment.sourceTitle,
                    sourceType: alignment.sourceType,
                    fileName: source.fileName || '',
                    metadata: source.metadata || {}
                };
            });

            const pack = {
                id: generateAutoNotesId('pack'),
                textUnitId: textUnit.id,
                canonicalText: textUnit.normalizedText || textUnit.rawText || '',
                question: state.researchQuestion || '',
                commentaryEvidence: grouped.commentaryEvidence,
                collationEvidence: grouped.collationEvidence,
                variantEvidence: grouped.variantEvidence,
                researchEvidence: grouped.researchEvidence,
                userNoteEvidence: grouped.userNoteEvidence,
                sourceMetadata,
                confidenceScore: 0
            };
            pack.confidenceScore = calculateEvidencePackConfidence(pack);
            return pack;
        }

        function groupEvidenceByType(alignments) {
            const grouped = {
                commentaryEvidence: [],
                collationEvidence: [],
                variantEvidence: [],
                researchEvidence: [],
                userNoteEvidence: []
            };

            (alignments || []).forEach(alignment => {
                const item = {
                    alignmentId: alignment.id,
                    sourceId: alignment.sourceId,
                    sourceTitle: alignment.sourceTitle,
                    matchedText: alignment.matchedText,
                    score: alignment.score,
                    reasons: alignment.reasons || []
                };

                if (alignment.sourceType === 'commentary') grouped.commentaryEvidence.push(item);
                else if (alignment.sourceType === 'collation') grouped.collationEvidence.push(item);
                else if (alignment.sourceType === 'variant') grouped.variantEvidence.push(item);
                else if (alignment.sourceType === 'userNote') grouped.userNoteEvidence.push(item);
                else grouped.researchEvidence.push(item);
            });

            return grouped;
        }

        function calculateEvidencePackConfidence(pack) {
            const evidence = []
                .concat(pack.commentaryEvidence || [])
                .concat(pack.collationEvidence || [])
                .concat(pack.variantEvidence || [])
                .concat(pack.researchEvidence || [])
                .concat(pack.userNoteEvidence || []);
            if (evidence.length === 0) return 0;

            const avgScore = evidence.reduce((sum, item) => sum + Number(item.score || 0), 0) / evidence.length;
            const typeCount = [
                pack.commentaryEvidence,
                pack.collationEvidence,
                pack.variantEvidence,
                pack.researchEvidence,
                pack.userNoteEvidence
            ].filter(list => list && list.length).length;
            const diversityBonus = Math.min(15, typeCount * 3);
            return Math.min(100, Math.round(avgScore * 0.85 + diversityBonus));
        }

        function renderAlignmentWorkspace() {
            const lowConfidenceToggle = document.getElementById('anShowLowConfidence');
            if (lowConfidenceToggle && window.autoNotesState && window.autoNotesState.settings) {
                lowConfidenceToggle.checked = !!window.autoNotesState.settings.showLowConfidenceEvidence;
            }
            renderAlignmentUnits();
            renderAlignmentCandidates();
            renderEvidencePackPreview();
        }

        function toggleLowConfidenceEvidence(checked) {
            if (!window.autoNotesState) return;
            window.autoNotesState.settings.showLowConfidenceEvidence = !!checked;
            saveAutoNotesProject();
            buildAlignmentsForAllUnits();
        }

        function renderAlignmentUnits() {
            const container = document.getElementById('anAlignUnits');
            if (!container || !window.autoNotesState) return;
            const units = window.autoNotesState.textUnits || [];
            if (units.length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">请先完成文本切分。</div>';
                return;
            }

            if (!window.autoNotesState.selectedUnitId) {
                window.autoNotesState.selectedUnitId = units[0].id;
            }

            container.innerHTML = units.map(unit => {
                const count = (window.autoNotesState.alignments || []).filter(alignment => alignment.textUnitId === unit.id).length;
                return `
                    <button type="button" class="auto-notes-unit auto-notes-unit-button${window.autoNotesState.selectedUnitId === unit.id ? ' active' : ''}" onclick="selectAlignmentUnit('${anEscapeAttr(unit.id)}')">
                        <div class="auto-notes-unit-head">
                            <span>CTU-${String(unit.index).padStart(3, '0')}</span>
                            <span>${count} 条证据</span>
                        </div>
                        <p>${anEscapeHtml(String(unit.normalizedText || unit.rawText || '').slice(0, 120))}</p>
                    </button>
                `;
            }).join('');
        }

        function selectAlignmentUnit(unitId) {
            if (!window.autoNotesState) return;
            window.autoNotesState.selectedUnitId = unitId;
            saveAutoNotesProject();
            renderAlignmentWorkspace();
        }

        function renderAlignmentCandidates() {
            const container = document.getElementById('anEvidenceCandidates');
            if (!container || !window.autoNotesState) return;
            const state = window.autoNotesState;

            if (!state.textUnits || state.textUnits.length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">请先完成文本切分。</div>';
                return;
            }
            if (!state.sources || state.sources.filter(source => String(source.content || '').trim()).length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">请先添加注疏、校勘、论文或札记材料。</div>';
                return;
            }
            if (!state.alignments || state.alignments.length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">暂无候选证据，点击“开始证据对齐”。</div>';
                return;
            }

            const selectedUnitId = state.selectedUnitId || (state.textUnits[0] && state.textUnits[0].id);
            const candidates = state.alignments
                .filter(alignment => alignment.textUnitId === selectedUnitId)
                .sort((a, b) => b.score - a.score);

            if (candidates.length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">当前文本单元暂无候选证据。</div>';
                return;
            }

            container.innerHTML = candidates.map(alignment => `
                <div class="auto-notes-evidence">
                    <div class="auto-notes-evidence-head">
                        <span>${anEscapeHtml(anGetSourceTypeLabel(alignment.sourceType))} · ${anEscapeHtml(alignment.sourceTitle)}</span>
                        <span class="auto-notes-badge">分数 ${alignment.score}</span>
                    </div>
                    <p><strong>命中片段：</strong>${anEscapeHtml(alignment.matchedText || '暂无片段')}</p>
                    <p><strong>对齐原因：</strong>${anEscapeHtml((alignment.reasons || []).join('；'))}</p>
                    <div class="auto-notes-evidence-actions">
                        <span class="auto-notes-badge">${alignment.accepted === true ? '已采纳' : alignment.accepted === false ? '候选/已排除' : '待复核'}</span>
                        <button type="button" class="auto-notes-small-btn" onclick="setAlignmentAccepted('${anEscapeAttr(alignment.id)}', true)">采纳</button>
                        <button type="button" class="auto-notes-small-btn" onclick="setAlignmentAccepted('${anEscapeAttr(alignment.id)}', false)">排除</button>
                    </div>
                </div>
            `).join('');
        }

        function setAlignmentAccepted(alignmentId, accepted) {
            const alignment = window.autoNotesState && window.autoNotesState.alignments.find(item => item.id === alignmentId);
            if (!alignment) return;
            alignment.accepted = accepted;
            saveAutoNotesProject();
            renderAlignmentCandidates();
            renderEvidencePackPreview();
            if (typeof renderAutoNotesCitations === 'function') {
                renderAutoNotesCitations();
            }
        }

        function renderEvidencePackPreview(htmlOverride) {
            const container = document.getElementById('anEvidencePackPreview');
            if (!container) return;
            if (htmlOverride) {
                container.innerHTML = htmlOverride;
                return;
            }

            const packs = window.autoNotesState ? window.autoNotesState.evidencePacks || [] : [];
            if (packs.length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">尚未构建证据包。</div>';
                return;
            }

            container.innerHTML = packs.slice(0, 8).map(pack => {
                const count = []
                    .concat(pack.commentaryEvidence || [])
                    .concat(pack.collationEvidence || [])
                    .concat(pack.variantEvidence || [])
                    .concat(pack.researchEvidence || [])
                    .concat(pack.userNoteEvidence || []).length;
                return `
                    <div class="auto-notes-output-card">
                        <div class="auto-notes-output-card-head">
                            <span>${anEscapeHtml(pack.textUnitId)}</span>
                            <span class="auto-notes-badge">可信度 ${pack.confidenceScore}</span>
                        </div>
                        <p>${anEscapeHtml(String(pack.canonicalText || '').slice(0, 160))}</p>
                        <span class="auto-notes-badge">证据 ${count} 条</span>
                    </div>
                `;
            }).join('');
        }

        if (!window.AutoNotesLLMAdapter) {
            window.AutoNotesLLMAdapter = {
                __autoNotesLocal: false,
                async generateNote(evidencePack, options) {
                    const noteType = classifyNoteType(evidencePack, options && options.noteType);
                    if (typeof callAutoNotesLLM === 'function') {
                        try {
                            const result = await callAutoNotesLLM('generate_reading_note', {
                                evidencePack,
                                noteType,
                                project: {
                                    projectId: window.autoNotesState && window.autoNotesState.projectId,
                                    researchQuestion: window.autoNotesState && window.autoNotesState.researchQuestion
                                }
                            }, {
                                expectJson: true,
                                loadingMessage: 'AI 正在生成札记'
                            });
                            if (result && typeof result === 'object') {
                                return {
                                    noteType: result.noteType || noteType,
                                    body: result.body || result.content || generateTraceableNoteBody(evidencePack, result.noteType || noteType)
                                };
                            }
                            if (typeof result === 'string') {
                                return { noteType, body: result };
                            }
                        } catch (error) {
                            console.warn('札记 AI 生成失败，已回退到本地规则生成器：', error.message || error);
                            alert('AI 札记生成失败，已使用本地规则生成器生成草稿：' + (error.message || error));
                        }
                    }
                    return {
                        noteType,
                        body: generateTraceableNoteBody(evidencePack, noteType)
                    };
                }
            };
        }

        function classifyNoteType(evidencePack, userSelectedType) {
            if (userSelectedType && userSelectedType !== 'auto') return userSelectedType;
            const pack = evidencePack || {};
            const collationCount = (pack.collationEvidence || []).length;
            const variantCount = (pack.variantEvidence || []).length;
            const commentaryCount = (pack.commentaryEvidence || []).length;
            const researchCount = (pack.researchEvidence || []).length;
            const content = anEvidencePackText(pack);

            if (collationCount + variantCount >= 2 || collationCount > commentaryCount + researchCount || variantCount > commentaryCount + researchCount) {
                return variantCount > collationCount ? 'edition' : 'collation';
            }
            if (commentaryCount >= Math.max(1, collationCount + variantCount, researchCount)) return 'commentary';
            if (anContainsAny(content, ['礼制', '官制', '井田', '宗法', '封建', '郡县', '制度', '职官'])) return 'institution';
            if (anContainsAny(content, ['鲁', '齐', '卫', '宋', '郑', '晋', '楚', '周', '秦', '地', '城', '邑', '国都'])) return 'geography';
            if (anContainsAny(content, ['孔子', '孟子', '颜回', '子路', '子贡', '曾子', '周公', '君王', '诸侯'])) return 'person';
            if (researchCount > 0 && anContainsAny(content, ['义理', '思想', '政治', '礼', '仁义', '仁', '道', '性', '德', '天命'])) return 'philosophy';
            return researchCount > 0 ? 'comprehensive' : 'exegesis';
        }

        async function generateNotesFromEvidencePacks() {
            const state = anCollectInputToState();
            if (!state) return [];
            if (!anRequireProjectReady('notes')) return [];
            if (!state.textUnits || state.textUnits.length === 0) {
                alert('请先完成文本切分。');
                return [];
            }

            const selectedType = anGetValue('anNoteType', anGetSetting('noteType', 'auto'));
            const notes = [];
            for (const pack of state.evidencePacks) {
                notes.push(await generateNoteFromEvidencePack(pack, { noteType: selectedType }));
            }
            state.notes = notes;
            state.selectedNoteId = notes[0] ? notes[0].id : '';
            saveAutoNotesProject();
            renderGeneratedNotes();
            renderNoteEvidenceCitations();
            return notes;
        }

        async function generateNoteFromEvidencePack(pack, options = {}) {
            const now = new Date().toISOString();
            const adapter = window.AutoNotesLLMAdapter;
            let generated = null;

            if (adapter && typeof adapter.generateNote === 'function') {
                generated = await adapter.generateNote(pack, options);
            }
            if (typeof generated === 'string') {
                generated = { body: generated };
            }

            const noteType = (generated && generated.noteType) || classifyNoteType(pack, options.noteType);
            const body = (generated && generated.body) || generateTraceableNoteBody(pack, noteType);
            const evidenceReferences = extractEvidenceReferences(pack);
            const textUnit = window.autoNotesState.textUnits.find(unit => unit.id === pack.textUnitId) || {};

            return {
                id: generateAutoNotesId('note'),
                textUnitId: pack.textUnitId,
                noteType,
                title: anBuildNoteTitle(pack, noteType),
                originalText: pack.canonicalText || textUnit.rawText || '',
                summary: anBuildNoteSummary(pack, noteType, evidenceReferences),
                body,
                evidenceIds: evidenceReferences.map(item => item.alignmentId).filter(Boolean),
                evidenceReferences,
                confidence: Number(((pack.confidenceScore || 0) / 100).toFixed(2)),
                reviewStatus: 'draft',
                createdAt: now,
                updatedAt: now
            };
        }

        function generateTraceableNoteBody(pack, noteType) {
            const noteTypeLabel = anGetNoteTypeLabel(noteType);
            const evidenceReferences = extractEvidenceReferences(pack);
            const evidenceList = evidenceReferences.length
                ? evidenceReferences.map(item => `${item.evidenceIndex}. [${anGetSourceTypeLabel(item.sourceType)}] ${item.sourceTitle}（分数 ${item.score}）：${item.matchedText}`).join('\n')
                : '当前札记缺少外部证据，仅基于原文与用户问题生成，需人工校对。';
            const evidenceSummary = evidenceReferences.length
                ? anSummarizeEvidenceReferences(evidenceReferences)
                : '暂无外部证据可综述。';
            const doubts = evidenceReferences.length
                ? '- 对齐仅由本地轻量规则给出，需核对原始出处与上下文。\n- 若同一文本单元存在版本异文，应补充校勘材料。'
                : '- 缺少外部证据。\n- 需补充注疏、校勘、论文或个人札记材料后再判断。';

            return [
                `# ${anBuildNoteTitle(pack, noteType)}`,
                '',
                `## 1. 标题`,
                anBuildNoteTitle(pack, noteType),
                '',
                `## 2. 原文`,
                pack.canonicalText || '（未提供原文）',
                '',
                `## 3. 札记类型`,
                noteTypeLabel,
                '',
                `## 4. 核心问题`,
                pack.question || '（未填写研究问题）',
                '',
                `## 5. 文本观察`,
                anBuildTextObservation(pack),
                '',
                `## 6. 证据综述`,
                evidenceSummary,
                '',
                `## 7. 对齐证据列表`,
                evidenceList,
                '',
                `## 8. 初步解释`,
                anBuildInitialInterpretation(pack, noteType, evidenceReferences),
                '',
                `## 9. 可疑点 / 待校对项`,
                doubts,
                '',
                `## 10. 可信度评分`,
                `${pack.confidenceScore || 0}/100`
            ].join('\n');
        }

        function extractEvidenceReferences(pack) {
            const typedLists = [
                ['commentary', pack.commentaryEvidence || []],
                ['collation', pack.collationEvidence || []],
                ['variant', pack.variantEvidence || []],
                ['paper', pack.researchEvidence || []],
                ['userNote', pack.userNoteEvidence || []]
            ];
            const refs = [];
            typedLists.forEach(([sourceType, list]) => {
                list.forEach(item => {
                    refs.push({
                        evidenceIndex: refs.length + 1,
                        alignmentId: item.alignmentId || '',
                        sourceTitle: item.sourceTitle || '未命名来源',
                        sourceType,
                        matchedText: item.matchedText || '',
                        score: item.score || 0
                    });
                });
            });
            return refs;
        }

        function renderGeneratedNotes() {
            const container = document.getElementById('anGeneratedNotes');
            const preview = document.getElementById('anNotePreview');
            if (!window.autoNotesState) return;
            const notes = window.autoNotesState.notes || [];
            if (preview) {
                preview.value = notes[0] ? notes[0].body : '';
            }
            if (!container) return;

            if (notes.length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">暂无札记。请先生成札记。</div>';
                return;
            }

            container.innerHTML = notes.map(note => `
                <div class="auto-notes-output-card" data-note-id="${anEscapeAttr(note.id)}">
                    <div class="auto-notes-output-card-head">
                        <span>${anEscapeHtml(anGetNoteTypeLabel(note.noteType))}</span>
                        <span class="auto-notes-badge">${anEscapeHtml(anGetReviewStatusLabel(note.reviewStatus))}</span>
                    </div>
                    <input class="doc-name-input auto-notes-edit-field" value="${anEscapeHtml(note.title)}" oninput="updateNote('${anEscapeAttr(note.id)}', { title: this.value })">
                    <textarea class="textarea-area academic-body auto-notes-note-editor" oninput="updateNote('${anEscapeAttr(note.id)}', { body: this.value })">${anEscapeHtml(note.body)}</textarea>
                    <div class="auto-notes-evidence-actions">
                        <select class="doc-name-input" onchange="markNoteReviewed('${anEscapeAttr(note.id)}', this.value)">
                            ${anReviewStatusOptions(note.reviewStatus)}
                        </select>
                        <button type="button" class="auto-notes-small-btn" onclick="selectGeneratedNote('${anEscapeAttr(note.id)}')">查看证据</button>
                        <button type="button" class="auto-notes-small-btn" onclick="editNote('${anEscapeAttr(note.id)}')">编辑</button>
                        <button type="button" class="auto-notes-small-btn" onclick="markNoteReviewed('${anEscapeAttr(note.id)}', 'reviewed')">已校对</button>
                        <button type="button" class="auto-notes-small-btn" onclick="markNoteReviewed('${anEscapeAttr(note.id)}', 'questionable')">存疑</button>
                        <button type="button" class="auto-notes-small-btn" onclick="markNoteReviewed('${anEscapeAttr(note.id)}', 'discarded')">废弃</button>
                    </div>
                </div>
            `).join('');
        }

        function createCardsFromNotes() {
            if (!window.autoNotesState) return [];
            const notes = window.autoNotesState.notes || [];
            if (notes.length === 0) {
                renderAutoNoteCards('<div class="auto-notes-empty">暂无札记。请先生成札记。</div>');
                return [];
            }

            const cards = [];
            notes.forEach(note => {
                cards.push(createCardFromNote(note));
                (note.evidenceReferences || []).slice(0, 3).forEach(ref => {
                    cards.push(anCreateEvidenceCard(note, ref));
                });
            });
            window.autoNotesState.cards = cards;
            saveAutoNotesProject();
            renderAutoNoteCards();
            return cards;
        }

        function createCardFromNote(note) {
            return {
                id: generateAutoNotesId('card'),
                noteId: note.id,
                cardType: anCardTypeFromNoteType(note.noteType, note),
                title: note.title || '未命名札记卡片',
                target: note.originalText || '',
                summary: note.summary || anFirstMeaningfulLine(note.body),
                detail: note.body || '',
                evidenceIds: note.evidenceIds || [],
                tags: [anGetNoteTypeLabel(note.noteType), anGetReviewStatusLabel(note.reviewStatus)],
                reviewStatus: 'draft'
            };
        }

        function renderAutoNoteCards(htmlOverride) {
            const container = document.getElementById('anNoteCards');
            if (!container) return;
            if (htmlOverride) {
                container.innerHTML = htmlOverride;
                return;
            }

            const cards = window.autoNotesState ? window.autoNotesState.cards || [] : [];
            if (cards.length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">暂无卡片。生成札记后可生成卡片。</div>';
                return;
            }

            container.innerHTML = cards.map(card => `
                <div class="auto-notes-output-card" data-card-id="${anEscapeAttr(card.id)}">
                    <div class="auto-notes-output-card-head">
                        <span>${anEscapeHtml(anGetCardTypeLabel(card.cardType))}</span>
                        <span class="auto-notes-badge">${anEscapeHtml(anGetReviewStatusLabel(card.reviewStatus))}</span>
                    </div>
                    <input class="doc-name-input auto-notes-edit-field" value="${anEscapeHtml(card.title)}" oninput="updateCard('${anEscapeAttr(card.id)}', { title: this.value })">
                    <input class="doc-name-input auto-notes-edit-field" value="${anEscapeHtml(card.summary || '')}" placeholder="摘要" oninput="updateCard('${anEscapeAttr(card.id)}', { summary: this.value })">
                    <textarea class="textarea-area auto-notes-card-editor" oninput="updateCard('${anEscapeAttr(card.id)}', { detail: this.value })">${anEscapeHtml(card.detail)}</textarea>
                    <p><strong>对应原文：</strong>${anEscapeHtml(card.target || '（无）')}</p>
                    <p><strong>摘要：</strong>${anEscapeHtml(card.summary || '（无）')}</p>
                    <span class="auto-notes-badge">证据 ${(card.evidenceIds || []).length} 条</span>
                    <div class="auto-notes-evidence-actions">
                        <select class="doc-name-input" onchange="markCardReviewed('${anEscapeAttr(card.id)}', this.value)">
                            ${anReviewStatusOptions(card.reviewStatus)}
                        </select>
                        <button type="button" class="auto-notes-small-btn" onclick="editCard('${anEscapeAttr(card.id)}')">编辑</button>
                        <button type="button" class="auto-notes-small-btn" onclick="markCardReviewed('${anEscapeAttr(card.id)}', 'reviewed')">已校对</button>
                        <button type="button" class="auto-notes-delete-btn" onclick="deleteCard('${anEscapeAttr(card.id)}')">删除</button>
                    </div>
                </div>
            `).join('');
        }

        function markNoteReviewed(noteId, status = 'reviewed') {
            updateNote(noteId, { reviewStatus: status }, true);
        }

        function selectGeneratedNote(noteId) {
            if (!window.autoNotesState) return;
            window.autoNotesState.selectedNoteId = noteId;
            const note = window.autoNotesState.notes.find(item => item.id === noteId);
            const preview = document.getElementById('anNotePreview');
            if (preview && note) preview.value = note.body || '';
            saveAutoNotesProject();
            renderNoteEvidenceCitations();
        }

        function editNote(noteId) {
            selectGeneratedNote(noteId);
            const card = Array.from(document.querySelectorAll('[data-note-id]')).find(el => el.dataset.noteId === noteId);
            const textarea = card ? card.querySelector('textarea') : null;
            if (textarea) textarea.focus();
        }

        function updateNote(noteId, fields, shouldRender = false) {
            const note = window.autoNotesState && window.autoNotesState.notes.find(item => item.id === noteId);
            if (!note) return;
            Object.assign(note, fields || {}, { updatedAt: new Date().toISOString() });
            if (fields && fields.body) {
                note.summary = anFirstMeaningfulLine(fields.body);
                if (window.autoNotesState.selectedNoteId === noteId) {
                    const preview = document.getElementById('anNotePreview');
                    if (preview) preview.value = fields.body;
                }
            }
            if (typeof scheduleAutoNotesAutosave === 'function') {
                scheduleAutoNotesAutosave();
            } else {
                saveAutoNotesProject();
            }
            if (shouldRender) renderGeneratedNotes();
        }

        function markCardReviewed(cardId, status = 'reviewed') {
            updateCard(cardId, { reviewStatus: status }, true);
        }

        function editCard(cardId) {
            const card = Array.from(document.querySelectorAll('[data-card-id]')).find(el => el.dataset.cardId === cardId);
            const textarea = card ? card.querySelector('textarea') : null;
            if (textarea) textarea.focus();
        }

        function updateCard(cardId, fields, shouldRender = false) {
            const card = window.autoNotesState && window.autoNotesState.cards.find(item => item.id === cardId);
            if (!card) return;
            Object.assign(card, fields || {});
            if (typeof scheduleAutoNotesAutosave === 'function') {
                scheduleAutoNotesAutosave();
            } else {
                saveAutoNotesProject();
            }
            if (shouldRender) renderAutoNoteCards();
        }

        function deleteCard(cardId) {
            if (!window.autoNotesState) return;
            window.autoNotesState.cards = (window.autoNotesState.cards || []).filter(card => card.id !== cardId);
            saveAutoNotesProject();
            renderAutoNoteCards();
        }

        function renderNoteEvidenceCitations() {
            const container = document.getElementById('anEvidenceCitations');
            if (!container || !window.autoNotesState) return;
            const note = (window.autoNotesState.notes || []).find(item => item.id === window.autoNotesState.selectedNoteId) || window.autoNotesState.notes[0];
            const refs = note ? note.evidenceReferences || [] : [];
            if (refs.length === 0) {
                container.innerHTML = '<div class="auto-notes-empty">当前札记缺少外部证据，仅基于原文与用户问题生成，需人工校对。</div>';
                return;
            }
            container.innerHTML = refs.map(ref => `
                <div class="auto-notes-evidence">
                    <div class="auto-notes-evidence-head">
                        <span>${ref.evidenceIndex}. ${anEscapeHtml(anGetSourceTypeLabel(ref.sourceType))} · ${anEscapeHtml(ref.sourceTitle)}</span>
                        <span class="auto-notes-badge">分数 ${ref.score}</span>
                    </div>
                    <p>${anEscapeHtml(ref.matchedText || '暂无片段')}</p>
                </div>
            `).join('');
        }

        function exportAutoNotesAsJSON() {
            const state = anCollectInputToState();
            if (!state) return;
            const payload = anBuildExportPayload(state);
            downloadAutoNotesFile(`${anSafeFilename(payload.projectTitle)}.json`, JSON.stringify(payload, null, 2), 'application/json');
        }

        function exportAutoNotesAsMarkdown() {
            const state = anCollectInputToState();
            if (!state || !anRequireProjectReady('export')) return;
            downloadAutoNotesFile(`${anSafeFilename(state.projectTitle || '札记自动梳理')}.md`, anBuildMarkdownExport(state), 'text/markdown');
        }

        function downloadAutoNotesFile(filename, content, mimeType) {
            try {
                const blob = new Blob([content], { type: `${mimeType || 'text/plain'};charset=utf-8` });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } catch (error) {
                alert('导出文件失败：' + (error.message || error));
            }
        }

        function importAutoNotesFromJSONFile(input) {
            const file = input && input.files && input.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const data = JSON.parse(event.target.result || '{}');
                    const result = validateAutoNotesImport(data);
                    if (!result.valid) {
                        alert('导入失败：' + result.message);
                        return;
                    }
                    const imported = anNormalizeImportedAutoNotesProject(data);
                    window.autoNotesState = createAutoNotesProject({
                        ...imported,
                        projectId: imported.projectId || generateAutoNotesId('project'),
                        updatedAt: new Date().toISOString()
                    });
                    saveAutoNotesProject();
                    anRefreshAutoNotesUI();
                    alert('札记项目已导入');
                } catch (error) {
                    alert('导入 JSON 错误：' + (error.message || error));
                } finally {
                    if (input) input.value = '';
                }
            };
            reader.onerror = function() {
                alert('读取导入文件失败');
                if (input) input.value = '';
            };
            reader.readAsText(file, 'utf-8');
        }

        function validateAutoNotesImport(data) {
            const target = anNormalizeImportedAutoNotesProject(data);
            if (!target || typeof target !== 'object') {
                return { valid: false, message: 'JSON 根对象无效。' };
            }

            const arrayFields = ['sources', 'textUnits', 'alignments', 'evidencePacks', 'notes', 'cards', 'fragments'];
            const invalidArrays = arrayFields.filter(field => target[field] !== undefined && !Array.isArray(target[field]));
            if (invalidArrays.length) {
                return {
                    valid: false,
                    message: `字段格式错误：${invalidArrays.join('、')} 必须是数组`
                };
            }

            const sources = Array.isArray(target.sources) ? target.sources : [];
            const textUnits = Array.isArray(target.textUnits) ? target.textUnits : [];
            const notes = Array.isArray(target.notes) ? target.notes : [];
            const cards = Array.isArray(target.cards) ? target.cards : [];
            const invalidSource = sources.find(source => !source.id || !('type' in source) || !('title' in source) || !('content' in source));
            if (invalidSource) return { valid: false, message: 'sources 中存在缺少 id/type/title/content 的材料。' };
            const invalidUnit = textUnits.find(unit => !unit.id || !('rawText' in unit) || !('normalizedText' in unit));
            if (invalidUnit) return { valid: false, message: 'textUnits 中存在缺少 id/rawText/normalizedText 的文本单元。' };
            const invalidNote = notes.find(note => !note.id || !('body' in note) || !('reviewStatus' in note));
            if (invalidNote) return { valid: false, message: 'notes 中存在缺少 id/body/reviewStatus 的札记。' };
            const invalidCard = cards.find(card => !card.id || !('cardType' in card) || !('title' in card));
            if (invalidCard) return { valid: false, message: 'cards 中存在缺少 id/cardType/title 的卡片。' };

            return { valid: true, message: '' };
        }

        function anNormalizeImportedAutoNotesProject(data) {
            if (!data || typeof data !== 'object') return null;
            if (data.autoNotesProject && data.autoNotesProject.metadata && data.autoNotesProject.inputs) {
                return anFlattenAutoNotesProject(data.autoNotesProject, data.legacyState || {});
            }
            if (data.metadata && data.inputs && data.readingNote) {
                return anFlattenAutoNotesProject(data, {});
            }
            if (data.legacyState && typeof data.legacyState === 'object') {
                return data.legacyState;
            }
            return data.autoNotesProject || data;
        }

        function anFlattenAutoNotesProject(project, legacy = {}) {
            const metadata = project.metadata || {};
            const inputs = project.inputs || {};
            const readingNote = project.readingNote || {};
            const databaseMode = project.databaseMode || {};
            const analysisMode = project.analysisMode || {};
            const now = new Date().toISOString();
            const analysisResults = {
                ...(analysisMode.wordCloud ? { word_cloud: analysisMode.wordCloud } : {}),
                ...(analysisMode.comparisonTable ? { comparison_table: analysisMode.comparisonTable } : {}),
                ...(analysisMode.mindMap ? { mind_map: analysisMode.mindMap } : {}),
                ...(analysisMode.argumentStructure ? { argument_structure: analysisMode.argumentStructure } : {}),
                ...(analysisMode.knowledgeGraph ? { knowledge_graph: analysisMode.knowledgeGraph } : {})
            };
            Object.keys(analysisResults).forEach(type => {
                const item = analysisResults[type];
                if (item && !item.data) {
                    analysisResults[type] = {
                        type,
                        data: item,
                        rawJson: JSON.stringify(item, null, 2),
                        generatedAt: metadata.updatedAt || now
                    };
                }
            });

            return {
                ...legacy,
                projectId: metadata.projectId || legacy.projectId || generateAutoNotesId('project'),
                projectTitle: metadata.title || legacy.projectTitle || '未命名札记项目',
                createdAt: metadata.createdAt || legacy.createdAt || now,
                updatedAt: metadata.updatedAt || legacy.updatedAt || now,
                baseText: inputs.baseText || legacy.baseText || '',
                researchQuestion: metadata.researchQuestion || legacy.researchQuestion || '',
                keywordOrConcept: inputs.keywordOrConcept || legacy.keywordOrConcept || '',
                firstDraftNote: readingNote.markdown || legacy.firstDraftNote || '',
                readingNoteConfirmed: !!readingNote.userConfirmed || !!legacy.readingNoteConfirmed,
                readingNoteConfirmedAt: readingNote.confirmedAt || legacy.readingNoteConfirmedAt || '',
                sources: Array.isArray(inputs.sources) ? inputs.sources : (Array.isArray(legacy.sources) ? legacy.sources : []),
                fragments: Array.isArray(project.fragments) ? project.fragments : (Array.isArray(legacy.fragments) ? legacy.fragments : []),
                databaseJsonRaw: typeof databaseMode.resultJson === 'string'
                    ? databaseMode.resultJson
                    : (databaseMode.resultJson ? JSON.stringify(databaseMode.resultJson, null, 2) : legacy.databaseJsonRaw || ''),
                databaseJsonValidated: databaseMode.validationErrors
                    ? { valid: databaseMode.validationErrors.length === 0, error: databaseMode.validationErrors.join('；') }
                    : legacy.databaseJsonValidated || null,
                analysisResults: Object.keys(analysisResults).length ? analysisResults : (legacy.analysisResults || {}),
                settings: {
                    ...(legacy.settings || {}),
                    currentStep: anStageToStep(metadata.stage || (legacy.settings && legacy.settings.currentStep) || 1),
                    uploadedFiles: Array.isArray(inputs.uploadedFiles) ? inputs.uploadedFiles : ((legacy.settings && legacy.settings.uploadedFiles) || []),
                    databaseTemplate: databaseMode.template || (legacy.settings && legacy.settings.databaseTemplate) || '',
                    analysisType: analysisMode.selectedType || (legacy.settings && legacy.settings.analysisType) || 'word_cloud'
                },
                textUnits: Array.isArray(legacy.textUnits) ? legacy.textUnits : [],
                alignments: Array.isArray(legacy.alignments) ? legacy.alignments : [],
                evidencePacks: Array.isArray(legacy.evidencePacks) ? legacy.evidencePacks : [],
                notes: Array.isArray(legacy.notes) ? legacy.notes : [],
                cards: Array.isArray(legacy.cards) ? legacy.cards : []
            };
        }

        function anStageToStep(stage) {
            if (typeof stage === 'number') return Math.max(1, Math.min(3, stage));
            const text = String(stage || '');
            if (text.includes('三') || text.includes('3')) return 3;
            if (text.includes('二') || text.includes('2')) return 2;
            return 1;
        }

        function saveAutoNotesToKnowledgeBase() {
            const state = anCollectInputToState();
            if (!state || !anRequireProjectReady('knowledge')) return false;

            const now = new Date().toISOString();
            const docId = `auto_notes_${state.projectId}`;
            const stageLabel = anGetWorkflowStageLabel(state);
            const knowledgeItem = {
                id: docId,
                type: 'auto_notes_project',
                name: state.projectTitle || '札记自动梳理项目',
                projectTitle: state.projectTitle || '札记自动梳理项目',
                researchQuestion: state.researchQuestion || '',
                noteCount: (state.notes || []).length,
                cardCount: (state.cards || []).length,
                currentStage: stageLabel,
                createdAt: state.createdAt || now,
                updatedAt: now,
                versions: [{
                    content: anBuildMarkdownExport(state).slice(0, 50000),
                    formattedContent: null,
                    review: `研究问题：${state.researchQuestion || '（未填写）'}；札记 ${(state.notes || []).length} 条；卡片 ${(state.cards || []).length} 张；当前阶段：${stageLabel}；创建时间：${state.createdAt || now}；更新时间：${now}`,
                    score: '',
                    timestamp: now,
                    autoNotesProjectId: state.projectId,
                    data: anBuildExportPayload(state)
                }]
            };

            try {
                if (typeof getKnowledgeBase === 'function' && typeof saveKnowledgeBase === 'function') {
                    const kb = getKnowledgeBase();
                    const existingIndex = kb.findIndex(item => item.id === docId);
                    if (existingIndex >= 0) {
                        const existing = kb[existingIndex];
                        knowledgeItem.createdAt = existing.createdAt || knowledgeItem.createdAt;
                        knowledgeItem.versions = (existing.versions || []).concat(knowledgeItem.versions).slice(-5);
                        kb[existingIndex] = knowledgeItem;
                    } else {
                        kb.unshift(knowledgeItem);
                    }
                    saveKnowledgeBase(kb);
                    if (typeof renderKnowledgeBase === 'function') renderKnowledgeBase();
                } else {
                    const fallbackKey = 'lantai_auto_notes_knowledge_items';
                    const saved = JSON.parse(localStorage.getItem(fallbackKey) || '[]');
                    const next = saved.filter(item => item.id !== docId);
                    next.unshift(knowledgeItem);
                    localStorage.setItem(fallbackKey, JSON.stringify(next));
                }
                alert('已保存到本地知识库');
                return true;
            } catch (error) {
                alert('保存到知识库失败，可能是 localStorage 空间不足：' + (error.message || error));
                return false;
            }
        }

        function anBuildExportPayload(state) {
            const autoNotesProject = anBuildAutoNotesProject(state);
            return {
                exportType: 'lantai_auto_notes_project',
                schemaVersion: 2,
                exportedAt: new Date().toISOString(),
                projectId: state.projectId,
                projectTitle: state.projectTitle,
                autoNotesProject,
                legacyState: {
                    ...state,
                    settings: state.settings || {}
                },
                createdAt: state.createdAt,
                updatedAt: state.updatedAt,
                metadata: {
                    projectId: state.projectId,
                    projectTitle: state.projectTitle,
                    createdAt: state.createdAt,
                    updatedAt: state.updatedAt,
                    researchQuestion: state.researchQuestion,
                    keywordOrConcept: state.keywordOrConcept,
                    fragmentCount: (state.fragments || []).length,
                    databaseJsonValid: !!(state.databaseJsonValidated && state.databaseJsonValidated.valid),
                    analysisResultTypes: Object.keys(state.analysisResults || {}),
                    sourceCount: (state.sources || []).length,
                    textUnitCount: (state.textUnits || []).length,
                    noteCount: (state.notes || []).length,
                    cardCount: (state.cards || []).length
                },
                baseText: state.baseText,
                researchQuestion: state.researchQuestion,
                keywordOrConcept: state.keywordOrConcept || '',
                firstDraftNote: state.firstDraftNote || '',
                firstDraftMeta: state.firstDraftMeta || null,
                fragments: state.fragments || [],
                fragmentsConfirmedAt: state.fragmentsConfirmedAt || '',
                databaseJsonRaw: state.databaseJsonRaw || '',
                databaseJsonValidated: state.databaseJsonValidated || null,
                analysisResults: state.analysisResults || {},
                settings: state.settings || {},
                sources: state.sources || [],
                textUnits: state.textUnits || [],
                alignments: state.alignments || [],
                evidencePacks: state.evidencePacks || [],
                notes: state.notes || [],
                cards: state.cards || []
            };
        }

        function anBuildAutoNotesProject(state) {
            const stage = anGetWorkflowStage(state);
            return {
                metadata: {
                    projectId: state.projectId,
                    title: state.projectTitle || '札记自动梳理项目',
                    researchQuestion: state.researchQuestion || '',
                    createdAt: state.createdAt,
                    updatedAt: state.updatedAt,
                    stage,
                    locale: 'zh-CN'
                },
                inputs: {
                    baseText: state.baseText || '',
                    keywordOrConcept: state.keywordOrConcept || '',
                    sources: state.sources || [],
                    uploadedFiles: (state.settings && state.settings.uploadedFiles) || []
                },
                readingNote: {
                    markdown: state.firstDraftNote || '',
                    userConfirmed: !!state.readingNoteConfirmed || !!state.readingNoteConfirmedAt,
                    confirmedAt: state.readingNoteConfirmedAt || ''
                },
                fragments: state.fragments || [],
                databaseMode: {
                    template: (state.settings && state.settings.databaseTemplate) || '',
                    resultJson: anParseDatabaseJsonForExport(state.databaseJsonRaw || '') || state.databaseJsonRaw || '',
                    validationErrors: state.databaseJsonValidated && state.databaseJsonValidated.valid === false
                        ? [state.databaseJsonValidated.error || 'JSON 校验失败']
                        : []
                },
                analysisMode: {
                    selectedType: (state.settings && state.settings.analysisType) || 'word_cloud',
                    wordCloud: anGetAnalysisProjectData(state, 'word_cloud'),
                    comparisonTable: anGetAnalysisProjectData(state, 'comparison_table'),
                    mindMap: anGetAnalysisProjectData(state, 'mind_map'),
                    argumentStructure: anGetAnalysisProjectData(state, 'argument_structure'),
                    knowledgeGraph: anGetAnalysisProjectData(state, 'knowledge_graph')
                },
                exports: {
                    exportedAt: new Date().toISOString(),
                    available: ['project_json', 'reading_note_markdown', 'fragments_markdown', 'database_json', 'analysis_json']
                }
            };
        }

        function anGetAnalysisProjectData(state, type) {
            const item = state.analysisResults && state.analysisResults[type];
            return item ? { data: item.data || {}, rawJson: item.rawJson || '', generatedAt: item.generatedAt || '' } : null;
        }

        function anGetWorkflowStage(state) {
            const currentStep = Number(state.settings && state.settings.currentStep) || 1;
            if (currentStep >= 3 || state.databaseJsonRaw || Object.keys(state.analysisResults || {}).length) return 3;
            if ((state.fragments || []).length || state.fragmentsConfirmedAt) return 2;
            return 1;
        }

        function anGetWorkflowStageLabel(state) {
            const stage = anGetWorkflowStage(state);
            if (stage === 3) return '第三阶段：深度处理';
            if (stage === 2) return '第二阶段：碎片化札记';
            return '第一阶段：准备材料';
        }

        function anBuildMarkdownExport(state) {
            const lines = [
                `# ${state.projectTitle || '札记自动梳理项目'}`,
                '',
                '## 研究问题',
                state.researchQuestion || '（未填写）',
                '',
                '## 核心概念 / 检索词',
                state.keywordOrConcept || '（未填写）',
                '',
                '## 第一版读书会札记',
                state.firstDraftNote || '（未生成第一版札记）',
                '',
                '## 碎片化札记',
                ...(state.fragments && state.fragments.length
                    ? state.fragments.map(fragment => `### ${fragment.fragmentId} ${fragment.title || ''}\n- 分类：${fragment.category || '其他'}\n- 关键词：${(fragment.keywords || []).join('、') || '（无）'}\n- 来源线索：${(fragment.sourceRefs || []).join('；') || '（无）'}\n\n${fragment.noteText || ''}`)
                    : ['（未生成 fragments）']),
                '',
                '## 数据库 JSON',
                state.databaseJsonRaw || '（未生成数据库 JSON）',
                '',
                '## 深度分析结果',
                ...(Object.keys(state.analysisResults || {}).length
                    ? Object.keys(state.analysisResults || {}).map(type => `### ${type}\n\n\`\`\`json\n${state.analysisResults[type].rawJson || JSON.stringify(state.analysisResults[type].data || {}, null, 2)}\n\`\`\``)
                    : ['（未生成深度分析结果）']),
                '',
                '## 原文文本单元',
                ...(state.textUnits && state.textUnits.length
                    ? state.textUnits.map(unit => `- CTU-${String(unit.index || '').padStart(3, '0')}：${unit.normalizedText || unit.rawText || ''}`)
                    : ['（未生成文本单元）']),
                '',
                '## 证据包',
                ...(state.evidencePacks && state.evidencePacks.length
                    ? state.evidencePacks.map(pack => {
                        const count = []
                            .concat(pack.commentaryEvidence || [])
                            .concat(pack.collationEvidence || [])
                            .concat(pack.variantEvidence || [])
                            .concat(pack.researchEvidence || [])
                            .concat(pack.userNoteEvidence || []).length;
                        return `- ${pack.textUnitId}：可信度 ${pack.confidenceScore || 0}/100，证据 ${count} 条`;
                    })
                    : ['（未构建证据包）']),
                '',
                '## 生成札记',
                ...(state.notes && state.notes.length
                    ? state.notes.map(note => `${note.body || ''}\n\n状态：${anGetReviewStatusLabel(note.reviewStatus)}`)
                    : ['（未生成札记）']),
                '',
                '## 结构化卡片',
                ...(state.cards && state.cards.length
                    ? state.cards.map(card => `### ${card.title}\n- 类型：${anGetCardTypeLabel(card.cardType)}\n- 对应原文：${card.target || '（无）'}\n- 摘要：${card.summary || '（无）'}\n- 状态：${anGetReviewStatusLabel(card.reviewStatus)}\n\n${card.detail || ''}`)
                    : ['（未生成卡片）']),
                '',
                '## 待校对项',
                ...anCollectReviewTodos(state)
            ];
            return lines.join('\n');
        }

        function anCollectReviewTodos(state) {
            const noteTodos = (state.notes || [])
                .filter(note => note.reviewStatus !== 'reviewed')
                .map(note => `- 札记：${note.title || note.id}（${anGetReviewStatusLabel(note.reviewStatus)}）`);
            const cardTodos = (state.cards || [])
                .filter(card => card.reviewStatus !== 'reviewed')
                .map(card => `- 卡片：${card.title || card.id}（${anGetReviewStatusLabel(card.reviewStatus)}）`);
            return noteTodos.concat(cardTodos).length ? noteTodos.concat(cardTodos) : ['无。'];
        }

        function anRefreshAutoNotesUI() {
            if (typeof hydrateAutoNotesForm === 'function') hydrateAutoNotesForm();
            anRenderSources();
            renderNoteFragments();
            renderAutoNotesStageThreeMode();
            renderAnalysisResult();
            renderTextUnitsList();
            renderAlignmentWorkspace();
            renderGeneratedNotes();
            renderNoteEvidenceCitations();
            renderAutoNoteCards();
        }

        function anRequireProjectReady(action) {
            const state = window.autoNotesState;
            if (!state) return false;
            if (!String(state.baseText || state.firstDraftNote || '').trim() && (action === 'split' || action === 'export' || action === 'knowledge')) {
                alert('请先填写古籍原文，或确认第一版札记后再继续。');
                return false;
            }
            if ((!state.sources || !state.sources.some(source => String(source.content || '').trim())) && ['align', 'evidence', 'notes'].includes(action)) {
                alert('请先添加注疏、校勘、论文或札记材料。');
                return false;
            }
            if ((!state.textUnits || state.textUnits.length === 0) && ['align', 'evidence', 'notes'].includes(action)) {
                alert('请先完成文本切分。');
                return false;
            }
            if ((!state.evidencePacks || state.evidencePacks.length === 0) && ['notes'].includes(action)) {
                alert('请先构建证据包。');
                return false;
            }
            return true;
        }

        function anSafeFilename(value) {
            return String(value || 'auto-notes')
                .replace(/[\\/:*?"<>|]/g, '_')
                .trim()
                .slice(0, 80) || 'auto-notes';
        }

        function anBuildNoteTitle(pack, noteType) {
            const text = normalizeWhitespace(pack.canonicalText || '').slice(0, 18);
            return `${anGetNoteTypeLabel(noteType)}：${text || '未命名文本单元'}`;
        }

        function anBuildNoteSummary(pack, noteType, refs) {
            const evidenceText = refs.length ? `依据 ${refs.length} 条证据` : '缺少外部证据';
            return `${anGetNoteTypeLabel(noteType)}，${evidenceText}，可信度 ${pack.confidenceScore || 0}/100。`;
        }

        function anBuildTextObservation(pack) {
            const text = pack.canonicalText || '';
            const keywords = extractBasicKeywords(text);
            return keywords.length
                ? `文本关键词包括：${keywords.join('、')}。需结合上下文判断其训释、制度或义理指向。`
                : '文本较短或关键词不明显，需先从字词、句读与上下文关系入手。';
        }

        function anSummarizeEvidenceReferences(refs) {
            const byType = anGroupBy(refs, ref => ref.sourceType);
            return Object.keys(byType).map(type => `${anGetSourceTypeLabel(type)} ${byType[type].length} 条`).join('；') || '暂无证据。';
        }

        function anBuildInitialInterpretation(pack, noteType, refs) {
            if (!refs.length) {
                return '当前解释只能基于原文和研究问题形成初步假设，尚不能作为有来源支撑的判断。';
            }
            const strongest = refs.slice().sort((a, b) => b.score - a.score)[0];
            return `从 ${anGetSourceTypeLabel(strongest.sourceType)}《${strongest.sourceTitle}》等证据看，本文本单元可先按“${anGetNoteTypeLabel(noteType)}”方向整理。后续应回到原始材料核验引文边界和解释是否过度延伸。`;
        }

        function anEvidencePackText(pack) {
            return [
                pack.canonicalText,
                pack.question,
                ...extractEvidenceReferences(pack).map(ref => `${ref.sourceTitle} ${ref.matchedText}`)
            ].join('\n');
        }

        function anContainsAny(text, keywords) {
            const value = String(text || '');
            return (keywords || []).some(keyword => value.includes(keyword));
        }

        function anCreateEvidenceCard(note, ref) {
            return {
                id: generateAutoNotesId('card'),
                noteId: note.id,
                cardType: 'evidence_card',
                title: `证据：${ref.sourceTitle}`,
                target: note.originalText || '',
                summary: `${anGetSourceTypeLabel(ref.sourceType)}，对齐分数 ${ref.score}`,
                detail: ref.matchedText || '',
                evidenceIds: ref.alignmentId ? [ref.alignmentId] : [],
                tags: ['证据', anGetSourceTypeLabel(ref.sourceType)],
                reviewStatus: 'draft'
            };
        }

        function anCardTypeFromNoteType(noteType, note) {
            if (noteType === 'exegesis') return 'text_exegesis';
            if (noteType === 'commentary') return 'commentary_summary';
            if (noteType === 'collation' || noteType === 'edition') return 'collation_variant';
            if ((note.evidenceReferences || []).length === 0) return 'research_question';
            return 'concept';
        }

        function anGetNoteTypeLabel(value) {
            const labels = {
                auto: '自动判断',
                exegesis: '训诂札记',
                collation: '校勘札记',
                commentary: '注疏札记',
                philosophy: '义理札记',
                institution: '制度札记',
                person: '人物札记',
                geography: '地理札记',
                allusion: '典故札记',
                edition: '版本札记',
                comprehensive: '综合札记'
            };
            return labels[value] || labels.comprehensive;
        }

        function anGetCardTypeLabel(value) {
            const labels = {
                text_exegesis: '训诂卡片',
                commentary_summary: '注疏摘要',
                collation_variant: '校勘异文',
                concept: '概念卡片',
                research_question: '问题卡片',
                evidence_card: '证据卡片'
            };
            return labels[value] || value || '卡片';
        }

        function anGetReviewStatusLabel(value) {
            const labels = {
                draft: '草稿',
                reviewed: '已校对',
                questionable: '存疑',
                discarded: '废弃'
            };
            return labels[value] || labels.draft;
        }

        function anReviewStatusOptions(selected) {
            return ['draft', 'reviewed', 'questionable', 'discarded'].map(value => (
                `<option value="${value}"${selected === value ? ' selected' : ''}>${anGetReviewStatusLabel(value)}</option>`
            )).join('');
        }

        window.anExportAutoNotesAsJSON = exportAutoNotesAsJSON;
        window.anExportAutoNotesAsMarkdown = exportAutoNotesAsMarkdown;
        window.anDownloadAutoNotesFile = downloadAutoNotesFile;
        window.anSaveAutoNotesToKnowledgeBase = saveAutoNotesToKnowledgeBase;
        window.anImportAutoNotesFromJSONFile = importAutoNotesFromJSONFile;
        window.anValidateAutoNotesImport = validateAutoNotesImport;
        window.generateWordCloudData = generateWordCloudData;
        window.generateComparisonTable = generateComparisonTable;
        window.generateMindMapData = generateMindMapData;
        window.generateArgumentStructure = generateArgumentStructure;
        window.generateKnowledgeGraph = generateKnowledgeGraph;
        window.anExportAnalysisImagePNG = anExportAnalysisImagePNG;
        window.anExportAnalysisImageJPG = anExportAnalysisImageJPG;
        window.anExportAnalysisMarkdown = anExportAnalysisMarkdown;
        window.anExportAnalysisWordDoc = anExportAnalysisWordDoc;

        function anFirstMeaningfulLine(text) {
            return String(text || '')
                .split('\n')
                .map(line => line.replace(/^#+\s*/, '').trim())
                .find(line => line && !/^\d+\./.test(line) && !/^##/.test(line))
                || '札记摘要';
        }

        function anFindMatchedSnippet(textUnitText, sourceText, textUnit) {
            const source = String(sourceText || '');
            const raw = String(textUnitText || '').trim();
            if (!source) return '';

            if (raw && source.includes(raw)) {
                return anSnippetAround(source, source.indexOf(raw), raw.length);
            }

            const compactUnit = anCompactForMatch(raw);
            const candidates = (textUnit && textUnit.keywords ? textUnit.keywords : [])
                .concat(anTokenizeChineseTerms(raw))
                .filter(term => term && term.length >= 2);
            const found = candidates.find(term => source.includes(term));
            if (found) {
                return anSnippetAround(source, source.indexOf(found), found.length);
            }

            for (let length of [12, 8, 6, 4]) {
                if (compactUnit.length < length) continue;
                for (let i = 0; i <= compactUnit.length - length; i += Math.max(1, Math.floor(length / 2))) {
                    const fragment = compactUnit.slice(i, i + length);
                    const index = anCompactForMatch(source).indexOf(fragment);
                    if (index >= 0) {
                        return source.slice(Math.max(0, index - 40), index + fragment.length + 80).trim();
                    }
                }
            }

            return normalizeWhitespace(source).slice(0, 140);
        }

        function anSnippetAround(text, index, length) {
            const start = Math.max(0, index - 45);
            const end = Math.min(text.length, index + length + 95);
            return normalizeWhitespace(text.slice(start, end));
        }

        function anCompactForMatch(text) {
            return normalizeVariantChars(normalizePunctuation(normalizeWhitespace(text)))
                .replace(/[，。！？；：、,.!?;:\s"'“”‘’《》（）()\[\]{}]/g, '');
        }

        function anGetBigrams(text) {
            const value = String(text || '');
            if (value.length <= 1) return value ? [value] : [];
            const grams = [];
            for (let i = 0; i < value.length - 1; i++) {
                grams.push(value.slice(i, i + 2));
            }
            return Array.from(new Set(grams));
        }

        function anTokenizeChineseTerms(text) {
            return String(text || '')
                .replace(/[^\u4e00-\u9fff]/g, ' ')
                .split(/\s+/)
                .flatMap(part => {
                    if (part.length <= 2) return part ? [part] : [];
                    const terms = [];
                    for (let i = 0; i < part.length - 1; i += 2) {
                        terms.push(part.slice(i, i + 2));
                    }
                    return terms;
                })
                .filter(Boolean)
                .slice(0, 80);
        }

        function anExpandSemanticTerms(terms) {
            const clusters = [
                ['仁', '仁义', '仁德', '人'],
                ['礼', '禮', '礼乐', '制度'],
                ['学', '學', '问学', '教学'],
                ['说', '說', '悦'],
                ['君子', '士', '贤'],
                ['道', '德', '义理']
            ];
            const expanded = new Set((terms || []).filter(Boolean));
            clusters.forEach(cluster => {
                if (cluster.some(term => expanded.has(term))) {
                    cluster.forEach(term => expanded.add(term));
                }
            });
            return Array.from(expanded);
        }

        function anExtractLiteEntities(text) {
            const value = String(text || '');
            const known = ['孔子', '孟子', '颜回', '子路', '子贡', '曾子', '鲁', '齐', '卫', '宋', '郑', '晋', '楚', '周', '仁', '义', '礼', '道', '德'];
            const bookHints = anExtractBookHints(value);
            const titlePairs = (value.match(/[\u4e00-\u9fff]{2,4}(?:子|公|君|王|侯)/g) || []).slice(0, 20);
            return Array.from(new Set(known.filter(item => value.includes(item)).concat(bookHints, titlePairs)));
        }

        function anExtractBookHints(text) {
            const value = String(text || '');
            const books = ['论语', '孟子', '史记', '左传', '礼记', '诗经', '尚书', '周易', '春秋', '荀子', '庄子', '老子'];
            const bracketed = (value.match(/《([^》]{1,12})》/g) || []).map(item => item.replace(/[《》]/g, ''));
            return Array.from(new Set(books.filter(book => value.includes(book)).concat(bracketed)));
        }

        function anJaccardScore(left, right) {
            const leftSet = new Set((left || []).filter(Boolean));
            const rightSet = new Set((right || []).filter(Boolean));
            if (leftSet.size === 0 || rightSet.size === 0) return 0;
            let intersection = 0;
            leftSet.forEach(item => {
                if (rightSet.has(item)) intersection += 1;
            });
            const union = new Set([...leftSet, ...rightSet]).size;
            return Math.round((intersection / Math.max(union, 1)) * 100);
        }

        function anContainmentScore(needles, haystackItems) {
            const cleanNeedles = Array.from(new Set((needles || []).filter(Boolean)));
            const haystack = (haystackItems || []).join('\n');
            if (cleanNeedles.length === 0 || !haystack) return 0;
            const matched = cleanNeedles.filter(item => haystack.includes(item)).length;
            return Math.round((matched / cleanNeedles.length) * 100);
        }

        function anGroupBy(items, keyFn) {
            return (items || []).reduce((acc, item) => {
                const key = keyFn(item);
                if (!acc[key]) acc[key] = [];
                acc[key].push(item);
                return acc;
            }, {});
        }

        function anGetSourceTypeLabel(value) {
            const found = AN_SOURCE_TYPE_OPTIONS.find(type => type.value === value);
            return found ? found.label : '其他';
        }

        function anReadFileAsText(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(String(reader.result || ''));
                reader.onerror = () => reject(reader.error || new Error('读取文件失败'));
                reader.readAsText(file, 'utf-8');
            });
        }

        function anGetFileExtension(fileName) {
            return String(fileName || '').split('.').pop().toLowerCase();
        }

        function anGetSetting(key, fallback) {
            return window.autoNotesState && window.autoNotesState.settings && window.autoNotesState.settings[key] !== undefined
                ? window.autoNotesState.settings[key]
                : fallback;
        }

        function anGetValue(id, fallback) {
            const el = document.getElementById(id);
            return el ? el.value : fallback;
        }

        function anGetChecked(id, fallback) {
            const el = document.getElementById(id);
            return el ? el.checked : fallback;
        }

        function anGetRadioValue(name, fallback) {
            const checked = document.querySelector(`input[name="${name}"]:checked`);
            return checked ? checked.value : fallback;
        }

        function anEscapeHtml(value) {
            return String(value == null ? '' : value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function anEscapeAttr(value) {
            return anEscapeHtml(value).replace(/`/g, '&#96;');
        }
