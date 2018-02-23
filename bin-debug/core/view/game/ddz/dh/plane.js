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
    var plane = (function (_super) {
        __extends(plane, _super);
        function plane() {
            var _this = _super.call(this) || this;
            _this.skinName = "plane";
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
        }
        plane.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._plane.addEventListener('complete', this.onTweenGroupComplete, this);
        };
        plane.prototype.onTweenGroupComplete = function () {
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        plane.prototype.start = function () {
            this._plane.play(0);
        };
        return plane;
    }(eui.Component));
    ddz.plane = plane;
    __reflect(plane.prototype, "ddz.plane");
})(ddz || (ddz = {}));
//# sourceMappingURL=plane.js.map