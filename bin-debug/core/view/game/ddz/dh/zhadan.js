var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ddz;
(function (ddz) {
    var zhadan = (function (_super) {
        __extends(zhadan, _super);
        function zhadan() {
            var _this = _super.call(this) || this;
            _this.skinName = "zd";
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
        }
        zhadan.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._zd.addEventListener('complete', this.onTweenGroupComplete, this);
        };
        zhadan.prototype.onTweenGroupComplete = function () {
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        zhadan.prototype.start = function () {
            this._zd.play(0);
        };
        return zhadan;
    }(eui.Component));
    ddz.zhadan = zhadan;
    __reflect(zhadan.prototype, "ddz.zhadan");
})(ddz || (ddz = {}));
//# sourceMappingURL=zhadan.js.map