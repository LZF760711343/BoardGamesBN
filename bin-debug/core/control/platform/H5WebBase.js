var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var nest;
(function (nest) {
    var params = [
        ["roomId", ""],
        ["chl", Config.channel],
        ["aid", ""],
        ["upplayerid", ""],
        ["playerid", ""],
        ["serverid", Config.SERVER_ID],
        ["debug", ""],
    ];
    var H5WebBase = (function () {
        function H5WebBase() {
        }
        /**
         * 是否自动登陆
         */
        H5WebBase.prototype.isAutoLogin = function () {
            return egret.getOption("unionid") || LocalDatas.datas.datas.loginInfo;
        };
        H5WebBase.prototype.init = function () {
        };
        /**
         * 购买商品
         */
        H5WebBase.prototype.pay = function (pid, unionid, openid, body) { };
        ;
        H5WebBase.prototype.getRoomId = function () {
            if (egret.getOption("roomId")) {
                Global.enterRoomId = parseInt(egret.getOption("roomId"));
            }
            egret.log("Global.enterRoomId:" + Global.enterRoomId);
        };
        H5WebBase.prototype.getVersion = function () {
        };
        H5WebBase.prototype.share = function (shareInfo) {
            Gzqd.setShare({
                share_title: shareInfo.title,
                share_desc: shareInfo.description,
                share_url: shareInfo.url,
                share_img: Gzqd.getCurFolder() + "favicon.ico",
            });
        };
        H5WebBase.prototype.uploadHeadImg = function (callBack, thisObj) {
            Uplad.LPAS(callBack, thisObj);
        };
        H5WebBase.prototype.addShareCb = function (cb) {
            if (Gzqd) {
                Gzqd.addShareCb(cb);
            }
        };
        H5WebBase.prototype.getOption = function () {
            var list = [];
            var arrLen = params.length;
            for (var i = 0; i < arrLen; i++) {
                var key = params[i][0];
                var str = egret.getOption(key);
                if (str) {
                    list.push(key + "=" + str);
                }
                else if (params[i][1]) {
                    list.push(key + "=" + params[i][1]);
                }
            }
            return list.join("&");
        };
        /**
         *
         */
        H5WebBase.prototype.login = function (callBack, thisObj) {
            if (egret.getOption("unionid")) {
                LocalDatas.datas.datas.loginInfo = {
                    unionid: egret.getOption("unionid"),
                    openid: egret.getOption("openid"),
                };
                LocalDatas.datas.saveData();
                var game_url = location.href.split("?")[0];
                var paramStr = this.getOption();
                if (paramStr) {
                    game_url += ("?" + paramStr);
                }
                location.href = game_url;
            }
            else if (LocalDatas.datas.datas.loginInfo) {
                var data = {
                    loginKey: LocalDatas.datas.datas.loginInfo.unionid,
                };
                LocalDatas.delTempLoginInfo();
                callBack.call(thisObj, data);
            }
            else if (LocalDatas.datas.datas.pwd && LocalDatas.datas.datas.userName) {
                callBack.call(thisObj, {
                    loginKey: LocalDatas.datas.datas.userName,
                });
            }
            else {
                var redirectUri = this.redirectUri;
                var game_url = location.href.split("?")[0];
                var paramStr = this.getOption();
                if (paramStr) {
                    redirectUri += ("&" + paramStr);
                }
                var href = this.wechatUrl.format(this.appid, encodeURIComponent(redirectUri.format(this.appid, encodeURIComponent(game_url))));
                location.href = href;
            }
        };
        H5WebBase.prototype.initGameFinish = function () {
            //Main.instance.initFinish();
            // alert("ddd");
            if (document.getElementsByClassName("egret-img")) {
                var img = document.getElementsByClassName("egret-img")[0];
                if (img) {
                    img.parentNode.removeChild(img);
                }
            }
        };
        H5WebBase.prototype.getChannel = function () {
            var message = egret.getOption("chl");
            if (message) {
                Config.channel = message;
            }
            else {
            }
        };
        return H5WebBase;
    }());
    nest.H5WebBase = H5WebBase;
    __reflect(H5WebBase.prototype, "nest.H5WebBase", ["nest.IPlatform"]);
})(nest || (nest = {}));
//# sourceMappingURL=H5WebBase.js.map