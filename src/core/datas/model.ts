/**
 * @author HE
 */
/**
 * 长整形, int64
 */
type long = number;
type unlong = number;
/**
 * 无符号短整型, int16
 */
type unshort = number;
/**
 * 短整型, uint16
 */
type short = number;
/**
 * 整型 int32
 */
type int = number;
/**
 * 无符号整型 uint32
 */
type unint = number;
/**
 * 字符类型 int8
 */
type byte = number;
/**
 * 无符号字符类型 uint8
 */
type unbyte = number;
namespace model {
    export interface Map<T> {
        [key: string]: T;
    }
    /**
 * 玩家Dto
 * @author gil
 *
 */
    export interface PlayerDto {
        /**
         * 主键（玩家id）
         */
        id?: number;
        /**
         * 玩家充值了多少钱
         */
        charge?: number;
        /**
         * 登陆次数
         */
        loginCount?: number;
        /**
         * 性别
         */
        sex?: number;
        /**
         * 账号
         */
        account: string;

        /**
         * 用户呢称
         */
        nickName?: string;

        /**
         * 头像
         */
        headImages?: string;

        /**
         * 金币 long
         */
        gold?: long;

        /**
        * 存款 long
        */
        baoxianxiang?: long;

        /**
         * 钻石 long
        */
        diamond?: long

        /**
         * 内币 long
         */
        rmb?: long;

        /**
         * 手机
         */
        mobile?: string;
        /**
         * 房卡数量
         */
        fangkaCount?: number;
        /**
         * 用户渠道号
         */
        channel?: number;
        /**
         * 个性签名
         */
        qianming?: string;
        /**
         * 牛卡数量
         */
        niukaCount?: number;

    }

    export interface CharegConf {
        diamond: CharegConfItem[];
        gold: CharegConfItem[];
        quick: CharegConfItem[];
        tools: CharegConfItem[];
        cards: CharegConfItem[];
        niucards: CharegConfItem[];
        /**
         * 是否已经进行过首冲了
         */
        isGetFirstCharge: boolean;
        /**
         * 是否已经成功登录游戏
         */
        is_load: boolean;
    }

    export interface MsgBase<T> {
        result: int;
        content: T;
    }
    export interface GameConf {
        /**
         * 金币场的配置
         */
        coinRoom?: {},
        /**
         * 房卡模式的游戏配置
         */
        cardRoom: {
            isHot: number,
            gameId: GAME_ID
        }[][]
    }

    export interface G2C_SEND_CARDS {
        Cards: number[];
        playerId: number;
        // {"result":0,"CardLen":4,"Cards":[161,97,19,147],"playerId":0}
    }
    export interface NN_STARTGAME {
        game_cnt: unshort;//uint16  这是第几局游戏
        stage: unshort;//
        dealer_scpre: number;
        dealer: number;
    }

    export interface NN_CALL {
        playerId: unint;//uint32, 4, 玩家ID
        flag: unshort;//uint16, 2， 6， 该玩家是否抢庄以及分值
    }

    export interface NN_DEALER {
        dealer: unint;//uint32 4, 庄家ID - 抢庄结果
        dealer_scpre: unshort;//uint16 6 抢庄结果倍率
        playerIds: number[];
    }

    export interface NN_BET {
        playerId: unint;//uint32 4, 玩家ID
        in_chips: unint;//uint32, 8, 下注额
        own_chips: long;//int64, 16， 还拥有代入金额
    }

    export interface NN_LOOK {
        CardLen: unbyte;//uint8
        Cards: unbyte[];//uint8[CardLen], X张牌重新瑞再发一次
        handType: unshort;//uint16, 7, 牌型代码
        handvalue: unint;//uint32, 11, 牌型值
        action: unshort;//uint16   
        // .对于牛牛来说，就是算牛
        // .对于木虱来说，0x10表示可以不补牌，0x20表示可以补牌             
    }
    export interface OPEN_SCORE_ROOM {
        gameId: unint      //游戏ID,要开的是什么类型的房间
        extraLimit: unshort //   其它限制  0x01 表示 IP限制  0x02 表示地理位置限制
    }

    export interface OPEN_SCORE_ROOM_ZJH extends OPEN_SCORE_ROOM {
        roomLevel: short//int16    游戏级别 
        roundMax: short//回合封顶 10 15 20
        addChipsMax: short//加注封顶 5 10 20
    }

    export interface OPEN_SCORE_ROOM_GDMJ extends OPEN_SCORE_ROOM {
        roomLevel: short//int16    游戏级别 
        hufaFlag: short//huMode 胡牌模式,0表示可以接炮 1表示鸡胡只能自摸2表示所有牌型只能自摸
        hupaiType: short//fanMode 吃胡的类型组合 
        guipaiType: short//0:无鬼模式 2：白板为鬼 1： 翻鬼（如翻出一万，则2万为鬼牌）
        // maimaType: short//买码类型
        roomMode: unbyte//maMode 1: 无马   2： 买马  3：抓马 
        roomSubMode: unbyte//huMode 2：2码 4：4码 6：6码
    }


    export interface OPEN_SCORE_ROOM_DDZ extends OPEN_SCORE_ROOM {
        roomLevel: short//int16    游戏级别 
        roomMode: short//
        roomSubMode: short//
    }


    export interface OPEN_SCORE_ROOM_NN extends OPEN_SCORE_ROOM {
        roomLevel: short//int16    游戏级别 
        roomMode: unbyte// uint8    .1：看牌抢庄 2：轮庄  .3：无庄
        roomSubMode: unbyte//uint8.仅在GameMode3的情况下有效 0：顺序轮庄 1：牛九换庄 2：牛牛换庄
        betChips: unshort[]//uint16 X bet_cnt: uint16[bet_cnt]
        roomSize?: number;
        /**
         * 抢庄的倍数,只在金币场有用
         */
        qzRateList?: number[];

        difen?: number;
        // betChips?:number[];
    }
    export interface OPEN_SCORE_ROOM_TWO extends OPEN_SCORE_ROOM {
        roomLevel: short//int16    游戏级别 
        roomMode: unbyte// uint8    .1：看牌抢庄 2：轮庄  .3：无庄
        roomSubMode: unbyte//uint8.仅在GameMode3的情况下有效 0：顺序轮庄 1：牛九换庄 2：牛牛换庄
        betChips: unshort[]//uint16 X bet_cnt: uint16[bet_cnt]
        roomSize?: number;
        /**
         * 抢庄的倍数,只在金币场有用
         */
        qzRateList?: number[];

        difen?: number;
        // betChips?:number[];
    }

    export interface NN_SHOW {
        playerId: unint;//uint32, 4, 摊牌玩家
        handvalue: unint;//uint32, 8, 牌值
        handrate: unshort;//uint16, 10, 倍率 - 表示几倍
        CardLen: unbyte;//uint8
        Cards: unbyte[];//uint8[CardLen],  X 张牌
    }

    export interface NN_RESULT {
        dealerID: unint;//uint32, 4,庄家ID
        targetID: unint;//uint32, 4, 闲家ID
        winnerID: unint;//uint32, 4, 赢家ID
        GamePlayerInfo:
        {
            playerId: unint;//uint32 游戏ID，其实就是房间内的座位号
            status: unshort;//uint16 玩家状态 0：新玩家，1：闲家，2：庄家
            in_chips: unint;//uint32 下注额
            own_chips: long;//uint64,拥有的带入金钱
        }[];

    }

    export interface NN_GAMEOVER {
        // PlayerCnt: unshort;//uint16,2, 玩家人数\
        gameResult:
        {
            playerId: unint;//uint32, 4, 玩家ID
            // CardLen: unbyte;//uint8
            cards: unbyte[];//uint8[CardLen], 5， 玩家的牌
            handValue: unint;//uint32, 4
            balance: unint;//int32,  4  玩家输赢情况
        }[];//注： 默认最后一个为庄
    }

    export interface NN_BU {
        playerId: unint;//uint32, 4, 补牌玩家
        value: unshort;//uint16     6, 0x10: 不补牌   0x20： 补牌
        BuCard: unbyte;//uint8 #补的牌  -- 可能没有哦
    }

    export interface NN_SHOW_DONE {
        playerId: unint;//uint32, 4 玩家ID - 表示该玩家show牌了
    }

    export interface NN_TURN_ACTION {
        plaerID: unint;//uint32 - 轮到玩家的playerid
        can_action: unshort;//uint16, 6 玩家可以进行的操作
    }

    export interface PLAYER_INFO {
        playerId: unint, //uint32   .玩家ID(即座位ID): 0 - 8
        //# 以下在该位置上有玩家或玩家已出局才有.
        UserInfo: PlayerDto;//  用户基本信息
        chips: unlong; //uint64 筹码数量
        playerFlags: unbyte, //
        qiangZhuang: number;//是否已经抢庄 -1为还没有抢庄
        ready: number;//是否已经准备
        showed: number;//是否已经算牛
        touZhu: number;//是否已经下注
        zuoweiIndex: number;//玩家的座位
    }

    export interface ROOM_CHAT {

        chatStr: string;

        playerId: unint;
    }
    export interface COMMON_BOX {
        leftBtnBg?: string;//左边颜色按钮
        leftBtnIcon?: string//左边按钮字
        rightBtnBg?: string;//右边颜色按钮
        rightBtnIcon?: string//右边按钮字
        title?: string;//标题内容
        tipsStr?: string;//主要内容
        curState?: string;//当前状态
        leftFunc?: Function;//左边按钮回调函数
        leftThisObj?: Object;
        rightFunc?: Function;//右边按钮回调函数
        rightThisObj?: Object;
    }




    export interface BrannRoomInfo {
        roomId: unint,
        nowRoomPlayer: unint,	//房间当前人数
        maxRoomPlayer: unint,	//房间最大人数
        maxWangCount: unint,
        roomLevel: unint,

        wangNameList:
        {
            nickName: string,
            playerId: unint,
        }[],
        //当庄的王的名字	

    }
    /**
    * 保险箱金币
    */
    export interface DepositMoney {
        result: number,
        gold?: number
    }
    /**
    * 保险箱存钱
    */
    export interface SaveMoney {
        result: number,
        Baoxianxiang?: number
    }
    /**
    * 破产补贴
    */
    export interface BrokeMoney {
        result: number,
        todayAskPochan?: number
    }

    /**
    * 总财富的用户数据
    */
    export interface WealthListInfo {
        result: number,
        goldPHBList:
        {
            gold: number,
            nickName: string,
            id: number,
            headImages: string,
        }[]

    }


    export interface EnterScoreRoomInfo<T> {
        playerId: unint;
        stage: GAME_STAGE;
        chipsList: number[];
        /**
         * 游戏底分
         */
        difen: number;
        zuoweiIndex: number;//坐在哪个位置
        room_id: unint, //uint32 房间号  为 0 表示没有这个房间
        can_game_cnt: unshort, //uint16 该房间应该游戏多少局
        done_game_cnt: unshort,// uint16 该房间已经玩了多少局
        right: unshort;// uint16 权利 0x01表示可退出 0x02表示可申请解散
        // --开房的参数数据 见 C2G_OPEN_ROOM 4- X
        createinfo: T;
    }
    // {}
    export interface EnterBrnnRoomInfo {
        /**
         * 房间最多有几个王
         */
        maxWangCount: number,
        betChips: number[],
        updateChips: number;//玩家当前金币数
        roomId: number; //uint32 房间号  为 0 表示没有这个房间
        nowRoomPlayer: number;	//房间当前人数
        maxRoomPlayer: number;	//房间最大人数
        wangNameList: {
            nickName: string,
            playerId: number
        }[];//(G2C_BRNN_ROOMINFO里的数据)
        playerId: number;
        /**
         * 庄家战绩列表
         */
        winRewardList: number[][],
        // betChips
        roomMode: number;
        roomType: number;
        roomLevel: number;
        /**
         * 底分
         */
        difen: number;
        NickName: string;
        weizhi: number;//位置-1表示还未坐下
        sumChips: number;
        createinfo: any;
    }
    /**
     * 百人牛牛玩家列表
     */
    export interface BRNN_ROOM_PLAYERS_List {
        players:
        {
            playerId: number;
            nickName: string;
            chips: number;
            headImages: string;
        }[],
    }
    /**
     * 邀请玩家列表
     */
    export interface GamePlayList {
        result: number,
        tuiguangyuanList: {
            tuiguangyuanId: number,
            nickName: string,
            playGameCount, number,
            headImages: string,
            playerId: number,
            getJiangliType: number
        }[]

    }
    /**
     * 邀请玩家获取奖励
     */
    export interface GamePlayAward {
        result: number,
        rewardGold: number,
        playerId: number,
        getJiangliType: number
    }

    /**
     *游戏最终结算的数据
     */
    export interface GameAccountInfo {
        // "result": 0,
        done_game_cnt: number,
        playerMsg:
        {
            best_score: number,
            best_handvalue: number,
            done_game_cnt: number,
            playerId: number,
            cur_chips: number,
            /**
             * 0-3位赢的盘数,4-7位输的盘数,8-11位平的盘数
             */
            winLoseResult: number;
        }[],
        gameId: number
    }
    // {"result":0,"errorValue":0,"NickName":"6","playerId":1}
    export interface LeaveRoomInfo {
        // "result":0,
        UserName: string,
        NickName: string,
        playerId: number,
        gameId: number;
        /**
         * 离开房间的类型,等于1是切换房间
         */
        leaveType: number;
    }
    export interface LeaveScoreRoomInfo {
        /**
         * 离开原因(错误) 0直接离开,1需要其它玩家确认解散房间,
         */
        errorValue: number,
        NickName: string,
        playerId: number,
    }
    export interface UpdateZhanjiListInfo {
        result: number,
        winList: number[][],
    }
    export interface DelScoreRoomResInfo {
        voteCnt: number;
        agreeCnt: number;
        voteRes: number;
        playerStateList: { leaveType: number, nickName: string }[]
    }

    export interface DelScoreRoomInfo {
        voteRes: number;
        playerId;
    }
    // G2C_DEL_SCORE_ROOM
    export interface ChipsUpdateInfo {
        playerId: number,
        updateChips: number,
    }

    export interface QiandaoInfo {
        qiandaoCount: number;
        canQd: number;
    }

    export interface CHATMsgInfo {
        showCount: number;
        sendMsg: string;
    }
    export interface UserZhanjiInfo {
        result: number;
        zhanjiList: {
            result: number,
            gameId: number,
            createTime: number,
            recordRoomList: { time?: number }[],
            playerNames: {},
            roomId: number
        }[];
    }
    export interface DaoJuInfo {
        result: number;
        bagItemList: { count: number, daojuId: number }[];
    }

    export interface DingDanInfo {
        result: number,
        dingdanList: {
            buyPlayerId: number,
            saleTime: number,
            needGold: number,
            salePlayerNickName: string,
            createTime: number,
            dingdanId: number,
            isSale: number,
            daojuId: number,
            isGetSaleGold: number,
            salePlayerId: number,
            buyPlayerNickName: string
        }[]
    }

    export interface SearchDingDanInfo {
        result: number,
        dingdan: {
            buyPlayerId: number,
            saleTime: number,
            needGold: number,
            salePlayerNickName: string,
            createTime: number,
            dingdanId: number,
            isSale: number,
            daojuId: number,
            isGetSaleGold: number,
            salePlayerId: number,
            buyPlayerNickName: string
        }
    }
}