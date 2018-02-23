var majiang;
(function (majiang) {
    /**
     * 方向
     */
    majiang.DIRECT = {
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
    majiang.SUIT_NAMES = ["_", "万", "筒", "条", "字"];
    majiang.VALUE_NAMES = ["_", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    majiang.ZI_NAMES = ["", "东风", "南风", "西风", "北风", "红中", "发财", "白板"];
    majiang.RoomConf = [
        { value: 1 /* PENGPENG_TYPE */, name: "碰碰胡2倍", defvalue: 1 },
        { value: 2 /* QIXIAODUI_TYPE */, name: "七小对2倍", defvalue: 1 },
        { value: 4 /* QINGGANGHU_TYPE */, name: "抢杠胡2倍", defvalue: 1 },
        { value: 8 /* HUNYISE_TYPE */, name: "混一色2倍", defvalue: 1 },
        { value: 16 /* QINGYISE_TYPE */, name: "清一色2倍", defvalue: 1 },
        { value: 32 /* GANGKAI_TYPE */, name: "杠上开花2倍", defvalue: 1 },
        { value: 64 /* HAOHUA_TYPE */, name: "豪华4倍", defvalue: 1 },
        { value: 128 /* SHISANYAO_TYPE */, name: "十三幺10倍", defvalue: 1 },
        { value: 256 /* TIANDIHU_TYPE */, name: "天地胡10倍", defvalue: 1 },
        { value: 512 /* WUFENG_TYPE */, name: "无风", defvalue: 0 },
        { value: 1024 /* GENZHUANG_TYPE */, name: "跟庄", defvalue: 0 },
    ];
})(majiang || (majiang = {}));
//# sourceMappingURL=GameConst.js.map