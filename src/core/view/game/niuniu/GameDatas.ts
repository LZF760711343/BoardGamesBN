namespace niuniu {
	export class GameDatas extends GameDatasBase {
		/**
		 * 房间信息
		 */
		public roomInfo: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_NN>;
		/**
		 * 庄家ID
		 */
		public dealerId: number;
		public gameStatus: GAME_STAGE;
		/**当局庄家倍率 */
		public zhuangBeilv: number;
		/**
		 * 各个玩家的手牌
		 */
		public handCardList: number[][] = [];
		/**
		 * 手牌的牌型
		 */
		public cardType: number;
		public constructor() {
			super();
		}
	}
}

