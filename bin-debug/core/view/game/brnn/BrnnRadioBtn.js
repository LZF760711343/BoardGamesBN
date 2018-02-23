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
    var BrnnRadioBtn = (function (_super) {
        __extends(BrnnRadioBtn, _super);
        function BrnnRadioBtn() {
            return _super.call(this) || this;
        }
        BrnnRadioBtn.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            //初始化brnn的UI
            if (this.image) {
                egret.Tween.get(this.image, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        };
        BrnnRadioBtn.prototype.onExit = function () {
            egret.Tween.removeTweens(this.image);
        };
        return BrnnRadioBtn;
    }(UI.RadioBtn));
    UI.BrnnRadioBtn = BrnnRadioBtn;
    __reflect(BrnnRadioBtn.prototype, "UI.BrnnRadioBtn");
})(UI || (UI = {}));
//# sourceMappingURL=BrnnRadioBtn.js.map