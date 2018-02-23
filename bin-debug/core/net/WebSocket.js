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
    /**
     * 消息解析器,对Socket接收到的消息进行解析
     */
    var MsgParse = (function () {
        function MsgParse() {
            // privte 
            this._msgIndex = -1;
            this._unsortMsg = [];
            this._msgs = [];
        }
        MsgParse.prototype.next = function () {
            return this._msgs.shift();
        };
        MsgParse.prototype.parse = function (datas) {
            var dv = new net.ByteArray(datas);
            var msg = net.ReceiveMsg.create(dv.readInt(), dv.readInt(), dv.readInt(), dv.readDouble(), dv.readDouble(), dv.readInt(), dv.readByte(), dv.readInt(), dv.readInt(), dv.readInt(), dv.readUTFBytes(dv.length - dv.position));
            this._msgs.push(msg);
        };
        return MsgParse;
    }());
    __reflect(MsgParse.prototype, "MsgParse");
    /**
     * egret.WebSocket 类启用代码以建立传输控制协议 (TCP) 套接字连接，用于发送和接收字符串或二进制数据。
     * 要使用 egret.WebSocket 类的方法，请先使用构造函数 new egret.WebSocket 创建一个 egret.WebSocket 对象。
     * 套接字以异步方式传输和接收数据。
     * @event egret.Event.CONNECT 连接服务器成功。
     * @event egret.ProgressEvent.SOCKET_DATA 接收服务器数据。
     * @event egret.Event.CLOSE 在服务器关闭连接时调度。
     * @event egret.IOErrorEvent.IO_ERROR 在出现输入/输出错误并导致发送或加载操作失败时调度。。
     * @see http://edn.egret.com/cn/docs/page/602 WebSocket
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/socket/WebSocket.ts
     * @language zh_CN
     */
    var WebSocket = (function (_super) {
        __extends(WebSocket, _super);
        /**
         * 创建一个 egret.WebSocket 对象
         * 参数为预留参数，现版本暂不处理，连接地址和端口号在 connect 函数中传入
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function WebSocket(host, port) {
            if (host === void 0) { host = ""; }
            if (port === void 0) { port = 0; }
            var _this = _super.call(this) || this;
            _this.isDispatchEvent = true;
            _this._connected = false;
            /**
             * @private
             */
            _this._connecting = false;
            _this._connected = false;
            _this._msgParse = new MsgParse();
            _this.socket = new egret.ISocket();
            _this.socket.addCallBacks(_this.onConnect, _this.onClose, _this.onSocketData, _this.onError, _this);
            return _this;
        }
        WebSocket.prototype.send = function (buffer) {
            if (this._connected && this.socket) {
                this.socket.send(buffer);
            }
        };
        /**
         * 将套接字连接到指定的主机和端口
         * @param host 要连接到的主机的名称或 IP 地址
         * @param port 要连接到的端口号
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        WebSocket.prototype.connect = function (host, port) {
            if (!this._connecting && !this._connected) {
                this._connecting = true;
                this.socket.connect(host, port);
            }
        };
        /**
         * 根据提供的url连接
         * @param url 全地址。如ws://echo.websocket.org:80
         */
        WebSocket.prototype.connectByUrl = function (url) {
            if (!this._connecting && !this._connected) {
                this._connecting = true;
                this.socket.connectByUrl(url);
            }
        };
        WebSocket.prototype.close = function () {
            if (this._connected) {
                this.socket.close();
            }
        };
        /**
         * @private
         *
         */
        WebSocket.prototype.onConnect = function () {
            this._log("onConnect");
            this._connected = true;
            this._connecting = false;
            this.isDispatchEvent && this.dispatchEventWith(egret.Event.CONNECT);
        };
        /**
         * @private
         *
         */
        WebSocket.prototype.onClose = function () {
            this._log("onClose");
            this._connected = false;
            this.isDispatchEvent && this.dispatchEventWith(egret.Event.CLOSE);
        };
        WebSocket.prototype._log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            egret.log("WebSocket:" + args.join(",  "));
        };
        /**
         * @private
         *
         */
        WebSocket.prototype.onError = function () {
            this._log("onError");
            if (this._connecting) {
                this._connecting = false;
            }
            // this._connected = false;
            this.isDispatchEvent && this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
        };
        /**
         * @private
         *
         * @param message
         */
        WebSocket.prototype.onSocketData = function (message) {
            this._msgParse.parse(message);
            var msg = this._msgParse.next();
            while (msg) {
                this.isDispatchEvent && this.dispatchEventWith(WebSocket.SEND_MSG, false, msg);
                msg = this._msgParse.next();
            }
        };
        Object.defineProperty(WebSocket.prototype, "connected", {
            /**
             * Indicates whether the Socket object is connected currently
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示此 Socket 对象目前是否已连接
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._connected;
            },
            enumerable: true,
            configurable: true
        });
        return WebSocket;
    }(egret.EventDispatcher));
    WebSocket.SEND_MSG = "sendMsg";
    net.WebSocket = WebSocket;
    __reflect(WebSocket.prototype, "net.WebSocket");
})(net || (net = {}));
//# sourceMappingURL=WebSocket.js.map