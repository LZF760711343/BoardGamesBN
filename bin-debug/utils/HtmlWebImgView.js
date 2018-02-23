var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils;
(function (Utils) {
    /**
     *
     * @author HE
     * @version mumu 1.0.0
     * @platform Web
     * WebView
     */
    var HtmlWebImgView = (function () {
        /**
         * @param src
         */
        function HtmlWebImgView() {
            this._x = 0;
            this._y = 0;
            this._width = 0;
            this._height = 0;
            this._src = "";
            this._scaleMode = egret.MainContext.instance.stage.scaleMode;
            this._iframeWrapper = null;
            this._iframe = null;
        }
        HtmlWebImgView.prototype.init = function () {
            var stageDelegateDom = document.getElementById("StageDelegateDiv");
            var playerContainer = stageDelegateDom.parentElement;
            var iframeWrapperDom = document.getElementById("iframe-wrapper");
            if (!iframeWrapperDom) {
                iframeWrapperDom = document.createElement("div");
                iframeWrapperDom.style.display = "none";
                iframeWrapperDom.attributes['style'].value += 'position:absolute;-webkit-overflow-scrolling: touch;'; //解决iframe在ios下的显示问题
                iframeWrapperDom.id = "img-wrapper";
                iframeWrapperDom.setAttribute("data-scale-mode", "showAll");
                stageDelegateDom.appendChild(iframeWrapperDom);
            }
            this._iframeWrapper = iframeWrapperDom;
            this._iframeWrapper.style.display = "none";
            this._iframeWrapper.style.opacity = "0";
            var img = document.createElement("img"), t = new Date().getTime();
            img.id = "webview-img-" + t;
            img.name = "webview-img-" + t;
            img.style.position = "absolute";
            img.style.opacity = "0";
            img.style.display = 'none';
            img.style.width = img.style.height = "100%";
            img.border = "0";
            this._iframeWrapper.appendChild(img);
            this._iframe = document.getElementById("webview-img-" + t);
            var self = this;
            this._iframe.onload = function () {
                self._iframeWrapper.style.opacity = "1";
                self._iframe.style.opacity = "1";
            };
            this._stageW = egret.MainContext.instance.stage.stageWidth;
            this._stageH = egret.MainContext.instance.stage.stageHeight;
            //屏幕高度大于宽带,说明没有转屏
            if (egret.Capabilities.isMobile && window.innerHeight > window.innerWidth) {
                this._windowW = window.innerHeight;
                this._windowH = window.innerWidth;
            }
            else {
                this._windowW = window.innerWidth;
                this._windowH = window.innerHeight;
            }
            this._designH = parseInt(playerContainer.attributes['data-content-height'].value);
            this._designW = parseInt(playerContainer.attributes['data-content-width'].value);
            var stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, this._windowW, this._windowH, this._designW, this._designH);
            this._displayH = stageSize.displayHeight;
            this._displayW = stageSize.displayWidth;
            Main.instance.addEventListener(egret.Event.RESIZE, this.onRemoveToStage, this);
        };
        HtmlWebImgView.prototype.onRemoveToStage = function () {
            //屏幕高度大于宽带,说明没有转屏
            if (egret.Capabilities.isMobile && window.innerHeight > window.innerWidth) {
                this._windowW = window.innerHeight;
                this._windowH = window.innerWidth;
            }
            else {
                this._windowW = window.innerWidth;
                this._windowH = window.innerHeight;
            }
            var stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, this._windowW, this._windowH, this._designW, this._designH);
            this._displayH = stageSize.displayHeight;
            this._displayW = stageSize.displayWidth;
            this.width = this._width;
            this.height = this._height;
            this.x = this._x;
            this.y = this._y;
        };
        HtmlWebImgView.prototype.show = function (src, x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.src = src;
            this._iframe.style.display = 'block';
            this._iframeWrapper.style.display = 'block';
        };
        HtmlWebImgView.prototype.hide = function () {
            if (this._iframe) {
                this._iframeWrapper.style.display = "none";
            }
        };
        HtmlWebImgView.prototype.destroy = function () {
            if (this._iframe) {
                this._iframeWrapper.style.display = "none";
                this._iframeWrapper.removeChild(this._iframe);
            }
            Main.instance.removeEventListener(egret.Event.RESIZE, this.onRemoveToStage, this);
        };
        Object.defineProperty(HtmlWebImgView.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                if (this._scaleMode == egret.StageScaleMode.FIXED_NARROW || this._scaleMode == egret.StageScaleMode.FIXED_WIDE || this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                    // this._iframe.width = this._width / this._stageW * this._windowW + "px";
                    this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
                }
                if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                    if (this._windowW == this._displayW) {
                        // this._iframe.style.width = this._width / this._stageW * this._windowW + "px";
                        this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
                    }
                    else {
                        // this._iframe.style.width = this._width / this._stageW * this._displayW + "px";
                        this._iframeWrapper.style.width = this._width / this._stageW * this._displayW + "px";
                    }
                }
                egret.log("this._iframe.width:", this._iframeWrapper.style.width, this._scaleMode == egret.StageScaleMode.SHOW_ALL);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HtmlWebImgView.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                if (this._scaleMode == egret.StageScaleMode.FIXED_NARROW || this._scaleMode == egret.StageScaleMode.FIXED_WIDE || this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                    // this._iframe.height = this._height / this._stageH * this._windowH + "px";
                    this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
                }
                if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                    if (this._windowH == this._displayH) {
                        // this._iframe.style.height = this._height / this._stageH * this._windowH + "px";
                        this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
                    }
                    else {
                        // this._iframe.style.height = this._height / this._stageH * this._displayH + "px";
                        this._iframeWrapper.style.height = this._height / this._stageH * this._displayH + "px";
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HtmlWebImgView.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                egret.log("x", value);
                this._x = value;
                if (this._scaleMode == egret.StageScaleMode.FIXED_NARROW || this._scaleMode == egret.StageScaleMode.FIXED_WIDE || this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                    this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
                }
                if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                    if (this._windowW == this._displayW) {
                        this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
                    }
                    else {
                        this._iframeWrapper.style.left = this._x / this._stageW * this._displayW + "px";
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HtmlWebImgView.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                if (this._scaleMode == egret.StageScaleMode.FIXED_NARROW || this._scaleMode == egret.StageScaleMode.FIXED_WIDE || this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                    this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
                }
                if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                    if (this._windowH == this._displayH) {
                        this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
                    }
                    else {
                        this._iframeWrapper.style.top = this._y / this._stageH * this._displayH + "px";
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HtmlWebImgView.prototype, "src", {
            get: function () {
                return this._src;
            },
            set: function (value) {
                this._iframe.src = this._src = value;
            },
            enumerable: true,
            configurable: true
        });
        return HtmlWebImgView;
    }());
    Utils.HtmlWebImgView = HtmlWebImgView;
    __reflect(HtmlWebImgView.prototype, "Utils.HtmlWebImgView");
    // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
    //     WebImgView = HtmlWebImgView;
    // }
})(Utils || (Utils = {}));
//# sourceMappingURL=HtmlWebImgView.js.map