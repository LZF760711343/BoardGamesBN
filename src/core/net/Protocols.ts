
enum PlayerOrder {

	/**
	 * 心跳
	 */
	HEART_BEAT = 0,

	/**
	 * 创建玩家
	 * @param String account 帐号
	 * @param String nickName 呢称
	 * @return JSON {
	 * 				"result" : ResultCode
	 * 				"content" : PlayerDto 玩家Dto
	 * 				}
	 */
	CREATE_PLAYER = 1,
	/**
 * 检查账号是否存在
 * @param String account 账号
 * @server return JSON{
 * 						"result":ResultCode
 * 						"content": Boolean True-已存在角色名, false-不存在角色名	
 * 					  }
 */
	CHECK_ACCOUNT = 3,
	/**
	 * 登陆
	 * @param String account 呢称
	 * @return JSON {
	 * 				"result" : ResultCode
	 * 				"content" : PlayerDto 玩家Dto
	 * 				}
	 */
	LOGIN = 2,
	ALL2C_STR_ERROR = 5,
	// PlayerCmd.ALL2C_STR_ERROR, Module.PLAYER
	G2C_NORMAL_TIPS = 6,		//弹出确定对话框
	//tipsStr	提示消息
	G2C_CHONGZHI_TIPS = 7,		//弹出充值与确定对话框
	//玩家掉线
	PLAYER_ME_OFF_LINE = 8,

	//玩家上线
	PLAYER_ON_LINE = 9,

	//玩家离线
	PLAYER_OFF_LINE = 10,

	G2C_GET_CHONGZHI = 20,
	//修改用户信息
	C2G_CHANGE_PLAYER_ATTR = 23,
	//--------------------------------------推送--------------------------------------------

	/**
	 * 推送当前连接即将关闭(收到此推送客户端不再重连)
	 * @return JSON {
	 * 				"content" : Integer 断线类型  0-链接关闭(客户端对此不做反应不再重连) 1-在其他地方登陆  2-被管理后台踢下线  3-IP被封  4-账号被封  5-服务器关闭 6-请求频繁
	 * 				}
	 * @return 
	 */
	PUSH_OFF_LINE = 101,
}
const enum OFF_LINE_ERROR {
	/**
	 * 0-链接关闭(客户端对此不做反应不再重连)
	 */
	LINE_CLOSE = 0,
	/**
	 * 1-在其他地方登陆
	 */
	LOGIN_OTHER = 1,
	/**
	 * 2-被管理后台踢下线
	 */
	KICK = 2,
	/**
	 * 3-IP被封
	 */
	IP_NOT_ALLOW = 3,
	/**
	 * 4-账号被封
	 */
	ACCOUNT_NOT_ALLOW = 4,
	/**
	 *  5-服务器关闭 
	 */
	SERVER_CLOSE,
	/**
	 * 6-请求频繁
	 */
	CONNECT_TOO_OFTEN,
	/**
	 * 7-服务器启动中
	 */
	SERVER_START_UP_ING,
}
const OFF_LINE_TIP = [
	"链接关闭(客户端对此不做反应不再重连)",
	"您的账号在其他地方登陆!",
	"被管理后台踢下线",
	"IP被封",
	"账号被封",
	"服务器关闭",
	"请求频繁",
	"服务器启动中"
];
enum PlayGameOrder {
	C2G_ENTER_SCORE_ROOM = 3,
	/**
	 * 创建房卡房间
	 * @param JSON{
	 * 	
	 * }
	 */
	C2G_OPEN_SCORE_ROOM = 4,
	/**
	 * 服务器通知客户端进入房卡房间的协议
	 */
	G2C_ENTER_SCORE_ROOM = 5,
	/**
	 * 玩家信息
	 */
	G2C_PLAYER_INFO = 6,

	C2G_USER_INFO = 7,

	G2C_USER_INFO = 8,

	C2G_READY_GAME = 9,

	G2C_READY_GAME = 10,

	G2G_CHIPS_UPDATE = 11,

	G2C_NN_STARTGAME = 12,

	G2C_SEND_CARDS = 13,

	C2G_NN_CALL = 14,
	//flag, uint16, 2, 1-4:表示要抢庄, 0表示不抢庄
	//C2G_NN_CALL             0x2802       2              flag, uint16, 2, 1-4:表示要抢庄, 0表示不抢庄

	G2C_NN_CALL = 15,
	//G2C_NN_CALL             0x3802       6              playerId: uint32, 4, 玩家ID
	//                                                    flag:uint16, 2， 6， 该玩家是否抢庄以及分值

	G2C_NN_DEALER = 16,
	/*
		G2C_NN_DEALER           0x3803       18-78          
		dealer, uint32 4, 庄家ID - 抢庄结果
	    dealer_scpre uint16 6 抢庄结果倍率
	    
	    playerIds: 
	    [
	        playerid: 玩家ID
	    ]
    */
	C2G_NN_BET = 17,
	//C2G_NN_BET              0x2804       4              in_chips, uint32, 4, 下注金额

	G2C_NN_BET = 18,
	/*
	G2C_NN_BET              0x3804       16              
	playerId: uint32 4, 玩家ID
	in_chips: uint32, 8, 下注额
	own_chips: int64, 16， 还拥有代入金额
	*/
	G2C_NN_LOOK = 19,
	/*
	G2C_NN_LOOK             0x3805       11-14          
	CardLen:  uint8
	cards, uint8[CardLen], X张牌重新瑞再发一次
	handtype, uint16, 7, 牌型代码
	handvalue, uint32, 11, 牌型值
	action: uint16   
	.对于牛牛来说，就是算牛
	.对于木虱来说，0x10表示可以不补牌，0x20表示可以补牌
	*/

	C2G_NN_SHOW = 20,
	/*
	C2G_NN_SHOW             0x2806       2-10           
	handtype, uint16, 2, 牌型
    -- 牛牛 - 以下内容可能有 --
    cards, uint8[3],  3张牌
    */

	G2C_NN_SHOW = 21,
	/*
	G2C_NN_SHOW             0x3806       13-16          
	playerId: uint32, 4, 摊牌玩家
    handvalue, uint32, 8, 牌值
    handrate,  uint16, 10, 倍率 - 表示几倍
    CardLen:  uint8
    cards, uint8[CardLen],  X 张牌
     */

	G2C_NN_RESULT = 22,
	/*
	G2C_NN_RESULT           0x3807       48             
	dealerID, uint32, 4,庄家ID
    targetID, uint32, 4, 闲家ID
    winnerID, uint32, 4, 赢家ID
    GamePlayerInfo[2] 18，36， 48
    {
        playerId: uint32 游戏ID，其实就是房间内的座位号
        status: uint16 玩家状态 0：新玩家，1：闲家，2：庄家
        in_chips: uint32 下注额
        own_chips: uint64,拥有的带入金钱
    }
    */

	G2C_NN_GAMEOVER = 23,
	/*
	G2C_NN_GAMEOVER         0x3808      2-160          
	PlayerCnt: uint16,2, 玩家人数
    GameResult[PlayerCnt] 17, 34-153, 36-155
    {
        playerId: uint32, 4, 玩家ID
        CardLen:  uint8
        cards, uint8[CardLen], 5， 玩家的牌
        handvalue, uint32, 4
        balance, int32,  4  玩家输赢情况
    } 注： 默认最后一个为庄
    */

	C2G_NN_BU = 24,

	//C2G_NN_BU               0x2809       2              
	//value: uint16  0x10: 不补牌   0x20： 补牌

	G2C_NN_BU = 25,
	/*
	G2C_NN_BU               0x3809       6-17           
	playerId: uint32, 4, 补牌玩家
    value: uint16     6, 0x10: 不补牌   0x20： 补牌
    ---- 以下牌可能没有 ----
    BuCard: uint8 #补的牌  -- 可能没有哦
    */

	G2C_NN_SHOW_DONE = 26,

	//G2C_NN_SHOW_DONE         0x380B        4            
	//playerId: uint32, 4 玩家ID - 表示该玩家show牌了

	G2C_NN_TURN_ACTION = 27,
	C2G_LEAVE_SCORE_ROOM = 28,
	G2C_LEAVE_SCORE_ROOM = 29,
	G2C_SCORE_ROOM_HIS = 30,
	G2C_NN_GAMEPROCESS = 31,
	G2C_LEAVE_ROOM = 32,
	/**
	 * 更新玩家的筹码
	 */
	G2C_CHIPS_UPDATE = 33,
	C2G_DEL_SCORE_ROOM = 34,
	G2C_DEL_SCORE_ROOM = 35,
	G2C_DEL_SCORE_ROOM_RES = 36,
	C2G_BRNN_ROOMINFO = 37,	 //取得百人牛牛房间消息

	G2C_BRNN_ROOMINFO = 38,	 //返回房间消息
	/*
	zuoWeiId
	cards: uint8[CardLen] 五张牌
	handValue	牌型
	rewardRate	计算结果用的倍率
	 */
	G2C_BRNN_FANG_PAI = 39,	//百人牛牛翻牌

	/*
	zuoWeiId
	in_chips: 投的注
	win_chips	赢的注			
	 */
	G2C_ONE_HAND_RESULT = 40,		//此注的输赢

	/*
	roundWinChips: 本回合赢的注
	chouShui	抽水			
	 */
	G2C_CALC_SUM_RESULT = 41,		//玩家总输赢,游戏结束

	G2C_BRNN_GAMEOVER = 42,		//百人牛牛这盘游戏结束
	C2G_ENTER_ROOM = 43,		//进入百人牛牛
	/*
	roomId: 房间ID			
	roomType: 房间类型		
	 */
	G2C_ENTER_BRNN_ROOM = 44,		//进入百人牛牛返回
	C2G_SITDOWN = 45,		//坐下
	G2C_SITDOWN = 46,		//坐下
	/*
	stage
	sumInChipsList[
	zuoweiIndex
	inChips]
	*/
	G2C_BRNN_STARTGAME = 47,		//百人牛牛开始
	/*
	stage
	sumInChipsList[
	zuoweiIndex
	inChips]
	selfInChipsList[
	zuoweiIndex
	inChips]
	*/
	G2C_BRNN_GAMEPROCESS = 48,		//百人牛牛重进游戏
	C2G_ASK_XIAZHUANG = 49,		//申请下庄
	// C2G_ASK_XIAZHUANG = 50,		//申请下庄
	C2G_ASK_SHANGZHUANG = 51,		//申请上庄
	G2C_ZHUANG_JIA_LIST = 52,		//玩家上下庄返回
	/**
	 * 游戏状态改变
	 */
	G2C_CHANGE_STATE = 55,
	G2C_BRNN_BET = 56,
	G2C_UPDATE_ZHANJI_LIST = 57,//刷新战绩列表
	C2G_CHANGE_ROOM = 58,//换桌
	G2C_ENTER_ROOM = 59,//进房
	G2C_STARTGAME = 61,
	C2G_PSZ_KANPAI = 62,
	G2C_PSZ_KANPAI = 63,

	G2C_ROUND_COUNT = 64,		//回合数
	C2G_PSZ_BIPAI = 65,//比牌
	G2C_PSZ_BIPAI = 66,
	G2C_GAMEPROCESS = 67,
	G2C_GAMEOVER = 68,


	C2G_GET_IN_ROOM_PLAYERS = 69,	//得到房间中参与游戏的玩家
	G2C_GET_IN_ROOM_PLAYERS = 70,	//得到房间中参与游戏的玩家

	C2G_ROOM_CHAT = 71,
	G2C_ROOM_CHAT = 72,
	C2G_CHU_PAI = 73,	//玩家出牌
	G2C_CHU_PAI = 74,	//玩家出牌
	G2C_DIPAI_CARDS = 75,	//斗地主底牌
	G2C_NOW_ACTION_ID = 76,	//当前出牌的玩家
	C2G_PSZ_QIPAI = 77,
	G2C_PSZ_QIPAI = 78,
	C2G_BUCHU_PAI = 79,	//玩家不出牌
	G2C_BUCHU_PAI = 80,	//玩家不出牌
	G2G_GM_CMD = 81,	//玩家不出牌
	G2C_UPDATE_PLAYER_CHIPS = 82,//筹码同步
	G2C_UPDATE_PLAYER_GOLD = 83,//金币同步
	C2G_GET_GOLD_PHB = 84,//排行榜同步
	G2C_GET_GOLD_PHB = 85,//排行榜同步
	C2G_ZHANJI_LIST = 86,//战绩
	G2C_ZHANJI_LIST = 87,
	G2C_SYS_CHAT_MSG = 89,//跑马灯
	//上传用户头像
	C2G_UPDATE_HEAD_IMAGES = 90,
	G2C_UPDATE_HEAD_IMAGES = 91,
	C2G_DIAMOND2GOLD = 92,
	G2C_UPDATE_PLAYER_DIAMOND = 93,//钻石同步
	C2G_QITIAN_QIANDAO = 94,//签到
	C2G_QITIAN_QIANDAO_INFO = 95,//签到
	G2C_QITIAN_QIANDAO_INFO = 96,//签到
	C2G_ASK_POCHAN = 97,//申请破产补助
	G2C_ASK_POCHAN = 98,
	C2G_ADD_BAOXIANXIANG = 99,//保险箱里放入或取出金币
	G2C_ADD_BAOXIANXIANG = 100,
	G2C_UPDATE_PLAYER_BAOXIANXIANG = 101,//保险箱金币同步
	C2G_HAS_POCHAN_COUNT = 112,	//取得还能破产的次数
	G2C_HAS_POCHAN_COUNT = 113,
	//拍卖行
	//创建一个订单
	C2G_CREATE_DINGDAN = 102,
	G2C_CREATE_DINGDAN = 103,

	//搜索一个订单
	C2G_SERACH_DINGDAN = 104,
	G2C_SERACH_DINGDAN = 105,

	//得到自己拥有的物品(门票等等)
	C2G_PLAYER_BAG = 106,
	G2C_PLAYER_BAG = 107,

	//购买一个订单
	C2G_BUY_DINGDAN = 108,
	G2C_BUY_DINGDAN = 109,

	//取得订单列表
	C2G_DINGDAN_LIST = 110,
	G2C_DINGDAN_LIST = 111,
	//钻石兑房卡
	C2G_DIAMOND2FANGKA = 123,
	//fangkaCount
	G2C_UPDATE_PLAYER_FANGKA = 124,
	/**
	 * 领取首冲礼包
	 */
	C2G_GET_SHOUCHONG = 125,
	/**
	 * 首冲礼包
	 */
	G2C_GET_SHOUCHONG = 126,
	/**
	 * 领取分享奖励
	 */
	C2G_GET_FENXIANG = 129,

	C2G_MJ_GAOJI_ACTION_JUMP = 137,		//跳过,(过)麻将高级操作(碰杠胡吃)
	G2C_MJ_GAOJI_ACTION = 138,		//麻将高级操作(碰杠胡吃)

	C2G_MJ_TANPAI = 139,		//麻将摊牌
	G2C_MJ_TANPAI = 140,		//麻将摊牌
	//playerId cards

	C2G_MJ_SHAOPAI = 141,		//麻将勺牌
	//shaocards(单张列表,如勺:4 5 6)
	G2C_MJ_SHAOPAI = 142,		//麻将勺牌
	//cards

	C2G_MJ_GANGPAI = 143,		//麻将杠牌
	//cardValue 单张
	G2C_MJ_GANGPAI = 144,		//麻将杠牌
	//

	C2G_MJ_CHIPAI = 145,		//麻将吃牌
	//cards(两张)
	G2C_MJ_CHIPAI = 146,		//麻将吃牌
	//playerId cards

	G2C_MJ_ADD_CHUPAI = 147,		//麻将插入到出牌的位置面上
	C2G_MJ_CHU_PAI = 148,		//麻将吃牌
	//cards(两张)
	G2C_MJ_CHU_PAI = 149,		//麻将吃牌
	C2G_MJ_HU_PAI = 150,		//麻将胡牌
	C2G_MJ_PENGPAI = 151,		//麻将碰牌
	G2C_MJ_PENGPAI = 152,		//麻将碰牌
	G2C_MJ_CLEAR_GAOJI_ACTION = 153,
	C2G_GUAJI_TYPE = 190,//取消挂机自动出牌
	G2C_GUAJI_TYPE = 191,//挂机自动出牌 guajiType:0没挂机,1挂机自动
	G2C_MJ_LAIZI = 192,//麻将懒子
	G2C_MJ_MAPAI = 193,//麻将maima
	G2C_HAS_NEW_FENXIANG = 194,//有新的分享抽成(主界面闪光)
	C2G_FENXIANG_LIBAO_LIST = 195,//取得分享进入玩家列表
	G2C_FENXIANG_LIBAO_LIST = 196,//取得分享进入玩家列表返回
	//List<Map<String, Object>> tuiguangyuanList
	C2G_ONE_FENXIANG_LIBAO = 197,//点击玩家头像,获得一个分享礼包
	//playerId
	G2C_ONE_FENXIANG_LIBAO = 198,//点击玩家头像,获得一个分享礼包返回
	//playerId getJiangliType rewardGold
	G2C_UPDATE_PLAYER_NIUKA = 199,
	// 消息列表
	G2C_ONE_MSG_TO_CLIENT = 200,
	//msgStr

	G2C_MSGLIST_TO_CLIENT = 201,
	C2G_HZ_BRNN_SHENQING_LIST = 206,
	G2C_HZ_BRNN_SHENQING_LIST = 207,
	G2C_HZ_BRNN_UPDATE_CHIPS_LIST = 208,
	//msgListStr

}
/**
 * 模块ID信息
 * 
 * @author gil
 */
const enum ModuleInfo {

	/**
	 * 管理后台
	 */
	MIS = 0,

	/**
	 * 玩家
	 */
	PLAYER = 1,
	/**
	 * 游戏模块
	 */
	PLAY_GAME = 3,
	//--------------------------------------扩展模块--------------------------------------------
	/** 
	 * 补丁模块
	 */
	PATCH = 1002,

	/**
	 * 充值模块
	 */
	CHARGEX = 1003,
}



/**
 * 结果码
 * @author gil
 */
const ResultCode = {

	/**
	 * 操作成功
	 */
	SUCCESS: 0,

	//--------------------------------------------公共错误码-------------------------------------------

	/**
	 * 操作失败
	 */
	FAILURE: -1,

	/**
	 * 没操作权限
	 */
	NO_RIGHT: -2,

	/**
	 * 参数错误
	 */
	PARAM_ERROR: -3,

	/**
	 * 基础数据不存在
	 */
	BASE_DATA_NOT_EXIST: -4,

	/**
	 * 基础数据有误
	 */
	BASE_DATA_ERROR: -5,

	/**
	 * 帐号不存在
	 */
	PLAYER_NOT_EXISTS: -6,

	/**
	 * 玩家已下线
	 */
	PLAYER_NOT_ONLINE: -7,

	/**
	 * 金币不足
	 */
	GOLD_NOT_ENOUGH: -8,

	/**
	 * 钻石不足
	 */
	DIAMOND_NOT_ENOUGH: -9,

	//--------------------------------------------玩家错误码-------------------------------------------

	/**
	 * 帐号不正确
	 */
	ACCOUNT_NOT_CORRECT: -101,

	/**
	 * 呢称不正确
	 */
	NICKNAME_NOT_CORRECT: -102,

	/**
	 * 帐号已存在
	 */
	NICKNAME_EXSISTS: -103,

	/**
	 * 帐号不存在
	 */
	NICKNAME_NOT_EXSISTS: -104,
}
/**
 * 错误码
 */
const ErrorMsg = {
    /**
      * "操作成功"
      */
	[ResultCode.SUCCESS]: "操作成功",

	//--------------------------------------------公共错误码-------------------------------------------

	/**
	 * 操作失败
	 */
	[ResultCode.FAILURE]: "操作失败",

	/**
	 * 没操作权限
	 */
	[ResultCode.NO_RIGHT]: "没操作权限",

	/**
	 * 参数错误
	 */
	[ResultCode.PARAM_ERROR]: "参数错误",

	/**
	 * 基础数据不存在
	 */
	[ResultCode.BASE_DATA_NOT_EXIST]: "基础数据不存在",

	/**
	 * 基础数据有误
	 */
	[ResultCode.BASE_DATA_ERROR]: "基础数据有误",

	/**
	 * 帐号不存在
	 */
	[ResultCode.PLAYER_NOT_EXISTS]: "帐号不存在",

	/**
	 * 玩家已下线
	 */
	[ResultCode.PLAYER_NOT_ONLINE]: "玩家已下线",

	/**
	 * 金币不足
	 */
	[ResultCode.GOLD_NOT_ENOUGH]: "金币不足",

	/**
	 * 钻石不足
	 */
	[ResultCode.DIAMOND_NOT_ENOUGH]: "钻石不足",

	//--------------------------------------------玩家错误码-------------------------------------------

	/**
	 * 帐号不正确
	 */
	[ResultCode.ACCOUNT_NOT_CORRECT]: "帐号不正确",

	/**
	 * 呢称不正确
	 */
	[ResultCode.NICKNAME_NOT_CORRECT]: "呢称不正确",

	/**
	 * 帐号已存在
	 */
	[ResultCode.NICKNAME_EXSISTS]: "帐号已存在",

	/**
	 * 帐号不存在
	 */
	[ResultCode.NICKNAME_NOT_EXSISTS]: "帐号不存在",
}


let OrderNameMap = {};
// PlayGameOrder
OrderNameMap[ModuleInfo.PLAYER] = {};
for (let key in PlayerOrder) {
	OrderNameMap[ModuleInfo.PLAYER][PlayerOrder[key]] = key;
}
OrderNameMap[ModuleInfo.PLAY_GAME] = {};
for (let key in PlayGameOrder) {
	OrderNameMap[ModuleInfo.PLAY_GAME][PlayGameOrder[key]] = key;
}