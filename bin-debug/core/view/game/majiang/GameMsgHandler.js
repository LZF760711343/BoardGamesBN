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
var majiang;
(function (majiang) {
    var GameMsgHandler = (function (_super) {
        __extends(GameMsgHandler, _super);
        // public 
        function GameMsgHandler(scene, gameDatas) {
            var _this = _super.call(this, scene, gameDatas) || this;
            _this._delayMsgList = _this._delayMsgList.concat([
                PlayGameOrder.G2C_MJ_LAIZI,
                PlayGameOrder.G2C_MJ_MAPAI,
                PlayGameOrder.G2C_STARTGAME,
                PlayGameOrder.G2C_MJ_GAOJI_ACTION,
                PlayGameOrder.G2C_NN_GAMEOVER,
                PlayGameOrder.G2C_CHU_PAI,
                PlayGameOrder.G2C_MJ_CHIPAI,
                PlayGameOrder.G2C_MJ_PENGPAI,
                PlayGameOrder.G2C_MJ_TANPAI,
                PlayGameOrder.G2C_MJ_CLEAR_GAOJI_ACTION,
                PlayGameOrder.G2C_MJ_ADD_CHUPAI,
                PlayGameOrder.G2C_MJ_SHAOPAI,
                PlayGameOrder.G2C_MJ_GANGPAI,
                PlayGameOrder.G2C_NOW_ACTION_ID,
                PlayGameOrder.G2C_GAMEPROCESS,
            ]);
            _this.checkProtocols();
            return _this;
        }
        /**
         * 发送吃牌消息
         */
        GameMsgHandler.prototype.sendChiMsg = function (cardValues) {
            net.SendMsg.create({
                cards: cardValues
            }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_MJ_CHIPAI).send();
        };
        /**
         * 发送出牌消息
         */
        GameMsgHandler.prototype.sendChupai = function (cardValue) {
            net.SendMsg.create({
                cardValue: cardValue
            }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_MJ_CHU_PAI).send();
        };
        /**
         * 发送过的消息
         */
        GameMsgHandler.prototype.sendMjGuoMsg = function () {
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_MJ_GAOJI_ACTION_JUMP).send();
            this.scene.resetSelectBox();
        };
        /**
 * 发送过的消息
 */
        GameMsgHandler.prototype.sendMjHuMsg = function () {
            net.SendMsg.create({ playerId: this.gameDatas.myPlyerId }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_MJ_HU_PAI).send();
            this.scene.resetSelectBox();
            this.scene.removeLastPlayCard();
        };
        /**
         * 发送碰的消息
         */
        GameMsgHandler.prototype.sendMjPengMsg = function (cardValues) {
            net.SendMsg.create({ cards: cardValues }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_MJ_PENGPAI).send();
        };
        /**
         * 发送杠的消息
         */
        GameMsgHandler.prototype.sendMjGangMsg = function (cardValues) {
            net.SendMsg.create({ cardValue: cardValues[0] }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_MJ_GANGPAI).send();
        };
        /**
         * 发送勺的消息
         */
        GameMsgHandler.prototype.sendMjShaoMsg = function (cardValues) {
            net.SendMsg.create({ cards: cardValues }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_MJ_SHAOPAI).send();
        };
        /**
         * 发送摊牌的消息
         */
        GameMsgHandler.prototype.sendMjTanMsg = function (cardValues) {
            egret.log("cardsValueAndCount:", cardValues);
            net.SendMsg.create({ cardsValueAndCount: cardValues }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_MJ_TANPAI).send();
        };
        /**
         * 收到出牌的消息
         */
        GameMsgHandler.prototype.on_G2C_CHU_PAI = function (msg) {
            this.scene.resetSortLastCard();
            this.gameDatas.lastPlayCardId = msg.datas.playerId;
            this.gameDatas.lastCardValue = msg.datas.cardValue;
            this.scene.playCard(msg.datas.playerId, msg.datas.cardValue);
            var sex = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex;
            this.scene.doChuCardsEffect(msg.datas.cardValue, sex);
        };
        /**
         * 收到吃的消息
         */
        GameMsgHandler.prototype.on_G2C_MJ_CHIPAI = function (msg) {
            var deleteCards = [];
            var arrLen = msg.datas.cards.length;
            for (var i = 0; i < arrLen; i++) {
                if (msg.datas.cards[i] !== msg.datas.cardValue) {
                    deleteCards.push(msg.datas.cards[i]);
                }
            }
            this.scene.doMjchiAui(msg.datas.playerId);
            var item = majiang.MJActionItem.create();
            item.init(7 /* CHI */, msg.datas.cards, msg.datas.cardValue);
            item.delCards = deleteCards;
            this.scene.addCardType(msg.datas.playerId, item);
            this.scene.removeLastPlayCard();
            this.scene.resetSelectBox();
        };
        /**
         * 收到碰牌的消息
         */
        GameMsgHandler.prototype.on_G2C_MJ_PENGPAI = function (msg) {
            var item = majiang.MJActionItem.create();
            item.init(8 /* PENG */, [msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue], msg.datas.cardValue);
            item.delCards = [msg.datas.cardValue, msg.datas.cardValue];
            this.scene.addCardType(msg.datas.playerId, item);
            this.scene.doMjPengAui(msg.datas.playerId);
            this.scene.removeLastPlayCard();
        };
        /**
         * 收到摊牌的消息
         */
        GameMsgHandler.prototype.on_G2C_MJ_TANPAI = function (msg) {
            this.scene.delCards(msg.datas.playerId, msg.datas.cards);
            this.scene.addTanCards(msg.datas.playerId, msg.datas.cards);
            this.scene.doMjtanAui(msg.datas.playerId, msg.datas.cards);
        };
        GameMsgHandler.prototype.on_G2C_MJ_CLEAR_GAOJI_ACTION = function (msg) {
            this.scene.resetSelectBox();
        };
        /**
         * 将牌加入到牌桌上
         */
        GameMsgHandler.prototype.on_G2C_MJ_ADD_CHUPAI = function (msg) {
            this.gameDatas.lastCardValue = null;
            this.scene.addDisCard(msg.datas.playerId, msg.datas.cardValue);
        };
        /**
         * 收到勺牌的消息
         */
        GameMsgHandler.prototype.on_G2C_MJ_SHAOPAI = function (msg) {
            //  let sex = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex;
            var item = majiang.MJActionItem.create();
            item.init(6 /* SHAO */, [0 /* NONE */, msg.datas.cards[0], 0 /* NONE */], msg.datas.cards[0]);
            // msg.datas.cards.splice(1);
            item.delCards = msg.datas.cards;
            this.scene.doMjshaoAui(msg.datas.playerId);
            this.scene.addCardType(msg.datas.playerId, item);
            this.scene.removeLastPlayCard();
        };
        /**
         * 收到杠牌的消息
         */
        GameMsgHandler.prototype.on_G2C_MJ_GANGPAI = function (msg) {
            var sex = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex;
            var item = majiang.MJActionItem.create();
            if (msg.datas.isAnGang == 1) {
                item.init(25 /* AN_GANG */, [0 /* NONE */, 0 /* NONE */, 0 /* NONE */, msg.datas.cardValue], msg.datas.cardValue);
                item.delCards = [msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue];
                SoundManage.playEffectBySexByType("angang", sex, LocalDatas.sDatas.datas.SoundType);
                this.scene.addCardType(msg.datas.playerId, item);
            }
            else if (msg.datas.isAnGang == 0) {
                item.init(9 /* GANG */, [msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue], msg.datas.cardValue);
                item.delCards = [msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue];
                SoundManage.playEffectBySexByType("gang", sex, LocalDatas.sDatas.datas.SoundType);
                this.scene.addCardType(msg.datas.playerId, item);
            }
            else {
                item.init(9 /* GANG */, [msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue], msg.datas.cardValue);
                item.delCards = [msg.datas.cardValue];
                SoundManage.playEffectBySexByType("gang", sex, LocalDatas.sDatas.datas.SoundType);
                this.scene.updateCardType(msg.datas.playerId, item);
            }
            this.scene.doMjgangAui(msg.datas.playerId);
            this.scene.removeLastPlayCard();
        };
        /**
        * 更新筹码
        */
        GameMsgHandler.prototype.on_G2C_CHIPS_UPDATE = function (msg) {
            _super.prototype.on_G2C_CHIPS_UPDATE.call(this, msg);
            this.scene.updatePlayerChips(msg.datas.playerId, msg.datas.updateChips);
        };
        GameMsgHandler.prototype.on_G2C_NN_GAMEOVER = function (msg) {
            // let arrLen = msg.datas.gameResultList.length;
            // for (let i = 0; i < arrLen; i++) {
            //     msg.datas.gameResultList[i].nickName =  StringUtil.decodeBase64(msg.datas.gameResultList[i].nickName);
            // }
            this.gameDatas.resetPlayerDatas();
            this.scene.gameOver(msg.datas);
            this.gameDatas.isDoAction = false;
        };
        /**摇骰子 */
        GameMsgHandler.prototype.on_G2C_YAO_SEZI = function (msg) {
            this.gameDatas.seziList = msg.datas.shaiziDianshuList;
            // this.scene.btn_sezi.visible = false;
            this.gameDatas.hasReceiveSeZi = true;
            // this.scene.ShowSeZiCount();
            this.scene.PlayYaoSeZi();
        };
        GameMsgHandler.prototype.on_G2C_MJ_MAPAI = function (msg) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (msg.datas.maCards) {
                        this.gameDatas.maCards = msg.datas.maCards;
                        this.gameDatas.zhongmaCards = msg.datas.zhongmaCards;
                    }
                    return [2 /*return*/];
                });
            });
        };
        GameMsgHandler.prototype.on_G2C_MJ_LAIZI = function (msg) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!msg.datas.gostCards) return [3 /*break*/, 2];
                            this.gameDatas.laziCard = msg.datas.gostCards;
                            this.delayHandleMsg(10000);
                            return [4 /*yield*/, this.scene.initLaziCard(this.gameDatas.laziCard)];
                        case 1:
                            _a.sent();
                            this.scene.initLaziCard1(this.gameDatas.laziCard);
                            this.doAllowHandleMsg();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        GameMsgHandler.prototype.on_G2C_SEND_CARDS = function (msg) {
            return __awaiter(this, void 0, void 0, function () {
                var datas, destList;
                return __generator(this, function (_a) {
                    datas = msg.datas;
                    this.scene.resetSelectBox();
                    if (datas.anGangCards) {
                        this.gameDatas.remainCards -= datas.anGangCards.length * 4;
                    }
                    if (datas.pengCards) {
                        this.gameDatas.remainCards -= datas.pengCards.length * 3;
                    }
                    if (datas.tanCards) {
                        this.gameDatas.remainCards -= datas.tanCards.length;
                    }
                    if (datas.chiCards) {
                        this.gameDatas.remainCards -= datas.chiCards.length;
                    }
                    if (datas.gangCards) {
                        this.gameDatas.remainCards -= datas.gangCards.length * 4;
                    }
                    if (datas.shaoCards) {
                        this.gameDatas.remainCards -= datas.shaoCards.length;
                    }
                    if (datas.chuCards) {
                        this.gameDatas.remainCards -= datas.chuCards.length;
                    }
                    if (datas.Cards) {
                        this.gameDatas.remainCards -= datas.Cards.length;
                    }
                    // this.gameDatas.remainCards -= datas.CardLen;
                    egret.log("剩下牌数", this.gameDatas.remainCards);
                    this.scene.initRemainCards();
                    if (datas.chuCards) {
                        destList = majiang.Majiang.getDestList(datas);
                        this.scene.dealCard(datas.playerId, datas.Cards, destList);
                        this.scene.iniDisCards(datas.playerId, datas.chuCards);
                    }
                    else {
                        if (datas.Cards.length > 1) {
                            this.scene.addCards(datas.playerId, datas.Cards);
                        }
                        else {
                            this.scene.addCard(datas.playerId, datas.Cards[0]);
                            this.scene.addCardSound(datas.Cards[0]);
                            if (this.gameDatas.lastCardValue) {
                                this.scene.addDisCard(this.gameDatas.lastPlayCardId, this.gameDatas.lastCardValue);
                            }
                        }
                    }
                    return [2 /*return*/];
                });
            });
        };
        GameMsgHandler.prototype.on_G2C_PLAYER_INFO = function (msg) {
            _super.prototype.on_G2C_PLAYER_INFO.call(this, msg);
        };
        /**
         * 切换到下个人操作
         */
        GameMsgHandler.prototype.on_G2C_NOW_ACTION_ID = function (msg) {
            this.gameDatas.curActionId = msg.datas.actionPlayerId;
            // this.gameDatas.lastPlayCardId = msg.datas.preChuPaiPlayerId;
            this.turnAction(msg.datas.actionPlayerId);
        };
        /**
         *
         */
        GameMsgHandler.prototype.on_G2C_MJ_GAOJI_ACTION = function (msg) {
            majiang.Majiang.changeCardsByType(msg.datas.cardsValueAndCount, msg.datas.activeType, msg.datas.cardValue, this.gameDatas._actionItems);
            this.scene.addSelectItems();
            // this.gameDatas._actionItems.push(msg.datas);
        };
        GameMsgHandler.prototype.turnAction = function (playerId, isReconnect) {
            if (isReconnect === void 0) { isReconnect = false; }
            var info = this.gameDatas.playerDatas[playerId];
            var isSelf = playerId == this.gameDatas.myPlyerId;
            egret.log("this.gameDatas.gameStatus", this.gameDatas.gameStatus);
            switch (this.gameDatas.gameStatus) {
                case 1 /* PRE_START */:
                    break;
                default:
                    if (this.gameDatas.curActionId == 0) {
                        this.gameDatas.curActionId = this.gameDatas.dealerId;
                    }
                    if (this.gameDatas.curActionId === playerId) {
                        this.scene.updateTimeBoxUI();
                        this.scene.startTimeBoxTimer();
                    }
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
                            //游戏一旦开始了,当前所有的人都在参与游戏列表里面
                            for (key in this.gameDatas.playerDatas) {
                                this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
                            }
                            SoundManage.playEffect("nnStartGame");
                            this.gameDatas.gameStatus = 2;
                            this.scene.reset();
                            this.gameDatas.init();
                            //播放动画期间,停止处理消息
                            this.delayHandleMsg(10000);
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
        GameMsgHandler.prototype.on_G2C_GAMEPROCESS = function (msg) {
            this.updateGameProcess(msg.datas, true);
        };
        GameMsgHandler.prototype.updateGameProcess = function (datas, isReconnect, bAnimation) {
            if (isReconnect === void 0) { isReconnect = false; }
            this.gameDatas.isReconnect = isReconnect;
            this.gameDatas.roomInfo.done_game_cnt = datas.game_cnt;
            this.gameDatas.gameStatus = datas.stage;
            this.scene.updateRoomInfoUI();
            this.scene.updateDifenLable();
            this.gameDatas.curActionId = datas.actionPlayerId;
            this.gameDatas.dealerId = datas.dealer;
            this.gameDatas.lastPlayCardId = datas.prePlayerId;
            this.scene.uiLayer.updateDissolveBtn();
            if (this.gameDatas.gameStatus !== 1 /* PRE_START */) {
                if (this.gameDatas.isSelfPlayingGame()) {
                    // if()
                    if (datas.prePlayerId) {
                        this.scene.initLastPlayCard(datas.prePlayerId, datas.preCardValue);
                    }
                    this.scene.setAllPlayerStatu(3 /* IDLE */);
                    var playerList = this.gameDatas.getPlayingList();
                    var arrLen = playerList.length;
                    for (var i = 0; i < arrLen; i++) {
                        var info = playerList[i];
                        var is_self = info.playerId == this.gameDatas.myPlyerId;
                        // if (isReconnect) {
                        //     this.scene.setPlayerStatu(info.playerId, PLAYER_UI_STATU.IDLE);
                        // }
                        //             egret.log("datas.dealer", datas.dealer);
                        if (datas.dealer === info.playerId) {
                            this.scene.doPlayerMethod(info.playerId, PlayerBase.prototype.setDealerIcon, true);
                            this.scene.setTimeBoxDirect(info.playerId);
                        }
                        //  this.scene.setTimeBoxArrowsDirect(info.playerId);
                        // if (!this.gameDatas.isReconnect) {//重连的时候,等到拿到自己的手牌之后,再去进行turnAction
                        this.turnAction(info.playerId, isReconnect);
                    }
                }
            }
        };
        return GameMsgHandler;
    }(GameMsgHandlerBase));
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_CHU_PAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_MJ_CHIPAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_MJ_PENGPAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_MJ_TANPAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_MJ_ADD_CHUPAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_MJ_SHAOPAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_MJ_GANGPAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_GAMEOVER", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_SEND_CARDS", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NOW_ACTION_ID", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_MJ_GAOJI_ACTION", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_STARTGAME", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_GAMEPROCESS", null);
    majiang.GameMsgHandler = GameMsgHandler;
    __reflect(GameMsgHandler.prototype, "majiang.GameMsgHandler");
})(majiang || (majiang = {}));
//# sourceMappingURL=GameMsgHandler.js.map