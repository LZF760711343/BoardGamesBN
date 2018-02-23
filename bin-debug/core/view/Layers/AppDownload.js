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
    var AppDownLoadLayer = (function (_super) {
        __extends(AppDownLoadLayer, _super);
        function AppDownLoadLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = AppDownloadSkin;
            return _this;
        }
        AppDownLoadLayer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this._des) {
                this._des.textFlow = (new egret.HtmlTextParser).parser('终于等到您!' + '\n\n下载'
                    + '《HZ棋牌》App版本,更流畅\n\n的体验等着您！');
            }
            this._btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.downApp, this);
        };
        AppDownLoadLayer.prototype.downApp = function () {
            // location.href = Config.downAppUrl + "?chl=" + Global.playerDto.channel;
            location.href = Config.URLS.downAppUrl + "?chl=" + Global.playerDto.channel + "&serverid=" + Config.SERVER_ID;
        };
        return AppDownLoadLayer;
    }(Layers.BaseLayer));
    Layers.AppDownLoadLayer = AppDownLoadLayer;
    __reflect(AppDownLoadLayer.prototype, "Layers.AppDownLoadLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=AppDownload.js.map