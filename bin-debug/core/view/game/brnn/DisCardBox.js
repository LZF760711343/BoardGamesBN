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
    var brnn;
    (function (brnn) {
        var DisCardBox = (function (_super) {
            __extends(DisCardBox, _super);
            function DisCardBox() {
                return _super.call(this) || this;
            }
            DisCardBox.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                this._cards = [];
                var arrLen = this._cardsGroup.numChildren;
                for (var i = 0; i < arrLen; i++) {
                    var card = this._cardsGroup.getChildAt(i);
                    this._cards[i] = card;
                }
                // this.showCards.addEventListener('complete', this.aniComplete, this);
                this.setCardsBack();
            };
            // private aniComplete() {
            // 	if (this._finishFunc) {
            // 		this._finishFunc();
            // 	}
            // 	// this._rateBox.visible = false;
            // 	egret.log("aniComplete")
            // 	// this.reset.play(0);
            // }
            DisCardBox.prototype.reset = function () {
                this.setCardsBack();
                this._rateBox.visible = false;
                this.clearAni();
                // this._typeImg.visible = false;
                if (this._typeIcon && this._typeIcon.parent) {
                    this.removeChild(this._typeIcon);
                }
                //this.HideCard();
            };
            /**播放发牌动画 */
            DisCardBox.prototype.PlaySendCardAni = function (layer, cardIndex, cardValue, isSetIcon) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    var card = _this._cards[cardIndex];
                    if (isSetIcon) {
                        card.setIconByBrnn(cardValue);
                    }
                    card.visible = true;
                    card.scaleX = 0.3;
                    card.scaleY = 0.3;
                    var tw = egret.Tween.get(card);
                    var desX = card.x;
                    var desY = card.y;
                    var _point = egret.Point.create(0, 0);
                    _this._cardsGroup.localToGlobal(desX, desY, _point);
                    card.x = Global.sWidth / 4 * 3;
                    card.y = -card.width;
                    layer.addChild(card);
                    tw.to({ x: _point.x, y: _point.y, scaleX: 0.6, scaleY: 0.6 }, 150);
                    egret.Point.release(_point);
                    tw.call(function () {
                        _this._cardsGroup.addChildAt(card, cardIndex);
                        card.x = desX;
                        card.y = desY;
                        SoundManage.playEffect("nn_fapai");
                        resolve();
                    });
                });
            };
            DisCardBox.prototype.HideCard = function () {
                for (var i = 0; i < 5; i++) {
                    this._cards[i].visible = false;
                }
            };
            /**
             * 清理所有的动画
             */
            DisCardBox.prototype.clearAni = function () {
                var arrLen = this._cards.length;
                for (var i = 0; i < arrLen; i++) {
                    //如果父节点不是当前this对象,说明动画播放一半,还没有将牌加回this对象里面
                    if (!this._cards[i].parent || this._cards[i].parent != this) {
                        this.addChildAt(this._cards[i], i);
                    }
                    egret.Tween.removeTweens(this._cards[i]);
                }
                this.showCards.stop(); //停止开牌动画
            };
            /**
             *
             */
            DisCardBox.prototype.destroy = function () {
                this._finishFunc = null;
                this.clearAni();
                // egret.Tween.removeTweens(this.card5);
                if (this._typeIcon) {
                    this._typeIcon["ani"].stop();
                }
            };
            //-- 计算牌形
            DisCardBox.prototype.calHandValue = function (handvalue) {
                var handType = (handvalue >> 12) & 0xf;
                if (handType == 2 /* NIUX */) {
                    var value = (handvalue >> 8) & 0xf;
                    handType = handType + "" + value;
                }
                return handType;
            };
            DisCardBox.prototype.doShowCardAni = function (data, selfmoney) {
                var _this = this;
                this.visible = true;
                return new Promise(function (finishFunc) {
                    var arrLen = data.cardsInfo.cards.length;
                    var card = _this._cards[3];
                    egret.Tween.get(_this.card5)
                        .to({ x: 86 }, 500).call(function () { card.setIconByBrnn(data.cardsInfo.cards[3]); })
                        .to({ x: 116 }, 500)
                        .call(function () {
                        finishFunc();
                        //设置牌型(闲家不播放开牌动画，统一之后播放)
                        _this.setCardType(data.cardsInfo.handValue, selfmoney, data.cardsInfo.rewardRate);
                    });
                });
            };
            DisCardBox.prototype.settTypeIconVisible = function (visible) {
                this._typeIcon["_money"].visible = visible;
            };
            DisCardBox.prototype.setCardType = function (handValue, money, rewardRate, sex) {
                var self = this;
                var typeIcon = self._typeIcon;
                if (!typeIcon) {
                    typeIcon = self._typeIcon = new eui.Component();
                    typeIcon.skinName = "brnn.CardTypeAni";
                    typeIcon.width = this.width;
                }
                var handType = self.calHandValue(handValue);
                typeIcon.name = "label_n_type" + handType + "_png";
                typeIcon["ani"].play(0);
                //设置玩家输赢金钱
                if (money !== undefined && typeIcon["_money"]) {
                    //播放牛牛动画
                    var chipPool = this.parent;
                    if (chipPool && handType >= 3 && handType <= 11) {
                        chipPool._niuniu.visible = true;
                        chipPool._niuniu.curState = brnn.SCPNStatu.PLAY;
                        SoundManage.playEffect("brnn_nnsound");
                    }
                    typeIcon["_money"].visible = false;
                    var newGold = "0";
                    // money = Math.abs(money*rewardRate);//输赢几倍一起算进去
                    money = money * rewardRate; //输赢几倍一起算进去(显示负号)
                    if (Math.abs(money) > 10000) {
                        newGold = Math.floor(money / 10000) + GameLangs.wan;
                    }
                    else {
                        newGold = money.toString();
                    }
                    if (rewardRate >= 0) {
                        typeIcon["_money"].textColor = 0x0E9A0A;
                    }
                    else {
                        typeIcon["_money"].textColor = 0xba1e1d;
                    }
                    typeIcon["_money"].text = newGold;
                }
                self.addChild(typeIcon);
                typeIcon.horizontalCenter = 0;
                typeIcon.verticalCenter = 20;
                //播放音乐
                SoundManage.playEffectBySex(SoundManage.keyMap["n_" + handType], sex);
            };
            /**
             * 将所有牌设置为背面状态
             */
            DisCardBox.prototype.setCardsBack = function () {
                var arrLen = this._cards.length;
                for (var i = 0; i < arrLen; i++) {
                    var card = this._cards[i];
                    card.setBack();
                }
            };
            return DisCardBox;
        }(eui.Component));
        brnn.DisCardBox = DisCardBox;
        __reflect(DisCardBox.prototype, "niuniu.brnn.DisCardBox");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=DisCardBox.js.map