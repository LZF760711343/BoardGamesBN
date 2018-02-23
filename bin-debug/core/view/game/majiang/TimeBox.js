var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var majiang;
(function (majiang) {
    var TimeBox = (function (_super) {
        __extends(TimeBox, _super);
        function TimeBox() {
            return _super.call(this) || this;
        }
        TimeBox.prototype.startTimer = function (count) {
            if (count === void 0) { count = 10; }
            this._countDown.startTimer(count);
        };
        TimeBox.prototype.stopTimer = function () {
            this._countDown.stopTimer();
        };
        TimeBox.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.icons = [this._labels.iconDong, this._labels.iconBei, this._labels.iconXi, this._labels.iconNan];
            this.config = [
                ["icon_mj_dong_png", "icon_mj_dong_light_png"],
                ["icon_mj_bei_png", "icon_mj_bei_light_png"],
                ["icon_mj_xi_png", "icon_mj_xi_light_png"],
                ["icon_mj_nan_png", "icon_mj_nan_light_png"],
            ];
        };
        TimeBox.prototype.setDirect = function (value) {
            egret.log("caonimabi", value);
            // this.currentState = value + "";
            // this._direct = value;
            // this._labels.currentState = "s" + (((4 - value) % 4) + 1);
            this._labels.currentState = "s" + (((value) % 4) + 1);
        };
        TimeBox.prototype.setArrowsDirect = function (value) {
            var length = this.icons.length;
            for (var i = 0; i < length; i++) {
                var index = (this._direct + i) % 4;
                if (i == value) {
                    // this._labels._imgArrows.rotation = (value) * 90;
                    // this.icons[index].source = this.config[index][1];
                    // } else {
                    // this.icons[index].source = this.config[index][0];
                    egret.log("value", value);
                }
            }
        };
        return TimeBox;
    }(eui.Component));
    majiang.TimeBox = TimeBox;
    __reflect(TimeBox.prototype, "majiang.TimeBox");
})(majiang || (majiang = {}));
//# sourceMappingURL=TimeBox.js.map