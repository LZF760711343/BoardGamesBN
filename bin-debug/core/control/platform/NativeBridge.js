/**
 *
 * @author HE
 * 与native进行通信交互的类
 *
 */
var NativeBridge;
(function (NativeBridge) {
    var _keyDownCB;
    var _keyDownTarget;
    //游戏结束
    function endGame() {
        egret.ExternalInterface.call("endGame", "");
    }
    NativeBridge.endGame = endGame;
    //通知底层已经初始化完毕
    function initReady() {
        egret.ExternalInterface.call("initReady", "");
    }
    NativeBridge.initReady = initReady;
    //登陆
    function login(data) {
        egret.ExternalInterface.call("login", data);
    }
    NativeBridge.login = login;
    function initFinish() {
        egret.ExternalInterface.call("initFinish", "");
    }
    NativeBridge.initFinish = initFinish;
    function getRoomId() {
        // let str = egret.getOption("roomId");
        // if (str) {
        //     let params = str.split("_");
        //     if (params) {
        //         if (params[0]) {
        //             Global.openRoomId = params[0];
        //         }
        //         if (params[1]) {
        //             Global.invitionCode = params[1];
        //         }
        //     }
        // }
    }
    NativeBridge.getRoomId = getRoomId;
    //开始录音
    function startRecord() {
        egret.ExternalInterface.call("startRecord", "");
    }
    NativeBridge.startRecord = startRecord;
    //结束录音
    function stopRecord(isUpload) {
        egret.ExternalInterface.call("stopRecord", isUpload);
    }
    NativeBridge.stopRecord = stopRecord;
    //结束录音
    function playRecord(data) {
        egret.ExternalInterface.call("playRecord", JSON.stringify(data));
    }
    NativeBridge.playRecord = playRecord;
    //停止播放录音
    function stopPlayRecord() {
        egret.ExternalInterface.call("stopPlayRecord", "");
    }
    NativeBridge.stopPlayRecord = stopPlayRecord;
    /**
     * 打开webview
     */
    function openWebView(data) {
        egret.ExternalInterface.call("openWebView", data);
    }
    NativeBridge.openWebView = openWebView;
    //关闭webview
    function closeWebView() {
        egret.ExternalInterface.call("closeWebView", "");
    }
    NativeBridge.closeWebView = closeWebView;
    /**
     * 获取电池电量
     */
    function getBatteryQuantity() {
        egret.ExternalInterface.call("getBatteryQuantity", "");
    }
    NativeBridge.getBatteryQuantity = getBatteryQuantity;
    /**
     * 获取网络状况
     */
    function getInternetStatus() {
        egret.ExternalInterface.call("getInternetStatus", "");
    }
    NativeBridge.getInternetStatus = getInternetStatus;
    //登陆
    function loginFinish(username) {
        egret.ExternalInterface.call("loginFinish", JSON.stringify({ username: username }));
    }
    NativeBridge.loginFinish = loginFinish;
    function openRoom(message) {
        _eventDispatcher.dispatchEventWith(NativeBridge.KEYS.OPEN_ROOM, false, message);
        //        Global.openRoomId = message;
        // let params = message.split("_");
        // if (params) {
        //     if (params[0]) {
        //         Global.openRoomId = params[0];
        //     }
        //     if (params[1]) {
        //         Global.invitionCode = params[1];
        //     }
        // }
        // if (Global.openRoomId && Global.openRoomId.length == 6
        //     && Global.socketClient
        //     && Global.socketClient.sendValid //当前可以发送消息
        //     && Global.socketClient.serverType == SERVER_TYPE.GAME//并且已经成功登陆游戏服务器
        // ) {//发送进入房间的消息
        //     var scene = Main.instance.getCurrentScene();
        //     if (scene && SCENE_TAG.SELECT == scene.sceneTag) {
        //         var msg = new SendMsg(C2G_ENTER_SCORE_ROOM);
        //         Global.loginwithRoomId = parseInt(params[0]);
        //         msg.writeByProtocol(PROTOCOL_RoomID, params[0]);
        //         msg.send();
        //     }
        // }
    }
    NativeBridge.openRoom = openRoom;
    /**
     * 获取渠道号
     */
    function getChannel() {
        // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
        //     let message = egret.getOption("chl");
        //     if (message) {
        //         message = message.replace(/^(web_android|web_ios|ios|android)_?/, "");
        //         let channel = egret.Capabilities.os == "Android" ? "web_android" : "web_ios";
        //         GameConfig.channel = message ? channel + "_" + message : message;
        //     }
        //     GameConfig.initChannelDatas(GameConfig.channel);
        // } else {
        egret.ExternalInterface.call("getChannel", "");
        // }
    }
    NativeBridge.getChannel = getChannel;
    function getChannelCb(message) {
        // if (message) {
        //     GameConfig.channel = message;
        //     GameConfig.initChannelDatas(GameConfig.channel);
        // }
        _eventDispatcher.dispatchEventWith(NativeBridge.KEYS.GET_CHANNEL, false, message);
    }
    function keyDown(message) {
        _eventDispatcher.dispatchEventWith(NativeBridge.KEYS.KEY_DOWN, false, message);
        Layers.openQuitTipsLayer();
    }
    /**
     * 获取native版本号
     */
    function getVersion() {
        // egret.ExternalInterface.call("getVersion", "");
        egret.ExternalInterface.call(NativeBridge.KEYS.GET_VERSION, "");
    }
    NativeBridge.getVersion = getVersion;
    /**
     * 上传头像
     */
    function uploadHeadImg() {
        egret.ExternalInterface.call("uploadHeadImg", "");
    }
    NativeBridge.uploadHeadImg = uploadHeadImg;
    function getVersionCb(message) {
        _eventDispatcher.dispatchEventWith(NativeBridge.KEYS.GET_VERSION, false, message);
    }
    function shareFinih(message) {
        _eventDispatcher.dispatchEventWith(NativeBridge.KEYS.SHARE_FINISH, false, message);
    }
    function uploadHeadImgFinish(message) {
        _eventDispatcher.dispatchEventWith(NativeBridge.KEYS.UPLOAD_HEADIMG_FINISH, false, message);
    }
    function loginCb(message) {
        _eventDispatcher.dispatchEventWith(NativeBridge.KEYS.LOGIN, false, message);
    }
    NativeBridge.KEYS = {
        /**
         * android的按钮事件(暂时只监听返回键)
         */
        KEY_DOWN: "keydown",
        /**
         * 获取包体版本号返回
         */
        GET_VERSION: "getVersion",
        /**
         * 获取包的渠道号返回
         */
        GET_CHANNEL: "getChannel",
        /**
         * 收到一个房间号
         */
        OPEN_ROOM: "openroom",
        /**
         * 从微信分享完成(没办法知道有没有分享)
         */
        SHARE_FINISH: "shareFinih",
        /**
         * 上传头像成功
         */
        UPLOAD_HEADIMG_FINISH: "uploadHeadImgFinish",
        /**
         * 登录成功的回调
         */
        LOGIN: "login",
    };
    var _eventDispatcher;
    function init() {
        egret.ExternalInterface.call("setServerid", Config.SERVER_ID);
        _eventDispatcher = new egret.EventDispatcher();
        egret.ExternalInterface.addCallback(NativeBridge.KEYS.KEY_DOWN, keyDown);
        egret.ExternalInterface.addCallback(NativeBridge.KEYS.GET_VERSION, getVersionCb);
        egret.ExternalInterface.addCallback(NativeBridge.KEYS.GET_CHANNEL, getChannelCb);
        egret.ExternalInterface.addCallback(NativeBridge.KEYS.OPEN_ROOM, openRoom);
        egret.ExternalInterface.addCallback(NativeBridge.KEYS.SHARE_FINISH, shareFinih);
        egret.ExternalInterface.addCallback(NativeBridge.KEYS.UPLOAD_HEADIMG_FINISH, uploadHeadImgFinish);
        egret.ExternalInterface.addCallback(NativeBridge.KEYS.LOGIN, loginCb);
    }
    NativeBridge.init = init;
    function addEventListener(type, listener, thisObject, useCapture, priority) {
        _eventDispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    }
    NativeBridge.addEventListener = addEventListener;
    function removeEventListener(type, listener, thisObject, useCapture) {
        _eventDispatcher.removeEventListener(type, listener, thisObject, useCapture);
    }
    NativeBridge.removeEventListener = removeEventListener;
    // export var getGameUrl: Function;
    // 
    // egret.ExternalInterface.addCallback("getVersion", getVersionCb);
    // egret.ExternalInterface.addCallback("getChannel", getChannelCb);
    // egret.ExternalInterface.addCallback("openroom", openRoom);
})(NativeBridge || (NativeBridge = {}));
//# sourceMappingURL=NativeBridge.js.map