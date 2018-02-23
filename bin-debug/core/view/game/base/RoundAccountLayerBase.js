var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layers;
(function (Layers) {
    var RoundAccountLayerBase = (function (_super) {
        __extends(RoundAccountLayerBase, _super);
        function RoundAccountLayerBase() {
            return _super.call(this) || this;
        }
        /**
         * 开始倒计时
         */
        RoundAccountLayerBase.prototype.startTimer = function (count) {
            if (!this._cTime) {
                this._cTime = new CoolTime(1000);
                this._cTime.addCallBack(this.onTimer, this, this.complete);
            }
            this._cTime.start(count);
        };
        /**
         * 停止倒计时
         */
        RoundAccountLayerBase.prototype.stopTimer = function () {
            if (this._cTime) {
                this._cTime.stop();
            }
        };
        /**
         * 倒计时完成时候的回调
         */
        RoundAccountLayerBase.prototype.complete = function () {
        };
        /**
         * 每次倒计时的回调
         * @param value:倒计时剩下的时间
         */
        RoundAccountLayerBase.prototype.onTimer = function (value) {
        };
        return RoundAccountLayerBase;
    }(Layers.BaseLayer));
    Layers.RoundAccountLayerBase = RoundAccountLayerBase;
    __reflect(RoundAccountLayerBase.prototype, "Layers.RoundAccountLayerBase");
})(Layers || (Layers = {}));
//# sourceMappingURL=RoundAccountLayerBase.js.map