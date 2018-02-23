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
    var cardMarkList = [];
    var index = 0;
    function getMark() {
        var shader = cardMarkList[index++];
        if (!shader) {
            shader = new eui.Rect();
            shader.verticalCenter = -2;
            shader.horizontalCenter = 0;
            shader.alpha = 0.3;
            shader.fillColor = 0x529ec1;
            shader.percentWidth = shader.percentHeight = 100;
            cardMarkList.push(shader);
        }
        return shader;
    }
    majiang.getMark = getMark;
    function clearMark() {
        for (var i = cardMarkList.length - 1; i > -1; --i) {
            if (cardMarkList[i].parent) {
                cardMarkList[i].parent.removeChild(cardMarkList[i]);
            }
        }
        index = 0;
    }
    majiang.clearMark = clearMark;
    var CardBox = (function (_super) {
        __extends(CardBox, _super);
        function CardBox() {
            var _this = _super.call(this) || this;
            /**
             * 碰/杠/吃等牌型之间的间隙
             */
            _this._deskPadding = -3;
            /**
             * 牌与牌之间的间隙
             */
            _this._cardPadding = 0;
            _this._direct = majiang.DIRECT.BOTTOM;
            return _this;
        }
        CardBox.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchCardsBegin, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCardsEnd, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchCardsEnd, this);
        };
        CardBox.prototype.init = function () {
            var card = this.moveCard = majiang.Card.create();
            this.start_pos = 0;
            this.point = egret.Point.create(0, 0);
            this.isCanPlayCard = true;
            this.addPlayCardTouchEvent();
        };
        /**
         * 进入选择摊牌状态
         */
        CardBox.prototype.addTanTouchEvent = function (cardValues) {
            if (!this.isTan) {
                //先移除打牌的事件
                this.removePlayCardTouchEvent();
                clearMark();
                this.setSelectCards(cardValues);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTan, this);
                this.isTan = true;
            }
        };
        /**
         * 退出摊牌阶段
         */
        CardBox.prototype.quitTan = function () {
            if (this.isTan) {
                this.isTan = this.selectList = null;
                clearMark();
                this.addPlayCardTouchEvent();
                var arrLen = this.numChildren;
                for (var i = this._destList.length; i < arrLen; i++) {
                    var card = this.getChildAt(i);
                    if (card.select) {
                        card.changeSelect();
                    }
                }
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTan, this);
            }
        };
        CardBox.prototype.onTouchTan = function (event) {
            var card = event.target;
            if (card instanceof majiang.Card && !card.isMark) {
                if (card.select) {
                    Utils.removeItemByValue(this.selectList, card.cardValue);
                }
                else {
                    this.selectList.push(card.cardValue);
                }
                card.changeSelect();
            }
        };
        CardBox.prototype.setSelectCards = function (cardValues) {
            var arrLen = this.numChildren;
            this.selectList = [];
            for (var i = this._destList.length; i < arrLen; i++) {
                var card = this.getChildAt(i);
                if (cardValues.indexOf(card.cardValue) > -1) {
                    if (!card.select) {
                        card.changeSelect();
                    }
                    this.selectList.push(card.cardValue);
                }
                else {
                    card.addChild(getMark());
                    card.isMark = true;
                }
            }
        };
        /**
         * 移除打牌的触摸事件
         */
        CardBox.prototype.removePlayCardTouchEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        };
        /**
         * 添加打牌的触摸事件
         */
        CardBox.prototype.addPlayCardTouchEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        };
        CardBox.prototype.onTouchBegin = function (event) {
            /**
             * 如果拖动牌的时候,手指或者鼠标移出屏幕外,那么就有可能接收不到TOUCH_END和TOUCH_RELEASE_OUTSIDE事件,
             * 从而this._moveSelectCard没有被设置为null,这里得检测一下,如果还存在做相应的处理
             */
            if (this._moveSelectCard) {
                this.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this._moveSelectCard = null;
                if (this.moveCard.parent) {
                    this.parent.removeChild(this.moveCard);
                }
            }
            this.isMove = null;
            var card = event.target;
            if (this.isCanPlayCard && this.getIsCanPlayCard() && card instanceof majiang.Card) {
                this._moveSelectCard = card;
                this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            }
        };
        CardBox.prototype.getIsCanPlayCard = function () {
            // return this._cardsValues.length % 3 == 2;
            return true;
        };
        CardBox.prototype.onTouchMove = function (event) {
            this.globalToLocal(event.stageX, event.stageY, this.point);
            if (this._selectCard) {
                this._selectCard.changeSelect();
                this._selectCard = null;
            }
            if (this.point.y < 30) {
                if (this.moveCard.parent) {
                    this.moveCard.y = event.stageY - this.moveCard.height / 2;
                    this.moveCard.x = event.stageX - this.moveCard.width / 2;
                }
                else {
                    if (this._moveSelectCard) {
                        this.parent.addChild(this.moveCard);
                        this.moveCard.icon = this._moveSelectCard.icon;
                        this.moveCard.y = event.stageY - this.moveCard.height / 2;
                        this.moveCard.x = event.stageX - this.moveCard.width / 2;
                    }
                }
            }
            this.isMove = true;
        };
        CardBox.prototype.playCard = function (card) {
            // this.isCanPlayCard = false;
            // var index = this.removeCard(card);
            // if (index != this._cards.length) {//不是刚刚摸到的牌,所以把摸到的牌排序
            //     this.sortLastCard();
            // }
            // var pos = this.localToGlobal(card.x, card.y, this.point);
            // card.x = pos.x;
            // card.y = pos.y;
            // this._chuCb.call(this._chuTarget, card);;
            this._selectCard = null;
            this.dispatchEventWith(CardBox.PLAY_CARD, false, card);
        };
        CardBox.prototype.onTouchEnd = function (event) {
            egret.log("onTouchEnd");
            this.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            if (this.isMove) {
                if (this.moveCard.parent) {
                    this.parent.removeChild(this.moveCard);
                    this.globalToLocal(event.stageX, event.stageY, this.point);
                    if (this.isCanPlayCard && this.getIsCanPlayCard() && this.point.y < -10) {
                        this.playCard(this._moveSelectCard);
                    }
                    this._moveSelectCard = null;
                }
            }
            else {
                this._moveSelectCard = null;
                var card = event.target;
                if (card instanceof majiang.Card) {
                    clearMark();
                    if (card == this._selectCard) {
                        card.changeSelect();
                        if (this.isCanPlayCard && this.getIsCanPlayCard()) {
                            this.playCard(card);
                        }
                        else {
                            this._selectCard = null;
                        }
                    }
                    else {
                        // this.sendAddCardEvent(card.cardValue);
                        this.dispatchEventWith(CardBox.ADD_CARD_MARK, false, card.cardValue);
                        card.changeSelect();
                        if (this._selectCard)
                            this._selectCard.changeSelect();
                        this._selectCard = card;
                    }
                }
            }
        };
        CardBox.prototype.deleteCard = function (value) {
            var len = this._destList.length - 1;
            for (var i = this.numChildren - 1; i > len; --i) {
                var card = this.getChildAt(i);
                if (!card.cardValue || card.cardValue === value) {
                    this._cardsValues.splice(i - this._destList.length, 1);
                    this.removeChild(card);
                    var pos = this.localToGlobal(card.x, card.y, this.point);
                    card.x = pos.x;
                    card.y = pos.y;
                    return card;
                }
            }
        };
        CardBox.prototype.deleteCards = function (cardValues) {
            var arrLen = cardValues.length;
            for (var i = 0; i < arrLen; i++) {
                this.deleteCard(cardValues[i]);
            }
        };
        /**
        * 增加一个碰/杠/胡/吃/勺牌型对象到手牌里面
        */
        CardBox.prototype.addCardTypeObj = function (item) {
            var obj = this.getCardTypeObj(item);
            this.addChildAt(obj, this._destList.length);
            this._destList.push(item);
            if (item.delCards && item.delCards.length) {
                this.deleteCards(item.delCards);
            }
        };
        CardBox.prototype.updateCardType = function (item) {
            var arrLen = this._destList.length;
            for (var i = 0; i < arrLen; i++) {
                var cardType = this.getChildAt(i);
                egret.log("updateCardType:", cardType.dest.activeType, cardType.dest.cardValue, "item.cardValue:", item.cardValue);
                if (cardType.dest.cardValue == item.cardValue) {
                    egret.log("updateCardType_success");
                    cardType.setCards(item, this._direct);
                    break;
                }
            }
            egret.log("item:", item);
            if (item.delCards && item.delCards.length) {
                this.deleteCards(item.delCards);
            }
        };
        CardBox.prototype.updateCardView = function () {
        };
        CardBox.prototype.sortLastCard = function () {
            if (this._cardsValues.length > 1) {
                majiang.Majiang.sort(this._cardsValues, this._LziCard);
                var arrLen = this.numChildren;
                var lastCard = this.getChildAt(arrLen - 1);
                for (var i = this._destList.length; i < arrLen - 1; i++) {
                    var card = this.getChildAt(i);
                    if (this._LziCard == lastCard.cardValue) {
                        this.addChildAt(lastCard, this._destList.length);
                    }
                    else {
                        if (this._LziCard != card.cardValue) {
                            if (card.cardValue >= lastCard.cardValue) {
                                this.addChildAt(lastCard, i);
                                break;
                            }
                        }
                    }
                }
            }
        };
        // protected getCard() {
        //     let card = Card.create();
        //     return card;
        // }
        CardBox.prototype.getCard = function (cardValue) {
            var card = majiang.Card.create();
            // card.cardValue = cardValue;
            egret.log("cardValue111", cardValue);
            // this.addChild(card);
            card.cardValue = cardValue;
            card.setHandCardIcon(this._direct, cardValue, this._LziCard);
            // card.icon = `mj_bottom${cardValue}_png`;
            return card;
        };
        CardBox.prototype.getCardTypeObj = function (dest) {
            var cardType = majiang.CardType.create();
            cardType.setCards(dest, this._direct);
            return cardType;
        };
        /**
         * 增加一张牌,用于补牌的时候用的
         */
        CardBox.prototype.addCard = function (cardValue) {
            egret.log("cardValue222", cardValue);
            this._cardsValues.push(cardValue);
            this.addChild(this.getCard(cardValue));
        };
        /**
         * 增加若干张牌
         */
        CardBox.prototype.addCards = function (cardValues) {
            var arrLen = cardValues.length;
            for (var i = 0; i < arrLen; i++) {
                this.addCard(cardValues[i]);
                this.sortLastCard();
            }
        };
        CardBox.prototype.initCards = function (LaziCardVal, handcards, destList, sortType) {
            if (sortType === void 0) { sortType = true; }
            if (this.isInit) {
                return;
            }
            this._LziCard = LaziCardVal;
            if (sortType) {
                majiang.Majiang.sort(handcards, this._LziCard);
            }
            // }else{
            //     Majiang.sortLazi(handcards, this._LziCard);
            // }
            this._destList = destList;
            this._cardsValues = handcards;
            this.clearCards();
            var arrLen = this._destList.length;
            for (var i = 0; i < arrLen; i++) {
                var cardType = this.getCardTypeObj(this._destList[i]);
                // if (this._direct == DIRECT.RIGHT) {
                //     // egret.log("this._direct",this._direct);
                //     this.addChildAt(cardType, 0);
                // } else {
                this.addChild(cardType);
            }
            arrLen = this._cardsValues.length;
            for (var i = 0; i < arrLen; i++) {
                var card = this.getCard(this._cardsValues[i]);
                this.addChild(card);
            }
            this.isInit = true;
        };
        Object.defineProperty(CardBox.prototype, "deskPadding", {
            get: function () {
                return this._deskPadding;
            },
            set: function (v) {
                this._deskPadding = v;
                this.updateDisplayList(0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CardBox.prototype, "cardPadding", {
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
        CardBox.prototype.reset = function () {
            this.clearCards();
            this._destList =
                // this.moveCard =
                this._moveSelectCard =
                    this._selectCard =
                        this._cardsValues =
                            null;
            this.isInit = false;
        };
        CardBox.prototype.destroy = function () {
            if (this.point) {
                egret.Point.release(this.point);
                this.point = null;
            }
        };
        CardBox.prototype.measure = function () {
            _super.prototype.measure.call(this);
            egret.log("CardBox:measure");
        };
        CardBox.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            if (!this.isInit) {
                return;
            }
            var arrLen = this.numChildren;
            var x = 0;
            var deskLen = this._destList.length;
            for (var i = 0; i < deskLen; i++) {
                var cardType = this.getChildAt(i);
                cardType.y = 10;
                cardType.x = x;
                x += cardType.width + this._deskPadding;
            }
            x += 10;
            var card;
            var cardlen = this._cardsValues.length;
            for (var i = deskLen; i < arrLen; i++) {
                card = this.getChildAt(i);
                card.x = x;
                x += card.width + this._cardPadding;
            }
            if (cardlen % 3 == 2) {
                card.x += 10;
            }
        };
        CardBox.prototype.clearCards = function () {
            this.removeChildren();
            // let arrLen = Array.length;
            // for(let i = 0; i < arrLen; i++){
            // }
        };
        return CardBox;
    }(eui.Group));
    /**
     * 出牌事件
     */
    CardBox.PLAY_CARD = "playcCard";
    /**
     * 给选中牌加入标志
     */
    CardBox.ADD_CARD_MARK = "addCardMark";
    majiang.CardBox = CardBox;
    __reflect(CardBox.prototype, "majiang.CardBox");
})(majiang || (majiang = {}));
//# sourceMappingURL=CardBox.js.map