namespace zjh {
	export class GameUI extends GameUIBase {
		public _inviteBtn: UI.CommonBtn;
		

		public constructor() {
			super(GAME_ID.ZJH);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			var self=this;
			// egret.log("11111"+this.gameDatas)
			if(self._zoomButton._SetBtn){
				self._zoomButton._SetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openSetBtn, self);
			}
			if(self._zoomButton._dissolveBtn){
				self._zoomButton._dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openDissolveBtn, self);
			}
			// if(self._zoomButton._ruleBtn){
			// 	self._zoomButton._ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openruleBtn, self);
			// }

		}
		protected openinviteBtn() {
			let conf: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_ZJH> = this.gameDatas.roomInfo;
			var str = [];
			egret.log("conf", conf.createinfo);
			let inning = GameLangs.createRoominning[GAME_ID.ZJH][conf.createinfo.roomLevel];
			str.push(GameLangs.create_roomStr.format(inning.count, inning.cost)
				+ "底注1分" + GameLangs.playingMethod[GAME_ID.ZJH][0].playing
				+ conf.createinfo.roundMax + " " + conf.createinfo.addChipsMax)
			let roomid = conf.room_id;
			egret.log("zjh");
			// Global.gameName+`${roomid}房间号：${roomid} 【点击进入房间】`
			Global.initSharing({
				type: 'txt',
				scene:0,
				title: GameLangs.inviteTip.format(roomid, GameLangs.gameNameMaps[conf.createinfo.gameId]),
				description: str.join(" "),
				url: Config.URLS.shareUrl + "?roomId=" + conf.room_id
			},false);


		}
		protected openruleBtn(event: egret.TouchEvent): void {
			if (this.gameDatas.roomInfo.createinfo.gameId == GAME_ID.GOLD_ZJH) {
				var layer = new SZP.RoomConfigLayer("4").open();
			} else {
				let data = this.gameDatas.roomInfo;
				var layer = new SZP.RoomConfigLayer("2").open();
				layer.setInfo(data);
			}
		}
	}
}
