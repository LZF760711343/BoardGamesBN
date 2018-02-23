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
    var BrnnZoom = (function (_super) {
        __extends(BrnnZoom, _super);
        function BrnnZoom() {
            return _super.call(this) || this;
        }
        BrnnZoom.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            //初始化brnn的UI
            this._contractionBtn.bgStr = "shang_hzicon1_png";
            this._SetBtn.icon = "brsz_hzicon_png";
            this._dissolveBtn.icon = "exit_hziconxl_png";
        };
        return BrnnZoom;
    }(UI.Zoom));
    UI.BrnnZoom = BrnnZoom;
    __reflect(BrnnZoom.prototype, "UI.BrnnZoom");
})(UI || (UI = {}));
//# sourceMappingURL=BrnnZoom.js.map