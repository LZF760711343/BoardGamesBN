var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var Layers;
(function (Layers) {
    var HintLayer = (function (_super) {
        __extends(HintLayer, _super);
        function HintLayer() {
            var _this = _super.call(this) || this;
            _this.data = {
                leftBtnBg: "button_Bred_png",
                leftBtnIcon: "确 定",
                rightBtnBg: "button_Bred_png",
                rightBtnIcon: "拒 绝",
                title: "tishi_text_png",
                tipsStr: "",
                curState: HintLayer.SURE,
            };
            _this.skinName = HintLayerSkin;
            return _this;
        }
        HintLayer.prototype.close = function () {
            Layers.closeLayer(this);
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        HintLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        HintLayer.create = function () {
            var alert = new HintLayer();
            // alert.init(params);
            return alert;
        };
        HintLayer.prototype.open = function (bgType, aniType) {
            if (bgType === void 0) { bgType = 1 /* GRAY */; }
            if (aniType === void 0) { aniType = 1 /* CENTER1 */; }
            Layers.openLayer(this, bgType, aniType);
            return this;
        };
        HintLayer.prototype.recharge = function () {
            new Layers.RechargeLayer(0).open();
            this.close();
        };
        /**
         * @param params:
         */
        HintLayer.prototype.init = function (params) {
            for (var key in params) {
                this.data[key] = params[key];
            }
            if (params.leftFunc) {
                this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, params.leftFunc, params.leftThisObj);
            }
            if (params.rightFunc) {
                this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, params.rightFunc, params.rightThisObj);
            }
            this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            return this;
        };
        HintLayer.prototype.initrecharge = function (params) {
            for (var key in params) {
                this.data[key] = params[key];
            }
            if (params.leftFunc) {
                this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, params.leftFunc, params.leftThisObj);
            }
            if (params.rightFunc) {
                this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, params.rightFunc, params.rightThisObj);
            }
            this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.recharge, this);
            this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            return this;
        };
        return HintLayer;
    }(Layers.BaseLayer));
    /**
     * 只有一个按钮,有标题
     */
    HintLayer.SURE = "sure";
    /**
     * 两个按钮,有标题
     */
    HintLayer.SURE_CANNEL = "sureCannel";
    /**
     * 只有一个按钮,没有标题
     */
    HintLayer.SURE2 = "sure2";
    /**
     * 两个按钮,没有标题
     */
    HintLayer.SURE_CANNEL2 = "sureCannel2";
    /**
    * 只有一个按钮,有标题,宽度高度缩小版
    */
    HintLayer.SURE3 = "sure3";
    Layers.HintLayer = HintLayer;
    __reflect(HintLayer.prototype, "Layers.HintLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=HintSkinLayer.js.map