namespace majiang {
    export class GameScene extends GameSceneBase {
        private s1: eui.Image;
        private s2: eui.Image;
        // public btn_sezi: UI.CommonBtn;
        private seziAni: Effect.FrameAni;
        public players: Player[];
        public _btnBar: GameBtnBar;
        // private _gameNameImg: eui.Image;
        public msgHandler: GameMsgHandler;
        public effectLayer: GameEffectLayer;
        // public _waitOpen: eui.Group;
        public gameDatas: GameDatas;
        public uiLayer: GameUI;
        //存放打出去的牌的层
        private _sCardsLayer: eui.Component;
        /**
         * 选择碰/杠/胡/过/吃/勺/摊等操作的按钮框
         */
        public _selectBox: SelectBox;
        /**
         * 自己的手牌
         */
        public _cardBox: CardBox;

        public _dadangbox: eui.Component;
        public _timeBox: TimeBox;
        /**
         * 
         */
        public playCardPromise: Promise<any>;
        /**
         * 最后打出的一张牌
         */
        public lastPlayCard: Card;
        public constructor(args: any[]) {
            super(args);
            this.skinName = GameSceneSkin;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
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
        }
        // /**
        //  * 设置中间的计时器光执行的位置
        //  */
        // public setTimeBoxDirect(pos:number){
        //     this._timeBox.currentState = pos + "";
        // }
        /**
         * 
         */

        public ShowSeZiCount() {
            this.s1.source = "shaizi$1_png".format(this.gameDatas.seziList[0] + 1);
            this.s2.source = "shaizi$1_png".format(this.gameDatas.seziList[1] + 1);
            this.seziAni.visible = false;
            this.s1.visible = this.s2.visible = true;
            var timer = new egret.Timer(1500, 1);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.sezivisibledAni, this);
            timer.start();
        }

        public sezivisibledAni() {
            this.s1.visible = this.s2.visible = false;
        }

        public updateTimeBoxUI() {
            egret.log("updateTimeBoxUI", this.gameDatas.gameStatus)
            if (this.gameDatas.gameStatus >= GAME_STAGE.START) {
                let player: Player = this.getPlayerById(this.gameDatas.curActionId);
                let dealerId: Player = this.getPlayerById(this.gameDatas.dealerId);
                if (player) {
                    this._timeBox.currentState = "state" + (((4 - player.pos) % 4) + 1);

                }
            } else {
                this._timeBox.currentState = "none";
            }
        }

        public setTimeBoxDirect(id): void {
            var p = this.getPlayerById(id);
            if (p) {
                this._timeBox.setDirect(p.pos);
            }
        }
        public setTimeBoxArrowsDirect(id): void {
            var p: Player = this.getPlayerById(id);
            if (p) {
                this._timeBox.setArrowsDirect(p.pos);
            }
        }

        public startTimeBoxTimer() {
            this._timeBox.startTimer();
        }
        //更新玩家信息
        public updatePlayerInfo(info: model.PLAYER_INFO) {
            if (this.gameDatas.myPos > -1) {//如果自己已经坐下了
                let index = (this.gameDatas.roomInfo.createinfo.roomSize + this.gameDatas.myPos - info.zuoweiIndex) % this.gameDatas.roomInfo.createinfo.roomSize;
                this.players[index].updateInfo(info.UserInfo);
                let player = this.getPlayerById(info.playerId);
                if (player) {
                    player.updateInfo(info.UserInfo);
                } else {
                    DEBUG && egret.error(`Player ${info.playerId} Is Not Exist!!!!`)
                }
            }
        }
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
        public initDatas(datas: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_NN>, gameType: GAME_TYPE) {
            egret.log("initDatas:", datas);
            let gameDatas = this.gameDatas = new GameDatas();
            // gameDatas.gameType =  datas.createinfo.gameId === GAME_ID.GAME_ID_GDMJ_FK ? GAME_TYPE.CARD : GAME_TYPE.COIN;
            gameDatas.gameType = this.gameDatas.gameType = datas.createinfo.gameId === GAME_ID.GAME_ID_GDMJ_GOLD ? GAME_TYPE.COIN : GAME_TYPE.CARD;
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
            FrameManager.getInstance().addFrame(net.dispatchMsg, net, 0, 1);
            this.validateDisplayList();
        }

        protected initUI() {
            super.initUI();
            let self = this;
            let eg = egret;
            self.players = [];
            let roomSize = self.gameDatas.roomInfo.createinfo.roomSize;

            let tip = new eui.Image("mjzs_png");

            for (let i = 0; i < roomSize; ++i) {
                let player: Player = self["_player" + i];
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
                if (self.gameDatas.gameType === GAME_TYPE.COIN) {
                    player.setChipIcon("iconCoin_png");
                    this.uiLayer.gameCntLab.visible = false;
                }
                self.players[0].cardBox.addEventListener(CardBox.ADD_CARD_MARK, player.disBox.addCardMark, player.disBox);
            }
            self.players[0].cardBox.init();
            // this._cardBox.init(20);
            this.seziAni.init("shaizi_anmi$1_png", 11);
            self._btnBar.btnReady.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onReady, self);
            self.players[0].cardBox.addEventListener(CardBox.PLAY_CARD, self.onPlayCard, self);
            // this.dispatchEventWith(CardBox.PLAY_CARD, false, card);
            // self._btnBar.btnJiaodizhu.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCall, self);
            // self._btnBar.btnBujiao.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCall, self);
            // self._btnBar.btnChupai.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onPlay, self);
            // self._btnBar.btnBuyao.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onNotPlay, self);
            // self._btnBar.btnTishi.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onTips, self);
            // self._cardBox.addEventListener(CardBox.CARD_SELECT_FINISH, this.onCardSelect, this);
            self._selectBox.addEventListener(SelectBox.DO_ACTION, self.doAction, self);
            self._selectBox.addEventListener(SelectBox.CANCEL_TAN, self.onCancelTan, self);
            self._selectBox.addEventListener(SelectBox.SURE_TAN, self.onSureTan, self);

            if (self.gameDatas.gameType === GAME_TYPE.CARD) {//如果房卡模式的话,没有换桌按钮
                self._btnBar.btnChangeDesk.visible = false;
                self._btnBar.btnChangeDesk.includeInLayout = false;
            } else {
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
        }
        private doAction(event: egret.Event) {
            let data: MJActionItem = event.data;
            switch (data.activeType) {
                case ACTIVE_TYPE.GUO:
                    this.msgHandler.sendMjGuoMsg();
                    break;
                case ACTIVE_TYPE.PENG:
                    this.msgHandler.sendMjPengMsg(data.cardsValueAndCount);
                    break;
                case ACTIVE_TYPE.SHAO:
                    this.msgHandler.sendMjShaoMsg(data.cardsValueAndCount);
                    break;
                case ACTIVE_TYPE.GANG:
                    this.msgHandler.sendMjGangMsg(data.cardsValueAndCount);
                    break;
                case ACTIVE_TYPE.CHI:
                    this.msgHandler.sendChiMsg(data.cardsValueAndCount);
                    break;
                case ACTIVE_TYPE.HU:
                    this.msgHandler.sendMjHuMsg();
                    break;
                case ACTIVE_TYPE.TAN:
                    this.players[0].cardBox.addTanTouchEvent(data.cardsValueAndCount);
                    // this.msgHandler.sendMjHuMsg();
                    break;
            }
        }
        private onCancelTan() {
            this.players[0].cardBox.quitTan();
        }
        private onSureTan() {
            if (this.players[0].cardBox.selectList && this.players[0].cardBox.selectList.length) {
                this.msgHandler.sendMjTanMsg(Majiang.getTanInfo(this.players[0].cardBox.selectList, this.gameDatas.tanType));
            }
        }
        private onPlayCard(event: egret.Event) {
            let card = <Card>event.data;
            if (card) {
                this.msgHandler.sendChupai(card.cardValue);
            }
        }



        public PlayYaoSeZi() {
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

        public async gameOver(datas: model.MJGameOverInfo) {
            // this.lastPlayCard = null;
            var self = this;

            self.removeLastPlayCard();
            self.msgHandler.delayHandleMsg(15000);
            this.resetSelectBox();
            this.uiLayer._guajiBtn.visible = false;
            this.uiLayer._guajiImg.visible = false;
            this._laziGourp.visible = false;
            //清掉_laziGourp中的赖子牌图片
            if(this._laziCard){
                this._laziGourp.removeChild(this._laziCard);
                this._laziCard = null;
            }
            if (this.gameDatas.isSelfPlayingGame()) {
                //     self.hideBtnBar();
                let arrLen = datas.gameResult.length;
                for (let i = 0; i < arrLen; i++) {
                    let gameResult = datas.gameResult[i];
                    let player: Player = this.getPlayerById(gameResult.playerId);
                    let sex = this.gameDatas.playerDatas[gameResult.playerId].UserInfo.sex;
                    player.doEndAni(gameResult.balance);
                    //  player.(gameResult.balance);
                    if (player.currentState == "player1") {
                        if (gameResult.playerId == gameResult.huPlayerId) {
                            this.effectLayer.playLocalityAui("hu", 1);
                            // SoundManage.playEffectBySex('mj_hu', sex);
                            this.gameOverSound(gameResult.fangPaoPlayerId, sex);
                        }
                    } else if (player.currentState == "player2") {
                        if (gameResult.playerId == gameResult.huPlayerId) {
                            this.effectLayer.playLocalityAui("hu", 2);
                            // SoundManage.playEffectBySex('mj_hu', sex);
                            this.gameOverSound(gameResult.fangPaoPlayerId, sex);
                        }

                    } else if (player.currentState == "player3") {
                        if (gameResult.playerId == gameResult.huPlayerId) {
                            this.effectLayer.playLocalityAui("hu", 3);
                            // SoundManage.playEffectBySex('mj_hu', sex);
                            this.gameOverSound(gameResult.fangPaoPlayerId, sex);
                        }
                    }

                    else {
                        if (gameResult.playerId == gameResult.huPlayerId) {
                            this.effectLayer.playLocalityAui("hu", 4);
                            // SoundManage.playEffectBySex('mj_hu', sex);
                            this.gameOverSound(gameResult.fangPaoPlayerId, sex);
                        }
                    }

                }
                //等待1000毫秒
                await this.wait(1000);
                if (this.gameDatas.maCards) {
                    await this.doZhongMaAui(this.gameDatas.maCards, this.gameDatas.zhongmaCards);
                }
                //     //获取自己的结算信息
                //     egret.log("gameOver", datas);
                let gameResult = Utils.getItemByKey(datas.gameResult, "playerId", this.gameDatas.myPlyerId);
                //播放游戏结束的胜利跟失败的动画
                if (gameResult.playerId == gameResult.huPlayerId) {
                    this.effectLayer.playAui("win", self.openRoundAccountLayer, self, datas);
                } else {
                    this.effectLayer.playAui("lost", self.openRoundAccountLayer, self, datas);
                }
                SoundManage.playEffect(gameResult.playerId == gameResult.huPlayerId ? "Snd_win" : "Snd_lose");
                // SoundManage.playEffect(gameResult.balance > 0 ? "Snd_win" : "Snd_lose");

            }
        }

        private gameOverSound(fangPaoPlayerId, sex: number) {
            if (fangPaoPlayerId == 0) {
                // SoundManage.playEffectBySex('mj_zimo', sex);
                SoundManage.playEffectBySexByType("zimo", sex, LocalDatas.sDatas.datas.SoundType);
            } else if (fangPaoPlayerId == 3) {

            } else {
                // SoundManage.playEffectBySex('mj_hu', sex);
                SoundManage.playEffectBySexByType("chihu", sex, LocalDatas.sDatas.datas.SoundType);
            }
        }

        private getCardStr(value): string {
            return `mj_pai_${value}`;
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
        }

        // 出牌特效及其音效
        public doChuCardsEffect(cardValue: number, sex: number) {
            // SoundManage.playEffectBySex(`mj_pai_${cardValue}`, sex);
            // SoundManage.playEffectBySex(`mj_pai_${cardValue}`, sex);
            //  SoundManage.playEffectBySexByType(`mj_${cardValue}`, sex, LocalDatas.sDatas.datas.SoundType);
            //  SoundManage.playEffectBySexByType(SoundManage.majiangKeyMap.mj_17, sex, LocalDatas.sDatas.datas.SoundType);
            SoundManage.playEffectBySexByType(SoundManage.majiangKeyMap["mj_" + cardValue], sex, LocalDatas.sDatas.datas.SoundType);
        }
        //打开玩家结算页面
        public openRoundAccountLayer(datas: model.MJGameOverInfo): void {
            this.gameDatas.lastCardValue = null;
            if (this.gameDatas.gameType === GAME_TYPE.CARD) {
                let accLayer = new RoundAccountMjLyayer(this.gameDatas.roomInfo.createinfo.gameId);
                accLayer.currentState = "card"
                accLayer.open();
                // //设置结算数据
                accLayer.setDatas(datas, this.gameDatas);
                accLayer.addEventListener(Layers.Event.CLOSE, () => {
                    this.msgHandler.sendReadyGame();
                    this.Accountreset();
                    this.msgHandler.doAllowHandleMsg();
                }, this);
            } else {
                let accLayer = new RoundAccountMjLyayer(this.gameDatas.roomInfo.createinfo.gameId);
                accLayer.currentState = "card"
                accLayer.open();
                // //设置结算数据
                accLayer.setDatas(datas, this.gameDatas);
                accLayer.addEventListener(Layers.Event.CLOSE, () => {
                    // this.msgHandler.sendReadyGame();
                    // this.Accountreset();
                    // this.msgHandler.doAllowHandleMsg();
                    this.Accountreset();
                    this.isShowReadyMenu(true);
                    this.msgHandler.doAllowHandleMsg();
                }, this);

            }

        }
        protected onExit() {
            super.onExit();
            //清理所有还在播放中的特效,并且回收一些对象
            // this.effectLayer.clearAllAni();
            // egret.log("removeHandler2");
            // FrameManager.getInstance().removeHandler(this.hashCode);
            for (let i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; ++i) {
                // this.players[i].clearAllAni();
                this.players[i].destroy();
            }
        }
        // /**
        //  * 隐藏按钮条
        //  */
        public hideBtnBar(): void {
            this._btnBar.curState = BTN_BAR_STATUS.NONE;
        }
        public showPlayerTip(playerId: number, value: number, type: number) {
            let player: Player = this.getPlayerById(playerId);
            player && player.showTip(value, type, this.gameDatas.gameType, this.gameDatas.roomInfo.createinfo.roomMode);

        }

        /**
         * 刷新操作按钮组UI
         */
        public addSelectItems() {
            // if (this.gameDatas._actionItems && this.gameDatas._actionItems.length) {
            this._selectBox.visible = true;
            this._selectBox.addItems(this.gameDatas._actionItems);
            // } else {
            //     this._selectBox.visible = false;
            // }
        }

        //刷新自己牌的排序
        public resetSortLastCard() {
            let player: Player = this.getPlayerById(this.gameDatas.myPlyerId);
            player.cardBox.sortLastCard();
        }

        public resetSelectBox() {
            this._selectBox.reset();
        }
        private onReady() {
            this.msgHandler.sendReadyGame();
        }
        /**
         * 玩家打出一张牌
         */
        public playCard(playerId: number, cardValue: CARD_VALUE) {

            let player: Player = this.getPlayerById(playerId);
            if (player) {
                //将牌从手牌里面删除
                // let card = this.lastPlayCard = this.delCard(cardValue);
                let card = this.lastPlayCard = player.cardBox.deleteCard(cardValue);
                player.cardBox.sortLastCard();
                card.setDisIcon(DIRECT.BOTTOM, cardValue);
                this._sCardsLayer.addChild(card);
                let scale = 1.5;
                this.playCardPromise = new Promise((finish: Function) => {
                    egret.Tween.get(card).to({
                        x: (Global.sWidth - card.width * scale) / 2,
                        y: (Global.sHeight - card.height * scale) / 2,
                        scaleX: scale,
                        scaleY: scale
                    }, 150).call(finish);
                });
                this.msgHandler.delayHandleMsg(200);
            }
        }
        public removeLastPlayCard() {
            if (this.lastPlayCard) {
                this.lastPlayCard.destroy();
                this.playCardPromise = null;
                // this.lastPlayCard = null;
            }
        }
        public initLastPlayCard(playerId: number, cardValue: CARD_VALUE) {
            let card = this.lastPlayCard = Card.create();
            this._sCardsLayer.addChild(card);
            card.setDisIcon(DIRECT.BOTTOM, cardValue);
            let scale = 1.5;
            card.scaleX = card.scaleY = scale;
            card.x = (Global.sWidth - card.width * scale) / 2;
            card.y = (Global.sHeight - card.height * scale) / 2;
        }
        /**
         * 某个玩家打出一张牌到桌面上
         */
        public async addDisCard(playerId: number, cardValue: CARD_VALUE) {
            let lastPlayCard = this.lastPlayCard;
            this.lastPlayCard = null;
            if (this.playCardPromise) {
                await this.playCardPromise;
                await this.wait(150);
            }
            egret.log("lastPlayCard", lastPlayCard);
            let player: Player = this.getPlayerById(playerId);
            if (player) {
                player.disBox.addCardWithAni(lastPlayCard, cardValue);
                this.gameDatas.lastCardValue = null;
            }
        }
        public iniDisCards(playerId: number, cardValues: CARD_VALUE[]) {
            let player: Player = this.getPlayerById(playerId);
            if (player) {
                player.disBox.initCards(cardValues);
            }
        }


        public initLaziCard(val: number) {
            return this.effectLayer.playAuiAsync2("lazi", `mj_bottomD${val}_png`);
        }

        public _laziGourp: eui.Group;
        private _laziCard: eui.Image;

        public initLaziCard1(val: number) {
            this._laziGourp.visible = true;
            let _laziCard: eui.Image = this._laziCard;
            if (_laziCard) {

            } else {
                _laziCard = new eui.Image();
                _laziCard.width = 29;
                _laziCard.height = 42;
                this._laziGourp.addChild(_laziCard);
            }
            egret.log("_laziCard", _laziCard);
            _laziCard.source = `mj_bottomD${val}_png`;
            let w = this._laziGourp.parent.width / 2;
            let h = this._laziGourp.parent.height / 2;
            _laziCard.x = this.width / 2 - this._laziGourp.x;;
            _laziCard.y = this.height / 2 - this._laziGourp.y;
            egret.Tween.get(_laziCard).wait(0).to({ x: 18, y: 10 }, 1000);
        }

        public initTanCard(playerId: number, cardValues: CARD_VALUE[]) {
            let player: Player = this.getPlayerById(playerId);
            if (player) {
                player.tanBox.initCards(cardValues);
            }
        }


        /**
         * 重置游戏的一些UI,跟数据
         */
        public reset() {
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; i++) {
                var player = this.players[i];
                player.reset()
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
        }

        public Accountreset() {
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; i++) {
                var player = this.players[i];
                player.Accountreset()
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
        }

        public dealCard(id: number, cards: CARD_VALUE[], destList: MJActionItem[]): void {
            // this._cardBox.initCards(cards);\
            let player: Player = this.getPlayerById(id);
            if (player) {
                player.cardBox.initCards(this.gameDatas.laziCard, cards, destList);
            }
        }

        public SetLaziCard(cards: number) {
            let player: Player = this.getPlayerById(this.gameDatas.myPlyerId);
            // egret.log("this._LziCard111", cards);
            // player.cardBox.LziCard(cards);
        }
        /**
         * 碰/吃/勺的时候,在手牌里面增加一个牌型对象,同时把多余的牌删除
         */
        public addCardType(id: number, destList: MJActionItem) {
            this.gameDatas.lastCardValue = null;
            let player: Player = this.getPlayerById(id);
            if (player) {
                player.cardBox.addCardTypeObj(destList);
            }
        }

        public doMjchiAui(id: number) {
            let sex = this.gameDatas.playerDatas[id].UserInfo.sex;
            SoundManage.playEffectBySex('mj_chi', sex);
            let player: Player = this.getPlayerById(id);
            if (player.currentState == "player1") {
                this.effectLayer.playLocalityAui("chi", 1);
            } else if (player.currentState == "player2") {
                this.effectLayer.playLocalityAui("chi", 2);
            } else if (player.currentState == "player3") {
                this.effectLayer.playLocalityAui("chi", 3);
            } else {
                this.effectLayer.playLocalityAui("chi", 4);
            }
        }

        public doMjshaoAui(id: number) {
            let sex = this.gameDatas.playerDatas[id].UserInfo.sex;
            SoundManage.playEffectBySex('mj_shao', sex);
            let player: Player = this.getPlayerById(id);
            if (player.currentState == "player1") {
                this.effectLayer.playLocalityAui("shao", 1);
            } else if (player.currentState == "player2") {
                this.effectLayer.playLocalityAui("shao", 2);
            } else if (player.currentState == "player3") {
                this.effectLayer.playLocalityAui("shao", 3);
            } else {
                this.effectLayer.playLocalityAui("shao", 4);
            }
        }

        public doMjgangAui(id: number) {
            let player: Player = this.getPlayerById(id);
            if (player.currentState == "player1") {
                this.effectLayer.playLocalityAui("gang", 1);
            } else if (player.currentState == "player2") {
                this.effectLayer.playLocalityAui("gang", 2);
            } else if (player.currentState == "player3") {
                this.effectLayer.playLocalityAui("gang", 3);
            } else {
                this.effectLayer.playLocalityAui("gang", 4);
            }
        }

        public doMjtanAui(id: number, values?: CARD_VALUE[]) {

            let sex = this.gameDatas.playerDatas[id].UserInfo.sex;
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

            let player: Player = this.getPlayerById(id);
            if (player.currentState == "player1") {
                this.effectLayer.playLocalityAui("tan", 1);
            } else if (player.currentState == "player2") {
                this.effectLayer.playLocalityAui("tan", 2);
            } else if (player.currentState == "player3") {
                this.effectLayer.playLocalityAui("tan", 3);
            } else {
                this.effectLayer.playLocalityAui("tan", 4);
            }
        }

        public doMjPengAui(id: number) {
            let sex = this.gameDatas.playerDatas[id].UserInfo.sex;
            // SoundManage.playEffectBySex('mj_peng', sex);
            SoundManage.playEffectBySexByType("peng", sex, LocalDatas.sDatas.datas.SoundType);
            let player: Player = this.getPlayerById(id);
            if (player.currentState == "player1") {
                this.effectLayer.playLocalityAui("peng", 1);
            } else if (player.currentState == "player2") {
                this.effectLayer.playLocalityAui("peng", 2);
            } else if (player.currentState == "player3") {
                this.effectLayer.playLocalityAui("peng", 3);
            } else {
                this.effectLayer.playLocalityAui("peng", 4);
            }
            // if (player) {
            //     // player.cardBox.addCardTypeObj(destList);
            //     this.effectLayer.playAui("peng");
            // }
        }

        /**
         * 杠的时候,在手牌里面更新一个牌型对象,同时把多余的牌删除
         */
        public updateCardType(id: number, destList: MJActionItem) {
            let player: Player = this.getPlayerById(id);
            if (player) {
                player.cardBox.updateCardType(destList);
            }
        }


        public addCard(id: number, card?: CARD_VALUE) {
            let player: Player = this.getPlayerById(id);
            if (player) {
                player.cardBox.addCard(card)
            }
        }
        /**
         * 摸牌声音
         */
        public addCardSound(card?: CARD_VALUE) {
            if (card) {
                SoundManage.playEffect("mj_mopai");
            }
        }

        public addCards(id: number, values?: CARD_VALUE[]) {
            let player: Player = this.getPlayerById(id);
            if (player) {
                player.cardBox.addCards(values);
            }
        }
        public addTanCards(id: number, values?: CARD_VALUE[]) {
            let player: Player = this.getPlayerById(id);
            if (player) {
                player.tanBox.addCardByValues(values);
            }
        }
        public deleteSeletBoxBtn() {
            this._selectBox.deleteBtnByItem(ACTIVE_TYPE.TAN);
        }
        /**
         * 删除一张牌
         */
        public delCard(id: number, cardValue: CARD_VALUE) {
            let player: Player = this.getPlayerById(id);
            if (player) {
                let card = player.cardBox.deleteCard(cardValue);
                player.cardBox.sortLastCard();
                return card;
            }
        }
        /**
         * 删除若干张牌
         */
        public delCards(id: number, cardValues?: CARD_VALUE[]) {
            let player: Player = this.getPlayerById(id);
            if (player) {
                let card = player.cardBox.deleteCards(cardValues);
                player.cardBox.sortLastCard();
                return card;
            }
        }
        /**
         * 播放开始游戏的一些动画游戏开始
         */

        public doStartGameAni() {
            return this.effectLayer.playAuiAsync1("start");
        }
        private _remainCardLable: eui.Label;

        public initRemainCards() {
            this._remainCardLable.text = "剩下" + this.gameDatas.remainCards + "张";
        }
        public _difenLable: eui.Label;

        public updateDifenLable() {
            if (this.gameDatas.roomInfo.createinfo.difen > 10000) {
                this._difenLable.text = "底分:" + Math.floor(this.gameDatas.roomInfo.createinfo.difen / 10000) + GameLangs.wan;
            } else {
                this._difenLable.text = "底分:" + this.gameDatas.roomInfo.createinfo.difen;

            }
        }

        public doZhongMaAui(maCards: number[], zhongmaCards: number[]) {
            return this.effectLayer.playAuiAsyncZhongMa("zhongma", maCards, zhongmaCards);
        }
    }
}