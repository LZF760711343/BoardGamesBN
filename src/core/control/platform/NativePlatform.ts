namespace nest {
	/**
	 * 
	 */
	export class NativePlatform implements IPlatform {
		private _cb: Function;
		private _target: Object;
		private _shareCb: Function;
		private _headTarget: Object;
		private _headCb: Function;
		/**
				 * 分享类型 0:分享给好友; 1: 分享朋友圈
				 */
		private _curShareType: number;
		public constructor() {
			this.init();
			NativeBridge.init();
			NativeBridge.addEventListener(NativeBridge.KEYS.GET_CHANNEL, this.getChannelCb, this);
			NativeBridge.addEventListener(NativeBridge.KEYS.GET_VERSION, this.getVersionCb, this);
			NativeBridge.addEventListener(NativeBridge.KEYS.OPEN_ROOM, this.onOpenRoom, this);
			NativeBridge.addEventListener(NativeBridge.KEYS.SHARE_FINISH, this.shareFinish, this);
			NativeBridge.addEventListener(NativeBridge.KEYS.UPLOAD_HEADIMG_FINISH, this.headUploadFinish, this);
			// NativeBridge.addEventListener(NativeBridge.KEYS.GET_CHANNEL, this.getChannelCb, this);
			NativeBridge.addEventListener(NativeBridge.KEYS.LOGIN, this.loginSuccess, this);
			

		}
		private headUploadFinish(event: egret.Event) {
			if (this._headCb) {
				this._headCb.call(this._headTarget, event.data);
				this._headCb = this._headTarget = null;
			}
		}
		private shareFinish(event: egret.Event) {
			if (this._shareCb) {
				let result = { code: event.data, type: "app" };
				switch (this._curShareType) {
					case 0:
						result.type = SHARE_TYPE.APPMESSAGE;
						break;
					case 1:
						result.type = SHARE_TYPE.TIMELINE;
						break;
				}
				this._shareCb(result);
			}
		}
		public share(shareInfo: any) {
			this._curShareType = shareInfo.scene;
			egret.ExternalInterface.call("shareWx", JSON.stringify(shareInfo));
		}
		public addShareCb(cb: Function) {
			this._shareCb = cb;
		}
		public uploadHeadImg(callBack: Function, thisObj: Object) {
			this._headCb = callBack;
			this._headTarget = thisObj;
			NativeBridge.uploadHeadImg();
		}
		public getRoomId() {
			NativeBridge.getRoomId();
		}
		private onOpenRoom(event: egret.Event) {
			if (event.data) {
				let roomId = parseInt(event.data);
				if (net.getServerType() === net.SERVER_TYPE.GAME) {//已经连接服务器成功了
					if (SceneManager.curScene.sceneTag === GAME_ID.SELECT) {//在选场页面的时候,发送进房的消息
						net.SendMsg.create({ roomId: roomId }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ENTER_SCORE_ROOM).send();
						Global.enterRoomId = null;
					} else if (SceneManager.curScene.sceneTag === GAME_ID.LOGIN) {//如果是在登陆页面
						Global.enterRoomId = roomId;
					}
				} else {//如果游戏还没有登陆成功,保存roomid,等到登陆成功后再尝试进入房间
					Global.enterRoomId = roomId;
				}
			}
		}
		public getVersion() {
			NativeBridge.getVersion();
		}
		private getVersionCb(event: egret.Event) {
			Config.nativeVersion = event.data;
		}
		private getChannelCb(event: egret.Event) {
			Config.channel = event.data;
		}
		public getChannel() {
			NativeBridge.getChannel();
		}
		public initGameFinish() {
			NativeBridge.initFinish();
		}
		/**
		 * 登陆
		 */
		public login(callBack: (info: LoginInfo) => void, thisObj: Object) {
			//如果本地缓存有登陆数据,就直接登陆
			if (LocalDatas.datas.datas.pwd && LocalDatas.datas.datas.userName
				// && LocalDatas.datas.datas.nick
			) {
				// Global.playerDto.account = LocalDatas.datas.datas.userName;
				// Global.playerDto.nickName = LocalDatas.datas.datas.nick;
				callBack.call(thisObj, {
					loginKey: LocalDatas.datas.datas.userName,
					// nickName: LocalDatas.datas.datas.nick,
				});
			} else {//否则进行微信授权登陆
				this._cb = callBack;
				this._target = thisObj;
				// egret.ExternalInterface.call("login", "");
				NativeBridge.login("");
			}

		}
		public loginSuccess(event: egret.Event) {
			let info: {
				openid: string;
				nickname: string;
				sex: number;
				language: string;
				city: string;
				headimgurl: string;
				unionid: string;
			} = JSON.parse(event.data);


			LocalDatas.datas.datas.unionid = info.unionid;
			LocalDatas.datas.datas.openid = info.openid;
			// Global.playerDto.headImages = info.headimgurl.replace("/0", "/96");
			LocalDatas.datas.saveData();
			// Global.playerDto.nickName = info.nickname;
			// Global.playerDto.sex = info.sex;
			this._cb.call(this._target, {
				headimgurl: info.headimgurl.replace("/0", "/96"),
				loginKey: info.unionid,
				nickName: info.nickname,
				sex: info.sex
			})
		}
		//游戏结束
		public endGame() {
			egret.ExternalInterface.call("endGame", "");
		}
		/**
		 * 是否自动登陆
		 */
		public isAutoLogin() {
			return (LocalDatas.datas.datas.pwd && LocalDatas.datas.datas.userName);
		}
		public init() {
			// egret.ExternalInterface.addCallback("login", this.loginSuccess.bind(this));
		}
		/**
		 * 购买商品
		 */
		public pay(pid: string, unionid: string, openid: string, body: string) {
			egret.ExternalInterface.call("payWx", JSON.stringify({
				url: Config.URLS.getRechargeUrl,
				pid: pid,
				body: body,
				unionid: unionid,
				playerid: Global.playerDto.id
			}))
		};


	}
	if (egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE) {
		Platform = NativePlatform;
	}
}