var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var niuniu;
(function (niuniu) {
    var RoundAccountLayer = (function (_super) {
        __extends(RoundAccountLayer, _super);
        function RoundAccountLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = niuniu.RoundAccountLayerSkin;
            return _this;
        }
        RoundAccountLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGoBtn, this);
        };
        RoundAccountLayer.prototype.onTouchGoBtn = function () {
            this.close();
            egret.Event.dispatchEvent(this, Layers.Event.CLOSE);
        };
        RoundAccountLayer.prototype.calHandValue = function (handvalue, isMs) {
            if (handvalue) {
                // if (isMs) {
                // 	let handType: any = (handvalue >> 8 & 0xF);
                // 	var value = (handvalue >> 12 & 0xF);
                // 	if (handType < MS_HANDVALUE.SZ || handType == MS_HANDVALUE.STG || handType == MS_HANDVALUE.TG) {
                // 		if (value) {
                // 			return GameLangs.msCardTypes[handType] + value + GameLangs.dian;
                // 		} else {
                // 			return GameLangs.msCardTypes[handType] + GameLangs.mushi_str;
                // 		}
                // 	} else {
                // 		return GameLangs.msCardTypes[handType];
                // 	}
                // }
                var handType = (handvalue >> 12) & 0xf;
                if (handType == 2 /* NIUX */) {
                    var value = (handvalue >> 8) & 0xf;
                    return GameLangs.cardTypes[handType] + "" + value;
                }
                else {
                    return GameLangs.cardTypes[handType];
                }
            }
        };
        RoundAccountLayer.prototype.complete = function () {
            egret.log("complete");
            this.onTouchGoBtn();
        };
        RoundAccountLayer.prototype.setDatas = function (overDatas, gameDatas) {
            // var scene = <niuniu.GameSceneUI>Main.instance.getCurrentScene();
            // //是否金币场
            // let isCoinRoom = roomType == ROOM_TYPE.NORMAL;
            // if (isCoinRoom) {
            // 	this.currentState = "niuniuCoin";
            // 	this.startTimer();
            // 	this.btn_quit.once(egret.TouchEvent.TOUCH_TAP, this.onExitGame, this);
            // } else {
            // 	this.currentState = "niuniu";
            // }
            // if(DEBUG){
            // 	this.startTimer(5);
            // }
            var datas = [];
            var length = overDatas.gameResult.length;
            var sIndes = 0;
            for (var i = 0; i < length; i++) {
                var data = datas[i] = {};
                var result = overDatas.gameResult[i];
                var id = result.playerId;
                var playerInfo = gameDatas.playerDatas[id];
                if (gameDatas.dealerId && gameDatas.dealerId == id) {
                    data.dealer = "zhuan1_icon_png";
                    data.zhuangBg = "zhuanK_area_png";
                }
                data.cardType = this.calHandValue(result.handValue, false);
                data.cards = result.cards;
                data.money = this.toSingStr(result.balance);
                if (id == gameDatas.myPlyerId) {
                    data.isSelf = true;
                    sIndes = i;
                    if (result.balance > 0) {
                        this._title.source = "win_icon1_png";
                    }
                    else if (result.balance < 0) {
                        this._title.source = "lost_topicon_png";
                    }
                    else {
                        this._title.source = "pj_toptext_png";
                    }
                }
                data.name = Utils.subString(playerInfo.UserInfo.nickName, 7);
            }
            var temp = datas[0];
            datas[0] = datas[sIndes];
            datas[sIndes] = temp;
            this._dataGroup.itemRenderer = AccountItem;
            this._dataGroup.dataProvider = new eui.ArrayCollection(datas);
        };
        RoundAccountLayer.prototype.toSingStr = function (num) {
            if (num > 0)
                return '+' + num;
            else
                return num.toString();
        };
        RoundAccountLayer.prototype.setDatas1 = function (overDatas, gameDatas) {
            // var scene = <niuniu.GameSceneUI>Main.instance.getCurrentScene();
            // //是否金币场
            // let isCoinRoom = roomType == ROOM_TYPE.NORMAL;
            // if (isCoinRoom) {
            // 	this.currentState = "niuniuCoin";
            // 	this.startTimer();
            // 	this.btn_quit.once(egret.TouchEvent.TOUCH_TAP, this.onExitGame, this);
            // } else {
            // 	this.currentState = "niuniu";
            // }
            // if(DEBUG){
            // 	this.startTimer(5);
            // }
            var len = overDatas.biPaiList.length;
            var datas = [];
            var length = overDatas.gameResultList.length;
            var sIndes = 0;
            for (var i = 0; i < length; i++) {
                var data = datas[i] = {};
                var result = overDatas.gameResultList[i];
                var id = result.playerId;
                var playerInfo = gameDatas.playerDatas[id];
                if (gameDatas.dealerId && gameDatas.dealerId == id) {
                    data.dealer = "zhuan1_icon_png";
                }
                if (result.playerId == gameDatas.myPlyerId || this.checkIsCompCard(result.playerId, gameDatas.myPlyerId, overDatas.biPaiList)) {
                    data.cards = result.cards;
                    egret.log("result.cards", result.cards);
                }
                else {
                    data.cards = [999, 999, 999];
                }
                // data.cardType = this.calHandValue(result.handValue, false);
                // if(gameDatas.myPlyerId==overDatas.biPaiList[i][0]||result.playerId==overDatas.biPaiList[i][1]){
                // data.cards = result.cards;
                // }
                // else{
                // 		data.cards = [];
                // }
                egret.log("overDatas.biPaiList", overDatas.biPaiList);
                // this.checkIsCompCard(gameResult.playerId, this.gameDatas.myPlyerId, datas.biPaiList)
                // if ((result.playerId == overDatas.biPaiList[i][0] && gameDatas.myPlyerId == overDatas[i][1]) || (result.playerId == overDatas.biPaiList[i][0] && gameDatas.myPlyerId == overDatas[i][1])) {
                // }
                // 	   for (let i = 0; i < arrLen; i++) {
                //     if ((compList[i][0] === playerId1 && compList[i][1] === playerId2) || (compList[i][1] === playerId1 && compList[i][0] === playerId2)) {
                //         return true;
                //     }
                // }
                data.money = this.toSingStr(result.balance);
                if (id == gameDatas.myPlyerId) {
                    data.isSelf = true;
                    sIndes = i;
                    if (result.balance > 0) {
                        this._title.source = "win_icon1_png";
                    }
                    else if (result.balance < 0) {
                        this._title.source = "lost_topicon_png";
                    }
                    else {
                        this._title.source = "pj_toptext_png";
                    }
                }
                data.name = Utils.subString(playerInfo.UserInfo.nickName, 7);
            }
            var temp = datas[0];
            datas[0] = datas[sIndes];
            datas[sIndes] = temp;
            this._dataGroup.itemRenderer = AccountItem;
            this._dataGroup.dataProvider = new eui.ArrayCollection(datas);
        };
        RoundAccountLayer.prototype.checkIsCompCard = function (playerId1, playerId2, compList) {
            var arrLen = compList.length;
            for (var i = 0; i < arrLen; i++) {
                if ((compList[i][0] === playerId1 && compList[i][1] === playerId2) || (compList[i][1] === playerId1 && compList[i][0] === playerId2)) {
                    return true;
                }
            }
            return false;
        };
        return RoundAccountLayer;
    }(Layers.RoundAccountLayerBase));
    niuniu.RoundAccountLayer = RoundAccountLayer;
    __reflect(RoundAccountLayer.prototype, "niuniu.RoundAccountLayer");
    var AccountItem = (function (_super) {
        __extends(AccountItem, _super);
        function AccountItem() {
            return _super.call(this) || this;
        }
        AccountItem.prototype.dataChanged = function () {
            egret.log("this.data::::" + this.data.cardType);
            if (this.data.cards) {
                var data = this.data;
                var length = this.data.cards.length;
                if (data.isSelf) {
                    this._moneyLab.textColor = 0xf86c17;
                }
                else {
                    this._rect.visible = false;
                }
                for (var i = 0; i < length; i++) {
                    var card = niuniu.Card.create();
                    if (this.data.cards[i] != 999) {
                        egret.log("this.data.cards[i]", this.data.cards[i]);
                        card.setSmallIcon(this.data.cards[i]);
                    }
                    else {
                        card.setSmallBack();
                    }
                    this._group.addChild(card);
                }
            }
        };
        return AccountItem;
    }(eui.ItemRenderer));
    __reflect(AccountItem.prototype, "AccountItem");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=RoundAccountLayer.js.map