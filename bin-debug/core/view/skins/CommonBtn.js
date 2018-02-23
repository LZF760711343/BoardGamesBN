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
 * @author
 *
 */
var UI;
(function (UI) {
    var CommonBtn = (function (_super) {
        __extends(CommonBtn, _super);
        function CommonBtn() {
            var _this = _super.call(this) || this;
            _this.bgStr = '';
            // public extData: any;
            _this.bgGrayStr = '';
            _this.upStr = "";
            _this.downStr = "";
            _this.disabledStr = "";
            return _this;
            // this.touchChildren = false;
        }
        /**
         * @language en_US
         * This method is called when handling a <code>egret.TouchEvent.TOUCH_END</code> event
         * when the user touches on the button. It is only called when the button
         * is the target and when <code>touchCaptured</code> is <code>true</code>.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当在用户单击按钮之后处理 <code>egret.TouchEvent.TOUCH_END</code> 事件时，将调用此方法。
         * 仅当以按钮为目标，并且 <code>touchCaptured</code> 为 <code>true</code> 时，才会调用此方法。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        CommonBtn.prototype.buttonReleased = function () {
            egret.log("buttonReleased");
            SoundManage.playEffect('btnClick');
        };
        return CommonBtn;
    }(eui.Button));
    UI.CommonBtn = CommonBtn;
    __reflect(CommonBtn.prototype, "UI.CommonBtn");
})(UI || (UI = {}));
//# sourceMappingURL=CommonBtn.js.map