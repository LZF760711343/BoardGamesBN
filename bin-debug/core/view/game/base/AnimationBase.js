var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnimationBase = (function (_super) {
    __extends(AnimationBase, _super);
    function AnimationBase() {
        return _super.call(this) || this;
        // this.anchorOffsetX = this.width / 2;
        // this.anchorOffsetY = this.height / 2;
    }
    AnimationBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._play.addEventListener('complete', this.onTweenGroupComplete, this);
    };
    AnimationBase.prototype.onTweenGroupComplete = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this._call) {
            this._call.call(this._this, this._data);
        }
        if (this._finish) {
            this._finish();
            this._finish = null;
        }
    };
    AnimationBase.prototype.start = function () {
        this._play.play(0);
    };
    AnimationBase.prototype.stop = function () {
        this._play.stop();
        this._finish = null;
        this._call = this._this = this._data = null;
    };
    AnimationBase.prototype.startAsync = function () {
        var _this = this;
        return new Promise(function (_finish) {
            _this._finish = _finish;
            _this._play.play(0);
        });
    };
    AnimationBase.prototype.init = function (callBack, thisOjb, data) {
        this._call = callBack;
        this._this = thisOjb;
        this._data = data;
    };
    return AnimationBase;
}(eui.Component));
__reflect(AnimationBase.prototype, "AnimationBase");
//# sourceMappingURL=AnimationBase.js.map