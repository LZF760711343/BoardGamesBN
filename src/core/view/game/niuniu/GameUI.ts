namespace niuniu {
	export class GameUI extends GameUIBase {
		public _inviteBtn: UI.CommonBtn;
		public constructor() {
			super(GAME_ID.NIUNIU);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			var self = this;
			if (self._zoomButton._SetBtn) {
				self._zoomButton._SetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openSetBtn, self);
			}
			if (self._zoomButton._dissolveBtn) {
				self._zoomButton._dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openDissolveBtn, self);
			}
			// if (self._zoomButton._ruleBtn) {
			// 	self._zoomButton._ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openruleBtn, self);
			// }
		}
		protected openinviteBtn() {
			let conf: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_NN> = this.gameDatas.roomInfo;
			var str = [];
			let roomMode = conf.createinfo.roomMode - 1;
			let inning = GameLangs.createRoominning[GAME_ID.NIUNIU][conf.createinfo.roomLevel];
			if (this.gameDatas.roomInfo.createinfo.gameId == GAME_ID.GAME_ID_TWOMAN_QZNN) {
				str.push("2人");
			} else {
				str.push( GameLangs.create_roomStr.format(inning.count, inning.cost)
					// + GameLangs.playingMethod[GAME_ID.NIUNIU][roomMode].playing);
					+ "看牌抢庄");
				// egret.log("111::::" + inning.playerCnt + "人" + GameLangs.create_roomStr.format(inning.count, inning.cost));
				egret.log("conf", conf.createinfo, conf.createinfo.roomMode);
				if (conf.createinfo.roomMode == 3) {
					str.push(GameLangs.playinghog[conf.createinfo.roomSubMode].village);
				}

				for (let i = 0; i < conf.createinfo.betChips.length; i++) {
					let val = conf.createinfo.betChips[i]
					str.push(val + "倍");
				}

			}

			let roomid = conf.room_id;
			Global.initSharing({
				type: 'txt',
				scene: 0,
				title: GameLangs.inviteTip.format(roomid, GameLangs.gameNameMaps[conf.createinfo.gameId]),
				description: str.join(" "),
				url: Config.URLS.shareUrl + "?roomId=" + conf.room_id
			}, false);
		}
		protected openruleBtn(event: egret.TouchEvent): void {

			let data = this.gameDatas.roomInfo;
			if(data.createinfo.gameId == GAME_ID.GAME_ID_TWOMAN_QZNN){
				new twoniuniu.RoomConfigLayer("5").open().setInfo(data) 
			}else if(data.createinfo.gameId == GAME_ID.NIUNIU){
				new niuniu.RoomConfigLayer("2").open().setInfo(data);
			}else{
				new niuniu.RoomConfigLayer("4").open();
			}
		}
	}
}
