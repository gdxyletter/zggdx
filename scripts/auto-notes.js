        const AUTO_NOTES_SOURCE_TYPES = [
            { value: 'commentary', label: '注疏' },
            { value: 'collation', label: '校勘记' },
            { value: 'variant', label: '版本异文' },
            { value: 'paper', label: '现代论文' },
            { value: 'userNote', label: '个人札记' },
            { value: 'other', label: '其他' }
        ];
        let autoNotesAutosaveTimer = null;

        function updateSidebarForAutoNotes() {
            ['annotationSection', 'defaultAnnotationSection', 'gradingSection', 'versionSection'].forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.style.display = 'none';
                }
            });
        }

        function startAutoNotes() {
            const workspace = document.getElementById('autoNotesWorkspace');
            if (workspace) {
                workspace.classList.remove('hidden');
            }
            hydrateAutoNotesForm();
            ensureAutoNotesSource();
            switchAutoNotesStep(getAutoNotesSetting('currentStep', 1));
        }

        function switchAutoNotesStep(step) {
            const targetStep = Math.max(1, Math.min(5, Number(step) || 1));
            collectAutoNotesState();
            window.autoNotesState.settings.currentStep = targetStep;
            saveAutoNotesProject();

            document.querySelectorAll('.auto-notes-step').forEach(button => {
                button.classList.toggle('active', Number(button.dataset.anStep) === targetStep);
            });

            document.querySelectorAll('.auto-notes-step-panel').forEach(panel => {
                panel.classList.toggle('active', Number(panel.dataset.anStepPanel) === targetStep);
            });

            if (targetStep === 2) {
                if (typeof renderNoteFragments === 'function') renderNoteFragments();
                renderAutoNotesUnits();
            } else if (targetStep === 3) {
                renderAutoNotesUnits();
                if (typeof renderAutoNotesStageThreeMode === 'function') renderAutoNotesStageThreeMode();
                renderAutoNotesEvidence();
            } else if (targetStep === 4) {
                renderGeneratedNotes();
                renderAutoNotesCitations();
            } else if (targetStep === 5) {
                renderAutoNoteCards();
            }
        }

        function hydrateAutoNotesForm() {
            const state = window.autoNotesState;
            setAutoNotesValue('anBaseText', state.baseText);
            setAutoNotesValue('anResearchQuestion', state.researchQuestion);
            setAutoNotesValue('anKeywordOrConcept', state.keywordOrConcept);
            setAutoNotesValue('anFirstDraftNote', state.firstDraftNote);
            setAutoNotesValue('anDatabaseTemplate', getAutoNotesSetting('databaseTemplate', ''));
            setAutoNotesValue('anDatabaseJsonPreview', state.databaseJsonRaw || '');
            setAutoNotesValue('anAnalysisRawJson', getCurrentAnalysisRawJson());
            setAutoNotesValue('anNoteType', getAutoNotesSetting('noteType', 'auto'));
            setAutoNotesValue('anNotePreview', getPrimaryAutoNoteBody());

            const options = getAutoNotesSetting('normalizeOptions', {});
            setAutoNotesChecked('anTrimWhitespace', options.trimWhitespace !== false);
            setAutoNotesChecked('anNormalizePunctuation', options.normalizePunctuation !== false);
            setAutoNotesChecked('anTraditionalCompatible', !!options.traditionalCompatible);
            setAutoNotesChecked('anKeepOriginal', options.keepOriginal !== false);
            setAutoNotesRadioValue('anSplitMode', options.splitMode || 'punctuation');
            setAutoNotesRadioValue('anFragmentStrategy', getAutoNotesSetting('fragmentSplitStrategy', 'auto'));
            setAutoNotesRadioValue('anStageThreeMode', getAutoNotesSetting('stageThreeMode', 'database'));
            setAutoNotesRadioValue('anAnalysisType', getAutoNotesSetting('analysisType', 'word_cloud'));
            setAutoNotesRadioValue('anKnowledgeGraphMode', getAutoNotesSetting('knowledgeGraphMode', 'simple'));

            renderAutoNotesSources();
            if (typeof renderNoteFragments === 'function') renderNoteFragments();
            if (typeof renderAutoNotesStageThreeMode === 'function') renderAutoNotesStageThreeMode();
            if (typeof renderAnalysisResult === 'function') renderAnalysisResult();
            renderAutoNotesUnits();
            renderAutoNotesEvidence();
            renderGeneratedNotes();
            renderAutoNotesCitations();
            renderAutoNoteCards();
        }

        function collectAutoNotesState() {
            if (typeof anCollectInputToState === 'function') {
                return anCollectInputToState();
            }
        }

        function ensureAutoNotesSource() {
            if (window.autoNotesState.sources.length === 0) {
                anAddSource(false);
            } else {
                anRenderSources();
            }
        }

        function createAutoNotesSource() {
            return {
                id: generateAutoNotesId('source'),
                type: 'commentary',
                title: '',
                content: '',
                fileName: '',
                metadata: {},
                createdAt: new Date().toISOString()
            };
        }

        function addAutoNotesSource(shouldFocus = true) {
            return anAddSource(shouldFocus);
        }

        function removeAutoNotesSource(index) {
            const source = window.autoNotesState.sources[index];
            if (source) anRemoveSource(source.id);
        }

        function updateAutoNotesSource(index, field, value) {
            const source = window.autoNotesState.sources[index];
            if (!source) return;
            anUpdateSource(source.id, field, value);
        }

        function renderAutoNotesSources() {
            anRenderSources();
        }

        function saveAutoNotesDraft() {
            const ok = saveAutoNotesProject();
            if (ok) {
                alert('草稿已保存到本地浏览器');
            }
        }

        function scheduleAutoNotesAutosave() {
            window.clearTimeout(autoNotesAutosaveTimer);
            autoNotesAutosaveTimer = window.setTimeout(function() {
                saveAutoNotesProject();
            }, 400);
        }

        function bindAutoNotesAutosave() {
            const panel = document.getElementById('autoNotes-panel');
            if (!panel) return;
            panel.addEventListener('input', scheduleAutoNotesAutosave);
            panel.addEventListener('change', scheduleAutoNotesAutosave);
        }

        function buildAutoNotesUnits() {
            return renderTextUnits();
        }

        function renderAutoNotesUnits() {
            renderTextUnitsList();
        }

        function getAutoNotesUnitsHtml() {
            return getTextUnitsHtml();
        }

        function updateAutoNotesUnit(index, value) {
            const unit = window.autoNotesState.textUnits[index];
            if (unit) {
                updateTextUnit(unit.id, value);
            }
        }

        function buildAutoNotesEvidence() {
            return buildAlignmentsForAllUnits();
        }

        function renderAutoNotesEvidence() {
            renderAlignmentWorkspace();
        }

        function setAutoNotesEvidenceStatus(index, accepted) {
            const alignment = window.autoNotesState.alignments[index];
            if (alignment) {
                setAlignmentAccepted(alignment.id, accepted);
            }
        }

        function generateAutoNotePreview() {
            return generateNotesFromEvidencePacks();
        }

        function renderAutoNotesCitations() {
            renderNoteEvidenceCitations();
        }

        function refreshAutoNotesCards() {
            return createCardsFromNotes();
        }

        function editAutoNotesCard(index) {
            const card = window.autoNotesState.cards[index];
            if (card) editCard(card.id);
        }

        function exportAutoNotesJSON() {
            return window.anExportAutoNotesAsJSON();
        }

        function exportAutoNotesMarkdown() {
            return window.anExportAutoNotesAsMarkdown();
        }

        function saveAutoNotesToKnowledgeBase() {
            return window.anSaveAutoNotesToKnowledgeBase();
        }

        function upsertPrimaryAutoNote(body, noteType) {
            const state = window.autoNotesState;
            const firstUnit = state.textUnits[0];
            const accepted = state.alignments.filter(alignment => alignment.accepted === true);
            const now = new Date().toISOString();
            let note = getPrimaryAutoNote();

            if (!note) {
                note = {
                    id: generateAutoNotesId('note'),
                    textUnitId: firstUnit ? firstUnit.id : '',
                    noteType,
                    title: state.researchQuestion || '未命名札记',
                    originalText: firstUnit ? firstUnit.rawText : state.baseText.slice(0, 120),
                    summary: '',
                    body: '',
                    evidenceIds: [],
                    confidence: 0.5,
                    reviewStatus: 'draft',
                    createdAt: now,
                    updatedAt: now
                };
                state.notes = [note];
            }

            note.textUnitId = firstUnit ? firstUnit.id : note.textUnitId;
            note.noteType = noteType;
            note.title = state.researchQuestion || '未命名札记';
            note.originalText = firstUnit ? firstUnit.rawText : state.baseText.slice(0, 120);
            note.summary = body.split('\n').find(line => line.trim() && !line.startsWith('【')) || '札记草稿';
            note.body = body;
            note.evidenceIds = accepted.map(alignment => alignment.id);
            note.confidence = accepted.length ? Math.min(0.95, 0.55 + accepted.length * 0.08) : 0.5;
            note.reviewStatus = 'draft';
            note.updatedAt = now;
            return note;
        }

        function getPrimaryAutoNote() {
            return window.autoNotesState.notes[0] || null;
        }

        function getPrimaryAutoNoteBody() {
            const note = getPrimaryAutoNote();
            return note ? note.body : '';
        }

        function downloadAutoNotesFile(filename, content, type) {
            return window.anDownloadAutoNotesFile(filename, content, type);
        }

        function getAutoNotesSetting(key, fallback) {
            return window.autoNotesState && window.autoNotesState.settings && window.autoNotesState.settings[key] !== undefined
                ? window.autoNotesState.settings[key]
                : fallback;
        }

        function getAutoNotesValue(id, fallback) {
            const el = document.getElementById(id);
            return el ? el.value : fallback;
        }

        function setAutoNotesValue(id, value) {
            const el = document.getElementById(id);
            if (el) el.value = value || '';
        }

        function getAutoNotesChecked(id, fallback) {
            const el = document.getElementById(id);
            return el ? el.checked : fallback;
        }

        function setAutoNotesChecked(id, value) {
            const el = document.getElementById(id);
            if (el) el.checked = !!value;
        }

        function getAutoNotesRadioValue(name, fallback) {
            const checked = document.querySelector(`input[name="${name}"]:checked`);
            return checked ? checked.value : fallback;
        }

        function setAutoNotesRadioValue(name, value) {
            const target = document.querySelector(`input[name="${name}"][value="${value}"]`);
            if (target) target.checked = true;
        }

        function getAutoNotesNoteTypeLabel(value) {
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
                edition: '版本札记'
            };
            return labels[value] || labels.auto;
        }

        function getAutoNotesSourceTypeLabel(value) {
            const found = AUTO_NOTES_SOURCE_TYPES.find(type => type.value === value);
            return found ? found.label : '其他';
        }

        function escapeAutoNotesHtml(value) {
            return String(value == null ? '' : value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        document.addEventListener('DOMContentLoaded', function() {
            hydrateAutoNotesForm();
            ensureAutoNotesSource();
            bindAutoNotesAutosave();
        });

        let anEChartsResizeTimer = null;
        window.addEventListener('resize', function() {
            if (anEChartsResizeTimer) {
                window.clearTimeout(anEChartsResizeTimer);
            }
            anEChartsResizeTimer = window.setTimeout(function() {
                if (typeof anResizeECharts === 'function') {
                    anResizeECharts();
                }
            }, 200);
        });

        window.addEventListener('beforeunload', function() {
            if (typeof anDisposeECharts === 'function') {
                anDisposeECharts();
            }
        });
