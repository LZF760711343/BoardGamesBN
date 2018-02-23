/**
 *
 * @author he
 *
 */
namespace DDZ {
    export const BTNBAR_EVENT = {
        NONE: "NONE",
        /**
         * 抢/叫地主超时回调
         */
        CALL: "call",
        /**
         * 出牌超时的回调
         */
        PLAY: "play",//出牌
        // CAL: "cal",//算牛
        // BU: "bu",//补牌回调
        // BI: "bi",//比牌回调
        /**
         * 准备超时回调
         */
        READY: "ready",
    }
    /**
     * 抢/叫地主超时时间
     */
    export const CALL_LANDLORD_TIME = 15;
    /**
     * 出牌的超时时间
     */
    export const PLAY_CARD_TIME = 15;
    export const BTN_BAR_STATUS = {
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
    export class GameBtnBar extends eui.Component {
        private _countDown: UI.CountDown;


        /**
         * 提示按钮
         */
        public btnTishi: UI.CommonBtn;
        /**
         * 出牌按钮
         */
        public btnChupai: UI.CommonBtn;
        /**
         * 不要按钮
         */
        public btnBuyao: UI.CommonBtn;
        /**
         * 不叫/不抢地主按钮
         */
        public btnBujiao: UI.CommonBtn;
        /**
         * 叫/抢地主按钮
         */
        public btnJiaodizhu: UI.CommonBtn;
        /**
         * 加倍按钮
         */
        public btnJiabei: UI.CommonBtn;
        /**
         * 不加倍按钮
         */
        public btnBujiabei: UI.CommonBtn;
        public btnReady: UI.CommonBtn;
        public btnChangeDesk: UI.CommonBtn;

        public btn1fen: UI.CommonBtn;
        public btn2fen: UI.CommonBtn;
        public btn3fen: UI.CommonBtn;

         private _callBtns: UI.CommonBtn[];
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
        constructor() {
            super();
            // this._isCb = false;
        }
        public set curState(value: string) {
            this.currentState = value;
            egret.log("this.currentState:", this.currentState);
        }
        public get curState() {
            return this.currentState;
        }
        protected createChildren(): void {
            super.createChildren();
            this._countDown.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onExit,this);
            // this._btnBets = [this["btnBet1"], this["btnBet2"], this["btnBet3"], this["btnBet4"], this["btnBet5"],];
            // this._btnRobs = [this["btnNot"], this["btnRob1"], this["btnRob2"], this["btnRob3"], this["btnRob4"]];
            this._callBtns = [this.btnBujiao, this.btn1fen, this.btn2fen, this.btn3fen]
        }

        //根据上一家叫的分数,觉得那些按钮灰掉
        public setCallBtnEnablByScore(score) {
            egret.log("setCallBtnEnablByScore:", score)
            if (score < 3) {
                for (var i = 1; i <= score; i++) {
                    this._callBtns[i].enabled = false;
                }
            }
        }

         public resetCallBtns() {
            this.btn1fen.enabled = true;
            this.btn2fen.enabled = true;
            //            for(var i = 1;i <= 2;i++) {
            //                this._callBtns[i].enabled = true;
            //            }
        }

        public clearCbKey() {
            // this._isWarnSndPlaying = false;
            // this._cbKey = null;
        }
        public setIsCb(value: boolean) {
            // this._isCb = value;
        }
        private onTimer(event: egret.TouchEvent): void {

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
        }
        public setTime(value: number): void {
            // this._tipsLb.text = this._tipStr.format(value);
        }
        // public setIsShowTimer(value: boolean) {
        //     this._isShowTimer = value;
        // }
        public startTimer(time: number = 10, tip: string, isWarnSndPlaying: boolean = false, _cbKey?: string): void {
            this._countDown.startTimer(time);
            // this._countDown.re
            // this._isWarnSndPlaying = isWarnSndPlaying;
            // this._cbKey = _cbKey;
            // this._curTime = time;
            // this._tipStr = tip;
            // this.setTime(this._curTime);
            // this.stopTimer();
            // FrameManager.getInstance().addTimerByKey(this.hashCode, this.onTimer, this, 1000, time);
        }
        public stopTimer(): void {
            this._countDown.stopTimer();
        }
        public setTip(str: string): void {
            // this._tipStr = str;
            // this.setTime(this._curTime);
        }
        /**
         * 注册抢庄按钮回调
         */
        public registerRobCB(cb: Function, target: Object): void {
            // var length = this._btnRobs.length;
            // for (var i = 0; i < length; i++) {
            //     this._btnRobs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, cb, target);
            // }
        }
        /**
         * 注册下注按钮回调
         */
        public registerBetCB(cb: Function, target: Object): void {
            // var length = this._btnBets.length;
            // for (var i = 0; i < length; i++) {
            //     this._btnBets[i].addEventListener(egret.TouchEvent.TOUCH_TAP, cb, target);
            // }
        }

        private onExit(){
            this._countDown.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        }
    }
}
