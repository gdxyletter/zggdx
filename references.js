const CLASSICS_REFERENCES = [
    {
        "classic_title": "论语",
        "chapter": "学而",
        "verse": "1",
        "scripture_content": "子曰：'学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'学了，然后按一定的时间去实习它，不也高兴吗？有志同道合的人从远方来，不也快乐吗？人家不了解我，我却不怨恨，不也是君子吗？'",
        "note": "⑴时习——按一定的时间实习。⑵说——同悦，高兴。⑶愠——怨恨。"
    },
    {
        "classic_title": "论语",
        "chapter": "学而",
        "verse": "2",
        "scripture_content": "有子曰：'其为人也孝弟，而好犯上者，鲜矣；不好犯上，而好作乱者，未之有也。君子务本，本立而道生。孝弟也者，其为仁之本与！'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "有子说：'他的为人，孝顺爹娘，顺从兄长，而喜欢触犯上级，这种人是很少的；不喜欢触犯上级，而喜欢造反，这种人是没有的。君子专心致力于根本工作，根本建立了，治国做人的原则就会产生。孝顺爹娘，顺从兄长，这就是仁的根本啊！'",
        "note": "⑴有子——孔子学生，姓有，名若。⑵孝弟——善事父母为孝，善事兄长为弟。⑶鲜矣——很少啊。"
    },
    {
        "classic_title": "论语",
        "chapter": "学而",
        "verse": "4",
        "scripture_content": "曾子曰：'吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎？'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "曾子说：'我每天多次反省自己：为别人办事是否尽心竭力了呢？同朋友交往是否诚实了呢？老师传授给我的学业是否复习了呢？'",
        "note": "⑴曾子——孔子学生，名参，字子舆。⑵三省——多次反省。⑶传不习乎——老师传授的学业是否复习了。"
    },
    {
        "classic_title": "论语",
        "chapter": "学而",
        "verse": "12",
        "scripture_content": "有子曰：'礼之用，和为贵。先王之道，斯为美；小大由之。有所不行，知和而和，不以礼节之，亦不可行也。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "有子说：'礼的应用，以和谐为贵。以前君王的治国方法，可贵的地方就在这里；大事小事都照着做。有的时候就行不通了，如果只是为和谐而求和谐，不用礼来节制它，也是行不通的。'",
        "note": "⑴礼之用，和为贵——礼的应用，以和谐为贵。⑵斯为美——以这为美。⑶不以礼节之——不用礼来节制。"
    },
    {
        "classic_title": "论语",
        "chapter": "为政",
        "verse": "1",
        "scripture_content": "子曰：'为政以德，譬如北辰，居其所而众星共之。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'用道德来治理国政，自己便会像北极星一样，居于一定的位置，而别的星辰都围绕着它。'",
        "note": "⑴为政以德——用道德治理国政。⑵北辰——北极星。⑶共——同拱，环绕。"
    },
    {
        "classic_title": "论语",
        "chapter": "为政",
        "verse": "3",
        "scripture_content": "子曰：'道之以政，齐之以刑，民免而无耻；道之以德，齐之以礼，有耻且格。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'用政法来诱导他们，用刑罚来整顿他们，人民只是暂时地免于罪过，却没有羞耻之心。如果用道德来诱导他们，用礼教来整顿他们，人民不但有羞耻之心，而且能够人心归附。'",
        "note": "⑴道之以政——用政法诱导人民。⑵齐之以刑——用刑罚来整齐人民。⑶有耻且格——有羞耻心而且归附。"
    },
    {
        "classic_title": "论语",
        "chapter": "为政",
        "verse": "5",
        "scripture_content": "孟懿子问孝。子曰：'无违。'樊迟御，子告之曰：'孟孙问孝于我，我对曰，无违。'樊迟曰：'何谓也？'子曰：'生，事之以礼；死，葬之以礼，祭之以礼。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孟懿子问什么是孝。孔子说：'不要违背礼节。'后来樊迟替孔子驾车，孔子便告诉他说：'孟孙问我什么是孝，我答应他不要违背礼节。'樊迟说：'这是什么意思？'孔子说：'父母活着，按照礼节侍奉他们；死了，按照礼节埋葬他们，按照礼节祭祀他们。'",
        "note": "⑴孟懿子——鲁国大夫。⑵无违——不要违背礼节。⑶事之以礼——用礼来侍奉父母。"
    },
    {
        "classic_title": "论语",
        "chapter": "为政",
        "verse": "7",
        "scripture_content": "子游问孝。子曰：'今之孝者，是谓能养。至于犬马，皆能有养；不敬，何以别乎？'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "子游问什么是孝。孔子说：'现在的孝子，说能养活父母就行了。然而对于狗和马，也能喂养；如果不恭敬，那养活父母和喂养狗马有什么区别呢？'",
        "note": "⑴子游——孔子学生，姓言，名偃，字子游。⑵能养——能养活父母。⑶敬——恭敬。"
    },
    {
        "classic_title": "论语",
        "chapter": "为政",
        "verse": "11",
        "scripture_content": "子曰：'温故而知新，可以为师矣。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'温习旧知识，而能在其中获得新的体会，这样就可以做老师了。'",
        "note": "⑴温故——温习旧知识。⑵知新——获得新的体会。"
    },
    {
        "classic_title": "论语",
        "chapter": "为政",
        "verse": "22",
        "scripture_content": "子曰：'人而无信，不知其可也。大车无輗，小车无軏，其何以行之哉？'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'一个人不讲信用，不知道他可以干什么。就像大车没有輗，小车没有軏，它怎么能够行走呢？'",
        "note": "⑴人而无信——人而不讲信用。⑵輗、軏——车辕与横木相连接的关键部件。"
    },
    {
        "classic_title": "论语",
        "chapter": "八佾",
        "verse": "3",
        "scripture_content": "林放问礼之本。子曰：'大哉问！礼，与其奢也，宁俭；丧，与其易也，宁戚。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "林放问什么是礼的根本。孔子说：'你问得很重要！礼，与其奢侈铺张，宁可朴素俭约；丧事，与其仪式周全，宁可悲伤哀痛。'",
        "note": "⑴林放——鲁国人。⑵大哉问——问得好。⑶与其易也，宁戚——与其仪式周全，宁可内心悲哀。"
    },
    {
        "classic_title": "论语",
        "chapter": "八佾",
        "verse": "7",
        "scripture_content": "子曰：'君子无所争。必也射乎！揖让而升，下而饮。其争也君子。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'君子没有什么可争的事情。如果有所争，一定是比箭吧，[但是当射箭的时候，]相互作揖然后登堂；[射箭完毕，]走下堂来，然后[作揖]喝酒。那一种竞赛是很有礼貌的。'",
        "note": "⑴射——古代射礼。登堂而射，射后计算谁中靶多，中靶少的被罚饮酒。"
    },
    {
        "classic_title": "论语",
        "chapter": "八佾",
        "verse": "25",
        "scripture_content": "子谓《韶》：'尽美矣，又尽善也。'谓《武》：'尽美矣，未尽善也。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子评论《韶》乐说：'美极了，又好极了。'评论《武》乐说：'美极了，却还不够好。'",
        "note": "⑴韶——舜时的音乐。⑵武——周武王时的音乐。⑶尽美尽善——内容和形式都达到完美。"
    },
    {
        "classic_title": "论语",
        "chapter": "里仁",
        "verse": "1",
        "scripture_content": "子曰：'里仁为美。择不处仁，焉得知？'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'跟有仁德的人住在一起，才是好的。如果你选择的住处不是跟有仁德的人在一起，怎么能算聪明呢？'",
        "note": "⑴里仁——居住在仁者所居之里。一说以仁为里，犹言'处于仁的境界'。"
    },
    {
        "classic_title": "论语",
        "chapter": "里仁",
        "verse": "2",
        "scripture_content": "子曰：'不仁者不可以久处约，不可以长处乐。仁者安仁，知者利仁。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'没有仁德的人不能长期过穷困的生活，也不能长期过安乐的生活。有仁德的人安于仁，聪明的人利用仁。'",
        "note": "⑴约——贫困。⑵安仁——安于仁道。⑶利仁——认识到仁对他有利而实行它。"
    },
    {
        "classic_title": "论语",
        "chapter": "里仁",
        "verse": "5",
        "scripture_content": "子曰：'君子欲讷于言而敏于行。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'君子说话要谨慎迟钝，工作要勤劳敏捷。'",
        "note": "⑴讷——说话谨慎迟钝。⑵敏——勤劳敏捷。"
    },
    {
        "classic_title": "论语",
        "chapter": "里仁",
        "verse": "16",
        "scripture_content": "子曰：'君子喻于义，小人喻于利。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'君子懂得的是义，小人懂得的是利。'",
        "note": "⑴喻——明白，懂得。⑵义——合宜的道德、行为或道理。⑶利——利益。"
    },
    {
        "classic_title": "论语",
        "chapter": "里仁",
        "verse": "18",
        "scripture_content": "子曰：'事父母几谏，见志不从，又敬不违，劳而不怨。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'侍奉父母，如果他们有什么不对的地方，要委婉地劝说。看到自己的意见没有被听从，仍然要恭恭敬敬地不违背他们，虽然忧愁，但不怨恨。'",
        "note": "⑴几谏——委婉地劝谏。⑵见志不从——意见不被采纳。⑶劳而不怨——忧愁但不怨恨。"
    },
    {
        "classic_title": "论语",
        "chapter": "雍也",
        "verse": "7",
        "scripture_content": "子曰：'回也，其心三月不违仁，其余则日月至焉而已矣。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'颜回呀，他的心长期不离开仁德，别的学生只是短时间偶然想到罢了。'",
        "note": "⑴回——颜回，孔子最得意的学生。⑵三月——泛指较长的时间。⑶日至——每天或有的一天。"
    },
    {
        "classic_title": "论语",
        "chapter": "雍也",
        "verse": "29",
        "scripture_content": "子曰：'中庸之为德也，其至矣乎！民鲜久矣。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'中庸这种道德，该是最高的了！人们已经长久地缺乏它了。'",
        "note": "⑴中庸——折中、适度、不偏不倚。⑵至矣乎——最高的了。⑶民鲜久矣——人民长久缺乏它。"
    },
    {
        "classic_title": "论语",
        "chapter": "雍也",
        "verse": "30",
        "scripture_content": "子贡曰：'如有博施于民而能济众，何如？可谓仁乎？'子曰：'何事于仁，必也圣乎！尧、舜其犹病诸！夫仁者，己欲立而立人，己欲达而达人。能近取譬，可谓仁之方也已。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "子贡说：'如果有人能广泛地给人民好处而能救济众人，怎么样？可以说是仁了吗？'孔子说：'哪里仅是仁！那一定是圣了！尧舜恐怕都难以做到呢！说到仁，就是自己想站起来，便帮助别人一同站起来；自己想开拓发展，便帮助别人一同开拓发展。能就近选取例子来做，可说是实行仁的方法了。'",
        "note": "⑴博施——广泛地施与。⑵济众——救济众人。⑶病诸——以此为病。⑷能近取譬——能就近以己为例，推己及人。"
    },
    {
        "classic_title": "论语",
        "chapter": "述而",
        "verse": "2",
        "scripture_content": "子曰：'默而识之，学而不厌，诲人不倦，何有于我哉？'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'把所见所闻默默记住，勤奋学习而不满足，教导别人而不疲倦，这对我有什么困难呢？'",
        "note": "⑴默而识之——默默记住。⑵学而不厌——学习不满足。⑶诲人不倦——教导别人不疲倦。"
    },
    {
        "classic_title": "论语",
        "chapter": "述而",
        "verse": "6",
        "scripture_content": "子曰：'志于道，据于德，依于仁，游于艺。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'目标在'道'，根据在'德'，依靠在'仁'，游憩于礼、乐、射、御、书、数六艺之中。'",
        "note": "⑴道——指正确的政治路线和思想体系。⑵德——指内心的情感和思想。⑶仁——指仁爱。⑷艺——六艺：礼、乐、射、御、书、数。"
    },
    {
        "classic_title": "论语",
        "chapter": "述而",
        "verse": "37",
        "scripture_content": "子曰：'君子坦荡荡，小人长戚戚。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'君子的心地平坦宽广，小人却经常局促忧愁。'",
        "note": "⑴坦荡荡——心地平坦宽广。⑵长戚戚——经常忧愁不安。"
    },
    {
        "classic_title": "论语",
        "chapter": "先进",
        "verse": "5",
        "scripture_content": "子曰：'孝哉，闵子骞！人不间于其父母昆弟之言。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'闵子骞真是孝顺呀！别人对于他爹娘兄弟称赞他的话都没有异议。'",
        "note": "⑴闵子骞——孔子学生，姓闵，名损，字子骞。⑵人不间于其父母昆弟之言——别人对他父母兄弟的话没有异议。"
    },
    {
        "classic_title": "论语",
        "chapter": "先进",
        "verse": "16",
        "scripture_content": "子贡问：'师与商也孰贤？'子曰：'师也过，商也不及。'曰：'然则师愈与？'子曰：'过犹不及。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "子贡问道：'颛孙师和卜商谁强？'孔子说：'颛孙师过头了，卜商不够。'子贡说：'那么颛孙师强一些吗？'孔子说：'过头和不够同样不好。'",
        "note": "⑴师——颛孙师，字子张。⑵商——卜商，字子夏。⑶过犹不及——过头和不够同样不好。"
    },
    {
        "classic_title": "论语",
        "chapter": "颜渊",
        "verse": "1",
        "scripture_content": "颜渊问仁。子曰：'克己复礼为仁。一日克己复礼，天下归仁焉。为仁由己，而由人乎哉？'颜渊曰：'请问其目。'子曰：'非礼勿视，非礼勿听，非礼勿言，非礼勿动。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "颜渊问仁。孔子说：'克制自己，使言语和行动都符合礼，这就是仁。一旦这样做了，天下的人都会称许你是仁人。实行仁德在于自己，难道在于别人吗？'颜渊说：'请问实行仁的条目。'孔子说：'不合于礼的不要看，不合于礼的不要听，不合于礼的不要说，不合于礼的不要做。'",
        "note": "⑴克己复礼——克制自己，使自己的行为回复到礼的要求。⑵归仁——称许为仁。⑶由己——靠自己。"
    },
    {
        "classic_title": "论语",
        "chapter": "颜渊",
        "verse": "22",
        "scripture_content": "樊迟问仁。子曰：'爱人。'问知。子曰：'知人。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "樊迟问什么是仁。孔子说：'爱护人。'问什么是智。孔子说：'了解人。'",
        "note": "⑴樊迟——孔子学生，名须，字子迟。⑵爱人——仁就是爱别人。⑶知人——智就是能识别他人。"
    },
    {
        "classic_title": "论语",
        "chapter": "子路",
        "verse": "21",
        "scripture_content": "子曰：'君子和而不同，小人同而不和。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'君子讲究和谐而不同流合污，小人同流合污而不讲和谐。'",
        "note": "⑴和而不同——讲究和谐但不盲从附和。⑵同而不和——盲目附和而不讲原则。"
    },
    {
        "classic_title": "论语",
        "chapter": "宪问",
        "verse": "14",
        "scripture_content": "子路问君子。子曰：'修己以敬。'曰：'如斯而已乎？'曰：'修己以安人。'曰：'如斯而已乎？'曰：'修己以安百姓。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "子路问怎样才算是君子。孔子说：'修养自己以保持严肃恭敬的态度。'子路说：'这样就够了吗？'孔子说：'修养自己使上层人物安心。'子路说：'这样就够了吗？'孔子说：'修养自己使百姓得到安乐。'",
        "note": "⑴修己以敬——修养自己，保持恭敬。⑵安人——使上层人物安心。⑶安百姓——使百姓得到安乐。"
    },
    {
        "classic_title": "论语",
        "chapter": "卫灵公",
        "verse": "6",
        "scripture_content": "子张问行。子曰：'言忠信，行笃敬，虽蛮貊之邦，行矣。言不忠信，行不笃敬，虽州里，行乎哉？'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "子张问怎样才能行得通。孔子说：'言语忠诚老实，行为敦厚恭敬，即使到了别的部族国家，也行得通。言语欺诈虚伪，行为轻薄奢侈，即使在本乡本土，能行得通吗？'",
        "note": "⑴言忠信——言语忠诚老实。⑵行笃敬——行为敦厚恭敬。⑶蛮貊——古代对南方和北方少数民族的称呼。"
    },
    {
        "classic_title": "论语",
        "chapter": "卫灵公",
        "verse": "21",
        "scripture_content": "子曰：'君子求诸己，小人求诸人。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'君子要求自己，小人要求别人。'",
        "note": "⑴求诸己——要求自己。⑵求诸人——要求别人。"
    },
    {
        "classic_title": "论语",
        "chapter": "卫灵公",
        "verse": "24",
        "scripture_content": "子贡问曰：'有一言而可以终身行之者乎？'子曰：'其恕乎！己所不欲，勿施于人。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "子贡问道：'有一个字可以终身奉行的吗？'孔子说：'大概是'恕'吧！自己所不想要的，就不要加给别人。'",
        "note": "⑴一言——一个字。⑵恕——己所不欲，勿施于人。⑶终身行之——可以用来终身实行。"
    },
    {
        "classic_title": "论语",
        "chapter": "季氏",
        "verse": "2",
        "scripture_content": "子曰：'性相近也，习相远也。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'人的本性是相近的，由于习染不同便相远了。'",
        "note": "⑴性——本性。⑵习——习染，指环境和教育的影响。⑶相远——距离远了。"
    },
    {
        "classic_title": "论语",
        "chapter": "阳货",
        "verse": "11",
        "scripture_content": "子曰：'礼云礼云，玉帛云乎哉？乐云乐云，钟鼓云乎哉？'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'礼呀礼呀，只是说的玉帛之类的礼器吗？乐呀乐呀，只是说的钟鼓之类的乐器吗？'",
        "note": "⑴玉帛——祭祀时用的玉器和丝织品。⑵钟鼓——演奏音乐用的乐器。"
    },
    {
        "classic_title": "论语",
        "chapter": "子张",
        "verse": "12",
        "scripture_content": "子曰：'见利思义，见危授命，久要不忘平生之言，亦可以为成人矣。'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "孔子说：'看见利益就想到义，遇到危险愿意献出生命，长久困顿的时候不忘记平日的诺言，这也就可以算作完人了。'",
        "note": "⑴见利思义——见到利益想到义。⑵见危授命——遇到危险愿意献出生命。⑶久要不忘平生之言——长期处于困顿不忘记平日的诺言。"
    },
    {
        "classic_title": "论语",
        "chapter": "颜渊",
        "verse": "14",
        "scripture_content": "齐景公问政于孔子。孔子对曰：'君君，臣臣，父父，子子。'公曰：'善哉！信如君不君，臣不臣，父不父，子不子，虽有粟，吾得而食诸？'",
        "commentator": "杨伯峻",
        "commentary_title": "论语译注",
        "dynasty": "现代",
        "translation": "齐景公问孔子如何治理国家。孔子答道：'君要像君，臣要像臣，父亲要像父亲，儿子要像儿子。'景公说：'说得好呀！如果君不像君，臣不像臣，父不像父，子不像子，即使有粮食，我能够吃得着吗？'",
        "note": "⑴君君，臣臣，父父，子子——君要尽君道，臣要尽臣道，父要尽父道，子要尽子道。⑵信如——确实如此。"
    },
    {
        "classic_title": "孟子",
        "chapter": "梁惠王上",
        "verse": "1",
        "scripture_content": "孟子见梁惠王。王曰：'叟！不远千里而来，亦将有以利吾国乎？'孟子对曰：'王何必曰利？亦有仁义而已矣。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子去见梁惠王。梁惠王说：'老先生！您不以千里为远来到这里，一定有什么对我的国家有利的高见吧？'孟子回答说：'大王为什么一定要说利呢？只要有仁义就行了。'",
        "note": "⑴梁惠王——魏国国君。⑵仁义——仁爱和正义。"
    },
    {
        "classic_title": "孟子",
        "chapter": "梁惠王上",
        "verse": "3",
        "scripture_content": "梁惠王曰：'寡人之于国也，尽心焉耳矣。河内凶，则移其民于河东，移其粟于河内；河东凶亦然。察邻国之政，莫如寡人之用心者。邻国之民不加少，寡人之民不加多，何也？'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "梁惠王说：'我对于国家，真是费尽心力了。河内遭到饥荒，我便把那里的百姓迁移到河东，把河东的粮食运到河内；河东遇到饥荒也是这样。看看邻国的政治，没有像我这样尽心的。可是邻国的百姓没有减少，我的百姓没有增多，这是什么缘故呢？'",
        "note": "⑴河内、河东——魏国地名。⑵凶——遭受灾荒。⑶尽心——费尽心力。"
    },
    {
        "classic_title": "孟子",
        "chapter": "梁惠王上",
        "verse": "7",
        "scripture_content": "孟子曰：'老吾老，以及人之老；幼吾幼，以及人之幼；天下可运于掌。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'尊敬我的长辈，从而推广到尊敬别人的长辈；爱护我的儿女，从而推广到爱护别人的儿女；治理天下就像在手掌里转动东西一样容易。'",
        "note": "⑴老吾老——尊敬我的长辈。⑵幼吾幼——爱护我的儿女。⑶运于掌——在手掌里转动东西。"
    },
    {
        "classic_title": "孟子",
        "chapter": "滕文公上",
        "verse": "1",
        "scripture_content": "滕文公为世子，将之楚，过宋而见孟子。孟子道性善，言必称尧舜。",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "滕文公做太子的时候，要到楚国去，经过宋国时拜访了孟子。孟子讲人性善良，言必称颂尧舜。",
        "note": "⑴世子——太子。⑵道性善——讲人性善良。"
    },
    {
        "classic_title": "孟子",
        "chapter": "公孙丑上",
        "verse": "2",
        "scripture_content": "孟子曰：'人皆有不忍人之心。先王有不忍人之心，斯有不忍人之政矣；以不忍人之心，行不忍人之政，治天下可运之掌上。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'每个人都有怜爱别人的心。古代帝王因为有怜爱别人的心，于是才有怜爱别人的政事；用怜爱别人的心，实行怜爱别人的政事，治理天下就像在手掌里转动东西一样容易。'",
        "note": "⑴不忍人之心——怜爱别人的心。⑵不忍人之政——怜爱别人的政治措施。"
    },
    {
        "classic_title": "孟子",
        "chapter": "公孙丑上",
        "verse": "3",
        "scripture_content": "孟子曰：'无恻隐之心，非人也；无羞恶之心，非人也；无辞让之心，非人也；无是非之心，非人也。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'没有同情心的，不是人；没有羞耻心的，不是人；没有谦让心的，不是人；没有是非心的，不是人。'",
        "note": "⑴恻隐之心——同情心。⑵羞恶之心——羞耻心。⑶辞让之心——谦让心。⑷是非之心——明辨是非的心。"
    },
    {
        "classic_title": "孟子",
        "chapter": "公孙丑上",
        "verse": "6",
        "scripture_content": "孟子曰：'以德行仁者王，以力假仁者霸。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'用道德来实行仁政的可以称王，用武力来假借仁义的可以称霸。'",
        "note": "⑴以德行仁——用道德来实行仁政。⑵以力假仁——用武力假借仁义。"
    },
    {
        "classic_title": "孟子",
        "chapter": "离娄上",
        "verse": "1",
        "scripture_content": "孟子曰：'离娄之明，公输子之巧，不以规矩，不能成方员；师旷之聪，不以六律，不能正五音；尧舜之道，不以仁政，不能平治天下。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'即使有离娄的目力，公输般的技巧，如果不用圆规和曲尺，也不能画出方形和圆形；即使有师旷的听力，如果不用六律，也不能校正五音；即使有尧舜的大道，如果不行仁政，也不能使天下太平。'",
        "note": "⑴离娄——古代视力很强的人。⑵公输子——即鲁班，古代巧匠。⑶师旷——古代音乐家。⑷六律——古代音乐标准。"
    },
    {
        "classic_title": "孟子",
        "chapter": "离娄上",
        "verse": "12",
        "scripture_content": "孟子曰：'有不虞之誉，有求全之毁。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'有意料不到的赞誉，也有吹毛求疵的毁谤。'",
        "note": "⑴不虞之誉——预料不到的赞誉。⑵求全之毁——苛求完美而致的毁谤。"
    },
    {
        "classic_title": "孟子",
        "chapter": "离娄下",
        "verse": "19",
        "scripture_content": "孟子曰：'君子以仁存心，以礼存心。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'君子用仁来存心，用礼来存心。'",
        "note": "⑴以仁存心——用仁来存心。⑵以礼存心——用礼来存心。"
    },
    {
        "classic_title": "孟子",
        "chapter": "告子上",
        "verse": "2",
        "scripture_content": "告子曰：'人性之善也，犹水之就下也。人无有不善，水无有不下。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "告子说：'人性的善良，就像水往低处流一样。人的本性没有不善良的，水没有不往低处流的。'",
        "note": "⑴人性之善——人的本性是善良的。⑵就下——流向低处。"
    },
    {
        "classic_title": "孟子",
        "chapter": "告子上",
        "verse": "3",
        "scripture_content": "告子曰：'性无善无不善也。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "告子说：'人的本性没有善良也没有不善良。'",
        "note": "⑴告子——战国时人，主张性无善无不善。"
    },
    {
        "classic_title": "孟子",
        "chapter": "告子上",
        "verse": "4",
        "scripture_content": "告子曰：'食色，性也。仁，内也，非外也；义，外也，非内也。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "告子说：'饮食男女，是人的本性。仁是内在的东西，不是外在的东西；义是外在的东西，不是内在的东西。'",
        "note": "⑴食色——饮食和男女。⑵仁内义外——仁是内在的，义是外在的。"
    },
    {
        "classic_title": "孟子",
        "chapter": "告子上",
        "verse": "10",
        "scripture_content": "孟子曰：'鱼，我所欲也；熊掌，亦我所欲也。二者不可得兼，舍鱼而取熊掌者也。生，亦我所欲也；义，亦我所欲也。二者不可得兼，舍生而取义者也。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'鱼是我想要的东西，熊掌也是我想要的东西，如果两样不能同时得到，我便舍去鱼而要熊掌。生命是我想要的，大义也是我想要的，如果两者不能同时得到，我便舍去生命而选取大义。'",
        "note": "⑴舍生取义——舍弃生命而选取大义。⑵二者不可得兼——两样不能同时得到。"
    },
    {
        "classic_title": "孟子",
        "chapter": "告子上",
        "verse": "6",
        "scripture_content": "孟子曰：'恻隐之心，人皆有之；羞恶之心，人皆有之；恭敬之心，人皆有之；是非之心，人皆有之。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'同情心，每个人都有；羞耻心，每个人都有；恭敬心，每个人都有；是非心，每个人都有。'",
        "note": "⑴恻隐之心——同情心。⑵羞恶之心——羞耻心。⑶恭敬之心——恭敬心。⑷是非之心——是非心。"
    },
    {
        "classic_title": "孟子",
        "chapter": "尽心上",
        "verse": "1",
        "scripture_content": "孟子曰：'尽其心者，知其性也。知其性，则知天矣。存其心，养其性，所以事天也。夭寿不贰，修身以俟之，所以立命也。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'充分扩张善良的本心，这就是懂得了人的本性。懂得了人的本性，就懂得天命了。保持人的本心，培养人的本性，这就是对待天命的方法。短命和长寿都不改变态度，修养身心来等待天命，这就是安身立命的方法。'",
        "note": "⑴尽其心——充分发挥本心。⑵知其性——懂得人的本性。⑶知天——懂得天命。⑷立命——安身立命。"
    },
    {
        "classic_title": "孟子",
        "chapter": "尽心上",
        "verse": "13",
        "scripture_content": "孟子曰：'万物皆备于我矣。反身而诚，乐莫大焉。强恕而行，求仁莫近焉。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'万事万物的道理我都具备了。反躬自问，自己是忠诚踏实的，便没有比这更大的快乐了。努力按恕道办事，追求仁德没有比这更近的了。'",
        "note": "⑴万物皆备于我——万事万物的道理我都具备了。⑵反身而诚——反躬自问自己是忠诚踏实的。⑶强恕而行——努力按恕道办事。"
    },
    {
        "classic_title": "孟子",
        "chapter": "告子下",
        "verse": "2",
        "scripture_content": "孟子曰：'故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。'",
        "commentator": "杨伯峻",
        "commentary_title": "孟子译注",
        "dynasty": "现代",
        "translation": "孟子说：'所以天要把重大任务降到这个人身上，一定要先使他的心志苦恼，使他的筋骨劳累，使他的身体饥饿，使他身受穷困之苦，所做的事总不如意，用来动摇他的心志，坚韧他的性情，增加他过去所没有的能力。'",
        "note": "⑴降大任——降下重大任务。⑵苦其心志——使心志苦恼。⑶动心忍性——动摇心志，坚韧性情。"
    },
    {
        "classic_title": "礼记",
        "chapter": "曲礼上",
        "verse": "3",
        "scripture_content": "道德仁义，非礼不成。教训正俗，非礼不备。分争辨讼，非礼不决。君臣上下，父子兄弟，非礼不定。宦学事师，非礼不亲。班朝治军，莅官行法，非礼威严不行。",
        "commentator": "杨伯峻",
        "commentary_title": "礼记译注",
        "dynasty": "现代",
        "translation": "道德仁义，没有礼便不能成就。教训人民使风俗归于正道，没有礼便不能完备。分辨争执诉讼，没有礼便不能决定。君臣上下，父子兄弟，没有礼便不能安定。学习和做官去侍奉老师，没有礼便不能亲密。朝廷的位次，军队的治理，就职任事，执行法令，没有礼便没有威严可言。",
        "note": "⑴道德仁义——道德仁义四项。⑵非礼不成——没有礼便不能成就。"
    },
    {
        "classic_title": "礼记",
        "chapter": "曲礼上",
        "verse": "7",
        "scripture_content": "夫为人子者，出必告，反必面，所游必有常，所习必有业。",
        "commentator": "杨伯峻",
        "commentary_title": "礼记译注",
        "dynasty": "现代",
        "translation": "做儿子的，出门必须告诉父母，回来也必须当面禀报。出游必须有一定的地方，学习必须有固定的学业。",
        "note": "⑴出必告——出门必须告诉父母。⑵反必面——回来必须当面禀报。"
    },
    {
        "classic_title": "礼记",
        "chapter": "礼运",
        "verse": "1",
        "scripture_content": "夫礼之初，始诸饮食。其燔黍捭豚，污尊而抔饮，蒉桴而土鼓，犹若可以致其敬于鬼神。",
        "commentator": "杨伯峻",
        "commentary_title": "礼记译注",
        "dynasty": "现代",
        "translation": "礼的起始，最初是从饮食开始的。当时人们烧熟小米，撕开小猪在地上挖个坑作为酒壶，用手掬酒来喝，堆土作为鼓槌，堆土作为鼓，这样做还是可以向鬼神表示敬意的。",
        "note": "⑴礼之初，始诸饮食——礼的起始是从饮食开始的。⑵燔黍捭豚——烧熟小米，撕开小猪。⑶污尊而抔饮——挖坑为壶，用手掬酒。"
    },
    {
        "classic_title": "礼记",
        "chapter": "礼运",
        "verse": "1",
        "scripture_content": "大道之行也，天下为公。选贤与能，讲信修睦。故人不独亲其亲，不独子其子，使老有所终，壮有所用，幼有所长，矜寡孤独废疾者，皆有所养。",
        "commentator": "杨伯峻",
        "commentary_title": "礼记译注",
        "dynasty": "现代",
        "translation": "大道实行的时代，天下是公共的。人们选举贤能和有才能的人，讲求信用，建立和睦关系。所以人们不只是敬奉自己的父母，不只是抚养自己的孩子，而是使老年人能够安享天年，壮年人能够发挥才能，幼年人能够健康成长，鳏寡孤独和残废有病的人，都能得到赡养。",
        "note": "⑴天下为公——天下是公共的。⑵选贤与能——选举贤能和有才能的人。⑶矜寡孤独——老而无妻、老而无夫、幼而无父、老而无子。"
    },
    {
        "classic_title": "礼记",
        "chapter": "礼运",
        "verse": "9",
        "scripture_content": "人情者，圣王之田也。修礼以耕之，陈义以种之，讲学以耨之，本仁以聚之，播乐以安之。",
        "commentator": "杨伯峻",
        "commentary_title": "礼记译注",
        "dynasty": "现代",
        "translation": "人的情感欲望，是圣王耕种的田地。用礼义来耕耘它，用讲学来锄草它，用仁爱来聚集它，用音乐来安定它。",
        "note": "⑴人情——人的情感欲望。⑵圣王之田——圣王耕种的田地，比喻教化的对象。"
    },
    {
        "classic_title": "礼记",
        "chapter": "礼器",
        "verse": "1",
        "scripture_content": "礼也者，犹体也。体不备，君子谓之不成人。",
        "commentator": "杨伯峻",
        "commentary_title": "礼记译注",
        "dynasty": "现代",
        "translation": "礼就好比人的身体。身体器官不完备，君子称这为不成其为人。",
        "note": "⑴礼也者，犹体也——礼就像人的身体。⑵不备——不完备。"
    },
    {
        "classic_title": "礼记",
        "chapter": "内则",
        "verse": "2",
        "scripture_content": "父母有过，下气怡色，柔声以谏。谏若不入，起敬起孝，说则复谏。",
        "commentator": "杨伯峻",
        "commentary_title": "礼记译注",
        "dynasty": "现代",
        "translation": "父母有了过错，要和颜悦色、轻声细语地规劝。如果不听从，便更加恭敬孝顺，等父母高兴时再继续规劝。",
        "note": "⑴下气怡色——和颜悦色。⑵柔声以谏——轻声细语地规劝。⑶起敬起孝——更加恭敬孝顺。"
    },
    {
        "classic_title": "礼记",
        "chapter": "祭义",
        "verse": "1",
        "scripture_content": "孝子之有深爱者，必有和气；有和气者，必有愉色；有愉色者，必有婉容。",
        "commentator": "杨伯峻",
        "commentary_title": "礼记译注",
        "dynasty": "现代",
        "translation": "孝子如果有深厚的爱，心中必然有和气；有和气的人，脸上必然有愉快的表情；有愉快表情的人，必然有柔和的容貌。",
        "note": "⑴深爱——深厚的爱。⑵和气——平和的气象。⑶愉色——愉快的表情。⑷婉容——柔和的容貌。"
    },
    {
        "classic_title": "礼记",
        "chapter": "中庸",
        "verse": "1",
        "scripture_content": "天命之谓性，率性之谓道，修道之谓教。道也者，不可须臾离也，可离非道也。",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "translation": "天的赋予叫做性，顺着本性行事叫做道，修明并推广道叫做教。道，是片刻不能离开的，能够离开的就不是道。",
        "note": "⑴天命之谓性——天的赋予叫做性。⑵率性之谓道——顺着本性行事叫做道。⑶修道之谓教——修明并推广道叫做教。"
    },
    {
        "classic_title": "礼记",
        "chapter": "中庸",
        "verse": "12",
        "scripture_content": "中也者，天下之大本也；和也者，天下之达道也。致中和，天地位焉，万物育焉。",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "translation": "中是天下的根本，和是天下的通途。达到中和的境界，天地便各在其位，万物便生长发育了。",
        "note": "⑴大本——根本。⑵达道——通途。⑶致中和——达到中和的境界。"
    },
    {
        "classic_title": "礼记",
        "chapter": "中庸",
        "verse": "1",
        "scripture_content": "君子之中庸也，君子而时中。",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "translation": "君子的中庸，是因为君子能够随时居于中道。",
        "note": "⑴时中——随时居于中道。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": "1",
        "scripture_content": "大学之道，在明明德，在亲民，在止于至善。",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "translation": "大学的道理，在于彰显光明的品德，在于使人们革除旧习达到新的境界，在于使人们达到最完善的境界。",
        "note": "⑴明明德——彰显光明的品德。⑵亲民——使人们革除旧习。⑶止于至善——达到最完善的境界。"
    },
    {
        "classic_title": "礼记",
        "chapter": "乐记",
        "verse": "1",
        "scripture_content": "乐者，通伦理者也。是故知声而不知音者，禽兽是也；知音而不知乐者，众庶是也。唯君子为能知乐。",
        "commentator": "杨伯峻",
        "commentary_title": "礼记译注",
        "dynasty": "现代",
        "translation": "音乐是沟通伦理的。因此只知道声音而不知道音乐的，是禽兽；知道音乐而不知道乐的，是普通百姓。只有君子才能懂得乐。",
        "note": "⑴通伦理——沟通伦理。⑵知声不知音——只知道声音而不知道音乐。"
    },
    {
        "classic_title": "周易",
        "chapter": "系辞上",
        "verse": "5",
        "scripture_content": "一阴一阳之谓道。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "一阴一阳的交替变化就叫做道。",
        "note": "⑴一阴一阳——阴阳交替变化。⑵之谓道——就叫做道。"
    },
    {
        "classic_title": "周易",
        "chapter": "系辞上",
        "verse": "6",
        "scripture_content": "变化者，进退之象也。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "变化是事物行进和退止的象征。",
        "note": "⑴变化——变化。⑵进退之象——行进和退止的象征。"
    },
    {
        "classic_title": "周易",
        "chapter": "系辞上",
        "verse": "10",
        "scripture_content": "易与天地准，故能弥纶天地之道。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "《易经》与天地齐等，所以能普遍包括天地间的道理。",
        "note": "⑴与天地准——与天地齐等。⑵弥纶——普遍包括。"
    },
    {
        "classic_title": "周易",
        "chapter": "系辞上",
        "verse": "11",
        "scripture_content": "易有太极，是生两仪，两仪生四象，四象生八卦。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "《易经》有太极，由此产生天地两仪，两仪产生四象，四象产生八卦。",
        "note": "⑴太极——宇宙原始混沌之气。⑵两仪——天地或阴阳。⑶四象——少阳、老阳、少阴、老阴。⑷八卦——乾、坤、震、巽、坎、离、艮、兑。"
    },
    {
        "classic_title": "周易",
        "chapter": "系辞下",
        "verse": "1",
        "scripture_content": "易穷则变，变则通，通则久。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "《易经》的道理是：事物到了尽头就要发生变化，变化就能通达，通达就能长久。",
        "note": "⑴穷则变——到了尽头就要发生变化。⑵变则通——变化就能通达。⑶通则久——通达就能长久。"
    },
    {
        "classic_title": "周易",
        "chapter": "系辞下",
        "verse": "6",
        "scripture_content": "变化者，进退之象也；刚柔者，昼夜之象也。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "变化是事物行进和退止的象征；刚柔是白天和黑夜的象征。",
        "note": "⑴变化——事物的发展变化。⑵刚柔——刚健和柔顺。⑶昼夜——白天和黑夜。"
    },
    {
        "classic_title": "周易",
        "chapter": "乾",
        "verse": "1",
        "scripture_content": "大哉乾元，万物资始，乃统天。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "伟大啊，乾的元始！万物依赖它而开始存在，它于是统率着天。",
        "note": "⑴乾元——乾的元始。⑵万物资始——万物依赖它而开始存在。⑶统天——统率天。"
    },
    {
        "classic_title": "周易",
        "chapter": "乾",
        "verse": "2",
        "scripture_content": "天行健，君子以自强不息。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "天的运行刚健不息，君子因此不停息地自我奋发图强。",
        "note": "⑴天行健——天的运行刚健。⑵自强不息——自己奋发图强而不停息。"
    },
    {
        "classic_title": "周易",
        "chapter": "文言",
        "verse": "1",
        "scripture_content": "元者，善之长也。亨者，嘉之会也。利者，义之和也。贞者，事之干也。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "元是善的首位，亨是美的集合，利是义的和谐，贞是事的根本。",
        "note": "⑴元者，善之长也——元是善的首位。⑵亨者，嘉之会也——亨是美的集合。⑶利者，义之和也——利是义的和谐。⑷贞者，事之干也——贞是事的根本。"
    },
    {
        "classic_title": "周易",
        "chapter": "坤",
        "verse": "2",
        "scripture_content": "地势坤，君子以厚德载物。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "地的形势是顺承天的，君子因此用厚重的德行来承载万物。",
        "note": "⑴地势坤——地的形势顺承天。⑵厚德载物——用厚重的德行来承载万物。"
    },
    {
        "classic_title": "周易",
        "chapter": "文言",
        "verse": "4",
        "scripture_content": "坤至柔而动也刚，至静而德方。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "坤最为柔顺，但活动起来却很刚健；最为静止，但德行却流布四方。",
        "note": "⑴至柔——最为柔顺。⑵动也刚——活动起来却很刚健。⑶至静——最为静止。"
    },
    {
        "classic_title": "周易",
        "chapter": "说卦",
        "verse": "15",
        "scripture_content": "立天之道曰阴与阳。",
        "commentator": "朱熹",
        "commentary_title": "周易本义",
        "dynasty": "宋",
        "translation": "确立天的道叫做阴和阳。",
        "note": "⑴立天之道——确立天的道。⑵曰阴与阳——叫做阴和阳。"
    },
    {
        "classic_title": "尚书",
        "chapter": "皋陶谟",
        "verse": "3",
        "scripture_content": "慎厥身，修思永。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "谨慎地修养自身，思考长久之道。",
        "note": "⑴慎厥身——谨慎地修养自身。⑵修思永——思考长久之道。"
    },
    {
        "classic_title": "尚书",
        "chapter": "大禹谟",
        "verse": "3",
        "scripture_content": "人心惟危，道心惟微，惟精惟一，允执厥中。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "人心是危险难安的，道心是幽微难明的，只有精心一意，真诚地坚持中道。",
        "note": "⑴人心惟危——人心危险难安。⑵道心惟微——道心幽微难明。⑶惟精惟一——精心一意。⑷允执厥中——真诚地坚持中道。"
    },
    {
        "classic_title": "尚书",
        "chapter": "大禹谟",
        "verse": "4",
        "scripture_content": "人心惟危，道心惟微。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "人心是危险难安的，道心是幽微难明的。",
        "note": "⑴人心惟危——人心危险难安。⑵道心惟微——道心幽微难明。"
    },
    {
        "classic_title": "尚书",
        "chapter": "康诰",
        "verse": "1",
        "scripture_content": "克明德慎罚。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "能够彰明德行，谨慎地使用刑罚。",
        "note": "⑴克明德——能够彰明德行。⑵慎罚——谨慎地使用刑罚。"
    },
    {
        "classic_title": "尚书",
        "chapter": "召诰",
        "verse": "13",
        "scripture_content": "皇天上帝，改厥元子。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "伟大的上天上帝，更改了天下的大君。",
        "note": "⑴皇天上帝——伟大的上天上帝。⑵改厥元子——更改了天下的大君。"
    },
    {
        "classic_title": "尚书",
        "chapter": "咸有一德",
        "verse": "14",
        "scripture_content": "天难谌，命靡常。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "上天是难以相信的，命运是没有常定的。",
        "note": "⑴天难谌——上天难以相信。⑵命靡常——命运没有常定。"
    },
    {
        "classic_title": "尚书",
        "chapter": "泰誓上",
        "verse": "11",
        "scripture_content": "天视自我民视，天听自我民听。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "上天的所见来自于人民所见，上天的所闻来自于人民所闻。",
        "note": "⑴天视自我民视——上天的所见来自于人民所见。⑵天听自我民听——上天的所闻来自于人民所闻。"
    },
    {
        "classic_title": "尚书",
        "chapter": "尧典",
        "verse": "1",
        "scripture_content": "昔在帝尧，聪明文思，光宅天下。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "从前帝尧，耳聪目明，文思敏捷，光辉普照天下。",
        "note": "⑴帝尧——传说中的古代帝王。⑵聪明文思——耳聪目明，文思敏捷。⑶光宅天下——光辉普照天下。"
    },
    {
        "classic_title": "尚书",
        "chapter": "舜典",
        "verse": "1",
        "scripture_content": "曰若稽古帝舜，曰重华协于帝。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "考查古代的帝舜，他的光华与帝尧相合。",
        "note": "⑴曰若稽古——考查古代。⑵重华——指舜的美德如花光华。⑶协于帝——与帝尧相合。"
    },
    {
        "classic_title": "尚书",
        "chapter": "洪范",
        "verse": "1",
        "scripture_content": "五行：一曰水，二曰火，三曰木，四曰金，五曰土。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "五行：第一叫水，第二叫火，第三叫木，第四叫金，第五叫土。",
        "note": "⑴五行——水、火、木、金、土五种基本元素。⑵一曰水——第一叫水。"
    },
    {
        "classic_title": "尚书",
        "chapter": "洪范",
        "verse": "10",
        "scripture_content": "敛时五福，用敷锡厥庶民。",
        "commentator": "顾颉刚",
        "commentary_title": "尚书校释译论",
        "dynasty": "现代",
        "translation": "收集这五福，用来普遍地赐予庶民。",
        "note": "⑴敛时五福——收集这五福。⑵用敷锡厥庶民——用来普遍地赐予庶民。"
    },
    {
        "classic_title": "诗经",
        "chapter": "周南",
        "verse": "1",
        "scripture_content": "关关雎鸠，在河之洲。窈窕淑女，君子好逑。",
        "commentator": "周振甫",
        "commentary_title": "诗经译注",
        "dynasty": "现代",
        "translation": "雎鸠鸟关关和唱，在河心小小的洲上。好姑娘苗条又美丽，确是君子好配偶。",
        "note": "⑴关关——鸟鸣声。⑵雎鸠——水鸟。⑶窈窕——容貌美好。⑷淑女——善良的女子。⑸好逑——好配偶。"
    },
    {
        "classic_title": "诗经",
        "chapter": "小雅",
        "verse": "6",
        "scripture_content": "呦呦鹿鸣，食野之苹。我有嘉宾，鼓瑟吹笙。",
        "commentator": "周振甫",
        "commentary_title": "诗经译注",
        "dynasty": "现代",
        "translation": "群鹿呦呦鸣叫，在原野上吃着苹草。我有贵客到来，弹瑟吹笙来欢迎。",
        "note": "⑴呦呦——鹿鸣声。⑵苹——植物名。⑶嘉宾——贵客。"
    },
    {
        "classic_title": "诗经",
        "chapter": "清庙",
        "verse": "1",
        "scripture_content": "於穆清庙，肃雍显相。济济多士，秉文之德。",
        "commentator": "周振甫",
        "commentary_title": "诗经译注",
        "dynasty": "现代",
        "translation": "啊，清静的宗庙多么庄严，恭敬而和顺的助祭者仪容端庄。众多的官吏，都遵循着文王的德行。",
        "note": "⑴於穆——赞叹词，美好庄严肃穆。⑵清庙——清静的宗庙。⑶肃雍——恭敬而和顺。⑷济济——众多。⑸秉文之德——遵循文王的德行。"
    },
    {
        "classic_title": "诗经",
        "chapter": "鲁颂·駉",
        "verse": "25",
        "scripture_content": "思无邪，思马斯徂。",
        "commentator": "周振甫",
        "commentary_title": "诗经译注",
        "dynasty": "现代",
        "translation": "思想纯正，马儿就这样向前奔跑。",
        "note": "⑴思无邪——思想纯正。⑵马斯徂——马儿向前跑。"
    },
    {
        "classic_title": "诗经",
        "chapter": "秦风",
        "verse": "10",
        "scripture_content": "蒹葭苍苍，白露为霜。所谓伊人，在水一方。",
        "commentator": "周振甫",
        "commentary_title": "诗经译注",
        "dynasty": "现代",
        "translation": "芦苇苍青一片，露水凝成了霜。我所怀念的人，就在河水的那一边。",
        "note": "⑴蒹葭——芦苇。⑵苍苍——青苍色。⑶白露为霜——露水凝成霜。⑷伊人——那人。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "在明明德",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "在于彰显自身光明的德行",
        "note": "谓显明其至德也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "在止于至善",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "在于使言行达到并停留在至善的境界",
        "note": "止，犹自处也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "虑而后能得",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "思虑周详，然后才能有所收获",
        "note": "得，谓得事之宜也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "致知在格物",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "获得真知在于推究事物的原理",
        "note": "知，谓知善恶吉凶之所终始也。○其知如字，徐音智，下“致知”同。格，来也。物，犹事也。其知于善深则来善物，其知于恶深则来恶物，言事缘人所好来也。此“致”或为“至”。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "壹是皆以修身为本",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "一律都应以修养自身为根本",
        "note": "壹是，专行是也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "此之谓自谦",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "这就叫做自我满足、心安理得",
        "note": "谦，读为慊，慊之言厌也。厌，读为黡，黡，闭藏貌也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "其严乎",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "这是多么严厉啊",
        "note": "严乎，言可畏敬也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "心广体胖",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "心胸宽广则身体安泰舒坦",
        "note": "胖，犹大也。三者，言有实于内，显见于外。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "瞻彼淇澳，菉竹猗猗。有斐君子，如切如磋，如琢如磨。瑟兮僩兮，赫兮喧兮。有斐君子，终不可諠兮",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "看那淇水弯曲处，绿竹多么茂盛。有位文采斐然的君子，如同切制骨器一样钻研学问，如同磋磨象牙一样修养自身；如同雕琢美玉一样磨砺品格，如同打磨石头一样打磨心性。他庄重而威严，他显赫而光明。这位文采斐然的君子，让人永远无法忘记。",
        "note": "此“心广体胖”之诗也。澳，隈崖也。“菉竹猗猗”，喻美盛。斐，有文章貌也。諠，忘也。道犹言也。恂，字或作“峻”，读如严峻之“峻”，言其容貌严栗也。民不能忘，以其意诚而德著也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "如切如磋者，道学也",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "“如切如磋”说的是学问的精进",
        "note": "道犹言也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "瑟兮僩兮者，恂栗也",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "“瑟兮僩兮”说的是内心恭敬严谨",
        "note": "恂，字或作“峻”，读如严峻之“峻”，言其容貌严栗也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "有斐君子，终不可諠兮者，道盛德至善，民之不能忘也",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "“有斐君子，终不可諠兮”说的是德行达到至善，民众无法忘记他",
        "note": "民不能忘，以其意诚而德著也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "於戏前王不忘",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "啊，前代的君王令人难忘",
        "note": "圣人既有亲贤之德，其政又有乐利于民。君子小人，各有以思之。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "克明德",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "能够彰显光明德行",
        "note": "皆自明明德也。克，能也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "顾諟天之明命",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "要念念不忘上天赋予的光明使命",
        "note": "顾，念也。諟，犹正也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "克明峻德",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "能够彰显崇高的德行",
        "note": "峻，大也。諟，或为“题”。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "皆自明也",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "这些都是说要自己彰显光明德行",
        "note": "皆自明明德也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "苟日新，日日新，又日新",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "如果一天能够自新，就应天天自新，每日不断自新",
        "note": "盘铭，刻戒于盘也。极，犹尽也。君子日新其德，常尽心力不有余也。○盘，步干反。铭，徐音冥，亡丁反。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "君子无所不用其极",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "所以君子无处不竭尽心力以求至善",
        "note": "极，犹尽也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "缗蛮黄鸟，止于丘隅",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "那鸣叫的黄鸟，栖息在山丘的一角",
        "note": "于止，于鸟之所止也。就而观之，知其所止，知鸟择岑蔚安闲而止处之耳，言人亦当择礼义乐土而自止处也。《论语》曰：“里仁为美。择不处仁，焉得知？”○缗蛮，音绵，一音亡取反，《毛诗》作“緜”，传云：“緜蛮，小鸟貌。”"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "穆穆文王，于缉熙敬止",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "端庄深沉的文王啊，他的光明德行持续不断，恭敬地安守其位",
        "note": "缉熙，光明也。此美文王之德光明，敬其所以自止处。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "无情者不得尽其辞",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "让隐瞒实情的人不敢尽情编造谎言",
        "note": "情，犹实也。无实者多虚诞之辞。圣人之听讼，与人同耳。必使民无实者不敢尽其辞，大畏其心志，使诚其意不敢讼。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "大畏民志",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "使民众内心深深敬畏",
        "note": "本，谓诚其意也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "此谓知本",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "这就叫做知道根本",
        "note": "本，谓诚其意也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "身有所忿懥",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "如果内心有所愤怒",
        "note": "懥，怒貌也，或作“懫”，或为“疐”。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人之其所亲爱而辟焉",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "人们对于自己所亲近喜爱的人往往有偏袒",
        "note": "之，适也。譬，犹喻也。言适彼而以心度之，曰：吾何以亲爱此人，非以其有德美与？吾何以敖惰此人，非以其志行薄与？反以喻己，则身修与否，可自知也。鲜，罕也。人莫知其子之恶，犹爱而不察。硕，大也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "天下鲜矣",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "天下这样的人是很少的",
        "note": "鲜，罕也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人莫知其子之恶",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "没有人会知道自己孩子的缺点",
        "note": "人莫知其子之恶，犹爱而不察。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "莫知其苗之硕",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "没有人会满足于自己禾苗的茁壮",
        "note": "硕，大也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "如保赤子",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "爱护民众如同爱护初生的婴儿",
        "note": "养子者，推心为之，而中于赤子之嗜欲也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "一家仁，一国兴仁；一家让，一国兴让；一人贪戾，一国作乱",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "君主一家讲求仁爱，一国就会兴起仁爱之风；一家讲求礼让，一国就会兴起礼让之风；君主一人贪婪暴戾，一国就会随之动乱",
        "note": "一家、一人，谓人君也。“戾”之言“利”也。机，发动所由也。偾，犹覆败也。《春秋传》曰：“登戾之。”又曰：“郑伯之车偿于济。”戾，或为“吝”。偾，或为“犇”。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "其机如此",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "事情的关键就是这样",
        "note": "机，发动所由也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "此谓一言偾事",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "这就叫做一句话可以败坏大事",
        "note": "偾，犹覆败也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "有诸己而后求诸人",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "自己先有善行，然后才能要求别人行善",
        "note": "有于己，谓有仁让也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "无诸己而后非诸人",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "自己先没有恶行，然后才能纠正别人的恶行",
        "note": "无于己，谓无贪戾也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "桃之夭夭，其叶蓁蓁。之子于归，宜其家人",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "桃花开得娇艳，桃叶长得茂盛。这位女子出嫁了，一定能使家庭和睦",
        "note": "夭夭、蓁蓁，美盛貌。“之子”者，是子也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "上老老而民兴孝，上长长而民兴弟，上恤孤而民不倍",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "在上位的人尊敬老人，民众就会兴起孝敬之风；在上位的人敬重长辈，民众就会兴起敬长之风；在上位的人体恤孤儿，民众就不会背弃道义",
        "note": "老老、长长，谓尊老敬长也。恤，忧也。民不倍，不相倍弃也。絜，犹结也，挈也。矩，法也。君子有挈法之道，谓常执而行之，动作不失之。倍，或作“俏”。矩，或作“巨”。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "是以君子有絜矩之道也",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "所以君子有以身作则、推己及人的絜矩之道",
        "note": "絜，犹结也，挈也。矩，法也。君子有挈法之道，谓常执而行之，动作不失之。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "所恶于上，毋以使下；所恶于下，毋以事上；所恶于前，毋以先后；所恶于后，毋以从前；所恶于右，毋以交于左；所恶于左，毋以交于右",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "厌恶上级对待你的方式，就不要用同样的方式对待下属；厌恶下属对待你的方式，就不要用同样的方式侍奉上级；厌恶前面的人对待你的方式，就不要用同样的方式对待后面的人；厌恶后面的人对待你的方式，就不要用同样的方式对待前面的人；厌恶右边的人对待你的方式，就不要用同样的方式对待左边的人；厌恶左边的人对待你的方式，就不要用同样的方式对待右边的人",
        "note": "絜矩之道，善持其所有，以恕于人耳。治国之要尽于此。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "乐只君子，民之父母",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "和乐的君子，是民众的父母",
        "note": "言治民之道无他，取于己而已。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "节彼南山，维石岩岩。赫赫师尹，民具尔瞻",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "那座高峻的南山，岩石层层叠叠。权势显赫的太师尹氏，民众都仰望着你",
        "note": "岩岩，喻师尹之高严也。师尹，天子之大臣，为政者也。言民皆视其所行而则之，可不慎其德乎？邪辟失道，则有大刑。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "辟则为天下僇矣",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "若行为偏邪，就会被天下人所诛讨",
        "note": "邪辟失道，则有大刑。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "殷之未丧师，克配上帝。仪监于殷，峻命不易",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "殷朝在未丧失民心时，德行还能配得上天帝。应当以殷朝为借鉴，知道保有天命很不容易",
        "note": "师，众也。克，能也。峻，大也。言殷王帝乙以上，未失其民之时，德亦有能配天者，谓天享其祭祀也。及纣为恶，而民怨神怒，以失天下。监视殷时之事，天之大命，持之诚不易也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "道得众则得国，失众则失国",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "得民心就能得国家，失民心就会失国家",
        "note": "道，犹言也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "外本内末，争民施夺",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "如果本末倒置，疏远德行而亲近财富，就会与民争利、施行掠夺",
        "note": "施夺，施其劫夺之情也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "言悖而出者，亦悖而入；货悖而入者，亦悖而出",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "言语若违背道理说出，也会被用违背道理的话回敬；财富若违背道义聚敛而来，也会以违背道义的方式散失出去",
        "note": "悖，犹逆也。言君有逆命，则民有逆辞也。上贪于利，则下人侵畔。《老子》曰：“多藏必厚亡。”"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "惟命不于常",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "天命不是永恒不变的",
        "note": "于，于也。天命不于常，言不专祐一家也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "楚国无以为宝，惟善以为宝",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "楚国没有什么宝贝，只把善人当作宝贝",
        "note": "《楚书》，楚昭王时书也。言以善人为宝。时谓观射父、昭奚恤也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "亡人无以为宝，仁亲以为宝",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "流亡的人没有什么宝贝，只把仁爱亲情当作宝贝",
        "note": "舅犯，晋文公之舅狐偃也。亡人，谓文公也，时避骊姬之谗，亡在翟。而献公薨，秦穆公使子显吊，因劝之复国，舅犯为之对此辞也。仁亲，犹言亲爱仁道也。明不因丧规利也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "若有一个臣，断断兮无他技",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "如果有这样一位耿介的臣子，诚朴专一，没有别的技能",
        "note": "《秦誓》，《尚书》篇名也。秦穆公伐郑，为晋所败于殽，还誓其群臣，而作此篇也。断断，诚一之貌也。他技，异端之技也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人之有技，若己有之",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "看到别人有才能，就像自己有一样高兴",
        "note": "有技，才艺之技也。若己有之，不啻若自其口出，皆乐人有善之甚也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人之彦圣，其心好之，不啻若自其口出",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "看到别人品德高尚、智慧通达，从心底里喜欢，不只是口头上称赞",
        "note": "美士为彦。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "以能保我子孙黎民",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "用这样的人保护我的子孙百姓",
        "note": "黎，众也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "尚亦有利哉",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "是多么有利啊",
        "note": "尚，庶几也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人之有技，媢嫉以恶之",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "如果别人有才能，就嫉妒厌恶",
        "note": "媢，妒也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人之彦圣，而违之俾不通",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "别人品德高尚、智慧通达，就压制排挤、使其不被重用",
        "note": "违，犹戾也。俾，使也。佛戾贤人所高，使功不通于君也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "亦曰殆哉",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "国家就危险了",
        "note": "殆，危也。彦，或作“盘”。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "唯仁人放流之，迸诸四夷，不与同中国",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "只有仁德的人，才会把这种嫉贤妒能的人流放驱逐到边远蛮荒之地，不让他们与贤德之人同住中原",
        "note": "放去恶人媢嫉之类者，独仁人能之，如舜放四罪而天下咸服。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "见贤而不能举，举而不能先，命也",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "发现了贤才却不能举荐，举荐了却不能让他处在自己前面，这是怠慢",
        "note": "命，读为“慢”，声之误也。举贤而不能使君以先己，是轻慢于举人也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "好人之所恶，恶人之所好，是谓拂人之性",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "喜欢众人所厌恶的，厌恶众人所喜欢的，这就叫做违背人的本性",
        "note": "拂，犹佹也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "菑必逮夫身",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "灾祸必定会降临到身上",
        "note": "逮，及也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "君子有大道",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "君子有一条根本的大道",
        "note": "道，行所由。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "生财有大道，生之者众，食之者寡，为之者疾，用之者舒，则财恒足矣",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "创造财富也有根本的大道：生产的人多，消费的人少；劳作的人勤快，使用的人节省。这样财富就会经常充足",
        "note": "是不务禄不肖，而勉民以农也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "仁者以财发身，不仁者以身发财",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "仁德的人运用财富来发展自身德行，不仁的人耗尽心力去聚敛财富",
        "note": "发，起也。言仁人有财，则务于施与以起身，成其令名。不仁之人有身，贪于聚敛以起财，务成富。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "未有上好仁而下不好义者也，未有好义其事不终者也，未有府库财非其财者也",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "从来没有在上位的人喜好仁德，而在下位的人却不喜好道义的；从来没有喜好道义的人，做事情会半途而废的；从来没有这样的君主，府库里的财物最终不是归他所有的",
        "note": "言君行仁道，则其臣必义。以义举事无不成者，其为诚然，如己府库之财为己有也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "畜马乘不察于鸡豚",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "家里能养得起四匹马拉车的士大夫，就不该再去计较养鸡养猪的小利",
        "note": "孟献子，鲁大夫仲孙蔑也。畜马乘，谓以士初试为大夫也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "伐冰之家不畜牛羊",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "丧祭能用冰的卿大夫之家，就不该再畜养牛羊来牟利",
        "note": "伐冰之家，卿、大夫以上，丧、祭用冰。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "百乘之家不畜聚敛之臣",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "拥有百辆兵车的诸侯之家，就不该再养着搜刮民财的家臣",
        "note": "百乘之家，有采地者也。鸡豚、牛羊，民之所畜养以为财利者也。国家利义不利财，盗臣损财耳，聚敛之臣乃损义。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "与其有聚敛之臣，宁有盗臣",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "与其有搜刮民财的家臣，宁可有盗窃府库的家臣",
        "note": "同上"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "长国家而务财用者，必自小人矣",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "执掌国家却一心聚敛财富的，必定是从任用小人开始的",
        "note": "言务聚财为己用者，必忘义，是小人所为也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "彼为善之",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "君主想要施行善政",
        "note": "彼，君也。君将欲以仁义善其政，而使小人治其国家之事，患难猥至。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "虽有善者，亦无如之何矣",
        "commentator": "郑玄",
        "commentary_title": "礼记注",
        "dynasty": "东汉",
        "translation": "即使有贤能的人，也没有办法挽救了",
        "note": "虽云有善，不能救之，以其恶之已著也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "大学之道",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "案郑《目录》云：“名曰《大学》者，以其记博学，可以为政也。此於《别录》属《通论》。”此《大学》之篇，论学成之事，能治其国，章明其德於天下，却本明德所由，先从诚意为始。",
        "note": ""
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "在明明德",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "在於章明己之光明之德。谓身有明德，而更章显之，此其一也。",
        "note": "谓显明其至德也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "在亲民",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "在於亲爱於民，是其二也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "在止于至善",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "在止处於至善之行，此其三也。言大学之道，在於此三事矣。",
        "note": "止，犹自处也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "知止而后有定",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "更覆说“止於至善”之事。既知“止於至善”，而后心能有定，不有差贰也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "定而后能静",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "心定无欲改，能静不躁求也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "静而后能安",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "以静故情性安和也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "安而后能虑",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "情既安和，能思虑於事也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "虑而后能得",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "既能思虑，然后於事得安也。",
        "note": "得，谓得事之宜也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "物有本末",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "若於事得宜，而天下万物有本有末，经营百事有终有始也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "事有终始",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "同上"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "知所先后",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "既能如此，天下百事万物，皆识知其先后也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "则近道矣",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "若能行此诸事，则附近於大道矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "古之欲明明德于天下者",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "前章言大学之道在明德、亲民、止善，覆说止善之事既毕，故此经明明德之理。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "先治其国",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此以积学能为明德盛极之事，以渐到。今本其初，故言欲章明己之明德，使遍於天下者，先须能治其国。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "欲治其国者，先齐其家",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言若欲齐家，先须脩身也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "欲修其身者，先正其心",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言若欲脩身，必先正其心也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "欲正其心者，先诚其意",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "总包万虑谓之为心，情所意念谓之意。若欲正其心使无倾邪，必须先至诚，在於忆念也。若能诚实其意，则心不倾邪也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "欲诚其意者，先致其知",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言欲精诚其己意，先须招致其所知之事，言初始必须学习，然后乃能有所知晓其成败。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "致知在格物",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言若能学习招致所知。格，来也。己有所知，则能在于来物。若知善深则来善物，知恶深则来恶物。言善事随人行善而来应之，恶事随人行恶亦来应之。言善恶之来缘人所好也。",
        "note": "知，谓知善恶吉凶之所终始也。○其知如字，徐音智，下“致知”同。格，来也。物，犹事也。其知於善深则来善物，其知於恶深则来恶物，言事缘人所好来也。此“致”或为“至”。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "物格而后知至",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "物既来，则知其善恶所至。善事来，则知其至于善；若恶事来，则知其至于恶。既能知至，则行善不行恶也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "知至而后意诚",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "既能知至，则意念精诚也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "意诚而后心正",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "意能精诚，故能心正也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "国治而后天下平",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "则上“明明德于天下”，是以自天子至庶人皆然也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "壹是皆以修身为本",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言上从天子，下至庶人，贵贱虽异，所行此者专一，以修身为本。上言诚意、正心、齐家、治国，今此独云“修身为本”者，细别虽异，其大略皆是修身也。",
        "note": "壹是，专行是也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "其本乱而末治者否矣",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "本乱，谓身不修也。末治，谓国家治也。言己身既不修，而望家国治者否矣。否，不也。言不有此事也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "其所厚者薄，而其所薄者厚，未之有也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此覆说“本乱而末治否矣”之事也。譬若与人交接，应须敦厚以加于人。今所厚之处，乃以轻薄，谓以轻薄待彼人也。“其所薄者厚”，谓己既与彼轻薄，欲望所薄之处以厚重报己，未有此事也。言己以厚施人，人亦厚以报己也。若己轻薄施人，人亦轻薄报己，言事厚之与薄皆以身为本也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "此谓知本",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "本，谓身也。既以身为本，若能自知其身，是“知本”也，是知之至极也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "此之谓自谦",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谦，读如“慊”。慊然，安静之貌。心虽好恶而口不言，应自然安静也。",
        "note": "谦，读为慊，慊之言厌也。厌，读为黡，黡，闭藏貌也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "此谓诚于中，形于外",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言此小人既怀诚实恶事於中心，必形见於外，不可揜藏。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "其严乎",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "既视者及指者皆众，其所畏敬，可严惮乎！",
        "note": "严乎，言可畏敬也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "心广体胖",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言内心宽广，则外体胖大。言为之于中，必形见于外也。",
        "note": "胖，犹大也。三者，言有实于内，显见于外。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "瞻彼淇澳，菉竹猗猗。有斐君子，如切如磋，如琢如磨。瑟兮僩兮，赫兮喧兮。有斐君子，终不可諠兮",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《诗·卫风·淇奥》之篇，卫人美武公之德也。澳，隈也。菉，王刍也。竹，萹竹也。视彼淇水之隈曲之内，生此菉之与竹，猗猗然而茂盛，以淇水浸润故也。言视彼卫朝之内，上有武公之身，道德茂盛，亦蒙康叔之余烈故也。引之者，证诚意之道。“有斐君子”者，有斐然文章之君子，学问之益矣。“如切如磋”者，如骨之切，如象之磋，又能自修也。“如琢如磨”者，如玉之琢，如石之磨也。“瑟兮僩兮，赫兮喧兮。有斐君子，终不可諠兮”，又瑟然颜色矜庄，僩然性行宽大，赫然颜色盛美，喧然威仪宣着。斐然文章之君子，民皆爱念之，终久不可忘也。諠，忘也。自此以上，《诗》之本文也。",
        "note": "此“心广体胖”之诗也。澳，隈崖也。“菉竹猗猗”，喻美盛。斐，有文章貌也。諠，忘也。道犹言也。恂，字或作“峻”，读如严峻之“峻”，言其容貌严栗也。民不能忘，以其意诚而德著也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "如切如磋者，道学也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "论道其学矣。言初习谓之学。",
        "note": "道犹言也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "如琢如磨者，自修也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓自修饰矣。重习谓之修，亦谓《诗》本文互而相通也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "瑟兮僩兮者，恂栗也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "恂，读为“峻”，言颜色严峻战栗也。",
        "note": "恂，字或作“峻”，读如严峻之“峻”，言其容貌严栗也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "有斐君子，终不可諠兮者，道盛德至善，民之不能忘也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "论道武公盛德至极美善，人之爱念，不能忘也。",
        "note": "民不能忘，以其意诚而德著也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "於戏前王不忘",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《周颂·烈文》之篇也，美武王之诗。“於戏”，犹言“呜呼”矣。以文王、武王意诚于天下，故诗人叹美之，云此前世之王，其德不可忘也。",
        "note": "圣人既有亲贤之德，其政又有乐利於民。君子小人，各有以思之。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "君子贤其贤而亲其亲",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言后世贵重之。言君子皆美此前王能贤其贤人而亲其族亲也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "小人乐其乐而利其利",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言后世卑贱小人，美此前王能爱乐其所乐，谓民之所乐者前王亦爱乐之；利其利者，能利益其人之所利，民为利者，前王亦利益之。言前王施为政教，下顺人情，不夺人之所乐利之事。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "此以没世不忘也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "由前王意能精诚，垂于后世，故君子小人皆所美念。以此之故，终没于世，其德不忘也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "克明德",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此一经广明意诚则能明己之德。周公封康叔而作《康诰》，戒康叔能明用有德。此《记》之意，言周公戒康叔以自明其德，与《尚书》异也。",
        "note": "皆自明明德也。克，能也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "顾諟天之明命",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "顾，念也。諟，正也。伊尹戒大甲云：尔为君，当顾念奉正天之显明之命，不邪僻也。",
        "note": "顾，念也。諟，犹正也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "克明峻德",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "《帝典》，谓《尧典》之篇。峻，大也。《尚书》之意，言尧能明用贤俊之德。此《记》之意，言尧能自明大德也。",
        "note": "峻，大也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "皆自明也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此经所云《康诰》、《大甲》、《帝典》等之文，皆是人君自明其德也，故云“皆自明也”。",
        "note": "皆自明明德也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "苟日新，日日新，又日新",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "汤沐浴之盘而刻铭为戒。必于沐浴之盘者，戒之甚也。“苟日新”者，此《盘铭》辞也。非唯洗沐自新，苟，诚也，诚使道德日益新也。“日日新”者，言非唯一日之新，当使日日益新。“又日新”者，言非唯日日益新，又须恒常日新。皆是丁宁之辞也。此谓精诚其意，修德无已也。",
        "note": "盘铭，刻戒于盘也。极，犹尽也。君子日新其德，常尽心力不有余也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "作新民",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "成王既伐管叔、蔡叔，以殷余民封康叔。诰言殷人化纣恶俗，使之变改为新人。此《记》之意，自念其德，为新民也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "周虽旧邦，其命惟新",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《大雅·文王》之篇。其诗之本意，言周虽旧是诸侯之邦，其受天之命，唯为天子而更新也。此《记》之意，其所施教命，唯能念德而自新也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "君子无所不用其极",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "极，尽也。言君子欲日新其德，无处不用其心尽力也。言自新之道，唯在尽其心力，更无余行也。",
        "note": "极，犹尽也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "邦畿千里，惟民所止",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《商颂·玄鸟》之篇，言殷之邦畿方千里，唯人所居止。此《记》断章，喻其民人而择所止，言人君贤则来也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "缗蛮黄鸟，止于丘隅",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《诗·小雅·缗蛮》之篇，刺幽王之诗。言缗蛮然微小之黄鸟，止在于岑蔚丘隅之处，得其所止。以言微小之臣依托大臣，亦得其所也。",
        "note": "于止，于鸟之所止也。就而观之，知其所止，知鸟择岑蔚安闲而止处之耳，言人亦当择礼义乐土而自止处也。《论语》曰：“里仁为美。择不处仁，焉得知？”"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "于止，知其所止，可以人而不如鸟乎",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "孔子见其诗文而论之云：是观于鸟之所止，则人亦知其所止。鸟之知在岑蔚安闲之处，则知人亦择礼义乐土之处而居止也。岂可以人不择止处，不如鸟乎？言不可不如鸟也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "穆穆文王，于缉熙敬止",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《大雅·文王》之篇，美文王之诗。缉熙，谓光明也。止，辞也。诗之本意云，文王见此光明之人则恭敬之。此《记》之意，“于缉熙”，言呜呼！文王之德，缉熙光明，又能敬其所止，以自居处也。",
        "note": "缉熙，光明也。此美文王之德光明，敬其所以自止处。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "无情者不得尽其辞",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "情，实也。言无实情虚诞之人无道理者，不得尽竭其虚伪之辞也。",
        "note": "情，犹实也。无实者多虚诞之辞。圣人之听讼，与人同耳。必使民无实者不敢尽其辞，大畏其心志，使诚其意不敢讼。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "大畏民志",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "大能畏胁民人之志。言人有虚诞之志者，皆畏惧不敢讼。言民亦诚实其意也。",
        "note": "本，谓诚其意也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "此谓知本",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此从上“所谓诚意”以下言此“大畏民志”以上，皆是诚意之事。意为行本，既精诚其意，是晓知其本，故云“此谓知本”也。",
        "note": "本，谓诚其意也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "心不在焉，视而不见，听而不闻，食而不知其味",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此言修身之本，必在正心。若心之不正，身亦不修。若心之不在，视、听与食不觉知也。是心为身本，修身必在正于心也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人之其所亲爱而辟焉",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "之，犹适也。此言修身之譬也。设我适彼人，见彼有德，则为我所亲爱，当反自譬喻于我也。以彼有德，故为我所亲爱，则我若自修身有德，必然亦能使众人亲爱于我也。",
        "note": "之，适也。譬，犹喻也。言适彼而以心度之，曰：吾何以亲爱此人，非以其有德美与？吾何以敖惰此人，非以其志行薄与？反以喻己，则身修与否，可自知也。鲜，罕也。人莫知其子之恶，犹爱而不察。硕，大也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "之其所贱恶而辟焉",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "又言我往之彼，而贱恶彼人者，必是彼人无德故也。亦当回以譬我，我若无德，则人亦贱恶我也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "之其所畏敬而辟焉",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "又我往之彼，而畏敬彼人，必是彼人庄严故也。亦回其譬我，我亦当庄敬，则人亦必畏敬我。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "之其所哀矜而辟焉",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "又我往之彼，而哀矜彼人，必是彼人有慈善柔弱之德故也。亦回譬我，我有慈善而或柔弱，则亦为人所哀矜也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "之其所敖惰而辟焉",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "又我往之彼，而敖惰彼人，必是彼人邪僻故也。亦回譬我，我若邪僻，则人亦敖惰于我也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "故好而知其恶，恶而知其美者，天下鲜矣",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "知，识也。鲜，少也。人心多偏。若心爱好之，而多不知其恶；若嫌恶之，而多不知其美。今虽爱好，知彼有恶事；虽憎恶，知彼有美善。天下之内，如此者少矣。",
        "note": "鲜，罕也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人莫知其子之恶",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言人之爱子，其意至甚，子虽有恶，不自觉知，犹好而不知其恶也。",
        "note": "人莫知其子之恶，犹爱而不察。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "莫知其苗之硕",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "硕，犹大也。农夫种田，恒欲其盛，苗虽硕大，犹嫌其恶，以贪心过甚，故不知其苗之硕。若能以己子而方他子，己苗而匹他苗，则好恶可知。",
        "note": "硕，大也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "所谓治国必先齐其家者，其家不可教而能教人者无之",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此一节覆明前经治国齐家之事。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "如保赤子",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此成王命康叔之辞。赤子，谓心所爱之子。言治民之时，如保爱赤子。爱之甚也。",
        "note": "养子者，推心为之，而中于赤子之嗜欲也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "心诚求之，虽不中，不远矣",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言爱此赤子，内心精诚，求赤子之嗜欲，虽不能正中其所欲，去其所嗜欲其不甚远。言近其赤子之嗜欲。为治人之道，亦当如此也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "未有学养子而后嫁者也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言母之养子，自然而爱，中当赤子之嗜欲，非由学习而来，故云“未有学养子而后嫁”者。此皆本心而为之。言皆喻人君也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "一家仁，一国兴仁；一家让，一国兴让",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言人君行善于家，则外人化之，故一家一国皆仁让也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "一人贪戾，一国作乱",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓人君一人贪戾恶事，则一国学之作乱。",
        "note": "“戾”之言“利”也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "其机如此",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "机，谓关机也。动于近，成于远。善恶之事，亦发于身而及于一国也。",
        "note": "机，发动所由也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "此谓一言偾事",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "偾，犹覆败也。谓人君一言覆败其事，谓恶言也。",
        "note": "偾，犹覆败也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "一人定国",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓由人君一人能定其国，谓善政也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "其所令反其所好，而民不从",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "令，谓君所号令之事。若各随其行之所好，则人从之。其所好者是恶，所令者是善，则所令之事反其所好，虽欲以令禁人，人不从也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "是故君子有诸己而后求诸人",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "诸，于也。谓君子有善行于己，而后可以求于人使行善行也。谓于己有仁让，而后可求于人之仁让也。",
        "note": "有于己，谓有仁让也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "无诸己而后非诸人",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓无恶行于己，而后可以非责于人为恶行也。谓无贪利之事于己，而后非责于人也。",
        "note": "无于己，谓无贪戾也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "所藏乎身不恕，而能喻诸人者，未之有也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓所藏积于身既不恕实，而能晓喻于人使从己者，未之有也。言无善行于身，欲晓喻于人为善行，不可得也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "桃之夭夭，其叶蓁蓁。之子于归，宜其家人",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《周南·桃夭》之篇，论昏姻及时之事。言桃之夭夭少壮，其叶蓁蓁茂盛，喻妇人形体少壮，颜色茂盛之时，似“桃之夭夭”也。“之子于归，宜其家人”者，之子者，是子也。归，嫁也。宜可以为夫家之人。引之者，取宜其家人之事。",
        "note": "夭夭、蓁蓁，美盛貌。“之子”者，是子也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "宜兄宜弟",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《小雅·蓼萧》之篇，美成王之诗。诗之本文，言成王有德，宜为人兄，宜为人弟。此《记》之意，“宜兄宜弟”，谓自与兄弟相善相宜也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "其仪不忒，正是四国",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《曹风·鸤鸠》之篇。忒，差也。正，长也。言在位之君子，威仪不有差忒，可以正长是四方之国。言可法则也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "其为父子兄弟足法，而后民法之也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓其修德于家，在室家之内，使父子兄弟足可方法，而后民皆法之也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "上恤孤而民不倍",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "孤弱之子，人所遗弃，在上君长，若能忧恤孤弱不遗，则下民学之，不相弃倍也。",
        "note": "恤，忧也。民不倍，不相倍弃也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "是以君子有絜矩之道也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "絜，犹结也。矩，法也。言君子有执结持矩法之道，动而无失，以此加物，物皆从之也。",
        "note": "絜，犹结也，挈也。矩，法也。君子有挈法之道，谓常执而行之，动作不失之。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "所恶于上，毋以使下；所恶于下，毋以事上；所恶于前，毋以先后；所恶于后，毋以从前；所恶于右，毋以交于左；所恶于左，毋以交于右",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此以下皆是絜矩之道也。譬诸侯有天子为上，上有不善之事加己，己恶之，则不可回持此恶事使己下者为之也。言臣下不善事己，己所有恶，则己不可持此恶事回以事己之君上也。前，谓在己之前不以善事施己，己所憎恶，则无以持此恶事施于后人也。后，谓在己之后不以善事施己，己则无以恶事施于前行之人也。谓与己平敌，或在己右，或在己左，若右以恶加己，己所憎恶，则无以此恶事施于左人也。举此一隅，余可知也。",
        "note": "絜矩之道，善持其所有，以恕于人耳。治国之要尽于此。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "乐只君子，民之父母",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《小雅・南山有台》之篇，美成王之诗也。只，辞也。言能以己化民，从民所欲，则可为民父母矣。",
        "note": "言治民之道无他，取于己而已。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "民之所好好之，民之所恶恶之",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓善政恩惠，是民之愿好，己亦好之，以施于民。若“发仓廪，赐贫穷，赈乏绝”是也。谓苛政重赋，是人之所恶，己亦恶之而不行也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "节彼南山，维石岩岩。赫赫师尹，民具尔瞻",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《小雅・节南山》之篇，刺幽王之诗。言幽王所任大臣，非其贤人也。节然高峻者，是彼南山，维积累其石，岩岩然高大。喻幽王大臣师尹之尊严。“赫赫师尹，民具尔瞻”者，赫赫，显盛貌。是大师与人为则者。具，俱也。尔，汝也。在下之民，俱于汝而瞻视之。言皆视师尹而为法。此《记》之意，以喻人君在上，民皆则之，不可不慎。",
        "note": "岩岩，喻师尹之高严也。师尹，天子之大臣，为政者也。言民皆视其所行而则之，可不慎其德乎？邪辟失道，则有大刑。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "辟则为天下僇矣",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "僇，谓刑僇也。君若邪辟，则为天下之民共所诛讨，若桀、纣是也。",
        "note": "邪辟失道，则有大刑。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "殷之未丧师，克配上帝。仪监于殷，峻命不易",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此《大雅・文王》之篇，美文王之诗，因以戒成王也。克，能也。师，众也。言殷自纣父帝乙之前，未丧师众之时，所行政教，皆能配上天而行也。“仪监于殷，峻命不易”者，仪，宜也。监，视也。今成王宜监视于殷之存亡。峻，大也。奉此天之大命，诚为不易，言其难也。",
        "note": "师，众也。克，能也。峻，大也。言殷王帝乙以上，未失其民之时，德亦有能配天者，谓天享其祭祀也。及纣为恶，而民怨神怒，以失天下。监视殷时之事，天之大命，持之诚不易也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "道得众则得国，失众则失国",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "道，犹言也。《诗》所云者，言帝乙以上得众则得国，言殷纣失众则失国也。",
        "note": "道，犹言也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "有德此有人",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "有德之人，人之所附从。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "有人此有土",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "有人则境土宽大。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "有土此有财",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "有土则生植万物，故有财也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "有财此有用",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "有财丰，以此而有供国用也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "德者本也，财者末也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "德能致财，财由德有，故德为本，财为末也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "外本内末，争民施夺",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "外，疏也。内，亲也。施夺，谓施其劫夺之情也。君若亲财而疏德，则争利之人皆施劫夺之情也。",
        "note": "施夺，施其劫夺之情也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "财聚则民散，财散则民聚",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "事不两兴，财由民立。君若重财而轻民，则民散也；若散财而赒恤于民，则民咸归聚也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "言悖而出者，亦悖而入",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "悖，逆也。若人君政教之言，悖逆人心而出行者，则民悖逆君上而入以报答也。谓拒违君命也。",
        "note": "悖，犹逆也。言君有逆命，则民有逆辞也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "货悖而入者，亦悖而出",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "若人君厚敛财货，悖逆民心而入积聚者，不能久，如人畔于上，财亦悖逆君心而散出也。言众畔亲离，财散非君有也。",
        "note": "上贪于利，则下人侵畔。《老子》曰：“多藏必厚亡。”"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "惟命不于常",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓天之命不于是常住在一家也。道善则得之，不善则失之矣。《书》之本意，言道为善则得之，不善则失之，是不常在一家也。",
        "note": "于，于也。天命不于常，言不专祐一家也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "楚国无以为宝，惟善以为宝",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "案《楚语》云：“楚昭王使王孙圉聘于晋，定公飨之，赵简子鸣玉以相，问于王孙圉曰：‘楚之白珩犹在乎？其为宝几何矣？’王孙圉对曰：‘未尝为宝。楚之所宝者曰观射父，能作训辞，以行事于诸侯，使无以寡君为口实。’”又《新序》云：“秦欲伐楚，使者观楚之宝器。楚王命昭奚恤而问焉，对曰：‘宝器在贤臣。’王遂使昭奚恤应之。昭奚恤发精兵三百人，陈于西门之内，为东面之坛一，南面之坛四，西面之坛一。秦使者至，昭奚恤曰：‘君，客也，请就上位东面之坛。’令尹子西南面，大宗子敖次之，叶公子高次之，司马子发次之。昭奚恤自居西面之坛，称曰：‘客欲观楚之宝器乎？楚之所宝者，即贤臣也，唯大国之所观。’秦使无以对也。使归，告秦王曰：‘楚多贤臣，无可以图之。’”引之者，证为君长能保爱善人为宝也。",
        "note": "《楚书》，楚昭王时书也。言以善人为宝。时谓观射父、昭奚恤也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "亡人无以为宝，仁亲以为宝",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此舅犯劝重耳之辞。于时重耳逃亡在翟，秦穆公欲纳之反国，而劝重耳不受秦命，对秦使云：奔亡之人，无以货财为宝，唯亲爱仁道以为宝也。",
        "note": "舅犯，晋文公之舅狐偃也。亡人，谓文公也，时辟骊姬之谗，亡在翟。而献公薨，秦穆公使子显吊，因劝之复国，舅犯为之对此辞也。仁亲，犹言亲爱仁道也。明不因丧规利也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "若有一个臣，断断兮无他技",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "《秦誓》，《尚书》篇名。秦穆公伐郑，为晋败于殽，还归，誓群臣而作此篇，是秦穆公悔过自誓之辞。记者引之，以明好贤去恶也。“若有一介臣，断断兮”者，此秦穆公誓辞。云群臣若有一耿介之臣，断断然诚实专一谨悫。“兮”是语辞。《古文尚书》“兮”为“猗”，言有一介之臣，其心断断猗猗然专一，与此本异。",
        "note": "《秦誓》，《尚书》篇名也。秦穆公伐郑，为晋所败于殽，还誓其群臣，而作此篇也。断断，诚一之貌也。他技，异端之技也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "其心休休焉，其如有容焉",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言此专一之臣，无他奇异之技，惟其心休休然宽容，形貌似有包容。如此之人，我当任用也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人之有技，若己有之",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "云见人有技艺，欲得亲爱之，如己自有也。",
        "note": "有技，才艺之技也。若己有之，不啻若自其口出，皆乐人有善之甚也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人之彦圣，其心好之，不啻若自其口出",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓见人有才，彦美通圣，其心中爱好，不啻如自其口出。心爱此彦圣之美，多于口说，言其爱乐之甚也。",
        "note": "美士为彦。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "寔能容之",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "寔，是也。若能好贤如此，是能有所包容。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "以能保我子孙黎民",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "则我国家得安，保我后世子孙。",
        "note": "黎，众也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "尚亦有利哉",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "尚，庶几也。非直子孙安，其下众人皆庶几亦望有利益哉也。",
        "note": "尚，庶几也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人之有技，媢嫉以恶之",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "媢，妬也。见人有技艺，则掩藏媢妬，疾以憎恶之也。",
        "note": "媢，妬也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "人之彦圣，而违之俾不通",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "见他人之彦圣，而违戾抑退之。俾，使也。使其善功不通达于君。《尚书》“通”为“达”字也。",
        "note": "违，犹戾也。俾，使也。佛戾贤人所高，使功不通于君也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "亦曰殆哉",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "若此蔽贤之人，是不能容纳，家国将亡，不能保我子孙；非唯如此，众人亦曰殆危哉。",
        "note": "殆，危也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "唯仁人放流之，迸诸四夷，不与同中国",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言唯仁人之君能放流此蔽善之人，使迸远在四夷，不与同在中国。若舜流四凶而天下咸服是也。",
        "note": "放去恶人媢嫉之类者，独仁人能之，如舜放四罪而天下咸服。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "见贤而不能举，举而不能先，命也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此谓凡庸小人，见此贤人而不能举进于君；假设举之，又不能使在其己之先，是为慢也。谓轻慢于举人也。",
        "note": "命，读为“慢”，声之误也。举贤而不能使君以先己，是轻慢于举人也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "见不善而不能退，退而不能远，过也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "此谓小人见不善之人而不能抑退之，假令抑退之，而不能使远退之。过者，言是愆过之人也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "好人之所恶，恶人之所好，是谓拂人之性",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "人，谓君子。君子所恶者，凶恶之事，今乃爱好凶恶，是“好人之所恶”也。君子所好，仁义善道。今乃恶此仁义善道，是“恶人之所好”也。若如此者，是谓拂戾善人之性。",
        "note": "拂，犹佹也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "菑必逮夫身",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "逮，及也。如此，菑必及夫身矣。",
        "note": "逮，及也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "君子有大道，必忠信以得之，骄泰以失之",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "大道，谓所由行孝悌仁义之大道也。言此孝悌仁义，必由行忠信以得之，由身骄泰以失之也。",
        "note": "道，行所由。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "生财有大道，生之者众，食之者寡，为之者疾，用之者舒，则财恒足矣",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "生之者众者，谓为农桑多也。食之者寡者，谓减省无用之费也。为之者疾者，谓百姓急营农桑事业也。用之者舒者，谓君上缓于营造费用也。言人君能如此，则国用恒足。",
        "note": "是不务禄不肖，而勉民以农也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "仁者以财发身",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓仁德之君，以财散施，发起身之令名也。",
        "note": "发，起也。言仁人有财，则务于施与以起身，成其令名。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "不仁者以身发财",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言不仁之人，唯在吝啬，务于积聚，劳役其身，发起其财。",
        "note": "不仁之人有身，贪于聚敛以起财，务成富。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "未有上好仁而下不好义者也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言在上人君好以仁道接下，其下感君仁恩，无有不爱好于义，使事皆得其宜也。",
        "note": "言君行仁道，则其臣必义。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "未有好义其事不终者也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言臣下悉皆好义，百事尽能终成，故云“未有好义其事不终”也。言皆能终成也。",
        "note": "以义举事无不成者。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "未有府库财非其财者也",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "又为人君作譬也。君若行仁，民必报义，义必终事，譬如人君有府库之财，必还为所用也，故云“未有府库财非其财者也”。",
        "note": "其为诚然，如己府库之财为己有也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "畜马乘不察于鸡豚",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言察于鸡豚之所利，为畜养马乘，士初试为大夫，不闚察于鸡豚之小利。",
        "note": "畜马乘，谓以士初试为大夫也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "伐冰之家不畜牛羊",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "谓卿大夫丧祭用冰，从固阴之处伐击其冰，以供丧祭，故云“伐冰”也。谓卿大夫为伐冰之家，不畜牛羊为财利。以食禄，不与人争利也。",
        "note": "伐冰之家，卿、大夫以上，丧、祭用冰。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "百乘之家不畜聚敛之臣",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "百乘，谓卿大夫有采地者也。以地方百里，故云“百乘之家”。言卿大夫之家不畜聚敛之臣，使赋税什一之外征求采邑之物也。",
        "note": "百乘之家，有采地者也。鸡豚、牛羊，民之所畜养以为财利者也。国家利义不利财，盗臣损财耳，聚敛之臣乃损义。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "与其有聚敛之臣，宁有盗臣",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "覆解“不畜聚敛之臣”。意若其有聚敛之臣，宁可有盗窃之臣。以盗臣但害财，聚敛之臣则害义也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "长国家而务财用者，必自小人矣",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言为人君长于国家，而务积聚财以为己用者，必自为小人之行也。",
        "note": "言务聚财为己用者，必忘义，是小人所为也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "彼为善之",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "彼，谓君也。君欲为仁义之道，善其政教。“之”，语辞，故云“彼为善之”。",
        "note": "彼，君也。君将欲以仁义善其政，而使小人治其国家之事，患难猥至。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "小人之使为国家，菑害并至",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "言君欲为善，反令小人使为治国家之事，毒害于下，故菑害患难则并皆来至。"
    },
    {
        "classic_title": "礼记",
        "chapter": "大学",
        "verse": null,
        "scripture_content": "虽有善者，亦无如之何矣",
        "commentator": "孔颖达",
        "commentary_title": "礼记正义",
        "dynasty": "唐",
        "translation": "既使小人治国，其君虽有善政，亦无能奈此患难之何。言不能止之，以其恶之已著故也。",
        "note": "虽云有善，不能救之，以其恶之已著也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "大学之道",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "大，旧音泰，今读如字。子程子曰：「大学，孔氏之遗书，而初学入德之门也。」于今可见古人为学次第者，独赖此篇之存，而论、孟次之。学者必由是而学焉，则庶乎其不差矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "在明明德",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "明，明之也。明德者，人之所得乎天，而虚灵不昧，以具众理而应万事者也。但为气禀所拘，人欲所蔽，则有时而昏；然其本体之明，则有未尝息者。故学者当因其所发而遂明之，以复其初也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "在亲民",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "程子曰：「亲，当作新。」新者，革其旧之谓也，言既自明其明德，又当推以及人，使之亦有以去其旧染之污也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "在止于至善",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "止者，必至于是而不迁之意。至善，则事理当然之极也。言明明德、新民，皆当至于至善之地而不迁。盖必其有以尽夫天理之极，而无一毫人欲之私也。此三者，大学之纲领也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "知止而后有定",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "止者，所当止之地，即至善之所在也。知之，则志有定向。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "定而后能静",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "静，谓心不妄动。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "静而后能安",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "安，谓所处而安。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "安而后能虑",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "虑，谓处事精详。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "虑而后能得",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "得，谓得其所止。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "物有本末",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "明德为本，新民为末。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "事有终始",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "知止为始，能得为终。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "知所先后",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "本始所先，末终所后。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "则近道矣",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此结上文两节之意。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "古之欲明明德于天下者",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "明明德于天下者，使天下之人皆有以明其明德也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "先正其心",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "心者，身之所主也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "先诚其意",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诚，实也。意者，心之所发也。实其心之所发，欲其一于善而无自欺也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "先致其知",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "致，推极也。知，犹识也。推极吾之知识，欲其所知无不尽也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "致知在格物",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "格，至也。物，犹事也。穷至事物之理，欲其极处无不到也。此八者，大学之条目也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "物格而后知至",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "物格者，物理之极处无不到也。知至者，吾心之所知无不尽也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "知至而后意诚",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "知既尽，则意可得而实矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "意诚而后心正",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "意既实，则心可得而正矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "心正而后身修",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "修身以上，明明德之事也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "身修而后家齐",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "齐家以下，新民之事也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "国治而后天下平",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "物格知至，则知所止矣。意诚以下，则皆得所止之序也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "壹是皆以修身为本",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "壹是，一切也。正心以上，皆所以修身也。齐家以下，则举此而措之耳。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "其本乱而末治者否矣",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "本，谓身也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "未之有也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此两节结上文两节之意。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第一章",
        "scripture_content": "克明德",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "康诰，周书。克，能也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第一章",
        "scripture_content": "顾諟天之明命",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "大甲，商书。顾，谓常目在之也。諟，犹此也，或曰审也。天之明命，即天之所以与我，而我之所以为德者也。常目在之，则无时不明矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第一章",
        "scripture_content": "克明峻德",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "峻，书作俊。帝典，尧典，虞书。峻，大也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第一章",
        "scripture_content": "皆自明也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "结所引书，皆言自明己德之意。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第二章",
        "scripture_content": "苟日新，日日新，又日新",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "盘，沐浴之盘也。铭，名其器以自警之辞也。苟，诚也。汤以人之洗濯其心以去恶，如沐浴其身以去垢。故铭其盘，言诚能一日有以涤其旧染之污而自新，则当因其已新者，而日日新之，又日新之，不可略有间断也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第二章",
        "scripture_content": "作新民",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "鼓之舞之之谓作，言振起其自新之民也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第二章",
        "scripture_content": "其命惟新",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗大雅文王之篇。言周国虽旧，至于文王，能新其德以及于民，而始受天命也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第二章",
        "scripture_content": "君子无所不用其极",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "自新新民，皆欲止于至善也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "惟民所止",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗商颂玄鸟之篇。邦畿，王者之都也。止，居也，言物各有所当止之处也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "止于丘隅",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗小雅绵蛮之篇。缗蛮，鸟声。丘隅，岑蔚之处。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "可以人而不如鸟乎",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "子曰以下，孔子说诗之辞。言人当知所当止之处也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "于缉熙敬止",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗文王之篇。穆穆，深远之意。于，叹美辞。缉，继续也。熙，光明也。敬止，言其无不敬而安所止也。引此而言圣人之止，无非至善。五者乃其目之大者也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "菉竹猗猗",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗卫风淇澳之篇。淇，水名。澳，隈也。猗猗，美盛貌。兴也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "有斐君子",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "斐，文貌。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "如切如磋",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "切以刀锯，琢以椎凿，皆裁物使成形质也。磋以镴锡，磨以沙石，皆治物使其滑泽也。治骨角者，既切而复磋之。治玉石者，既琢而复磨之。皆言其治之有绪，而益致其精也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "瑟兮僩兮",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "瑟，严密之貌。僩，武毅之貌。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "赫兮喧兮",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "赫喧，宣著盛大之貌。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "终不可諠兮",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "諠，忘也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "道学也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "学，谓讲习讨论之事。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "自修也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "自修者，省察克治之功。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "恂栗也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "恂栗，战惧也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "威仪也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "威，可畏也。仪，可像也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "民之不能忘也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "引诗而释之，以明明明德者之止于至善。道学自修，言其所以得之之由。恂栗、威仪，言其德容表里之盛。卒乃指其实而叹美之也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "于戏前王不忘",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗周颂烈文之篇。于戏，叹辞。前王，谓文、武也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "君子贤其贤而亲其亲",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "君子，谓其后贤后王。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "小人乐其乐而利其利",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "小人，谓后民也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "此以没世不忘也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此言前王所以新民者止于至善，能使天下后世无一物不得其所，所以既没世而人思慕之，愈久而不忘也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第四章",
        "scripture_content": "吾犹人也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "犹人，不异于人也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第四章",
        "scripture_content": "必也使无讼乎",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "引夫子之言，而言圣人能使无实之人不敢尽其虚诞之辞。盖我之明德既明，自然有以畏服民之心志，故讼不待听而自无也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第四章",
        "scripture_content": "无情者不得尽其辞",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "情，实也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第四章",
        "scripture_content": "此谓知本",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "观于此言，可以知本末之先后矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第五章",
        "scripture_content": "此谓知本",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "程子曰：「衍文也。」"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第五章",
        "scripture_content": "此谓知之至也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此句之上别有阙文，此特其结语耳。右传之五章，盖释格物、致知之义，而今亡矣。间尝窃取程子之意以补之曰：「所谓致知在格物者，言欲致吾之知，在即物而穷其理也。盖人心之灵莫不有知，而天下之物莫不有理，惟于理有未穷，故其知有不尽也。是以大学始教，必使学者即凡天下之物，莫不因其已知之理而益穷之，以求至乎其极。至于用力之久，而一旦豁然贯通焉，则众物之表里精粗无不到，而吾心之全体大用无不明矣。此谓物格，此谓知之至也。」"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "所谓诚其意者",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诚其意者，自修之首也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "毋自欺也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "毋者，禁止之辞。自欺云者，知为善以去恶，而心之所发有未实也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "如恶恶臭，如好好色",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "恶恶臭，如好好色，皆务决去，而求必得之，以自快足于己，不可徒苟且以殉外而为人也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "此之谓自谦",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "谦读为慊，苦劫反。谦，快也，足也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "故君子必慎其独也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "独者，人所不知而己所独知之地也。言欲自修者知为善以去其恶，则当实用其力，而禁止其自欺。然其实与不实，盖有他人所不及知而己独知之者，故必谨之于此以审其几焉。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "小人闲居为不善",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "闲居，独处也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "见君子而后厌然",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "厌然，消沮闭藏之貌。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "而著其善",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此言小人阴为不善，而阳欲掩之，则是非不知善之当为与恶之当去也；但不能实用其力以至此耳。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "则何益矣",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "然欲掩其恶而卒不可掩，欲诈为善而卒不可诈，则亦何益之有哉！"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "故君子必慎其独也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此君子所以重以为戒，而必谨其独也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "其严乎",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "引此以明上文之意。言虽幽独之中，而其善恶之不可掩如此。可畏之甚也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "富润屋",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "言富则能润屋矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "德润身",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "德则能润身矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "心广体胖",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "胖，安舒也。故心无愧怍，则广大宽平，而体常舒泰，德之润身者然也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "故君子必诚其意",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "盖善之实于中而形于外者如此，故又言此以结之。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第七章",
        "scripture_content": "身有所忿懥，则不得其正；有所恐惧，则不得其正；有所好乐，则不得其正；有所忧患，则不得其正",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "程子曰：「身有之身当作心。」忿懥，怒也。盖是四者，皆心之用，而人所不能无者。然一有之而不能察，则欲动情胜，而其用之所行，或不能不失其正矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第七章",
        "scripture_content": "心不在焉",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "心有不存，则无以检其身，是以君子必察乎此而敬以直之，然后此心常存而身无不修也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "人之其所亲爱而辟焉",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "人，谓众人。之，犹于也。辟，犹偏也。五者，在人本有当然之则；然常人之情惟其所向而不加审焉，则必陷于一偏而身不修矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "人莫知其子之恶",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "溺爱者不明。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "莫知其苗之硕",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "贪得者无厌，是则偏之为害，而家之所以不齐也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "故君子不出家而成教于国",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "身修，则家可教矣；孝、弟、慈，所以修身而教于家者也；然而国之所以事君事长使众之道不外乎此。此所以家齐于上，而教成于下也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "如保赤子",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此引书而释之，又明立教之本不假强为，在识其端而推广之耳。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "一人贪戾",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "一人，谓君也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "其机如此",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "机，发动所由也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "此谓一言偾事",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "偾，覆败也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "一人定国",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此言教成于国之效。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "是故君子有诸己而后求诸人",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "有善于己，然后可以责人之善。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "无诸己而后非诸人",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "无恶于己，然后可以正人之恶。皆推己以及人，所谓恕也，不如是，则所令反其所好，而民不从矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "未之有也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "喻，晓也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "桃之夭夭",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗周南桃夭之篇。夭夭，少好貌。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "其叶蓁蓁",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "蓁蓁，美盛貌。兴也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "之子于归",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "之子，犹言是子，此指女子之嫁者而言也。妇人谓嫁曰归。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "宜其家人",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "宜，犹善也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "宜兄宜弟",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗小雅蓼萧篇。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "其仪不忒",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗曹风鸤鸠篇。忒，差也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "上老老而民兴孝",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "老老，所谓老吾老也。兴，谓有所感发而兴起也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "上恤孤而民不倍",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "孤者，幼而无父之称。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "是以君子有絜矩之道也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "絜，度也。矩，所以为方也。言此三者，上行下效，捷于影响，所谓家齐而国治也。亦可以见人心之所同，而不可使有一夫之不获矣。是以君子必当因其所同，推以度物，使彼我之间各得分愿，则上下四旁均齐方正，而天下平矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "毋以交于右",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此覆解上文絜矩二字之义。如不欲上之无礼于我，则必以此度下之心，而亦不敢以此无礼使之。不欲下之不忠于我，则必以此度上之心，而亦不敢以此不忠事之。至于前后左右，无不皆然，则身之所处，上下、四旁、长短、广狭，彼此如一，而无不方矣。彼同有是心而兴起焉者，又岂有一夫之不获哉。所操者约，而所及者广，此平天下之要道也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "乐只君子",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗小雅南山有台之篇。只，语助辞。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "民之父母",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "言能絜矩而以民心为己心，则是爱民如子，而民爱之如父母矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "节彼南山",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗小雅节南山之篇。节，截然高大貌。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "赫赫师尹",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "师尹，周太师尹氏也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "民具尔瞻",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "具，俱也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "有国者不可以不慎",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "言在上者人所瞻仰，不可不谨。若不能絜矩而好恶徇于一己之偏，则身弑国亡，为天下之大戮矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "辟则为天下僇矣",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "辟，偏也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "殷之未丧师",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "诗文王篇。师，众也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "克配上帝",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "配，对也。配上帝，言其为天下君，而对乎上帝也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "仪监于殷",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "监，视也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "峻命不易",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "峻，大也。不易，言难保也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "道得众则得国",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "道，言也。引诗而言此，以结上文两节之意。有天下者，能存此心而不失，则所以絜矩而与民同欲者，自不能已矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "有德此有人",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "有人，谓得众。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "有人此有土",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "有土，谓得国。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "有财此有用",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "有国则不患无财用矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "外本内末，争民施夺",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "人君以德为外，以财为内，则是争斗其民，而施之以劫夺之教也。盖财者人之所同欲，不能絜矩而欲专之，则民亦起而争夺矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "财聚则民散",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "外本内末故财聚，争民施夺故民散，反是则有德而有人矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "言悖而出者，亦悖而入",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "悖，逆也。此以言之出入，明货之出入也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "惟命不于常",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "道，言也。因上文引文王诗之意而申言之，其丁宁反覆之意益深切矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "楚国无以为宝，惟善以为宝",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "楚书，楚语。言不宝金玉而宝善人也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "亡人无以为宝",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "舅犯，晋文公舅狐偃，字子犯。亡人，文公时为公子，出亡在外也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "仁亲以为宝",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "仁，爱也。事见檀弓。此两节又明不外本而内末之意。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "若有一个臣",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "秦誓，周书。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "断断兮无他技",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "断断，诚一之貌。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "人之彦圣",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "彦，美士也。圣，通明也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "尚亦有利哉",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "尚，庶几也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "媢嫉以恶之",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "媢，忌也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "而违之俾不通",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "违，拂戾也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "亦曰殆哉",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "殆，危也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "唯仁人放流之，迸诸四夷，不与同中国",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "迸，读为屏，古字通用。迸，犹逐也。言有此媢疾之人，妨贤而病国，则仁人必深恶而痛绝之。以其至公无私，故能得好恶之正如此也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "命也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "命，郑氏云「当作慢。」程子云：「当作怠。」未详孰是。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "过也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "若此者，知所爱恶矣，而未能尽爱恶之道，盖君子而未仁者也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "是谓拂人之性",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "拂，逆也。好善而恶恶，人之性也；至于拂人之性，则不仁之甚者也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "君子有大道",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "君子，以位言之。道，谓居其位而修己治人之术。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "必忠信以得之",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "发己自尽为忠，循物无违谓信。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "骄泰以失之",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "骄者矜高，泰者侈肆。此因上所引文王、康诰之意而言。章内三言得失，而语益加切，盖至此而天理存亡之几决矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "生之者众",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "吕氏曰：「国无游民，则生者众矣。」"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "食之者寡",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "吕氏曰：「朝无幸位，则食者寡矣。」"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "为之者疾",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "吕氏曰：「不夺农时，则为之疾矣。」"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "用之者舒",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "吕氏曰：「量入为出，则用之舒矣。」愚按：此因有土有财而言，以明足国之道在乎务本而节用，非必外本内末而后财可聚也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "仁者以财发身",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "发，犹起也。仁者散财以得民。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "不仁者以身发财",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "不仁者亡身以殖货。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "未有上好仁而下不好义者也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "上好仁以爱其下，则下好义以忠其上。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "未有好义其事不终者也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "所以事必有终。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "未有府库财非其财者也",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "府库之财无悖出之患也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "畜马乘不察于鸡豚",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "孟献子，鲁之贤大夫仲孙蔑也。畜马乘，士初试为大夫者也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "伐冰之家不畜牛羊",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "伐冰之家，卿大夫以上，丧祭用冰者也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "百乘之家不畜聚敛之臣",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "百乘之家，有采地者也。君子宁亡己之财，而不忍伤民之力；故宁有盗臣，而不畜聚敛之臣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "必自小人矣",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "自，由也，言由小人导之也。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "彼为善之",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此句上下，疑有阙文误字。"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "亦无如之何矣",
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "南宋",
        "note": "此一节，深明以利为利之害，而重言以结之，其丁宁之意切矣。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "大学之道",
        "translation": "大学的宗旨",
        "note_zheng": "",
        "note_kong": "案郑《目录》云：\"名曰《大学》者，以其记博学，可以为政也。此于《别录》属《通论》。\"此《大学》之篇，论学成之事，能治其国，章明其德于天下，却本明德所由，先从诚意为始。",
        "note_zhu": "大，旧音泰，今读如字。子程子曰：\"大学，孔氏之遗书，而初学入德之门也。\"于今可见古人为学次第者，独赖此篇之存，而论、孟次之。学者必由是而学焉，则庶乎其不差矣。",
        "comparative_analysis": {
            "version_position_analysis": "此句为《大学》开篇首句，在古本与朱熹改本中的位置完全相同，均为全篇之总纲。",
            "commentary_comparison": "郑玄未于此句下出注，而是在《三礼目录》中论及《大学》篇旨，孔颖达疏即引此《目录》，将《大学》定位为'记博学，可以为政'，强调其外王事功和学成治国的面向。朱熹则直接引用程子之言，将《大学》提升为'孔氏之遗书，初学入德之门'，确立了其作为'四书'之首、为学次第总纲的理学核心地位。汉唐重其政教之用，宋儒重其心性修养之序，开篇便已分途。",
            "contextual_significance": "此句是《大学》全篇的'一经'之始，总领三纲领。无论是古本还是改本，它都是整个思想体系的基石。在朱熹的诠释中，它不仅是学问的宗旨，更是'入德之门'，为后续的'格致诚正、修齐治平'的功夫次第奠定了起点。"
        },
        "commentator": "朱熹",
        "note": "大，旧音泰，今读如字。子程子曰：\"大学，孔氏之遗书，而初学入德之门也。\"于今可见古人为学次第者，独赖此篇之存，而论、孟次之。学者必由是而学焉，则庶乎其不差矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "在明明德",
        "translation": "在于彰显自身光明的德行",
        "note_zheng": "谓显明其至德也。",
        "note_kong": "\"在于章明己之光明之德。谓身有明德，而更章显之，此其一也。\"",
        "note_zhu": "明，明之也。明德者，人之所得乎天，而虚灵不昧，以具众理而应万事者也。但为气禀所拘，人欲所蔽，则有时而昏；然其本体之明，则有未尝息者。故学者当因其所发而遂明之，以复其初也。",
        "comparative_analysis": {
            "version_position_analysis": "此句为'三纲领'之首，在古本与朱熹改本中位置一致，均为开篇总纲的核心部分。",
            "commentary_comparison": "郑玄注'谓显明其至德也'，简洁直指行为效果。孔颖达疏申之，谓'在于章明己之光明之德'，强调主体的自我彰显行为。朱熹的注释则发生了哲学转向：他将'明德'定义为'人之所得乎天，而虚灵不昧，以具众理而应万事者'，赋予其天理心性的本体论内涵；又将'明'解为动词，并引入'气禀所拘、人欲所蔽'的障碍论与'因其所发而遂明之，以复其初'的功夫论。汉唐注疏是行为描述，朱熹注则是心性修养论。",
            "contextual_significance": "此句是'三纲领'的第一纲领。在郑玄、孔颖达的体系中，它是为政者'章明其德于天下'的起点。在朱熹的理学体系中，'明明德'对应'八条目'中的'格物、致知、诚意、正心、修身'，是内圣功夫的总括，是个人修养的内在目标，与'新民'的外王事功相对，构成了体用关系。"
        },
        "commentator": "朱熹",
        "note": "明，明之也。明德者，人之所得乎天，而虚灵不昧，以具众理而应万事者也。但为气禀所拘，人欲所蔽，则有时而昏；然其本体之明，则有未尝息者。故学者当因其所发而遂明之，以复其初也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "在亲民",
        "translation": "在于亲爱民众",
        "note_zheng": "",
        "note_kong": "\"在于亲爱于民，是其二也。\"",
        "note_zhu": "程子曰：\"亲，当作新。\"新者，革其旧之谓也，言既自明其明德，又当推以及人，使之亦有以去其旧染之污也。",
        "comparative_analysis": {
            "version_position_analysis": "此句为'三纲领'之二，在古本与朱熹改本中位置一致，均为开篇总纲。",
            "commentary_comparison": "郑玄孔颖达疏依旧从字面解为'亲爱于民'，强调君主对民众的仁爱之情。朱熹则采纳程子之说，改'亲'为'新'，将'亲民'解释为'新民'，即推己及人、革除民众旧染之污，使其自新。这一训诂上的改变，使'亲民'从单向的仁爱施与转变为双向的道德教化与更新，体现了宋儒对个体道德主体性的重视。",
            "contextual_significance": "此句是'三纲领'的第二纲领，连接'明明德'（内圣）与'止于至善'（最高目标）。在朱熹改本中，'新民'成为外王事业的核心，与'明明德'形成体用、本末关系，为后文'传之二章'集中阐释'新民'之义提供了纲领性依据。"
        },
        "commentator": "朱熹",
        "note": "程子曰：\"亲，当作新。\"新者，革其旧之谓也，言既自明其明德，又当推以及人，使之亦有以去其旧染之污也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "在止于至善",
        "translation": "在于使言行达到并停留在至善的境界",
        "note_zheng": "止，犹自处也。",
        "note_kong": "\"在止处于至善之行，此其三也。言大学之道，在于此三事矣。\"",
        "note_zhu": "止者，必至于是而不迁之意。至善，则事理当然之极也。言明明德、新民，皆当至于至善之地而不迁。盖必其有以尽夫天理之极，而无一毫人欲之私也。此三者，大学之纲领也。",
        "comparative_analysis": {
            "version_position_analysis": "此句为'三纲领'之三，在古本与朱熹改本中位置一致，均为开篇总纲。",
            "commentary_comparison": "郑玄注'止，犹自处也'，以'自处'释'止'，侧重于行为主体的安顿。孔颖达疏承之，谓'止处于至善之行'。朱熹则对'止'和'至善'进行了理学化阐释：'止'是'必至于是而不迁'，强调意志的坚定；'至善'是'事理当然之极'，即天理的最高标准，并且必须'尽夫天理之极，而无一毫人欲之私'。朱熹将'至善'明确为天理与人欲对立的终极境界，比汉唐注疏更具哲学深度。",
            "contextual_significance": "此句是'三纲领'的终极目标。朱熹明确指出'明明德、新民，皆当至于至善之地而不迁'，使'至善'成为统摄内圣外王的最高价值标准。在朱熹改本中，'传之三章'集中阐释'止于至善'，引用《诗经》等文献详细展开'知止'与'得止'的具体内涵。"
        },
        "commentator": "朱熹",
        "note": "止者，必至于是而不迁之意。至善，则事理当然之极也。言明明德、新民，皆当至于至善之地而不迁。盖必其有以尽夫天理之极，而无一毫人欲之私也。此三者，大学之纲领也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "知止而后有定",
        "translation": "知道应止于至善，然后才能有坚定的志向",
        "note_zheng": "",
        "note_kong": "更覆说\"止于至善\"之事。既知\"止于至善\"，而后心能有定，不有差贰也。",
        "note_zhu": "止者，所当止之地，即至善之所在也。知之，则志有定向。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于开篇总纲部分，紧接'在止于至善'之后，是论述'止于至善'功夫次第的起句。朱熹将其保留在'经一章'中，作为总纲的有机组成部分。",
            "commentary_comparison": "郑玄孔颖达疏将'知止'理解为知道'止于至善'之事，'定'指心无差贰，侧重于行为层面的不偏离。朱熹则将'止'解释为'所当止之地'，即'至善之所在'，'知之'后'志有定向'，将'定'内化为心志的定向，强调内在意志的确定性，体现了宋儒对心性功夫的重视。",
            "contextual_significance": "此句开启了'止、定、静、安、虑、得'的功夫链条，是'经一章'中从'三纲领'向具体修养方法过渡的关键环节。朱熹指出'知止为始，能得为终'，为后文'物有本末，事有终始'埋下伏笔。"
        },
        "commentator": "朱熹",
        "note": "止者，所当止之地，即至善之所在也。知之，则志有定向。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "定而后能静",
        "translation": "志向坚定，然后才能内心宁静",
        "note_zheng": "",
        "note_kong": "心定无欲改，能静不躁求也。",
        "note_zhu": "静，谓心不妄动。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于开篇总纲，承接'知止而后有定'。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏以'不躁求'释'静'，侧重于外在行为的不急躁。朱熹则以'心不妄动'释'静'，将'静'完全内化为心性的状态，强调心念的安定。二者一外一内，差异明显。",
            "contextual_significance": "此句是'止定静安虑得'链条的第二环。在朱熹的体系中，'静'是心性修养的重要阶段，为后续的'安'和'虑'奠定基础，体现了由外而内、由粗而精的修养次第。"
        },
        "commentator": "朱熹",
        "note": "静，谓心不妄动。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "静而后能安",
        "translation": "内心宁静，然后才能处位安稳",
        "note_zheng": "",
        "note_kong": "以静故情性安和也。",
        "note_zhu": "安，谓所处而安。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于开篇总纲，承接'定而后能静'。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏以'情性安和'释'安'，兼顾内在情性与外在和顺。朱熹以'所处而安'释'安'，强调主体在任何处境下都能安然自得，更侧重于境界的稳定性和普遍性。",
            "contextual_significance": "此句是修养次第中从'静'到'安'的提升。'安'是身心内外和谐统一的境界，为接下来的'虑'（思虑周详）提供了稳定的心理基础。"
        },
        "commentator": "朱熹",
        "note": "安，谓所处而安。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "安而后能虑",
        "translation": "处位安稳，然后才能思虑周详",
        "note_zheng": "",
        "note_kong": "情既安和，能思虑于事也。",
        "note_zhu": "虑，谓处事精详。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于开篇总纲，承接'静而后能安'。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏以'思虑于事'释'虑'，强调对具体事务的思考。朱熹以'处事精详'释'虑'，同样指向具体实践，但更强调思考的精细与详尽。二者差异不大，但朱熹的'精详'更突出认知的极致追求。",
            "contextual_significance": "此句是修养次第中从'安'的稳定状态转向认知活动的关键。'虑'是理性思辨的功夫，连接内在修养与外在实践，为最终的'得'（得其所止）提供认知保障。"
        },
        "commentator": "朱熹",
        "note": "虑，谓处事精详。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "虑而后能得",
        "translation": "思虑周详，然后才能有所收获",
        "note_zheng": "得，谓得事之宜也。",
        "note_kong": "既能思虑，然后于事得安也。",
        "note_zhu": "得，谓得其所止。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于开篇总纲，是'止定静安虑得'链条的终点。朱熹改本位置不变。",
            "commentary_comparison": "郑玄注'得，谓得事之宜也'，从行为效果上定义，强调行动与事理的契合。孔颖达疏'于事得安'，延续郑义。朱熹则将'得'解释为'得其所止'，即达到至善的境界，将外在的事功效果收归为内在的修养成就，体现了理学的内转倾向。",
            "contextual_significance": "此句是'止定静安虑得'修养次第的完成，标志着'知止'之后通过一系列内心净化与认知努力，最终实现了'至善'的目标。同时，它也自然引出下文'物有本末，事有终始'的总结性论述。"
        },
        "commentator": "朱熹",
        "note": "得，谓得其所止。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "物有本末",
        "translation": "万物有根本和末节",
        "note_zheng": "",
        "note_kong": "若于事得宜，而天下万物有本有末，经营百事有终有始也。",
        "note_zhu": "明德为本，新民为末。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于开篇总纲，紧接'虑而后能得'之后，是总结性论述的开端。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏将'本末'与'终始'并论，泛论万物百事皆有本末终始，未作具体指实。朱熹则明确将'明德'与'新民'分别对应'本'与'末'，将抽象的哲学范畴具体化为大学修养的核心内容，体现了朱熹对经文结构的自觉梳理和理学化建构。",
            "contextual_significance": "此句与下句'事有终始'共同构成'知所先后则近道矣'的前提。朱熹将其明确为'明德为本，新民为末'，为后文'古之欲明明德于天下者'的八条目展开奠定了本末先后的逻辑基础。"
        },
        "commentator": "朱熹",
        "note": "明德为本，新民为末。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "事有终始",
        "translation": "万事有终结和开始",
        "note_zheng": "",
        "note_kong": "同上",
        "note_zhu": "知止为始，能得为终。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中与'物有本末'并列，位于开篇总纲。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏将其与'物有本末'合解，未作区分。朱熹则明确以'知止为始，能得为终'，将'终始'具体对应到'止定静安虑得'的修养链条上，使抽象的'事'有了切实的功夫指向。",
            "contextual_significance": "此句与'物有本末'对举，朱熹分别以'明德新民'和'知止能得'解之，构成了'经一章'内部从三纲领到八条目的逻辑过渡。"
        },
        "commentator": "朱熹",
        "note": "知止为始，能得为终。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "知所先后",
        "translation": "知道什么该先、什么该后",
        "note_zheng": "",
        "note_kong": "既能如此，天下百事万物，皆识知其先后也。",
        "note_zhu": "本始所先，末终所后。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于'物有本末，事有终始'之后，是总结句'则近道矣'的前提。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏泛论识知先后。朱熹以'本始所先，末终所后'解之，将'先后'具体落实到'本末'与'终始'的关系上，强调明德为本当先，新民为末当后，知止为始当先，能得为终当后，逻辑严密。",
            "contextual_significance": "此句是'经一章'开篇总纲的结论性前提，强调实践智慧中对次序的把握。朱熹将其与上文'本末''终始'紧密结合，为下文'古之欲明明德于天下者'的八条目逆推次序提供了理论依据。"
        },
        "commentator": "朱熹",
        "note": "本始所先，末终所后。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "则近道矣",
        "translation": "就接近大学之道了",
        "note_zheng": "",
        "note_kong": "若能行此诸事，则附近于大道矣。",
        "note_zhu": "此结上文两节之意。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中作为开篇总纲的总结句，位于'知所先后'之后。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏以'附近于大道'解之，强调接近而非等同。朱熹以'结上文两节之意'点明其总结功能，未另作训释。",
            "contextual_significance": "此句标志着'经一章'中'三纲领'及'止定静安虑得'、'本末终始'论述的结束，引出下文'古之欲明明德于天下者'对'八条目'的详细展开。"
        },
        "commentator": "朱熹",
        "note": "此结上文两节之意。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "古之欲明明德于天下者",
        "translation": "古代想要彰显光明德行于天下的人",
        "note_zheng": "",
        "note_kong": "前章言大学之道在明德、亲民、止善，覆说止善之事既毕，故此经明明德之理。",
        "note_zhu": "明明德于天下者，使天下之人皆有以明其明德也。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于开篇总纲之后，是'八条目'逆推的起点。朱熹改本中仍属'经一章'，位置不变。",
            "commentary_comparison": "郑玄孔颖达疏点明此句开始'明明德之理'的论述。朱熹则将此句解释为'使天下之人皆有以明其明德'，将'明明德于天下'从个人德性的外推转变为对天下人进行道德启发的教化行为，突出了儒家'修己以安百姓'的理想。",
            "contextual_significance": "此句是'八条目'逆推逻辑的起点，从最高理想'明明德于天下'开始，逐层向下追溯必要条件，引出'治国、齐家、修身、正心、诚意、致知、格物'的完整链条。"
        },
        "commentator": "朱熹",
        "note": "明明德于天下者，使天下之人皆有以明其明德也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "先治其国",
        "translation": "先要治理好自己的国家",
        "note_zheng": "",
        "note_kong": "此以积学能为明德盛极之事，以渐到。今本其初，故言欲章明己之明德，使遍于天下者，先须能治其国。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'逆推的第一步，位于'古之欲明明德于天下者'之后。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏强调由'治其国'到'明明德于天下'的渐进积累。朱熹",
            "contextual_significance": "此句标志着从'天下'到'国'的第一次收缩，体现了儒家'家-国-天下'的差序格局。在'八条目'中，'治国'是连接'齐家'与'平天下'的关键环节。"
        },
        "commentator": "孔颖达",
        "note": "此以积学能为明德盛极之事，以渐到。今本其初，故言欲章明己之明德，使遍于天下者，先须能治其国。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "欲治其国者",
        "translation": "要治理好国家",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'逆推的过渡句，引出'先齐其家'。朱熹改本位置不变。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均此句仅为句式重复，用以衔接。",
            "contextual_significance": "此句作为逆推链条中的承上启下之语，无独立思想内涵，但体现了古文本经文的复沓句式风格。"
        },
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "note": "郑玄、孔颖达、朱熹均此句仅为句式重复，用以衔接。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "先齐其家",
        "translation": "先要整治好自己的家庭",
        "note_zheng": "",
        "note_kong": "言若欲齐家，先须修身也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'逆推的第二步，位于'欲治其国者'之后。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏在此句下注'言若欲齐家，先须修身也'，实际上是在解释下一句'先修其身'的内容，可能为文本错置。",
            "contextual_significance": "此句将'治国'的条件追溯至'齐家'，体现了儒家'家国一体'的观念。'齐家'是'修身'与'治国'的中介，家庭伦理的整饬是国家治理的基础。"
        },
        "commentator": "孔颖达",
        "note": "言若欲齐家，先须修身也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "欲齐其家者",
        "translation": "要整治好家庭",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为逆推过渡句，引出'先修其身'。朱熹改本位置不变。",
            "commentary_comparison": "三家均",
            "contextual_significance": "复沓句式，无独立意义。"
        },
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "note": "三家均"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "先修其身",
        "translation": "先要修养好自身",
        "note_zheng": "",
        "note_kong": "同上",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'逆推的第三步，位于'欲齐其家者'之后。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏此处'同上'指前注'言若欲齐家，先须修身也'，将'修身'作为'齐家'的前提。",
            "contextual_significance": "'修身'是'八条目'的核心枢纽。在朱熹的体系中，'修身以上'（格物、致知、诚意、正心）皆为'明明德'之事，'修身以下'（齐家、治国、平天下）皆为'新民'之事，'修身'是内圣外王的交接点。"
        },
        "commentator": "孔颖达",
        "note": "同上",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "欲修其身者",
        "translation": "要修养好自身",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "此句为逆推过渡句，引出'先正其心'。",
            "commentary_comparison": "三家",
            "contextual_significance": "复沓句式。"
        },
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "note": "三家"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "先正其心",
        "translation": "先要端正自己的内心",
        "note_zheng": "",
        "note_kong": "言若欲修身，必先正其心也。",
        "note_zhu": "心者，身之所主也。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'逆推的第四步。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏以'正其心'为'修身'的前提。朱熹则提出'心者，身之所主也'，将心身关系界定为统摄与被统摄的关系，为后文'修身在正其心'提供了本体论依据。",
            "contextual_significance": "'正心'是'八条目'中从外在行为（修身）向内在心理（诚意、致知）过渡的关键。朱熹以'心主身'的论断，确立了心在修养体系中的核心地位。"
        },
        "commentator": "朱熹",
        "note": "心者，身之所主也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "欲正其心者",
        "translation": "要端正内心",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "逆推过渡句，引出'先诚其意'。",
            "commentary_comparison": "三家",
            "contextual_significance": "复沓句式。"
        },
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "note": "三家"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "先诚其意",
        "translation": "先要使自己的意念真诚",
        "note_zheng": "",
        "note_kong": "总包万虑谓之为心，情所意念谓之意。若欲正其心使无倾邪，必须先至诚，在于忆念也。若能诚实其意，则心不倾邪也。",
        "note_zhu": "诚，实也。意者，心之所发也。实其心之所发，欲其一于善而无自欺也。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'逆推的第五步。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏区分'心'与'意'：'心'总包万虑，'意'是情所意念，强调'诚意'是'正心'的前提。朱熹进一步明确'意者，心之所发也'，将'意'界定为心之发动，'诚'即'实其心之所发，欲其一于善而无自欺'，突出了动机的纯粹性和自我监督的功夫。",
            "contextual_significance": "'诚意'是'八条目'中从认知（致知）向意志（正心）过渡的环节。朱熹在'传之六章'专门阐释'诚意'，强调'慎独'是自修之首，因为意念之实伪只有自己知道。"
        },
        "commentator": "朱熹",
        "note": "诚，实也。意者，心之所发也。实其心之所发，欲其一于善而无自欺也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "欲诚其意者",
        "translation": "要使意念真诚",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "逆推过渡句，引出'先致其知'。",
            "commentary_comparison": "三家",
            "contextual_significance": "复沓句式。"
        },
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "note": "三家"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "先致其知",
        "translation": "先要获得真知",
        "note_zheng": "",
        "note_kong": "言欲精诚其己意，先须招致其所知之事，言初始必须学习，然后乃能有所知晓其成败。",
        "note_zhu": "致，推极也。知，犹识也。推极吾之知识，欲其所知无不尽也。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'逆推的第六步。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏以'招致所知之事'解'致知'，强调学习与知晓成败。朱熹则以'推极吾之知识'解'致知'，将'致'解释为主动的推究扩充，'知'为知识，目标是要达到'所知无不尽'的极致，体现了宋儒对认知活动的主动性和极致追求。",
            "contextual_significance": "'致知'是连接'格物'与'诚意'的认知环节。在朱熹体系中，'致知'是'格物'的结果，即通过穷究事物之理而达到知识的极致，为'诚意'提供理性基础。"
        },
        "commentator": "朱熹",
        "note": "致，推极也。知，犹识也。推极吾之知识，欲其所知无不尽也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "致知在格物",
        "translation": "获得真知在于推究事物的原理",
        "note_zheng": "知，谓知善恶吉凶之所终始也。格，来也。物，犹事也。其知于善深则来善物，其知于恶深则来恶物，言事缘人所好来也。此\"致\"或为\"至\"。",
        "note_kong": "言若能学习招致所知。格，来也。己有所知，则能在于来物。若知善深则来善物，知恶深则来恶物。言善恶之来缘人所好也。",
        "note_zhu": "格，至也。物，犹事也。穷至事物之理，欲其极处无不到也。此八者，大学之条目也。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'逆推的终点，也是最关键的一句。朱熹改本中仍属'经一章'，但因其对'格物'的解释与汉唐大异，且认为古本此处有阙文，故在'传之五章'作了补传。",
            "commentary_comparison": "郑玄注'格，来也'，'物，犹事也'，并将'知'解释为'知善恶吉凶之所终始'，认为人的善恶认知会感召相应的善恶事物（'其知于善深则来善物'），这是一种感应式的认识论。孔颖达疏承郑义。朱熹则彻底颠覆：'格，至也'，'穷至事物之理'，将'格物'解释为主动地、穷究地研究事物之理，以求达到'极处无不到'。这标志着从汉唐的感应认识论到宋代理学理性主义认识论的转变。",
            "contextual_significance": "'格物'是'八条目'的起点和基础。朱熹认为古本此处有缺文，故在'传之五章'补写了著名的'格物补传'，提出'即物而穷其理'、'一旦豁然贯通'的认知路径，将'格物'提升为大学修养的首要功夫。"
        },
        "commentator": "朱熹",
        "note": "格，至也。物，犹事也。穷至事物之理，欲其极处无不到也。此八者，大学之条目也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "物格而后知至",
        "translation": "推究了事物原理，然后真知才能达到极致",
        "note_zheng": "",
        "note_kong": "物既来，则知其善恶所至。善事来，则知其至于善；若恶事来，则知其至于恶。既能知至，则行善不行恶也。",
        "note_zhu": "物格者，物理之极处无不到也。知至者，吾心之所知无不尽也。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'顺推的第一步，位于'致知在格物'之后。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏延续其感应论，认为'物来'之后就能知道善恶所至，并据此行善去恶。朱熹则将'物格'解释为'物理之极处无不到'，'知至'为'吾心之所知无不尽'，将认知过程理解为心与理在极致处的统一，体现了'心具众理'的理学立场。",
            "contextual_significance": "此句标志着从'格物'的功夫到'知至'的效果的转化。在朱熹体系中，'物格知至'是'八条目'中认知阶段的完成，为后续'诚意、正心、修身'等意志和行为修养提供了坚实的认知基础。"
        },
        "commentator": "朱熹",
        "note": "物格者，物理之极处无不到也。知至者，吾心之所知无不尽也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "知至而后意诚",
        "translation": "真知达到极致，然后意念才能真诚",
        "note_zheng": "",
        "note_kong": "既能知至，则意念精诚也。",
        "note_zhu": "知既尽，则意可得而实矣。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'顺推的第二步。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏认为知至之后意念自然精诚。朱熹则强调'知既尽，则意可得而实'，'可得'二字暗示了从知到意并非自动，而是需要主观努力，但认知的极致为诚意的实践提供了保障。",
            "contextual_significance": "此句连接'致知'与'诚意'，体现了儒家'知先行后'的基本逻辑。朱熹在'传之六章'详细阐述'诚意'，强调'慎独'，而'知至'则是诚意不自欺的前提。"
        },
        "commentator": "朱熹",
        "note": "知既尽，则意可得而实矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "意诚而后心正",
        "translation": "意念真诚，然后内心才能端正",
        "note_zheng": "",
        "note_kong": "意能精诚，故能心正也。",
        "note_zhu": "意既实，则心可得而正矣。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'顺推的第三步。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏以因果论之。朱熹同样以'可得而正'表示条件关系，但更强调'意实'是'心正'的必要条件。",
            "contextual_significance": "此句连接'诚意'与'正心'。在朱熹体系中，'意'是心之所发，'心'是身之所主；诚意之后，心之本体不受私欲干扰，方能得其正。'传之七章'专门阐释'修身在正其心'，指出忿懥、恐惧等情绪会遮蔽心的正位。"
        },
        "commentator": "朱熹",
        "note": "意既实，则心可得而正矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "心正而后身修",
        "translation": "内心端正，然后自身才能修养好",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "修身以上，明明德之事也。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'顺推的第四步。朱熹改本位置不变。",
            "commentary_comparison": "郑玄、孔颖达朱熹在此句下注'修身以上，明明德之事也'，将'格、致、诚、正、修'统归为'明明德'的内圣功夫，明确了'修身'作为内圣功夫完成、外王功夫起点的枢纽地位。",
            "contextual_significance": "此句标志着内圣修养的完成。'心正'则身无不修，'修身'是'八条目'中内圣外王的分界点。"
        },
        "commentator": "朱熹",
        "note": "修身以上，明明德之事也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "身修而后家齐",
        "translation": "自身修养好，然后家庭才能整治好",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "齐家以下，新民之事也。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'顺推的第五步。朱熹改本位置不变。",
            "commentary_comparison": "郑玄、孔颖达朱熹在此句下注'齐家以下，新民之事也'，将'齐家、治国、平天下'归为'新民'的外王事业，与'修身以上'形成内外呼应。",
            "contextual_significance": "此句是'修身'外推的第一步。'身修'是'齐家'的前提，家庭伦理的整饬是个人德性完善的直接延伸。'传之八章'专门阐释'修身齐家'，指出亲爱、贱恶等情感偏辟会妨碍齐家。"
        },
        "commentator": "朱熹",
        "note": "齐家以下，新民之事也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "家齐而后国治",
        "translation": "家庭整治好，然后国家才能治理好",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'顺推的第六步。朱熹改本位置不变。",
            "commentary_comparison": "三家均",
            "contextual_significance": "此句将'齐家'与'治国'直接关联，体现了儒家'家国一体'的政治哲学。'传之九章'专门阐释'齐家治国'，强调孝、悌、慈等家庭伦理可以直接应用于国家治理。"
        },
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "note": "三家均"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "国治而后天下平",
        "translation": "国家治理好，然后天下才能太平",
        "note_zheng": "",
        "note_kong": "则上\"明明德于天下\"，是以自天子至庶人皆然也。",
        "note_zhu": "物格知至，则知所止矣。意诚以下，则皆得所止之序也。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中为'八条目'顺推的终点。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏将'天下平'与开篇'明明德于天下'呼应。朱熹则将此句纳入'得所止之序'的框架中，将'平天下'视为'止于至善'的最高实现。",
            "contextual_significance": "此句是'八条目'的最终目标，也是'三纲领'中'新民'和'止于至善'的终极体现。'传之十章'专门阐释'治国平天下'，详细论述絜矩之道、民心向背、理财用人等政治原则。"
        },
        "commentator": "朱熹",
        "note": "物格知至，则知所止矣。意诚以下，则皆得所止之序也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "自天子以至于庶人",
        "translation": "从天子到平民百姓",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于'国治而后天下平'之后，引出'壹是皆以修身为本'。朱熹改本位置不变。",
            "commentary_comparison": "三家均",
            "contextual_significance": "此句强调'修身'的普遍性，无论贵贱，皆以修身为本，体现了儒家道德平等的重要思想。"
        },
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "note": "三家均"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "壹是皆以修身为本",
        "translation": "一律都应以修养自身为根本",
        "note_zheng": "壹是，专行是也。",
        "note_kong": "言上从天子，下至庶人，贵贱虽异，所行此者专一，以修身为本。",
        "note_zhu": "壹是，一切也。正心以上，皆所以修身也。齐家以下，则举此而措之耳。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中紧接'自天子以至于庶人'，是'经一章'中总结'修身'核心地位的论断。朱熹改本位置不变。",
            "commentary_comparison": "郑玄注'壹是，专行是也'，强调专一践行修身。孔颖达疏承之。朱熹则注'壹是，一切也'，并进一步指出'正心以上，皆所以修身也；齐家以下，则举此而措之耳'，将'修身'定位为整个'八条目'的枢纽：向内统摄格致诚正，向外统摄齐治平。",
            "contextual_significance": "此句是'经一章'中关于'修身'核心地位的最高论断。朱熹将其解释为内圣外王的总开关，为后文'其本乱而末治者否矣'的论述奠定基础。"
        },
        "commentator": "朱熹",
        "note": "壹是，一切也。正心以上，皆所以修身也。齐家以下，则举此而措之耳。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "其本乱而末治者否矣",
        "translation": "根本乱了而末节能治理好，这是不可能的",
        "note_zheng": "",
        "note_kong": "本乱，谓身不修也。末治，谓国家治也。言己身既不修，而望家国治者否矣。",
        "note_zhu": "本，谓身也。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于'壹是皆以修身为本'之后，是反面论证。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏明确以'身不修'为'本乱'，以'国家治'为'末治'，指出其不可能性。朱熹简注'本，谓身也'，与孔疏一致。",
            "contextual_significance": "此句从反面强调'修身'作为根本的不可替代性，与上文正面论述形成对照，强化了'修身为本'的论点。"
        },
        "commentator": "朱熹",
        "note": "本，谓身也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "其所厚者薄",
        "translation": "该重视的却轻视",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中与'而其所薄者厚'、'未之有也'连用，是对'本乱末治'的进一步比喻性说明。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏在下句统一解释。朱熹",
            "contextual_significance": "此句以'厚薄'比喻本末关系，强调对根本（修身）的轻视与对末节（家国）的重视是违背常理的。"
        },
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "note": "郑玄孔颖达疏在下句统一解释。朱熹"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "而其所薄者厚",
        "translation": "该轻视的却重视",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "与上句连用。",
            "commentary_comparison": "同上。",
            "contextual_significance": "同上。"
        },
        "commentator": "朱熹",
        "commentary_title": "四书章句集注",
        "dynasty": "宋",
        "note": "同上。"
    },
    {
        "classic_title": "礼记",
        "chapter": "经一章",
        "scripture_content": "未之有也",
        "translation": "这样却想把事情办好，是从未有过的",
        "note_zheng": "",
        "note_kong": "譬若与人交接，应须敦厚以加于人。今所厚之处，乃以轻薄。己既与彼轻薄，欲望所薄之处以厚重报己，未有此事也。",
        "note_zhu": "此两节结上文两节之意。",
        "comparative_analysis": {
            "version_position_analysis": "此句是'经一章'的结尾，总结'修身为本'的论断。朱熹改本位置不变。",
            "commentary_comparison": "郑玄孔颖达疏以人际交往的厚薄来比喻，强调己所不欲勿施于人的道理。朱熹则明确此句为'结上文两节之意'，点出其总结功能。",
            "contextual_significance": "此句标志着'经一章'的结束。朱熹改本中，'经一章'之后依次为'传'十章，分别阐释三纲领、八条目的具体内容。"
        },
        "commentator": "朱熹",
        "note": "此两节结上文两节之意。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第一章",
        "scripture_content": "克明德",
        "translation": "能够彰显光明德行",
        "note_zheng": "皆自明明德也。克，能也。",
        "note_kong": "此一经广明意诚则能明己之德。周公封康叔而作《康诰》，戒康叔能明用有德。此《记》之意，言周公戒康叔以自明其德，与《尚书》异也。",
        "note_zhu": "康诰，周书。克，能也。",
        "comparative_analysis": {
            "version_position_analysis": "此句出自《尚书·康诰》，在古本中位于'皆自明也'段落之前（即'康诰曰：克明德。大甲曰：顾寔天之明命。帝典曰：克明峻德。皆自明也'）。朱熹将其从古本中抽出，单独列为'传第一章'，用以阐释'明明德'。",
            "commentary_comparison": "郑玄注'皆自明明德也，克，能也'，点明此句是'自明其德'的例证。孔颖达疏进一步指出此《记》之意与《尚书》原文不同，强调是'自明其德'。朱熹注简略，仅释'克，能也'，但其将'克明德'作为'传第一章'首句，意在以此为核心展开'明明德'的经典依据。",
            "contextual_significance": "此句是朱熹改本'传第一章'（释明明德）的引经之始。朱熹汇集《康诰》、《大甲》、《帝典》三处经文，证明'明明德'是古圣先贤的共同传统，为'明明德'作为大学第一纲领提供经典支撑。"
        },
        "commentator": "朱熹",
        "note": "康诰，周书。克，能也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第一章",
        "scripture_content": "顾諟天之明命",
        "translation": "要念念不忘上天赋予的光明使命",
        "note_zheng": "顾，念也。諟，犹正也。",
        "note_kong": "顾，念也。諟，正也。伊尹戒大甲云：尔为君，当顾念奉正天之显明之命，不邪僻也。",
        "note_zhu": "大甲，商书。顾，谓常目在之也。諟，犹此也，或曰审也。天之明命，即天之所以与我，而我之所以为德者也。常目在之，则无时不明矣。",
        "comparative_analysis": {
            "version_position_analysis": "此句出自《尚书·大甲》，在古本中位于'克明德'与'克明峻德'之间，同属'皆自明也'段落。朱熹将其纳入'传第一章'，作为阐释'明明德'的第二条经典依据。",
            "commentary_comparison": "郑玄注'顾，念也；諟，犹正也'，以'念正'释之，强调对天命的正视与奉行。孔颖达疏承郑义。朱熹则释'顾'为'常目在之'，即时刻注目不忘；释'諟'为'此'或'审'；并将'天之明命'解释为'天之所以与我，而我之所以为德者'，将外在的天命内化为个体的德性本源，体现了理学的天人合一观。",
            "contextual_significance": "此句进一步强化'明明德'的天道根据。朱熹强调'常目在之'，将外在的道德命令转化为内在的自觉意识，为'明明德'的功夫提供了'顾諟'这一具体的修养方法。"
        },
        "commentator": "朱熹",
        "note": "大甲，商书。顾，谓常目在之也。諟，犹此也，或曰审也。天之明命，即天之所以与我，而我之所以为德者也。常目在之，则无时不明矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第一章",
        "scripture_content": "克明峻德",
        "translation": "能够彰显崇高的德行",
        "note_zheng": "峻，大也。",
        "note_kong": "《帝典》，谓《尧典》之篇。峻，大也。言尧能自明大德也。",
        "note_zhu": "峻，书作俊。帝典，尧典，虞书。峻，大也。",
        "comparative_analysis": {
            "version_position_analysis": "此句出自《尚书·尧典》，在古本中位于'顾諟天之明命'之后，同属'皆自明也'段落。朱熹将其纳入'传第一章'，作为阐释'明明德'的第三条经典依据。",
            "commentary_comparison": "郑玄注'峻，大也'。孔颖达疏指出此句言尧能自明大德。朱熹注与郑孔基本相同，但特意说明'峻，书作俊'，指出文本异文。",
            "contextual_significance": "此句以尧为例，证明'明明德'是圣王传统的核心。与'克明德'（康叔）、'顾諟天之明命'（大甲）合观，朱熹构建了一个从文王、成王到尧舜的圣圣相传的'明明德'谱系。"
        },
        "commentator": "朱熹",
        "note": "峻，书作俊。帝典，尧典，虞书。峻，大也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第一章",
        "scripture_content": "皆自明也",
        "translation": "这些都是说要自己彰显光明德行",
        "note_zheng": "皆自明明德也。",
        "note_kong": "此经所云《康诰》、《大甲》、《帝典》等之文，皆是人君自明其德也。",
        "note_zhu": "结所引书，皆言自明己德之意。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于三句引文之后，是总结句。朱熹将其作为'传第一章'的结语，位置一致。",
            "commentary_comparison": "郑玄注'皆自明明德也'。孔颖达疏明确指出'皆是人君自明其德'。朱熹注'结所引书，皆言自明己德之意'，三者解释一致。",
            "contextual_significance": "此句是'传第一章'的点睛之笔，明确告诉读者：以上所引经典，核心意思都是'自明其德'，即'明明德'。朱熹以此完成对'明明德'这一纲领的经典论证。"
        },
        "commentator": "朱熹",
        "note": "结所引书，皆言自明己德之意。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第二章",
        "scripture_content": "苟日新",
        "translation": "如果一天能够自新",
        "note_zheng": "盘铭，刻戒于盘也。",
        "note_kong": "汤沐浴之盘而刻铭为戒。苟，诚也，诚使道德日益新也。",
        "note_zhu": "盘，沐浴之盘也。铭，名其器以自警之辞也。苟，诚也。汤以人之洗濯其心以去恶，如沐浴其身以去垢。故铭其盘，言诚能一日有以涤其旧染之污而自新，则当因其已新者，而日日新之，又日新之，不可略有间断也。",
        "comparative_analysis": {
            "version_position_analysis": "此句出自《汤之盘铭》，在古本中位于'皆自明也'之后，属于'汤之盘铭曰：苟日新，日日新，又日新。康诰曰：作新民。诗云：周虽旧邦，其命惟新。是故君子无所不用其极'这一段落。朱熹将此段落从古本中抽出，单独列为'传第二章'，用以阐释'新民'。",
            "commentary_comparison": "郑玄注仅指出'盘铭，刻戒于盘也'。孔颖达疏释'苟'为'诚'，强调道德日益更新。朱熹则对'盘铭'进行了理学化的发挥：将'洗濯其心以去恶'与'沐浴其身以去垢'类比，把外在的沐浴仪式转化为内心的道德净化，并强调'日日新、又日新'的连续不断功夫，体现了宋儒对修养过程性的重视。",
            "contextual_significance": "此句是朱熹改本'传第二章'（释新民）的首句。朱熹以汤之盘铭为例，说明'自新'是'新民'的前提，个人每日的道德更新是推己及人、革民之旧染的基础。"
        },
        "commentator": "朱熹",
        "note": "盘，沐浴之盘也。铭，名其器以自警之辞也。苟，诚也。汤以人之洗濯其心以去恶，如沐浴其身以去垢。故铭其盘，言诚能一日有以涤其旧染之污而自新，则当因其已新者，而日日新之，又日新之，不可略有间断也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第二章",
        "scripture_content": "日日新",
        "translation": "就应天天自新",
        "note_zheng": "",
        "note_kong": "言非唯一日之新，当使日日益新。",
        "note_zhu": "同上",
        "comparative_analysis": {
            "version_position_analysis": "此句为盘铭第二句，与'苟日新'、'又日新'连用。朱熹改本中属'传第二章'。",
            "commentary_comparison": "郑玄孔颖达疏强调日日益新。朱熹注'同上'，即延续'不可略有间断'之意。",
            "contextual_significance": "强调自新的连续性。"
        },
        "commentator": "朱熹",
        "note": "同上",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第二章",
        "scripture_content": "又日新",
        "translation": "每日不断自新",
        "note_zheng": "",
        "note_kong": "言非唯日日益新，又须恒常日新。",
        "note_zhu": "同上",
        "comparative_analysis": {
            "version_position_analysis": "盘铭第三句。",
            "commentary_comparison": "孔颖达强调'恒常日新'，朱熹强调'不可略有间断'，意思一致。",
            "contextual_significance": "进一步强化自新的恒常性。"
        },
        "commentator": "朱熹",
        "note": "同上",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第二章",
        "scripture_content": "作新民",
        "translation": "激励民众振作自新",
        "note_zheng": "",
        "note_kong": "成王既伐管叔、蔡叔，以殷余民封康叔。诰言殷人化纣恶俗，使之变改为新人。",
        "note_zhu": "鼓之舞之之谓作，言振起其自新之民也。",
        "comparative_analysis": {
            "version_position_analysis": "此句出自《尚书·康诰》，在古本中位于盘铭之后，同属'新民'段落。朱熹纳入'传第二章'。",
            "commentary_comparison": "郑玄孔颖达疏解释'作新民'的历史背景，即周公令康叔改造殷商遗民。朱熹则以'鼓之舞之'释'作'，强调激发民众内在的自新动力，而非外在强制，体现了儒家教化的温柔敦厚。",
            "contextual_significance": "此句将'自新'（盘铭）扩展到'新民'（作新民），完成了从个人修养到教化民众的过渡。朱熹以'振起其自新之民'解释，强调'新民'的本质是帮助民众自我更新。"
        },
        "commentator": "朱熹",
        "note": "鼓之舞之之谓作，言振起其自新之民也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第二章",
        "scripture_content": "其命惟新",
        "translation": "所受天命却是新的",
        "note_zheng": "",
        "note_kong": "此《大雅·文王》之篇。其诗之本意，言周虽旧是诸侯之邦，其受天之命，唯为天子而更新也。",
        "note_zhu": "诗大雅文王之篇。言周国虽旧，至于文王，能新其德以及于民，而始受天命也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏强调周受天命而更新为天子。朱熹则突出'能新其德以及于民'，将'天命更新'归因于'德之更新'，体现了理学的德性政治观。",
            "contextual_significance": "此句以天命更迭的宏大叙事，论证'新民'不仅是个人修养，更是政治合法性的基础。"
        },
        "commentator": "朱熹",
        "note": "诗大雅文王之篇。言周国虽旧，至于文王，能新其德以及于民，而始受天命也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第二章",
        "scripture_content": "君子无所不用其极",
        "translation": "所以君子无处不竭尽心力以求至善",
        "note_zheng": "极，犹尽也。",
        "note_kong": "极，尽也。言君子欲日新其德，无处不用其心尽力也。",
        "note_zhu": "自新新民，皆欲止于至善也。",
        "comparative_analysis": {
            "version_position_analysis": "此句是'新民'段落的总结句，在古本中位于'其命惟新'之后。朱熹纳入'传第二章'作为结语。",
            "commentary_comparison": "郑玄注'极，犹尽也'。孔颖达疏'无处不用其心尽力'。朱熹则将'极'解释为'至善'，'无所不用其极'意为在自新和新民两方面都追求至善，将'新民'章与'止于至善'纲领直接挂钩。",
            "contextual_significance": "此句是'传第二章'的总结，强调'新民'的功夫必须做到极致，直到'至善'。朱熹通过这一解释，将'新民'与'三纲领'中的'止于至善'紧密联结，使'传第二章'不孤立于全书体系。"
        },
        "commentator": "朱熹",
        "note": "自新新民，皆欲止于至善也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "惟民所止",
        "translation": "是民众安居的地方",
        "note_zheng": "",
        "note_kong": "此《商颂·玄鸟》之篇，言殷之邦畿方千里，唯人所居止。",
        "note_zhu": "诗商颂玄鸟之篇。邦畿，王者之都也。止，居也，言物各有所当止之处也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏以'居止'释'止'。朱熹则概括为'物各有所当止之处'，将'止'从具体的居住地提升为普遍的'所当止'的哲学范畴，为后文引出'知其所止'做铺垫。",
            "contextual_significance": "此句通过民众的居止，隐喻人应当找到自己道德上的'所止之处'。"
        },
        "commentator": "朱熹",
        "note": "诗商颂玄鸟之篇。邦畿，王者之都也。止，居也，言物各有所当止之处也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "止于丘隅",
        "translation": "栖息在山丘的一角",
        "note_zheng": "于止，于鸟之所止也。就而观之，知其所止，知鸟择岑蔚安闲而止处之耳，言人亦当择礼义乐土而自止处也。",
        "note_kong": "此《诗·小雅·缗蛮》之篇，刺幽王之诗。言缗蛮然微小之黄鸟，止在于岑蔚丘隅之处，得其所止。",
        "note_zhu": "诗小雅绵蛮之篇。缗蛮，鸟声。丘隅，岑蔚之处。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄注将鸟的择止引申为人当择礼义乐土而自止，已含有道德寓意。孔颖达疏描述性解释。朱熹注简洁，仅释词。",
            "contextual_significance": "黄鸟'止于丘隅'是'知其所止'的正面例证。"
        },
        "commentator": "朱熹",
        "note": "诗小雅绵蛮之篇。缗蛮，鸟声。丘隅，岑蔚之处。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "可以人而不如鸟乎",
        "translation": "难道人反而不如鸟吗",
        "note_zheng": "《论语》曰：\"里仁为美。择不处仁，焉得知？\"",
        "note_kong": "孔子见其诗文而论之云：是观于鸟之所止，则人亦知其所止。岂可以人不择止处，不如鸟乎？",
        "note_zhu": "子曰以下，孔子说诗之辞。言人当知所当止之处也。",
        "comparative_analysis": {
            "version_position_analysis": "孔子反诘句。",
            "commentary_comparison": "郑玄引《论语》'里仁为美'，将'知止'与'择仁而处'联系起来。孔颖达疏直解。朱熹概括为'人当知所当止之处'，与郑玄意通。",
            "contextual_significance": "此句以反问强烈要求人应当比鸟更有智慧，找到自己道德上的'当止之处'。"
        },
        "commentator": "朱熹",
        "note": "子曰以下，孔子说诗之辞。言人当知所当止之处也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "于缉熙敬止",
        "translation": "他的光明德行持续不断，恭敬地安守其位",
        "note_zheng": "缉熙，光明也。此美文王之德光明，敬其所以自止处。",
        "note_kong": "此《大雅·文王》之篇，美文王之诗。缉熙，谓光明也。文王之德，缉熙光明，又能敬其所止，以自居处也。",
        "note_zhu": "诗文王之篇。穆穆，深远之意。于，叹美辞。缉，继续也。熙，光明也。敬止，言其无不敬而安所止也。引此而言圣人之止，无非至善。五者乃其目之大者也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄注强调文王之德光明且'敬其所以自止处'。孔颖达疏同。朱熹则进一步点明'圣人之止，无非至善'，并预告下文将列举'五者'（仁、敬、孝、慈、信）作为'止于至善'的具体条目，将文王之'敬止'与后文的五伦之止紧密联系。",
            "contextual_significance": "此句是'传第三章'中从一般'知止'过渡到具体'五止'的关键。朱熹指出文王之'敬止'是'无不敬而安所止'，为下文'为人君止于仁'等五者提供了圣王典范。"
        },
        "commentator": "朱熹",
        "note": "诗文王之篇。穆穆，深远之意。于，叹美辞。缉，继续也。熙，光明也。敬止，言其无不敬而安所止也。引此而言圣人之止，无非至善。五者乃其目之大者也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "菉竹猗猗",
        "translation": "绿竹多么茂盛",
        "note_zheng": "\"菉竹猗猗\"，喻美盛。",
        "note_kong": "此《诗·卫风·淇奥》之篇，卫人美武公之德也。视彼淇水之隈曲之内，生此菉之与竹，猗猗然而茂盛，以淇水浸润故也。",
        "note_zhu": "诗卫风淇澳之篇。淇，水名。澳，隈也。猗猗，美盛貌。兴也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄注以'美盛'喻君子之德。孔颖达疏描述淇水浸润而生竹。朱熹明确标出'兴也'，点明此句是起兴手法，以绿竹之盛兴起君子之德。",
            "contextual_significance": "起兴，为下文'有斐君子'铺垫。"
        },
        "commentator": "朱熹",
        "note": "诗卫风淇澳之篇。淇，水名。澳，隈也。猗猗，美盛貌。兴也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "有斐君子",
        "translation": "有位文采斐然的君子",
        "note_zheng": "斐，有文章貌也。",
        "note_kong": "有斐然文章之君子，学问之益矣。",
        "note_zhu": "斐，文貌。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均以'文章/文貌'释'斐'，一致。",
            "contextual_significance": "引出君子形象。"
        },
        "commentator": "朱熹",
        "note": "斐，文貌。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "如切如磋",
        "translation": "如同切制骨器一样钻研学问，如同磋磨象牙一样修养自身",
        "note_zheng": "道犹言也。",
        "note_kong": "如骨之切，如象之磋，又能自修也。",
        "note_zhu": "切以刀锯，琢以椎凿，皆裁物使成形质也。磋以镴锡，磨以沙石，皆治物使其滑泽也。治骨角者，既切而复磋之。治玉石者，既琢而复磨之。皆言其治之有绪，而益致其精也。",
        "comparative_analysis": {
            "version_position_analysis": "此句与'如琢如磨'连用，形容君子修身的精细功夫。",
            "commentary_comparison": "郑玄注'道犹言也'，是为下文'道学也'作铺垫。孔颖达疏以'如骨之切，如象之磋'释之。朱熹则详细区分'切、磋、琢、磨'的工艺差异，并指出'皆言其治之有绪，而益致其精'，将制器过程比喻为修养功夫的循序渐进和精益求精，体现了宋儒对修养过程性的极致追求。",
            "contextual_significance": "此句与'如琢如磨'是'传第三章'中阐释君子'道学'与'自修'的形象比喻。朱熹指出'切、磋'对应'道学'（学问讲习），'琢、磨'对应'自修'（省察克治），为下文的分疏埋下伏笔。"
        },
        "commentator": "朱熹",
        "note": "切以刀锯，琢以椎凿，皆裁物使成形质也。磋以镴锡，磨以沙石，皆治物使其滑泽也。治骨角者，既切而复磋之。治玉石者，既琢而复磨之。皆言其治之有绪，而益致其精也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "如琢如磨",
        "translation": "如同雕琢美玉一样磨砺品格，如同打磨石头一样打磨心性",
        "note_zheng": "同上",
        "note_kong": "如玉之琢，如石之磨也。",
        "note_zhu": "同上",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "同上。",
            "contextual_significance": "见上句。"
        },
        "commentator": "朱熹",
        "note": "同上",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "瑟兮僩兮",
        "translation": "他庄重而威严",
        "note_zheng": "恂，字或作\"峻\"，读如严峻之\"峻\"，言其容貌严栗也。",
        "note_kong": "瑟然颜色矜庄，僩然性行宽大。",
        "note_zhu": "瑟，严密之貌。僩，武毅之貌。",
        "comparative_analysis": {
            "version_position_analysis": "形容君子的外在气度。",
            "commentary_comparison": "郑玄注将'僩'读为'峻'，解为'容貌严栗'。孔颖达疏以'颜色矜庄'、'性行宽大'分释'瑟'与'僩'。朱熹以'严密'、'武毅'释之，与郑孔相近。",
            "contextual_significance": "此句与'赫兮喧兮'共同描绘君子内外兼修所呈现出的德容之盛，为下文'恂栗'、'威仪'的解释作铺垫。"
        },
        "commentator": "朱熹",
        "note": "瑟，严密之貌。僩，武毅之貌。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "赫兮喧兮",
        "translation": "他显赫而光明",
        "note_zheng": "",
        "note_kong": "赫然颜色盛美，喧然威仪宣著。",
        "note_zhu": "赫喧，宣著盛大之貌。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏以'颜色盛美'、'威仪宣著'释之。朱熹以'宣著盛大'概括。",
            "contextual_significance": "见上句。"
        },
        "commentator": "朱熹",
        "note": "赫喧，宣著盛大之貌。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "终不可諠兮",
        "translation": "让人永远无法忘记",
        "note_zheng": "諠，忘也。",
        "note_kong": "斐然文章之君子，民皆爱念之，终久不可忘也。",
        "note_zhu": "諠，忘也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均释'諠'为'忘'，一致。",
            "contextual_significance": "强调君子盛德至善，使民众不能忘怀。"
        },
        "commentator": "朱熹",
        "note": "諠，忘也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "如切如磋者",
        "translation": "\"如切如磋\"说的是",
        "note_zheng": "道犹言也。",
        "note_kong": "",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "此句以下是《大学》作者对《诗经》的逐句解释，在古本中紧随'终不可諠兮'之后。朱熹纳入'传第三章'。",
            "commentary_comparison": "郑玄注'道犹言也'，点明以下为解释之辞。",
            "contextual_significance": "分疏'切磋琢磨'等句的具体含义，将诗歌意象转化为儒家修养功夫的术语。"
        },
        "commentator": "郑玄",
        "note": "道犹言也。",
        "dynasty": "东汉",
        "commentary_title": "礼记注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "道学也",
        "translation": "学问的精进",
        "note_zheng": "",
        "note_kong": "论道其学矣。言初习谓之学。",
        "note_zhu": "学，谓讲习讨论之事。",
        "comparative_analysis": {
            "version_position_analysis": "解释'如切如磋'。",
            "commentary_comparison": "孔颖达疏以'初习谓之学'。朱熹以'讲习讨论'释'学'，强调学习的互动性和深入性。",
            "contextual_significance": "将'切磋'对应'道学'，即学问的讲习讨论。"
        },
        "commentator": "朱熹",
        "note": "学，谓讲习讨论之事。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "自修也",
        "translation": "品德的自我修炼",
        "note_zheng": "",
        "note_kong": "谓自修饰矣。重习谓之修。",
        "note_zhu": "自修者，省察克治之功。",
        "comparative_analysis": {
            "version_position_analysis": "解释'如琢如磨'。",
            "commentary_comparison": "孔颖达疏以'自修饰'、'重习'释'修'。朱熹则以'省察克治'释'自修'，引入了理学中'克己复礼'的功夫论色彩，比孔疏更具道德实践的紧迫性。",
            "contextual_significance": "将'琢磨'对应'自修'，即内心的省察克治。"
        },
        "commentator": "朱熹",
        "note": "自修者，省察克治之功。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "恂栗也",
        "translation": "内心恭敬严谨",
        "note_zheng": "恂，字或作\"峻\"，读如严峻之\"峻\"，言其容貌严栗也。",
        "note_kong": "恂，读为\"峻\"，言颜色严峻战栗也。",
        "note_zhu": "恂栗，战惧也。",
        "comparative_analysis": {
            "version_position_analysis": "解释'瑟兮僩兮'。",
            "commentary_comparison": "郑玄、孔颖达均以'严峻战栗'释'恂栗'，强调外在容貌的严肃。朱熹以'战惧'释之，更侧重于内心的敬畏感。",
            "contextual_significance": "将'瑟僩'对应内在的'恂栗'（战惧敬畏），体现了儒家'诚于中，形于外'的思想。"
        },
        "commentator": "朱熹",
        "note": "恂栗，战惧也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "威仪也",
        "translation": "外在仪容威严光明",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "威，可畏也。仪，可像也。",
        "comparative_analysis": {
            "version_position_analysis": "解释'赫兮喧兮'。",
            "commentary_comparison": "朱熹注'威，可畏也；仪，可像也'，出自《左传》，强调威仪是内在德性的外在显现，令人敬畏且可效法。",
            "contextual_significance": "将'赫喧'对应外在的'威仪'，与上句'恂栗'（内在敬畏）形成内外呼应。"
        },
        "commentator": "朱熹",
        "note": "威，可畏也。仪，可像也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "民之不能忘也",
        "translation": "民众无法忘记他",
        "note_zheng": "民不能忘，以其意诚而德著也。",
        "note_kong": "论道武公盛德至极美善，人之爱念，不能忘也。",
        "note_zhu": "引诗而释之，以明明明德者之止于至善。道学自修，言其所以得之之由。恂栗、威仪，言其德容表里之盛。卒乃指其实而叹美之也。",
        "comparative_analysis": {
            "version_position_analysis": "结句。",
            "commentary_comparison": "郑玄注以'意诚而德著'解释民不能忘的原因，将'诚意'与'德著'关联。孔颖达疏以'盛德至极美善'释之。朱熹则对整段《淇奥》的解释作了总结：'道学自修'是得德之由，'恂栗威仪'是德容表里之盛，最终指向'止于至善'。朱熹的总结系统而完整，体现了理学对修养次第的清晰梳理。",
            "contextual_significance": "此句是'传第三章'中引《淇奥》的结论，强调'止于至善'的效果是民众的永久怀念。朱熹借此阐明'明明德者之止于至善'。"
        },
        "commentator": "朱熹",
        "note": "引诗而释之，以明明明德者之止于至善。道学自修，言其所以得之之由。恂栗、威仪，言其德容表里之盛。卒乃指其实而叹美之也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "于戏前王不忘",
        "translation": "啊，前代的君王令人难忘",
        "note_zheng": "圣人既有亲贤之德，其政又有乐利于民。君子小人，各有以思之。",
        "note_kong": "此《周颂·烈文》之篇也，美武王之诗。以文王、武王意诚于天下，故诗人叹美之，云此前世之王，其德不可忘也。",
        "note_zhu": "诗周颂烈文之篇。于戏，叹辞。前王，谓文、武也。",
        "comparative_analysis": {
            "version_position_analysis": "此句出自《诗经·周颂·烈文》，在古本中位于'民之不能忘也'之后，属于同一段落（'诗云：于戏前王不忘...此以没世不忘也'）。古本中此段紧接《淇奥》段。朱熹将其一并纳入'传第三章'。",
            "commentary_comparison": "郑玄注从君子小人不同角度解释'不忘'的原因：君子思其贤亲，小人思其乐利。孔颖达疏以'意诚于天下'释之。朱熹注简略。",
            "contextual_significance": "以前王（文王、武王）为例，说明'盛德至善'能够超越时代而被人铭记。"
        },
        "commentator": "朱熹",
        "note": "诗周颂烈文之篇。于戏，叹辞。前王，谓文、武也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "君子贤其贤而亲其亲",
        "translation": "后世的君子贤人敬重前王所敬重的贤人、亲近前王所亲近的亲族",
        "note_zheng": "",
        "note_kong": "言后世贵重之。言君子皆美此前王能贤其贤人而亲其族亲也。",
        "note_zhu": "君子，谓其后贤后王。",
        "comparative_analysis": {
            "version_position_analysis": "解释前王不忘的原因之一。",
            "commentary_comparison": "孔颖达疏以'后世贵重'释之。朱熹明确'君子'指'后贤后王'，即后世的贤者与君主。",
            "contextual_significance": "君子层面：前王的贤德与亲亲之道成为后世效法的榜样。"
        },
        "commentator": "朱熹",
        "note": "君子，谓其后贤后王。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "小人乐其乐而利其利",
        "translation": "后世的百姓享受前王所创造的安乐、获得前王所给予的利益",
        "note_zheng": "",
        "note_kong": "言后世卑贱小人，美此前王能爱乐其所乐，能利益其人之所利。",
        "note_zhu": "小人，谓后民也。",
        "comparative_analysis": {
            "version_position_analysis": "解释前王不忘的原因之二。",
            "commentary_comparison": "孔颖达疏以'爱乐其所乐，利益其人所利'释之。朱熹以'后民'释'小人'。",
            "contextual_significance": "小人（普通民众）层面：前王的善政惠及民生，使他们享受安乐与利益。"
        },
        "commentator": "朱熹",
        "note": "小人，谓后民也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第三章",
        "scripture_content": "此以没世不忘也",
        "translation": "因此前王虽已去世，人们却永不忘记",
        "note_zheng": "",
        "note_kong": "由前王意能精诚，垂于后世，故君子小人皆所美念。以此之故，终没于世，其德不忘也。",
        "note_zhu": "此言前王所以新民者止于至善，能使天下后世无一物不得其所，所以既没世而人思慕之，愈久而不忘也。",
        "comparative_analysis": {
            "version_position_analysis": "总结句。",
            "commentary_comparison": "孔颖达疏以'意能精诚，垂于后世'解释。朱熹则将'没世不忘'与'新民'、'止于至善'直接挂钩，指出前王'新民者止于至善'，使'天下后世无一物不得其所'，因此被永久怀念。朱熹的阐释将'没世不忘'提升为'止于至善'的最高政治效果。",
            "contextual_significance": "此句是'传第三章'的最终结语，强调'止于至善'所达到的境界能够超越时间，泽被万世。"
        },
        "commentator": "朱熹",
        "note": "此言前王所以新民者止于至善，能使天下后世无一物不得其所，所以既没世而人思慕之，愈久而不忘也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第四章",
        "scripture_content": "吾犹人也",
        "translation": "我和别人差不多",
        "note_zheng": "",
        "note_kong": "孔子称断狱犹如常人，无以异也。言吾与常人同也。",
        "note_zhu": "犹人，不异于人也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达、朱熹均释为'与常人相同'。",
            "contextual_significance": "孔子自谦，强调自己听讼的能力并不特殊。"
        },
        "commentator": "朱熹",
        "note": "犹人，不异于人也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第四章",
        "scripture_content": "必也使无讼乎",
        "translation": "一定要让诉讼根本不发生才好",
        "note_zheng": "",
        "note_kong": "必也使无理之人不敢争讼也。",
        "note_zhu": "引夫子之言，而言圣人能使无实之人不敢尽其虚诞之辞。盖我之明德既明，自然有以畏服民之心志，故讼不待听而自无也。",
        "comparative_analysis": {
            "version_position_analysis": "孔子语。",
            "commentary_comparison": "孔颖达疏以'使无理之人不敢争讼'解释。朱熹则从'明德既明，自然畏服民之心志'的角度阐释，将'无讼'归因于统治者德性的感召力，而非强制力，体现了儒家'德主刑辅'的思想。",
            "contextual_significance": "此句点出'无讼'是比'善听讼'更高的境界，为下文'知本'（以德化为本，以听讼为末）张本。"
        },
        "commentator": "朱熹",
        "note": "引夫子之言，而言圣人能使无实之人不敢尽其虚诞之辞。盖我之明德既明，自然有以畏服民之心志，故讼不待听而自无也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第四章",
        "scripture_content": "无情者不得尽其辞",
        "translation": "让隐瞒实情的人不敢尽情编造谎言",
        "note_zheng": "情，犹实也。无实者多虚诞之辞。",
        "note_kong": "情，实也。言无实情虚诞之人无道理者，不得尽竭其虚伪之辞也。",
        "note_zhu": "情，实也。",
        "comparative_analysis": {
            "version_position_analysis": "解释'无讼'的机制。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均以'实'释'情'，强调无实之人不敢尽言。",
            "contextual_significance": "说明当统治者德行足以畏服民心时，不诚实的人不敢捏造谎言。"
        },
        "commentator": "朱熹",
        "note": "情，实也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第四章",
        "scripture_content": "大畏民志",
        "translation": "使民众内心深深敬畏",
        "note_zheng": "本，谓诚其意也。",
        "note_kong": "大能畏胁民人之志。言人有虚诞之志者，皆畏惧不敢讼。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "进一步解释。",
            "commentary_comparison": "郑玄注在此处点出'本，谓诚其意也'，将'大畏民志'的根本归之于'诚意'，体现了汉儒对'诚意'的重视。孔颖达疏承之。",
            "contextual_significance": "'大畏民志'是'使无讼'的直接效果，而其根本（本）在于'诚意'。"
        },
        "commentator": "郑玄",
        "note": "本，谓诚其意也。",
        "dynasty": "东汉",
        "commentary_title": "礼记注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第四章",
        "scripture_content": "此谓知本",
        "translation": "这就叫做知道根本",
        "note_zheng": "本，谓诚其意也。",
        "note_kong": "此从上\"所谓诚意\"以下言此\"大畏民志\"以上，皆是诚意之事。意为行本，既精诚其意，是晓知其本。",
        "note_zhu": "观于此言，可以知本末之先后矣。",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于'大畏民志'之后，是'听讼'段落的结语。朱熹将其作为'传第四章'的结语。",
            "commentary_comparison": "郑玄注以'诚其意'为'本'。孔颖达疏进一步阐发。朱熹则概括为'知本末之先后'，点出此章的核心是分辨本末先后（以德化为本，以听讼为末）。",
            "contextual_significance": "此句是'传第四章'的点睛之笔，明确'知本'即知道'诚意'是根本，听讼是末节。朱熹借此完成对'本末'这一纲领的阐释。"
        },
        "commentator": "朱熹",
        "note": "观于此言，可以知本末之先后矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第五章",
        "scripture_content": "此谓知本",
        "translation": "这就叫做知道根本",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "程子曰：\"衍文也。\"",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于'此谓知之至也'之前，古本原文为'...此谓知本，此谓知之至也'。朱熹认为'此谓知本'是衍文（重复），故在'传第五章'中标注程子之说。",
            "commentary_comparison": "郑玄、孔颖达朱熹引程子判为衍文。",
            "contextual_significance": "朱熹认为此句是重复的衍文，故不单独阐释，将其归入'传第五章'（格物致知补传）之前的冗余文字。"
        },
        "commentator": "朱熹",
        "note": "程子曰：\"衍文也。\"",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第五章",
        "scripture_content": "此谓知之至也",
        "translation": "这就叫做认知的最高境界",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "此句之上别有阙文，此特其结语耳。右传之五章，盖释格物、致知之义，而今亡矣。间尝窃取程子之意以补之曰：\"所谓致知在格物者，言欲致吾之知，在即物而穷其理也。盖人心之灵莫不有知，而天下之物莫不有理，惟于理有未穷，故其知有不尽也。是以大学始教，必使学者即凡天下之物，莫不因其已知之理而益穷之，以求至乎其极。至于用力之久，而一旦豁然贯通焉，则众物之表里精粗无不到，而吾心之全体大用无不明矣。此谓物格，此谓知之至也。\"",
        "comparative_analysis": {
            "version_position_analysis": "此句在古本中位于'此谓知本'之后，是'经一章'的结尾。古本中此句之后直接接'所谓诚其意者'。朱熹认为此处有阙文，故将'此谓知之至也'作为'传第五章'的结语，并在其前补写了著名的'格物补传'。",
            "commentary_comparison": "郑玄、孔颖达对此句朱熹则作了长篇补传，系统阐述了'格物致知'的理学认识论：'即物而穷其理'、'豁然贯通'、'众物表里精粗无不到，吾心全体大用无不明'。这是朱熹对《大学》最重要的理论贡献之一，将'格物'从汉唐的感应论彻底改造为理性主义的穷理说。",
            "contextual_significance": "此句是'传第五章'（释格物致知）的结语。朱熹通过补传，填补了古本中'格物致知'阐释的缺失，使'八条目'的功夫次第得以完整。'知之至'即认知的极致，是'物格'的结果，也是'诚意'的前提。"
        },
        "commentator": "朱熹",
        "note": "此句之上别有阙文，此特其结语耳。右传之五章，盖释格物、致知之义，而今亡矣。间尝窃取程子之意以补之曰：\"所谓致知在格物者，言欲致吾之知，在即物而穷其理也。盖人心之灵莫不有知，而天下之物莫不有理，惟于理有未穷，故其知有不尽也。是以大学始教，必使学者即凡天下之物，莫不因其已知之理而益穷之，以求至乎其极。至于用力之久，而一旦豁然贯通焉，则众物之表里精粗无不到，而吾心之全体大用无不明矣。此谓物格，此谓知之至也。\"",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "所谓诚其意者",
        "translation": "所谓使意念真诚",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "诚其意者，自修之首也。",
        "comparative_analysis": {
            "version_position_analysis": "此句是'诚意'章的开头。在古本中，'诚意'章位于'此谓知之至也'之后，内容从'所谓诚其意者'到'故君子必诚其意'。朱熹将其列为'传第六章'，位置与古本一致。",
            "commentary_comparison": "郑玄、孔颖达朱熹注'诚其意者，自修之首也'，点明'诚意'在'八条目'中处于'自修'（修身）的起始位置，是内圣功夫的关键一步。",
            "contextual_significance": "此句是'传第六章'（释诚意）的总起。朱熹强调'诚意'是'自修之首'，因为意念的真诚与否只有自己知道，是内外之分的临界点。"
        },
        "commentator": "朱熹",
        "note": "诚其意者，自修之首也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "毋自欺也",
        "translation": "就是不要自己欺骗自己",
        "note_zheng": "",
        "note_kong": "言欲精诚其意，无自欺诳于身。言于身必须诚实也。",
        "note_zhu": "毋者，禁止之辞。自欺云者，知为善以去恶，而心之所发有未实也。",
        "comparative_analysis": {
            "version_position_analysis": "解释'诚其意'的核心。",
            "commentary_comparison": "孔颖达疏以'无自欺诳于身'释之，强调对自身诚实。朱熹则进一步分析'自欺'的机制：'知为善以去恶，而心之所发有未实'，即明知善当为、恶当去，但内心意念却不完全真实。朱熹将'自欺'界定为知与意之间的断裂，深化了'诚意'的功夫难度。",
            "contextual_significance": "'毋自欺'是'诚意'章的核心命题。朱熹指出，'自欺'不同于'伪'（明知故犯的作伪），而是半知半不知的状态，因此'慎独'的功夫尤为重要。"
        },
        "commentator": "朱熹",
        "note": "毋者，禁止之辞。自欺云者，知为善以去恶，而心之所发有未实也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "如恶恶臭",
        "translation": "要像厌恶腐臭的气味一样厌恶恶行",
        "note_zheng": "",
        "note_kong": "谓见此恶事，人嫌恶之，如人嫌臭秽之气。心实嫌之，口不可道矣。",
        "note_zhu": "恶恶臭，如好好色，皆务决去，而求必得之，以自快足于己，不可徒苟且以殉外而为人也。",
        "comparative_analysis": {
            "version_position_analysis": "比喻诚意之真切。",
            "commentary_comparison": "孔颖达疏以'心实嫌之'解释，强调内心真实的厌恶。朱熹则强调'务决去'和'自快足于己'，即诚意必须是发自内心的、自我满足的，而不是为了做给别人看。",
            "contextual_significance": "此句与下句'如好好色'共同说明'诚意'就是意念如同生理本能一样真实自然，没有虚假。"
        },
        "commentator": "朱熹",
        "note": "恶恶臭，如好好色，皆务决去，而求必得之，以自快足于己，不可徒苟且以殉外而为人也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "如好好色",
        "translation": "要像喜爱美丽的容貌一样喜爱善行",
        "note_zheng": "",
        "note_kong": "谓见此善事而爱好之，如似人好色。心实好之，口不可道矣。",
        "note_zhu": "同上",
        "comparative_analysis": {
            "version_position_analysis": "比喻。",
            "commentary_comparison": "孔颖达疏'心实好之'。朱熹同上。",
            "contextual_significance": "同上。"
        },
        "commentator": "朱熹",
        "note": "同上",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "此之谓自谦",
        "translation": "这就叫做自我满足、心安理得",
        "note_zheng": "谦，读为慊，慊之言厌也。厌，读为黡，黡，闭藏貌也。",
        "note_kong": "谦，读如\"慊\"。慊然，安静之貌。心虽好恶而口不言，应自然安静也。",
        "note_zhu": "谦读为慊，苦劫反。谦，快也，足也。",
        "comparative_analysis": {
            "version_position_analysis": "总结'如恶恶臭，如好好色'的效果。",
            "commentary_comparison": "郑玄注将'谦'读为'慊'，并解释为'闭藏貌'，强调内心好恶不形于言的自然安静。孔颖达疏承之。朱熹则释为'快也，足也'，强调自我满足、内心快足。二者侧重点不同：郑孔重'自然安静'，朱熹重'自快自足'。",
            "contextual_significance": "'自谦'是'诚意'的内在效果：意念真实无伪，内心自然安宁满足，无需外求。"
        },
        "commentator": "朱熹",
        "note": "谦读为慊，苦劫反。谦，快也，足也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "故君子必慎其独也",
        "translation": "所以君子在独处时一定要谨慎",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "独者，人所不知而己所独知之地也。言欲自修者知为善以去其恶，则当实用其力，而禁止其自欺。然其实与不实，盖有他人所不及知而己独知之者，故必谨之于此以审其几焉。",
        "comparative_analysis": {
            "version_position_analysis": "由'自谦'引出'慎独'。",
            "commentary_comparison": "郑玄、孔颖达朱熹对'慎独'作了经典阐释：'独'是'人所不知而己所独知之地'，即只有自己知道的意念发端之处。'慎独'就是在这一隐秘之处审察自己的意念是否真实，防止自欺。朱熹将'慎独'提升为'诚意'功夫的核心，对后世儒学修养论影响深远。",
            "contextual_significance": "此句是'诚意'章的第一个'慎独'强调。朱熹指出，因为意念的实伪只有自己知道，所以必须在独知之地用力，这是自修的关键。"
        },
        "commentator": "朱熹",
        "note": "独者，人所不知而己所独知之地也。言欲自修者知为善以去其恶，则当实用其力，而禁止其自欺。然其实与不实，盖有他人所不及知而己独知之者，故必谨之于此以审其几焉。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "小人闲居为不善",
        "translation": "小人独处时做不好的事",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "闲居，独处也。",
        "comparative_analysis": {
            "version_position_analysis": "反面例证。",
            "commentary_comparison": "朱熹注'闲居，独处也'。",
            "contextual_significance": "以小人独处时的行为反衬'慎独'的必要性。"
        },
        "commentator": "朱熹",
        "note": "闲居，独处也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "见君子而后厌然",
        "translation": "见到君子后就躲躲闪闪",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "厌然，消沮闭藏之貌。",
        "comparative_analysis": {
            "version_position_analysis": "小人的伪装。",
            "commentary_comparison": "朱熹释'厌然'为'消沮闭藏'，即神情沮丧、躲躲藏藏。",
            "contextual_significance": "小人虽然独处时为恶，但见到君子时仍会试图掩盖，说明其并非不知善恶，只是不能诚意。"
        },
        "commentator": "朱熹",
        "note": "厌然，消沮闭藏之貌。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "而著其善",
        "translation": "而显露自己的善",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "此言小人阴为不善，而阳欲掩之，则是非不知善之当为与恶之当去也；但不能实用其力以至此耳。",
        "comparative_analysis": {
            "version_position_analysis": "小人的伪装。",
            "commentary_comparison": "朱熹指出小人'阴为不善，而阳欲掩之'，说明他们并非不知善恶，而是缺乏诚意和实功。",
            "contextual_significance": "小人的行为恰恰证明了'诚意'的必要性：知道善恶却做不到，是因为意念不实。"
        },
        "commentator": "朱熹",
        "note": "此言小人阴为不善，而阳欲掩之，则是非不知善之当为与恶之当去也；但不能实用其力以至此耳。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "如见其肺肝然",
        "translation": "就像能看见肺和肝一样清楚",
        "note_zheng": "",
        "note_kong": "言小人为恶，外人视之，昭然明察矣，如见肺肝。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "比喻。",
            "commentary_comparison": "孔颖达疏强调小人的恶行无法隐藏，外人看得清清楚楚。",
            "contextual_significance": "强调内在的真实必然显露于外，掩盖无用。"
        },
        "commentator": "孔颖达",
        "note": "言小人为恶，外人视之，昭然明察矣，如见肺肝。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "则何益矣",
        "translation": "这样做又有什么益处呢",
        "note_zheng": "",
        "note_kong": "虽暂时掩藏，言何益矣？",
        "note_zhu": "然欲掩其恶而卒不可掩，欲诈为善而卒不可诈，则亦何益之有哉！",
        "comparative_analysis": {
            "version_position_analysis": "反诘。",
            "commentary_comparison": "孔颖达、朱熹均认为掩藏恶行毫无益处，因为最终无法隐藏。",
            "contextual_significance": "警告小人不要自欺欺人。"
        },
        "commentator": "朱熹",
        "note": "然欲掩其恶而卒不可掩，欲诈为善而卒不可诈，则亦何益之有哉！",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "形于外",
        "translation": "就会显露在外表",
        "note_zheng": "",
        "note_kong": "言此小人既怀诚实恶事于中心，必形见于外，不可掩藏。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏指出内心的恶必然形于外。",
            "contextual_significance": "与'诚于中'共同构成儒家内外一致的基本原理。"
        },
        "commentator": "孔颖达",
        "note": "言此小人既怀诚实恶事于中心，必形见于外，不可掩藏。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "故君子必慎其独也",
        "translation": "所以君子在独处时一定要谨慎",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "此君子所以重以为戒，而必谨其独也。",
        "comparative_analysis": {
            "version_position_analysis": "再次强调'慎独'。",
            "commentary_comparison": "朱熹点明此句是重申'慎独'之戒。",
            "contextual_significance": "因为'诚中形外'，所以独处时更要谨慎，这是第二次强调。"
        },
        "commentator": "朱熹",
        "note": "此君子所以重以为戒，而必谨其独也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "其严乎",
        "translation": "这是多么严厉啊",
        "note_zheng": "严乎，言可畏敬也。",
        "note_kong": "既视者及指者皆众，其所畏敬，可严惮乎！",
        "note_zhu": "引此以明上文之意。言虽幽独之中，而其善恶之不可掩如此。可畏之甚也。",
        "comparative_analysis": {
            "version_position_analysis": "感叹。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均强调其可畏可敬。",
            "contextual_significance": "以'严乎'收束曾子语，强化'慎独'的严肃性。"
        },
        "commentator": "朱熹",
        "note": "引此以明上文之意。言虽幽独之中，而其善恶之不可掩如此。可畏之甚也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "富润屋",
        "translation": "财富能装饰房屋",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "言富则能润屋矣。",
        "comparative_analysis": {
            "version_position_analysis": "比喻。",
            "commentary_comparison": "朱熹简注。",
            "contextual_significance": "以'富润屋'比喻'德润身'，说明德行的内在滋养作用。"
        },
        "commentator": "朱熹",
        "note": "言富则能润屋矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "德润身",
        "translation": "德行能滋润身心",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "德则能润身矣。",
        "comparative_analysis": {
            "version_position_analysis": "核心比喻。",
            "commentary_comparison": "朱熹简注。",
            "contextual_significance": "强调德行对身心的正面影响。"
        },
        "commentator": "朱熹",
        "note": "德则能润身矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "心广体胖",
        "translation": "心胸宽广则身体安泰舒坦",
        "note_zheng": "胖，犹大也。三者，言有实于内，显见于外。",
        "note_kong": "言内心宽广，则外体胖大。言为之于中，必形见于外也。",
        "note_zhu": "胖，安舒也。故心无愧怍，则广大宽平，而体常舒泰，德之润身者然也。",
        "comparative_analysis": {
            "version_position_analysis": "诚意效果。",
            "commentary_comparison": "郑玄以'胖'为'大'，强调形体宽大。孔颖达疏承之。朱熹则释为'安舒'，更侧重于心理感受的舒泰。现代多从朱熹说。",
            "contextual_significance": "'心广体胖'是'诚意'后'德润身'的具体表现：内心无愧，身体自然安泰舒坦。"
        },
        "commentator": "朱熹",
        "note": "胖，安舒也。故心无愧怍，则广大宽平，而体常舒泰，德之润身者然也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第六章",
        "scripture_content": "故君子必诚其意",
        "translation": "所以君子一定要使自己的意念真诚",
        "note_zheng": "",
        "note_kong": "以有内见于外，必须精诚其意在内，心不可虚也。",
        "note_zhu": "盖善之实于中而形于外者如此，故又言此以结之。",
        "comparative_analysis": {
            "version_position_analysis": "总结句。",
            "commentary_comparison": "孔颖达疏强调内外一致。朱熹点明此句总结上文。",
            "contextual_significance": "'诚意'章的最终结论，呼应开篇'所谓诚其意者'，形成完整闭环。"
        },
        "commentator": "朱熹",
        "note": "盖善之实于中而形于外者如此，故又言此以结之。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第七章",
        "scripture_content": "身有所忿懥",
        "translation": "如果内心有所愤怒",
        "note_zheng": "懥，怒貌也，或作懫，或为疐。",
        "note_zhu": "程子曰：\"身有之身当作心。\"忿懥，怒也。盖是四者，皆心之用，而人所不能无者。然一有之而不能察，则欲动情胜，而其用之所行，或不能不失其正矣。",
        "comparative_analysis": {
            "version_position_analysis": "此句是'正心修身'章的开头。在古本中，'所谓修身在正其心者'段落位于'此谓知本'之后、'所谓齐其家在修其身者'之前。朱熹将其列为'传第七章'，位置与古本一致。",
            "commentary_comparison": "郑玄注仅释'懥'为怒貌。孔颖达朱熹则引程子，指出'身'当作'心'，并系统阐述了四者（忿懥、恐惧、好乐、忧患）都是'心之用'，本身不能无，但若不能察觉，就会导致'欲动情胜'而失其正。朱熹将情绪问题纳入心性修养的框架，比汉唐注疏更具哲学深度。",
            "contextual_significance": "此句开启'传第七章'（释正心修身）。朱熹指出'忿懥'等情绪是心之用，但过度或未能觉察就会遮蔽心之本体，导致'不得其正'。"
        },
        "commentator": "朱熹",
        "note": "程子曰：\"身有之身当作心。\"忿懥，怒也。盖是四者，皆心之用，而人所不能无者。然一有之而不能察，则欲动情胜，而其用之所行，或不能不失其正矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第七章",
        "scripture_content": "心不在焉",
        "translation": "心思不在这里",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "心有不存，则无以检其身，是以君子必察乎此而敬以直之，然后此心常存而身无不修也。",
        "comparative_analysis": {
            "version_position_analysis": "进一步说明心不正的表现。",
            "commentary_comparison": "朱熹注指出'心有不存，则无以检其身'，强调心对身的主宰作用，'敬以直之'是存心的功夫。",
            "contextual_significance": "'心不在焉'形象地说明心若不在，感官功能便失灵，以此论证'修身在正其心'。"
        },
        "commentator": "朱熹",
        "note": "心有不存，则无以检其身，是以君子必察乎此而敬以直之，然后此心常存而身无不修也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第七章",
        "scripture_content": "食而不知其味",
        "translation": "吃了却尝不出味道",
        "note_zheng": "",
        "note_kong": "此言修身之本，必在正心。若心之不正，身亦不修。若心之不在，视、听与食不觉知也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "例证。",
            "commentary_comparison": "孔颖达疏总结心不正则身不修。",
            "contextual_significance": "同上。"
        },
        "commentator": "孔颖达",
        "note": "此言修身之本，必在正心。若心之不正，身亦不修。若心之不在，视、听与食不觉知也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "人之其所亲爱而辟焉",
        "translation": "人们对于自己所亲近喜爱的人往往有偏袒",
        "note_zheng": "之，适也。譬，犹喻也。言适彼而以心度之，曰：吾何以亲爱此人，非以其有德美与？反以喻己，则身修与否，可自知也。",
        "note_kong": "之，犹适也。设我适彼人，见彼有德，则为我所亲爱，当反自譬喻于我也。",
        "note_zhu": "人，谓众人。之，犹于也。辟，犹偏也。五者，在人本有当然之则；然常人之情惟其所向而不加审焉，则必陷于一偏而身不修矣。",
        "comparative_analysis": {
            "version_position_analysis": "此句是'修身齐家'章的开头。在古本中，'所谓齐其家在修其身者'段落位于'修身在正其心'之后。朱熹将其列为'传第八章'，位置与古本一致。",
            "commentary_comparison": "郑玄注将'之'解释为'适'（到），'譬'为'喻'，意思是设身处地、反观自身。孔颖达疏承之。朱熹则直接释'之'为'于'，'辟'为'偏'，指出人们对于亲爱、贱恶、畏敬、哀矜、敖惰五种对象容易产生偏颇，导致身不修。朱熹的解释更直白，省略了郑玄的设喻环节。",
            "contextual_significance": "此句开启'传第八章'（释修身齐家）。朱熹指出常人之情容易因对象不同而产生偏颇，从而影响修身，进而影响齐家。"
        },
        "commentator": "朱熹",
        "note": "人，谓众人。之，犹于也。辟，犹偏也。五者，在人本有当然之则；然常人之情惟其所向而不加审焉，则必陷于一偏而身不修矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "之其所贱恶而辟焉",
        "translation": "对于自己所鄙视厌恶的人往往有偏见",
        "note_zheng": "",
        "note_kong": "我往之彼，而贱恶彼人者，必是彼人无德故也。亦当回以譬我，我若无德，则人亦贱恶我也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "五偏之二。",
            "commentary_comparison": "孔颖达疏延续郑玄的设喻法。",
            "contextual_significance": "同上。"
        },
        "commentator": "孔颖达",
        "note": "我往之彼，而贱恶彼人者，必是彼人无德故也。亦当回以譬我，我若无德，则人亦贱恶我也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "之其所畏敬而辟焉",
        "translation": "对于自己所畏惧尊敬的人往往有偏颇",
        "note_zheng": "",
        "note_kong": "我往之彼，而畏敬彼人，必是彼人庄严故也。亦回其譬我，我亦当庄敬，则人亦必畏敬我。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "五偏之三。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "同上。"
        },
        "commentator": "孔颖达",
        "note": "我往之彼，而畏敬彼人，必是彼人庄严故也。亦回其譬我，我亦当庄敬，则人亦必畏敬我。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "之其所哀矜而辟焉",
        "translation": "对于自己所哀伤怜悯的人往往有偏爱",
        "note_zheng": "",
        "note_kong": "我往之彼，而哀矜彼人，必是彼人有慈善柔弱之德故也。亦回譬我，我有慈善而或柔弱，则亦为人所哀矜也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "五偏之四。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "同上。"
        },
        "commentator": "孔颖达",
        "note": "我往之彼，而哀矜彼人，必是彼人有慈善柔弱之德故也。亦回譬我，我有慈善而或柔弱，则亦为人所哀矜也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "之其所敖惰而辟焉",
        "translation": "对于自己所傲慢怠慢的人往往有偏执",
        "note_zheng": "",
        "note_kong": "我往之彼，而敖惰彼人，必是彼人邪僻故也。亦回譬我，我若邪僻，则人亦敖惰于我也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "五偏之五。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "同上。"
        },
        "commentator": "孔颖达",
        "note": "我往之彼，而敖惰彼人，必是彼人邪僻故也。亦回譬我，我若邪僻，则人亦敖惰于我也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "天下鲜矣",
        "translation": "天下这样的人是很少的",
        "note_zheng": "鲜，罕也。",
        "note_kong": "鲜，少也。人心多偏。若心爱好之，而多不知其恶；若嫌恶之，而多不知其美。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "感叹。",
            "commentary_comparison": "郑玄、孔颖达均强调人心多偏。",
            "contextual_significance": "说明克服情感偏颇极为困难。"
        },
        "commentator": "郑玄",
        "note": "鲜，罕也。",
        "dynasty": "东汉",
        "commentary_title": "礼记注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "人莫知其子之恶",
        "translation": "没有人会知道自己孩子的缺点",
        "note_zheng": "人莫知其子之恶，犹爱而不察。",
        "note_kong": "言人之爱子，其意至甚，子虽有恶，不自觉知，犹好而不知其恶也。",
        "note_zhu": "溺爱者不明。",
        "comparative_analysis": {
            "version_position_analysis": "举例说明偏爱的后果。",
            "commentary_comparison": "郑玄、孔颖达以'爱而不察'解释。朱熹以'溺爱者不明'概括，简练有力。",
            "contextual_significance": "以父母溺爱子女为例，说明情感偏颇导致认知扭曲。"
        },
        "commentator": "朱熹",
        "note": "溺爱者不明。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "莫知其苗之硕",
        "translation": "没有人会满足于自己禾苗的茁壮",
        "note_zheng": "硕，大也。",
        "note_kong": "农夫种田，恒欲其盛，苗虽硕大，犹嫌其恶，以贪心过甚，故不知其苗之硕。",
        "note_zhu": "贪得者无厌，是则偏之为害，而家之所以不齐也。",
        "comparative_analysis": {
            "version_position_analysis": "举例说明贪欲的后果。",
            "commentary_comparison": "孔颖达疏以'贪心过甚'解释。朱熹以'贪得者无厌'概括，并点明'偏之为害，而家之所以不齐'，将这一例证与'齐家'主题直接关联。",
            "contextual_significance": "以农夫不满足禾苗为例，说明贪欲导致不知足，也是'偏'的一种表现。"
        },
        "commentator": "朱熹",
        "note": "贪得者无厌，是则偏之为害，而家之所以不齐也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第八章",
        "scripture_content": "此谓身不修不可以齐其家",
        "translation": "这就叫做自身修养不好，就无法整治好家庭",
        "note_zheng": "",
        "note_kong": "此不知子恶、不知苗硕之人，不修其身，身既不修，不能以己譬人，故不可以齐整其家。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "总结句。",
            "commentary_comparison": "孔颖达疏总结上文。",
            "contextual_significance": "'传第八章'的结论，点明'修身'是'齐家'的前提。"
        },
        "commentator": "孔颖达",
        "note": "此不知子恶、不知苗硕之人，不修其身，身既不修，不能以己譬人，故不可以齐整其家。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "故君子不出家而成教于国",
        "translation": "所以君子不用走出家门，就能把教化推广到全国",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "身修，则家可教矣；孝、弟、慈，所以修身而教于家者也；然而国之所以事君事长使众之道不外乎此。",
        "comparative_analysis": {
            "version_position_analysis": "核心论点。",
            "commentary_comparison": "朱熹指出'孝、弟、慈'是修身教家的内容，也是治国事君、事长、使众的道理。",
            "contextual_significance": "此句是'传第九章'的总纲，强调家庭伦理与国家政治的内在统一。"
        },
        "commentator": "朱熹",
        "note": "身修，则家可教矣；孝、弟、慈，所以修身而教于家者也；然而国之所以事君事长使众之道不外乎此。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "如保赤子",
        "translation": "爱护民众如同爱护初生的婴儿",
        "note_zheng": "养子者，推心为之，而中于赤子之嗜欲也。",
        "note_kong": "此成王命康叔之辞。赤子，谓心所爱之子。言治民之时，如保爱赤子。",
        "note_zhu": "此引书而释之，又明立教之本不假强为，在识其端而推广之耳。",
        "comparative_analysis": {
            "version_position_analysis": "引《康诰》进一步论证。",
            "commentary_comparison": "郑玄注强调'推心为之'，即设身处地。孔颖达疏以'保爱赤子'解之。朱熹则点明'立教之本不假强为，在识其端而推广之'，将慈爱之心视为天生的善端，只需推扩即可。",
            "contextual_significance": "以父母爱护婴儿的天性，比喻君主爱护民众也应出于自然真诚。"
        },
        "commentator": "朱熹",
        "note": "此引书而释之，又明立教之本不假强为，在识其端而推广之耳。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "不远矣",
        "translation": "也相差不远了",
        "note_zheng": "",
        "note_kong": "言爱此赤子，内心精诚，求赤子之嗜欲，虽不能正中其所欲，去其所嗜欲其不甚远。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "同上。"
        },
        "commentator": "孔颖达",
        "note": "言爱此赤子，内心精诚，求赤子之嗜欲，虽不能正中其所欲，去其所嗜欲其不甚远。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "未有学养子而后嫁者也",
        "translation": "世上没有哪个女子是先学会养育孩子然后再出嫁的",
        "note_zheng": "",
        "note_kong": "言母之养子，自然而爱，非由学习而来。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "类比。",
            "commentary_comparison": "孔颖达疏强调慈爱是天性，非学习所得。",
            "contextual_significance": "说明慈爱之心是天然的，治国中的'使众'也应源于天性之仁。"
        },
        "commentator": "孔颖达",
        "note": "言母之养子，自然而爱，非由学习而来。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "一人贪戾",
        "translation": "君主一人贪婪暴戾",
        "note_zheng": "\"戾\"之言\"利\"也。",
        "note_kong": "",
        "note_zhu": "一人，谓君也。",
        "comparative_analysis": {
            "version_position_analysis": "反面例证。",
            "commentary_comparison": "郑玄注'戾'为'利'，即贪利。朱熹注'一人谓君'。",
            "contextual_significance": "君主贪戾，一国就会作乱。"
        },
        "commentator": "朱熹",
        "note": "一人，谓君也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "一国作乱",
        "translation": "一国就会随之动乱",
        "note_zheng": "",
        "note_kong": "谓人君一人贪戾恶事，则一国学之作乱。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "效果。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "同上。"
        },
        "commentator": "孔颖达",
        "note": "谓人君一人贪戾恶事，则一国学之作乱。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "其机如此",
        "translation": "事情的关键就是这样",
        "note_zheng": "机，发动所由也。",
        "note_kong": "机，谓关机也。动于近，成于远。善恶之事，亦发于身而及于一国也。",
        "note_zhu": "机，发动所由也。",
        "comparative_analysis": {
            "version_position_analysis": "总结原理。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均以'发动所由'释'机'，强调君主是善恶之机。",
            "contextual_significance": "'机'指关键、枢纽，强调君主一家的行为是国家治乱的关键。"
        },
        "commentator": "朱熹",
        "note": "机，发动所由也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "此谓一言偾事",
        "translation": "这就叫做一句话可以败坏大事",
        "note_zheng": "偾，犹覆败也。",
        "note_kong": "偾，犹覆败也。谓人君一言覆败其事，谓恶言也。",
        "note_zhu": "偾，覆败也。",
        "comparative_analysis": {
            "version_position_analysis": "进一步强调。",
            "commentary_comparison": "郑、孔、朱均释'偾'为覆败。",
            "contextual_significance": "强调言语和行为的影响力。"
        },
        "commentator": "朱熹",
        "note": "偾，覆败也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "一人定国",
        "translation": "一个人可以安定国家",
        "note_zheng": "",
        "note_kong": "谓由人君一人能定其国，谓善政也。",
        "note_zhu": "此言教成于国之效。",
        "comparative_analysis": {
            "version_position_analysis": "正面强调。",
            "commentary_comparison": "孔颖达疏以'善政'解释。朱熹以'教成于国之效'总结。",
            "contextual_significance": "强调君主一人之德可以安定国家。"
        },
        "commentator": "朱熹",
        "note": "此言教成于国之效。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "而民不从",
        "translation": "民众就不会听从",
        "note_zheng": "",
        "note_kong": "令，谓君所号令之事。若各随其行之所好，则人从之。其所好者是恶，所令者是善，则所令之事反其所好，虽欲以令禁人，人不从也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "结果。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "如果君主自身行为与命令相悖，民众不会服从。"
        },
        "commentator": "孔颖达",
        "note": "令，谓君所号令之事。若各随其行之所好，则人从之。其所好者是恶，所令者是善，则所令之事反其所好，虽欲以令禁人，人不从也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "是故君子有诸己而后求诸人",
        "translation": "所以君子必须自己先有善行，然后才能要求别人行善",
        "note_zheng": "有于己，谓有仁让也。",
        "note_kong": "诸，于也。谓君子有善行于己，而后可以求于人使行善行也。",
        "note_zhu": "有善于己，然后可以责人之善。",
        "comparative_analysis": {
            "version_position_analysis": "推己及人的正面原则。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均强调先有诸己。",
            "contextual_significance": "这是'恕道'的正面表述：要求别人做到的，自己先做到。"
        },
        "commentator": "朱熹",
        "note": "有善于己，然后可以责人之善。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "无诸己而后非诸人",
        "translation": "自己先没有恶行，然后才能纠正别人的恶行",
        "note_zheng": "无于己，谓无贪戾也。",
        "note_kong": "谓无恶行于己，而后可以非责于人为恶行也。",
        "note_zhu": "无恶于己，然后可以正人之恶。皆推己以及人，所谓恕也。",
        "comparative_analysis": {
            "version_position_analysis": "推己及人的反面原则。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均强调先无诸己。朱熹点明这是'恕道'。",
            "contextual_significance": "要求别人不做的，自己先不做。"
        },
        "commentator": "朱熹",
        "note": "无恶于己，然后可以正人之恶。皆推己以及人，所谓恕也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "未之有也",
        "translation": "那是从来不会有的",
        "note_zheng": "",
        "note_kong": "谓所藏积于身既不恕实，而能晓喻于人使从己者，未之有也。",
        "note_zhu": "喻，晓也。",
        "comparative_analysis": {
            "version_position_analysis": "结论。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "强调恕道是教化的前提。"
        },
        "commentator": "朱熹",
        "note": "喻，晓也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "桃之夭夭",
        "translation": "桃花开得娇艳",
        "note_zheng": "夭夭、蓁蓁，美盛貌。",
        "note_kong": "此《周南·桃夭》之篇。言桃之夭夭少壮。",
        "note_zhu": "诗周南桃夭之篇。夭夭，少好貌。",
        "comparative_analysis": {
            "version_position_analysis": "引《诗经·桃夭》进一步论证齐家治国。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均释'夭夭'为美盛、少好。",
            "contextual_significance": "以桃夭起兴，引出女子出嫁宜其家人，比喻家齐而后国治。"
        },
        "commentator": "朱熹",
        "note": "诗周南桃夭之篇。夭夭，少好貌。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "其叶蓁蓁",
        "translation": "桃叶长得茂盛",
        "note_zheng": "同上",
        "note_kong": "其叶蓁蓁茂盛，喻妇人形体少壮、颜色茂盛之时。",
        "note_zhu": "蓁蓁，美盛貌。兴也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "朱熹标'兴也'。",
            "contextual_significance": "起兴。"
        },
        "commentator": "朱熹",
        "note": "蓁蓁，美盛貌。兴也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "之子于归",
        "translation": "这位女子出嫁了",
        "note_zheng": "\"之子\"者，是子也。",
        "note_kong": "之子者，是子也。归，嫁也。",
        "note_zhu": "之子，犹言是子，此指女子之嫁者而言也。妇人谓嫁曰归。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑、孔、朱均释'之子'为'是子'，'归'为嫁。",
            "contextual_significance": "女子出嫁。"
        },
        "commentator": "朱熹",
        "note": "之子，犹言是子，此指女子之嫁者而言也。妇人谓嫁曰归。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "宜其家人",
        "translation": "一定能使家庭和睦",
        "note_zheng": "",
        "note_kong": "宜可以为夫家之人。",
        "note_zhu": "宜，犹善也。",
        "comparative_analysis": {
            "version_position_analysis": "效果。",
            "commentary_comparison": "孔颖达疏以'可以为夫家之人'解释。朱熹释'宜'为'善'。",
            "contextual_significance": "女子能使家庭和睦。"
        },
        "commentator": "朱熹",
        "note": "宜，犹善也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "而后可以教国人",
        "translation": "然后才能教化国人",
        "note_zheng": "",
        "note_kong": "言人既家得宜，则可以教国人也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "结论。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "齐家是教国人的前提。"
        },
        "commentator": "孔颖达",
        "note": "言人既家得宜，则可以教国人也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "宜兄宜弟",
        "translation": "兄弟之间和睦相处",
        "note_zheng": "",
        "note_kong": "此《小雅·蓼萧》之篇，美成王之诗。此《记》之意，\"宜兄宜弟\"，谓自与兄弟相善相宜也。",
        "note_zhu": "诗小雅蓼萧篇。",
        "comparative_analysis": {
            "version_position_analysis": "引《诗经·蓼萧》。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "兄弟和睦。"
        },
        "commentator": "朱熹",
        "note": "诗小雅蓼萧篇。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "其仪不忒",
        "translation": "仪态举止没有差错",
        "note_zheng": "",
        "note_kong": "此《曹风·鸤鸠》之篇。忒，差也。",
        "note_zhu": "诗曹风鸤鸠篇。忒，差也。",
        "comparative_analysis": {
            "version_position_analysis": "引《诗经·鸤鸠》。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均释'忒'为差。",
            "contextual_significance": "仪态端正。"
        },
        "commentator": "朱熹",
        "note": "诗曹风鸤鸠篇。忒，差也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "正是四国",
        "translation": "可以匡正四方之国",
        "note_zheng": "",
        "note_kong": "正，长也。言在位之君子，威仪不有差忒，可以正长是四方之国。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "效果。",
            "commentary_comparison": "孔颖达疏以'正长'释'正'。",
            "contextual_significance": "个人威仪端正可以匡正四方。"
        },
        "commentator": "孔颖达",
        "note": "正，长也。言在位之君子，威仪不有差忒，可以正长是四方之国。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第九章",
        "scripture_content": "而后民法之也",
        "translation": "然后民众才会效法他",
        "note_zheng": "",
        "note_kong": "谓其修德于家，在室家之内，使父子兄弟足可方法，而后民皆法之也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "结论。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "家齐是民法的前提。"
        },
        "commentator": "孔颖达",
        "note": "谓其修德于家，在室家之内，使父子兄弟足可方法，而后民皆法之也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "上老老而民兴孝",
        "translation": "在上位的人尊敬老人，民众就会兴起孝敬之风",
        "note_zheng": "老老、长长，谓尊老敬长也。",
        "note_zhu": "老老，所谓老吾老也。兴，谓有所感发而兴起也。",
        "comparative_analysis": {
            "version_position_analysis": "此句是'治国平天下'章的开头。在古本中，'所谓平天下在治其国者'段落位于'治国在齐其家'之后。朱熹将其列为'传第十章'，位置与古本一致。",
            "commentary_comparison": "郑玄注以'尊老敬长'释'老老、长长'。朱熹以'老吾老'释'老老'，引用孟子，强调推己及人。",
            "contextual_significance": "此句开启'传第十章'（释治国平天下），提出上行下效的絜矩之道。"
        },
        "commentator": "朱熹",
        "note": "老老，所谓老吾老也。兴，谓有所感发而兴起也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "上恤孤而民不倍",
        "translation": "在上位的人体恤孤儿，民众就不会背弃道义",
        "note_zheng": "恤，忧也。民不倍，不相倍弃也。",
        "note_kong": "孤弱之子，人所遗弃，在上君长，若能忧恤孤弱不遗，则下民学之，不相弃倍也。",
        "note_zhu": "孤者，幼而无父之称。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄注以'不相倍弃'释'不倍'。孔颖达疏强调上行下效。朱熹释'孤'。",
            "contextual_significance": "同上。"
        },
        "commentator": "朱熹",
        "note": "孤者，幼而无父之称。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "是以君子有絜矩之道也",
        "translation": "所以君子有以身作则、推己及人的絜矩之道",
        "note_zheng": "絜，犹结也，挈也。矩，法也。君子有挈法之道，谓常执而行之，动作不失之。",
        "note_kong": "絜，犹结也。矩，法也。言君子有执结持矩法之道，动而无失，以此加物，物皆从之也。",
        "note_zhu": "絜，度也。矩，所以为方也。言此三者，上行下效，捷于影响。是以君子必当因其所同，推以度物，使彼我之间各得分愿，则上下四旁均齐方正，而天下平矣。",
        "comparative_analysis": {
            "version_position_analysis": "提出核心概念'絜矩之道'。",
            "commentary_comparison": "郑玄注以'结、挈'释'絜'，以'法'释'矩'，强调持法不失。孔颖达疏承之。朱熹则释'絜'为'度'（度量），'矩'为'方'，'絜矩'即度量而使各方均齐方正。朱熹的解释更强调推己度物、使彼此各得分愿的公平原则，将'絜矩之道'发展为处理人际关系的普遍准则。",
            "contextual_significance": "'絜矩之道'是'传第十章'的核心概念，朱熹将其解释为以己度人、使上下四旁均齐方正的道德原则，是儒家恕道在政治领域的应用。"
        },
        "commentator": "朱熹",
        "note": "絜，度也。矩，所以为方也。言此三者，上行下效，捷于影响。是以君子必当因其所同，推以度物，使彼我之间各得分愿，则上下四旁均齐方正，而天下平矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "毋以交于右",
        "translation": "就不要用同样的方式对待右边的人",
        "note_zheng": "絜矩之道，善持其所有，以恕于人耳。治国之要尽于此。",
        "note_kong": "此以下皆是絜矩之道也。",
        "note_zhu": "此覆解上文絜矩二字之义。如不欲上之无礼于我，则必以此度下之心，而亦不敢以此无礼使之。不欲下之不忠于我，则必以此度上之心，而亦不敢以此不忠事之。至于前后左右，无不皆然，则身之所处，彼此如一，而无不方矣。",
        "comparative_analysis": {
            "version_position_analysis": "总结六方面。",
            "commentary_comparison": "郑玄注强调'善持其所有，以恕于人'，认为治国之要尽于此。孔颖达疏同。朱熹则详细解释如何以己度人，并指出'身之所处，彼此如一，而无不方'，将'絜矩'形象化为使四方均齐方正。",
            "contextual_significance": "此句是'絜矩之道'的具体展开，通过六个方向的换位思考，实现人际关系的公平和谐。"
        },
        "commentator": "朱熹",
        "note": "此覆解上文絜矩二字之义。如不欲上之无礼于我，则必以此度下之心，而亦不敢以此无礼使之。不欲下之不忠于我，则必以此度上之心，而亦不敢以此不忠事之。至于前后左右，无不皆然，则身之所处，彼此如一，而无不方矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "乐只君子",
        "translation": "和乐的君子",
        "note_zheng": "言治民之道无他，取于己而已。",
        "note_kong": "此《小雅·南山有台》之篇，美成王之诗也。只，辞也。",
        "note_zhu": "诗小雅南山有台之篇。只，语助辞。",
        "comparative_analysis": {
            "version_position_analysis": "引《诗经·南山有台》证明絜矩之道。",
            "commentary_comparison": "郑玄注强调'取于己'，即推己及人。",
            "contextual_significance": "以'民之父母'比喻能行絜矩之道的君子。"
        },
        "commentator": "朱熹",
        "note": "诗小雅南山有台之篇。只，语助辞。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "民之父母",
        "translation": "是民众的父母",
        "note_zheng": "",
        "note_kong": "言能以己化民，从民所欲，则可为民父母矣。",
        "note_zhu": "言能絜矩而以民心为己心，则是爱民如子，而民爱之如父母矣。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏以'从民所欲'解释。朱熹以'以民心为己心'解释，强调同理心。",
            "contextual_significance": "'民之父母'是儒家对理想统治者的称谓，意味着以父母之心对待民众。"
        },
        "commentator": "朱熹",
        "note": "言能絜矩而以民心为己心，则是爱民如子，而民爱之如父母矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "民之所好好之",
        "translation": "民众所喜欢的，君子就喜欢",
        "note_zheng": "",
        "note_kong": "谓善政恩惠，是民之愿好，己亦好之，以施于民。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "具体说明'民之父母'的行为。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "与民同好恶。"
        },
        "commentator": "孔颖达",
        "note": "谓善政恩惠，是民之愿好，己亦好之，以施于民。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "民之所恶恶之",
        "translation": "民众所厌恶的，君子就厌恶",
        "note_zheng": "",
        "note_kong": "谓苛政重赋，是人之所恶，己亦恶之而不行也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "同上。"
        },
        "commentator": "孔颖达",
        "note": "谓苛政重赋，是人之所恶，己亦恶之而不行也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "节彼南山",
        "translation": "那座高峻的南山",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "诗小雅节南山之篇。节，截然高大貌。",
        "comparative_analysis": {
            "version_position_analysis": "引《诗经·节南山》警告在上位者。",
            "commentary_comparison": "朱熹释'节'为'截然高大'。",
            "contextual_significance": "以南山起兴，引出师尹。"
        },
        "commentator": "朱熹",
        "note": "诗小雅节南山之篇。节，截然高大貌。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "赫赫师尹",
        "translation": "权势显赫的太师尹氏",
        "note_zheng": "师尹，天子之大臣，为政者也。",
        "note_kong": "赫赫，显盛貌。是大师与人为则者。",
        "note_zhu": "师尹，周太师尹氏也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均释'师尹'为周太师尹氏。",
            "contextual_significance": "师尹是周朝大臣，位居高位，民众仰望。"
        },
        "commentator": "朱熹",
        "note": "师尹，周太师尹氏也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "民具尔瞻",
        "translation": "民众都仰望着你",
        "note_zheng": "言民皆视其所行而则之。",
        "note_kong": "具，俱也。尔，汝也。在下之民，俱于汝而瞻视之。",
        "note_zhu": "具，俱也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均强调民众仰望并效法。",
            "contextual_significance": "警告在上位者，民众都在看着你，必须谨慎。"
        },
        "commentator": "朱熹",
        "note": "具，俱也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "有国者不可以不慎",
        "translation": "治理国家的人不可以不谨慎",
        "note_zheng": "",
        "note_kong": "有国，谓天子、诸侯。言民皆视上所行而则之，可不慎其德乎？",
        "note_zhu": "言在上者人所瞻仰，不可不谨。",
        "comparative_analysis": {
            "version_position_analysis": "结论。",
            "commentary_comparison": "孔颖达、朱熹均强调谨慎。",
            "contextual_significance": "因为民众仰望，所以统治者必须谨慎自己的德行。"
        },
        "commentator": "朱熹",
        "note": "言在上者人所瞻仰，不可不谨。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "辟则为天下僇矣",
        "translation": "若行为偏邪，就会被天下人所诛讨",
        "note_zheng": "邪辟失道，则有大刑。",
        "note_kong": "僇，谓刑僇也。君若邪辟，则为天下之民共所诛讨。",
        "note_zhu": "辟，偏也。若不能絜矩而好恶徇于一己之偏，则身弑国亡，为天下之大戮矣。",
        "comparative_analysis": {
            "version_position_analysis": "警告。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均以'刑僇'、'大戮'警告偏邪的后果。朱熹将其与'不能絜矩'直接关联。",
            "contextual_significance": "如果不能行絜矩之道，就会身死国灭，为天下所戮。"
        },
        "commentator": "朱熹",
        "note": "辟，偏也。若不能絜矩而好恶徇于一己之偏，则身弑国亡，为天下之大戮矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "殷之未丧师",
        "translation": "殷朝在未丧失民心时",
        "note_zheng": "师，众也。",
        "note_zhu": "诗文王篇。师，众也。",
        "comparative_analysis": {
            "version_position_analysis": "引《诗经·文王》论证得众得国。",
            "commentary_comparison": "郑玄、朱熹均释'师'为众。",
            "contextual_significance": "以殷商为例，说明得众则得国。"
        },
        "commentator": "朱熹",
        "note": "诗文王篇。师，众也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "克配上帝",
        "translation": "德行还能配得上天帝",
        "note_zheng": "克，能也。",
        "note_kong": "克，能也。师，众也。言殷自纣父帝乙之前，未丧师众之时，所行政教，皆能配上天而行也。",
        "note_zhu": "配，对也。配上帝，言其为天下君，而对乎上帝也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏以'配上天而行'解释。朱熹以'对乎上帝'解释。",
            "contextual_significance": "殷商未失民心时，其德能配上帝。"
        },
        "commentator": "朱熹",
        "note": "配，对也。配上帝，言其为天下君，而对乎上帝也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "仪监于殷",
        "translation": "应当以殷朝为借鉴",
        "note_zheng": "监视殷时之事。",
        "note_kong": "仪，宜也。监，视也。今成王宜监视于殷之存亡。",
        "note_zhu": "监，视也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏以'宜监视'解释。",
            "contextual_significance": "周应以殷商为鉴。"
        },
        "commentator": "朱熹",
        "note": "监，视也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "峻命不易",
        "translation": "知道保有天命很不容易",
        "note_zheng": "峻，大也。天之大命，持之诚不易也。",
        "note_kong": "峻，大也。奉此天之大命，诚为不易，言其难也。",
        "note_zhu": "峻，大也。不易，言难保也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑、孔、朱均释'峻'为大，'不易'为难。",
            "contextual_significance": "天命难保，必须谨慎。"
        },
        "commentator": "朱熹",
        "note": "峻，大也。不易，言难保也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "道得众则得国",
        "translation": "得民心就能得国家",
        "note_zheng": "道，犹言也。",
        "note_kong": "道，犹言也。言帝乙以上得众则得国。",
        "note_zhu": "道，言也。引诗而言此，以结上文两节之意。",
        "comparative_analysis": {
            "version_position_analysis": "总结。",
            "commentary_comparison": "孔颖达疏。朱熹点明此句总结上文。",
            "contextual_significance": "核心政治原则：得民心者得天下。"
        },
        "commentator": "朱熹",
        "note": "道，言也。引诗而言此，以结上文两节之意。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "失众则失国",
        "translation": "失民心就会失国家",
        "note_zheng": "",
        "note_kong": "言殷纣失众则失国也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "反面。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "失民心者失天下。"
        },
        "commentator": "孔颖达",
        "note": "言殷纣失众则失国也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "有德此有人",
        "translation": "有了德行，才能得到民众拥护",
        "note_zheng": "",
        "note_kong": "有德之人，人之所附从。",
        "note_zhu": "有人，谓得众。",
        "comparative_analysis": {
            "version_position_analysis": "德本财末的逻辑展开。",
            "commentary_comparison": "孔颖达疏强调有德则人附从。朱熹释'有人'为得众。",
            "contextual_significance": "德是根本，有人、有土、有财、有用都是德的结果。"
        },
        "commentator": "朱熹",
        "note": "有人，谓得众。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "有人此有土",
        "translation": "有了民众拥护，才能保有土地",
        "note_zheng": "",
        "note_kong": "有人则境土宽大。",
        "note_zhu": "有土，谓得国。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "民众是土地的前提。"
        },
        "commentator": "朱熹",
        "note": "有土，谓得国。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "有土此有财",
        "translation": "有了土地，才能产生财富",
        "note_zheng": "",
        "note_kong": "有土则生植万物，故有财也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "土地是财富的来源。"
        },
        "commentator": "孔颖达",
        "note": "有土则生植万物，故有财也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "有财此有用",
        "translation": "有了财富，才能供给国家用度",
        "note_zheng": "",
        "note_kong": "有财丰，以此而有供国用也。",
        "note_zhu": "有国则不患无财用矣。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏。朱熹注强调有国则有财用。",
            "contextual_significance": "财富用于国家用度。"
        },
        "commentator": "朱熹",
        "note": "有国则不患无财用矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "德者本也",
        "translation": "德行是根本",
        "note_zheng": "",
        "note_kong": "德能致财，财由德有，故德为本。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "点明本末。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "德是根本。"
        },
        "commentator": "孔颖达",
        "note": "德能致财，财由德有，故德为本。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "财者末也",
        "translation": "财富是末节",
        "note_zheng": "",
        "note_kong": "财为末也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "点明本末。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "财是末节。"
        },
        "commentator": "孔颖达",
        "note": "财为末也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "争民施夺",
        "translation": "就会与民争利、施行掠夺",
        "note_zheng": "施夺，施其劫夺之情也。",
        "note_kong": "外，疏也。内，亲也。君若亲财而疏德，则争利之人皆施劫夺之情也。",
        "note_zhu": "人君以德为外，以财为内，则是争斗其民，而施之以劫夺之教也。",
        "comparative_analysis": {
            "version_position_analysis": "后果。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均指出外本内末会导致民众争利、相互劫夺。",
            "contextual_significance": "统治者如果重财轻德，就会引导民众互相争夺。"
        },
        "commentator": "朱熹",
        "note": "人君以德为外，以财为内，则是争斗其民，而施之以劫夺之教也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "财聚则民散",
        "translation": "财富聚敛在上，民心就会离散",
        "note_zheng": "",
        "note_kong": "事不两兴，财由民立。君若重财而轻民，则民散也。",
        "note_zhu": "外本内末故财聚，争民施夺故民散。",
        "comparative_analysis": {
            "version_position_analysis": "经济原则。",
            "commentary_comparison": "孔颖达疏。朱熹将其与'外本内末'关联。",
            "contextual_significance": "聚财于上则民心离散。"
        },
        "commentator": "朱熹",
        "note": "外本内末故财聚，争民施夺故民散。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "财散则民聚",
        "translation": "财富分散给民，民心就会凝聚",
        "note_zheng": "",
        "note_kong": "若散财而赒恤于民，则民咸归聚也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "正面原则。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "散财于民则民心归聚。"
        },
        "commentator": "孔颖达",
        "note": "若散财而赒恤于民，则民咸归聚也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "亦悖而入",
        "translation": "也会被用违背道理的话回敬",
        "note_zheng": "悖，犹逆也。言君有逆命，则民有逆辞也。",
        "note_kong": "若人君政教之言，悖逆人心而出行者，则民悖逆君上而入以报答也。",
        "note_zhu": "悖，逆也。此以言之出入，明货之出入也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均释'悖'为逆。朱熹点明这是比喻。",
            "contextual_significance": "你如何对人，人便如何对你。"
        },
        "commentator": "朱熹",
        "note": "悖，逆也。此以言之出入，明货之出入也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "亦悖而出",
        "translation": "也会以违背道义的方式散失出去",
        "note_zheng": "上贪于利，则下人侵畔。《老子》曰：\"多藏必厚亡。\"",
        "note_kong": "若人君厚敛财货，悖逆民心而入积聚者，不能久，财亦悖逆君心而散出也。",
        "note_zhu": "同上",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄引《老子》'多藏必厚亡'。孔颖达疏强调不能久。",
            "contextual_significance": "不义之财终将不义而去。"
        },
        "commentator": "朱熹",
        "note": "同上",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "惟命不于常",
        "translation": "天命不是永恒不变的",
        "note_zheng": "于，于也。天命不于常，言不专祐一家也。",
        "note_kong": "谓天之命不于是常住在一家也。道善则得之，不善则失之。",
        "note_zhu": "道，言也。因上文引文王诗之意而申言之，其丁宁反覆之意益深切矣。",
        "comparative_analysis": {
            "version_position_analysis": "引《康诰》重申天命无常。",
            "commentary_comparison": "郑玄、孔颖达均强调天命不专祐一家。朱熹点明这是反复叮咛。",
            "contextual_significance": "天命取决于善恶。"
        },
        "commentator": "朱熹",
        "note": "道，言也。因上文引文王诗之意而申言之，其丁宁反覆之意益深切矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "楚国无以为宝",
        "translation": "楚国没有什么宝贝",
        "note_zheng": "《楚书》，楚昭王时书也。言以善人为宝。",
        "note_kong": "案《楚语》：楚昭王使王孙圉聘于晋，赵简子问楚之白珩犹在乎？王孙圉对曰：未尝为宝。楚之所宝者曰观射父。",
        "note_zhu": "楚书，楚语。言不宝金玉而宝善人也。",
        "comparative_analysis": {
            "version_position_analysis": "引《楚书》说明以善为宝。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均指出楚国以善人为宝，不以金玉为宝。",
            "contextual_significance": "国家真正的宝贝是善人，而非财物。"
        },
        "commentator": "朱熹",
        "note": "楚书，楚语。言不宝金玉而宝善人也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "亡人无以为宝",
        "translation": "流亡的人没有什么宝贝",
        "note_zheng": "舅犯，晋文公之舅狐偃也。亡人，谓文公也，时避骊姬之谗，亡在翟。",
        "note_kong": "此舅犯劝重耳之辞。于时重耳逃亡在翟，对秦使云：奔亡之人，无以货财为宝，唯亲爱仁道以为宝也。",
        "note_zhu": "舅犯，晋文公舅狐偃。仁，爱也。",
        "comparative_analysis": {
            "version_position_analysis": "引舅犯语说明仁亲为宝。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均指出亡人以仁亲为宝。",
            "contextual_significance": "流亡之人不重货财，而重仁爱亲情。"
        },
        "commentator": "朱熹",
        "note": "舅犯，晋文公舅狐偃。仁，爱也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "若有一个臣",
        "translation": "如果有这样一位耿介的臣子",
        "note_zheng": "《秦誓》，《尚书》篇名也。",
        "note_kong": "《秦誓》，《尚书》篇名。秦穆公伐郑，为晋败于殽，还誓群臣而作此篇。",
        "note_zhu": "秦誓，周书。",
        "comparative_analysis": {
            "version_position_analysis": "引《秦誓》讨论用人之道。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均指出出处。",
            "contextual_significance": "以秦穆公的誓言为例，说明如何识别和任用贤臣。"
        },
        "commentator": "朱熹",
        "note": "秦誓，周书。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "断断兮无他技",
        "translation": "诚朴专一，没有别的技能",
        "note_zheng": "断断，诚一之貌也。他技，异端之技也。",
        "note_kong": "若有一耿介之臣，断断然诚实专一谨悫。",
        "note_zhu": "断断，诚一之貌。",
        "comparative_analysis": {
            "version_position_analysis": "形容贤臣。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均以'诚一'释'断断'。",
            "contextual_significance": "贤臣可能没有特别的技能，但诚实专一，有容人之量。"
        },
        "commentator": "朱熹",
        "note": "断断，诚一之貌。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "其如有容焉",
        "translation": "有容人之量",
        "note_zheng": "",
        "note_kong": "惟其心休休然宽容，形貌似有包容。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "有容人之量。"
        },
        "commentator": "孔颖达",
        "note": "惟其心休休然宽容，形貌似有包容。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "若己有之",
        "translation": "就像自己有一样高兴",
        "note_zheng": "有技，才艺之技也。若己有之，不啻若自其口出，皆乐人有善之甚也。",
        "note_kong": "云见人有技艺，欲得亲爱之，如己自有也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄注强调乐人有善。",
            "contextual_significance": "不嫉妒，反而欣喜。"
        },
        "commentator": "郑玄",
        "note": "有技，才艺之技也。若己有之，不啻若自其口出，皆乐人有善之甚也。",
        "dynasty": "东汉",
        "commentary_title": "礼记注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "人之彦圣",
        "translation": "看到别人品德高尚、智慧通达",
        "note_zheng": "美士为彦。",
        "note_zhu": "彦，美士也。圣，通明也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、朱熹释'彦'为美士，'圣'为通明。",
            "contextual_significance": "对贤能之人的态度。"
        },
        "commentator": "朱熹",
        "note": "彦，美士也。圣，通明也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "不啻若自其口出",
        "translation": "不只是口头上称赞",
        "note_zheng": "",
        "note_kong": "其心中爱好，不啻如自其口出。心爱此彦圣之美，多于口说。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏强调内心之爱胜过口说。",
            "contextual_significance": "发自内心的赞美。"
        },
        "commentator": "孔颖达",
        "note": "其心中爱好，不啻如自其口出。心爱此彦圣之美，多于口说。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "寔能容之",
        "translation": "真心实意地接纳他们",
        "note_zheng": "",
        "note_kong": "寔，是也。若能好贤如此，是能有所包容。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "真正能容纳贤才。"
        },
        "commentator": "孔颖达",
        "note": "寔，是也。若能好贤如此，是能有所包容。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "以能保我子孙黎民",
        "translation": "用这样的人保护我的子孙百姓",
        "note_zheng": "黎，众也。",
        "note_kong": "则我国家得安，保我后世子孙。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "效果。",
            "commentary_comparison": "郑玄、孔颖达。",
            "contextual_significance": "这样的贤臣能保国家安定。"
        },
        "commentator": "郑玄",
        "note": "黎，众也。",
        "dynasty": "东汉",
        "commentary_title": "礼记注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "尚亦有利哉",
        "translation": "是多么有利啊",
        "note_zheng": "尚，庶几也。",
        "note_kong": "尚，庶几也。非直子孙安，其下众人皆庶几亦望有利益哉也。",
        "note_zhu": "尚，庶几也。",
        "comparative_analysis": {
            "version_position_analysis": "赞叹。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均释'尚'为庶几。",
            "contextual_significance": "对国家有利。"
        },
        "commentator": "朱熹",
        "note": "尚，庶几也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "媢嫉以恶之",
        "translation": "就嫉妒厌恶",
        "note_zheng": "媢，妒也。",
        "note_kong": "见人有技艺，则掩藏媢妒，疾以憎恶之也。",
        "note_zhu": "媢，忌也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均释'媢'为妒忌。",
            "contextual_significance": "嫉妒贤能。"
        },
        "commentator": "朱熹",
        "note": "媢，忌也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "而违之俾不通",
        "translation": "就压制排挤、使其不被重用",
        "note_zheng": "违，犹戾也。俾，使也。佛戾贤人所高，使功不通于君也。",
        "note_kong": "见他人之彦圣，而违戾抑退之。俾，使也。使其善功不通达于君。",
        "note_zhu": "违，拂戾也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均释'违'为违戾、拂戾。",
            "contextual_significance": "压制贤能，使其不被任用。"
        },
        "commentator": "朱熹",
        "note": "违，拂戾也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "亦曰殆哉",
        "translation": "国家就危险了",
        "note_zheng": "殆，危也。",
        "note_kong": "若此蔽贤之人，是不能容纳，家国将亡，不能保我子孙；非唯如此，众人亦曰殆危哉。",
        "note_zhu": "殆，危也。",
        "comparative_analysis": {
            "version_position_analysis": "结论。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均释'殆'为危。",
            "contextual_significance": "国家危险。"
        },
        "commentator": "朱熹",
        "note": "殆，危也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "唯仁人放流之",
        "translation": "只有仁德的人，才会把这种嫉贤妒能的人流放",
        "note_zheng": "放去恶人媢嫉之类者，独仁人能之。",
        "note_zhu": "迸，读为屏，古字通用。迸，犹逐也。言有此媢疾之人，妨贤而病国，则仁人必深恶而痛绝之。",
        "comparative_analysis": {
            "version_position_analysis": "仁人的做法。",
            "commentary_comparison": "郑玄注强调独仁人能放逐恶人。朱熹强调'深恶而痛绝之'。",
            "contextual_significance": "仁人必须坚决流放嫉贤妒能的小人。"
        },
        "commentator": "朱熹",
        "note": "迸，读为屏，古字通用。迸，犹逐也。言有此媢疾之人，妨贤而病国，则仁人必深恶而痛绝之。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "不与同中国",
        "translation": "不让他们与贤德之人同住中原",
        "note_zheng": "",
        "note_kong": "言唯仁人之君能放流此蔽善之人，使迸远在四夷，不与同在中国。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "不让他们与中原贤人共处。"
        },
        "commentator": "孔颖达",
        "note": "言唯仁人之君能放流此蔽善之人，使迸远在四夷，不与同在中国。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "能恶人",
        "translation": "憎恶恶人",
        "note_zheng": "",
        "note_kong": "既放此蔽贤之人远在四夷，是仁人能爱善人，恶不善之人。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "仁人也能憎恶恶人。"
        },
        "commentator": "孔颖达",
        "note": "既放此蔽贤之人远在四夷，是仁人能爱善人，恶不善之人。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "命也",
        "translation": "这是怠慢",
        "note_zheng": "命，读为\"慢\"，声之误也。举贤而不能使君以先己，是轻慢于举人也。",
        "note_kong": "此谓凡庸小人，见此贤人而不能举进于君；假设举之，又不能使在其己之先，是为慢也。",
        "note_zhu": "命，郑氏云\"当作慢。\"程子云：\"当作怠。\"未详孰是。",
        "comparative_analysis": {
            "version_position_analysis": "评价。",
            "commentary_comparison": "郑玄读'命'为'慢'，指轻慢。孔颖达疏同。朱熹引郑、程二说，存疑。",
            "contextual_significance": "见贤不举或举而不先，是怠慢的行为。"
        },
        "commentator": "朱熹",
        "note": "命，郑氏云\"当作慢。\"程子云：\"当作怠。\"未详孰是。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "过也",
        "translation": "这是过错",
        "note_zheng": "",
        "note_kong": "此谓小人见不善之人而不能抑退之，假令抑退之，而不能使远退之。过者，言是愆过之人也。",
        "note_zhu": "若此者，知所爱恶矣，而未能尽爱恶之道，盖君子而未仁者也。",
        "comparative_analysis": {
            "version_position_analysis": "评价。",
            "commentary_comparison": "孔颖达疏以'愆过'解释。朱熹则将其定性为'君子而未仁'，即知道爱恶但做不到彻底。",
            "contextual_significance": "这是过错，未能尽爱恶之道。"
        },
        "commentator": "朱熹",
        "note": "若此者，知所爱恶矣，而未能尽爱恶之道，盖君子而未仁者也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "是谓拂人之性",
        "translation": "这就叫做违背人的本性",
        "note_zheng": "拂，犹佹也。",
        "note_kong": "人，谓君子。君子所恶者，凶恶之事，今乃爱好凶恶；君子所好，仁义善道，今乃恶此仁义善道。是谓拂戾善人之性。",
        "note_zhu": "拂，逆也。好善而恶恶，人之性也；至于拂人之性，则不仁之甚者也。",
        "comparative_analysis": {
            "version_position_analysis": "定性。",
            "commentary_comparison": "郑玄、孔颖达以'拂戾'解释。朱熹释'拂'为'逆'，并指出好善恶恶是人之本性，反之则是'不仁之甚'。",
            "contextual_significance": "违背人性，是最严重的不仁。"
        },
        "commentator": "朱熹",
        "note": "拂，逆也。好善而恶恶，人之性也；至于拂人之性，则不仁之甚者也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "菑必逮夫身",
        "translation": "灾祸必定会降临到身上",
        "note_zheng": "逮，及也。",
        "note_kong": "逮，及也。如此，菑必及夫身矣。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "后果。",
            "commentary_comparison": "郑玄、孔颖达均强调灾祸及身。",
            "contextual_significance": "违背人性者必遭灾祸。"
        },
        "commentator": "郑玄",
        "note": "逮，及也。",
        "dynasty": "东汉",
        "commentary_title": "礼记注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "君子有大道",
        "translation": "君子有一条根本的大道",
        "note_zheng": "道，行所由。",
        "note_kong": "大道，谓所由行孝悌仁义之大道也。",
        "note_zhu": "君子，以位言之。道，谓居其位而修己治人之术。",
        "comparative_analysis": {
            "version_position_analysis": "总结君子之道。",
            "commentary_comparison": "郑玄释'道'为'行所由'。孔颖达疏以'孝悌仁义'释之。朱熹则明确'君子'指在位者，'道'指修己治人之术。",
            "contextual_significance": "君子（统治者）的根本原则。"
        },
        "commentator": "朱熹",
        "note": "君子，以位言之。道，谓居其位而修己治人之术。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "必忠信以得之",
        "translation": "必须靠忠诚信实才能得到",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "发己自尽为忠，循物无违谓信。",
        "comparative_analysis": {
            "version_position_analysis": "得道之方。",
            "commentary_comparison": "朱熹对'忠信'作了经典定义：'发己自尽为忠，循物无违谓信'。",
            "contextual_significance": "以忠信获得大道。"
        },
        "commentator": "朱熹",
        "note": "发己自尽为忠，循物无违谓信。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "骄泰以失之",
        "translation": "而一旦骄傲放纵就会失去",
        "note_zheng": "",
        "note_kong": "",
        "note_zhu": "骄者矜高，泰者侈肆。",
        "comparative_analysis": {
            "version_position_analysis": "失道之由。",
            "commentary_comparison": "朱熹释'骄'为矜高，'泰'为侈肆。",
            "contextual_significance": "骄泰则失道。"
        },
        "commentator": "朱熹",
        "note": "骄者矜高，泰者侈肆。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "生之者众",
        "translation": "生产的人多",
        "note_zheng": "",
        "note_kong": "谓为农桑多也。",
        "note_zhu": "吕氏曰：\"国无游民，则生者众矣。\"",
        "comparative_analysis": {
            "version_position_analysis": "生财四原则之一。",
            "commentary_comparison": "孔颖达疏以'农桑多'解释。朱熹引吕氏注'国无游民'。",
            "contextual_significance": "增加生产人口。"
        },
        "commentator": "朱熹",
        "note": "吕氏曰：\"国无游民，则生者众矣。\"",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "食之者寡",
        "translation": "消费的人少",
        "note_zheng": "",
        "note_kong": "谓减省无用之费也。",
        "note_zhu": "吕氏曰：\"朝无幸位，则食者寡矣。\"",
        "comparative_analysis": {
            "version_position_analysis": "原则二。",
            "commentary_comparison": "孔颖达疏以'减省无用之费'解释。朱熹引吕氏注'朝无幸位'（无冗官）。",
            "contextual_significance": "减少不事生产的人。"
        },
        "commentator": "朱熹",
        "note": "吕氏曰：\"朝无幸位，则食者寡矣。\"",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "为之者疾",
        "translation": "劳作的人勤快",
        "note_zheng": "",
        "note_kong": "谓百姓急营农桑事业也。",
        "note_zhu": "吕氏曰：\"不夺农时，则为之疾矣。\"",
        "comparative_analysis": {
            "version_position_analysis": "原则三。",
            "commentary_comparison": "孔颖达疏以'急营农桑'解释。朱熹引吕氏注'不夺农时'。",
            "contextual_significance": "提高生产效率。"
        },
        "commentator": "朱熹",
        "note": "吕氏曰：\"不夺农时，则为之疾矣。\"",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "用之者舒",
        "translation": "使用的人节省",
        "note_zheng": "",
        "note_kong": "谓君上缓于营造费用也。",
        "note_zhu": "吕氏曰：\"量入为出，则用之舒矣。\"",
        "comparative_analysis": {
            "version_position_analysis": "原则四。",
            "commentary_comparison": "孔颖达疏以'缓于营造费用'解释。朱熹引吕氏注'量入为出'。",
            "contextual_significance": "节约开支。"
        },
        "commentator": "朱熹",
        "note": "吕氏曰：\"量入为出，则用之舒矣。\"",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "则财恒足矣",
        "translation": "这样财富就会经常充足",
        "note_zheng": "是不务禄不肖，而勉民以农也。",
        "note_kong": "言人君能如此，则国用恒足。",
        "note_zhu": "愚按：此因有土有财而言，以明足国之道在乎务本而节用。",
        "comparative_analysis": {
            "version_position_analysis": "效果。",
            "commentary_comparison": "郑玄强调'勉民以农'。孔颖达疏以'国用恒足'。朱熹总结为'务本而节用'。",
            "contextual_significance": "遵循四原则则财用充足。"
        },
        "commentator": "朱熹",
        "note": "愚按：此因有土有财而言，以明足国之道在乎务本而节用。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "仁者以财发身",
        "translation": "仁德的人运用财富来发展自身德行",
        "note_zheng": "发，起也。言仁人有财，则务于施与以起身，成其令名。",
        "note_kong": "谓仁德之君，以财散施，发起身之令名也。",
        "note_zhu": "发，犹起也。仁者散财以得民。",
        "comparative_analysis": {
            "version_position_analysis": "仁者与不仁者对财的态度。",
            "commentary_comparison": "郑玄、孔颖达以'施与起身'解释。朱熹以'散财得民'解释，强调得民心。",
            "contextual_significance": "仁者以财养德、得民。"
        },
        "commentator": "朱熹",
        "note": "发，犹起也。仁者散财以得民。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "不仁者以身发财",
        "translation": "不仁的人耗尽心力去聚敛财富",
        "note_zheng": "不仁之人有身，贪于聚敛以起财，务成富。",
        "note_kong": "言不仁之人，唯在吝啬，务于积聚，劳役其身，发起其财。",
        "note_zhu": "不仁者亡身以殖货。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达以'贪于聚敛'解释。朱熹以'亡身以殖货'解释，强调牺牲自身（甚至生命）来积累财富。",
            "contextual_significance": "不仁者以身发财，本末倒置。"
        },
        "commentator": "朱熹",
        "note": "不仁者亡身以殖货。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "未有上好仁而下不好义者也",
        "translation": "从来没有在上位的人喜好仁德，而在下位的人却不喜好道义的",
        "note_zheng": "言君行仁道，则其臣必义。",
        "note_kong": "言在上人君好以仁道接下，其下感君仁恩，无有不爱好于义。",
        "note_zhu": "上好仁以爱其下，则下好义以忠其上。",
        "comparative_analysis": {
            "version_position_analysis": "上行下效的正面表述。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均强调君仁则臣义。",
            "contextual_significance": "仁德感召下，臣民自然好义。"
        },
        "commentator": "朱熹",
        "note": "上好仁以爱其下，则下好义以忠其上。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "未有好义其事不终者也",
        "translation": "从来没有喜好道义的人，做事情会半途而废的",
        "note_zheng": "以义举事无不成者。",
        "note_kong": "言臣下悉皆好义，百事尽能终成。",
        "note_zhu": "所以事必有终。",
        "comparative_analysis": {
            "version_position_analysis": "好义的效果。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均强调好义则事成。",
            "contextual_significance": "好义者做事必有始有终。"
        },
        "commentator": "朱熹",
        "note": "所以事必有终。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "未有府库财非其财者也",
        "translation": "从来没有这样的君主，府库里的财物最终不是归他所有的",
        "note_zheng": "其为诚然，如己府库之财为己有也。",
        "note_kong": "君若行仁，民必报义，义必终事，譬如人君有府库之财，必还为所用也。",
        "note_zhu": "府库之财无悖出之患也。",
        "comparative_analysis": {
            "version_position_analysis": "结论。",
            "commentary_comparison": "郑玄、孔颖达以'如己有'解释。朱熹以'无悖出之患'解释，强调行仁则财不悖出。",
            "contextual_significance": "行仁者，府库之财最终仍归其用，不会悖出。"
        },
        "commentator": "朱熹",
        "note": "府库之财无悖出之患也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "畜马乘不察于鸡豚",
        "translation": "家里能养得起四匹马拉车的士大夫，就不该再去计较养鸡养猪的小利",
        "note_zheng": "畜马乘，谓以士初试为大夫也。",
        "note_kong": "言察于鸡豚之所利，为畜养马乘，士初试为大夫，不窥察于鸡豚之小利。",
        "note_zhu": "孟献子，鲁之贤大夫仲孙蔑也。畜马乘，士初试为大夫者也。",
        "comparative_analysis": {
            "version_position_analysis": "引孟献子语，说明不与民争利。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均指出这是士大夫不应与小民争利。",
            "contextual_significance": "身份越高，越不应计较蝇头小利。"
        },
        "commentator": "朱熹",
        "note": "孟献子，鲁之贤大夫仲孙蔑也。畜马乘，士初试为大夫者也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "伐冰之家不畜牛羊",
        "translation": "丧祭能用冰的卿大夫之家，就不该再畜养牛羊来牟利",
        "note_zheng": "伐冰之家，卿、大夫以上，丧、祭用冰。",
        "note_kong": "谓卿大夫丧祭用冰，不畜牛羊为财利。以食禄，不与人争利也。",
        "note_zhu": "伐冰之家，卿大夫以上，丧祭用冰者也。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均强调卿大夫不畜牛羊争利。",
            "contextual_significance": "卿大夫不应与民争利。"
        },
        "commentator": "朱熹",
        "note": "伐冰之家，卿大夫以上，丧祭用冰者也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "百乘之家不畜聚敛之臣",
        "translation": "拥有百辆兵车的诸侯之家，就不该再养着搜刮民财的家臣",
        "note_zheng": "百乘之家，有采地者也。",
        "note_kong": "百乘，谓卿大夫有采地者也。言卿大夫之家不畜聚敛之臣。",
        "note_zhu": "百乘之家，有采地者也。君子宁亡己之财，而不忍伤民之力。",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均强调有采地者不畜聚敛之臣。朱熹补充'宁亡己之财，而不忍伤民之力'，点明仁者之心。",
            "contextual_significance": "诸侯之家不应任用搜刮民财的家臣。"
        },
        "commentator": "朱熹",
        "note": "百乘之家，有采地者也。君子宁亡己之财，而不忍伤民之力。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "宁有盗臣",
        "translation": "宁可有盗窃府库的家臣",
        "note_zheng": "盗臣损财耳，聚敛之臣乃损义。",
        "note_kong": "以盗臣但害财，聚敛之臣则害义也。",
        "note_zhu": "同上",
        "comparative_analysis": {
            "version_position_analysis": "接上句。",
            "commentary_comparison": "郑玄、孔颖达、朱熹均认为盗臣只损财，聚敛之臣损义，故宁有盗臣。",
            "contextual_significance": "损财不如损义严重。"
        },
        "commentator": "朱熹",
        "note": "同上",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "以义为利也",
        "translation": "而应以道义为利",
        "note_zheng": "",
        "note_kong": "言若能如上所谓，是国家之利，但以义事为国家利也。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "正面原则。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "应以义为利。"
        },
        "commentator": "孔颖达",
        "note": "言若能如上所谓，是国家之利，但以义事为国家利也。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "必自小人矣",
        "translation": "必定是从任用小人开始的",
        "note_zheng": "言务聚财为己用者，必忘义，是小人所为也。",
        "note_kong": "言为人君长于国家，而务积聚财以为己用者，必自为小人之行也。",
        "note_zhu": "自，由也，言由小人导之也。",
        "comparative_analysis": {
            "version_position_analysis": "原因。",
            "commentary_comparison": "郑玄、孔颖达认为君主自己行小人之事。朱熹则解释为'由小人导之'，强调小人诱导君主。",
            "contextual_significance": "聚财的君主必然是被小人引导。"
        },
        "commentator": "朱熹",
        "note": "自，由也，言由小人导之也。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "彼为善之",
        "translation": "君主想要施行善政",
        "note_zheng": "彼，君也。君将欲以仁义善其政。",
        "note_kong": "彼，谓君也。君欲为仁义之道，善其政教。",
        "note_zhu": "此句上下，疑有阙文误字。",
        "comparative_analysis": {
            "version_position_analysis": "文本有疑。",
            "commentary_comparison": "郑玄、孔颖达解释为君欲行善。朱熹认为此句上下可能有阙文误字。",
            "contextual_significance": "即使君主本意想行善。"
        },
        "commentator": "朱熹",
        "note": "此句上下，疑有阙文误字。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "菑害并至",
        "translation": "天灾人祸就会一起降临",
        "note_zheng": "",
        "note_kong": "言君欲为善，反令小人使为治国家之事，毒害于下，故菑害患难则并皆来至。",
        "note_zhu": "",
        "comparative_analysis": {
            "version_position_analysis": "后果。",
            "commentary_comparison": "孔颖达疏。",
            "contextual_significance": "灾害并至。"
        },
        "commentator": "孔颖达",
        "note": "言君欲为善，反令小人使为治国家之事，毒害于下，故菑害患难则并皆来至。",
        "dynasty": "唐",
        "commentary_title": "礼记正义"
    },
    {
        "classic_title": "礼记",
        "chapter": "传第十章",
        "scripture_content": "亦无如之何矣",
        "translation": "也没有办法挽救了",
        "note_zheng": "虽云有善，不能救之，以其恶之已著也。",
        "note_kong": "既使小人治国，其君虽有善政，亦无能奈此患难之何。",
        "note_zhu": "此一节，深明以利为利之害，而重言以结之，其丁宁之意切矣。",
        "comparative_analysis": {
            "version_position_analysis": "无法挽回。",
            "commentary_comparison": "郑玄、孔颖达强调不能救。朱熹点明此节深明以利为利之害。",
            "contextual_significance": "一旦小人掌权导致灾害，即使有善者也无力回天。"
        },
        "commentator": "朱熹",
        "note": "此一节，深明以利为利之害，而重言以结之，其丁宁之意切矣。",
        "dynasty": "宋",
        "commentary_title": "四书章句集注"
    }
];

const EXEGESIS_DATA = {
      "明德": {
        "shuowen": "明，日月相照也。从月从囧。",
        "note_zheng": "谓显明其至德也。",
        "note_kong": "在于章明己之光明之德。谓身有明德，而更章显之。",
        "note_zhu": "明德者，人之所得乎天，而虚灵不昧，以具众理而应万事者也。但为气禀所拘，人欲所蔽，则有时而昏；然其本体之明，则有未尝息者。故学者当因其所发而遂明之，以复其初也。",
        "benyi": "光明的德行；人禀受于天的虚灵不昧之心性",
        "yinshenyi": ["光明", "德行", "心性"],
        "qinmu": "《大学》：在明明德",
        "warning": "郑玄谓'显明其至德'，孔颖达强调'自我彰显'，朱熹则赋予天理心性的本体论内涵，体现了从行为描述到心性修养的演进"
    },
    "亲民": {
        "shuowen": "亲，至也。从见亲声。",
        "note_zheng": "",
        "note_kong": "在于亲爱于民，是其二也。",
        "note_zhu": "程子曰：亲，当作新。新者，革其旧之谓也，言既自明其明德，又当推以及人，使之亦有以去其旧染之污也。",
        "benyi": "亲爱民众（古本）/ 革新民众（朱熹改本作'新民'）",
        "yinshenyi": ["亲爱", "新化", "教化"],
        "qinmu": "《大学》：在亲民（古本）或在新民（朱熹改本）",
        "warning": "孔颖达疏为'亲爱于民'，朱熹采纳程子改为'新民'，意为推己及人、革除民众旧染，体现宋儒对道德教化的深化理解"
    },
    "至善": {
        "shuowen": "善，吉祥也。从羊从言。",
        "note_zheng": "止，犹自处也。",
        "note_kong": "在止处于至善之行，此其三也。言大学之道，在于此三事矣。",
        "note_zhu": "止者，必至于是而不迁之意。至善，则事理当然之极也。言明明德、新民，皆当至于至善之地而不迁。盖必其有以尽夫天理之极，而无一毫人欲之私也。此三者，大学之纲领也。",
        "benyi": "最高的善；天理与人欲对立的终极境界",
        "yinshenyi": ["善良", "完善", "境界"],
        "qinmu": "《大学》：在止于至善",
        "warning": "郑玄重'自处'的安顿，朱熹重'必至而不迁'的坚定和'天理极致、无人欲之私'的理学内涵，代表了从伦理到心性的深化"
    },
    "止": {
        "shuowen": "止，足也。从龰。",
        "note_zheng": "止，犹自处也。",
        "note_kong": "心定无欲改。",
        "note_zhu": "止者，所当止之地，即至善之所在也。知之，则志有定向。后文'止者，必至于是而不迁之意'。",
        "benyi": "停止；应当停留的地方",
        "yinshenyi": ["停止", "处所"],
        "qinmu": "《大学》：在止于至善；知止而后有定",
        "warning": "郑玄重'自处'的安顿，朱熹重'必至而不迁'的意志坚定，开启'止定静安虑得'的功夫链条"
    },
    "定": {
        "shuowen": "定，安也。从宀从正。",
        "note_kong": "心能有定，不有差贰也。",
        "note_zhu": "将'定'内化为心志的定向，强调内在意志的确定性。",
        "benyi": "坚定；安定",
        "yinshenyi": ["决定", "定位", "确定"],
        "qinmu": "《大学》：知止而后有定",
        "warning": "孔疏重行为不偏离，朱熹重心志的内在确定，体现心性修养的深化"
    },
    "静": {
        "shuowen": "静，审也。从青从争。",
        "note_kong": "能静不躁求也。",
        "note_zhu": "静，谓心不妄动。",
        "benyi": "宁静；内心安定",
        "yinshenyi": ["宁静", "静止", "静坐"],
        "qinmu": "《大学》：定而后能静",
        "warning": "孔疏以'不躁求'释'静'，侧重外在行为；朱熹以'心不妄动'释'静'，完全内化为心性状态，一外一内差异明显"
    },
    "安": {
        "shuowen": "安，定也。从宀从女。",
        "note_kong": "情性安和也。",
        "note_zhu": "安，谓所处而安。",
        "benyi": "安稳；处位安定",
        "yinshenyi": ["安全", "安心", "安宁"],
        "qinmu": "《大学》：静而后能安",
        "warning": "孔疏兼顾内在情性与外在和顺，朱熹强调主体在任何处境下都能安然自得，侧重境界的稳定性"
    },
    "虑": {
        "shuowen": "虑，思也。从心从虍。",
        "note_kong": "能思虑于事也。",
        "note_zhu": "虑，谓处事精详。",
        "benyi": "思虑；考虑",
        "yinshenyi": ["担心", "思考", "计划"],
        "qinmu": "《大学》：安而后能虑",
        "warning": "孔疏强调'思虑于事'，朱熹强调'处事精详'，都指向具体实践，但朱熹更突出认知的极致追求"
    },
    "得": {
        "shuowen": "得，行也。从彳从寸。",
        "note_zhu": "得者，得其所止也。",
        "benyi": "获得；达到",
        "yinshenyi": ["得到", "收获", "满足"],
        "qinmu": "《大学》：虑而后能得；知止为始，能得为终",
        "warning": "得是'止定静安虑得'链条的终点，指'得其所止'，对应开篇的'知止'，形成修养功夫的完整圆圈"
    }
};

const CROSS_REFERENCES = [
    {
        "source_classic": "论语",
        "source_chapter": "学而",
        "source_verse": "1",
        "target_classic": "孟子",
        "target_chapter": "尽心下",
        "target_verse": "28",
        "relationship": "思想延伸",
        "commentary": "孔子'学而时习之'强调学习实践，孟子进一步阐述学以致用与行动的重要性",
        "description": "两位圣贤都强调学习必须付诸实践"
    },
    {
        "source_classic": "论语",
        "source_chapter": "学而",
        "source_verse": "2",
        "target_classic": "孟子",
        "target_chapter": "离娄下",
        "target_verse": "19",
        "relationship": "概念呼应",
        "commentary": "论语中'孝弟为仁之本'与孟子'孝梯之心仁也'形成相互印证",
        "description": "孝顺是仁爱品德的基础"
    },
    {
        "source_classic": "论语",
        "source_chapter": "为政",
        "source_verse": "1",
        "target_classic": "孟子",
        "target_chapter": "尽心下",
        "target_verse": "24",
        "relationship": "政治哲学一致",
        "commentary": "孔子以北辰比喻德化治国，孟子进一步论证德治的可行性与优越性",
        "description": "道德治国优于武力统治"
    },
    {
        "source_classic": "论语",
        "source_chapter": "里仁",
        "source_verse": "16",
        "target_classic": "孟子",
        "target_chapter": "梁惠王下",
        "target_verse": "1",
        "relationship": "价值观对比",
        "commentary": "孔子'君子喻于义，小人喻于利'与孟子反复阐述'君子远庖厨'体现相同的价值取向",
        "description": "君子应追求义理而非私利"
    },
    {
        "source_classic": "论语",
        "source_chapter": "述而",
        "source_verse": "6",
        "target_classic": "中庸",
        "target_chapter": "1",
        "target_verse": "",
        "relationship": "思想基础",
        "commentary": "孔子'志于道，据于德，依于仁'是对圣人修养路径的阐述，《中庸》进一步发展为完整的修养论",
        "description": "修身养性的理论基础"
    },
    {
        "source_classic": "论语",
        "source_chapter": "颜渊",
        "source_verse": "1",
        "target_classic": "大学",
        "target_chapter": "1",
        "target_verse": "",
        "relationship": "修养论基础",
        "commentary": "克己复礼的论述在《大学》中演化为'格物致知''诚意正心'的完整修养体系",
        "description": "自我修养的理论体系"
    },
    {
        "source_classic": "孟子",
        "source_chapter": "梁惠王上",
        "source_verse": "7",
        "target_classic": "论语",
        "target_chapter": "里仁",
        "target_verse": "2",
        "relationship": "思想呼应",
        "commentary": "孟子'老吾老以及人之老'与孔子关于仁心的论述有深层一致性",
        "description": "由个人修养推广到普遍关怀"
    },
    {
        "source_classic": "孟子",
        "source_chapter": "公孙丑上",
        "source_verse": "3",
        "target_classic": "论语",
        "target_chapter": "为政",
        "target_verse": "3",
        "relationship": "道德心性论",
        "commentary": "孟子的四端说（恻隐、羞恶、辞让、是非之心）与孔子的仁义礼智思想相互呼应",
        "description": "人的道德心性本能"
    },
    {
        "source_classic": "大学",
        "source_chapter": "1",
        "source_verse": "",
        "target_classic": "中庸",
        "target_chapter": "1",
        "target_verse": "",
        "relationship": "修养体系构成",
        "commentary": "《大学》和《中庸》合称'二程子'经学体系的核心内容，共同构成新儒学修养论",
        "description": "儒家修身养性的完整理论"
    },
    {
        "source_classic": "论语",
        "source_chapter": "雍也",
        "source_verse": "29",
        "target_classic": "中庸",
        "target_chapter": "2",
        "target_verse": "",
        "relationship": "理想品德",
        "commentary": "孔子所说的中庸之德，《中庸》进一步解释为'中也者，天下之大本也'",
        "description": "中庸是最高的道德境界"
    }
];