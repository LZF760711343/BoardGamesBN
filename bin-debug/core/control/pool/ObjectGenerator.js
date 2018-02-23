var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Pool;
(function (Pool) {
    var ObjectGenerator = (function () {
        function ObjectGenerator(val) {
            this._dis = null;
            this.init(val);
        }
        ObjectGenerator.prototype.init = function (val) {
            this._dis = val;
        };
        ObjectGenerator.prototype.getBall = function (type) {
            var vo = this._dis.getVO(type);
            if (vo == null) {
                // create new Object
                vo = this.createVO(type);
                this._dis.addVO(vo);
                vo.reset();
            }
            return vo;
        };
        ObjectGenerator.prototype.createVO = function (type) {
            // switch (type) {
            // 	case BallType.foot:
            // 		return new FootBall();
            // 	case BallType.basket:
            // 		return new BasketBall();
            // 	case BallType.base:
            // 		return new BaseBall();
            // }
            return null;
        };
        return ObjectGenerator;
    }());
    Pool.ObjectGenerator = ObjectGenerator;
    __reflect(ObjectGenerator.prototype, "Pool.ObjectGenerator");
})(Pool || (Pool = {}));
//# sourceMappingURL=ObjectGenerator.js.map