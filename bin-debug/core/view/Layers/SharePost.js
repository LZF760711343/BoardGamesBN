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
    var SharePost = (function (_super) {
        __extends(SharePost, _super);
        function SharePost(shareInfo) {
            var _this = _super.call(this) || this;
            _this.skinName = SharePostSkin;
            _this.shareInfo = shareInfo;
            return _this;
        }
        SharePost.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._shareFrieds.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onshareFriend, this);
            this._weChatFriends.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onweChatFriends, this);
        };
        SharePost.prototype.onshareFriend = function () {
            this.shareInfo.scene = 0;
            nest.addShareCb(null);
            egret.ExternalInterface.call("shareWx", JSON.stringify(this.shareInfo));
        };
        ;
        SharePost.prototype.onweChatFriends = function () {
            this.shareInfo.scene = 1;
            // nest.addShareCb((code: string) => {
            //     if (code == '0') {
            //         if (net.getServerType() === net.SERVER_TYPE.GAME) {
            //             net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GET_FENXIANG).send();
            //         }
            //     }
            // });
            egret.ExternalInterface.call("shareWx", JSON.stringify(this.shareInfo));
        };
        ;
        return SharePost;
    }(Layers.BaseLayer));
    Layers.SharePost = SharePost;
    __reflect(SharePost.prototype, "Layers.SharePost");
})(Layers || (Layers = {}));
//# sourceMappingURL=SharePost.js.map