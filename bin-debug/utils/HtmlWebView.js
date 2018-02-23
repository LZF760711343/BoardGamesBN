var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
    var HtmlWebView = (function (_super) {
        __extends(HtmlWebView, _super);
        /**
         * @param src
         */
        function HtmlWebView() {
            var _this = _super.call(this) || this;
            _this._x = 0;
            _this._y = 0;
            _this._width = 0;
            _this._height = 0;
            _this._src = "";
            _this._scaleMode = egret.MainContext.instance.stage.scaleMode;
            _this._iframeWrapper = null;
            _this._iframe = null;
            // this.addEventListener(egret.Event.RESIZE,this.onRemoveToStage,this);
            var stageDelegateDom = document.getElementById("StageDelegateDiv");
            var playerContainer = stageDelegateDom.parentElement;
            var iframeWrapperDom = document.getElementById("iframe-wrapper");
            if (!iframeWrapperDom) {
                iframeWrapperDom = document.createElement("div");
                iframeWrapperDom.style.display = "none";
                iframeWrapperDom.attributes['style'].value += 'position:absolute;-webkit-overflow-scrolling: touch;overflow-y: scroll;'; //解决iframe在ios下的显示问题
                iframeWrapperDom.id = "iframe-wrapper";
                stageDelegateDom.appendChild(iframeWrapperDom);
            }
            _this._iframeWrapper = iframeWrapperDom;
            _this._iframeWrapper.style.display = "none";
            _this._iframeWrapper.style.opacity = "0";
            var iframe = document.createElement("iframe"), t = new Date().getTime();
            // iframe.src = src;
            iframe.id = "webview-iframe-" + t;
            iframe.name = "webview-iframe-" + t;
            iframe.style.position = "absolute";
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.opacity = "0";
            iframe.style.display = 'none';
            iframe.frameBorder = '0';
            iframe.border = "0";
            _this._iframeWrapper.appendChild(iframe);
            _this._iframe = document.getElementById("webview-iframe-" + t);
            var self = _this;
            _this._iframe.onload = function () {
                self._iframeWrapper.style.opacity = "1";
                self._iframe.style.opacity = "1";
            };
            _this._stageW = egret.MainContext.instance.stage.stageWidth;
            _this._stageH = egret.MainContext.instance.stage.stageHeight;
            //屏幕高度大于宽带,说明没有转屏
            if (window.innerHeight > window.innerWidth) {
                _this._windowW = window.innerHeight;
                _this._windowH = window.innerWidth;
            }
            else {
                _this._windowW = window.innerWidth;
                _this._windowH = window.innerHeight;
            }
            _this._designH = parseInt(playerContainer.attributes['data-content-height'].value);
            _this._designW = parseInt(playerContainer.attributes['data-content-width'].value);
            var stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, _this._windowW, _this._windowH, _this._designW, _this._designH);
            _this._displayH = stageSize.displayHeight;
            _this._displayW = stageSize.displayWidth;
            return _this;
            //            RESIZE
            // egret.log("windowW:" + this._windowW);
            // egret.log("stageW:" + this._stageW);
            // egret.log("disPlayW:" + this._displayW);
            // egret.log("windowH:" + this._windowH);
            // egret.log("stageH:" + this._stageH);
            // egret.log("displayH:" + this._displayH);
        }
        HtmlWebView.prototype.onRemoveToStage = function () {
            //            this.
            console.log("onRemoveToStage");
            this.width = this._width;
            this.height = this._height;
            this.x = this._x;
            this.y = this._y;
        };
        HtmlWebView.prototype.show = function (src, x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.src = src;
            this._iframe.style.display = 'block';
            this._iframeWrapper.style.display = 'block';
        };
        HtmlWebView.prototype.hide = function () {
            if (this._iframe) {
                this._iframeWrapper.style.display = "none";
            }
        };
        HtmlWebView.prototype.destroy = function () {
            if (this._iframe) {
                this._iframeWrapper.style.display = "none";
                this._iframeWrapper.removeChild(this._iframe);
            }
            // this.removeEventListener(egret.Event.RESIZE,this.onRemoveToStage, this);
        };
        Object.defineProperty(HtmlWebView.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                if (this._scaleMode == egret.StageScaleMode.FIXED_NARROW || this._scaleMode == egret.StageScaleMode.FIXED_WIDE || this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                    this._iframe.width = this._width / this._stageW * this._windowW + "px";
                    this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
                }
                if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                    if (this._windowW == this._displayW) {
                        this._iframe.style.width = this._width / this._stageW * this._windowW + "px";
                        this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
                    }
                    else {
                        this._iframe.style.width = this._width / this._stageW * this._displayW + "px";
                        this._iframeWrapper.style.width = this._width / this._stageW * this._displayW + "px";
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HtmlWebView.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                if (this._scaleMode == egret.StageScaleMode.FIXED_NARROW || this._scaleMode == egret.StageScaleMode.FIXED_WIDE || this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                    this._iframe.height = this._height / this._stageH * this._windowH + "px";
                    this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
                }
                if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                    if (this._windowH == this._displayH) {
                        this._iframe.style.height = this._height / this._stageH * this._windowH + "px";
                        this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
                    }
                    else {
                        this._iframe.style.height = this._height / this._stageH * this._displayH + "px";
                        this._iframeWrapper.style.height = this._height / this._stageH * this._displayH + "px";
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HtmlWebView.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
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
        Object.defineProperty(HtmlWebView.prototype, "y", {
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
        Object.defineProperty(HtmlWebView.prototype, "src", {
            get: function () {
                return this._src;
            },
            set: function (value) {
                this._iframe.src = this._src = value;
            },
            enumerable: true,
            configurable: true
        });
        return HtmlWebView;
    }(egret.DisplayObjectContainer));
    Utils.HtmlWebView = HtmlWebView;
    __reflect(HtmlWebView.prototype, "Utils.HtmlWebView", ["Utils.IWebView"]);
    if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
        Utils.WebView = HtmlWebView;
    }
})(Utils || (Utils = {}));
//# sourceMappingURL=HtmlWebView.js.map