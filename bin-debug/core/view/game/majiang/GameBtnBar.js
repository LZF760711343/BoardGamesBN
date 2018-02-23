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
var majiang;
(function (majiang) {
    // export const BTNBAR_EVENT = {
    //     NONE: "NONE",
    //     /**
    //      * 抢/叫地主超时回调
    //      */
    //     CALL: "call",
    //     /**
    //      * 出牌超时的回调
    //      */
    //     PLAY: "play",//出牌
    //     // CAL: "cal",//算牛
    //     // BU: "bu",//补牌回调
    //     // BI: "bi",//比牌回调
    //     /**
    //      * 准备超时回调
    //      */
    //     READY: "ready",
    // }
    /**
     * 抢/叫地主超时时间
     */
    majiang.CALL_LANDLORD_TIME = 10;
    /**
     * 出牌的超时时间
     */
    majiang.PLAY_CARD_TIME = 15;
    majiang.BTN_BAR_STATUS = {
        NONE: "none",
        /**
         * 已经准备状态
         */
        READY: "ready",
        /**
         * 已经准备和换桌状态
         */
        GOLDREADY: "goldready",
    };
    var GameBtnBar = (function (_super) {
        __extends(GameBtnBar, _super);
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
            },
            enumerable: true,
            configurable: true
        });
        GameBtnBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return GameBtnBar;
    }(eui.Component));
    majiang.GameBtnBar = GameBtnBar;
    __reflect(GameBtnBar.prototype, "majiang.GameBtnBar");
})(majiang || (majiang = {}));
//# sourceMappingURL=GameBtnBar.js.map