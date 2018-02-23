var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Debug;
(function (Debug) {
    Debug.EVENT = {
        GET_MJ: "getMj",
        GET_PK: "getPK",
        SET_FIRST_ID: "setFirstId",
        SET_MAX_ID: "setMaxId",
        SET_PLAY_CARD: "setPlayCard"
    };
    var TestLayer = (function (_super) {
        __extends(TestLayer, _super);
        function TestLayer() {
            var _this = _super.call(this) || this;
            _this.curStage = "send";
            _this.selectCards = [];
            _this.stageList = [
                "send",
                "mj",
                "poker",
                "server"
            ];
            _this.skinName = TestLayerSkin;
            Debug.instance = _this;
            _this.percentWidth = _this.percentHeight = 100;
            return _this;
        }
        TestLayer.prototype.onRobotIsOn = function () {
            if (this._robotBtn.selected) {
                ROBOT.instance.startTimer();
            }
            else {
                ROBOT.instance.stopTimer();
            }
        };
        TestLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
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
        };
        TestLayer.prototype.onSendLog = function () {
            Utils.LogManage.instance.sendLog();
        };
        TestLayer.prototype.initLoginIp = function () {
            var ipList = [
                "192.168.0.193",
                // "game.gzlf2017.cn",
                "192.168.0.200",
                "192.168.0.182",
                "www.gzqidong.cn",
                "www.hongzhegame.com",
            ];
            var portList = [
                "10101",
                "10102",
                "10103",
            ];
            this._ipList.dataProvider = new eui.ArrayCollection(ipList);
            this._portList.dataProvider = new eui.ArrayCollection(portList);
            var str = egret.localStorage.getItem("debugInfo");
            var debugInfo;
            if (!str) {
                debugInfo = {
                    ip: ipList[3],
                    port: portList[2]
                };
            }
            else {
                debugInfo = JSON.parse(str);
            }
            this._portList.selectedIndex = portList.indexOf(debugInfo.port);
            this._ipList.selectedIndex = ipList.indexOf(debugInfo.ip);
            this._setLoginInfoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setIpInfo, this);
            net.setIpAndPort(debugInfo.ip, parseInt(debugInfo.port));
        };
        TestLayer.prototype.shareImage = function (target) {
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(target); //渲染到临时画布
            var img = new Utils.HtmlWebImgView();
            img.init();
            img.show(renderTexture.toDataURL('image/jpeg'), Global.sWidth / 4, Global.sHeight / 4, Global.sWidth / 2, Global.sHeight / 2);
        };
        TestLayer.prototype.setIpInfo = function () {
            Config.SERVER_URL = this._ipList.selectedItem;
            Config.SERVER_PORT = parseInt(this._portList.selectedItem);
            var debugInfo = {
                ip: Config.SERVER_URL,
                port: Config.SERVER_PORT + ""
            };
            egret.localStorage.setItem("debugInfo", JSON.stringify(debugInfo));
            LocalDatas.datas.saveData();
            net.setIpAndPort(Config.SERVER_URL, Config.SERVER_PORT);
            Toast.launch("设置成功!");
        };
        TestLayer.prototype.clear = function () {
            this._mjText.text = "";
            this.selectCards = [];
        };
        TestLayer.prototype.sendSetMaxIdEvent = function () {
            var id = parseInt(this._idText.text);
            if (!isNaN(id)) {
                this.dispatchEventWith(Debug.EVENT.SET_MAX_ID, false, id);
            }
        };
        TestLayer.prototype.sendSetFirstIdEvent = function () {
            var id = parseInt(this._idText.text);
            if (!isNaN(id)) {
                this.dispatchEventWith(Debug.EVENT.SET_FIRST_ID, false, id);
            }
        };
        TestLayer.prototype.sendSetCardEvent = function (event) {
            this.dispatchEventWith(Debug.EVENT.SET_PLAY_CARD, false, { cardStr: this._mjText.text, id: parseInt(event.target.name) });
        };
        TestLayer.prototype.delCard = function () {
            // if (this.selectCards.length) {
            // 	this.selectCards.pop();
            // 	this._mjText.text = PokerBase.cardValuesToStr(this.selectCards);
            // }
        };
        TestLayer.prototype.onAddPk = function (event) {
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
        };
        TestLayer.prototype.onAddMj = function (event) {
            var target = event.target;
            if (target instanceof eui.Button) {
                var temp = parseInt(target["data"]);
                this.selectCards.push(temp);
                this._mjText.text = majiang.Majiang.cardValuesToStr(this.selectCards);
            }
        };
        TestLayer.prototype.onSubmit = function () {
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
            this.dispatchEventWith(Debug.EVENT.GET_MJ, false, this.selectCards);
            // let cards = dashi.Poker.createPokerCards(this.selectCards, CARD_VALUE.VALUE_10);
            // let pokerCards:dashi.Card[] = [];
            // cards.forEach((value: dashi.PokerCard, index: number) => {
            // 	pokerCards.push(this.createDashiCard(value));
            // });
            // let layer = new dashi.SelectHideCardLayer(pokerCards);
            // layer.open();
            // this.testPoker(shuangjian.Poker.createPokerCards(this.selectCards));
            // this.testDashi();
        };
        TestLayer.prototype.testDashi = function () {
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
        };
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
        TestLayer.prototype.createPokerCard = function () {
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
        };
        TestLayer.prototype.createMjBtn = function () {
            this._btnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddMj, this);
            for (var i = 1; i <= 0x04; i++) {
                var suit = i;
                var count = i < 0x04 ? 10 : 8;
                for (var j = 1; j < count; j++) {
                    var str = void 0;
                    if (i === 0x04) {
                        str = majiang.ZI_NAMES[j];
                    }
                    else {
                        str = j + majiang.SUIT_NAMES[i];
                    }
                    var button = new eui.Button();
                    button.skinName = TestButtonSkin;
                    button.width = 80;
                    button.height = 40;
                    this._btnGroup.addChild(button);
                    button.label = str;
                    button.touchChildren = false;
                    button["data"] = ((suit << 4) + j) + "";
                }
            }
        };
        TestLayer.prototype.chanTab = function (evt) {
            this.currentState = this.curStage = this.stageList[this._tabBar.selectedIndex];
        };
        TestLayer.prototype.sendMsg = function () {
            try {
                if (this._inputMsg.text) {
                    var num = parseInt(this._inputMsg.text);
                    if (isNaN(num)) {
                        num = PlayGameOrder[this._inputMsg.text];
                    }
                    if (num) {
                        var data = this._inputDatas.text;
                        if (data) {
                            data = JSON.parse(data);
                        }
                        else {
                            data = {};
                        }
                        net.SendMsg.create(data, 3 /* PLAY_GAME */, num).send();
                    }
                    else {
                        egret.warn("请输入有效的协议名/协议号!!!");
                    }
                }
                else {
                }
            }
            catch (error) {
                egret.error(error);
            }
        };
        TestLayer.prototype.changeHandler = function (evt) {
            if (this._changeBtn.selected) {
                this.currentState = this.curStage;
            }
            else {
                this.currentState = "hide";
            }
        };
        return TestLayer;
    }(eui.Component));
    Debug.TestLayer = TestLayer;
    __reflect(TestLayer.prototype, "Debug.TestLayer");
})(Debug || (Debug = {}));
//# sourceMappingURL=TestLayer.js.map