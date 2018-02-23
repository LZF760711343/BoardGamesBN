var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
///<reference path="Protocols.ts"/>
var net;
(function (net) {
    net._instance = null;
    function connectLoginServer(compFunc, thisObject) {
        return net._instance.connectLoginServer(compFunc, thisObject);
    }
    net.connectLoginServer = connectLoginServer;
    function connectGameServer(compFunc, thisObject) {
        return net._instance.connectGameServer(compFunc, thisObject);
    }
    net.connectGameServer = connectGameServer;
    function setIpAndPort(ip, port) {
        net._instance.setIpAndPort(ip, port);
    }
    net.setIpAndPort = setIpAndPort;
    function dispatchMsg() {
        FrameManager.getInstance().addFrame(net._instance.dispatchMsg, net._instance, 0, 1);
        // return _instance.dispatchMsg();
    }
    net.dispatchMsg = dispatchMsg;
    /**
     * 注册对应消息级别的消息处理器,用来处理改级别的消息
     * @param level {MSG_LEVEL} 消息的派发等级
     * @param msgHandler 消息处理器
     */
    function registerMsgHandler(level, msgHandler) {
        return net._instance.registerMsgHandler(level, msgHandler);
    }
    net.registerMsgHandler = registerMsgHandler;
    /**
     * 取消注册对应消息级别的消息处理器
     * @param level {MSG_LEVEL} 消息的派发等级
     */
    function unRegisterMsgHandler(level) {
        return net._instance.unRegisterMsgHandler(level);
    }
    net.unRegisterMsgHandler = unRegisterMsgHandler;
    /**
     * 注册消息消息的派发等级
     * @method registerMsgLevel
     * @param level {MSG_LEVEL} 消息的派发等级
     * @param moduleId{ModuleInfo} 消息的模块
     * @param args 需要注册的消息
     */
    function registerMsgLevel(level, moduleId) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return net._instance.registerMsgLevel.apply(net._instance, [level, moduleId].concat(args));
    }
    net.registerMsgLevel = registerMsgLevel;
    /**
     * 删除某条消息之前的所有消息
     *  @param level {MSG_LEVEL} 要删除哪个级别的消息
     *  @param moduleId 要删除哪个模块的消息
     */
    function removeMsgBeforeMsg(level, moduleId, orderId) {
        return net._instance.removeMsgBeforeMsg(level, moduleId, orderId);
    }
    net.removeMsgBeforeMsg = removeMsgBeforeMsg;
    /**
     * 初始化网络模块
     */
    function init() {
        net._instance.init();
    }
    net.init = init;
    /**
     * 清理缓存池里面的消息
     * @param level:如果没有知道要清理的消息基本,那边就清除所有的消息
     */
    function clearMsgs(level) {
        net._instance.clearMsgs(level);
    }
    net.clearMsgs = clearMsgs;
    function close() {
        net._instance.close();
    }
    net.close = close;
    /**
     * 当前连接服务器类型
     */
    function getServerType() {
        return net._instance.serverType;
    }
    net.getServerType = getServerType;
    var NetManage = (function () {
        function NetManage() {
            this._loginIp = Config.SERVER_URL; //游戏登陆服务器ip
            this._loginPort = Config.SERVER_PORT; //游戏登陆服务器端口
            this._gameIp = ""; //游戏服务器ip
            this._gamePort = 0; //游戏服务器端口
            this.socket = null;
            this._msgHandler = [];
            this.serverType = 0 /* NONE */;
        }
        NetManage.prototype.setIpAndPort = function (ip, port) {
            this._loginIp = ip;
            this._loginPort = port;
        };
        NetManage.prototype.init = function () {
            this._msgPool = [];
            this._msgPool[1 /* GLOBAL */] = [];
            this._msgPool[2 /* SCENE */] = [];
            this._msgPool[0 /* BASE */] = [];
            this._msgRegisterList = [];
            this._msgRegisterList[1 /* GLOBAL */] = [];
            this._msgRegisterList[2 /* SCENE */] = [];
            this._msgRegisterList[0 /* BASE */] = [];
            this.registerMsgHandler(1 /* GLOBAL */, new GlobalMsgHandler);
            this._baseMsgHandler = new net.BaseMsgHandler();
            this.registerMsgHandler(0 /* BASE */, this._baseMsgHandler);
            this.registerMsgLevel(0 /* BASE */, 1 /* PLAYER */, PlayerOrder.HEART_BEAT, PlayerOrder.CREATE_PLAYER, PlayerOrder.LOGIN, PlayerOrder.CHECK_ACCOUNT, PlayerOrder.PUSH_OFF_LINE);
            this.registerMsgLevel(1 /* GLOBAL */, 3 /* PLAY_GAME */, PlayGameOrder.G2C_USER_INFO, PlayGameOrder.G2C_UPDATE_PLAYER_GOLD, PlayGameOrder.G2C_HAS_POCHAN_COUNT, PlayGameOrder.G2C_ASK_POCHAN, PlayGameOrder.G2C_UPDATE_PLAYER_FANGKA, PlayGameOrder.G2C_GET_SHOUCHONG, PlayGameOrder.G2C_UPDATE_HEAD_IMAGES);
            this.registerMsgLevel(1 /* GLOBAL */, 1 /* PLAYER */, PlayerOrder.ALL2C_STR_ERROR, PlayerOrder.G2C_CHONGZHI_TIPS, PlayerOrder.G2C_NORMAL_TIPS, PlayerOrder.G2C_GET_CHONGZHI);
            egret.log("Net init finished!!!");
        };
        /**
         * 清理缓存池里面的消息
         * @param level:如果没有知道要清理的消息基本,那边就清除所有的消息
         */
        NetManage.prototype.clearMsgs = function (level) {
            if (typeof level !== "undefined") {
                this._msgPool[level] = [];
            }
            else {
                this._msgPool = [];
                this._msgPool[1 /* GLOBAL */] = [];
                this._msgPool[2 /* SCENE */] = [];
                this._msgPool[0 /* BASE */] = [];
            }
        };
        NetManage.prototype.connectLoginServer = function (compFunc, thisObject) {
            var _this = this;
            if (this.socket) {
                this.socket.close();
            }
            var promise = new Promise(function (reslove, reject) {
                var onSuccess = function (e) {
                    egret.log("onSuccess");
                    _this.serverType = 2 /* LOGIN */;
                    _this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, _this);
                    _this.socket.once(egret.Event.CLOSE, _this.onLoginServerClose, _this);
                    _this.socket.once(egret.IOErrorEvent.IO_ERROR, _this.onLoginServerError, _this);
                    reslove(e);
                };
                var onError = function (e) {
                    reject(e);
                };
                _this.socket = new net.WebSocket();
                _this.socket.connect(_this._loginIp, _this._loginPort);
                _this.socket.addEventListener(net.WebSocket.SEND_MSG, _this.addMsg, _this);
                _this.socket.once(egret.Event.CONNECT, onSuccess, _this);
                _this.socket.once(egret.IOErrorEvent.IO_ERROR, onError, _this);
            });
            return promise;
        };
        /**
         * 链接socket
         * @param count:连接服务器失败后尝试重新连接的次数
         */
        NetManage.prototype.connectSocket = function (reslove, reject, count) {
            var _this = this;
            if (count === void 0) { count = 3; }
            var self = this;
            var onSuccess = function (e) {
                egret.log("onSuccess");
                self.serverType = 2 /* LOGIN */;
                self.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
                self.socket.once(egret.Event.CLOSE, self.onLoginServerClose, self);
                self.socket.once(egret.IOErrorEvent.IO_ERROR, self.onLoginServerError, self);
                reslove(e);
            };
            var onError = function (e) {
                egret.log("onError!!!!!!!!!!!!!!!");
                // DEBUG && egret.error(`Connect Socket Fail, IP:${self._loginIp}, Port:${this._loginPort}`);
                self.serverType = 0 /* NONE */;
                if (count--) {
                    _this.connectSocket(reslove, reject, count);
                }
                else {
                    reject(e);
                }
            };
            self.socket = new net.WebSocket();
            self.socket.connect(self._loginIp, self._loginPort);
            self.socket.addEventListener(net.WebSocket.SEND_MSG, self.addMsg, self);
            self.socket.once(egret.Event.CONNECT, onSuccess, self);
            self.socket.once(egret.IOErrorEvent.IO_ERROR, onError, self);
        };
        NetManage.prototype.connectGameServer = function (compFunc, thisObject) {
            var self = this;
            if (self.socket) {
                self.socket.close();
            }
            this.serverType = 1 /* CONNETING */;
            return new Promise(this.connectSocket.bind(this)) //链接webSocket
                .then(this.connectGameServer2.bind(this)); //登陆游戏服务器
        };
        //成功连接webSocket后,开始登陆游戏
        NetManage.prototype.connectGameServer2 = function () {
            var _this = this;
            var self = this;
            //成功连接服务器
            return new Promise(function (reslove, reject) {
                function connetError(e) {
                    self._baseMsgHandler.removeEventListener(egret.Event.CONNECT, connetSuccess, this); //移除登陆服务器成功的回调,防止内存泄露
                    this.serverType = 0 /* NONE */;
                    reject(e.data);
                }
                function connetSuccess() {
                    self._baseMsgHandler.removeEventListener(net.NetEvent.CONNET_ERROR, connetError, this); //移除登陆服务器失败的回调,防止内存泄露
                    if (!Config.debugLogin) {
                        LocalDatas.datas.datas.pwd = LocalDatas.datas.datas.userName = Global.playerDto.account;
                        //如果头像是"/0",说明该用户没有上传头像,用默认头像,"/96"是为了兼容以前那些"/0"被替换成"/96"的
                        if (Global.playerDto.headImages === "/0"
                            || Global.playerDto.headImages === "/132"
                            || Global.playerDto.headImages === "/96"
                            || Global.playerDto.headImages === "") {
                            Global.playerDto.headImages = DEFAULT_HEAD_IMG;
                            net.SendMsg.create({ headImages: Global.playerDto.headImages }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_UPDATE_HEAD_IMAGES).send();
                        }
                        else if (Global.playerDto.headImages.endWith("/0")) {
                            Global.playerDto.headImages = Global.playerDto.headImages.substr(0, Global.playerDto.headImages.lastIndexOf("/") + 1) + WEIXIN_HEAD_IMG_SIZE;
                            net.SendMsg.create({ headImages: Global.playerDto.headImages }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_UPDATE_HEAD_IMAGES).send();
                        }
                        LocalDatas.datas.saveData();
                    }
                    this.serverType = 3 /* GAME */;
                    reslove();
                }
                self._baseMsgHandler.startHeartBeatTimer(); //开始发送心跳包
                self._baseMsgHandler.send_CHECK_ACCOUNT(); //发送检测用户是否注册的消息
                self._baseMsgHandler.once(egret.Event.CONNECT, connetSuccess, _this); //登陆服务器成功的回调
                self._baseMsgHandler.once(net.NetEvent.CONNET_ERROR, connetError, _this); //登陆服务器失败的回调
            });
        };
        NetManage.prototype.onLoginServerError = function () {
            this.serverType = 0 /* NONE */;
            net.close();
            Layers.HintLayer.create().init({ tipsStr: GameLangs.netCloseTip }).open();
        };
        NetManage.prototype.onLoginServerClose = function () {
            this.serverType = 0 /* NONE */;
            net.close();
            Layers.HintLayer.create().init({ tipsStr: GameLangs.netCloseTip }).open();
        };
        /**
         * 消息派发只在收到服务器消息的时候会自动派发一次,所以在创建新的消息处理器的时候,最好调用一次这个消息,派发一次消息
         */
        NetManage.prototype.dispatchMsg = function () {
            var aLen = this._msgPool.length;
            if (this._isdispatchMsging) {
                egret.error("现在还在派发消息中!!!!!");
            }
            this._isdispatchMsging = true;
            for (var i = 0; i < aLen; ++i) {
                // let maxCount = 50;
                // let msgList = [];
                if (this._msgHandler[i]) {
                    var msgList = this._msgPool[i];
                    // egret.log("msgList:" + msgList.length)
                    var j = 0;
                    var _msg = msgList[j];
                    while (_msg) {
                        try {
                            var result = this._msgHandler[i].dispatchMsg(_msg);
                            if (Config.debugLogin) {
                                EventManager.dispatchEvent(net.WebSocket.SEND_MSG, [result, _msg]);
                            }
                            switch (result) {
                                case 1 /* NEXT */:
                                    if (this._msgPool[i + 1] && _msg) {
                                        this._msgPool[i + 1].push(_msg);
                                    }
                                    msgList.splice(j, 1);
                                    break;
                                case 0 /* NONE */:
                                    j++;
                                    break;
                                case 3 /* STOP */:
                                    // msgList.splice(j, 1);
                                    this._isdispatchMsging = false;
                                    return;
                                default:
                                    if (_msg) {
                                        _msg.destroy();
                                    }
                                    msgList.splice(j, 1);
                                    break;
                            }
                        }
                        catch (error) {
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
        };
        /**
         * 注册对应消息级别的消息处理器,用来处理改级别的消息
         * @param level {MSG_LEVEL} 消息的派发等级
         * @param msgHandler 消息处理器
         */
        NetManage.prototype.registerMsgHandler = function (level, msgHandler) {
            this._msgHandler[level] = msgHandler;
        };
        /**
         * 注册消息消息的派发等级
         * @method registerMsgLevel
         * @param level ${MSG_LEVEL} 消息的派发等级
         * @param moduleId 要注册哪个模块的消息
         * @param args 需要注册的消息
         */
        NetManage.prototype.registerMsgLevel = function (level, moduleId) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var aLen = args.length;
            if (!this._msgRegisterList[moduleId]) {
                this._msgRegisterList[moduleId] = [];
            }
            var msgRegisterList = this._msgRegisterList[moduleId];
            // let length = msgRegisterList.length;
            for (var i = 0; i <= 2 /* SCENE */; ++i) {
                if (!msgRegisterList[i]) {
                    msgRegisterList[i] = [];
                }
                if (i == level) {
                    for (var j = 0; j < aLen; ++j) {
                        if (msgRegisterList[i].indexOf(args[j]) < 0) {
                            msgRegisterList[i].push(args[j]);
                        }
                    }
                }
                else {
                    for (var j = 0; j < aLen; ++j) {
                        var index = msgRegisterList[i].indexOf(args[j]);
                        if (index > -1) {
                            msgRegisterList[i].slice(index, 1);
                        }
                    }
                }
            }
        };
        NetManage.prototype.close = function () {
            var self = this;
            self.socket.removeEventListener(egret.Event.CLOSE, self.onLoginServerClose, self);
            self.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoginServerError, self);
            self._baseMsgHandler.stopHeartBeatTimer();
            if (self.socket) {
                self.socket.isDispatchEvent = false;
                self.socket.close();
                self.socket = null;
            }
            self.serverType = 0 /* NONE */;
            self.unRegisterMsgHandler(2 /* SCENE */);
            self.clearMsgs();
            Global.reset();
            SceneManager.runScene(42 /* LOGIN */, null, null, LoginScene.NORMAL);
        };
        /**
         * 删除某条消息之前的所有消息
         *  @param level {MSG_LEVEL} 要删除哪个级别的消息
         *  @param moduleId 要删除哪个模块的消息
         */
        NetManage.prototype.removeMsgBeforeMsg = function (level, moduleId, orderId) {
            // let msgRegisterList = this._msgRegisterList[moduleId];
            var msgList = this._msgPool[level];
            if (msgList && msgList.length) {
                var arrLen = msgList.length;
                for (var i = 0; i < arrLen; i++) {
                    if (msgList[i].moduleId === moduleId && msgList[i].orderId === orderId) {
                        msgList.splice(0, i + 1);
                        return;
                    }
                }
            }
        };
        /**
         * 取消注册对应消息级别的消息处理器
         * @param level {MSG_LEVEL} 消息的派发等级
         */
        NetManage.prototype.unRegisterMsgHandler = function (level) {
            this._msgHandler[level] = null;
        };
        NetManage.prototype.addMsg = function (event) {
            var msg = event.data;
            var msgRegisterList = this._msgRegisterList[msg.moduleId];
            if (msgRegisterList) {
                for (var key in msgRegisterList) {
                    if (msgRegisterList[key].indexOf(msg.orderId) > -1) {
                        this._msgPool[key].push(msg);
                        this.dispatchMsg();
                        return;
                    }
                }
            }
            //如果在在消息注册表里面没有找到相应消息,默认加入到scene级别的消息里面
            this._msgPool[2 /* SCENE */].push(msg);
            this.dispatchMsg();
        };
        return NetManage;
    }());
    __reflect(NetManage.prototype, "NetManage");
    // 消息头
    var msgHead = 0x91201314;
    var SendMsg = (function () {
        /**
         * @param sendDatas 发送的数据
         * @param moduleId 模块ID
         * @param orderId 命令ID
         */
        function SendMsg(sendDatas, moduleId, orderId) {
            this.sendDatas = sendDatas;
            this.moduleId = moduleId;
            this.orderId = orderId;
            this._byteArray = new net.ByteArray();
        }
        SendMsg.prototype.setDatas = function (sendDatas, moduleId, orderId) {
            this.sendDatas = sendDatas;
            this.moduleId = moduleId;
            this.orderId = orderId;
        };
        SendMsg.prototype.write = function (strFmt) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
        };
        SendMsg.prototype.destroy = function () {
            this.sendDatas = null;
            // this._byteArray.
            SendMsg._pool.push(this);
        };
        /**
         * 发送消息
         */
        SendMsg.prototype.send = function () {
            if (this.sendDatas) {
                var str = JSON.stringify(this.sendDatas);
            }
            else {
                var str = "";
            }
            var msgLen = str.length + 29; //消息长度
            var datas = this._byteArray;
            // datas.buffer = new ArrayBuffer(msgLen + 8);
            datas.clear();
            datas.writeInt(msgHead); //包头标识
            datas.writeInt(msgLen); //消息体长度
            datas.writeInt(SendMsg.index++); //流水号  4
            datas.writeLong(Date.now()); //客户端请求时间 8
            datas.writeInt(0); //消息对象类型 0:json格式 4
            datas.writeByte(0); //压缩标示 1
            datas.writeInt(0); //验证码 4
            datas.writeInt(this.moduleId); //模块ID 4
            datas.writeInt(this.orderId); //命令ID 4
            datas.writeUTFBytes(str);
            datas.position = 4;
            datas.writeInt(datas.length - 8);
            // let tt = StringUtil.stringToArrayBuffer(StringUtil.utf16ToUtf8(str));
            // if (DEBUG) {
            if (!(this.moduleId == 1 /* PLAYER */ && this.orderId == PlayerOrder.HEART_BEAT)) {
                egret.log("SEND>> " + OrderNameMap[this.moduleId][this.orderId] + ",  " + str);
            }
            // }
            net._instance.socket.send(datas.buffer);
            this.destroy(); //发送完消息将该消息送入消息缓存池
        };
        /**
         * 从对象池中取出或创建一个新的发送消息对象。
         * @param sendDatas 发送的数据
         * @param moduleId ${ModuleInfo}模块ID
         * @param orderId 命令ID
         */
        SendMsg.create = function (sendDatas, moduleId, orderId) {
            if (SendMsg._pool.length) {
                var msg = SendMsg._pool.pop();
                msg.setDatas(sendDatas, moduleId, orderId);
                return msg;
            }
            else {
                return new SendMsg(sendDatas, moduleId, orderId);
            }
        };
        return SendMsg;
    }());
    SendMsg.index = 0;
    SendMsg._pool = []; //对象缓冲池
    net.SendMsg = SendMsg;
    __reflect(SendMsg.prototype, "net.SendMsg");
    net._instance = new NetManage();
})(net || (net = {}));
//# sourceMappingURL=NetManage.js.map