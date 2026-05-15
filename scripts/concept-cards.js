var conceptCards = [
    {
        id: 'ren',
        chinese: '仁',
        pinyin: 'rén',
        commonTranslations: ['benevolence', 'humaneness', 'virtue', 'goodness'],
        shortExplanationZh: '儒家核心美德，指人与人之间的关爱与同理心，是孔子思想中最高道德原则。',
        shortExplanationEn: 'The core Confucian virtue representing human-heartedness, compassion, and the ethical relationship between people. It is the highest moral principle in Confucius\'s thought.',
        classicalExamples: [
            { text: '樊迟问仁。子曰："爱人。"', source: '《论语·颜渊》' },
            { text: '夫仁者，己欲立而立人，己欲达而达人。', source: '《论语·雍也》' },
            { text: '克己复礼为仁。一日克己复礼，天下归仁焉。', source: '《论语·颜渊》' }
        ],
        relatedConcepts: ['礼', '义', '德', '君子'],
        commonMisunderstandings: [
            '仁不是简单的"善良"或"好心"，而是一套完整的道德修养体系，包含克己、复礼、爱人等多个维度。',
            '仁不是天生就有的品质，而是需要通过学习和实践来培养的。',
            '仁不是只对亲近的人好，而是推己及人，由近及远的普遍关怀。'
        ],
        crossCulturalComparison: '仁与西方伦理中的"sympathy"（同情）或"benevolence"（仁爱）有相似之处，但儒家之仁更强调实践性——它不仅是情感，更是一套通过礼乐教化、自我修养来实现的道德功夫。亚里士多德的"德性伦理学"强调品格培养，与仁的修养路径有可比性，但仁更注重人际关系中的具体实践而非抽象德性。'
    },
    {
        id: 'li',
        chinese: '礼',
        pinyin: 'lǐ',
        commonTranslations: ['ritual', 'propriety', 'etiquette', 'rites'],
        shortExplanationZh: '儒家的行为规范体系，包括礼仪、礼节、制度等，是维持社会秩序和个人修养的重要手段。',
        shortExplanationEn: 'A comprehensive system of normative behaviors in Confucianism, encompassing rituals, etiquette, social customs, and institutions. It serves as the external framework for cultivating inner virtue and maintaining social harmony.',
        classicalExamples: [
            { text: '不学礼，无以立。', source: '《论语·季氏》' },
            { text: '道之以德，齐之以礼，有耻且格。', source: '《论语·为政》' },
            { text: '礼之用，和为贵。', source: '《论语·学而》' }
        ],
        relatedConcepts: ['仁', '乐', '义', '君子'],
        commonMisunderstandings: [
            '礼不是简单的"礼貌"或"礼仪"，它涵盖了社会制度、行为规范和文化传统。',
            '礼不是僵化的教条，而是根据情境灵活运用的行为准则。',
            '礼的本质是内在情感的外在表达，不是为了表面形式而形式。'
        ],
        crossCulturalComparison: '礼常被西方学者译为"ritual"，但这容易让人联想到宗教仪式。实际上，礼更接近西方哲学中的"伦理习俗"或"社会语法"。礼与康德伦理学中的"义务"概念不同——礼不是来自抽象的道德律令，而是源于具体的社会关系和历史文化传统。'
    },
    {
        id: 'junzi',
        chinese: '君子',
        pinyin: 'jūnzǐ',
        commonTranslations: ['gentleman', 'exemplary person', 'superior person'],
        shortExplanationZh: '儒家理想人格的典范，指道德修养高尚、行为合宜的人。原指贵族子弟，后孔子赋予其道德内涵。',
        shortExplanationEn: 'The Confucian ideal of moral excellence — a person of virtue, integrity, and cultivated character who serves as a model for others. Originally meaning "lord\'s son," Confucius transformed it into a moral concept.',
        classicalExamples: [
            { text: '君子坦荡荡，小人长戚戚。', source: '《论语·述而》' },
            { text: '君子喻于义，小人喻于利。', source: '《论语·里仁》' },
            { text: '天行健，君子以自强不息。', source: '《周易·乾卦》' }
        ],
        relatedConcepts: ['仁', '礼', '义', '道', '德'],
        commonMisunderstandings: [
            '君子不是指"有学问的人"或"贵族"，而是指道德品质高尚的人。',
            '君子不是完美无缺的人，而是持续自我修养、追求进步的人。',
            '君子的对立面是"小人"，区分的标准是道德品质而非社会地位。'
        ],
        crossCulturalComparison: '君子与亚里士多德的"恢宏大度之人"有相似之处——两者都强调德性、自制和高尚品格。但君子更强调社会责任感而非个人卓越，这与儒家"修齐治平"的递进逻辑一致。西方"gentleman"概念在演变过程中也融合了道德内涵，但其根源是阶级身份而非道德修养。'
    },
    {
        id: 'dao',
        chinese: '道',
        pinyin: 'dào',
        commonTranslations: ['the Way', 'path', 'truth', 'principle'],
        shortExplanationZh: '儒家指宇宙运行的根本原理和人生的正确道路，既是形而上的终极实在，也是具体的道德准则。',
        shortExplanationEn: 'A fundamental concept in Chinese philosophy referring to the ultimate principle of the universe and the correct path of human life. In Confucianism, it represents both the metaphysical order of reality and the concrete moral way of living.',
        classicalExamples: [
            { text: '朝闻道，夕死可矣。', source: '《论语·里仁》' },
            { text: '道不远人，人之为道而远人，不可以为道也。', source: '《中庸》' },
            { text: '君子务本，本立而道生。', source: '《论语·学而》' }
        ],
        relatedConcepts: ['仁', '德', '礼', '君子', '义'],
        commonMisunderstandings: [
            '儒家的"道"与道家的"道"不同：儒家之道强调人伦日用中的道德实践，而非道家那种超越言诠的形而上学本体。',
            '"道"不是一条已经铺好的路，而是需要通过修养和实践去"行"出来的。',
            '"道"既是普遍的宇宙原理，也是具体的个人行为准则，不可偏废其一。'
        ],
        crossCulturalComparison: '儒家的"道"与西方哲学的"Logos"（逻各斯）有可比性——两者都指宇宙的理性原则和秩序。但Logos更强调理性与言说，而儒家之道更注重实践与行走（"道"字本义是"路"）。道也与海德格尔的"存在"有可对话之处，但儒家之道始终不离人伦日用。'
    },
    {
        id: 'xiao',
        chinese: '孝',
        pinyin: 'xiào',
        commonTranslations: ['filial piety', 'filial devotion'],
        shortExplanationZh: '儒家伦理的根本德目，指子女对父母的尊敬、顺从和赡养，被视为一切道德的基础。',
        shortExplanationEn: 'The foundational virtue in Confucian ethics, encompassing respect, obedience, and care for one\'s parents. It is considered the root of all moral cultivation and the starting point of humaneness.',
        classicalExamples: [
            { text: '孝弟也者，其为仁之本与！', source: '《论语·学而》' },
            { text: '今之孝者，是谓能养。至于犬马，皆能有养；不敬，何以别乎？', source: '《论语·为政》' },
            { text: '父母在，不远游，游必有方。', source: '《论语·里仁》' }
        ],
        relatedConcepts: ['仁', '礼', '弟', '忠'],
        commonMisunderstandings: [
            '孝不是盲目的服从，孔子强调"几谏"（委婉劝谏），反对无原则的顺从。',
            '孝不仅是物质上的赡养，更重要的是对父母的尊敬和关爱——"至于犬马，皆能有养；不敬，何以别乎？"',
            '孝是道德修养的起点而非终点，从孝亲到仁民爱物是一个递进的过程。'
        ],
        crossCulturalComparison: '西方文化中缺乏与"孝"完全对应的概念。英语通常译为"filial piety"，但piety带有宗教色彩，不完全准确。西方伦理学更强调个体独立性和普遍道德原则，而儒家则认为亲情是道德的源头。与犹太-基督教传统中的"Honor your father and mother"相比，孝更加系统化和日常化。'
    },
    {
        id: 'yi',
        chinese: '义',
        pinyin: 'yì',
        commonTranslations: ['righteousness', 'justice', 'moral duty'],
        shortExplanationZh: '儒家五常之一，指合宜、正当的行为原则，强调在利益面前坚持道德判断。',
        shortExplanationEn: 'One of the Five Constant Virtues of Confucianism, denoting what is morally right and proper. It emphasizes moral judgment over personal gain and is the principle that guides one to act correctly in every situation.',
        classicalExamples: [
            { text: '君子喻于义，小人喻于利。', source: '《论语·里仁》' },
            { text: '不义而富且贵，于我如浮云。', source: '《论语·述而》' },
            { text: '生，亦我所欲也；义，亦我所欲也。二者不可得兼，舍生而取义者也。', source: '《孟子·告子上》' }
        ],
        relatedConcepts: ['仁', '礼', '君子', '利'],
        commonMisunderstandings: [
            '义不是"义气"或"江湖义气"，而是基于道德原则的正当行为。',
            '义不是完全排斥利益，而是强调在利益面前要坚持道德判断。',
            '义与仁的关系：仁是爱人的内在情感，义是判断行为正当与否的外在原则。'
        ],
        crossCulturalComparison: '义与西方哲学的"justice"（正义）有相似之处，但范围更广。罗尔斯的正义论强调社会制度的公平，而儒家之义更关注个人在具体情境中的道德抉择。义也更接近康德伦理学中的"道德义务"，但康德强调普遍法则，儒家之义则根据具体关系灵活运用。'
    },
    {
        id: 'de',
        chinese: '德',
        pinyin: 'dé',
        commonTranslations: ['virtue', 'moral power', 'inner character'],
        shortExplanationZh: '儒家指个体通过修养获得的道德品质和人格力量，是内在于人的善的品质。',
        shortExplanationEn: 'In Confucianism, the moral character and inner power cultivated through self-cultivation. It represents the ethical quality that enables one to influence others positively without coercion.',
        classicalExamples: [
            { text: '为政以德，譬如北辰，居其所而众星共之。', source: '《论语·为政》' },
            { text: '德不孤，必有邻。', source: '《论语·里仁》' },
            { text: '富润屋，德润身，心广体胖。', source: '《大学》' }
        ],
        relatedConcepts: ['仁', '道', '礼', '君子'],
        commonMisunderstandings: [
            '德不是天生的品质，而是通过学习和修养逐步培养的。',
            '德不仅是个人的道德品质，更是一种能够感化他人的道德力量。',
            '儒家之德与道家之德不同：儒家强调积极的道德修养，道家则主张回归自然之德。'
        ],
        crossCulturalComparison: '德与西方"virtue"概念有可比性。亚里士多德的德性伦理学认为德性是介于过度与不及之间的中道，这与儒家"中庸"思想相通。但儒家之德不仅有个人维度，还有政治维度——"为政以德"体现了道德与政治的统一，这是西方古典政治哲学中也能找到的回声。'
    },
    {
        id: 'zhongshu',
        chinese: '忠恕',
        pinyin: 'zhōngshù',
        commonTranslations: ['loyalty and reciprocity', 'conscientiousness and altruism'],
        shortExplanationZh: '孔子"一以贯之"之道——忠是尽己之心待人，恕是推己及人，"己所不欲，勿施于人"。',
        shortExplanationEn: 'The single thread running through Confucius\'s teaching — zhong (conscientiousness) means doing one\'s utmost for others, and shu (reciprocity) means treating others as one would wish to be treated: "Do not do to others what you do not want done to yourself."',
        classicalExamples: [
            { text: '夫子之道，忠恕而已矣。', source: '《论语·里仁》' },
            { text: '己所不欲，勿施于人。', source: '《论语·颜渊》' },
            { text: '己欲立而立人，己欲达而达人。', source: '《论语·雍也》' }
        ],
        relatedConcepts: ['仁', '道', '义', '礼'],
        commonMisunderstandings: [
            '忠恕不是一个概念，而是两个相关但不同的道德实践方法——忠是积极地为他人尽力，恕是消极地不以己所不欲施于人。',
            '忠恕不是软弱或妥协，而是基于对人性共通点的深刻认识。',
            '忠恕与西方"黄金法则"表面上相似，但儒家的忠恕有更具体的道德心理学基础。'
        ],
        crossCulturalComparison: '"己所不欲，勿施于人"被许多学者视为"黄金法则"的东方版本。但与基督教"你们愿意人怎样待你们，你们也要怎样待人"的积极表述不同，儒家的表述是否定式的（negative formulation），这体现了儒家对他人意愿的尊重——不强加自己的标准于他人。康德的道义论中也有类似的"普遍化原则"，但康德诉诸理性，儒家则诉诸情感共鸣。'
    }
];

var conceptKeywordMap = [
    { keyword: '君子', conceptId: 'junzi' },
    { keyword: '忠恕', conceptId: 'zhongshu' },
    { keyword: '仁', conceptId: 'ren' },
    { keyword: '礼', conceptId: 'li' },
    { keyword: '道', conceptId: 'dao' },
    { keyword: '孝', conceptId: 'xiao' },
    { keyword: '义', conceptId: 'yi' },
    { keyword: '德', conceptId: 'de' }
];

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightConceptKeywords(container) {
    var sorted = conceptKeywordMap.slice().sort(function(a, b) {
        return b.keyword.length - a.keyword.length;
    });

    var parts = [];
    for (var i = 0; i < sorted.length; i++) {
        parts.push(escapeRegex(sorted[i].keyword));
    }
    var pattern = '(' + parts.join('|') + ')';
    var regex = new RegExp(pattern, 'g');

    var textNodes = [];
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    for (var ni = 0; ni < textNodes.length; ni++) {
        var node = textNodes[ni];
        var text = node.textContent;
        if (!regex.test(text)) continue;
        regex.lastIndex = 0;

        var fragment = document.createDocumentFragment();
        var lastIndex = 0;
        var match;
        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
            }
            var matchedKeyword = match[1];
            var entry = null;
            for (var si = 0; si < sorted.length; si++) {
                if (sorted[si].keyword === matchedKeyword) {
                    entry = sorted[si];
                    break;
                }
            }
            var span = document.createElement('span');
            span.className = 'concept-keyword';
            span.dataset.concept = entry ? entry.conceptId : '';
            span.textContent = matchedKeyword;
            span.onclick = function(e) {
                e.stopPropagation();
                showConceptCard(this.dataset.concept);
            };
            fragment.appendChild(span);
            lastIndex = match.index + matchedKeyword.length;
        }
        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        node.parentNode.replaceChild(fragment, node);
    }
}

function showConceptCard(conceptId) {
    var concept = null;
    for (var i = 0; i < conceptCards.length; i++) {
        if (conceptCards[i].id === conceptId) {
            concept = conceptCards[i];
            break;
        }
    }
    if (!concept) return;

    var examplesHtml = '';
    for (var ei = 0; ei < concept.classicalExamples.length; ei++) {
        var ex = concept.classicalExamples[ei];
        examplesHtml += '<div class="concept-example"><span class="concept-example-text">' + ex.text + '</span><span class="concept-example-source">' + ex.source + '</span></div>';
    }

    var misunderstandingsHtml = '';
    for (var mi = 0; mi < concept.commonMisunderstandings.length; mi++) {
        misunderstandingsHtml += '<li>' + concept.commonMisunderstandings[mi] + '</li>';
    }

    var relatedHtml = concept.relatedConcepts.map(function(rc) {
        var found = null;
        for (var ci = 0; ci < conceptCards.length; ci++) {
            if (conceptCards[ci].chinese === rc) {
                found = conceptCards[ci];
                break;
            }
        }
        if (found) {
            return '<span class="concept-related-tag" onclick="showConceptCard(\'' + found.id + '\')">' + rc + '</span>';
        }
        return '<span class="concept-related-tag">' + rc + '</span>';
    }).join('');

    document.getElementById('conceptCardChinese').textContent = concept.chinese;
    document.getElementById('conceptCardPinyin').textContent = concept.pinyin;
    document.getElementById('conceptCardTranslations').textContent = concept.commonTranslations.join(' / ');
    document.getElementById('conceptCardExplanationZh').textContent = concept.shortExplanationZh;
    document.getElementById('conceptCardExplanationEn').textContent = concept.shortExplanationEn;
    document.getElementById('conceptCardExamples').innerHTML = examplesHtml;
    document.getElementById('conceptCardRelated').innerHTML = relatedHtml;
    document.getElementById('conceptCardMisunderstandings').innerHTML = misunderstandingsHtml;
    document.getElementById('conceptCardComparison').textContent = concept.crossCulturalComparison;

    document.getElementById('conceptCardModal').style.display = 'flex';
}

function closeConceptCard() {
    document.getElementById('conceptCardModal').style.display = 'none';
}
