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
    var SCALE = 0.8;
    var CARD_WIDTH = 54 * SCALE;
    var CARD_HEIGHT = 83 * SCALE;
    var CardBoxTop = (function (_super) {
        __extends(CardBoxTop, _super);
        /**
         *
         */
        function CardBoxTop() {
            var _this = _super.call(this) || this;
            _this._cardPadding = -1;
            _this._direct = majiang.DIRECT.TOP;
            return _this;
        }
        CardBoxTop.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        // /**
        //  * 增加一个碰/杠/胡/吃/勺牌型对象到手牌里面
        //  */
        // public addCardTypeObj(item: MJActionItem) {
        //     this._destList.push(item);
        //     let obj = this.getCardTypeObj(item);
        //     this.addChildAt(obj, this._cardsValues.length);
        //     if (item.delCards && item.delCards.length) {
        //         this.deleteCards(item.delCards);
        //     }
        // }
        // public updateCardType(item: MJActionItem) {
        //     let arrLen = this.numChildren;
        //     for (let i = this._cardsValues.length; i < arrLen; i++) {
        //         let cardType = <CardType>this.getChildAt(i);
        //         if (cardType.dest.activeType === ACTIVE_TYPE.SHAO && cardType.dest.cardValue === item.cardValue) {
        //             cardType.setCards(item, this._direct);
        //             break;
        //         }
        //     }
        //     if (item.delCards && item.delCards.length) {
        //         this.deleteCards(item.delCards);
        //     }
        // }
        // public deleteCard(value: number) {
        //     for (var i = this.numChildren - 1; i > -1; --i) {
        //         let card = <Card>this.getChildAt(i);
        //         if (!card.cardValue || card.cardValue === value) {
        //             this._cardsValues.splice(i - this._destList.length, 1);
        //             this.removeChild(card);
        //             var pos = this.localToGlobal(card.x, card.y, this.point);
        //             card.x = pos.x;
        //             card.y = pos.y;
        //             return card;
        //         }
        //     }
        // }
        CardBoxTop.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            if (!this.isInit) {
                return;
            }
            var arrLen = this.numChildren;
            var x = this.width;
            var deskLen = this._destList.length;
            var cardType;
            for (var i = 0; i < deskLen; i++) {
                cardType = this.getChildAt(i);
                x -= cardType.width;
                cardType.x = x;
                x -= this._deskPadding;
            }
            if (cardType) {
                x -= (10);
            }
            var card;
            var cardlen = this._cardsValues.length;
            for (var i = deskLen; i < arrLen; i++) {
                card = this.getChildAt(i);
                x -= card.width;
                card.x = x;
                x -= this._cardPadding;
            }
            if (cardlen % 3 == 2) {
                card.x -= 10;
            }
        };
        return CardBoxTop;
    }(majiang.CardBox));
    majiang.CardBoxTop = CardBoxTop;
    __reflect(CardBoxTop.prototype, "majiang.CardBoxTop");
})(majiang || (majiang = {}));
//# sourceMappingURL=CardBoxTop.js.map