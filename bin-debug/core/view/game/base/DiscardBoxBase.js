var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base;
(function (base) {
    // const enum ADD_CARD_ANI_TYPE{
    //     NONE,
    //     FROM_CENTER,
    // }
    var DiscardBoxBase = (function (_super) {
        __extends(DiscardBoxBase, _super);
        function DiscardBoxBase() {
            var _this = _super.call(this) || this;
            /**
             * 牌与牌之间的间隔
             */
            _this._cardPaddingX = 44;
            return _this;
        }
        DiscardBoxBase.prototype.setCardPaddingX = function (value) {
            this._cardPaddingX = value;
        };
        DiscardBoxBase.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        DiscardBoxBase.prototype.getCard = function () {
            return null;
        };
        DiscardBoxBase.prototype.init = function (cardCnt) {
            if (cardCnt === void 0) { cardCnt = 3; }
            this._cards = [];
            for (var i = 0; i < cardCnt; i++) {
                this._cards[i] = this.getCard();
            }
        };
        /**
         * 播放翻牌动画
         */
        DiscardBoxBase.prototype.showCardAni = function (cardValues, isShowCard, sex) {
            var delay = 0;
            var length = cardValues.length;
            var tween;
            var cardWidth = this._cards[0].width;
            egret.log("showCardAni:");
            for (var i = 0; i < length; i++) {
                egret.log(cardValues[i] && isShowCard);
                if (cardValues[i] && isShowCard) {
                    var card = this._cards[i];
                    card.visible = true;
                    tween = egret.Tween.get(card)
                        .wait(delay)
                        .to({ scaleX: 0, x: card.x + cardWidth / 2 }, 150)
                        .call(card.setIcon, card, [cardValues[i]])
                        .to({ x: card.x, scaleX: 1 }, 150);
                    delay += 70;
                }
            }
            return new Promise(function (resolve, reject) {
                if (tween) {
                    tween.wait(200).call(resolve);
                }
                else {
                    resolve();
                }
            });
            // return tween;
        };
        DiscardBoxBase.prototype.updatePos = function () {
            var cardLen = this._cards.length;
            for (var i = 0; i < cardLen; i++) {
            }
        };
        DiscardBoxBase.prototype.setCardsGray = function () {
            var length = this._cards.length;
            for (var i = 0; i < length; ++i) {
                this._cards[i].setGray();
            }
        };
        /**
         * 直接设置牌,不播放发牌动画
         */
        DiscardBoxBase.prototype.setCards = function (cardValues, callBack, target) {
            var tween;
            var self = this;
            var length = cardValues.length;
            var cardWidth = this._cards[0].width;
            // let cardHeight = this._cards[0].height;
            var start_x = (self.width - self._cardPaddingX * (length - 1) - cardWidth) / 2;
            var pos = egret.Point.create(0, 0);
            for (var i = 0; i < length; ++i) {
                var card = self._cards[i];
                card.visible = true;
                self.addChild(card);
                card.x = start_x;
                card.y = 0;
                start_x += self._cardPaddingX;
            }
            egret.Point.release(pos);
        };
        /**
         * 派牌
         * @param delay:延迟播放动画的时间
         */
        DiscardBoxBase.prototype.dealCards = function (cardValues, delay, callBack, target) {
            var _this = this;
            if (delay === void 0) { delay = 0; }
            // let delay = _delay;
            var tween;
            var self = this;
            var length = cardValues.length;
            var cardWidth = this._cards[0].width;
            // let cardHeight = this._cards[0].height;
            var start_x = (self.width - self._cardPaddingX * (length - 1) - cardWidth) / 2;
            var pos = egret.Point.create(0, 0);
            for (var i = 0; i < length; ++i) {
                var cardObj = self._cards[i];
                cardObj.visible = true;
                self.addChild(cardObj);
                self.globalToLocal(Global.sWidth / 2, Global.sHeight / 2, pos);
                cardObj.x = pos.x - cardWidth / 2;
                cardObj.y = pos.y - cardWidth / 2;
                tween = egret.Tween.get(cardObj).wait(delay).to({ x: start_x, y: 0 }, 200);
                // .call(function () {
                //     egret.log("cardSound")
                //     SoundManage.playEffect("cardSound");
                // }, this);
                delay += 60;
            }
            tween.call(function (e) {
                SoundManage.playEffect("cardSound");
                for (var i = 0; i < length; ++i) {
                    var card = self._cards[i];
                    tween = egret.Tween.get(card).to({ x: start_x }, 250);
                    start_x += self._cardPaddingX;
                }
                if (cardValues && cardValues[0]) {
                    tween.wait(40).call(_this.showCardAni, _this, [cardValues, true]);
                }
            });
        };
        DiscardBoxBase.prototype.reset = function () {
            if (this._cards) {
                for (var key in this._cards) {
                    var card = this._cards[key];
                    card.visible = false;
                    card.setBack();
                }
            }
        };
        /**
         * 销毁跟回收对象
         */
        DiscardBoxBase.prototype.destroy = function () {
            var arrLen = this._cards.length;
            for (var i = 0; i < arrLen; i++) {
                this._cards[i].destroy();
            }
            this._cards = null;
        };
        /**
         * 清理所有的动画
         */
        DiscardBoxBase.prototype.clearAllAni = function () {
            for (var i = this._cards.length - 1; i > -1; --i) {
                egret.Tween.removeTweens(this._cards[i]);
            }
        };
        return DiscardBoxBase;
    }(eui.Component));
    base.DiscardBoxBase = DiscardBoxBase;
    __reflect(DiscardBoxBase.prototype, "base.DiscardBoxBase");
})(base || (base = {}));
//# sourceMappingURL=DiscardBoxBase.js.map