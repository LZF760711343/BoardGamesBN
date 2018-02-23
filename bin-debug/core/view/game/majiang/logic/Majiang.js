var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var majiang;
(function (majiang) {
    var Majiang = (function () {
        function Majiang() {
        }
        Majiang.sort = function (cardValue, laziCard) {
            cardValue.sort(function (a, b) {
                if (laziCard) {
                    if (laziCard == a) {
                        if (laziCard == b) {
                            return 0;
                        }
                        return -1;
                    }
                    if (laziCard == b) {
                        return 1;
                    }
                }
                return a - b;
            });
        };
        // public static sortLazi(cardValue: CARD_VALUE[], laziCard: CARD_VALUE) {
        // 	cardValue.sort((a: CARD_VALUE, b: CARD_VALUE) => {
        // 		if (laziCard) {
        // 			if (laziCard == a) {
        // 				if (laziCard == b) {
        // 					return 0;
        // 				}
        // 				return -1;
        // 			}
        // 			if (laziCard == b) {
        // 				return 1;
        // 			}
        // 		}
        // 		return -1;
        // 	});
        // }
        Majiang.cardValueToStr = function (cardValue) {
            var value = cardValue & 0xf;
            var suit = cardValue >> 4;
            if (suit === 4 /* ZIPAI */) {
                return majiang.ZI_NAMES[value];
            }
            return majiang.VALUE_NAMES[value] + majiang.SUIT_NAMES[suit];
        };
        Majiang.cardValuesToStr = function (cardValues) {
            var arrLen = cardValues.length;
            var temp = [];
            // cardValues.toString(()=>{});
            for (var i = 0; i < arrLen; i++) {
                temp[i] = Majiang.cardValueToStr(cardValues[i]);
            }
            return temp.join(",");
        };
        Majiang.prototype.checkHu = function (cardValues) {
            // Majiang.sort(cardValues);
            // let mjCards: MajiangCard[] = [];
            // let arrLen = cardValues.length;
            // for (let i = 0; i < arrLen; i++) {
            // 	let card = new MajiangCard();
            // 	card.init(cardValues[i]);
            // 	mjCards.push(card);
            // }
            // let allCards: MajiangCard[][] = this.mergeSameCard(mjCards);
            // return this.check(allCards, false, mjCards.length);
        };
        Majiang.prototype.check = function (allCards, hasTwo, cnt) {
            if (cnt === 0) {
                return true;
            }
            var result = [];
            var arrLen = allCards.length;
            for (var i = 0; i < arrLen; i++) {
                if (!allCards[i].length) {
                    continue;
                }
                if (!hasTwo && allCards[i].length > 1) {
                    var temp = allCards[i].splice(0, 2);
                    cnt -= 2;
                    if (this.check(allCards, true, cnt)) {
                        return true;
                    }
                    cnt += 2;
                    allCards[i].push.apply(allCards[i], temp);
                }
                if (allCards[i].length > 2) {
                    var temp = allCards[i].splice(0, 3);
                    cnt -= 3;
                    if (this.check(allCards, hasTwo, cnt)) {
                        return true;
                    }
                    cnt += 3;
                    allCards[i].push.apply(allCards[i], temp);
                }
                var card = allCards[i][0];
                if (card.cardValue > 23 /* W_7 */ || card.cardValue > 39 /* T_7 */ || card.cardValue > 55 /* S_7 */) {
                    continue;
                }
                var index = i + 2;
                if (!allCards[index] || !allCards[index].length || !allCards[index - 1].length) {
                    continue;
                }
                var endCard = allCards[index][0];
                if (card.suit === endCard.suit && card.cardValue + 2 === endCard.cardValue) {
                    var card1 = allCards[i].splice(0, 1)[0];
                    var card2 = allCards[i + 1].splice(0, 1)[0];
                    var card3 = allCards[index].splice(0, 1)[0];
                    cnt -= 3;
                    if (this.check(allCards, hasTwo, cnt)) {
                        return true;
                    }
                    cnt += 3;
                    allCards[i].push(card1);
                    allCards[i + 1].push(card2);
                    allCards[index].push(card3);
                }
                return false;
            }
        };
        /**
         */
        Majiang.prototype.findSlide = function (allCards) {
            var result = [];
            var arrLen = allCards.length;
            for (var i = 0; i < arrLen; i++) {
                var card = allCards[i][0];
                if (card.cardValue > 55 /* S_7 */) {
                    break;
                }
                if (card.cardValue > 23 /* W_7 */ || card.cardValue > 39 /* T_7 */) {
                    continue;
                }
                var index = i + 2;
                if (!allCards[index]) {
                    break;
                }
                var endCard = allCards[index][0];
                if (card.suit === endCard.suit && card.cardValue + 2 === endCard.cardValue) {
                    result.push([card, allCards[i + 1][0], endCard]);
                }
            }
            return result;
        };
        Majiang.prototype.findSameCard = function (allCards, cnt) {
            var arrLen = allCards.length;
            var result = [];
            for (var i = 0; i < arrLen; i++) {
                if (allCards[i].length >= cnt) {
                    result.push(allCards[i].slice(0, cnt));
                }
            }
            return result;
        };
        /**
         * 把相同的牌合并为一个数组
         */
        Majiang.prototype.mergeSameCard = function (cards) {
            if (cards && cards.length) {
                var someCard = [cards[0]];
                // this.cardCnts = {};
                var temp = [someCard];
                var preCard = cards[0];
                var arrLen = cards.length;
                for (var i = 1; i < arrLen; i++) {
                    if (cards[i].value != preCard.value) {
                        // this.cardCnts[preCard.value] = someCard.length;
                        someCard = [];
                        temp.push(someCard);
                        preCard = cards[i];
                    }
                    someCard.push(cards[i]);
                }
                // this.cardCnts[preCard.value] = someCard.length;
                // temp.reverse();
                return temp;
            }
            else {
                return null;
            }
        };
        /**
         *
         */
        Majiang.changeCardsByType = function (cardsValueAndCount, type, cardValue, itemList) {
            //  {"result":0,"cardsValueAndCount":[[49,2,4]],"activeType":5,"playerId":1000472}
            if (type === 5 /* TAN */) {
                var item = MJActionItem.create();
                item.init(type, null, cardValue);
                itemList.push(item);
                var temp = item.cardsValueAndCount = [];
                var arrLen = cardsValueAndCount.length;
                for (var i = 0; i < arrLen; i++) {
                    var jLen = cardsValueAndCount[i][1];
                    for (var j = 0; j < jLen; j++) {
                        temp.push(cardsValueAndCount[i][0]);
                    }
                }
            }
            else if (type === 10 /* HU */) {
                var item = MJActionItem.create();
                item.init(type, null, cardValue);
                itemList.push(item);
            }
            else {
                var arrLen = cardsValueAndCount.length;
                for (var i = 0; i < arrLen; i++) {
                    var disCardValue = void 0;
                    var cardValues = cardsValueAndCount[i];
                    switch (type) {
                        case 7 /* CHI */:
                            disCardValue = [cardValues[0], cardValues[1], cardValue];
                            disCardValue.sort();
                            break;
                        case 8 /* PENG */:
                            disCardValue = [cardValues[0], cardValues[0], cardValues[0]];
                            break;
                        case 6 /* SHAO */:
                            disCardValue = [0 /* NONE */, cardValues[0], 0 /* NONE */];
                            cardValues.splice(1);
                            cardValue = cardValues[0];
                            // cardValues[1] = cardValues[0];
                            // cardValues[1] = cardValues[2] = null;
                            break;
                        case 9 /* GANG */:
                            if (cardValues[0]) {
                                disCardValue = [0 /* NONE */, 0 /* NONE */, 0 /* NONE */, cardValues[0]];
                            }
                            else {
                                disCardValue = [cardValues[0], cardValues[0], cardValues[0], cardValues[0]];
                                type = 25 /* AN_GANG */;
                            }
                            cardValues.splice(1);
                            cardValue = cardValues[0];
                            break;
                    }
                    var item = MJActionItem.create();
                    item.init(type, disCardValue, cardValue);
                    item.cardsValueAndCount = cardValues;
                    itemList.push(item);
                }
            }
        };
        /**
         * 将传进来的数组cardValues里面的数据,转换为发送给服务器的数据,每张牌都转换成为数组,
         * 数组第一个元素为牌值,第二个为牌的数量,第三个为牌的类型
         * @param cardValues:要处理的数组
         * @param tanType:已经摊过的牌型
         */
        Majiang.getTanInfo = function (cardValues, tanType) {
            var arrLen = cardValues.length;
            var temp = {};
            //东南西北的类型数量,如果已经摊过东南西北,那边这个值就直接为4
            var cnt1 = ((tanType & 1 /* DNXB */) === 1) ? 4 : 0;
            //中发白的类型数量,如果已经摊过中发白,那边这个值就直接为3,这两个值用于后面判断摊的牌是否是7星
            var cnt2 = ((tanType & 2 /* ZFB */) === 1) ? 3 : 0;
            for (var i = 0; i < arrLen; i++) {
                var value = cardValues[i];
                if (!temp[value]) {
                    temp[value] = [value, 1, 0];
                    if (value === 49 /* S_1 */) {
                        temp[value][2] = 4 /* NAIO */;
                    }
                    else if (value < 69 /* ZHONG */) {
                        temp[value][2] = 1 /* DNXB */;
                        cnt1++;
                    }
                    else {
                        temp[value][2] = 2 /* ZFB */;
                        cnt2++;
                    }
                }
                else {
                    temp[value][1]++;
                }
            }
            var result = [];
            for (var key in temp) {
                //如果东南西北中发白都有,说明是7星
                if (temp[key][2] !== 4 /* NAIO */ && cnt1 >= 4 && cnt2 >= 3) {
                    temp[key][2] = 3 /* DNXBZFB */;
                }
                result.push(temp[key]);
            }
            return result;
        };
        /**
         * 处理服务器给的数据
         */
        Majiang.getDestList = function (datas) {
            var destList = [];
            // if (datas.chiCards.length) {
            // 	let arrLen = datas.chiCards.length;
            // 	for (let i = 0; i < arrLen; i += 3) {
            // 		let item = MJActionItem.create();
            // 		item.init(ACTIVE_TYPE.CHI, [datas.chiCards[i], datas.chiCards[i + 1], datas.chiCards[i + 2]], null);
            // 		destList.push(item);
            // 		// destList[
            // 	}
            // }
            /**
             * 处理碰/勺/杠牌的数据,服务器发的都是是一个一维数组,并且只有一张牌
             */
            // if (datas.shaoCards.length) {
            // 	let arrLen = datas.shaoCards.length;
            // 	for (let i = 0; i < arrLen; i++) {
            // 		let item = MJActionItem.create();
            // 		item.init(ACTIVE_TYPE.SHAO, [CARD_VALUE.NONE, datas.shaoCards[i], CARD_VALUE.NONE], datas.shaoCards[i]);
            // 		destList.push(item);
            // 	}
            // }
            if (datas.gangCards.length) {
                var arrLen = datas.gangCards.length;
                for (var i = 0; i < arrLen; i++) {
                    var item = MJActionItem.create();
                    item.init(9 /* GANG */, [datas.gangCards[i], datas.gangCards[i], datas.gangCards[i], datas.gangCards[i]], null);
                    destList.push(item);
                }
            }
            if (datas.anGangCards.length) {
                var arrLen = datas.anGangCards.length;
                for (var i = 0; i < arrLen; i++) {
                    var item = MJActionItem.create();
                    item.init(9 /* GANG */, [0 /* NONE */, 0 /* NONE */, 0 /* NONE */, datas.anGangCards[i]], null);
                    destList.push(item);
                }
            }
            if (datas.pengCards.length) {
                var arrLen = datas.pengCards.length;
                for (var i = 0; i < arrLen; i++) {
                    var item = MJActionItem.create();
                    item.init(9 /* GANG */, [datas.pengCards[i], datas.pengCards[i], datas.pengCards[i]], null);
                    destList.push(item);
                }
            }
            return destList;
        };
        return Majiang;
    }());
    majiang.Majiang = Majiang;
    __reflect(Majiang.prototype, "majiang.Majiang");
    /**
    * 玩家可进行的操作
    */
    var MJActionItem = (function () {
        function MJActionItem() {
        }
        MJActionItem.create = function () {
            return new MJActionItem();
        };
        MJActionItem.prototype.init = function (activeType, cardValues, cardValue) {
            this.activeType = activeType;
            this.cardValue = cardValue;
            this.cardValues = cardValues;
        };
        MJActionItem.prototype.getDeleteCard = function () {
            var delCards = [];
            // if(this.activeType === ACTIVE_TYPE.CHI){
            // 	let arrLen = this.cardValues.length;
            // 	for(let i = 0; i < arrLen; i++){
            // 		if(this.cardValues[i] !== this.cardValue){
            // 			delCards.push(this.cardValues[i]);
            // 		}
            // 	}
            // }else{
            // }
            // switch(this.activeType){
            // 	case 
            // }
        };
        return MJActionItem;
    }());
    majiang.MJActionItem = MJActionItem;
    __reflect(MJActionItem.prototype, "majiang.MJActionItem");
})(majiang || (majiang = {}));
//# sourceMappingURL=Majiang.js.map