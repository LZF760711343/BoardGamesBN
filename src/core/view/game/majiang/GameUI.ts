namespace majiang {
	export class GameUI extends GameUIBase {
		public gameDatas: GameDatasBase;
		public _btnGroup: eui.Group;
		public _changeSortBtn: UI.ToggleButton;

		public constructor() {
			super(GAME_ID.GAME_ID_GDMJ_FK);
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
		/**
		 * 规则页面
		 */
		protected openruleBtn(event: egret.TouchEvent): void {
			if (this.gameDatas.roomInfo.createinfo.gameId == GAME_ID.GAME_ID_GDMJ_GOLD) {
				var layer = new majiang.RoomConfigLayer("3").open();
			} else {
				let data = this.gameDatas.roomInfo;
				var layer = new majiang.RoomConfigLayer("2").open();
				layer.setInfo(data);
			}


		}

		public openSetBtn(event: egret.TouchEvent): void {
			new Layers.SettingLayer("majiang").open();
		}

		protected openinviteBtn() {
			let conf = <model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_GDMJ>>this.gameDatas.roomInfo;
			var str = [];
			let roomMode = conf.createinfo.roomMode - 1;
			let genMA = "";
			conf.createinfo.roomSubMode >= (2 << 4) ? genMA = "马跟底分" : "";
			let inning = GameLangs.createRoominning[GAME_ID.GAME_ID_GDMJ_FK][conf.createinfo.roomLevel];
			
			str.push(GameLangs.create_roomStr.format(inning.count, inning.cost)
			+GameLangs.playingMethod[GAME_ID.GAME_ID_GDMJ_FK][roomMode].playing+" "
			+genMA+" "
			+GameLangs.playingMethodHu[conf.createinfo.hufaFlag]+" "
			+GameLangs.playingMethodLai[conf.createinfo.guipaiType]);
			let roomid = conf.room_id;
			Global.initSharing({
				type: 'txt',
				scene: 0,
				title: GameLangs.inviteTip.format(roomid, GameLangs.gameNameMaps[conf.createinfo.gameId]),
				description: str.join(" "),
				url: Config.URLS.shareUrl + "?roomId=" + conf.room_id + "&appid=" + Config.WX_APPID
			}, false);

		}
	}
}
