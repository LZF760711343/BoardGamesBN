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
var DDZ;
(function (DDZ) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene(args) {
            var _this = _super.call(this, args) || this;
            // CardBox.prototype.dealCards()
            _this.skinName = DDZ.GameSceneSkin;
            return _this;
        }
        GameScene.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            SoundManage.playMusic(SoundManage.keyMap.ddz_bg);
            //  this._disBox3.layout["direct"] = egret.HorizontalAlign.RIGHT;
            // this._disBox3.showCards(Poker.createPokerCards([
            //     65, 67, 68, 97, 99, 131, 145, 162, 178, 180, 193, 196, 210, 211, 212, 17, 19, 20
            // ]));
            // // this._disBox3.layout["direct"] = egret.HorizontalAlign.RIGHT;
            // this._disBox4.showCards(Poker.createPokerCards([
            //     65, 67, 68, 97, 99, 131, 145, 162,
            //     //  178, 180, 193, 196, 210, 211, 212, 17, 19, 20
            // ]));
        };
        /**
         * 初始化一些游戏数据
         */
        GameScene.prototype.initDatas = function (datas, gameType) {
            egret.log("initDatas:", datas);
            var gameDatas = this.gameDatas = new DDZ.GameDatas();
            gameDatas.gameType = this.gameDatas.gameType = datas.createinfo.gameId === 13 /* GOLD_DDZ */ ? 0 /* COIN */ : 1 /* CARD */;
            gameDatas.roomInfo = datas;
            this.gameDatas.gameStatus = datas.stage;
        };
        /**
         * 初始化
         */
        GameScene.prototype.init = function () {
            egret.log("initGame!!!!!");
            this.initUI(); //先初始化ui
            this.msgHandler = new DDZ.GameMsgHandler(this, this.gameDatas); //创建游戏的消息派发器
            //下一帧才开始派发消息,因为有一些UI的数据在当前帧拿到的是不正确的
            // FrameManager.getInstance().addFrame(net.dispatchMsg, net, 0, 1);
            net.dispatchMsg();
        };
        GameScene.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            var self = this;
            var eg = egret;
            self.players = [];
            var roomSize = self.gameDatas.roomInfo.createinfo.roomSize;
            self.currentState = roomSize + ""; //设置当前场景状态未八人场还是五人场
            for (var i = 0; i < roomSize; ++i) {
                var player = self["_player" + i];
                self.players[i] = player;
                player.disBox = self["_disBox" + i];
                player.pos = i;
                player.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
                player.visible = !i;
                if (this.gameDatas.gameType === 0 /* COIN */) {
                    player.setChipIcon("iconCoin_png");
                }
            }
            if (self.gameDatas.gameType == 0 /* COIN */) {
                this.uiLayer.roomIdLab.visible = this.uiLayer.gameCntLab.visible = false;
                switch (self.gameDatas.roomInfo.createinfo.roomLevel) {
                    case 0:
                        self.text_level.text = "初级场";
                        break;
                    case 1:
                        self.text_level.text = "中级场";
                        break;
                    case 2:
                        self.text_level.text = "高级场";
                        break;
                }
                self.text_difen.text = "游戏底分：" + self.gameDatas.roomInfo.createinfo.difen;
            }
            else {
                var str = void 0;
                var str2 = void 0;
                var room_mode = this.gameDatas.roomInfo.createinfo.roomMode;
                var room_SubMode = this.gameDatas.roomInfo.createinfo.roomSubMode;
                switch (room_mode) {
                    case 0:
                        this.text_level.text = "玩法：叫地主";
                        break;
                    case 1:
                        this.text_level.text = "玩法：叫分";
                        break;
                }
                this.text_difen.text = "炸弹上限:" + (room_SubMode + 3) + "";
            }
            this.text_beilv.text = "倍数:" + 0 + "";
            this._cardBox.init(20);
            // if (self.gameDatas.gameType == GAME_TYPE.CARD) {
            //     self.text_beilv.visible = false;
            //     self.text_difen.visible = false;
            //     self.text_level.visible = false;
            // }
            // self.setRoomSize();
            // self._handBox = this["cards0"];
            // self._handBox.calBox = self._calBox;
            // self._handBox.disBox = self._disBox;
            // self._btnWuniu.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onCal, self);
            // self._btnYouniu.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onCal, self);
            // self._btnAuto.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onCal, self);
            // self._btnBar.addEventListener(BTNBAR_EVENT.CAL, self.onCal, self);
            self._btnBar.btnReady.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onReady, self);
            self._btnBar.btnJiaodizhu.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCall, self);
            self._btnBar.btnBujiao.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCall, self);
            self._btnBar.btnChupai.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onPlay, self);
            self._btnBar.btnBuyao.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onNotPlay, self);
            self._btnBar.btnTishi.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onTips, self);
            self._btnBar.btnJiabei.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onDouble, self);
            self._btnBar.btnBujiabei.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onDouble, self);
            self._btnBar.btn1fen.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCall, self);
            self._btnBar.btn2fen.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCall, self);
            self._btnBar.btn3fen.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCall, self);
            this.players[0].setTipsX(Global.sWidth / 2);
            self._cardBox.addEventListener(DDZ.CardBox.CARD_SELECT_FINISH, this.onCardSelect, this);
            self._cardBox.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCardSound, self);
            console.log("当前游戏状态：", self.gameDatas.gameStatus);
            if (self.gameDatas.gameStatus <= 2 /* START */)
                self._pubCardsBox.visible = false;
            // self._btnBar.addEventListener(BTNBAR_EVENT.ROB, self.onRob, self);
            // self._btnBar.addEventListener(BTNBAR_EVENT.BET, self.onBet, self);
            // self._btnBar.registerBetCB(self.onBet, self);
            // self._btnBar.registerRobCB(self.onRob, self);
            // self._btnBar.initRobBtn(self.gameDatas.roomInfo.createinfo.qzRateList, self.gameDatas.gameType);
            // if (self.gameDatas.gameType === GAME_TYPE.COIN) {
            //     self.showWaitGameStartTip();
            // }
            if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                this.uiLayer._voiceBtn.visible = false;
                this.uiLayer._inviteBtn.bottom = 115;
            }
        };
        // protected openUserInfoLayer(event: egret.Event) {
        //     let target: Player = event.target;
        //     egret.log("target.pos:", target.pos)
        //     if (target.pos === 0) {
        //         var values = [34, 147, 99, 97, 66, 145, 68, 52, 20, 36, 65, 84, 130, 98, 83, 82, 50];
        //         egret.log("111")
        //     } else {
        //         var values = [98, 210, 211, 52, 83, 67, 194, 224, 162, 50, 19, 65, 84, 193, 35, 147, 177];
        //         egret.log("222")
        //     }
        //     this.gameDatas.poker.reset();
        //     this.gameDatas.poker.init(values);
        //     this._cardBox.reset();
        //     this._cardBox.dealCards(this.gameDatas.poker.pokerCards);
        // }
        GameScene.prototype.onCardSound = function () {
            SoundManage.playEffect("card_Click");
        };
        /**
         * 初始化快捷语
         */
        // public initQuickLanguage(sex: number) {
        //     if (sex == 1) {
        //         GameLangs.chats[0]["#108"] = "妹子，交个朋友吧";
        //         egret.log("妹子，交个朋友吧");
        //     }else{
        //         GameLangs.chats[0]["#108"] = "帅哥，交个朋友吧";
        //         egret.log("帅哥，交个朋友吧");
        //     }
        // }
        /**
         * 在玩家修改了选择的牌之后的回调
         * 如果当前是该玩家的出牌阶段
         * 在这里对玩家选择的牌进行校验,判断是否可以出牌
         */
        GameScene.prototype.onCardSelect = function (e) {
            if (this.gameDatas.gameStatus === 4 /* TOU_ZHU */ && this.gameDatas.curActionId === this.gameDatas.myPlyerId) {
                var cards = this._cardBox.getSelectCards();
                var isMove = true;
                if (e) {
                    isMove = e.data;
                }
                var pokerCards = this.gameDatas.poker.checkCardsValid(cards, isMove);
                egret.log("pokerCards" + pokerCards + ":::::" + cards);
                if (pokerCards) {
                    this._btnBar.btnChupai.enabled = true;
                    // if (cards.length != pokerCards.length) {
                    DDZ.Poker.sortCards(pokerCards);
                    this._cardBox.setSelectCards(pokerCards);
                }
                else {
                    this._btnBar.btnChupai.enabled = false;
                }
            }
        };
        /**
         * 加倍或者不加倍按钮回调
         */
        GameScene.prototype.onDouble = function (event) {
        };
        /**增加倍率 */
        GameScene.prototype.RefreshBeiLv = function (isDealr) {
            if (isDealr)
                this.text_beilv.text = "倍数:" + this.gameDatas.currentBeilv * 2 + "";
            else
                this.text_beilv.text = "倍数:" + this.gameDatas.currentBeilv + "";
        };
        GameScene.prototype.setBuchuBtnEnable = function (value) {
            this._btnBar.btnBuyao.enabled = value;
        };
        /**
         * 提示按钮回调
         */
        GameScene.prototype.onTips = function (event) {
            if (this.gameDatas.poker.probHandCardsIterator) {
                this._cardBox.setSelectCards(this.gameDatas.poker.probHandCardsIterator());
                this._btnBar.btnChupai.enabled = true;
            }
            else {
                this.msgHandler.sendBuchupai();
            }
        };
        GameScene.prototype.updatePlayerInfo = function (info) {
            if (this.gameDatas.myPos > -1) {
                var index = (this.gameDatas.roomInfo.createinfo.roomSize + this.gameDatas.myPos - info.zuoweiIndex) % this.gameDatas.roomInfo.createinfo.roomSize;
                this.players[index].updateInfo(info.UserInfo);
                var player = this.getPlayerById(info.playerId);
                //caonim
                if (player) {
                    player.updateInfo(info.UserInfo);
                }
                else {
                    true && egret.error("Player " + info.playerId + " Is Not Exist!!!!");
                }
            }
        };
        /**
         * 不出按钮回调
         */
        GameScene.prototype.onNotPlay = function (event) {
            this.msgHandler.sendBuchupai();
            this._cardBox.unselectAllCards();
        };
        /**
         * 出牌或者不出牌按钮回调
         */
        GameScene.prototype.onPlay = function (event) {
            var list = this._cardBox.getSelectCards();
            if (list.length) {
                var cards = [];
                var arrLen = list.length;
                for (var i = 0; i < arrLen; i++) {
                    cards.push(list[i].cardValue);
                }
                this.msgHandler.sendChupai(cards);
            }
        };
        /**
         * 叫/抢地主按钮回调
         */
        GameScene.prototype.onCall = function (event) {
            egret.log("onCall:", event.target.name);
            this.msgHandler.sendCallMsg(event.target.name);
        };
        GameScene.prototype.insertAndSelectCards = function () {
            this._cardBox.insertAndSelectCards(this.gameDatas.publicCards.slice(0), this.gameDatas.poker.pokerCards);
        };
        /*
         * 显示叫/抢地主
         */
        GameScene.prototype.showRobMenu = function () {
            /**
             * 判断是否房卡场的叫分
             */
            egret.log("GAME_TYPE.CARD", this.gameDatas.gameType == 1 /* CARD */);
            egret.log("this.gameDatas.roomInfo.createinfo.roomMode", this.gameDatas.roomInfo.createinfo.roomMode);
            if (this.gameDatas.gameType == 1 /* CARD */ && this.gameDatas.roomInfo.createinfo.roomMode == 1) {
                this._btnBar.curState = DDZ.BTN_BAR_STATUS.CALLFEN;
                this._btnBar.startTimer(DDZ.CALL_LANDLORD_TIME, GameLangs.roc_time_tip, true, DDZ.BTNBAR_EVENT.CALL);
                egret.log("叫分");
            }
            else {
                this._btnBar.curState = this.gameDatas.fristQiangId ? DDZ.BTN_BAR_STATUS.GRAB : DDZ.BTN_BAR_STATUS.CALL;
                this._btnBar.startTimer(DDZ.CALL_LANDLORD_TIME, GameLangs.rob_time_tip, true, DDZ.BTNBAR_EVENT.CALL);
                egret.log("叫地主");
            }
        };
        /**
         * 显示出牌按钮栏
         */
        GameScene.prototype.showPlayCardMenu = function () {
            this._btnBar.curState = DDZ.BTN_BAR_STATUS.SHOWCARD;
            this._btnBar.startTimer(DDZ.PLAY_CARD_TIME, GameLangs.rob_time_tip, true, DDZ.BTNBAR_EVENT.PLAY);
        };
        /**
         * 是否显示准备菜单
         */
        GameScene.prototype.isShowReadyMenu = function (visible) {
            if (this.gameDatas.gameType === 1 /* CARD */) {
                if (visible) {
                    this._btnBar.curState = DDZ.BTN_BAR_STATUS.READY;
                }
                else if (this._btnBar.curState === DDZ.BTN_BAR_STATUS.READY) {
                    this._btnBar.curState = DDZ.BTN_BAR_STATUS.NONE;
                }
            }
            else {
                if (visible) {
                    this._btnBar.curState = DDZ.BTN_BAR_STATUS.GOLDREADY;
                    this._btnBar.btnChangeDesk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
                }
                else if (this._btnBar.curState === DDZ.BTN_BAR_STATUS.GOLDREADY) {
                    this._btnBar.curState = DDZ.BTN_BAR_STATUS.NONE;
                }
            }
        };
        GameScene.prototype.showWaitTip = function () {
            // this._btnBar.curState = BTN_BAR_STATUS.WAIT;
            // this._btnBar.setTip(GameLangs.waitPlayGameTip);
        };
        // public 
        /**
         * 游戏结束
         */
        GameScene.prototype.gameOver = function (datas) {
            return __awaiter(this, void 0, void 0, function () {
                var self, arrLen, i, gameResult_1, player, i, gameResult_2, player, gameResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            this.uiLayer._guajiBtn.visible = this.uiLayer._guajiImg.visible = false;
                            if (this.gameDatas.gameType == 1 /* CARD */)
                                this.uiLayer._inviteBtn.visible = true;
                            self.msgHandler.stopHandleMsg();
                            if (!this.gameDatas.isSelfPlayingGame()) return [3 /*break*/, 3];
                            self.hideBtnBar();
                            arrLen = datas.gameResultList.length;
                            for (i = 0; i < arrLen; i++) {
                                gameResult_1 = datas.gameResultList[i];
                                if (gameResult_1.playerId !== this.gameDatas.myPlyerId && gameResult_1.cards && gameResult_1.cards.length) {
                                    player = this.getPlayerById(gameResult_1.playerId);
                                    player.showPlayCards(DDZ.Poker.createPokerCards(gameResult_1.cards));
                                }
                            }
                            //等待1000毫秒,展示其他人没有打完的牌
                            return [4 /*yield*/, this.wait(1000)];
                        case 1:
                            //等待1000毫秒,展示其他人没有打完的牌
                            _a.sent();
                            for (i = 0; i < arrLen; i++) {
                                gameResult_2 = datas.gameResultList[i];
                                player = this.getPlayerById(gameResult_2.playerId);
                                player.doEndAni(gameResult_2.balance);
                            }
                            //等待1000毫秒
                            return [4 /*yield*/, this.wait(1000)];
                        case 2:
                            //等待1000毫秒
                            _a.sent();
                            //获取自己的结算信息
                            egret.log("gameOver", datas);
                            gameResult = Utils.getItemByKey(datas.gameResultList, "playerId", this.gameDatas.myPlyerId);
                            //播放游戏结束的胜利跟失败的动画
                            if (gameResult.balance > 0) {
                                this.effectLayer.playAui("win", self.openRoundAccountLayer, self, datas);
                            }
                            else {
                                this.effectLayer.playAui("lost", self.openRoundAccountLayer, self, datas);
                            }
                            SoundManage.playEffect(gameResult.balance > 0 ? "Snd_win" : "Snd_lose");
                            this._pubCardsBox.visible = false;
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // 出牌特效及其音效
        GameScene.prototype.doChuCardsEffect = function (cardValue, handValue, sex, handSubType) {
            var cvtCardValue = handValue;
            var cardType = cvtCardValue >> DDZ.TYPE_SHIFT;
            var cardCnt = (cvtCardValue >> DDZ.LEN_SHIFT) & 0xFF;
            var cardNum = cvtCardValue & 0xF;
            // egret.log("cardType", cardType);
            // egret.log("cardCnt", cardCnt);
            // egret.log("cardNum", cardNum);
            //        private _plane: ddz.plane;
            egret.log("sex:::" + sex);
            switch (cardValue) {
                case 9 /* SINGLE */:
                    SoundManage.playEffectBySex("ddz_" + DDZ.SND_VALUE_NAMES[cardNum], sex);
                    break;
                case 8 /* YIDUI */:
                    SoundManage.playEffectBySex("ddz_" + new Array(3).join(DDZ.SND_VALUE_NAMES[cardNum]), sex);
                    break;
                case 7 /* SANZHANG */:
                    SoundManage.playEffectBySex('ddz_3_0', sex);
                    break;
                case 6 /* SANDAIYI */:
                    if (handSubType > 4) {
                        SoundManage.playEffectBySex('ddz_3_2', sex);
                    }
                    else {
                        SoundManage.playEffectBySex('ddz_3_1', sex);
                    }
                    break;
                case 16 /* HUOJIAN */:
                    // this._wangzha.visible = true;
                    this.effectLayer.playAui("wangzha");
                    // this._wangzha.start();
                    SoundManage.playEffect("SndHJ");
                    SoundManage.playEffectBySex('ddz_huojian', sex);
                    break;
                case 5 /* DANSHUN */:
                    // this._shunzi.visible = true;
                    // this._shunzi.start();
                    this.effectLayer.playAui("shunzi");
                    SoundManage.playEffect("Sndsz");
                    SoundManage.playEffectBySex('ddz_shunzi', sex);
                    break;
                case 4 /* SHUANGSHUN */:
                    // this.lianzui.visible = true;
                    // this.lianzui.start();
                    this.effectLayer.playAui("liandui");
                    SoundManage.playEffect("SndLD");
                    SoundManage.playEffectBySex('ddz_liandui', sex);
                    break;
                case 15 /* BOMB */:
                    // this._zd.visible = true;
                    // this._zd.start();
                    this.effectLayer.playAui("zhadan");
                    SoundManage.playEffect("Snd_Bomb");
                    SoundManage.playEffectBySex('ddz_zhadan', sex);
                    break;
                case 1 /* SIDAIER */:
                    SoundManage.playEffectBySex('ddz_4_2', sex);
                    break;
                case 3 /* SANSHUN */:
                    // egret.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa飞机飞机")
                    // this._plane.visible = true;
                    // this._plane.start();
                    SoundManage.playEffect("SndFJ");
                    SoundManage.playEffectBySex('ddz_feiji', sex);
                    break;
                case 2 /* FEIJIDAICHIBANG */:
                    this.effectLayer.playAui("plane");
                    SoundManage.playEffect("SndFJ");
                    SoundManage.playEffectBySex('ddz_feiji', sex);
                    break;
            }
            SoundManage.playEffect("cardSound");
        };
        //打开玩家结算页面
        GameScene.prototype.openRoundAccountLayer = function (datas) {
            var _this = this;
            if (this.gameDatas.gameType === 1 /* CARD */) {
                var accLayer = new DDZ.RoundAccountDdzLyayer(this.gameDatas.currentBeilv);
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
                this.isShowReadyMenu(true);
                //     this.showWaitGameStartTip();
                this.msgHandler.doAllowHandleMsg();
            }
        };
        /**
         * 创建飞金币动画
         */
        GameScene.prototype.doFlyCoinsAni = function (datas) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        GameScene.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            // //清理所有还在播放中的特效,并且回收一些对象
            this.effectLayer.clearAllAni();
            // egret.log("removeHandler2")
            // FrameManager.getInstance().removeHandler(this.hashCode);
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; ++i) {
                this.players[i].clearAllAni();
                this.players[i].destroy();
            }
        };
        /**
         * 下注按钮回调函数
         */
        GameScene.prototype.onBet = function (event) {
            // var value = (event && event.target.name) ? event.target.name : this._btnBar.getMinBetCount();
            // this.msgHandler.sendBetMsg(value);
        };
        /**
         * 隐藏按钮条
         */
        GameScene.prototype.hideBtnBar = function () {
            this._btnBar.curState = DDZ.BTN_BAR_STATUS.NONE;
            this._btnBar.stopTimer();
        };
        GameScene.prototype.showPlayerTip = function (playerId, value, type) {
            var player = this.getPlayerById(playerId);
            player && player.showTip(value, type, this.gameDatas.gameType, this.gameDatas.roomInfo.createinfo.roomMode);
        };
        /**
         * 更新角色信息
         */
        GameScene.prototype.updateRoleInfo = function (isAni) {
            var arrLen = this.players.length;
            for (var i = 0; i < arrLen; i++) {
                this.players[i].setRole(this.players[i].getPlayerId() === this.gameDatas.landlordId, isAni);
            }
            if (this.gameDatas.landlordId === this.gameDatas.myPlyerId) {
                this._cardBox.setLandlord();
            }
        };
        GameScene.prototype.onReady = function () {
            if (this.gameDatas.gameType === 0 /* COIN */) {
                // createRoomConf
                egret.log("GameLangs.createRoomConf:::" + GameLangs.createRoomConf[3 /* DDZ */][this.gameDatas.roomInfo.createinfo.roomLevel].gold);
                if (Global.playerDto.gold < GameLangs.createRoomConf[3 /* DDZ */][this.gameDatas.roomInfo.createinfo.roomLevel].gold) {
                    Global.panduanJoinRoom(Global.playerDto.gold, this.gameDatas.roomInfo.createinfo.roomLevel, 13 /* GOLD_DDZ */);
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
         * 更新公共牌UI
         */
        GameScene.prototype.updatePublicCards = function () {
            // cardValue1
            //三张牌分别用数据源跟cardValue1,cardValue2,cardValue3三个值绑定
            this._pubCardsBox["cardValue1"] = this.gameDatas.publicCards[0].cardValue;
            this._pubCardsBox["cardValue2"] = this.gameDatas.publicCards[1].cardValue;
            this._pubCardsBox["cardValue3"] = this.gameDatas.publicCards[2].cardValue;
        };
        /**
         * 重置游戏的一些UI,跟数据
         */
        GameScene.prototype.reset = function () {
            // this._calBox.youNiu = false;
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; i++) {
                var player = this.players[i];
                player.reset();
            }
            this._cardBox.reset();
            this.gameDatas.poker.reset();
            this._pubCardsBox["cardValue1"] =
                this._pubCardsBox["cardValue2"] =
                    this._pubCardsBox["cardValue3"] = 0;
            this._btnBar.resetCallBtns();
            this.gameDatas.init();
            // this.gameDatas.resetPlayerDatas();
            // this._disBox.visible = false;
            // this._handBox.visible = true;
        };
        GameScene.prototype.dealCard = function (id, delay, cards, handvalue, callBack, target) {
            // var p: Player = this.getPlayerById(id);
            // if (p) {
            //     p.disBox.dealAni(delay, cards, handvalue, callBack, target);
            // }
            this._cardBox.dealCards(cards, delay);
        };
        GameScene.prototype.delCards = function (cards) {
            this._cardBox.delCardsByArray(cards);
        };
        /**
         * 播放少于2张牌的动画效果
         */
        GameScene.prototype.doRedLightAui = function () {
            this.effectLayer.playAui("redlight");
        };
        /**
         * 播放开始游戏的一些动画游戏开始
         */
        GameScene.prototype.doStartGameAni = function () {
            return this.effectLayer.playAuiAsync("start");
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
        return GameScene;
    }(GameSceneBase));
    DDZ.GameScene = GameScene;
    __reflect(GameScene.prototype, "DDZ.GameScene");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=GameScene.js.map