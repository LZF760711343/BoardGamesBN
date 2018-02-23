var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var niuniu;
(function (niuniu) {
    var brnn;
    (function (brnn) {
        var GameUI = (function (_super) {
            __extends(GameUI, _super);
            function GameUI() {
                var _this = _super.call(this, 41 /* GAME_ID_HZ_BRNN */) || this;
                _this.isshow = true;
                _this.biaoqingCount = 0;
                // private sendStart:number = 0;
                //记录上次发表情的时间
                _this.sendEnd = 0;
                return _this;
            }
            GameUI.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                var self = this;
                // self.initdata();
                this._histroyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHistroyLayer, this);
                /**
                 * 规则点击事件
                 */
                this._ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRulesLayer, this);
                /**
                 * 钻石点击事件
                 */
                // this._diamondAddbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.opendiamondAddLayer, this);
                /**
                 * 玩家列表点击事件
                 */
                this._playGameLabelTabBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playGameLabelTabLayer, this);
                /**
                 * 金币点击事件
                 */
                // this._goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldAddLayer, this);
                // this._wangpng.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.openWanglistLayer, this);
                // this._wangpng.addEventListener(egret.TouchEvent.TOUCH_END, this.endWanglistLayer, this)
                // this._wangpng.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.endWanglistLayer, this)
                if (self._zoomButton._SetBtn) {
                    self._zoomButton._SetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openSetBtn, self);
                }
                if (self._zoomButton._dissolveBtn) {
                    self._zoomButton._dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openDissolveBtn, self);
                }
                // this._zoomButton._dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitGame, this);
                // this._zoomButton._SetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetBtn, this);
                if (self._dangmuGroup) {
                    EventManager.register("DanmuTalk", this.showDangmu, this);
                }
                if (this.parent)
                    this.parent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRuleGroup, this);
                // this._ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openRuleGroup,this);
            };
            GameUI.prototype.onExitGame = function () {
                net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_LEAVE_SCORE_ROOM).send();
            };
            GameUI.prototype.onSetBtn = function () {
                new Layers.SettingLayer("game").open();
            };
            GameUI.prototype.timerFunc = function () {
                // this._timeNow.text = new Date().Format("hh:mm");
            };
            GameUI.prototype.start = function () {
                this._play.play(0);
            };
            /**
           * 规则按钮方法
           */
            GameUI.prototype.openRulesLayer = function (event) {
                // egret.log("11111");
                // new Layers.RulesLayer().open();
                if (this._ruleInfo && this._ruleInfo.right === -233)
                    egret.Tween.get(this._ruleInfo).to({ right: 0 }, 2000);
                if (this._ruleInfo && this._ruleInfo.right === 0)
                    egret.Tween.get(this._ruleInfo).to({ right: -233 }, 2000);
            };
            /**
             * 钻石按钮方法
             */
            GameUI.prototype.opendiamondAddLayer = function (event) {
                new Layers.RechargeLayer(1).open();
            };
            GameUI.prototype.openDissolveBtn = function (event) {
                //如果自己这一局下注了,那么得等下局开始才给换桌
                if (this.gameDatas.selfInChipsList[0]) {
                    Toast.launch(GameLangs.gameNotOverTip2);
                    return;
                }
                net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_LEAVE_SCORE_ROOM).send();
            };
            /**
             * 玩家列表按钮方法
             */
            GameUI.prototype.playGameLabelTabLayer = function (event) {
                new niuniu.brnn.GameListLayer().open();
                net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_GET_IN_ROOM_PLAYERS).send();
            };
            /** 打开走势图 */
            GameUI.prototype.openHistroyLayer = function () {
                var layer = new Layers.HistroyBox();
                layer.open();
                layer.initialization(this.gameDatas.winRewardList);
            };
            /**
             * 金币按钮方法
             */
            GameUI.prototype.goldAddLayer = function (event) {
                new Layers.RechargeLayer(0).open();
            };
            GameUI.prototype.changeCHIPS = function (num) {
                // this._goldlabel.text = num + "";
            };
            GameUI.prototype.changejewel = function (num) {
                // this._diamondlabel.text = num + "";
            };
            GameUI.prototype.endWanglistLayer = function (event) {
                if (this.cpt != null) {
                    this.stage.removeChild(this.cpt);
                    this.cpt = null;
                }
            };
            GameUI.prototype.initdata = function () {
                var self = this;
                // self._diamondlabel.text = Global.playerDto.diamond + "";
                // self._goldlabel.text = Global.playerDto.gold + "";
                if (Global.playerDto.diamond > 100000) {
                }
                else {
                }
                if (Global.playerDto.gold > 100000) {
                }
                else {
                }
                // self._namelabel.text = Global.playerDto.nickName;
                // self._timeNow.text = new Date().Format("hh:mm");
            };
            GameUI.prototype.on_G2C_CHAT = function (chatStr, playerId) {
                var sex = this._scene.getPlayerByIdSex(playerId);
                var zone = this._scene.getPlayerById(playerId);
                // egret.log("playerIdplayerId" + playerId, "sex::" + sex, chatStr);
                // let type;
                // //非json数据，计算发表情的数量，目前限制只发表情了，这是为了记录发的是否是语音
                // if(!(chatStr.indexOf('{') > -1)){
                // 	let data = chatStr.split("@");
                // 	type = parseInt(data[0].substr(1, chatStr.length));
                // }
                if (zone) {
                    var talkContext = void 0;
                    if (chatStr.indexOf('{') > -1 && (JSON.parse(chatStr))) {
                        zone.addMessage(chatStr, sex);
                        var talkevent = new TalkEvent(TalkEvent.Talk);
                        talkContext = JSON.parse(chatStr);
                        talkContext.playerDto = this.gameDatas.playerDatas[talkContext.id].UserInfo;
                        talkevent.data = talkContext;
                        EventManager.dispatchEvent(talkevent);
                    }
                    else {
                        // talkContext = {id:playerId,context:chatStr,playerDto:this.gameDatas.playerDatas[playerId].UserInfo};
                        zone.addMessage(chatStr, sex);
                    }
                }
                else {
                    var talkContext = void 0;
                    //旁观玩家也能进行打字聊天
                    if (chatStr.indexOf('{') > -1 && (JSON.parse(chatStr))) {
                        var talkevent = new TalkEvent(TalkEvent.Talk);
                        talkContext = JSON.parse(chatStr);
                        talkContext["playerDto"] = this.gameDatas.playerDatas[talkContext.id].UserInfo;
                        talkevent.data = talkContext;
                        EventManager.dispatchEvent(talkevent);
                    }
                    else {
                        talkContext = { id: playerId, context: chatStr, playerDto: this.gameDatas.playerDatas[playerId].UserInfo };
                    }
                    //发出弹幕的事件
                    EventManager.createEventByName("DanmuTalk").dispatchEventWith("DanmuTalk", false, talkContext);
                }
                // egret.log("zone:"+zone);
                return zone;
            };
            /** 打开聊天面板，目前先限制发表情，日后需要在这里修改 */
            GameUI.prototype.openchatBtn = function (e) {
                _super.prototype.openchatBtn.call(this, e);
                //限制发表情
                if (this.chatBox /*&& !this._scene.getPlayerById(Global.playerDto.id)*/) {
                    egret.log("玩家不存在！" + this._scene.getPlayerById(Global.playerDto.id));
                    // this.chatBox.tabBar.visible = false;
                    this.chatBox.currentState = "brnn";
                    this.chatBox.tabBar.selectedIndex = 1;
                    this.chatBox.viewStack.selectedIndex = 1;
                    this.chatBox.tabBar.touchChildren = false;
                    this.chatBox.tabBar.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                        // Toast.launch("旁观玩家只能进行打字聊天！");
                        Toast.launch("玩家只能发表情！");
                    }, this.chatBox.tabBar);
                }
                //屏幕上一个人发的同屏表情不能超过三个
            };
            /** 显示弹幕 */
            GameUI.prototype.showDangmu = function (event) {
                var num = this._dangmuGroup.height / UI.Danmu.DAMUN_HEIGHT;
                // egret.log("group的高等平均数："+num);
                //获取1 - n的随机数
                var randomNum = Math.floor(Math.random() * num);
                // egret.log("随机数："+randomNum);
                var data = event.data;
                var img = data.playerDto.headImages ? data.playerDto.headImages : "defaultHead_png";
                var content = data.context;
                var id = data.id;
                // let danmu = new UI.Danmu(img,content,id);
                var danmu = UI.Danmu.create(img, content, id);
                danmu.x = this._dangmuGroup.width;
                danmu.y = danmu.height * randomNum;
                this._dangmuGroup.addChild(danmu);
                // danmu.startMove();
            };
            GameUI.prototype.sumGroupDanmuById = function (id) {
                var count = 0;
                for (var i = 0; i < this._dangmuGroup.numChildren; i++) {
                    var danmu = this._dangmuGroup.getChildAt(i);
                    var danmuId = danmu.danmuInfo.id;
                    if (id === danmuId) {
                        count++;
                    }
                }
                return count;
            };
            /**
             * 是否语音按钮显示，必须是王才有
             */
            GameUI.prototype.isShowVoiceBtn = function (isShow) {
                if (!this._voiceBtn) {
                    return;
                }
                //web下无论如何都是不显示的
                if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                    this._voiceBtn.visible = false;
                    return;
                }
                if (isShow)
                    this._voiceBtn.visible = true;
                else
                    this._voiceBtn.visible = false;
            };
            GameUI.prototype.closeRuleGroup = function () {
                if (this._ruleInfo.right >= 0)
                    egret.Tween.get(this._ruleInfo).to({ right: -233 }, 2000);
            };
            GameUI.prototype.onExit = function () {
                _super.prototype.onExit.call(this);
                //移除弹幕发送事件		
                if (this._dangmuGroup) {
                    EventManager.remove("DanmuTalk", this.showDangmu, this);
                }
            };
            return GameUI;
        }(GameUIBase));
        brnn.GameUI = GameUI;
        __reflect(GameUI.prototype, "niuniu.brnn.GameUI");
        var WanglistItem = (function (_super) {
            __extends(WanglistItem, _super);
            function WanglistItem() {
                var _this = _super.call(this) || this;
                _this.skinName = WangListItemSkin;
                return _this;
            }
            WanglistItem.prototype.dataChanged = function () {
                this._namelabel.text = this.data.nickName;
            };
            return WanglistItem;
        }(eui.ItemRenderer));
        __reflect(WanglistItem.prototype, "WanglistItem");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameUI.js.map