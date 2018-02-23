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
    var BrnnCountDown = (function (_super) {
        __extends(BrnnCountDown, _super);
        function BrnnCountDown() {
            var _this = _super.call(this) || this;
            _this.isPlay = false;
            return _this;
        }
        BrnnCountDown.prototype.onTimer = function () {
            this.curTime--;
            if (this.curTime <= 3 && this.curTime >= 0) {
                if (!this.isPlay) {
                    this.channel = SoundManage.playEffect("brnn_jinggao");
                    if (this.channel) {
                        this.isPlay = true;
                        this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
                    }
                }
            }
            this.dispatchEventWith(egret.TimerEvent.TIMER, false, this.curTime);
        };
        /** 播放完毕移除事件 */
        BrnnCountDown.prototype.onSoundComplete = function (event) {
            // egret.log("onSoundComplete");
            this.isPlay = false;
            this.channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        };
        return BrnnCountDown;
    }(UI.CountDown));
    UI.BrnnCountDown = BrnnCountDown;
    __reflect(BrnnCountDown.prototype, "UI.BrnnCountDown");
})(UI || (UI = {}));
//# sourceMappingURL=BrnnCountDown.js.map