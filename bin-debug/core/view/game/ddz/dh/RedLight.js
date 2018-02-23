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
    var RedLight = (function (_super) {
        __extends(RedLight, _super);
        function RedLight() {
            var _this = _super.call(this) || this;
            _this.skinName = "redlight";
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
        }
        RedLight.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._rl.addEventListener('complete', this.onTweenGroupComplete, this);
        };
        RedLight.prototype.onTweenGroupComplete = function () {
            // egret.log("aaaaa");
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        RedLight.prototype.start = function () {
            SoundManage.playEffect('timeWarn');
            this._rl.play(0);
        };
        return RedLight;
    }(eui.Component));
    ddz.RedLight = RedLight;
    __reflect(RedLight.prototype, "ddz.RedLight");
})(ddz || (ddz = {}));
//# sourceMappingURL=RedLight.js.map