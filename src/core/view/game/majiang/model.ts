// TypeScript file
namespace model {
    // "result":0,"gameId":33,"stage":5,"preCardValue":0,"dealer":1000472,"actionPlayerId":1000473,"game_cnt":1,"isChuPai":0,"prePlayerId":0
    export interface MajiangStartGameInfo extends NN_STARTGAME {
        /**
         * 当前轮到谁操作
         */
        actionPlayerId: number;
        /**
         * 最后一轮出的牌
         */
        cards: number[];
        /**
         * 
         */
        // handType: shuangjian.HAND_TYPE;
        /**
         * 最后一个打牌的人的id
         */
        playerId: number;
        /**
         * 庄家id
         */
        dealer: number;
        isChuPai: number;
        prePlayerId: number;
    }
    export interface MjNoWActionIdInfo {
        /**
         * 当前轮到操作的人
         */
        actionPlayerId: number;
        /**
         * 上一个出牌的人
         */
        // preChuPaiPlayerId:number;
        isChuPai: number;
    }
    export interface MjGaojiActionIdInfo {
        /**
         * 传回服务器的数组
         */
        cardsValueAndCount: number[][];
        /**
         * 操作类型
         */
        // preChuPaiPlayerId:number;
        activeType: number;
        /**
         * 吃/碰/明杠别人打出的那张牌
         */
        cardValue: majiang.CARD_VALUE;
        playerId: number;
        /**
         * 相应要显示的牌值
         */
        cardValues: majiang.CARD_VALUE[];
    }
    export interface mjtanInfo {
        playerId: number;
        cards: number[];

    }
    //  {
    //  "result":0,"
    //  gameId":33,"stage":3,
    //  "preCardValue":0,"dealer":1000473,"actionPlayerId":1000472,"game_cnt":3,"isChuPai":1,"prePlayerId":0}
    export interface MjStartGameInfo extends NN_STARTGAME {
        /**
         * 当前轮到谁操作
         */
        actionPlayerId: number;
        /**
         * 上一张出的牌
         */
        preCardValue: number;
        /**
         * 最后一轮出的牌
         */
        cards: number[];
        /**
         * 
         */
        isChuPai: number;
        /**
         * 上一个出牌的人的id
         */
        prePlayerId: number;
        /**
         * 庄家
         */
        dealer: number;
    }
    export interface MJSendCards {
        Cards: number[];
        playerId: number;
        /**
         * 杠的牌
         */
        pengCards: majiang.CARD_VALUE[];
        /**
         * 暗杠的牌
         */
        anGangCards: number[];
        /**
         * 当前已经出的牌,只在重连的时候会有
         */
        chuCards: number[];
        /**
         * 明杠的牌
         */
        gangCards: number[];
        /**
         * 吃的牌,是一个一维数组,三个为一组
         */
        chiCards: number[];
        /**
         * 勺的牌
         */
        shaoCards: number[];
        /**
         * 摊的牌
         */
        tanCards: number[];
        /**
         * 懒子牌
         */
        gostCards: number;
    }
    export interface MJGameOverInfo {
        result: number,
        gameResult:
        {

            // pengCards: CARD_VALUE[],
            // anGangCards: CARD_VALUE[],
            // chuCards: CARD_VALUE[],
            // cards: CARD_VALUE[],
            // balance: number,
            // chiCards:CARD_VALUE[],
            // handValue: number,
            // gangCards: CARD_VALUE[],
            // shaoCards: CARD_VALUE[],
            // playerId: number
            pengCards: number[],
            anGangCards: number[],
            chuCards: number[],
            cards: number[],
            balance: number,
            chiCards: number[],
            handValue: number,
            gangCards: number[],
            shaoCards: number[],
            playerId: number,
            dealer: number,
            fangPaoPlayerId: number,
            huPlayerId: number,
            lastHuPaiFlag: number,
        }[]
    }
}
