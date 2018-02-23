
namespace net {
    /**
     * 消息解析器,对Socket接收到的消息进行解析
     */
    class MsgParse {
        // privte 
        private _msgIndex: number = -1;
        private _unsortMsg: net.ReceiveMsg<any>[] = [];
        private _msgs: net.ReceiveMsg<any>[] = [];
        public next() {
            return this._msgs.shift();
        }
        public parse(datas: ArrayBuffer) {
            var dv = new ByteArray(datas);
            let msg = ReceiveMsg.create(
                dv.readInt(),
                dv.readInt(),
                dv.readInt(),
                dv.readDouble(),
                dv.readDouble(),
                dv.readInt(),
                dv.readByte(),
                dv.readInt(),
                dv.readInt(),
                dv.readInt(),
                dv.readUTFBytes(dv.length - dv.position)
            );
            this._msgs.push(msg);
        }
    }
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
    export class WebSocket extends egret.EventDispatcher {
        public static SEND_MSG: string = "sendMsg";
        private socket: egret.ISocket;
        private _msgParse: MsgParse;
        public isDispatchEvent:boolean = true;
        private _connected: boolean = false;
        /**
         * @private
         */
        private _connecting: boolean = false;
        /**
         * 创建一个 egret.WebSocket 对象
         * 参数为预留参数，现版本暂不处理，连接地址和端口号在 connect 函数中传入
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        constructor(host: string = "", port: number = 0) {
            super();
            this._connected = false;
            this._msgParse = new MsgParse();
            this.socket = new egret.ISocket();
            this.socket.addCallBacks(this.onConnect, this.onClose, this.onSocketData, this.onError, this);
        }
        public send(buffer: ArrayBuffer) {
            if (this._connected && this.socket) {
                this.socket.send(buffer);
            }
        }
        /**
         * 将套接字连接到指定的主机和端口
         * @param host 要连接到的主机的名称或 IP 地址
         * @param port 要连接到的端口号
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public connect(host: string, port: number): void {
            if (!this._connecting && !this._connected) {
                this._connecting = true;
                this.socket.connect(host, port);
            }
        }

        /**
         * 根据提供的url连接
         * @param url 全地址。如ws://echo.websocket.org:80
         */
        public connectByUrl(url: string): void {
            if (!this._connecting && !this._connected) {
                this._connecting = true;
                this.socket.connectByUrl(url);
            }
        }

        public close(): void {
            if (this._connected) {
                this.socket.close();
            }
        }

        /**
         * @private
         * 
         */
        private onConnect(): void {
            this._log("onConnect");
            this._connected = true;
            this._connecting = false;
            this.isDispatchEvent && this.dispatchEventWith(egret.Event.CONNECT);
        }

        /**
         * @private
         * 
         */
        private onClose(): void {
            this._log("onClose");
            this._connected = false;
            this.isDispatchEvent && this.dispatchEventWith(egret.Event.CLOSE);
        }
        private _log(...args) {
            egret.log("WebSocket:" + args.join(",  "))
        }
        /**
         * @private
         * 
         */
        private onError(): void {
            this._log("onError");
            if (this._connecting) {
                this._connecting = false;
            }
            // this._connected = false;
            this.isDispatchEvent && this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
        }

        /**
         * @private
         * 
         * @param message 
         */
        private onSocketData(message: any): void {
            this._msgParse.parse(message);
            let msg = this._msgParse.next();
            while (msg) {
                this.isDispatchEvent && this.dispatchEventWith(WebSocket.SEND_MSG, false, msg);
                msg = this._msgParse.next();
            }
        }

     
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
        public get connected(): boolean {
            return this._connected;
        }
    }
}