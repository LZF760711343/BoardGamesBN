var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var nest;
(function (nest) {
    /**
     *
     */
    var NativePlatform = (function () {
        function NativePlatform() {
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
        NativePlatform.prototype.headUploadFinish = function (event) {
            if (this._headCb) {
                this._headCb.call(this._headTarget, event.data);
                this._headCb = this._headTarget = null;
            }
        };
        NativePlatform.prototype.shareFinish = function (event) {
            if (this._shareCb) {
                var result = { code: event.data, type: "app" };
                switch (this._curShareType) {
                    case 0:
                        result.type = nest.SHARE_TYPE.APPMESSAGE;
                        break;
                    case 1:
                        result.type = nest.SHARE_TYPE.TIMELINE;
                        break;
                }
                this._shareCb(result);
            }
        };
        NativePlatform.prototype.share = function (shareInfo) {
            this._curShareType = shareInfo.scene;
            egret.ExternalInterface.call("shareWx", JSON.stringify(shareInfo));
        };
        NativePlatform.prototype.addShareCb = function (cb) {
            this._shareCb = cb;
        };
        NativePlatform.prototype.uploadHeadImg = function (callBack, thisObj) {
            this._headCb = callBack;
            this._headTarget = thisObj;
            NativeBridge.uploadHeadImg();
        };
        NativePlatform.prototype.getRoomId = function () {
            NativeBridge.getRoomId();
        };
        NativePlatform.prototype.onOpenRoom = function (event) {
            if (event.data) {
                var roomId = parseInt(event.data);
                if (net.getServerType() === 3 /* GAME */) {
                    if (SceneManager.curScene.sceneTag === 43 /* SELECT */) {
                        net.SendMsg.create({ roomId: roomId }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ENTER_SCORE_ROOM).send();
                        Global.enterRoomId = null;
                    }
                    else if (SceneManager.curScene.sceneTag === 42 /* LOGIN */) {
                        Global.enterRoomId = roomId;
                    }
                }
                else {
                    Global.enterRoomId = roomId;
                }
            }
        };
        NativePlatform.prototype.getVersion = function () {
            NativeBridge.getVersion();
        };
        NativePlatform.prototype.getVersionCb = function (event) {
            Config.nativeVersion = event.data;
        };
        NativePlatform.prototype.getChannelCb = function (event) {
            Config.channel = event.data;
        };
        NativePlatform.prototype.getChannel = function () {
            NativeBridge.getChannel();
        };
        NativePlatform.prototype.initGameFinish = function () {
            NativeBridge.initFinish();
        };
        /**
         * 登陆
         */
        NativePlatform.prototype.login = function (callBack, thisObj) {
            //如果本地缓存有登陆数据,就直接登陆
            if (LocalDatas.datas.datas.pwd && LocalDatas.datas.datas.userName) {
                // Global.playerDto.account = LocalDatas.datas.datas.userName;
                // Global.playerDto.nickName = LocalDatas.datas.datas.nick;
                callBack.call(thisObj, {
                    loginKey: LocalDatas.datas.datas.userName,
                });
            }
            else {
                this._cb = callBack;
                this._target = thisObj;
                // egret.ExternalInterface.call("login", "");
                NativeBridge.login("");
            }
        };
        NativePlatform.prototype.loginSuccess = function (event) {
            var info = JSON.parse(event.data);
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
            });
        };
        //游戏结束
        NativePlatform.prototype.endGame = function () {
            egret.ExternalInterface.call("endGame", "");
        };
        /**
         * 是否自动登陆
         */
        NativePlatform.prototype.isAutoLogin = function () {
            return (LocalDatas.datas.datas.pwd && LocalDatas.datas.datas.userName);
        };
        NativePlatform.prototype.init = function () {
            // egret.ExternalInterface.addCallback("login", this.loginSuccess.bind(this));
        };
        /**
         * 购买商品
         */
        NativePlatform.prototype.pay = function (pid, unionid, openid, body) {
            egret.ExternalInterface.call("payWx", JSON.stringify({
                url: Config.URLS.getRechargeUrl,
                pid: pid,
                body: body,
                unionid: unionid,
                playerid: Global.playerDto.id
            }));
        };
        ;
        return NativePlatform;
    }());
    nest.NativePlatform = NativePlatform;
    __reflect(NativePlatform.prototype, "nest.NativePlatform", ["nest.IPlatform"]);
    if (egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE) {
        nest.Platform = NativePlatform;
    }
})(nest || (nest = {}));
//# sourceMappingURL=NativePlatform.js.map