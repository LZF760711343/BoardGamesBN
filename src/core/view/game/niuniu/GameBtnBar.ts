/**
 *
 * @author he
 *
 */
namespace niuniu {
    export const BTNBAR_EVENT = {
        NONE: "NONE",
        ROB: "rob",//抢庄
        BET: "bet",//下注
        CAL: "cal",//算牛
        BU: "bu",//补牌回调
        BI: "bi",//比牌回调
        /**
         * 准备超时回调
         */
        READY: "ready",
    }
    export const BTN_BAR_STATUS = {
        NONE: "none",
        /**
         * 已经准备状态
         */
        ZHUNBEI: "zhunbei",
        /**
         * 显示抢庄按钮状态
         */
        ROB: "rob",
        /**
         * 显示下注按钮状态
         */
        BET: "bet",
        /**
         * 等待其他人下注状态
         */
        WAITBET: "waitBet",
        /**
         * 显示算牛栏状态,该状态只在牛牛有
         */
        CAL: "cal",
        /**
         * 显示木虱补牌跟比牌按钮状态,该状态只在木虱有
         */
        MSBUPAI: "msBupai",
        /**
         * 显示木虱等待其他人操作状态,该状态只在木虱有
         */
        MSWAIT: "msWait",
        /**
         * 显示准备倒计时状态
         */
        WAITREADY: "waitReady",
        /**
         * 等待其他人玩完游戏
         */
        WAIT: "wait",
        /**
         * 已经准备和换桌状态
         */
        GOLDZHUNBEI: "goldzhunbei",
    };
    export class GameBtnBar extends eui.Component {
        public btnChangeDesk: UI.CommonBtn;
        private _tmieSurplus: eui.BitmapLabel;
        public _btnReady: eui.Button;
        // public btn_ready: eui.Button;
        public _curTime: number;
        // public btnBupai: UI.CommonBtn;
        // public btnBipai: UI.CommonBtn;
        private _btnBets: UI.CommonBtn[];
        private _btnRobs: eui.Button[];
        private zhuangBeishu: number[] = [];
        private xianBeishu: number[] = [];
        private isFen: boolean;
        // public btnRob2: UI.CommonBtn;
        // public btnRob3: UI.CommonBtn;
        // public btnRob4: UI.CommonBtn;

        /**
         * 是否执行超时回调,金币场的时候才设置为true,房卡模式为false,不进行超时回调
         */
        private _isCb: boolean;
        /**
         * 是否播放超时警告声音
         */
        private _isWarnSndPlaying: boolean;
        private _tipsLb: eui.Label;
        // private _isShowTimer: boolean = true;
        private _tipStr: string;
        private _cbKey: string;
        constructor() {
            super();
            this._isCb = false;
            this.isFen = false;
        }
        public set curState(value: string) {
            this.currentState = value;
            egret.log("this.currentState:", this.currentState);
        }
        public get curState() {
            return this.currentState;
        }
        /**
         * 设置倍数按钮,list:倍数列表;isfen:按钮icon显示的是分还是倍
         */
        public initBetBtns(list: number[], isfen: boolean): void {
            egret.log("list" + list, list.length)
            this.isFen = isfen;
            for (var i = 0; i < 5; i++) {
                egret.log("list[i]" + list[i]);
                this.xianBeishu[i] = list[i];
                if (list[i]) {
                    this._btnBets[i].label = isfen ? list[i] + GameLangs.bei : list[i] + GameLangs.bei;
                    // this._btnBets[i].label = isfen ? list[i] + GameLangs.fen : list[i] + GameLangs.bei;
                    this._btnBets[i].name = list[i] + '';
                    //不显示的按钮不加入布局管理器里面管理
                    this._btnBets[i].includeInLayout = this._btnBets[i].visible = true;
                } else {
                    this._btnBets[i - 1].bgStr = "bigR_icon_png";
                    this._btnBets[i].includeInLayout = this._btnBets[i].visible = false;
                }
            }
        }
        /**
         * 初始化抢庄按钮
         */
        public initRobBtn(list: number[], gameType: GAME_TYPE) {



            // if (gameType === GAME_TYPE.CARD) {//如果是房卡模式,只显示抢跟不抢按钮
            //     this._btnRobs[2].includeInLayout = this._btnRobs[2].visible =
            //         this._btnRobs[3].includeInLayout = this._btnRobs[3].visible =
            //         this._btnRobs[4].includeInLayout = this._btnRobs[4].visible =
            //         false;
            // } else {//如果是金币场
            for (var i = 0; i < 5; i++) {
                this.zhuangBeishu[i] = list[i];
                let btn = this._btnRobs[i];
                egret.log("list[i]" + list[i]);
                if (isNaN(list[i])) {
                    //不显示的按钮不加入布局管理器里面管理
                    btn.includeInLayout = btn.visible = false;
                } else {
                    if (i === 0) {
                        btn.label = GameLangs.buqiang;
                    } else {
                        btn.label = list[i] + GameLangs.bei;
                    }
                    btn.name = list[i] + '';
                    btn.includeInLayout = btn.visible = true;
                }
            }
            // }
        }
        protected createChildren(): void {
            super.createChildren();
            this._btnBets = [this["btnBet1"], this["btnBet2"], this["btnBet3"], this["btnBet4"], this["btnBet5"],];
            this._btnRobs = [this["btnNot"], this["btnRob1"], this["btnRob2"], this["btnRob3"], this["btnRob4"]];
        }
        public getMinBetCount() {
            return this._btnBets[0].name;
        }
        public clearCbKey() {
            this._isWarnSndPlaying = false;
            this._cbKey = null;
        }
        public setIsCb(value: boolean) {
            this._isCb = value;
        }
        private onTimer(): void {
            this.setTime(--this._curTime);
            // if (this.cur_time < 5 && this.isWarnSndPlaying) {
            //     SoundManage.playEffect('timeWarn');
            // }
            // egret.log("this._curTime:",this._curTime, this._isCb,this._cbKey  )
            if (this._curTime < 1) {
                if (
                    this._isCb
                    // && this._isShowTimer 
                    && this._cbKey) {
                    egret.Event.dispatchEvent(this, this._cbKey)
                }
                // this.stopTimer();
            }
        }
        public setTime(value: number): void {
            // this._tipsLb.text = this._tipStr.format(value);
            this._tipsLb.text = this._tipStr;
            egret.log("value" + value);
            this._tmieSurplus.text = value + "";
            if (value == 3) {
                SoundManage.playEffect("dididi");
            }
        }
        // public setIsShowTimer(value: boolean) {
        //     this._isShowTimer = value;
        // }
        public startTimer(time: number = 20, tip: string, isWarnSndPlaying: boolean = false, _cbKey?: string): void {
            this._isWarnSndPlaying = isWarnSndPlaying;
            this._cbKey = _cbKey;
            this._curTime = time;
            this._tipStr = tip;
            this.setTime(this._curTime);
            this.stopTimer();
            FrameManager.getInstance().addTimerByKey(this.hashCode, this.onTimer, this, 1000, time);
        }
        public stopTimer(): void {
            FrameManager.getInstance().delayRemoveHandler(this.hashCode);
        }
        public setTip(str: string): void {
            this._tipStr = str;
            this.setTime(this._curTime);
        }
        /**
         * 注册抢庄按钮回调
         */
        public registerRobCB(cb: Function, target: Object): void {
            var length = this._btnRobs.length;
            for (var i = 0; i < length; i++) {
                this._btnRobs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, cb, target);
            }
        }
        /**
         * 注册下注按钮回调
         */
        public registerBetCB(cb: Function, target: Object): void {
            var length = this._btnBets.length;
            for (var i = 0; i < length; i++) {
                this._btnBets[i].addEventListener(egret.TouchEvent.TOUCH_TAP, cb, target);
            }
        }

        /**刷新抢庄按钮可用状态
         * @param playerGold 玩家金币
         * @param roomBeilv 房间倍率
         * @param playerCount 玩家人数
         * @param xianMaxBeilv 闲家最大倍率
         * @param cardTypeMaxBeilv 牌型最大倍率
         */
        public RefreshQiangBarAvail(playerGold: number, roomBeilv: number, playerCount: number, xianMaxBeilv: number, cardTypeMaxBeilv: number, isCoin: boolean) {
            for (let i = 0; i < 5; i++) {
                this._btnRobs[i].currentState = "up";
                this._btnRobs[i].enabled = true;
            }
            var beilv;
            // beilv = playerGold / (roomBeilv * (playerCount - 1) * xianMinBeilv * cardTypeMaxBeilv);
            beilv = playerGold / (roomBeilv * xianMaxBeilv * cardTypeMaxBeilv);
            console.log("refreshing庄:", beilv);
            for (let i = 1; i < 5; i++) {
                if (isCoin) {
                    if (this.zhuangBeishu[i] > beilv) {
                        for (let j = i; j < 5; j++) {
                            this._btnRobs[j].enabled = false;
                            this._btnRobs[j].currentState = "disabled";
                        }
                        break;
                    }
                }

            }
        }

        /**刷新闲家按钮可用状态
         * @param zhuangGold 庄家金币
         * @param playerGold 玩家金币
         * @param playerCount 玩家人数
         * @param zhuangBeilv 庄家倍率
         * @param cardTypeMaxBeilv 牌型最大倍率
         * @param roomBeilv 房间倍率
         */
        public RefreshXianBarAvail(zhuangGold: number, playerGold: number, playerCount: number, zhuangBeilv: number, cardTypeMaxBeilv: number, roomBeilv: number) {
            console.log("庄家金币：", zhuangGold, " 闲家金币：", playerGold, " 人数：", playerCount, " 庄倍：", zhuangBeilv, " 牌型倍率：", cardTypeMaxBeilv, " 房间倍率", roomBeilv);
            for (let i = 0; i < 5; i++) {
                this._btnBets[i].currentState = "up";
                this._btnBets[i].enabled = true;
            }
            if (!this.isFen) {
                var min;
                var beilv;
                // min = (zhuangGold / (playerCount - 1) <= playerGold) ? zhuangGold/ (playerCount - 1 ) : playerGold;
                min = zhuangGold <= playerGold ? zhuangGold : playerGold;
                beilv = min / (roomBeilv * zhuangBeilv * cardTypeMaxBeilv);
                console.log("refreshing闲:", beilv, "min:", min);
                for (let i = 0; i < 5; i++) {
                    if (this.xianBeishu[i] > beilv) {
                        for (let j = i; j < 5; j++) {
                            if (j != 0) {
                                this._btnBets[j].enabled = false;
                                this._btnBets[j].currentState = "disabled";
                            }

                        }
                        break;
                    }
                }
            }
        }
    }
}
