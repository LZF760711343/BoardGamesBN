namespace majiang {
	export class GameDatas extends GameDatasBase {
		public hasReceiveSeZi: boolean = false;
		public seziList: number[];
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
		public lastPlayCardId: number;
		/**
		 * 最后出牌的card
		 */
		public lastCardValue: number;
		/**
		 * 玩家可以操作列表
		 */
		public _actionItems: MJActionItem[];
		/**
		 * 已经摊过的牌型
		 */
		public tanType: ACTIVE_TYPE;
		/**
		 * 庄家id
		 */
		public dealerId: number;
		/**
		 * 庄家位置
		 */
		public dealerPos: number;
		/**
		 * 保存摊的牌
		 */
		public tanCards: model.mjtanInfo;
		/**
		 * 懒子牌
		 */
		public laziCard: number;
		/**
		 * 码牌
		 */
		public maCards: number[];
		/**
		 * 中码牌
		 */
		public zhongmaCards: number[];
		/**
		 * 剩余牌数
		 */
		public remainCards: number;


		public constructor() {
			super();
			this.init();
		}
		public init() {
			this.dealerId = null;
			this._actionItems = [];
			this.tanType = 0;
			this.remainCards = 136;
		}
		public resetPlayerDatas() {
			super.resetPlayerDatas();
			this.tanType = 0;
			this._actionItems = [];
			this.curActionId = -1;
			this.lastPlayCardId = null;
			this.dealerId = null;
			this.remainCards = 136;
			// this.fristQiangId = null;
		}
	}
}

