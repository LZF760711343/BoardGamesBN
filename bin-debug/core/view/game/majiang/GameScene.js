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
var majiang;
(function (majiang) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene(args) {
            var _this = _super.call(this, args) || this;
            _this.skinName = majiang.GameSceneSkin;
            return _this;
        }
        GameScene.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.seziAni.addEventListener(egret.Event.COMPLETE, this.ShowSeZiCount, this);
            SoundManage.playMusic(SoundManage.keyMap.gdmj_bg);
            // egret.log("childrenCreated", this.width, this.height,this._cardBox.width)
            // if (DEBUG) {
            //     Debug.instance.addEventListener(Debug.EVENT.GET_MJ, (event: egret.Event) => {
            //         let cardValues: CARD_VALUE[] = event.data;
            //         egret.log("cardValues:", cardValues.toString())
            //         // this.scene.dealCard(datas.playerId, datas.Cards, destList);
            //         // this.scene.iniDisCards(datas.playerId, datas.chuCards);
            //         this.initTanCard(this.gameDatas.myPlyerId, cardValues);
            //     }, this);
            // }
        };
        // /**
        //  * 设置中间的计时器光执行的位置
        //  */
        // public setTimeBoxDirect(pos:number){
        //     this._timeBox.currentState = pos + "";
        // }
        /**
         *
         */
        GameScene.prototype.ShowSeZiCount = function () {
            this.s1.source = "shaizi$1_png".format(this.gameDatas.seziList[0] + 1);
            this.s2.source = "shaizi$1_png".format(this.gameDatas.seziList[1] + 1);
            this.seziAni.visible = false;
            this.s1.visible = this.s2.visible = true;
            var timer = new egret.Timer(1500, 1);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.sezivisibledAni, this);
            timer.start();
        };
        GameScene.prototype.sezivisibledAni = function () {
            this.s1.visible = this.s2.visible = false;
        };
        GameScene.prototype.updateTimeBoxUI = function () {
            egret.log("updateTimeBoxUI", this.gameDatas.gameStatus);
            if (this.gameDatas.gameStatus >= 2 /* START */) {
                var player = this.getPlayerById(this.gameDatas.curActionId);
                var dealerId = this.getPlayerById(this.gameDatas.dealerId);
                if (player) {
                    this._timeBox.currentState = "state" + (((4 - player.pos) % 4) + 1);
                }
            }
            else {
                this._timeBox.currentState = "none";
            }
        };
        GameScene.prototype.setTimeBoxDirect = function (id) {
            var p = this.getPlayerById(id);
            if (p) {
                this._timeBox.setDirect(p.pos);
            }
        };
        GameScene.prototype.setTimeBoxArrowsDirect = function (id) {
            var p = this.getPlayerById(id);
            if (p) {
                this._timeBox.setArrowsDirect(p.pos);
            }
        };
        GameScene.prototype.startTimeBoxTimer = function () {
            this._timeBox.startTimer();
        };
        //更新玩家信息
        GameScene.prototype.updatePlayerInfo = function (info) {
            if (this.gameDatas.myPos > -1) {
                var index = (this.gameDatas.roomInfo.createinfo.roomSize + this.gameDatas.myPos - info.zuoweiIndex) % this.gameDatas.roomInfo.createinfo.roomSize;
                this.players[index].updateInfo(info.UserInfo);
                var player = this.getPlayerById(info.playerId);
                if (player) {
                    player.updateInfo(info.UserInfo);
                }
                else {
                    true && egret.error("Player " + info.playerId + " Is Not Exist!!!!");
                }
            }
        };
        // protected measure(){
        //     super.measure();
        //     // egret.log("measure:", this.width)
        //     if(this._cardBox){
        //         egret.log("cardBox:", this._cardBox.width);
        //     }
        // }
        /**
         * 初始化一些游戏数据
         */
        GameScene.prototype.initDatas = function (datas, gameType) {
            egret.log("initDatas:", datas);
            var gameDatas = this.gameDatas = new majiang.GameDatas();
            // gameDatas.gameType =  datas.createinfo.gameId === GAME_ID.GAME_ID_GDMJ_FK ? GAME_TYPE.CARD : GAME_TYPE.COIN;
            gameDatas.gameType = this.gameDatas.gameType = datas.createinfo.gameId === 40 /* GAME_ID_GDMJ_GOLD */ ? 0 /* COIN */ : 1 /* CARD */;
            gameDatas.roomInfo = datas;
            this.gameDatas.gameStatus = datas.stage;
        };
        /**
         * 初始化
         */
        GameScene.prototype.init = function () {
            egret.log("initGame!!!!!");
            this.initUI(); //先初始化ui
            this.msgHandler = new majiang.GameMsgHandler(this, this.gameDatas); //创建游戏的消息派发器
            //下一帧才开始派发消息,因为有一些UI的数据在当前帧拿到的是不正确的
            FrameManager.getInstance().addFrame(net.dispatchMsg, net, 0, 1);
            this.validateDisplayList();
        };
        GameScene.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            var self = this;
            var eg = egret;
            self.players = [];
            var roomSize = self.gameDatas.roomInfo.createinfo.roomSize;
            var tip = new eui.Image("mjzs_png");
            for (var i = 0; i < roomSize; ++i) {
                var player = self["_player" + i];
                self.players[i] = player;
                player.disBox = self["_disBox" + i];
                player.cardBox = self["_cardBox" + i];
                player.tanBox = self["_tanBox" + i];
                player.pos = i;
                player.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
                player.visible = !i;
                //    player.tanBox.layer = player.disBox.layer = self._sCardsLayer;
                player.disBox.layer = self._sCardsLayer;
                player.disBox.lastTipImg = tip;
                this.updateDifenLable();
                if (self.gameDatas.gameType === 0 /* COIN */) {
                    player.setChipIcon("iconCoin_png");
                    this.uiLayer.gameCntLab.visible = false;
                }
                self.players[0].cardBox.addEventListener(majiang.CardBox.ADD_CARD_MARK, player.disBox.addCardMark, player.disBox);
            }
            self.players[0].cardBox.init();
            // this._cardBox.init(20);
            this.seziAni.init("shaizi_anmi$1_png", 11);
            self._btnBar.btnReady.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onReady, self);
            self.players[0].cardBox.addEventListener(majiang.CardBox.PLAY_CARD, self.onPlayCard, self);
            // this.dispatchEventWith(CardBox.PLAY_CARD, false, card);
            // self._btnBar.btnJiaodizhu.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCall, self);
            // self._btnBar.btnBujiao.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCall, self);
            // self._btnBar.btnChupai.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onPlay, self);
            // self._btnBar.btnBuyao.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onNotPlay, self);
            // self._btnBar.btnTishi.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onTips, self);
            // self._cardBox.addEventListener(CardBox.CARD_SELECT_FINISH, this.onCardSelect, this);
            self._selectBox.addEventListener(majiang.SelectBox.DO_ACTION, self.doAction, self);
            self._selectBox.addEventListener(majiang.SelectBox.CANCEL_TAN, self.onCancelTan, self);
            self._selectBox.addEventListener(majiang.SelectBox.SURE_TAN, self.onSureTan, self);
            if (self.gameDatas.gameType === 1 /* CARD */) {
                self._btnBar.btnChangeDesk.visible = false;
                self._btnBar.btnChangeDesk.includeInLayout = false;
            }
            else {
                self._btnBar.btnChangeDesk.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onChangeDesk, self);
            }
            // if (DEBUG) {
            //     let cardType = new CardType();
            //     this.addChild(cardType);
            //     cardType.verticalCenter = cardType.horizontalCenter = 0;
            //     // Debug.instance.addEventListener(Debug.EVENT.GET_MJ, (event: egret.Event) => {
            //     //     let datas = {
            //     //         "result": 0,
            //     //         "cardsValueAndCount": [
            //     //             [CARD_VALUE.DONG, 1, 4],
            //     //             [CARD_VALUE.NAN, 1, 4],
            //     //             [CARD_VALUE.BEI, 1, 4],
            //     //             [CARD_VALUE.ZHONG, 1, 4],
            //     //             [CARD_VALUE.FA, 1, 4],
            //     //             [CARD_VALUE.BAI, 1, 4],
            //     //         ],
            //     //         "activeType": 5,
            //     //         "playerId": 1000474
            //     //     }
            //     //     Majiang.changeCardsByType(datas.cardsValueAndCount, datas.activeType, null, this.gameDatas._actionItems);
            //     //     this.addSelectItems();
            //     //     // egret.log(event.data)
            //     //     // let list: any[] = (<string>event.data).split(",");
            //     //     // let arrLen = list.length;
            //     //     // for (let i = 0; i < arrLen; i++) {
            //     //     //     list[i] = parseInt(list[i]);
            //     //     // }
            //     //     // let type;
            //     //     // switch (list[0]) {
            //     //     //     case 0:
            //     //     //         type = DIRECT.BOTTOM;
            //     //     //         break;
            //     //     //     case 1:
            //     //     //         type = DIRECT.LEFT;
            //     //     //         break;
            //     //     //     case 2:
            //     //     //         type = DIRECT.TOP;
            //     //     //         break;
            //     //     //     case 3:
            //     //     //         type = DIRECT.RIGHT;
            //     //     //         break;
            //     //     // }
            //     //     // cardType.setCards(list.slice(2), type, list[1]);
            //     // }, this)
            // }
        };
        GameScene.prototype.doAction = function (event) {
            var data = event.data;
            switch (data.activeType) {
                case 32 /* GUO */:
                    this.msgHandler.sendMjGuoMsg();
                    break;
                case 8 /* PENG */:
                    this.msgHandler.sendMjPengMsg(data.cardsValueAndCount);
                    break;
                case 6 /* SHAO */:
                    this.msgHandler.sendMjShaoMsg(data.cardsValueAndCount);
                    break;
                case 9 /* GANG */:
                    this.msgHandler.sendMjGangMsg(data.cardsValueAndCount);
                    break;
                case 7 /* CHI */:
                    this.msgHandler.sendChiMsg(data.cardsValueAndCount);
                    break;
                case 10 /* HU */:
                    this.msgHandler.sendMjHuMsg();
                    break;
                case 5 /* TAN */:
                    this.players[0].cardBox.addTanTouchEvent(data.cardsValueAndCount);
                    // this.msgHandler.sendMjHuMsg();
                    break;
            }
        };
        GameScene.prototype.onCancelTan = function () {
            this.players[0].cardBox.quitTan();
        };
        GameScene.prototype.onSureTan = function () {
            if (this.players[0].cardBox.selectList && this.players[0].cardBox.selectList.length) {
                this.msgHandler.sendMjTanMsg(majiang.Majiang.getTanInfo(this.players[0].cardBox.selectList, this.gameDatas.tanType));
            }
        };
        GameScene.prototype.onPlayCard = function (event) {
            var card = event.data;
            if (card) {
                this.msgHandler.sendChupai(card.cardValue);
            }
        };
        GameScene.prototype.PlayYaoSeZi = function () {
            // this.s1.source = "shaizi$1_png".format(this.gameDatas.seziList[0] + 1);
            // this.s2.source = "shaizi$1_png".format(this.gameDatas.seziList[1] + 1);
            // this.seziAni.visible = true;
            this.s1.visible = this.s2.visible = false;
            // var timer = new egret.Timer(1500, 1);
            // timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.PlaySendCardAni, this);
            // timer.start();
            this.seziAni.visible = true;
            this.seziAni.start(1, 1000 / 10);
            // this.seziAni.c
            // SoundManage.playEffect(SoundManage.niuniuKeyMap.sezi);
        };
        /**
         * 是否显示准备菜单
         */
        GameScene.prototype.isShowReadyMenu = function (visible) {
            if (this.gameDatas.gameType === 1 /* CARD */) {
                if (visible) {
                    this._btnBar.curState = majiang.BTN_BAR_STATUS.READY;
                }
                else if (this._btnBar.curState === majiang.BTN_BAR_STATUS.READY) {
                    this._btnBar.curState = majiang.BTN_BAR_STATUS.NONE;
                }
            }
            else {
                if (visible) {
                    this._btnBar.curState = majiang.BTN_BAR_STATUS.GOLDREADY;
                    this._btnBar.btnChangeDesk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
                }
                else if (this._btnBar.curState === majiang.BTN_BAR_STATUS.GOLDREADY) {
                    this._btnBar.curState = majiang.BTN_BAR_STATUS.NONE;
                }
            }
        };
        GameScene.prototype.gameOver = function (datas) {
            return __awaiter(this, void 0, void 0, function () {
                var self, arrLen, i, gameResult_1, player, sex, gameResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            self.removeLastPlayCard();
                            self.msgHandler.delayHandleMsg(15000);
                            this.resetSelectBox();
                            this.uiLayer._guajiBtn.visible = false;
                            this.uiLayer._guajiImg.visible = false;
                            this._laziGourp.visible = false;
                            //清掉_laziGourp中的赖子牌图片
                            if (this._laziCard) {
                                this._laziGourp.removeChild(this._laziCard);
                                this._laziCard = null;
                            }
                            if (!this.gameDatas.isSelfPlayingGame()) return [3 /*break*/, 4];
                            arrLen = datas.gameResult.length;
                            for (i = 0; i < arrLen; i++) {
                                gameResult_1 = datas.gameResult[i];
                                player = this.getPlayerById(gameResult_1.playerId);
                                sex = this.gameDatas.playerDatas[gameResult_1.playerId].UserInfo.sex;
                                player.doEndAni(gameResult_1.balance);
                                //  player.(gameResult.balance);
                                if (player.currentState == "player1") {
                                    if (gameResult_1.playerId == gameResult_1.huPlayerId) {
                                        this.effectLayer.playLocalityAui("hu", 1);
                                        // SoundManage.playEffectBySex('mj_hu', sex);
                                        this.gameOverSound(gameResult_1.fangPaoPlayerId, sex);
                                    }
                                }
                                else if (player.currentState == "player2") {
                                    if (gameResult_1.playerId == gameResult_1.huPlayerId) {
                                        this.effectLayer.playLocalityAui("hu", 2);
                                        // SoundManage.playEffectBySex('mj_hu', sex);
                                        this.gameOverSound(gameResult_1.fangPaoPlayerId, sex);
                                    }
                                }
                                else if (player.currentState == "player3") {
                                    if (gameResult_1.playerId == gameResult_1.huPlayerId) {
                                        this.effectLayer.playLocalityAui("hu", 3);
                                        // SoundManage.playEffectBySex('mj_hu', sex);
                                        this.gameOverSound(gameResult_1.fangPaoPlayerId, sex);
                                    }
                                }
                                else {
                                    if (gameResult_1.playerId == gameResult_1.huPlayerId) {
                                        this.effectLayer.playLocalityAui("hu", 4);
                                        // SoundManage.playEffectBySex('mj_hu', sex);
                                        this.gameOverSound(gameResult_1.fangPaoPlayerId, sex);
                                    }
                                }
                            }
                            //等待1000毫秒
                            return [4 /*yield*/, this.wait(1000)];
                        case 1:
                            //等待1000毫秒
                            _a.sent();
                            if (!this.gameDatas.maCards) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.doZhongMaAui(this.gameDatas.maCards, this.gameDatas.zhongmaCards)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            gameResult = Utils.getItemByKey(datas.gameResult, "playerId", this.gameDatas.myPlyerId);
                            //播放游戏结束的胜利跟失败的动画
                            if (gameResult.playerId == gameResult.huPlayerId) {
                                this.effectLayer.playAui("win", self.openRoundAccountLayer, self, datas);
                            }
                            else {
                                this.effectLayer.playAui("lost", self.openRoundAccountLayer, self, datas);
                            }
                            SoundManage.playEffect(gameResult.playerId == gameResult.huPlayerId ? "Snd_win" : "Snd_lose");
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        GameScene.prototype.gameOverSound = function (fangPaoPlayerId, sex) {
            if (fangPaoPlayerId == 0) {
                // SoundManage.playEffectBySex('mj_zimo', sex);
                SoundManage.playEffectBySexByType("zimo", sex, LocalDatas.sDatas.datas.SoundType);
            }
            else if (fangPaoPlayerId == 3) {
            }
            else {
                // SoundManage.playEffectBySex('mj_hu', sex);
                SoundManage.playEffectBySexByType("chihu", sex, LocalDatas.sDatas.datas.SoundType);
            }
        };
        GameScene.prototype.getCardStr = function (value) {
            return "mj_pai_" + value;
            // if (value > SUIT.ZIPAI) {
            //     return `mj_feng_${value}`;
            // } else if (value > SUIT.TONGZI) {
            //     return `mj_tong_${value}`;
            // } else if (value > SUIT.TIAOZI) {
            //     return `mj_tiao_${value}`;
            // } else if (value > SUIT.WANGZI) {
            //     return `mj_wan_${value}`;
            // }
            // return null;
        };
        // 出牌特效及其音效
        GameScene.prototype.doChuCardsEffect = function (cardValue, sex) {
            // SoundManage.playEffectBySex(`mj_pai_${cardValue}`, sex);
            // SoundManage.playEffectBySex(`mj_pai_${cardValue}`, sex);
            //  SoundManage.playEffectBySexByType(`mj_${cardValue}`, sex, LocalDatas.sDatas.datas.SoundType);
            //  SoundManage.playEffectBySexByType(SoundManage.majiangKeyMap.mj_17, sex, LocalDatas.sDatas.datas.SoundType);
            SoundManage.playEffectBySexByType(SoundManage.majiangKeyMap["mj_" + cardValue], sex, LocalDatas.sDatas.datas.SoundType);
        };
        //打开玩家结算页面
        GameScene.prototype.openRoundAccountLayer = function (datas) {
            var _this = this;
            this.gameDatas.lastCardValue = null;
            if (this.gameDatas.gameType === 1 /* CARD */) {
                var accLayer = new majiang.RoundAccountMjLyayer(this.gameDatas.roomInfo.createinfo.gameId);
                accLayer.currentState = "card";
                accLayer.open();
                // //设置结算数据
                accLayer.setDatas(datas, this.gameDatas);
                accLayer.addEventListener(Layers.Event.CLOSE, function () {
                    _this.msgHandler.sendReadyGame();
                    _this.Accountreset();
                    _this.msgHandler.doAllowHandleMsg();
                }, this);
            }
            else {
                var accLayer = new majiang.RoundAccountMjLyayer(this.gameDatas.roomInfo.createinfo.gameId);
                accLayer.currentState = "card";
                accLayer.open();
                // //设置结算数据
                accLayer.setDatas(datas, this.gameDatas);
                accLayer.addEventListener(Layers.Event.CLOSE, function () {
                    // this.msgHandler.sendReadyGame();
                    // this.Accountreset();
                    // this.msgHandler.doAllowHandleMsg();
                    _this.Accountreset();
                    _this.isShowReadyMenu(true);
                    _this.msgHandler.doAllowHandleMsg();
                }, this);
            }
        };
        GameScene.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            //清理所有还在播放中的特效,并且回收一些对象
            // this.effectLayer.clearAllAni();
            // egret.log("removeHandler2");
            // FrameManager.getInstance().removeHandler(this.hashCode);
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; ++i) {
                // this.players[i].clearAllAni();
                this.players[i].destroy();
            }
        };
        // /**
        //  * 隐藏按钮条
        //  */
        GameScene.prototype.hideBtnBar = function () {
            this._btnBar.curState = majiang.BTN_BAR_STATUS.NONE;
        };
        GameScene.prototype.showPlayerTip = function (playerId, value, type) {
            var player = this.getPlayerById(playerId);
            player && player.showTip(value, type, this.gameDatas.gameType, this.gameDatas.roomInfo.createinfo.roomMode);
        };
        /**
         * 刷新操作按钮组UI
         */
        GameScene.prototype.addSelectItems = function () {
            // if (this.gameDatas._actionItems && this.gameDatas._actionItems.length) {
            this._selectBox.visible = true;
            this._selectBox.addItems(this.gameDatas._actionItems);
            // } else {
            //     this._selectBox.visible = false;
            // }
        };
        //刷新自己牌的排序
        GameScene.prototype.resetSortLastCard = function () {
            var player = this.getPlayerById(this.gameDatas.myPlyerId);
            player.cardBox.sortLastCard();
        };
        GameScene.prototype.resetSelectBox = function () {
            this._selectBox.reset();
        };
        GameScene.prototype.onReady = function () {
            this.msgHandler.sendReadyGame();
        };
        /**
         * 玩家打出一张牌
         */
        GameScene.prototype.playCard = function (playerId, cardValue) {
            var player = this.getPlayerById(playerId);
            if (player) {
                //将牌从手牌里面删除
                // let card = this.lastPlayCard = this.delCard(cardValue);
                var card_1 = this.lastPlayCard = player.cardBox.deleteCard(cardValue);
                player.cardBox.sortLastCard();
                card_1.setDisIcon(majiang.DIRECT.BOTTOM, cardValue);
                this._sCardsLayer.addChild(card_1);
                var scale_1 = 1.5;
                this.playCardPromise = new Promise(function (finish) {
                    egret.Tween.get(card_1).to({
                        x: (Global.sWidth - card_1.width * scale_1) / 2,
                        y: (Global.sHeight - card_1.height * scale_1) / 2,
                        scaleX: scale_1,
                        scaleY: scale_1
                    }, 150).call(finish);
                });
                this.msgHandler.delayHandleMsg(200);
            }
        };
        GameScene.prototype.removeLastPlayCard = function () {
            if (this.lastPlayCard) {
                this.lastPlayCard.destroy();
                this.playCardPromise = null;
            }
        };
        GameScene.prototype.initLastPlayCard = function (playerId, cardValue) {
            var card = this.lastPlayCard = majiang.Card.create();
            this._sCardsLayer.addChild(card);
            card.setDisIcon(majiang.DIRECT.BOTTOM, cardValue);
            var scale = 1.5;
            card.scaleX = card.scaleY = scale;
            card.x = (Global.sWidth - card.width * scale) / 2;
            card.y = (Global.sHeight - card.height * scale) / 2;
        };
        /**
         * 某个玩家打出一张牌到桌面上
         */
        GameScene.prototype.addDisCard = function (playerId, cardValue) {
            return __awaiter(this, void 0, void 0, function () {
                var lastPlayCard, player;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            lastPlayCard = this.lastPlayCard;
                            this.lastPlayCard = null;
                            if (!this.playCardPromise) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.playCardPromise];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.wait(150)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            egret.log("lastPlayCard", lastPlayCard);
                            player = this.getPlayerById(playerId);
                            if (player) {
                                player.disBox.addCardWithAni(lastPlayCard, cardValue);
                                this.gameDatas.lastCardValue = null;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        GameScene.prototype.iniDisCards = function (playerId, cardValues) {
            var player = this.getPlayerById(playerId);
            if (player) {
                player.disBox.initCards(cardValues);
            }
        };
        GameScene.prototype.initLaziCard = function (val) {
            return this.effectLayer.playAuiAsync2("lazi", "mj_bottomD" + val + "_png");
        };
        GameScene.prototype.initLaziCard1 = function (val) {
            this._laziGourp.visible = true;
            var _laziCard = this._laziCard;
            if (_laziCard) {
            }
            else {
                _laziCard = new eui.Image();
                _laziCard.width = 29;
                _laziCard.height = 42;
                this._laziGourp.addChild(_laziCard);
            }
            egret.log("_laziCard", _laziCard);
            _laziCard.source = "mj_bottomD" + val + "_png";
            var w = this._laziGourp.parent.width / 2;
            var h = this._laziGourp.parent.height / 2;
            _laziCard.x = this.width / 2 - this._laziGourp.x;
            ;
            _laziCard.y = this.height / 2 - this._laziGourp.y;
            egret.Tween.get(_laziCard).wait(0).to({ x: 18, y: 10 }, 1000);
        };
        GameScene.prototype.initTanCard = function (playerId, cardValues) {
            var player = this.getPlayerById(playerId);
            if (player) {
                player.tanBox.initCards(cardValues);
            }
        };
        /**
         * 重置游戏的一些UI,跟数据
         */
        GameScene.prototype.reset = function () {
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; i++) {
                var player = this.players[i];
                player.reset();
            }
            // this._cardBox.reset();
            // this.gameDatas.poker.reset();
            // let baopai = this._dadangbox.getChildByName("baopai");
            // baopai.visible = false;
            // let fen = <eui.Label>this._dadangbox.getChildByName("fen");
            // fen.text = "";
            // let dadangcard = <Card>this._dadangbox.getChildByName("dadangcard");
            // dadangcard.visible = false;
            // this.gameDatas.init();
        };
        GameScene.prototype.Accountreset = function () {
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; i++) {
                var player = this.players[i];
                player.Accountreset();
            }
            // this._cardBox.reset();
            // this.gameDatas.poker.reset();
            // let baopai = this._dadangbox.getChildByName("baopai");
            // baopai.visible = false;
            // let fen = <eui.Label>this._dadangbox.getChildByName("fen");
            // fen.text = "";
            // let dadangcard = <Card>this._dadangbox.getChildByName("dadangcard");
            // dadangcard.visible = false;
            // this.gameDatas.init();
        };
        GameScene.prototype.dealCard = function (id, cards, destList) {
            // this._cardBox.initCards(cards);\
            var player = this.getPlayerById(id);
            if (player) {
                player.cardBox.initCards(this.gameDatas.laziCard, cards, destList);
            }
        };
        GameScene.prototype.SetLaziCard = function (cards) {
            var player = this.getPlayerById(this.gameDatas.myPlyerId);
            // egret.log("this._LziCard111", cards);
            // player.cardBox.LziCard(cards);
        };
        /**
         * 碰/吃/勺的时候,在手牌里面增加一个牌型对象,同时把多余的牌删除
         */
        GameScene.prototype.addCardType = function (id, destList) {
            this.gameDatas.lastCardValue = null;
            var player = this.getPlayerById(id);
            if (player) {
                player.cardBox.addCardTypeObj(destList);
            }
        };
        GameScene.prototype.doMjchiAui = function (id) {
            var sex = this.gameDatas.playerDatas[id].UserInfo.sex;
            SoundManage.playEffectBySex('mj_chi', sex);
            var player = this.getPlayerById(id);
            if (player.currentState == "player1") {
                this.effectLayer.playLocalityAui("chi", 1);
            }
            else if (player.currentState == "player2") {
                this.effectLayer.playLocalityAui("chi", 2);
            }
            else if (player.currentState == "player3") {
                this.effectLayer.playLocalityAui("chi", 3);
            }
            else {
                this.effectLayer.playLocalityAui("chi", 4);
            }
        };
        GameScene.prototype.doMjshaoAui = function (id) {
            var sex = this.gameDatas.playerDatas[id].UserInfo.sex;
            SoundManage.playEffectBySex('mj_shao', sex);
            var player = this.getPlayerById(id);
            if (player.currentState == "player1") {
                this.effectLayer.playLocalityAui("shao", 1);
            }
            else if (player.currentState == "player2") {
                this.effectLayer.playLocalityAui("shao", 2);
            }
            else if (player.currentState == "player3") {
                this.effectLayer.playLocalityAui("shao", 3);
            }
            else {
                this.effectLayer.playLocalityAui("shao", 4);
            }
        };
        GameScene.prototype.doMjgangAui = function (id) {
            var player = this.getPlayerById(id);
            if (player.currentState == "player1") {
                this.effectLayer.playLocalityAui("gang", 1);
            }
            else if (player.currentState == "player2") {
                this.effectLayer.playLocalityAui("gang", 2);
            }
            else if (player.currentState == "player3") {
                this.effectLayer.playLocalityAui("gang", 3);
            }
            else {
                this.effectLayer.playLocalityAui("gang", 4);
            }
        };
        GameScene.prototype.doMjtanAui = function (id, values) {
            var sex = this.gameDatas.playerDatas[id].UserInfo.sex;
            switch (values.length) {
                case 0:
                    SoundManage.playEffectBySex('mj_tan1tiao', sex);
                    break;
                case 2:
                    SoundManage.playEffectBySex('mj_tanf', sex);
                    break;
                case 3:
                    SoundManage.playEffectBySex('mj_tanj', sex);
                    break;
                case 6:
                    SoundManage.playEffectBySex('mj_tan7x', sex);
                    break;
            }
            var player = this.getPlayerById(id);
            if (player.currentState == "player1") {
                this.effectLayer.playLocalityAui("tan", 1);
            }
            else if (player.currentState == "player2") {
                this.effectLayer.playLocalityAui("tan", 2);
            }
            else if (player.currentState == "player3") {
                this.effectLayer.playLocalityAui("tan", 3);
            }
            else {
                this.effectLayer.playLocalityAui("tan", 4);
            }
        };
        GameScene.prototype.doMjPengAui = function (id) {
            var sex = this.gameDatas.playerDatas[id].UserInfo.sex;
            // SoundManage.playEffectBySex('mj_peng', sex);
            SoundManage.playEffectBySexByType("peng", sex, LocalDatas.sDatas.datas.SoundType);
            var player = this.getPlayerById(id);
            if (player.currentState == "player1") {
                this.effectLayer.playLocalityAui("peng", 1);
            }
            else if (player.currentState == "player2") {
                this.effectLayer.playLocalityAui("peng", 2);
            }
            else if (player.currentState == "player3") {
                this.effectLayer.playLocalityAui("peng", 3);
            }
            else {
                this.effectLayer.playLocalityAui("peng", 4);
            }
            // if (player) {
            //     // player.cardBox.addCardTypeObj(destList);
            //     this.effectLayer.playAui("peng");
            // }
        };
        /**
         * 杠的时候,在手牌里面更新一个牌型对象,同时把多余的牌删除
         */
        GameScene.prototype.updateCardType = function (id, destList) {
            var player = this.getPlayerById(id);
            if (player) {
                player.cardBox.updateCardType(destList);
            }
        };
        GameScene.prototype.addCard = function (id, card) {
            var player = this.getPlayerById(id);
            if (player) {
                player.cardBox.addCard(card);
            }
        };
        /**
         * 摸牌声音
         */
        GameScene.prototype.addCardSound = function (card) {
            if (card) {
                SoundManage.playEffect("mj_mopai");
            }
        };
        GameScene.prototype.addCards = function (id, values) {
            var player = this.getPlayerById(id);
            if (player) {
                player.cardBox.addCards(values);
            }
        };
        GameScene.prototype.addTanCards = function (id, values) {
            var player = this.getPlayerById(id);
            if (player) {
                player.tanBox.addCardByValues(values);
            }
        };
        GameScene.prototype.deleteSeletBoxBtn = function () {
            this._selectBox.deleteBtnByItem(5 /* TAN */);
        };
        /**
         * 删除一张牌
         */
        GameScene.prototype.delCard = function (id, cardValue) {
            var player = this.getPlayerById(id);
            if (player) {
                var card = player.cardBox.deleteCard(cardValue);
                player.cardBox.sortLastCard();
                return card;
            }
        };
        /**
         * 删除若干张牌
         */
        GameScene.prototype.delCards = function (id, cardValues) {
            var player = this.getPlayerById(id);
            if (player) {
                var card = player.cardBox.deleteCards(cardValues);
                player.cardBox.sortLastCard();
                return card;
            }
        };
        /**
         * 播放开始游戏的一些动画游戏开始
         */
        GameScene.prototype.doStartGameAni = function () {
            return this.effectLayer.playAuiAsync1("start");
        };
        GameScene.prototype.initRemainCards = function () {
            this._remainCardLable.text = "剩下" + this.gameDatas.remainCards + "张";
        };
        GameScene.prototype.updateDifenLable = function () {
            if (this.gameDatas.roomInfo.createinfo.difen > 10000) {
                this._difenLable.text = "底分:" + Math.floor(this.gameDatas.roomInfo.createinfo.difen / 10000) + GameLangs.wan;
            }
            else {
                this._difenLable.text = "底分:" + this.gameDatas.roomInfo.createinfo.difen;
            }
        };
        GameScene.prototype.doZhongMaAui = function (maCards, zhongmaCards) {
            return this.effectLayer.playAuiAsyncZhongMa("zhongma", maCards, zhongmaCards);
        };
        return GameScene;
    }(GameSceneBase));
    majiang.GameScene = GameScene;
    __reflect(GameScene.prototype, "majiang.GameScene");
})(majiang || (majiang = {}));
//# sourceMappingURL=GameScene.js.map