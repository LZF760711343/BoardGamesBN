namespace twoniuniu {
	export class RoomConfigLayer extends Layers.RoomConfigLayerBase {
		/**
		 * 下注可选配置表
		 */
		private _betConf: number[];

		protected _levelRadio3: eui.RadioButton;

		protected _levelRadio4: eui.RadioButton;
		protected _levelRadio5: eui.RadioButton;
		/**
		 * 看牌抢庄
		 */
		private _kpqzRadio: eui.RadioButton;
		/**
		 * 轮庄
		 */
		private _lzRadio: eui.RadioButton;
		/**
		 * 无庄
		 */
		private _fzzjRadio: eui.RadioButton;
		/**
		 * 牛牛换庄
		 */
		private _nnhzRadio: eui.RadioButton;
		/**
		 * 牛九换庄
		 */
		private _njhzRadio: eui.RadioButton;
		/**
		 * 顺序轮庄
		 */
		private _sxlzRadio: eui.RadioButton;
		/**
		 * 20分
		 */
		private _scoreCBox4: eui.CheckBox;
		/**
		 * 10分
		 */
		private _scoreCBox5: eui.CheckBox;
		/**
		 * 5分
		 */
		private _scoreCBox3: eui.CheckBox;
		/**
		 * 2分
		 */
		private _scoreCBox2: eui.CheckBox;
		/**
		 * 1分
		 */
		private _scoreCBox1: eui.CheckBox;
		private zhuangGroup: eui.RadioButtonGroup;
		private subGroup: eui.RadioButtonGroup;
		// private two_level: eui.RadioButtonGroup;



		/**
        * 底注|下注限制label
        */


		private _chipLabel: eui.Image;
		/**
		 * 积分按钮组
		 */
		private _scoreCBoxList: eui.CheckBox[];
		public constructor(private str: string) {
			super()
			this._gameId = GAME_ID.NIUNIU;
			this.skinName = RoomConfigLayerSkin;
			this.currentState = str;
			let self = this;
			self.zhuangGroup = self._kpqzRadio.group;
			self.subGroup = self._nnhzRadio.group;
			// self.two_level = self._levelRadio1.group;
			self._betConf = [1, 2, 5, 10, 20];
			self._scoreCBoxList = [self["_scoreCBox1"], self["_scoreCBox2"], self["_scoreCBox3"], self["_scoreCBox4"], self["_scoreCBox5"]];

			// this._levelConf = [{ playerCnt: 5, count: 15, cost: 10 }, { playerCnt: 5, count: 30, cost: 20 }, { playerCnt: 8, count: 15, cost: 15 }, { playerCnt: 8, count: 30, cost: 30 }];

		}



		private selectScoreBoxCB(evt: eui.UIEvent) {
			if (this.zhuangGroup.selectedValue == GAME_MODE.NONE) {
				let radioGroup: eui.CheckBox = evt.target;
				if (radioGroup.selected) {
					let length = this._scoreCBoxList.length;
					for (let i = 0; i < length; ++i) {
						this._scoreCBoxList[i].selected = this._scoreCBoxList[i] == radioGroup;
					}
				}
			}
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			var self = this;
			var conf = self._levelConf;
			self.zhuangGroup.selectedValue = 1 + "";
			self._levelGroup.selectedValue = 1 + "";
			// self._levelRadio1.label = "75W~80W 1张";
			
			self._levelRadio2.label = "150W~160W 2张";
			// self._steppedRadio2.label = conf[1].playerCnt + GameLangs.ren;
			// self._steppedRadio3.label = conf[2].playerCnt + GameLangs.ren;
			// self._steppedRadio4.label = conf[3].playerCnt + GameLangs.ren;
			// self._steppedRadio5.label = conf[3].playerCnt + GameLangs.ren;

			// self._tabBar.addEventListener(egret.Event.CHANGE, self.chanTab, self);
			let length = self._scoreCBoxList.length;
			for (let i = 0; i < length; ++i) {
				self._scoreCBoxList[i].addEventListener(eui.UIEvent.CHANGE, self.selectScoreBoxCB, self);
			}

			// self._fzzjRadio.value = GAME_MODE.NONE;
			self._sxlzRadio.value = GAME_SUB_MODE.SXLZ;
			self._njhzRadio.value = GAME_SUB_MODE.NJHZ;
			self._nnhzRadio.value = GAME_SUB_MODE.NNHZ;
			self.zhuangGroup.addEventListener(eui.UIEvent.CHANGE, self.selectGameMode, self);
			// self.zhuangGroup.selectedValue = GAME_MODE.KP + "";
			self.subGroup.selectedValue = GAME_SUB_MODE.SXLZ + "";
			if (this.currentState == "4") {
				this.initLastInfo();
			}

		}

		// 如果有缓存，初始化
		public initLastInfo() {
			let data = LocalDatas.sDatas.datas.two_data;
			if (data != null) {
				super.initLastInfo(data);
				for (var i = 0; i < this._scoreCBoxList.length; i++) {
					let value = this._betConf[i];
					this._scoreCBoxList[i].selected = data.betChips.indexOf(value) > -1;
					// this._scoreCBoxList[i].selected = data.betList[i];
				}

				// this.zhuangGroup.selectedValue = data.roomMode + "";
				if (data.roomMode == 3) {
					this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = true;
				}
				this.subGroup.selectedValue = "" + data.roomSubMode;
				this._levelGroup.selectedValue = data.roomLevel+"";
			}

		}

		public setInfo(data: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_NN>) {
			// egret.log("gameDatas.roomInfo.createinfo",this.gameDatas.roomInfo.createinfo);
			// let data = LocalDatas.sDatas.datas.nn_data;
			egret.log("data", data.createinfo);

			if (data != null) {
				this._roomGroup.touchChildren = this._roomGroup.touchEnabled = false;
				super.setInfo(data);
				if (data.createinfo.roomMode == GAME_MODE.LZ) {
					this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = true;
					this._sxlzRadio.enabled = data.createinfo.roomSubMode == this._sxlzRadio.value;
					this._njhzRadio.enabled = data.createinfo.roomSubMode == this._njhzRadio.value;
					this._nnhzRadio.enabled = data.createinfo.roomSubMode == this._nnhzRadio.value;
				}
				else {
					this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = false;
				}
				this._fzzjRadio.enabled = data.createinfo.roomMode == this._fzzjRadio.value;
				this._lzRadio.enabled = data.createinfo.roomMode == this._lzRadio.value;
				this._kpqzRadio.enabled = data.createinfo.roomMode == this._kpqzRadio.value;
				this._levelRadio3.enabled = this._levelRadio3.selected = this._levelRadio3.value == data.createinfo.roomLevel;
				this._levelRadio4.enabled = this._levelRadio4.selected = this._levelRadio4.value == data.createinfo.roomLevel;
				this._levelRadio5.enabled = this._levelRadio5.selected = this._levelRadio5.value == data.createinfo.roomLevel;

				this.subGroup.selectedValue = "" + data.createinfo.roomSubMode;
				// this.two_level.selectedValue = data.createinfo.roomLevel + "";
				// this.zhuangGroup.selectedValue = data.createinfo.roomMode + "";
				var length = data.createinfo.betChips.length;
				var length2 = this._scoreCBoxList.length;
				for (var j = 0; j < length2; j++) {
					this._scoreCBoxList[j].enabled = this._scoreCBoxList[j].selected = false;
					egret.log("this._scoreCBoxList", data.createinfo);
				}
				for (var i = 0; i < length; i++) {
					for (var j = 0; j < length2; j++) {
						if (this._betConf[j] == data.createinfo.betChips[i]) {
							this._scoreCBoxList[j].enabled = this._scoreCBoxList[j].selected = true;
							break;
						}
					}
				}
			}
		}
		/**
         * 发送创建房间的消息
         */
		public sendOpenRoomMsg() {
			let self = this;
			let length = self._scoreCBoxList.length;
			let count = 0;
			let bet_chip = [];


			let betli = [];
			for (var i = 0; i < length; i++) {
				if (self._scoreCBoxList[i].selected) {
					count++;
					bet_chip.push(this._betConf[i]);

				}

			}
			// if (count) {
			let limitValue = 0;
			if (self._ipxzRadio.selected) {//添加ip限制
				limitValue = limitValue | EXTRALIMIT_MASK.IP;
			}
			// 00000011
			if (self._dlwzRadio.selected) {//添加地理位置限制
				limitValue |= EXTRALIMIT_MASK.GEOLOCATION;
			}
			let level = parseInt(this._levelGroup.selectedValue);
			egret.log("发送创建房间的消息如果有缓存，初始化" + this._levelGroup.selectedValue)
			var sendData: model.OPEN_SCORE_ROOM_TWO = {
				gameId: GAME_ID.GAME_ID_TWOMAN_QZNN,
				extraLimit: limitValue,
				roomLevel: level,
				roomMode: 0,
				roomSubMode: 0,
				betChips: [1, 2, 3, 4, 5],
			}
			net.SendMsg.create(sendData, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_OPEN_SCORE_ROOM).send();
			LocalDatas.sDatas.datas.two_data = sendData;
			egret.log("发送创建房间的消息如果有缓存，初始化" + LocalDatas.sDatas.datas.two_data.roomLevel)
			LocalDatas.sDatas.saveData();
			// } 
			// else {
			// 	Toast.launch(GameLangs.roomBetNotSelectTip);
			// }
		}
		//选择庄家模式
		private selectGameMode(evt: eui.UIEvent) {
			var radioGroup: eui.RadioButtonGroup = evt.target;
			let value = parseInt(radioGroup.selectedValue);
			switch (value) {
				case GAME_MODE.LZ:
					// this._chipLabel.source = "label_c_xzxz_png";
					this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = true;
					break;
				case GAME_MODE.NONE:
					// this._chipLabel.source = "label_c_dizhu_png";
					let length = this._scoreCBoxList.length;
					let select = true;
					for (let i = 0; i < length; i++) {
						if (this._scoreCBoxList[i].selected && select) {
							select = false;
							continue;
						}
						this._scoreCBoxList[i].selected = false;
					}
					this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = false;
					break;
				case GAME_MODE.KP:
					// this._chipLabel.source = "label_c_xzxz_png";
					this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = false;
					break;
			}
			SoundManage.playEffect(SoundManage.keyMap.btnClick);
		}

		protected onExit() {
            super.onExit();
            //内存泄露，清除事件绑定
			//移除选项的事件
			let length = this._scoreCBoxList.length;
			for (let i = 0; i < length; ++i) {
				this._scoreCBoxList[i].removeEventListener(eui.UIEvent.CHANGE, this.selectScoreBoxCB, this);
			}
			//移除选择抢庄模式的选项事件
			this.zhuangGroup.removeEventListener(eui.UIEvent.CHANGE, this.selectGameMode, this);
        }
	}
}