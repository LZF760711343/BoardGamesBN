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
    var liandui = (function (_super) {
        __extends(liandui, _super);
        function liandui() {
            var _this = _super.call(this) || this;
            _this.skinName = "liandui";
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
        }
        liandui.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._ld.addEventListener('complete', this.onTweenGroupComplete, this);
        };
        liandui.prototype.onTweenGroupComplete = function () {
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        liandui.prototype.start = function () {
            this._ld.play(0);
        };
        return liandui;
    }(eui.Component));
    ddz.liandui = liandui;
    __reflect(liandui.prototype, "ddz.liandui");
})(ddz || (ddz = {}));
//# sourceMappingURL=liandui.js.map