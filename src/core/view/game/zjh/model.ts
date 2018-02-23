// TypeScript file
namespace model {
    // export interface NN_BET {
    //     playerId: unint;//uint32 4, 玩家ID
    //     in_chips: unint;//uint32, 8, 下注额
    //     own_chips: long;//int64, 16， 还拥有代入金额
    // }
    export interface ZJH_PLAYER_INFO extends PLAYER_INFO {
        /**
         * 是否已经看牌了,0表示未看牌,1表示看牌了
         */
        kanPai: number;
        /**
         * 是否已经比牌输了或者已经弃牌了
         */
        loseOrQiPai: number;
    }
    export interface ZJH_STARTGAME extends NN_STARTGAME {//
        /**
         * 当前轮到谁操作
         */
        actionPlayerId: number;
        /**
         * 当前的下注额
         */
        actionCoin: number;
        /**
         * 最大的轮数
         */
        roundMax: number;
        /**
         * 当前的轮数
         */
        round: number;
    }
    export interface RoundCountInfo {
        round: number;//当前轮数
        roundMax: number;//最大轮数
    }
    export interface QiPaiInfo {
        loseOrQiPai: number;//
        actionPlayerId: number;//下一个轮到谁
        playerId: number;//谁弃牌了
    }
    export interface BiPaiInfo {
        otherId: number;//被比牌的人的id
        actionPlayerId: number;//下一个轮到谁
        playerId: number;//发起比牌的人的id
        isWin:number;//输了还是赢了
    }

    // {"result":0,"otherId":1000058,"playerId":1000052,"isWin":0}
    export interface ZJHBetInfo extends NN_BET {
        rate: number;
        /**
         * 自己当前总共下了多少注
         */
        inChips: number;//
        /**
         * 下个轮到操作的人的id
         */
        actionPlayerId: number;
        /**
         * 总的下注额度
         */
        sumChips: number;
        /**
         * 当前下注的底注
         */
        actionCoin: number;
        /**
         * 当前ID所拥有的筹码
         */
        ownChips: number;

    }
    export interface ZJHGameOverInfo {
        gameResultList: {
            kanPai: number;//是否已经看牌了
            cards: number[];//具体的牌值
            balance: number;//输赢数额
            handValue: number;//牌型
            loseOrQiPai: number;//是弃牌还是比牌输了
            playerId: number;
        }[];
        /**
         * 需要进行比牌的列表
         */
        biPaiList: number[][];
    }
    export interface ZJHKanpaiInfo{
        kanPai:number;
        cards:number[];
        handValue:number;
        handType:number;
        playerId:number;
    }
    // {"result":0,"kanPai":1,"cards":[148,52,178],"handValue":0,"handType":0,"playerId":1000057}
}