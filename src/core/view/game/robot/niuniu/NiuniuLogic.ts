namespace ROBOT {
	let config = {

	}
	export class NiuniuLogic extends LogicBase {
		// protected gameScene: zjh.GameScene;
		// protected gameDatas: zjh.GameDatas;
		// protected msgHandler: zjh.GameMsgHandler;
		private isWaitClose: boolean;
		private isWait: boolean;
		private poker: NiuniuPoker;
		// public static instance: ZJHRobot;
		constructor() {
			super();
			this.poker = new NiuniuPoker();
			// Robot.instance = this;
		}
		public destroy(scene: niuniu.GameScene) {
			// super.desrtoy();
			// this.gameDatas = this.gameScene = this.msgHandler = ZJHRobot.instance = null;
		}
		public doAction(scene: niuniu.GameScene) {
			log(scene.gameDatas.gameStatus)
			switch (scene.gameDatas.gameStatus) {
				case GAME_STAGE.PRE_START:
					this.doPreStart(scene);
					break;
				case GAME_STAGE.START:
					this.doStart(scene);
					break;
				case GAME_STAGE.QIANG_ZHUANG:
					this.doQiangzhnuang(scene);
					break;
				case GAME_STAGE.TOU_ZHU:
					this.touZhu(scene);
					break;
				case GAME_STAGE.SHOW_ME:
					this.cal(scene);
					break;
				case GAME_STAGE.SHOW_ALL:
					this.doPreStart(scene);
					break;
			}
		}
		/**
		 * 算牛阶段
		 */
		private cal(scene: niuniu.GameScene) {
			if (this.isWait) {
				return;
			}
			let info = scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId];
			if (info.showed === 0) {//还未算牛
				// if (is_self) {
				// 	this.scene.showCalBox();
				// }
			} else {//已经算牛
				scene.msgHandler.sendCalMsg(0);
				// if (is_self) {
				// 	this.scene.hideCalMenu();
				// }
				// else {
				// 	this.scene.showComeIcon(info.playerId);

				// }
			}
			this.isWait = true;
		}
		private on_G2C_SEND_CARDS(msg: net.ReceiveMsg<model.G2C_SEND_CARDS>) {
			// if (this.gameDatas.isSelfPlayingGame()) {
			if (msg.datas.playerId === Global.playerDto.id) {
				if (msg.datas.Cards.length === 1) {
					// this.scene.addCard(msg.datas.playerId, msg.datas.Cards[0]);
				} else if (msg.datas.Cards.length > 1) {
					this.poker.init(msg.datas.Cards);
				}
			}

			// }
		}
		private on_G2C_NN_LOOK(msg: net.ReceiveMsg<model.NN_LOOK>): void {
			this.isWait = false;
		}
		protected analysisCards(cards: CARD_VALUE[]) {

		}
		private on_G2C_NN_GAMEOVER(msg: net.ReceiveMsg<model.NN_GAMEOVER>) {
			this.poker.reset();
			this.isWait = false;
		}
		/**
	   * 收到定庄消息
	   */
		private on_G2C_NN_DEALER(msg: net.ReceiveMsg<model.NN_DEALER>): void {
			this.isWait = false;
		}
		protected doQiangzhnuang(scene: niuniu.GameScene) {
			if (this.isWait) {
				return;
			}
			let playerInfo = scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId];
			/**
			 * 还没有抢庄
			 */
			if (playerInfo.qiangZhuang === -1) {
				if (this.poker.isInit) {
					this.isWait = true;
					if (this.poker.getCardTypeUpProbalility(niuniu.HANDVALUE.NIUX + "" + 5) > Math.random()) {
						scene.msgHandler.sendCallMsg(this.getMaxCallRate(
							Global.playerDto.gold,
							scene.gameDatas.roomInfo.createinfo.difen,
							scene.gameDatas.getPlayIngGameCnt(),
							25,
							4,
							scene.gameDatas.gameType === GAME_TYPE.COIN
						));
					} else {
						scene.msgHandler.sendCallMsg(0);
					}
				}
			}
		}

		/**获取能抢庄的最大倍率
         * @param playerGold 玩家金币
         * @param roomBeilv 房间倍率
         * @param playerCount 玩家人数
         * @param xianMaxBeilv 闲家最大倍率
         * @param cardTypeMaxBeilv 牌型最大倍率
         */
		public getMaxCallRate(playerGold: number, roomBeilv: number, playerCount: number, xianMaxBeilv: number, cardTypeMaxBeilv: number, isCoin: boolean) {

			return playerGold / (roomBeilv * xianMaxBeilv * cardTypeMaxBeilv);
		}

		protected doPreStart(scene: niuniu.GameScene) {
			// log("doPreStart:", scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId])
			if (!scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId].ready) {
				scene.msgHandler.sendReadyGame();
				// if()
			}
			// if (scene.gameDatas.myPlyerId && scene.gameDatas.myPlyerId === scene.gameDatas.curActionId) {
			// 	scene.msgHandler.sendBetMsg(scene.gameDatas.curBetCnt);
			// }
		}
		protected async doStart(scene: niuniu.GameScene) { }
		/**刷新闲家按钮可用状态
         * @param zhuangGold 庄家金币
         * @param playerGold 玩家金币
         * @param playerCount 玩家人数
         * @param zhuangBeilv 庄家倍率
         * @param cardTypeMaxBeilv 牌型最大倍率
         * @param roomBeilv 房间倍率
         */
		public RefreshXianBarAvail(zhuangGold: number, playerGold: number, playerCount: number, zhuangBeilv: number, cardTypeMaxBeilv: number, roomBeilv: number, isCoin: boolean) {
			if (isCoin) {
				var min;
				var beilv;
				// min = (zhuangGold / (playerCount - 1) <= playerGold) ? zhuangGold/ (playerCount - 1 ) : playerGold;
				min = zhuangGold <= playerGold ? zhuangGold : playerGold;
				beilv = min / (roomBeilv * zhuangBeilv * cardTypeMaxBeilv);
				return beilv;
			} else {
				return 4;
			}
		}

		/**
		 * 下注阶段
		 */
		protected async touZhu(scene: niuniu.GameScene) {
			let info = scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId];
			if (info.touZhu === 0) {//还未下注
				if (this.poker.isInit) {
					this.isWait = true;
					if (this.poker.getCardTypeUpProbalility(niuniu.HANDVALUE.NIUX + "" + 5) > Math.random()) {
						scene.msgHandler.sendBetMsg(this.RefreshXianBarAvail(
							scene.gameDatas.playerDatas[scene.gameDatas.dealerId].chips,
							Global.playerDto.gold,
							scene.gameDatas.getPlayIngGameCnt(),
							scene.gameDatas.zhuangBeilv,
							4,
							scene.gameDatas.roomInfo.createinfo.difen,
							scene.gameDatas.gameType === GAME_TYPE.COIN
						));
					} else {
						scene.msgHandler.sendBetMsg(scene.gameDatas.roomInfo.createinfo.betChips[0]);
					}
				}
			}
		}
	}
}