///<reference path="Protocols.ts"/>
namespace net {
	export type LoginAsyncCallback = () => any;
	/**
	 * 可以处理消息的类所需继承的接口
	 */
	export interface IMsgHandler {
		/**
		 * 处理消息的函数
		 */
		dispatchMsg(msg: net.ReceiveMsg<any>): DIS_RESULT;
	}
	export let _instance: NetManage = null;
	/**
	 * 连接游戏登陆服务器
	 * @method RES.getResAsync
	 * @param compFunc {LoginAsyncCallback} 回调函数。示例：
	 * @param thisObject {any}
	 */
	export function connectLoginServer(): Promise<any>;
	export function connectLoginServer(compFunc: LoginAsyncCallback, thisObject: any): Promise<any>;
	export function connectLoginServer(compFunc?: LoginAsyncCallback, thisObject?: any): Promise<any> {
		return _instance.connectLoginServer(compFunc, thisObject);
	}
	/**
	 * 连接游戏服务器
	 * @method RES.getResAsync
	 * @param compFunc {LoginAsyncCallback} 连接服务器成功回调函数。
	 * @param thisObject {any}
	 */
	export function connectGameServer(): Promise<any>;
	export function connectGameServer(compFunc: LoginAsyncCallback, thisObject: any): Promise<any>;
	export function connectGameServer(compFunc?: LoginAsyncCallback, thisObject?: any): Promise<any> {
		return _instance.connectGameServer(compFunc, thisObject);
	}
	export function setIpAndPort(ip: string, port: number) {
		_instance.setIpAndPort(ip, port);
	}

	export function dispatchMsg() {
		FrameManager.getInstance().addFrame(_instance.dispatchMsg, _instance, 0, 1);
		// return _instance.dispatchMsg();
	}
	/**
	 * 注册对应消息级别的消息处理器,用来处理改级别的消息
	 * @param level {MSG_LEVEL} 消息的派发等级
	 * @param msgHandler 消息处理器
	 */
	export function registerMsgHandler(level: MSG_LEVEL, msgHandler: IMsgHandler) {
		return _instance.registerMsgHandler(level, msgHandler);
	}
	/**
	 * 取消注册对应消息级别的消息处理器
	 * @param level {MSG_LEVEL} 消息的派发等级
	 */
	export function unRegisterMsgHandler(level: MSG_LEVEL) {
		return _instance.unRegisterMsgHandler(level);
	}
	/**
	 * 注册消息消息的派发等级
	 * @method registerMsgLevel
	 * @param level {MSG_LEVEL} 消息的派发等级
	 * @param moduleId{ModuleInfo} 消息的模块
	 * @param args 需要注册的消息
	 */
	export function registerMsgLevel(level: MSG_LEVEL, moduleId: ModuleInfo, ...args) {
		return _instance.registerMsgLevel(level, moduleId, ...args);
	}
	/**
	 * 删除某条消息之前的所有消息
	 *  @param level {MSG_LEVEL} 要删除哪个级别的消息
	 *  @param moduleId 要删除哪个模块的消息
	 */
	export function removeMsgBeforeMsg(level: MSG_LEVEL, moduleId: ModuleInfo, orderId: PlayGameOrder | PlayerOrder) {
		return _instance.removeMsgBeforeMsg(level, moduleId, orderId);
	}
	/**
	 * 初始化网络模块
	 */
	export function init() {
		_instance.init();
	}
	/**
	 * 清理缓存池里面的消息
	 * @param level:如果没有知道要清理的消息基本,那边就清除所有的消息
	 */
	export function clearMsgs(level?: MSG_LEVEL) {
		_instance.clearMsgs(level);
	}
	export function close() {
		_instance.close();
	}
	/**
	 * 当前连接服务器类型
	 */
	export function getServerType(): SERVER_TYPE {
		return _instance.serverType;
	}
	class NetManage {
		private _loginIp: string = Config.SERVER_URL;//游戏登陆服务器ip
		private _loginPort: number = Config.SERVER_PORT;//游戏登陆服务器端口
		private _gameIp: string = "";//游戏服务器ip
		private _gamePort: number = 0;//游戏服务器端口
		public socket: WebSocket = null;
		private _msgPool: ReceiveMsg<any>[][];//消息缓存池
		private _msgRegisterList: number[][][];
		private _msgHandler: IMsgHandler[] = [];
		public serverType: SERVER_TYPE = SERVER_TYPE.NONE;
		// private _promise: Promise<any>;
		private _baseMsgHandler: BaseMsgHandler;
		/**
		 * 是否在派发消息中
		 */
		private _isdispatchMsging: boolean;
		public constructor() {
		}
		public setIpAndPort(ip: string, port: number) {
			this._loginIp = ip;
			this._loginPort = port;
		}
		public init() {
			this._msgPool = [];
			this._msgPool[MSG_LEVEL.GLOBAL] = [];
			this._msgPool[MSG_LEVEL.SCENE] = [];
			this._msgPool[MSG_LEVEL.BASE] = [];
			this._msgRegisterList = [];
			this._msgRegisterList[MSG_LEVEL.GLOBAL] = [];
			this._msgRegisterList[MSG_LEVEL.SCENE] = [];
			this._msgRegisterList[MSG_LEVEL.BASE] = [];
			this.registerMsgHandler(MSG_LEVEL.GLOBAL, new GlobalMsgHandler);
			this._baseMsgHandler = new BaseMsgHandler();
			this.registerMsgHandler(MSG_LEVEL.BASE, this._baseMsgHandler);
			this.registerMsgLevel(
				MSG_LEVEL.BASE,
				ModuleInfo.PLAYER,
				PlayerOrder.HEART_BEAT,
				PlayerOrder.CREATE_PLAYER,
				PlayerOrder.LOGIN,
				PlayerOrder.CHECK_ACCOUNT,
				PlayerOrder.PUSH_OFF_LINE
			);
			this.registerMsgLevel(
				MSG_LEVEL.GLOBAL,
				ModuleInfo.PLAY_GAME,
				PlayGameOrder.G2C_USER_INFO,
				PlayGameOrder.G2C_UPDATE_PLAYER_GOLD,
				PlayGameOrder.G2C_HAS_POCHAN_COUNT,
				PlayGameOrder.G2C_ASK_POCHAN,
				PlayGameOrder.G2C_UPDATE_PLAYER_FANGKA,
				PlayGameOrder.G2C_GET_SHOUCHONG,
				PlayGameOrder.G2C_UPDATE_HEAD_IMAGES


			);
			this.registerMsgLevel(
				MSG_LEVEL.GLOBAL,
				ModuleInfo.PLAYER,
				PlayerOrder.ALL2C_STR_ERROR,
				PlayerOrder.G2C_CHONGZHI_TIPS,
				PlayerOrder.G2C_NORMAL_TIPS,
				PlayerOrder.G2C_GET_CHONGZHI,
			);
			egret.log("Net init finished!!!")
		}
		/**
		 * 清理缓存池里面的消息
		 * @param level:如果没有知道要清理的消息基本,那边就清除所有的消息
		 */
		public clearMsgs(level?: MSG_LEVEL) {
			if (typeof level !== "undefined") {
				this._msgPool[level] = [];
			} else {
				this._msgPool = [];
				this._msgPool[MSG_LEVEL.GLOBAL] = [];
				this._msgPool[MSG_LEVEL.SCENE] = [];
				this._msgPool[MSG_LEVEL.BASE] = [];
			}

		}
		/**
         * 连接游戏登陆服务器
         * @method RES.getResAsync
         * @param compFunc {LoginAsyncCallback} 连接登陆服务器成功回调函数。
         * @param thisObject {any}
         */
		public connectLoginServer(): Promise<any>;
		public connectLoginServer(compFunc: LoginAsyncCallback, thisObject: any): Promise<any>;
		public connectLoginServer(compFunc?: LoginAsyncCallback, thisObject?: any): Promise<any> {
			if (this.socket) {
				this.socket.close();
			}
			let promise = new Promise((reslove, reject) => {
				let onSuccess = (e) => {
					egret.log("onSuccess")
					this.serverType = SERVER_TYPE.LOGIN;
					this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, this);
					this.socket.once(egret.Event.CLOSE, this.onLoginServerClose, this);
					this.socket.once(egret.IOErrorEvent.IO_ERROR, this.onLoginServerError, this);
					reslove(e);
				}
				let onError = (e) => {
					reject(e);
				}
				this.socket = new WebSocket();
				this.socket.connect(this._loginIp, this._loginPort);
				this.socket.addEventListener(WebSocket.SEND_MSG, this.addMsg, this);
				this.socket.once(egret.Event.CONNECT, onSuccess, this);
				this.socket.once(egret.IOErrorEvent.IO_ERROR, onError, this);
			})
			return promise;
		}
		/**
		 * 链接socket
		 * @param count:连接服务器失败后尝试重新连接的次数
		 */
		private connectSocket(reslove, reject, count: number = 3) {
			let self = this;
			let onSuccess = (e) => {
				egret.log("onSuccess")
				self.serverType = SERVER_TYPE.LOGIN;
				self.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
				self.socket.once(egret.Event.CLOSE, self.onLoginServerClose, self);
				self.socket.once(egret.IOErrorEvent.IO_ERROR, self.onLoginServerError, self);
				reslove(e);
			}
			let onError = (e) => {
				egret.log("onError!!!!!!!!!!!!!!!")
				// DEBUG && egret.error(`Connect Socket Fail, IP:${self._loginIp}, Port:${this._loginPort}`);
				self.serverType = SERVER_TYPE.NONE;
				if (count--) {
					this.connectSocket(reslove, reject, count);
				} else {
					reject(e);
				}
			}
			self.socket = new WebSocket();
			self.socket.connect(self._loginIp, self._loginPort);
			self.socket.addEventListener(WebSocket.SEND_MSG, self.addMsg, self);
			self.socket.once(egret.Event.CONNECT, onSuccess, self);
			self.socket.once(egret.IOErrorEvent.IO_ERROR, onError, self);
		}
		/**
         * 连接游戏服务器
         * @method RES.getResAsync
         * @param compFunc {LoginAsyncCallback} 连接服务器成功回调函数。
         * @param thisObject {any}
         */
		public connectGameServer(): Promise<any>;
		public connectGameServer(compFunc: LoginAsyncCallback, thisObject: any): Promise<any>;
		public connectGameServer(compFunc?: LoginAsyncCallback, thisObject?: any): Promise<any> {
			let self = this;
			if (self.socket) {
				self.socket.close();
			}
			this.serverType = SERVER_TYPE.CONNETING;
			return new Promise(this.connectSocket.bind(this))//链接webSocket
				.then(this.connectGameServer2.bind(this));//登陆游戏服务器
		}
		//成功连接webSocket后,开始登陆游戏
		private connectGameServer2() {
			let self = this;
			//成功连接服务器
			return new Promise((reslove, reject) => {
				function connetError(e: egret.Event) {
					self._baseMsgHandler.removeEventListener(egret.Event.CONNECT, connetSuccess, this);//移除登陆服务器成功的回调,防止内存泄露
					this.serverType = SERVER_TYPE.NONE;
					reject(e.data);
				}
				function connetSuccess() {
					self._baseMsgHandler.removeEventListener(NetEvent.CONNET_ERROR, connetError, this);//移除登陆服务器失败的回调,防止内存泄露
					if (!Config.debugLogin) {
						LocalDatas.datas.datas.pwd = LocalDatas.datas.datas.userName = Global.playerDto.account;
						//如果头像是"/0",说明该用户没有上传头像,用默认头像,"/96"是为了兼容以前那些"/0"被替换成"/96"的
						if (Global.playerDto.headImages === "/0"
							|| Global.playerDto.headImages === "/132"
							|| Global.playerDto.headImages === "/96"
							|| Global.playerDto.headImages === ""
						) {
							Global.playerDto.headImages = DEFAULT_HEAD_IMG;
							net.SendMsg.create({ headImages: Global.playerDto.headImages }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_UPDATE_HEAD_IMAGES).send();
						} else if (Global.playerDto.headImages.endWith("/0")) {//如果是WEIXIN_HEAD_IMG_SIZE,将头像改为WEIXIN_HEAD_IMG_SIZE的
							Global.playerDto.headImages = Global.playerDto.headImages.substr(0, Global.playerDto.headImages.lastIndexOf("/") + 1) + WEIXIN_HEAD_IMG_SIZE;
							net.SendMsg.create({ headImages: Global.playerDto.headImages }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_UPDATE_HEAD_IMAGES).send();
						}
						LocalDatas.datas.saveData();
					}
					this.serverType = SERVER_TYPE.GAME;
					reslove();
				}
				self._baseMsgHandler.startHeartBeatTimer();//开始发送心跳包
				self._baseMsgHandler.send_CHECK_ACCOUNT();//发送检测用户是否注册的消息
				self._baseMsgHandler.once(egret.Event.CONNECT, connetSuccess, this);//登陆服务器成功的回调
				self._baseMsgHandler.once(NetEvent.CONNET_ERROR, connetError, this);//登陆服务器失败的回调
			})
		}
		private onLoginServerError() {
			this.serverType = SERVER_TYPE.NONE;

			net.close();
			Layers.HintLayer.create().init({ tipsStr: GameLangs.netCloseTip }).open();
		}
		private onLoginServerClose() {
			this.serverType = SERVER_TYPE.NONE;
			net.close();
			Layers.HintLayer.create().init({ tipsStr: GameLangs.netCloseTip }).open();
		}


		/**
		 * 消息派发只在收到服务器消息的时候会自动派发一次,所以在创建新的消息处理器的时候,最好调用一次这个消息,派发一次消息
		 */
		public dispatchMsg() {
			let aLen = this._msgPool.length;
			if (this._isdispatchMsging) {
				egret.error("现在还在派发消息中!!!!!")
			}
			this._isdispatchMsging = true;
			for (let i = 0; i < aLen; ++i) {
				// let maxCount = 50;
				// let msgList = [];
				if (this._msgHandler[i]) {
					let msgList = this._msgPool[i];
					// egret.log("msgList:" + msgList.length)
					let j = 0;
					let _msg = msgList[j];
					while (_msg) {
						try {
							let result = this._msgHandler[i].dispatchMsg(_msg);
							if (Config.debugLogin) {
								EventManager.dispatchEvent(WebSocket.SEND_MSG, [result, _msg]);
							}
							switch (result) {
								case DIS_RESULT.NEXT://将消息派发到下一层处理
									if (this._msgPool[i + 1] && _msg) {
										this._msgPool[i + 1].push(_msg);
									}
									msgList.splice(j, 1);
									break;
								case DIS_RESULT.NONE:
									j++;
									break;
								case DIS_RESULT.STOP:
									// msgList.splice(j, 1);
									this._isdispatchMsging = false;
									return;
								default://如果没有返回值或者返回值为DIS_RESULT.REMOVE,将消息从消息列表移除,不派发到下一层
									if (_msg) {
										_msg.destroy();
									}
									msgList.splice(j, 1);
									break;
							}
						} catch (error) {
							//将出错的消息抛弃掉
							msgList.splice(j, 1);
							egret.error("消息处理错误!");
							egret.error(error);
						}
						_msg = msgList[j];
					}
				}
			}
			this._isdispatchMsging = false;

		}

		/**
		 * 注册对应消息级别的消息处理器,用来处理改级别的消息
		 * @param level {MSG_LEVEL} 消息的派发等级
		 * @param msgHandler 消息处理器
		 */
		public registerMsgHandler(level: MSG_LEVEL, msgHandler: IMsgHandler) {
			this._msgHandler[level] = msgHandler;
		}
		/**
         * 注册消息消息的派发等级
         * @method registerMsgLevel
         * @param level ${MSG_LEVEL} 消息的派发等级
		 * @param moduleId 要注册哪个模块的消息
         * @param args 需要注册的消息
         */
		public registerMsgLevel(level: MSG_LEVEL, moduleId: ModuleInfo, ...args) {
			let aLen = args.length;
			if (!this._msgRegisterList[moduleId]) {
				this._msgRegisterList[moduleId] = [];
			}
			let msgRegisterList = this._msgRegisterList[moduleId];
			// let length = msgRegisterList.length;
			for (let i = 0; i <= MSG_LEVEL.SCENE; ++i) {
				if (!msgRegisterList[i]) {
					msgRegisterList[i] = [];
				}
				if (i == level) {
					for (let j = 0; j < aLen; ++j) {
						if (msgRegisterList[i].indexOf(args[j]) < 0) {//如果消息没有在当前级别的注册列表里面,将消息加入
							msgRegisterList[i].push(args[j]);
						}
					}
				} else {
					for (let j = 0; j < aLen; ++j) {
						let index = msgRegisterList[i].indexOf(args[j]);
						if (index > -1) {//如果消息在其他基本注册列表里面,将该消息从改级别列表里面移除
							msgRegisterList[i].slice(index, 1);
						}
					}
				}
			}
		}

		public close() {
			let self = this;
			self.socket.removeEventListener(egret.Event.CLOSE, self.onLoginServerClose, self);
			self.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoginServerError, self);
			self._baseMsgHandler.stopHeartBeatTimer();
			if (self.socket) {
				self.socket.isDispatchEvent = false;
				self.socket.close();
				self.socket = null;
			}
			self.serverType = SERVER_TYPE.NONE;
			self.unRegisterMsgHandler(MSG_LEVEL.SCENE);
			self.clearMsgs();
			Global.reset();
			SceneManager.runScene(GAME_ID.LOGIN, null, null, LoginScene.NORMAL);
		}
		/**
		 * 删除某条消息之前的所有消息
		 *  @param level {MSG_LEVEL} 要删除哪个级别的消息
		 *  @param moduleId 要删除哪个模块的消息
		 */
		public removeMsgBeforeMsg(level: MSG_LEVEL, moduleId: ModuleInfo, orderId: PlayGameOrder | PlayerOrder) {
			// let msgRegisterList = this._msgRegisterList[moduleId];
			let msgList = this._msgPool[level];
			if (msgList && msgList.length) {
				let arrLen = msgList.length;
				for (let i = 0; i < arrLen; i++) {
					if (msgList[i].moduleId === moduleId && msgList[i].orderId === orderId) {
						msgList.splice(0, i + 1);
						return;
					}
				}
			}
		}
		/**
		 * 取消注册对应消息级别的消息处理器
		 * @param level {MSG_LEVEL} 消息的派发等级
		 */
		public unRegisterMsgHandler(level: MSG_LEVEL) {
			this._msgHandler[level] = null;
		}
		private addMsg(event: egret.Event) {
			let msg: net.ReceiveMsg<any> = event.data;
			let msgRegisterList = this._msgRegisterList[msg.moduleId];
			if (msgRegisterList) {
				for (let key in msgRegisterList) {
					if (msgRegisterList[key].indexOf(msg.orderId) > -1) {
						this._msgPool[key].push(msg);
						this.dispatchMsg();
						return;
					}
				}
			}
			//如果在在消息注册表里面没有找到相应消息,默认加入到scene级别的消息里面
			this._msgPool[MSG_LEVEL.SCENE].push(msg);
			this.dispatchMsg();
		}
	}
	// 消息头
	let msgHead = 0x91201314;
	export class SendMsg {
		private static index: number = 0;
		private _byteArray: ByteArray;
		private static _pool: SendMsg[] = [];//对象缓冲池
		/**
		 * @param sendDatas 发送的数据
		 * @param moduleId 模块ID
		 * @param orderId 命令ID
		 */
		public constructor(public sendDatas: Object, public moduleId: ModuleInfo, public orderId: PlayGameOrder | PlayerOrder) {
			this._byteArray = new ByteArray();
		}
		public setDatas(sendDatas: Object, moduleId: ModuleInfo, orderId: PlayGameOrder | PlayerOrder) {
			this.sendDatas = sendDatas;
			this.moduleId = moduleId;
			this.orderId = orderId;
		}
		public write(strFmt: string, ...params: any[]) {

		}
		public destroy() {
			this.sendDatas = null;
			// this._byteArray.
			SendMsg._pool.push(this);
		}
		/**
		 * 发送消息
		 */
		public send() {
			if (this.sendDatas) {
				var str = JSON.stringify(this.sendDatas);
			} else {
				var str = "";
			}
			let msgLen = str.length + 29;//消息长度
			let datas = this._byteArray;
			// datas.buffer = new ArrayBuffer(msgLen + 8);
			datas.clear();
			datas.writeInt(msgHead);//包头标识
			datas.writeInt(msgLen);//消息体长度
			datas.writeInt(SendMsg.index++);//流水号  4
			datas.writeLong(Date.now());//客户端请求时间 8
			datas.writeInt(0);//消息对象类型 0:json格式 4
			datas.writeByte(0);//压缩标示 1
			datas.writeInt(0);//验证码 4
			datas.writeInt(this.moduleId);//模块ID 4
			datas.writeInt(this.orderId);//命令ID 4

			datas.writeUTFBytes(str);

			datas.position = 4;
			datas.writeInt(datas.length - 8);

			// let tt = StringUtil.stringToArrayBuffer(StringUtil.utf16ToUtf8(str));
			// if (DEBUG) {
			if (!(this.moduleId == ModuleInfo.PLAYER && this.orderId == PlayerOrder.HEART_BEAT)) {
				egret.log("SEND>> " + OrderNameMap[this.moduleId][this.orderId] + ",  " + str);
			}
			// }

			_instance.socket.send(datas.buffer);
			this.destroy();//发送完消息将该消息送入消息缓存池
		}
		/**
		 * 从对象池中取出或创建一个新的发送消息对象。
		 * @param sendDatas 发送的数据
		 * @param moduleId ${ModuleInfo}模块ID
		 * @param orderId 命令ID
		 */
		public static create(sendDatas: Object, moduleId: ModuleInfo, orderId: PlayGameOrder | PlayerOrder) {
			if (SendMsg._pool.length) {
				let msg = SendMsg._pool.pop();
				msg.setDatas(sendDatas, moduleId, orderId);
				return msg;
			} else {
				return new SendMsg(sendDatas, moduleId, orderId);
			}
		}
	}
	_instance = new NetManage();
}