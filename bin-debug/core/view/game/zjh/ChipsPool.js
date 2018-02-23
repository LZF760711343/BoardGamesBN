var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zjh;
(function (zjh) {
    // const chipsBgMap = [];
    var cWidth = 70;
    var cHeight = 15;
    var ChipsPool = (function (_super) {
        __extends(ChipsPool, _super);
        function ChipsPool() {
            return _super.call(this) || this;
        }
        /**
         * 往筹码池里面丢一个筹码
         * @param chipsIndex:这个筹码的序号,这个需要是跟图片命名对应的
         * @param chips:筹码具体的显示数值
         * @param startPos:这个筹码从那里丢出来的,这个坐标是Global坐标
         * @param delay:延迟多久播放动画
         */
        ChipsPool.prototype.addChips = function (chipsIndex, label, startPos, delay) {
            if (delay === void 0) { delay = 0; }
            var chipsObj = zjh.ChipsObj.create("zjh_chouma_" + chipsIndex + "_png", label);
            this.addChild(chipsObj);
            chipsObj.x = startPos.x;
            chipsObj.y = startPos.y;
            egret.Point.release(startPos);
            var rx = Utils.getNumberInNormalDistribution((Global.sWidth - chipsObj.width) / 2, cWidth);
            var ry = Utils.getNumberInNormalDistribution((Global.sHeight - chipsObj.height) / 2, cHeight);
            egret.Tween.get(chipsObj).wait(delay).to({ x: rx, y: ry }, 400);
        };
        ChipsPool.prototype.move = function (pos) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                for (var i = 0; i < _this.$children.length; i++) {
                    egret.Tween.get(_this.$children[i]).to({ x: pos.x, y: pos.y }, 400).call(resolve);
                }
                egret.Point.release(pos);
            });
        };
        ChipsPool.prototype.destroy = function () {
            egret.Tween.removeTweens(this);
        };
        ChipsPool.prototype.reset = function () {
            this.x = this.y = 0;
            var arrLen = this.numChildren;
            for (var i = this.numChildren - 1; i >= 0; --i) {
                var chipsOjb = this.getChildAt(i);
                chipsOjb.destroy();
            }
            this.visible = true;
        };
        return ChipsPool;
    }(eui.Group));
    zjh.ChipsPool = ChipsPool;
    __reflect(ChipsPool.prototype, "zjh.ChipsPool");
})(zjh || (zjh = {}));
//# sourceMappingURL=ChipsPool.js.map