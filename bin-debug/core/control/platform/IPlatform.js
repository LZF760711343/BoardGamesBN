var nest;
(function (nest) {
    /**
     * 分享类型
     */
    nest.SHARE_TYPE = {
        /**
         * 发送给朋友
         */
        APPMESSAGE: "sendAppMessage",
        /**
         * 分享到朋友圈
         */
        TIMELINE: "shareTimeline",
        /**
         * 分享到QQ
         */
        QQ: "shareQQ",
        /**
         * 分享到Weibo
         */
        WEIBOAPP: "shareWeiboApp",
        /**
         * 收藏
         */
        // FAVORITE: "menuItem:favorite",
        /**
         * 分享到FB
         */
        FACEBOOK: "shareFacebook",
        /**
         * 分享到 QQ 空间
         */
        QZONE: "shareQZone"
    };
    function addShareCb(cb) {
        _instance.addShareCb(cb);
    }
    nest.addShareCb = addShareCb;
    function share(shareInfo) {
        _instance.share(shareInfo);
    }
    nest.share = share;
    var _instance;
    function login(callBack, thisObj) {
        return _instance.login(callBack, thisObj);
        // return _instance.login((info: LoginInfo) => {
        // 	loginInfo = info;
        // 	callBack.call(thisObj, info);
        // }, null);
    }
    nest.login = login;
    function pay(pid, unionid, openid, body) {
        return _instance.pay(pid, unionid, openid, body);
    }
    nest.pay = pay;
    function uploadHeadImg(callBack, thisObj) {
        return _instance.uploadHeadImg(callBack, thisObj);
    }
    nest.uploadHeadImg = uploadHeadImg;
    function initGameFinish() {
        return _instance.initGameFinish();
    }
    nest.initGameFinish = initGameFinish;
    function getRoomId() {
        return _instance.getRoomId();
    }
    nest.getRoomId = getRoomId;
    function isAutoLogin() {
        return _instance.isAutoLogin();
    }
    nest.isAutoLogin = isAutoLogin;
    function init() {
        _instance = new nest.Platform();
        if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
        }
        _instance.getRoomId();
        _instance.getChannel();
        _instance.getVersion();
        Global.upplayerid = parseInt(egret.getOption("upplayerid"));
    }
    nest.init = init;
})(nest || (nest = {}));
//# sourceMappingURL=IPlatform.js.map