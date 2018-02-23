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
    var ToggleButton = (function (_super) {
        __extends(ToggleButton, _super);
        function ToggleButton() {
            return _super.call(this) || this;
            // this.touchChildren = false;
            // this.currentState
        }
        Object.defineProperty(ToggleButton.prototype, "enabled", {
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
        ToggleButton.prototype.buttonReleased = function () {
            _super.prototype.buttonReleased.call(this);
            SoundManage.playEffect('btnClick');
        };
        return ToggleButton;
    }(eui.ToggleButton));
    UI.ToggleButton = ToggleButton;
    __reflect(ToggleButton.prototype, "UI.ToggleButton");
})(UI || (UI = {}));
//# sourceMappingURL=ToggleButton.js.map