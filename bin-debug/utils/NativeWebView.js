var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils;
(function (Utils) {
    /**
     *
     * @author HE
     * @version mumu 1.0.0
     * @platform Native
     * WebView
     */
    var NativeWebView = (function () {
        /**
         * @param src
         */
        function NativeWebView() {
            this._x = 0;
            this._y = 0;
            this._width = 0;
            this._height = 0;
            this._src = "";
        }
        NativeWebView.prototype.onRemoveToStage = function () {
            this.width = this._width;
            this.height = this._height;
            this.x = this._x;
            this.y = this._y;
        };
        NativeWebView.prototype.show = function (src, x, y, width, height) {
            this._sendDatas.x = x * this._sx;
            this._sendDatas.y = y * this._sy;
            this._sendDatas.w = width * this._sx;
            this._sendDatas.h = height * this._sy;
            this._sendDatas.url = src;
            NativeBridge.openWebView(JSON.stringify(this._sendDatas));
        };
        NativeWebView.prototype.hide = function () {
            NativeBridge.closeWebView();
        };
        NativeWebView.prototype.destroy = function () {
            NativeBridge.closeWebView();
        };
        Object.defineProperty(NativeWebView.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NativeWebView.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NativeWebView.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NativeWebView.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NativeWebView.prototype, "src", {
            get: function () {
                return this._src;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        return NativeWebView;
    }());
    Utils.NativeWebView = NativeWebView;
    __reflect(NativeWebView.prototype, "Utils.NativeWebView", ["Utils.IWebView"]);
    if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
        Utils.WebView = NativeWebView;
    }
})(Utils || (Utils = {}));
//# sourceMappingURL=NativeWebView.js.map