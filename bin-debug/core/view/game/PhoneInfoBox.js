var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 显示手机当前电量、当前时间、当前网络状况的控件
 * */
var PhoneInfoBox = (function (_super) {
    __extends(PhoneInfoBox, _super);
    function PhoneInfoBox() {
        return _super.call(this) || this;
    }
    PhoneInfoBox.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        egret.log("PhoneInfoBox");
        this._timer = new egret.Timer(5000);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
        this._timer.start();
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        this._date = new Date();
        PhoneInfoBox._instance = this;
        this.update();
    };
    PhoneInfoBox.init = function () {
        egret.ExternalInterface.addCallback("getBatteryQuantity", PhoneInfoBox.getBatteryQuantityCB);
        egret.ExternalInterface.addCallback("getInternetStatus", PhoneInfoBox.getInternetStatusCB);
    };
    PhoneInfoBox.getBatteryQuantityCB = function (message) {
        if (PhoneInfoBox._instance) {
            PhoneInfoBox._instance.setBetteryQuantity(message);
        }
    };
    PhoneInfoBox.getInternetStatusCB = function (message) {
        if (PhoneInfoBox._instance) {
            PhoneInfoBox._instance.setInternetStatus(message);
        }
    };
    PhoneInfoBox.prototype.setInternetStatus = function (netType) {
        switch (netType) {
            case "wifi":
                this._netImg.source = "wifi_3_png";
                break;
            case "wwan":
                this._netImg.source = "signal_4_png";
                break;
            case "notReachable":
                this._netImg.source = "signal_0_png";
                break;
        }
    };
    PhoneInfoBox.prototype.setBetteryQuantity = function (count) {
        var _count = parseFloat(count);
        this._kWhObj.width = 26 * _count;
        if (_count < 0.25) {
            this._kWhObj.fillColor = 0xff0202;
        }
        else if (_count < 0.5) {
            this._kWhObj.fillColor = 0xfff787;
        }
        else {
            this._kWhObj.fillColor = 0x86FF99;
        }
    };
    PhoneInfoBox.prototype.onExit = function () {
        PhoneInfoBox._instance = null;
        if (this._timer) {
            this._timer.stop();
            this._timer = null;
        }
    };
    PhoneInfoBox.prototype.update = function () {
        this._date.setTime(Date.now());
        this._timeLab.text = this._date.Format("hh:mm");
        NativeBridge.getBatteryQuantity();
        NativeBridge.getInternetStatus();
    };
    return PhoneInfoBox;
}(eui.Component));
__reflect(PhoneInfoBox.prototype, "PhoneInfoBox");
PhoneInfoBox.init();
//# sourceMappingURL=PhoneInfoBox.js.map