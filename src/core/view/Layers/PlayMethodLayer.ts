namespace Layers {
	/**
	 *
	 * @author 
	 *
	 */
    const helpDescs = [];

    helpDescs[GAME_ID.NIUNIU] = [
        { text: "1.用牌：\n", style: { "size": 25 } },
        { text: "一副牌去大小王，共52张." },
        { text: "\n\n" },
        { text: "2.牌型：", style: { size: "25" } },
        { text: "\n" },
        { text: "基本牌型比较：五小牛 ＞ 五花牛 ＞ 四炸 ＞ 牛牛 ＞ 没牛.\n" },
        { text: "有牛牌型比较：牛九 ＞ 牛八 ＞ 牛七 ＞ 牛六 ＞ 牛五 ＞ 牛四 ＞ 牛三 ＞ 牛二 ＞ 牛一.\n" },
        { text: "牌型相同比较数字：K ＞ Q ＞ J ＞ 10 ＞ 9 ＞ 8 ＞ 7 ＞ 6 ＞ 5 ＞ 4 ＞ 3 ＞ 2 ＞ A.\n" },
        { text: "数字相同比较花色：黑桃  ＞ 红桃 ＞ 梅花 ＞ 方块.\n\n" },
        { text: "特殊牌型：\n", style: { size: "25" } },
        { text: "五小牛：即五张牌都小余5，且牌点总数小余或等于10.\n" },
        { text: "五花牛：花指的是JQK，五花牛指的是手上的5张牌全为JQK的特殊牛牛牌型。若庄家闲家都是五花牛牌型，则比较最大一张牌的大小，若最大一张牌的大小一样则按照花色比较.\n" },
        { text: "四炸：即5张牌中有4张一样的牌，此时无需有牛。若庄家闲家都是四炸牌型，则比较4张一样的牌的大小.\n\n" },
        { text: "3.游戏流程：", style: { size: "25" } },
        { text: "\n" },
        { text: "决定庄家：抢庄、轮庄，定庄多种方式（自定义设置）.\n" },
        { text: "发牌阶段：从庄家起，逆时针发牌。每人5张。自己的牌入手直接为明牌.\n" },
        { text: "配牛阶段：玩家自己动手配牛.\n点选3张牌后，手牌上方动态提示牌型。如“牛六”、“没牛”.\n点选3张牌，可选择“确定”按钮,可选择“没牛”按钮；\n全部配牛结束，即时播放该家“牌型动画”.\n" },
        { text: "\n4.牌型倍数解析：", style: { size: "25" } },
        { text: "\n" },
        { text: "牛1 ~ 牛6是 1倍奖励.\n牛牛是3倍奖励.\n四炸是5倍奖励.\n五花牛是10倍奖励.\n五小牛是10倍奖励." }
    ];
    helpDescs[GAME_ID.DDZ] = [
        { text: "用牌：\n", style: { size: "25" } },
        { text: "一副牌包括大小王，共54张。\n\n" },
        { text: "玩法：\n", style: { size: "25" } },
        { text: "由三人玩一副牌，地主为一方，其余两家为另一方，双方对战，先出完手中牌的一方胜\n\n" },
        { text: "游戏规则：\n", style: { size: "25" } },
        { text: "发牌：一副牌 54 张，一人 17 张，留 3 张做底牌，在确定地主之前玩家不能看底牌。\n" },
        { text: "定地主：首局以房主优先叫地主，第二局开始由上局最先出完牌的玩家优先叫地主。有叫地主叫分两种方式（自定义设置）。\n" },
        { text: "叫分：按出牌的顺序轮流进行，每人只能叫一次。叫牌时可以叫 “1 分 ” ， “2 分 ” ， “3 分 ” ， “ 不叫 ” 。后叫牌者只能叫比前面玩家高的分或者不叫。叫牌结束后所叫分值最大的玩家为地主；如果有玩家叫 “3 分 ” 则立即结束叫牌，该玩家为地主；如果都不叫，则重新发牌，重新叫牌。\n" },
        { text: "出牌：将三张底牌交给地主，并亮出底牌让所有人都能看到。地主首先出牌，然后按逆时针顺序依次出牌，轮到用户跟牌时，用户可以选择 “ 不出 ” 或出比上一个玩家大的牌。某一玩家出完牌时结束本局。\n\n" },
        { text: "牌型：\n", style: { size: "25" } },
        { text: "火箭：即双王（大王和小王），最大的牌。\n" },
        { text: "炸弹：四张同数值牌（如四个 7 ）。\n" },
        { text: "单牌：单个牌（如红桃 5 ）。\n" },
        { text: "对牌：数值相同的两张牌（如梅花 4+ 方块 4 ）。\n" },
        { text: "三张牌：数值相同的三张牌（如三个 J ）。\n" },
        { text: "三带一：数值相同的三张牌 + 一张单牌。例如： 333+6\n" },
        { text: "单顺：五张或更多的连续单牌（如： 45678 或 78910JQK ）。不包括 2 点和双王。 \n" },
        { text: "双顺：三对或更多的连续对牌（如： 334455 、7788991010JJ ）。不包括 2 点和双王。\n" },
        { text: "三顺：二个或更多的连续三张牌（如： 333444 、 555666777888 ）。不包括 2 点和双王。\n" },
        { text: "飞机带翅膀：三顺＋同数量的单牌（或同数量的对牌）。如： 444555+79 或 333444555+7799JJ  \n" },
        { text: "四带二：四张牌＋两手牌。（注意：四带二不是炸弹）。如： 5555 ＋ 3 ＋ 8 或 4444 ＋ 55 ＋ 77 。\n\n" },
        { text: "牌型的大小：\n", style: { size: "25" } },
        { text: "火箭最大，可以打任意其他的牌。\n炸弹比火箭小，比其他牌大。都是炸弹时按牌的分值比大小。\n除火箭和炸弹外，其他牌必须要牌型相同且总张数相同才能比大小。\n单牌按分值比大小，依次是 大王 > 小王 >2>A>K>Q>J>10>9>8>7>6>5>4>3 ，不分花色\n对牌、三张牌都按分值比大小。\n顺牌按最大的一张牌的分值来比大小。\n飞机带翅膀和四带二按其中的三顺和四张部分来比，带的牌不影响大小。\n" },
        { text: "\n胜负判定：\n", style: { size: "25" } },
        { text: "任意一家出完牌后结束游戏，若是地主先出完牌则地主胜，否则另外两家胜。\n" },
        { text: "\n封顶炸弹：\n", style: { size: "25" } },
        { text: "确定封顶炸弹个数（自定义设置）。" },
    ];

    helpDescs[GAME_ID.DZ] = [
        { text: "用牌：\n", style: { size: "25" } },
        { text: "一副牌去大小王，共52张 \n\n" },
        { text: "游戏流程:\n", style: { size: "25" } },
        { text: "第一步:准备，所有人准备齐，则开始牌局。\n" },
        { text: "第二步:定庄，首先确定庄家（英文为Button，固也称按钮）位置。第一局庄家位置指定为房主，以后每局庄家位置按照顺时针方向下移一位）\n" },
        { text: "第三步：盲注，强制庄家左边的第一个人下一注（称小盲注），按钮左边的第二个人下两注（称大盲注）。\n" },
        { text: "第四步：底牌，下盲注后从下大盲注玩家开始按顺时针方向每人发两张牌，皆为暗牌，称底牌或起手牌。\n" },
        { text: "第五步：第一轮下注，发底牌后，从大盲注左边的玩家开始行动。一人结束行动后按顺时针方向下一玩家获得行动权，直到不再有人弃牌，且每人已向奖池投入相同注额。已弃牌玩家不再有行动权。\n" },
        { text: "第六步：翻牌及第二轮下注，发三张牌到牌桌中央，称为“翻牌”，为公共牌，所有人可见。\n" },
        { text: "第七步：转牌及第三轮下注，发一张牌到“翻牌”旁，称为“转牌”，为公共牌，所有人可见。\n" },
        { text: "第八步：河牌及第四轮下注，发一张牌到“转牌”旁，称为“河牌”，为公共牌，所有人可见。\n" },
        { text: "第九步：摊牌和比牌，四轮下注都完成后，若仍剩余两名或两名以上玩家，则进行比牌。比牌时，每位玩家用手中2张底牌与5张公共牌中任选5张组成最大牌者进行比较大小。胜者赢得底池所有注码。若有多人获胜，则平分底池注码。\n" },
        { text: "投注结算规则:\n", style: { size: "25" } },
        { text: "可以在任何时间以任何资金下注，不超过玩家在牌桌上的余额即可。\n" },
        { text: "下注金额必须至少相当于大盲注，除非玩家没有足够资金而被迫全押。\n" },
        { text: "全押，当一个玩家加注或企图跟注却筹码不足时，他可以选择全押。当有玩家全押时，他会跟进他所有的筹码，底池被分为主池和边池。其他玩家多出全押玩家筹码的注额将都会被加入边池，此全押玩家将不可能获得边池而只可能赢得主池。同理，当多个玩家全押时可能出现多个边池。\n" },
        { text: "一局结束时从可能赢取玩家最少的奖池开始比较，每个奖池的赢得者可能相同，也可能不同。\n" },
        { text: "当玩家手牌相同时平分相应底池，若平分底池出现余数时，余数由庄家左手边起顺时针第一位玩家获得。\n" },
        { text: "牌型介绍:\n", style: { size: "25" } },
        { text: "所有牌型如下：\n" },
        { text: "皇家同花顺：同一花色的最大顺子。（最大牌：A-K-Q-J-10）\n" },
        { text: "同花顺：同一花色的顺子。（最大牌：K-Q-J-10-9 最小牌：A-2-3-4-5）\n" },
        { text: "四条：四同张加单张。（最大牌：A-A-A-A-K 最小牌：2-2-2-2-3）\n" },
        { text: "葫芦（豪斯）：三同张加对子。（最大牌：A-A-A-K-K 最小牌：2-2-2-3-3）\n" },
        { text: "同花：同一花色。（最大牌：A-K-Q-J-9 最小牌：2-3-4-5-7）\n" },
        { text: "顺子：花色不一样的顺子。（最大牌：A-K-Q-J-10 最小牌：A-2-3-4-5）\n" },
        { text: "三条：三同张加两单张。（最大牌：A-A-A-K-Q 最小牌：2-2-2-3-4）\n" },
        { text: "两对：（最大牌：A-A-K-K-Q 最小牌：2-2-3-3-4）\n" },
        { text: "一对：（最大牌：A-A-K-Q-J 最小牌：2-2-3-4-5）\n" },
        { text: "单牌：（最大牌：A-K-Q-J-9 最小牌：2-3-4-5-7）\n" },
        { text: "牌型大小：\n" },
        { text: "皇家同花顺>同花顺>四条>葫芦>同花>顺子>三条>两队>一对>单牌。\n" },
        { text: "牌点从大到小为：A、K、Q、J、10、9、8、7、6、5、4、3、2，各花色不分大小。\n" },
        { text: "同种牌型，对子时比对子的大小，其它牌型比最大的牌张，如最大牌张相同则比第二大的牌张，以此类推，都相同时为相同\n" },
    ];

    helpDescs[GAME_ID.ZJH] = [
        { text: "用牌：\n", style: { size: "25" } },
        { text: "一副牌去大小王，共52张\n\n" },
        { text: "游戏流程:\n", style: { size: "25" } },
        { text: "底注：发牌之前大家先投入的分数\n" },
        { text: "发牌：从庄家上家顺时针发牌，第一局房主为庄家。每人发三张牌，牌面向下，为暗牌\n" },
        { text: "投注：庄家的顺时针的下一家先开始下注，其他玩家依次顺时针操作。轮到玩家操作时，玩家根据条件和判断形势可以进行加注、跟注、看牌、放弃、比牌等操作。\n" },
        { text: "比牌：当游戏进行3回合后则可以随时选择开牌，选开牌的玩家要付出当前筹码的双倍筹码。如果牌型大小相同，则先开牌的玩家判输；或者达到封顶回合数时，则由系统开牌。\n" },
        { text: "判断胜负：根据牌型比较规则来判断胜负。显示所有没有放弃的玩家的牌型。如果可以投注的玩家只剩下一个，则判此玩家为赢家，且不显示赢家的牌。\n" },
        { text: "分配筹码：根据胜负结果来分配筹码，赢家得到桌面上所有的积分。\n\n" },
        { text: "牌型：\n", style: { size: "25" } },
        { text: "豹子：三张同样大小的牌。\n" },
        { text: "顺金：花色相同的三张连牌。（最大牌：K-Q-J-10-9 最小牌：A-2-3-4-5）\n" },
        { text: "金花：三张花色相同的牌。（最大牌：A-A-A-A-K 最小牌：2-2-2-2-3）\n" },
        { text: "顺子：三张花色不全相同的连牌。（最大牌：A-A-A-K-K 最小牌：2-2-2-3-3）\n" },
        { text: "对子：三张牌中有两张同样大小的牌。\n" },
        { text: "高牌：除以上牌型的牌。\n" },
        { text: "特殊：花色不同的 235，最小。\n\n" },
        { text: "牌型的比较：\n", style: { size: "25" } },
        { text: "豹子 >顺金 >金花 >顺子 >对子 >高牌\n" },
        { text: "豹子、金花、对子、单张的比较，按照顺序比点的规则比较大小。\n" },
        { text: "顺金、顺子按照顺序比点。 AKQ >A23 >KQJ >QJ10 。\n" },
    ];


    export class PlayMethodLayer extends BaseLayer {
        private _isInit: boolean;
        private _gameList: { gameId: number, isHot: boolean }[];
        // protected _gameTypeId: number;//游戏类型id
        private _label: eui.Label;
        private _tabBar: eui.TabBar;
        private _scroller: eui.Scroller;

        private _gameConf: model.GameConf;


        public constructor() {
            super();
            // this._gameTypeId = _gameTypeId;
            this.loadKey = ResManager.GROUP_NAME.CREATEROOM;
            this.skinName = PlayMethodSkin;
        }


        public init() {
            if (this._isInit) {
                return;
            }
            // this.destroyLoidImg();
            let list: { gameId: GAME_ID, isHot: number }[] = [];
            for (let key in Config.gameConf.cardRoom) {
                list = list.concat(Config.gameConf.cardRoom[key])
                // list.push.apply(Config.gameConf.cardRoom[key]);
            }
            this._isInit = true;
            // let list = Config.gameConf.cardRoom[this._gameTypeId];
            let length = list.length;
            let tabStr = [];
            let selectIndex = 0;
            for (let i = 0; i < length; ++i) {
                let layer: any;
                switch (list[i].gameId) {
                    case GAME_ID.NIUNIU:
                        tabStr.push({ name: "ll_text1_png", id: list[i].gameId });
                        break;
                    case GAME_ID.DDZ:
                        tabStr.push({ name: "ddj_text1_png", id: list[i].gameId });
                        break;
                    case GAME_ID.DZ:
                        tabStr.push({ name: "szp_text1_png", id: list[i].gameId });
                        break;
                    case GAME_ID.ZJH:
                        tabStr.push({ name: "dzpk_text1_png", id: list[i].gameId });
                        break;
                }
            }
            this._tabBar.dataProvider = new eui.ArrayCollection(tabStr);
            this._label.textFlow = helpDescs[list[0].gameId];
            // this._viewStack.selectedIndex =  this._tabBar.selectedIndex = selectIndex;
        }


        protected childrenCreated(): void {
            super.childrenCreated();
            let self = this;
            self._gameConf = Config.gameConf;
            // if (Config.gameConf.cardRoom[self._gameTypeId]) {
            self.init();
            // }
            self._tabBar.addEventListener(egret.Event.CHANGE, self.chanTab, self);
        }


        private chanTab(evt: eui.CollectionEvent): void {
            this._label.textFlow = helpDescs[this._tabBar.selectedItem.id];
            this._scroller.viewport.scrollV = 0;
        }
    }

}