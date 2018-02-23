namespace Layers {

	export class CreateRoomLayer extends BaseLayer {
		private _createRoomBtn: UI.CommonBtn;//创建房间按钮
		private _viewStack: eui.ViewStack;
		protected _gameTypeId: number;//游戏类型id
		private _tabBar: eui.TabBar;
		private _chatBtn: UI.CommonBtn;
		private _voiceBtn: UI.CommonBtn;
		private _gameConf: model.GameConf;
		private _isInit: boolean;//是否已经初始化过了
		private num: number = 0;
		public constructor() {
			super([ResManager.GROUP_NAME.CREATEROOM]);
			// this._gameTypeId = _gameTypeId;
			this.skinName = CreateRoomLayerSkin;
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			let self = this;
			// self._gameConf = Config.gameConf;
			// if (Config.gameConf.cardRoom[this._gameTypeId]) {
			// 	self.init();
			// }
			for (let i = 1; i <= 5; i++) {
				switch (i) {
					case 1:
						this._gameTypeId = GAME_ID.NIUNIU;
						this._isInit = false;
						this.init();
						break;
					case 2:
						this._gameTypeId = GAME_ID.ZJH;
						this._isInit = false;
						this.init();
						break;
					case 3:
						this._gameTypeId = GAME_ID.DDZ;
						this._isInit = false;
						this.init();
						break;
					case 4:
						this._gameTypeId = GAME_ID.GAME_ID_TWOMAN_QZNN;
						this._isInit = false;
						this.init();
						break;
					case 5:
						this._gameTypeId = GAME_ID.GAME_ID_GDMJ_FK;
						this._isInit = false;
						this.init();
						break;
				}
			}

			self._tabBar.addEventListener(egret.Event.CHANGE, self.chanTab, self);
			self._createRoomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.sendOpenRoomMsg, self);
		}
		/**
		 * 创建房间按钮回调
		 */
		private sendOpenRoomMsg(): void {
			(<RoomConfigLayerBase><any>this._viewStack.selectedChild).sendOpenRoomMsg();
		}

		private chanTab(evt: eui.CollectionEvent): void {
			egret.log("this._tabBar.selectedIndex:::" + this._tabBar.selectedIndex);
			this._viewStack.selectedIndex = this._tabBar.selectedIndex;
			// SoundManage.playEffect(SoundManage.keyMap.btnClick);

		}
		public init() {
			if (this._isInit) {
				return;
			}
			this._isInit = true;

			let conf = Config.gameConf.cardRoom[this._gameTypeId];
			egret.log("conf" + conf)
			let arrLen = conf.length;
			let datas: {
				hot?: string,
				name: string,
				gameId: GAME_ID
			}[] = []
			for (let i = 0; i < arrLen; i++) {
				let layer;
				let nameStr: string;

				egret.log("conf[i].gameIdconf[i].gameId" + conf[i].gameId)
				switch (conf[i].gameId) {
					case GAME_ID.NIUNIU:
						layer = new niuniu.RoomConfigLayer("1");
						nameStr = "ll_text1_png";
						break;
					case GAME_ID.GAME_ID_TWOMAN_QZNN:
						layer = new twoniuniu.RoomConfigLayer("4");
						nameStr = "二人牛牛";
						break;
					case GAME_ID.DDZ:
						layer = new DDZ.RoomConfigLayer("1");
						nameStr = "ddj_text1_png";
						break;
					case GAME_ID.ZJH:
						layer = new SZP.RoomConfigLayer("1");
						nameStr = "szp_text1_png";
						break;
					case GAME_ID.DZ:
						layer = new Dezhou.RoomConfigLayer();
						nameStr = "dzpk_text1_png";
						break;
					case GAME_ID.GAME_ID_GDMJ_FK:
						layer = new majiang.RoomConfigLayer("1");
						nameStr = "二人牛牛";
						break;
				}
				if (layer) {
					datas.push({ name: nameStr, gameId: Config.gameConf.cardRoom[this._gameTypeId][i].gameId });
					this._viewStack.addChild(layer);
					// if (GameDatas.sDatas.last_game != null && GameDatas.sDatas.last_game == list[i].gameId) {
					// 	selectIndex = this._viewStack.numChildren - 1;
					// }
				}
			}
			// this._tabBar.dataProvider = new eui.ArrayCollection(datas);
			// this._viewStack.selectedIndex = this._tabBar.selectedIndex
			//  = selectIndex;
			// gameConf

		}

		protected onExit() {
            super.onExit();
            //内存泄露，清除事件绑定
			this._tabBar.removeEventListener(egret.Event.CHANGE, this.chanTab, this);
			this._createRoomBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendOpenRoomMsg, this);
        }
	}
}