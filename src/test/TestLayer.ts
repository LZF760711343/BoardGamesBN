namespace Debug {
	export let instance: TestLayer;
	export let EVENT = {
		GET_MJ: "getMj",
		GET_PK: "getPK",
		SET_FIRST_ID: "setFirstId",
		SET_MAX_ID: "setMaxId",
		SET_PLAY_CARD: "setPlayCard"
	};
	export class TestLayer extends eui.Component {
		public _changeBtn: eui.ToggleButton;
		public _robotBtn: eui.ToggleButton;

		public _btnGroup: eui.Group;
		public _sendBtn: eui.Button;
		public _delBtn: eui.Button;
		public _sendLogBtn: eui.Button;

		/**
		 * 要发送的协议名/协议号
		 */
		public _inputMsg: eui.EditableText;
		/**
		 * 发送的数据
		 */
		public _inputDatas: eui.EditableText;
		public _tabBar: eui.TabBar;

		private curStage: string = "send";
		private selectCards: number[] = [];

		public _clearBtn: eui.Button;


		private stageList: string[] = [
			"send",
			"mj",
			"poker",
			"server"
		];
		public _subBtn: eui.Button;
		public _mjText: eui.EditableText;

		public _setCardBtn1: eui.Button;
		public _setCardBtn2: eui.Button;
		public _setCardBtn3: eui.Button;
		public setFirstIdBtn: eui.Button;
		public _setMaxIdBtn: eui.Button;

		public _idText: eui.EditableText;

		public _portList: eui.List;
		public _ipList: eui.List;
		public _setLoginInfoBtn: eui.Button;
		public constructor() {
			super();
			this.skinName = TestLayerSkin;
			instance = this;
			this.percentWidth = this.percentHeight = 100;
		}
		protected onRobotIsOn() {
			if (this._robotBtn.selected) {
				ROBOT.instance.startTimer();
				// this.currentState = this.curStage;
			} else {
				ROBOT.instance.stopTimer();
				// this.currentState = "hide";
			}
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			let self = this;
			self._changeBtn.addEventListener(eui.UIEvent.CHANGE, self.changeHandler, self);
			self._robotBtn.addEventListener(eui.UIEvent.CHANGE, self.onRobotIsOn, self);


			self._sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.sendMsg, self);
			self._subBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSubmit, self);
			// self._btnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onAddPk, self);
			// 
			self._tabBar.addEventListener(egret.Event.CHANGE, self.chanTab, self);
			self._delBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.delCard, self);

			// this.createPokerCard();
			self._setCardBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, self.sendSetCardEvent, self);
			self._setCardBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, self.sendSetCardEvent, self);
			self._setCardBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, self.sendSetCardEvent, self);
			self._setMaxIdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.delCard, self);

			self.setFirstIdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.sendSetFirstIdEvent, self);
			self._clearBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clear, self);
			if (self._sendLogBtn) {
				self._sendLogBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSendLog, self);
			}
			// self._delBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.delCard, self);
			// self._delBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.delCard, self);
			this.createMjBtn();
			this.initLoginIp();
		}
		private onSendLog() {
			Utils.LogManage.instance.sendLog();
		}
		private initLoginIp() {
			let ipList = [
				"192.168.0.193",
				// "game.gzlf2017.cn",
				"192.168.0.200",
				"192.168.0.182",
				"www.gzqidong.cn",
				"www.hongzhegame.com",
			];
			let portList = [
				"10101",
				"10102",
				"10103",
			];
			this._ipList.dataProvider = new eui.ArrayCollection(ipList);
			this._portList.dataProvider = new eui.ArrayCollection(portList);
			let str = egret.localStorage.getItem("debugInfo");
			let debugInfo;
			if (!str) {
				debugInfo = {
					ip: ipList[3],
					port: portList[2]
				}
			} else {
				debugInfo = JSON.parse(str);
			}
			this._portList.selectedIndex = portList.indexOf(debugInfo.port);
			this._ipList.selectedIndex = ipList.indexOf(debugInfo.ip);
			this._setLoginInfoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setIpInfo, this);
			net.setIpAndPort(debugInfo.ip, parseInt(debugInfo.port));
		}
		public shareImage(target: egret.DisplayObject): void {
			var renderTexture = new egret.RenderTexture();
			renderTexture.drawToTexture(target);//渲染到临时画布
			let img = new Utils.HtmlWebImgView();
			img.init();
			img.show(renderTexture.toDataURL('image/jpeg'), Global.sWidth / 4, Global.sHeight / 4, Global.sWidth / 2, Global.sHeight / 2);
		}
		private setIpInfo() {
			Config.SERVER_URL = this._ipList.selectedItem;
			Config.SERVER_PORT = parseInt(this._portList.selectedItem);
			let debugInfo = {
				ip: Config.SERVER_URL,
				port: Config.SERVER_PORT + ""
			}
			egret.localStorage.setItem("debugInfo", JSON.stringify(debugInfo));
			LocalDatas.datas.saveData();
			net.setIpAndPort(Config.SERVER_URL, Config.SERVER_PORT);
			Toast.launch("设置成功!")
		}
		private clear() {
			this._mjText.text = "";
			this.selectCards = [];
		}
		private sendSetMaxIdEvent() {
			let id = parseInt(this._idText.text);
			if (!isNaN(id)) {
				this.dispatchEventWith(EVENT.SET_MAX_ID, false, id);
			}
		}
		private sendSetFirstIdEvent() {
			let id = parseInt(this._idText.text);
			if (!isNaN(id)) {
				this.dispatchEventWith(EVENT.SET_FIRST_ID, false, id);
			}
		}
		private sendSetCardEvent(event: egret.TouchEvent) {
			this.dispatchEventWith(EVENT.SET_PLAY_CARD, false, { cardStr: this._mjText.text, id: parseInt(event.target.name) });
		}
		private delCard() {
			// if (this.selectCards.length) {
			// 	this.selectCards.pop();
			// 	this._mjText.text = PokerBase.cardValuesToStr(this.selectCards);
			// }
		}
		private onAddPk(event: egret.TouchEvent) {
			// let target = event.target;
			// if (target instanceof eui.Button) {
			// 	if (this.selectCards.length >= 25) {
			// 		Toast.launch("您输入的牌的数量已超过25张!!");
			// 		return;
			// 	}
			// 	let temp = parseInt(target["data"]);
			// 	if (this.selectCards.filter((value, indexedDB) => temp === value).length >= 2) {
			// 		Toast.launch("相同的牌不能超过两张!!!!");
			// 		return;
			// 	}
			// 	this.selectCards.push(temp);
			// 	// this._mjText.text = PokerBase.cardValuesToStr(this.selectCards);
			// 	this._mjText.text = PokerBase.cardValuesToStr(this.selectCards);
			// }
		}
		private onAddMj(event: egret.TouchEvent) {
			let target = event.target;
			if (target instanceof eui.Button) {
				let temp = parseInt(target["data"]);
				this.selectCards.push(temp);
				this._mjText.text = majiang.Majiang.cardValuesToStr(this.selectCards);
			}
		}
		private onSubmit() {
			this.shareImage(Main.instance);
			// let list = egret.DisplayObjectContainer.$EVENT_REMOVE_FROM_STAGE_LIST;
			// let arrLen = list.length;
			// egret.log("onSubmit:", arrLen)
			// for (let i = 0; i < arrLen; i++) {
			// 	egret.log(list[i]);
			// }
			// let test = new majiang.Majiang();
			// egret.log("onSubmitL:", test.checkHu(this.selectCards));
			// // Majiang
			// egret.log("this.selectCards:", this.selectCards)
			// private changeHandler(evt: eui.UIEvent) {
			// if (this._changeBtn.selected) {
			// this._changeBtn.selected = !this._changeBtn.selected;
			// this.changeHandler(null);
			// this.dispatchEventWith(EVENT.GET_MJ, false, this._mjText.text);
			this.dispatchEventWith(EVENT.GET_MJ, false, this.selectCards);
			// let cards = dashi.Poker.createPokerCards(this.selectCards, CARD_VALUE.VALUE_10);
			// let pokerCards:dashi.Card[] = [];
			// cards.forEach((value: dashi.PokerCard, index: number) => {
			// 	pokerCards.push(this.createDashiCard(value));
			// });
			// let layer = new dashi.SelectHideCardLayer(pokerCards);
			// layer.open();
			// this.testPoker(shuangjian.Poker.createPokerCards(this.selectCards));
			// this.testDashi();
		}
		private testDashi() {
			// let poker = new dashi.Poker();
			// poker.mainSuit = SUIT_VALUE.CLUBS;
			// poker.init(PokerBase.convertStrToCardValues("♣2,♣2,♣3,♣3,♣4,♣4,♣5,♣5,♣6,♣6,♣7,♣7,♣9,♣9,♣Q,♣Q,♣K,♣K", (value: CARD_VALUE, suit: SUIT_VALUE) => {
			// 	return (suit << 4) + value;
			// }
			// ), CARD_VALUE.VALUE_10);
			// // poker.setMainSuit(SUIT_VALUE.CLUBS);
			// // // poker.init([33, 34, 35]);


			// // let lastHandCard = dashi.HandCard.create();
			// // lastHandCard.init(
			// // 	// 	// dashi.Poker.createPokerCards(this.selectCards, CARD_VALUE.VALUE_10, SUIT_VALUE.CLUBS),
			// // 	,
			// // 	CARD_VALUE.VALUE_10);
			// poker.addHandCard(dashi.Poker.convertStrToPokerCards(
			// 	"♣A,♣A,♦10,♦10,♣Q,♣Q",
			// 	// "♥10,♣10,♣10,♦10,♠8,♠7,♠7,♠6,♠6,♠5,♠5,♠4,♥J,♥5,♥4,♥3,♣J,♦J,♦5,-D,-X", 
			// 	CARD_VALUE.VALUE_10, SUIT_VALUE.CLUBS), 1);
			// poker.firstId = 1;
			// poker.cal();
			// egret.log("result:", poker.checkCardsValid(dashi.Poker.convertStrToPokerCards(this._mjText.text, CARD_VALUE.VALUE_10, SUIT_VALUE.CLUBS)));

		}
		// private testPoker(cards: shuangjian.PokerCard[]) {
		// 	// let poker = new shuangjian.Poker();
		// 	// poker.init(PokerBase.convertStrToCardValues("♣2,♣2,♣3,♣3,♣4,♣4,♣5,♣5,♣6,♣6,♣7,♣7,♣8,♣8,♣Q,♣Q,♣J,♣A,♣A,♣K,♣K"));
		// 	// let handCard = new shuangjian.HandCard();
		// 	// handCard.init(cards, true);
		// 	// poker.lastHandType = handCard.handType;
		// 	// poker.lastHandValue = handCard.handValue;
		// 	// poker.lastSubHandType = handCard.handSubType;
		// 	// poker.findProbHandCards();
		// 	// ;
		// 	// egret.log("testPoker:", poker.checkCardsValid(cards, false))

		// }

		// private createDashiCard(pokerCard: dashi.PokerCard) {
		// 	// let card = dashi.Card.create();

		// 	// card.setPokerCard(pokerCard);
		// 	// return card;
		// }
		private createPokerCard() {
			// this.selectCards = PokerBase.convertStrToCardValues("♣A,♣A,♣10,♣10,♥10,♥10,-X,-X");
			// this._mjText.text = PokerBase.cardValuesToStr(this.selectCards);

			// let func = (value: CARD_VALUE, suit: SUIT_VALUE) => {
			// 	return (value << 4) + suit;
			// }
			// let funcCreateBtn = (value: CARD_VALUE, suit: SUIT_VALUE) => {
			// 	let cardValue = func(value, suit);
			// 	// let pokerCard = shuangjian.PokerCard.create();
			// 	let button = new eui.Button();
			// 	button.skinName = TestButtonSkin;
			// 	button.width = 80;
			// 	button.height = 40;
			// 	this._btnGroup.addChild(button);
			// 	button.label = PokerBase.cardValueToStr(cardValue);
			// 	button.touchChildren = false;
			// 	button["data"] = cardValue;
			// };
			// for (let i = SUIT_VALUE.DIAMONDS; i <= SUIT_VALUE.SPADES; i++) {
			// 	for (let j = CARD_VALUE.VALUE_A; j <= CARD_VALUE.VALUE_K; j++) {
			// 		funcCreateBtn(j, i);
			// 	}
			// }
			// funcCreateBtn(CARD_VALUE.VALUE_XG, SUIT_VALUE.NONE);
			// funcCreateBtn(CARD_VALUE.VALUE_DG, SUIT_VALUE.NONE);
		}
		private createMjBtn() {
			this._btnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddMj, this);
			for (let i = 1; i <= 0x04; i++) {
				let suit = i;
				let count = i < 0x04 ? 10 : 8;
				for (let j = 1; j < count; j++) {
					let str;
					if (i === 0x04) {
						str = majiang.ZI_NAMES[j];
					} else {
						str = j + majiang.SUIT_NAMES[i];
					}
					let button = new eui.Button();
					button.skinName = TestButtonSkin;
					button.width = 80;
					button.height = 40;
					this._btnGroup.addChild(button);
					button.label = str;
					button.touchChildren = false;
					button["data"] = ((suit << 4) + j) + "";
				}
			}
		}
		private chanTab(evt: eui.CollectionEvent): void {
			this.currentState = this.curStage = this.stageList[this._tabBar.selectedIndex];
		}
		private sendMsg() {
			try {
				if (this._inputMsg.text) {
					let num = parseInt(this._inputMsg.text);
					if (isNaN(num)) {
						num = PlayGameOrder[this._inputMsg.text];
					}
					if (num) {
						let data: any = this._inputDatas.text;
						if (data) {
							data = JSON.parse(data);
						} else {
							data = {};
						}
						net.SendMsg.create(data, ModuleInfo.PLAY_GAME, num).send();
					} else {


						egret.warn("请输入有效的协议名/协议号!!!");
					}
				} else {
					// egret.warn("请输入协议名/协议号!!!");
					// net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_MJ_GAOJI_ACTION_JUMP).send();
				}
			} catch (error) {
				egret.error(error);
			}
		}
		private changeHandler(evt: eui.UIEvent) {
			if (this._changeBtn.selected) {
				this.currentState = this.curStage;
			} else {
				this.currentState = "hide";
			}
		}
	}
}