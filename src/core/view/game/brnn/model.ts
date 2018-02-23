/**
 * @author HE
 */
namespace model {
    export interface BrnnChipsInfo {
        inChips: number,//下了多少筹码
        zuoweiIndex: number//筹码池位置
    }
    export interface BrnnGameprocessInfo {
        result: number;
        sumInChipsList: number[];//筹码池总下注信息

        stage: GAME_STAGE;//当前游戏阶段
        selfInChipsList: number[];//自己的下注信息
        weizhi: number;

    }

    export interface ChangeStateInfo {
        result: 0,
        stage: GAME_STAGE,//游戏当前的状态
        waitTime: number,//等待的时间
        roomId: number,
        /**
         * 当前庄家剩余金钱
         */
        sumChips: number;
    }

    /**
     * 下注消息返回
     */
    export interface BrnnBetInfo {
        result: number,
        self_chips: number,//自己在这个筹码池中的下注金额
        in_chips: number,//下注的额度
        sum_in_chips: number,//该筹码池总的额度
        zuoweiIndex: number,//筹码池的位置
        playerId: number,//下注的玩家
    }

    /**
    * 下注消息返回
    */
    export interface BrnnBetInfo1 {
        in_chips: number,//下注的额度
        zuoweiIndex: number,//筹码池的位置
    }


    /**
     * 玩家上下庄
     */
    export interface ZhuangJiaListInfo {
        result: number;
        wangNameList: { nickName: string, playerId: number }[];
        sumChips: number;//庄家当前的钱

    }
    /**
     * 自己的总的输赢信息
     */
    export interface CalcSumResultInfo {
        result: number;
        roundWinChips: number;
        chouShui: number;
    }
    /**
     * 翻牌消息
     */
    export interface BrnnFangPaiInfo {
        result: number;
        cards: number[];
        rewardRate: number;//牌型的倍率
        handValue: number;//牛牛牌型
        zuoWeiId: number;//是哪个筹码池
    }

    export interface BrnnFangPaiInfo1 {
        cards: number[];
        zuoWeiId: number;//是哪个筹码池
    }
    /**
     * 自己在每个筹码池的输赢结果消息
     */
    export interface OneHandResultInfo {
        result: number;
        in_chips: number;
        zuoWeiId: number;
        win_chips: number;
    }

    export interface HZ_BRNN_UPDATE_CHIPS_LIST {
        hzBrNnMsgList?: GameOverUpdateChipsListItem[],
    }

    export interface GameOverDataListItem {
        cardsInfo?: BrnnFangPaiInfo;
        chipsPoolInfo?: OneHandResultInfo;
    }
    export interface GameOverData {
        list?: GameOverDataListItem[],
        calInfo?: CalcSumResultInfo;
    }

    export interface GameActConfTtem {
        type: number;
        title: string;
        url: string;
    }

    /**
     * 百人牛牛玩家更新金币信息
     */
    export interface GameOverUpdateChipsListItem {
        playerId: number;
        roundWinChips: number;
        updateChips: number;
    }

    export interface CharegConfItem {
        /**
         * 购买数值
         */
        buy: number;
        /**
         * 充值赠送数量
         */
        gift?: number;//
        /**
         * 商品价格
         */
        price: number;
        /**
         *  赠送物品类型:1-钻石 2-金币
         */
        gifttype?: number;
        /**
         * 要显示的icon
         */
        icon: any;
        /**
         * 商品的id
         */
        pid?: string;
        /**
         * 苹果productId  
         */
        sub_pid?: string;
        /**
         * 活动物品数量
         */
        offnum?: number;
        // priceunit: number;//购买货币类型
        /**
         * 活动开始时间
         */
        off_starttime?: number;
        /**
         * 活动结束时间
         */
        off_endtime?: number;
        /**
         * 活动物品类型:1-钻石 2-金币
         */
        offtype?: number;
        /**
         * 购买类型:1-钻石 2-金币
         */
        buytype: CURRENCY_TYPE;
        // quick: number;//是否快充
        /**
         * 排序的序号
         */
        index: number;
        /**
         * 是否热销,0为不热销,1为热销
         */
        status: number;
        /**
         * 价格单位 0-钻石 1-金币 2-人民币（元） 
         */
        priceunit: number;
        /**
         * 活动标题 
         */
        off_title?: string;
    }
}