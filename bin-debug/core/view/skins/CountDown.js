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
    var CountDown = (function (_super) {
        __extends(CountDown, _super);
        function CountDown() {
            var _this = _super.call(this) || this;
            // private _cTime:CoolTime;
            _this.curTime = 0;
            return _this;
        }
        CountDown.prototype.onTimer = function () {
            this.curTime--;
            if (this.curTime == 3) {
                SoundManage.playEffect("dididi");
            }
            this.dispatchEventWith(egret.TimerEvent.TIMER, false, this.curTime);
        };
        CountDown.prototype.addCompleteFunc = function (cFunc, cThisObj) {
            this._cFunc = cFunc;
            this._cThisObj = cThisObj;
        };
        CountDown.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // this.startTimer(100);
        };
        /**
         * 开始倒计时
         * @param count:倒计时的次数
         * @param delay:倒计时的间隔
         */
        CountDown.prototype.startTimer = function (count, delay) {
            if (delay === void 0) { delay = 1000; }
            this.curTime = count;
            this.stopTimer();
            FrameManager.getInstance().addTimerByKey(this.hashCode, this.onTimer, this, delay, count, this._cFunc, this._cThisObj);
        };
        CountDown.prototype.stopTimer = function () {
            FrameManager.getInstance().delayRemoveHandler(this.hashCode);
        };
        return CountDown;
    }(eui.Component));
    UI.CountDown = CountDown;
    __reflect(CountDown.prototype, "UI.CountDown");
})(UI || (UI = {}));
//# sourceMappingURL=CountDown.js.map