var PlayerOrder;
(function (PlayerOrder) {
    /**
     * 心跳
     */
    PlayerOrder[PlayerOrder["HEART_BEAT"] = 0] = "HEART_BEAT";
    /**
     * 创建玩家
     * @param String account 帐号
     * @param String nickName 呢称
     * @return JSON {
     * 				"result" : ResultCode
     * 				"content" : PlayerDto 玩家Dto
     * 				}
     */
    PlayerOrder[PlayerOrder["CREATE_PLAYER"] = 1] = "CREATE_PLAYER";
    /**
 * 检查账号是否存在
 * @param String account 账号
 * @server return JSON{
 * 						"result":ResultCode
 * 						"content": Boolean True-已存在角色名, false-不存在角色名
 * 					  }
 */
    PlayerOrder[PlayerOrder["CHECK_ACCOUNT"] = 3] = "CHECK_ACCOUNT";
    /**
     * 登陆
     * @param String account 呢称
     * @return JSON {
     * 				"result" : ResultCode
     * 				"content" : PlayerDto 玩家Dto
     * 				}
     */
    PlayerOrder[PlayerOrder["LOGIN"] = 2] = "LOGIN";
    PlayerOrder[PlayerOrder["ALL2C_STR_ERROR"] = 5] = "ALL2C_STR_ERROR";
    // PlayerCmd.ALL2C_STR_ERROR, Module.PLAYER
    PlayerOrder[PlayerOrder["G2C_NORMAL_TIPS"] = 6] = "G2C_NORMAL_TIPS";
    //tipsStr	提示消息
    PlayerOrder[PlayerOrder["G2C_CHONGZHI_TIPS"] = 7] = "G2C_CHONGZHI_TIPS";
    //玩家掉线
    PlayerOrder[PlayerOrder["PLAYER_ME_OFF_LINE"] = 8] = "PLAYER_ME_OFF_LINE";
    //玩家上线
    PlayerOrder[PlayerOrder["PLAYER_ON_LINE"] = 9] = "PLAYER_ON_LINE";
    //玩家离线
    PlayerOrder[PlayerOrder["PLAYER_OFF_LINE"] = 10] = "PLAYER_OFF_LINE";
    PlayerOrder[PlayerOrder["G2C_GET_CHONGZHI"] = 20] = "G2C_GET_CHONGZHI";
    //修改用户信息
    PlayerOrder[PlayerOrder["C2G_CHANGE_PLAYER_ATTR"] = 23] = "C2G_CHANGE_PLAYER_ATTR";
    //--------------------------------------推送--------------------------------------------
    /**
     * 推送当前连接即将关闭(收到此推送客户端不再重连)
     * @return JSON {
     * 				"content" : Integer 断线类型  0-链接关闭(客户端对此不做反应不再重连) 1-在其他地方登陆  2-被管理后台踢下线  3-IP被封  4-账号被封  5-服务器关闭 6-请求频繁
     * 				}
     * @return
     */
    PlayerOrder[PlayerOrder["PUSH_OFF_LINE"] = 101] = "PUSH_OFF_LINE";
})(PlayerOrder || (PlayerOrder = {}));
var OFF_LINE_TIP = [
    "链接关闭(客户端对此不做反应不再重连)",
    "您的账号在其他地方登陆!",
    "被管理后台踢下线",
    "IP被封",
    "账号被封",
    "服务器关闭",
    "请求频繁",
    "服务器启动中"
];
var PlayGameOrder;
(function (PlayGameOrder) {
    PlayGameOrder[PlayGameOrder["C2G_ENTER_SCORE_ROOM"] = 3] = "C2G_ENTER_SCORE_ROOM";
    /**
     * 创建房卡房间
     * @param JSON{
     *
     * }
     */
    PlayGameOrder[PlayGameOrder["C2G_OPEN_SCORE_ROOM"] = 4] = "C2G_OPEN_SCORE_ROOM";
    /**
     * 服务器通知客户端进入房卡房间的协议
     */
    PlayGameOrder[PlayGameOrder["G2C_ENTER_SCORE_ROOM"] = 5] = "G2C_ENTER_SCORE_ROOM";
    /**
     * 玩家信息
     */
    PlayGameOrder[PlayGameOrder["G2C_PLAYER_INFO"] = 6] = "G2C_PLAYER_INFO";
    PlayGameOrder[PlayGameOrder["C2G_USER_INFO"] = 7] = "C2G_USER_INFO";
    PlayGameOrder[PlayGameOrder["G2C_USER_INFO"] = 8] = "G2C_USER_INFO";
    PlayGameOrder[PlayGameOrder["C2G_READY_GAME"] = 9] = "C2G_READY_GAME";
    PlayGameOrder[PlayGameOrder["G2C_READY_GAME"] = 10] = "G2C_READY_GAME";
    PlayGameOrder[PlayGameOrder["G2G_CHIPS_UPDATE"] = 11] = "G2G_CHIPS_UPDATE";
    PlayGameOrder[PlayGameOrder["G2C_NN_STARTGAME"] = 12] = "G2C_NN_STARTGAME";
    PlayGameOrder[PlayGameOrder["G2C_SEND_CARDS"] = 13] = "G2C_SEND_CARDS";
    PlayGameOrder[PlayGameOrder["C2G_NN_CALL"] = 14] = "C2G_NN_CALL";
    //flag, uint16, 2, 1-4:表示要抢庄, 0表示不抢庄
    //C2G_NN_CALL             0x2802       2              flag, uint16, 2, 1-4:表示要抢庄, 0表示不抢庄
    PlayGameOrder[PlayGameOrder["G2C_NN_CALL"] = 15] = "G2C_NN_CALL";
    //G2C_NN_CALL             0x3802       6              playerId: uint32, 4, 玩家ID
    //                                                    flag:uint16, 2， 6， 该玩家是否抢庄以及分值
    PlayGameOrder[PlayGameOrder["G2C_NN_DEALER"] = 16] = "G2C_NN_DEALER";
    /*
        G2C_NN_DEALER           0x3803       18-78
        dealer, uint32 4, 庄家ID - 抢庄结果
        dealer_scpre uint16 6 抢庄结果倍率
        
        playerIds:
        [
            playerid: 玩家ID
        ]
    */
    PlayGameOrder[PlayGameOrder["C2G_NN_BET"] = 17] = "C2G_NN_BET";
    //C2G_NN_BET              0x2804       4              in_chips, uint32, 4, 下注金额
    PlayGameOrder[PlayGameOrder["G2C_NN_BET"] = 18] = "G2C_NN_BET";
    /*
    G2C_NN_BET              0x3804       16
    playerId: uint32 4, 玩家ID
    in_chips: uint32, 8, 下注额
    own_chips: int64, 16， 还拥有代入金额
    */
    PlayGameOrder[PlayGameOrder["G2C_NN_LOOK"] = 19] = "G2C_NN_LOOK";
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
    PlayGameOrder[PlayGameOrder["C2G_NN_SHOW"] = 20] = "C2G_NN_SHOW";
    /*
    C2G_NN_SHOW             0x2806       2-10
    handtype, uint16, 2, 牌型
    -- 牛牛 - 以下内容可能有 --
    cards, uint8[3],  3张牌
    */
    PlayGameOrder[PlayGameOrder["G2C_NN_SHOW"] = 21] = "G2C_NN_SHOW";
    /*
    G2C_NN_SHOW             0x3806       13-16
    playerId: uint32, 4, 摊牌玩家
    handvalue, uint32, 8, 牌值
    handrate,  uint16, 10, 倍率 - 表示几倍
    CardLen:  uint8
    cards, uint8[CardLen],  X 张牌
     */
    PlayGameOrder[PlayGameOrder["G2C_NN_RESULT"] = 22] = "G2C_NN_RESULT";
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
    PlayGameOrder[PlayGameOrder["G2C_NN_GAMEOVER"] = 23] = "G2C_NN_GAMEOVER";
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
    PlayGameOrder[PlayGameOrder["C2G_NN_BU"] = 24] = "C2G_NN_BU";
    //C2G_NN_BU               0x2809       2              
    //value: uint16  0x10: 不补牌   0x20： 补牌
    PlayGameOrder[PlayGameOrder["G2C_NN_BU"] = 25] = "G2C_NN_BU";
    /*
    G2C_NN_BU               0x3809       6-17
    playerId: uint32, 4, 补牌玩家
    value: uint16     6, 0x10: 不补牌   0x20： 补牌
    ---- 以下牌可能没有 ----
    BuCard: uint8 #补的牌  -- 可能没有哦
    */
    PlayGameOrder[PlayGameOrder["G2C_NN_SHOW_DONE"] = 26] = "G2C_NN_SHOW_DONE";
    //G2C_NN_SHOW_DONE         0x380B        4            
    //playerId: uint32, 4 玩家ID - 表示该玩家show牌了
    PlayGameOrder[PlayGameOrder["G2C_NN_TURN_ACTION"] = 27] = "G2C_NN_TURN_ACTION";
    PlayGameOrder[PlayGameOrder["C2G_LEAVE_SCORE_ROOM"] = 28] = "C2G_LEAVE_SCORE_ROOM";
    PlayGameOrder[PlayGameOrder["G2C_LEAVE_SCORE_ROOM"] = 29] = "G2C_LEAVE_SCORE_ROOM";
    PlayGameOrder[PlayGameOrder["G2C_SCORE_ROOM_HIS"] = 30] = "G2C_SCORE_ROOM_HIS";
    PlayGameOrder[PlayGameOrder["G2C_NN_GAMEPROCESS"] = 31] = "G2C_NN_GAMEPROCESS";
    PlayGameOrder[PlayGameOrder["G2C_LEAVE_ROOM"] = 32] = "G2C_LEAVE_ROOM";
    /**
     * 更新玩家的筹码
     */
    PlayGameOrder[PlayGameOrder["G2C_CHIPS_UPDATE"] = 33] = "G2C_CHIPS_UPDATE";
    PlayGameOrder[PlayGameOrder["C2G_DEL_SCORE_ROOM"] = 34] = "C2G_DEL_SCORE_ROOM";
    PlayGameOrder[PlayGameOrder["G2C_DEL_SCORE_ROOM"] = 35] = "G2C_DEL_SCORE_ROOM";
    PlayGameOrder[PlayGameOrder["G2C_DEL_SCORE_ROOM_RES"] = 36] = "G2C_DEL_SCORE_ROOM_RES";
    PlayGameOrder[PlayGameOrder["C2G_BRNN_ROOMINFO"] = 37] = "C2G_BRNN_ROOMINFO";
    PlayGameOrder[PlayGameOrder["G2C_BRNN_ROOMINFO"] = 38] = "G2C_BRNN_ROOMINFO";
    /*
    zuoWeiId
    cards: uint8[CardLen] 五张牌
    handValue	牌型
    rewardRate	计算结果用的倍率
     */
    PlayGameOrder[PlayGameOrder["G2C_BRNN_FANG_PAI"] = 39] = "G2C_BRNN_FANG_PAI";
    /*
    zuoWeiId
    in_chips: 投的注
    win_chips	赢的注
     */
    PlayGameOrder[PlayGameOrder["G2C_ONE_HAND_RESULT"] = 40] = "G2C_ONE_HAND_RESULT";
    /*
    roundWinChips: 本回合赢的注
    chouShui	抽水
     */
    PlayGameOrder[PlayGameOrder["G2C_CALC_SUM_RESULT"] = 41] = "G2C_CALC_SUM_RESULT";
    PlayGameOrder[PlayGameOrder["G2C_BRNN_GAMEOVER"] = 42] = "G2C_BRNN_GAMEOVER";
    PlayGameOrder[PlayGameOrder["C2G_ENTER_ROOM"] = 43] = "C2G_ENTER_ROOM";
    /*
    roomId: 房间ID
    roomType: 房间类型
     */
    PlayGameOrder[PlayGameOrder["G2C_ENTER_BRNN_ROOM"] = 44] = "G2C_ENTER_BRNN_ROOM";
    PlayGameOrder[PlayGameOrder["C2G_SITDOWN"] = 45] = "C2G_SITDOWN";
    PlayGameOrder[PlayGameOrder["G2C_SITDOWN"] = 46] = "G2C_SITDOWN";
    /*
    stage
    sumInChipsList[
    zuoweiIndex
    inChips]
    */
    PlayGameOrder[PlayGameOrder["G2C_BRNN_STARTGAME"] = 47] = "G2C_BRNN_STARTGAME";
    /*
    stage
    sumInChipsList[
    zuoweiIndex
    inChips]
    selfInChipsList[
    zuoweiIndex
    inChips]
    */
    PlayGameOrder[PlayGameOrder["G2C_BRNN_GAMEPROCESS"] = 48] = "G2C_BRNN_GAMEPROCESS";
    PlayGameOrder[PlayGameOrder["C2G_ASK_XIAZHUANG"] = 49] = "C2G_ASK_XIAZHUANG";
    // C2G_ASK_XIAZHUANG = 50,		//申请下庄
    PlayGameOrder[PlayGameOrder["C2G_ASK_SHANGZHUANG"] = 51] = "C2G_ASK_SHANGZHUANG";
    PlayGameOrder[PlayGameOrder["G2C_ZHUANG_JIA_LIST"] = 52] = "G2C_ZHUANG_JIA_LIST";
    /**
     * 游戏状态改变
     */
    PlayGameOrder[PlayGameOrder["G2C_CHANGE_STATE"] = 55] = "G2C_CHANGE_STATE";
    PlayGameOrder[PlayGameOrder["G2C_BRNN_BET"] = 56] = "G2C_BRNN_BET";
    PlayGameOrder[PlayGameOrder["G2C_UPDATE_ZHANJI_LIST"] = 57] = "G2C_UPDATE_ZHANJI_LIST";
    PlayGameOrder[PlayGameOrder["C2G_CHANGE_ROOM"] = 58] = "C2G_CHANGE_ROOM";
    PlayGameOrder[PlayGameOrder["G2C_ENTER_ROOM"] = 59] = "G2C_ENTER_ROOM";
    PlayGameOrder[PlayGameOrder["G2C_STARTGAME"] = 61] = "G2C_STARTGAME";
    PlayGameOrder[PlayGameOrder["C2G_PSZ_KANPAI"] = 62] = "C2G_PSZ_KANPAI";
    PlayGameOrder[PlayGameOrder["G2C_PSZ_KANPAI"] = 63] = "G2C_PSZ_KANPAI";
    PlayGameOrder[PlayGameOrder["G2C_ROUND_COUNT"] = 64] = "G2C_ROUND_COUNT";
    PlayGameOrder[PlayGameOrder["C2G_PSZ_BIPAI"] = 65] = "C2G_PSZ_BIPAI";
    PlayGameOrder[PlayGameOrder["G2C_PSZ_BIPAI"] = 66] = "G2C_PSZ_BIPAI";
    PlayGameOrder[PlayGameOrder["G2C_GAMEPROCESS"] = 67] = "G2C_GAMEPROCESS";
    PlayGameOrder[PlayGameOrder["G2C_GAMEOVER"] = 68] = "G2C_GAMEOVER";
    PlayGameOrder[PlayGameOrder["C2G_GET_IN_ROOM_PLAYERS"] = 69] = "C2G_GET_IN_ROOM_PLAYERS";
    PlayGameOrder[PlayGameOrder["G2C_GET_IN_ROOM_PLAYERS"] = 70] = "G2C_GET_IN_ROOM_PLAYERS";
    PlayGameOrder[PlayGameOrder["C2G_ROOM_CHAT"] = 71] = "C2G_ROOM_CHAT";
    PlayGameOrder[PlayGameOrder["G2C_ROOM_CHAT"] = 72] = "G2C_ROOM_CHAT";
    PlayGameOrder[PlayGameOrder["C2G_CHU_PAI"] = 73] = "C2G_CHU_PAI";
    PlayGameOrder[PlayGameOrder["G2C_CHU_PAI"] = 74] = "G2C_CHU_PAI";
    PlayGameOrder[PlayGameOrder["G2C_DIPAI_CARDS"] = 75] = "G2C_DIPAI_CARDS";
    PlayGameOrder[PlayGameOrder["G2C_NOW_ACTION_ID"] = 76] = "G2C_NOW_ACTION_ID";
    PlayGameOrder[PlayGameOrder["C2G_PSZ_QIPAI"] = 77] = "C2G_PSZ_QIPAI";
    PlayGameOrder[PlayGameOrder["G2C_PSZ_QIPAI"] = 78] = "G2C_PSZ_QIPAI";
    PlayGameOrder[PlayGameOrder["C2G_BUCHU_PAI"] = 79] = "C2G_BUCHU_PAI";
    PlayGameOrder[PlayGameOrder["G2C_BUCHU_PAI"] = 80] = "G2C_BUCHU_PAI";
    PlayGameOrder[PlayGameOrder["G2G_GM_CMD"] = 81] = "G2G_GM_CMD";
    PlayGameOrder[PlayGameOrder["G2C_UPDATE_PLAYER_CHIPS"] = 82] = "G2C_UPDATE_PLAYER_CHIPS";
    PlayGameOrder[PlayGameOrder["G2C_UPDATE_PLAYER_GOLD"] = 83] = "G2C_UPDATE_PLAYER_GOLD";
    PlayGameOrder[PlayGameOrder["C2G_GET_GOLD_PHB"] = 84] = "C2G_GET_GOLD_PHB";
    PlayGameOrder[PlayGameOrder["G2C_GET_GOLD_PHB"] = 85] = "G2C_GET_GOLD_PHB";
    PlayGameOrder[PlayGameOrder["C2G_ZHANJI_LIST"] = 86] = "C2G_ZHANJI_LIST";
    PlayGameOrder[PlayGameOrder["G2C_ZHANJI_LIST"] = 87] = "G2C_ZHANJI_LIST";
    PlayGameOrder[PlayGameOrder["G2C_SYS_CHAT_MSG"] = 89] = "G2C_SYS_CHAT_MSG";
    //上传用户头像
    PlayGameOrder[PlayGameOrder["C2G_UPDATE_HEAD_IMAGES"] = 90] = "C2G_UPDATE_HEAD_IMAGES";
    PlayGameOrder[PlayGameOrder["G2C_UPDATE_HEAD_IMAGES"] = 91] = "G2C_UPDATE_HEAD_IMAGES";
    PlayGameOrder[PlayGameOrder["C2G_DIAMOND2GOLD"] = 92] = "C2G_DIAMOND2GOLD";
    PlayGameOrder[PlayGameOrder["G2C_UPDATE_PLAYER_DIAMOND"] = 93] = "G2C_UPDATE_PLAYER_DIAMOND";
    PlayGameOrder[PlayGameOrder["C2G_QITIAN_QIANDAO"] = 94] = "C2G_QITIAN_QIANDAO";
    PlayGameOrder[PlayGameOrder["C2G_QITIAN_QIANDAO_INFO"] = 95] = "C2G_QITIAN_QIANDAO_INFO";
    PlayGameOrder[PlayGameOrder["G2C_QITIAN_QIANDAO_INFO"] = 96] = "G2C_QITIAN_QIANDAO_INFO";
    PlayGameOrder[PlayGameOrder["C2G_ASK_POCHAN"] = 97] = "C2G_ASK_POCHAN";
    PlayGameOrder[PlayGameOrder["G2C_ASK_POCHAN"] = 98] = "G2C_ASK_POCHAN";
    PlayGameOrder[PlayGameOrder["C2G_ADD_BAOXIANXIANG"] = 99] = "C2G_ADD_BAOXIANXIANG";
    PlayGameOrder[PlayGameOrder["G2C_ADD_BAOXIANXIANG"] = 100] = "G2C_ADD_BAOXIANXIANG";
    PlayGameOrder[PlayGameOrder["G2C_UPDATE_PLAYER_BAOXIANXIANG"] = 101] = "G2C_UPDATE_PLAYER_BAOXIANXIANG";
    PlayGameOrder[PlayGameOrder["C2G_HAS_POCHAN_COUNT"] = 112] = "C2G_HAS_POCHAN_COUNT";
    PlayGameOrder[PlayGameOrder["G2C_HAS_POCHAN_COUNT"] = 113] = "G2C_HAS_POCHAN_COUNT";
    //拍卖行
    //创建一个订单
    PlayGameOrder[PlayGameOrder["C2G_CREATE_DINGDAN"] = 102] = "C2G_CREATE_DINGDAN";
    PlayGameOrder[PlayGameOrder["G2C_CREATE_DINGDAN"] = 103] = "G2C_CREATE_DINGDAN";
    //搜索一个订单
    PlayGameOrder[PlayGameOrder["C2G_SERACH_DINGDAN"] = 104] = "C2G_SERACH_DINGDAN";
    PlayGameOrder[PlayGameOrder["G2C_SERACH_DINGDAN"] = 105] = "G2C_SERACH_DINGDAN";
    //得到自己拥有的物品(门票等等)
    PlayGameOrder[PlayGameOrder["C2G_PLAYER_BAG"] = 106] = "C2G_PLAYER_BAG";
    PlayGameOrder[PlayGameOrder["G2C_PLAYER_BAG"] = 107] = "G2C_PLAYER_BAG";
    //购买一个订单
    PlayGameOrder[PlayGameOrder["C2G_BUY_DINGDAN"] = 108] = "C2G_BUY_DINGDAN";
    PlayGameOrder[PlayGameOrder["G2C_BUY_DINGDAN"] = 109] = "G2C_BUY_DINGDAN";
    //取得订单列表
    PlayGameOrder[PlayGameOrder["C2G_DINGDAN_LIST"] = 110] = "C2G_DINGDAN_LIST";
    PlayGameOrder[PlayGameOrder["G2C_DINGDAN_LIST"] = 111] = "G2C_DINGDAN_LIST";
    //钻石兑房卡
    PlayGameOrder[PlayGameOrder["C2G_DIAMOND2FANGKA"] = 123] = "C2G_DIAMOND2FANGKA";
    //fangkaCount
    PlayGameOrder[PlayGameOrder["G2C_UPDATE_PLAYER_FANGKA"] = 124] = "G2C_UPDATE_PLAYER_FANGKA";
    /**
     * 领取首冲礼包
     */
    PlayGameOrder[PlayGameOrder["C2G_GET_SHOUCHONG"] = 125] = "C2G_GET_SHOUCHONG";
    /**
     * 首冲礼包
     */
    PlayGameOrder[PlayGameOrder["G2C_GET_SHOUCHONG"] = 126] = "G2C_GET_SHOUCHONG";
    /**
     * 领取分享奖励
     */
    PlayGameOrder[PlayGameOrder["C2G_GET_FENXIANG"] = 129] = "C2G_GET_FENXIANG";
    PlayGameOrder[PlayGameOrder["C2G_MJ_GAOJI_ACTION_JUMP"] = 137] = "C2G_MJ_GAOJI_ACTION_JUMP";
    PlayGameOrder[PlayGameOrder["G2C_MJ_GAOJI_ACTION"] = 138] = "G2C_MJ_GAOJI_ACTION";
    PlayGameOrder[PlayGameOrder["C2G_MJ_TANPAI"] = 139] = "C2G_MJ_TANPAI";
    PlayGameOrder[PlayGameOrder["G2C_MJ_TANPAI"] = 140] = "G2C_MJ_TANPAI";
    //playerId cards
    PlayGameOrder[PlayGameOrder["C2G_MJ_SHAOPAI"] = 141] = "C2G_MJ_SHAOPAI";
    //shaocards(单张列表,如勺:4 5 6)
    PlayGameOrder[PlayGameOrder["G2C_MJ_SHAOPAI"] = 142] = "G2C_MJ_SHAOPAI";
    //cards
    PlayGameOrder[PlayGameOrder["C2G_MJ_GANGPAI"] = 143] = "C2G_MJ_GANGPAI";
    //cardValue 单张
    PlayGameOrder[PlayGameOrder["G2C_MJ_GANGPAI"] = 144] = "G2C_MJ_GANGPAI";
    //
    PlayGameOrder[PlayGameOrder["C2G_MJ_CHIPAI"] = 145] = "C2G_MJ_CHIPAI";
    //cards(两张)
    PlayGameOrder[PlayGameOrder["G2C_MJ_CHIPAI"] = 146] = "G2C_MJ_CHIPAI";
    //playerId cards
    PlayGameOrder[PlayGameOrder["G2C_MJ_ADD_CHUPAI"] = 147] = "G2C_MJ_ADD_CHUPAI";
    PlayGameOrder[PlayGameOrder["C2G_MJ_CHU_PAI"] = 148] = "C2G_MJ_CHU_PAI";
    //cards(两张)
    PlayGameOrder[PlayGameOrder["G2C_MJ_CHU_PAI"] = 149] = "G2C_MJ_CHU_PAI";
    PlayGameOrder[PlayGameOrder["C2G_MJ_HU_PAI"] = 150] = "C2G_MJ_HU_PAI";
    PlayGameOrder[PlayGameOrder["C2G_MJ_PENGPAI"] = 151] = "C2G_MJ_PENGPAI";
    PlayGameOrder[PlayGameOrder["G2C_MJ_PENGPAI"] = 152] = "G2C_MJ_PENGPAI";
    PlayGameOrder[PlayGameOrder["G2C_MJ_CLEAR_GAOJI_ACTION"] = 153] = "G2C_MJ_CLEAR_GAOJI_ACTION";
    PlayGameOrder[PlayGameOrder["C2G_GUAJI_TYPE"] = 190] = "C2G_GUAJI_TYPE";
    PlayGameOrder[PlayGameOrder["G2C_GUAJI_TYPE"] = 191] = "G2C_GUAJI_TYPE";
    PlayGameOrder[PlayGameOrder["G2C_MJ_LAIZI"] = 192] = "G2C_MJ_LAIZI";
    PlayGameOrder[PlayGameOrder["G2C_MJ_MAPAI"] = 193] = "G2C_MJ_MAPAI";
    PlayGameOrder[PlayGameOrder["G2C_HAS_NEW_FENXIANG"] = 194] = "G2C_HAS_NEW_FENXIANG";
    PlayGameOrder[PlayGameOrder["C2G_FENXIANG_LIBAO_LIST"] = 195] = "C2G_FENXIANG_LIBAO_LIST";
    PlayGameOrder[PlayGameOrder["G2C_FENXIANG_LIBAO_LIST"] = 196] = "G2C_FENXIANG_LIBAO_LIST";
    //List<Map<String, Object>> tuiguangyuanList
    PlayGameOrder[PlayGameOrder["C2G_ONE_FENXIANG_LIBAO"] = 197] = "C2G_ONE_FENXIANG_LIBAO";
    //playerId
    PlayGameOrder[PlayGameOrder["G2C_ONE_FENXIANG_LIBAO"] = 198] = "G2C_ONE_FENXIANG_LIBAO";
    //playerId getJiangliType rewardGold
    PlayGameOrder[PlayGameOrder["G2C_UPDATE_PLAYER_NIUKA"] = 199] = "G2C_UPDATE_PLAYER_NIUKA";
    // 消息列表
    PlayGameOrder[PlayGameOrder["G2C_ONE_MSG_TO_CLIENT"] = 200] = "G2C_ONE_MSG_TO_CLIENT";
    //msgStr
    PlayGameOrder[PlayGameOrder["G2C_MSGLIST_TO_CLIENT"] = 201] = "G2C_MSGLIST_TO_CLIENT";
    PlayGameOrder[PlayGameOrder["C2G_HZ_BRNN_SHENQING_LIST"] = 206] = "C2G_HZ_BRNN_SHENQING_LIST";
    PlayGameOrder[PlayGameOrder["G2C_HZ_BRNN_SHENQING_LIST"] = 207] = "G2C_HZ_BRNN_SHENQING_LIST";
    PlayGameOrder[PlayGameOrder["G2C_HZ_BRNN_UPDATE_CHIPS_LIST"] = 208] = "G2C_HZ_BRNN_UPDATE_CHIPS_LIST";
    //msgListStr
})(PlayGameOrder || (PlayGameOrder = {}));
/**
 * 结果码
 * @author gil
 */
var ResultCode = {
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
};
/**
 * 错误码
 */
var ErrorMsg = (_a = {},
    /**
      * "操作成功"
      */
    _a[ResultCode.SUCCESS] = "操作成功",
    //--------------------------------------------公共错误码-------------------------------------------
    /**
     * 操作失败
     */
    _a[ResultCode.FAILURE] = "操作失败",
    /**
     * 没操作权限
     */
    _a[ResultCode.NO_RIGHT] = "没操作权限",
    /**
     * 参数错误
     */
    _a[ResultCode.PARAM_ERROR] = "参数错误",
    /**
     * 基础数据不存在
     */
    _a[ResultCode.BASE_DATA_NOT_EXIST] = "基础数据不存在",
    /**
     * 基础数据有误
     */
    _a[ResultCode.BASE_DATA_ERROR] = "基础数据有误",
    /**
     * 帐号不存在
     */
    _a[ResultCode.PLAYER_NOT_EXISTS] = "帐号不存在",
    /**
     * 玩家已下线
     */
    _a[ResultCode.PLAYER_NOT_ONLINE] = "玩家已下线",
    /**
     * 金币不足
     */
    _a[ResultCode.GOLD_NOT_ENOUGH] = "金币不足",
    /**
     * 钻石不足
     */
    _a[ResultCode.DIAMOND_NOT_ENOUGH] = "钻石不足",
    //--------------------------------------------玩家错误码-------------------------------------------
    /**
     * 帐号不正确
     */
    _a[ResultCode.ACCOUNT_NOT_CORRECT] = "帐号不正确",
    /**
     * 呢称不正确
     */
    _a[ResultCode.NICKNAME_NOT_CORRECT] = "呢称不正确",
    /**
     * 帐号已存在
     */
    _a[ResultCode.NICKNAME_EXSISTS] = "帐号已存在",
    /**
     * 帐号不存在
     */
    _a[ResultCode.NICKNAME_NOT_EXSISTS] = "帐号不存在",
    _a);
var OrderNameMap = {};
// PlayGameOrder
OrderNameMap[1 /* PLAYER */] = {};
for (var key in PlayerOrder) {
    OrderNameMap[1 /* PLAYER */][PlayerOrder[key]] = key;
}
OrderNameMap[3 /* PLAY_GAME */] = {};
for (var key in PlayGameOrder) {
    OrderNameMap[3 /* PLAY_GAME */][PlayGameOrder[key]] = key;
}
var _a;
//# sourceMappingURL=Protocols.js.map