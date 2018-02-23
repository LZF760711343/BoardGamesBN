namespace DDZ {
	export class GameUI extends GameUIBase {
		public text_beilv: eui.Label;
		public _inviteBtn: UI.CommonBtn;
		public constructor() {
			super(GAME_ID.DDZ);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			var self=this;
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
			let conf: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_DDZ> = this.gameDatas.roomInfo;
			var str = [];
			let inning = GameLangs.createRoominning[GAME_ID.DDZ][conf.createinfo.roomLevel];
			str.push(GameLangs.create_roomStr.format(inning.count, inning.cost)
				+ GameLangs.playingMethod[GAME_ID.DDZ][conf.createinfo.roomMode].playing
				+ GameLangs.playingfly[conf.createinfo.roomSubMode].village);
			let roomid = conf.room_id;
			egret.log("initSharing");
			Global.initSharing({
				type: 'txt',
				scene: 0,
				title: GameLangs.inviteTip.format(roomid, GameLangs.gameNameMaps[conf.createinfo.gameId]),
				description: str.join(" "),
				url: Config.URLS.shareUrl + "?roomId=" + conf.room_id
			}, false);

		}
		protected openruleBtn(event: egret.TouchEvent): void {
			if (this.gameDatas.roomInfo.createinfo.gameId == GAME_ID.GOLD_DDZ) {
				var layer = new DDZ.RoomConfigLayer("4").open();
			} else {
				let data = this.gameDatas.roomInfo;
				var layer = new DDZ.RoomConfigLayer("2").open();
				layer.setInfo(data);
			}
			

		}
	}
}
