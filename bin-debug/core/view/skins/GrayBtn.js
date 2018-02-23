var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var UI;
(function (UI) {
    var GrayBtn = (function (_super) {
        __extends(GrayBtn, _super);
        function GrayBtn() {
            return _super.call(this) || this;
            // this.touchChildren = false;
            // this.currentState
        }
        Object.defineProperty(GrayBtn.prototype, "enabled", {
            get: function () {
                return this.$Component[3 /* enabled */];
            },
            set: function (value) {
                value = !!value;
                this.$setEnabled(value);
                if (value) {
                    if (this.filters) {
                        this.filters = null;
                    }
                }
                else {
                    if (!this.filters) {
                        if (!this._colorFlilter) {
                            this._colorFlilter = new egret.ColorMatrixFilter(Filters.colorMatrix);
                        }
                        this.filters = [this._colorFlilter];
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        return GrayBtn;
    }(UI.CommonBtn));
    UI.GrayBtn = GrayBtn;
    __reflect(GrayBtn.prototype, "UI.GrayBtn");
})(UI || (UI = {}));
//# sourceMappingURL=GrayBtn.js.map