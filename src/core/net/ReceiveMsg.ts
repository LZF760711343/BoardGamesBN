namespace net {
	const changeList = [
		"NickName",
		"nickName",
		"salePlayerNickName",
		"buyPlayerNickName",
	];

	// if (this.datas["NickName"]) {
	// 			this.datas["NickName"] = StringUtil.decodeBase64(this.datas["NickName"]);
	// 		} else if (this.datas["nickName"]) {
	// 			this.datas["nickName"] = StringUtil.decodeBase64(this.datas["nickName"]);
	// 		}else if (this.datas["salePlayerNickName"]) {
	// 			this.datas["salePlayerNickName"] = StringUtil.decodeBase64(this.datas["salePlayerNickName"]);
	// 		}else if (this.datas["buyPlayerNickName"]) {
	// 			this.datas["buyPlayerNickName"] = StringUtil.decodeBase64(this.datas["buyPlayerNickName"]);
	// 		}
	export class ReceiveMsg<T>{
		private static _pool: ReceiveMsg<any>[] = [];
		/**
		 * @param msgCode 消息协议值
		 * @param msgName 消息协议名
		 * @param datas 消息数据
		 */
		public datas: T;
		public constructor(
			public headCode: int,//包头标识[int]
			public msgLen: int,//消息体长度[int]
			public serialNum: int,//流水号[int]

			public reqTime: long,//客户端请求时间[long]
			public repTime: long,//服务器响应时间[long]
			public msgType: int,//消息对象类型[int]
			public compressType: byte,//压缩标示[byte]
			public moduleId: int,//模块ID[int]
			public orderId: int,//命令ID[int]
			public stateCode: int,//状态码[int]
			datas: string
		) {
			if (datas) {
				this.datas = JSON.parse(datas);
				this.check();
			}
		}
		public setDatas(
			headCode: int,//包头标识[int]
			msgLen: int,//消息体长度[int]
			serialNum: int,//流水号[int]

			reqTime: long,//客户端请求时间[long]
			repTime: long,//服务器响应时间[long]
			msgType: int,//消息对象类型[int]
			compressType: byte,//压缩标示[byte]
			moduleId: int,//模块ID[int]
			orderId: int,//命令ID[int]
			stateCode: int,//状态码[int]
			datas: any
		) {
			this.serialNum = serialNum;
			this.headCode = headCode;
			this.msgLen = msgLen;
			this.reqTime = reqTime;
			this.repTime = repTime;
			this.msgType = msgType;
			this.compressType = compressType;
			this.moduleId = moduleId;
			this.orderId = orderId;
			this.stateCode = stateCode;
			// this.datas = JSON.parse(datas);
			if (datas) {
				this.datas = JSON.parse(datas);
				// this.check();
			}

			// this.msgCode = msgCode;
			// this.msgName = msgName;
			// this.datas = datas;
			// this.cvt_result = [];
			// this.curReadPos = 0;
		}
		/**
		 * 由于emoji字符原因,暂时将NickName转为base64编码存入数据库,后续有时间再进行优化
		 */
		private check() {
			// if(this.datas){
			let arrLen = changeList.length;
			for (let i = 0; i < arrLen; i++) {
				if (this.datas[changeList[i]]) {
					this.datas[changeList[i]] = StringUtil.decodeBase64(this.datas[changeList[i]]);
				}
			}
			// if (this.datas["NickName"]) {
			// 	this.datas["NickName"] = StringUtil.decodeBase64(this.datas["NickName"]);
			// } else if (this.datas["nickName"]) {
			// 	this.datas["nickName"] = StringUtil.decodeBase64(this.datas["nickName"]);
			// }else if (this.datas["salePlayerNickName"]) {
			// 	this.datas["salePlayerNickName"] = StringUtil.decodeBase64(this.datas["salePlayerNickName"]);
			// }else if (this.datas["buyPlayerNickName"]) {
			// 	this.datas["buyPlayerNickName"] = StringUtil.decodeBase64(this.datas["buyPlayerNickName"]);
			// }



			// }
		}
		public print() {
			if (DEBUG) {
				egret.log("RECE<< " + this);
				egret.log(JSON.stringify(this.datas))
			}

			// if(this.datas){
			// 	Utils.printObject(this.datas);
			// }

		}
		public toString() {
			return `${OrderNameMap[this.moduleId][this.orderId]},命令ID:${this.orderId},消息体长度:${this.msgLen}模块ID:${this.moduleId},状态码:${this.stateCode}`;
		}
		public destroy() {
			this.datas = null;
			ReceiveMsg._pool.push(this);
		}
		/**
		 * 从对象池中取出或创建一个新的消息对象。
		 * @param msgCode 消息协议值
		 * @param msgName 消息协议名
		 * @param datas 消息数据
		 */
		public static create(
			headCode: int,//包头标识[int]
			msgLen: int,//消息体长度[int]
			serialNum: int,//流水号[int]
			reqTime: long,//客户端请求时间[long]
			repTime: long,//服务器响应时间[long]
			msgType: int,//消息对象类型[int]
			compressType: byte,//压缩标示[byte]
			moduleId: int,//模块ID[int]
			orderId: int,//命令ID[int]
			stateCode: int,//状态码[int]
			datas: any
		) {

			if (DEBUG) {
				if (!(moduleId == ModuleInfo.PLAYER && orderId == PlayerOrder.HEART_BEAT)) {
					egret.log("RECE<< " + `${OrderNameMap[moduleId][orderId]},命令ID:${orderId},消息体长度:${msgLen}模块ID:${moduleId}`);
					egret.log(datas);
				}
			}

			if (ReceiveMsg._pool.length) {
				let msg = ReceiveMsg._pool.pop();
				msg.setDatas(
					headCode,
					msgLen,
					serialNum,
					reqTime,
					repTime,
					msgType,
					compressType,
					moduleId,
					orderId,
					stateCode,
					datas
				);
				return msg;
			} else {
				return new ReceiveMsg(
					headCode,
					msgLen,
					serialNum,
					reqTime,
					repTime,
					msgType,
					compressType,
					moduleId,
					orderId,
					stateCode,
					datas);
			}
		}
		/**
         * 释放一个事件对象，并缓存到对象池。
         * 注意：此方法只能传入由ReceiveMsg.create()创建的事件实例，传入非法对象实例可能会导致报错。
		 * @param msg 缓存的对象
		 * */
		public static release(msg: ReceiveMsg<any>): void {
			msg.datas = null;
			ReceiveMsg._pool.push(msg);
		}
	}
}