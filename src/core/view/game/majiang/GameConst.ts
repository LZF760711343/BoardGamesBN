namespace majiang {
	/**
	 * 方向
	 */
	export const DIRECT = {
		NONE: "",
		/**
		 * 左边
		 */
		LEFT: "left",
		/**
		 * 右边
		 */
		RIGHT: "right",
		/**
		 * 下
		 */
		BOTTOM: "bottom",
		/**
		 * 上
		 */
		TOP: "top",
	};
	// type DIRECT = DIRECT;
	//麻将是哪一种类型的
	export const enum CARD_TYPE {
		HAND,//手牌
		SHOW,//打出的牌
		PENG//碰或者杠的牌
	}

	// //下面为为字牌时的牌值
	// final int VALUE_DONG = 0x11; // 东南西北,中发白
	// final int VALUE_NAN = 0x12; // 3
	// final int VALUE_XI = 0x13; // 4
	// final int VALUE_BEI = 0x14; // 5
	// final int VALUE_ZHONG = 0x15; // 6
	// final int VALUE_FANG = 0x16; // 7
	// final int VALUE_BAIBANG = 0x17; // 8

	// final int[] MJ_SUITS = {MJ_WANGZI, MJ_TONGZI, MJ_TIAOZI, MJ_ZIPAI};
	// //#牌花色显示符号
	export const SUIT_NAMES = ["_", "万", "筒", "条", "字"];
	export const VALUE_NAMES = ["_", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	export const ZI_NAMES = ["", "东风", "南风", "西风", "北风", "红中", "发财", "白板"];
	// //此处的值不能更改,东南西北中发白的摊牌与此处绑定		playerDnsbzfbOKMap
	// final int MJ_TYPE_DNXB = 0x11;	//摊牌类型:东南西北
	// final int MJ_TYPE_ZFB = 0x12;	//摊牌类型:中发白
	// final int MJ_TYPE_DNXBZFB = 0x13;	//摊牌类型:东南西北中发白
	// final int MJ_TYPE_NAIO = 0x14;	//摊牌类型:小鸟
	// final int MJ_TYPE_SHAO = 0x15;	//类型:勺
	// final int MJ_TYPE_CHI = 0x15;	//类型:吃
	// final int MJ_TYPE_PENG = 0x15;	//类型:碰

	//此处的值不能更改,东南西北中发白的摊牌与此处绑定		playerDnsbzfbOKMap
	export const enum ACTIVE_TYPE {
		DNXB = 0x01,	//摊牌类型:东南西北
		ZFB = 0x02,	//摊牌类型:中发白
		DNXBZFB = 0x03,	//摊牌类型:东南西北中发白
		NAIO = 0x04,	//摊牌类型:小鸟
		TAN = 0x05,	//类型:摊牌
		SHAO = 0x06,	//类型:勺
		CHI = 0x07,	//类型:吃
		PENG = 0x08,	//类型:碰
		GANG = 0x09,	//类型:杠
		AN_GANG = 0x19,//暗杠,服务器端并没有这个类型,这个是客户端为了方便显示添加的一个类型
		HU = 0x0a,	//类型:胡
		MAX = 0x0b,	//类型:胡
		GUO = 0X20,//过的操作
		LAZI = 0X21,//懶子 自己定义的
	}

	//############### 花色 ################
	export const enum SUIT {
		NONE = 0x00,	//无花
		WANGZI = 0x01,  //万子
		TONGZI = 0x02,	//筒子
		TIAOZI = 0x03,	//条子 
		ZIPAI = 0x04,	//字牌 
	}
	// final int VALUE_1 = 0x01; // 1
	export const enum CARD_VALUE {
		NONE = 0x00,
		// # 1万到9万
		W_1 = 0x11,
		W_2 = 0x12,
		W_3 = 0x13,
		W_4 = 0x14,
		W_5 = 0x15,
		W_6 = 0x16,
		W_7 = 0x17,
		W_8 = 0x18,
		W_9 = 0x19,
		//        #1筒到9筒
		T_1 = 0x21,
		T_2 = 0x22,
		T_3 = 0x23,
		T_4 = 0x24,
		T_5 = 0x25,
		T_6 = 0x26,
		T_7 = 0x27,
		T_8 = 0x28,
		T_9 = 0x29,
		//        #1索/ 1条到9索/ 9条
		S_1 = 0x31,
		S_2 = 0x32,
		S_3 = 0x33,
		S_4 = 0x34,
		S_5 = 0x35,
		S_6 = 0x36,
		S_7 = 0x37,
		S_8 = 0x38,
		S_9 = 0x39,
		//        #东风到白板
		DONG = 0x41,
		NAN = 0x42,
		XI = 0x43,
		BEI = 0x44,
		ZHONG = 0x45,
		FA = 0x46,
		BAI = 0x47,
	}
	export const enum GDMJ_GUI_MODE {
		WUGUI_PAI = 0,// # 无鬼
		YOUGUI_PAI = 1,// # 随机鬼
		BAIBANGGUI_PAI = 2,// # 白板鬼
		// ANDOM2 = 3,// # 随机双鬼
	}

	export const enum GDMJ_MA_MODE {
		/**
		 * 无马
		 */
		WUMA_PAI = 1,
		/**
		 * 买马
		 */
		MAIMA_PAI = 2,
		/**
		 * 抓马
		 */
		ZHUAMA_PAI = 3,
	}

	export const enum GDMJ_HU_MODE {
		// int hufaFlag
		/**
		 * 吃胡
		 */
		CHIHU_FLAG = 0,
		/**
		 * 
		 */
		JIHUZIMO_FLAG = 1,
		ZIMO_FLAG = 2,
	}

	export const enum GDMJ_FAN {
		/**
		 * 碰碰胡
		 */
		PENGPENG_TYPE = 1 << 0,
		/**
		 * 七小对
		 */
		QIXIAODUI_TYPE = 1 << 1,
		/**
		 * 抢杠胡
		 */
		QINGGANGHU_TYPE = 1 << 2,
		/**
		 * 混一色
		 */
		HUNYISE_TYPE = 1 << 3,
		/**
		 * 清一色
		 */
		QINGYISE_TYPE = 1 << 4,
		/**
		 * 杠上开花
		 */
		GANGKAI_TYPE = 1 << 5,
		/**
		 * 豪华
		 */
		HAOHUA_TYPE = 1 << 6,
		/**
		 * 十三幺
		 */
		SHISANYAO_TYPE = 1 << 7,
		/**
		 * 天地胡
		 */
		TIANDIHU_TYPE = 1 << 8,
		/**
		 * 无风
		 */
		WUFENG_TYPE = 1 << 9,
		/**
		 * 跟庄
		 */
		GENZHUANG_TYPE = 1 << 10,
		/**
		 * 大三元
		 */
		DASANYUAN_TYPE = 1 << 11,
		/**
		 * 小三元
		 */
		XIAOSANYUAN_TYPE = 1 << 12,
	}

	export var RoomConf = [
		{ value: GDMJ_FAN.PENGPENG_TYPE, name: "碰碰胡2倍", defvalue: 1 },
		{ value: GDMJ_FAN.QIXIAODUI_TYPE, name: "七小对2倍", defvalue: 1 },
		{ value: GDMJ_FAN.QINGGANGHU_TYPE, name: "抢杠胡2倍", defvalue: 1 },
		{ value: GDMJ_FAN.HUNYISE_TYPE, name: "混一色2倍", defvalue: 1 },
		{ value: GDMJ_FAN.QINGYISE_TYPE, name: "清一色2倍", defvalue: 1 },
		{ value: GDMJ_FAN.GANGKAI_TYPE, name: "杠上开花2倍", defvalue: 1 },
		{ value: GDMJ_FAN.HAOHUA_TYPE, name: "豪华4倍", defvalue: 1 },
		{ value: GDMJ_FAN.SHISANYAO_TYPE, name: "十三幺10倍", defvalue: 1 },
		{ value: GDMJ_FAN.TIANDIHU_TYPE, name: "天地胡10倍", defvalue: 1 },
		{ value: GDMJ_FAN.WUFENG_TYPE, name: "无风", defvalue: 0 },
		{ value: GDMJ_FAN.GENZHUANG_TYPE, name: "跟庄", defvalue: 0 },
	];
}