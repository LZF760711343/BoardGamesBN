// TypeScript file
namespace model {


    export interface DDZStartGameInfo extends NN_STARTGAME {
        /**
         * 基础下注
         */
        baseRate:number
        /**
         * 当前轮到谁操作
         */
        actionPlayerId: number;
        /**
         * 最后一轮出的牌
         */
        cards:number[];
        /**
         * 
         */
        handValue:number;
        handSubType:number;
        /**
         * 
         */
        handType:DDZ.HAND_TYPE;
        /**
         * 最后一个打牌的人的id
         */
        playerId:number;
        /**
         * 底牌,叫完地主后,重连才会有这个数据
         */
        diPaiCards:number[];
        /**
         * 第一个抢地主的人的id
         */
        fristQiang:number;
        /**
         * 当前抢地主的倍率
         */
        nowDzRate:number;
    }
   
    export interface NoWActionIdInfo {
        /**
         * 当前轮到操作的人
         */
        actionPlayerId: number;
    }
    export interface DipaiCardsInfo {
        /**
         * 底牌
         */
        Cards: number[];
    }
    export interface DDZGameOverInfoItem{
        /**
         *手中剩下的牌 
         */
        //
        cards:number[];
        /**
         * 输赢结果
         */
        balance:number;
        nickName:string;
        difen:number;
        chunTianMode:number;
        playerId:number;
    }
    export interface DDZGameOverInfo{
        result:number;
        gameResultList:DDZGameOverInfoItem[];
    }
    /**
     * 服务器发过来的出牌协议里面的内容
     */
    export interface DDZCallInfo extends NN_CALL{
        /**
         * 第一个抢地主的玩家ID
         */
        fristQiang:number;
        /**
         * 当前倍率
         */
        nowDzRate:number;
    }
}
