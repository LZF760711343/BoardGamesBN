var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ROBOT;
(function (ROBOT) {
    var NiuniuPoker = (function () {
        function NiuniuPoker() {
        }
        //是不是五小牛
        NiuniuPoker.prototype.isWuxiaoniu = function (tempValues) {
            var arrLen = tempValues.length;
            var sum = 0;
            for (var i = 0; i < arrLen; i++) {
                sum += tempValues[i];
                if (sum > 10 || tempValues[i] > 4 /* VALUE_4 */) {
                    return 0 /* NONE */;
                }
            }
            return 10 /* WXN */;
            ;
        };
        // export const enum HANDVALUE {
        // 		NONE = 0,
        // 		SANPAI = 1,//-- #散牌
        // 		NIUX = 2,// -- #牛1-牛9
        // 		NIUNIU = 3, //,-- #牛牛
        // 		YINNIU = 4,// -- #银牛--四花牛
        // 		SHUNZI = 5, //--顺子
        // 		TONGHUA = 6, //同花
        // 		HULU = 7,//葫芦
        // 		BOMB = 8,//四梅
        // 		JINNIU = 9,//金牛
        // 		WXN = 10,//五小牛
        // 		TONGHUASHUN = 11,//同花顺
        // 	}
        NiuniuPoker.prototype.getCmpValue = function (key) {
            var cardType = parseInt(key);
            if (cardType !== 1 /* SANPAI */ && cardType < 21) {
                cardType += 27;
            }
            return cardType;
        };
        /**
         * 获取出现某牌型及其以上牌型的概率
         */
        NiuniuPoker.prototype.getCardTypeUpProbalility = function (cardType) {
            if (this.probabilitys) {
                var tempCardType = this.getCmpValue(cardType);
                var sum = 0;
                var total = 0;
                for (var key in this.probabilitys) {
                    if (this.getCmpValue(key) >= tempCardType) {
                        total += this.probabilitys[key];
                    }
                    sum += this.probabilitys[key];
                }
                ROBOT.log("getCardTypeUpProbalility:", total, sum);
                return total / sum;
            }
            return 0;
        };
        /**
         * 是不是五花牛
         */
        NiuniuPoker.prototype.isWuhuaniu = function (tempValues) {
            var arrLen = tempValues.length;
            for (var i = 0; i < arrLen; i++) {
                if (tempValues[i] < 10 /* VALUE_10 */) {
                    return 0 /* NONE */;
                }
            }
            return 9 /* JINNIU */;
        };
        /**
         * 是不是炸弹牛
         */
        NiuniuPoker.prototype.isZhadanniu = function (tempValues) {
            var arrLen = tempValues.length;
            // tempValues.concat
            var sumCnt = 0;
            // let temp = tempValues[0];
            for (var i = 1; i < arrLen; i++) {
                if (tempValues[0] == tempValues[i]) {
                    sumCnt++;
                }
            }
            if (sumCnt == 4 || (tempValues[1] == tempValues[2] &&
                tempValues[1] == tempValues[3] &&
                tempValues[1] == tempValues[4])) {
                return 8 /* BOMB */;
            }
            return 0 /* NONE */;
        };
        /**
         * 是否niuniu
         */
        NiuniuPoker.prototype.isNiuniu = function (tempValues) {
            var arrLen = tempValues.length;
            var sum = 0;
            for (var i = 0; i < arrLen; i++) {
                // sum += (tempValues[i] > CARD_VALUE.VALUE_10 ? 10 : tempValues[i]);
                sum = this.addValue(sum, tempValues[i]);
            }
            if (sum % 10) {
                return 0 /* NONE */;
            }
            else {
                return 3 /* NIUNIU */;
            }
            // return niuniu.HANDVALUE.JINNIU;
        };
        NiuniuPoker.prototype.addValue = function (sum, cardValue) {
            return sum += (cardValue > 10 /* VALUE_10 */ ? 10 : cardValue);
        };
        /**
         * 是否有牛,是什么牛
         */
        NiuniuPoker.prototype.hasNiu = function (tempValues) {
            var arrLen = tempValues.length;
            for (var i = 0; i < arrLen - 2; i++) {
                var sum = this.addValue(0, tempValues[i]);
                for (var j = i + 1; j < arrLen - 1; j++) {
                    // sum += tempValues[j] > CARD_VALUE.VALUE_10 ? 10 : tempValues[j];
                    sum = this.addValue(sum, tempValues[j]);
                    for (var k = j + 1; k < arrLen; k++) {
                        // sum += tempValues[j] > CARD_VALUE.VALUE_10 ? 10 : tempValues[j];
                        sum = this.addValue(sum, tempValues[j]);
                        if (sum % 10 === 0) {
                            return 2 /* NIUX */;
                        }
                    }
                }
            }
            return 1 /* SANPAI */;
        };
        NiuniuPoker.prototype.analysis = function (tempValues) {
            return this.isWuxiaoniu(tempValues)
                || this.isWuhuaniu(tempValues)
                || this.isZhadanniu(tempValues)
                || this.isNiuniu(tempValues)
                || this.hasNiu(tempValues);
            // let arrLen = tempValues.length;
            // for (let i = 0; i < arrLen - 2; i++) {
            // 	// let temp = [tempValues[i]];
            // 	// let tempList = [cardValues[i]];
            // 	for (let j = i + 1; j < arrLen - 1; j++) {
            // 		// temp.push(tempValues[j]);
            // 		for (let k = j + 1; k < arrLen; k++) {
            // 			// temp.push(tempValues[k]);
            // 			// temp.sort();
            // 		}
            // 	}
            // }
            // let sum = 10 - (tempValues[0] + tempValues[1] + tempValues[2]) % 10;
        };
        NiuniuPoker.prototype.resetCards = function () {
            this.cards = [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2];
        };
        NiuniuPoker.prototype.reset = function () {
            this.probabilitys = null;
            this.cards = null;
            this.isInit = false;
        };
        NiuniuPoker.prototype.init = function (cardValues) {
            var _this = this;
            this.resetCards();
            this.probabilitys = {};
            var sum = 0;
            var tempValues = [];
            this.isInit = true;
            // this.key = cardValue >> 4;
            cardValues.forEach(function (value, index) {
                var newValue = tempValues[index] = value >> 4;
                _this.cards[newValue]--;
                sum = _this.addValue(sum, newValue);
                ROBOT.log(VALUE_NAMES[newValue]);
            });
            for (var i = 1 /* VALUE_A */; i <= 15 /* VALUE_DG */; i++) {
                if (this.cards[i]) {
                    tempValues.push(i);
                    var result = this.analysis(tempValues);
                    ROBOT.log("result:", result);
                    if (result === 2 /* NIUX */) {
                        result = 20 + this.addValue(sum, i) % 10;
                    }
                    if (!this.probabilitys[result]) {
                        this.probabilitys[result] = this.cards[i];
                    }
                    else {
                        this.probabilitys[result] += this.cards[i];
                    }
                    tempValues.pop();
                }
            }
            ROBOT.log(this.probabilitys);
        };
        return NiuniuPoker;
    }());
    ROBOT.NiuniuPoker = NiuniuPoker;
    __reflect(NiuniuPoker.prototype, "ROBOT.NiuniuPoker");
})(ROBOT || (ROBOT = {}));
//# sourceMappingURL=Poker.js.map