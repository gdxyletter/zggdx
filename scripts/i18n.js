(function() {
    'use strict';

    /**
     * Unified UI i18n layer for international students.
     *
     * Maintenance notes:
     * - Ordinary static UI can rely on the scanner, or opt in explicitly with data-i18n
     *   and optional data-i18n-context for better translation context.
     * - Dynamic renderers may call renderBilingualText(...) for HTML strings or
     *   createBilingualElement(...) for DOM nodes. The MutationObserver also handles
     *   short Chinese text inserted later by existing modules.
     * - Long reading materials, user documents, and formatted/fullscreen content are
     *   intentionally skipped by SKIP_SELECTOR and MAX_TEXT_LENGTH to avoid translating
     *   primary source text or user-authored material as if it were UI chrome.
     * - DeepSeek calls go through scripts/ai-adapter.js only; this file never stores or
     *   constructs an API key. Successful translations are cached per Chinese string.
     */

    const LANGUAGE_MODES = {
        ZH: 'zh',
        BILINGUAL: 'bilingual'
    };
    const STORAGE_KEY = 'uiLanguageMode';
    const CACHE_PREFIX = 'i18nCache:';
    const MAX_TEXT_LENGTH = 120;
    const MAX_CONTENT_TEXT_LENGTH = 900;
    const TRANSLATION_CONCURRENCY = 2;
    const TEMPORARY_FAILURE_COOLDOWN_MS = 30000;
    const TRANSLATABLE_ATTRS = ['placeholder', 'title', 'aria-label'];
    const SKIP_SELECTOR = [
        'script',
        'style',
        'noscript',
        'template',
        'svg',
        'canvas',
        'textarea',
        'input',
        'select',
        'option',
        '[contenteditable="true"]',
        '[data-i18n-skip="true"]',
        '.language-switcher',
        '.i18n-en-subtitle',
        '.i18n-zh-main',
        '.fullscreen-content',
        '.formatted-preview',
        '#fullscreenContent',
        '#modalContent',
    ].join(',');
    const CONTENT_I18N_SELECTOR = [
        '#classicText',
        '#fullscreenReadingContent',
        '#selectedSentenceText',
        '#citationPanelRight',
        '#etymologyPanel',
        '#crossRefPanel',
        '#analysisResult'
    ].join(',');

    let currentMode = normalizeLanguageMode(readStoredLanguageMode());
    let mutationObserver = null;
    let scanTimer = null;
    let queuedRoots = new Set();
    let activeTranslations = 0;
    let translationQueue = [];
    let pendingTranslations = new Map();
    let unavailableUntil = 0;
    let warnedMessages = new Set();
    let dialogsPatched = false;

    function initI18n() {
        setDocumentMode(currentMode);
        bindLanguageSwitcher();
        patchBrowserDialogs();
        applyI18nToPage(document.body);
        observeDynamicText();

        window.addEventListener('load', function() {
            scheduleApplyI18n(document.body, 80);
        });
    }

    function setLanguageMode(mode) {
        currentMode = normalizeLanguageMode(mode);
        try {
            localStorage.setItem(STORAGE_KEY, currentMode);
        } catch (error) {
            console.warn('[i18n] Unable to persist language mode:', error);
        }

        setDocumentMode(currentMode);
        updateLanguageSwitcher();

        if (currentMode === LANGUAGE_MODES.ZH) {
            restoreI18nAttributes(document.body);
        } else {
            applyI18nToPage(document.body);
        }

        window.dispatchEvent(new CustomEvent('lantai-ui-language-change', {
            detail: { mode: currentMode }
        }));
    }

    function getLanguageMode() {
        return currentMode;
    }

    function applyI18nToPage(root) {
        const target = root || document.body;
        if (!target) return;

        processExplicitI18nElements(target);
        processI18nAttributes(target);

        if (currentMode === LANGUAGE_MODES.ZH) {
            restoreI18nAttributes(target);
            return;
        }

        scanTextNodes(target);
        processContentTextBlocks(target);
    }

    function translateAndAttach(element, chineseText, context) {
        if (!element || !isElement(element)) return Promise.resolve('');

        const zh = normalizeText(chineseText || '');
        if (!isEligibleChineseText(zh) || shouldSkipElement(element)) {
            return Promise.resolve('');
        }

        element.classList.add('i18n-bilingual');
        element.dataset.i18nProcessed = 'true';
        element.dataset.i18nSourceText = zh;

        const subtitle = getOrCreateSubtitle(element);
        subtitle.dataset.i18nFor = zh;
        subtitle.classList.remove('is-unavailable');

        if (currentMode === LANGUAGE_MODES.ZH) {
            return Promise.resolve('');
        }

        const immediate = getImmediateTranslation(zh);
        if (immediate.text) {
            setSubtitleIfCurrent(element, subtitle, zh, immediate.text);
            if (immediate.source !== 'cache') {
                refreshTranslationInBackground(element, subtitle, zh, context || getElementContext(element));
            }
            return Promise.resolve(immediate.text);
        }

        subtitle.textContent = '';
        return translateTextWithDeepSeek(zh, context || getElementContext(element))
            .then(function(en) {
                setSubtitleIfCurrent(element, subtitle, zh, en);
                return en;
            })
            .catch(function(error) {
                warnTranslationError(error, zh);
                if (element.dataset.i18nSourceText === zh && currentMode === LANGUAGE_MODES.BILINGUAL) {
                    const fallback = getFallbackTranslation(zh);
                    subtitle.textContent = fallback || '';
                    subtitle.classList.toggle('is-unavailable', !fallback);
                }
                return '';
            });
    }

    function observeDynamicText() {
        if (mutationObserver || !document.body) return;

        mutationObserver = new MutationObserver(function(mutations) {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (isI18nGeneratedNode(node)) return;
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            scheduleApplyI18n(node);
                        } else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
                            scheduleApplyI18n(node.parentElement);
                        }
                    });
                } else if (mutation.type === 'characterData' && mutation.target.parentElement) {
                    if (!isI18nGeneratedNode(mutation.target.parentElement)) {
                        scheduleApplyI18n(mutation.target.parentElement);
                    }
                } else if (mutation.type === 'attributes') {
                    scheduleApplyI18n(mutation.target);
                }
            }
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: TRANSLATABLE_ATTRS
        });
    }

    function renderBilingualText(zh, options) {
        const config = options || {};
        const tagName = config.tagName || 'span';
        const className = config.className ? ' ' + escapeAttribute(config.className) : '';
        const context = config.context ? ' data-i18n-context="' + escapeAttribute(config.context) + '"' : '';
        const text = normalizeText(zh || '');
        return '<' + tagName + ' class="i18n-bilingual' + className + '" data-i18n="' + escapeAttribute(text) + '"' + context + '>' +
            '<span class="i18n-zh-main">' + escapeHtml(text) + '</span>' +
            '<span class="i18n-en-subtitle" data-i18n-generated="true"></span>' +
            '</' + tagName + '>';
    }

    function createBilingualElement(zh, tagName, className, context) {
        const el = document.createElement(tagName || 'span');
        const text = normalizeText(zh || '');
        el.className = className ? 'i18n-bilingual ' + className : 'i18n-bilingual';
        el.dataset.i18n = text;
        if (context) el.dataset.i18nContext = context;

        const zhSpan = document.createElement('span');
        zhSpan.className = 'i18n-zh-main';
        zhSpan.textContent = text;
        el.appendChild(zhSpan);

        const enSpan = document.createElement('span');
        enSpan.className = 'i18n-en-subtitle';
        enSpan.dataset.i18nGenerated = 'true';
        el.appendChild(enSpan);

        translateAndAttach(el, text, context);
        return el;
    }

    async function translateTextWithDeepSeek(text, context) {
        const zh = normalizeText(text || '');
        if (!isEligibleChineseText(zh)) return '';

        return translateAnyTextWithDeepSeek(zh, context || 'general UI');
    }

    async function translateContentTextWithDeepSeek(text, context) {
        const zh = normalizeText(text || '');
        if (!isEligibleChineseContentText(zh)) return '';

        return translateAnyTextWithDeepSeek(zh, context || 'content text');
    }

    async function translateAnyTextWithDeepSeek(text, context) {
        const zh = normalizeText(text || '');
        if (!zh || !containsChinese(zh)) return '';

        const cached = getCachedTranslation(zh);
        if (cached) return cached;
        if (pendingTranslations.has(zh)) return pendingTranslations.get(zh);

        const promise = new Promise(function(resolve, reject) {
            translationQueue.push({
                text: zh,
                context: context || 'general UI',
                resolve,
                reject
            });
            drainTranslationQueue();
        }).finally(function() {
            pendingTranslations.delete(zh);
        });

        pendingTranslations.set(zh, promise);
        return promise;
    }

    function processExplicitI18nElements(root) {
        const elements = collectElements(root, '[data-i18n]');
        elements.forEach(function(element) {
            if (shouldSkipElement(element)) return;
            const zh = normalizeText(element.dataset.i18n || '');
            if (!zh) return;
            translateAndAttach(element, zh, element.dataset.i18nContext || getElementContext(element));
        });
    }

    function processI18nAttributes(root) {
        const selector = TRANSLATABLE_ATTRS.map(function(attr) {
            return '[' + attr + ']';
        }).join(',') + ',option';
        const elements = collectElements(root, selector);

        elements.forEach(function(element) {
            if (!isElement(element)) return;

            if (element.tagName === 'OPTION') {
                processOptionText(element);
                return;
            }

            if (shouldSkipAttributeElement(element)) return;

            TRANSLATABLE_ATTRS.forEach(function(attr) {
                processAttribute(element, attr);
            });
        });
    }

    function processAttribute(element, attrName) {
        const datasetKey = getAttrDatasetKey(attrName);
        const currentValue = element.getAttribute(attrName) || '';

        if (!element.dataset[datasetKey] && isEligibleChineseText(currentValue)) {
            element.dataset[datasetKey] = normalizeText(currentValue);
        }

        const zh = normalizeText(element.dataset[datasetKey] || '');
        if (!isEligibleChineseText(zh)) return;

        if (currentMode === LANGUAGE_MODES.ZH) {
            if (element.getAttribute(attrName) !== zh) {
                element.setAttribute(attrName, zh);
            }
            return;
        }

        const immediate = getImmediateTranslation(zh);
        if (immediate.text) {
            const bilingualValue = zh + ' / ' + immediate.text;
            if (element.getAttribute(attrName) !== bilingualValue) {
                element.setAttribute(attrName, bilingualValue);
            }
            if (immediate.source !== 'cache') {
                refreshAttributeTranslationInBackground(element, attrName, zh, getElementContext(element) + ' attribute ' + attrName);
            }
            return;
        }

        if (element.getAttribute(attrName) !== zh) {
            element.setAttribute(attrName, zh);
        }
        translateTextWithDeepSeek(zh, getElementContext(element) + ' attribute ' + attrName)
            .then(function(en) {
                if (currentMode === LANGUAGE_MODES.BILINGUAL) {
                    const bilingualValue = zh + ' / ' + en;
                    if (element.getAttribute(attrName) !== bilingualValue) {
                        element.setAttribute(attrName, bilingualValue);
                    }
                }
            })
            .catch(function(error) {
                warnTranslationError(error, zh);
            });
    }

    function processOptionText(option) {
        if (!option.parentElement || option.parentElement.closest('.language-switcher,[data-i18n-skip="true"]')) return;

        const currentText = normalizeText(option.textContent || '');
        if (!option.dataset.i18nOptionZh && isEligibleChineseText(currentText)) {
            option.dataset.i18nOptionZh = currentText;
        }

        const zh = normalizeText(option.dataset.i18nOptionZh || '');
        if (!isEligibleChineseText(zh)) return;

        if (currentMode === LANGUAGE_MODES.ZH) {
            if (option.textContent !== zh) option.textContent = zh;
            return;
        }

        const immediate = getImmediateTranslation(zh);
        if (immediate.text) {
            const bilingualValue = zh + ' / ' + immediate.text;
            if (option.textContent !== bilingualValue) option.textContent = bilingualValue;
            if (immediate.source !== 'cache') {
                refreshOptionTranslationInBackground(option, zh, getElementContext(option) + ' select option');
            }
            return;
        }

        if (option.textContent !== zh) option.textContent = zh;
        translateTextWithDeepSeek(zh, getElementContext(option) + ' select option')
            .then(function(en) {
                if (currentMode === LANGUAGE_MODES.BILINGUAL) {
                    const bilingualValue = zh + ' / ' + en;
                    if (option.textContent !== bilingualValue) option.textContent = bilingualValue;
                }
            })
            .catch(function(error) {
                warnTranslationError(error, zh);
            });
    }

    function restoreI18nAttributes(root) {
        const selector = TRANSLATABLE_ATTRS.map(function(attr) {
            return '[data-' + getAttrDataName(attr) + ']';
        }).join(',') + ',option[data-i18n-option-zh]';
        const elements = collectElements(root, selector);

        elements.forEach(function(element) {
            if (element.tagName === 'OPTION') {
                const zh = element.dataset.i18nOptionZh || element.textContent;
                if (element.textContent !== zh) element.textContent = zh;
                return;
            }

            TRANSLATABLE_ATTRS.forEach(function(attr) {
                const key = getAttrDatasetKey(attr);
                if (element.dataset[key]) {
                    if (element.getAttribute(attr) !== element.dataset[key]) {
                        element.setAttribute(attr, element.dataset[key]);
                    }
                }
            });
        });
    }

    function scanTextNodes(root) {
        const startNode = root.nodeType === Node.TEXT_NODE ? root.parentElement : root;
        if (!startNode || shouldSkipElement(startNode)) return;

        const walker = document.createTreeWalker(startNode, NodeFilter.SHOW_TEXT, {
            acceptNode: function(node) {
                const text = normalizeText(node.nodeValue || '');
                if (!isEligibleChineseText(text)) return NodeFilter.FILTER_REJECT;
                const parent = node.parentElement;
                if (!parent || shouldSkipElement(parent) || isI18nGeneratedNode(parent)) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const nodes = [];
        let node = walker.nextNode();
        while (node) {
            nodes.push(node);
            node = walker.nextNode();
        }

        nodes.forEach(function(textNode) {
            const host = findTextHost(textNode);
            if (!host) return;
            const zh = normalizeText(textNode.nodeValue || '');
            translateAndAttach(host, zh, getElementContext(host));
        });
    }

    function processContentTextBlocks(root) {
        if (currentMode !== LANGUAGE_MODES.BILINGUAL) return;

        const roots = collectContentRoots(root);
        roots.forEach(function(contentRoot) {
            const candidates = collectContentBlockCandidates(contentRoot);
            candidates.forEach(function(element) {
                if (!element || !isElement(element) || isI18nGeneratedNode(element)) return;
                if (element.dataset.i18nProcessed === 'true') return;
                const zh = normalizeText(getDirectText(element));
                if (!isEligibleChineseContentText(zh) || isEligibleChineseText(zh)) return;
                translateContentAndAttach(element, zh, getElementContext(element) + ' content');
            });
        });
    }

    function translateContentAndAttach(element, chineseText, context) {
        const zh = normalizeText(chineseText || '');
        if (!element || !isElement(element) || !isEligibleChineseContentText(zh)) {
            return Promise.resolve('');
        }

        element.classList.add('i18n-bilingual', 'i18n-content-block');
        element.dataset.i18nProcessed = 'true';
        element.dataset.i18nSourceText = zh;

        const subtitle = getOrCreateSubtitle(element);
        subtitle.dataset.i18nFor = zh;
        subtitle.classList.remove('is-unavailable');

        const immediate = getImmediateTranslation(zh);
        if (immediate.text) {
            setSubtitleIfCurrent(element, subtitle, zh, immediate.text);
            if (immediate.source !== 'cache') {
                refreshContentTranslationInBackground(element, subtitle, zh, context);
            }
            return Promise.resolve(immediate.text);
        }

        return translateContentTextWithDeepSeek(zh, context)
            .then(function(en) {
                setSubtitleIfCurrent(element, subtitle, zh, en);
                return en;
            })
            .catch(function(error) {
                warnTranslationError(error, zh);
                subtitle.textContent = '';
                subtitle.classList.add('is-unavailable');
                return '';
            });
    }

    function collectContentRoots(root) {
        const target = root && root.nodeType === Node.TEXT_NODE ? root.parentElement : root;
        if (!target || !isElement(target)) return [];

        const roots = [];
        const addRoot = function(element) {
            if (!element || !isElement(element)) return;
            if (shouldSkipElement(element)) return;
            if (!roots.includes(element)) roots.push(element);
        };

        if (target.matches && target.matches(CONTENT_I18N_SELECTOR)) {
            addRoot(target);
        }

        if (target.closest) {
            addRoot(target.closest(CONTENT_I18N_SELECTOR));
        }

        if (target.querySelectorAll) {
            target.querySelectorAll(CONTENT_I18N_SELECTOR).forEach(addRoot);
        }

        return roots;
    }

    function collectContentBlockCandidates(contentRoot) {
        if (!contentRoot || !isElement(contentRoot)) return [];

        const selector = [
            'p',
            'li',
            'blockquote',
            '.citation-panel-summary',
            '.citation-group-title',
            '.citation-group-meta',
            '.citation-group-gloss',
            '.citation-scripture-banner',
            '.citation-commentary-head',
            '.citation-commentary-body',
            '.citation-commentary-extra',
            '.citation-analysis-title',
            '.citation-analysis-text',
            '.citation-analysis-meta',
            '.annotation-item',
            '.analysis-card',
            '.analysis-item',
            '.result-section',
            '.cross-ref-item',
            '.exegesis-item',
            'div'
        ].join(',');

        const candidates = [];
        const addCandidate = function(element) {
            if (!element || !isElement(element)) return;
            if (shouldSkipElement(element) || isI18nGeneratedNode(element)) return;
            if (element.closest('.sentence-highlight')) return;
            if (!candidates.includes(element)) candidates.push(element);
        };

        addCandidate(contentRoot);
        contentRoot.querySelectorAll(selector).forEach(addCandidate);
        return candidates;
    }

    function findTextHost(textNode) {
        let element = textNode.parentElement;
        if (!element || shouldSkipElement(element)) return null;

        const tagName = element.tagName.toLowerCase();
        const directText = normalizeText(getDirectText(element));
        const directChildCount = element.children ? element.children.length : 0;

        if (['button', 'a', 'label', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'strong', 'small', 'li'].includes(tagName)) {
            return element;
        }

        if (tagName === 'div' && directChildCount <= 2 && directText.length <= MAX_TEXT_LENGTH) {
            return element;
        }

        if (element.classList && (
            element.classList.contains('sidebar-title') ||
            element.classList.contains('right-card-title') ||
            element.classList.contains('section-title') ||
            element.classList.contains('input-label') ||
            element.classList.contains('content-meta') ||
            element.classList.contains('instruction-box') ||
            element.classList.contains('hint') ||
            element.classList.contains('loading') ||
            element.classList.contains('analyzing') ||
            element.classList.contains('auto-notes-status') ||
            element.classList.contains('empty-community') ||
            element.classList.contains('hm-detail-hint') ||
            element.classList.contains('hm-disclaimer')
        )) {
            return element;
        }

        return null;
    }

    function getOrCreateSubtitle(element) {
        let subtitle = Array.from(element.children || []).find(function(child) {
            return child.classList && child.classList.contains('i18n-en-subtitle') && child.dataset.i18nGenerated === 'true';
        });

        if (subtitle) return subtitle;

        subtitle = document.createElement('span');
        subtitle.className = 'i18n-en-subtitle';
        subtitle.dataset.i18nGenerated = 'true';
        subtitle.setAttribute('aria-hidden', 'true');
        element.appendChild(subtitle);
        return subtitle;
    }

    function setSubtitleIfCurrent(element, subtitle, zh, en) {
        if (currentMode !== LANGUAGE_MODES.BILINGUAL) return;
        if (element.dataset.i18nSourceText !== zh) return;
        subtitle.textContent = en;
        subtitle.classList.remove('is-unavailable');
    }

    function refreshTranslationInBackground(element, subtitle, zh, context) {
        if (Date.now() < unavailableUntil || getCachedTranslation(zh)) return;
        translateTextWithDeepSeek(zh, context)
            .then(function(en) {
                setSubtitleIfCurrent(element, subtitle, zh, en);
            })
            .catch(function(error) {
                warnTranslationError(error, zh);
            });
    }

    function refreshAttributeTranslationInBackground(element, attrName, zh, context) {
        if (Date.now() < unavailableUntil || getCachedTranslation(zh)) return;
        translateTextWithDeepSeek(zh, context)
            .then(function(en) {
                if (currentMode !== LANGUAGE_MODES.BILINGUAL) return;
                const bilingualValue = zh + ' / ' + en;
                if (element.getAttribute(attrName) !== bilingualValue) {
                    element.setAttribute(attrName, bilingualValue);
                }
            })
            .catch(function(error) {
                warnTranslationError(error, zh);
            });
    }

    function refreshOptionTranslationInBackground(option, zh, context) {
        if (Date.now() < unavailableUntil || getCachedTranslation(zh)) return;
        translateTextWithDeepSeek(zh, context)
            .then(function(en) {
                if (currentMode !== LANGUAGE_MODES.BILINGUAL) return;
                const bilingualValue = zh + ' / ' + en;
                if (option.textContent !== bilingualValue) option.textContent = bilingualValue;
            })
            .catch(function(error) {
                warnTranslationError(error, zh);
            });
    }

    function drainTranslationQueue() {
        // Keep UI responsive and avoid flooding the local DeepSeek proxy.
        if (Date.now() < unavailableUntil) {
            rejectQueuedTranslations(new Error('Translation service temporarily unavailable'));
            return;
        }

        while (activeTranslations < TRANSLATION_CONCURRENCY && translationQueue.length > 0) {
            const job = translationQueue.shift();
            activeTranslations += 1;
            runTranslationJob(job)
                .then(job.resolve)
                .catch(function(error) {
                    if (isTemporaryServiceFailure(error)) {
                        unavailableUntil = Date.now() + TEMPORARY_FAILURE_COOLDOWN_MS;
                    }
                    job.reject(error);
                })
                .finally(function() {
                    activeTranslations -= 1;
                    drainTranslationQueue();
                });
        }
    }

    async function runTranslationJob(job) {
        if (Date.now() < unavailableUntil) {
            throw new Error('Translation service temporarily unavailable');
        }

        if (typeof window.callDeepSeekChat !== 'function') {
            throw new Error('DeepSeek adapter is not loaded');
        }

        const translated = await window.callDeepSeekChat(buildTranslationMessages(job.text, job.context), {
            temperature: 0.1,
            timeoutMs: 45000,
            loadingMessage: '正在生成界面对译'
        });
        const en = sanitizeTranslation(translated);
        if (!en) {
            throw new Error('DeepSeek returned an empty translation');
        }

        setCachedTranslation(job.text, en);
        return en;
    }

    function buildTranslationMessages(text, context) {
        return [
            {
                role: 'system',
                content: [
                    'You translate Chinese UI copy for international students using a Chinese classics and classical studies learning platform.',
                    'Translate accurately, concisely, academically, and in plain English.',
                    'Do not expand, explain, summarize, or add extra context.',
                    'Preserve proper names where appropriate: 《论语》 as Analects, 《孟子》 as Mencius, 孔子 as Confucius.',
                    'Return only one English string. Do not use Markdown. Do not add quotation marks.'
                ].join(' ')
            },
            {
                role: 'user',
                content: 'Context: ' + (context || 'general UI') + '\nChinese UI text:\n' + text
            }
        ];
    }

    function sanitizeTranslation(value) {
        let text = String(value || '').trim();
        text = text.replace(/^```(?:[a-z]+)?/i, '').replace(/```$/i, '').trim();
        text = text.replace(/^English\s*[:：]\s*/i, '').trim();
        text = text.replace(/^["“”'‘’]+|["“”'‘’]+$/g, '').trim();
        text = text.replace(/\s*\n+\s*/g, ' ');
        return text.slice(0, 240);
    }

    function rejectQueuedTranslations(error) {
        const queued = translationQueue.splice(0);
        queued.forEach(function(job) {
            job.reject(error);
        });
    }

    function scheduleApplyI18n(root, delay) {
        if (!root) return;
        queuedRoots.add(root);
        if (scanTimer) return;

        scanTimer = window.setTimeout(function() {
            const roots = Array.from(queuedRoots);
            queuedRoots = new Set();
            scanTimer = null;
            roots.forEach(function(target) {
                applyI18nToPage(target);
            });
        }, delay === undefined ? 60 : delay);
    }

    function bindLanguageSwitcher() {
        const switcher = document.querySelector('.language-switcher');
        if (!switcher) return;

        switcher.addEventListener('click', function(event) {
            const button = event.target.closest('[data-language-mode]');
            if (!button) return;
            setLanguageMode(button.dataset.languageMode);
        });

        updateLanguageSwitcher();
    }

    function updateLanguageSwitcher() {
        document.querySelectorAll('.language-switcher [data-language-mode]').forEach(function(button) {
            const isActive = normalizeLanguageMode(button.dataset.languageMode) === currentMode;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    function setDocumentMode(mode) {
        document.documentElement.setAttribute('data-ui-language-mode', mode);
        if (document.body) {
            document.body.setAttribute('data-ui-language-mode', mode);
        }
    }

    function patchBrowserDialogs() {
        if (dialogsPatched) return;
        dialogsPatched = true;

        const originalAlert = window.alert;
        const originalConfirm = window.confirm;
        const originalPrompt = window.prompt;

        window.alert = function(message) {
            return originalAlert.call(window, buildDialogText(message));
        };

        window.confirm = function(message) {
            return originalConfirm.call(window, buildDialogText(message));
        };

        window.prompt = function(message, defaultValue) {
            return originalPrompt.call(window, buildDialogText(message), defaultValue);
        };
    }

    function buildDialogText(message) {
        const text = String(message || '');
        if (currentMode !== LANGUAGE_MODES.BILINGUAL || !containsChinese(text)) {
            return text;
        }

        const normalized = normalizeText(text);
        if (isEligibleChineseText(normalized)) {
            const immediate = getImmediateTranslation(normalized);
            if (immediate.text) {
                if (immediate.source !== 'cache') {
                    translateTextWithDeepSeek(normalized, 'browser dialog').catch(function(error) {
                        warnTranslationError(error, normalized);
                    });
                }
                return text + '\n\n' + immediate.text;
            }
            translateTextWithDeepSeek(normalized, 'browser dialog')
                .catch(function(error) {
                    warnTranslationError(error, normalized);
                });
        }

        return text;
    }

    function getImmediateTranslation(text) {
        const cached = getCachedTranslation(text);
        if (cached) return { text: cached, source: 'cache' };

        const fallback = getFallbackTranslation(text);
        if (fallback) return { text: fallback, source: 'fallback' };

        return { text: '', source: '' };
    }

    function getFallbackTranslation(text) {
        const zh = normalizeText(text || '');
        if (!zh) return '';

        const dictionary = window.LantaiI18nDictionary || {};
        if (dictionary[zh]) return sanitizeTranslation(dictionary[zh]);

        const normalizedKey = normalizeDictionaryKey(zh);
        if (dictionary[normalizedKey]) return sanitizeTranslation(dictionary[normalizedKey]);

        const ruleBased = translateByRules(zh);
        if (ruleBased) return sanitizeTranslation(ruleBased);

        const knownTerms = translateByKnownTerms(zh);
        if (knownTerms) return sanitizeTranslation(knownTerms);

        return '';
    }

    function getCachedTranslation(text) {
        const zh = normalizeText(text || '');
        if (!zh) return '';

        try {
            const raw = localStorage.getItem(getCacheKey(zh));
            if (!raw) return '';
            const parsed = JSON.parse(raw);
            if (parsed && parsed.zh === zh && parsed.en) return parsed.en;
        } catch (error) {
            return '';
        }

        return '';
    }

    function setCachedTranslation(text, en) {
        const zh = normalizeText(text || '');
        const translated = sanitizeTranslation(en);
        if (!zh || !translated) return;

        try {
            localStorage.setItem(getCacheKey(zh), JSON.stringify({
                zh,
                en: translated,
                updatedAt: new Date().toISOString()
            }));
        } catch (error) {
            console.warn('[i18n] Unable to cache translation:', error);
        }
    }

    function getCacheKey(text) {
        return CACHE_PREFIX + hashText(text);
    }

    function hashText(text) {
        let hash = 2166136261;
        for (let i = 0; i < text.length; i += 1) {
            hash ^= text.charCodeAt(i);
            hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
        }
        return (hash >>> 0).toString(36);
    }

    function readStoredLanguageMode() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            return LANGUAGE_MODES.ZH;
        }
    }

    function normalizeLanguageMode(mode) {
        return mode === LANGUAGE_MODES.BILINGUAL ? LANGUAGE_MODES.BILINGUAL : LANGUAGE_MODES.ZH;
    }

    function normalizeText(value) {
        return String(value || '').replace(/\s+/g, ' ').trim();
    }

    function normalizeDictionaryKey(value) {
        return normalizeText(value)
            .replace(/[“”]/g, '"')
            .replace(/[‘’]/g, "'")
            .replace(/（/g, '(')
            .replace(/）/g, ')')
            .replace(/：/g, ':')
            .replace(/。$/, '')
            .trim();
    }

    function translateByRules(text) {
        const value = normalizeText(text);
        let match;

        match = value.match(/^第\s*(\d+)\s*版$/);
        if (match) return 'Version ' + match[1];

        match = value.match(/^第\s*(\d+)\s*站\s*\/\s*共\s*(\d+)\s*站$/);
        if (match) return 'Stop ' + match[1] + ' / ' + match[2];

        match = value.match(/^(\d+)\s*\/\s*(\d+)$/);
        if (match) return match[1] + ' / ' + match[2];

        match = value.match(/^(\d+)\s*个教学文档已加载$/);
        if (match) return match[1] + ' teaching documents loaded';

        match = value.match(/^(\d+)\s*个文件$/);
        if (match) return match[1] + ' files';

        match = value.match(/^(\d+)\s*个版本$/);
        if (match) return match[1] + ' versions';

        match = value.match(/^已加载\s*(\d+)\s*个文件(.*)$/);
        if (match) return 'Loaded ' + match[1] + ' files' + (match[2] ? ' ' + match[2] : '');

        match = value.match(/^已断句\s*(\d+)\s*段，整理出\s*(\d+)\s*组内证互参，涉及\s*(\d+)\s*部经典$/);
        if (match) return 'Segmented into ' + match[1] + ' passage(s), organized ' + match[2] + ' internal evidence group(s), covering ' + match[3] + ' classic(s)';

        match = value.match(/^已断句\s*(\d+)\s*段，并在\s*scripture_content\s*中逐句检索，但没有直接命中$/);
        if (match) return 'Segmented into ' + match[1] + ' passage(s) and searched scripture_content sentence by sentence, but no direct match was found';

        match = value.match(/^共检测到\s*(\d+)\s*处跨文献关联$/);
        if (match) return 'Detected ' + match[1] + ' cross-text link(s)';

        match = value.match(/^涉及\s*(\d+)\s*部经典[:：]\s*(.+)$/);
        if (match) return 'Involves ' + match[1] + ' classic(s): ' + match[2];

        match = value.match(/^\.{3}还有\s*(\d+)\s*条$/);
        if (match) return '...' + match[1] + ' more';

        match = value.match(/^《(.+?)》\s*内证互参$/);
        if (match) return 'Internal Evidence Comparison in ' + match[1];

        match = value.match(/^正在(.+)\.\.\.$/);
        if (match) return 'Processing ' + lowercaseFirst(getFallbackTranslation(match[1]) || match[1]) + '...';

        match = value.match(/^正在(.+)$/);
        if (match) return 'Processing ' + lowercaseFirst(getFallbackTranslation(match[1]) || match[1]);

        match = value.match(/^(加载失败|连接失败|请求失败|删除失败|上传失败|评论失败|解析失败|生成失败|错误)[:：]\s*(.+)$/);
        if (match) return (getFallbackTranslation(match[1]) || match[1]) + ': ' + match[2];

        match = value.match(/^暂无(.+)$/);
        if (match) return 'No ' + lowercaseFirst(getFallbackTranslation(match[1]) || match[1]) + ' yet';

        match = value.match(/^(.+?)[:：]\s*(.+)$/);
        if (match) {
            const prefix = getFallbackTranslation(match[1]);
            if (prefix) return prefix + ': ' + (getFallbackTranslation(match[2]) || match[2]);
        }

        match = value.match(/^(.+?)（(.+?)）$/);
        if (match) {
            const main = getFallbackTranslation(match[1]);
            const detail = getFallbackTranslation(match[2]);
            if (main || detail) return (main || match[1]) + ' (' + (detail || match[2]) + ')';
        }

        match = value.match(/^(.+?)\s*\((.+?)\)$/);
        if (match) {
            const main = getFallbackTranslation(match[1]);
            if (main) return main + ' (' + match[2] + ')';
        }

        return '';
    }

    function translateByKnownTerms(text) {
        const value = normalizeText(text);
        if (!value || value.length > 24 || /[，。！？；：]/.test(value)) return '';

        const phraseDictionary = window.LantaiI18nPhraseDictionary || {};
        const terms = Object.keys(phraseDictionary).sort(function(a, b) {
            return b.length - a.length;
        });

        if (!terms.length) return '';

        let source = value;
        const translated = [];
        while (source) {
            const asciiMatch = source.match(/^[A-Za-z0-9_\-./ ]+/);
            if (asciiMatch) {
                translated.push(asciiMatch[0].trim());
                source = source.slice(asciiMatch[0].length);
                continue;
            }

            const matched = terms.find(function(term) {
                return source.startsWith(term);
            });
            if (!matched) return '';
            translated.push(phraseDictionary[matched]);
            source = source.slice(matched.length);
        }

        return toTitleCase(translated.filter(Boolean).join(' '));
    }

    function lowercaseFirst(value) {
        const text = String(value || '');
        return text.charAt(0).toLowerCase() + text.slice(1);
    }

    function toTitleCase(value) {
        return String(value || '').replace(/\w\S*/g, function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
    }

    function isEligibleChineseText(text) {
        const value = normalizeText(text);
        if (!value || !containsChinese(value)) return false;
        if (value.length > MAX_TEXT_LENGTH) return false;
        if ((value.match(/[。！？!?；;]/g) || []).length > 3) return false;
        return true;
    }

    function isEligibleChineseContentText(text) {
        const value = normalizeText(text);
        if (!value || !containsChinese(value)) return false;
        if (value.length <= MAX_TEXT_LENGTH) return true;
        if (value.length > MAX_CONTENT_TEXT_LENGTH) return false;
        if ((value.match(/[。！？!?；;]/g) || []).length > 18) return false;
        return true;
    }

    function containsChinese(value) {
        return /[\u3400-\u9fff\uf900-\ufaff]/.test(String(value || ''));
    }

    function shouldSkipElement(element) {
        if (!element || !isElement(element)) return true;
        return !!element.closest(SKIP_SELECTOR);
    }

    function shouldSkipAttributeElement(element) {
        if (!element || !isElement(element)) return true;
        if (element.closest('.language-switcher,[data-i18n-skip="true"]')) return true;
        if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'SVG', 'CANVAS'].includes(element.tagName)) return true;
        return false;
    }

    function isI18nGeneratedNode(node) {
        if (!node) return false;
        const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
        return !!(element && element.closest('.i18n-en-subtitle'));
    }

    function isElement(value) {
        return value && value.nodeType === Node.ELEMENT_NODE;
    }

    function getDirectText(element) {
        let text = '';
        element.childNodes.forEach(function(child) {
            if (child.nodeType === Node.TEXT_NODE) {
                text += child.nodeValue || '';
            }
        });
        return text;
    }

    function collectElements(root, selector) {
        if (!root) return [];
        const elements = [];
        if (root.nodeType === Node.ELEMENT_NODE && root.matches(selector)) {
            elements.push(root);
        }
        if (root.querySelectorAll) {
            elements.push.apply(elements, Array.from(root.querySelectorAll(selector)));
        }
        return elements;
    }

    function getElementContext(element) {
        if (!element || !isElement(element)) return 'general UI';
        if (element.dataset.i18nContext) return element.dataset.i18nContext;

        const panel = element.closest('.panel');
        const panelId = panel ? panel.id : '';
        const classes = element.className && typeof element.className === 'string'
            ? element.className.split(/\s+/).slice(0, 3).join('.')
            : '';
        return [panelId, element.tagName ? element.tagName.toLowerCase() : '', classes].filter(Boolean).join(' ');
    }

    function getAttrDatasetKey(attrName) {
        if (attrName === 'aria-label') return 'i18nAriaLabelZh';
        return 'i18n' + attrName.charAt(0).toUpperCase() + attrName.slice(1) + 'Zh';
    }

    function getAttrDataName(attrName) {
        if (attrName === 'aria-label') return 'i18n-aria-label-zh';
        return 'i18n-' + attrName + '-zh';
    }

    function isTemporaryServiceFailure(error) {
        const message = String(error && error.message ? error.message : error || '');
        return /MISSING_DEEPSEEK_API_KEY|API Key|未配置|not loaded|Failed to fetch|后端|接口|timeout|超时|temporarily unavailable/i.test(message);
    }

    function warnTranslationError(error, text) {
        const message = error && error.message ? error.message : String(error || 'Unknown translation error');
        const key = message.slice(0, 160);
        if (warnedMessages.has(key)) return;
        warnedMessages.add(key);
        console.warn('[i18n] Translation failed for "' + String(text || '').slice(0, 40) + '":', error);
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

    window.initI18n = initI18n;
    window.setLanguageMode = setLanguageMode;
    window.getLanguageMode = getLanguageMode;
    window.applyI18nToPage = applyI18nToPage;
    window.translateAndAttach = translateAndAttach;
    window.observeDynamicText = observeDynamicText;
    window.renderBilingualText = renderBilingualText;
    window.createBilingualElement = createBilingualElement;
    window.translateTextWithDeepSeek = translateTextWithDeepSeek;
    window.refreshLantaiI18n = scheduleApplyI18n;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18n);
    } else {
        initI18n();
    }
})();
