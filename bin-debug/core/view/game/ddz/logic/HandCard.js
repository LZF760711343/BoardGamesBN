var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DDZ;
(function (DDZ) {
    var _pool = [];
    var HandCard = (function () {
        function HandCard() {
            this.handValue = 0;
        }
        HandCard.prototype.init = function (cards) {
            if (cards.length === 0) {
                true && egret.error("HandCard:cards \u7684\u957F\u5EA6\u4E0D\u80FD\u4E3A0!!!!");
                return;
            }
            this.handType = 0 /* NONE */;
            this.handSubType = 0;
            //先对扑克牌排序
            // Poker.sortCards(cards);
            cards.sort(function (card1, card2) { return card1.cmpValue - card2.cmpValue; });
            /**
             * 创建一个二维数组,
             * 将cards里面相同的牌放在一个数组里面,
             * 然后把这个数组放到二维数组里面
             */
            var someCard = [cards[0]];
            var allCards = [someCard];
            var preCard = cards[0];
            var arrLen = cards.length;
            // this.cards = cards;
            for (var i = 1; i < arrLen; i++) {
                if (cards[i].value != preCard.value) {
                    someCard = [];
                    allCards.push(someCard);
                    preCard = cards[i];
                }
                someCard.push(cards[i]);
            }
            switch (allCards.length) {
                //如果数组长度只有一,说明所有的牌都是一样的
                case 1:
                    var sumCnt = allCards[0].length;
                    this.calOne(allCards[0].length, allCards[0][0]);
                    break;
                case 2:
                    this.calTwo(allCards, cards.length);
                    break;
                default:
                    this.calOther(allCards, cards);
                    break;
            }
            if (this.handType !== 0 /* NONE */)
                this.cards = cards;
            this.handSubType = cards.length;
        };
        // public 
        /**
         * 所有牌都相同的情况下
         */
        HandCard.prototype.calOne = function (cnt, card) {
            switch (cnt) {
                case 1:
                    this.handType = 9 /* SINGLE */;
                    break;
                case 2:
                    this.handType = 8 /* YIDUI */;
                    break;
                case 3:
                    this.handType = 7 /* SANZHANG */;
                    break;
                case 4:
                    this.handType = 15 /* BOMB */;
                    break;
            }
            this.handValue = (this.handType << DDZ.TYPE_SHIFT) + (card.cmpValue >> DDZ.SUIT_SHIFT);
        };
        /**
         * 在有两种牌情况下
         */
        HandCard.prototype.calTwo = function (allCards, cardCnt) {
            var cardCnt1 = allCards[0].length;
            var card1 = allCards[0][0];
            var cardCnt2 = allCards[1].length;
            var card2 = allCards[1][0];
            if (card1.value === 14 /* VALUE_XG */ && card2.value === 15 /* VALUE_DG */) {
                this.setHandInfo(16 /* HUOJIAN */, 0);
            }
            else if (cardCnt1 === 3 && cardCnt2 === 3 && card1.nextValue() === card2.value) {
                // this.handSubType = cardCnt;
                this.setHandInfo(3 /* SANSHUN */, card2.realValue);
            }
            else if (cardCnt1 === 3 && cardCnt2 < 3) {
                this.setHandInfo(6 /* SANDAIYI */, card1.realValue);
            }
            else if (cardCnt2 === 3 && cardCnt1 < 3) {
                this.setHandInfo(6 /* SANDAIYI */, card2.realValue);
            }
            else if (cardCnt1 === 4 && cardCnt2 === 2) {
                this.setHandInfo(1 /* SIDAIER */, card1.realValue);
            }
            else if (cardCnt2 === 4 && cardCnt1 === 2) {
                this.setHandInfo(1 /* SIDAIER */, card2.realValue);
            }
        };
        /**
         * 在有三种牌或者三种牌以上的情况下
         */
        HandCard.prototype.calOther = function (allCards, cards) {
            var maxCount = 0; //牌最多的数量
            var i = 0;
            var maxInIndex = 0;
            var maxCard = null;
            var noSameCount = allCards.length;
            for (var key in allCards) {
                var count = allCards[key].length;
                if (count >= maxCount) {
                    maxCount = count;
                    maxCard = allCards[key][0];
                    maxInIndex = i;
                }
                i++;
            }
            if (maxCount === 4) {
                if (noSameCount === 3) {
                    var secondMax = 0; //第二多的牌
                    for (var key in allCards) {
                        var count = allCards[key].length;
                        if (count != maxCount) {
                            if (secondMax == 0) {
                                secondMax = count;
                            }
                            else if (secondMax == count) {
                                this.setHandInfo(1 /* SIDAIER */, maxCard.realValue);
                            }
                        }
                    }
                }
            }
            else if (maxCount === 3) {
                if (maxInIndex >= 1 && cards.length > 5) {
                    var sanCount = 1; //3张的数量
                    var tempPreCard = maxCard;
                    var secondMax = 0; //第二大的牌
                    for (var k = maxInIndex - 1; k >= 0; k--) {
                        var tempCard = allCards[k][0];
                        var count = allCards[k].length;
                        if (count === maxCount) {
                            if (tempPreCard.preValue() === tempCard.value) {
                                tempPreCard = tempCard;
                                sanCount++;
                            }
                            else {
                                return;
                            }
                        }
                    }
                    //三顺
                    if (noSameCount === sanCount) {
                        this.setHandInfo(3 /* SANSHUN */, maxCard.realValue);
                    }
                    else if (cards.length == sanCount * 4 || cards.length == sanCount * 5) {
                        // let arrLen = Array.length;
                        if (cards.length === sanCount * 5) {
                            for (var i_1 = 0; i_1 < noSameCount; i_1++) {
                                if (allCards[i_1].length !== 2 && allCards[i_1].length != maxCount) {
                                    return;
                                }
                            }
                        }
                        this.setHandInfo(2 /* FEIJIDAICHIBANG */, maxCard.realValue);
                    }
                }
                else {
                }
            }
            else if (maxCount == 2 || maxCount == 1 && cards.length >= 5) {
                var count = 0;
                //首先相同最大牌的序号要等于不同牌的数量
                if (maxInIndex + 1 == noSameCount) {
                    var tempPreCard = maxCard;
                    for (var k = maxInIndex - 1; k >= 0; k--) {
                        var tempCard = allCards[k][0];
                        if (allCards[k].length == maxCount && tempPreCard.preValue() == tempCard.value) {
                            tempPreCard = tempCard;
                        }
                        else {
                            return;
                        }
                    }
                    if (maxCount == 2) {
                        this.setHandInfo(4 /* SHUANGSHUN */, maxCard.realValue);
                    }
                    else if (maxCount == 1) {
                        this.setHandInfo(5 /* DANSHUN */, maxCard.realValue);
                    }
                }
            }
        };
        HandCard.prototype.setHandInfo = function (handType, realValue) {
            this.handValue = (handType << DDZ.TYPE_SHIFT) + realValue;
            this.handType = handType;
            // this.handSubType = handSubType;
        };
        HandCard.prototype.destroy = function () {
            // this.cards = 
            this.handType = this.handSubType = this.handValue = null;
            _pool.push(this);
        };
        HandCard.prototype.reset = function () {
            this.handType = this.handSubType = this.handValue = null;
        };
        HandCard.create = function () {
            if (_pool.length) {
                return _pool.pop();
            }
            else {
                return new HandCard();
            }
        };
        return HandCard;
    }());
    DDZ.HandCard = HandCard;
    __reflect(HandCard.prototype, "DDZ.HandCard");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=HandCard.js.map