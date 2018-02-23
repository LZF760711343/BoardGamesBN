namespace DDZ {
	export class GameDatas extends GameDatasBase {
		/**
		 * 房间信息
		 */
		public roomInfo: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_NN>;
		/**
		 * 地主的ID
		 */
		public landlordId: number;
		/**
		 * 当前游戏的阶段
		 */
		public gameStatus: GAME_STAGE;
		/**
		 * 当前轮到操作的人的id
		 */
		public curActionId: number;
		/**
		 * 最后出牌的人的id
		 */
		public lastPlayCardId:number;
		/**
		 * 抢完地主后的公共牌
		 */
		public publicCards: PokerCard[] = [];
		/**
		 * 第一个叫地主的人的id
		 */
		public fristQiangId:number;
		/**
		 * 上个人打出的牌
		 */
		public lastPlayCards:PokerCard[] = [];
		public poker: Poker = new Poker();
		/**
		 * 各个玩家的手牌
		 */
		public handCardList: number[][] = [];
		public cardRest:number[] = [];//每个玩家的剩余牌数(索引下标为玩家id)

		/**当前倍率 */
		public currentBeilv:number = 0;//(指农名的倍率)

		public constructor() {
			super();
		}
		public init(){
			this.cardRest = [];
		}
		public resetPlayerDatas() {
			super.resetPlayerDatas();
			this.poker.reset();
			// this.publicCards = [];
			this.cardRest = [];
			this.curActionId = -1;
			this.lastPlayCardId = null;
			this.fristQiangId = null;
			// for (let key in this.playerDatas) {
			// 	this.playerDatas[key].qiangZhuang = -1;
			// 	// this.playerDatas[key].kanPai = 0;
			// }
			// this.playerDatas
		}
	}
}

