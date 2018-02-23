var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var majiang;
(function (majiang) {
    /**
     * 游戏特效层
     */
    var GameEffectLayer = (function (_super) {
        __extends(GameEffectLayer, _super);
        function GameEffectLayer() {
            return _super.call(this) || this;
        }
        GameEffectLayer.prototype.playLocalityAui = function (name, //动画文件名
            location) {
            var layer;
            switch (name) {
                case "peng":
                    layer = new majiang.majiangpengAui();
                    break;
                case "hu":
                    layer = new majiang.majianghuAui();
                    break;
                case "chi":
                    layer = new majiang.majiangchiAui();
                    break;
                case "shao":
                    layer = new majiang.majiangshaoAui();
                    break;
                case "gang":
                    layer = new majiang.majiangGangAui();
                    break;
                case "tan":
                    layer = new majiang.majiangtanAui();
            }
            if (layer != null) {
                if (location == 1) {
                    layer.verticalCenter = 150;
                    layer.horizontalCenter = 0;
                }
                else if (location == 2) {
                    layer.verticalCenter = 0;
                    layer.horizontalCenter = -250;
                }
                else if (location == 3) {
                    layer.verticalCenter = -150;
                    layer.horizontalCenter = 0;
                }
                else {
                    layer.verticalCenter = -250;
                    layer.horizontalCenter = 0;
                }
                layer.visible = true;
                layer.start();
                this.addChild(layer);
            }
        };
        return GameEffectLayer;
    }(GameEffectLayerBase));
    majiang.GameEffectLayer = GameEffectLayer;
    __reflect(GameEffectLayer.prototype, "majiang.GameEffectLayer");
})(majiang || (majiang = {}));
//# sourceMappingURL=GameEffectLayer.js.map