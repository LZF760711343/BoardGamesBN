var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameUIBase = (function (_super) {
    __extends(GameUIBase, _super);
    function GameUIBase(num) {
        var _this = _super.call(this) || this;
        _this.num = num;
        return _this;
    }
    GameUIBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    GameUIBase.prototype.init = function (gameDatas, scene) {
        egret.log("init get daze");
        this.gameDatas = gameDatas;
        this._scene = scene;
        var self = this;
        var eg = egret;
        if (self._dissolveBtn) {
            self._dissolveBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openDissolveBtn, self);
        }
        if (self._rechargeBtn) {
            self._rechargeBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openRechange, self);
        }
        if (self._SetBtn) {
            self._SetBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openSetBtn, self);
        }
        if (self._chatBtn) {
            egret.log("GameUIBase add _chatBtn event");
            self._chatBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openchatBtn, self);
            //注册接收到对话事件，更新内容
            EventManager.register(TalkEvent.Talk, this.updataTalkContext, this, 11);
        }
        if (self._inviteBtn) {
            self._inviteBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openinviteBtn, self);
        }
        if (self._ruleBtn) {
            self._ruleBtn.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openruleBtn, self);
        }
        if (self._guajiBtn) {
            self._guajiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.OpenGuaJiBtn, self);
        }
        if (self._voiceBtn) {
            if (eg.Capabilities.runtimeType === eg.RuntimeType.WEB) {
                this._voiceBtn.visible = false;
            }
            else {
                self._voiceBtn.addEventListener(eg.TouchEvent.TOUCH_BEGIN, self.startRecord, self);
                self._voiceBtn.addEventListener(eg.TouchEvent.TOUCH_END, self.stopRecord, self);
                self._voiceBtn.addEventListener(eg.TouchEvent.TOUCH_RELEASE_OUTSIDE, self.stopRecordAndOutSide, self);
            }
        }
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
    };
    GameUIBase.prototype.openAppDownLayer = function () {
        new Layers.AppDownLoadLayer().open();
    };
    GameUIBase.prototype.openRechange = function () {
        new Layers.RechargeLayer(0).open();
    };
    /**
   * 开始录音
   */
    GameUIBase.prototype.startRecord = function () {
        egret.log("startRecord");
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            Toast.launch(GameLangs.record_not_suport_tip);
        }
        else if (UI.Recorder.instance.startRecord()) {
            this.addChild(UI.Recorder.instance);
        }
    };
    /**
     * 录音结束
     */
    GameUIBase.prototype.stopRecord = function () {
        egret.log("stopRecord");
        UI.Recorder.instance.stopRecord();
    };
    /**
     * 录音结束
     */
    GameUIBase.prototype.stopRecordAndOutSide = function () {
        egret.log("stopRecordAndOutSide");
        UI.Recorder.instance.stopRecord();
    };
    GameUIBase.prototype.openinviteBtn = function () {
    };
    GameUIBase.prototype.OpenGuaJiBtn = function () {
        net.SendMsg.create({ TuoGuanPlayerId: Global.playerDto.id }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_GUAJI_TYPE).send();
        // this._guajiBtn.visible = false;
    };
    GameUIBase.prototype.onTouchTap = function (event) {
        var target = event.target;
        if ((this.chatBox && this.chatBox.parent && this.chatBox.hitTestPoint(event.stageX, event.stageY))
            || this._chatBtn == target) {
            return;
        }
        if (this.chatBox && this.chatBox.parent) {
            this.openchatBtn();
        }
        // this.onAniBoxChange();
    };
    GameUIBase.prototype.on_G2C_CHAT = function (chatStr, playerId) {
        var sex = this._scene.getPlayerByIdSex(playerId);
        var zone = this._scene.getPlayerById(playerId);
        egret.log("playerIdplayerId" + playerId, "sex::" + sex, chatStr);
        // if (zone) {
        // 	zone.addMessage(chatStr, sex);
        // }
        if (zone) {
            //百人牛牛测试用：
            if (chatStr.indexOf('{') > -1 && (JSON.parse(chatStr))) {
                zone.addMessage(chatStr, sex);
                // if(playerId != Global.playerDto.id){
                var talkevent = new TalkEvent(TalkEvent.Talk);
                // let talkContext: any = JSON.parse(chatStr);
                var talkContext = JSON.parse(chatStr);
                talkContext.playerDto = this.gameDatas.playerDatas[talkContext.id].UserInfo;
                talkevent.data = talkContext;
                EventManager.dispatchEvent(talkevent);
            }
            else {
                zone.addMessage(chatStr, sex);
            }
        }
        else {
            //旁观玩家也能进行打字聊天
            if (chatStr.indexOf('{') > -1 && (JSON.parse(chatStr))) {
                var talkevent = new TalkEvent(TalkEvent.Talk);
                var talkContext = JSON.parse(chatStr);
                talkContext["playerDto"] = this.gameDatas.playerDatas[talkContext.id].UserInfo;
                talkevent.data = talkContext;
                EventManager.dispatchEvent(talkevent);
            }
        }
        return zone;
    };
    GameUIBase.prototype.openchatBtn = function (e) {
        if (e && e.data && e.data.text) {
        }
        if (this.chatBox) {
            if (this.chatBox.parent) {
                // if (!this._zoomButton.isShow) {
                this.parent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                // }
                this.removeChild(this.chatBox);
                return;
            }
            else {
                this.addChild(this.chatBox);
                this.chatBox.once("close", this.openchatBtn, this);
                this.parent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                if (GameUIBase.talkList.length >= 0) {
                    // this.chatBox.chatTalkBox.array = this.talkList;
                    this.chatBox.chatTalkBox.updataContext();
                }
            }
        }
        else {
            this.chatBox = new ChatBox(this.num);
            this.addChild(this.chatBox);
            this.chatBox.once("close", this.openchatBtn, this);
            this.parent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }
        // if (this.chatBox && !this._scene.getPlayerById(Global.playerDto.id)) {
        // 	egret.log("玩家不存在！" + this._scene.getPlayerById(Global.playerDto.id));
        // 	this.chatBox.tabBar.selectedIndex = 2;
        // 	this.chatBox.viewStack.selectedIndex = 2;
        // 	this.chatBox.tabBar.touchChildren = false;
        // 	this.chatBox.tabBar.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        // 		Toast.launch("旁观玩家只能进行打字聊天！");
        // 	}, this.chatBox.tabBar);
        // }
    };
    /**
     * 刷新解散房间(跟退出房间公用一个按钮)
     */
    GameUIBase.prototype.updateDissolveBtn = function () {
        egret.log("caonima");
        var gameDatas = this.gameDatas;
        if (this.gameDatas.gameType === 1 /* CARD */) {
            if (
            //如果自己是房主,那么一定可以解散房间
            gameDatas.getSelfPlayerDatas().zuoweiIndex === 0
                || (gameDatas.roomInfo.done_game_cnt !== 0 && gameDatas.isSelfPlayingGame())) {
                this._dissolveBtn.icon = "yc_icon_png";
                this._dissolveBtn.name = "dissolve";
            }
            else {
                this._dissolveBtn.icon = "tc_icon_png";
                this._dissolveBtn.name = "quit";
            }
        }
        else {
            this._dissolveBtn.icon = "tc_icon_png";
            this._dissolveBtn.name = "quit";
        }
    };
    GameUIBase.prototype.openDissolveBtn = function (event) {
        net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_LEAVE_SCORE_ROOM).send();
    };
    GameUIBase.prototype.openSetBtn = function (event) {
        new Layers.SettingLayer("game").open();
    };
    GameUIBase.prototype.openruleBtn = function (event) {
    };
    GameUIBase.prototype.updataTalkContext = function (event) {
        var context = event.data;
        GameUIBase.talkList.addItem(context);
    };
    /** 显示弹幕,暂时移到百人牛牛那里 */
    // private showDangmu(event:egret.Event){
    // 	let num = this._dangmuGroup.height / 33;
    // 	egret.log("group的高等平均数："+num);
    // 	//获取1 - n的随机数
    // 	let randomNum = Math.floor(Math.random() * num);
    // 	egret.log("随机数："+randomNum);
    // 	let data = event.data;
    // 	let img = data.playerDto.headImages?data.playerDto.headImages:"defaultHead_png";
    // 	let content = data.context;
    // 	let id = data.id;
    // 	let danmu = new UI.Danmu(img,content);
    // 	danmu.x = this._dangmuGroup.width;
    // 	danmu.y = danmu.height * randomNum;
    // 	this._dangmuGroup.addChild(danmu);
    // 	// danmu.startMove();
    // }
    GameUIBase.prototype.onExit = function () {
        if (this._chatBtn) {
            egret.log("GameUIBase removeChild");
            GameUIBase.talkList = null;
            GameUIBase.talkList = new eui.ArrayCollection();
            EventManager.remove(TalkEvent.Talk, this.updataTalkContext, this);
        }
    };
    return GameUIBase;
}(eui.Component));
/**
 * 聊天列表
 */
GameUIBase.talkList = new eui.ArrayCollection();
__reflect(GameUIBase.prototype, "GameUIBase");
//# sourceMappingURL=GameUIBase.js.map