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
    var wangzha = (function (_super) {
        __extends(wangzha, _super);
        function wangzha() {
            var _this = _super.call(this) || this;
            _this.skinName = "wangzha";
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
        }
        wangzha.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._wz.addEventListener('complete', this.onTweenGroupComplete, this);
        };
        wangzha.prototype.onTweenGroupComplete = function () {
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        wangzha.prototype.start = function () {
            this._wz.play(0);
        };
        return wangzha;
    }(eui.Component));
    ddz.wangzha = wangzha;
    __reflect(wangzha.prototype, "ddz.wangzha");
})(ddz || (ddz = {}));
//# sourceMappingURL=wangzha.js.map