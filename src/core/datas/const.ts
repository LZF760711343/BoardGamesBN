/**
 * 全局的常量
 */
// const enum GAME_ID {
//     /**
//      * 登录已经进度条界面
//      */
//     LOGIN,
//     /**
//      * 选场场景
//      */
//     SELECT,
//     /**
//      * 牛牛游戏场景
//      */
//     NIUNIU_GAME,
// }
// let GAME_SCENE_MAP = {};
// GAME_SCENE_MAP[GAME_ID.NIUNIU_GAME] = GAME_ID.NIUNIU;
const TAG = "BoardGamesAs";
/**
 * 要从微信取回的头像大小,有0(640*640), 64,96, 132等大小
 */
const WEIXIN_HEAD_IMG_SIZE = 132;
/**
 * 如果取不到头像,要显示的默认头像
 */
const DEFAULT_HEAD_IMG = "defaultHead_png";
/**
 * 游戏id
*/
const enum GAME_ID {
    NONE = 0,
    NIUNIU = 1,//牛牛
    GDMJ = 2,//广东麻将
    DDZ = 3,//斗地主
    MS = 4,//木虱
    DZ = 5,//德州扑克

    STSJ = 7,//汕头升级
    /**
     * 百人牛牛
     */
    BRNN = 8,
    /**
     * 金币场,抢庄牛牛
     */
    QZNN = 9,
    ZJH = 10,//扎金花
    GOLD_ZJH = 11,//金币场扎金花
    GOLD_DDZ = 13,
    GAME_ID_TWOMAN_QZNN = 38,//二人牛牛
    GAME_ID_GDMJ_FK = 39,//广东麻将 房卡
    GAME_ID_GDMJ_GOLD = 40,//广东麻将 金币
    GAME_ID_HZ_BRNN = 41,
    /**
     * 登录已经进度条界面
     */
    LOGIN,
    /**
     * 选场场景
     */
    SELECT,

}
const enum GAME_LEVEL{
    /**
     * 金币初级场
     */
    PRIMARY = 0,
    /**
     * 金币中级场
     */
    INTERMEDIATE = 1,
    /**
     * 金币高级场
     */
    SENIOR = 2
}
// final int GAME_ID_JN        = 1;        //牛牛
// 	final int GAME_ID_GDMJ        = 2;        //
// 	final int GAME_ID_TDHMJ        = 21;        //直接用大一点的数字

// 	final int GAME_ID_DDZ        = 3;        //
// 	final int GAME_ID_MS        = 4;        //
// 	final int GAME_ID_DZ        = 5;        //

// 	final int GAME_ID_ZJH        = 6;        //
// 	final int GAME_ID_STSJ        = 7;        //
// 	final int GAME_ID_BRNN        = 8;        //百人牛牛

//性别
const enum SEX_TYPE {
    /**
     * 男性
     */
    MALE = 1,
    /**
     * 女性
     */
    FEMALE = 2
}
//声音
const enum Sound_Type {
    /**
     *  普通话
     */
    guoyu = 0,
    /**
     * 粤语
     */
    yueyu = 1
}

const RES_PRIORITY = {
    LAZYLOAD: -1,
    SCENE: 10
}

/****************create room */
/**
	 * 特殊限制掩码
	 */
const enum EXTRALIMIT_MASK {
    /**
     * ip限制掩码
     */
    IP = 0X01,
    /**
     * 地理位置掩码
     */
    GEOLOCATION = 0X02
}
/****************create room */
/**
 * 货币类型
 */
const enum CURRENCY_TYPE {
    RMB = 0,
    /**
     * 钻石
     */
    DIAMOND = 1,
    /**
     * 金币
     */
    COIN = 2,
    /**
     * 房卡
     */
    CARD = 3,
    /**
     * 牛卡
     */
    NIUKA = 4

};




const enum DAOJU_TYPE {
    MEN_PIAO = 0,
}

