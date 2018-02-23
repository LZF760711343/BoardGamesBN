/**
 * 牛牛游戏处理游戏协议的类
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
var niuniu;
(function (niuniu) {
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
         * 发送下注消息
         */
        GameMsgHandler.prototype.sendBetMsg = function (chips) {
            if (typeof chips == "string") {
                chips = parseInt(chips);
            }
            net.SendMsg.create({
                in_chips: chips
            }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_NN_BET).send();
        };
        /**
         * 发送下注消息
         */
        GameMsgHandler.prototype.sendShowMsg = function (handtype) {
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_NN_SHOW).send();
        };
        /**
         * 发送算牛消息
         */
        GameMsgHandler.prototype.sendCalMsg = function (handtype, cards) {
            net.SendMsg.create({
                handtype: handtype,
                cards: cards
            }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_NN_SHOW).send();
        };
        GameMsgHandler.prototype.on_G2C_PLAYER_INFO = function (msg) {
            _super.prototype.on_G2C_PLAYER_INFO.call(this, msg);
            if (this.gameDatas.roomInfo.stage > 1 /* PRE_START */) {
                this.scene.setPlayerStatu(msg.datas.playerId, 0 /* NONE */);
            }
            // if (!this.gameDatas.isSelfPlayingGame() && !this.gameDatas.isSelfId(msg.datas.playerId) && this.gameDatas.roomInfo.stage > GAME_STAGE.PRE_START) {
            //     this.scene.dealCardById(msg.datas.playerId, 0, [0, 0, 0, 0], null);
            //     egret.log("G2C_PLAYER_INFO111111");
            //     this.scene.isShowReadyMenu(true);
            // }    
        };
        /**
        * 收到定庄消息
        */
        GameMsgHandler.prototype.on_G2C_NN_DEALER = function (msg) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (!this.gameDatas.isDoAction) {
                this.scene.hideBtnBar();
                this.scene.showPlayerTip(this.gameDatas.myPlyerId, 0, 0);
            }
            this.gameDatas.gameStatus = 4 /* TOU_ZHU */;
            this.gameDatas.dealerId = msg.datas.dealer;
            // egret.log("msg.datas.dealer_scpre"+msg.datas.dealer_scpre)
            this.gameDatas.zhuangBeilv = msg.datas.dealer_scpre;
            this.scene.doRobAni(msg.datas);
            if (this.gameDatas.isSelfPlayingGame()) {
                this.scene._btnBar.RefreshXianBarAvail(this.gameDatas.playerDatas[this.gameDatas.dealerId].chips, Global.playerDto.gold, this.gameDatas.getPlayIngGameCnt(), this.gameDatas.zhuangBeilv, 4, this.gameDatas.roomInfo.createinfo.difen);
            }
            // }
            this.gameDatas.isDoAction = false;
        };
        //收到叫庄消息
        GameMsgHandler.prototype.on_G2C_NN_CALL = function (msg) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (msg.datas.playerId == this.gameDatas.myPlyerId) {
                this.gameDatas.isDoAction = true;
                this.scene.hideBtnBar();
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.flag, 0);
            }
            else {
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.flag, 0);
            }
            // }
        };
        //收到开始算牌消息
        GameMsgHandler.prototype.on_G2C_NN_LOOK = function (msg) {
            // if (!this.gameDatas.isDoAction) {//如果客户端还没有做操作,说明是服务器超时进行自动回调
            //     this.scene.showWaitBetMenu();
            //     egret.log("this.gameDatas.roomInfo.createinfo.betChips[0]:",this.gameDatas.roomInfo.createinfo.betChips[0])
            //     this.scene.showPlayerTip(this.gameDatas.myPlyerId, this.gameDatas.roomInfo.createinfo.betChips[0], 1);
            // }
            this.gameDatas.gameStatus = 5 /* SHOW_ME */;
            this.gameDatas.cardType = msg.datas.handType;
            if (this.gameDatas.isSelfPlayingGame()) {
                this.scene.showCalBox();
            }
            this.gameDatas.isDoAction = false;
        };
        //收到下注消息
        GameMsgHandler.prototype.on_G2C_NN_BET = function (msg) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (msg.datas.playerId == this.gameDatas.myPlyerId) {
                this.gameDatas.isDoAction = true;
                this.scene.showWaitBetMenu();
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.in_chips, 1);
            }
            else {
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.in_chips, 1);
            }
            // }
        };
        GameMsgHandler.prototype.on_G2C_NN_GAMEOVER = function (msg) {
            this.gameDatas.isReconnect = false;
            if (this.gameDatas.isSelfPlayingGame() && !this.gameDatas.isDoAction) {
                this.scene.hideCalMenu();
            }
            this.gameDatas.resetPlayerDatas();
            this.scene.gameOver(msg.datas);
            this.gameDatas.isDoAction = false;
        };
        /**
         * 算牛结束后,收到的消息
         */
        GameMsgHandler.prototype.on_G2C_NN_SHOW_DONE = function (msg) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (this.gameDatas.isSelfId(msg.datas.playerId)) {
                this.gameDatas.isDoAction = true;
                this.scene.hideCalMenu();
            }
            else {
                this.scene.showComeIcon(msg.datas.playerId);
            }
            // }
        };
        //收到出牌消息
        GameMsgHandler.prototype.on_G2C_NN_SHOW = function (msg) {
            SoundManage.playEffect("complete");
            // if (this.gameDatas.isSelfId(msg.datas.playerId)) {
            //     // if (this.roomCfg.gameID == GAME_TYPE.NIUNIU) {
            //     //     if (!this.isDoAction) {
            //     this.scene.hideCalMenu();
            //     //     }
            //     // } else {
            //     //     this._sceneUI.showCardType(msgContent.handvalue);
            //     // }
            //     // this._sceneUI.doDelayHandleMsg(500);
            // }
        };
        GameMsgHandler.prototype.on_G2C_SEND_CARDS = function (msg) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (msg.datas.Cards.length === 1) {
                this.scene.addCard(msg.datas.playerId, msg.datas.Cards[0]);
            }
            else if (msg.datas.Cards.length > 1) {
                // if(this.gameDatas.isPlayngGame(msg.datas.playerId)){
                //     this.scene.dealCardById(msg.datas.playerId, 0, msg.datas.Cards, null);
                // }
                if (this.gameDatas.isReconnect) {
                    this.scene.setCards(msg.datas.playerId, msg.datas.Cards, msg.datas.Cards.length);
                }
                else {
                    this.scene.dealCardById(msg.datas.playerId, 0, msg.datas.Cards, null);
                }
            }
            // }
        };
        //收到游戏开始信息
        GameMsgHandler.prototype.on_G2C_NN_STARTGAME = function (msg) {
            return __awaiter(this, void 0, void 0, function () {
                var datas, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            datas = msg.datas;
                            this.gameDatas.isReconnect = false;
                            if (this.gameDatas.gameType === 0 /* COIN */) {
                                this.scene.hideWaitGameStartTip();
                            }
                            //游戏一旦开始了,当前所有的人都在参与游戏列表里面
                            for (key in this.gameDatas.playerDatas) {
                                this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
                            }
                            // egret.log("on_G2C_NN_STARTGAME:", this.gameDatas.isSelfPlayingGame())
                            SoundManage.playEffect("nnStartGame");
                            this.scene.reset();
                            //播放动画期间,停止处理消息
                            this.stopHandleMsg();
                            return [4 /*yield*/, this.scene.doStartGameAni()];
                        case 1:
                            _a.sent();
                            this.updateGameProcess(datas, false, false);
                            //播放完动画,开始处理消息
                            this.doAllowHandleMsg();
                            return [2 /*return*/];
                    }
                });
            });
        };
        GameMsgHandler.prototype.on_G2C_NN_GAMEPROCESS = function (msg) {
            this.updateGameProcess(msg.datas, true);
        };
        GameMsgHandler.prototype.updateGameProcess = function (datas, isReconnect, bAnimation) {
            if (isReconnect === void 0) { isReconnect = false; }
            this.gameDatas.isReconnect = isReconnect;
            this.gameDatas.roomInfo.done_game_cnt = datas.game_cnt;
            this.gameDatas.gameStatus = datas.stage;
            this.gameDatas.zhuangBeilv = datas.dealer_scpre;
            this.gameDatas.dealerId = datas.dealer;
            this.scene.updateRoomInfoUI();
            //当前状态
            this.scene.initBetBtns(this.gameDatas.roomInfo.createinfo.betChips);
            // this.scene.initBetBtns([5,10,15,20,25]);
            if (this.gameDatas.gameStatus !== 1 /* PRE_START */) {
                // if (this.gameDatas.isSelfPlayingGame()) {
                this.scene.hideWaitGameStartTip();
                var playerList = this.gameDatas.getPlayingList();
                var arrLen = playerList.length;
                for (var i = 0; i < arrLen; i++) {
                    var info = playerList[i];
                    var is_self = info.playerId == this.gameDatas.myPlyerId;
                    if (isReconnect) {
                        this.scene.setPlayerStatu(info.playerId, 0 /* NONE */);
                    }
                    var isDealer = (this.gameDatas.gameStatus !== 2 /* START */ && this.gameDatas.gameStatus !== 3 /* QIANG_ZHUANG */) && info.qiangZhuang > 0;
                    //如果玩家是庄家
                    // egret.log("庄家图标庄家图标=="+isDealer+ info.playerId)
                    if (isDealer) {
                        this.gameDatas.dealerId = info.playerId;
                        // egret.log("庄家图标");
                        this.scene.setPlayerDealerIcon(info.playerId, true);
                    }
                    // if(is_self){
                    //     // egret.log("updateGameProcess:", info.qiangZhuang)
                    //     Utils.printObject(info)
                    // }
                    switch (this.gameDatas.gameStatus) {
                        case 3 /* QIANG_ZHUANG */:
                            if (!isReconnect || info.qiangZhuang === -1) {
                                if (is_self) {
                                    this.scene.showRobMenu();
                                }
                            }
                            else {
                                this.scene.showPlayerTip(info.playerId, info.qiangZhuang, 0);
                            }
                            break;
                        case 4 /* TOU_ZHU */:
                            if (info.touZhu === 0) {
                                if (is_self) {
                                    this.scene.showBetMenu();
                                    if (isDealer) {
                                        this.scene.showWaitBetMenu();
                                    }
                                }
                                this.scene._btnBar.RefreshXianBarAvail(this.gameDatas.playerDatas[this.gameDatas.dealerId].chips, Global.playerDto.gold, this.gameDatas.getPlayIngGameCnt(), this.gameDatas.zhuangBeilv, 4, this.gameDatas.roomInfo.createinfo.difen);
                            }
                            break;
                        case 5 /* SHOW_ME */:
                            // this.gameDatas.cardType = (actionValue >> 12) & 0xf;
                            if (info.showed === 0) {
                                if (is_self) {
                                    this.scene.showCalBox();
                                }
                            }
                            else {
                                if (is_self) {
                                    this.scene.hideCalMenu();
                                }
                                else {
                                    this.scene.showComeIcon(info.playerId);
                                }
                            }
                            if (info.touZhu != 0 && info.playerId != this.gameDatas.myPlyerId) {
                                this.scene.showPlayerTip(info.playerId, info.touZhu, 1);
                            }
                            break;
                        case 6 /* SHOW_ALL */:
                            // if (info.touZhu != 0 && info.playerId != this.gameDatas.myPlyerId) {
                            //     this.scene.showPlayerTip(info.playerId, info.touZhu, 1);
                            // } else {
                            //     this.scene.showPlayerTip(info.playerId, info.qiangZhuang, 0);
                            //     this.scene.setPlayerDealerIcon(info.playerId, true);
                            // }
                            break;
                    }
                }
            }
            else {
            }
            this.scene.uiLayer.updateDissolveBtn();
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
        /**
        * 更新筹码
        */
        GameMsgHandler.prototype.on_G2C_CHIPS_UPDATE = function (msg) {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _super.prototype.on_G2C_CHIPS_UPDATE.call(this, msg);
                            this.scene.saveChip.push({ id: msg.datas.playerId, chips: msg.datas.updateChips });
                            // egret.log("更新筹码" + this.scene.gameDatas.getPlayIngGameCnt(), this.scene.saveChip.length);
                            // if (this.scene.gameDatas.getPlayIngGameCnt() === this.scene.saveChip.length) {
                            return [4 /*yield*/, this.scene.wait(500)];
                        case 1:
                            // egret.log("更新筹码" + this.scene.gameDatas.getPlayIngGameCnt(), this.scene.saveChip.length);
                            // if (this.scene.gameDatas.getPlayIngGameCnt() === this.scene.saveChip.length) {
                            _a.sent();
                            // egret.log("msg.datas.updateChips" + msg.datas.updateChips, this.scene.saveChip.length);
                            for (i = 0; i < this.scene.saveChip.length; i++) {
                                egret.log("this.scene.saveChip.length" + i, this.scene.saveChip[i].id);
                                this.scene.updatePlayerChips(this.scene.saveChip[i].id, this.scene.saveChip[i].chips);
                            }
                            this.scene.saveChip = [];
                            return [2 /*return*/];
                    }
                });
            });
        };
        return GameMsgHandler;
    }(GameMsgHandlerBase));
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_DEALER", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_CALL", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_LOOK", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_BET", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_GAMEOVER", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_SEND_CARDS", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_STARTGAME", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_GAMEPROCESS", null);
    niuniu.GameMsgHandler = GameMsgHandler;
    __reflect(GameMsgHandler.prototype, "niuniu.GameMsgHandler");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameMsgHandler.js.map