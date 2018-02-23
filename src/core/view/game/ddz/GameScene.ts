namespace DDZ {
    export class GameScene extends GameSceneBase {
        public _player0: DDZ.Player;
        public players: Player[];
        public _btnBar: GameBtnBar;
        private _gameNameImg: eui.Image;
        public msgHandler: GameMsgHandler;
        public effectLayer: GameEffectLayer;
        public _waitOpen: eui.Group;
        public gameDatas: GameDatas;
        public uiLayer: GameUI;
        public beilv: number;
        public text_beilv: eui.Label;
        public text_level: eui.Label;
        public text_difen: eui.Label;
        // public _disBox3: DDZ.DiscardBox;
        // public _disBox4: DDZ.DiscardBox;


        /**
         * 自己的手牌
         */
        public _cardBox: CardBox;
        /**
         * 公共牌
         */
        public _pubCardsBox: eui.Component;
        /**
         * 
         */
        private _roomInfoLb: eui.Label;

        public constructor(args: any[]) {
            super(args);
            // CardBox.prototype.dealCards()

            this.skinName = GameSceneSkin;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
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

        }

        /**
         * 初始化一些游戏数据
         */
        public initDatas(datas: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_NN>, gameType: GAME_TYPE) {
            egret.log("initDatas:", datas);
            let gameDatas = this.gameDatas = new GameDatas();
            gameDatas.gameType = this.gameDatas.gameType = datas.createinfo.gameId === GAME_ID.GOLD_DDZ ? GAME_TYPE.COIN : GAME_TYPE.CARD;
            gameDatas.roomInfo = datas;
            this.gameDatas.gameStatus = datas.stage;
        }
        /**
         * 初始化
         */
        public init() {
            egret.log("initGame!!!!!");
            this.initUI();//先初始化ui
            this.msgHandler = new GameMsgHandler(this, this.gameDatas);//创建游戏的消息派发器
            //下一帧才开始派发消息,因为有一些UI的数据在当前帧拿到的是不正确的
            // FrameManager.getInstance().addFrame(net.dispatchMsg, net, 0, 1);
            net.dispatchMsg();
        }

        protected initUI() {
            super.initUI();

            let self = this;
            let eg = egret;
            self.players = [];
            let roomSize = self.gameDatas.roomInfo.createinfo.roomSize;
            self.currentState = roomSize + "";//设置当前场景状态未八人场还是五人场
            for (let i = 0; i < roomSize; ++i) {
                let player: Player = self["_player" + i];
                self.players[i] = player;
                player.disBox = self["_disBox" + i];
                player.pos = i;
                player.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
                player.visible = !i;
                if (this.gameDatas.gameType === GAME_TYPE.COIN) {
                    player.setChipIcon("iconCoin_png");
                }
            }
            if (self.gameDatas.gameType == GAME_TYPE.COIN) {
                this.uiLayer.roomIdLab.visible = this.uiLayer.gameCntLab.visible = false;

                switch (self.gameDatas.roomInfo.createinfo.roomLevel) {
                    case 0: self.text_level.text = "初级场"; break;
                    case 1: self.text_level.text = "中级场"; break;
                    case 2: self.text_level.text = "高级场"; break;
                }
                self.text_difen.text = "游戏底分：" + self.gameDatas.roomInfo.createinfo.difen;
            } else {
                let str;
                let str2;
                let room_mode = this.gameDatas.roomInfo.createinfo.roomMode;
                let room_SubMode = this.gameDatas.roomInfo.createinfo.roomSubMode;

                switch (room_mode) {
                    case 0: this.text_level.text = "玩法：叫地主"; break;
                    case 1: this.text_level.text = "玩法：叫分"; break;
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
            self._cardBox.addEventListener(CardBox.CARD_SELECT_FINISH, this.onCardSelect, this);
            self._cardBox.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCardSound, self);
            console.log("当前游戏状态：", self.gameDatas.gameStatus);
            if (self.gameDatas.gameStatus <= GAME_STAGE.START)
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
        }
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
        public onCardSound() {
            SoundManage.playEffect("card_Click");
        }
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
        public onCardSelect(e?: egret.Event) {
            if (this.gameDatas.gameStatus === GAME_STAGE.TOU_ZHU && this.gameDatas.curActionId === this.gameDatas.myPlyerId) {
                let cards = this._cardBox.getSelectCards();
                let isMove = true;
                if (e) {
                    isMove = e.data;
                }

                let pokerCards = this.gameDatas.poker.checkCardsValid(cards, isMove);
                egret.log("pokerCards" + pokerCards + ":::::" + cards);
                if (pokerCards) {
                    this._btnBar.btnChupai.enabled = true;
                    // if (cards.length != pokerCards.length) {

                    Poker.sortCards(pokerCards);
                    this._cardBox.setSelectCards(pokerCards);
                    // }
                } else {
                    this._btnBar.btnChupai.enabled = false;
                }

            }
        }
        /**
         * 加倍或者不加倍按钮回调
         */
        private onDouble(event: egret.TouchEvent) {

        }

        /**增加倍率 */
        public RefreshBeiLv(isDealr: boolean) {

            if (isDealr)
                this.text_beilv.text = "倍数:" + this.gameDatas.currentBeilv * 2 + "";
            else
                this.text_beilv.text = "倍数:" + this.gameDatas.currentBeilv + "";
        }

        public setBuchuBtnEnable(value: boolean) {
            this._btnBar.btnBuyao.enabled = value;
        }
        /**
         * 提示按钮回调
         */
        private onTips(event: egret.TouchEvent) {
            if (this.gameDatas.poker.probHandCardsIterator) {

 
                this._cardBox.setSelectCards(this.gameDatas.poker.probHandCardsIterator());

                this._btnBar.btnChupai.enabled = true;
            } else {
                this.msgHandler.sendBuchupai();
            }
        }
        public updatePlayerInfo(info: model.PLAYER_INFO) {
            if (this.gameDatas.myPos > -1) {//如果自己已经坐下了
                let index = (this.gameDatas.roomInfo.createinfo.roomSize + this.gameDatas.myPos - info.zuoweiIndex) % this.gameDatas.roomInfo.createinfo.roomSize;
                this.players[index].updateInfo(info.UserInfo);
                let player = this.getPlayerById(info.playerId);
                //caonim
                if (player) {
                    player.updateInfo(info.UserInfo);
                } else {
                    DEBUG && egret.error(`Player ${info.playerId} Is Not Exist!!!!`)
                }
            }
        }
        /**
         * 不出按钮回调
         */
        private onNotPlay(event: egret.TouchEvent) {
            this.msgHandler.sendBuchupai();
            this._cardBox.unselectAllCards();
        }
        /**
         * 出牌或者不出牌按钮回调
         */
        private onPlay(event: egret.TouchEvent) {
            let list: Card[] = this._cardBox.getSelectCards();
            if (list.length) {
                let cards = [];
                let arrLen = list.length;
                for (let i = 0; i < arrLen; i++) {
                    cards.push(list[i].cardValue);
                }
                this.msgHandler.sendChupai(cards);
            }
        }
        /**
         * 叫/抢地主按钮回调
         */
        private onCall(event: egret.TouchEvent) {
            egret.log("onCall:", event.target.name);
            this.msgHandler.sendCallMsg(event.target.name);
        }
        public insertAndSelectCards() {
            this._cardBox.insertAndSelectCards(this.gameDatas.publicCards.slice(0), this.gameDatas.poker.pokerCards);
        }
        /*
         * 显示叫/抢地主
         */
        public showRobMenu(): void {
            /**
             * 判断是否房卡场的叫分
             */
            egret.log("GAME_TYPE.CARD", this.gameDatas.gameType == GAME_TYPE.CARD);
            egret.log("this.gameDatas.roomInfo.createinfo.roomMode", this.gameDatas.roomInfo.createinfo.roomMode);
            if (this.gameDatas.gameType == GAME_TYPE.CARD && this.gameDatas.roomInfo.createinfo.roomMode == 1) {
                this._btnBar.curState = BTN_BAR_STATUS.CALLFEN;
                this._btnBar.startTimer(CALL_LANDLORD_TIME, GameLangs.roc_time_tip, true, BTNBAR_EVENT.CALL);
                egret.log("叫分")
            } else {
                this._btnBar.curState = this.gameDatas.fristQiangId ? BTN_BAR_STATUS.GRAB : BTN_BAR_STATUS.CALL;
                this._btnBar.startTimer(CALL_LANDLORD_TIME, GameLangs.rob_time_tip, true, BTNBAR_EVENT.CALL);
                egret.log("叫地主")
            }

        }
        /**
         * 显示出牌按钮栏
         */
        public showPlayCardMenu() {
            this._btnBar.curState = BTN_BAR_STATUS.SHOWCARD;
            this._btnBar.startTimer(PLAY_CARD_TIME, GameLangs.rob_time_tip, true, BTNBAR_EVENT.PLAY);
        }
        /**
         * 是否显示准备菜单
         */
        public isShowReadyMenu(visible: boolean) {
            if (this.gameDatas.gameType === GAME_TYPE.CARD) {
                if (visible) {
                    this._btnBar.curState = BTN_BAR_STATUS.READY;
                } else if (this._btnBar.curState === BTN_BAR_STATUS.READY) {
                    this._btnBar.curState = BTN_BAR_STATUS.NONE;
                }
            } else {
                if (visible) {
                    this._btnBar.curState = BTN_BAR_STATUS.GOLDREADY;
                    this._btnBar.btnChangeDesk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
                } else if (this._btnBar.curState === BTN_BAR_STATUS.GOLDREADY) {
                    this._btnBar.curState = BTN_BAR_STATUS.NONE;
                }

            }
        }

        public showWaitTip() {
            // this._btnBar.curState = BTN_BAR_STATUS.WAIT;
            // this._btnBar.setTip(GameLangs.waitPlayGameTip);
        }
        // public 
        /**
         * 游戏结束
         */
        public async gameOver(datas: model.DDZGameOverInfo) {
            var self = this;
            this.uiLayer._guajiBtn.visible = this.uiLayer._guajiImg.visible = false;
            if (this.gameDatas.gameType == GAME_TYPE.CARD)
                this.uiLayer._inviteBtn.visible = true;
            self.msgHandler.stopHandleMsg();
            if (this.gameDatas.isSelfPlayingGame()) {
                self.hideBtnBar();
                let arrLen = datas.gameResultList.length;
                for (let i = 0; i < arrLen; i++) {
                    let gameResult = datas.gameResultList[i];
                    if (gameResult.playerId !== this.gameDatas.myPlyerId && gameResult.cards && gameResult.cards.length) {
                        let player: Player = this.getPlayerById(gameResult.playerId);
                        player.showPlayCards(Poker.createPokerCards(gameResult.cards));
                    }
                }
                //等待1000毫秒,展示其他人没有打完的牌
                await this.wait(1000);
                for (let i = 0; i < arrLen; i++) {
                    let gameResult = datas.gameResultList[i];
                    let player: Player = this.getPlayerById(gameResult.playerId);
                    player.doEndAni(gameResult.balance);
                }
                //等待1000毫秒
                await this.wait(1000);
                //获取自己的结算信息
                egret.log("gameOver", datas);
                let gameResult = Utils.getItemByKey(datas.gameResultList, "playerId", this.gameDatas.myPlyerId);
                //播放游戏结束的胜利跟失败的动画
                if (gameResult.balance > 0) {
                    this.effectLayer.playAui("win", self.openRoundAccountLayer, self, datas);
                } else {
                    this.effectLayer.playAui("lost", self.openRoundAccountLayer, self, datas);
                }
                SoundManage.playEffect(gameResult.balance > 0 ? "Snd_win" : "Snd_lose");
                this._pubCardsBox.visible = false;
            }
        }

        // 出牌特效及其音效
        public doChuCardsEffect(cardValue: number, handValue: number, sex: number, handSubType: number) {
            var cvtCardValue = handValue;
            var cardType = cvtCardValue >> TYPE_SHIFT;
            var cardCnt = (cvtCardValue >> LEN_SHIFT) & 0xFF;
            var cardNum = cvtCardValue & 0xF;
            // egret.log("cardType", cardType);
            // egret.log("cardCnt", cardCnt);
            // egret.log("cardNum", cardNum);
            //        private _plane: ddz.plane;
            egret.log("sex:::" + sex);
            switch (cardValue) {
                case HAND_TYPE.SINGLE:
                    SoundManage.playEffectBySex("ddz_" + SND_VALUE_NAMES[cardNum], sex);
                    break;
                case HAND_TYPE.YIDUI:
                    SoundManage.playEffectBySex("ddz_" + new Array(3).join(SND_VALUE_NAMES[cardNum]), sex);
                    break;
                case HAND_TYPE.SANZHANG:
                    SoundManage.playEffectBySex('ddz_3_0', sex);
                    break;
                case HAND_TYPE.SANDAIYI:
                    if (handSubType > 4) {
                        SoundManage.playEffectBySex('ddz_3_2', sex);
                    } else {
                        SoundManage.playEffectBySex('ddz_3_1', sex);
                    }
                    break;
                case HAND_TYPE.HUOJIAN:
                    // this._wangzha.visible = true;
                    this.effectLayer.playAui("wangzha");
                    // this._wangzha.start();
                    SoundManage.playEffect("SndHJ");
                    SoundManage.playEffectBySex('ddz_huojian', sex);
                    break;
                case HAND_TYPE.DANSHUN:
                    // this._shunzi.visible = true;
                    // this._shunzi.start();
                    this.effectLayer.playAui("shunzi");
                    SoundManage.playEffect("Sndsz");
                    SoundManage.playEffectBySex('ddz_shunzi', sex);
                    break;
                case HAND_TYPE.SHUANGSHUN:
                    // this.lianzui.visible = true;
                    // this.lianzui.start();
                    this.effectLayer.playAui("liandui");
                    SoundManage.playEffect("SndLD");
                    SoundManage.playEffectBySex('ddz_liandui', sex);
                    break;
                case HAND_TYPE.BOMB:
                    // this._zd.visible = true;
                    // this._zd.start();
                    this.effectLayer.playAui("zhadan");
                    SoundManage.playEffect("Snd_Bomb");
                    SoundManage.playEffectBySex('ddz_zhadan', sex);
                    break;
                case HAND_TYPE.SIDAIER:
                    SoundManage.playEffectBySex('ddz_4_2', sex);
                    break;
                case HAND_TYPE.SANSHUN:
                    // egret.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa飞机飞机")
                    // this._plane.visible = true;
                    // this._plane.start();
                    SoundManage.playEffect("SndFJ");
                    SoundManage.playEffectBySex('ddz_feiji', sex);
                    break;
                case HAND_TYPE.FEIJIDAICHIBANG:
                    this.effectLayer.playAui("plane");
                    SoundManage.playEffect("SndFJ");
                    SoundManage.playEffectBySex('ddz_feiji', sex);
                    break;
            }
            SoundManage.playEffect("cardSound");
        }
        //打开玩家结算页面
        public openRoundAccountLayer(datas: model.DDZGameOverInfo): void {
            if (this.gameDatas.gameType === GAME_TYPE.CARD) {
                let accLayer = new RoundAccountDdzLyayer(this.gameDatas.currentBeilv);
                accLayer.open();
                //设置结算数据
                accLayer.setDatas(datas, this.gameDatas);
                accLayer.addEventListener(Layers.Event.CLOSE, () => {
                    this.msgHandler.sendReadyGame();
                    this.reset();
                    this.msgHandler.doAllowHandleMsg();
                }, this);
            } else {
                this.reset();
                this.isShowReadyMenu(true);
                //     this.showWaitGameStartTip();
                this.msgHandler.doAllowHandleMsg();
            }

        }
        /**
         * 创建飞金币动画
         */
        public async doFlyCoinsAni(datas: model.NN_GAMEOVER) {
            // let self = this;
            // let tween: egret.Tween;
            // let length = datas.gameResult.length - 1;
            // //庄家结算信息
            // var dInfo = datas.gameResult[length];
            // let dPlayer = self.getPlayerById(dInfo.playerId);
            // let delay = 0;
            // /**
            //  * 先播放输给庄家的玩家的飞金币动画(从输的人的头像飞到庄家的头像上)
            //  * 使用await,等待所有的动画播完再进行下一步
            //  */
            // await Promise.all(datas.gameResult.map((info: { playerId: number, balance: number }) => {
            //     if (info.balance < 0) {
            //         let player: PlayerBase = self.getPlayerById(info.playerId);
            //         return self.effectLayer.createCoinsEffect(player.getHeadPos(), dPlayer.getHeadPos(), player.doEndAni, player, info.balance);
            //     }
            // }));
            // //播放庄家头上的飘字动画
            // dPlayer.doEndAni(dInfo.balance);
            // //然后播放赢了庄家钱人的动画(从庄家的头像飞到赢钱的人的头像上)

            // for (let i = 0; i < length; i++) {
            //     let info = datas.gameResult[i];
            //     if (info.balance > 0) {
            //         let player = self.getPlayerById(info.playerId);
            //         self.effectLayer.createCoinsEffect(dPlayer.getHeadPos(), player.getHeadPos(), player.doEndAni, player, info.balance);
            //     }
            // }
        }
        protected onExit() {
            super.onExit();
            // //清理所有还在播放中的特效,并且回收一些对象
            this.effectLayer.clearAllAni();
            // egret.log("removeHandler2")
            // FrameManager.getInstance().removeHandler(this.hashCode);
            for (let i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; ++i) {
                this.players[i].clearAllAni();
                this.players[i].destroy();
            }
        }
        /**
         * 下注按钮回调函数
         */
        private onBet(event: egret.TouchEvent): void {
            // var value = (event && event.target.name) ? event.target.name : this._btnBar.getMinBetCount();
            // this.msgHandler.sendBetMsg(value);
        }
        /**
         * 隐藏按钮条
         */
        public hideBtnBar(): void {
            this._btnBar.curState = BTN_BAR_STATUS.NONE;
            this._btnBar.stopTimer();
        }
        public showPlayerTip(playerId: number, value: number, type: number) {
            let player: Player = this.getPlayerById(playerId);
            player && player.showTip(value, type, this.gameDatas.gameType, this.gameDatas.roomInfo.createinfo.roomMode);
        }
        /**
         * 更新角色信息
         */
        public updateRoleInfo(isAni: boolean) {
            let arrLen = this.players.length;
            for (let i = 0; i < arrLen; i++) {
                this.players[i].setRole(this.players[i].getPlayerId() === this.gameDatas.landlordId, isAni);
            }
            if (this.gameDatas.landlordId === this.gameDatas.myPlyerId) {
                this._cardBox.setLandlord();
            }
        }
        private onReady() {
            if (this.gameDatas.gameType === GAME_TYPE.COIN) {
                // createRoomConf
                egret.log("GameLangs.createRoomConf:::" + GameLangs.createRoomConf[GAME_ID.DDZ][this.gameDatas.roomInfo.createinfo.roomLevel].gold);
                if (Global.playerDto.gold < GameLangs.createRoomConf[GAME_ID.DDZ][this.gameDatas.roomInfo.createinfo.roomLevel].gold) {
                    Global.panduanJoinRoom(Global.playerDto.gold, this.gameDatas.roomInfo.createinfo.roomLevel, GAME_ID.GOLD_DDZ)
                } else {
                    this.msgHandler.sendReadyGame();
                }
            } else {
                this.msgHandler.sendReadyGame();
            }

        }
        /**
         * 更新公共牌UI
         */
        public updatePublicCards() {
            // cardValue1
            //三张牌分别用数据源跟cardValue1,cardValue2,cardValue3三个值绑定
            this._pubCardsBox["cardValue1"] = this.gameDatas.publicCards[0].cardValue;
            this._pubCardsBox["cardValue2"] = this.gameDatas.publicCards[1].cardValue;
            this._pubCardsBox["cardValue3"] = this.gameDatas.publicCards[2].cardValue;

        }
        /**
         * 重置游戏的一些UI,跟数据
         */
        public reset() {
            // this._calBox.youNiu = false;
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; i++) {
                var player = this.players[i];
                player.reset()
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
        }
        public dealCard(id, delay: number, cards?: PokerCard[], handvalue?: number, callBack?: Function, target?: Object): void {
            // var p: Player = this.getPlayerById(id);
            // if (p) {
            //     p.disBox.dealAni(delay, cards, handvalue, callBack, target);
            // }
            this._cardBox.dealCards(cards, delay);
        }
        public delCards(cards: PokerCard[]) {
            this._cardBox.delCardsByArray(cards);
        }
        /**
         * 播放少于2张牌的动画效果
         */
        public doRedLightAui() {
            this.effectLayer.playAui("redlight");
        }
        /**
         * 播放开始游戏的一些动画游戏开始
         */
        public doStartGameAni() {
            return this.effectLayer.playAuiAsync("start");
        }
        // 充值后更新筹码
        public updataPlayMechip(value: number) {

            if (this._player0._chipsLb) {
                if (value > 100000) {
                    this._player0._chipsLb.text = Math.floor(value / 10000) + GameLangs.wan;
                } else {
                    this._player0._chipsLb.text = value + "";
                }
            }
        }
    }
}