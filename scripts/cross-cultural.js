(function () {
    'use strict';

    var CROSS_CULTURAL_DATA = [
        {
            id: 'confucius-socrates',
            comparisonTitle: 'Confucius and Socrates',
            comparisonTitleZh: '孔子与苏格拉底',
            chineseClassicConcept: '孔子（Confucius）',
            chineseClassicConceptBrief: '春秋末期的思想家、教育家，儒家学派创始人。',
            chineseClassicConceptBriefEn: 'Thinker and educator of the late Spring and Autumn period, founder of the Confucian school.',
            foreignReference: '苏格拉底（Socrates）',
            foreignReferenceBrief: '古希腊哲学家，西方哲学奠基人之一。',
            foreignReferenceBriefEn: 'Ancient Greek philosopher, one of the founders of Western philosophy.',
            similarity: '两位哲人都以对话为教学核心方法，都关注德性与教育，都未留下亲笔著作而由其弟子记录思想。他们都强调"认识你自己"式的自省与道德修养。',
            similarityEn: 'Both philosophers used dialogue as their core teaching method, focused on virtue and education, and left no writings of their own — their thoughts were recorded by disciples. Both emphasized self-examination and moral cultivation.',
            difference: '孔子的对话以现实政治与伦理为核心，具有具体的社会关怀；苏格拉底的对话更注重定义与逻辑推理，追求普遍性的真理定义。孔子强调"述而不作"（传承），苏格拉底则自称"牛虻"以质疑为使命。',
            differenceEn: 'Confucius\' dialogues centered on practical politics and ethics with concrete social concerns; Socrates\' dialogues emphasized definition and logical reasoning in pursuit of universal truths. Confucius described himself as "a transmitter, not a creator," while Socrates called himself a "gadfly" whose mission was to question.',
            readingSuggestion: '《论语》开篇与柏拉图《申辩篇》对照阅读。',
            readingSuggestionEn: 'Read the beginning of the Analects alongside Plato\'s Apology.',
            discussionQuestion: '如果孔子和苏格拉底见面，他们最可能在什么问题上达成一致？又在什么问题上产生分歧？',
            discussionQuestionEn: 'If Confucius and Socrates met, what would they most likely agree on, and where would they disagree?',
            icon: ''
        },
        {
            id: 'ren-christian-love',
            comparisonTitle: 'Ren and Christian Love',
            comparisonTitleZh: '仁与爱',
            chineseClassicConcept: '仁（Ren）',
            chineseClassicConceptBrief: '儒家思想的核心德性，指"爱人"——从亲亲之爱推及他人。',
            chineseClassicConceptBriefEn: 'The core virtue of Confucianism, meaning "loving others" — extending love from family to all people.',
            foreignReference: '基督教中的"爱"（Agape / Caritas）',
            foreignReferenceBrief: '基督教神学中的最高德性，指神对人的无条件的爱以及人因信仰而生发的对神与邻人的爱。',
            foreignReferenceBriefEn: 'The highest virtue in Christian theology — God\'s unconditional love for humanity and the human response of love for God and neighbor.',
            similarity: '两者都强调对他人的关爱是道德生活的核心。孔子说"己所不欲，勿施于人"，基督教有"黄金律"——"你们愿意人怎样待你们，你们也要怎样待人"。两者都主张爱要从身边开始推及他人。',
            similarityEn: 'Both place care for others at the center of moral life. Confucius said "Do not do to others what you do not want done to yourself"; Christianity has the Golden Rule — "Do unto others as you would have them do unto you." Both hold that love begins with those nearest and extends outward.',
            difference: '仁是基于自然血缘亲情（"孝悌也者，其为仁之本与"），是一种由内而外的扩展；基督教的爱则源于神恩，强调爱仇敌与普世之爱，超越了血缘关系的边界。仁更注重差等之爱，基督教的爱更强调平等与无条件性。',
            differenceEn: 'Ren is rooted in natural family affection ("Filial piety and brotherly respect are the root of ren") — an outward expansion from within; Christian love originates from divine grace, emphasizing love of enemies and universal love that transcends blood relations. Ren emphasizes graded love; Christian love emphasizes equality and unconditionality.',
            readingSuggestion: '《论语·颜渊》"樊迟问仁"与《新约·哥林多前书》13章对照阅读。',
            readingSuggestionEn: 'Read "Fan Chi asks about ren" in Analects 12 alongside 1 Corinthians 13.',
            discussionQuestion: '差等之爱与普世之爱是否必然冲突？能否在一套伦理体系中共存？',
            discussionQuestionEn: 'Do graded love and universal love necessarily conflict? Can they coexist within a single ethical system?',
            icon: ''
        },
        {
            id: 'li-greek-nomos',
            comparisonTitle: 'Li and Greek Nomos',
            comparisonTitleZh: '礼与法/习俗',
            chineseClassicConcept: '礼（Li）',
            chineseClassicConceptBrief: '儒家的核心概念，涵盖礼仪、习俗、社会规范与制度秩序。',
            chineseClassicConceptBriefEn: 'A core Confucian concept encompassing ritual, custom, social norms, and institutional order.',
            foreignReference: '希腊的"诺莫斯"（Nomos）',
            foreignReferenceBrief: '古希腊概念，兼指法律、习俗与约定俗成的社会规范，与"自然"（physis）相对。',
            foreignReferenceBriefEn: 'An ancient Greek concept referring to law, custom, and conventional social norms, contrasted with "physis" (nature).',
            similarity: '礼和nomos都代表社会约定的行为规范，都不是自然生成的而是人为建构的秩序。两者都为社群提供了行为准则，都具有塑造人格与维系社会稳定的功能。',
            similarityEn: 'Both li and nomos represent socially agreed-upon norms of behavior — orders constructed by humans, not given by nature. Both provide codes of conduct for the community and function to shape character and maintain social stability.',
            difference: '礼有强烈的仪式性与精神内涵，强调内在情感与外在形式的统一（"礼云礼云，玉帛云乎哉？"）；nomos更侧重法律与约定层面，与政治制度和公民身份紧密相连。礼的权威来自传统与圣王，nomos的权威来自城邦与公民共识。礼是积极的教化工具，nomos则带有更强的强制性与契约色彩。',
            differenceEn: 'Li has a strong ritual and spiritual dimension, emphasizing the unity of inner feeling and outer form ("What are rites? Just jade and silk?"); nomos is more about law and convention, closely tied to political institutions and citizenship. Li\'s authority comes from tradition and the sage-kings; nomos\' authority comes from the polis and citizen consensus. Li is a positive tool of education; nomos carries stronger coercive and contractual connotations.',
            readingSuggestion: '《论语·八佾》"人而不仁如礼何"与柏拉图《法律篇》节选对照阅读。',
            readingSuggestionEn: 'Read "If a man is not ren, what has he to do with li?" in Analects 3 alongside selected passages from Plato\'s Laws.',
            discussionQuestion: '现代社会更需要礼的精神还是法（nomos）的精神？两者如何互补？',
            discussionQuestionEn: 'Does modern society need more of the spirit of li or of nomos (law)? How can the two complement each other?',
            icon: ''
        },
        {
            id: 'junzi-aristotle',
            comparisonTitle: 'Junzi and Aristotle\'s Virtuous Person',
            comparisonTitleZh: '君子与德性伦理',
            chineseClassicConcept: '君子（Junzi）',
            chineseClassicConceptBrief: '儒家的理想人格，具备仁、义、礼、智等德性的完满之人。',
            chineseClassicConceptBriefEn: 'The Confucian ideal of personhood — one who fully embodies ren, yi, li, zhi, and other virtues.',
            foreignReference: '亚里士多德的"有德之人"（Spoudaios / Phronimos）',
            foreignReferenceBrief: '亚里士多德伦理学中的理想人格，拥有实践智慧（phronesis）与完备德性的人。',
            foreignReferenceBriefEn: 'The ideal person in Aristotelian ethics — one who possesses practical wisdom (phronesis) and complete virtue.',
            similarity: '君子与亚里士多德的有德之人都强调德性的培养是一个终身实践的过程，都认为德性体现在具体行为中而非抽象知识，都关注"中道"（亚里士多德的中道、孔子的"过犹不及"）。两者都认为理想人格是社群生活的基石。',
            similarityEn: 'Both the junzi and Aristotle\'s virtuous person emphasize that cultivating virtue is a lifelong practice, that virtue is embodied in concrete actions rather than abstract knowledge, and both focus on the "mean" (Aristotle\'s golden mean and Confucius\' "excess is as bad as deficiency"). Both see the ideal person as the foundation of community life.',
            difference: '君子的德性以"仁"为核心，具有强烈的社会关系性与情感基础；亚里士多德的有德之人以理性为核心，强调理性对欲望的主宰。君子更注重公共角色与政治参与，亚里士多德则认为沉思生活（bios theoretikos）是最高的幸福。孔子的德性源于礼乐传统，亚里士多德的德性源于对人之功能的理性分析。',
            differenceEn: 'The junzi\'s virtue centers on ren (benevolence), with a strong relational and affective foundation; Aristotle\'s virtuous person centers on reason, emphasizing reason\'s mastery over desire. The junzi emphasizes public role and political participation, while Aristotle considers the contemplative life (bios theoretikos) the highest happiness. Confucius\' virtue derives from the tradition of ritual and music; Aristotle\'s virtue derives from a rational analysis of the human function.',
            readingSuggestion: '《论语·宪问》关于君子的章节与亚里士多德《尼各马可伦理学》第二卷对照阅读。',
            readingSuggestionEn: 'Read passages on the junzi in Analects 14 alongside Aristotle\'s Nicomachean Ethics Book II.',
            discussionQuestion: '在今天的世界，做一个君子还是做一个亚里士多德式的有德之人更有现实意义？',
            discussionQuestionEn: 'In today\'s world, is it more meaningful to be a junzi or an Aristotelian virtuous person?',
            icon: ''
        },
        {
            id: 'dao-logos',
            comparisonTitle: 'Dao and Logos',
            comparisonTitleZh: '道与逻各斯',
            chineseClassicConcept: '道（Dao）',
            chineseClassicConceptBrief: '中国哲学中的终极概念，兼指宇宙的本源、运行的规律与人生的道路。',
            chineseClassicConceptBriefEn: 'The ultimate concept in Chinese philosophy, referring simultaneously to the source of the cosmos, the pattern of its operation, and the way of human life.',
            foreignReference: '逻各斯（Logos）',
            foreignReferenceBrief: '古希腊哲学中的核心概念，兼指理性、言说、规律与宇宙的原理。',
            foreignReferenceBriefEn: 'A core concept in ancient Greek philosophy, referring to reason, speech, principle, and the ordering principle of the cosmos.',
            similarity: '道和逻各斯都是各自哲学传统中的终极原理，都兼有"言说"与"规律"的双重含义。两者都不可见但可通过理性或体悟把握，都是宇宙秩序与人类理性的统一基础。赫拉克利特说"万物根据逻各斯生成"，老子说"道生一，一生二，二生三，三生万物"。',
            similarityEn: 'Both dao and logos are the ultimate principles in their respective philosophical traditions, each carrying the dual meaning of "speech/discourse" and "pattern/law." Both are invisible yet graspable through reason or insight, serving as the unified foundation of cosmic order and human reason. Heraclitus said "All things come to be in accordance with logos"; Laozi said "The Dao gives birth to one, one to two, two to three, three to ten thousand things."',
            difference: '道更强调自然无为、不可名状（"道可道，非常道"），具有神秘主义色彩；逻各斯更强调理性的可理解性与言说的逻辑结构。道既是本源也是过程，具有时间性；逻各斯更侧重共时性的结构与原则。道在儒家思想中与伦理紧密结合（"道不远人"），逻各斯在希腊传统中则与逻辑和形而上学更近。',
            differenceEn: 'Dao emphasizes natural spontaneity (wuwei) and is ultimately ineffable ("The dao that can be spoken is not the eternal dao"), carrying a mystical quality; logos emphasizes rational intelligibility and logical structure. Dao is both source and process, with a temporal dimension; logos focuses more on synchronic structure and principle. In Confucianism, dao is intimately tied to ethics ("The dao is not far from man"); in the Greek tradition, logos is closer to logic and metaphysics.',
            readingSuggestion: '《道德经》第一章与赫拉克利特残篇（DK22 B1、B2、B50）对照阅读。',
            readingSuggestionEn: 'Read Dao De Jing Chapter 1 alongside Heraclitus fragments DK22 B1, B2, and B50.',
            discussionQuestion: '道的"不可言说"与逻各斯的"言说"是根本对立还是互补的两种哲学路径？',
            discussionQuestionEn: 'Are dao\'s "ineffability" and logos\' "discourse" fundamentally opposed or complementary philosophical approaches?',
            icon: ''
        }
    ];

    var CC_CONCEPT_MAP = {
        'ren-christian-love': 'ren',
        'li-greek-nomos': 'li',
        'junzi-aristotle': 'junzi',
        'dao-logos': 'dao'
    };

    function renderCrossCultural() {
        var container = document.getElementById('crossCulturalContainer');
        if (!container) return;

        var html = '<div class="cc-header">' +
            (window.renderBilingualText ? window.renderBilingualText('跨文化比较', { tagName: 'h2', className: 'cc-module-title' }) : '<h2 class="cc-module-title">跨文化比较</h2>') +
            '</div>';

        html += '<div class="cc-intro">' +
            (window.renderBilingualText ? window.renderBilingualText('通过比较中国经典与西方思想传统中的核心概念，加深对两种文明的理解。', { tagName: 'p', className: 'cc-intro-text' }) : '<p class="cc-intro-text">通过比较中国经典与西方思想传统中的核心概念，加深对两种文明的理解。</p>') +
            '</div>';

        html += '<div class="cc-grid">';
        CROSS_CULTURAL_DATA.forEach(function (item) {
            html += '<div class="cc-card" id="cc-card-' + item.id + '">';
            html += '  <div class="cc-card-header" onclick="window.toggleComparison(\'' + item.id + '\')">';
            html += '    <div class="cc-card-icon">' + item.icon + '</div>';
            html += '    <div class="cc-card-titles">';
            html += '      <h3 class="cc-card-title">' + item.comparisonTitle + '</h3>';
            html += '      <span class="cc-card-title-zh">' + item.comparisonTitleZh + '</span>';
            html += '    </div>';
            html += '    <span class="cc-expand-icon" id="cc-icon-' + item.id + '">+</span>';
            html += '  </div>';

            html += '  <div class="cc-card-body" id="cc-body-' + item.id + '" style="display:none;">';

            html += '    <div class="cc-compare-columns">';
            html += '      <div class="cc-compare-col">';
            var conceptId = CC_CONCEPT_MAP[item.id];
            if (conceptId && typeof window.openConceptCard === 'function') {
                html += '        <h4 class="cc-col-label cc-col-label-link" onclick="window.openConceptCard(\'' + conceptId + '\')">' + item.chineseClassicConcept + ' &#8599;</h4>';
            } else {
                html += '        <h4 class="cc-col-label">' + item.chineseClassicConcept + '</h4>';
            }
            html += '        <p class="cc-col-brief">' + item.chineseClassicConceptBrief + '</p>';
            html += '        <p class="cc-col-brief-en">' + item.chineseClassicConceptBriefEn + '</p>';
            html += '      </div>';
            html += '      <div class="cc-compare-col">';
            html += '        <h4 class="cc-col-label">' + item.foreignReference + '</h4>';
            html += '        <p class="cc-col-brief">' + item.foreignReferenceBrief + '</p>';
            html += '        <p class="cc-col-brief-en">' + item.foreignReferenceBriefEn + '</p>';
            html += '      </div>';
            html += '    </div>';

    html += '    <div class="cc-detail-section">';
    html += '      <h4 class="cc-section-title">' + (window.renderBilingualText ? '相似点 / Similarities' : '相似点') + '</h4>';
    html += '      <p class="cc-section-text">' + item.similarity + '</p>';
    html += '      <p class="cc-section-text-en">' + item.similarityEn + '</p>';
    html += '    </div>';

    html += '    <div class="cc-detail-section">';
    html += '      <h4 class="cc-section-title">' + (window.renderBilingualText ? '差异点 / Differences' : '差异点') + '</h4>';
    html += '      <p class="cc-section-text">' + item.difference + '</p>';
    html += '      <p class="cc-section-text-en">' + item.differenceEn + '</p>';
    html += '    </div>';

    html += '    <div class="cc-detail-section">';
    html += '      <h4 class="cc-section-title">' + (window.renderBilingualText ? '建议阅读 / Reading Suggestion' : '建议阅读') + '</h4>';
    html += '      <p class="cc-section-text">' + item.readingSuggestion + '</p>';
    html += '      <p class="cc-section-text-en">' + item.readingSuggestionEn + '</p>';
    html += '    </div>';

    html += '    <div class="cc-detail-section">';
    html += '      <h4 class="cc-section-title">' + (window.renderBilingualText ? '讨论问题 / Discussion Question' : '讨论问题') + '</h4>';
    html += '      <p class="cc-section-text">' + item.discussionQuestion + '</p>';
    html += '      <p class="cc-section-text-en">' + item.discussionQuestionEn + '</p>';
    html += '    </div>';

            html += '  </div>';
            html += '</div>';
        });
        html += '</div>';

        container.innerHTML = html;

        if (typeof window.applyI18nToPage === 'function') {
            window.applyI18nToPage(container);
        }
    }

    window.toggleComparison = function (id) {
        var body = document.getElementById('cc-body-' + id);
        var icon = document.getElementById('cc-icon-' + id);
        if (body && icon) {
            var isOpen = body.style.display !== 'none';
            body.style.display = isOpen ? 'none' : 'block';
            icon.innerHTML = isOpen ? '+' : '-';
            if (!isOpen && typeof window.applyI18nToPage === 'function') {
                window.applyI18nToPage(body);
            }
        }
    };

    window.CROSS_CULTURAL_DATA = CROSS_CULTURAL_DATA;

    window.initCrossCultural = function () {
        renderCrossCultural();
    };
})();
