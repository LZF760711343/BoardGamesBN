var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// /**
//  * @author HE 
//  * 用来处理心跳包跟登陆的协议的类
//  */
var net;
(function (net) {
    /**
     * 心跳包间隔时间
     */
    var HEART_BEAT_INTERVAL = 10000;
    /**
     * 心跳包最大超时次数,超过这个次数就进行断线重连
     */
    var MAX_TIMEROUT_CNT = 3;
    var BaseMsgHandler = (function (_super) {
        __extends(BaseMsgHandler, _super);
        function BaseMsgHandler() {
            return _super.call(this) || this;
        }
        /**
         * 开始发送心跳包的定时器
         */
        BaseMsgHandler.prototype.startHeartBeatTimer = function () {
            this._timerOutCnt = 0;
            if (!this._timer) {
                this._timer = new egret.Timer(HEART_BEAT_INTERVAL);
                this._timer.addEventListener(egret.TimerEvent.TIMER, this.send_HEART_BEAT, this);
            }
            this._timer.start();
            this.send_HEART_BEAT();
        };
        /**
         * 停止发送心跳包的定时器
         */
        BaseMsgHandler.prototype.stopHeartBeatTimer = function () {
            this._timer.stop();
        };
        /**
         * 发送心跳包
         */
        BaseMsgHandler.prototype.send_HEART_BEAT = function () {
            this._timerOutCnt++;
            if (this._timerOutCnt > MAX_TIMEROUT_CNT) {
            }
            else {
                net.SendMsg.create({}, 1 /* PLAYER */, PlayerOrder.HEART_BEAT).send();
            }
        };
        /**
         * 处理服务器返回的心跳包消息
         */
        BaseMsgHandler.prototype.on_HEART_BEAT = function () {
            this._timerOutCnt = 0; //收到心跳包的时候,超时计数清0;
        };
        /**
         * 创建玩家
         * @param String account 帐号
         * @param String nickName 呢称
         * @server return JSON {
         * 				"result" : ResultCode
         * 				"content" : PlayerDto 玩家Dto
         * 				}
         */
        BaseMsgHandler.prototype.send_CREATE_PLAYER = function () {
            var sendMsg = net.SendMsg.create({
                account: Global.playerDto.account,
                nickName: Global.playerDto.nickName || "default",
                sex: Global.playerDto.sex,
                headImages: Global.playerDto.headImages,
                qudao: Config.channel,
            }, 1 /* PLAYER */, PlayerOrder.CREATE_PLAYER).send();
        };
        /**
         * 注册用户返回
         */
        BaseMsgHandler.prototype.on_CREATE_PLAYER = function (msg) {
            egret.log("on_CREATE_PLAYER");
            if (msg.datas.result == ResultCode.SUCCESS) {
                msg.datas.content.nickName = StringUtil.decodeBase64(msg.datas.content.nickName);
                LocalDatas.initSelf(msg.datas.content.account);
                Global.playerDto = msg.datas.content;
                this.dispatchEventWith(egret.Event.CONNECT);
            }
            else {
                this.dispatchEventWith(net.NetEvent.CONNET_ERROR, false, msg.datas.result);
                true && egret.error(ErrorMsg[msg.datas.result]);
            }
        };
        /**
         * 检查账号是否存在
         * @param String account 账号
         * @server return JSON{
         * 						"result":ResultCode
         * 						"content": Boolean True-已存在角色名, false-不存在角色名
         * 					  }
         */
        BaseMsgHandler.prototype.send_CHECK_ACCOUNT = function () {
            net.SendMsg.create({ account: Global.playerDto.account }, 1 /* PLAYER */, PlayerOrder.CHECK_ACCOUNT).send();
        };
        /**
         * 检查账号是否存在返回
         */
        /**
     * 检查账号是否存在返回
     */
        BaseMsgHandler.prototype.on_CHECK_ACCOUNT = function (msg) {
            var _this = this;
            egret.log("on_CHECK_ACCOUNT");
            if (msg.datas.result == ResultCode.SUCCESS) {
                if (msg.datas.content) {
                    this.send_LOGIN();
                }
                else {
                    // 
                    // net.close();
                    if (Config.debugLogin) {
                        this.send_CREATE_PLAYER();
                    }
                    else {
                        LocalDatas.delLoginInfo();
                        nest.login(function (userInfo) {
                            Global.playerDto.account = userInfo.loginKey;
                            _this.send_LOGIN();
                        }, this);
                    }
                }
            }
            else {
                this.dispatchEventWith(net.NetEvent.CONNET_ERROR, false, msg.datas.result);
                true && egret.error(ErrorMsg[msg.datas.result]);
            }
        };
        /**
         * 登陆
         * @param String account 呢称
         * @server return JSON {
         * 				"result" : ResultCode
         * 				"content" : PlayerDto 玩家Dto
         * 				}
         */
        BaseMsgHandler.prototype.send_LOGIN = function () {
            var sendMsg = net.SendMsg.create({
                account: Global.playerDto.account,
            }, 1 /* PLAYER */, PlayerOrder.LOGIN).send();
        };
        BaseMsgHandler.prototype.on_LOGIN = function (msg) {
            egret.log("on_LOGIN");
            if (msg.datas.result == ResultCode.SUCCESS) {
                msg.datas.content.nickName = StringUtil.decodeBase64(msg.datas.content.nickName);
                LocalDatas.initSelf(msg.datas.content.account);
                Global.playerDto = msg.datas.content;
                this.dispatchEventWith(egret.Event.CONNECT);
            }
            else {
                this.dispatchEventWith(net.NetEvent.CONNET_ERROR, false, msg.datas.result);
                true && egret.error(ErrorMsg[msg.datas.result]);
            }
        };
        /**
         * 推送当前连接即将关闭(收到此推送客户端不再重连)
         * @server return JSON {
         * 				"content" : Integer 断线类型  0-链接关闭(客户端对此不做反应不再重连) 1-在其他地方登陆  2-被管理后台踢下线  3-IP被封  4-账号被封  5-服务器关闭 6-请求频繁
         * 				}
         */
        BaseMsgHandler.prototype.on_PUSH_OFF_LINE = function (msg) {
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
            var alert = Layers.HintLayer.create();
            alert.init({
                tipsStr: OFF_LINE_TIP[msg.datas.content],
                leftFunc: alert.close,
                leftThisObj: alert,
                curState: Layers.HintLayer.SURE2
            });
            alert.open();
            egret.log(OFF_LINE_TIP[msg.datas.content]);
            return 3 /* STOP */;
        };
        BaseMsgHandler.prototype.dispatchMsg = function (msg) {
            var funcName = 'on_' + OrderNameMap[msg.moduleId][msg.orderId];
            if (this[funcName]) {
                return this[funcName](msg);
            }
            return 1 /* NEXT */;
        };
        return BaseMsgHandler;
    }(egret.EventDispatcher));
    net.BaseMsgHandler = BaseMsgHandler;
    __reflect(BaseMsgHandler.prototype, "net.BaseMsgHandler");
})(net || (net = {}));
//# sourceMappingURL=BaseMsgHandler.js.map