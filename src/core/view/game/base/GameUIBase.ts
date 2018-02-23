class GameUIBase extends eui.Component {
	/**
	 * 充值按钮
	 */
	public _rechargeBtn: UI.CommonBtn;
	/**
	 * 搜索按钮组
	 */
	public _zoomButton: UI.Zoom;


	/**
	 * 解散房间按钮
	 */
	public _dissolveBtn: UI.CommonBtn;

	/**
	 * 设置按钮
	 */
	public _SetBtn: UI.CommonBtn;

	/**
	 * 语音按钮
	 */
	public _voiceBtn: UI.CommonBtn;
	/**
	 * 邀请好友按钮
	 */
	public _inviteBtn: UI.CommonBtn;
	/**
	 * 规则
	 */
	public _ruleBtn: UI.CommonBtn;
	/**
	 * 房间ID
	 */
	public roomIdLab: eui.Label;
	/**
	 * 房间局数
	 */
	public gameCntLab: eui.Label;
	public gameDatas: GameDatasBase;

	public chatBox: ChatBox;
	/**
	 * 聊天列表
	 */
	public static talkList: eui.ArrayCollection = new eui.ArrayCollection();

	public _chatBtn: UI.CommonBtn;

	public _scene: GameSceneBase;

	public _guajiImg: eui.Image;
	public _guajiBtn: UI.CommonBtn;

	/** 显示弹幕的区域 */
	public _dangmuGroup:eui.Group;

	public constructor(private num: number) {
		super();

	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public init(gameDatas: GameDatasBase, scene: GameSceneBase) {
		egret.log("init get daze");
		this.gameDatas = gameDatas;
		this._scene = scene;
		var self = this;
		let eg = egret;

		if (self._dissolveBtn) {
			self._dissolveBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openDissolveBtn, self);
		}
		if (self._rechargeBtn) {
			self._rechargeBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openRechange, self);
		}
		if (self._SetBtn) {
			self._SetBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openSetBtn, self);
		}
		if (self._chatBtn) {
			egret.log("GameUIBase add _chatBtn event");
			self._chatBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openchatBtn, self);
			//注册接收到对话事件，更新内容
			EventManager.register(TalkEvent.Talk, this.updataTalkContext, this, 11);		
		}
		if (self._inviteBtn) {
			self._inviteBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openinviteBtn, self);
		}
		if (self._ruleBtn) {
			self._ruleBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openruleBtn, self);
		}
		if (self._guajiBtn) {
			self._guajiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.OpenGuaJiBtn, self);
		}
		if(self._voiceBtn){
			if (eg.Capabilities.runtimeType === eg.RuntimeType.WEB) {
				this._voiceBtn.visible = false;
				// self._voiceBtn.icon = "appdownload_icon_png";	
				// self._voiceBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openAppDownLayer, self);
			}
			else {
				self._voiceBtn.addEventListener(eg.TouchEvent.TOUCH_BEGIN, self.startRecord, self);
				self._voiceBtn.addEventListener(eg.TouchEvent.TOUCH_END, self.stopRecord, self);
				self._voiceBtn.addEventListener(eg.TouchEvent.TOUCH_RELEASE_OUTSIDE, self.stopRecordAndOutSide, self);
			}
		}

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
	}
	protected openAppDownLayer() {
		new Layers.AppDownLoadLayer().open();
	}
	protected openRechange() {
		new Layers.RechargeLayer(0).open();
	}
	/**
   * 开始录音
   */
	protected startRecord() {
		egret.log("startRecord");
		if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
			Toast.launch(GameLangs.record_not_suport_tip);
		} else if (UI.Recorder.instance.startRecord()) {
			this.addChild(UI.Recorder.instance);
		}
	}
    /**
     * 录音结束
     */
	protected stopRecord() {
		egret.log("stopRecord");
		UI.Recorder.instance.stopRecord()
	}
    /**
     * 录音结束
     */
	protected stopRecordAndOutSide() {
		egret.log("stopRecordAndOutSide");
		UI.Recorder.instance.stopRecord()
	}
	protected openinviteBtn() {
	}
	protected OpenGuaJiBtn() {
		net.SendMsg.create({ TuoGuanPlayerId: Global.playerDto.id }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GUAJI_TYPE).send();
		// this._guajiBtn.visible = false;
	}

	protected onTouchTap(event: egret.TouchEvent): void {
		var target = event.target;
		if ((this.chatBox && this.chatBox.parent && this.chatBox.hitTestPoint(event.stageX, event.stageY))
			|| this._chatBtn == target
			// || (this._zoomButton.isShow && this._zoomButton.hitTestPoint(event.stageX, event.stageY))
		) {
			return;
		}
		if (this.chatBox && this.chatBox.parent) {
			this.openchatBtn();
		}

		// this.onAniBoxChange();
	}

	public on_G2C_CHAT(chatStr, playerId): void {
		var sex = this._scene.getPlayerByIdSex(playerId);
		var zone = this._scene.getPlayerById(playerId);
		egret.log("playerIdplayerId" + playerId, "sex::" + sex, chatStr);
		// if (zone) {
		// 	zone.addMessage(chatStr, sex);
		// }
		if (zone) {
			//百人牛牛测试用：
			if (chatStr.indexOf('{') > -1 && <TalkContext>(JSON.parse(chatStr))) {
				zone.addMessage(chatStr, sex);
				// if(playerId != Global.playerDto.id){
				let talkevent: TalkEvent = new TalkEvent(TalkEvent.Talk);
				// let talkContext: any = JSON.parse(chatStr);
				let talkContext = JSON.parse(chatStr);
				talkContext.playerDto = this.gameDatas.playerDatas[talkContext.id].UserInfo;
				talkevent.data = talkContext;
				EventManager.dispatchEvent(talkevent);
				// }
			} else {
				zone.addMessage(chatStr, sex);
			}
		} else {
			//旁观玩家也能进行打字聊天
			if (chatStr.indexOf('{') > -1 && <TalkContext>(JSON.parse(chatStr))) {
				let talkevent: TalkEvent = new TalkEvent(TalkEvent.Talk);
				let talkContext = JSON.parse(chatStr);
				talkContext["playerDto"] = this.gameDatas.playerDatas[talkContext.id].UserInfo;
				talkevent.data = talkContext;
				EventManager.dispatchEvent(talkevent);
			} 
		}
		return zone;
	}

	public openchatBtn(e?: egret.TouchEvent): void {
		if (e && e.data && e.data.text) {
			// this._scene.players[0].addMessage(e.data.text, this.gameDatas.roomInfo.playerId);
			// this._scene.players[1].addMessage(e.data.text, this.gameDatas.roomInfo.playerId);
			// this._scene.players[2].addMessage(e.data.text, this.gameDatas.roomInfo.playerId);
			// this._scene.players[3].addMessage(e.data.text, e.data.type, this.gameDatas.roomInfo.playerId);
			// this._scene.players[4].addMessage(e.data.text, e.data.type, this.gameDatas.roomInfo.playerId);

		}

		if (this.chatBox) {
			if (this.chatBox.parent) {
				// if (!this._zoomButton.isShow) {
				this.parent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
				// }
				this.removeChild(this.chatBox);
				return;
			} else {
				this.addChild(this.chatBox);
				this.chatBox.once("close", this.openchatBtn, this);
				this.parent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
				if (GameUIBase.talkList.length >= 0) {
					// this.chatBox.chatTalkBox.array = this.talkList;
					this.chatBox.chatTalkBox.updataContext();
				}
			}
		} else {
			this.chatBox = new ChatBox(this.num);
			this.addChild(this.chatBox);
			this.chatBox.once("close", this.openchatBtn, this);
			this.parent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		}

		// if (this.chatBox && !this._scene.getPlayerById(Global.playerDto.id)) {
		// 	egret.log("玩家不存在！" + this._scene.getPlayerById(Global.playerDto.id));
		// 	this.chatBox.tabBar.selectedIndex = 2;
		// 	this.chatBox.viewStack.selectedIndex = 2;
		// 	this.chatBox.tabBar.touchChildren = false;
		// 	this.chatBox.tabBar.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
		// 		Toast.launch("旁观玩家只能进行打字聊天！");
		// 	}, this.chatBox.tabBar);
		// }
	}

	/**
	 * 刷新解散房间(跟退出房间公用一个按钮)
	 */
	public updateDissolveBtn() {
		egret.log("caonima");
		let gameDatas = this.gameDatas;
		if (this.gameDatas.gameType === GAME_TYPE.CARD) {//如果是房卡模式
			if (
				//如果自己是房主,那么一定可以解散房间
				gameDatas.getSelfPlayerDatas().zuoweiIndex === 0
				//如果自己不是房主,并且游戏已经开始了,并且自己参与游戏中,也可以解散房间
				|| (gameDatas.roomInfo.done_game_cnt !== 0 && gameDatas.isSelfPlayingGame())
			) {
				this._dissolveBtn.icon = "yc_icon_png";
				this._dissolveBtn.name = "dissolve";
			} else {
				this._dissolveBtn.icon = "tc_icon_png";
				this._dissolveBtn.name = "quit";
			}
		} else {//金币场
			this._dissolveBtn.icon = "tc_icon_png";
			this._dissolveBtn.name = "quit";
		}


	}

	public openDissolveBtn(event: egret.TouchEvent): void {
		net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_LEAVE_SCORE_ROOM).send();
	}

	public openSetBtn(event: egret.TouchEvent): void {
		new Layers.SettingLayer("game").open();
	}

	protected openruleBtn(event: egret.TouchEvent): void {
		
	}

	private updataTalkContext(event: egret.Event) {
		let context = event.data;
		GameUIBase.talkList.addItem(context);
	}

	/** 显示弹幕,暂时移到百人牛牛那里 */
	// private showDangmu(event:egret.Event){
	// 	let num = this._dangmuGroup.height / 33;
	// 	egret.log("group的高等平均数："+num);
	// 	//获取1 - n的随机数
	// 	let randomNum = Math.floor(Math.random() * num);
	// 	egret.log("随机数："+randomNum);

	// 	let data = event.data;

	// 	let img = data.playerDto.headImages?data.playerDto.headImages:"defaultHead_png";
	// 	let content = data.context;
	// 	let id = data.id;

	// 	let danmu = new UI.Danmu(img,content);
	// 	danmu.x = this._dangmuGroup.width;
	// 	danmu.y = danmu.height * randomNum;
	// 	this._dangmuGroup.addChild(danmu);
	// 	// danmu.startMove();
	// }

	public onExit(){
		if (this._chatBtn) {
			egret.log("GameUIBase removeChild");
			GameUIBase.talkList = null;
			GameUIBase.talkList = new eui.ArrayCollection();
			EventManager.remove(TalkEvent.Talk, this.updataTalkContext, this);
		}
	}
}