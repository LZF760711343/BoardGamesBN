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
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene(args) {
            var _this = _super.call(this, args) || this;
            _this.skinName = niuniu.GameSceneSkin;
            return _this;
        }
        GameScene.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            SoundManage.playMusic(SoundManage.keyMap.nn_bg);
            // var self = this;
            // let playerCnt = 8;
            // for (var i = 1; i <= playerCnt; i++) {
            //     let player:Player = self["player" +i ];
            //     self.players[i] = player;
            //     player.addEventListener(egret.TouchEvent.TOUCH_TAP,self.openUserInfoLayer,self);
            // }
        };
        /**
         * 初始化一些游戏数据
         */
        GameScene.prototype.initDatas = function (datas, gameType) {
            egret.log("initDatas:", datas);
            var gameDatas = this.gameDatas = new niuniu.GameDatas();
            if (datas.createinfo.gameId === 9 /* QZNN */) {
                gameDatas.gameType = 0 /* COIN */;
            }
            else if (datas.createinfo.gameId === 38 /* GAME_ID_TWOMAN_QZNN */) {
                gameDatas.gameType = 1 /* CARD */;
            }
            else {
                gameDatas.gameType = 1 /* CARD */;
            }
            // gameDatas.gameType = datas.createinfo.gameId === GAME_ID.QZNN ? GAME_TYPE.COIN : GAME_TYPE.CARD;
            gameDatas.roomInfo = datas;
        };
        /**
         * 初始化
         */
        GameScene.prototype.init = function () {
            egret.log("initGame!!!!!");
            this.initUI(); //先初始化ui
            this.msgHandler = new niuniu.GameMsgHandler(this, this.gameDatas); //创建游戏的消息派发器
            //下一帧才开始派发消息,因为有一些UI的数据在当前帧拿到的是不正确的
            // FrameManager.getInstance().addFrame(net.dispatchMsg, net, 0, 1);
            this.validateDisplayList();
            net.dispatchMsg();
        };
        /**
         * 设置当前游戏是8人场还是5人场
         */
        GameScene.prototype.setRoomSize = function () {
            if (this.gameDatas.roomInfo.createinfo.roomSize == 8) {
                this.currentState = "8";
                var players = this.players;
                var temp = void 0;
                temp = players[1];
                players[1] = players[7];
                players[7] = players[4];
                players[4] = players[5];
                players[5] = players[3];
                players[3] = players[2];
                players[2] = temp;
                for (var i = 0; i < 8; ++i) {
                    players[i].pos = i;
                }
            }
        };
        /**
         * 是否显示准备菜单
         */
        GameScene.prototype.isShowReadyMenu = function (visible) {
            egret.log("isShowReadyMenuvisible" + visible);
            if (this.gameDatas.gameType === 1 /* CARD */) {
                if (visible) {
                    this._btnBar.curState = niuniu.BTN_BAR_STATUS.ZHUNBEI;
                }
                else if (this._btnBar.curState === niuniu.BTN_BAR_STATUS.ZHUNBEI) {
                    this._btnBar.curState = niuniu.BTN_BAR_STATUS.NONE;
                }
            }
            else {
                if (visible) {
                    this._btnBar.btnChangeDesk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
                    this._btnBar.curState = niuniu.BTN_BAR_STATUS.GOLDZHUNBEI;
                }
                else if (this._btnBar.curState === niuniu.BTN_BAR_STATUS.GOLDZHUNBEI) {
                    this._btnBar.curState = niuniu.BTN_BAR_STATUS.NONE;
                }
            }
            // egret.log("是否显示准备菜单this._btnBar.curState"+this._btnBar.curState)
        };
        GameScene.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            var self = this;
            var eg = egret;
            self.players = [];
            var roomSize = self.gameDatas.roomInfo.createinfo.roomSize;
            if (roomSize == 2) {
                roomSize = 5;
            }
            self.currentState = roomSize + ""; //设置当前场景状态未八人场还是五人场
            for (var i = 0; i < roomSize; ++i) {
                var player = self["player" + i];
                self.players[i] = player;
                player.disBox = self["cards" + i];
                player.pos = i;
                player.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
                player.visible = !i;
                if (this.gameDatas.gameType === 0 /* COIN */) {
                    player.setChipIcon("iconCoin_png");
                    this.uiLayer.gameCntLab.text = "游戏底分：" + this.gameDatas.roomInfo.createinfo.difen;
                }
                if (this.gameDatas.roomInfo.createinfo.gameId === 38 /* GAME_ID_TWOMAN_QZNN */) {
                    player.setChipIcon("iconCoin_png");
                }
            }
            self.setRoomSize();
            self._handBox = this["cards0"];
            self._handBox.calBox = self._calBox;
            self._handBox.disBox = self._disBox;
            self._btnWuniu.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onCal, self);
            self._btnYouniu.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onCal, self);
            self._btnAuto.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onCal, self);
            self._btnBar.addEventListener(niuniu.BTNBAR_EVENT.CAL, self.onCal, self);
            self._btnBar._btnReady.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onReady, self);
            self._btnBar.addEventListener(niuniu.BTNBAR_EVENT.ROB, self.onRob, self);
            self._btnBar.addEventListener(niuniu.BTNBAR_EVENT.BET, self.onBet, self);
            self._btnBar.registerBetCB(self.onBet, self);
            self._btnBar.registerRobCB(self.onRob, self);
            // self._btnBar.initRobBtn(self.gameDatas.roomInfo.createinfo.qzRateList, self.gameDatas.gameType);
            self._btnBar.initRobBtn([0, 1, 2, 3, 4], self.gameDatas.gameType);
        };
        GameScene.prototype.showWaitTip = function () {
            this._btnBar.curState = niuniu.BTN_BAR_STATUS.WAIT;
            this._btnBar.setTip(GameLangs.waitPlayGameTip);
        };
        // public 
        /**
         * 游戏结束
         */
        GameScene.prototype.gameOver = function (datas) {
            return __awaiter(this, void 0, void 0, function () {
                var self, arrLen, i, gameResult, player, disBox, gameResult, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            if (this.gameDatas.isSelfPlayingGame()) {
                                self.msgHandler.stopHandleMsg();
                            }
                            // if (this.gameDatas.isSelfPlayingGame()) {
                            //游戏结束的时候,还存在的人则都默认是游戏中的
                            // for (let key in this.gameDatas.playerDatas) {
                            //     this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
                            // }
                            self.hideBtnBar();
                            egret.log("datas.gameResult.length" + datas.gameResult.length);
                            arrLen = datas.gameResult.length;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < arrLen)) return [3 /*break*/, 4];
                            gameResult = datas.gameResult[i];
                            player = this.getPlayerById(gameResult.playerId);
                            disBox = this.gameDatas.isSelfId(gameResult.playerId) ? this._disBox : player.disBox;
                            disBox.hideCompleteIcon();
                            return [4 /*yield*/, disBox.showCardAni(gameResult.cards, -1, gameResult.handValue, false, player.sex)];
                        case 2:
                            _a.sent(); //播放开牌动画
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: 
                        //等待1000毫秒
                        return [4 /*yield*/, this.wait(1000)];
                        case 5:
                            //等待1000毫秒
                            _a.sent();
                            self.doFlyCoinsAni(datas);
                            if (!this.gameDatas.isSelfPlayingGame()) return [3 /*break*/, 6];
                            gameResult = Utils.getItemByKey(datas.gameResult, "playerId", this.gameDatas.myPlyerId);
                            //播放游戏结束的胜利跟失败的动画
                            // if (gameResult.balance) {
                            self.effectLayer.playAui(gameResult.balance > 0 ? "win" : "lost", self.openRoundAccountLayer, self, datas);
                            SoundManage.playEffect(gameResult.balance > 0 ? "nnGameWin" : "nnGameLose");
                            return [3 /*break*/, 8];
                        case 6: return [4 /*yield*/, this.wait(1000)];
                        case 7:
                            _a.sent();
                            self.openRoundAccountLayer(datas);
                            _a.label = 8;
                        case 8:
                            //游戏结束的时候,还存在的人则都默认是游戏中的
                            for (key in this.gameDatas.playerDatas) {
                                this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        //打开玩家结算页面
        GameScene.prototype.openRoundAccountLayer = function (datas) {
            var _this = this;
            if (this.gameDatas.gameType === 1 /* CARD */ && this.gameDatas.roomInfo.createinfo.gameId === 9 /* QZNN */) {
                var accLayer = new niuniu.RoundAccountLayer();
                accLayer.open();
                //设置结算数据
                accLayer.setDatas(datas, this.gameDatas);
                accLayer.addEventListener(Layers.Event.CLOSE, function () {
                    _this.msgHandler.sendReadyGame();
                    _this.reset();
                    _this.msgHandler.doAllowHandleMsg();
                }, this);
            }
            else {
                this.reset();
                // this.showWaitGameStartTip();
                if (this.gameDatas.gameType === 0 /* COIN */) {
                    this._btnBar.curState = niuniu.BTN_BAR_STATUS.GOLDZHUNBEI;
                }
                else {
                    this._btnBar.curState = niuniu.BTN_BAR_STATUS.ZHUNBEI;
                }
                this.msgHandler.doAllowHandleMsg();
            }
        };
        /**
         * 创建飞金币动画
         */
        GameScene.prototype.doFlyCoinsAni = function (datas) {
            return __awaiter(this, void 0, void 0, function () {
                var self, tween, length, dInfo, dPlayer, delay, i, info, player, i, info, player;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            SoundManage.playEffect("flyMoney");
                            self = this;
                            length = datas.gameResult.length;
                            dInfo = Utils.getItemByKey(datas.gameResult, "playerId", this.gameDatas.dealerId);
                            dPlayer = self.getPlayerById(dInfo.playerId);
                            delay = 0;
                            /**
                             * 先播放输给庄家的玩家的飞金币动画(从输的人的头像飞到庄家的头像上)
                             * 使用await,等待所有的动画播完再进行下一步
                             */
                            return [4 /*yield*/, Promise.all(datas.gameResult.map(function (info) {
                                    if (info.balance < 0 && info.playerId !== self.gameDatas.dealerId) {
                                        var player = self.getPlayerById(info.playerId);
                                        return self.effectLayer.createCoinsEffect(player.getHeadPos(), dPlayer.getHeadPos(), player.doEndAni, player, info.balance);
                                    }
                                }))];
                        case 1:
                            /**
                             * 先播放输给庄家的玩家的飞金币动画(从输的人的头像飞到庄家的头像上)
                             * 使用await,等待所有的动画播完再进行下一步
                             */
                            _a.sent();
                            //播放庄家头上的飘字动画
                            if (this.gameDatas.roomInfo.createinfo.gameId !== 38 /* GAME_ID_TWOMAN_QZNN */) {
                                dPlayer.doEndAni(dInfo.balance);
                                //然后播放赢了庄家钱人的动画(从庄家的头像飞到赢钱的人的头像上)
                                for (i = 0; i < length; i++) {
                                    info = datas.gameResult[i];
                                    if (info.balance > 0 && info.playerId !== self.gameDatas.dealerId) {
                                        player = self.getPlayerById(info.playerId);
                                        self.effectLayer.createCoinsEffect(dPlayer.getHeadPos(), player.getHeadPos(), player.doEndAni, player, info.balance);
                                    }
                                }
                            }
                            else {
                                for (i = 0; i < length; i++) {
                                    info = datas.gameResult[i];
                                    if (info.balance > 0 && info.playerId !== self.gameDatas.dealerId) {
                                        player = self.getPlayerById(info.playerId);
                                        self.effectLayer.createCoinsEffect(dPlayer.getHeadPos(), player.getHeadPos(), null, player, info.balance);
                                    }
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        GameScene.prototype.onCal = function (event) {
            if (event && event.target instanceof UI.CommonBtn) {
                var value = parseInt(event.target.name);
                if (value <= 0) {
                    if (this.gameDatas.cardType == 1 /* SANPAI */ || value == -1) {
                        this.msgHandler.sendCalMsg(0);
                    }
                    else {
                        Toast.launch(GameLangs.moreThinkTip);
                    }
                }
                else {
                    if (this._calBox.youNiu) {
                        this.msgHandler.sendCalMsg(0, [this._calBox.cardValues[0], this._calBox.cardValues[1], this._calBox.cardValues[2]]);
                    }
                    else {
                        Toast.launch(GameLangs.moreThinkTip);
                    }
                }
            }
            else {
                this.msgHandler.sendCalMsg(0);
                this.showComeIcon(1);
            }
        };
        GameScene.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            //清理所有还在播放中的特效,并且回收一些对象
            this.effectLayer.clearAllAni();
            // egret.log("removeHandler2")
            // FrameManager.getInstance().delayRemoveHandler(this.hashCode);
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; ++i) {
                this.players[i].clearAllAni();
                this.players[i].destroy();
            }
        };
        /**
         * 下注按钮回调函数
         */
        GameScene.prototype.onBet = function (event) {
            var value = (event && event.target.name) ? event.target.name : this._btnBar.getMinBetCount();
            this.msgHandler.sendBetMsg(value);
        };
        /**
         * 隐藏按钮条
         */
        GameScene.prototype.hideBtnBar = function () {
            if (this.gameDatas.isSelfPlayingGame()) {
                this._btnBar.currentState = niuniu.BTN_BAR_STATUS.NONE;
            }
            this._btnBar.stopTimer();
        };
        /**
         * 抢庄按钮回调函数
         */
        GameScene.prototype.onRob = function (event) {
            var value = (event && event.target.name) ? event.target.name : 0;
            this.msgHandler.sendCallMsg(value);
            // this._btnBar.currentState = BTN_BAR_STATUS.NONE;
            // this._btnBar.stopTimer();
        };
        GameScene.prototype.showPlayerTip = function (playerId, value, type) {
            var player = this.getPlayerById(playerId);
            player && player.showTip(value, type, this.gameDatas.gameType);
        };
        GameScene.prototype.addCard = function (id, cardValue, callBack, target) {
            var p = this.getPlayerById(id);
            if (p) {
                p.disBox.addCardAni(cardValue, callBack, target);
            }
        };
        GameScene.prototype.hideCalMenu = function () {
            var self = this;
            // if (self._logic.roomCfg.gameID == GAME_TYPE.NIUNIU) {
            self._btnBar.clearCbKey();
            self._btnBar.setTip(GameLangs.wait_cal_time_tip);
            self._btnBar.currentState = niuniu.BTN_BAR_STATUS.WAITBET;
            self._disBox.showCards([], 5);
            self._disBox.visible = true;
            self._disBox.showComeIcon();
            self._handBox.visible = false;
            self._calBox.visible =
                self._btnAuto.visible =
                    self._btnWuniu.visible =
                        self._btnYouniu.visible = false;
            // } else {
            //     this._btnZdbup.selected = this._btnZdbip.selected = this._btnZdbip.visible = this._btnZdbup.visible = false;
            // }
        };
        /**
         * 播放抢庄动画
         */
        GameScene.prototype.doRobAni = function (datas) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var self, aniCallBack, player, length_1, aniCount, players, i, i, j;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            aniCallBack = function () {
                                if (_this.gameDatas.isSelfPlayingGame()) {
                                    if (datas.dealer != self.gameDatas.myPlyerId) {
                                        self.showBetMenu();
                                    }
                                    else {
                                        self.showBetMenu();
                                        self.showWaitBetMenu();
                                    }
                                }
                            };
                            if (!(datas.playerIds.length === 1)) return [3 /*break*/, 1];
                            player = self.getPlayerById(datas.dealer);
                            self.setAllPlayerStatu(0 /* NONE */);
                            player.setDealerIcon(true);
                            player.setFrameAniVisible(true);
                            player.playDealerAni(aniCallBack, this);
                            return [3 /*break*/, 9];
                        case 1:
                            length_1 = datas.playerIds.length;
                            aniCount = 2;
                            players = [];
                            //所有抢庄的人的列表
                            for (i = 0; i < length_1; i++) {
                                players[i] = self.getPlayerById(datas.playerIds[i]);
                            }
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < aniCount)) return [3 /*break*/, 8];
                            j = 0;
                            _a.label = 3;
                        case 3:
                            if (!(j < length_1)) return [3 /*break*/, 7];
                            players[j].setFrameAniVisible(true);
                            if (!(i >= aniCount - 1 && datas.playerIds[j] === datas.dealer)) return [3 /*break*/, 4];
                            self.setAllPlayerStatu(0 /* NONE */);
                            players[j].setDealerIcon(true);
                            players[j].playDealerAni(aniCallBack, self);
                            return [3 /*break*/, 7];
                        case 4:
                            SoundManage.playEffect("nnSelectDealer");
                            return [4 /*yield*/, this.wait(120)];
                        case 5:
                            _a.sent();
                            players[j].setFrameAniVisible(false);
                            _a.label = 6;
                        case 6:
                            j++;
                            return [3 /*break*/, 3];
                        case 7:
                            i++;
                            return [3 /*break*/, 2];
                        case 8:
                            if (!this.gameDatas.isSelfPlayingGame()) {
                            }
                            _a.label = 9;
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 显示完成算牛提示
         */
        GameScene.prototype.showComeIcon = function (id) {
            var player = this.getPlayerById(id);
            if (player) {
                player.disBox.showComeIcon();
            }
        };
        GameScene.prototype.setCards = function (id, cards, count) {
            var player = this.getPlayerById(id);
            if (player) {
                player.disBox.showCards(cards, count);
            }
        };
        /**
         * 显示计牛栏
         */
        GameScene.prototype.showCalBox = function () {
            // if (this._logic.roomCfg.gameID == GAME_TYPE.NIUNIU) {
            this._calBox.show();
            this._btnBar.currentState = niuniu.BTN_BAR_STATUS.CAL;
            this._btnAuto.visible = true;
            var cardType = this.gameDatas.cardType; //(this._logic.handtype >> 12) & 0xf;
            if (cardType <= 4 /* YINNIU */) {
                this._btnYouniu.visible =
                    this._btnWuniu.visible = true;
                this._btnAuto.label = GameLangs.zidongsuanniu;
            }
            else {
                this._btnYouniu.visible =
                    this._btnWuniu.visible = this._btnAuto.visible = true;
            }
            this._handBox.touchEnabled = this._handBox.touchChildren = true;
            this._btnBar.startTimer(niuniu.CAL_COUNT_DOWN, GameLangs.calTimeTip, true, niuniu.BTNBAR_EVENT.CAL);
            // } else {
            //     this._btnZdbip.visible = this._btnZdbup.visible = true;
            // }
        };
        /**
         * 显示等待其他人下注提示条
         */
        GameScene.prototype.showWaitBetMenu = function () {
            this._btnBar.setTip(GameLangs.wait_bet_time_tip);
            this._btnBar.clearCbKey();
            this._btnBar.currentState = niuniu.BTN_BAR_STATUS.WAITBET;
        };
        /*
         * 显示下注按钮
         */
        GameScene.prototype.showBetMenu = function () {
            this._btnBar.currentState = niuniu.BTN_BAR_STATUS.BET;
            this._btnBar.startTimer(niuniu.BET_COUNT_DOWN, GameLangs.bet_time_tip, true, niuniu.BTNBAR_EVENT.BET);
        };
        /*
         * 显示抢庄按钮
         */
        GameScene.prototype.showRobMenu = function () {
            this._btnBar.currentState = niuniu.BTN_BAR_STATUS.ROB;
            this._btnBar.startTimer(niuniu.ROB_COUNT_DOWN, GameLangs.rob_time_tip, true, niuniu.BTNBAR_EVENT.ROB);
        };
        GameScene.prototype.initBetBtns = function (list) {
            if (list)
                this._btnBar.initBetBtns(list, this.gameDatas.gameType === 1 /* CARD */);
        };
        GameScene.prototype.onReady = function () {
            if (this.gameDatas.gameType === 0 /* COIN */) {
                // createRoomConf
                egret.log("GameLangs.createRoomConf:::" + GameLangs.createRoomConf[9 /* QZNN */][this.gameDatas.roomInfo.createinfo.roomLevel].gold);
                if (Global.playerDto.gold < GameLangs.createRoomConf[9 /* QZNN */][this.gameDatas.roomInfo.createinfo.roomLevel].gold) {
                    Global.panduanJoinRoom(Global.playerDto.gold, this.gameDatas.roomInfo.createinfo.roomLevel, 9 /* QZNN */);
                }
                else {
                    this.msgHandler.sendReadyGame();
                }
            }
            else {
                this.msgHandler.sendReadyGame();
            }
        };
        /**
         * 重置游戏的一些UI,跟数据
         */
        GameScene.prototype.reset = function () {
            this._calBox.youNiu = false;
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; i++) {
                var player = this.players[i];
                player.reset();
            }
            this._disBox.visible = false;
            this._handBox.visible = true;
            this._btnBar.RefreshQiangBarAvail(Global.playerDto.gold, this.gameDatas.roomInfo.createinfo.difen, this.gameDatas.getPlayIngGameCnt(), 25, 4, this.gameDatas.gameType === 0 /* COIN */);
        };
        GameScene.prototype.dealCardById = function (id, delay, cards, handvalue, callBack, target) {
            var p = this.getPlayerById(id);
            if (p) {
                p.disBox.dealAni(delay, cards, handvalue, callBack, target);
            }
        };
        /**
         * 设置庄家icon
         */
        GameScene.prototype.setPlayerDealerIcon = function (id, visible) {
            var p = this.getPlayerById(id);
            if (p) {
                p.setDealerIcon(visible);
            }
        };
        /**
         * 播放开始游戏的一些动画游戏开始
         */
        GameScene.prototype.doStartGameAni = function () {
            return this.effectLayer.playAuiAsync("start");
            ;
            ;
        };
        // 充值后更新筹码
        GameScene.prototype.updataPlayMechip = function (value) {
            if (this.player0._chipsLb) {
                if (value > 100000) {
                    this.player0._chipsLb.text = Math.floor(value / 10000) + GameLangs.wan;
                }
                else {
                    this.player0._chipsLb.text = value + "";
                }
            }
        };
        return GameScene;
    }(GameSceneBase));
    niuniu.GameScene = GameScene;
    __reflect(GameScene.prototype, "niuniu.GameScene");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameScene.js.map