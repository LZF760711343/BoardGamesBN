var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var Win = (function (_super) {
        __extends(Win, _super);
        function Win() {
            var _this = _super.call(this) || this;
            _this.skinName = "win";
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
        }
        Win.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._win.addEventListener('complete', this.onTweenGroupComplete, this);
        };
        Win.prototype.onTweenGroupComplete = function () {
            this.visible = false;
            //播放完移除掉动画
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this._call.call(this._this, this._data);
        };
        Win.prototype.init = function (callBack, thisOjb, data) {
            this._call = callBack;
            this._this = thisOjb;
            this._data = data;
        };
        Win.prototype.start = function () {
            this._win.play(0);
        };
        return Win;
    }(eui.Component));
    game.Win = Win;
    __reflect(Win.prototype, "game.Win");
})(game || (game = {}));
//# sourceMappingURL=Win.js.map