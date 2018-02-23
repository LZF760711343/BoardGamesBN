var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var net;
(function (net) {
    var NetEvent = (function (_super) {
        __extends(NetEvent, _super);
        function NetEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            return _super.call(this, type, bubbles, cancelable) || this;
        }
        return NetEvent;
    }(egret.Event));
    NetEvent.CONNET_ERROR = "connetError";
    /**
     * socket断开连接派发的事件
     */
    NetEvent.SOCKET_CLOSE = "socketClose";
    /**
     * socket接收到错误派发的事件
     */
    NetEvent.SOCKET_ERROR = "socketError";
    net.NetEvent = NetEvent;
    __reflect(NetEvent.prototype, "net.NetEvent");
})(net || (net = {}));
//# sourceMappingURL=NetEvent.js.map