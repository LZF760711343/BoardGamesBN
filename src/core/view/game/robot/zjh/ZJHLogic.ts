namespace ROBOT {
	/**
	 * 玩的局数
	 */
	let playCnt: number = 0;
	/**
	 * 初始金币数
	 */
	let baseCoins: number = 0;
	/**
	 * 开始玩的时间
	 */
	let startTime: number = 0;
	let config = {

	}
	export class ZJHLogic extends LogicBase {
		// protected gameScene: zjh.GameScene;
		// protected gameDatas: zjh.GameDatas;
		// protected msgHandler: zjh.GameMsgHandler;
		private isWaitClose: boolean;
		/**
		 * 是否等待换房中
		 */
		private isWaitChangeRoom: boolean;
		/**
		 * 是否在等待关闭搓牌动画
		 */
		private isWaitCloseAni: boolean;
		// public static instance: ZJHRobot;
		constructor() {
			super();
			baseCoins = Global.playerDto.gold + Global.playerDto.baoxianxiang;
			startTime = Date.now();
			// Robot.instance = this;
		}

		public destroy(scene: zjh.GameScene) {
			// super.desrtoy();
			// this.gameDatas = this.gameScene = this.msgHandler = ZJHRobot.instance = null;
		}
		public doAction(scene: zjh.GameScene) {
			log(scene.gameDatas.gameStatus)
			switch (scene.gameDatas.gameStatus) {
				case GAME_STAGE.PRE_START:
					this.doPreStart(scene);
					break;
				case GAME_STAGE.START:
					this.doStart(scene);
					break;
				case GAME_STAGE.QIANG_ZHUANG:
					break;
				case GAME_STAGE.TOU_ZHU:
					this.doStart(scene);
					break;
				case GAME_STAGE.SHOW_ME:
					break;
				case GAME_STAGE.SHOW_ALL:
					this.doPreStart(scene);
					break;
			}
		}
		/**
		 * 检查是否要换房
		 */
		private checkIsChangeRoom() {
			if (this.isWaitChangeRoom) {
				return;
			}

		}
		private on_G2C_STARTGAME(msg: net.ReceiveMsg<model.ZJH_STARTGAME>) {
			log(`玩了${playCnt++}局, 玩了${(Date.now() - startTime) / 60 / 1000}分钟, 输赢情况:${Global.playerDto.gold + Global.playerDto.baoxianxiang - baseCoins}金币`);
		}
		protected doPreStart(scene: zjh.GameScene) {
			log("doPreStart:", scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId])
			if (!scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId].ready) {
				scene.msgHandler.sendReadyGame();
				// if()
			}
			if (scene.gameDatas.myPlyerId && scene.gameDatas.myPlyerId === scene.gameDatas.curActionId) {
				scene.msgHandler.sendBetMsg(scene.gameDatas.curBetCnt);
			}
		}
		protected async doStart(scene: zjh.GameScene) {
			// if(scene.gameDatas.myPlyerId !== scene.gameDatas.curActionId){
			// 	return ;
			// }
			//如果当前是轮到自己操作
			if (scene.gameDatas.myPlyerId && scene.gameDatas.myPlyerId === scene.gameDatas.curActionId) {
				scene.msgHandler.sendBetMsg(scene.gameDatas.curBetCnt);
			}
			if (this.isWaitClose) {
				return;
			}
			log("this.isWaitCloseAni:", this.isWaitCloseAni)
			if (this.isWaitCloseAni) {
				let layer = Layers.getLayer(niuniu.RoundAccountLayer);
				if (layer) {
					this.isWaitClose = true;
					await scene.wait(600);
					this.isWaitClose = false;
					layer.onTouchGoBtn();
				}
			} else {
				log("scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId].kanPai:", scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId].kanPai)
				if (scene.gameDatas.cuopai) {
					this.isWaitCloseAni = true;
					await wait(1500);
					this.isWaitCloseAni = false;
					if (scene.gameDatas.cuopai) {
						scene.gameDatas.cuopai.CuoPaiFinished();
						scene.gameDatas.cuopai = null;
					}
					egret.log("aaaaaaaaaaaaaaaaaaaaaaaaa")
				} else if (scene.gameDatas.isSelfPlayingGame() && !scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId].kanPai && scene.gameDatas.roundCnt > 2) {
					scene.msgHandler.sendKanMsg(false);
				}
			}
		}
	}
}