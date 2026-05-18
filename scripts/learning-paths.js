(function () {
    'use strict';

    var PATHS_STORAGE_KEY = 'classicLearningPathsProgress';

    var CONCEPT_TO_CC = {
        '仁': 'ren-christian-love',
        '君子': 'junzi-aristotle',
        '礼': 'li-greek-nomos',
        '道': 'dao-logos'
    };

    var CONCEPT_KEYWORD_MAP = [
        { keyword: '君子', id: 'junzi' },
        { keyword: '忠恕', id: 'zhongshu' },
        { keyword: '仁', id: 'ren' },
        { keyword: '礼', id: 'li' },
        { keyword: '道', id: 'dao' },
        { keyword: '孝', id: 'xiao' },
        { keyword: '义', id: 'yi' },
        { keyword: '德', id: 'de' },
        { keyword: 'ren', id: 'ren' },
        { keyword: 'li', id: 'li' },
        { keyword: 'junzi', id: 'junzi' },
        { keyword: 'dao', id: 'dao' },
        { keyword: 'xiao', id: 'xiao' },
        { keyword: 'yi', id: 'yi' }
    ];

    var LEARNING_PATHS = [
        {
            id: 'beginner',
            title: '认识孔子与《论语》',
            titleEn: 'Getting to Know Confucius and the Analects',
            level: 'beginner',
            levelLabel: '入门',
            levelLabelEn: 'Beginner',
            description: '适合零基础学习者，从孔子其人、《论语》其书开始，迈出中国经典学习的第一步',
            descriptionEn: 'Designed for absolute beginners. Start with Confucius the man and the Analects the book — your first step into Chinese classics.',
            icon: '',
            units: [
                {
                    id: 'b1',
                    title: '孔子是谁？',
                    titleEn: 'Who is Confucius?',
                    description: '了解孔子的生平——从失意贵族到万世师表',
                    descriptionEn: 'Learn about Confucius\' life — from a frustrated noble to a teacher for all ages.',
                    estimatedTime: '15 分钟',
                    estimatedTimeEn: '15 min',
                    relatedTexts: [
                        { title: '史记·孔子世家', ref: 'shiji' },
                        { title: '论语·为政', ref: 'lunyu_weizheng' }
                    ],
                    keyConcepts: ['孔子', 'Confucius', '春秋', 'Spring and Autumn'],
                    task: '阅读《史记·孔子世家》中关于孔子幼年的段落，找出三个影响他一生的关键事件。',
                    taskEn: 'Read the passage about Confucius\' childhood in the Records of the Grand Historian. Identify three key events that shaped his life.'
                },
                {
                    id: 'b2',
                    title: '春秋时代',
                    titleEn: 'The Spring and Autumn Period',
                    description: '理解孔子所生活的时代背景——礼崩乐坏的乱世',
                    descriptionEn: 'Understand the historical context of Confucius\' time — a world of collapsing rites and disorder.',
                    estimatedTime: '20 分钟',
                    estimatedTimeEn: '20 min',
                    relatedTexts: [
                        { title: '论语·八佾', ref: 'lunyu_bayi' },
                        { title: '左传·隐公', ref: 'zuozhuan_yin' }
                    ],
                    keyConcepts: ['春秋', 'Spring and Autumn', '礼崩乐坏', 'collapse of rites'],
                    task: '阅读《论语·八佾》中关于"礼"的章节，思考孔子为什么如此重视礼仪。',
                    taskEn: 'Read the chapters on "ritual" (li) in Analects Book 3. Reflect on why Confucius valued ritual so deeply.'
                },
                {
                    id: 'b3',
                    title: '《论语》是本什么样的书？',
                    titleEn: 'What Kind of Book is the Analects?',
                    description: '认识《论语》的成书、结构和读法',
                    descriptionEn: 'Understand how the Analects was compiled, its structure, and how to read it.',
                    estimatedTime: '15 分钟',
                    estimatedTimeEn: '15 min',
                    relatedTexts: [
                        { title: '论语·学而', ref: 'lunyu_xueer' },
                        { title: '汉志·六艺略', ref: 'han_zhi' }
                    ],
                    keyConcepts: ['论语', 'Analects', '语录体', 'sayings genre'],
                    task: '浏览《论语·学而》篇，找出你最喜欢的一条语录，并写下你的第一印象。',
                    taskEn: 'Browse Analects Book 1. Find your favorite saying and write down your first impression.'
                },
                {
                    id: 'b4',
                    title: '孔子与弟子',
                    titleEn: 'Confucius and His Disciples',
                    description: '认识孔子最重要的几位弟子，理解师徒之间的对话',
                    descriptionEn: 'Meet Confucius\' most important disciples and understand their dialogues.',
                    estimatedTime: '25 分钟',
                    estimatedTimeEn: '25 min',
                    relatedTexts: [
                        { title: '论语·先进', ref: 'lunyu_xianjin' },
                        { title: '论语·雍也', ref: 'lunyu_yongye' }
                    ],
                    keyConcepts: ['弟子', 'disciples', '颜回', 'Yan Hui', '子路', 'Zilu'],
                    task: '阅读"四科十哲"的段落（《论语·先进》），选择一位你最感兴趣的弟子并说明原因。',
                    taskEn: 'Read the "Four Categories, Ten Philosophers" passage (Analects 11). Choose one disciple you find most interesting and explain why.'
                },
                {
                    id: 'b5',
                    title: '仁的起点',
                    titleEn: 'The Starting Point of Ren',
                    description: '初步理解儒家核心概念"仁"——它从何处开始？',
                    descriptionEn: 'A first look at the core Confucian concept of ren (benevolence) — where does it begin?',
                    estimatedTime: '20 分钟',
                    estimatedTimeEn: '20 min',
                    relatedTexts: [
                        { title: '论语·颜渊', ref: 'lunyu_yanyuan' },
                        { title: '论语·里仁', ref: 'lunyu_liren' }
                    ],
                    keyConcepts: ['仁', 'ren', '克己复礼', 'self-restraint'],
                    task: '阅读"克己复礼为仁"一章（《论语·颜渊》），用你自己的话解释仁和礼的关系。',
                    taskEn: 'Read the passage "To master the self and return to ritual is ren" (Analects 12:1). Explain the relationship between ren and li in your own words.'
                }
            ]
        },
        {
            id: 'intermediate',
            title: '核心概念与儒家思想',
            titleEn: 'Core Concepts and Confucian Thought',
            level: 'intermediate',
            levelLabel: '进阶',
            levelLabelEn: 'Intermediate',
            description: '深入学习儒家思想的核心概念，建立对中国哲学基本框架的理解',
            descriptionEn: 'Dive deeper into the core concepts of Confucian thought and build a foundational understanding of Chinese philosophy.',
            icon: '',
            units: [
                {
                    id: 'i1',
                    title: '仁——德性的核心',
                    titleEn: 'Ren — The Core of Virtue',
                    description: '深入理解"仁"的多重含义及其在儒家思想中的核心地位',
                    descriptionEn: 'Deepen your understanding of ren and its central role in Confucian thought.',
                    estimatedTime: '30 分钟',
                    estimatedTimeEn: '30 min',
                    relatedTexts: [
                        { title: '论语·颜渊', ref: 'lunyu_yanyuan' },
                        { title: '孟子·告子上', ref: 'mengzi_gaozi' }
                    ],
                    keyConcepts: ['仁', 'ren', '爱人', 'loving others', '忠恕', 'loyalty and reciprocity'],
                    task: '比较《论语》和《孟子》中对"仁"的定义，找出两种表述的异同。',
                    taskEn: 'Compare the definitions of ren in the Analects and Mencius. Identify similarities and differences.'
                },
                {
                    id: 'i2',
                    title: '礼——社会的秩序',
                    titleEn: 'Li — Social Order',
                    description: '礼不仅是仪式，更是社会秩序的根基',
                    descriptionEn: 'Li is not just ritual — it is the foundation of social order.',
                    estimatedTime: '25 分钟',
                    estimatedTimeEn: '25 min',
                    relatedTexts: [
                        { title: '论语·八佾', ref: 'lunyu_bayi' },
                        { title: '礼记·曲礼', ref: 'liji_quli' }
                    ],
                    keyConcepts: ['礼', 'li', '正名', 'rectification of names'],
                    task: '阅读"君君臣臣父父子子"一章，思考正名思想在现代社会的意义。',
                    taskEn: 'Read the passage on "rectification of names" and reflect on its relevance in modern society.'
                },
                {
                    id: 'i3',
                    title: '义——行为的准则',
                    titleEn: 'Yi — The Standard of Action',
                    description: '义是区分君子与小人的关键——何为当为，何为不当为',
                    descriptionEn: 'Yi distinguishes the exemplary person from the petty person — what ought and ought not to be done.',
                    estimatedTime: '20 分钟',
                    estimatedTimeEn: '20 min',
                    relatedTexts: [
                        { title: '论语·里仁', ref: 'lunyu_liren' },
                        { title: '孟子·鱼我所欲也', ref: 'mengzi_yu' }
                    ],
                    keyConcepts: ['义', 'yi', '利义之辨', 'profit vs righteousness'],
                    task: '阅读孟子"鱼我所欲也"章，分析孟子如何论证义重于生命。',
                    taskEn: 'Read Mencius\' "Fish is what I desire" passage. Analyze how Mencius argues that yi is more important than life.'
                },
                {
                    id: 'i4',
                    title: '君子——理想人格',
                    titleEn: 'Junzi — The Exemplary Person',
                    description: '君子是儒家的人格理想——如何成为一个有德之人？',
                    descriptionEn: 'The junzi is the Confucian ideal of personhood — how does one become virtuous?',
                    estimatedTime: '25 分钟',
                    estimatedTimeEn: '25 min',
                    relatedTexts: [
                        { title: '论语·宪问', ref: 'lunyu_xianwen' },
                        { title: '论语·卫灵公', ref: 'lunyu_weiling' }
                    ],
                    keyConcepts: ['君子', 'junzi', '小人', 'petty person', '修身', 'self-cultivation'],
                    task: '列出《论语》中关于君子的五种品质，并选择一种你认为最重要的加以论述。',
                    taskEn: 'List five qualities of the junzi from the Analects. Choose the one you think is most important and explain why.'
                },
                {
                    id: 'i5',
                    title: '孝——伦理的根基',
                    titleEn: 'Xiao — The Root of Ethics',
                    description: '孝是儒家伦理的起点——为何爱亲是一切德性的基础？',
                    descriptionEn: 'Filial piety is the starting point of Confucian ethics — why is love for family the root of all virtue?',
                    estimatedTime: '20 分钟',
                    estimatedTimeEn: '20 min',
                    relatedTexts: [
                        { title: '论语·为政', ref: 'lunyu_weizheng' },
                        { title: '孝经', ref: 'xiaojing' }
                    ],
                    keyConcepts: ['孝', 'filial piety', '三年之丧', 'three-year mourning'],
                    task: '阅读《论语·为政》中关于"孝"的几段对话，思考孝与仁的关系。',
                    taskEn: 'Read the passages on filial piety in Analects Book 2. Reflect on the relationship between xiao and ren.'
                }
            ]
        },
        {
            id: 'advanced',
            title: '注疏传统与思想史',
            titleEn: 'Commentary Tradition and Intellectual History',
            level: 'advanced',
            levelLabel: '深入',
            levelLabelEn: 'Advanced',
            description: '了解中国经典的注疏传统与儒学思想史的演变脉络，从汉唐到宋明再到现代',
            descriptionEn: 'Explore the commentary tradition of Chinese classics and the evolution of Confucian intellectual history from Han-Tang to Song-Ming to the modern era.',
            icon: '',
            units: [
                {
                    id: 'a1',
                    title: '什么是注疏？',
                    titleEn: 'What is Commentary?',
                    description: '了解经、注、疏、集解等基本概念——中国经典的注释传统',
                    descriptionEn: 'Understand the basic concepts of jing (classic), zhu (commentary), shu (subcommentary), and jijie (collected explanations).',
                    estimatedTime: '20 分钟',
                    estimatedTimeEn: '20 min',
                    relatedTexts: [
                        { title: '四库全书总目·经部总叙', ref: 'siku_jing' },
                        { title: '十三经注疏·周易正义序', ref: 'shisanjing' }
                    ],
                    keyConcepts: ['注', 'commentary', '疏', 'subcommentary', '传', 'tradition'],
                    task: '查阅《四库全书总目·经部总叙》，了解"经"的概念及其分类。',
                    taskEn: 'Consult the General Catalogue of the Complete Library of the Four Treasuries, section on Classics, to understand the concept and categories of "jing."'
                },
                {
                    id: 'a2',
                    title: '汉唐注疏传统',
                    titleEn: 'The Han-Tang Commentary Tradition',
                    description: '从郑玄到孔颖达——汉唐注疏的特点与方法',
                    descriptionEn: 'From Zheng Xuan to Kong Yingda — the characteristics and methods of Han-Tang commentary.',
                    estimatedTime: '30 分钟',
                    estimatedTimeEn: '30 min',
                    relatedTexts: [
                        { title: '十三经注疏', ref: 'shisanjing' },
                        { title: '后汉书·郑玄传', ref: 'houhanshu_zhengxuan' }
                    ],
                    keyConcepts: ['郑玄', 'Zheng Xuan', '孔颖达', 'Kong Yingda', '五经正义', 'Correct Meanings'],
                    task: '比较郑玄和孔颖达对同一段《论语》的不同解释，分析他们的注疏方法差异。',
                    taskEn: 'Compare Zheng Xuan\'s and Kong Yingda\'s interpretations of the same Analects passage. Analyze the differences in their commentarial approaches.'
                },
                {
                    id: 'a3',
                    title: '宋明理学',
                    titleEn: 'Song-Ming Neo-Confucianism',
                    description: '从二程到朱子到阳明——宋明理学的核心议题',
                    descriptionEn: 'From the Cheng brothers to Zhu Xi to Wang Yangming — core issues of Song-Ming Neo-Confucianism.',
                    estimatedTime: '35 分钟',
                    estimatedTimeEn: '35 min',
                    relatedTexts: [
                        { title: '大学章句集注', ref: 'daxue_zhuzhu' },
                        { title: '传习录', ref: 'chuanxilu' }
                    ],
                    keyConcepts: ['理学', 'Neo-Confucianism', '格物致知', 'investigation of things', '心即理', 'mind is principle'],
                    task: '阅读朱子在《大学章句》中的"格物致知"补传，思考他对经典的解释与前人有何不同。',
                    taskEn: 'Read Zhu Xi\'s "supplement" on the investigation of things in his commentary on the Great Learning. Reflect on how his interpretation differs from earlier commentators.'
                },
                {
                    id: 'a4',
                    title: '清代考据学',
                    titleEn: 'Qing Evidential Scholarship',
                    description: '清代学者如何通过考据重新理解经典？',
                    descriptionEn: 'How did Qing scholars re-interpret the classics through evidential research?',
                    estimatedTime: '25 分钟',
                    estimatedTimeEn: '25 min',
                    relatedTexts: [
                        { title: '论语正义·刘宝楠', ref: 'lunyu_zhengyi' },
                        { title: '汉学师承记', ref: 'hanxue_shicheng' }
                    ],
                    keyConcepts: ['考据', 'evidential research', '朴学', 'plain scholarship'],
                    task: '阅读刘宝楠《论语正义》中关于"仁"的疏解，比较他与朱子解释的不同。',
                    taskEn: 'Read Liu Baonan\'s subcommentary on "ren" in the Correct Meaning of the Analects. Compare his interpretation with Zhu Xi\'s.'
                },
                {
                    id: 'a5',
                    title: '现代学术中的经典研究',
                    titleEn: 'Classical Studies in Modern Academia',
                    description: '二十世纪以来中国经典研究的转向：从经学到哲学、历史学与语文学',
                    descriptionEn: 'The transformation of classical studies in the 20th century: from jingxue to philosophy, history, and philology.',
                    estimatedTime: '30 分钟',
                    estimatedTimeEn: '30 min',
                    relatedTexts: [
                        { title: '中国哲学史·冯友兰', ref: 'feng_youlan' },
                        { title: '古代中国的思想世界·史华兹', ref: 'schwartz' }
                    ],
                    keyConcepts: ['经学', 'jingxue', '疑古', 'doubting antiquity', '释古', 'interpreting antiquity'],
                    task: '选择一位现代学者（如冯友兰、钱穆、史华兹）对中国经典的研究方法，写一段简评。',
                    taskEn: 'Choose one modern scholar (Feng Youlan, Qian Mu, or Benjamin Schwartz) and write a brief assessment of their approach to Chinese classics.'
                }
            ]
        }
    ];

    function getProgress() {
        try {
            var data = localStorage.getItem(PATHS_STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            return {};
        }
    }

    function saveProgress(progress) {
        try {
            localStorage.setItem(PATHS_STORAGE_KEY, JSON.stringify(progress));
        } catch (e) {
            console.warn('[LearningPaths] Unable to save progress:', e);
        }
    }

    function markUnitComplete(pathId, unitId) {
        var progress = getProgress();
        if (!progress[pathId]) {
            progress[pathId] = { completedUnits: [], startedAt: new Date().toISOString() };
        }
        if (progress[pathId].completedUnits.indexOf(unitId) === -1) {
            progress[pathId].completedUnits.push(unitId);
        }
        progress[pathId].lastUpdated = new Date().toISOString();
        saveProgress(progress);
    }

    function isUnitComplete(pathId, unitId) {
        var progress = getProgress();
        return !!(progress[pathId] && progress[pathId].completedUnits.indexOf(unitId) !== -1);
    }

    function getPathProgress(pathId) {
        var progress = getProgress();
        return progress[pathId] || { completedUnits: [] };
    }

    function renderLearningPaths() {
        var container = document.getElementById('learningPathsContainer');
        if (!container) return;

        var viewingPath = container.dataset.viewingPath;
        if (viewingPath) {
            renderPathDetail(viewingPath);
            return;
        }

        var html = '<div class="lp-header">' +
            window.renderBilingualText ? window.renderBilingualText('中国经典入门路径', { tagName: 'h2', className: 'lp-module-title' }) : '<h2 class="lp-module-title">中国经典入门路径</h2>' +
            '</div>';

        html += '<div class="lp-intro">' +
            (window.renderBilingualText ? window.renderBilingualText('选择适合你的学习路径，循序渐进步入中国经典的世界。', { tagName: 'p', className: 'lp-intro-text' }) : '<p class="lp-intro-text">选择适合你的学习路径，循序渐进步入中国经典的世界。</p>') +
            '</div>';

        var allCompleted = 0;
        var allTotal = 0;
        LEARNING_PATHS.forEach(function (p) {
            var prog = getPathProgress(p.id);
            allCompleted += prog.completedUnits.length;
            allTotal += p.units.length;
        });
        var overallPct = allTotal > 0 ? Math.round((allCompleted / allTotal) * 100) : 0;
        html += '<div class="lp-overview">';
        html += '  <div class="lp-overview-bar"><div class="lp-overview-fill" style="width:' + overallPct + '%"></div></div>';
        html += '  <span class="lp-overview-text">' + allCompleted + '/' + allTotal + ' ' +
            (window.renderBilingualText ? '已完成 / completed' : '已完成') + ' (' + overallPct + '%)</span>';
        html += '</div>';

        html += '<div class="lp-cards">';
        LEARNING_PATHS.forEach(function (path) {
            var progress = getPathProgress(path.id);
            var completedCount = progress.completedUnits.length;
            var totalCount = path.units.length;
            var pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            html += '<div class="lp-card" data-path-id="' + path.id + '">';
            html += '  <div class="lp-card-icon">' + path.icon + '</div>';
            html += '  <div class="lp-card-level">' + path.levelLabel + ' / ' + path.levelLabelEn + '</div>';
            if (window.renderBilingualText) {
                html += '  <h3 class="lp-card-title" data-i18n="' + path.title + '">' + path.title + '</h3>';
                html += '  <p class="lp-card-desc" data-i18n="' + path.description + '">' + path.description + '</p>';
            } else {
                html += '  <h3 class="lp-card-title">' + path.title + '</h3>';
                html += '  <p class="lp-card-desc">' + path.description + '</p>';
            }
            html += '  <div class="lp-card-meta">' + totalCount + ' 个单元 / ' + totalCount + ' units</div>';
            html += '  <div class="lp-card-progress-bar"><div class="lp-card-progress-fill" style="width:' + pct + '%"></div></div>';
            html += '  <div class="lp-card-progress-text">' + completedCount + '/' + totalCount + ' (' + pct + '%)</div>';
            html += '  <button class="primary-btn lp-start-btn" onclick="window.startLearningPath(\'' + path.id + '\')">开始学习 / Start</button>';
            html += '</div>';
        });
        html += '</div>';

        container.innerHTML = html;
    }

    function renderPathDetail(pathId) {
        var path = LEARNING_PATHS.find(function (p) { return p.id === pathId; });
        if (!path) return;

        var container = document.getElementById('learningPathsContainer');
        if (!container) return;

        var progress = getPathProgress(pathId);
        var completedCount = progress.completedUnits.length;
        var totalCount = path.units.length;
        var pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        var html = '<button class="lp-back-btn" onclick="window.backToLearningPaths()">← ' +
            (window.renderBilingualText ? '返回路径列表 / Back to Paths' : '返回路径列表') +
            '</button>';

        html += '<div class="lp-detail-header">';
        html += '  <div class="lp-detail-icon">' + path.icon + '</div>';
        html += '  <div>';
        if (window.renderBilingualText) {
            html += '    <h2 class="lp-detail-title" data-i18n="' + path.title + '">' + path.title + '</h2>';
            html += '    <p class="lp-detail-desc" data-i18n="' + path.description + '">' + path.description + '</p>';
        } else {
            html += '    <h2 class="lp-detail-title">' + path.title + '</h2>';
            html += '    <p class="lp-detail-desc">' + path.description + '</p>';
        }
        html += '    <div class="lp-detail-progress">';
        html += '      <div class="lp-card-progress-bar large"><div class="lp-card-progress-fill" style="width:' + pct + '%"></div></div>';
        html += '      <span class="lp-detail-progress-text">' + completedCount + '/' + totalCount + ' ' +
            (window.renderBilingualText ? '已完成 / completed' : '已完成') + '</span>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';

        html += '<div class="lp-units">';
        path.units.forEach(function (unit, idx) {
            var complete = isUnitComplete(pathId, unit.id);
            html += '<div class="lp-unit' + (complete ? ' completed' : '') + '" id="lp-unit-' + unit.id + '">';
            html += '  <div class="lp-unit-number">' + (idx + 1) + '</div>';
            html += '  <div class="lp-unit-content">';
            html += '    <div class="lp-unit-header">';
            if (window.renderBilingualText) {
                html += '      <h3 class="lp-unit-title" data-i18n="' + unit.title + '">' + unit.title + '</h3>';
            } else {
                html += '      <h3 class="lp-unit-title">' + unit.title + '</h3>';
            }
            html += '      <span class="lp-unit-status">' + (complete ? '[V]' : '[ ]') + '</span>';
            html += '    </div>';
            if (window.renderBilingualText) {
                html += '    <p class="lp-unit-desc" data-i18n="' + unit.description + '">' + unit.description + '</p>';
            } else {
                html += '    <p class="lp-unit-desc">' + unit.description + '</p>';
            }
            html += '    <div class="lp-unit-meta">';
            html += '      <span class="lp-unit-time">' + unit.estimatedTime + ' / ' + unit.estimatedTimeEn + '</span>';
            html += '    </div>';

            html += '    <div class="lp-unit-details" id="lp-details-' + unit.id + '" style="display:none;">';
            html += '      <div class="lp-unit-section">';
            html += '        <h4>' + (window.renderBilingualText ? '核心概念 / Key Concepts' : '核心概念') + '</h4>';
            html += '        <div class="lp-unit-keywords">';
            unit.keyConcepts.forEach(function (kw) {
                var conceptId = getConceptId(kw);
                if (conceptId) {
                    html += '          <span class="lp-keyword lp-keyword-link" onclick="window.openConceptCard(\'' + conceptId + '\')" title="查看概念卡片 / View concept card">' + kw + '</span>';
                } else {
                    html += '          <span class="lp-keyword">' + kw + '</span>';
                }
            });
            html += '        </div>';
            html += '      </div>';
            html += '      <div class="lp-unit-section">';
            html += '        <h4>' + (window.renderBilingualText ? '相关文本 / Related Texts' : '相关文本') + '</h4>';
            html += '        <ul class="lp-unit-texts">';
            unit.relatedTexts.forEach(function (rt) {
                html += '          <li><a href="#" onclick="window.openRelatedText(\'' + rt.ref + '\');return false;">' + rt.title + '</a></li>';
            });
            html += '        </ul>';
            html += '      </div>';
            html += '      <div class="lp-unit-section">';
            html += '        <h4>' + (window.renderBilingualText ? '学习任务 / Task' : '学习任务') + '</h4>';
            if (window.renderBilingualText) {
                html += '        <p class="lp-unit-task" data-i18n="' + unit.task + '">' + unit.task + '</p>';
                html += '        <p class="lp-unit-task-en">' + unit.taskEn + '</p>';
            } else {
                html += '        <p class="lp-unit-task">' + unit.task + '</p>';
            }
            html += '      </div>';

            var relatedCcIds = [];
            unit.keyConcepts.forEach(function (kw) {
                if (CONCEPT_TO_CC[kw]) {
                    relatedCcIds.push(CONCEPT_TO_CC[kw]);
                }
            });
            if (relatedCcIds.length > 0) {
                html += '      <div class="lp-unit-section">';
                html += '        <h4>' + (window.renderBilingualText ? '相关跨文化比较 / Related Comparisons' : '相关跨文化比较') + '</h4>';
                html += '        <div class="lp-cc-links">';
                relatedCcIds.forEach(function (ccId) {
                    html += '          <span class="lp-cc-link" onclick="window.openCrossCultural(\'' + ccId + '\')">' + getCcTitle(ccId) + '</span>';
                });
                html += '        </div>';
                html += '      </div>';
            }
            html += '      <button class="primary-btn lp-complete-btn" onclick="window.completeUnit(\'' + pathId + '\',\'' + unit.id + '\')">' +
                (complete ? (window.renderBilingualText ? '已完成 / Completed' : '已完成') : (window.renderBilingualText ? '标记完成 / Mark Complete' : '标记完成')) +
                '</button>';
            html += '    </div>';

            html += '    <button class="lp-expand-btn" onclick="window.toggleUnitDetails(\'' + unit.id + '\')">';
            html += '      ' + (window.renderBilingualText ? '查看详情 / View Details' : '查看详情');
            html += '    </button>';
            html += '  </div>';
            html += '</div>';
        });
        html += '</div>';

        container.innerHTML = html;
        container.dataset.viewingPath = pathId;

        if (typeof window.applyI18nToPage === 'function') {
            window.applyI18nToPage(container);
        }
    }

    window.startLearningPath = function (pathId) {
        var container = document.getElementById('learningPathsContainer');
        if (container) {
            container.dataset.viewingPath = pathId;
            renderPathDetail(pathId);
        }
    };

    window.backToLearningPaths = function () {
        var container = document.getElementById('learningPathsContainer');
        if (container) {
            delete container.dataset.viewingPath;
            renderLearningPaths();
        }
    };

    window.toggleUnitDetails = function (unitId) {
        var details = document.getElementById('lp-details-' + unitId);
        if (details) {
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
            if (typeof window.applyI18nToPage === 'function') {
                window.applyI18nToPage(details);
            }
        }
    };

    window.completeUnit = function (pathId, unitId) {
        markUnitComplete(pathId, unitId);
        var path = LEARNING_PATHS.find(function (p) { return p.id === pathId; });
        var unit = path ? path.units.find(function (u) { return u.id === unitId; }) : null;
        if (unit) {
            var kbEntry = {
                type: 'learning_path',
                pathTitle: path ? path.title : pathId,
                unitTitle: unit.title,
                completedAt: new Date().toISOString(),
                keyConcepts: unit.keyConcepts,
                note: unit.task
            };
            try {
                var kb = JSON.parse(localStorage.getItem('docReviewerKnowledgeBase') || '[]');
                kb.push({
                    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
                    name: '学习路径: ' + (path ? path.title : '') + ' - ' + unit.title,
                    type: 'learning_path',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    versions: [{ content: JSON.stringify(kbEntry, null, 2), timestamp: new Date().toISOString() }]
                });
                localStorage.setItem('docReviewerKnowledgeBase', JSON.stringify(kb));
            } catch (e) {}
        }
        var unitEl = document.getElementById('lp-unit-' + unitId);
        if (unitEl) unitEl.classList.add('completed');
        var btn = unitEl ? unitEl.querySelector('.lp-complete-btn') : null;
        if (btn) {
            btn.textContent = window.renderBilingualText ? '已完成 / Completed' : '已完成';
        }
        var statusEl = unitEl ? unitEl.querySelector('.lp-unit-status') : null;
        if (statusEl) statusEl.innerHTML = '[V]';
        renderPathDetail(pathId);
    };

    window.getCcTitle = function (ccId) {
        try {
            var ccData = JSON.parse(localStorage.getItem('crossCulturalDataCache') || '[]');
            for (var i = 0; i < ccData.length; i++) {
                if (ccData[i].id === ccId) return ccData[i].comparisonTitleZh || ccId;
            }
        } catch (e) {}
        var titles = {
            'confucius-socrates': '孔子与苏格拉底',
            'ren-christian-love': '仁与爱',
            'li-greek-nomos': '礼与法/习俗',
            'junzi-aristotle': '君子与亚里士多德',
            'dao-logos': '道与逻各斯'
        };
        return titles[ccId] || ccId;
    };

    window.openCrossCultural = function (ccId) {
        if (typeof window.switchTab === 'function') {
            window.switchTab('approachingClassics');
        }
        var ccContainer = document.getElementById('crossCulturalContainer');
        if (ccContainer) {
            var card = document.getElementById('cc-card-' + ccId);
            if (card) {
                ccContainer.querySelector('.cc-grid').scrollIntoView({ behavior: 'smooth' });
                if (typeof window.toggleComparison === 'function') {
                    var body = document.getElementById('cc-body-' + ccId);
                    if (body && body.style.display !== 'block') {
                        window.toggleComparison(ccId);
                    }
                }
            }
        }
    };

    window.saveCcDataCache = function () {
        if (window.CROSS_CULTURAL_DATA) {
            try {
                localStorage.setItem('crossCulturalDataCache', JSON.stringify(window.CROSS_CULTURAL_DATA));
            } catch (e) {}
        }
    };

    window.openRelatedText = function (ref) {
        var selector = document.getElementById('classicSelector');
        if (!selector) return;
        var classicMap = {
            'lunyu': 'lunyu_jizhu',
            'lunyu_weizheng': 'lunyu_jizhu',
            'lunyu_bayi': 'lunyu_jizhu',
            'lunyu_xueer': 'lunyu_jizhu',
            'lunyu_xianjin': 'lunyu_jizhu',
            'lunyu_yongye': 'lunyu_jizhu',
            'lunyu_yanyuan': 'lunyu_jizhu',
            'lunyu_liren': 'lunyu_jizhu',
            'lunyu_xianwen': 'lunyu_jizhu',
            'lunyu_weiling': 'lunyu_jizhu',
            'mengzi': 'mengzi',
            'mengzi_gaozi': 'mengzi',
            'mengzi_yu': 'mengzi',
            'daxue': 'daxue',
            'daxue_zhuzhu': 'daxue_zhuzhu',
            'zhongyong': 'zhongyong',
            'shiji': 'shiji',
            'zuozhuan_yin': 'zuozhuan',
            'han_zhi': 'daxue',
            'liji_quli': 'daxue',
            'xiaojing': 'lunyu_jizhu',
            'siku_jing': 'daxue_zhuzhu',
            'shisanjing': 'daxue_zhuzhu',
            'houhanshu_zhengxuan': 'mengzi',
            'chuanxilu': 'daxue_zhuzhu',
            'lunyu_zhengyi': 'lunyu_jizhu',
            'hanxue_shicheng': 'mengzi',
            'feng_youlan': 'zhongyong',
            'schwartz': 'zhongyong'
        };
        var val = classicMap[ref];
        if (val) {
            selector.value = val;
            if (typeof window.loadClassicText === 'function') {
                window.loadClassicText();
            }
            if (typeof window.switchTab === 'function') {
                window.switchTab('classic');
            }
        } else {
            if (typeof window.switchTab === 'function') {
                window.switchTab('classic');
            }
        }
    };

    function getConceptId(keyword) {
        var lower = keyword.toLowerCase();
        for (var i = 0; i < CONCEPT_KEYWORD_MAP.length; i++) {
            if (CONCEPT_KEYWORD_MAP[i].keyword.toLowerCase() === lower) {
                return CONCEPT_KEYWORD_MAP[i].id;
            }
        }
        return null;
    }

    window.openConceptCard = function (conceptId) {
        if (typeof window.showConceptCard === 'function') {
            window.showConceptCard(conceptId);
        } else {
            var panel = document.getElementById('approachingClassics-panel');
            if (panel) {
                var saved = panel.style.display;
                panel.style.display = 'block';
                setTimeout(function () { panel.style.display = saved; }, 100);
            }
            switchTab('classic');

            var selector = document.getElementById('classicSelector');
            if (selector) {
                var conceptToClassic = {
                    'ren': 'lunyu_jizhu',
                    'li': 'lunyu_jizhu',
                    'junzi': 'lunyu_jizhu',
                    'dao': 'zhongyong',
                    'xiao': 'lunyu_jizhu',
                    'yi': 'lunyu_jizhu',
                    'de': 'daxue',
                    'zhongshu': 'lunyu_jizhu'
                };
                var classicVal = conceptToClassic[conceptId];
                if (classicVal) {
                    selector.value = classicVal;
                    if (typeof window.loadClassicText === 'function') {
                        window.loadClassicText();
                    }
                }
            }
        }
    };

    window.initLearningPaths = function () {
        renderLearningPaths();
        if (typeof window.saveCcDataCache === 'function') {
            window.saveCcDataCache();
        }
    };
})();
