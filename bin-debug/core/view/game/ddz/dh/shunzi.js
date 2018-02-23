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
    var shunzi = (function (_super) {
        __extends(shunzi, _super);
        function shunzi() {
            var _this = _super.call(this) || this;
            _this.skinName = "sz";
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
        }
        shunzi.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._sz1.addEventListener('complete', this.onTweenGroupComplete, this);
        };
        shunzi.prototype.onTweenGroupComplete = function () {
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        shunzi.prototype.start = function () {
            this._sz1.play(0);
        };
        return shunzi;
    }(eui.Component));
    ddz.shunzi = shunzi;
    __reflect(shunzi.prototype, "ddz.shunzi");
})(ddz || (ddz = {}));
//# sourceMappingURL=shunzi.js.map