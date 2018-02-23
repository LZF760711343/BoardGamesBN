var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super.call(this) || this;
        _this._curProgress = 0;
        _this._targetProgress = 0;
        _this.index = 0;
        _this.skinName = LoginSceneSkin;
        _this.percentWidth = _this.percentHeight = 100;
        return _this;
    }
    ;
    LoginScene.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    /**
     * 登陆界面的状态
     */
    LoginScene.prototype.init = function (type) {
        if (type) {
            if (type === LoginScene.PROGRESS) {
                this.stopTimer();
                this._resolve = null;
            }
            this.currentState = type;
        }
        Layers.init(this.panelLayer || this);
        // Toast.init(this.tipLayer || this);
    };
    LoginScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.currentState = LoginScene.NORMAL;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (Config.debugLogin) {
        }
        else {
            if (nest.isAutoLogin()) {
                this.onLoginByWx();
            }
            this._txtInput.visible = false;
        }
        nest.initGameFinish();
    };
    LoginScene.prototype.update = function () {
        // egret.log("update:", net.getServerType())
        if (this._curProgress === 1 && net.getServerType() === 3 /* GAME */) {
            this.stopTimer();
            if (this._resolve) {
                this._resolve();
                this._waitGroupName = this._resolve = null;
            }
        }
        if (this._waitGroupName && ResManager.isGroupLoaded(this._waitGroupName)) {
            this._targetProgress = 1;
        }
        if (net.getServerType() === 3 /* GAME */) {
            this._curProgress += 0.06;
        }
        else {
            this._curProgress += 0.001;
            if (this._curProgress > 0.9) {
                this._curProgress = 0.9;
            }
        }
        this._curProgress = this._curProgress > this._targetProgress ? this._targetProgress : this._curProgress;
        this._progressBar.value = 1034 * this._curProgress;
        // this._BitemLogin.text = "S(" + Math.round(this._curProgress * 100) + "%)";
        this._BitemLogin.text = Math.round(this._curProgress * 100) + "%";
    };
    /**
     * 等待服务器成功链接,并且资源加载完成,
     */
    LoginScene.prototype.waitReady = function (groupName) {
        var _this = this;
        this.currentState = LoginScene.PROGRESS;
        this.startTimer(0);
        this._progressBar.value = 0;
        this._curProgress = 0;
        this._waitGroupName = groupName;
        return new Promise(function (resolve, reject) {
            if (net.getServerType() == 3 /* GAME */ &&
                _this._curProgress === 1) {
                resolve();
            }
            else {
                _this._resolve = resolve;
            }
        });
    };
    LoginScene.prototype.onProgress = function (current, total) {
        this._targetProgress = current / total;
    };
    LoginScene.prototype.onTouchTap = function (event) {
        switch (event.target) {
            case this._wxbtn:
                this.onLoginByWx();
                break;
        }
        SoundManage.playEffect1("btnClick");
    };
    /**
     * 开始登陆到服务器
     */
    LoginScene.prototype.loginServer = function () {
        var _this = this;
        this.startTimer(0);
        egret.log("loginServer");
        net.connectGameServer().catch(function (e) {
            var alert = Layers.HintLayer.create();
            alert.init({ tipsStr: GameLangs.coneectFail });
            alert.open();
            _this.currentState = LoginScene.NORMAL;
            _this.stopTimer();
        });
    };
    LoginScene.prototype.loginSuccessCb = function (userInfo) {
        Global.playerDto.account = userInfo.loginKey;
        this.loginServer();
    };
    // 游客登录通道
    LoginScene.prototype.loginVisitor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Global.upplayerid) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        egret.log("游客登录通道", Config.SERVER_ID, Config.channel, Global.playerDto.id);
                        return [4 /*yield*/, Global.requestDataAsync((Config.URLS.VisitorsLoginUrl + "?serverid=$1&chl=$2&upplayerid=$3&aid=").format(Config.SERVER_ID, Config.channel, Global.upplayerid), {})];
                    case 2:
                        response = _a.sent();
                        alert(response);
                        data = JSON.parse(response);
                        Global.playerDto.account = data.account;
                        this.loginServer();
                        egret.log("游客登录通道" + data.account);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        egret.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.loginServer();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 通过微信登录按钮回调
     */
    LoginScene.prototype.onLoginByWx = function () {
        if (Config.debugLogin) {
            var index = 0;
            if (this._txtInput.text != '') {
                index = parseInt(this._txtInput.text);
            }
            if (Global.testUsers[index]) {
                Global.playerDto.nickName = Global.testUsers[index].nickName;
                Global.playerDto.account = Global.testUsers[index].account;
                Global.playerDto.sex = Global.testUsers[index].sex;
            }
            else {
                Global.playerDto.account = this._txtInput.text;
                Global.playerDto.nickName = (this._txtInput.text);
            }
            Global.playerDto.nickName = Base64.encode(Global.playerDto.nickName);
            this.loginVisitor();
        }
        else {
            nest.login(this.loginSuccessCb, this);
        }
        SceneManager.runScene(43 /* SELECT */, function () {
            if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                Gzqd.setShare({
                    share_title: "HZ\u68CB\u724C",
                    share_desc: "HZ棋牌",
                    share_url: Config.URLS.h5GameUrl + "?serverid=" + Config.SERVER_ID + "&chl=" + Global.playerDto.channel,
                    share_img: Gzqd.getCurFolder() + "favicon.ico",
                });
            }
            Config.getGameActConfig();
            Config.getRechargeConfig();
            Config.getFirstChargeInfo();
            NativeBridge.loginFinish(Global.playerDto.id);
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_HAS_POCHAN_COUNT).send();
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_QITIAN_QIANDAO_INFO).send();
            Global.charge_conf.is_load = true;
            if (Config.debugLogin) {
                if (true) {
                    ROBOT.init();
                }
            }
        }, this);
    };
    return LoginScene;
}(BaseScene));
/**
 * 默认的状态,玩家还未登陆游戏的状态,在这个状态下,玩家可以点击登陆按钮进行登陆
 */
LoginScene.NORMAL = "normal";
/**
 * 等待资源加载和登陆服务器中的状态,这个状态中,会显示资源加载进度条
 */
LoginScene.PROGRESS = "progress";
__reflect(LoginScene.prototype, "LoginScene");
//# sourceMappingURL=LoginScene.js.map