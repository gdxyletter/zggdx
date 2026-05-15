/**
 * 春秋列国地点数据
 *
 * 坐标系说明：
 * x / y 为百分比坐标（0-100），x 从左到右，y 从上到下。
 * 本地图为教学示意图，不代表精确疆域边界。
 *
 * 各地点大致方位：
 *   鲁（东南）、卫（北）、曹（西南）、宋（东）、
 *   郑（西）、陈（南偏西）、蔡（更南）、楚（最南）
 */

/**
 * @typedef {Object} Location
 * @property {string} id                  唯一标识
 * @property {string} name                显示名称
 * @property {string} [nameEn]            英文名称
 * @property {'state'|'city'|'event_place'|'geo'} type  地点类型
 * @property {string} shortTip            简短提示（列表/卡片预览用）
 * @property {string} [shortTipEn]        英文简短提示
 * @property {string} description         地点简介
 * @property {string} [descriptionEn]     英文地点简介
 * @property {number} x                   地图 X 百分比坐标 (0-100)
 * @property {number} y                   地图 Y 百分比坐标 (0-100)
 * @property {string[]} relatedCharacterIds  关联人物 ID 数组
 * @property {string[]} relatedEventIds       关联事件 ID 数组
 * @property {number} unlockStep          解锁步骤（与路线 step 对应）
 * @property {boolean} [isCore]           是否核心地点（默认 true）
 * @property {Array<{text:string,source:string}>} [analectsPassages] 相关《论语》章句
 * @property {string} [whyItMatters]      为什么重要（英文）
 */

/** @type {Location[]} */
window.historyMapLocations = [
    {
        id: "lu_state",
        name: "鲁国（曲阜）",
        nameEn: "Lu (Qufu)",
        type: "state",
        shortTip: "孔子故乡，旅程起点与终点",
        shortTipEn: "Confucius' hometown, the journey's start and end",
        description: "鲁国（姬姓，周公封国）是周朝重要的诸侯国，位于今山东省西南部，都城曲阜。鲁国为周礼乐文化中心，韩宣子适鲁云'周礼尽在鲁矣'。孔子（前551—前479）诞生于鲁国陬邑（曲阜东南屏障），其父叔梁纥因功封陬邑大夫。孔子曾任鲁国中都宰（鲁西屏障，'一年，四方皆则之'）、小司空、大司寇，后辞官开始周游列国。晚年返回鲁国，整理六经，教授弟子，直至终老。交通上，曲阜为泗水航运与陆路要道，连接中原与东方。",
        descriptionEn: "The State of Lu (surname Ji, fief of the Duke of Zhou) was an important vassal state of the Zhou dynasty, located in present-day southwestern Shandong province with its capital at Qufu. Lu was the cultural center of Zhou ritual and music — when Han Xuanzi visited Lu he declared, 'The Zhou rites are preserved in Lu.' Confucius (551–479 BCE) was born in the Zouyi district of Lu (southeast of Qufu). He served as Minister of Justice in Lu before resigning to embark on his fourteen-year journey. He returned to Lu in his old age to edit the Six Classics and teach his disciples until his death.",
        x: 72,
        y: 45,
        relatedCharacterIds: ["char_kongzi", "char_yan_hui", "char_zi_lu", "char_zi_gong"],
        relatedEventIds: ["event_depart_lu", "event_return_lu"],
        unlockStep: 1,
        isCore: true,
        analectsPassages: [
            { text: "子曰：'学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？'", source: "《论语·学而》" },
            { text: "子在齐闻《韶》，三月不知肉味，曰：'不图为乐之至于斯也。'", source: "《论语·述而》" }
        ],
        whyItMatters: "Lu was the birthplace of Confucius and the cultural heart of classical China. Understanding Lu's role as the guardian of Zhou traditions explains why Confucius saw himself as a transmitter of ancient wisdom, not an innovator."
    },
    {
        id: "wei_state",
        name: "卫国（帝丘）",
        nameEn: "Wei (Diqiu)",
        type: "state",
        shortTip: "孔子适卫，卫灵公问政",
        shortTipEn: "Confucius visits Wei; Duke Ling of Wei asks about government",
        description: "卫国（姬姓，康叔之后）是周朝重要诸侯国，位于今河南省北部，都城帝丘。卫国居河淇之间，乃殷之故居。帝丘为中原北部枢纽，北控戎狄、西接晋、东连齐鲁、南逼郑宋。孔子周游列国时多次在卫国停留，前后居卫最久。卫灵公曾向孔子请教军事，蘧伯玉为卫国贤大夫，与孔子交好。孔子在卫国感叹'庶矣哉'（人口众多）。卫国有戚邑（黄河东岸关键渡口，蒯聩归国跳板）、匡邑（卫南边境，卫宋通道锁钥）、蒲地（卫西南要冲）、中牟（晋东南重镇）等要地。",
        descriptionEn: "The State of Wei (surname Ji, descended from Kangshu) was an important Zhou vassal state in present-day northern Henan province, with its capital at Diqiu. Wei lay between the Yellow River and the Qi River, the former territory of the Shang dynasty. Confucius stayed in Wei longer than any other state during his travels. Duke Ling of Wei once consulted Confucius on military matters. The virtuous minister Qu Boyu was a close friend of Confucius. In Wei, Confucius remarked 'How populous!' — noting the thriving population.",
        x: 60,
        y: 28,
        relatedCharacterIds: ["char_kongzi", "char_wei_ling_gong", "char_qu_bo_yu", "char_nan_zi"],
        relatedEventIds: ["event_arrive_wei"],
        unlockStep: 2,
        isCore: true,
        analectsPassages: [
            { text: "子适卫，冉有仆。子曰：'庶矣哉！'冉有曰：'既庶矣，又何加焉？'曰：'富之。'曰：'既富矣，又何加焉？'曰：'教之。'", source: "《论语·子路》" },
            { text: "子曰：'鲁卫之政，兄弟也。'", source: "《论语·子路》" }
        ],
        whyItMatters: "Wei was the state where Confucius spent the most time during his travels. His interactions with Duke Ling and Nanzi reveal the tension between his moral ideals and political realities. The principle 'first enrich, then educate' was formulated here."
    },
    {
        id: "kuang",
        name: "匡",
        nameEn: "Kuang",
        type: "event_place",
        shortTip: "匡人围孔子，颜渊后至",
        shortTipEn: "Confucius surrounded at Kuang; Yan Hui arrives late",
        description: "匡地为卫国邑邑，在今河南省长垣县一带。孔子途经匡地时，匡人误以为孔子是曾欺凌过他们的阳货，将孔子一行人围困达五日之久。孔子临危不惧，曰：'文王既没，文不在兹乎？天之将丧斯文也，后死者不得与于斯文也；天之未丧斯文也，匡人其如予何！'",
        descriptionEn: "Kuang was a settlement of Wei state near present-day Changyuan, Henan. When Confucius passed through, the people of Kuang mistook him for Yang Hu, who had once oppressed them, and surrounded him and his disciples for five days. Confucius remained calm, declaring: 'Since King Wen has passed away, does not our cultural heritage rest here? If Heaven were going to destroy this culture, we who follow would not have been given it. If Heaven does not intend to destroy this culture, what can the people of Kuang do to me!'",
        x: 55,
        y: 32,
        relatedCharacterIds: ["char_kongzi", "char_yan_hui"],
        relatedEventIds: ["event_kuang_siege"],
        unlockStep: 3,
        isCore: false,
        analectsPassages: [
            { text: "子畏于匡，曰：'文王既没，文不在兹乎？天之将丧斯文也，后死者不得与于斯文也；天之未丧斯文也，匡人其如予何！'", source: "《论语·子罕》" },
            { text: "子畏于匡，颜渊后。子曰：'吾以女为死矣。'曰：'子在，回何敢死？'", source: "《论语·先进》" }
        ],
        whyItMatters: "The Kuang incident reveals Confucius' profound conviction that he was the guardian of civilization itself. His response — trusting in Heaven's protection of culture — became a defining statement of his mission."
    },
    {
        id: "pu",
        name: "蒲",
        nameEn: "Pu",
        type: "event_place",
        shortTip: "蒲地受阻，被迫盟誓",
        shortTipEn: "Blocked at Pu; forced oath not honored",
        description: "蒲地属卫国，在今河南省长垣县境内。孔子离开卫国后经过蒲地，蒲人因公叔氏叛乱而阻止孔子通行，强迫孔子盟誓不去卫国。孔子被迫盟誓后，仍然前往卫国。子贡对此有疑问，孔子解释被迫的盟誓不必遵守。",
        descriptionEn: "Pu was a Wei territory near present-day Changyuan, Henan. After leaving Wei, Confucius passed through Pu, where rebels prevented his passage and forced him to swear an oath not to go to Wei. Confucius made the oath under duress, then immediately proceeded to Wei anyway. When Zigong questioned this, Confucius explained that an oath made under coercion is not binding before the spirits.",
        x: 50,
        y: 30,
        relatedCharacterIds: ["char_kongzi", "char_zi_gong"],
        relatedEventIds: ["event_pu_blocked"],
        unlockStep: 4,
        isCore: false,
        analectsPassages: [
            { text: "子贡问曰：'有美玉于斯，韫匮而藏诸？求善贾而沽诸？'子曰：'沽之哉！沽之哉！我待贾者也。'", source: "《论语·子罕》" }
        ],
        whyItMatters: "The Pu incident illustrates Confucius' pragmatic flexibility: he distinguished between moral principles and coerced promises. 'An oath forced upon one is not heard by the spirits' — this reflects a sophisticated ethical reasoning about consent and obligation."
    },
    {
        id: "cao_state",
        name: "曹国（陶丘）",
        nameEn: "Cao (Taoqiu)",
        type: "state",
        shortTip: "途经曹国，小国夹缝中",
        shortTipEn: "Passing through Cao, a small state between powers",
        description: "曹国是周朝小诸侯国，位于今山东省定陶县一带，都城陶丘。济水下游，地处鲁、宋、卫交界枢纽。曹国国力微弱，夹在晋、楚等大国之间，后为宋国所灭。孔子周游列国时途经曹国，史料记载：'于是丑之，去卫，过曹。'",
        descriptionEn: "Cao was a small Zhou vassal state near present-day Dingtao, Shandong, with its capital at Taoqiu. Located at the intersection of Lu, Song, and Wei, Cao was too weak to maintain independence and was eventually annexed by Song. Confucius passed through Cao during his travels, but the historical records note only that 'he left Wei and passed through Cao.'",
        x: 65,
        y: 48,
        relatedCharacterIds: ["char_kongzi"],
        relatedEventIds: ["event_pass_cao"],
        unlockStep: 5,
        isCore: false,
        analectsPassages: [],
        whyItMatters: "Cao's brief mention in Confucius' journey shows how even small, seemingly insignificant states were part of the interconnected world of Spring and Autumn China. The fact that Cao left little record reminds us how much of the historical record has been lost."
    },
    {
        id: "song_state",
        name: "宋国（商丘）",
        nameEn: "Song (Shangqiu)",
        type: "state",
        shortTip: "桓魋欲害孔子，孔子微服过宋",
        shortTipEn: "Huan Tui threatens Confucius; he escapes in disguise",
        description: "宋国是商朝遗民建立的诸侯国（殷商遗民之国，地位特殊），位于今河南省商丘市一带，都城睢阳。地处中原腹地十字路口，泗水、睢水交汇，南北东西陆路通衢，为晋楚争霸必争之地。孔子途经宋国时，宋国司马桓魋（向魋）想要杀害孔子。孔子与弟子们在大树下习礼，桓魋派人砍倒大树威胁孔子。孔子说：'天生德于予，桓魋其如予何！'随后微服离开宋国。",
        descriptionEn: "Song was a state founded by the descendants of the Shang dynasty, located near present-day Shangqiu, Henan. It occupied a strategic crossroads in the Central Plains. When Confucius passed through Song, the Minister of War Huan Tui sought to kill him. While Confucius and his disciples were practicing ritual beneath a large tree, Huan Tui had the tree cut down. Confucius declared: 'Heaven has endowed me with virtue. What can Huan Tui do to me!' He then changed clothes and left Song in disguise.",
        x: 68,
        y: 52,
        relatedCharacterIds: ["char_kongzi", "char_huan_tui"],
        relatedEventIds: ["event_huan_tui_threat"],
        unlockStep: 6,
        isCore: true,
        analectsPassages: [
            { text: "子曰：'天生德于予，桓魋其如予何！'", source: "《论语·述而》" },
            { text: "子畏于匡，颜渊后。子曰：'吾以女为死矣。'曰：'子在，回何敢死？'", source: "《论语·先进》" }
        ],
        whyItMatters: "Song was a direct link to the Shang dynasty, making it symbolically important for Confucius' project of preserving ancient culture. Huan Tui's threat and Confucius' defiant response became one of the most quoted moments of his life."
    },
    {
        id: "zheng_state",
        name: "郑国（新郑）",
        nameEn: "Zheng (Xinzheng)",
        type: "state",
        shortTip: "孔子与弟子失散于郑",
        shortTipEn: "Separated from disciples at Zheng",
        description: "郑国位于今河南省新郑市一带，都城新郑。新郑为中原核心枢纽，北靠黄河、西邻周室、东接宋、南连陈蔡，洧水、颍水流域，南北陆路要冲，传说为黄帝所都之墟。孔子离开宋国后到达郑国，途中与弟子们一度失散。有人形容孔子'累累若丧家之犬'，孔子闻后反而笑着说，这个形容很准确。郑国也是子产执政之地，孔子对子产评价颇高。",
        descriptionEn: "The State of Zheng was located near present-day Xinzheng, Henan, at the heart of the Central Plains. When Confucius arrived in Zheng, he became separated from his disciples and stood alone at the east gate. A man of Zheng described him as 'looking like a lost dog from a grieving family.' When Confucius heard this, he laughed and said, 'That is indeed what I am!' Zheng was also the state governed by the renowned minister Zichan, whom Confucius greatly admired.",
        x: 52,
        y: 52,
        relatedCharacterIds: ["char_kongzi", "char_zi_lu", "char_yan_hui"],
        relatedEventIds: ["event_zheng_separated"],
        unlockStep: 7,
        isCore: true,
        analectsPassages: [
            { text: "或曰：'雍也仁而不佞。'子曰：'焉用佞？御人以口给，屡憎于人。不知其仁，焉用佞？'", source: "《论语·公冶长》" }
        ],
        whyItMatters: "The 'lost dog' story at Zheng is one of the most humanizing moments in Confucius' biography. It shows his capacity for self-deprecating humor and his willingness to acknowledge his own difficult circumstances without losing dignity."
    },
    {
        id: "chen_state",
        name: "陈国（宛丘）",
        nameEn: "Chen (Wanqiu)",
        type: "state",
        shortTip: "孔子居陈三年，讲学不止",
        shortTipEn: "Confucius stays in Chen three years, teaching continuously",
        description: "陈国位于今河南省淮阳县一带，都城宛丘。陈国地处淮水上游屏障，为晋楚等大国争夺前哨，颍水航运与陆路连接郑、宋、蔡、楚。'会晋楚争强，更伐陈，及吴侵陈，陈常被寇。'孔子在陈国居住了较长时间（约三年），是周游列国期间停留最久的国家之一。孔子在陈国期间继续教授弟子，陈愍公礼遇孔子。陈国后为楚国所灭。",
        descriptionEn: "The State of Chen was located near present-day Huaiyang, Henan, along the upper reaches of the Huai River. It was frequently contested between the great powers of Jin and Chu. Confucius lived in Chen for about three years, one of his longest stays during the travels. He continued teaching his disciples there and was treated with respect by Duke Min of Chen. Chen was later annexed by Chu.",
        x: 48,
        y: 62,
        relatedCharacterIds: ["char_kongzi", "char_zi_gong", "char_zi_lu"],
        relatedEventIds: [],
        unlockStep: 8,
        isCore: true,
        analectsPassages: [
            { text: "子在陈曰：'归与！归与！吾党之小子狂简，斐然成章，不知所以裁之。'", source: "《论语·公冶长》" },
            { text: "子曰：'志士仁人，无求生以害仁，有杀身以成仁。'", source: "《论语·卫灵公》" }
        ],
        whyItMatters: "Chen provided Confucius a rare period of stability during his travels. His remark 'Let me go home!' from Chen reveals his growing homesickness and concern for his disciples back in Lu, showing the human side of his long journey."
    },
    {
        id: "cai_ye",
        name: "蔡国 / 叶地",
        nameEn: "Cai / Ye",
        type: "state",
        shortTip: "叶公问政于孔子",
        shortTipEn: "Lord of Ye asks Confucius about government",
        description: "叶地属楚国边邑，在今河南省叶县一带。叶公（沈诸梁）是楚国大夫，封地在叶。蔡国故地上蔡控楚—中原通道。叶邑地处南阳盆地北缘锁钥，控楚—郑、楚—晋要道，为楚国重要城池。叶公曾向孔子请教为政之道，孔子回答：'近者说，远者来。'（使近处的人高兴，远处的人自然会来归附。）叶公又问孔子关于'直'的问题，孔子回答'父为子隐，子为父隐，直在其中矣'。",
        descriptionEn: "Ye was a border town of Chu, located near present-day Ye County, Henan. The Lord of Ye (Shen Zhuliang) was a Chu official who governed this region. He asked Confucius about the principles of good government, and Confucius replied: 'Make the near ones happy, and the far ones will come.' The Lord of Ye also asked about uprightness, and Confucius gave the famous response: 'The father conceals for the son, the son conceals for the father — uprightness lies within this.'",
        x: 42,
        y: 70,
        relatedCharacterIds: ["char_kongzi", "char_ye_gong"],
        relatedEventIds: ["event_ye_gong_asks"],
        unlockStep: 9,
        isCore: true,
        analectsPassages: [
            { text: "叶公问政。子曰：'近者说，远者来。'", source: "《论语·子路》" },
            { text: "叶公语孔子曰：'吾党有直躬者，其父攘羊，而子证之。'孔子曰：'吾党之直者异于是：父为子隐，子为父隐，直在其中矣。'", source: "《论语·子路》" }
        ],
        whyItMatters: "The conversation with the Lord of Ye produced two of Confucius' most discussed teachings: the principle of 'attracting the distant by pleasing the near' (a foundation of Chinese political philosophy), and the controversial idea that familial loyalty precedes abstract justice."
    },
    {
        id: "chen_cai_border",
        name: "陈蔡之间",
        nameEn: "Between Chen and Cai",
        type: "event_place",
        shortTip: "陈蔡绝粮，七日不火食",
        shortTipEn: "Stranded between Chen and Cai, seven days without food",
        description: "陈国与蔡国之间的荒野地带。孔子从陈国前往蔡国时，吴国伐陈，楚国救陈，孔子一行被困于陈蔡之间，粮食断绝达七日之久。弟子们饿得站不起来，孔子仍弦歌不辍。子路、子贡、颜回对此各有不同的态度和回应，孔子逐一开导。这是孔子周游列国中最艰难的时期之一。",
        descriptionEn: "A wilderness area between the states of Chen and Cai. While Confucius was traveling from Chen to Cai, the armies of Wu and Chu were maneuvering in the region, trapping Confucius and his disciples between the two states. They ran out of food for seven days. His disciples were too weak to stand, yet Confucius continued to play the lute and sing. Zilu, Zigong, and Yan Hui each responded differently to the crisis, and Confucius guided each according to their character.",
        x: 45,
        y: 65,
        relatedCharacterIds: ["char_kongzi", "char_zi_lu", "char_zi_gong", "char_yan_hui"],
        relatedEventIds: ["event_chen_cai_famine"],
        unlockStep: 10,
        isCore: true,
        analectsPassages: [
            { text: "在陈绝粮，从者病，莫能兴。子路愠见曰：'君子亦有穷乎？'子曰：'君子固穷，小人穷斯滥矣。'", source: "《论语·卫灵公》" },
            { text: "子贡问曰：'有一言而可以终身行之者乎？'子曰：'其恕乎！己所不欲，勿施于人。'", source: "《论语·卫灵公》" }
        ],
        whyItMatters: "The Chen-Cai crisis was Confucius' lowest point during his travels. His response — 'The exemplary person holds firm in adversity; the petty person collapses' — became the definitive Confucian statement on resilience. It was also during this crisis that he taught 'Do not do to others what you do not want done to yourself.'"
    },
    {
        id: "chu_state",
        name: "楚国",
        nameEn: "Chu",
        type: "state",
        shortTip: "楚昭王欲迎孔子，子西劝阻",
        shortTipEn: "King Zhao of Chu invites Confucius; Zixi dissuades him",
        description: "楚国是春秋大国（芈姓），位于长江中游流域，都城郢都。郢都为江汉流域中心，西控巴蜀、北阻中原、东制吴越、南屏百越，长江、汉水航运枢纽。楚北境边邑城父为楚晋、楚郑交界前哨。楚昭王听说孔子在陈蔡之间，派人迎请孔子，打算封给孔子七百里书社之地。楚国令尹子西担心孔子才能过人，如果受重用将威胁楚国大臣的地位，于是劝阻楚昭王。楚昭王后来作罢，孔子最终未能入楚。",
        descriptionEn: "Chu was one of the great powers of the Spring and Autumn period, located in the middle Yangtze River region with its capital at Yingdu. King Zhao of Chu, hearing that Confucius was stranded between Chen and Cai, sent messengers to invite him and offered to grant him a territory of seven hundred li. However, the prime minister Zixi warned that Confucius' talents and his disciples' abilities would threaten the position of Chu's ministers. The king relented, and Confucius never entered Chu.",
        x: 35,
        y: 80,
        relatedCharacterIds: ["char_kongzi", "char_chu_zhao_wang", "char_zi_xi"],
        relatedEventIds: ["event_chu_zhao_wang_invites"],
        unlockStep: 11,
        isCore: true,
        analectsPassages: [
            { text: "楚狂接舆歌而过孔子曰：'凤兮凤兮！何德之衰？往者不可谏，来者犹可追。已而，已而！今之从政者殆而！'孔子下，欲与之言。趋而辟之，不得与之言。", source: "《论语·微子》" }
        ],
        whyItMatters: "Chu represented Confucius' greatest missed opportunity and his farthest geographical reach. The refusal of Chu's offer marked the turning point of his journey — after this, he would return home. The madman of Chu who sang to Confucius is one of the most poetic encounters in the Analects."
    },
    {
        id: "return_lu",
        name: "归鲁",
        nameEn: "Return to Lu",
        type: "event_place",
        shortTip: "孔子周游十四年，终返鲁国",
        shortTipEn: "After fourteen years, Confucius finally returns to Lu",
        description: "孔子从鲁定公十三年（前497）离开鲁国开始周游列国，至鲁哀公十一年（前484）返回鲁国，历时十四年。归鲁后，孔子被尊为'国老'，专心整理六经（诗、书、礼、乐、易、春秋），教授弟子，不再求仕。孔子晚年完成大量学术工作，对中国文化影响深远。",
        descriptionEn: "Confucius left Lu in 497 BCE and returned in 484 BCE after fourteen years of traveling through the states. Upon his return, he was honored as the 'Elder of the State.' He devoted his remaining years to editing the Six Classics (Poetry, Documents, Rites, Music, Changes, Spring and Autumn Annals) and teaching his disciples. He never again sought political office. The scholarly work of his final years had an incalculable impact on Chinese civilization.",
        x: 72,
        y: 42,
        relatedCharacterIds: ["char_kongzi", "char_zi_gong", "char_yan_hui"],
        relatedEventIds: ["event_return_lu"],
        unlockStep: 12,
        isCore: true,
        analectsPassages: [
            { text: "子曰：'吾十有五而志于学，三十而立，四十而不惑，五十而知天命，六十而耳顺，七十而从心所欲，不逾矩。'", source: "《论语·为政》" },
            { text: "子曰：'述而不作，信而好古，窃比于我老彭。'", source: "《论语·述而》" }
        ],
        whyItMatters: "Confucius' return to Lu is the closing of the circle. The fourteen-year journey produced no political reforms, but the final years of teaching and editing created the foundation of Confucian education that shaped East Asian civilization for two millennia."
    },

    {
        id: "huanghe",
        name: "黄河",
        nameEn: "Yellow River",
        type: "geo",
        shortTip: "黄河——北方大河",
        shortTipEn: "Yellow River — great river of the north",
        description: "黄河是中国第二长河，春秋时期是北方重要的地理界线。孔子周游列国的主要活动区域大多在黄河以南或以东。黄河以南为中原腹地，是春秋列国争霸的核心地带。",
        descriptionEn: "The Yellow River is China's second-longest river and was a major geographical boundary in the Spring and Autumn period. Confucius' travels took place mostly south and east of the Yellow River, in the Central Plains where the feudal states contended for supremacy.",
        x: 50,
        y: 18,
        relatedCharacterIds: [],
        relatedEventIds: [],
        unlockStep: 1,
        isCore: false,
        geoShape: "river",
        geoPoints: [
            {x: 10, y: 22}, {x: 25, y: 18}, {x: 40, y: 16},
            {x: 55, y: 18}, {x: 70, y: 20}, {x: 85, y: 24}
        ]
    },
    {
        id: "huaihe",
        name: "淮河",
        nameEn: "Huai River",
        type: "geo",
        shortTip: "淮河——南北分界",
        shortTipEn: "Huai River — boundary between north and south",
        description: "淮河是春秋时期南北的重要地理分界线。孔子周游列国到达的楚国、蔡国等地均在淮河流域。淮河以南为楚文化影响区域，以北为中原诸国。",
        descriptionEn: "The Huai River was a major north-south boundary in the Spring and Autumn period. The southernmost regions Confucius reached — Chu and Cai — lie in the Huai River basin. South of the Huai was Chu cultural territory; north lay the Central Plains states.",
        x: 50,
        y: 76,
        relatedCharacterIds: [],
        relatedEventIds: [],
        unlockStep: 1,
        isCore: false,
        geoShape: "river",
        geoPoints: [
            {x: 15, y: 78}, {x: 30, y: 76}, {x: 50, y: 76},
            {x: 70, y: 74}, {x: 85, y: 72}
        ]
    },
    {
        id: "taishan",
        name: "泰山",
        nameEn: "Mount Tai",
        type: "geo",
        shortTip: "泰山——鲁地名山",
        shortTipEn: "Mount Tai — famous mountain of Lu",
        description: "泰山位于鲁国北部，是中国五岳之首（东岳）。泰山在古代被视为神圣之山，是封禅祭天之地。孔子曾登泰山而小天下。",
        descriptionEn: "Mount Tai, located north of Lu, is the most famous of China's Five Sacred Mountains (the Eastern Peak). In ancient times it was considered a sacred mountain where emperors performed sacrifices to Heaven. Confucius once climbed Mount Tai and felt the whole world seemed small beneath him.",
        x: 78,
        y: 34,
        relatedCharacterIds: [],
        relatedEventIds: [],
        unlockStep: 1,
        isCore: false,
        geoShape: "mountain"
    },
    {
        id: "chengzhou",
        name: "成周（洛邑）",
        nameEn: "Chengzhou (Luoyi)",
        type: "city",
        shortTip: "成周——东周王都",
        shortTipEn: "Chengzhou — capital of the Eastern Zhou",
        description: "成周即洛邑（今河南省洛阳市），是东周的王都。周平王东迁后定都于此。孔子曾到洛邑问礼于老子，这是他早年一次重要的学术活动。",
        descriptionEn: "Chengzhou, also known as Luoyi (present-day Luoyang, Henan), was the capital of the Eastern Zhou dynasty. Confucius once traveled here to consult Laozi about ritual, a formative intellectual experience in his early years.",
        x: 38,
        y: 40,
        relatedCharacterIds: [],
        relatedEventIds: [],
        unlockStep: 1,
        isCore: false
    },
    {
        id: "jin_state",
        name: "晋国",
        nameEn: "Jin",
        type: "state",
        shortTip: "晋国——北方大国",
        shortTipEn: "Jin — great power of the north",
        description: "晋国（姬姓，唐叔之后）是春秋时期北方霸主，位于今山西省一带。晋国西有河西与秦接境，北边翟，东至河内。黄河渡口控制东出南下通道，为晋—中原天然屏障。孔子周游列国时曾有意应晋国赵鞅之召，行至黄河边，闻赵鞅杀晋国贤大夫窦鸣犊、舜华，临河而叹：'美哉水，洋洋乎！丘之不济此，命也夫！'遂返卫，终未入晋。",
        descriptionEn: "Jin (surname Ji, descended from Tangshu) was the dominant power of the northern plains during the Spring and Autumn period. Confucius once considered accepting an invitation from Zhao Yang of Jin. He traveled as far as the Yellow River, but when he heard that Zhao Yang had executed two worthy officials, Confucius sighed: 'How beautiful this river — its waters flow so vast! That I do not cross is my fate!' He turned back to Wei and never entered Jin.",
        x: 32,
        y: 14,
        relatedCharacterIds: [],
        relatedEventIds: [],
        unlockStep: 1,
        isCore: false
    },
    {
        id: "qi_state",
        name: "齐国（临淄）",
        nameEn: "Qi (Linzi)",
        type: "state",
        shortTip: "齐国——东方大国",
        shortTipEn: "Qi — great power of the east",
        description: "齐国（姜姓，太公之后）是春秋时期东方大国，位于今山东省中北部，都城临淄。齐国东负海、南阻泰山、西界黄河，三面天险，易守难攻。济水航运与陆路枢纽，控海岱之间。'齐带山海，膏壤千里，宜桑麻，人民多文彩布帛鱼盐。'孔子曾到齐国，齐景公问政于孔子，孔子回答：'君君，臣臣，父父，子子。'齐景公打算重用孔子，但被晏婴劝阻。",
        descriptionEn: "Qi (surname Jiang, descended from Grand Duke Jiang Ziya) was a great eastern power during the Spring and Autumn period. Its capital Linzi (near present-day Zibo, Shandong) was one of the most prosperous cities of the era. Confucius visited Qi, where Duke Jing asked him about government. Confucius replied: 'Let the ruler be a ruler, the minister a minister, the father a father, the son a son.' Duke Jing was impressed and considered employing Confucius, but was dissuaded by the minister Yan Ying.",
        x: 84,
        y: 22,
        relatedCharacterIds: [],
        relatedEventIds: [],
        unlockStep: 1,
        isCore: false
    },
    {
        id: "jiao_pass",
        name: "函谷关",
        nameEn: "Hangu Pass",
        type: "geo",
        shortTip: "函谷关——关隘要道",
        shortTipEn: "Hangu Pass — strategic mountain pass",
        description: "函谷关是春秋时期重要的关隘，位于今河南省灵宝市一带，是东西交通的要道。孔子周游列国虽未直接经过函谷关，但此关是当时中原与关中地区的重要通道。",
        descriptionEn: "Hangu Pass was a strategically vital mountain pass in present-day Lingbao, Henan, controlling the main route between the Central Plains and the Guanzhong region. Though Confucius did not pass through it directly, it was one of the most important fortifications of the era.",
        x: 22,
        y: 38,
        relatedCharacterIds: [],
        relatedEventIds: [],
        unlockStep: 1,
        isCore: false,
        geoShape: "pass"
    },
    {
        id: "fei",
        name: "费邑",
        nameEn: "Fei",
        type: "city",
        shortTip: "费邑——季氏私邑",
        shortTipEn: "Fei — the Ji family's private city",
        description: "费邑，鲁国季氏私邑，在今山东省费县一带。公山不狃为费宰，据费叛季氏，使人召孔子。孔子堕三都时，季氏将堕费，公山不狃与叔孙辄率费人袭鲁，公与三子入季氏之宫登武子之台。孔子命申句须、乐颀下伐之，费人北。",
        descriptionEn: "Fei was a private city of the Ji family in Lu, near present-day Fei County, Shandong. Gongshan Buniou, the steward of Fei, rebelled against the Ji family and invited Confucius to join him. During Confucius' campaign to dismantle the three fortified cities, Fei was the site of a military confrontation where Confucius ordered an attack that defeated the rebels.",
        x: 68,
        y: 48,
        relatedCharacterIds: ["char_kongzi", "char_gongshan_bu_niu"],
        relatedEventIds: [],
        unlockStep: 3,
        isCore: false
    },
    {
        id: "qi_yi",
        name: "戚邑",
        nameEn: "Qi",
        type: "city",
        shortTip: "戚邑——黄河渡口",
        shortTipEn: "Qi — ferry crossing on the Yellow River",
        description: "戚邑，卫国城邑，黄河东岸关键渡口。鲁哀公二年，晋国纳蒯聩于戚。鲁哀公十五年，蒯聩自戚入卫夺位，是为卫庄公。戚邑是蒯聩流亡归国的跳板，直接威胁卫都帝丘。",
        descriptionEn: "Qi was a Wei city serving as a key ferry crossing on the eastern bank of the Yellow River. It played a crucial role in the succession struggle of Wei: Kuaikui, the exiled heir, used Qi as his base to return and seize power, becoming Duke Zhuang of Wei.",
        x: 58,
        y: 26,
        relatedCharacterIds: ["char_kuai_kui"],
        relatedEventIds: [],
        unlockStep: 8,
        isCore: false
    }
];
