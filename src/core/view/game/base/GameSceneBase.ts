class GameSceneBase extends BaseScene {
	// public gam
	/**
	 * 用于存放游戏过程中的一些数据
	 */
	public gameDatas: GameDatasBase;
	public uiLayer: GameUIBase;

	public players: PlayerBase[];
	public msgHandler: GameMsgHandlerBase;
	protected _waitTimer: number;
	protected _tipBar: niuniu.brnn.TipBar;
	public sex: number;
	public saveChip: any[] = [];
	/**
     * 手机信息显示框(显示当前时间,网络状况,当前电池电量)
     */
	private _phoneInfoBox: PhoneInfoBox;
	// public game
	public constructor(args: any[]) {
		super();
		this.initDatas(args[0], args[1]);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		if (this._phoneInfoBox) {
			this._phoneInfoBox.visible = egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
		}
	}
	/**
	 * 换桌按钮回调
	 */
	protected onChangeDesk() {
		SoundManage.playEffect("brnn_huanfang");
		this.msgHandler.sendChangeDeskMsg();
	}

	/**
	 * 用于异步函数,等待多少毫秒
	 */
	public wait(delay: number) {
		if (this._waitTimer) {
			egret.clearTimeout(this._waitTimer);
		}
		return new Promise((readyFunc: Function) => {
			this._waitTimer = egret.setTimeout(() => {
				readyFunc();
			}, this, delay);
		})
	}
	// private 
	/**
         * 显示等待游戏开始提示条
         */
	public showWaitGameStartTip() {
		let _tipBar = this._tipBar;
		if (!_tipBar) {
			_tipBar = this._tipBar = new niuniu.brnn.TipBar;
			_tipBar.skinName = niuniu.brnn.TipBarSkin;
			this.uiLayer.addChildAt(_tipBar, 0);
			_tipBar.verticalCenter = _tipBar.horizontalCenter = 0;
		} else {
			_tipBar.visible = true;
		}
		_tipBar.curState = niuniu.brnn.TipBarStatu.WAIT;

	}
	/**
	 * 隐藏等待游戏开始提示条
	 */
	public hideWaitGameStartTip() {
		if (this._tipBar) {
			this._tipBar.visible = false;
			this._tipBar.curState = niuniu.brnn.TipBarStatu.NONE;
		}

	}
	/**
	 * 打开用户信息页面
	 */
	protected openUserInfoLayer(e: egret.TouchEvent, _player?:PlayerBase) {
		if (this.gameDatas && this.gameDatas.playerDatas) {
			var player = _player || e.target;
			var data = this.gameDatas.playerDatas[player.getPlayerId()];
			if (data && data.UserInfo) {
				//金币等更新时，可以及时显示改变
				if (data.UserInfo.id == Global.playerDto.id)
					new Layers.UserInfoLayer(Global.playerDto).open();
				else
					new Layers.UserInfoLayer(data.UserInfo).open();
			}
		}
	}
	/**
	 * 初始化一些游戏数据
	 * @param datas:房间的信息
	 * @param gameType:游戏是金币场还是房卡模式
	 */
	public initDatas(datas: any, gameType?: GAME_TYPE) {

	}
	/**
	 * 初始化
	 */
	public init() {

	}
	/**
     * 根据自己的playerId给其他人分配座位信息
     */
	public allotPlayerPos(id: number) {
		let pCnt = this.gameDatas.roomInfo.createinfo.RoomSize;
		for (var i = 0; i < pCnt; i++) {
			egret.log("allotPlayerPos:", id)
			this.players[i].setPlayerId(id % pCnt);
			id++;
		}
	}
	protected initUI() {
		this.uiLayer.init(this.gameDatas, this);
		this.updateRoomInfoUI();
	}
	protected onExit() {
		super.onExit();
		this.msgHandler.destroy();
		if (this._waitTimer) {
			egret.clearTimeout(this._waitTimer);
			this._waitTimer = null;
		}
	}

	public OpenGuajiBtn(guajiType: number, id: number) {
		if (id == Global.playerDto.id) {
			if (guajiType == 1) {
				this.uiLayer._guajiBtn.visible = true;
				this.uiLayer._guajiImg.visible = true;
			} else {
				this.uiLayer._guajiBtn.visible = false;
				this.uiLayer._guajiImg.visible = false;
			}
		}
		var length = this.gameDatas.roomInfo.createinfo.roomSize;
		for (var i = 0; i < length; i++) {
			if (this.players[i] && this.players[i].visible) {
				if (this.players[i].getPlayerId() == id) {
					if (guajiType == 1) {
						this.players[i]._guajiImg.visible = true;
					} else {
						this.players[i]._guajiImg.visible = false;
					}
				}
			}
		}
	}

	/**
	 * 更新房间信息UI
	 */
	public updateRoomInfoUI(): void {
		let self = this;
		if (self.gameDatas.gameType == GAME_TYPE.COIN) {
			if (self.uiLayer._ruleBtn) {
				self.uiLayer._ruleBtn.visible = true;

			}
			if (self.uiLayer._voiceBtn) {
				self.uiLayer._voiceBtn.visible = false;
			}
			if (self.uiLayer._inviteBtn) {
				self.uiLayer._inviteBtn.visible = false;
			}
			if (self.uiLayer.roomIdLab) {
				self.uiLayer.roomIdLab.visible = false;
			}
			// if (self.uiLayer.gameCntLab) {
			// 	self.uiLayer.gameCntLab.visible = false;
			// }
			// if (self.uiLayer._zoomButton) {
			// 	self.uiLayer._zoomButton.currentState = "gold";
			// }
		} else {
			// egret.log("self.gameDatas.roomInfo.room_id" + self.gameDatas.roomInfo.room_id);
			if (self.gameDatas.roomInfo) {
				self.uiLayer.roomIdLab.text = GameLangs.gameRoomId.format(self.gameDatas.roomInfo.room_id);
				self.uiLayer.gameCntLab.text = GameLangs.gamePlayCntInfo.format(self.gameDatas.roomInfo.done_game_cnt, self.gameDatas.roomInfo.can_game_cnt);
			}
		}
	}
	public openAccountLayer(datas: model.GameAccountInfo) {
		this.msgHandler.stopHandleMsg();
		let layer = new Layers.AccountLayer();

		layer.open();
		layer.setDatas(datas, this.gameDatas);
		layer.addEventListener(Layers.Event.CLOSE, this.closeAccountLayer, this);
		// var blurFliter = new egret.BlurFilter(1, 1);
		// //颜色矩阵数组
		// var colorMatrix = [
		//     0.3, 0.6, 0, 0, 0,
		//     0.3, 0.6, 0, 0, 0,
		//     0.3, 0.6, 0, 0, 0,
		//     0, 0, 0, 1, 0
		// ];
		// var blurFliter = new egret.BlurFilter(5 , 5);
		// // var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		// this.filters = [blurFliter];
	}
	protected closeAccountLayer() {
		this.msgHandler.doAllowHandleMsg();
	}
	//更新玩家信息
	public updatePlayerInfo(info: model.PLAYER_INFO) {
		if (this.gameDatas.myPos > -1) {//如果自己已经坐下了
			let index = (this.gameDatas.roomInfo.createinfo.roomSize + info.zuoweiIndex - this.gameDatas.myPos) % this.gameDatas.roomInfo.createinfo.roomSize;
			let player = this.players[index];
			if (player) {
				player.updateInfo(info.UserInfo);
			} else {
				DEBUG && egret.error(`Player ${info.playerId} Is Not Exist!!!!`)
			}
		}
	}
	//通过playerid获取

	public getPlayerById(id: number): any {
		for (let key in this.players) {

			if (this.players[key].getPlayerId() && this.players[key].getPlayerId() == id)
				return this.players[key];
		}
		return null;
	}

	//通过playerid获取性别
	public getPlayerByIdSex(id: number): any {
		let arrLen = Array.length;
		for (let key in this.players) {
			if (this.players[key].getPlayerId() == id) {
				return this.players[key].sex;
			}

		}
		return null;
	}
	/**
	 * 设置是否显示准备菜单
	 */
	public isShowReadyMenu(visible: boolean) {

	}
	//更新玩家筹码数
	public updatePlayerChips(id: number, chips: number, isDoAni?: boolean): void {
		let player = this.getPlayerById(id);
		if (player) {
			player.updateChips(chips, isDoAni);
		} else {
			DEBUG && egret.error(`Player ${id} Is Not Exist!!!!`)
		}
	}
	/**
	 * 设置用户是否可见
	 */
	public setPlayerVisible(id: number, visible: boolean): void {
		let player = this.getPlayerById(id);
		if (player) {
			player.visible = visible;
		} else {
			DEBUG && egret.error(`Player ${id} Is Not Exist!!!!`)
		}
	}
	//设置玩家状态
	public setPlayerStatu(id: number, status: PLAYER_UI_STATU) {
		let player = this.getPlayerById(id);
		if (player) {
			player.status = status;
		} else {
			DEBUG && egret.error(`Player ${id} Is Not Exist!!!!`)
		}
	}
	public doPlayerMethod(playerId: number, func: Function, ...args) {
		var p = this.getPlayerById(playerId);
		if (p) {
			func.apply(p, args);
		}else{
			DEBUG && egret.error(`Player ${playerId} Is Not Exist!!!!`)
		}
	}


	/**
	 * 设置所有玩家的状态
	 */
	public setAllPlayerStatu(status: PLAYER_UI_STATU) {
		var length = this.gameDatas.roomInfo.createinfo.roomSize;
		for (var i = 0; i < length; i++) {
			if (this.players[i] && this.players[i].visible) {
				this.players[i].status = status;
			}

		}
	}
	public clearPlayer(id: number) {
		let player:PlayerBase = this.getPlayerById(id);
		if (player) {
			player.clear();
		} else {
			// DEBUG && 
		}
	}


	// //重置玩家的信息及其显示，但不清除座位ID
	// public resetPlayerById(id: number) {
	// 	var p = this.getPlayerById(id);
	// 	if (p) {
	// 		p.clearInfo();
	// 	} else {
	// 		egret.warn('Error:', 'PlayerId-' + id + ' no seat!No need execute resetPlayerById()!');
	// 	}
	// }
}