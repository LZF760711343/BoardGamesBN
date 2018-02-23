var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DDZ;
(function (DDZ) {
    var pool = [];
    var PokerCard = (function () {
        function PokerCard(cardValue) {
            this.init(cardValue);
            // this.spec = (cardValue >> 7) & 0x1;
        }
        PokerCard.prototype.init = function (cardValue) {
            this.cardValue = cardValue;
            this.suit = cardValue & 0xf;
            this.value = cardValue >> 4;
            this.cmpValue = this.getCmpValue();
        };
        /**
         * 创建一张扑克牌,后续应该会加入缓存池
         */
        PokerCard.create = function (cardValue) {
            if (pool.length) {
                var card = pool.pop();
                card.init(cardValue);
                return card;
            }
            else {
                return new PokerCard(cardValue);
            }
        };
        PokerCard.prototype.toString = function () {
            return SUIT_NAMES[this.suit] + VALUE_NAMES[this.value];
        };
        /**
         * 获取用于牌与牌之间比较大小的值
         * 因为要统一用同一套牌值,默认牌值是A最小,2排第二小
         * 斗地主是2只比大小王小,A是比2跟大小王小,所以用于比较的值就要转换一下了
         */
        PokerCard.prototype.getCmpValue = function () {
            var cmpValue = this.value;
            if (cmpValue < 14 /* VALUE_XG */) {
                if (cmpValue == 2 /* VALUE_2 */) {
                    cmpValue = 13 /* VALUE_K */;
                }
                else if (cmpValue == 1 /* VALUE_A */) {
                    cmpValue = 12 /* VALUE_Q */;
                }
                else {
                    cmpValue -= 2;
                }
            }
            this.realValue = cmpValue;
            return (cmpValue << DDZ.SUIT_SHIFT) + this.suit;
        };
        PokerCard.prototype.destroy = function () {
            //目前对象回收还有bug,先暂时屏蔽掉,等有时间在进行处理
            // if (pool.indexOf(this) === -1) {
            // 	pool.push(this);
            // }
        };
        /**
         * 获取当前牌的下一张牌的牌值
         */
        PokerCard.prototype.nextValue = function () {
            if (this.value === 15 /* VALUE_DG */) {
                true && egret.error("大王没有下一张牌");
                return 0 /* NONE */;
            }
            else if (this.value === 2 /* VALUE_2 */) {
                return 14 /* VALUE_XG */;
            }
            else if (this.value === 13 /* VALUE_K */) {
                return 1 /* VALUE_A */;
            }
            else {
                return this.value + 1;
            }
        };
        /**
         * 获取当前牌的上一张牌的牌值
         */
        PokerCard.prototype.preValue = function () {
            if (this.value === 3 /* VALUE_3 */) {
                true && egret.error("3没有上一张牌");
                return 0 /* NONE */;
            }
            else if (this.value === 1 /* VALUE_A */) {
                return 13 /* VALUE_K */;
            }
            else if (this.value === 2 /* VALUE_2 */ || this.value >= 14 /* VALUE_XG */) {
                return 0 /* NONE */;
            }
            else {
                return this.value - 1;
            }
        };
        /*
        * 大于1 等于0 小于-1         */
        PokerCard.prototype.compare = function (otherCard, mainValue) {
            // if(this
        };
        PokerCard.prototype.valueOf = function () {
            return this.cardValue;
        };
        return PokerCard;
    }());
    DDZ.PokerCard = PokerCard;
    __reflect(PokerCard.prototype, "DDZ.PokerCard");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=PokerCard.js.map