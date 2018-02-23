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
var zjh;
(function (zjh) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene(args) {
            var _this = _super.call(this, args) || this;
            _this.skinName = zjh.GameSceneSkin;
            return _this;
        }
        GameScene.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.BackRoomChips();
            this._btnReady.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReady, this);
            this.btnChangeDesk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
            SoundManage.playMusic(SoundManage.keyMap.zjh_bg);
            if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                this.uiLayer._voiceBtn.visible = false;
                this.uiLayer._inviteBtn.bottom = 90;
            }
            // this.uiLayer.
        };
        GameScene.prototype.onReady = function (event) {
            this.gameDatas.roomInfo.chipsList;
            if (this.gameDatas.gameType === 0 /* COIN */) {
                egret.log("GameLangs.createRoomConf:::" + Global.playerDto.gold, this.gameDatas.roomInfo.createinfo.roomLevel, 11 /* GOLD_ZJH */);
                if (Global.playerDto.gold < GameLangs.createRoomConf[10 /* ZJH */][this.gameDatas.roomInfo.createinfo.roomLevel].gold) {
                    Global.panduanJoinRoom(Global.playerDto.gold, this.gameDatas.roomInfo.createinfo.roomLevel, 11 /* GOLD_ZJH */);
                }
                else {
                    this.msgHandler.sendReadyGame();
                }
            }
            else {
                this.msgHandler.sendReadyGame();
            }
            // if (!this.isReady) {
            //     this.isReady = true;
            //     this._logic.readyGameByClickBtn();
            //     this.showReadyMenu(false);
            //     this.players[1].status = PLAYER_STATUS.READY;
            //     SoundManage.playNormalEffect('Snd_commonbtn');
            // }
        };
        GameScene.prototype.openUserInfoLayer = function (e) {
            var player = e.target;
            if (player.isDoBlinkAni) {
                this._btnBar.visible = false;
                this.msgHandler.sendBi(player.getPlayerId());
                egret.log(player.getPlayerId());
            }
            else {
                _super.prototype.openUserInfoLayer.call(this, e);
            }
        };
        /**
         * 播放下注时扔筹码的动画
         */
        GameScene.prototype.doPlayerBetAni = function (playerId, chips) {
            var player = this.getPlayerById(playerId);
            var chipsNum = this.gameDatas.roomInfo.createinfo.betChips.indexOf(chips);
            egret.log("chipsNum", chipsNum === -1 ? 0 : chipsNum, chipsNum === -1, chipsNum);
            SoundManage.playEffect("szp_jjb");
            if (player) {
                var datas = this.gameDatas.playerDatas[playerId];
                if (datas.kanPai) {
                    this._chipsPool.addChips(chipsNum + 1, zjh.changeNumber(chips, this.gameDatas.gameType), player.getHeadPos(), 100);
                }
                if (chipsNum < 0) {
                    chipsNum = 0;
                }
                this._chipsPool.addChips(chipsNum + 1, zjh.changeNumber(chips, this.gameDatas.gameType), player.getHeadPos());
            }
            else {
                true && egret.error("PlayerId " + playerId + " Not Exist!!!!!");
            }
        };
        /**
         * 重新进房看到之前的筹码池里的筹码
         */
        GameScene.prototype.BackRoomChips = function () {
            for (var i = 0; i < this.gameDatas.roomInfo.chipsList.length; i++) {
                var chipsNum = this.gameDatas.roomInfo.createinfo.betChips.indexOf(this.gameDatas.roomInfo.chipsList[i]);
                if (chipsNum < 0) {
                    chipsNum = 0;
                }
                var chipsObj = zjh.ChipsObj.create("zjh_chouma_" + (chipsNum + 1) + "_png", zjh.changeNumber(this.gameDatas.roomInfo.chipsList[i], this.gameDatas.gameType));
                chipsObj.x = Utils.getNumberInNormalDistribution((Global.sWidth - chipsObj.width) / 2, 70);
                chipsObj.y = Utils.getNumberInNormalDistribution((Global.sHeight - chipsObj.height) / 2.25, 15);
                this._chipsPool.addChild(chipsObj);
            }
        };
        /**
         * 初始化一些游戏数据
         */
        GameScene.prototype.initDatas = function (datas, gameType) {
            egret.log("initDatas:", datas);
            var gameDatas = this.gameDatas = new zjh.GameDatas();
            gameDatas.gameType = datas.createinfo.gameId === 11 /* GOLD_ZJH */ ? 0 /* COIN */ : 1 /* CARD */;
            // gameDatas.gameType = gameType;
            gameDatas.roomInfo = datas;
            this.gameDatas.gameStatus = datas.stage;
        };
        /**
         * 初始化
         */
        GameScene.prototype.init = function () {
            egret.log("initGame!!!!!");
            this.initUI(); //先初始化ui
            this.msgHandler = new zjh.GameMsgHandler(this, this.gameDatas); //创建游戏的消息派发器
            //下一帧才开始派发消息,因为有一些UI的数据在当前帧拿到的是不正确的
            // FrameManager.getInstance().addFrame(net.dispatchMsg, net, 0, 1);
            net.dispatchMsg();
        };
        /**
         * 是否显示准备
         */
        GameScene.prototype.isShowReadyMenu = function (visible) {
            // egret.log("11111");
            if (this.gameDatas.gameType === 1 /* CARD */) {
                if (visible) {
                    this._btnReady.visible = true;
                }
                else {
                    this._btnReady.visible = false;
                }
                this.btnChangeDesk.includeInLayout = false;
                this.btnChangeDesk.visible = false;
            }
            else {
                egret.log("visible" + visible);
                if (visible) {
                    this._btnReady.visible = this.btnChangeDesk.visible = true;
                }
                else {
                    this._btnReady.visible = this.btnChangeDesk.visible = false;
                }
            }
        };
        GameScene.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            var self = this;
            var eg = egret;
            self.players = [];
            self._btnBar.visible = false;
            for (var i = 0; i < self.gameDatas.roomInfo.createinfo.roomSize; ++i) {
                var player = self["_player" + i];
                self.players[i] = player;
                player.disBox = self["_disBox" + i];
                player.pos = i;
                player.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
                player.visible = !i;
                player.disBox.init();
                if (this.gameDatas.gameType === 0 /* COIN */) {
                    player.setChipIcon("iconCoin_png");
                    this.uiLayer.gameCntLab.text = "游戏底分：" + this.gameDatas.roomInfo.createinfo.difen;
                    this.uiLayer._rechargeBtn.visible = true;
                    this.uiLayer._chatBtn.bottom = 90;
                }
            }
            self.players[0].disBox.setCardPaddingX(130);
            egret.log("initUI!!!!!");
            self._btnBar.btnBi.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBi, self);
            self._btnBar.btnQi.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onQi, self);
            self._btnBar.btnKan.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onKan, self);
            // self._btnBar.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onJia, self);
            self._btnBar.btnGen.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onGen, self);
            self._btnBar.closeBi.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCloseBi, self);
            self._btnBar.initChipsBtns(this.gameDatas.roomInfo.createinfo.betChips, this.gameDatas.gameType);
            self._btnBar.addEventListener(zjh.GameBtnBar.ADD_CHIPS, this.onJia, this);
            if (self.gameDatas.gameType === 0 /* COIN */) {
            }
            this.setChipsBarAndRoundBarVisible(false);
        };
        /**
         * 刷新加注按钮的状态
         */
        GameScene.prototype.updateChipsGroup = function () {
            if (this.gameDatas.isSelfPlayingGame()) {
                this._btnBar.updateChipsGroup(this.gameDatas.curBetCnt, this.gameDatas.gameType === 0 /* COIN */ ? Global.playerDto.gold : 100000000);
            }
        };
        /**
         * 取消比牌
         */
        GameScene.prototype.onCloseBi = function () {
            var _this = this;
            var arrLen = this.players.length;
            var list = [];
            for (var i = 0; i < arrLen; i++) {
                var player = this.players[i];
                var playerId = player.getPlayerId();
                if (this.gameDatas.playingList[playerId] &&
                    playerId !== this.gameDatas.myPlyerId &&
                    this.gameDatas.playerDatas[playerId] &&
                    !this.gameDatas.playerDatas[playerId].loseOrQiPai //没有弃牌或者已经比牌输了
                ) {
                    list.push(player);
                }
            }
            if (list.length > 1) {
                list.forEach(function (player) {
                    egret.log("player:", player.getPlayerId());
                    player.stopBlinkCompAni();
                    _this._btnBar.currentState = "normal";
                });
            }
        };
        /**
         * 比牌按钮回调
         */
        GameScene.prototype.onBi = function (e) {
            var _this = this;
            // this.getChildAt(this.numChildren - 1).visible = 
            // this._btnBar.visible = this._btnBar.btnKan.touchEnabled = false;
            var arrLen = this.players.length;
            var list = [];
            for (var i = 0; i < arrLen; i++) {
                var player = this.players[i];
                var playerId = player.getPlayerId();
                if (this.gameDatas.playingList[playerId] &&
                    playerId !== this.gameDatas.myPlyerId &&
                    this.gameDatas.playerDatas[playerId] &&
                    !this.gameDatas.playerDatas[playerId].loseOrQiPai //没有弃牌或者已经比牌输了
                ) {
                    list.push(player);
                }
            }
            if (list.length > 1) {
                list.forEach(function (player) {
                    egret.log("player:", player.getPlayerId());
                    player.startBlinkCompAni();
                    _this._btnBar.currentState = "closeBi";
                });
            }
            else {
                this.msgHandler.sendBi(list[0].getPlayerId());
            }
        };
        /**
         * 弃牌按钮回调函数
         */
        GameScene.prototype.onQi = function (e) {
            this.msgHandler.sendQiMsg();
        };
        /**
         * 看牌按钮回调
         */
        GameScene.prototype.onKan = function (e) {
            if (this.gameDatas.gameType === 0 /* COIN */) {
                if (this._player0._proBar._target.strokeColor == 0xFF0000) {
                    this.msgHandler.sendKanMsg(true);
                }
                else {
                    this.msgHandler.sendKanMsg(false);
                }
            }
            else {
                this.msgHandler.sendKanMsg(false);
            }
        };
        /**
         * 加注
         */
        GameScene.prototype.onJia = function (e) {
            this.msgHandler.sendBetMsg(e.data);
        };
        /**
         * 跟注按钮回调
         */
        GameScene.prototype.onGen = function (e) {
            this.msgHandler.sendBetMsg(this.gameDatas.curBetCnt);
        };
        /**
         * 是否自动跟注
         */
        GameScene.prototype.isAutoBet = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        //延迟一段时间再判断需不需要自动跟牌,防止所有人都点自动跟牌之后,一瞬间牌局就因为自动跟牌太快而结束了
                        return [4 /*yield*/, this.wait(800)];
                        case 1:
                            //延迟一段时间再判断需不需要自动跟牌,防止所有人都点自动跟牌之后,一瞬间牌局就因为自动跟牌太快而结束了
                            _a.sent();
                            if (this._btnBar.tBtnGen.selected && this.gameDatas.curActionId === this.gameDatas.myPlyerId) {
                                this.msgHandler.sendBetMsg(this.gameDatas.curBetCnt);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新按钮栏各个按钮的状态
         */
        GameScene.prototype.updateBtnBar = function () {
            console.log("gengxin");
            if (this.gameDatas.gameStatus > 1 /* PRE_START */ && this.gameDatas.isSelfPlayingGame()) {
                var selfPlayerData = this.gameDatas.getSelfPlayerDatas();
                this._btnBar.visible = true;
                this._btnBar.currentState = "normal";
                if (selfPlayerData.loseOrQiPai) {
                    this._btnBar.btnQi.enabled =
                        this._btnBar.btnBi.enabled =
                            this._btnBar.btnKan.enabled =
                                this._btnBar.btnGen.enabled =
                                    this._btnBar.btnJia.enabled =
                                        this._btnBar.tBtnGen.enabled = false;
                }
                else {
                    //如果已经输了的话,弃牌按钮变为不可操作
                    this._btnBar.btnQi.enabled = !selfPlayerData.loseOrQiPai;
                    this._btnBar.btnKan.enabled = !selfPlayerData.kanPai;
                    this._btnBar.tBtnGen.enabled = true;
                    if (this.gameDatas.isSelfId(this.gameDatas.curActionId)) {
                        this._btnBar.btnBi.enabled = this.gameDatas.roundCnt >= 3;
                        this._btnBar.btnJia.enabled = this.gameDatas.curBetCnt !== this.gameDatas.roomInfo.createinfo.betChips[this.gameDatas.roomInfo.createinfo.betChips.length - 1];
                        if (selfPlayerData.chips < this.gameDatas.curBetCnt && this.gameDatas.gameType == 0 /* COIN */) {
                            console.log("不够钱啊");
                            this._btnBar.btnBi.enabled =
                                this._btnBar.btnKan.enabled =
                                    this._btnBar.btnGen.enabled =
                                        this._btnBar.btnJia.enabled =
                                            this._btnBar.tBtnGen.enabled =
                                                false;
                        }
                        else {
                            this._btnBar.btnGen.enabled = true;
                            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.betChips.length; i++) {
                                if (selfPlayerData.chips < this.gameDatas.roomInfo.createinfo.betChips[i]) {
                                    for (var j = i; j < this.gameDatas.roomInfo.createinfo.betChips.length; j++) {
                                        this._btnBar.chipsBtnList[j].enabled = false;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        this._btnBar.setBtnJiaGroupVisible(false);
                        this._btnBar.btnBi.enabled =
                            this._btnBar.btnGen.enabled =
                                this._btnBar.btnJia.enabled = false;
                    }
                }
            }
            else {
                this._btnBar.visible = false;
            }
        };
        /**
         * 重置游戏的一些UI,跟数据
         */
        GameScene.prototype.reset = function () {
            console.log("reset了啊");
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; i++) {
                var player = this.players[i];
                player.reset();
            }
            this._chipsPool.reset();
            // this._allChipsBar.visible = true;
            // this._roundTipBar.visible = true;
        };
        GameScene.prototype.setChipsBarAndRoundBarVisible = function (value) {
            this._roundTipBar.visible = this._allChipsBar.visible = value;
        };
        /**
         * 更新当前下注额跟当前轮数的ui
         */
        GameScene.prototype.updateRoundBetInof = function () {
            this._betRoundLab.text = GameLangs.zjhRoundAndBetStr.format(this.gameDatas.curBetCnt, this.gameDatas.roundCnt, this.gameDatas.maxRoundCnt);
        };
        /**
         * 更新当前总下注额UI
         */
        GameScene.prototype.updateSumChipsUI = function () {
            this._allChipsBar.setBetChips(this.gameDatas.sumChips);
        };
        /**
         * 将某个玩家的状态设置为输
         */
        GameScene.prototype.setPlayerLose = function (playerId) {
            var player = this.getPlayerById(playerId);
            if (player) {
                player.setAction(1 /* LOSE */);
                player.disBox.setCardsGray();
            }
            else {
                true && egret.error("PlayerId " + playerId + " Not Exist!!!!");
            }
        };
        /**
         * 判断两个人是否比过牌
         */
        GameScene.prototype.checkIsCompCard = function (playerId1, playerId2, compList) {
            var arrLen = compList.length;
            for (var i = 0; i < arrLen; i++) {
                if ((compList[i][0] === playerId1 && compList[i][1] === playerId2) || (compList[i][1] === playerId1 && compList[i][0] === playerId2)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 游戏结束
         */
        GameScene.prototype.gameOver = function (datas) {
            return __awaiter(this, void 0, void 0, function () {
                var self, arrLen, winPlayer, i, gameResult, player, disBox, gameResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            self.msgHandler.stopHandleMsg();
                            self.setChipsBarAndRoundBarVisible(false);
                            this.gameDatas.curActionId = null;
                            this.gameDatas.resetPlayerDatas();
                            this.updateRoundBetInof();
                            //关闭玩家计时条
                            this.setAllPlayerStatu(3 /* IDLE */);
                            //游戏结束的时候,还存在的人则都默认是游戏中的
                            // for (let key in this.gameDatas.playerDatas) {
                            //     this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
                            // }
                            this._btnBar.visible = false;
                            arrLen = datas.gameResultList.length;
                            egret.log("arrLen" + arrLen);
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < arrLen)) return [3 /*break*/, 4];
                            gameResult = datas.gameResultList[i];
                            player = this.getPlayerById(gameResult.playerId);
                            disBox = player.disBox;
                            egret.log("gameResult" + player);
                            return [4 /*yield*/, disBox.showCardAni(gameResult.cards, gameResult.playerId === this.gameDatas.myPlyerId || this.checkIsCompCard(gameResult.playerId, this.gameDatas.myPlyerId, datas.biPaiList) || !this.gameDatas.isSelfPlayingGame(), player.sex)];
                        case 2:
                            _a.sent(); //播放开牌动画
                            //播放漂字动画
                            player.doEndAni(gameResult.balance);
                            if (gameResult.balance > 0) {
                                winPlayer = player;
                            }
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            if (!(this.gameDatas.gameType === 1 /* CARD */)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.wait(2000)];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 6: return [4 /*yield*/, this.wait(400)];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8:
                            this._chipsPool.move(winPlayer.getHeadPos());
                            this._btnBar.tBtnGen.selected = false;
                            SoundManage.playEffect("szp_flywincoin");
                            // //获取自己的结算信息
                            egret.log("this.gameDatas.myPos" + this.gameDatas.myPos);
                            if (!this.gameDatas.isSelfPlayingGame()) return [3 /*break*/, 10];
                            gameResult = Utils.getItemByKey(datas.gameResultList, "playerId", this.gameDatas.myPlyerId);
                            //播放游戏结束的胜利跟失败的动画
                            return [4 /*yield*/, self.effectLayer.playAui(gameResult.balance > 0 ? "win" : "lost", self.openRoundAccountLayer, self, datas)];
                        case 9:
                            //播放游戏结束的胜利跟失败的动画
                            _a.sent();
                            SoundManage.playEffect(gameResult.balance > 0 ? "biwin" : "bilose");
                            return [3 /*break*/, 12];
                        case 10: return [4 /*yield*/, this.wait(1200)];
                        case 11:
                            _a.sent();
                            self.openRoundAccountLayer(datas);
                            _a.label = 12;
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        //打开玩家结算页面
        GameScene.prototype.openRoundAccountLayer = function (datas) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var accLayer;
                return __generator(this, function (_a) {
                    if (this.gameDatas.gameType === 1 /* CARD */) {
                        accLayer = new niuniu.RoundAccountLayer();
                        accLayer.open();
                        //设置结算数据
                        accLayer.setDatas1(datas, this.gameDatas);
                        accLayer.addEventListener(Layers.Event.CLOSE, function () {
                            _this.msgHandler.sendReadyGame();
                            _this.reset();
                            _this.msgHandler.doAllowHandleMsg();
                        }, this);
                    }
                    else {
                        //让游戏结果显示一段时间,之后再进行其他的处理
                        this.reset();
                        this._btnReady.visible = this.btnChangeDesk.visible = true;
                        this.msgHandler.doAllowHandleMsg();
                    }
                    this.gameDatas.gameStatus = 1 /* PRE_START */;
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 播放开始游戏的一些动画游戏开始
         */
        GameScene.prototype.doStartGameAni = function () {
            this._btnBar.btnKan.touchEnabled = true;
            return this.effectLayer.playAuiAsync("start");
        };
        GameScene.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            //清理所有还在播放中的特效,并且回收一些对象
            this.effectLayer.clearAllAni();
            // FrameManager.getInstance().removeHandler(this.hashCode);
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; ++i) {
                // this.players[i].clearAllAni();
                this.players[i].destroy();
            }
            zjh.ChipsObj.clearPool();
            this._pkAnuLayer.destroy();
        };
        GameScene.prototype.doBiPaiGameAni = function (win, playerId, otherId, callBack, thisOjb) {
            this._pkAnuLayer.visible = true;
            egret.log("playerId", this.gameDatas.playerDatas[playerId]);
            egret.log("otherId", this.gameDatas.playerDatas[otherId]);
            var playerdata = this.gameDatas.playerDatas[playerId];
            var Oplayerdata = this.gameDatas.playerDatas[otherId];
            egret.log("开始比牌动画！！！");
            this._pkAnuLayer.init(playerdata, Oplayerdata, callBack, thisOjb);
            egret.log("11111");
            if (win) {
                this._pkAnuLayer.curState = zjh.PKAuiStatu.LEFT_WIN;
            }
            else {
                this._pkAnuLayer.curState = zjh.PKAuiStatu.LEFT_LOSE;
            }
        };
        GameScene.prototype.pkAnuLayervisiblef = function () {
            this._pkAnuLayer.visible = false;
        };
        GameScene.prototype.pkAnuLayervisiblet = function () {
            this._pkAnuLayer.visible = true;
        };
        GameScene.prototype.setCards = function (playerId, cardValues) {
            var p = this.getPlayerById(playerId);
            if (p) {
                p.disBox.setCards(cardValues);
            }
        };
        // setBetChips
        GameScene.prototype.dealCardById = function (playerId, cardValues, delay, callBack, target) {
            if (delay === void 0) { delay = 0; }
            var p = this.getPlayerById(playerId);
            if (p) {
                p.disBox.dealCards(cardValues, delay, callBack, target);
            }
        };
        // 充值后更新筹码
        GameScene.prototype.updataPlayMechip = function (value) {
            if (this._player0._chipsLb) {
                if (value > 100000) {
                    this._player0._chipsLb.text = Math.floor(value / 10000) + GameLangs.wan;
                }
                else {
                    this._player0._chipsLb.text = value + "";
                }
            }
        };
        /**
         * 隐藏按钮栏
         */
        GameScene.prototype.HideButs = function () {
            this._btnBar.visible = false;
        };
        return GameScene;
    }(GameSceneBase));
    zjh.GameScene = GameScene;
    __reflect(GameScene.prototype, "zjh.GameScene");
})(zjh || (zjh = {}));
//# sourceMappingURL=GameScene.js.map