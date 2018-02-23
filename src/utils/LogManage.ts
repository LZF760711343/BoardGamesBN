namespace Utils {
	let url = "http://www.gzqidong.cn/test/SaveLog.php";
	let saveKey = "jianyiDebugKey";
	let id;
	let gameName: string;
	export class LogManage {
		public max_size: number = 1024 * 10;
		public str: string = "";
		public warnStr: string = "";
		public static _instance: LogManage;
		private _error: any;
		private _log: any;
		private _date: Date;
		private _webSocket: net.WebSocket;
		private socket: egret.ISocket;
		private isConnect: boolean;
		public constructor() {
			//this.initWebSocket();
		}
		/**
		* @private
		* 
		*/
		private onConnect(): void {
			this._log("onConnect");
			this.isConnect = true;
		}

        /**
         * @private
         * 
         */
		private onClose(): void {
		}
        /**
         * @private
         * 
         */
		private onError(): void {
			this._log("onError");
		}

        /**
         * @private
         * 
         * @param message 
         */
		private onSocketData(message: any): void {
			// egret.log("onSocketData")
			// var dv = new net.ByteArray(message);
			// egret.log(message,dv.length ,dv.position)
			// egret.log(dv.readUTFBytes(dv.length - dv.position))
			// this._msgParse.parse(message);
			// let msg = this._msgParse.next();
			// while (msg) {
			//     this.isDispatchEvent && this.dispatchEventWith(WebSocket.SEND_MSG, false, msg);
			//     msg = this._msgParse.next();
			// }
		}
		private initWebSocket() {
			this.socket = new egret.ISocket();
			this.socket.addCallBacks(this.onConnect, this.onClose, this.onSocketData, this.onError, this);
			this.socket.connectByUrl("ws://192.168.0.178:10102");
			// egret.log("ws://192.168.0.178:10102")
			// let _webSocket = this._webSocket = new net.WebSocket();
			// _webSocket.connectByUrl("ws://localhost:10102");
			// _webSocket.addEventListener(net.WebSocket.SEND_MSG, this.addMsg, this);
			// _webSocket.once(egret.Event.CONNECT, onSuccess, this);
			// _webSocket.once(egret.IOErrorEvent.IO_ERROR, onError, this);
		}
		private addMsg() {

		}
		public static get instance() {
			if (!LogManage._instance) {
				LogManage._instance = new LogManage();
				LogManage._instance.init();
			}
			return LogManage._instance;
		}
		public static init(_saveKey: string, _gameName: string, uploadUrl?: string) {
			saveKey = _saveKey;
			gameName = _gameName;
			if (uploadUrl) {
				url = uploadUrl;
			}
			id = egret.localStorage.getItem(saveKey);
			if (!id) {
				id = Date.now() + "" + Math.floor(Math.random() * 100000);
				egret.localStorage.setItem(saveKey, id);
			}
			if (!LogManage._instance) {
				LogManage._instance = new LogManage();
				LogManage._instance.init();
			}
			// window.onerror = (error, url, line) => {
			// 	alert(error);
			// 	alert(url);
			// 	alert(line);
			// }
			window.onerror = (error, url, line) => {
				let sendData = {
					PlayerId: Global.playerDto.id,
					LocalId: id,
					errorMsg: error,
					errorFileName: url,
					line: line,
					gameName: gameName
				}
				let str = "{\n";
				for (let key in sendData) {
					str += ("    " + key + ":" + sendData[key] + "\n");
				}
				str += "}";
				// alert(str);
				egret.log(str);
				// egret.log("playerId:$1\nid:$2\nerror:$3\nurl:$4\nline:$5".format(Global.playerDto.id, id, error, url, line));
				LogManage._instance.sendLog();
				return true;
			}
		}
		public init() {
			this._log = egret.log;
			this._date = new Date();
			var _log = egret.log;
			egret.log = (message?: any, ...optionalParams: any[]) => {
				_log(message, ...optionalParams);
				this.log(message + "   " + optionalParams.join("    "));
			}
		}
		public log(str: string) {
			this._date.setTime(Date.now());
			if (this.str.length >= this.max_size) {
				this.str = this._date.Format("hh:mm:ss:  ") + str;
			} else {
				this.str += ("\n" + this._date.Format("hh:mm:ss:  ") + str);
			}
			if (this.isConnect) {
				this.socket.send(str);
			}
		}
		/**
		 * 发送数据到后台
		 */
		public async sendMsgToServer(str: string) {
			let response = await Global.requestDataAsync(url, { info: str });
			Toast.launch("发送成功!");
		}
		/**
		 * 发送log到后台保存
		 */
		public sendLog() {
			this.sendMsgToServer("/-------------------PlayerId:$1   NickName:$2\n".format(Global.playerDto.id, Global.playerDto.nickName) + this.str);
		}
	}

}