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
var niuniu;
(function (niuniu) {
    var brnn;
    (function (brnn) {
        // const maxHealth: number = 100000000;
        var GameScene = (function (_super) {
            __extends(GameScene, _super);
            function GameScene(args) {
                var _this = _super.call(this, args) || this;
                _this.delay = 0;
                _this.flytime = 0;
                _this.skinName = brnn.GameSceneSkin;
                return _this;
                // this._dealerCoinsBar.maximum = maxHealth;
            }
            GameScene.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                egret.log("childrenCreated!!!!!");
                this._chipsPools = [this._pool0, this._pool1, this._pool2, this._pool3];
                this._jxyaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jxYa, this);
                this.startTimer(1, 1000 / 24);
                // SoundManage.playMusic(SoundManage.keyMap.nn_bg);
                SoundManage.playMusic(SoundManage.keyMap.brnn_bg);
                // this._autoApplyBtn.addEventListener(egret.Event.CHANGE, this.onChangeAutoBtnChange, this);
                this.uiLayer.isShowVoiceBtn(this.gameDatas.isSelfKing);
                //为换桌按钮注册换桌事件
                if (this.uiLayer._huanZhouBtn) {
                    this.uiLayer._huanZhouBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
                }
            };
            GameScene.prototype.onChangeAutoBtnChange = function () {
                this.gameDatas.isAutoApplyDeal = this._autoApplyBtn.selected;
                if (this._autoApplyBtn.selected) {
                    this.msgHandler.autoApplyDeal();
                }
            };
            GameScene.prototype.update = function () {
                _super.prototype.update.call(this);
                if (this.uiLayer) {
                    this.uiLayer.timerFunc();
                }
            };
            /**
             * 换桌按钮回调
             */
            GameScene.prototype.onChangeDesk = function () {
                //如果自己这一局下注了,那么得等下局开始才给换桌
                if (this.gameDatas.selfInChipsList[0]) {
                    Toast.launch(GameLangs.gameNotOverTip);
                    return;
                }
                _super.prototype.onChangeDesk.call(this);
            };
            /**
             * 初始化筹码按钮组的数据
             */
            GameScene.prototype.initChipsBtns = function () {
                var arrLen = this.gameDatas.brnnRoomInfo.createinfo.betChips.length;
                // egret.log("arrLen", arrLen);
                for (var i = 0; i < arrLen; i++) {
                    var btn = this._chipGroup.getChildAt(i);
                    btn.value = this.gameDatas.brnnRoomInfo.createinfo.betChips[i];
                }
            };
            /** 初始化走势图UI的信息 */
            GameScene.prototype.initHistroyListUI = function () {
                this.gameDatas.winRewardList = this.gameDatas.brnnRoomInfo.winRewardList.reverse();
                for (; this.gameDatas.winRewardList.length > 9;) {
                    this.gameDatas.winRewardList.pop();
                }
            };
            /** 更新走势图UI的信息 */
            GameScene.prototype.updateHistroyListUI = function (winRewardList) {
                this.gameDatas.winRewardList.unshift(winRewardList);
                for (; this.gameDatas.winRewardList.length > 9;) {
                    this.gameDatas.winRewardList.pop();
                }
                //实时更新正在打开走势图面板的信息
                // EventManager.createEventByName("UPDATE_HISTROYLIST").dispatchEventWith("UPDATE_HISTROYLIST",false,this.gameDatas.winRewardList);
            };
            GameScene.prototype.reset = function () {
                this.updatePlayerInfo();
                this.updateMyPlayerInfor();
                this.gameDatas.reset();
                this._jxyaBtn.enabled = true;
                this.updateChipGroupUI();
                var arrLen = this._chipsPools.length;
                for (var i = 0; i < arrLen; i++) {
                    this._chipsPools[i].reset();
                    this._chipsPools[i].HideCard();
                }
                this._handCardBox.reset();
                // this._disBox.visible = false;
                this.HideCard();
                this.resetChipCountPgb();
            };
            /**
         * 初始化一些游戏数据
         */
            GameScene.prototype.initDatas = function (datas) {
                var gameDatas = this.gameDatas = new brnn.GameDatas();
                gameDatas.brnnRoomInfo = datas;
                this.gameDatas.zhaungMoney = this.gameDatas.brnnRoomInfo.sumChips;
                this.gameDatas.updateKingInfo();
            };
            /**
             * 初始化
             */
            GameScene.prototype.init = function () {
                egret.log("initGame!!!!!");
                this.initUI(); //先初始化ui
                this.msgHandler = new brnn.GameMsgHandler(this, this.gameDatas); //创建游戏的消息派发器
                //下一帧才开始派发消息,因为有一些UI的数据在当前帧拿到的是不正确的
                net.dispatchMsg();
                // this.msgHandler.sendSitDownMsg();
                // FrameManager.getInstance().addFrame(net.dispatchMsg, net, 0, 1);
                // this.updateWangList();
            };
            /**
             * 更新坐下状态UI
             */
            GameScene.prototype.setIsSitDown = function () {
                // egret.log("IsSitDown:", this.gameDatas.isSitDown)
                var arrLen = this._chipsPools.length;
                this.gameDatas.isSitDown = this.gameDatas.weizhi > -1;
                for (var i = 0; i < arrLen; i++) {
                    this._chipsPools[i].setIsSitDown(this.gameDatas.isSitDown);
                }
                // this._btnBar.visible = !this.gameDatas.isSitDown;
            };
            GameScene.prototype.initUI = function () {
                _super.prototype.initUI.call(this);
                egret.log("initUI!!!!!");
                var self = this;
                var eg = egret;
                self.uiLayer.gameDatas = self.gameDatas;
                self.initChipsBtns();
                self._chipRadioButtonGroup = self._chipGroup.getChildAt(0).group;
                var arrLen = self._chipsPools.length;
                self.players = [];
                for (var i = 0; i < 8; ++i) {
                    var player = self["_player" + i];
                    self.players[i] = player;
                    player.visible = !i;
                    player._roleId.source = "role_$1_png".format(i + 1);
                    player.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
                }
                //将庄家玩家面板也添加进players中
                if (self["_playerZhuang"]) {
                    self.players[self.players.length] = self["_playerZhuang"];
                }
                this._handCardBox.disBox = this._disBox;
                this._player8.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
                // this._playerZhuang._headBox.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
                for (var i = 0; i < arrLen; i++) {
                    self._chipsPools[i].reset();
                    self._chipsPools[i].zuowei = i + 1;
                }
                if (self.gameDatas.gameType == 1 /* CARD */) {
                    self.text_level.visible = false;
                }
                self.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onTouchTap, self);
                //添加倒计时回调
                self._countDown.addCompleteFunc(self.countDownComplete, self);
                if (self.gameDatas.brnnRoomInfo.wangNameList.length) {
                    self._tipBar.curState = brnn.TipBarStatu.WAIT;
                }
                else {
                    self._tipBar.curState = brnn.TipBarStatu.WAIT_KING;
                }
                this.initHistroyListUI();
                this.updateChipGroupUI();
                //因为列表是空的所以报错了
                // egret.log("this.gameDatas.brnnRoomInfo.wangNameList[0].playerId", this.gameDatas.brnnRoomInfo.wangNameList[0].playerId);
                if (this.gameDatas.brnnRoomInfo.wangNameList[0])
                    this.updataKingHead();
                this._roomId.text = GameLangs.gameRoomId.format(this.gameDatas.brnnRoomInfo.roomId);
            };
            //更新玩家信息 自己
            GameScene.prototype.updateMyPlayerInfor = function () {
                var myInfo = this.gameDatas.playerDatas[this.gameDatas.myPlyerId];
                this._player8.updateChips(myInfo.chips, false);
                this._player8.updateInfo(myInfo.UserInfo);
            };
            GameScene.prototype.updateMyPlayerInfor1 = function () {
                this._player8.updateChips(Global.playerDto.gold, false);
            };
            GameScene.prototype.updateMyPlayerInfor2 = function (id) {
                var player = this.getPlayerById(id);
                if (player) {
                    player.updateChips(this.gameDatas.playerDatas[id].chips);
                }
            };
            //更新玩家信息
            GameScene.prototype.updatePlayerInfo = function () {
                var list = this.gameDatas.getMaxGoldPalyerId();
                for (var i = 0; i < 8; i++) {
                    if (list[i]) {
                        var player = this.players[i];
                        player.visible = true;
                        var info = this.gameDatas.playerDatas[list[i]];
                        if (info) {
                            if (info.playerFlags !== -1 && info.playerFlags & 0x1) {
                                player.setOffTip();
                            }
                            else {
                                player.removeOffTip();
                                info.playerFlags = (info.playerFlags >> 1) << 1;
                            }
                            player.updateChips(info.chips, false);
                            player.updateInfo(info.UserInfo);
                        }
                    }
                    else {
                        this.players[i].visible = false;
                    }
                }
                this.updataKingHead();
                this.updateMyPlayerInfor();
            };
            /**
             * 更新申请当王按钮UI
             * 如果还不是王,显示申请当王
             * 如果已经是王了,则显示退位让贤
             */
            GameScene.prototype.updateKingBtn = function () {
                // this._applyBtn.icon = this.gameDatas.isSelfKing ? "brnn_twrx_png" : "sqdw_text1_png";
                this._applyBtn.icon = this.gameDatas.isSelfKing ? "twrx_text_png" : "sqsz_hztext_png";
                // this._applyBtn.label = this.gameDatas.isSelfKing ? "退位让贤" : "申请当庄";
            };
            GameScene.prototype.updataKingHead = function () {
                if (this.gameDatas.brnnRoomInfo.wangNameList[0]) {
                    var id = this.gameDatas.brnnRoomInfo.wangNameList[0].playerId;
                    if (this.gameDatas.playerDatas[id]) {
                        var Info = this.gameDatas.playerDatas[id];
                        // egret.log("Info1111", Info);
                        Info.UserInfo.gold = Info.chips;
                        // this._playerZhuang.updateChips(Info.chips, false);
                        this._playerZhuang.updateInfo(Info.UserInfo);
                        this._zhuangChipGroup.visible = true;
                        if (Info.chips > 100000) {
                            this._chipsLb.text = Math.floor(Info.chips / 10000) + GameLangs.wan;
                        }
                        else {
                            this._chipsLb.text = Info.chips + "";
                        }
                    }
                }
                else {
                    // this._playerZhuang._headBox.setIcon(DEFAULT_HEAD_IMG);
                    this._playerZhuang._headBox.setIcon("");
                    this._playerZhuang._nameLb.text = "";
                    this._playerZhuang.playerId = 0; //暂时给个不存在的id置空玩家面板
                    this._zhuangChipGroup.visible = false;
                }
            };
            //倒计时完毕
            GameScene.prototype.countDownComplete = function () {
                this._countDown.visible = false;
            };
            /**
             * 刷新下注筹码按钮组的UI,
             * 玩家等级低于XX或游戏场次少于XX（可配置）时，应把部分面额锁住，不能选择。达到条件自动解锁。
             * 玩家所能下柱的最大上限金额=背包金币数/10（可配置）. 当上限金额小于下注面额时，则次面额变灰。
             */
            GameScene.prototype.updateChipGroupUI = function () {
                //最大可下注额
                var maxBetCount = (Global.playerDto.gold + this.gameDatas.selfInChipsList[0]) / 10;
                //庄家剩下的可下注额度(破水翻一倍)
                var delearLeftCaNBetCount = this.gameDatas.zhaungMoney * 0.2 - this.gameDatas.sumInChipsList[0];
                //剩下的可下注的额度
                var leftCanBetCount = maxBetCount - this.gameDatas.selfInChipsList[0];
                for (var i = this.gameDatas.brnnRoomInfo.createinfo.betChips.length - 1; i >= 0; i--) {
                    var btn = this._chipGroup.getChildAt(i);
                    // || btn.value > delearLeftCaNBetCount
                    if (btn.value > leftCanBetCount || btn.value > delearLeftCaNBetCount) {
                        btn.enabled = false;
                        if (btn.selected && i != 0) {
                            var preBtn = this._chipGroup.getChildAt(i - 1);
                            btn.selected = false;
                            preBtn.selected = true;
                        }
                    }
                    else {
                        btn.enabled = true;
                    }
                }
            };
            /**
             * 点击筹码池的回调
             */
            GameScene.prototype.onBet = function (target) {
                if (this.gameDatas.gameStatus == 4 /* TOU_ZHU */) {
                    if (!this.gameDatas.goDoDettian) {
                        this.gameDatas.playerGoDetain.bets = [0, 0, 0, 0, 0];
                        this.gameDatas.goDoDettian = true;
                    }
                    this.gameDatas.playerGoDetain.bets[target.zuowei] += this._chipRadioButtonGroup.selection.value;
                    this.msgHandler.sendBetMsg(this._chipRadioButtonGroup.selection.value, target.zuowei);
                }
            };
            /** 续押 */
            GameScene.prototype.jxYa = function () {
                if (this.gameDatas.gameStatus == 4 /* TOU_ZHU */) {
                    var bets = this.gameDatas.playerGoDetain.bets;
                    var isShowTip = true;
                    var arrLen = bets.length;
                    //筹码列表
                    var betChips = this.gameDatas.brnnRoomInfo.createinfo.betChips;
                    var len = betChips.length - 1;
                    for (var i = 0; i < arrLen; i++) {
                        var count = bets[i];
                        for (var j = len; j >= 0;) {
                            if (count >= betChips[j]) {
                                this.msgHandler.sendBetMsg(betChips[j], i);
                                count -= betChips[j];
                                isShowTip = false;
                            }
                            else {
                                j--;
                            }
                        }
                    }
                    if (isShowTip) {
                        Toast.launch(GameLangs.notBetTip);
                    }
                    else {
                        this.gameDatas.playerGoDetain.curCount++;
                    }
                    if (this.gameDatas.playerGoDetain.curCount == this.gameDatas.playerGoDetain.maxCount) {
                        this._jxyaBtn.enabled = false;
                    }
                }
                else {
                    Toast.launch(GameLangs.notBetTimeTip);
                }
            };
            /**
             * 弹出提示换桌的弹窗
             * @param str:要提示的内容
             */
            GameScene.prototype.showChangeDeskTip = function (str) {
                var alert = Layers.HintLayer.create();
                alert.init({
                    curState: Layers.HintLayer.SURE_CANNEL2,
                    leftBtnBg: "orange_icon_png",
                    rightBtnBg: "red_icon1_png",
                    rightBtnIcon: "huanzhuo_text1_png",
                    rightFunc: this.msgHandler.sendChangeDeskMsg,
                    rightThisObj: this.msgHandler,
                    tipsStr: str
                });
                alert.open();
            };
            /**
             * 检查是否已经坐下,如果坐下了就执行func函数,否则发送坐下的消息给服务器
             * @param func:如果已经坐下要执行的函数
             * @param thisObj:this执行的对象
             * @param 坐下后是否要检查当前有没有当王的玩家,如果没有人当王的话,弹出询问玩家是否换桌的弹窗
             */
            GameScene.prototype.checkIsDown = function (func, thisObj, isCheckKing) {
                // egret.log("this.gameDatas.isSitDown:", this.gameDatas.isSitDown)
                if (this.gameDatas.isSitDown) {
                    if (isCheckKing && this.gameDatas.brnnRoomInfo.wangNameList.length === 0) {
                        this.showChangeDeskTip(GameLangs.notKingTip);
                    }
                    else {
                        func.call(this, thisObj);
                    }
                }
                else {
                    this.msgHandler.sendSitDownMsg();
                }
            };
            GameScene.prototype.onTouchTap = function (event) {
                var target = event.target;
                if (target instanceof brnn.ChipsPool) {
                    this.onBet(target);
                    return;
                }
                if (target === this._applyBtn) {
                    // if (this.gameDatas.isSelfKing) {//如果自己已经上庄的,就发送下庄消息
                    this.msgHandler.sendShenQingList();
                    var layer = new Layers.ShenQingListLayer();
                    // layer.init();
                    // layer.init(this.gameDatas.shenqingShangzhuangList);
                    layer.open();
                }
                else if (target === this._playerZhuang) {
                    if (event.localX <= (this._playerZhuang.width / 3)) {
                        this.msgHandler.sendShenQingList();
                        var layer = new Layers.ShenQingListLayer();
                        layer.open();
                    }
                    else {
                        this.openUserInfoLayer(null, this._playerZhuang);
                    }
                }
                // if (target === this._autoApplyBtn) {//自动上庄按钮
                //     this.checkIsDown(this.onChangeAutoBtnChange, target);
                // }
                // if(target ==== th
            };
            GameScene.prototype.openWangList = function (data) {
                var layers = Layers.getLayer(Layers.ShenQingListLayer);
                var names = [];
                var arrLen = data.length;
                for (var i = 0; i < arrLen; i++) {
                    var playData = this.gameDatas.playerDatas[data[i]];
                    if (playData) {
                        var name_1 = playData.UserInfo.nickName;
                        if (name_1.length > 7) {
                            name_1 = name_1.substring(0, 7) + "...";
                        }
                        names.push(name_1);
                    }
                    else {
                        names.push("");
                    }
                }
                if (layers) {
                    // layers.init(data, this.gameDatas.isSelfKing);
                    layers.init(names, this.gameDatas.isSelfKing);
                }
            };
            GameScene.prototype.doDaJiDaLiAni = function () {
                SoundManage.playEffect("brnn_jiesuan");
                return this.effectLayer.playAuiAsync1("dajidali");
            };
            /**
                * 播放添加一个筹码的动画
                * @param index:筹码池的位置
                * @param chips:下注的额度
                * @param isSelf:是否自己下注的
                */
            GameScene.prototype.addChipAni = function (index, chips, id, type) {
                var chipsId = this.gameDatas.brnnRoomInfo.createinfo.betChips.indexOf(chips) + 1;
                // egret.log("betChips:",this.gameDatas.brnnRoomInfo.createinfo.betChips);
                // egret.log("chipsId:", chipsId);
                // this._chipsPools[index - 1].addChipAni(chipsId);
                var i = 0;
                for (i = 0; i < 8; i++) {
                    if (id == this.players[i].playerId) {
                        var payer = this.players[i];
                        break;
                    }
                }
                if (payer)
                    this._chipsPools[index - 1].addChipAni(payer, type, chipsId, chips, i);
                else {
                    this._chipsPools[index - 1].addChipAni(this.uiLayer._playGameLabelTabBtn, type, chipsId, chips, i);
                }
            };
            // public GetPlayerPosByID(playerID: number): number {
            //     for (var i = 0; i < 4; i++) {
            //         if (playerID == this.players[i].playerId) {
            //             return i;
            //         }
            //     }
            //     ret urn -1;
            // }
            /**
             * 播放添加一个筹码的玩家动画
             */
            GameScene.prototype.addChipPlayAui = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    var player;
                    return __generator(this, function (_a) {
                        player = this.getPlayerById(id);
                        if (player) {
                            // player.updateInfo(id.UserInfo);
                            player.start(player.name);
                        }
                        else {
                            //如果投的筹码时场外玩家，也抖动一下场外玩家框
                            this.uiLayer.start();
                        }
                        return [2 /*return*/];
                    });
                });
            };
            /**
             * 开始倒计时
             */
            GameScene.prototype.startCountDown = function (count) {
                if (this.gameDatas.gameStatus === 4 /* TOU_ZHU */ || this.gameDatas.gameStatus === 2 /* START */) {
                    this._countDown.visible = true;
                    var curTime = Math.ceil(count / 1000);
                    this._countDown.startTimer(curTime);
                }
                if (this.gameDatas.gameStatus === 5 /* SHOW_ME */) {
                    this._countDown.visible = false;
                }
            };
            /**
            * 刷新庄家血条
            */
            GameScene.prototype.UpdateHealth = function () {
            };
            GameScene.prototype._changeCHIPS = function (num) {
                this.uiLayer.changeCHIPS(num);
                // new GameUI().changeCHIPS(num);
            };
            GameScene.prototype._changejewel = function (num) {
                this.uiLayer.changejewel(num);
            };
            /**
             * 修改游戏当前状态
             */
            GameScene.prototype.changeStage = function () {
                var self = this;
                true && egret.log("当前状态:", self.gameDatas.gameStatus);
                switch (self.gameDatas.gameStatus) {
                    case 1 /* PRE_START */:
                        self._chipGroup.visible = !self.gameDatas.isSelfKing;
                        self._qddImg.visible = false;
                        self._zhunbeiImg.visible = false;
                        //闪光动画停止
                        this._shanguang.visible = false;
                        this._shanguang.curState = brnn.SGStatu.NONE;
                        for (var i = 0; i < this._chipsPools.length; i++) {
                            this._chipsPools[i]._shangguang.visible = false;
                            this._chipsPools[i]._shangguang.curState = brnn.SCPSStatu.NONE;
                        }
                        self.reset();
                        self._yazhuImg.visible = false;
                        break;
                    case 4 /* TOU_ZHU */:
                        if (!this.gameDatas.isReconnect) {
                            this.startGame();
                        }
                        this.gameDatas.isReconnect = true;
                        self._chipGroup.visible = !self.gameDatas.isSelfKing;
                        self._yazhuImg.visible = true;
                        self._chipCountPgb.visible = true;
                        self._zhunbeiImg.visible = false;
                        SoundManage.playEffect("nn_jetton", 0.8);
                        break;
                    case 6 /* SHOW_ALL */:
                        self._chipGroup.visible = !self.gameDatas.isSelfKing;
                        self._cuopai.visible = false;
                        self._cuopai.curState = brnn.CuoPaiStatu.NONE;
                        self._yazhuImg.visible = false;
                        break;
                    case 5 /* SHOW_ME */:
                        self._yazhuImg.visible = false;
                        self._chipCountPgb.visible = false;
                        break;
                    case 2 /* START */:
                        self._zhunbeiImg.visible = true;
                        self._chipGroup.visible = !self.gameDatas.isSelfKing;
                        if (self.gameDatas.gameStatus != self.gameDatas.lastGameStatus) {
                            SoundManage.playEffect("brnn_zhunbei", 0.8);
                        }
                        break;
                }
                // self._dealerCoinsBar.value = self.gameDatas.zhaungMoney > maxHealth ? maxHealth : self.gameDatas.zhaungMoney;
            };
            GameScene.prototype.startGame = function () {
                this.effectLayer.playAuiAsync("start");
                ;
            };
            /**
             * 申请当庄按钮
             */
            GameScene.prototype.onApplyDealer = function () {
                if (this.gameDatas.isSelfKing) {
                    this.msgHandler.sendAskXiazhuang();
                }
                else {
                    this.msgHandler.sendAskShangzhuang();
                }
            };
            GameScene.prototype.dealCardById = function (delay, cards, handvalue, callBack, target) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (this.gameDatas.isSelfKing) {
                            return [2 /*return*/, this._handCardBox.dealAni(delay, cards, handvalue, callBack, target)];
                        }
                        return [2 /*return*/];
                    });
                });
            };
            GameScene.prototype.addCard = function (cardValue, callBack, target) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (this.gameDatas.isSelfKing) {
                            return [2 /*return*/, this._handCardBox.addCardAni(cardValue, callBack, target)];
                        }
                        return [2 /*return*/];
                    });
                });
            };
            /**
             * 发牌动画跟搓牌动画
             */
            GameScene.prototype.doSendCardAui = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var arrLen, list, waitTime, j, cardValue, cuopai;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                arrLen = this._chipsPools.length;
                                list = data.list;
                                waitTime = 0;
                                this._disBox.visible =
                                    this._chipsPools[0]._disBox.visible =
                                        this._chipsPools[1]._disBox.visible =
                                            this._chipsPools[2]._disBox.visible =
                                                this._chipsPools[3]._disBox.visible =
                                                    true;
                                j = 0;
                                _a.label = 1;
                            case 1:
                                if (!(j < 5)) return [3 /*break*/, 8];
                                return [4 /*yield*/, this._chipsPools[0].PlaySendCardAni(this.effectLayer, j, list[1].cardsInfo.cards[j], j != 3)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, this._chipsPools[1].PlaySendCardAni(this.effectLayer, j, list[2].cardsInfo.cards[j], j != 3)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, this._chipsPools[2].PlaySendCardAni(this.effectLayer, j, list[3].cardsInfo.cards[j], j != 3)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, this._chipsPools[3].PlaySendCardAni(this.effectLayer, j, list[4].cardsInfo.cards[j], j != 3)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, this._disBox.PlaySendCardAni(this.effectLayer, j, list[0].cardsInfo.cards[j], j != 3)];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7:
                                j++;
                                return [3 /*break*/, 1];
                            case 8:
                                //如果自己是庄家,加上搓牌动画
                                if (this.gameDatas.isSelfKing) {
                                    this.wait(1000); //给点时间看牌
                                    cardValue = data.list[0].cardsInfo.cards[3];
                                    cuopai = new niuniu.CuoPaiAni();
                                    cuopai.name = "sprite1";
                                    this.addChild(cuopai);
                                    cuopai.PlayCuoPai(cardValue, this.cuopaiFinish, this);
                                }
                                else {
                                    this._cuopai.visible = true;
                                    this._cuopai.curState = brnn.CuoPaiStatu.WAIT;
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            };
            GameScene.prototype.cuopaiFinish = function () {
                this.msgHandler.sendShowMsg();
            };
            GameScene.prototype.HideCard = function () {
                this._disBox.HideCard();
            };
            /**
             * 播放结束动画
             */
            GameScene.prototype.doGameOverAni = function (callBack, target) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var arrLen, list, i, i, handType, i, i, i, i, gameResult, player, threeArr, arrayList;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                arrLen = this._chipsPools.length;
                                SoundManage.playEffect("brnn_kaipai", 0.8);
                                list = this.gameDatas.gameOverDatas.list;
                                for (i = 0; i < arrLen; i++) {
                                    if (list[i + 1].chipsPoolInfo) {
                                        //更新下注信息框里面小结的label
                                        this._chipsPools[i].updateAccountChipsLb(list[i + 1].chipsPoolInfo.win_chips);
                                    }
                                }
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < arrLen)) return [3 /*break*/, 4];
                                return [4 /*yield*/, this._chipsPools[i].doShowCardAni(list[i + 1], this.gameDatas.selfInChipsList[i + 1] ? this.gameDatas.selfInChipsList[i + 1] : 0)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                i++;
                                return [3 /*break*/, 1];
                            case 4: 
                            //播放庄家开牌动画
                            return [4 /*yield*/, this._disBox.doShowCardAni(list[0])];
                            case 5:
                                //播放庄家开牌动画
                                _a.sent();
                                this.updateHistroyListUI(this.gameDatas.brnWinResult);
                                handType = this.calHandValue(list[0].cardsInfo.handValue);
                                if (!(handType >= 3 && handType <= 11)) return [3 /*break*/, 7];
                                return [4 /*yield*/, this.doDaJiDaLiAni()];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7: 
                            /** 上局大赢家 */
                            //稍微停顿一下
                            return [4 /*yield*/, this.wait(500)];
                            case 8:
                                /** 上局大赢家 */
                                //稍微停顿一下
                                _a.sent();
                                //开完牌后，发送显示输赢结果的信息
                                for (i = 0; i < arrLen; i++) {
                                    this._chipsPools[i]._disBox.settTypeIconVisible(true);
                                }
                                //播放赢的筹码池闪动动画
                                for (i = 0; i < arrLen; i++) {
                                    this._chipsPools[i].playChisAui(this.gameDatas.brnWinResult[i]);
                                }
                                SoundManage.playEffect("brnn_jiesuan");
                                //回收所有筹码
                                for (i = 0; i < arrLen; i++) {
                                    //输赢结果,输赢倍率
                                    this._chipsPools[i].PlayFlyChip(this.gameDatas.brnWinResult[i], this.gameDatas.gameOverDatas.list[i + 1].cardsInfo.rewardRate);
                                }
                                //播放玩家面板飘字结算动画
                                for (i = 0; i < this.gameDatas.hzBrNnMsgList.length; i++) {
                                    gameResult = this.gameDatas.hzBrNnMsgList[i];
                                    player = this.getPlayerById(gameResult.playerId);
                                    if (player) {
                                        if (gameResult.roundWinChips) {
                                            player.doEndAni(gameResult.roundWinChips);
                                        }
                                    }
                                    if (gameResult.roundWinChips && gameResult.playerId == this._player8.playerId)
                                        this._player8.doEndAni(gameResult.roundWinChips);
                                }
                                // egret.setTimeout(() => {
                                //     let lll;
                                //     lll.k;
                                // }, this, 100)
                                //播放庄家闪光动画
                                //如果庄家赢了，播放庄家动画
                                // egret.log("this.gameDatas.brnWinResult[this.gameDatas.brnWinResult.length-1]", this.gameDatas.brnWinResult[this.gameDatas.brnWinResult.length - 1]);
                                if (!this.gameDatas.brnWinResult[4]) {
                                    this._shanguang.visible = true;
                                    this._shanguang.curState = brnn.SGStatu.WIN;
                                }
                                //在这里更新走势图
                                //实时更新正在打开走势图面板的信息
                                EventManager.createEventByName("UPDATE_HISTROYLIST").dispatchEventWith("UPDATE_HISTROYLIST", false, this.gameDatas.winRewardList);
                                //显示上局大赢家面板
                                this._winerInfoGroup.visible = true;
                                threeArr = this.getWinerList();
                                arrayList = new eui.ArrayCollection(threeArr);
                                this._winerList.dataProvider = arrayList;
                                //播放面板出现动画
                                egret.Tween.get(this._winerInfoGroup).wait(1000).to({ y: 0 }, 1000).wait(4000).to({ y: -156 }, 1000).call(function () {
                                    _this._winerInfoGroup.visible = false;
                                    _this._winerList.dataProvider = null;
                                });
                                this._tipBar.curState = brnn.TipBarStatu.ACCOUNT;
                                this._tipBar.setMoney(this.gameDatas.gameOverDatas.calInfo ? this.gameDatas.gameOverDatas.calInfo.roundWinChips : 0);
                                return [4 /*yield*/, this.wait(2000)];
                            case 9:
                                _a.sent();
                                if (Global.playerDto.gold < GameLangs.createRoomConf[8 /* BRNN */][this.gameDatas.brnnRoomInfo.roomLevel].gold) {
                                    if (Global.panduanJoinRoom(Global.playerDto.gold, this.gameDatas.brnnRoomInfo.roomLevel, 8 /* BRNN */) == false) {
                                        this.updateChipGroupUI();
                                    }
                                }
                                ;
                                this.msgHandler.doAllowHandleMsg();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * 判断该id是否是王
             */
            GameScene.prototype.isWang = function (id) {
                var j = 0;
                if (this.gameDatas.brnnRoomInfo.wangNameList[j] && id === this.gameDatas.brnnRoomInfo.wangNameList[j].playerId) {
                    //是王
                    return true;
                }
                return false; //不是王
            };
            //-- 计算牌形
            GameScene.prototype.calHandValue = function (handvalue) {
                var handType = (handvalue >> 12) & 0xf;
                if (handType == 2 /* NIUX */) {
                    var value = (handvalue >> 8) & 0xf;
                    handType = handType + "" + value;
                }
                return handType;
            };
            /**
             * 刷新筹码池的信息
             */
            GameScene.prototype.updateChipsPools = function () {
                var arrLen = this.gameDatas.sumInChipsList.length;
                for (var i = 0; i < 4; i++) {
                    var pool = this._chipsPools[i];
                    //更新这个筹码池自己的下注的筹码
                    // pool.updateAllChipsLb(this.gameDatas.sumInChipsList[i + 1]);
                    // //更新这个筹码池总的下注的筹码
                    // pool.updateSelfChipsLb(this.gameDatas.selfInChipsList[i + 1]);
                    pool.updataChipsLb(this.gameDatas.selfInChipsList[i + 1], this.gameDatas.sumInChipsList[i + 1]);
                }
            };
            /**
             * 点击加入按钮回调
             */
            GameScene.prototype.onJoinGame = function () {
                // createRoomConf
                // egret.log("GameLangs.createRoomConf:::" + this.gameDatas.brnnRoomInfo.roomLevel);
                // egret.log("GameLangs.createRoomConf:::" + GameLangs.createRoomConf[GAME_ID.BRNN][this.gameDatas.roomInfo.createinfo.roomLevel].gold);
                if (Global.playerDto.gold < GameLangs.createRoomConf[8 /* BRNN */][this.gameDatas.brnnRoomInfo.roomLevel].gold) {
                    if (Global.panduanJoinRoom(Global.playerDto.gold, this.gameDatas.brnnRoomInfo.roomLevel, 8 /* BRNN */) == false) {
                        this.updateChipGroupUI();
                    }
                }
                else {
                    this.msgHandler.sendSitDownMsg();
                }
            };
            /**
             * 打开充值页面
             */
            GameScene.prototype.openRechargeLayer = function () {
                new Layers.RechargeLayer(0).open();
            };
            /**
             * 游戏退出时自动调用
             */
            GameScene.prototype.onExit = function () {
                _super.prototype.onExit.call(this);
                var arrLen = this.players.length;
                for (var i = 0; i < arrLen; i++) {
                    this.players[i].destroy();
                }
                arrLen = this._chipsPools.length;
                for (var i = 0; i < arrLen; i++) {
                    this._chipsPools[i].destroy();
                }
                this._disBox.destroy();
                this.effectLayer.clearAllAni();
                FrameManager.getInstance().delayRemoveHandler(this.hashCode);
                this._countDown.stopTimer();
                //开启脏矩形
                // Main.instance.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.ON;
            };
            // protected openUserInfoLayer() {
            // }
            /**
             * 获得本局赢家前三名
             */
            GameScene.prototype.getWinerList = function () {
                var windatas = this.gameDatas.hzBrNnMsgList;
                var list = [];
                var arrLen = windatas.length;
                for (var i = 0; i < arrLen; i++) {
                    var el = windatas[i];
                    if (el.roundWinChips > 0) {
                        var id = el.playerId;
                        var info = this.gameDatas.playerDatas[id];
                        if (info) {
                            var name = info.UserInfo.nickName;
                            if (name.length > 5) {
                                name = name.substring(0, 5) + "...";
                            }
                        }
                        else {
                            var name = "";
                        }
                        var gold = el.roundWinChips;
                        var newGold = "";
                        if (gold > 100000) {
                            newGold = Math.floor(gold / 10000) + GameLangs.wan;
                        }
                        else {
                            newGold = gold + "";
                        }
                        list.push({ id: id, name: name, gold: newGold, num: gold });
                    }
                }
                list.sort(function (a, b) {
                    return b.num - a.num; //按金币从大到小排序
                });
                return list.slice(0, 3);
            };
            /** 设置当前投筹码进度条的进度 */
            GameScene.prototype.setChipCountPgbValue = function (value) {
                if (!this.gameDatas.brnnRoomInfo.wangNameList[0]) {
                    return; //没有王的话不执行
                }
                var id = this.gameDatas.brnnRoomInfo.wangNameList[0].playerId;
                var info = this.gameDatas.playerDatas[id];
                if (info) {
                    var zChip = info.chips * 0.2;
                    var num = Math.round((value / zChip) * 100);
                    this._chipCountPgb.value = num;
                }
            };
            /** 重置投筹码进度条 */
            GameScene.prototype.resetChipCountPgb = function () {
                this._chipCountPgb.visible = false;
                this._chipCountPgb.value = 0;
            };
            /**
             * 切换到后台
             */
            GameScene.prototype.onBackground = function (evt) {
                this._backTime = Date.now();
            };
            /**
             * 从后台切换回游戏
             */
            GameScene.prototype.onForeground = function (evt) {
                egret.log("onForeground", net.getServerType(), Date.now() - this._backTime);
                if (net.getServerType() === 3 /* GAME */ && Date.now() - this._backTime >= 20000) {
                    net.close();
                    Layers.HintLayer.create().init({ tipsStr: GameLangs.netCloseTip }).open();
                }
            };
            return GameScene;
        }(GameSceneBase));
        brnn.GameScene = GameScene;
        __reflect(GameScene.prototype, "niuniu.brnn.GameScene");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameScene.js.map