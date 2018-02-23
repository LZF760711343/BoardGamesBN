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
    var CARD_W = 74;
    var CARD_H = 98;
    var PADING_X = 30;
    // const enum ADD_CARD_ANI_TYPE{
    //     NONE,
    //     FROM_CENTER,
    // }
    var DiscardBox = (function (_super) {
        __extends(DiscardBox, _super);
        // private _aniNode: Effect.DBNode;
        function DiscardBox() {
            return _super.call(this) || this;
        }
        DiscardBox.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._centerPos = egret.Point.create(0, 0);
            this._cards = [
                // new Card(),new Card(),new Card(),new Card(),new Card(),
                niuniu.Card.create(), niuniu.Card.create(), niuniu.Card.create(), niuniu.Card.create(), niuniu.Card.create()
            ];
            for (var i = 0; i < 5; i++) {
                this.addChild(this._cards[i]);
                this._cards[i].setSmallBack();
                this._cards[i].visible = false;
            }
        };
        DiscardBox.prototype.getCardCnt = function () {
            return this._cardCnt;
        };
        DiscardBox.prototype.showCards = function (cards, count) {
            var length = this._cardCnt = count;
            for (var i = 0; i < count; i++) {
                if (cards[i]) {
                    this._cards[i].setSmallIcon(cards[i]);
                }
                else {
                    this._cards[i].setSmallBack();
                }
                this._cards[i].visible = true;
            }
            this.updatePos();
        };
        DiscardBox.prototype.updatePos = function () {
            var start_x = (this.width - PADING_X * (this._cardCnt - 1) - CARD_W) / 2;
            for (var i = 0; i < this._cardCnt; ++i) {
                var card = this._cards[i];
                card.x = start_x;
                start_x += PADING_X;
            }
        };
        /**
         * 播放发牌动画
         */
        DiscardBox.prototype.dealAni = function (_delay, cards, handvalue, callBack, target) {
            var delay = _delay;
            var tween;
            var self = this;
            var length = self._cardCnt = cards.length;
            var start_x = (self.width - PADING_X * (length - 1) - CARD_W) / 2;
            for (var i = 0; i < length; ++i) {
                // SoundManage.playEffect("cardSound");
                var card = self._cards[i];
                card.visible = true;
                card.setSmallBack();
                // self.addChild(card);
                var pos = self.globalToLocal(Global.sWidth / 2, Global.sHeight / 2, self._centerPos);
                card.x = pos.x - CARD_W / 2;
                card.y = pos.y - CARD_H / 2;
                tween = egret.Tween.get(card).wait(delay).to({ x: start_x, y: 0 }, 200);
                delay += 60;
            }
            SoundManage.playEffect("cardSound");
            tween.call(function (e) {
                for (var i = 0; i < length; ++i) {
                    var card = self._cards[i];
                    tween = egret.Tween.get(card).to({ x: start_x }, 250);
                    start_x += PADING_X;
                }
                if (cards && cards[0]) {
                    tween.wait(40).call(self.showCardAni, self, [cards, 0, handvalue]);
                }
            });
        };
        /**
         * 显示完成标志
         */
        DiscardBox.prototype.showComeIcon = function () {
            var icon = this._cIcon;
            if (!icon) {
                // egret.log(RES.getRes("label_g_complete_png"))
                icon = this._cIcon = new eui.Image("label_g_complete_png");
                this.addChild(icon);
                icon.x = (this.width - icon.width) / 2;
                icon.y = this.height - icon.height;
            }
            else {
                this.addChild(icon);
            }
        };
        /**
         * 隐藏完成标志
         */
        DiscardBox.prototype.hideCompleteIcon = function () {
            if (this._cIcon && this._cIcon.parent) {
                this.removeChild(this._cIcon);
            }
        };
        DiscardBox.prototype.addCards = function (cards, aniType, callBack, thisObject) {
            switch (aniType) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
            }
        };
        //添加一张牌的动画
        DiscardBox.prototype.addCardAni = function (cardValue, callBack, target) {
            var _this = this;
            // egret.log("我日");
            var card = this._cards[this._cardCnt++];
            if (card) {
                card.visible = true;
                card.setSmallBack();
                this.setChildIndex(card, this._cardCnt + 1);
                this.globalToLocal(Global.sWidth / 2, Global.sHeight / 2, this._centerPos);
                card.x = this._centerPos.x - CARD_W / 2;
                card.y = this._centerPos.y - CARD_H / 2;
                card.scaleX = card.scaleY = 0.5;
                var tween;
                var length = this._cardCnt;
                var start_x = (this.width - PADING_X * (length - 1) - CARD_W) / 2;
                var card_x = start_x + PADING_X * (length - 1);
                tween = egret.Tween.get(card).to({ x: card_x, y: 0, scaleX: 1, scaleY: 1 }, 200);
                tween.call(function (e) {
                    for (var i = 0; i < length - 1; ++i) {
                        var _card = _this._cards[i];
                        tween = egret.Tween.get(_card).to({ x: start_x }, 250);
                        start_x += PADING_X;
                    }
                    // tween.call(this.showCompleteIcon, this)
                    if (callBack) {
                        tween.call(callBack, target);
                    }
                });
            }
            // egret.log("我a  a ");
        };
        /**
         * 播放翻牌动画
         */
        DiscardBox.prototype.showCardAni = function (cards, startCount, handvalue, isMs, sex) {
            if (startCount === void 0) { startCount = 0; }
            // egret.log("没错是我干的");
            var delay = 0;
            var length = this._cardCnt = cards.length;
            var tween;
            if (isMs) {
                this.updatePos();
            }
            for (var i = 0; i < length; i++) {
                if (cards[i]) {
                    var card = this._cards[i];
                    card.visible = true;
                    tween = egret.Tween.get(card)
                        .wait(delay)
                        .to({ scaleX: 0, x: card.x + CARD_W / 2 }, 150)
                        .call(card.setSmallIcon, card, [cards[i]])
                        .to({ x: card.x * 1.2, scaleX: 1 }, 150);
                    delay += 70;
                }
            }
            if (handvalue) {
                tween = tween.wait(40).call(this.showCardType, this, [handvalue, isMs, sex]);
            }
            return new Promise(function (resolve, reject) {
                tween.wait(200).call(resolve);
            });
            // return tween;
        };
        //-- 计算牌形
        DiscardBox.prototype.calHandValue = function (handvalue) {
            var handType = (handvalue >> 12) & 0xf;
            if (handType == 2 /* NIUX */) {
                var value = (handvalue >> 8) & 0xf;
                handType = handType + "" + value;
            }
            return handType;
        };
        DiscardBox.prototype.showCardType = function (handvalue, isMs, sex) {
            var self = this;
            var typeIcon = self._typeIcon;
            if (!typeIcon) {
                typeIcon = self._typeIcon = new eui.Component();
                typeIcon.skinName = niuniu.CardTypeAni;
            }
            var handType = self.calHandValue(handvalue);
            typeIcon.name = "label_n_type" + handType + "_png";
            SoundManage.playEffectBySex(SoundManage.keyMap["n_" + handType], sex);
            typeIcon["ani"].play(0);
            self.addChild(typeIcon);
            typeIcon.x = (self.width - typeIcon.width) / 2;
            typeIcon.y = self.height - typeIcon.height + 20;
        };
        DiscardBox.prototype.updateCards = function (cards) {
            var length = cards.length;
            for (var i = 0; i < length; i++) {
                this._cards[i].setSmallIcon(cards[i]);
            }
        };
        DiscardBox.prototype.reset = function () {
            for (var i = 0; i < 5; ++i) {
                var card = this._cards[i];
                card.visible = false;
                card.setSmallBack();
            }
            if (this._typeIcon && this._typeIcon.parent) {
                this.removeChild(this._typeIcon);
            }
            if (this._cIcon && this._cIcon.parent) {
                this.removeChild(this._cIcon);
            }
        };
        /**
         * 销毁跟回收对象
         */
        DiscardBox.prototype.destroy = function () {
            var arrLen = this._cards.length;
            for (var i = 0; i < arrLen; i++) {
                this._cards[i].visible = true;
                this._cards[i].destroy();
            }
            this._cards = null;
        };
        /**
         * 清理所有的动画
         */
        DiscardBox.prototype.clearAllAni = function () {
            for (var i = this._cards.length - 1; i > -1; --i) {
                egret.Tween.removeTweens(this._cards[i]);
            }
            // if (this._aniNode) {
            //     this._aniNode.destroy();
            //     this._aniNode = null;
            // }
        };
        return DiscardBox;
    }(eui.Component));
    niuniu.DiscardBox = DiscardBox;
    __reflect(DiscardBox.prototype, "niuniu.DiscardBox");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=DiscardBox.js.map