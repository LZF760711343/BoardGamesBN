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
var niuniu;
(function (niuniu) {
    niuniu.BTNBAR_EVENT = {
        NONE: "NONE",
        ROB: "rob",
        BET: "bet",
        CAL: "cal",
        BU: "bu",
        BI: "bi",
        /**
         * 准备超时回调
         */
        READY: "ready",
    };
    niuniu.BTN_BAR_STATUS = {
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
    var GameBtnBar = (function (_super) {
        __extends(GameBtnBar, _super);
        function GameBtnBar() {
            var _this = _super.call(this) || this;
            _this.zhuangBeishu = [];
            _this.xianBeishu = [];
            _this._isCb = false;
            _this.isFen = false;
            return _this;
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
        /**
         * 设置倍数按钮,list:倍数列表;isfen:按钮icon显示的是分还是倍
         */
        GameBtnBar.prototype.initBetBtns = function (list, isfen) {
            egret.log("list" + list, list.length);
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
                }
                else {
                    this._btnBets[i - 1].bgStr = "bigR_icon_png";
                    this._btnBets[i].includeInLayout = this._btnBets[i].visible = false;
                }
            }
        };
        /**
         * 初始化抢庄按钮
         */
        GameBtnBar.prototype.initRobBtn = function (list, gameType) {
            // if (gameType === GAME_TYPE.CARD) {//如果是房卡模式,只显示抢跟不抢按钮
            //     this._btnRobs[2].includeInLayout = this._btnRobs[2].visible =
            //         this._btnRobs[3].includeInLayout = this._btnRobs[3].visible =
            //         this._btnRobs[4].includeInLayout = this._btnRobs[4].visible =
            //         false;
            // } else {//如果是金币场
            for (var i = 0; i < 5; i++) {
                this.zhuangBeishu[i] = list[i];
                var btn = this._btnRobs[i];
                egret.log("list[i]" + list[i]);
                if (isNaN(list[i])) {
                    //不显示的按钮不加入布局管理器里面管理
                    btn.includeInLayout = btn.visible = false;
                }
                else {
                    if (i === 0) {
                        btn.label = GameLangs.buqiang;
                    }
                    else {
                        btn.label = list[i] + GameLangs.bei;
                    }
                    btn.name = list[i] + '';
                    btn.includeInLayout = btn.visible = true;
                }
            }
            // }
        };
        GameBtnBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._btnBets = [this["btnBet1"], this["btnBet2"], this["btnBet3"], this["btnBet4"], this["btnBet5"],];
            this._btnRobs = [this["btnNot"], this["btnRob1"], this["btnRob2"], this["btnRob3"], this["btnRob4"]];
        };
        GameBtnBar.prototype.getMinBetCount = function () {
            return this._btnBets[0].name;
        };
        GameBtnBar.prototype.clearCbKey = function () {
            this._isWarnSndPlaying = false;
            this._cbKey = null;
        };
        GameBtnBar.prototype.setIsCb = function (value) {
            this._isCb = value;
        };
        GameBtnBar.prototype.onTimer = function () {
            this.setTime(--this._curTime);
            // if (this.cur_time < 5 && this.isWarnSndPlaying) {
            //     SoundManage.playEffect('timeWarn');
            // }
            // egret.log("this._curTime:",this._curTime, this._isCb,this._cbKey  )
            if (this._curTime < 1) {
                if (this._isCb
                    && this._cbKey) {
                    egret.Event.dispatchEvent(this, this._cbKey);
                }
            }
        };
        GameBtnBar.prototype.setTime = function (value) {
            // this._tipsLb.text = this._tipStr.format(value);
            this._tipsLb.text = this._tipStr;
            egret.log("value" + value);
            this._tmieSurplus.text = value + "";
            if (value == 3) {
                SoundManage.playEffect("dididi");
            }
        };
        // public setIsShowTimer(value: boolean) {
        //     this._isShowTimer = value;
        // }
        GameBtnBar.prototype.startTimer = function (time, tip, isWarnSndPlaying, _cbKey) {
            if (time === void 0) { time = 20; }
            if (isWarnSndPlaying === void 0) { isWarnSndPlaying = false; }
            this._isWarnSndPlaying = isWarnSndPlaying;
            this._cbKey = _cbKey;
            this._curTime = time;
            this._tipStr = tip;
            this.setTime(this._curTime);
            this.stopTimer();
            FrameManager.getInstance().addTimerByKey(this.hashCode, this.onTimer, this, 1000, time);
        };
        GameBtnBar.prototype.stopTimer = function () {
            FrameManager.getInstance().delayRemoveHandler(this.hashCode);
        };
        GameBtnBar.prototype.setTip = function (str) {
            this._tipStr = str;
            this.setTime(this._curTime);
        };
        /**
         * 注册抢庄按钮回调
         */
        GameBtnBar.prototype.registerRobCB = function (cb, target) {
            var length = this._btnRobs.length;
            for (var i = 0; i < length; i++) {
                this._btnRobs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, cb, target);
            }
        };
        /**
         * 注册下注按钮回调
         */
        GameBtnBar.prototype.registerBetCB = function (cb, target) {
            var length = this._btnBets.length;
            for (var i = 0; i < length; i++) {
                this._btnBets[i].addEventListener(egret.TouchEvent.TOUCH_TAP, cb, target);
            }
        };
        /**刷新抢庄按钮可用状态
         * @param playerGold 玩家金币
         * @param roomBeilv 房间倍率
         * @param playerCount 玩家人数
         * @param xianMaxBeilv 闲家最大倍率
         * @param cardTypeMaxBeilv 牌型最大倍率
         */
        GameBtnBar.prototype.RefreshQiangBarAvail = function (playerGold, roomBeilv, playerCount, xianMaxBeilv, cardTypeMaxBeilv, isCoin) {
            for (var i = 0; i < 5; i++) {
                this._btnRobs[i].currentState = "up";
                this._btnRobs[i].enabled = true;
            }
            var beilv;
            // beilv = playerGold / (roomBeilv * (playerCount - 1) * xianMinBeilv * cardTypeMaxBeilv);
            beilv = playerGold / (roomBeilv * xianMaxBeilv * cardTypeMaxBeilv);
            console.log("refreshing庄:", beilv);
            for (var i = 1; i < 5; i++) {
                if (isCoin) {
                    if (this.zhuangBeishu[i] > beilv) {
                        for (var j = i; j < 5; j++) {
                            this._btnRobs[j].enabled = false;
                            this._btnRobs[j].currentState = "disabled";
                        }
                        break;
                    }
                }
            }
        };
        /**刷新闲家按钮可用状态
         * @param zhuangGold 庄家金币
         * @param playerGold 玩家金币
         * @param playerCount 玩家人数
         * @param zhuangBeilv 庄家倍率
         * @param cardTypeMaxBeilv 牌型最大倍率
         * @param roomBeilv 房间倍率
         */
        GameBtnBar.prototype.RefreshXianBarAvail = function (zhuangGold, playerGold, playerCount, zhuangBeilv, cardTypeMaxBeilv, roomBeilv) {
            console.log("庄家金币：", zhuangGold, " 闲家金币：", playerGold, " 人数：", playerCount, " 庄倍：", zhuangBeilv, " 牌型倍率：", cardTypeMaxBeilv, " 房间倍率", roomBeilv);
            for (var i = 0; i < 5; i++) {
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
                for (var i = 0; i < 5; i++) {
                    if (this.xianBeishu[i] > beilv) {
                        for (var j = i; j < 5; j++) {
                            if (j != 0) {
                                this._btnBets[j].enabled = false;
                                this._btnBets[j].currentState = "disabled";
                            }
                        }
                        break;
                    }
                }
            }
        };
        return GameBtnBar;
    }(eui.Component));
    niuniu.GameBtnBar = GameBtnBar;
    __reflect(GameBtnBar.prototype, "niuniu.GameBtnBar");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameBtnBar.js.map