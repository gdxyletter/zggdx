(function() {
    'use strict';

    const GUIDE_STORAGE_KEY = 'lantaiInternationalGuideMode';
    const GUIDE_MODES = {
        STANDARD: 'standard',
        INTERNATIONAL: 'international'
    };

    const GUIDE_ENTRIES = [
        {
            id: 'analects-xue-er-learning',
            classicKeys: ['lunyu_jizhu'],
            source: {
                zh: '《论语·学而》1.1',
                en: 'Analects, Xue Er 1.1'
            },
            original: '学而时习之，不亦说乎？',
            pinyin: 'xué ér shí xí zhī, bù yì yuè hū?',
            literal: {
                zh: '学习并按时温习它，不也是令人喜悦的吗？',
                en: 'To learn and regularly practice it, is this not a joy?'
            },
            readable: {
                zh: '学习之后经常温习、实践，难道不是一件令人欣喜的事吗？',
                en: 'Is it not a delight to learn something and keep practicing it over time?'
            },
            culturalNote: {
                zh: '这里的“习”不是只把知识记住，而是反复温习、身体力行。儒家把学习看成养成品格的过程，所以“悦”来自内在的成长，而不只是考试或外在奖励。',
                en: 'Here xi means more than memorizing: it suggests repeated practice until learning shapes conduct. In Confucian thought, learning cultivates character, so the joy comes from inward growth rather than external reward.'
            },
            keyConcepts: [
                {
                    zh: '学',
                    en: 'learning; emulating worthy models'
                },
                {
                    zh: '习',
                    en: 'practice; habituation'
                },
                {
                    zh: '说（悦）',
                    en: 'joy; inner delight'
                }
            ],
            discussionQuestion: {
                zh: '如果“学习”必须通过反复实践才真正完成，这会怎样改变现代课堂中“懂了”和“会了”的区别？',
                en: 'If learning is only complete through repeated practice, how does that change the difference between “understanding” and “being able to do” in a modern classroom?'
            },
            matchText: [
                '学而时习之',
                '不亦说乎',
                '学而时习之不亦说乎'
            ]
        }
    ];

    let guideMode = readStoredGuideMode();
    let activeSentence = '';
    let initialized = false;

    function initInternationalGuide() {
        if (initialized) return;
        initialized = true;

        ensureGuideUi();
        patchClassicReadingHooks();
        updateGuideMode(guideMode, { persist: false });

        window.addEventListener('lantai-ui-language-change', function() {
            refreshGuideI18n(getGuideRoot());
        });
    }

    function ensureGuideUi() {
        injectModeToolbar();
        injectGuidePanel();
    }

    function injectModeToolbar() {
        if (document.getElementById('internationalGuideToolbar')) return;

        const classicPanel = document.getElementById('classic-panel');
        const anchor = document.getElementById('classicAutoDetectOption');
        if (!classicPanel || !anchor || !anchor.parentElement) return;

        const toolbar = document.createElement('div');
        toolbar.id = 'internationalGuideToolbar';
        toolbar.className = 'international-guide-toolbar';
        toolbar.innerHTML = [
            '<span class="international-guide-toolbar-label" data-i18n="阅读模式">阅读模式</span>',
            '<div class="international-guide-mode-switch" role="group" aria-label="阅读模式">',
            '<button type="button" class="international-guide-mode-button" data-guide-mode="standard" data-i18n="普通阅读">普通阅读</button>',
            '<button type="button" class="international-guide-mode-button" data-guide-mode="international" data-i18n="海外读者导读">海外读者导读</button>',
            '</div>'
        ].join('');

        toolbar.addEventListener('click', function(event) {
            const button = event.target.closest('[data-guide-mode]');
            if (!button) return;
            updateGuideMode(button.dataset.guideMode, { persist: true });
        });

        anchor.parentElement.insertBefore(toolbar, anchor);
        refreshGuideI18n(toolbar);
    }

    function injectGuidePanel() {
        if (document.getElementById('internationalGuidePanel')) return;

        const classicText = document.getElementById('classicText');
        if (!classicText || !classicText.parentElement) return;

        const readingArea = document.createElement('div');
        readingArea.id = 'internationalGuideReadingArea';
        readingArea.className = 'international-guide-reading-area';
        classicText.parentElement.insertBefore(readingArea, classicText);
        readingArea.appendChild(classicText);

        const panel = document.createElement('aside');
        panel.id = 'internationalGuidePanel';
        panel.className = 'international-guide-panel hidden';
        panel.setAttribute('aria-live', 'polite');
        readingArea.appendChild(panel);
    }

    function patchClassicReadingHooks() {
        if (typeof window.selectSentence === 'function' && !window.selectSentence.__internationalGuidePatched) {
            const originalSelectSentence = window.selectSentence;
            const patchedSelectSentence = function(sentence) {
                const result = originalSelectSentence.apply(this, arguments);
                activeSentence = sentence || '';
                renderGuideForSentence(activeSentence);
                return result;
            };
            patchedSelectSentence.__internationalGuidePatched = true;
            window.selectSentence = patchedSelectSentence;
        }

        if (typeof window.loadClassicText === 'function' && !window.loadClassicText.__internationalGuidePatched) {
            const originalLoadClassicText = window.loadClassicText;
            const patchedLoadClassicText = function() {
                const result = originalLoadClassicText.apply(this, arguments);
                activeSentence = '';
                renderGuideForSentence('');
                return result;
            };
            patchedLoadClassicText.__internationalGuidePatched = true;
            window.loadClassicText = patchedLoadClassicText;
        }
    }

    function updateGuideMode(nextMode, options) {
        guideMode = nextMode === GUIDE_MODES.INTERNATIONAL ? GUIDE_MODES.INTERNATIONAL : GUIDE_MODES.STANDARD;
        const shouldPersist = !options || options.persist !== false;

        if (shouldPersist) {
            try {
                localStorage.setItem(GUIDE_STORAGE_KEY, guideMode);
            } catch (error) {
                console.warn('[international-guide] Unable to persist guide mode:', error);
            }
        }

        document.querySelectorAll('[data-guide-mode]').forEach(function(button) {
            const isActive = button.dataset.guideMode === guideMode;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        const readingArea = document.getElementById('internationalGuideReadingArea');
        if (readingArea) {
            readingArea.classList.toggle('is-guide-visible', guideMode === GUIDE_MODES.INTERNATIONAL);
        }

        renderGuideForSentence(activeSentence);
    }

    function renderGuideForSentence(sentence) {
        ensureGuideUi();

        const panel = getGuideRoot();
        if (!panel) return;

        if (guideMode !== GUIDE_MODES.INTERNATIONAL) {
            panel.classList.add('hidden');
            panel.innerHTML = '';
            return;
        }

        panel.classList.remove('hidden');

        if (!sentence) {
            panel.innerHTML = renderEmptyState();
            refreshGuideI18n(panel);
            return;
        }

        const entry = findGuideEntry(sentence);
        panel.innerHTML = entry ? renderGuideEntry(entry) : renderFallbackEntry(sentence);
        refreshGuideI18n(panel);
    }

    function renderGuideEntry(entry) {
        return [
            '<article class="international-guide-card">',
            '<header class="international-guide-card-header">',
            '<div class="international-guide-card-kicker" data-i18n="海外读者导读">海外读者导读</div>',
            '<h3 class="international-guide-card-title" data-i18n-skip="true">',
            renderInlineLangPair(entry.source.zh, entry.source.en),
            '</h3>',
            '</header>',
            renderField('原文', renderOriginal(entry.original)),
            renderField('拼音', renderPlainValue(entry.pinyin, 'international-guide-pinyin')),
            renderField('直译', renderLangPair(entry.literal.zh, entry.literal.en)),
            renderField('通顺译文', renderLangPair(entry.readable.zh, entry.readable.en)),
            renderField('文化说明', renderLangPair(entry.culturalNote.zh, entry.culturalNote.en)),
            renderField('核心概念', renderConcepts(entry.keyConcepts)),
            renderField('讨论问题', renderLangPair(entry.discussionQuestion.zh, entry.discussionQuestion.en)),
            '</article>'
        ].join('');
    }

    function renderFallbackEntry(sentence) {
        return [
            '<article class="international-guide-card">',
            '<header class="international-guide-card-header">',
            '<div class="international-guide-card-kicker" data-i18n="海外读者导读">海外读者导读</div>',
            '<h3 class="international-guide-card-title" data-i18n="暂未收录这句的海外读者导读">暂未收录这句的海外读者导读</h3>',
            '</header>',
            renderField('原文', renderOriginal(sentence)),
            renderField('文化说明', '<div class="international-guide-value"><span data-i18n="可先保留原文并补充拼音、译文与文化说明">可先保留原文并补充拼音、译文与文化说明</span></div>'),
            '</article>'
        ].join('');
    }

    function renderEmptyState() {
        return [
            '<div class="international-guide-empty">',
            '<div class="international-guide-card-kicker" data-i18n="海外读者导读">海外读者导读</div>',
            '<h3 data-i18n="暂未选择句子">暂未选择句子</h3>',
            '<p data-i18n="请选择一句经文查看海外读者导读">请选择一句经文查看海外读者导读</p>',
            '</div>'
        ].join('');
    }

    function renderField(labelZh, valueHtml) {
        return [
            '<section class="international-guide-field">',
            '<div class="international-guide-field-label" data-i18n="' + escapeAttribute(labelZh) + '">' + escapeHtml(labelZh) + '</div>',
            valueHtml,
            '</section>'
        ].join('');
    }

    function renderOriginal(value) {
        return '<div class="international-guide-value international-guide-original" data-i18n-skip="true">' + escapeHtml(value) + '</div>';
    }

    function renderPlainValue(value, className) {
        const classes = ['international-guide-value'];
        if (className) classes.push(className);
        return '<div class="' + classes.join(' ') + '" data-i18n-skip="true">' + escapeHtml(value) + '</div>';
    }

    function renderLangPair(zh, en) {
        return [
            '<div class="international-guide-value" data-i18n-skip="true">',
            '<span class="international-guide-zh">' + escapeHtml(zh) + '</span>',
            '<span class="international-guide-en">' + escapeHtml(en) + '</span>',
            '</div>'
        ].join('');
    }

    function renderInlineLangPair(zh, en) {
        return [
            '<span class="international-guide-zh">' + escapeHtml(zh) + '</span>',
            '<span class="international-guide-en">' + escapeHtml(en) + '</span>'
        ].join('');
    }

    function renderConcepts(concepts) {
        const items = (concepts || []).map(function(concept) {
            return [
                '<span class="international-guide-concept" data-i18n-skip="true">',
                '<span class="international-guide-concept-zh">' + escapeHtml(concept.zh) + '</span>',
                '<span class="international-guide-concept-en">' + escapeHtml(concept.en) + '</span>',
                '</span>'
            ].join('');
        }).join('');

        return '<div class="international-guide-value international-guide-concepts">' + items + '</div>';
    }

    function findGuideEntry(sentence) {
        const currentClassic = getCurrentClassicKey();
        const selected = normalizeGuideText(sentence);
        if (!selected) return null;

        return GUIDE_ENTRIES.find(function(entry) {
            if (entry.classicKeys && entry.classicKeys.length && !entry.classicKeys.includes(currentClassic)) {
                return false;
            }

            const original = normalizeGuideText(entry.original);
            if (selected.includes(original) || original.includes(selected)) return true;

            return (entry.matchText || []).some(function(text) {
                const normalized = normalizeGuideText(text);
                return selected.includes(normalized) || normalized.includes(selected);
            });
        }) || null;
    }

    function getCurrentClassicKey() {
        const selector = document.getElementById('classicSelector');
        return selector ? selector.value : '';
    }

    function normalizeGuideText(value) {
        return String(value || '')
            .replace(/學/g, '学')
            .replace(/習/g, '习')
            .replace(/說/g, '说')
            .replace(/悅/g, '悦')
            .replace(/[“”‘’"'《》〈〉（）()\[\]【】·\s，。！？；：、,.!?;:]/g, '')
            .replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, '')
            .trim()
            .toLowerCase();
    }

    function readStoredGuideMode() {
        try {
            return localStorage.getItem(GUIDE_STORAGE_KEY) === GUIDE_MODES.INTERNATIONAL
                ? GUIDE_MODES.INTERNATIONAL
                : GUIDE_MODES.STANDARD;
        } catch (error) {
            return GUIDE_MODES.STANDARD;
        }
    }

    function getGuideRoot() {
        return document.getElementById('internationalGuidePanel');
    }

    function refreshGuideI18n(target) {
        if (!target) return;

        if (typeof window.refreshLantaiI18n === 'function') {
            window.refreshLantaiI18n(target, 0);
            return;
        }

        if (typeof window.applyI18nToPage === 'function') {
            window.setTimeout(function() {
                window.applyI18nToPage(target);
            }, 0);
        }
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeAttribute(value) {
        return escapeHtml(value).replace(/`/g, '&#96;');
    }

    window.initInternationalGuide = initInternationalGuide;
    window.updateInternationalGuideForSentence = renderGuideForSentence;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInternationalGuide);
    } else {
        initInternationalGuide();
    }
})();
