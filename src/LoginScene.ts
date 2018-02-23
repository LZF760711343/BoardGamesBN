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
class LoginScene extends BaseScene {
    private _loadTip: eui.Label;
    private _btnGroup: eui.Group;
    private _wxbtn: UI.CommonBtn;
    private _quickbtn: UI.CommonBtn;
    private _guestbtn: UI.CommonBtn;
    private _txtInput: eui.EditableText;


    private _headIcon: eui.Image;//用户头像
    private _GoldLabel: eui.Label;//金币
    private _Diamondlabel: eui.Label;//钻石
    private _nameLabel: eui.Label;//
    private _IDLabel: eui.Label;
    /**
     * 默认的状态,玩家还未登陆游戏的状态,在这个状态下,玩家可以点击登陆按钮进行登陆
     */
    public static NORMAL: string = "normal";
    /**
     * 等待资源加载和登陆服务器中的状态,这个状态中,会显示资源加载进度条
     */
    public static PROGRESS: string = "progress";

    // private _show: egret.tween.TweenGroup;//初始化动画
    // private _hidePassLogin: egret.tween.TweenGroup;//关闭密码登陆跟手机号码登陆页面的动画组
    // private _showPassLogin: egret.tween.TweenGroup;//打开密码登陆跟手机号码登陆页面的动画组
    // private _btnOpenPhoneBox: Skins.CommonBtn;//打开手机号码登陆页面
    // private _btnOpenPass: Skins.CommonBtn;//打开密码登陆页面
    // private _btnLoginByWx: Skins.CommonBtn;//通过微信登陆按钮
    // private _isPlayingAni: boolean;//当前是否在播放动画中
    // private _rect: eui.Rect;
    // private _btnLogin: Skins.CommonBtn;//密码登陆界面的登陆按钮
    // private _btnSendMsg: Skins.CommonBtn;//手机号登陆界面的获取短信动动态密码按钮
    // private _userInput: eui.TextInput;//用户名输入框
    // private _pwdInput: eui.TextInput;//密码输入框
    // private _numInput: eui.TextInput;//手机号输入框

    private _progressBar: eui.ProgressBar;//进度条
    private _resolve: any;
    public serverPromise: Promise<any>;
    private _curProgress: number = 0;
    private _targetProgress: number = 0;
    private index = 0;
    private _trackWidth: eui.Image;
    private _thumbLight: eui.Image;
    //private _BitemLogin: eui.BitmapLabel;
    private _BitemLogin: eui.Label;
    private _waitGroupName: string;;
    public constructor() {
        super();
        this.skinName = LoginSceneSkin;
        this.percentWidth = this.percentHeight = 100;
    }
    protected onExit() {
        super.onExit();
    }
    /**
     * 登陆界面的状态
     */
    public init(type: string) {

        if (type) {
            if (type === LoginScene.PROGRESS) {
                this.stopTimer();
                this._resolve = null;
            }
            this.currentState = type;
        }
        Layers.init(this.panelLayer || this);
        // Toast.init(this.tipLayer || this);
    }
    protected childrenCreated(): void {
        super.childrenCreated();
        this.currentState = LoginScene.NORMAL;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (Config.debugLogin) {
        } else {
            if (nest.isAutoLogin()) {
                this.onLoginByWx();
            }
            this._txtInput.visible = false;
        }
        nest.initGameFinish();


    }
    protected update() {
        // egret.log("update:", net.getServerType())
        if (this._curProgress === 1 && net.getServerType() === net.SERVER_TYPE.GAME) {//资源加载完成
            this.stopTimer();
            if (this._resolve) {
                this._resolve();
                this._waitGroupName = this._resolve = null;
            }
        }
        if (this._waitGroupName && ResManager.isGroupLoaded(this._waitGroupName)) {
            this._targetProgress = 1
        }
        if (net.getServerType() === net.SERVER_TYPE.GAME) {//游戏服务器成功登陆
            this._curProgress += 0.06;
        } else {
            this._curProgress += 0.001;
            if (this._curProgress > 0.9) {
                this._curProgress = 0.9;
            }
        }

        this._curProgress = this._curProgress > this._targetProgress ? this._targetProgress : this._curProgress;
        this._progressBar.value = 1034 * this._curProgress;
        // this._BitemLogin.text = "S(" + Math.round(this._curProgress * 100) + "%)";
        this._BitemLogin.text = Math.round(this._curProgress * 100) + "%";

    }
    /**
     * 等待服务器成功链接,并且资源加载完成,
     */
    public waitReady(groupName: string) {
        this.currentState = LoginScene.PROGRESS;
        this.startTimer(0);
        this._progressBar.value = 0;
        this._curProgress = 0;
        this._waitGroupName = groupName;
        return new Promise((resolve, reject) => {
            if (
                net.getServerType() == net.SERVER_TYPE.GAME &&
                this._curProgress === 1) {
                resolve();
            } else {
                this._resolve = resolve;
            }
        });
    }
    public onProgress(current: number, total: number) {
        this._targetProgress = current / total;
    }
    private onTouchTap(event: egret.TouchEvent) {
        switch (event.target) {
            case this._wxbtn:
                this.onLoginByWx();
                break;
        }
        SoundManage.playEffect1("btnClick");
    }
    public _testProgress: UI.ProgressBar;
    /**
     * 开始登陆到服务器
     */
    public loginServer() {
        this.startTimer(0);
        egret.log("loginServer")
        net.connectGameServer().catch(e => {
            let alert = Layers.HintLayer.create();
            alert.init({ tipsStr: GameLangs.coneectFail });
            alert.open();
            this.currentState = LoginScene.NORMAL;
            this.stopTimer();
        });
    }
    public loginSuccessCb(userInfo: nest.LoginInfo) {
        Global.playerDto.account = userInfo.loginKey;
        this.loginServer();
    }
    // 游客登录通道
    public async loginVisitor() {
        if (Global.upplayerid) {
            try {
                egret.log("游客登录通道", Config.SERVER_ID, Config.channel, Global.playerDto.id);
                let response = await Global.requestDataAsync((Config.URLS.VisitorsLoginUrl + "?serverid=$1&chl=$2&upplayerid=$3&aid=").format(Config.SERVER_ID, Config.channel, Global.upplayerid), {});
                alert(response);
                let data: { msg: number, account: string } = JSON.parse(response);
                Global.playerDto.account = data.account;
                this.loginServer();
                egret.log("游客登录通道" + data.account);
            } catch (error) {
                egret.log(error);
            }
        } else {
            this.loginServer();
        }

    }
    /**
     * 通过微信登录按钮回调
     */
    private onLoginByWx() {
        if (Config.debugLogin) {
            let index = 0;
            if (this._txtInput.text != '') {
                index = parseInt(this._txtInput.text);
            }
            if (Global.testUsers[index]) {
                Global.playerDto.nickName = Global.testUsers[index].nickName;
                Global.playerDto.account = Global.testUsers[index].account;
                Global.playerDto.sex = Global.testUsers[index].sex;
            } else {
                Global.playerDto.account = this._txtInput.text;
                Global.playerDto.nickName = (this._txtInput.text);
            }
            Global.playerDto.nickName = Base64.encode(Global.playerDto.nickName);
            this.loginVisitor();

        }
        else {
            nest.login(this.loginSuccessCb, this);
        }
        SceneManager.runScene(GAME_ID.SELECT, () => {
            if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                Gzqd.setShare({
                    share_title: `HZ棋牌`,
                    share_desc: "HZ棋牌",
                    share_url: Config.URLS.h5GameUrl + "?serverid=" + Config.SERVER_ID + "&chl=" + Global.playerDto.channel,
                    share_img: Gzqd.getCurFolder() + "favicon.ico",
                });
            }
            Config.getGameActConfig();
            Config.getRechargeConfig();
            Config.getFirstChargeInfo();
            NativeBridge.loginFinish(Global.playerDto.id);
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_HAS_POCHAN_COUNT).send();
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_QITIAN_QIANDAO_INFO).send();
            Global.charge_conf.is_load = true;
            if (Config.debugLogin) {
                if (DEBUG) {
                    ROBOT.init();
                }
            }
        }, this);
    }
}
