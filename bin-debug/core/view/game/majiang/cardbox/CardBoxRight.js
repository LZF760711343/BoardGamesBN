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
    var CardBoxRight = (function (_super) {
        __extends(CardBoxRight, _super);
        /**
         *
         */
        function CardBoxRight() {
            var _this = _super.call(this) || this;
            _this._deskPadding = -10;
            _this._cardPadding = -17;
            _this._cardPaddingX = 10;
            _this._deskPaddingX = -5;
            _this._direct = majiang.DIRECT.RIGHT;
            return _this;
        }
        CardBoxRight.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        CardBoxRight.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            if (!this.isInit) {
                return;
            }
            var card;
            var arrLen = this.numChildren;
            var deskLen = this._destList.length;
            var y = 0;
            var x = 0;
            for (var i = 1; i < deskLen; i++) {
                if (deskLen < 4) {
                    x += (9 * i);
                    y += (24 * i);
                }
                else {
                    x += (9 * 2);
                    y += (24 * 2);
                }
            }
            var cardlen = this._cardsValues.length;
            for (var i = deskLen; i < arrLen; i++) {
                card = this.getChildAt(i);
                card.y = y;
                card.x = x;
                if (card.cardValue) {
                    y += card.height + this._cardPadding;
                    x -= card.width = this._cardPaddingX;
                }
                else {
                    y += card.height + this._cardPadding - 20;
                    x -= card.width = this._cardPaddingX - 20;
                }
            }
            if (cardlen % 3 == 2) {
                card.y += 10;
            }
            if (deskLen) {
                y = 300;
                var cardType = this.getChildAt(deskLen - 1);
                var padding = 27 - cardType.width;
                // x = 150 + padding * 2;
                if (deskLen < 3) {
                    x = 150 + padding * (deskLen - 1);
                }
                else {
                    x = 150 + padding * 2;
                }
                for (var i = 0; i < deskLen; i++) {
                    cardType = this.getChildAt(deskLen - i - 1);
                    cardType.y = y;
                    cardType.x = x;
                    if (i == 2) {
                        x = 120 + padding * (2 - deskLen + i);
                        y = y - cardType.height + 10;
                    }
                    else {
                        x -= padding;
                    }
                }
            }
        };
        return CardBoxRight;
    }(majiang.CardBox));
    majiang.CardBoxRight = CardBoxRight;
    __reflect(CardBoxRight.prototype, "majiang.CardBoxRight");
})(majiang || (majiang = {}));
//# sourceMappingURL=CardBoxRight.js.map