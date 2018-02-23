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
    var Lost = (function (_super) {
        __extends(Lost, _super);
        function Lost() {
            var _this = _super.call(this) || this;
            _this.skinName = "lost";
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
        }
        Lost.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._lost.addEventListener('complete', this.onTweenGroupComplete, this);
        };
        Lost.prototype.onTweenGroupComplete = function () {
            this.visible = false;
            // this._call.call(this._this, this._data);
            //播放完移除掉动画
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this._call.call(this._this, this._data);
        };
        Lost.prototype.init = function (callBack, thisOjb, data) {
            this._call = callBack;
            this._this = thisOjb;
            this._data = data;
        };
        Lost.prototype.start = function () {
            this._lost.play(0);
        };
        return Lost;
    }(eui.Component));
    game.Lost = Lost;
    __reflect(Lost.prototype, "game.Lost");
})(game || (game = {}));
//# sourceMappingURL=Lost.js.map