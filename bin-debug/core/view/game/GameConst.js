/**
 * 花色映射表,主要用来打印信息,方便调试 ♠黑桃 ♥红心 ♦黑桃 ♣梅花
 */
var SUIT_NAMES = ['-', '♦', '♣', '♥', '♠'];
var VALUE_NAMES = ['0', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'X', 'D'];
var MAP_NAMES = ['0', '13', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '15'];
var niuniu;
(function (niuniu) {
    // export namespace brnn {
    // 	//--牌型等级
    // 	export const enum HANDVALUE {
    // 		SANPAI = 1,//-- #散牌
    // 		NIUX = 2,// -- #牛1-牛9
    // 		NIUNIU = 3, //,-- #牛牛
    // 		YINNIU = 4,// -- #银牛--四花牛
    // 		SHUNZI = 5, //--顺子
    // 		TONGHUA = 6, //同花
    // 		HULU = 7,//葫芦
    // 		BOMB = 8,//炸弹
    // 		JINNIU = 9,//金牛 五花牛
    // 		WXN = 10,//五小牛
    // 		TONGHUASHUN = 11,//同花顺
    // 	}
    // }
    /**
     * 下注时间
     */
    niuniu.BET_COUNT_DOWN = 5;
    /**
     * 算牛时间
     */
    niuniu.CAL_COUNT_DOWN = 8;
    /**
     * 抢庄时间
     */
    niuniu.ROB_COUNT_DOWN = 4;
    /**
     * 准备超时时间
     */
    niuniu.READY_COUNT_DOWN = 10;
})(niuniu || (niuniu = {}));
var twoniuniu;
(function (twoniuniu) {
    // export namespace brnn {
    // 	//--牌型等级
    // 	export const enum HANDVALUE {
    // 		SANPAI = 1,//-- #散牌
    // 		NIUX = 2,// -- #牛1-牛9
    // 		NIUNIU = 3, //,-- #牛牛
    // 		YINNIU = 4,// -- #银牛--四花牛
    // 		SHUNZI = 5, //--顺子
    // 		TONGHUA = 6, //同花
    // 		HULU = 7,//葫芦
    // 		BOMB = 8,//炸弹
    // 		JINNIU = 9,//金牛 五花牛
    // 		WXN = 10,//五小牛
    // 		TONGHUASHUN = 11,//同花顺
    // 	}
    // }
    /**
     * 下注时间
     */
    twoniuniu.BET_COUNT_DOWN = 5;
    /**
     * 算牛时间
     */
    twoniuniu.CAL_COUNT_DOWN = 15;
    /**
     * 抢庄时间
     */
    twoniuniu.ROB_COUNT_DOWN = 5;
    /**
     * 准备超时时间
     */
    twoniuniu.READY_COUNT_DOWN = 10;
})(twoniuniu || (twoniuniu = {}));
var DDZ;
(function (DDZ) {
    DDZ.VALUE_MASK = 0x0f; //牌值掩码
    DDZ.TYPE_SHIFT = 12; // 类型向左移16位
    DDZ.LEN_SHIFT = 8; // 主类型长度为8
    DDZ.SUIT_SHIFT = 4;
    DDZ.SND_VALUE_NAMES = ['0', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a', '2', 'xg', 'dg'];
})(DDZ || (DDZ = {}));
var zjh;
(function (zjh) {
    /**
     * 可以比牌的轮数
     */
    zjh.COMP_CARD_CNT = 3;
})(zjh || (zjh = {}));
//# sourceMappingURL=GameConst.js.map