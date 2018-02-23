var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
*  倒計時类
*/
var CoolTime = (function () {
    /**
     * @param delayTime倒计时的间隔时间
     */
    function CoolTime(delayTime) {
        if (delayTime === void 0) { delayTime = 1000; }
        this.delayTime = delayTime;
        this.delayTime = delayTime;
    }
    /**
     * 设置倒计时的间隔时间
     * @param delayTime倒计时的间隔时间
     */
    CoolTime.prototype.setDelayTime = function (delayTime) {
        if (delayTime === void 0) { delayTime = 1000; }
        this.delayTime = delayTime;
    };
    /**
    * 添加监听 倒计时两个回调函数
    * @param everyFun
    * @param completeFun
    */
    CoolTime.prototype.addCallBack = function (everyFun, thisObj, completeFun) {
        if (completeFun === void 0) { completeFun = null; }
        this.thisObj = thisObj;
        this.everyFun = everyFun;
        this.completeFun = completeFun;
    };
    CoolTime.prototype.stop = function () {
        if (this._key) {
            FrameManager.getInstance().delayRemoveHandler(this._key);
            this._key = null;
        }
    };
    /**
     * 开始倒计时
     * @param 倒计时要循环几次
     */
    CoolTime.prototype.start = function (totalTime) {
        if (totalTime === void 0) { totalTime = 1; }
        this.totalTime = totalTime;
        this.stop();
        this._key = FrameManager.getInstance().addTimer(this.onCoolTimeHandler, this, this.delayTime, totalTime, this.completeFun, this.thisObj);
    };
    CoolTime.prototype.onCoolTimeHandler = function (time) {
        if (this.totalTime == 4) {
            SoundManage.playEffect("dididi");
        }
        this.totalTime--;
        if (this.everyFun) {
            this.everyFun.call(this.thisObj, this.totalTime);
        }
    };
    return CoolTime;
}());
__reflect(CoolTime.prototype, "CoolTime");
//# sourceMappingURL=CoolTime.js.map