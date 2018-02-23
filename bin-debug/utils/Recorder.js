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
    /**
     * 最短的录音时间,录音时间短于这个时间就不进行上传,以毫秒为单位
     */
    var MIN_RECORDER_TIME = 300;
    /**
     * 播放录音超时时间,用于防止录音播放出问题,没有收到回调,导致没办法继续播放录音
     */
    var MAX_PLAY_RECORDER_TIME = 20000;
    var Recorder = (function (_super) {
        __extends(Recorder, _super);
        function Recorder() {
            var _this = _super.call(this) || this;
            _this.skinName = UI.RecorderSkin;
            _this.status = 0 /* NONE */;
            egret.ExternalInterface.addCallback("recordFinish", _this.recordFinish.bind(_this));
            egret.ExternalInterface.addCallback("playFinish", _this.playFinish.bind(_this));
            _this.verticalCenter = _this.horizontalCenter = 0;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onExit, _this);
            _this._data = { url: null, hashCode: null };
            _this._sData = { cancel: 0 };
            _this.imgList = [
                _this["_img1"],
                _this["_img2"],
                _this["_img3"],
                _this["_img4"],
                _this["_img5"],
                _this["_img6"]
            ];
            _this._hashCode = 0;
            _this._handlerList = [];
            return _this;
        }
        Object.defineProperty(Recorder, "instance", {
            get: function () {
                if (Recorder._instance) {
                    return Recorder._instance;
                }
                else {
                    Recorder._instance = new Recorder();
                    return Recorder._instance;
                }
            },
            enumerable: true,
            configurable: true
        });
        Recorder.prototype.$playRecord = function () {
            SoundManage.pauseMusic();
            this._data.url = this._handlerList[0].url;
            this._data.hashCode = this._handlerList[0].hashCode;
            NativeBridge.playRecord(this._data);
            this.startPlayTimeOut();
        };
        /**
         * 开始播放录音超时回调
         */
        Recorder.prototype.startPlayTimeOut = function () {
            if (this._playTimeOutTimer) {
                egret.clearTimeout(this._playTimeOutTimer);
            }
            this._playTimeOutTimer = egret.setTimeout(this.onPlayTimeOut, this, MAX_PLAY_RECORDER_TIME);
        };
        Recorder.prototype.stopPlayTimeOut = function () {
            if (this._playTimeOutTimer) {
                egret.clearTimeout(this._playTimeOutTimer);
                this._playTimeOutTimer = null;
            }
        };
        /**
         * 播放录音超时
         */
        Recorder.prototype.onPlayTimeOut = function () {
            this.playFinish(this._data.hashCode);
        };
        Recorder.prototype.playRecord = function (url, callBack, target) {
            var hashCode = this._hashCode++;
            egret.log("PrePlayrecord:" + url);
            this._handlerList.push({
                finishCallBack: callBack,
                thisObj: target,
                url: url,
                hashCode: hashCode + ""
            });
            egret.log("this._handlerList.length:" + this._handlerList.length);
            egret.log("hashCode:" + hashCode);
            if (this._handlerList.length === 1) {
                this.$playRecord();
            }
        };
        /**
         * 清理当前录音播放列表
         */
        Recorder.prototype.clearPlayRecord = function () {
            this.stopPlayTimeOut();
            this._handlerList = [];
        };
        /**
         * 录音播放完回调
         */
        Recorder.prototype.playFinish = function (hashCode) {
            egret.log(TAG + "playFinish:" + hashCode + "    ,length:" + this._handlerList.length);
            var arrLen = this._handlerList.length;
            for (var i = 0; i < arrLen; i++) {
                if (this._handlerList[i].hashCode == hashCode) {
                    if (this._handlerList[i].finishCallBack) {
                        this._handlerList[i].finishCallBack.call(this._handlerList[i].thisObj);
                    }
                    this._handlerList.splice(i, 1);
                    break;
                }
            }
            if (this._handlerList.length) {
                this.$playRecord();
            }
            else {
                SoundManage.resumeMusic();
                this.stopPlayTimeOut();
                if (this.status != 1 /* RECORDING */ && this.status != 2 /* UPLOADING */) {
                    this.status = 0 /* NONE */;
                }
            }
        };
        Recorder.prototype.startRecord = function () {
            if (this.status != 0 /* NONE */) {
                return false;
            }
            this.startTime = Date.now();
            this.status = 1 /* RECORDING */;
            SoundManage.pauseMusic();
            NativeBridge.startRecord();
            this.doAni();
            return true;
        };
        Recorder.prototype.stopPlayRecord = function () {
            NativeBridge.stopPlayRecord();
            this.status = 0 /* NONE */;
        };
        Recorder.prototype.stopRecord = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            SoundManage.resumeMusic();
            if (this.status != 1 /* RECORDING */)
                return;
            this.stopTimer();
            if (Date.now() - this.startTime > MIN_RECORDER_TIME) {
                this._sData.cancel = 0;
                this.status = 2 /* UPLOADING */;
                this.timeOutTimer = egret.setTimeout(this.upLoadTimeOut, this, 15000);
            }
            else {
                this._sData.cancel = 1;
                this.status = 0 /* NONE */;
                Toast.launch(GameLangs.recordTooShort);
            }
            NativeBridge.stopRecord(JSON.stringify(this._sData));
        };
        Recorder.prototype.upLoadTimeOut = function () {
            this.status = 0 /* NONE */;
        };
        Recorder.prototype.init = function () {
            this.status = 0 /* NONE */;
        };
        Recorder.prototype.recordFinish = function (url) {
            this.status = 0 /* NONE */;
            console.log("url:::" + url);
            this.stopTimeoutTimer();
            net.SendMsg.create({ chatStr: "#300@" + url }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ROOM_CHAT).send();
        };
        Recorder.prototype.onExit = function () {
            this.stopTimer();
        };
        Recorder.prototype.stopTimer = function () {
            if (this.timer) {
                egret.clearInterval(this.timer);
                this.timer = null;
            }
        };
        Recorder.prototype.stopTimeoutTimer = function () {
            if (this.timeOutTimer) {
                egret.clearTimeout(this.timeOutTimer);
                this.timeOutTimer = null;
            }
        };
        Recorder.prototype.doNextAni = function () {
            if (this.index > 4) {
                this.initAni();
            }
            else {
                this.imgList[++this.index].visible = true;
            }
            ;
            if (++this.count > 100) {
                this.stopRecord();
            }
        };
        Recorder.prototype.initAni = function () {
            this.index = 0;
            for (var i = this.imgList.length - 1; i > 0; --i) {
                this.imgList[i].visible = false;
            }
        };
        Recorder.prototype.doAni = function () {
            this.index = 0;
            this.stopTimer();
            this.count = 0;
            for (var i = this.imgList.length - 1; i > 0; --i) {
                this.imgList[i].visible = false;
            }
            this.timer = egret.setInterval(this.doNextAni, this, 200);
        };
        return Recorder;
    }(eui.Component));
    UI.Recorder = Recorder;
    __reflect(Recorder.prototype, "UI.Recorder");
})(UI || (UI = {}));
//# sourceMappingURL=Recorder.js.map