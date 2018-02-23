var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var niuniu;
(function (niuniu) {
    var brnn;
    (function (brnn) {
        /**
         * 提示条的状态
         */
        brnn.TipBarStatu = {
            /**
             * 不显示
             */
            NONE: "none",
            /**
             * 提示等待玩家当王
             */
            WAIT_KING: "waitKing",
            /**
             * 等待游戏开局
             */
            WAIT: "wait",
            /**
             * 結算
             */
            ACCOUNT: "account",
        };
        var TipBar = (function (_super) {
            __extends(TipBar, _super);
            function TipBar() {
                var _this = _super.call(this) || this;
                _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onExit, _this);
                return _this;
            }
            TipBar.prototype.onExit = function () {
                this.Wait.stop();
            };
            TipBar.prototype.setMoney = function (count) {
                this._moneyLb.animation(count);
            };
            Object.defineProperty(TipBar.prototype, "curState", {
                get: function () {
                    return this.currentState;
                },
                set: function (v) {
                    this.currentState = v;
                    switch (v) {
                        case brnn.TipBarStatu.WAIT:
                        case brnn.TipBarStatu.WAIT_KING:
                            this.Wait.play();
                            break;
                        case brnn.TipBarStatu.NONE:
                            this.Wait.pause();
                            break;
                        default:
                            this.Wait.pause();
                            break;
                    }
                },
                enumerable: true,
                configurable: true
            });
            return TipBar;
        }(eui.Component));
        brnn.TipBar = TipBar;
        __reflect(TipBar.prototype, "niuniu.brnn.TipBar");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=TipBar.js.map