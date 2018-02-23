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
    var ShareDayLayer = (function (_super) {
        __extends(ShareDayLayer, _super);
        function ShareDayLayer(shareInfo) {
            var _this = _super.call(this) || this;
            _this.skinName = ShareDaySkin;
            _this.shareInfo = shareInfo;
            return _this;
        }
        ShareDayLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._shareFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onshareFriend, this);
            this._weChatFriends.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onweChatFriends, this);
        };
        ShareDayLayer.prototype.onshareFriend = function () {
            this.shareInfo.scene = 0;
            nest.share(this.shareInfo);
        };
        ;
        ShareDayLayer.prototype.onweChatFriends = function () {
            this.shareInfo.scene = 1;
            nest.share(this.shareInfo);
        };
        ;
        return ShareDayLayer;
    }(Layers.BaseLayer));
    Layers.ShareDayLayer = ShareDayLayer;
    __reflect(ShareDayLayer.prototype, "Layers.ShareDayLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=ShareDayLayer.js.map