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

/**
 * 各个层级的深度
 */
const enum DEPTH {
    SCENE,

}
declare let MAP_CONFIG: string;
// 资源配置，您可以访问
// https://github.com/egret-labs/resourcemanager/tree/master/docs
// 了解更多细节 
@RES.mapConfig("config.json", () => "resource", path => {
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
    }
    var type = typeMap[ext];
    if (type == "json") {
        if (path.indexOf("sheet") >= 0) {
            type = "sheet";
        } else if (path.indexOf("movieclip") >= 0) {
            type = "movieclip";
        };
    }
    return type;
})
class Main extends eui.UILayer {
    public static instance: Main;
    // public 
    protected createChildren(): void {
        super.createChildren();

        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin
        // })

        // egret.lifecycle.onPause = this.onBackground.bind(this)

        // egret.lifecycle.onResume = this.onForeground.bind(this)
        this.stage.addEventListener(egret.Event.ACTIVATE, this.onForeground, this);
        this.stage.addEventListener(egret.Event.DEACTIVATE, this.onBackground, this);
        // this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onOrientationChange, this);
        if (DEBUG) {
            if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                Utils.LogManage.init("HZDebugKey", "HZ", "http://www.hongzhegame.com/test/SaveLog.php");
            }
        }
        if (Config.debugLogin) {
            initDebugUsers();
        }
        Config.init()
        LocalDatas.init();
        nest.init();
        Main.instance = this;
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
    }
    private onSizeChange() {
        Global.sWidth = this.stage.stageWidth;
        Global.sHeight = this.stage.stageHeight;
    }
    private onBackground(evt: egret.TouchEvent) {
        egret.log('Main-onBackground');
        var scene = SceneManager.curScene;
        if (egret.Capabilities.isMobile && scene && scene.onBackground) {
            scene.onBackground(evt);
        }
        // if (egret.Capabilities.isMobile) {
        // egret.ticker.pause();
        // }
    }
    private onForeground(evt: egret.TouchEvent) {
        egret.log('Main-onForeground');
        var scene = SceneManager.curScene;
        if (egret.Capabilities.isMobile && scene && scene.onBackground) {
            scene.onForeground(evt);
        }
        // if (egret.Capabilities.isMobile) {
        // egret.ticker.resume();
        // }
    }
    private onOrientationChange() {
        Global.sWidth = this.stage.stageWidth;
        Global.sHeight = this.stage.stageHeight;
        // var scene = Main.instance.getCurrentScene();
        // if (scene && scene.onOrientationChange) {
        //     scene.onOrientationChange();
        // }
    }
    // protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
    //     super.updateDisplayList(unscaledWidth, unscaledHeight);
    //     Global.sWidth = this.width;
    //     Global.sHeight = this.height;
    // }
    private async init() {
        if (egret.Capabilities.isMobile) {
            this.stage.orientation = egret.OrientationMode.LANDSCAPE;
        } else {
            this.stage.orientation = egret.OrientationMode.AUTO;
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        Global.sWidth = this.width;
        Global.sHeight = this.height;
        SoundManage.init();//初始化声音管理器
        FrameManager.getInstance().init(this.stage);//初始化
        net.init();//初始化网络模块
        await ResManager.init();//初始化资源管理器
        await ConfigDefManager.init();//初始化常量配置资源管理器
        if (Config.debugLogin) {
            this.addChild(new Debug.TestLayer());
        }
        SceneManager.runScene(GAME_ID.LOGIN);//进入登陆页面
    }
}
