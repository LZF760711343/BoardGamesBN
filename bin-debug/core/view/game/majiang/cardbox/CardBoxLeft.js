var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author HE
 *
 */
var majiang;
(function (majiang) {
    var SCALE = 0.6;
    var CARD_WIDTH = 74 * SCALE;
    var CARD_HEIGHT = 58 * SCALE;
    var CardBoxLeft = (function (_super) {
        __extends(CardBoxLeft, _super);
        function CardBoxLeft() {
            var _this = _super.call(this) || this;
            _this._deskPadding = -10;
            _this._cardPadding = -17;
            _this._cardPaddingX = 10;
            _this._deskPaddingX = -5;
            _this._direct = majiang.DIRECT.LEFT;
            return _this;
        }
        CardBoxLeft.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        CardBoxLeft.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            if (!this.isInit) {
                return;
            }
            var arrLen = this.numChildren;
            var y = 0;
            var x = 0;
            var deskLen = this._destList.length;
            for (var i = 0; i < deskLen; i++) {
                var cardType = this.getChildAt(i);
                cardType.y = y;
                cardType.x = x;
                if (i < 1) {
                    x += cardType.width - 9;
                    y = 0;
                }
                else {
                    if (i == 1) {
                        x = -24;
                    }
                    else {
                        x += 36;
                    }
                    y = cardType.height - 10;
                }
            }
            //每张牌 X 9  Y =24
            // x = 24;
            // y = 23;
            x = 45;
            y = 60;
            //居中显示
            for (var i = 1; i < deskLen; i++) {
                if (deskLen < 4) {
                    x -= (9 * i);
                    y += (24 * i);
                }
                else {
                    x -= (9 * 2);
                    y += (24 * 2);
                }
            }
            var card;
            var cardlen = this._cardsValues.length;
            for (var i = deskLen; i < arrLen; i++) {
                card = this.getChildAt(i);
                card.y = y;
                card.x = x;
                if (card.cardValue) {
                    y += card.height + this._cardPadding;
                    x += card.width = this._cardPaddingX;
                }
                else {
                    y += card.height + this._cardPadding - 20;
                    x += card.width = this._cardPaddingX - 20;
                }
            }
            if (cardlen % 3 == 2) {
                card.y += 10;
            }
        };
        return CardBoxLeft;
    }(majiang.CardBox));
    majiang.CardBoxLeft = CardBoxLeft;
    __reflect(CardBoxLeft.prototype, "majiang.CardBoxLeft");
})(majiang || (majiang = {}));
//# sourceMappingURL=CardBoxLeft.js.map