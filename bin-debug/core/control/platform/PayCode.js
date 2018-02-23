var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var nest;
(function (nest) {
    /**
     * 二维码,用于扫码支付
     */
    var PayCode = (function (_super) {
        __extends(PayCode, _super);
        // private bg: eui.Rect;
        function PayCode() {
            return _super.call(this) || this;
        }
        PayCode.prototype.init = function (source) {
            var bg = new eui.Rect();
            this.addChild(bg);
            bg.fillColor = 0x0;
            bg.alpha = 0.6;
            bg.percentWidth = bg.percentHeight = 100;
            var img = new eui.Image(source);
            img.verticalCenter = img.horizontalCenter = 0;
            this.addChild(img);
        };
        PayCode.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.percentWidth = this.percentHeight = 100;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        PayCode.prototype.onTouchTap = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PayCode;
    }(eui.Component));
    nest.PayCode = PayCode;
    __reflect(PayCode.prototype, "nest.PayCode");
})(nest || (nest = {}));
//# sourceMappingURL=PayCode.js.map