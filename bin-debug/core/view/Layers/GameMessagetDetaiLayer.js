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
    var GameMessagetDetaiLayer = (function (_super) {
        __extends(GameMessagetDetaiLayer, _super);
        function GameMessagetDetaiLayer(text, num) {
            var _this = _super.call(this) || this;
            _this.text = text;
            _this.num = num;
            _this.skinName = GameMessagetDetaiSkin;
            return _this;
        }
        GameMessagetDetaiLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._newMatter.text = this.text;
            this._delectNew.addEventListener(egret.TouchEvent.TOUCH_TAP, this.DelectNew, this);
        };
        GameMessagetDetaiLayer.prototype.DelectNew = function () {
            // 发送删除那条信息
            egret.log("发送删除那条信息" + this.num);
            EventManager.createEventByName("undataNew").dispatchEventWith("undataNew", false, this.num);
            this.close();
        };
        return GameMessagetDetaiLayer;
    }(Layers.BaseLayer));
    Layers.GameMessagetDetaiLayer = GameMessagetDetaiLayer;
    __reflect(GameMessagetDetaiLayer.prototype, "Layers.GameMessagetDetaiLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=GameMessagetDetaiLayer.js.map