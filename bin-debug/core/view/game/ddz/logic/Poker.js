var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DDZ;
(function (DDZ) {
    // type IgetHandTypeIterator
    function getHandTypeIterator(arr) {
        var _cIndex = 0;
        return function () {
            if (_cIndex === arr.length) {
                _cIndex = 0;
            }
            egret.log(arr);
            return arr[_cIndex++].cards;
        };
    }
    DDZ.getHandTypeIterator = getHandTypeIterator;
    // export class HandTypeIterator extends Array{
    // 	private _curIndex:number;
    // }
    var Poker = (function () {
        function Poker() {
            /**
             * 抢完地主后的公共牌
             */
            this.publicCards = [];
            /**
             * 上个人打出的牌
             */
            this.lastPlayCards = [];
            this.handCard = DDZ.HandCard.create();
        }
        Poker.prototype.init = function (cardValues) {
            this.isinit = true;
            this._cardValues = cardValues;
            this.pokerCards = [];
            this.handCard.reset();
            this.allCards = null;
            this.bombList = null;
            Poker.createPokerCards(cardValues, this.pokerCards);
            egret.log("", this.pokerCards.toString());
        };
        Poker.prototype.getFirstBestOption = function (cards) {
            // let result = this.findHandtype(this.pokerCards, this.lastHandValue, this.lastHandType, this.lastSubHandType, this.bombList);
            // let result = this.findSlide(cards, handType, realValue, subHandType, 1, subHandType);
            var arrLen = cards.length;
            var allcards = this.allCards = this.allCards || this.mergeSameCard(this.pokerCards);
            var allCardLen = allcards.length;
            var tmpHandCard = this.handCard;
            //多加一张牌
            for (var i = allCardLen - 1; i >= 0; i--) {
                var card = allcards[i][0];
                if (cards.indexOf(card) === -1) {
                    var tmpCards_1 = cards.concat(card);
                    tmpHandCard.init(tmpCards_1);
                }
                if (tmpHandCard.handType !== 0 /* NONE */) {
                    return tmpHandCard;
                }
            }
            // 2. 少一张可成选项
            for (var i = arrLen - 1; i >= 0; i--) {
                var tmpCards = cards.slice(0, i).concat(cards.slice(i + 1));
                tmpHandCard.init(tmpCards);
                if (tmpHandCard.handType !== 0 /* NONE */) {
                    return tmpHandCard;
                }
            }
            // 3. 加一张同时少一张可成选项
            for (var i = allCardLen - 1; i >= 0; i--) {
                var card = allcards[i][0];
                if (cards.indexOf(card) === -1) {
                    var tmpCards_2 = cards.concat(card);
                    tmpHandCard.init(tmpCards_2);
                    for (var j = tmpCards_2.length - 1; j >= 0; j--) {
                        var tmpcards2 = tmpCards_2.slice(0, j).concat(cards.slice(j + 1));
                        // var tmpCards: PokerCard[] = cards.slice(0, i).concat(cards.slice(i + 1));
                        tmpHandCard.init(tmpCards_2);
                        if (tmpHandCard.handType !== 0 /* NONE */) {
                            return tmpHandCard;
                        }
                    }
                }
            }
        };
        /**
         * 检查牌的牌型是否正确
         * @param cards:要检查的扑克牌列表
         * @param handType:要检查的牌型,如果传了这个值的话,
         * 	      会检查cards是否是这个牌型,如果没有传,就只检测牌是否符合出牌规则
         */
        Poker.prototype.checkCardsValid = function (cards, isMove) {
            if (cards.length) {
                this.handCard.init(cards);
                if (this.handCard.handType === 0 /* NONE */) {
                    if (isMove) {
                        //智能选牌
                        if (this.lastHandType) {
                            var allCards = this.mergeSameCard(cards);
                            var result = this.findHandtype(allCards, cards, this.lastHandValue, this.lastHandType, this.lastSubHandType, null);
                            egret.log(result);
                            if (result && result.length) {
                                return result[0].cards;
                            }
                        }
                        else {
                            if (cards.length > 4) {
                                var result = this.getFirstBestOption(cards);
                                if (result) {
                                    // Poker.sortCards(result.cards);
                                    return result.cards;
                                }
                            }
                        }
                    }
                    return;
                }
                if (this.lastHandType) {
                    if (this.handCard.handType >= 15 /* BOMB */) {
                        if (this.lastHandValue >= 15 /* BOMB */) {
                            if (this.handCard.handValue > this.lastHandValue) {
                                return cards;
                            }
                            else {
                                return;
                            }
                        }
                        return cards;
                    }
                    else if (this.handCard.handType === this.lastHandType && this.handCard.handValue > this.lastHandValue && this.handCard.handSubType === this.lastSubHandType) {
                        return cards;
                    }
                    return null;
                }
                return cards;
            }
        };
        Poker.prototype.findProbHandCards = function () {
            if (this.lastHandType) {
                if (this.lastHandType === 16 /* HUOJIAN */) {
                    this.probHandCards = this.probHandCardsIterator = null;
                    return null;
                }
                var allCards = this.allCards = this.allCards || this.mergeSameCard(this.pokerCards);
                if (!this.bombList) {
                    this.bombList = this.findBomb(allCards, 0 /* NONE */);
                }
                egret.log(this.bombList);
                var result = this.findHandtype(allCards, this.pokerCards, this.lastHandValue, this.lastHandType, this.lastSubHandType, this.bombList);
                // if (this.bombList && this.bombList.length) {
                // 	result = result.concat(this.bombList);
                // }
                if (this.bombList && this.bombList.length && this.lastHandType < 15 /* BOMB */) {
                    var arrLen = this.bombList.length;
                    for (var i = 0; i < arrLen; i++) {
                        if (this.bombList[i].handValue > this.lastHandValue) {
                            result.push(this.bombList[i]);
                        }
                    }
                }
                if (result && result.length) {
                    this.probHandCards = result;
                    this.probHandCardsIterator = getHandTypeIterator(result);
                }
                else {
                    this.probHandCards = this.probHandCardsIterator = null;
                }
            }
        };
        /**
         * 查找某一个牌型能出的起的所有选项
         */
        Poker.prototype.findHandtype = function (allCards, cards, lastHandValue, handType, subHandType, bombList) {
            egret.log("findHandtype");
            if (this.lastHandType) {
                var realValue = lastHandValue & 0xfff;
                var result = [];
                switch (handType) {
                    case 9 /* SINGLE */:
                        result = this.findSingle(allCards, handType, realValue, subHandType);
                        break;
                    case 8 /* YIDUI */:
                        result = this.findPair(allCards, handType, realValue, subHandType);
                        break;
                    case 5 /* DANSHUN */:
                        result = this.findSlide(allCards, handType, realValue, subHandType, 1, subHandType);
                        break;
                    case 6 /* SANDAIYI */: //三带一/二
                    case 7 /* SANZHANG */:
                        result = this.findTriple(allCards, handType, realValue, subHandType);
                        break;
                    case 4 /* SHUANGSHUN */:
                        result = this.findSlide(allCards, handType, realValue, subHandType, 2, subHandType / 2);
                        break;
                    case 3 /* SANSHUN */:
                        result = this.findSlide(allCards, handType, realValue, subHandType, 3, subHandType / 3);
                        break;
                    case 2 /* FEIJIDAICHIBANG */:
                        result = this.findPlane(allCards, cards, handType, realValue, subHandType);
                        break;
                    case 1 /* SIDAIER */:
                        result = this.findFour2(allCards, handType, realValue, subHandType);
                        break;
                    case 15 /* BOMB */:
                        result = [];
                        var arrLen = this.bombList.length;
                        for (var i = 0; i < arrLen; i++) {
                            egret.log(this.bombList[i].handValue, lastHandValue);
                            if (this.bombList[i].handValue > lastHandValue) {
                                result.push(this.bombList[i]);
                            }
                        }
                        break;
                    case 16 /* HUOJIAN */:
                        return;
                }
                return result;
            }
        };
        /**
         * 把相同的牌合并为一个数组
         */
        Poker.prototype.mergeSameCard = function (cards) {
            // if (this.allCards) {
            // 	return this.allCards;
            // }
            // let cards = this.pokerCards;
            var someCard = [cards[0]];
            var temp = [someCard];
            var preCard = cards[0];
            var arrLen = cards.length;
            for (var i = 1; i < arrLen; i++) {
                if (cards[i].value != preCard.value) {
                    someCard = [];
                    temp.push(someCard);
                    preCard = cards[i];
                }
                someCard.push(cards[i]);
            }
            return temp;
        };
        /**
         * 查找所有打得起的单牌
         * @param handType:要查找的牌型
         * @param realValue:牌值
         */
        Poker.prototype.findSingle = function (allCards, handType, realValue, handSubType) {
            return this.findSameCard(1, handType, realValue, handSubType, allCards);
        };
        /**
         * 查找所有打得起的对子
         *
         */
        Poker.prototype.findPair = function (allCards, handType, realValue, handSubType) {
            return this.findSameCard(2, handType, realValue, handSubType, allCards);
            // return this.findSameCard(2, realValue, allCards);
        };
        /**
         * 查找所有打得起的顺子(包过连顺,三顺)
         * @param handType:牌型
         * @param realValue顺子结束的那张牌的牌值
         * @param handSubType:牌型子类型,在顺子里面表示顺子的长度(这里的长度指的是不同牌的数量)
         * @param len:要找的是单顺,连顺,还是三顺
         * @param cnt:要找的顺子是几连的,比如  3,4,5,6,7,8就是6连, 33,44,55,66是4连的
         */
        Poker.prototype.findSlide = function (allCards, handType, realValue, handSubType, len, cnt) {
            allCards = allCards.concat().reverse();
            var result = [];
            var startValue = realValue + 2 - cnt;
            var arrLen = allCards.length;
            for (var i = 0; i < arrLen; i++) {
                egret.log(allCards[i][0].realValue, startValue);
                if (allCards[i][0].realValue >= startValue) {
                    var endValue = allCards[i][0].realValue + cnt - 1;
                    if (endValue > 12 /* VALUE_A */) {
                        break;
                    }
                    var jLen = i + cnt - 1;
                    egret.log("jLen:", jLen);
                    if (!allCards[jLen]) {
                        break;
                    }
                    if (allCards[jLen][0].realValue === endValue) {
                        var isSlide = true;
                        var extraCnt = 0;
                        var cards = [];
                        for (var j = i; j <= jLen; j++) {
                            if (allCards[j].length >= len) {
                                extraCnt += (allCards[j].length - len);
                                cards.push.apply(cards, allCards[j].slice(0, len));
                            }
                            else {
                                isSlide = false;
                                break;
                            }
                        }
                        if (isSlide) {
                            var handcard = DDZ.HandCard.create();
                            handcard.cards = cards;
                            Poker.sortCards(cards);
                            handcard.setHandInfo(handType, endValue);
                            handcard.handSubType = handSubType;
                            handcard.sortNum = (extraCnt << 4) + endValue;
                            result.push(handcard);
                        }
                    }
                }
            }
            return result;
        };
        /**
         * 查找所有的炸弹
         */
        Poker.prototype.findBomb = function (allCards, realValue) {
            var rocket = this.findRocket(allCards);
            egret.log("rocket:", rocket);
            var list = this.findSameCard(4, 15 /* BOMB */, realValue, 4, allCards);
            if (rocket) {
                list.push(rocket);
            }
            return list;
        };
        /**
         * 查找自己牌组中的火箭
         */
        Poker.prototype.findRocket = function (allCards) {
            var length = allCards.length;
            if (length > 1) {
                var card1 = allCards[0][0]; //最后一张牌
                var card2 = allCards[1][0]; //倒数第二张牌
                //大王跟小王一定是放在最后跟倒数第二这两个位置
                if (card1.value === 15 /* VALUE_DG */ && card2.value === 14 /* VALUE_XG */) {
                    var handCard = DDZ.HandCard.create();
                    handCard.setHandInfo(16 /* HUOJIAN */, 0);
                    handCard.cards = [card1, card2];
                    handCard.handSubType = 2;
                    return handCard;
                }
            }
            return null;
        };
        /**
         * 查找飞机带翅膀
         */
        Poker.prototype.findPlane = function (allCards, cards, handType, realValue, handSubType) {
            //计算带的副牌的数量,是带一对还是带单张
            var cnt = (handSubType % 4) === 0 ? 1 : 2;
            //计算这个飞机是几连的
            var lianCnt = handSubType / (3 + cnt);
            // handType: number, realValue: REAL_CARD_VALUE, handSubType: number, len: number
            //先找到可以组成飞机的所有的三顺牌型组合
            var planeList = this.findSlide(allCards, handType, realValue, handSubType, 3, lianCnt);
            //找到所有的副牌组合
            // let singleList = this.findSameCard(cnt, handType, REAL_CARD_VALUE.NONE, 0, allCards);
            // let jLen = singleList.length;
            //如果
            // if (jLen < lianCnt) {
            // 	return [];
            // }
            var jLen = allCards.length;
            /**
             * 递归查找副牌
             * findCnt:要找多少张牌
             * cardCnt:现在找的牌最少有多少张,比如说,cardCnt等于2的时候,那么之会找你手牌中,牌数等于二的牌
             * cardList:找到的牌放在这个数组里面
             * igList:忽略的牌值列表
             */
            var findCard = function (findCnt, cardCnt, cardList, igList) {
                if (cardCnt > 3) {
                    return;
                }
                for (var j = 0; j < jLen; j++) {
                    //副牌的牌值不能跟主牌的牌值一样
                    var items = allCards[j];
                    if (items.length === cardCnt && Utils.getIndexByKey(igList, "value", items[0].value) === -1) {
                        if (cardList.length + items.length > findCnt) {
                            egret.log("cardList.length + items.length - findCnt:", cardList.length + items.length - findCnt);
                            cardList.push.apply(cardList, items.splice(0, findCnt - cardList.length));
                        }
                        else {
                            cardList.push.apply(cardList, items.splice(0, 2));
                        }
                        egret.log(cardList.toString());
                        if (cardList.length >= findCnt) {
                            return;
                        }
                    }
                }
                findCard(findCnt, cardCnt + 1, cardList, igList);
            };
            for (var i = planeList.length - 1; i >= 0; i--) {
                //副牌列表
                var cardsList = [];
                var handCard = planeList[i];
                //找到的副牌的数量
                findCard(lianCnt, cnt, cardsList, handCard.cards);
                if (cardsList.length < lianCnt) {
                    planeList.splice(i, 1);
                }
                else {
                    handCard.cards.push.apply(handCard.cards, cardsList);
                }
            }
            return planeList;
        };
        /**
         * 查找所有打得起的三不带
         *
         */
        Poker.prototype.findTriple = function (allCards, handType, realValue, handSubType) {
            var tripleList = this.findSameCard(3, handType, realValue, handSubType, allCards);
            //计算是三带几
            var cnt = handSubType % 3;
            if (cnt !== 0) {
                var list = this.findSameCard(cnt, handType, 0 /* NONE */, 0, allCards);
                var arrLen = tripleList.length;
                // 
                for (var i = tripleList.length - 1; i >= 0; i--) {
                    var jLen = list.length;
                    var handCard = tripleList[i];
                    var isFind = void 0; //是否有找到合适的副牌
                    for (var j = 0; j < jLen; j++) {
                        if (list[j].cards[0].value !== handCard.cards[0].value) {
                            handCard.cards.push.apply(handCard.cards, list[j].cards);
                            Poker.sortCards(handCard.cards);
                            isFind = true;
                            break;
                        }
                    }
                    if (!isFind) {
                        tripleList.splice(i, 1);
                    }
                }
            }
            return tripleList;
            // return this.findSameCard(2, realValue, allCards);
        };
        /**
         * 查找所有的四带二
         */
        Poker.prototype.findFour2 = function (allCards, handType, realValue, handSubType) {
            //现在到所有的四张牌的列表
            var fourList = this.findSameCard(4, handType, realValue, handSubType, allCards);
            //计算是四带几
            var cnt = (handSubType - 4) / 2;
            var list = this.findSameCard(cnt, handType, 0 /* NONE */, 0, allCards);
            var arrLen = fourList.length;
            for (var i = arrLen - 1; i >= 0; i--) {
                var jLen = list.length;
                var handCard = fourList[i];
                //四带二的第一组副牌
                var cards1 = void 0;
                //四带二的第二组副牌
                var cards2 = void 0;
                //查找四带二的副牌
                for (var j = 0; j < jLen; j++) {
                    if (list[j].cards[0].value !== handCard.cards[0].value) {
                        if (cards1) {
                            cards2 = list[j].cards;
                            break;
                        }
                        else {
                            cards1 = list[j].cards;
                        }
                    }
                }
                if (cards1 && cards2) {
                    handCard.cards.push.apply(handCard.cards, cards1);
                    handCard.cards.push.apply(handCard.cards, cards2);
                }
                else {
                    handCard.cards.splice(i, 1);
                }
            }
            return fourList;
        };
        // 
        Poker.prototype.findSameCard = function (count, handType, realValue, handSubType, allCards) {
            var arrLen = allCards.length;
            var result = [];
            for (var i = 0; i < arrLen; i++) {
                if (allCards[i].length >= count && allCards[i][0].realValue > realValue) {
                    var handCard = DDZ.HandCard.create();
                    handCard.cards = allCards[i].slice(0, count);
                    egret.log("findSameCard:", handType, allCards[i][0].realValue);
                    handCard.setHandInfo(handType, allCards[i][0].realValue);
                    handCard.handSubType = handSubType;
                    handCard.sortNum = allCards[i][0].realValue + (allCards[i].length << 4);
                    result.push(handCard);
                }
            }
            result.sort(function (hand1, hand2) {
                return hand1.sortNum - hand2.sortNum;
            });
            return result;
        };
        /**
         * 添加若干张扑克牌,主要是用于抢完地主后,加入地主牌用的
         */
        Poker.prototype.addCards = function (cardValues, pokerCards) {
            Poker.createPokerCards(cardValues, pokerCards);
            this.pokerCards.push.apply(this.pokerCards, pokerCards);
            Poker.sortCards(this.pokerCards);
            this.allCards = null;
            this.bombList = null;
            return pokerCards;
        };
        Poker.prototype.reset = function () {
            this._cardValues = null;
            this.isinit = false;
            this.pokerCards = null;
            this.resetLastCardsInfo();
            this.probHandCards = this.probHandCardsIterator = null;
        };
        Poker.sortCards = function (pokerCards) {
            pokerCards.sort(Poker.sortCardFunc);
        };
        /**
         * 删除若干张扑克牌
         */
        Poker.prototype.deleteCards = function (cardValues, delCards) {
            Poker.releaseListPokerCard(delCards, 0);
            var arrLen = cardValues.length;
            var j = 0;
            for (var i = 0; i < arrLen; i++) {
                var list = Utils.removeItemByKey(this.pokerCards, "cardValue", cardValues[i]);
                if (list) {
                    delCards.push(list[0]);
                }
            }
            this.allCards = null;
            this.bombList = null;
            return delCards;
        };
        Poker.sortCardFunc = function (card1, card2) {
            return card2.cmpValue - card1.cmpValue;
        };
        Poker.prototype.getCardValues = function () {
            return this._cardValues;
        };
        Poker.prototype.resetLastCardsInfo = function () {
            this.lastHandType = this.lastHandValue = this.lastSubHandType = null;
            this.probHandCards = this.probHandCardsIterator = null;
            // Poker.resetLastCardsInfo(this.last)
        };
        /**
         * 用于释放数组中多余的扑克牌对象
         */
        Poker.releaseListPokerCard = function (pokerCards, length) {
            // let length = cardValues.length;
            if (pokerCards.length > length) {
                var arrLen = pokerCards.length - length;
                for (var i = 0; i < arrLen; i++) {
                    pokerCards.pop().destroy();
                }
            }
        };
        /**
         * 将一组牌值解析成一个扑克牌类列表
         * @param cardValues:要解析的牌值数组
         * @param pokerCards:扑克牌列表,如果这个参数不传进来的话,会自动创建一个新的列表,
         * 					 如果传进来的话,会根据cardValues的大小,将pokerCards里面多余的对象释放掉
         */
        Poker.createPokerCards = function (cardValues, pokerCards) {
            if (pokerCards === void 0) { pokerCards = []; }
            var length = cardValues.length;
            Poker.releaseListPokerCard(pokerCards, length);
            for (var i = 0; i < length; ++i) {
                if (pokerCards[i]) {
                    pokerCards[i].init(cardValues[i]);
                }
                else {
                    var card = DDZ.PokerCard.create(cardValues[i]);
                    pokerCards.push(card);
                }
            }
            Poker.sortCards(pokerCards);
            egret.log("createPokerCards:", pokerCards.toString());
            return pokerCards;
        };
        return Poker;
    }());
    DDZ.Poker = Poker;
    __reflect(Poker.prototype, "DDZ.Poker");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=Poker.js.map