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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
// 资源配置，您可以访问
// https://github.com/egret-labs/resourcemanager/tree/master/docs
// 了解更多细节 
var Main = Main_1 = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // public 
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin
        // })
        // egret.lifecycle.onPause = this.onBackground.bind(this)
        // egret.lifecycle.onResume = this.onForeground.bind(this)
        this.stage.addEventListener(egret.Event.ACTIVATE, this.onForeground, this);
        this.stage.addEventListener(egret.Event.DEACTIVATE, this.onBackground, this);
        // this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onOrientationChange, this);
        if (true) {
            if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                Utils.LogManage.init("HZDebugKey", "HZ", "http://www.hongzhegame.com/test/SaveLog.php");
            }
        }
        if (Config.debugLogin) {
            initDebugUsers();
        }
        Config.init();
        LocalDatas.init();
        nest.init();
        Main_1.instance = this;
        this.init();
        if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
            Gzqd.init(Config.WX_APPID);
        }
        this.addEventListener(egret.Event.RESIZE, this.onSizeChange, this);
        // nest.addShareCb(() => {
        //     if (net.getServerType() === net.SERVER_TYPE.GAME) {
        //         net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GET_FENXIANG).send();
        //     }
        // });
    };
    Main.prototype.onSizeChange = function () {
        Global.sWidth = this.stage.stageWidth;
        Global.sHeight = this.stage.stageHeight;
    };
    Main.prototype.onBackground = function (evt) {
        egret.log('Main-onBackground');
        var scene = SceneManager.curScene;
        if (egret.Capabilities.isMobile && scene && scene.onBackground) {
            scene.onBackground(evt);
        }
        // if (egret.Capabilities.isMobile) {
        // egret.ticker.pause();
        // }
    };
    Main.prototype.onForeground = function (evt) {
        egret.log('Main-onForeground');
        var scene = SceneManager.curScene;
        if (egret.Capabilities.isMobile && scene && scene.onBackground) {
            scene.onForeground(evt);
        }
        // if (egret.Capabilities.isMobile) {
        // egret.ticker.resume();
        // }
    };
    Main.prototype.onOrientationChange = function () {
        Global.sWidth = this.stage.stageWidth;
        Global.sHeight = this.stage.stageHeight;
        // var scene = Main.instance.getCurrentScene();
        // if (scene && scene.onOrientationChange) {
        //     scene.onOrientationChange();
        // }
    };
    // protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
    //     super.updateDisplayList(unscaledWidth, unscaledHeight);
    //     Global.sWidth = this.width;
    //     Global.sHeight = this.height;
    // }
    Main.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (egret.Capabilities.isMobile) {
                            this.stage.orientation = egret.OrientationMode.LANDSCAPE;
                        }
                        else {
                            this.stage.orientation = egret.OrientationMode.AUTO;
                            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                        }
                        Global.sWidth = this.width;
                        Global.sHeight = this.height;
                        SoundManage.init(); //初始化声音管理器
                        FrameManager.getInstance().init(this.stage); //初始化
                        net.init(); //初始化网络模块
                        return [4 /*yield*/, ResManager.init()];
                    case 1:
                        _a.sent(); //初始化资源管理器
                        return [4 /*yield*/, ConfigDefManager.init()];
                    case 2:
                        _a.sent(); //初始化常量配置资源管理器
                        if (Config.debugLogin) {
                            this.addChild(new Debug.TestLayer());
                        }
                        SceneManager.runScene(42 /* LOGIN */); //进入登陆页面
                        return [2 /*return*/];
                }
            });
        });
    };
    return Main;
}(eui.UILayer));
Main = Main_1 = __decorate([
    RES.mapConfig("config.json", function () { return "resource"; }, function (path) {
        var ext = path.substr(path.lastIndexOf(".") + 1);
        ext = ext.split("?")[0];
        var typeMap = {
            "jpg": "image",
            "png": "image",
            "webp": "image",
            "json": "json",
            "fnt": "font",
            "pvr": "pvr",
            "mp3": "sound",
            "bin": "bin",
            "dbmv": "bin"
        };
        var type = typeMap[ext];
        if (type == "json") {
            if (path.indexOf("sheet") >= 0) {
                type = "sheet";
            }
            else if (path.indexOf("movieclip") >= 0) {
                type = "movieclip";
            }
            ;
        }
        return type;
    })
], Main);
__reflect(Main.prototype, "Main");
var Main_1;
//# sourceMappingURL=Main.js.map