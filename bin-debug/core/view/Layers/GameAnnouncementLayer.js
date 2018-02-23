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
    var GameAnnouncementLayer = (function (_super) {
        __extends(GameAnnouncementLayer, _super);
        function GameAnnouncementLayer() {
            var _this = _super.call(this, ["paihang1_png", ResManager.GROUP_NAME.HALLSMALLSET]) || this;
            _this.skinName = GameAnnouncementSkin;
            return _this;
        }
        GameAnnouncementLayer.prototype.initdatas = function (data) {
            this._notices = [];
            var length = data.length;
            for (var i = 0; i < length; ++i) {
                this._notices.push({ title: data[i].title, url: data[i].url, type: data[i].type });
            }
        };
        GameAnnouncementLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (Global.activity_conf.length != 0) {
                if (!this._notices) {
                    this.initdatas(Global.activity_conf);
                }
                this.once(eui.UIEvent.ENTER_FRAME, this.init, this);
                this._tabBar.dataProvider = new eui.ArrayCollection(this._notices);
                this._tabBar.addEventListener(egret.Event.CHANGE, this.chanTab, this);
            }
        };
        GameAnnouncementLayer.prototype.chanTab = function () {
            this.showMsg(this._tabBar.selectedIndex);
        };
        GameAnnouncementLayer.prototype.showMsg = function (index) {
            var url = this._notices[index].url;
            if (url.search(/(.jpg|.png)/) > -1) {
                this._webSize.source = url;
                this._webSize.visible = true;
                this._webview.hide();
            }
            else {
                this._webSize.visible = false;
                this._webview.show(url, this._point.x, this._point.y, this._webSize.width, this._webSize.height);
            }
        };
        GameAnnouncementLayer.prototype.init = function () {
            this._point = this.localToGlobal(this._webSize.x, this._webSize.y, egret.Point.create(0, 0));
            this._webview = new Utils.WebView();
            this.showMsg(0);
        };
        GameAnnouncementLayer.prototype.onExit = function () {
            if (this._point) {
                egret.Point.release(this._point);
                this._point = null;
            }
            if (this._webview) {
                this._webview.destroy();
                this._webview = null;
            }
        };
        return GameAnnouncementLayer;
    }(Layers.BaseLayer));
    Layers.GameAnnouncementLayer = GameAnnouncementLayer;
    __reflect(GameAnnouncementLayer.prototype, "Layers.GameAnnouncementLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=GameAnnouncementLayer.js.map