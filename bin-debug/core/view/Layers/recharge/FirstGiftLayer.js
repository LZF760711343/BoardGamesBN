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
    var FirstGiftLayer = (function (_super) {
        __extends(FirstGiftLayer, _super);
        function FirstGiftLayer() {
            var _this = _super.call(this, [ResManager.GROUP_NAME.RECHARGE]) || this;
            _this.skinName = FirstGiftLayerSkin;
            return _this;
        }
        FirstGiftLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendGetGift, this);
        };
        FirstGiftLayer.prototype.onSendGetGift = function () {
            net.SendMsg.create({ isNowGet: 1 }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_GET_SHOUCHONG).send();
        };
        return FirstGiftLayer;
    }(Layers.BaseLayer));
    Layers.FirstGiftLayer = FirstGiftLayer;
    __reflect(FirstGiftLayer.prototype, "Layers.FirstGiftLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=FirstGiftLayer.js.map