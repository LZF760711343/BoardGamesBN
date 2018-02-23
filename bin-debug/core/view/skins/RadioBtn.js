var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI;
(function (UI) {
    var RadioBtn = (function (_super) {
        __extends(RadioBtn, _super);
        function RadioBtn() {
            var _this = _super.call(this) || this;
            _this.bgStr = '';
            _this.bgGrayStr = '';
            _this.upStr = "";
            _this.downStr = "";
            _this.disabledStr = "";
            return _this;
        }
        RadioBtn.prototype.buttonReleased = function () {
            _super.prototype.buttonReleased.call(this);
            SoundManage.playEffect('btnClick');
        };
        return RadioBtn;
    }(eui.RadioButton));
    UI.RadioBtn = RadioBtn;
    __reflect(RadioBtn.prototype, "UI.RadioBtn");
})(UI || (UI = {}));
//# sourceMappingURL=RadioBtn.js.map