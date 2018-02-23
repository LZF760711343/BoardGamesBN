/**
 * 当前游戏阶段
 */
const enum GAME_STATUS {
    /**
     * 还未开始游戏
     */
	NOTSTART,
    /**
     * 游戏中
     */
	PLAYING,
}
/**
 * 游戏里面玩家UI当前状态
 */
const enum PLAYER_UI_STATU {
	NONE,
	/**
	 * 显示等待倒计时的状态
	 */
	WAIT_READY,
	/**
	 * 已经准备好了的状态
	 */
	READY,
	/**
	 * 游戏开始后,等待别人操作的状态
	 */
	IDLE,
	WAIT,
	/**
	 * 等待出牌的状态
	 */
	WAIT_CHU
}
/**
 * 用户状态
 */
const enum PLAYER_STATU {
	NONE = 0X00,
	DEALER = 0x02,
	READY = 0x4,
	// 
	// OFFLINE = 0x4
}
/**
 * -- 用户状态
 */
// const enum PLAYER_TYPE {
// 	NORMAL = 0X00,//--# 正常玩家
// 	NEW = 0x01,//--# 新玩家
// 	DEALER = 0x2,// --# 庄家
// 	OFFLINE = 0x04//--# 断线玩家
// }
const enum GAME_TYPE {
	COIN,
	CARD,
	

}

/**
 * 花色映射表,主要用来打印信息,方便调试 ♠黑桃 ♥红心 ♦黑桃 ♣梅花
 */
const SUIT_NAMES = ['-', '♦', '♣', '♥', '♠'];
const enum SUIT_VALUE {
	/**
     * 无花
     */
	NONE = 0x00,  // 
    /**
     * 方块 ♦
     */
	DIAMONDS = 0x01,  // 
    /**
     * 梅花 ♣
     */
	CLUBS = 0x02,  // 
    /**
     * 红桃 ♥
     */
	HEARTS = 0x03,  // 
    /**
     * 黑桃 ♠
     */
	SPADES = 0x04,  // 
    /**
     * 升级游戏里面的主牌,叫主模式里面表示无主
     */
	MAIN = 0x05,
}
const enum CARD_VALUE {
	NONE = 0x0,
	VALUE_A = 0x1,
	VALUE_2 = 0x2,
	VALUE_3 = 0x3,
	VALUE_4 = 0x4,
	VALUE_5 = 0x5,
	VALUE_6 = 0x6,
	VALUE_7 = 0x7,
	VALUE_8 = 0x8,
	VALUE_9 = 0x9,
	VALUE_10 = 0xA,
	VALUE_J = 0xB,
	VALUE_Q = 0xC,
	VALUE_K = 0xD,
	VALUE_XG = 0xE,
	VALUE_DG = 0xF
}

const VALUE_NAMES = ['0', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'X', 'D'];
const MAP_NAMES = ['0', '13', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '15'];
const enum GAME_STAGE {
	/**
	 * 开始前
	 */
	PRE_START = 1,	//
	/**
	 * 开始阶段
	 */
	START = 2,		//
	/**\
	 * 抢庄
	 */
	QIANG_ZHUANG = 3,	//
	/**
	 * 投注
	 */
	TOU_ZHU = 4,	//
	/**
	 *算牛阶段
	 */
	SHOW_ME = 5,	//
	/**
	 * 显示所有人的手牌
	 */
	SHOW_ALL = 6,	//
}
namespace niuniu {

	export const enum GAME_MODE {
        /**
         * 无庄模式,混战模式
         */
		NONE = 0,
        /**
         * 看牌抢庄
         */
		KP = 1,
        /**
         * //房主庄家
         */
		FZ = 2,
        /**
         * 轮庄
         */
		LZ = 3,
	}
	export const enum GAME_SUB_MODE {
        /**
         * 顺序轮庄
         */
		SXLZ = 0,
        /**
         * 牛九换庄
         */
		NJHZ = 1,
        /**
         * 牛牛换庄
         */
		NNHZ = 2
	}
	//--牌型等级
	export const enum HANDVALUE {
		NONE = 0,
		SANPAI = 1,//-- #散牌
		NIUX = 2,// -- #牛1-牛9
		NIUNIU = 3, //,-- #牛牛
		YINNIU = 4,// -- #银牛--四花牛
		SHUNZI = 5, //--顺子
		TONGHUA = 6, //同花
		HULU = 7,//葫芦
		BOMB = 8,//四梅
		JINNIU = 9,//金牛
		WXN = 10,//五小牛
		TONGHUASHUN = 11,//同花顺
	}


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
	export const BET_COUNT_DOWN = 5;
    /**
     * 算牛时间
     */
	export const CAL_COUNT_DOWN = 8;
    /**
     * 抢庄时间
     */
	export const ROB_COUNT_DOWN = 4;
    /**
     * 准备超时时间
     */
	export const READY_COUNT_DOWN = 10;

}
namespace twoniuniu {

	export const enum GAME_MODE {
        /**
         * 无庄模式,混战模式
         */
		NONE = 0,
        /**
         * 看牌抢庄
         */
		KP = 1,
        /**
         * //房主庄家
         */
		FZ = 2,
        /**
         * 轮庄
         */
		LZ = 3,
	}
	export const enum GAME_SUB_MODE {
        /**
         * 顺序轮庄
         */
		SXLZ = 0,
        /**
         * 牛九换庄
         */
		NJHZ = 1,
        /**
         * 牛牛换庄
         */
		NNHZ = 2
	}
	export const enum GAME_SUB_SECTION {
        /**
         * 二人牛牛默认进房
         */
		DEFA = 0,
        
	}
	//--牌型等级
	export const enum HANDVALUE {
		SANPAI = 1,//-- #散牌
		NIUX = 2,// -- #牛1-牛9
		NIUNIU = 3, //,-- #牛牛
		YINNIU = 4,// -- #银牛--四花牛
		SHUNZI = 5, //--顺子
		TONGHUA = 6, //同花
		HULU = 7,//葫芦
		BOMB = 8,//四梅
		JINNIU = 9,//金牛
		WXN = 10,//五小牛
		TONGHUASHUN = 11,//同花顺
	}


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
	export const BET_COUNT_DOWN = 5;
    /**
     * 算牛时间
     */
	export const CAL_COUNT_DOWN = 15;
    /**
     * 抢庄时间
     */
	export const ROB_COUNT_DOWN = 5;
    /**
     * 准备超时时间
     */
	export const READY_COUNT_DOWN = 10;

}
namespace DDZ {

	/*
		 火箭：即双王（大王和小王），最大的牌。 
		 炸弹：四张同数值牌（如四个 7 ）。 
		单牌：单个牌（如红桃 5 ）。 
		对牌：数值相同的两张牌（如梅花 4+ 方块 4 ）。 
		三张牌：数值相同的三张牌（如三个 J ）。 
		三带一：数值相同的三张牌 + 一张单牌或一对牌。例如： 333+6 或 444+99 
		单顺：五张或更多的连续单牌（如： 45678 或 78910JQK ）。不包括 2 点和双王。 
		双顺：三对或更多的连续对牌（如： 334455 、7788991010JJ ）。不包括 2 点和双王。 
		三顺：二个或更多的连续三张牌（如： 333444 、 555666777888 ）。不包括 2 点和双王。 
		飞机带翅膀：三顺＋同数量的单牌（或同数量的对牌）。 
		如： 444555+79 或 333444555+7799JJ 
		四带二：四张牌＋两手牌。（注意：四带二不是炸弹）。 
		*/
	export const enum HAND_TYPE {
		/**
		 * 火箭
		 */
		HUOJIAN = 16, // 
		/**
		 *  //炸弹
		 */
		BOMB = 15,
		/**
		 * //错牌
		 */
		ERROR = 10, 
		/**
		 *  //单牌(散牌)
		 */
		SINGLE = 9,
		/**
		 * //对子
		 */
		YIDUI = 8, 
		/**
		 * //三张牌
		 */
		SANZHANG = 7, 
		/**
		 * //三带一
		 */
		SANDAIYI = 6, 
		/**
		 * //单顺
		 */
		DANSHUN = 5, 
		/**
		 * //双顺
		 */
		SHUANGSHUN = 4, 
		/**
		 *  //三顺
		 */
		SANSHUN = 3,
		/**
		 * //飞机带翅膀
		 */
		FEIJIDAICHIBANG = 2, 
		/**
		 * //四带二
		 */
		SIDAIER = 1, 
		/**
		 * 空,无牌
		 */
		NONE = 0, 
	}
	export const VALUE_MASK = 0x0f  //牌值掩码
	export const TYPE_SHIFT = 12        // 类型向左移16位
	export const LEN_SHIFT = 8          // 主类型长度为8
	export const SUIT_SHIFT = 4;
	/**
	 * 牌值的排序宏定义,用于牌的排序用的
	 */
	export const enum REAL_CARD_VALUE {
		NONE = 0x0,
		VALUE_3 = 0x1,
		VALUE_4 = 0x2,
		VALUE_5 = 0x3,
		VALUE_6 = 0x4,
		VALUE_7 = 0x5,
		VALUE_8 = 0x6,
		VALUE_9 = 0x7,
		VALUE_10 = 0x8,
		VALUE_J = 0x9,
		VALUE_Q = 0xA,
		VALUE_K = 0xB,
		VALUE_A = 0xC,
		VALUE_2 = 0xD,
		VALUE_XG = 0xE,
		VALUE_DG = 0xF
	}

	 export var SND_VALUE_NAMES = ['0', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a', '2', 'xg', 'dg'];
}
namespace zjh {
	/**
	 * 可以比牌的轮数
	 */
	export const COMP_CARD_CNT = 3;

	export const enum HANDVALUE {
		BOMB = 7, //豹子
		TONGHUASHUN = 6, //同花顺
		TONGHUA = 5, //金花
		SHUNZI = 4, //顺子
		YIDUI = 3, //对子
		SINGLE = 2, //散牌
		JINGHUA_235 = 1,
	}
}