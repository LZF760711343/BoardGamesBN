
// /**
//  * @author HE 
//  * 用来处理心跳包跟登陆的协议的类
//  */
namespace net {
	/**
	 * 心跳包间隔时间
	 */
	const HEART_BEAT_INTERVAL = 10000;
	/**
	 * 心跳包最大超时次数,超过这个次数就进行断线重连
	 */
	const MAX_TIMEROUT_CNT = 3;
	export class BaseMsgHandler extends egret.EventDispatcher {
		private decrypted: string;
		private randomKey: string;
		private _timer: egret.Timer;
		private _timerOutCnt: number;//心跳包超时的次数
		public constructor() {
			super();
		}
		/**
		 * 开始发送心跳包的定时器
		 */
		public startHeartBeatTimer() {
			this._timerOutCnt = 0;
			if (!this._timer) {
				this._timer = new egret.Timer(HEART_BEAT_INTERVAL);
				this._timer.addEventListener(egret.TimerEvent.TIMER, this.send_HEART_BEAT, this);
			}
			this._timer.start();
			this.send_HEART_BEAT();
		}
		/**
		 * 停止发送心跳包的定时器
		 */
		public stopHeartBeatTimer() {
			this._timer.stop();
		}
		/**
		 * 发送心跳包
		 */
		public send_HEART_BEAT() {
			this._timerOutCnt++;
			if (this._timerOutCnt > MAX_TIMEROUT_CNT) {//超过指定次数,开始重连

			} else {
				SendMsg.create({}, ModuleInfo.PLAYER, PlayerOrder.HEART_BEAT).send();
			}

		}
		/**
		 * 处理服务器返回的心跳包消息
		 */
		public on_HEART_BEAT() {

			this._timerOutCnt = 0;//收到心跳包的时候,超时计数清0;
		}
		/**
		 * 创建玩家
		 * @param String account 帐号
		 * @param String nickName 呢称
		 * @server return JSON {
		 * 				"result" : ResultCode
		 * 				"content" : PlayerDto 玩家Dto
		 * 				}
		 */
		public send_CREATE_PLAYER() {
			let sendMsg = SendMsg.create({
				account: Global.playerDto.account,
				nickName: Global.playerDto.nickName || "default",
				sex: Global.playerDto.sex,
				headImages: Global.playerDto.headImages,
				qudao: Config.channel,

			}, ModuleInfo.PLAYER, PlayerOrder.CREATE_PLAYER).send();
		}
		/**
		 * 注册用户返回
		 */
		public on_CREATE_PLAYER(msg: ReceiveMsg<model.MsgBase<model.PlayerDto>>) {
			egret.log("on_CREATE_PLAYER");

			if (msg.datas.result == ResultCode.SUCCESS) {//注册用户成功
				msg.datas.content.nickName = StringUtil.decodeBase64(msg.datas.content.nickName);
				LocalDatas.initSelf(msg.datas.content.account);
				Global.playerDto = msg.datas.content;
				this.dispatchEventWith(egret.Event.CONNECT);
			} else {
				this.dispatchEventWith(NetEvent.CONNET_ERROR, false, msg.datas.result);
				DEBUG && egret.error(ErrorMsg[msg.datas.result]);
			}
		}
		/**
		 * 检查账号是否存在
		 * @param String account 账号
		 * @server return JSON{
		 * 						"result":ResultCode
		 * 						"content": Boolean True-已存在角色名, false-不存在角色名	
		 * 					  }
		 */
		public send_CHECK_ACCOUNT() {
			SendMsg.create({ account: Global.playerDto.account }, ModuleInfo.PLAYER, PlayerOrder.CHECK_ACCOUNT).send();
		}
		/**
		 * 检查账号是否存在返回
		 */
		/**
	 * 检查账号是否存在返回
	 */
		public on_CHECK_ACCOUNT(msg: ReceiveMsg<model.MsgBase<boolean>>) {
			egret.log("on_CHECK_ACCOUNT");
			if (msg.datas.result == ResultCode.SUCCESS) {
				if (msg.datas.content) {//已经注册了
					this.send_LOGIN();
				} else {//还未注册
					// 
					// net.close();
					if (Config.debugLogin) {
						this.send_CREATE_PLAYER();
					} else {
						LocalDatas.delLoginInfo();
						nest.login((userInfo: nest.LoginInfo) => {
							Global.playerDto.account = userInfo.loginKey;
							this.send_LOGIN();
						}, this);
					}

				}
			} else {
				this.dispatchEventWith(NetEvent.CONNET_ERROR, false, msg.datas.result);
				DEBUG && egret.error(ErrorMsg[msg.datas.result]);
			}
		}


		/**
		 * 登陆
		 * @param String account 呢称
		 * @server return JSON {
		 * 				"result" : ResultCode
		 * 				"content" : PlayerDto 玩家Dto
		 * 				}
		 */
		public send_LOGIN() {
			let sendMsg = SendMsg.create({
				account: Global.playerDto.account,
			}, ModuleInfo.PLAYER, PlayerOrder.LOGIN).send();
		}
		public on_LOGIN(msg: ReceiveMsg<model.MsgBase<model.PlayerDto>>) {
			egret.log("on_LOGIN");
			if (msg.datas.result == ResultCode.SUCCESS) {//登陆成功
				msg.datas.content.nickName = StringUtil.decodeBase64(msg.datas.content.nickName);
				LocalDatas.initSelf(msg.datas.content.account);
				Global.playerDto = msg.datas.content;
				this.dispatchEventWith(egret.Event.CONNECT);
			} else {
				this.dispatchEventWith(NetEvent.CONNET_ERROR, false, msg.datas.result);
				DEBUG && egret.error(ErrorMsg[msg.datas.result]);
			}
		}
		/**
		 * 推送当前连接即将关闭(收到此推送客户端不再重连)
		 * @server return JSON {
		 * 				"content" : Integer 断线类型  0-链接关闭(客户端对此不做反应不再重连) 1-在其他地方登陆  2-被管理后台踢下线  3-IP被封  4-账号被封  5-服务器关闭 6-请求频繁
		 * 				}
		 */
		public on_PUSH_OFF_LINE(msg: ReceiveMsg<model.MsgBase<OFF_LINE_ERROR>>) {
			// switch (msg.datas.content) {

			// 	case OFF_LINE_ERROR.LOGIN_OTHER://1-在其他地方登陆

			// 		break;
			// 	case OFF_LINE_ERROR.LINE_CLOSE://0-链接关闭(客户端对此不做反应不再重连)
			// 	case OFF_LINE_ERROR.KICK://2-被管理后台踢下线
			// 	case OFF_LINE_ERROR.IP_NOT_ALLOW://3-IP被封
			// 	case OFF_LINE_ERROR.ACCOUNT_NOT_ALLOW://4-账号被封
			// 	case OFF_LINE_ERROR.SERVER_CLOSE://5-服务器关闭
			// 	case OFF_LINE_ERROR.CONNECT_TOO_OFTEN://6-请求频繁
			// 		break;
			// }
			net.close();
			let alert = Layers.HintLayer.create();
			alert.init({
				tipsStr: OFF_LINE_TIP[msg.datas.content],
				leftFunc: alert.close,
				leftThisObj: alert,
				curState: Layers.HintLayer.SURE2
			});
			alert.open();
			egret.log(OFF_LINE_TIP[msg.datas.content]);
			return DIS_RESULT.STOP;
		}
		public dispatchMsg(msg: ReceiveMsg<any>): DIS_RESULT {
			var funcName = 'on_' + OrderNameMap[msg.moduleId][msg.orderId];
			if (this[funcName]) {
				return this[funcName](msg);
			}
			return DIS_RESULT.NEXT;
		}
	}
}

