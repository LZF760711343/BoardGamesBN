namespace net {
	export class NetEvent extends egret.Event{
		static CONNET_ERROR = "connetError";
		/**
		 * socket断开连接派发的事件
		 */
		static SOCKET_CLOSE = "socketClose";
		/**
		 * socket接收到错误派发的事件
		 */
		static SOCKET_ERROR = "socketError";
		public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false) {
			super(type,bubbles,cancelable);
		}
		// public static dis
	}
}