var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var components;
(function (components) {
    /**
     *
     * @author
     *
     */
    var LoadingIcon = (function (_super) {
        __extends(LoadingIcon, _super);
        function LoadingIcon() {
            var _this = _super.call(this) || this;
            _this.is_run = false;
            var loadImage = _this.loadImage = new eui.Image("loading2_png");
            //            loadImage.percentWidth = loadImage.percentHeight = 100;
            _this.addChild(loadImage);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onExit, _this);
            return _this;
        }
        // public setSource(value: string) {
        //     this.run();
        //     RES.getResByUrl(value,this.loadComplete,this,RES.ResourceItem.TYPE_IMAGE)
        // }
        LoadingIcon.prototype.loadComplete = function (data) {
            this.is_run = false;
            if (typeof data == "undefined") {
            }
            else {
                this.loadImage.source = data;
                this.width = data.textureWidth;
                this.height = data.textureHeight;
            }
            egret.Tween.removeTweens(this.loadImage);
            this.loadImage.rotation = 0;
        };
        LoadingIcon.prototype.onExit = function () {
            egret.Tween.removeTweens(this.loadImage);
            this.is_run = null;
        };
        LoadingIcon.prototype.run = function () {
            if (this.is_run) {
                return;
            }
            this.loadImage.rotation = 0;
            this.is_run = true;
            egret.Tween.get(this.loadImage, { loop: true }).to({ rotation: 360 }, 2000);
        };
        LoadingIcon.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.loadImage.x = this.loadImage.y = this.loadImage.anchorOffsetX = this.loadImage.anchorOffsetY = 75;
            //            this.addChild()
        };
        LoadingIcon.prototype.stop = function () {
            this.is_run = false;
            egret.Tween.removeTweens(this.loadImage);
        };
        return LoadingIcon;
    }(eui.Component));
    components.LoadingIcon = LoadingIcon;
    __reflect(LoadingIcon.prototype, "components.LoadingIcon");
})(components || (components = {}));
//# sourceMappingURL=LoadingIcon.js.map