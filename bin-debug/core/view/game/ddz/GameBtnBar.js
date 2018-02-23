var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author he
 *
 */
var DDZ;
(function (DDZ) {
    DDZ.BTNBAR_EVENT = {
        NONE: "NONE",
        /**
         * 抢/叫地主超时回调
         */
        CALL: "call",
        /**
         * 出牌超时的回调
         */
        PLAY: "play",
        // CAL: "cal",//算牛
        // BU: "bu",//补牌回调
        // BI: "bi",//比牌回调
        /**
         * 准备超时回调
         */
        READY: "ready",
    };
    /**
     * 抢/叫地主超时时间
     */
    DDZ.CALL_LANDLORD_TIME = 15;
    /**
     * 出牌的超时时间
     */
    DDZ.PLAY_CARD_TIME = 15;
    DDZ.BTN_BAR_STATUS = {
        NONE: "none",
        /**
         * 已经准备状态
         */
        READY: "ready",
        /**
         * 显示抢/不抢地主按钮
         */
        GRAB: "grab",
        /**
         * 显示叫/不叫地主按钮
         */
        CALL: "call",
        /**
         * 显示加不加倍按钮
         */
        DOUBLE: "double",
        /**
         * 显示出牌/不要/提示按钮
         */
        SHOWCARD: "showCard",
        /**
         * 显示叫分按钮
         */
        CALLFEN: "callfen",
        /**
         * 已经准备和换桌状态
         */
        GOLDREADY: "goldready",
    };
    var GameBtnBar = (function (_super) {
        __extends(GameBtnBar, _super);
        // public _btnReady: eui.Button;
        // public _curTime: number;
        // private _btnBets: eui.Button[];
        // private _btnRobs: eui.Button[];
        // /**
        //  * 是否执行超时回调,金币场的时候才设置为true,房卡模式为false,不进行超时回调
        //  */
        // private _isCb: boolean;
        // /**
        //  * 是否播放超时警告声音
        //  */
        // private _isWarnSndPlaying: boolean;
        // private _tipsLb: eui.Label;
        // private _tipStr: string;
        // private _cbKey: string;
        function GameBtnBar() {
            return _super.call(this) || this;
            // this._isCb = false;
        }
        Object.defineProperty(GameBtnBar.prototype, "curState", {
            get: function () {
                return this.currentState;
            },
            set: function (value) {
                this.currentState = value;
                egret.log("this.currentState:", this.currentState);
            },
            enumerable: true,
            configurable: true
        });
        GameBtnBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._countDown.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
            // this._btnBets = [this["btnBet1"], this["btnBet2"], this["btnBet3"], this["btnBet4"], this["btnBet5"],];
            // this._btnRobs = [this["btnNot"], this["btnRob1"], this["btnRob2"], this["btnRob3"], this["btnRob4"]];
            this._callBtns = [this.btnBujiao, this.btn1fen, this.btn2fen, this.btn3fen];
        };
        //根据上一家叫的分数,觉得那些按钮灰掉
        GameBtnBar.prototype.setCallBtnEnablByScore = function (score) {
            egret.log("setCallBtnEnablByScore:", score);
            if (score < 3) {
                for (var i = 1; i <= score; i++) {
                    this._callBtns[i].enabled = false;
                }
            }
        };
        GameBtnBar.prototype.resetCallBtns = function () {
            this.btn1fen.enabled = true;
            this.btn2fen.enabled = true;
            //            for(var i = 1;i <= 2;i++) {
            //                this._callBtns[i].enabled = true;
            //            }
        };
        GameBtnBar.prototype.clearCbKey = function () {
            // this._isWarnSndPlaying = false;
            // this._cbKey = null;
        };
        GameBtnBar.prototype.setIsCb = function (value) {
            // this._isCb = value;
        };
        GameBtnBar.prototype.onTimer = function (event) {
            // this.setTime(--this._curTime);
            // if (this.cur_time < 5 && this.isWarnSndPlaying) {
            //     SoundManage.playEffect('timeWarn');
            // }
            // // egret.log("this._curTime:",this._curTime, this._isCb,this._cbKey  )
            // if (this._curTime < 1) {
            //     if (
            //         this._isCb
            //         // && this._isShowTimer 
            //         && this._cbKey) {
            //         egret.Event.dispatchEvent(this, this._cbKey)
            //     }
            //     // this.stopTimer();
            // }
        };
        GameBtnBar.prototype.setTime = function (value) {
            // this._tipsLb.text = this._tipStr.format(value);
        };
        // public setIsShowTimer(value: boolean) {
        //     this._isShowTimer = value;
        // }
        GameBtnBar.prototype.startTimer = function (time, tip, isWarnSndPlaying, _cbKey) {
            if (time === void 0) { time = 10; }
            if (isWarnSndPlaying === void 0) { isWarnSndPlaying = false; }
            this._countDown.startTimer(time);
            // this._countDown.re
            // this._isWarnSndPlaying = isWarnSndPlaying;
            // this._cbKey = _cbKey;
            // this._curTime = time;
            // this._tipStr = tip;
            // this.setTime(this._curTime);
            // this.stopTimer();
            // FrameManager.getInstance().addTimerByKey(this.hashCode, this.onTimer, this, 1000, time);
        };
        GameBtnBar.prototype.stopTimer = function () {
            this._countDown.stopTimer();
        };
        GameBtnBar.prototype.setTip = function (str) {
            // this._tipStr = str;
            // this.setTime(this._curTime);
        };
        /**
         * 注册抢庄按钮回调
         */
        GameBtnBar.prototype.registerRobCB = function (cb, target) {
            // var length = this._btnRobs.length;
            // for (var i = 0; i < length; i++) {
            //     this._btnRobs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, cb, target);
            // }
        };
        /**
         * 注册下注按钮回调
         */
        GameBtnBar.prototype.registerBetCB = function (cb, target) {
            // var length = this._btnBets.length;
            // for (var i = 0; i < length; i++) {
            //     this._btnBets[i].addEventListener(egret.TouchEvent.TOUCH_TAP, cb, target);
            // }
        };
        GameBtnBar.prototype.onExit = function () {
            this._countDown.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        };
        return GameBtnBar;
    }(eui.Component));
    DDZ.GameBtnBar = GameBtnBar;
    __reflect(GameBtnBar.prototype, "DDZ.GameBtnBar");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=GameBtnBar.js.map