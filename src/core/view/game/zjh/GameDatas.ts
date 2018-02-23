namespace zjh {
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
		/**
		 * 玩家信息列表
		 */
		public playerDatas:model.Map<model.ZJH_PLAYER_INFO> = {};

		/**
		 * 各个玩家的手牌
		 */
		public handCardList: number[][] = [];
		/**
		 * 当前轮数
		 */
		public roundCnt: number;
		/**
		 * 最大轮数有多少
		 */
		public maxRoundCnt: number;
		/**
		 * 当前单注额度
		 */
		public curBetCnt: number;

		/**
		 * 当前轮到操作的人的id
		 */
		public curActionId: number;
		/**
		 * 当前总的下注额度
		 */
		public sumChips: number = 0;
		/**
		 * 时间不够是否直接看牌不搓牌
		 */
		public noTime:boolean;
		public cuopai: CuoPaiAni;
		public Num:number=0;//开始游戏扔筹码取消跟注声音
		public firstTime:number=0;//游戏开始筹码为底分
		public really:boolean;
		public constructor() {
			super();
		}
		public resetPlayerDatas() {
			super.resetPlayerDatas();
			//默认的下注额度为最小的额度
			this.curBetCnt = this.roomInfo.createinfo.betChips[0];
			this.roundCnt = 1;
			this.sumChips = 0;
			this.handCardList = [];
			for (let key in this.playerDatas) {
				this.playerDatas[key].loseOrQiPai = 0;
				this.playerDatas[key].kanPai = 0;
				this.playerDatas[key].ready = 0;
			}
		}
	}
}

