namespace UI {
	/**
	 *
	 * @author He
	 *
	 */
    const enum RECORD_STATUS {
    	/**
    	 * 正常状态,可以录音
    	 */
        NONE,//
	    /**
	     * //录音中
	     */
        RECORDING,
	    /**
	     * //录音上传中
	     */
        UPLOADING,
	    /**
	     * 播放录音中
	     */
        PLAYING,
    }
    type Handler = {
        /**
         * 播放完录音的回调
         */
        finishCallBack: Function;
        /**
         * 回调绑定的this对象
         */
        thisObj: Object;
        /**
         * 录音的地址
         */
        url: string;
        /**
         * 录音的唯一识别码
         */
        hashCode: string;
    }
    /**
     * 最短的录音时间,录音时间短于这个时间就不进行上传,以毫秒为单位
     */
    const MIN_RECORDER_TIME = 300;
    /**
     * 播放录音超时时间,用于防止录音播放出问题,没有收到回调,导致没办法继续播放录音
     */
    const MAX_PLAY_RECORDER_TIME = 20000;
    export class Recorder extends eui.Component {
        private imgList: eui.Image[];
        private index: number;
        private timer: number;
        private count: number;
        private static _instance: Recorder;
        private status: number;
        private _hashCode: number;
        // private _callBack: Function;
        // private _target: Object;
        private _data: { url: string, hashCode: string };
        private _sData: { cancel: number };
        private startTime: number;
        private timeOutTimer: number;
        private _handlerList: Handler[];
        private _playTimeOutTimer: number;

        public constructor() {
            super();
            this.skinName = RecorderSkin;
            this.status = RECORD_STATUS.NONE;
            egret.ExternalInterface.addCallback("recordFinish", this.recordFinish.bind(this));
            egret.ExternalInterface.addCallback("playFinish", this.playFinish.bind(this));
            this.verticalCenter = this.horizontalCenter = 0;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
            this._data = { url: null, hashCode: null };
            this._sData = { cancel: 0 };
            this.imgList = [
                this["_img1"],
                this["_img2"],
                this["_img3"],
                this["_img4"],
                this["_img5"],
                this["_img6"]
            ];
            this._hashCode = 0;
            this._handlerList = [];
        }
        public static get instance() {
            if (Recorder._instance) {
                return Recorder._instance;
            } else {
                Recorder._instance = new Recorder();
                return Recorder._instance;
            }
        }
        private $playRecord() {
            SoundManage.pauseMusic();
            this._data.url = this._handlerList[0].url;
            this._data.hashCode = this._handlerList[0].hashCode;
            NativeBridge.playRecord(this._data);
            this.startPlayTimeOut();
        }
        /**
         * 开始播放录音超时回调
         */
        private startPlayTimeOut() {
            if (this._playTimeOutTimer) {
                egret.clearTimeout(this._playTimeOutTimer);
            }
            this._playTimeOutTimer = egret.setTimeout(this.onPlayTimeOut, this, MAX_PLAY_RECORDER_TIME);
        }
        private stopPlayTimeOut() {
            if (this._playTimeOutTimer) {
                egret.clearTimeout(this._playTimeOutTimer);
                this._playTimeOutTimer = null;
            }
        }
        /**
         * 播放录音超时
         */
        private onPlayTimeOut() {
            this.playFinish(this._data.hashCode);
        }
        public playRecord(url: string, callBack?: Function, target?: Object) {
            let hashCode = this._hashCode++;
            egret.log("PrePlayrecord:" + url);
            this._handlerList.push({
                finishCallBack: callBack,
                thisObj: target,
                url: url,
                hashCode: hashCode + ""
            });
            egret.log("this._handlerList.length:" + this._handlerList.length);
            egret.log("hashCode:" + hashCode);

            if (this._handlerList.length === 1) {//如果当前录音列表只有一个,说明当前没有正在播放的录音
                this.$playRecord();
            }
        }
        /**
         * 清理当前录音播放列表
         */
        public clearPlayRecord() {
            this.stopPlayTimeOut();
            this._handlerList = [];
        }
        /**
         * 录音播放完回调
         */
        private playFinish(hashCode) {
            egret.log(TAG + "playFinish:" + hashCode + "    ,length:" + this._handlerList.length);

            let arrLen = this._handlerList.length;
            for (let i = 0; i < arrLen; i++) {
                if (this._handlerList[i].hashCode == hashCode) {//通过hashCode找到播放录音的数据,一般都是第一个
                    if (this._handlerList[i].finishCallBack) {//如果有回调执行回调
                        this._handlerList[i].finishCallBack.call(this._handlerList[i].thisObj)
                    }
                    this._handlerList.splice(i, 1);
                    break;
                }
            }
            if (this._handlerList.length) {//如果播放列表还存在录音,继续播放
                this.$playRecord();
            } else {
                SoundManage.resumeMusic();
                this.stopPlayTimeOut();
                if (this.status != RECORD_STATUS.RECORDING && this.status != RECORD_STATUS.UPLOADING) {
                    this.status = RECORD_STATUS.NONE;
                }
            }
        }
        public startRecord(): boolean {
            if (this.status != RECORD_STATUS.NONE) {
                return false;
            }
            this.startTime = Date.now();
            this.status = RECORD_STATUS.RECORDING;
            SoundManage.pauseMusic();
            NativeBridge.startRecord();
            this.doAni();
            return true;
        }
        public stopPlayRecord(): void {
            NativeBridge.stopPlayRecord();
            this.status = RECORD_STATUS.NONE;
        }
        public stopRecord() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            SoundManage.resumeMusic();
            if (this.status != RECORD_STATUS.RECORDING)//当前状态不是录音状态,直接退出
                return;
            this.stopTimer();
            if (Date.now() - this.startTime > MIN_RECORDER_TIME) {
                this._sData.cancel = 0;
                this.status = RECORD_STATUS.UPLOADING;
                this.timeOutTimer = egret.setTimeout(this.upLoadTimeOut, this, 15000);
            } else {
                this._sData.cancel = 1;
                this.status = RECORD_STATUS.NONE;
                Toast.launch(GameLangs.recordTooShort);
            }
            NativeBridge.stopRecord(JSON.stringify(this._sData));
        }
        private upLoadTimeOut() {
            this.status = RECORD_STATUS.NONE;
        }
        public init() {
            this.status = RECORD_STATUS.NONE;
        }
        private recordFinish(url: string) {
            this.status = RECORD_STATUS.NONE;
            console.log("url:::" + url);
            this.stopTimeoutTimer();
            net.SendMsg.create({ chatStr: "#300@" + url }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ROOM_CHAT).send();
        }
        public onExit() {
            this.stopTimer();
        }
        public stopTimer() {
            if (this.timer) {
                egret.clearInterval(this.timer);
                this.timer = null;
            }

        }
        public stopTimeoutTimer() {
            if (this.timeOutTimer) {
                egret.clearTimeout(this.timeOutTimer);
                this.timeOutTimer = null;
            }
        }
        private doNextAni() {
            if (this.index > 4) {
                this.initAni();
            } else {
                this.imgList[++this.index].visible = true;
            };
            if (++this.count > 100) {
                this.stopRecord();
            }
        }
        private initAni() {
            this.index = 0;
            for (var i = this.imgList.length - 1; i > 0; --i) {
                this.imgList[i].visible = false;
            }
        }
        public doAni() {
            this.index = 0;
            this.stopTimer();
            this.count = 0;
            for (var i = this.imgList.length - 1; i > 0; --i) {
                this.imgList[i].visible = false;
            }
            this.timer = egret.setInterval(this.doNextAni, this, 200);
        }
    }
}
