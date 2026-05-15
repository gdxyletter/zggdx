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
 * @property {string} nameEn            事件名称（英文）
 * @property {string} locationId        关联地点 ID
 * @property {string} summary           事件简述（卡片预览用）
 * @property {string} summaryEn         事件简述（英文）
 * @property {string} detail            事件详情
 * @property {string} detailEn          事件详情（英文）
 * @property {string[]} characterIds    涉及人物 ID 数组
 * @property {string} [source]          史料出处
 * @property {string} [sourceEn]        史料出处（英文）
 * @property {number} unlockStep        解锁步骤
 */

/** @type {Event[]} */
window.historyMapEvents = [
    {
        id: "event_depart_lu",
        name: "离鲁周游",
        nameEn: "Departing Lu",
        locationId: "lu_state",
        summary: "孔子离开鲁国，开始十四年周游列国之旅",
        summaryEn: "Confucius leaves Lu, beginning his fourteen-year journey through the states",
        detail: "鲁定公十三年（前497），孔子五十五岁。当时鲁国政局混乱，季桓子接受齐国送来的女乐，三日不听政，孔子感到政治理想无法实现，遂离开鲁国，开始了长达十四年的周游列国之旅。同行的弟子主要有子路、子贡、颜回等人。孔子离开时感叹：'彼妇之口，可以出走；彼妇之谒，可以死败。盖优哉游哉，维以卒岁！'",
        detailEn: "In the 13th year of Duke Ding of Lu (497 BCE), Confucius was 55 years old. The political situation in Lu was chaotic — Ji Huanzi had accepted female musicians sent by Qi and stopped attending court for three days. Feeling his political ideals could not be realized in Lu, Confucius left, beginning a fourteen-year journey through the states. Accompanying disciples included Zilu, Zigong, and Yan Hui. As he departed, Confucius lamented: 'Through the words of those women, one can leave; through their petitions, one can be ruined. How leisurely, how carefree — thus to pass the years!'",
        characterIds: ["char_kongzi", "char_zi_lu", "char_zi_gong", "char_yan_hui"],
        source: "《史记·孔子世家》《论语·微子》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius; Analects: Weizi",
        unlockStep: 1
    },
    {
        id: "event_arrive_wei",
        name: "孔子适卫",
        nameEn: "Arriving in Wei",
        locationId: "wei_state",
        summary: "孔子到达卫国，卫灵公以礼相待",
        summaryEn: "Confucius arrives in Wei; Duke Ling of Wei treats him with courtesy",
        detail: "孔子离开鲁国后首先到达卫国。卫灵公对孔子以礼相待，按照孔子在鲁国时的俸禄标准（粟六万）供养他。孔子在卫国期间住在蘧伯玉家中。卫灵公曾向孔子请教军事，孔子回答：'俎豆之事则尝闻之矣，军旅之事未之学也。'次日便离开。此后孔子多次往返卫国。孔子还曾见卫灵公夫人南子，引起子路不满，孔子发誓自证清白。",
        detailEn: "After leaving Lu, Confucius first arrived in Wei. Duke Ling of Wei treated him with courtesy, providing him the same stipend he had received in Lu (60,000 measures of grain). During his stay, Confucius lodged at the home of Qu Boyu. Duke Ling once asked Confucius about military affairs; Confucius replied: 'I have heard of matters pertaining to ritual vessels, but I have not studied military matters.' The next day he left. Confucius would return to Wei many times thereafter. He also met Nanzi, Duke Ling's consort, which angered Zilu and forced Confucius to swear an oath to clear his name.",
        characterIds: ["char_kongzi", "char_wei_ling_gong", "char_nan_zi", "char_qu_bo_yu"],
        source: "《史记·孔子世家》《论语·雍也》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius; Analects: Yongye",
        unlockStep: 2
    },
    {
        id: "event_kuang_siege",
        name: "匡人围孔子",
        nameEn: "Siege at Kuang",
        locationId: "kuang",
        summary: "匡人误认孔子为阳货，围困五日",
        summaryEn: "The people of Kuang mistake Confucius for Yang Hu and besiege him for five days",
        detail: "孔子离开卫国后，经过匡地（在今河南省长垣县一带）。匡人曾经被阳货（鲁国权臣）欺凌过，而孔子的相貌与阳货相似，匡人误以为孔子就是阳货，于是将孔子一行人围困了五天。在围困期间，孔子泰然自若，继续弦歌不辍。他对弟子们说：'文王既没，文不在兹乎？天之将丧斯文也，后死者不得与于斯文也；天之未丧斯文也，匡人其如予何！'后来匡人发现认错了人，孔子一行才得以脱身。脱身后孔子发现颜回最后才赶到，以为他死了，颜回说：'子在，回何敢死？'",
        detailEn: "After leaving Wei, Confucius passed through Kuang (in present-day Changyuan County, Henan). The people of Kuang had been bullied by Yang Hu, a powerful Lu official, and Confucius resembled Yang Hu in appearance. Mistaking him for Yang Hu, the Kuang people surrounded Confucius and his party for five days. Throughout the siege, Confucius remained calm, continuing to play his zither and sing. He told his disciples: 'After King Wen died, was culture not lodged here? If Heaven had intended to destroy this culture, we who came after would not have been able to share in it. Since Heaven has not yet destroyed this culture, what can the people of Kuang do to me?' The Kuang people eventually realized their mistake and released them. After escaping, Confucius saw Yan Hui arriving last and thought he had died. Yan Hui said: 'While you live, Master, how would I dare to die?'",
        characterIds: ["char_kongzi", "char_yan_hui"],
        source: "《史记·孔子世家》《论语·子罕》《论语·先进》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius; Analects: Zihan; Analects: Xianjin",
        unlockStep: 3
    },
    {
        id: "event_pu_blocked",
        name: "蒲地受阻",
        nameEn: "Blocked at Pu",
        locationId: "pu",
        summary: "蒲人阻止孔子通行，被迫盟誓",
        summaryEn: "The people of Pu block Confucius and force him to swear an oath",
        detail: "孔子经过蒲地（属卫国）时，正值公叔氏在蒲地叛乱。蒲人担心孔子帮助他们平叛，于是阻止孔子通行。经过交涉，蒲人要求孔子盟誓不再去卫国，才肯放行。孔子被迫盟誓后，蒲人放行了孔子一行。然而孔子出了蒲地东门后，仍然前往卫国。子贡对此有疑问：'盟可负邪？'孔子回答：'要盟也，神不听。'（被迫订立的盟约，神明是不会听的。）",
        detailEn: "When Confucius passed through Pu (a district of Wei), Gongshu was in rebellion there. Fearing Confucius might help suppress the rebellion, the people of Pu blocked his passage. After negotiations, they demanded Confucius swear an oath not to return to Wei before they would let him pass. Confucius complied under duress, and the Pu people released him. However, after leaving through the eastern gate of Pu, Confucius still proceeded to Wei. Zigong questioned this: 'Can one break an oath?' Confucius replied: 'A coerced oath — the spirits do not heed it.'",
        characterIds: ["char_kongzi", "char_zi_gong"],
        source: "《史记·孔子世家》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius",
        unlockStep: 4
    },
    {
        id: "event_pass_cao",
        name: "途经曹国",
        nameEn: "Passing Through Cao",
        locationId: "cao_state",
        summary: "孔子途经曹国，小国夹缝中求存",
        summaryEn: "Confucius passes through Cao, a small state caught between great powers",
        detail: "孔子周游列国时途经曹国。曹国是周朝小诸侯国，位于今山东省定陶县一带，国力微弱，夹在晋、楚等大国之间，后来被宋国所灭。关于孔子在曹国的具体事迹，史料记载较少。但途经曹国反映了当时列国的地理格局和孔子周游的路线走向。",
        detailEn: "During his journey through the states, Confucius passed through Cao. Cao was a small vassal state of Zhou, located in present-day Dingtao County, Shandong. It was militarily weak, caught between great powers like Jin and Chu, and was later destroyed by Song. Historical records contain few details about Confucius' activities in Cao. Nevertheless, passing through Cao reflects the geographical landscape of the states and the route of Confucius' journey.",
        characterIds: ["char_kongzi"],
        source: "《史记·孔子世家》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius",
        unlockStep: 5
    },
    {
        id: "event_huan_tui_threat",
        name: "桓魋欲害孔子",
        nameEn: "Huan Tui's Threat",
        locationId: "song_state",
        summary: "宋国司马桓魋砍树威胁，孔子微服过宋",
        summaryEn: "Sima Huan Tui of Song cuts down a tree to threaten Confucius, who then leaves Song in disguise",
        detail: "孔子途经宋国时，与弟子们在一棵大树下演习礼仪。宋国司马桓魋（向魋）想要杀害孔子，派人砍倒了那棵大树。弟子们催促孔子赶快离开，孔子说：'天生德于予，桓魋其如予何！'（上天赋予我德行，桓魋能把我怎么样！）随后孔子微服（换装）离开宋国，继续前行。此事体现了孔子在危难时刻的从容和对天命的信心。",
        detailEn: "When Confucius passed through Song, he and his disciples were practicing rituals under a large tree. Huan Tui, the Minister of War of Song, wanted to kill Confucius and sent men to cut down the tree. The disciples urged Confucius to flee quickly, but he said: 'Heaven has endowed me with virtue; what can Huan Tui do to me?' Confucius then changed his clothes and left Song in disguise, continuing onward. This event reflects Confucius' composure in the face of danger and his confidence in the Mandate of Heaven.",
        characterIds: ["char_kongzi", "char_huan_tui"],
        source: "《史记·孔子世家》《论语·述而》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius; Analects: Shu'er",
        unlockStep: 6
    },
    {
        id: "event_zheng_separated",
        name: "郑国失散",
        nameEn: "Separated at Zheng",
        locationId: "zheng_state",
        summary: "孔子与弟子失散于郑，被形容为'丧家之犬'",
        summaryEn: "Confucius is separated from his disciples in Zheng and described as a 'lost dog'",
        detail: "孔子离开宋国后到达郑国。途中与弟子们一度失散，独自一人站在郑国都城东门。有一个郑国人看到孔子后形容他：'其长九尺有六寸，人皆谓之\u201C长人\u201D而异之。累累若丧家之狗。'有人把这个形容告诉了孔子，孔子听后不但没有生气，反而笑着说：'形状，末也。而谓似丧家之狗，然哉！然哉！'（外貌不重要。但说我像丧家之犬，确实如此啊！）",
        detailEn: "After leaving Song, Confucius arrived in Zheng. He became separated from his disciples and stood alone at the eastern gate of Zheng's capital. A man from Zheng described him: 'He is nine feet six inches tall — everyone calls him the Tall Man and marvels at him. He looks weary, like a lost dog.' When this description was relayed to Confucius, instead of being angry, he laughed and said: 'Appearances are trivial. But being called a lost dog — that's it! That's it!'",
        characterIds: ["char_kongzi", "char_zi_lu", "char_yan_hui"],
        source: "《史记·孔子世家》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius",
        unlockStep: 7
    },
    {
        id: "event_ye_gong_asks",
        name: "叶公问政",
        nameEn: "The Lord of Ye Inquires",
        locationId: "cai_ye",
        summary: "叶公向孔子请教为政之道和'直'的含义",
        summaryEn: "The Lord of Ye asks Confucius about governance and the meaning of 'uprightness'",
        detail: "在叶地，楚国大夫叶公（沈诸梁）向孔子请教为政之道。孔子回答：'近者说，远者来。'（使近处的人高兴，远处的人自然会来归附。）叶公又对孔子说：'吾党有直躬者，其父攘羊，而子证之。'（我们乡里有一个正直的人，他父亲偷了羊，他去告发。）孔子回答：'吾党之直者异于是。父为子隐，子为父隐，直在其中矣。'（我们乡里正直的人与此不同：父亲替儿子隐瞒，儿子替父亲隐瞒，正直就在其中了。）这段对话体现了儒家对伦理亲情的重视。",
        detailEn: "At Ye, the Chu grandee Lord Ye (Shen Zhuliang) asked Confucius about governance. Confucius replied: 'Make those near you happy, and those far away will come.' Lord Ye then said: 'In our village there is an upright man — his father stole a sheep, and the son testified against him.' Confucius replied: 'The upright in my village are different. The father conceals for the son, and the son conceals for the father — uprightness lies within this.' This dialogue reflects the Confucian emphasis on ethical family bonds.",
        characterIds: ["char_kongzi", "char_ye_gong"],
        source: "《论语·子路》《史记·孔子世家》",
        sourceEn: "Analects: Zilu; Records of the Grand Historian: Hereditary House of Confucius",
        unlockStep: 9
    },
    {
        id: "event_chen_cai_famine",
        name: "陈蔡绝粮",
        nameEn: "Famine at Chen-Cai Border",
        locationId: "chen_cai_border",
        summary: "孔子被困陈蔡之间，七日不火食，弟子饿得站不起来",
        summaryEn: "Confucius is stranded between Chen and Cai; for seven days no fire is lit and his disciples cannot stand from hunger",
        detail: "孔子从陈国前往蔡国时，正值吴国伐陈，楚国救陈，孔子一行被困在陈蔡之间的荒野地带。粮食断绝达七日之久，随行的弟子们都饿得站不起来。在如此困境中，孔子仍然弦歌不辍，讲学不止。子路对此不满，问孔子：'君子亦有穷乎？'孔子回答：'君子固穷，小人穷斯滥矣。'（君子在困顿时也能坚守，小人在困顿时就会胡作非为。）子贡也质疑孔子的学说是否不够完善。唯有颜回最为坚定，他说：'夫子之道至大，故天下莫能容。虽然，夫子推而行之，不容何病？'（老师的学说太伟大了，所以天下不能容纳。但是老师坚持推行，不被容纳又有什么关系？）孔子听后十分欣慰。",
        detailEn: "When Confucius was traveling from Chen to Cai, Wu was attacking Chen and Chu was rescuing Chen. Confucius and his party were stranded in the wilderness between Chen and Cai. Their food ran out for seven full days, and the accompanying disciples were too weak to stand. In such dire straits, Confucius never stopped playing his zither, singing, and teaching. Zilu, displeased, asked: 'Does the gentleman experience hardship too?' Confucius replied: 'The gentleman is steadfast in hardship; the petty man, when in hardship, runs wild.' Zigong also questioned whether Confucius' teachings were too lofty. Only Yan Hui remained steadfast, saying: 'Your Way, Master, is so great that the world cannot contain it. Yet you promote and practice it — what harm is there in not being accepted?' Confucius was greatly comforted by these words.",
        characterIds: ["char_kongzi", "char_zi_lu", "char_zi_gong", "char_yan_hui"],
        source: "《史记·孔子世家》《论语·卫灵公》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius; Analects: Duke Ling of Wei",
        unlockStep: 10
    },
    {
        id: "event_chu_zhao_wang_invites",
        name: "楚昭王欲迎孔子",
        nameEn: "King Zhao's Invitation",
        locationId: "chu_state",
        summary: "楚昭王欲封孔子七百里书社，被子西劝阻",
        summaryEn: "King Zhao of Chu wishes to grant Confucius 700 li of land, but Zixi dissuades him",
        detail: "楚昭王听说孔子在陈蔡之间，派人去迎请孔子，打算封给孔子七百里书社之地。这是孔子周游列国期间获得的最为优厚的邀请。然而楚国令尹子西出面劝阻。他对楚昭王说：'大王派往诸侯国的使者有像子贡那样出色的吗？没有。大王的辅相有像颜回那样出色的吗？没有。大王的将帅有像子路那样出色的吗？没有。大王的官尹有像宰予那样出色的吗？没有。'然后指出，如果孔子再获得土地和这些贤才辅佐，将不利于楚国大臣的地位。子西又说：'况且孔子当年在鲁国做司寇时，大王您不是也没有重用他吗？'楚昭王最终放弃了这个打算。不久之后，楚昭王在城父去世。",
        detailEn: "King Zhao of Chu heard that Confucius was stranded between Chen and Cai and sent messengers to invite him, intending to grant Confucius a 700-li fief. This was the most generous offer Confucius received during his wanderings. However, the Chu prime minister Zixi dissuaded the king. He asked King Zhao: 'Does Your Majesty have an envoy as capable as Zigong? Does Your Majesty have a minister as virtuous as Yan Hui? Does Your Majesty have a general as able as Zilu? Does Your Majesty have an official as talented as Zai Yu?' He then argued that if Confucius were granted land and assisted by these disciples, it would threaten Chu's high officials. Zixi added: 'Besides, when Confucius served as Minister of Crime in Lu, did Your Majesty also fail to employ him?' King Zhao ultimately abandoned the plan. Not long after, King Zhao died at Chengfu.",
        characterIds: ["char_kongzi", "char_chu_zhao_wang", "char_zi_xi", "char_zi_gong", "char_yan_hui", "char_zi_lu"],
        source: "《史记·孔子世家》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius",
        unlockStep: 11
    },
    {
        id: "event_return_lu",
        name: "归鲁",
        nameEn: "Return to Lu",
        locationId: "return_lu",
        summary: "孔子周游十四年，终返鲁国，整理六经",
        summaryEn: "After fourteen years of wandering, Confucius finally returns to Lu and edits the Six Classics",
        detail: "孔子从鲁定公十三年（前497）离开鲁国开始周游列国，至鲁哀公十一年（前484）返回鲁国，历时十四年。归鲁的原因是，孔子在卫国时，鲁国季康子派人迎请孔子。归鲁后，孔子被尊为'国老'（国家元老），享受优厚待遇，但不再求仕。孔子将精力投入到整理六经（诗、书、礼、乐、易、春秋）和教授弟子的工作中。这些工作对中国文化的传承产生了深远影响。孔子于鲁哀公十六年（前479）去世，享年七十三岁。",
        detailEn: "Confucius left Lu in the 13th year of Duke Ding (497 BCE) and returned in the 11th year of Duke Ai (484 BCE), having wandered for fourteen years. He returned because Ji Kangzi of Lu sent messengers to invite him while he was in Wei. After returning, Confucius was honored as 'Elder of the State' and treated generously, but he no longer sought office. He devoted himself to editing the Six Classics (Poetry, Documents, Ritual, Music, Changes, Spring and Autumn) and teaching disciples. These works had a profound influence on the transmission of Chinese culture. Confucius died in the 16th year of Duke Ai (479 BCE) at the age of 73.",
        characterIds: ["char_kongzi", "char_zi_gong", "char_yan_hui"],
        source: "《史记·孔子世家》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius",
        unlockStep: 12
    },
    {
        id: "event_mibing_alliance",
        name: "弭兵之盟",
        nameEn: "Mibing Alliance",
        locationId: "song_state",
        summary: "向戌弭兵，晋楚息战，开启春秋后期新格局",
        summaryEn: "Xiang Xu brokers peace between Jin and Chu, ushering a new phase in the Spring and Autumn period",
        detail: "鲁襄公二十七年（前546），孔子出生前五年，在宋国大夫向戌的主持下，晋、楚两国及十四个诸侯国于宋都举行了向戌弭兵之盟，约定停止战争，除齐、秦外各国须向晋、楚同时朝贡。弭兵会盟极大地改变了中原诸侯国的处境：它们不再需要频繁在晋楚之间选边站队，生存压力有所缓解。然而，晋楚两极争霸的结束并不意味着天下走向和平——恰恰相反，晋国内部卿大夫权力膨胀，吴、越崛起挤压南方，新的不稳定因素开始浮现。这是孔子周游列国最重要的宏观历史背景。",
        detailEn: "In the 27th year of Duke Xiang of Lu (546 BCE), five years before Confucius was born, the Song grandee Xiang Xu hosted a peace conference in the Song capital between Jin, Chu, and fourteen other states. They agreed to cease hostilities, with all states except Qi and Qin paying tribute to both Jin and Chu. The Mibing Alliance greatly altered the situation of the Central States — they no longer had to frequently choose sides between Jin and Chu, easing their survival pressures. However, the end of Jin-Chu bipolar rivalry did not bring peace to the realm. On the contrary, power swelled among Jin's ministerial families at home, while Wu and Yue rose in the south, creating new instabilities. This was the most important macro-historical backdrop to Confucius' journey through the states.",
        characterIds: ["char_xiang_xu"],
        source: "《左传·襄公二十七年》《史记·十二诸侯年表》",
        sourceEn: "Zuo Zhuan: 27th Year of Duke Xiang; Records of the Grand Historian: Annals of the Twelve Feudal Lords",
        unlockStep: 1
    },
    {
        id: "event_wei_succession",
        name: "卫父子争国",
        nameEn: "Wei Succession Crisis",
        locationId: "wei_state",
        summary: "卫灵公卒，蒯聩与辄父子争位，晋赵鞅介入",
        summaryEn: "Duke Ling of Wei dies; Kuai Kui and Zhe vie for the throne with Zhao Yang of Jin intervening",
        detail: "卫灵公太子蒯聩因谋杀南子未遂，出奔于晋。卫灵公未及重新册立太子便薨逝，遂由蒯聩之子辄继位，是为卫出公。晋国赵鞅旋即护送流亡的蒯聩返卫夺位，驻于戚邑，形成父子争国的僵局。孔子此时正在卫国，子路问：'卫君待子而为政，子将奚先？'孔子答曰：'必也正名乎！'认为卫国君位不正是一切问题的根源。这场父子争位最终导致子路在蒯聩之乱中殉难。",
        detailEn: "Crown Prince Kuai Kui of Wei fled to Jin after failing to assassinate Nanzi. Duke Ling of Wei died without naming a new heir, so Kuai Kui's son Zhe ascended the throne as Duke Chu of Wei. Zhao Yang of Jin immediately escorted the exiled Kuai Kui back to claim the throne, stationing at Qi, creating a stalemate between father and son. Confucius was in Wei at the time. Zilu asked: 'If the Duke of Wei were to entrust governance to you, Master, what would you do first?' Confucius replied: 'I would surely rectify names!' He believed that the irregularity in Wei's succession was the root of all problems. This succession dispute eventually led to Zilu's death in Kuai Kui's rebellion.",
        characterIds: ["char_wei_ling_gong", "char_wei_chu_gong", "char_kuai_kui", "char_zhao_yang", "char_kongzi", "char_zi_lu"],
        source: "《左传·定公十四年》《左传·哀公二年》《论语·子路》",
        sourceEn: "Zuo Zhuan: 14th Year of Duke Ding; Zuo Zhuan: 2nd Year of Duke Ai; Analects: Zilu",
        unlockStep: 8
    },
    {
        id: "event_ask_laozi",
        name: "适周问礼",
        nameEn: "Consulting Laozi",
        locationId: "chengzhou",
        summary: "孔子与南宫敬叔适周，问礼于老子",
        summaryEn: "Confucius and Nangong Jingshu travel to Zhou to inquire about rites from Laozi",
        detail: "鲁昭公二十四年（前518年），孔子年三十四岁。南宫敬叔言于鲁君，请与孔子适周。鲁君与之一乘车、两马、一竖子俱，适周问礼，见老子。老子送孔子曰：'吾闻富贵者送人以财，仁人者送人以言。吾不能富贵，窃仁人之号，送子以言：聪明深察而近于死者，好议人者也。博辩广大危其身者，发人之恶者也。为人子者毋以有己，为人臣者毋以有己。'孔子自周返鲁后，弟子稍益进。",
        detailEn: "In the 24th year of Duke Zhao of Lu (518 BCE), Confucius was 34 years old. Nangong Jingshu spoke to the Duke of Lu, requesting to travel to Zhou with Confucius. The Duke provided them with one carriage, two horses, and one attendant. They went to Zhou to inquire about rites and met Laozi. Laozi saw Confucius off, saying: 'I have heard that the wealthy send people off with money, and the benevolent send people off with words. I cannot be wealthy, so I borrow the title of benevolent and send you off with words: The one who is intelligent and insightful yet close to death — this is the one who delights in criticizing others. The one who is broad-minded and great of argument yet endangers his person — this is the one who exposes others' faults. As a son, do not think only of yourself; as a minister, do not think only of yourself.' After Confucius returned from Zhou to Lu, his disciples gradually increased.",
        characterIds: ["char_kongzi", "char_nangong_jingshu", "char_lao_zi"],
        source: "《史记·孔子世家》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius",
        unlockStep: 1
    },
    {
        id: "event_jia_gu",
        name: "夹谷会盟",
        nameEn: "Jia Gu",
        locationId: "lu_state",
        summary: "孔子摄相事，以礼退齐兵，收复失地",
        summaryEn: "Confucius acts as chief minister and uses ritual to repel Qi's aggression, recovering lost territory",
        detail: "鲁定公十年（前500年），孔子五十二岁。齐鲁会于夹谷，孔子摄行相事。孔子以'有文事者必有武备'之策，具左右司马随行。会盟时齐人奏夷狄之乐、优倡侏儒为戏，孔子历阶登坛斥退曰：'匹夫而营惑诸侯者罪当诛！'齐景公惧而动，知义不若。后齐侯乃归所侵鲁之郓、汶阳、龟阴之田以谢过。此为孔子政治生涯最辉煌的外交成就。",
        detailEn: "In the 10th year of Duke Ding of Lu (500 BCE), Confucius was 52 years old. Lu and Qi held a covenant at Jia Gu, with Confucius acting as chief minister. Following the strategy that 'those who engage in cultural affairs must also be prepared militarily,' Confucius brought military commanders with him. During the covenant, the Qi people performed barbarian music and had entertainers perform. Confucius ascended the altar steps and rebuked them: 'Commoners who delude feudal lords deserve death!' Duke Jing of Qi was intimidated and knew he was in the wrong. Qi subsequently returned the lands of Yun, Wenyang, and Guiyin, which it had seized from Lu, as an apology. This was the most brilliant diplomatic achievement of Confucius' political career.",
        characterIds: ["char_kongzi", "char_lu_ding_gong", "char_qi_jing_gong"],
        source: "《史记·孔子世家》《左传·定公十年》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius; Zuo Zhuan: 10th Year of Duke Ding",
        unlockStep: 2
    },
    {
        id: "event_hunt_lin",
        name: "西狩获麟",
        nameEn: "The Unicorn Hunt",
        locationId: "lu_state",
        summary: "叔孙氏获麟，孔子叹'吾道穷矣'，春秋绝笔",
        summaryEn: "Shusun captures a unicorn; Confucius laments 'My Way has come to an end' and lays down his brush",
        detail: "鲁哀公十四年（前481年），孔子七十一岁。叔孙氏在大野泽猎获一兽，以为不祥。孔子视之，曰：'麟也。'感叹麟出非时，悲泣：'河不出图，洛不出书，吾已矣夫！'又曰：'吾道穷矣！'子贡问：'何为莫知子？'孔子曰：'不怨天，不尤人，下学而上达，知我者其天乎！'孔子所修《春秋》至此绝笔。同年，颜回去世，孔子恸曰：'天丧予！'",
        detailEn: "In the 14th year of Duke Ai of Lu (481 BCE), Confucius was 71 years old. Shusun captured a strange beast while hunting in the Daze Marsh and considered it inauspicious. Confucius looked at it and said: 'It is a unicorn.' He lamented that the unicorn had appeared at the wrong time, weeping: 'The Yellow River does not produce the Chart, the Luo River does not produce the Writing — I am done!' He also said: 'My Way has come to an end!' Zigong asked: 'Why does no one understand you, Master?' Confucius replied: 'I do not blame Heaven, I do not fault others. I study what is below and reach what is above. Perhaps only Heaven knows me!' The Spring and Autumn Annals, which Confucius had been compiling, ended at this point. In the same year, Yan Hui died. Confucius wailed: 'Heaven is destroying me!'",
        characterIds: ["char_kongzi", "char_yan_hui"],
        source: "《史记·孔子世家》",
        sourceEn: "Records of the Grand Historian: Hereditary House of Confucius",
        unlockStep: 12
    }
];
