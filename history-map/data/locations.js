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
 * @property {'state'|'city'|'event_place'|'geo'} type  地点类型
 * @property {string} shortTip            简短提示（列表/卡片预览用）
 * @property {string} description         地点简介
 * @property {number} x                   地图 X 百分比坐标 (0-100)
 * @property {number} y                   地图 Y 百分比坐标 (0-100)
 * @property {string[]} relatedCharacterIds  关联人物 ID 数组
 * @property {string[]} relatedEventIds       关联事件 ID 数组
 * @property {number} unlockStep          解锁步骤（与路线 step 对应）
 * @property {boolean} [isCore]           是否核心地点（默认 true）
 */

/** @type {Location[]} */
window.historyMapLocations = [
    {
        id: "lu_state",
        name: "鲁国（曲阜）",
        type: "state",
        shortTip: "孔子故乡，旅程起点与终点",
        description: "鲁国（姬姓，周公封国）是周朝重要的诸侯国，位于今山东省西南部，都城曲阜。鲁国为周礼乐文化中心，韩宣子适鲁云'周礼尽在鲁矣'。孔子（前551—前479）诞生于鲁国陬邑（曲阜东南屏障），其父叔梁纥因功封陬邑大夫。孔子曾任鲁国中都宰（鲁西屏障，'一年，四方皆则之'）、小司空、大司寇，后辞官开始周游列国。晚年返回鲁国，整理六经，教授弟子，直至终老。交通上，曲阜为泗水航运与陆路要道，连接中原与东方。",
        x: 72,
        y: 45,
        relatedCharacterIds: ["char_kongzi", "char_yan_hui", "char_zi_lu", "char_zi_gong"],
        relatedEventIds: ["event_depart_lu", "event_return_lu"],
        unlockStep: 1,
        isCore: true
    },
    {
        id: "wei_state",
        name: "卫国（帝丘）",
        type: "state",
        shortTip: "孔子适卫，卫灵公问政",
        description: "卫国（姬姓，康叔之后）是周朝重要诸侯国，位于今河南省北部，都城帝丘。卫国居河淇之间，乃殷之故居。帝丘为中原北部枢纽，北控戎狄、西接晋、东连齐鲁、南逼郑宋。孔子周游列国时多次在卫国停留，前后居卫最久。卫灵公曾向孔子请教军事，蘧伯玉为卫国贤大夫，与孔子交好。孔子在卫国感叹'庶矣哉'（人口众多）。卫国有戚邑（黄河东岸关键渡口，蒯聩归国跳板）、匡邑（卫南边境，卫宋通道锁钥）、蒲地（卫西南要冲）、中牟（晋东南重镇）等要地。",
        x: 60,
        y: 28,
        relatedCharacterIds: ["char_kongzi", "char_wei_ling_gong", "char_qu_bo_yu", "char_nan_zi"],
        relatedEventIds: ["event_arrive_wei"],
        unlockStep: 2,
        isCore: true
    },
    {
        id: "kuang",
        name: "匡",
        type: "event_place",
        shortTip: "匡人围孔子，颜渊后至",
        description: "匡地为卫国邑邑，在今河南省长垣县一带。孔子途经匡地时，匡人误以为孔子是曾欺凌过他们的阳货，将孔子一行人围困达五日之久。孔子临危不惧，曰：'文王既没，文不在兹乎？天之将丧斯文也，后死者不得与于斯文也；天之未丧斯文也，匡人其如予何！'",
        x: 55,
        y: 32,
        relatedCharacterIds: ["char_kongzi", "char_yan_hui"],
        relatedEventIds: ["event_kuang_siege"],
        unlockStep: 3,
        isCore: false
    },
    {
        id: "pu",
        name: "蒲",
        type: "event_place",
        shortTip: "蒲地受阻，被迫盟誓",
        description: "蒲地属卫国，在今河南省长垣县境内。孔子离开卫国后经过蒲地，蒲人因公叔氏叛乱而阻止孔子通行，强迫孔子盟誓不去卫国。孔子被迫盟誓后，仍然前往卫国。子贡对此有疑问，孔子解释被迫的盟誓不必遵守。",
        x: 50,
        y: 30,
        relatedCharacterIds: ["char_kongzi", "char_zi_gong"],
        relatedEventIds: ["event_pu_blocked"],
        unlockStep: 4,
        isCore: false
    },
    {
        id: "cao_state",
        name: "曹国（陶丘）",
        type: "state",
        shortTip: "途经曹国，小国夹缝中",
        description: "曹国是周朝小诸侯国，位于今山东省定陶县一带，都城陶丘。济水下游，地处鲁、宋、卫交界枢纽。曹国国力微弱，夹在晋、楚等大国之间，后为宋国所灭。孔子周游列国时途经曹国，史料记载：'于是丑之，去卫，过曹。'",
        x: 65,
        y: 48,
        relatedCharacterIds: ["char_kongzi"],
        relatedEventIds: ["event_pass_cao"],
        unlockStep: 5,
        isCore: false
    },
    {
        id: "song_state",
        name: "宋国（商丘）",
        type: "state",
        shortTip: "桓魋欲害孔子，孔子微服过宋",
        description: "宋国是商朝遗民建立的诸侯国（殷商遗民之国，地位特殊），位于今河南省商丘市一带，都城睢阳。地处中原腹地十字路口，泗水、睢水交汇，南北东西陆路通衢，为晋楚争霸必争之地。孔子途经宋国时，宋国司马桓魋（向魋）想要杀害孔子。孔子与弟子们在大树下习礼，桓魋派人砍倒大树威胁孔子。孔子说：'天生德于予，桓魋其如予何！'随后微服离开宋国。",
        x: 68,
        y: 52,
        relatedCharacterIds: ["char_kongzi", "char_huan_tui"],
        relatedEventIds: ["event_huan_tui_threat"],
        unlockStep: 6,
        isCore: true
    },
    {
        id: "zheng_state",
        name: "郑国（新郑）",
        type: "state",
        shortTip: "孔子与弟子失散于郑",
        description: "郑国位于今河南省新郑市一带，都城新郑。新郑为中原核心枢纽，北靠黄河、西邻周室、东接宋、南连陈蔡，洧水、颍水流域，南北陆路要冲，传说为黄帝所都之墟。孔子离开宋国后到达郑国，途中与弟子们一度失散。有人形容孔子'累累若丧家之犬'，孔子闻后反而笑着说，这个形容很准确。郑国也是子产执政之地，孔子对子产评价颇高。",
        x: 52,
        y: 52,
        relatedCharacterIds: ["char_kongzi", "char_zi_lu", "char_yan_hui"],
        relatedEventIds: ["event_zheng_separated"],
        unlockStep: 7,
        isCore: true
    },
    {
        id: "chen_state",
        name: "陈国（宛丘）",
        type: "state",
        shortTip: "孔子居陈三年，讲学不止",
        description: "陈国位于今河南省淮阳县一带，都城宛丘。陈国地处淮水上游屏障，为晋楚等大国争夺前哨，颍水航运与陆路连接郑、宋、蔡、楚。'会晋楚争强，更伐陈，及吴侵陈，陈常被寇。'孔子在陈国居住了较长时间（约三年），是周游列国期间停留最久的国家之一。孔子在陈国期间继续教授弟子，陈愍公礼遇孔子。陈国后为楚国所灭。",
        x: 48,
        y: 62,
        relatedCharacterIds: ["char_kongzi", "char_zi_gong", "char_zi_lu"],
        relatedEventIds: [],
        unlockStep: 8,
        isCore: true
    },
    {
        id: "cai_ye",
        name: "蔡国 / 叶地",
        type: "state",
        shortTip: "叶公问政于孔子",
        description: "叶地属楚国边邑，在今河南省叶县一带。叶公（沈诸梁）是楚国大夫，封地在叶。蔡国故地上蔡控楚—中原通道。叶邑地处南阳盆地北缘锁钥，控楚—郑、楚—晋要道，为楚国重要城池。叶公曾向孔子请教为政之道，孔子回答：'近者说，远者来。'（使近处的人高兴，远处的人自然会来归附。）叶公又问孔子关于'直'的问题，孔子回答'父为子隐，子为父隐，直在其中矣'。",
        x: 42,
        y: 70,
        relatedCharacterIds: ["char_kongzi", "char_ye_gong"],
        relatedEventIds: ["event_ye_gong_asks"],
        unlockStep: 9,
        isCore: true
    },
    {
        id: "chen_cai_border",
        name: "陈蔡之间",
        type: "event_place",
        shortTip: "陈蔡绝粮，七日不火食",
        description: "陈国与蔡国之间的荒野地带。孔子从陈国前往蔡国时，吴国伐陈，楚国救陈，孔子一行被困于陈蔡之间，粮食断绝达七日之久。弟子们饿得站不起来，孔子仍弦歌不辍。子路、子贡、颜回对此各有不同的态度和回应，孔子逐一开导。这是孔子周游列国中最艰难的时期之一。",
        x: 45,
        y: 65,
        relatedCharacterIds: ["char_kongzi", "char_zi_lu", "char_zi_gong", "char_yan_hui"],
        relatedEventIds: ["event_chen_cai_famine"],
        unlockStep: 10,
        isCore: true
    },
    {
        id: "chu_state",
        name: "楚国",
        type: "state",
        shortTip: "楚昭王欲迎孔子，子西劝阻",
        description: "楚国是春秋大国（芈姓），位于长江中游流域，都城郢都。郢都为江汉流域中心，西控巴蜀、北阻中原、东制吴越、南屏百越，长江、汉水航运枢纽。楚北境边邑城父为楚晋、楚郑交界前哨。楚昭王听说孔子在陈蔡之间，派人迎请孔子，打算封给孔子七百里书社之地。楚国令尹子西担心孔子才能过人，如果受重用将威胁楚国大臣的地位，于是劝阻楚昭王。楚昭王后来作罢，孔子最终未能入楚。",
        x: 35,
        y: 80,
        relatedCharacterIds: ["char_kongzi", "char_chu_zhao_wang", "char_zi_xi"],
        relatedEventIds: ["event_chu_zhao_wang_invites"],
        unlockStep: 11,
        isCore: true
    },
    {
        id: "return_lu",
        name: "归鲁",
        type: "event_place",
        shortTip: "孔子周游十四年，终返鲁国",
        description: "孔子从鲁定公十三年（前497）离开鲁国开始周游列国，至鲁哀公十一年（前484）返回鲁国，历时十四年。归鲁后，孔子被尊为'国老'，专心整理六经（诗、书、礼、乐、易、春秋），教授弟子，不再求仕。孔子晚年完成大量学术工作，对中国文化影响深远。",
        x: 72,
        y: 42,
        relatedCharacterIds: ["char_kongzi", "char_zi_gong", "char_yan_hui"],
        relatedEventIds: ["event_return_lu"],
        unlockStep: 12,
        isCore: true
    },

    {
        id: "huanghe",
        name: "黄河",
        type: "geo",
        shortTip: "黄河——北方大河",
        description: "黄河是中国第二长河，春秋时期是北方重要的地理界线。孔子周游列国的主要活动区域大多在黄河以南或以东。黄河以南为中原腹地，是春秋列国争霸的核心地带。",
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
        type: "geo",
        shortTip: "淮河——南北分界",
        description: "淮河是春秋时期南北的重要地理分界线。孔子周游列国到达的楚国、蔡国等地均在淮河流域。淮河以南为楚文化影响区域，以北为中原诸国。",
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
        type: "geo",
        shortTip: "泰山——鲁地名山",
        description: "泰山位于鲁国北部，是中国五岳之首（东岳）。泰山在古代被视为神圣之山，是封禅祭天之地。孔子曾登泰山而小天下。",
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
        type: "city",
        shortTip: "成周——东周王都",
        description: "成周即洛邑（今河南省洛阳市），是东周的王都。周平王东迁后定都于此。孔子曾到洛邑问礼于老子，这是他早年一次重要的学术活动。",
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
        type: "state",
        shortTip: "晋国——北方大国",
        description: "晋国（姬姓，唐叔之后）是春秋时期北方霸主，位于今山西省一带。晋国西有河西与秦接境，北边翟，东至河内。黄河渡口控制东出南下通道，为晋—中原天然屏障。孔子周游列国时曾有意应晋国赵鞅之召，行至黄河边，闻赵鞅杀晋国贤大夫窦鸣犊、舜华，临河而叹：'美哉水，洋洋乎！丘之不济此，命也夫！'遂返卫，终未入晋。",
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
        type: "state",
        shortTip: "齐国——东方大国",
        description: "齐国（姜姓，太公之后）是春秋时期东方大国，位于今山东省中北部，都城临淄。齐国东负海、南阻泰山、西界黄河，三面天险，易守难攻。济水航运与陆路枢纽，控海岱之间。'齐带山海，膏壤千里，宜桑麻，人民多文彩布帛鱼盐。'孔子曾到齐国，齐景公问政于孔子，孔子回答：'君君，臣臣，父父，子子。'齐景公打算重用孔子，但被晏婴劝阻。",
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
        type: "geo",
        shortTip: "函谷关——关隘要道",
        description: "函谷关是春秋时期重要的关隘，位于今河南省灵宝市一带，是东西交通的要道。孔子周游列国虽未直接经过函谷关，但此关是当时中原与关中地区的重要通道。",
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
        type: "city",
        shortTip: "费邑——季氏私邑",
        description: "费邑，鲁国季氏私邑，在今山东省费县一带。公山不狃为费宰，据费叛季氏，使人召孔子。孔子堕三都时，季氏将堕费，公山不狃与叔孙辄率费人袭鲁，公与三子入季氏之宫登武子之台。孔子命申句须、乐颀下伐之，费人北。",
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
        type: "city",
        shortTip: "戚邑——黄河渡口",
        description: "戚邑，卫国城邑，黄河东岸关键渡口。鲁哀公二年，晋国纳蒯聩于戚。鲁哀公十五年，蒯聩自戚入卫夺位，是为卫庄公。戚邑是蒯聩流亡归国的跳板，直接威胁卫都帝丘。",
        x: 58,
        y: 26,
        relatedCharacterIds: ["char_kuai_kui"],
        relatedEventIds: [],
        unlockStep: 8,
        isCore: false
    }
];
