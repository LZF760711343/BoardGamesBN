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
    var group = {};
    /**
     *
     * @author
     *
     */
    var BaseLayer = (function (_super) {
        __extends(BaseLayer, _super);
        /**
         * @param preResList: 打开这个layer所需要加载的资源列表（可以是资源组，也可以是某个资源名）
         */
        function BaseLayer(preResList) {
            var _this = _super.call(this) || this;
            if (preResList) {
                var loadKey = "pre" + egret.getQualifiedClassName(_this);
                if (!group[loadKey]) {
                    ResManager.createGroup(loadKey, preResList);
                    group[loadKey] = true;
                }
                _this.loadKey = loadKey;
            }
            _this.verticalCenter = _this.horizontalCenter = 0;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onExit, _this);
            return _this;
        }
        BaseLayer.prototype.startTimer = function (count) {
            if (!this._cTime) {
                this._cTime = new CoolTime();
                this._cTime.addCallBack(this.onTimer, this, this.complete);
            }
            this._cTime.start(count);
        };
        BaseLayer.prototype.onTimer = function (value) {
        };
        /**
 * 倒计时完成
 */
        BaseLayer.prototype.complete = function () {
        };
        //         public registerOutCtrlClose(): void {
        //             this.dark_layer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
        //         }
        // 		public closeOutside(){
        // 		}
        //         /**
        //          * 
        //          */
        // 		public createLoidImg(paddingX:number = 0, paddingY:number = 0):void{
        //             var loadImg = this.loadImg = new components.LoadingIcon();
        //             loadImg.verticalCenter = paddingY;
        //             loadImg.horizontalCenter = paddingX;
        //             loadImg.width = loadImg.height = 150;
        //             loadImg.run();
        //             this.addChild(loadImg);
        // 		}
        //         public destroyLoidImg(): void {
        //             if(this.loadImg){
        //                 if(this.loadImg.parent){
        //                     this.removeChild(this.loadImg);
        //                 }
        //                 this.loadImg = null;
        //             }
        //         }
        /**
         * 点击关闭按钮的回调
         */
        BaseLayer.prototype.onClose = function () {
            this.close();
        };
        /**
         * 移除舞台是的回调
         */
        BaseLayer.prototype.onExit = function () {
        };
        BaseLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (this._btnClose) {
                this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            }
        };
        BaseLayer.prototype.close = function () {
            Layers.closeLayer(this);
        };
        /**
         * 打开层级面板
         * @param bgType:背景类型 {BG_TYPE} 默认会添加灰色的背景
         * @param aniType:动画类型${ANI_TYPE}
         */
        BaseLayer.prototype.open = function (bgType, aniType) {
            if (bgType === void 0) { bgType = 1 /* GRAY */; }
            if (aniType === void 0) { aniType = 0 /* NONE */; }
            Layers.openLayer(this, bgType, aniType);
            return this;
        };
        return BaseLayer;
    }(eui.Component));
    Layers.BaseLayer = BaseLayer;
    __reflect(BaseLayer.prototype, "Layers.BaseLayer");
    Layers.Event = {
        /**
         * 关闭时候派发的消息
         */
        CLOSE: "Close",
    };
})(Layers || (Layers = {}));
//# sourceMappingURL=BaseLayer.js.map