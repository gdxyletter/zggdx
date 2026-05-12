        const AUTO_NOTES_STORAGE_PREFIX = 'lantai_auto_notes_';
        const AUTO_NOTES_CURRENT_KEY = AUTO_NOTES_STORAGE_PREFIX + 'current_project';
        const AUTO_NOTES_INDEX_KEY = AUTO_NOTES_STORAGE_PREFIX + 'project_index';

        function generateAutoNotesId(prefix) {
            const safePrefix = prefix || 'an';
            const randomPart = Math.random().toString(36).slice(2, 8);
            return `${safePrefix}_${Date.now().toString(36)}_${randomPart}`;
        }

        function getAutoNotesStorageKey(projectId) {
            const id = projectId || (window.autoNotesState && window.autoNotesState.projectId) || localStorage.getItem(AUTO_NOTES_CURRENT_KEY) || 'default';
            return AUTO_NOTES_STORAGE_PREFIX + id;
        }

        function createAutoNotesProject(initialData = {}) {
            const now = new Date().toISOString();
            const projectId = initialData.projectId || generateAutoNotesId('project');
            const initialSettings = initialData.settings || {};
            const initialNormalizeOptions = initialSettings.normalizeOptions || {};
            return {
                projectId,
                projectTitle: initialData.projectTitle || '未命名札记项目',
                createdAt: initialData.createdAt || now,
                updatedAt: now,
                baseText: initialData.baseText || '',
                researchQuestion: initialData.researchQuestion || '',
                keywordOrConcept: initialData.keywordOrConcept || '',
                firstDraftNote: initialData.firstDraftNote || '',
                firstDraftMeta: initialData.firstDraftMeta || null,
                readingNoteConfirmed: !!initialData.readingNoteConfirmed,
                readingNoteConfirmedAt: initialData.readingNoteConfirmedAt || '',
                fragments: Array.isArray(initialData.fragments) ? initialData.fragments : [],
                fragmentsConfirmedAt: initialData.fragmentsConfirmedAt || '',
                databaseJsonRaw: initialData.databaseJsonRaw || '',
                databaseJsonValidated: initialData.databaseJsonValidated || null,
                analysisResults: initialData.analysisResults && typeof initialData.analysisResults === 'object' ? initialData.analysisResults : {},
                sources: Array.isArray(initialData.sources) ? initialData.sources : [],
                textUnits: Array.isArray(initialData.textUnits) ? initialData.textUnits : [],
                alignments: Array.isArray(initialData.alignments) ? initialData.alignments : [],
                evidencePacks: Array.isArray(initialData.evidencePacks) ? initialData.evidencePacks : [],
                notes: Array.isArray(initialData.notes) ? initialData.notes : [],
                cards: Array.isArray(initialData.cards) ? initialData.cards : [],
                selectedUnitId: initialData.selectedUnitId || '',
                selectedNoteId: initialData.selectedNoteId || '',
                settings: {
                    ...initialSettings,
                    currentStep: initialSettings.currentStep || 1,
                    uploadedFiles: Array.isArray(initialSettings.uploadedFiles) ? initialSettings.uploadedFiles : [],
                    noteType: initialSettings.noteType || 'auto',
                    fragmentSplitStrategy: initialSettings.fragmentSplitStrategy || 'auto',
                    stageThreeMode: initialSettings.stageThreeMode || 'database',
                    databaseTemplate: initialSettings.databaseTemplate || '',
                    analysisType: initialSettings.analysisType || 'word_cloud',
                    knowledgeGraphMode: initialSettings.knowledgeGraphMode || 'simple',
                    normalizeOptions: {
                        trimWhitespace: true,
                        normalizePunctuation: true,
                        traditionalCompatible: false,
                        keepOriginal: true,
                        splitMode: 'punctuation',
                        ...initialNormalizeOptions
                    }
                }
            };
        }

        function resetAutoNotesState() {
            window.autoNotesState = createAutoNotesProject();
            try {
                localStorage.setItem(AUTO_NOTES_CURRENT_KEY, window.autoNotesState.projectId);
                saveAutoNotesProject();
            } catch (error) {
                alert('初始化札记项目失败：' + error.message);
            }
            return window.autoNotesState;
        }

        function loadAutoNotesProject(projectId) {
            try {
                const key = getAutoNotesStorageKey(projectId);
                const saved = localStorage.getItem(key);
                if (!saved) return null;

                const parsed = JSON.parse(saved);
                window.autoNotesState = createAutoNotesProject(parsed);
                localStorage.setItem(AUTO_NOTES_CURRENT_KEY, window.autoNotesState.projectId);
                return window.autoNotesState;
            } catch (error) {
                alert('读取札记项目失败：' + error.message);
                return null;
            }
        }

        function saveAutoNotesProject() {
            try {
                if (!window.autoNotesState) {
                    window.autoNotesState = createAutoNotesProject();
                }
                if (typeof collectAutoNotesState === 'function') {
                    collectAutoNotesState();
                }

                window.autoNotesState.updatedAt = new Date().toISOString();
                const key = getAutoNotesStorageKey(window.autoNotesState.projectId);
                localStorage.setItem(key, JSON.stringify(window.autoNotesState));
                localStorage.setItem(AUTO_NOTES_CURRENT_KEY, window.autoNotesState.projectId);
                updateAutoNotesProjectIndex(window.autoNotesState);
                return true;
            } catch (error) {
                alert('保存札记项目失败，可能是 localStorage 空间不足：' + error.message);
                return false;
            }
        }

        function updateAutoNotesProjectIndex(project) {
            const existing = listAutoNotesProjects();
            const nextItem = {
                projectId: project.projectId,
                projectTitle: project.projectTitle,
                createdAt: project.createdAt,
                updatedAt: project.updatedAt
            };
            const next = existing.filter(item => item.projectId !== project.projectId);
            next.unshift(nextItem);
            localStorage.setItem(AUTO_NOTES_INDEX_KEY, JSON.stringify(next));
        }

        function listAutoNotesProjects() {
            try {
                const saved = JSON.parse(localStorage.getItem(AUTO_NOTES_INDEX_KEY) || '[]');
                return Array.isArray(saved) ? saved : [];
            } catch (error) {
                alert('读取札记项目列表失败：' + error.message);
                return [];
            }
        }

        function deleteAutoNotesProject(projectId) {
            try {
                if (!projectId) return false;
                localStorage.removeItem(getAutoNotesStorageKey(projectId));
                const next = listAutoNotesProjects().filter(item => item.projectId !== projectId);
                localStorage.setItem(AUTO_NOTES_INDEX_KEY, JSON.stringify(next));

                if (window.autoNotesState && window.autoNotesState.projectId === projectId) {
                    resetAutoNotesState();
                }
                return true;
            } catch (error) {
                alert('删除札记项目失败：' + error.message);
                return false;
            }
        }

        function exportAutoNotesState() {
            if (!window.autoNotesState) {
                resetAutoNotesState();
            }
            return JSON.stringify(window.autoNotesState, null, 2);
        }

        function importAutoNotesState(json) {
            try {
                const parsed = typeof json === 'string' ? JSON.parse(json) : json;
                const normalized = parsed && parsed.legacyState
                    ? parsed.legacyState
                    : (parsed && parsed.autoNotesProject && parsed.autoNotesProject.metadata
                        ? {
                            projectId: parsed.autoNotesProject.metadata.projectId,
                            projectTitle: parsed.autoNotesProject.metadata.title,
                            createdAt: parsed.autoNotesProject.metadata.createdAt,
                            updatedAt: parsed.autoNotesProject.metadata.updatedAt,
                            researchQuestion: parsed.autoNotesProject.metadata.researchQuestion,
                            baseText: parsed.autoNotesProject.inputs && parsed.autoNotesProject.inputs.baseText,
                            keywordOrConcept: parsed.autoNotesProject.inputs && parsed.autoNotesProject.inputs.keywordOrConcept,
                            sources: parsed.autoNotesProject.inputs && parsed.autoNotesProject.inputs.sources,
                            firstDraftNote: parsed.autoNotesProject.readingNote && parsed.autoNotesProject.readingNote.markdown,
                            readingNoteConfirmed: parsed.autoNotesProject.readingNote && parsed.autoNotesProject.readingNote.userConfirmed,
                            readingNoteConfirmedAt: parsed.autoNotesProject.readingNote && parsed.autoNotesProject.readingNote.confirmedAt,
                            fragments: parsed.autoNotesProject.fragments,
                            settings: {
                                currentStep: parsed.autoNotesProject.metadata.stage,
                                uploadedFiles: parsed.autoNotesProject.inputs && parsed.autoNotesProject.inputs.uploadedFiles,
                                databaseTemplate: parsed.autoNotesProject.databaseMode && parsed.autoNotesProject.databaseMode.template,
                                analysisType: parsed.autoNotesProject.analysisMode && parsed.autoNotesProject.analysisMode.selectedType
                            }
                        }
                        : parsed);
                window.autoNotesState = createAutoNotesProject(normalized || {});
                saveAutoNotesProject();
                return window.autoNotesState;
            } catch (error) {
                alert('导入札记项目失败：' + error.message);
                return null;
            }
        }

        (function initAutoNotesState() {
            const currentProjectId = localStorage.getItem(AUTO_NOTES_CURRENT_KEY);
            const loaded = currentProjectId ? loadAutoNotesProject(currentProjectId) : null;
            if (!loaded) {
                resetAutoNotesState();
            }
        })();
