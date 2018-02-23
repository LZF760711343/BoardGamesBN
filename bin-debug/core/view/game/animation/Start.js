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
    var Start = (function (_super) {
        __extends(Start, _super);
        function Start() {
            var _this = _super.call(this) || this;
            _this.skinName = "start";
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
        }
        Start.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._play.addEventListener('complete', this.onTweenGroupComplete, this);
        };
        Start.prototype.onTweenGroupComplete = function () {
            this.visible = false;
            //播放完移除掉动画
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this._call.call(this._this, this._data);
        };
        Start.prototype.init = function (callBack, thisOjb, data) {
            this._call = callBack;
            this._this = thisOjb;
            this._data = data;
        };
        Start.prototype.start = function () {
            // return new Promise((finsih: Function) => {
            //     this._finish = finsih;
            this._play.play(0);
            // });
        };
        return Start;
    }(eui.Component));
    game.Start = Start;
    __reflect(Start.prototype, "game.Start");
})(game || (game = {}));
//# sourceMappingURL=Start.js.map