/**
 * 孔子周游列国路线步骤数据
 *
 * 定义了用户跟随孔子游历的逐站推进流程。
 * 每一步包含当前地点、提示语和需要解锁的数据。
 */

/**
 * @typedef {Object} RouteStep
 * @property {number} id                    步骤编号（与 order 一致）
 * @property {number} order                 顺序号（1-12）
 * @property {string} title                 步骤标题
 * @property {string} locationId            当前地点 ID
 * @property {string} prompt                进入此站时的提示语（第一视角）
 * @property {string[]} unlockLocationIds    此步骤解锁的地点 ID 数组
 * @property {string[]} unlockCharacterIds   此步骤解锁的人物 ID 数组
 * @property {string[]} unlockEventIds       此步骤解锁的事件 ID 数组
 */

/** @type {RouteStep[]} */
window.historyMapRouteSteps = [
    {
        id: 1,
        order: 1,
        title: "离鲁 · 旅程开始",
        locationId: "lu_state",
        prompt: "鲁定公十三年（前497），你五十五岁。季桓子接受了齐国送来的女乐，三日不听朝政。你感到政治理想无法在鲁国实现，决定离开这片生于斯长于斯的土地。带着子路、子贡、颜回等弟子，你踏上了未知的周游列国之旅。",
        unlockLocationIds: ["lu_state"],
        unlockCharacterIds: ["char_kongzi", "char_zi_lu", "char_zi_gong", "char_yan_hui"],
        unlockEventIds: ["event_depart_lu"]
    },
    {
        id: 2,
        order: 2,
        title: "适卫 · 初到卫国",
        locationId: "wei_state",
        prompt: "离开鲁国后，你首先来到了卫国。卫灵公以礼相待，按你在鲁国时的俸禄标准供养你。你住在贤大夫蘧伯玉家中，观察卫国的政事。卫灵公问你军事，你却只愿意谈论礼乐。你还见了卫灵公的夫人南子，这引起了子路的不满……",
        unlockLocationIds: ["wei_state"],
        unlockCharacterIds: ["char_wei_ling_gong", "char_nan_zi", "char_qu_bo_yu"],
        unlockEventIds: ["event_arrive_wei"]
    },
    {
        id: 3,
        order: 3,
        title: "匡地被围 · 文在兹乎",
        locationId: "kuang",
        prompt: "离开卫国，你经过匡地。不料匡人误以为你是曾经欺凌过他们的阳货，将你围困了整整五日！在围困中，你泰然自若，继续弹琴唱歌。你对弟子们说：'文王既没，文不在兹乎？'最终，匡人发现认错了人，你们得以脱身。颜回最后才赶到，你一度以为他已遭遇不测。",
        unlockLocationIds: ["kuang"],
        unlockCharacterIds: [],
        unlockEventIds: ["event_kuang_siege"]
    },
    {
        id: 4,
        order: 4,
        title: "蒲地受阻 · 要盟不听",
        locationId: "pu",
        prompt: "经过蒲地时，正值公叔氏叛乱。蒲人担心你帮助他们平叛，阻止你通行，强迫你盟誓不再去卫国。你被迫盟誓后出了蒲地东门，却依然决定前往卫国。子贡对此不解，你说：'要盟也，神不听。'——被迫订立的盟约，神明是不会听的。",
        unlockLocationIds: ["pu"],
        unlockCharacterIds: [],
        unlockEventIds: ["event_pu_blocked"]
    },
    {
        id: 5,
        order: 5,
        title: "途经曹国 · 小国夹缝",
        locationId: "cao_state",
        prompt: "你继续前行，途经曹国。这是一个夹在大国之间的小诸侯国，国力微弱。关于你在此地的具体事迹，记载不多，但你的足迹遍布列国，反映了那个时代的地理格局和政治生态。",
        unlockLocationIds: ["cao_state"],
        unlockCharacterIds: [],
        unlockEventIds: ["event_pass_cao"]
    },
    {
        id: 6,
        order: 6,
        title: "过宋 · 桓魋欲害",
        locationId: "song_state",
        prompt: "你来到宋国，与弟子们在一棵大树下演习礼仪。宋国司马桓魋想要杀害你，派人砍倒了那棵大树。弟子们催促你赶快离开，你说：'天生德于予，桓魋其如予何！'随后你换装离开宋国，继续前行。",
        unlockLocationIds: ["song_state"],
        unlockCharacterIds: ["char_huan_tui"],
        unlockEventIds: ["event_huan_tui_threat"]
    },
    {
        id: 7,
        order: 7,
        title: "至郑 · 丧家之犬",
        locationId: "zheng_state",
        prompt: "你离开宋国后到达郑国，途中与弟子们一度失散，独自一人站在郑国都城的东门。有一个郑国人形容你'累累若丧家之狗'。你听后不但不恼，反而笑着说：'然哉！然哉！'——确实如此啊！",
        unlockLocationIds: ["zheng_state"],
        unlockCharacterIds: [],
        unlockEventIds: ["event_zheng_separated"]
    },
    {
        id: 8,
        order: 8,
        title: "居陈 · 讲学不辍",
        locationId: "chen_state",
        prompt: "你来到了陈国，在这里居住了约三年，是周游期间停留最久的国家之一。你继续教授弟子，与陈国君臣交往。在陈国的日子相对平静，你得以继续讲学和思考。",
        unlockLocationIds: ["chen_state"],
        unlockCharacterIds: [],
        unlockEventIds: []
    },
    {
        id: 9,
        order: 9,
        title: "至叶 · 叶公问政",
        locationId: "cai_ye",
        prompt: "你来到了楚国的边邑叶地。叶公沈诸梁向你请教为政之道，你回答：'近者说，远者来。'叶公又问关于'直'（正直）的问题，你回答：'父为子隐，子为父隐，直在其中矣。'这段对话成为儒家伦理思想的经典表述。",
        unlockLocationIds: ["cai_ye"],
        unlockCharacterIds: ["char_ye_gong"],
        unlockEventIds: ["event_ye_gong_asks"]
    },
    {
        id: 10,
        order: 10,
        title: "陈蔡绝粮 · 七日不食",
        locationId: "chen_cai_border",
        prompt: "你从陈国前往蔡国，却正值吴国伐陈、楚国救陈，你和弟子们被困在陈蔡之间的荒野。粮食断绝达七日之久，弟子们都饿得站不起来。你仍然弦歌不辍。子路不满地质问你，子贡怀疑你的学说，唯有颜回最为坚定。这是你周游列国中最艰难的时刻之一。",
        unlockLocationIds: ["chen_cai_border"],
        unlockCharacterIds: [],
        unlockEventIds: ["event_chen_cai_famine"]
    },
    {
        id: 11,
        order: 11,
        title: "楚昭王欲迎 · 子西劝阻",
        locationId: "chu_state",
        prompt: "楚昭王听说你在陈蔡之间，派人迎请你，打算封给你七百里书社之地。这是你周游以来获得的最优厚邀请。然而楚国令尹子西以你的才能和弟子们的贤能会威胁楚国大臣地位为由，劝阻了楚昭王。你最终未能入楚。不久之后，楚昭王去世了。",
        unlockLocationIds: ["chu_state"],
        unlockCharacterIds: ["char_chu_zhao_wang", "char_zi_xi"],
        unlockEventIds: ["event_chu_zhao_wang_invites"]
    },
    {
        id: 12,
        order: 12,
        title: "归鲁 · 整理六经",
        locationId: "return_lu",
        prompt: "鲁哀公十一年（前484），在周游列国十四年之后，你终于回到了鲁国。你被尊为'国老'，不再求仕，将精力投入到整理六经（诗、书、礼、乐、易、春秋）和教授弟子的工作中。这些工作对中国文化的传承产生了深远影响。五年后，你离开了人世，享年七十三岁。",
        unlockLocationIds: ["return_lu"],
        unlockCharacterIds: [],
        unlockEventIds: ["event_return_lu"]
    }
];
