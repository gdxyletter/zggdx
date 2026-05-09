/**
 * 孔子周游列国事件数据
 *
 * 每个事件关联一个地点和多个人物。
 * 事件在游历到对应路线步骤时解锁。
 */

/**
 * @typedef {Object} Event
 * @property {string} id                唯一标识
 * @property {string} name              事件名称
 * @property {string} locationId        关联地点 ID
 * @property {string} summary           事件简述（卡片预览用）
 * @property {string} detail            事件详情
 * @property {string[]} characterIds    涉及人物 ID 数组
 * @property {string} [source]          史料出处
 * @property {number} unlockStep        解锁步骤
 */

/** @type {Event[]} */
window.historyMapEvents = [
    {
        id: "event_depart_lu",
        name: "离鲁周游",
        locationId: "lu_state",
        summary: "孔子离开鲁国，开始十四年周游列国之旅",
        detail: "鲁定公十三年（前497），孔子五十五岁。当时鲁国政局混乱，季桓子接受齐国送来的女乐，三日不听政，孔子感到政治理想无法实现，遂离开鲁国，开始了长达十四年的周游列国之旅。同行的弟子主要有子路、子贡、颜回等人。孔子离开时感叹：'彼妇之口，可以出走；彼妇之谒，可以死败。盖优哉游哉，维以卒岁！'",
        characterIds: ["char_kongzi", "char_zi_lu", "char_zi_gong", "char_yan_hui"],
        source: "《史记·孔子世家》《论语·微子》",
        unlockStep: 1
    },
    {
        id: "event_arrive_wei",
        name: "孔子适卫",
        locationId: "wei_state",
        summary: "孔子到达卫国，卫灵公以礼相待",
        detail: "孔子离开鲁国后首先到达卫国。卫灵公对孔子以礼相待，按照孔子在鲁国时的俸禄标准（粟六万）供养他。孔子在卫国期间住在蘧伯玉家中。卫灵公曾向孔子请教军事，孔子回答：'俎豆之事则尝闻之矣，军旅之事未之学也。'次日便离开。此后孔子多次往返卫国。孔子还曾见卫灵公夫人南子，引起子路不满，孔子发誓自证清白。",
        characterIds: ["char_kongzi", "char_wei_ling_gong", "char_nan_zi", "char_qu_bo_yu"],
        source: "《史记·孔子世家》《论语·雍也》",
        unlockStep: 2
    },
    {
        id: "event_kuang_siege",
        name: "匡人围孔子",
        locationId: "kuang",
        summary: "匡人误认孔子为阳货，围困五日",
        detail: "孔子离开卫国后，经过匡地（在今河南省长垣县一带）。匡人曾经被阳货（鲁国权臣）欺凌过，而孔子的相貌与阳货相似，匡人误以为孔子就是阳货，于是将孔子一行人围困了五天。在围困期间，孔子泰然自若，继续弦歌不辍。他对弟子们说：'文王既没，文不在兹乎？天之将丧斯文也，后死者不得与于斯文也；天之未丧斯文也，匡人其如予何！'后来匡人发现认错了人，孔子一行才得以脱身。脱身后孔子发现颜回最后才赶到，以为他死了，颜回说：'子在，回何敢死？'",
        characterIds: ["char_kongzi", "char_yan_hui"],
        source: "《史记·孔子世家》《论语·子罕》《论语·先进》",
        unlockStep: 3
    },
    {
        id: "event_pu_blocked",
        name: "蒲地受阻",
        locationId: "pu",
        summary: "蒲人阻止孔子通行，被迫盟誓",
        detail: "孔子经过蒲地（属卫国）时，正值公叔氏在蒲地叛乱。蒲人担心孔子帮助他们平叛，于是阻止孔子通行。经过交涉，蒲人要求孔子盟誓不再去卫国，才肯放行。孔子被迫盟誓后，蒲人放行了孔子一行。然而孔子出了蒲地东门后，仍然前往卫国。子贡对此有疑问：'盟可负邪？'孔子回答：'要盟也，神不听。'（被迫订立的盟约，神明是不会听的。）",
        characterIds: ["char_kongzi", "char_zi_gong"],
        source: "《史记·孔子世家》",
        unlockStep: 4
    },
    {
        id: "event_pass_cao",
        name: "途经曹国",
        locationId: "cao_state",
        summary: "孔子途经曹国，小国夹缝中求存",
        detail: "孔子周游列国时途经曹国。曹国是周朝小诸侯国，位于今山东省定陶县一带，国力微弱，夹在晋、楚等大国之间，后来被宋国所灭。关于孔子在曹国的具体事迹，史料记载较少。但途经曹国反映了当时列国的地理格局和孔子周游的路线走向。",
        characterIds: ["char_kongzi"],
        source: "《史记·孔子世家》",
        unlockStep: 5
    },
    {
        id: "event_huan_tui_threat",
        name: "桓魋欲害孔子",
        locationId: "song_state",
        summary: "宋国司马桓魋砍树威胁，孔子微服过宋",
        detail: "孔子途经宋国时，与弟子们在一棵大树下演习礼仪。宋国司马桓魋（向魋）想要杀害孔子，派人砍倒了那棵大树。弟子们催促孔子赶快离开，孔子说：'天生德于予，桓魋其如予何！'（上天赋予我德行，桓魋能把我怎么样！）随后孔子微服（换装）离开宋国，继续前行。此事体现了孔子在危难时刻的从容和对天命的信心。",
        characterIds: ["char_kongzi", "char_huan_tui"],
        source: "《史记·孔子世家》《论语·述而》",
        unlockStep: 6
    },
    {
        id: "event_zheng_separated",
        name: "郑国失散",
        locationId: "zheng_state",
        summary: "孔子与弟子失散于郑，被形容为'丧家之犬'",
        detail: "孔子离开宋国后到达郑国。途中与弟子们一度失散，独自一人站在郑国都城东门。有一个郑国人看到孔子后形容他：'其长九尺有六寸，人皆谓之\u201C长人\u201D而异之。累累若丧家之狗。'有人把这个形容告诉了孔子，孔子听后不但没有生气，反而笑着说：'形状，末也。而谓似丧家之狗，然哉！然哉！'（外貌不重要。但说我像丧家之犬，确实如此啊！）",
        characterIds: ["char_kongzi", "char_zi_lu", "char_yan_hui"],
        source: "《史记·孔子世家》",
        unlockStep: 7
    },
    {
        id: "event_ye_gong_asks",
        name: "叶公问政",
        locationId: "cai_ye",
        summary: "叶公向孔子请教为政之道和'直'的含义",
        detail: "在叶地，楚国大夫叶公（沈诸梁）向孔子请教为政之道。孔子回答：'近者说，远者来。'（使近处的人高兴，远处的人自然会来归附。）叶公又对孔子说：'吾党有直躬者，其父攘羊，而子证之。'（我们乡里有一个正直的人，他父亲偷了羊，他去告发。）孔子回答：'吾党之直者异于是。父为子隐，子为父隐，直在其中矣。'（我们乡里正直的人与此不同：父亲替儿子隐瞒，儿子替父亲隐瞒，正直就在其中了。）这段对话体现了儒家对伦理亲情的重视。",
        characterIds: ["char_kongzi", "char_ye_gong"],
        source: "《论语·子路》《史记·孔子世家》",
        unlockStep: 9
    },
    {
        id: "event_chen_cai_famine",
        name: "陈蔡绝粮",
        locationId: "chen_cai_border",
        summary: "孔子被困陈蔡之间，七日不火食，弟子饿得站不起来",
        detail: "孔子从陈国前往蔡国时，正值吴国伐陈，楚国救陈，孔子一行被困在陈蔡之间的荒野地带。粮食断绝达七日之久，随行的弟子们都饿得站不起来。在如此困境中，孔子仍然弦歌不辍，讲学不止。子路对此不满，问孔子：'君子亦有穷乎？'孔子回答：'君子固穷，小人穷斯滥矣。'（君子在困顿时也能坚守，小人在困顿时就会胡作非为。）子贡也质疑孔子的学说是否不够完善。唯有颜回最为坚定，他说：'夫子之道至大，故天下莫能容。虽然，夫子推而行之，不容何病？'（老师的学说太伟大了，所以天下不能容纳。但是老师坚持推行，不被容纳又有什么关系？）孔子听后十分欣慰。",
        characterIds: ["char_kongzi", "char_zi_lu", "char_zi_gong", "char_yan_hui"],
        source: "《史记·孔子世家》《论语·卫灵公》",
        unlockStep: 10
    },
    {
        id: "event_chu_zhao_wang_invites",
        name: "楚昭王欲迎孔子",
        locationId: "chu_state",
        summary: "楚昭王欲封孔子七百里书社，被子西劝阻",
        detail: "楚昭王听说孔子在陈蔡之间，派人去迎请孔子，打算封给孔子七百里书社之地。这是孔子周游列国期间获得的最为优厚的邀请。然而楚国令尹子西出面劝阻。他对楚昭王说：'大王派往诸侯国的使者有像子贡那样出色的吗？没有。大王的辅相有像颜回那样出色的吗？没有。大王的将帅有像子路那样出色的吗？没有。大王的官尹有像宰予那样出色的吗？没有。'然后指出，如果孔子再获得土地和这些贤才辅佐，将不利于楚国大臣的地位。子西又说：'况且孔子当年在鲁国做司寇时，大王您不是也没有重用他吗？'楚昭王最终放弃了这个打算。不久之后，楚昭王在城父去世。",
        characterIds: ["char_kongzi", "char_chu_zhao_wang", "char_zi_xi", "char_zi_gong", "char_yan_hui", "char_zi_lu"],
        source: "《史记·孔子世家》",
        unlockStep: 11
    },
    {
        id: "event_return_lu",
        name: "归鲁",
        locationId: "return_lu",
        summary: "孔子周游十四年，终返鲁国，整理六经",
        detail: "孔子从鲁定公十三年（前497）离开鲁国开始周游列国，至鲁哀公十一年（前484）返回鲁国，历时十四年。归鲁的原因是，孔子在卫国时，鲁国季康子派人迎请孔子。归鲁后，孔子被尊为'国老'（国家元老），享受优厚待遇，但不再求仕。孔子将精力投入到整理六经（诗、书、礼、乐、易、春秋）和教授弟子的工作中。这些工作对中国文化的传承产生了深远影响。孔子于鲁哀公十六年（前479）去世，享年七十三岁。",
        characterIds: ["char_kongzi", "char_zi_gong", "char_yan_hui"],
        source: "《史记·孔子世家》",
        unlockStep: 12
    }
];
