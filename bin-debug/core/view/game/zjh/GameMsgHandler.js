/**
 * 扎金花游戏处理游戏协议的类
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
var zjh;
(function (zjh) {
    var GameMsgHandler = (function (_super) {
        __extends(GameMsgHandler, _super);
        // public 
        function GameMsgHandler(scene, gameDatas) {
            var _this = _super.call(this, scene, gameDatas) || this;
            _this._delayMsgList = _this._delayMsgList.concat([
                PlayGameOrder.G2C_GAMEPROCESS,
                PlayGameOrder.G2C_SEND_CARDS,
                PlayGameOrder.G2C_CHIPS_UPDATE,
                PlayGameOrder.G2C_NN_BET,
                PlayGameOrder.G2C_PSZ_QIPAI,
                PlayGameOrder.G2C_GAMEOVER,
                PlayGameOrder.G2C_STARTGAME,
                PlayGameOrder.G2C_ROUND_COUNT,
                PlayGameOrder.G2C_PSZ_BIPAI,
                PlayGameOrder.G2C_PSZ_KANPAI,
                PlayGameOrder.G2C_NOW_ACTION_ID,
            ]);
            _this.checkProtocols();
            return _this;
        }
        //收到下注消息
        GameMsgHandler.prototype.on_G2C_NN_BET = function (msg) {
            // this.gameDatas.playerDatas[msg.datas.playerId].chips = msg.datas.ownChips;
            if (this.gameDatas.gameType == 0 /* COIN */) {
                this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.gold = msg.datas.ownChips;
            }
            if (Global.playerDto.id == msg.datas.playerId && this.gameDatas.gameType == 0 /* COIN */) {
                Global.playerDto.gold = msg.datas.ownChips;
            }
            // if (this.gameDatas.isSelfPlayingGame()) {
            // egret.log("111111111111111");
            if (this.gameDatas.curBetCnt != msg.datas.actionCoin) {
                var num = Math.random() * 3;
                if (num < 1) {
                    SoundManage.playEffectBySex("jiazhu", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                }
                else if (num < 2) {
                    SoundManage.playEffectBySex("jiazhu1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                }
                else {
                    SoundManage.playEffectBySex("jiazhu2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                }
            }
            else {
                if (this.gameDatas.roundCnt === 1) {
                    this.gameDatas.Num++;
                    // egret.log("this.gameDatas.num" + this.gameDatas.Num);
                    if (this.gameDatas.Num <= this.gameDatas.getPlayIngGameCnt()) {
                    }
                    else {
                        SoundManage.playEffectBySex("genzhu", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    }
                }
                else {
                    if (this.gameDatas.playerDatas[msg.datas.playerId].kanPai) {
                        // egret.log("22222222222222");
                        if (this.gameDatas.sumChips != (msg.datas.sumChips - this.gameDatas.curBetCnt * 4)) {
                            if (this.gameDatas.roundCnt <= 5 && this.gameDatas.roundCnt >= 1) {
                                SoundManage.playEffectBySex("genzhu", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                            }
                            else if (this.gameDatas.roundCnt > 5) {
                                SoundManage.playEffectBySex("haigen", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                            }
                        }
                    }
                    else if (this.gameDatas.sumChips != msg.datas.sumChips - this.gameDatas.curBetCnt * 2 && this.gameDatas.sumChips != msg.datas.sumChips - this.gameDatas.curBetCnt * 4) {
                        // egret.log("33333333", this.gameDatas.roundCnt);
                        if (this.gameDatas.roundCnt <= 5 && this.gameDatas.roundCnt >= 1) {
                            SoundManage.playEffectBySex("genzhu", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                        }
                        else if (this.gameDatas.roundCnt > 5) {
                            SoundManage.playEffectBySex("haigen", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                        }
                        if (this.gameDatas.roundCnt == undefined) {
                            SoundManage.playEffectBySex("haigen", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                        }
                    }
                }
            }
            if (this.gameDatas.roundCnt === 1) {
                this.gameDatas.firstTime++;
                if (this.gameDatas.firstTime <= this.gameDatas.getPlayIngGameCnt()) {
                    if (msg.datas.actionCoin < msg.datas.inChips) {
                        msg.datas.inChips -= msg.datas.actionCoin;
                    }
                    this.scene.doPlayerBetAni(msg.datas.playerId, msg.datas.inChips);
                    egret.log("this.gameDatas.roundCntStart" + this.gameDatas.roundCnt, msg.datas.inChips);
                }
                else {
                    this.scene.doPlayerBetAni(msg.datas.playerId, msg.datas.actionCoin);
                }
            }
            else {
                this.scene.doPlayerBetAni(msg.datas.playerId, msg.datas.actionCoin);
            }
            egret.log("this.gameDatas.roundCnt" + this.gameDatas.roundCnt);
            //更新当前下的注
            this.scene.doPlayerMethod(msg.datas.playerId, zjh.Player.prototype.setBetChips, msg.datas.inChips);
            this.scene.doPlayerMethod(msg.datas.playerId, zjh.Player.prototype.updateChips, msg.datas.ownChips);
            this.gameDatas.sumChips = msg.datas.sumChips;
            this.gameDatas.curActionId = msg.datas.actionPlayerId;
            this.gameDatas.curBetCnt = msg.datas.actionCoin;
            this.turnAction();
            var player = this.scene.getPlayerById(msg.datas.playerId);
            if (player) {
                player.updateChips(msg.datas.ownChips);
            }
        };
        /**
         * 轮到谁操作
         */
        GameMsgHandler.prototype.on_G2C_NOW_ACTION_ID = function (msg) {
            if (this.gameDatas.isSelfPlayingGame()) {
                this.gameDatas.curActionId = msg.datas.actionPlayerId;
                this.turnAction();
            }
        };
        /**
         * 收到看牌的消息
         */
        GameMsgHandler.prototype.on_G2C_PSZ_KANPAI = function (msg) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (this.gameDatas.noTime) {
                var num = Math.random() * 3;
                if (num < 1) {
                    SoundManage.playEffectBySex("kanpai", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                }
                else if (num < 2) {
                    SoundManage.playEffectBySex("kanpai1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                }
                else {
                    SoundManage.playEffectBySex("kanpai2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                }
                this.OnKanPai([msg.datas]);
            }
            else {
                if (msg.datas.playerId == Global.playerDto.id) {
                    this.gameDatas.cuopai = new zjh.CuoPaiAni();
                    this.scene.addChild(this.gameDatas.cuopai);
                    // egret.log("111111");
                    var num = Math.random() * 3;
                    if (num < 1) {
                        SoundManage.playEffectBySex("kanpai", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    }
                    else if (num < 2) {
                        SoundManage.playEffectBySex("kanpai1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    }
                    else {
                        SoundManage.playEffectBySex("kanpai2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    }
                    this.gameDatas.cuopai.PlayCuoPai(msg.datas.cards, this.OnKanPai, this, [msg.datas]);
                }
                else {
                    var num = Math.random() * 3;
                    if (num < 1) {
                        SoundManage.playEffectBySex("kanpai", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    }
                    else if (num < 2) {
                        SoundManage.playEffectBySex("kanpai1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    }
                    else {
                        SoundManage.playEffectBySex("kanpai2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    }
                    this.scene.doPlayerMethod(msg.datas.playerId, zjh.Player.prototype.setAction, 4 /* LOOK */);
                    this.gameDatas.handCardList[msg.datas.playerId] = msg.datas.cards;
                    this.scene.doPlayerMethod(msg.datas.playerId, zjh.Player.prototype.showCardAni, msg.datas.cards, true);
                    this.scene.updateBtnBar();
                }
            }
            this.gameDatas.playerDatas[msg.datas.playerId].kanPai = msg.datas.kanPai;
            // }
        };
        GameMsgHandler.prototype.OnKanPai = function (arg) {
            var datas = arg[0];
            this.scene.doPlayerMethod(datas.playerId, zjh.Player.prototype.setAction, 4 /* LOOK */);
            this.gameDatas.handCardList[datas.playerId] = datas.cards;
            this.scene.doPlayerMethod(datas.playerId, zjh.Player.prototype.showCardAni, datas.cards, true);
            this.scene.updateBtnBar();
        };
        // 
        /**
         * 收到发牌消息
         */
        GameMsgHandler.prototype.on_G2C_SEND_CARDS = function (msg) {
            if (this.gameDatas.gameStatus > 1 /* PRE_START */) {
                SoundManage.playEffect("start_szp");
                this.gameDatas.handCardList[msg.datas.playerId] = msg.datas.Cards;
                if (this.gameDatas.isPlayngGame(msg.datas.playerId)) {
                    if (this.gameDatas.isReconnect) {
                        this.scene.setCards(msg.datas.playerId, msg.datas.Cards);
                    }
                    else {
                        this.scene.dealCardById(msg.datas.playerId, msg.datas.Cards);
                    }
                }
            }
        };
        /*
        * 更新筹码
        */
        GameMsgHandler.prototype.on_G2C_CHIPS_UPDATE = function (msg) {
            return __awaiter(this, void 0, void 0, function () {
                var datas;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _super.prototype.on_G2C_CHIPS_UPDATE.call(this, msg);
                            datas = msg.datas;
                            if (!this.scene.gameDatas.really) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.scene.wait(500)];
                        case 1:
                            _a.sent();
                            this.scene.updatePlayerChips(datas.playerId, datas.updateChips);
                            return [3 /*break*/, 3];
                        case 2:
                            this.scene.updatePlayerChips(datas.playerId, datas.updateChips);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 收到游戏结束的消息
         */
        GameMsgHandler.prototype.on_G2C_GAMEOVER = function (msg) {
            // if (!this.gameDatas.isDoAction) {//如果客户端还没有做操作,说明是服务器超时进行自动回调
            //     this.scene.hideCalMenu();
            // }
            // egret.log("this.cuopai " + this.gameDatas.cuopai);
            this.gameDatas.isReconnect = false;
            if (this.gameDatas.cuopai) {
                // this.gameDatas.cuopai.destroy();
                // if (this.gameDatas.cuopai.parent) {
                //     this.scene.removeChild(this.gameDatas.cuopai);
                //     this.gameDatas.cuopai.stopTimer();
                // }
                this.gameDatas.cuopai = null;
            }
            this.gameDatas.resetPlayerDatas();
            this.scene.gameOver(msg.datas);
            this.gameDatas.isDoAction = false;
        };
        //收到游戏开始信息
        GameMsgHandler.prototype.on_G2C_STARTGAME = function (msg) {
            return __awaiter(this, void 0, void 0, function () {
                var datas, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            /**
                             * 由于异步的await在非es7的实现方式为将当前函数拆分为多个部分,
                             * 通过switch多次调用当前函数(具体可以去看编译后的js文件),而msg对象会在函数第一次调用后就执行destroy函数回收对象
                             * 从而导致在await后面拿不到data数据,所有现在先把datas数据保持在一个datas的本地变量里面
                             * 防止msg回收后拿不到数据
                             */
                            // this.gameDatas.
                            // if(this.gameDatas.isSelfPlayingGame()){} 
                            this.scene.gameDatas.really = false;
                            this.gameDatas.Num = this.gameDatas.firstTime = 0;
                            datas = msg.datas;
                            this.gameDatas.isReconnect = false;
                            //游戏一旦开始了,当前所有的人都在参与游戏列表里面
                            for (key in this.gameDatas.playerDatas) {
                                this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
                            }
                            SoundManage.playEffect("nnStartGame");
                            this.gameDatas.resetPlayerDatas();
                            this.scene._roundTipBar.visible = true;
                            this.scene.reset();
                            //播放动画期间,停止处理消息
                            this.stopHandleMsg();
                            this.scene.hideWaitGameStartTip();
                            return [4 /*yield*/, this.scene.doStartGameAni()];
                        case 1:
                            _a.sent();
                            this.updateGameProcess(datas, false, false);
                            // //播放完动画,开始处理消息
                            this.doAllowHandleMsg();
                            return [2 /*return*/];
                    }
                });
            });
        };
        GameMsgHandler.prototype.on_G2C_GAMEPROCESS = function (msg) {
            this.updateGameProcess(msg.datas, true);
        };
        GameMsgHandler.prototype.on_G2C_PLAYER_INFO = function (msg) {
            _super.prototype.on_G2C_PLAYER_INFO.call(this, msg);
            if (msg.datas.touZhu) {
                this.gameDatas.sumChips += msg.datas.touZhu;
            }
            if (msg.datas.loseOrQiPai) {
                this.scene.doPlayerMethod(msg.datas.playerId, zjh.Player.prototype.setAction, msg.datas.loseOrQiPai);
            }
            if (msg.datas.kanPai) {
                this.scene.doPlayerMethod(msg.datas.playerId, zjh.Player.prototype.setAction, 4 /* LOOK */);
            }
            this.scene.doPlayerMethod(msg.datas.playerId, zjh.Player.prototype.setBetChips, msg.datas.touZhu || 0);
            if (this.gameDatas.roomInfo.stage > 1 /* PRE_START */) {
                this.scene.setPlayerStatu(msg.datas.playerId, 3 /* IDLE */);
            }
            // if (!this.gameDatas.isSelfPlayingGame() && !this.gameDatas.isSelfId(msg.datas.playerId) && this.gameDatas.roomInfo.stage > GAME_STAGE.PRE_START) {
            //     this.scene.dealCardById(msg.datas.playerId, [0, 0, 0]);
            //     this.scene.isShowReadyMenu(true);
            // }
        };
        /**
         * 更新当前轮数
         */
        GameMsgHandler.prototype.on_G2C_ROUND_COUNT = function (msg) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            this.gameDatas.roundCnt = msg.datas.round;
            egret.log("this.gameDatas.roundCntthis.gameDatas.roundCnt" + this.gameDatas.roundCnt);
            this.gameDatas.maxRoundCnt = msg.datas.roundMax;
            this.scene.updateRoundBetInof();
            this.scene.updateBtnBar();
            if (this.gameDatas.roundCnt === zjh.COMP_CARD_CNT) {
                Toast.launch(GameLangs.zjhCompCardTip);
            }
            else if (this.gameDatas.roundCnt === this.gameDatas.maxRoundCnt) {
                Toast.launch(GameLangs.zjhLastRoundTip);
            }
            // }
        };
        /**
         * 收到比牌的消息
         */
        GameMsgHandler.prototype.on_G2C_PSZ_BIPAI = function (msg) {
            var _this = this;
            // if (this.gameDatas.isSelfPlayingGame()) {
            this.scene._btnBar.visible = false;
            this.scene.gameDatas.really = true;
            var num = Math.random() * 3;
            if (num < 1) {
                SoundManage.playEffectBySex("bipai", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            }
            else if (num < 2) {
                SoundManage.playEffectBySex("bipai1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            }
            else {
                SoundManage.playEffectBySex("bipai2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            }
            var datas = msg.datas;
            //播放动画期间,停止处理消息
            this.scene.setAllPlayerStatu(3 /* IDLE */);
            SoundManage.playEffect("bidian");
            this.stopHandleMsg();
            this.scene.doBiPaiGameAni(datas.isWin, datas.playerId, datas.otherId, function () {
                egret.log("播放比牌动画结束！！！");
                if (datas.isWin) {
                    _this.scene.doPlayerMethod(datas.otherId, zjh.Player.prototype.setAction, 1 /* LOSE */);
                    _this.gameDatas.playerDatas[datas.otherId].loseOrQiPai |= 1 /* LOSE */;
                }
                else {
                    _this.scene.doPlayerMethod(datas.playerId, zjh.Player.prototype.setAction, 1 /* LOSE */);
                    _this.gameDatas.playerDatas[datas.playerId].loseOrQiPai |= 1 /* LOSE */;
                }
                if (_this.gameDatas.curActionId != datas.actionPlayerId) {
                    _this.gameDatas.curActionId = datas.actionPlayerId;
                    _this.turnAction();
                }
                _this.doAllowHandleMsg();
            }, this);
            // }
        };
        /**
         * 收到弃牌的消息
         */
        GameMsgHandler.prototype.on_G2C_PSZ_QIPAI = function (msg) {
            SoundManage.playEffect("fold");
            // if (this.gameDatas.isSelfPlayingGame()) {
            this.scene.gameDatas.really = false;
            var num = Math.random() * 3;
            if (num < 1) {
                SoundManage.playEffectBySex("qipai", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            }
            else if (num < 2) {
                SoundManage.playEffectBySex("qipai1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            }
            else {
                SoundManage.playEffectBySex("qipai2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            }
            this.scene.HideButs();
            this.scene.doPlayerMethod(msg.datas.playerId, zjh.Player.prototype.setAction, msg.datas.loseOrQiPai);
            this.gameDatas.playerDatas[msg.datas.playerId].loseOrQiPai = msg.datas.loseOrQiPai;
            if (this.gameDatas.curActionId != msg.datas.actionPlayerId) {
                this.gameDatas.curActionId = msg.datas.actionPlayerId;
                this.turnAction();
            }
            else {
                this.scene.updateBtnBar();
            }
            // }
        };
        /**
         * 切换到下个人进行操作
         */
        GameMsgHandler.prototype.turnAction = function () {
            this.scene.setAllPlayerStatu(3 /* IDLE */);
            this.scene.updateRoundBetInof();
            this.scene.updateSumChipsUI();
            this.scene.updateBtnBar();
            this.scene.updateChipsGroup();
            if (this.gameDatas.curActionId) {
                this.scene.setPlayerStatu(this.gameDatas.curActionId, 4 /* WAIT */);
            }
            // if (this.gameDatas.curActionId === this.gameDatas.myPlyerId) {//如果是轮到自己
            this.scene.isAutoBet();
            // } else {
            // }
        };
        GameMsgHandler.prototype.updateGameProcess = function (datas, isReconnect, bAnimation) {
            if (isReconnect === void 0) { isReconnect = false; }
            this.gameDatas.isReconnect = isReconnect;
            this.gameDatas.roomInfo.done_game_cnt = datas.game_cnt;
            this.gameDatas.gameStatus = datas.stage;
            if (isReconnect) {
                this.gameDatas.curBetCnt = datas.actionCoin;
                this.gameDatas.curActionId = datas.actionPlayerId;
                this.gameDatas.maxRoundCnt = datas.roundMax;
                this.gameDatas.roundCnt = datas.round;
            }
            this.scene.updateRoomInfoUI();
            this.scene.updateChipsGroup();
            //当前状态
            if (this.gameDatas.gameStatus !== 1 /* PRE_START */) {
                if (this.gameDatas.isSelfPlayingGame()) {
                    if (isReconnect && datas.round === 1) {
                        this.gameDatas.Num = this.gameDatas.getPlayIngGameCnt();
                    }
                    this.scene.setChipsBarAndRoundBarVisible(true);
                    this.scene.hideWaitGameStartTip();
                    this.turnAction();
                }
                else {
                }
            }
            else {
            }
            this.scene.uiLayer.updateDissolveBtn();
        };
        /**
         * 发送下注消息,加注也是用这个消息
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
         * 发送看牌消息
         */
        GameMsgHandler.prototype.sendKanMsg = function (num) {
            this.gameDatas.noTime = num;
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_PSZ_KANPAI).send();
        };
        /**
         * 发送比牌消息
         */
        GameMsgHandler.prototype.sendBi = function (playerId) {
            net.SendMsg.create({ otherId: playerId }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_PSZ_BIPAI).send();
        };
        /**
         * 发送弃牌消息
         */
        GameMsgHandler.prototype.sendQiMsg = function () {
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_PSZ_QIPAI).send();
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
            this.scene.updateBtnBar();
            this.scene.updataPlayMechip(Global.playerDto.gold);
        };
        return GameMsgHandler;
    }(GameMsgHandlerBase));
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NN_BET", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_NOW_ACTION_ID", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_PSZ_KANPAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_SEND_CARDS", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_GAMEOVER", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_STARTGAME", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_GAMEPROCESS", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_ROUND_COUNT", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_PSZ_BIPAI", null);
    __decorate([
        Decorators.printDatas(true)
    ], GameMsgHandler.prototype, "on_G2C_PSZ_QIPAI", null);
    zjh.GameMsgHandler = GameMsgHandler;
    __reflect(GameMsgHandler.prototype, "zjh.GameMsgHandler");
})(zjh || (zjh = {}));
//# sourceMappingURL=GameMsgHandler.js.map