var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var majiang;
(function (majiang) {
    /**
     * 这个类用于
     */
    var pools = [];
    var MajiangCard = (function () {
        function MajiangCard() {
        }
        MajiangCard.prototype.init = function (cardValue) {
            this.cardValue = cardValue;
            this.value = cardValue & 0xf;
            this.suit = cardValue >> 4;
            // this.disObj = disObj;
        };
        MajiangCard.prototype.distroy = function () {
            // pools.push(this);
            // if (this.disObj && this.disObj.parent) {
            // 	this.disObj.parent.removeChild(this.disObj);
            // }
            // this.disObj = null;
        };
        MajiangCard.create = function () {
            if (pools.length) {
                return pools.pop();
            }
            return new MajiangCard();
        };
        return MajiangCard;
    }());
    majiang.MajiangCard = MajiangCard;
    __reflect(MajiangCard.prototype, "majiang.MajiangCard");
})(majiang || (majiang = {}));
//# sourceMappingURL=MajiangCard.js.map