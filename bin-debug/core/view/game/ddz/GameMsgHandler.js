/**
 * 斗地主游戏处理游戏协议的类
 */
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
var DDZ;
(function (DDZ) {
    var GameMsgHandler = (function (_super) {
        __extends(GameMsgHandler, _super);
        // public 
        function GameMsgHandler(scene, gameDatas) {
            var _this = _super.call(this, scene, gameDatas) || this;
            _this._delayMsgList = _this._delayMsgList.concat([
                PlayGameOrder.G2C_NN_GAMEPROCESS,
                PlayGameOrder.G2C_NN_STARTGAME,
                PlayGameOrder.G2C_NN_CALL,
                PlayGameOrder.G2C_NN_DEALER,
                PlayGameOrder.G2C_NN_BET,
                PlayGameOrder.G2C_NN_LOOK,
                PlayGameOrder.G2C_NN_SHOW,
                PlayGameOrder.G2C_NN_SHOW_DONE,
                PlayGameOrder.G2C_NN_BU,
                PlayGameOrder.G2C_NN_RESULT,
                PlayGameOrder.G2C_NN_GAMEOVER,
                PlayGameOrder.G2C_NN_TURN_ACTION
            ]);
            return _this;
        }
        /**
         * 发送抢庄消息
         */
        GameMsgHandler.prototype.sendCallMsg = function (flag) {
            if (typeof flag == "string") {
                flag = parseInt(flag);
            }
            var msg = net.SendMsg.create({
                flag: flag
            }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_NN_CALL);
            msg.send();
        };
        /**
         * 发送出牌消息
         */
        GameMsgHandler.prototype.sendChupai = function (cards) {
            net.SendMsg.create({
                cards: cards
            }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_CHU_PAI).send();
        };
        /**
         * 发送不出牌消息
         */
        GameMsgHandler.prototype.sendBuchupai = function () {
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_BUCHU_PAI).send();
        };
        /**
         * 收到不出牌的消息
         */
        GameMsgHandler.prototype.on_G2C_BUCHU_PAI = function (msg) {
            if (msg.datas.playerId === this.gameDatas.myPlyerId) {
                this.scene.hideBtnBar(); //如果是自己,隐藏按钮栏
            }
            else {
                this.scene.setPlayerStatu(msg.datas.playerId, 3 /* IDLE */);
            }
            this.scene.showPlayerTip(msg.datas.playerId, null, 2);
        };
        /**
         * 收到出牌的消息
         */
        GameMsgHandler.prototype.on_G2C_CHU_PAI = function (msg) {
            if (msg.datas.handType === 15 /* BOMB */ || msg.datas.handType === 16 /* HUOJIAN */) {
                this.gameDatas.currentBeilv = this.gameDatas.currentBeilv * 2;
                this.scene.RefreshBeiLv(this.gameDatas.myPlyerId == this.gameDatas.landlordId);
            }
            if (msg.datas.playerId === this.gameDatas.myPlyerId) {
                this.scene.hideBtnBar(); //如果是自己,隐藏按钮栏
                this.gameDatas.poker.deleteCards(msg.datas.cards, this.gameDatas.lastPlayCards);
                this.scene.delCards(this.gameDatas.lastPlayCards);
            }
            else {
                this.scene.setPlayerStatu(msg.datas.playerId, 3 /* IDLE */);
                DDZ.Poker.createPokerCards(msg.datas.cards, this.gameDatas.lastPlayCards);
            }
            this.gameDatas.lastPlayCardId = msg.datas.playerId;
            this.gameDatas.poker.lastHandValue = msg.datas.handValue;
            this.gameDatas.poker.lastSubHandType = msg.datas.handSubType;
            this.gameDatas.poker.lastHandType = msg.datas.handType;
            var sex = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex;
            // let sex = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo
            this.scene.doChuCardsEffect(msg.datas.handType, msg.datas.handValue, sex, msg.datas.handSubType);
            this.scene.doPlayerMethod(msg.datas.playerId, DDZ.Player.prototype.showPlayCards, this.gameDatas.lastPlayCards);
            this.gameDatas.cardRest[msg.datas.playerId] -= msg.datas.cards.length;
            this.scene.doPlayerMethod(msg.datas.playerId, DDZ.Player.prototype.setLeftCardCnt, this.gameDatas.cardRest[msg.datas.playerId]);
        };
        /**
         * 收到抢地主的消息
         */
        GameMsgHandler.prototype.on_G2C_NN_CALL = function (msg) {
            if (!this.gameDatas.isDoAction) {
            }
            if (msg.datas.playerId === this.gameDatas.myPlyerId) {
                this.scene.hideBtnBar(); //如果是自己,隐藏按钮栏
            }
            else {
                this.scene.setPlayerStatu(msg.datas.playerId, 3 /* IDLE */);
            }
            this.gameDatas.fristQiangId = msg.datas.fristQiang;
            this.gameDatas.playerDatas[msg.datas.playerId].qiangZhuang = msg.datas.flag;
            this.scene._btnBar.setCallBtnEnablByScore(msg.datas.flag);
            //显示叫/抢地主
            if (this.gameDatas.fristQiangId === msg.datas.playerId && msg.datas.nowDzRate === 15) {
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.flag, 1);
            }
            else {
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.flag, msg.datas.fristQiang ? 0 : 1);
            }
            if (msg.datas.flag != 0) {
                if (this.gameDatas.gameType == 0 /* COIN */)
                    this.gameDatas.currentBeilv = msg.datas.nowDzRate;
                else
                    this.gameDatas.currentBeilv = msg.datas.flag;
                this.scene.RefreshBeiLv(this.gameDatas.myPlyerId == this.gameDatas.landlordId);
            }
            // 
            this.gameDatas.isDoAction = false;
        };
        /**
         * 收到确定地主消息
         */
        GameMsgHandler.prototype.on_G2C_NN_DEALER = function (msg) {
            this.gameDatas.gameStatus = 4 /* TOU_ZHU */; //将游戏状态更改为游戏开始
            this.gameDatas.landlordId = msg.datas.playerIds[0];
            if (!this.gameDatas.isDoAction) {
            }
            this.scene.RefreshBeiLv(this.gameDatas.myPlyerId == this.gameDatas.landlordId);
            this.scene.hideBtnBar();
            // this.gameDatas.resetPlayerDatas();
            this.scene.updateRoleInfo(true);
            // this.scene.gameOver(msg.datas);
            this.gameDatas.isDoAction = false;
        };
        GameMsgHandler.prototype.on_G2C_GAMEOVER = function (msg) {
            if (!this.gameDatas.isDoAction) {
            }
            var arrLen = msg.datas.gameResultList.length;
            for (var i = 0; i < arrLen; i++) {
                msg.datas.gameResultList[i].nickName = StringUtil.decodeBase64(msg.datas.gameResultList[i].nickName);
            }
            if (msg.datas.gameResultList[0].chunTianMode != 0) {
                this.gameDatas.currentBeilv = this.gameDatas.currentBeilv * 2;
                this.scene.RefreshBeiLv(this.gameDatas.myPlyerId == this.gameDatas.landlordId);
            }
            this.gameDatas.resetPlayerDatas();
            this.scene.gameOver(msg.datas);
            this.gameDatas.isDoAction = false;
        };
        GameMsgHandler.prototype.on_G2C_SEND_CARDS = function (msg) {
            if (!this.gameDatas.cardRest[msg.datas.playerId])
                this.gameDatas.cardRest[msg.datas.playerId] = 0;
            this.gameDatas.cardRest[msg.datas.playerId] += msg.datas.Cards.length;
            console.log("rest:", this.gameDatas.cardRest[msg.datas.playerId], "id", msg.datas.playerId);
            if (msg.datas.playerId === Global.playerDto.id) {
                // if (!this.gameDatas.poker.isinit) {
                this.gameDatas.poker.init(msg.datas.Cards);
                this.scene.dealCard(msg.datas.playerId, 0, this.gameDatas.poker.pokerCards, null);
            }
            else {
                this.scene.doPlayerMethod(msg.datas.playerId, DDZ.Player.prototype.setLeftCardCnt, this.gameDatas.cardRest[msg.datas.playerId]);
            }
            //  //播放动画
            // if (this.gameDatas.cardRest[msg.datas.playerId] == 2) {
            //      this.scene.doRedLightAui();
            // }
            //播放动画
            // if (this.gameDatas.cardRest[msg.datas.playerId] == 1) {
            //      this.scene.doRedLightAui();
            // }
        };
        GameMsgHandler.prototype.on_G2C_PLAYER_INFO = function (msg) {
            _super.prototype.on_G2C_PLAYER_INFO.call(this, msg);
        };
        /**
         * 切换到下个人操作
         */
        GameMsgHandler.prototype.on_G2C_NOW_ACTION_ID = function (msg) {
            this.gameDatas.curActionId = msg.datas.actionPlayerId;
            this.turnAction(msg.datas.actionPlayerId);
        };
        /**
         * 收到底牌
         */
        GameMsgHandler.prototype.on_G2C_DIPAI_CARDS = function (msg) {
            // Poker.createPokerCards(msg.datas.Cards, this.gameDatas.publicCards);
            if (this.gameDatas.landlordId === this.gameDatas.myPlyerId) {
                this.gameDatas.poker.addCards(msg.datas.Cards, this.gameDatas.publicCards);
                this.scene.insertAndSelectCards();
            }
            else {
                DDZ.Poker.createPokerCards(msg.datas.Cards, this.gameDatas.publicCards);
            }
            this.scene.updatePublicCards();
        };
        GameMsgHandler.prototype.turnAction = function (playerId, isReconnect) {
            if (isReconnect === void 0) { isReconnect = false; }
            var info = this.gameDatas.playerDatas[playerId];
            var isSelf = playerId == this.gameDatas.myPlyerId;
            switch (this.gameDatas.gameStatus) {
                case 2 /* START */:
                case 3 /* QIANG_ZHUANG */:
                    if (this.gameDatas.curActionId === playerId) {
                        if (isSelf) {
                            this.scene.showRobMenu();
                        }
                        else {
                            this.scene.setPlayerStatu(playerId, 4 /* WAIT */);
                        }
                    }
                    if (isReconnect) {
                        if (info.qiangZhuang !== -1) {
                            if (info.qiangZhuang === 0) {
                                var firstinfo = this.gameDatas.playerDatas[this.gameDatas.fristQiangId];
                                if (firstinfo) {
                                    this.scene.showPlayerTip(playerId, info.qiangZhuang, ((3 + info.zuoweiIndex - firstinfo.zuoweiIndex) % 3) === 1 ? 1 : 0);
                                }
                                else {
                                    this.scene.showPlayerTip(playerId, info.qiangZhuang, 1);
                                }
                            }
                            else {
                                if (this.gameDatas.fristQiangId) {
                                    if (this.gameDatas.fristQiangId === playerId) {
                                        this.scene.showPlayerTip(playerId, info.qiangZhuang, 1);
                                    }
                                    else {
                                        this.scene.showPlayerTip(playerId, info.qiangZhuang, 0);
                                    }
                                }
                            }
                        }
                    }
                    break;
                case 4 /* TOU_ZHU */:
                    if (this.gameDatas.lastPlayCardId === this.gameDatas.curActionId) {
                        this.scene.setAllPlayerStatu(3 /* IDLE */);
                        this.gameDatas.poker.resetLastCardsInfo();
                        this.gameDatas.lastPlayCardId = null;
                        this.scene.setBuchuBtnEnable(false);
                    }
                    else {
                        this.scene.setBuchuBtnEnable(true);
                    }
                    if (this.gameDatas.curActionId === playerId) {
                        if (isSelf) {
                            this.gameDatas.poker.findProbHandCards();
                            this.scene.setPlayerStatu(playerId, 3 /* IDLE */);
                            this.scene.showPlayCardMenu();
                            this.scene.onCardSelect();
                        }
                        else {
                        }
                        this.scene.doPlayerMethod(playerId, DDZ.Player.prototype.clearDisCard);
                    }
                    break;
                case 5 /* SHOW_ME */:
                    // this.gameDatas.cardType = (actionValue >> 12) & 0xf;
                    // if (info.showed === 0) {//还未算牛
                    //     if (is_self) {
                    //         this.scene.showCalBox();
                    //     }
                    // } else {//已经算牛
                    //     if (is_self) {
                    //         this.scene.hideCalMenu();
                    //     }
                    //     else {
                    //         this.scene.showComeIcon(info.playerId);
                    //     }
                    // }
                    break;
                case 6 /* SHOW_ALL */:
                    break;
            }
        };
        //收到游戏开始信息
        GameMsgHandler.prototype.on_G2C_STARTGAME = function (msg) {
            return __awaiter(this, void 0, void 0, function () {
                var datas, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            datas = msg.datas;
                            this.gameDatas.isReconnect = false;
                            // if (this.gameDatas.gameType === GAME_TYPE.COIN) {
                            //     this.scene.hideWaitGameStartTip();
                            // }
                            //游戏一旦开始了,当前所有的人都在参与游戏列表里面
                            for (key in this.gameDatas.playerDatas) {
                                this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
                            }
                            SoundManage.playEffect("nnStartGame");
                            this.scene.reset();
                            this.gameDatas.init();
                            // this.scene.beilv = 15;
                            if (this.gameDatas.gameType == 0 /* COIN */)
                                this.scene.text_beilv.text = "倍数:" + datas.baseRate + "";
                            else
                                this.scene.text_beilv.text = "倍数:" + 1 + "";
                            this.scene.uiLayer._inviteBtn.visible = false;
                            //播放动画期间,停止处理消息
                            this.stopHandleMsg();
                            return [4 /*yield*/, this.scene.doStartGameAni()];
                        case 1:
                            _a.sent();
                            this.updateGameProcess(datas, false, false);
                            this.scene._pubCardsBox.visible = true;
                            //播放完动画,开始处理消息
                            this.doAllowHandleMsg();
                            return [2 /*return*/];
                    }
                });
            });
        };
        GameMsgHandler.prototype.on_G2C_GAMEPROCESS = function (msg) {
            this.updateGameProcess(msg.datas, true);
        };
        GameMsgHandler.prototype.updateGameProcess = function (datas, isReconnect, bAnimation) {
            if (isReconnect === void 0) { isReconnect = false; }
            this.gameDatas.isReconnect = isReconnect;
            this.gameDatas.roomInfo.done_game_cnt = datas.game_cnt;
            this.gameDatas.gameStatus = datas.stage;
            this.gameDatas.currentBeilv = datas.nowDzRate;
            this.scene.updateRoomInfoUI();
            if (isReconnect) {
                this.gameDatas.fristQiangId = datas.fristQiang;
            }
            this.gameDatas.curActionId = datas.actionPlayerId;
            // }
            //当前状态
            // this.scene.initBetBtns(this.gameDatas.roomInfo.createinfo.betChips);
            if (this.gameDatas.gameStatus !== 1 /* PRE_START */) {
                if (this.gameDatas.isSelfPlayingGame()) {
                    var playerList = this.gameDatas.getPlayingList();
                    var arrLen = playerList.length;
                    for (var i = 0; i < arrLen; i++) {
                        var info = playerList[i];
                        var is_self = info.playerId == this.gameDatas.myPlyerId;
                        if (isReconnect) {
                            this.scene.setPlayerStatu(info.playerId, 3 /* IDLE */);
                            this.scene._btnBar.setCallBtnEnablByScore(info.qiangZhuang);
                        }
                        if (info.qiangZhuang > 0 && this.gameDatas.gameStatus === 4 /* TOU_ZHU */) {
                            this.gameDatas.landlordId = info.playerId;
                            this.scene.updateRoleInfo(false);
                        }
                        this.turnAction(info.playerId, isReconnect);
                    }
                    if (datas.diPaiCards && datas.diPaiCards.length) {
                        var pokerCards = DDZ.Poker.createPokerCards(datas.diPaiCards, this.gameDatas.publicCards);
                        this.scene.updatePublicCards();
                    }
                    if (datas.cards && datas.cards.length && datas.playerId != datas.actionPlayerId) {
                        this.gameDatas.lastPlayCardId = datas.playerId;
                        this.gameDatas.poker.lastHandType = datas.handType;
                        this.gameDatas.poker.lastHandValue = datas.handValue;
                        this.gameDatas.poker.lastSubHandType = datas.handSubType;
                        DDZ.Poker.createPokerCards(datas.cards, this.gameDatas.lastPlayCards);
                        this.scene.doPlayerMethod(datas.playerId, DDZ.Player.prototype.showPlayCards, this.gameDatas.lastPlayCards);
                    }
                    if (isReconnect)
                        this.scene.RefreshBeiLv(this.gameDatas.myPlyerId == this.gameDatas.landlordId);
                }
                else {
                }
            }
            else {
            }
            // this.scene.uiLayer.updateDissolveBtn();
        };
        /**
     * 刷新钻石
     */
        GameMsgHandler.prototype.on_G2C_UPDATE_PLAYER_DIAMOND = function (msg) {
            // egret.log("刷新niuniu", msg.datas.diamond);
            Global.playerDto.diamond = msg.datas.diamond;
            var layers = Layers.getLayer(Layers.RechargeLayer);
            if (layers) {
                layers.updateLabel();
            }
        };
        /**
         * 钻石兑换房卡成功返回
         */
        GameMsgHandler.prototype.on_G2C_UPDATE_PLAYER_FANGKA = function (msg) {
            var layers = Layers.getLayer(Layers.RechargeLayer);
            // egret.log("on_G2C_UPDATE_PLAYER_FANGKA")
            if (layers) {
                layers.updateLabel();
            }
        };
        GameMsgHandler.prototype.on_G2C_UPDATE_PLAYER_GOLD = function (msg) {
            // egret.log("刷新金币on_G2C_UPDATE_PLAYER_GOLD");
            var layers = Layers.getLayer(Layers.RechargeLayer);
            if (layers) {
                layers.updateLabel();
            }
            this.scene.updataPlayMechip(Global.playerDto.gold);
        };
        /*
        * 更新筹码
        */
        GameMsgHandler.prototype.on_G2C_CHIPS_UPDATE = function (msg) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    _super.prototype.on_G2C_CHIPS_UPDATE.call(this, msg);
                    this.scene.updatePlayerChips(msg.datas.playerId, msg.datas.updateChips);
                    return [2 /*return*/];
                });
            });
        };
        return GameMsgHandler;
    }(GameMsgHandlerBase));
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_BUCHU_PAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_CHU_PAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_CALL", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_DEALER", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_GAMEOVER", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_SEND_CARDS", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NOW_ACTION_ID", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_DIPAI_CARDS", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_STARTGAME", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_GAMEPROCESS", null);
    DDZ.GameMsgHandler = GameMsgHandler;
    __reflect(GameMsgHandler.prototype, "DDZ.GameMsgHandler");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=GameMsgHandler.js.map