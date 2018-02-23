namespace niuniu.brnn {
	export class GameDatas extends GameDatasBase {
		public brnnRoomInfo: model.EnterBrnnRoomInfo;
		/**
		 * 是否已经坐下
		 */
		public isSitDown: boolean;
		/**
		 * 自己当前的位置,如果为-1则为没有坐下
		 */
		public weizhi: number = -1;
		// public gameStatus: GAME_STAGE = GAME_STAGE.PRE_START;
		/**
		 * 游戏的当前状态
		 */
		public get gameStatus() {
			return this._gameStatus;
		}
		public set gameStatus(value: number) {
			this.lastGameStatus = this._gameStatus;
			this._gameStatus = value;
		}
		private _gameStatus: GAME_STAGE = GAME_STAGE.PRE_START;
		/**
		 * 上一次的状态
		 */
		public lastGameStatus: GAME_STAGE = GAME_STAGE.PRE_START;

		/**
		 * 自己的下注信息
		 * 位置0存放的是自己的总下注额度
		 */
		public selfInChipsList: number[] = [];
		public isChangeDesk: boolean = false;
		public brnWinResult: number[] = [];
		/**
		 * 更新自己某个筹码池的下注额度
		 * @param value:要更新的数值
		 * @param index:筹码池的位置
		 */
		public setSelfInChips(value: number, index: number) {
			//重新计算总下注额度
			this.selfInChipsList[0] = this.selfInChipsList[0] - this.selfInChipsList[index] + value;
			this.selfInChipsList[index] = value;
		}
		/**
		 * 更新某个筹码池总的下注额度
		 * @param value:要更新的数值
		 * @param index:筹码池的位置
		 */
		public setSumInChipsList(value: number, index: number) {
			//重新计算总下注额度
			this.sumInChipsList[0] = this.sumInChipsList[0] - this.sumInChipsList[index] + value;
			this.sumInChipsList[index] = value;
		}
		// private _selfInChipsList : number[];
		// public get selfInChipsList() : number[] {
		// 	return this._selfInChipsList;
		// }
		// public set selfInChipsList(v : number[]) {
		// 	this._selfInChipsList = v;
		// }


		/**
		 * 下注信息
		 */

		public playerGoDetain: {
			//最大续押次数
			maxCount: number,
			//当前局续押次数
			curCount: number
			//最后一次押注时,每个筹码池压的数量
			bets: number[]
		} = {
			maxCount: 2, curCount: 0, bets: [0, 0, 0, 0, 0]
		};

		public shenqingShangzhuangList: number[] = [];

		/**
		 * 当前是否下过注
		 */
		public goDoDettian: boolean;


		public sumInChipsList: number[] = [];
		public gameOverDatas: model.GameOverData;
		/**
		 * 收到G2C_SEND_CARDS的次数,为5时,说明所有牌都收到了
		 */
		public gameCi: number = 0;
		public zhuangjiaCards: number[] = [];
		/**
		 * 更新hz百人牛牛玩家金币
		 */
		public hzBrNnMsgList: model.GameOverUpdateChipsListItem[];
		/**
		 * 是否自动上庄
		 */
		public isAutoApplyDeal: boolean = false;

		/**
		 * 战绩数据保存
		 */
		public winRewardList: number[][];

		public constructor() {
			super();
			this.reset();
		}
		public reset() {
			this.brnWinResult = [];
			this.gameCi = 0;
			this.playerGoDetain.curCount = 0;
			this.goDoDettian = false;
			this.selfInChipsList = [0, 0, 0, 0, 0];
			this.sumInChipsList = [0, 0, 0, 0, 0];
			this.gameOverDatas = {
				calInfo: null,
				list: [
					{},
					{},
					{},
					{},
					{},
				]
			};
		}
		/**
		 * 自己是不是王
		 */
		public isSelfKing: boolean;
		/**
		 * 庄家剩余的金钱
		 */
		public zhaungMoney: number;
		/**
		 * 当前是否有人上庄
		 */
		public hasKing: boolean;
		/**
		 * 
		 */
		public updateKingInfo() {
			let arrLen = this.brnnRoomInfo.wangNameList.length;
			this.hasKing = arrLen > 0;
			for (let i = 0; i < arrLen; i++) {
				if (this.brnnRoomInfo.wangNameList[i].playerId === Global.playerDto.id) {
					this.isSelfKing = true;
					return;
				}
			}
			this.isSelfKing = false;
		}

		public getMaxGoldPalyerId(): number[] {
			let datas: model.Map<model.PLAYER_INFO> = this.playerDatas;
			let idArr: number[] = [];
			let idArrTemp: any[] = [];
			for (let key in this.playerDatas) {
				if (this.playerDatas[key]) {
					idArrTemp.push(this.playerDatas[key]);
				}
			}
			idArrTemp.sort((temp1: model.PLAYER_INFO, temp2: model.PLAYER_INFO) => {
				return temp2.chips - temp1.chips;
			});
			let arrLen = this.brnnRoomInfo.wangNameList.length;
			for (let i = 0; i < idArrTemp.length; i++) {
				if (arrLen) {
					for (let j = 0; j < arrLen; j++) {
						if (this.brnnRoomInfo.wangNameList[j].playerId != idArrTemp[i].playerId) {
							idArr.push(idArrTemp[i].playerId);
						}
					}
				} else {
					idArr.push(idArrTemp[i].playerId);
				}
				if (idArr.length >= 8) {
					break;
				}
			}
			return idArr;
		}
	}
}

