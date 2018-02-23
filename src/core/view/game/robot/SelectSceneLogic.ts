namespace ROBOT {
	const testId = GAME_ID.GOLD_ZJH;
	const level = GAME_LEVEL.PRIMARY;
	function panduanJoinRoom(gold, roomid, gameid) {
		let joinRoomNeedGold = 0;
		let joinRoomMaxGold = 0;
		if (roomid == undefined || roomid >= 0) {
			if (roomid == undefined) {
				roomid = 0;
			}
			joinRoomNeedGold = Config.DropGameList[gameid][roomid].minPlay;
			joinRoomMaxGold = Config.DropGameList[gameid][roomid].maxPlay;
		}
		if (joinRoomNeedGold != -1 && gold < joinRoomNeedGold) {
			return false;
		}
		if (joinRoomMaxGold != -1 && gold > joinRoomMaxGold) {
			return false;

		}
		return true;
	}
	export class SelectSceneLogic extends LogicBase {
		private isWait: boolean;

		public constructor() {
			super();
		}
		private on_G2C_ADD_BAOXIANXIANG(msg: net.ReceiveMsg<any>) {
			egret.log("////////////////////////取保险箱钱成功!")
			this.isWait = false;
		}
		public async doAction(scene: BaseScene) {
			if (this.isWait) {
				return;
			}
			if (panduanJoinRoom(Global.playerDto.gold, level, testId)) {
				this.isWait = true;
				let conf = ResManager.getResConf(testId);
				await SceneManager.loadGroup(conf);
				net.SendMsg.create({ roomId: level, roomType: testId }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ENTER_ROOM).send();
				this.isWait = false;
			} else {
				// this._Baoxianxiang.text = Global.playerDto.baoxianxiang + "";
				egret.log("钱不够进场,尝试从保险箱取钱!")
				/**
				 * 保险箱里的钱加身上的钱足够进入房间
				 */
				let joinRoomNeedGold = Config.DropGameList[testId][level].minPlay;
				let joinRoomMaxGold = Config.DropGameList[testId][level].maxPlay;
				if ((Global.playerDto.baoxianxiang + Global.playerDto.gold) >= joinRoomNeedGold) {
					egret.log("开始取保险箱钱!")
					// let joinRoomNeedGold = Config.DropGameList[testId][level].minPlay;
					// let joinRoomMaxGold = Config.DropGameList[testId][level].maxPlay;
					//从保险箱取的钱
					let money = joinRoomNeedGold + (joinRoomMaxGold - joinRoomNeedGold) * 0.2 + Math.floor(Math.random() * (joinRoomMaxGold - joinRoomNeedGold) * 0.8) - Global.playerDto.gold;
					let ranMoney = money - Global.playerDto.gold;
					this.isWait = true;
					net.SendMsg.create({ gold: -(money > Global.playerDto.baoxianxiang ? Global.playerDto.baoxianxiang : money ) + ""}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ADD_BAOXIANXIANG).send();
				} else {
					egret.log("保险箱钱不够!")
				}

			}
		}
	}
}