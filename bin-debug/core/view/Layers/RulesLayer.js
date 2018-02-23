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
    var RulesLayer = (function (_super) {
        __extends(RulesLayer, _super);
        function RulesLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = RulesLayerSkin;
            _this.loadKey = ResManager.GROUP_NAME.BRNN;
            return _this;
        }
        RulesLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return RulesLayer;
    }(Layers.BaseLayer));
    Layers.RulesLayer = RulesLayer;
    __reflect(RulesLayer.prototype, "Layers.RulesLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=RulesLayer.js.map