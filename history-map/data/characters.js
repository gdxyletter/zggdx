/**
 * 孔子周游列国人物图鉴数据
 *
 * 本数据包含孔子及其弟子、相关诸侯、大夫等人物。
 * 人物在游历过程中被解锁，解锁后可查看详情。
 */

/**
 * @typedef {Object} Character
 * @property {string} id                  唯一标识
 * @property {string} name                人物姓名
 * @property {string} [alias]             别名 / 字号
 * @property {string} [title]             身份头衔（如"鲁国大夫"）
 * @property {string} identity            身份类型：master / disciple / ruler / minister / other
 * @property {string} description         人物简介
 * @property {string[]} relatedLocationIds  关联地点 ID 数组
 * @property {string[]} relatedEventIds     关联事件 ID 数组
 * @property {number} unlockStep          解锁步骤
 */

/** @type {Character[]} */
window.historyMapCharacters = [
    {
        id: "char_kongzi",
        name: "孔子",
        alias: "名丘，字仲尼",
        title: '鲁国人，后世尊为\u201C至圣先师\u201D',
        identity: "master",
        description: "孔子（前551—前479），名丘，字仲尼，鲁国陬邑（今山东省曲阜市）人。中国古代伟大的思想家、教育家，儒家学派创始人。孔子早年贫贱，后任鲁国中都宰、司寇等职。因政治理想无法在鲁国实现，于五十五岁时离开鲁国，开始长达十四年的周游列国之旅。归鲁后专心整理六经，教授弟子，相传有弟子三千人，其中通六艺者七十二人。孔子去世后，其言论被弟子整理为《论语》一书。",
        relatedLocationIds: ["lu_state", "wei_state", "kuang", "pu", "cao_state", "song_state", "zheng_state", "chen_state", "cai_ye", "chen_cai_border", "chu_state", "return_lu"],
        relatedEventIds: ["event_depart_lu", "event_arrive_wei", "event_kuang_siege", "event_pu_blocked", "event_pass_cao", "event_huan_tui_threat", "event_zheng_separated", "event_ye_gong_asks", "event_chen_cai_famine", "event_chu_zhao_wang_invites", "event_return_lu"],
        unlockStep: 1
    },
    {
        id: "char_zi_lu",
        name: "子路",
        alias: "名仲由，字子路",
        title: "孔子弟子",
        identity: "disciple",
        description: "子路（前542—前480），名仲由，字子路，卞（今山东省泗水县）人。孔子重要弟子之一，以勇武直率著称。子路性格刚烈，好勇斗力，初见孔子时曾冒犯孔子，后被孔子感化，成为忠实弟子。在陈蔡绝粮时，子路对孔子的处境表示不满，孔子开导他说：'君子固穷，小人穷斯滥矣。'子路后在卫国孔悝之乱中殉难，临死前仍坚持'君子死，冠不免'，正冠结缨而死。",
        relatedLocationIds: ["lu_state", "kuang", "zheng_state", "chen_state", "chen_cai_border", "return_lu"],
        relatedEventIds: ["event_depart_lu", "event_kuang_siege", "event_zheng_separated", "event_chen_cai_famine", "event_return_lu"],
        unlockStep: 1
    },
    {
        id: "char_zi_gong",
        name: "子贡",
        alias: "名端木赐，字子贡",
        title: "孔子弟子",
        identity: "disciple",
        description: "子贡（前520—?），名端木赐，字子贡，卫国人。孔子重要弟子之一，以能言善辩、精通外交著称。子贡善于经商，富致千金，是孔子弟子中最富有者。在陈蔡绝粮时，子贡质疑孔子的学说是否不够完善才导致困境，孔子以良农、良工为喻开导他。子贡后来成为著名的外交家，曾游说各国，改变了春秋末期的政治格局。",
        relatedLocationIds: ["lu_state", "pu", "chen_state", "chen_cai_border", "chu_state", "return_lu"],
        relatedEventIds: ["event_depart_lu", "event_pu_blocked", "event_chen_cai_famine", "event_chu_zhao_wang_invites", "event_return_lu"],
        unlockStep: 1
    },
    {
        id: "char_yan_hui",
        name: "颜回",
        alias: "名回，字子渊",
        title: "孔子弟子",
        identity: "disciple",
        description: "颜回（前521—前481），名回，字子渊，鲁国人。孔子最得意的弟子，以德行著称，被孔子多次称赞。孔子曰：'贤哉回也！一箪食，一瓢饮，在陋巷，人不堪其忧，回也不改其乐。'在匡地被围困时，颜回最后才赶到，孔子以为他死了，颜回说：'子在，回何敢死？'在陈蔡绝粮时，颜回对孔子的学说最为坚定，孔子问他为何如此穷困仍不改其志，颜回回答：'夫子之道至大，故天下莫能容。虽然，夫子推而行之，不容何病？'颜回早逝，孔子悲痛万分，曰：'噫！天丧予！天丧予！'",
        relatedLocationIds: ["lu_state", "kuang", "zheng_state", "chen_cai_border", "return_lu"],
        relatedEventIds: ["event_depart_lu", "event_kuang_siege", "event_zheng_separated", "event_chen_cai_famine", "event_return_lu"],
        unlockStep: 1
    },
    {
        id: "char_wei_ling_gong",
        name: "卫灵公",
        alias: "名元",
        title: "卫国国君（前534—前493年在位）",
        identity: "ruler",
        description: "卫灵公（？—前493），姬姓，名元，卫国国君。孔子周游列国时到达卫国，卫灵公对孔子以礼相待，按孔子在鲁国的俸禄标准供养他。卫灵公曾向孔子请教军事阵法，孔子回答：'俎豆之事则尝闻之矣，军旅之事未之学也。'次日便离开了卫国。卫灵公虽尊孔子，但未能真正重用他。",
        relatedLocationIds: ["wei_state"],
        relatedEventIds: ["event_arrive_wei"],
        unlockStep: 2
    },
    {
        id: "char_nan_zi",
        name: "南子",
        alias: "",
        title: "卫灵公夫人",
        identity: "other",
        description: "南子，卫灵公夫人，宋国宗女。南子把持卫国朝政，名声不好，但要求见孔子。孔子起初不愿意见她，但南子坚持，孔子最终去见。子路对此很不高兴，孔子发誓说：'予所否者，天厌之！天厌之！'（如果我做了不正当的事，让天厌弃我吧！）此事成为孔子周游列国中的一段著名插曲。",
        relatedLocationIds: ["wei_state"],
        relatedEventIds: ["event_arrive_wei"],
        unlockStep: 2
    },
    {
        id: "char_qu_bo_yu",
        name: "蘧伯玉",
        alias: "名瑗",
        title: "卫国大夫",
        identity: "minister",
        description: "蘧伯玉，名瑗，卫国贤大夫。蘧伯玉以德行著称，孔子在卫国期间与他交往密切，对他评价很高。孔子曾称赞蘧伯玉：'君子哉蘧伯玉！邦有道则仕，邦无道则可卷而怀之。'蘧伯玉年长于孔子，孔子到卫国时曾住在他的家中。",
        relatedLocationIds: ["wei_state"],
        relatedEventIds: ["event_arrive_wei"],
        unlockStep: 2
    },
    {
        id: "char_huan_tui",
        name: "桓魋",
        alias: "又称向魋、司马魋",
        title: "宋国司马",
        identity: "minister",
        description: "桓魋（？—前481），又称向魋，宋国司马（掌管军事的大夫）。孔子途经宋国时，与弟子在大树下演习礼仪，桓魋派人砍倒大树，意图杀害孔子。孔子离开后说：'天生德于予，桓魋其如予何！'（上天赋予我德行，桓魋能把我怎么样！）桓魋后来因叛乱逃亡。",
        relatedLocationIds: ["song_state"],
        relatedEventIds: ["event_huan_tui_threat"],
        unlockStep: 6
    },
    {
        id: "char_ye_gong",
        name: "叶公",
        alias: "沈诸梁，字子高",
        title: "楚国叶地大夫",
        identity: "minister",
        description: "叶公，沈诸梁，字子高，楚国大夫，封地在叶（今河南省叶县），故称叶公。叶公曾向孔子请教为政之道，孔子回答：'近者说，远者来。'（使近处的人高兴，远处的人自然会来归附。）叶公又问孔子关于'直'（正直）的问题，提到其家乡有一个'直躬'的人，其父偷羊，儿子去告发。孔子回答：'吾党之直者异于是。父为子隐，子为父隐，直在其中矣。'",
        relatedLocationIds: ["cai_ye"],
        relatedEventIds: ["event_ye_gong_asks"],
        unlockStep: 9
    },
    {
        id: "char_chu_zhao_wang",
        name: "楚昭王",
        alias: "名轸",
        title: "楚国国君（前515—前489年在位）",
        identity: "ruler",
        description: "楚昭王（？—前489），芈姓，名轸，楚国国君。楚昭王听说孔子在陈蔡之间，派人迎请孔子，打算封给孔子七百里书社之地。这是孔子周游列国期间获得的最为优厚的邀请之一。然而楚国令尹子西劝阻，认为孔子才能过人，如果重用将威胁楚国大臣的地位。楚昭王最终放弃了这个打算。不久之后，楚昭王在城父去世。",
        relatedLocationIds: ["chu_state"],
        relatedEventIds: ["event_chu_zhao_wang_invites"],
        unlockStep: 11
    },
    {
        id: "char_zi_xi",
        name: "子西",
        alias: "名申",
        title: "楚国令尹（宰相）",
        identity: "minister",
        description: "子西，名申，楚国令尹（相当于宰相）。当楚昭王打算重用孔子时，子西出面劝阻。他对楚昭王说：'王之使使诸侯有如子贡者乎？曰无有。王之辅相有如颜回者乎？曰无有。王之将率有如子路者乎？曰无有。王之官尹有如宰予者乎？曰无有。'然后指出，如果孔子再获得土地和贤才辅佐，将对楚国大臣的地位构成威胁。子西的劝阻最终使孔子未能入楚。",
        relatedLocationIds: ["chu_state"],
        relatedEventIds: ["event_chu_zhao_wang_invites"],
        unlockStep: 11
    }
];
