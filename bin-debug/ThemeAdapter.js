var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
function getURL(resource) {
    var prefix = resource.extra ? "" : RES.resourceRoot;
    var url = prefix + resource.url;
    return RES.getRealURL(url);
}
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param compFunc 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param errorFunc 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, compFunc, errorFunc, thisObject) {
        var _this = this;
        try {
            var resource = { name: url, url: url, type: RES.ResourceItem.TYPE_TEXT, extra: true };
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(getURL(resource), "get");
            request.send();
            var onSuccess = function () {
                var texture = request['response'];
                compFunc.call(thisObject, texture);
            };
            var onError = function (error) {
                egret.log("onError111111");
                _this.getTheme(url, compFunc, errorFunc, thisObject);
            };
            request.addEventListener(egret.Event.COMPLETE, onSuccess, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, this);
        }
        catch (error) {
            egret.log(error);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
//# sourceMappingURL=ThemeAdapter.js.map