var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layers;
(function (Layers) {
    /**
     *
     * @author HE
     * 加载资源或者网络连接时候弹出来的页面
     *
     */
    var WaitingLayer = (function (_super) {
        __extends(WaitingLayer, _super);
        function WaitingLayer() {
            var _this = _super.call(this) || this;
            var rect = new eui.Rect();
            _this.percentWidth = _this.percentHeight = rect.percentWidth = rect.percentHeight = 100;
            _this.addChild(rect);
            rect.alpha = 0.5;
            var runImg = _this.runImg = new eui.Image("loading2_png");
            runImg.verticalCenter = runImg.horizontalCenter = 0;
            // var load_img = this.load_img = new components.LoadingIcon();
            _this.addChild(runImg);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
            return _this;
        }
        WaitingLayer.prototype.onAddToStage = function () {
            this.run();
        };
        WaitingLayer.prototype.onRemovedFromStage = function () {
            this.stop();
        };
        WaitingLayer.open = function () {
            if (!WaitingLayer._instance) {
                WaitingLayer._instance = new WaitingLayer();
            }
            // if(!WaitingLayer._instance.pa)
            Main.instance.addChild(WaitingLayer._instance);
        };
        WaitingLayer.close = function () {
            if (WaitingLayer._instance && WaitingLayer._instance.parent) {
                WaitingLayer._instance.parent.removeChild(WaitingLayer._instance);
            }
        };
        WaitingLayer.prototype.stop = function () {
            if (this._isRunning) {
                egret.Tween.removeTweens(this.runImg);
                this._isRunning = false;
            }
        };
        WaitingLayer.prototype.run = function () {
            if (this._isRunning) {
                return;
            }
            this._isRunning = true;
            egret.Tween.get(this.runImg, { loop: true }).to({ rotation: 360 }, 2000);
        };
        return WaitingLayer;
    }(eui.Component));
    Layers.WaitingLayer = WaitingLayer;
    __reflect(WaitingLayer.prototype, "Layers.WaitingLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=WaitingLayer.js.map