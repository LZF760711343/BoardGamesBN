namespace niuniu.brnn {
	export class GameUI extends GameUIBase {
		private _namelabel: eui.Label;
		private _diamondlabel: eui.Label;
		private _timeNow: eui.Label;
		public _wangpng: eui.Image;
		public _play: egret.tween.TweenGroup;
		/**
		* 金币余额
		*/
		private _goldlabel: eui.Label;
		/**
		 * 规则点击按钮
		 */
		public _ruleBtn: UI.CommonBtn;
		/**
		 * 钻石点击按钮(百人牛牛暂时没有房间内购买的按钮)
		 */
		// private _diamondAddbtn: UI.CommonBtn;
		/**
		 * 玩家列表按钮
		 */
		public _playGameLabelTabBtn: UI.CommonBtn;
		/**
		 * 金币点击按钮
		 */
		private _goldAddBtn: UI.CommonBtn;

		private cpt: eui.Component;
		private isshow: boolean = true;
		public gameDatas: GameDatas;
		public _histroyBtn: UI.CommonBtn;

		private biaoqingCount: number = 0;
		// private sendStart:number = 0;
		//记录上次发表情的时间
		private sendEnd: number = 0;

		/** 规则面板 */
		private _ruleInfo: eui.Group;

		/** 换桌 */
		public _huanZhouBtn: UI.CommonBtn;

		public constructor() {
			super(GAME_ID.GAME_ID_HZ_BRNN);
		}
		protected childrenCreated(): void {
			super.childrenCreated();

			var self = this;
			// self.initdata();

			this._histroyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHistroyLayer, this);
			/**
		     * 规则点击事件
			 */
			this._ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRulesLayer, this);
			/**
		     * 钻石点击事件
			 */
			// this._diamondAddbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.opendiamondAddLayer, this);
			/**
		     * 玩家列表点击事件
			 */
			this._playGameLabelTabBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playGameLabelTabLayer, this);
			/**
		     * 金币点击事件
			 */
			// this._goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldAddLayer, this);

			// this._wangpng.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.openWanglistLayer, this);
			// this._wangpng.addEventListener(egret.TouchEvent.TOUCH_END, this.endWanglistLayer, this)
			// this._wangpng.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.endWanglistLayer, this)


			if (self._zoomButton._SetBtn) {
				self._zoomButton._SetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openSetBtn, self);
			}
			if (self._zoomButton._dissolveBtn) {
				self._zoomButton._dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openDissolveBtn, self);
			}
			// this._zoomButton._dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitGame, this);
			// this._zoomButton._SetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetBtn, this);
			if (self._dangmuGroup) {
				EventManager.register("DanmuTalk", this.showDangmu, this);
			}

			if (this.parent)
				this.parent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRuleGroup, this);
			// this._ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openRuleGroup,this);
		}
		private onExitGame() {
			net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_LEAVE_SCORE_ROOM).send();
		}
		private onSetBtn() {
			new Layers.SettingLayer("game").open();
		}
		public timerFunc() {
			// this._timeNow.text = new Date().Format("hh:mm");
		}

		public start() {
			this._play.play(0);
		}
		/**
	   * 规则按钮方法
	   */
		private openRulesLayer(event: egret.TouchEvent): void {
			// egret.log("11111");
			// new Layers.RulesLayer().open();
			if (this._ruleInfo && this._ruleInfo.right === -233)
				egret.Tween.get(this._ruleInfo).to({ right: 0 }, 2000);
			if (this._ruleInfo && this._ruleInfo.right === 0)
				egret.Tween.get(this._ruleInfo).to({ right: -233 }, 2000);
		}

		/**
		 * 钻石按钮方法
		 */
		private opendiamondAddLayer(event: egret.TouchEvent): void {
			new Layers.RechargeLayer(1).open();
		}
		public openDissolveBtn(event: egret.TouchEvent): void {
			//如果自己这一局下注了,那么得等下局开始才给换桌
			if (this.gameDatas.selfInChipsList[0]) {
				Toast.launch(GameLangs.gameNotOverTip2);
				return;
			}
			net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_LEAVE_SCORE_ROOM).send();
		}
		/**
		 * 玩家列表按钮方法
		 */
		private playGameLabelTabLayer(event: egret.TouchEvent): void {

			new niuniu.brnn.GameListLayer().open();
			net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GET_IN_ROOM_PLAYERS).send();
		}

		/** 打开走势图 */
		private openHistroyLayer() {
			let layer = new Layers.HistroyBox();
			layer.open();
			layer.initialization(this.gameDatas.winRewardList);
		}

		/**
		 * 金币按钮方法
		 */
		private goldAddLayer(event: egret.TouchEvent): void {
			new Layers.RechargeLayer(0).open();
		}






		public changeCHIPS(num: number) {
			// this._goldlabel.text = num + "";
		}
		public changejewel(num: number) {
			// this._diamondlabel.text = num + "";
		}


		private endWanglistLayer(event: egret.TouchEvent): void {
			if (this.cpt != null) {
				this.stage.removeChild(this.cpt);
				this.cpt = null;
			}
		}

		private initdata() {
			var self = this;
			// self._diamondlabel.text = Global.playerDto.diamond + "";
			// self._goldlabel.text = Global.playerDto.gold + "";

			if (Global.playerDto.diamond > 100000) {
				// this._diamondlabel.text = Math.floor(Global.playerDto.diamond / 10000) + GameLangs.wan;
			} else {
				// this._diamondlabel.text = Global.playerDto.diamond + "";
			}

			if (Global.playerDto.gold > 100000) {
				// this._goldlabel.text = Math.floor(Global.playerDto.gold / 10000) + GameLangs.wan;
			} else {
				// this._goldlabel.text = Global.playerDto.gold + "";
			}


			// self._namelabel.text = Global.playerDto.nickName;

			// self._timeNow.text = new Date().Format("hh:mm");
		}

		public on_G2C_CHAT(chatStr, playerId): void {

			var sex = this._scene.getPlayerByIdSex(playerId);
			var zone = this._scene.getPlayerById(playerId);
			// egret.log("playerIdplayerId" + playerId, "sex::" + sex, chatStr);

			// let type;
			// //非json数据，计算发表情的数量，目前限制只发表情了，这是为了记录发的是否是语音
			// if(!(chatStr.indexOf('{') > -1)){
			// 	let data = chatStr.split("@");
			// 	type = parseInt(data[0].substr(1, chatStr.length));
			// }

			if (zone) {
				let talkContext: any;
				if (chatStr.indexOf('{') > -1 && <TalkContext>(JSON.parse(chatStr))) {
					zone.addMessage(chatStr, sex);
					let talkevent: TalkEvent = new TalkEvent(TalkEvent.Talk);
					talkContext = JSON.parse(chatStr);
					talkContext.playerDto = this.gameDatas.playerDatas[talkContext.id].UserInfo;
					talkevent.data = talkContext;
					EventManager.dispatchEvent(talkevent);
				}
				//百人牛牛测试用：
				else {
					// talkContext = {id:playerId,context:chatStr,playerDto:this.gameDatas.playerDatas[playerId].UserInfo};
					zone.addMessage(chatStr, sex);
				}
				// EventManager.createEventByName("DanmuTalk").dispatchEventWith("DanmuTalk",false,talkContext);
			} else {
				let talkContext: any;
				//旁观玩家也能进行打字聊天
				if (chatStr.indexOf('{') > -1 && <TalkContext>(JSON.parse(chatStr))) {
					let talkevent: TalkEvent = new TalkEvent(TalkEvent.Talk);
					talkContext = JSON.parse(chatStr);
					talkContext["playerDto"] = this.gameDatas.playerDatas[talkContext.id].UserInfo;
					talkevent.data = talkContext;
					EventManager.dispatchEvent(talkevent);
				} else {
					talkContext = { id: playerId, context: chatStr, playerDto: this.gameDatas.playerDatas[playerId].UserInfo };
				}
				//发出弹幕的事件
				EventManager.createEventByName("DanmuTalk").dispatchEventWith("DanmuTalk", false, talkContext);
			}
			// egret.log("zone:"+zone);
			return zone;
		}

		/** 打开聊天面板，目前先限制发表情，日后需要在这里修改 */
		public openchatBtn(e?: egret.TouchEvent): void {
			super.openchatBtn(e);

			//限制发表情
			if (this.chatBox /*&& !this._scene.getPlayerById(Global.playerDto.id)*/) {
				egret.log("玩家不存在！" + this._scene.getPlayerById(Global.playerDto.id));
				// this.chatBox.tabBar.visible = false;
				this.chatBox.currentState = "brnn";
				this.chatBox.tabBar.selectedIndex = 1;
				this.chatBox.viewStack.selectedIndex = 1;
				this.chatBox.tabBar.touchChildren = false;
				this.chatBox.tabBar.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
					// Toast.launch("旁观玩家只能进行打字聊天！");
					Toast.launch("玩家只能发表情！");
				}, this.chatBox.tabBar);
			}

			//屏幕上一个人发的同屏表情不能超过三个

		}

		/** 显示弹幕 */
		private showDangmu(event: egret.Event) {
			let num = this._dangmuGroup.height / UI.Danmu.DAMUN_HEIGHT;
			// egret.log("group的高等平均数："+num);
			//获取1 - n的随机数
			let randomNum = Math.floor(Math.random() * num);
			// egret.log("随机数："+randomNum);
			let data = event.data;

			let img = data.playerDto.headImages ? data.playerDto.headImages : "defaultHead_png";
			let content = data.context;
			let id = data.id;

			// let danmu = new UI.Danmu(img,content,id);
			let danmu = UI.Danmu.create(img, content, id);
			danmu.x = this._dangmuGroup.width;
			danmu.y = danmu.height * randomNum;
			this._dangmuGroup.addChild(danmu);
			// danmu.startMove();
		}

		private sumGroupDanmuById(id: number) {
			let count: number = 0;
			for (let i = 0; i < this._dangmuGroup.numChildren; i++) {
				let danmu: UI.Danmu = this._dangmuGroup.getChildAt(i) as UI.Danmu;
				let danmuId = danmu.danmuInfo.id;
				if (id === danmuId) {
					count++;
				}
			}

			return count;
		}

		/**
		 * 是否语音按钮显示，必须是王才有
		 */
		public isShowVoiceBtn(isShow: boolean) {
			if (!this._voiceBtn) {
				return;
			}
			//web下无论如何都是不显示的
			if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
				this._voiceBtn.visible = false;
				return;
			}

			if (isShow)
				this._voiceBtn.visible = true;
			else
				this._voiceBtn.visible = false;
		}

		private closeRuleGroup() {
			if (this._ruleInfo.right >= 0)
				egret.Tween.get(this._ruleInfo).to({ right: -233 }, 2000);
		}

		public onExit() {
			super.onExit();
			//移除弹幕发送事件		
			if (this._dangmuGroup) {
				EventManager.remove("DanmuTalk", this.showDangmu, this);
			}
		}

	}



	class WanglistItem extends eui.ItemRenderer {
		private _namelabel: eui.Label;

		public constructor() {
			super();
			this.skinName = WangListItemSkin;
		}
		public dataChanged(): void {
			this._namelabel.text = this.data.nickName;
		}
	}
}
