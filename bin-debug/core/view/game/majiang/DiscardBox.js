var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var majiang;
(function (majiang) {
    // const CARD_W = 74;
    // const CARD_H = 98;
    // export const SHOW_CARD_SIZE = {
    //     LEFT_RIGHT_WIDTH : 46,
    //     LEFT_RIGHT_HEIGHT: 38,
    //     TOP_BOTTOM_WIDTH: 41,
    //     TOP_BOTTOM_HEIGHT: 56,
    // }
    var SCALE = 1;
    var DiscardBox = (function (_super) {
        __extends(DiscardBox, _super);
        function DiscardBox() {
            var _this = _super.call(this) || this;
            _this._rect = egret.Rectangle.create();
            return _this;
        }
        DiscardBox.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this._colPos = this[this._colKey];
            // this._rowPos = this[this._rowKey];
            // this.cards = [];
        };
        Object.defineProperty(DiscardBox.prototype, "direct", {
            get: function () {
                return this._direct;
            },
            set: function (value) {
                this._direct = value;
                switch (value) {
                    case "left":
                        this._colKey = "top";
                        this._rowKey = "left";
                        this._colPadding = 23;
                        this._rowPadding = 76;
                        this._colXpading = -4;
                        this._rect.width = 38;
                        this._rect.height = 46;
                        this.maxCnt = 9;
                        break;
                    case "right":
                        this._colKey = "bottom";
                        this._rowKey = "right";
                        this._colPadding = 23;
                        this._rowPadding = -76;
                        this._colXpading = -4;
                        this._rect.width = 38;
                        this._rect.height = 46;
                        this.maxCnt = 9;
                        break;
                    case "top":
                        this._colKey = "right";
                        this._rowKey = "top";
                        this._colPadding = 37;
                        this._rowPadding = -(-15 + 56);
                        this._colXpading = -4;
                        this._rect.width = 38;
                        this._rect.height = 46;
                        this.maxCnt = 9;
                        break;
                    case "bottom":
                        this._colKey = "left";
                        this._rowKey = "bottom";
                        this._colPadding = -5 + 41;
                        this._rowPadding = -(-15 + 56);
                        this._rect.width = 41;
                        this._rect.height = 56;
                        this.maxCnt = 9;
                        break;
                    case "left_tan":
                        this._colKey = "top";
                        this._rowKey = "left";
                        this._colPadding = 18;
                        this._rowPadding = 74;
                        this._colXpading = -7;
                        this._rect.width = 38;
                        this._rect.height = 46;
                        this.maxCnt = 18;
                        break;
                    case "right_tan":
                        this._colKey = "bottom";
                        this._rowKey = "right";
                        this._colPadding = 18;
                        this._rowPadding = -78;
                        this._colXpading = -7;
                        this._rect.width = 38;
                        this._rect.height = 46;
                        this.maxCnt = 18;
                        break;
                    case "bottom_tan":
                        this._colKey = "left";
                        this._rowKey = "bottom";
                        this._colPadding = -5 + 41;
                        this._rowPadding = -10 + 56;
                        this._rect.width = 41;
                        this._rect.height = 56;
                        this.maxCnt = 18;
                        break;
                }
                this.reset();
            },
            enumerable: true,
            configurable: true
        });
        DiscardBox.prototype.getLastCardPos = function () {
            var card;
            if (this.cards.length) {
                card = this.cards[this.cards.length - 1];
                var col = this[this._colKey] + card[this._colKey];
                var row = this[this._rowKey] + card[this._rowKey];
            }
            else {
                card = this;
                var col = 0;
                var row = 0;
            }
            // let x = 
            switch (this._direct) {
                case "left":
                    this._rect.x = row;
                    this._rect.y = col;
                    break;
                case "right":
                    this._rect.x = Global.sWidth - row - card.width;
                    this._rect.y = Global.sHeight - col - card.height;
                    break;
                case "top":
                    this._rect.x = Global.sWidth - col - card.width;
                    this._rect.y = row;
                    break;
                case "bottom":
                    this._rect.x = col;
                    this._rect.y = Global.sHeight - row - card.height;
                    break;
            }
            return this._rect;
        };
        DiscardBox.prototype.setTip = function () {
            if (this.cards.length) {
                var object = this.lastTipImg;
                var card = this.cards[this.cards.length - 1];
                object.x = card.width / 2 - 27 / 2;
                object.y = -33 + card.height / 2 - 5;
                card.addChild(object);
                egret.log("card.height / 2", card.height / 2, "object.height", object.height);
                egret.Tween.get(object, { loop: true })
                    .to({ y: object.y - 10 }, 500)
                    .to({ y: object.y }, 300);
            }
        };
        DiscardBox.prototype.addCardWithAni = function (showCard, cardValue) {
            var _this = this;
            var pos = this.parent.globalToLocal(this.x, this.y);
            var card = this.cards[this.cards.length - 1];
            var x;
            var y;
            egret.log("this._colPos", this._colPos);
            egret.log("this._rowPos", this._rowPos);
            if (card) {
                x = pos.x + card.x;
                y = pos.y + card.y;
            }
            else {
                x = pos.x;
                y = pos.y;
            }
            return egret.Tween.get(showCard)
                .to({ x: x, y: y, scaleX: SCALE, scaleY: SCALE }, 250)
                .call(function () {
                _this.addCard(showCard);
                showCard.setDisIcon(_this._direct, cardValue);
                _this.setTip();
            });
        };
        DiscardBox.prototype.getRowCnt = function () {
            egret.log("getRowCnt:", this.cards.length, this.maxCnt, this.cards.length / this.maxCnt);
            return this.cards.length / this.maxCnt;
        };
        DiscardBox.prototype.addCard = function (card) {
            card[this._colKey] = this._colPos;
            card[this._rowKey] = this._rowPos;
            this.cards.push(card);
            if (this._direct == "left" || this._direct == "left_tan") {
                if (this.cards.length % this.maxCnt == 0) {
                    this._colPos = 0;
                    this._rowPos += this._rowPadding;
                }
                else {
                    this._colPos += this._colPadding;
                    this._rowPos += this._colXpading;
                }
            }
            else if (this._direct == "right" || this._direct == "right_tan") {
                if (this.cards.length % this.maxCnt == 0) {
                    this._colPos = 0;
                    this._rowPos += this._rowPadding;
                }
                else {
                    this._colPos += this._colPadding;
                    this._rowPos -= this._colXpading;
                }
            }
            else {
                if (this.cards.length % this.maxCnt == 0) {
                    this._colPos = 0;
                    this._rowPos += this._rowPadding;
                }
                else {
                    this._colPos += this._colPadding;
                }
            }
            if (this._direct == "right" || this._direct == "right_tan" && this.cards.length > 1) {
                this.addChildAt(card, this.getChildIndex(this.cards[this.cards.length - 2]));
            }
            else if (this._direct == "top") {
                this.addChildAt(card, 0);
            }
            else {
                this.addChild(card);
            }
        };
        DiscardBox.prototype.addCardByValues = function (values) {
            var arrLen = values.length;
            for (var i = 0; i < arrLen; i++) {
                this.addCardByValue(values[i]);
            }
        };
        DiscardBox.prototype.addCardByValue = function (value) {
            var card = majiang.Card.create();
            card.cardValue = value;
            egret.log("card.cardValue", card.cardValue);
            this.addCard(card);
            if (this._direct.indexOf("_tan") != -1) {
                var val = this._direct.substring(0, this._direct.indexOf("_tan"));
            }
            else {
                card.setDisIcon(this._direct, value);
            }
            card.scaleX = card.scaleY = SCALE;
            return card;
        };
        /**
         * 删除最后一张牌
         */
        DiscardBox.prototype.deleteLastCard = function (cardValue) {
            if (this.cards.length) {
                if (this.cards[this.cards.length - 1].cardValue === cardValue) {
                    var card = this.cards.pop();
                    this._colPos = card[this._colKey];
                    this._rowPos = card[this._rowKey];
                    this.removeChild(card);
                    return card;
                }
            }
            return null;
        };
        DiscardBox.prototype.initCards = function (cards) {
            this.clearDiscard();
            if (cards) {
                var length = cards.length;
                for (var i = 0; i < length; ++i) {
                    this.addCardByValue(cards[i]);
                }
            }
        };
        DiscardBox.prototype.addCardMark = function (event) {
            var cardValue = event.data;
            for (var i = this.cards.length - 1; i > -1; --i) {
                egret.log("this.cards[i].cardValue", this.cards[i].cardValue);
                egret.log("cardValue", cardValue);
                if (this.cards[i].cardValue === cardValue) {
                    this.cards[i].addChild(majiang.getMark());
                }
            }
        };
        DiscardBox.prototype.reset = function () {
            this._colPos = 0;
            this._rowPos = 0;
            if (this.cards && this.cards.length) {
                var num = this.cards.length;
                for (var i = num - 1; i > -1; i--) {
                    var card = this.cards[i];
                    card.destroy();
                }
            }
            this.cards = [];
            if (this.lastTipImg) {
                if (this.lastTipImg.parent) {
                    this.lastTipImg.parent.removeChild(this.lastTipImg);
                }
                egret.Tween.removeTweens(this.lastTipImg);
            }
        };
        DiscardBox.prototype.destroy = function () {
            if (this.lastTipImg) {
                if (this.lastTipImg.parent) {
                    this.lastTipImg.parent.removeChild(this.lastTipImg);
                }
                egret.Tween.removeTweens(this.lastTipImg);
            }
        };
        DiscardBox.prototype.clearDiscard = function () {
            var length = this.cards.length;
            for (var i = 0; i < length; ++i) {
                this.removeChild(this.cards[i]);
            }
            this._colPos = 0;
            this._rowPos = 0;
            this.cards = [];
        };
        return DiscardBox;
    }(eui.Group));
    majiang.DiscardBox = DiscardBox;
    __reflect(DiscardBox.prototype, "majiang.DiscardBox");
})(majiang || (majiang = {}));
//# sourceMappingURL=DiscardBox.js.map