var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 碰/杠/吃/勺,等牌
 */
var majiang;
(function (majiang) {
    var CardType = (function (_super) {
        __extends(CardType, _super);
        function CardType() {
            var _this = _super.call(this) || this;
            _this._pCenter = 0;
            //麻将的之间的Y
            _this._cardPadding = 0;
            //麻将的之间的X
            _this._cardPaddingX = 0;
            _this.init();
            _this.touchChildren = false;
            return _this;
        }
        Object.defineProperty(CardType.prototype, "cardPaddingX", {
            get: function () {
                return this._cardPaddingX;
            },
            set: function (v) {
                this._cardPaddingX = v;
                this.updateDisplayList(0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CardType.prototype, "cardPadding", {
            get: function () {
                return this._cardPadding;
            },
            set: function (v) {
                this._cardPadding = v;
                this.updateDisplayList(0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CardType.prototype, "pCenter", {
            get: function () {
                return this._pCenter;
            },
            set: function (v) {
                this._pCenter = v;
                this.updateDisplayList(0, 0);
            },
            enumerable: true,
            configurable: true
        });
        CardType.prototype.init = function () {
            this._cards = [];
            for (var i = 0; i < 4; i++) {
                var card = majiang.Card.create();
                this.addChild(card);
                this._cards[i] = card;
            }
        };
        CardType.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            if (this._direct && this._cards && this._cards.length) {
                if (this._direct === majiang.DIRECT.BOTTOM || this._direct === majiang.DIRECT.TOP) {
                    var startX = 0;
                    var arrLen = this._cards.length;
                    for (var i = 0; i < 3; i++) {
                        this._cards[i].x = startX;
                        if (i === 1) {
                            this._cards[3].x = startX;
                            this._cards[3].y = this._pCenter;
                        }
                        startX += this._cards[i].width + this._cardPadding;
                        egret.log(startX);
                    }
                }
                else {
                    var startX = 0;
                    var startY = 0;
                    var arrLen = this._cards.length;
                    for (var i = 0; i < 3; i++) {
                        this._cards[i].x = startX;
                        this._cards[i].y = startY;
                        if (i === 1) {
                            this._cards[3].x = startX;
                            this._cards[3].y = startY + this._pCenter;
                        }
                        startX += this._cardPaddingX;
                        egret.log("startX", startX, "this._cards[i].width", this._cards[i].width, "this._cardPaddingX", this._cardPaddingX);
                        startY += this._cards[i].height + this._cardPadding;
                    }
                }
            }
        };
        CardType.prototype.setCards = function (dest, direct) {
            this._direct = direct;
            this.dest = dest;
            switch (direct) {
                case majiang.DIRECT.BOTTOM:
                case majiang.DIRECT.TOP:
                    this._pCenter = -15;
                    break;
                case majiang.DIRECT.LEFT:
                    this._pCenter = -10;
                    this._cardPadding = -13; //13 
                    this._cardPaddingX = -8;
                    break;
                case majiang.DIRECT.RIGHT:
                    this._pCenter = -20;
                    this._cardPadding = -12;
                    this._cardPaddingX = 8;
                    break;
            }
            for (var i = 0; i < 4; i++) {
                var card = this._cards[i];
                if (typeof this.dest.cardValues[i] === "undefined") {
                    card.visible = false;
                }
                else {
                    card.visible = true;
                    card.cardValue = this.dest.cardValues[i];
                    card.setPengIcon(direct, this.dest.cardValues[i]);
                    egret.log("activeType", this.dest.activeType);
                }
            }
        };
        CardType.create = function () {
            return new CardType();
        };
        return CardType;
    }(eui.Component));
    majiang.CardType = CardType;
    __reflect(CardType.prototype, "majiang.CardType");
})(majiang || (majiang = {}));
//# sourceMappingURL=CardType.js.map