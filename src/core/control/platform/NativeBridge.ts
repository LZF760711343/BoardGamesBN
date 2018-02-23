/**
 *
 * @author HE
 * 与native进行通信交互的类
 *
 */
namespace NativeBridge {
    var _keyDownCB: Function;
    var _keyDownTarget: Object;

    //游戏结束
    export function endGame() {
        egret.ExternalInterface.call("endGame", "");
    }
    //通知底层已经初始化完毕
    export function initReady() {
        egret.ExternalInterface.call("initReady", "");
    }
    //登陆
    export function login(data) {
        egret.ExternalInterface.call("login", data);

    }
    export function initFinish() {
        egret.ExternalInterface.call("initFinish", "");
    }
    export function getRoomId() {
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
    //开始录音
    export function startRecord() {
        egret.ExternalInterface.call("startRecord", "");
    }
    //结束录音
    export function stopRecord(isUpload: string) {
        egret.ExternalInterface.call("stopRecord", isUpload);
    }
    //结束录音
    export function playRecord(data: { url: string, hashCode: string }) {
        egret.ExternalInterface.call("playRecord", JSON.stringify(data));
    }
    //停止播放录音
    export function stopPlayRecord() {
        egret.ExternalInterface.call("stopPlayRecord", "");
    }
    /**
     * 打开webview
     */
    export function openWebView(data) {
        egret.ExternalInterface.call("openWebView", data);
    }
    //关闭webview
    export function closeWebView() {
        egret.ExternalInterface.call("closeWebView", "");
    }

    /**
     * 获取电池电量
     */
    export function getBatteryQuantity() {
        egret.ExternalInterface.call("getBatteryQuantity", "");
    }
    /**
     * 获取网络状况
     */
    export function getInternetStatus() {
        egret.ExternalInterface.call("getInternetStatus", "");
    }
    //登陆
    export function loginFinish(username) {
        egret.ExternalInterface.call("loginFinish", JSON.stringify({ username: username }));
    }
    export function openRoom(message) {
        _eventDispatcher.dispatchEventWith(KEYS.OPEN_ROOM, false, message);
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
    /**
     * 获取渠道号
     */
    export function getChannel() {
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
    function getChannelCb(message: string) {
        // if (message) {
        //     GameConfig.channel = message;
        //     GameConfig.initChannelDatas(GameConfig.channel);
        // }
        _eventDispatcher.dispatchEventWith(KEYS.GET_CHANNEL, false, message);
    }

    function keyDown(message: string) {
        _eventDispatcher.dispatchEventWith(KEYS.KEY_DOWN, false, message);
        Layers.openQuitTipsLayer();
    }

    /**
     * 获取native版本号
     */
    export function getVersion() {
        // egret.ExternalInterface.call("getVersion", "");
        egret.ExternalInterface.call(KEYS.GET_VERSION, "");

    }
    /**
     * 上传头像
     */
    export function uploadHeadImg() {
        egret.ExternalInterface.call("uploadHeadImg", "");
    }
    function getVersionCb(message: string) {
        _eventDispatcher.dispatchEventWith(KEYS.GET_VERSION, false, message);
    }
    function shareFinih(message: string) {
        _eventDispatcher.dispatchEventWith(KEYS.SHARE_FINISH, false, message);
    }
    function uploadHeadImgFinish(message: string) {
        _eventDispatcher.dispatchEventWith(KEYS.UPLOAD_HEADIMG_FINISH, false, message);
    }
    function loginCb(message: string) {
        _eventDispatcher.dispatchEventWith(KEYS.LOGIN, false, message);
    }
    export const KEYS = {
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
    }
    let _eventDispatcher: egret.EventDispatcher;
    export function init() {

        egret.ExternalInterface.call("setServerid", Config.SERVER_ID);
        _eventDispatcher = new egret.EventDispatcher();
        egret.ExternalInterface.addCallback(KEYS.KEY_DOWN, keyDown);
        egret.ExternalInterface.addCallback(KEYS.GET_VERSION, getVersionCb);
        egret.ExternalInterface.addCallback(KEYS.GET_CHANNEL, getChannelCb);
        egret.ExternalInterface.addCallback(KEYS.OPEN_ROOM, openRoom);
        egret.ExternalInterface.addCallback(KEYS.SHARE_FINISH, shareFinih);
        egret.ExternalInterface.addCallback(KEYS.UPLOAD_HEADIMG_FINISH, uploadHeadImgFinish);
        egret.ExternalInterface.addCallback(KEYS.LOGIN, loginCb);
    }

    export function addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number) {
        _eventDispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    }
    export function removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean) {
        _eventDispatcher.removeEventListener(type, listener, thisObject, useCapture);
    }
    // export var getGameUrl: Function;
    // 
    // egret.ExternalInterface.addCallback("getVersion", getVersionCb);
    // egret.ExternalInterface.addCallback("getChannel", getChannelCb);
    // egret.ExternalInterface.addCallback("openroom", openRoom);
}
