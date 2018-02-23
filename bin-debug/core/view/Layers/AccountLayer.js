var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 最终结算页面
 */
var Layers;
(function (Layers) {
    var MASK = 0XFF;
    var MOVE = 8;
    var AccountLayer = (function (_super) {
        __extends(AccountLayer, _super);
        function AccountLayer() {
            var _this = _super.call(this, [ResManager.GROUP_NAME.SAFE_BOX]) || this;
            _this.skinName = Layers.AccountLayerSkin;
            return _this;
        }
        AccountLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.percentWidth = this.percentHeight = 100;
            if (egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE) {
                this._btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
            }
            else {
                this.removeChild(this._btnShare);
            }
            // this._btnShare.visible = egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE;
        };
        //-- 计算牌形
        AccountLayer.prototype.calHandValue = function (handvalue, isMs) {
            if (handvalue) {
                // if (isMs) {
                // 	let handType: any = (handvalue >> 8 & 0xF);
                // 	var value = (handvalue >> 12 & 0xF);
                // 	if (handType < MS_HANDVALUE.SZ) {
                // 		if (value) {
                // 			return GameLangs.msCardTypes[handType] + value + GameLangs.dian;
                // 		} else {
                // 			return GameLangs.msCardTypes[handType] + GameLangs.mushi_str;
                // 		}
                // 	} else if (handType == MS_HANDVALUE.STG || handType == MS_HANDVALUE.TG) {
                // 		return GameLangs.msCardTypes[handType] + value;
                // 	}
                // 	else {
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
        //-- 计算牌形_三张牌
        AccountLayer.prototype.calHandValue_szp = function (handvalue, isMs) {
            if (handvalue) {
                var handType = (handvalue >> 12) & 0xf;
                return GameLangs.cardTypesSzp[handType];
            }
        };
        AccountLayer.prototype.close = function () {
            _super.prototype.close.call(this);
            egret.Event.dispatchEvent(this, Layers.Event.CLOSE);
        };
        AccountLayer.prototype.analysisResult = function (winLoseResult) {
            // egret.log(winLoseResult+"===winLoseResult1=="+(winLoseResult& 0xff),winLoseResult>>8,winLoseResult>>16)
            return [winLoseResult & 0xff, (winLoseResult >> 8) & 0xff, (winLoseResult >> 16) & 0xff];
        };
        /**
         *
         */
        AccountLayer.prototype.setDatas = function (datas, gameDatas) {
            if (gameDatas.roomInfo.createinfo.roomSize === 8) {
                this.currentState = "8";
            }
            else {
                this.currentState = "5";
            }
            var arrLen = datas.playerMsg.length;
            //显示当前时间
            this._timeLab.text = new Date().Format("yyyy-MM-dd\nhh:mm:ss");
            //房间号
            this._roomIdLab.text = GameLangs.gameRoomId.format(gameDatas.roomInfo.room_id);
            //赢的最多的筹码数,用于显示大赢家辨识用
            var maxChips = 0;
            for (var i = 0; i < arrLen; i++) {
                if (maxChips < datas.playerMsg[i].cur_chips) {
                    maxChips = datas.playerMsg[i].cur_chips;
                    egret.log("maxChips", maxChips, "datas.playerMsg[i].cur_chips", datas.playerMsg[i].cur_chips);
                }
            }
            var itemDatas = [];
            for (var i = 0; i < arrLen; i++) {
                var info = datas.playerMsg[i];
                // egret.log("maxChips",maxChips,"maxChips == info.cur_chips",maxChips == info.cur_chips)
                var list = void 0;
                switch (datas.gameId) {
                    case 1 /* NIUNIU */:
                        var _a = this.analysisResult(info.winLoseResult), winCnt = _a[0], lostCnt = _a[1], pingCnt = _a[2];
                        // let winCnt = info.winLoseResult & 0xf;
                        // let lostCnt = (info.winLoseResult >> 8) & 0xf;
                        // let pingCnt = (info.winLoseResult >> 16) & 0xf;
                        var str = GameLangs.account_tip5.format(winCnt, lostCnt);
                        if (pingCnt) {
                            str += GameLangs.account_tip4.format(pingCnt);
                        }
                        list = [
                            { headStr: GameLangs.account_tip1, tailStr: info.best_score + "" },
                            { headStr: GameLangs.account_tip2, tailStr: this.calHandValue(info.best_handvalue, false) },
                            { headStr: GameLangs.account_tip3, tailStr: str }
                        ];
                        break;
                    case 10 /* ZJH */:
                        var _b = this.analysisResult(info.winLoseResult), winCnt = _b[0], lostCnt = _b[1], pingCnt = _b[2];
                        var str = GameLangs.account_tip5.format(winCnt, lostCnt);
                        if (pingCnt) {
                            str += GameLangs.account_tip4.format(pingCnt);
                        }
                        list = [
                            { headStr: GameLangs.account_tip1, tailStr: info.best_score + "" },
                            { headStr: GameLangs.account_tip2, tailStr: this.calHandValue_szp(info.best_handvalue, false) },
                            { headStr: GameLangs.account_tip3, tailStr: str }
                        ];
                        break;
                    case 3 /* DDZ */:
                        var _c = this.analysisResult(info.winLoseResult), winCnt = _c[0], lostCnt = _c[1], pingCnt = _c[2];
                        var str = GameLangs.account_tip5.format(winCnt, lostCnt);
                        if (pingCnt) {
                            str += GameLangs.account_tip4.format(pingCnt);
                        }
                        list = [
                            { headStr: GameLangs.account_tip1, tailStr: info.best_score + "" },
                            { headStr: GameLangs.account_best, tailStr: info.best_handvalue + "" },
                            { headStr: GameLangs.account_tip3, tailStr: str }
                        ];
                        break;
                    case 39 /* GAME_ID_GDMJ_FK */:
                        var _d = this.analysisResult(info.winLoseResult), winCnt = _d[0], lostCnt = _d[1], pingCnt = _d[2];
                        var str = GameLangs.account_tip5.format(winCnt, lostCnt);
                        if (pingCnt) {
                            str += GameLangs.account_tip4.format(pingCnt);
                        }
                        list = [
                            { headStr: GameLangs.account_tip1, tailStr: info.best_score + "" },
                            { headStr: GameLangs.account_tip22, tailStr: info.best_handvalue + "" },
                            { headStr: GameLangs.account_tip3, tailStr: str }
                        ];
                        break;
                }
                itemDatas[i] = {
                    score: info.cur_chips,
                    alpha: i % 2 == 0 ? 1 : 0,
                    nickName: gameDatas.playerDatas[info.playerId].UserInfo.nickName,
                    account: gameDatas.playerDatas[info.playerId].UserInfo.id,
                    isSelf: gameDatas.isSelfId(info.playerId),
                    bigWinner: maxChips == info.cur_chips,
                    roomSize: gameDatas.roomInfo.createinfo.roomSize,
                    isOwner: gameDatas.playerDatas[info.playerId].zuoweiIndex === 0,
                    headImages: gameDatas.playerDatas[info.playerId].UserInfo.headImages,
                    list: list,
                };
            }
            this._dataGroup.itemRenderer = AccountItem;
            this._dataGroup.dataProvider = new eui.ArrayCollection(itemDatas);
        };
        AccountLayer.prototype.onShare = function () {
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(Main.instance);
            renderTexture.saveToFile("image/jpeg", "shareImg.jpg", new egret.Rectangle(0, 0, 1136, 640));
            egret.ExternalInterface.call("shareWx", JSON.stringify({
                type: "img",
                path: "shareImg.jpg",
                title: "分享图片",
                description: "分享图片"
            }));
            // if (egret.Capabilities.os == "iOS") {
            // 	renderTexture.saveToFile("image/jpeg", "shareImg.jpg");
            // 	egret.ExternalInterface.call("shareWx", JSON.stringify({
            // 		type: "img",
            // 		path: "shareImg.jpg",
            // 		title: "分享图片",
            // 		description: "分享图片",
            // 		imgData: renderTexture.toDataURL("image/jpg")
            // 	}));
            // } else {
            // }
        };
        return AccountLayer;
    }(Layers.BaseLayer));
    Layers.AccountLayer = AccountLayer;
    __reflect(AccountLayer.prototype, "Layers.AccountLayer");
    var AccountItem = (function (_super) {
        __extends(AccountItem, _super);
        function AccountItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AccountItem.prototype.dataChanged = function () {
            var data = this.data;
            this._headBox.setIcon(data.headImages);
            this._winerImg.visible = data.bigWinner;
            this._roomOnwerImg.visible = data.isOwner;
            if (data.roomSize === 8) {
                this.lab1.text = data.list[0].tailStr;
                this.lab2.text = data.list[1].tailStr;
                this.lab3.text = data.list[2].tailStr;
            }
            else {
                this.lab1.textFlow = [
                    { text: data.list[0].headStr },
                    { text: data.list[0].tailStr, style: { "textColor": 0x57e37d } },
                ];
                this.lab2.textFlow = [
                    { text: data.list[1].headStr },
                    { text: data.list[1].tailStr, style: { "textColor": 0x57e37d } },
                ];
                this.lab3.textFlow = [
                    { text: data.list[2].headStr },
                    { text: data.list[2].tailStr, style: { "textColor": 0x57e37d } },
                ];
                if (this.lab1.width > 168) {
                    this.lab1.scaleX = 168 / this.lab1.width;
                }
                if (this.lab2.width > 168) {
                    this.lab2.scaleX = 168 / this.lab2.width;
                }
                if (this.lab3.width > 168) {
                    this.lab3.scaleX = 168 / this.lab3.width;
                }
            }
            if (data.isSelf) {
                this._id.textColor =
                    this._nickName.textColor = 0xc74b63;
                if (data.roomSize === 8) {
                    this.lab1.textColor =
                        this.lab2.textColor =
                            this.lab3.textColor =
                                this._score.textColor = 0xc74b63;
                }
            }
        };
        return AccountItem;
    }(eui.ItemRenderer));
    __reflect(AccountItem.prototype, "AccountItem");
})(Layers || (Layers = {}));
//# sourceMappingURL=AccountLayer.js.map