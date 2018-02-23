namespace niuniu {
    export class GameScene extends GameSceneBase {
        // public _logic: GameLogic;
        public players: Player[];
        protected _handBox: HandCardBox;//手上的牌
        //没牛按钮
        private _btnWuniu: UI.CommonBtn;
        //有牛按钮
        private _btnYouniu: UI.CommonBtn;
        //自动算牛按钮
        private _btnAuto: UI.CommonBtn;
        private _disBox: DiscardBox;//自己牌桌上面的牌
        public _btnBar: GameBtnBar;
        private _gameNameImg: eui.Image;
        private _btnZdbip: eui.ToggleButton;
        private _btnZdbup: eui.ToggleButton;
        public msgHandler: GameMsgHandler;
        public effectLayer: GameEffectLayer;
        public _waitOpen: eui.Group;
        public player0: niuniu.Player;

        
        /**
         * 算牛栏
         */
        private _calBox: CalBox;
        public gameDatas: GameDatas;
        public constructor(args: any[]) {
            super(args);

            this.skinName = GameSceneSkin;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            SoundManage.playMusic(SoundManage.keyMap.nn_bg);

            // var self = this;
            // let playerCnt = 8;

            // for (var i = 1; i <= playerCnt; i++) {
            //     let player:Player = self["player" +i ];
            //     self.players[i] = player;
            //     player.addEventListener(egret.TouchEvent.TOUCH_TAP,self.openUserInfoLayer,self);
            // }
        }
        /**
         * 初始化一些游戏数据
         */
        public initDatas(datas: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_NN>, gameType: GAME_TYPE) {
            egret.log("initDatas:", datas);
            let gameDatas = this.gameDatas = new GameDatas();
            if (datas.createinfo.gameId === GAME_ID.QZNN) {
                gameDatas.gameType = GAME_TYPE.COIN;
            } else if (datas.createinfo.gameId === GAME_ID.GAME_ID_TWOMAN_QZNN) {
                gameDatas.gameType = GAME_TYPE.CARD;
            } else {
                gameDatas.gameType = GAME_TYPE.CARD;
            }
            // gameDatas.gameType = datas.createinfo.gameId === GAME_ID.QZNN ? GAME_TYPE.COIN : GAME_TYPE.CARD;
            gameDatas.roomInfo = datas;
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

            this.validateDisplayList();
            net.dispatchMsg();
        }
        /**
         * 设置当前游戏是8人场还是5人场
         */
        private setRoomSize() {
            if (this.gameDatas.roomInfo.createinfo.roomSize == 8) {//如果是8人场,需要调一下数组的位置
                this.currentState = "8";
                let players: PlayerBase[] = this.players;
                let temp;
                temp = players[1];
                players[1] = players[7];
                players[7] = players[4];
                players[4] = players[5];
                players[5] = players[3];
                players[3] = players[2];
                players[2] = temp;
                for (let i = 0; i < 8; ++i) {
                    players[i].pos = i;
                }
            }
        }

        /**
         * 是否显示准备菜单
         */
        public isShowReadyMenu(visible: boolean) {
            egret.log("isShowReadyMenuvisible" + visible);
            if (this.gameDatas.gameType === GAME_TYPE.CARD) {
                if (visible) {
                    this._btnBar.curState = BTN_BAR_STATUS.ZHUNBEI;
                } else if (this._btnBar.curState === BTN_BAR_STATUS.ZHUNBEI) {
                    this._btnBar.curState = BTN_BAR_STATUS.NONE;
                }
            } else {
                if (visible) {
                    this._btnBar.btnChangeDesk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
                    this._btnBar.curState = BTN_BAR_STATUS.GOLDZHUNBEI;
                } else if (this._btnBar.curState === BTN_BAR_STATUS.GOLDZHUNBEI) {
                    this._btnBar.curState = BTN_BAR_STATUS.NONE;
                }

            }
            // egret.log("是否显示准备菜单this._btnBar.curState"+this._btnBar.curState)
        }
        protected initUI() {
            super.initUI();
            let self = this;
            let eg = egret;

            self.players = [];
            let roomSize = self.gameDatas.roomInfo.createinfo.roomSize;
            if (roomSize == 2) {
                roomSize = 5;
            }
            self.currentState = roomSize + "";//设置当前场景状态未八人场还是五人场
            for (let i = 0; i < roomSize; ++i) {
                let player: Player = self["player" + i];
                self.players[i] = player;
                player.disBox = self["cards" + i];
                player.pos = i;
                player.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
                player.visible = !i;
                if (this.gameDatas.gameType === GAME_TYPE.COIN) {
                    player.setChipIcon("iconCoin_png");
                    this.uiLayer.gameCntLab.text = "游戏底分：" + this.gameDatas.roomInfo.createinfo.difen;
                }

                if (this.gameDatas.roomInfo.createinfo.gameId === GAME_ID.GAME_ID_TWOMAN_QZNN) {
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
            self._btnBar.addEventListener(BTNBAR_EVENT.CAL, self.onCal, self);
            self._btnBar._btnReady.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onReady, self);
            self._btnBar.addEventListener(BTNBAR_EVENT.ROB, self.onRob, self);
            self._btnBar.addEventListener(BTNBAR_EVENT.BET, self.onBet, self);
            self._btnBar.registerBetCB(self.onBet, self);
            self._btnBar.registerRobCB(self.onRob, self);
            // self._btnBar.initRobBtn(self.gameDatas.roomInfo.createinfo.qzRateList, self.gameDatas.gameType);
            self._btnBar.initRobBtn([0, 1, 2, 3, 4], self.gameDatas.gameType);
        }


        public showWaitTip() {
            this._btnBar.curState = BTN_BAR_STATUS.WAIT;
            this._btnBar.setTip(GameLangs.waitPlayGameTip);
        }
        // public 
        /**
         * 游戏结束
         */
        public async gameOver(datas: model.NN_GAMEOVER) {
            var self = this;
            if (this.gameDatas.isSelfPlayingGame()) {
                self.msgHandler.stopHandleMsg();
            }
            // if (this.gameDatas.isSelfPlayingGame()) {
            //游戏结束的时候,还存在的人则都默认是游戏中的
            // for (let key in this.gameDatas.playerDatas) {
            //     this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
            // }
            self.hideBtnBar();
            egret.log("datas.gameResult.length" + datas.gameResult.length)
            //等待1000毫秒
            // await this.wait(1000);
            let arrLen = datas.gameResult.length;
            for (let i = 0; i < arrLen; i++) {
                let gameResult = datas.gameResult[i];
                let player: Player = this.getPlayerById(gameResult.playerId);
                let disBox: DiscardBox = this.gameDatas.isSelfId(gameResult.playerId) ? this._disBox : player.disBox;
                disBox.hideCompleteIcon();
                await disBox.showCardAni(gameResult.cards, -1, gameResult.handValue, false, player.sex);//播放开牌动画
            }
            //等待1000毫秒
            await this.wait(1000);
            self.doFlyCoinsAni(datas);
            if (this.gameDatas.isSelfPlayingGame()) {

                //获取自己的结算信息
                let gameResult = Utils.getItemByKey(datas.gameResult, "playerId", this.gameDatas.myPlyerId);
                //播放游戏结束的胜利跟失败的动画
                // if (gameResult.balance) {
                self.effectLayer.playAui(gameResult.balance > 0 ? "win" : "lost", self.openRoundAccountLayer, self, datas);
                SoundManage.playEffect(gameResult.balance > 0 ? "nnGameWin" : "nnGameLose");

            } else {
                await this.wait(1000);
                self.openRoundAccountLayer(datas);
            }
            //游戏结束的时候,还存在的人则都默认是游戏中的
            for (let key in this.gameDatas.playerDatas) {
                this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
            }
        }
        //打开玩家结算页面
        public openRoundAccountLayer(datas: model.NN_GAMEOVER): void {
            if (this.gameDatas.gameType === GAME_TYPE.CARD && this.gameDatas.roomInfo.createinfo.gameId === GAME_ID.QZNN) {
                let accLayer = new RoundAccountLayer();
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
                // this.showWaitGameStartTip();
                if (this.gameDatas.gameType === GAME_TYPE.COIN) {
                    this._btnBar.curState = BTN_BAR_STATUS.GOLDZHUNBEI;
                } else {
                    this._btnBar.curState = BTN_BAR_STATUS.ZHUNBEI;
                }
                this.msgHandler.doAllowHandleMsg();
            }

        }
        /**
         * 创建飞金币动画
         */
        public async doFlyCoinsAni(datas: model.NN_GAMEOVER) {
            SoundManage.playEffect("flyMoney");
            let self = this;
            let tween: egret.Tween;
            let length = datas.gameResult.length;
            // egret.log("@@@@@@@@" + datas.gameResult, this.gameDatas.dealerId);
            //庄家结算信息
            var dInfo = Utils.getItemByKey(datas.gameResult, "playerId", this.gameDatas.dealerId);

            let dPlayer = self.getPlayerById(dInfo.playerId);
            let delay = 0;
            /**
             * 先播放输给庄家的玩家的飞金币动画(从输的人的头像飞到庄家的头像上)
             * 使用await,等待所有的动画播完再进行下一步
             */
            await Promise.all(datas.gameResult.map((info: { playerId: number, balance: number }) => {
                if (info.balance < 0 && info.playerId !== self.gameDatas.dealerId) {
                    let player: PlayerBase = self.getPlayerById(info.playerId);
                    return self.effectLayer.createCoinsEffect(player.getHeadPos(), dPlayer.getHeadPos(), player.doEndAni, player, info.balance);
                }
            }));
            //播放庄家头上的飘字动画
            if (this.gameDatas.roomInfo.createinfo.gameId !== GAME_ID.GAME_ID_TWOMAN_QZNN) {
                dPlayer.doEndAni(dInfo.balance);

                //然后播放赢了庄家钱人的动画(从庄家的头像飞到赢钱的人的头像上)

                for (let i = 0; i < length; i++) {
                    let info = datas.gameResult[i];
                    if (info.balance > 0 && info.playerId !== self.gameDatas.dealerId) {
                        let player = self.getPlayerById(info.playerId);
                        self.effectLayer.createCoinsEffect(dPlayer.getHeadPos(), player.getHeadPos(), player.doEndAni, player, info.balance);
                    }
                }
            } else {
                for (let i = 0; i < length; i++) {
                    let info = datas.gameResult[i];
                    if (info.balance > 0 && info.playerId !== self.gameDatas.dealerId) {
                        let player = self.getPlayerById(info.playerId);
                        self.effectLayer.createCoinsEffect(dPlayer.getHeadPos(), player.getHeadPos(), null, player, info.balance);
                    }
                }
            }

        }
        private onCal(event: egret.TouchEvent): void {
            if (event && event.target instanceof UI.CommonBtn) {//如果是点击按钮调用的这个函数
                var value = parseInt(event.target.name);
                if (value <= 0) {
                    if (this.gameDatas.cardType == HANDVALUE.SANPAI || value == -1) {
                        this.msgHandler.sendCalMsg(0);
                    } else {
                        Toast.launch(GameLangs.moreThinkTip);
                    }

                } else {
                    if (this._calBox.youNiu) {
                        this.msgHandler.sendCalMsg(0, [this._calBox.cardValues[0], this._calBox.cardValues[1], this._calBox.cardValues[2]]);
                    } else {
                        Toast.launch(GameLangs.moreThinkTip);
                    }
                }
            } else {//如果是超时自动调用的这个函数
                this.msgHandler.sendCalMsg(0);
                this.showComeIcon(1);
            }
        }
        protected onExit() {
            super.onExit();
            //清理所有还在播放中的特效,并且回收一些对象
            this.effectLayer.clearAllAni();
            // egret.log("removeHandler2")
            // FrameManager.getInstance().delayRemoveHandler(this.hashCode);
            for (let i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; ++i) {
                this.players[i].clearAllAni();
                this.players[i].destroy();
            }
        }
        /**
         * 下注按钮回调函数
         */
        private onBet(event: egret.TouchEvent): void {
            var value = (event && event.target.name) ? event.target.name : this._btnBar.getMinBetCount();
            this.msgHandler.sendBetMsg(value);
        }
        /**
         * 隐藏按钮条
         */
        public hideBtnBar(): void {
            if (this.gameDatas.isSelfPlayingGame()) {
                this._btnBar.currentState = BTN_BAR_STATUS.NONE;
            }
            this._btnBar.stopTimer();
        }
        /**
         * 抢庄按钮回调函数
         */
        private onRob(event: egret.TouchEvent): void {
            let value = (event && event.target.name) ? event.target.name : 0;
            this.msgHandler.sendCallMsg(value);
            // this._btnBar.currentState = BTN_BAR_STATUS.NONE;
            // this._btnBar.stopTimer();
        }
        public showPlayerTip(playerId: number, value: number, type: number) {
            let player: Player = this.getPlayerById(playerId);
            player && player.showTip(value, type, this.gameDatas.gameType);
        }
        public addCard(id: number, cardValue: number, callBack?: Function, target?: Object) {
            let p: Player = this.getPlayerById(id);
            if (p) {
                p.disBox.addCardAni(cardValue, callBack, target);
            }
        }
        public hideCalMenu(): void {
            var self = this;
            // if (self._logic.roomCfg.gameID == GAME_TYPE.NIUNIU) {
            self._btnBar.clearCbKey();
            self._btnBar.setTip(GameLangs.wait_cal_time_tip);
            self._btnBar.currentState = BTN_BAR_STATUS.WAITBET;
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
        }


        /**
         * 播放抢庄动画
         */
        public async doRobAni(datas: model.NN_DEALER) {
            var self = this;
            var aniCallBack = () => {
                if (this.gameDatas.isSelfPlayingGame()) {
                    if (datas.dealer != self.gameDatas.myPlyerId) {
                        self.showBetMenu();
                    } else {
                        self.showBetMenu();
                        self.showWaitBetMenu();
                    }
                }
            }
            //如果只有一个人抢庄,那边就直接播放定庄动画
            if (datas.playerIds.length === 1) {
                let player: Player = self.getPlayerById(datas.dealer);
                self.setAllPlayerStatu(PLAYER_UI_STATU.NONE);
                player.setDealerIcon(true);
                player.setFrameAniVisible(true);
                player.playDealerAni(aniCallBack, this);
                // aniCallBack();
            } else {//多人抢庄先播放抢庄动画,然后再播放定庄动画
                let length = datas.playerIds.length;
                //抢庄动画播放跳转的次数
                let aniCount = 2;
                let players: Player[] = [];
                //所有抢庄的人的列表
                for (let i = 0; i < length; i++) {
                    players[i] = self.getPlayerById(datas.playerIds[i]);
                }
                //开始播放抢庄动画
                for (let i = 0; i < aniCount; i++) {
                    for (let j = 0; j < length; j++) {
                        players[j].setFrameAniVisible(true);
                        if (i >= aniCount - 1 && datas.playerIds[j] === datas.dealer) {
                            self.setAllPlayerStatu(PLAYER_UI_STATU.NONE);
                            players[j].setDealerIcon(true);
                            players[j].playDealerAni(aniCallBack, self);
                            break;
                        } else {
                            SoundManage.playEffect("nnSelectDealer");
                            await this.wait(120);
                            players[j].setFrameAniVisible(false);
                        }

                    }
                }
                if (!this.gameDatas.isSelfPlayingGame()) {

                }
            }
        }
        /**
         * 显示完成算牛提示
         */
        public showComeIcon(id: number): void {
            var player: Player = this.getPlayerById(id);
            if (player) {
                player.disBox.showComeIcon();
            }
        }
        public setCards(id: number, cards: number[], count: number): void {
            var player: Player = this.getPlayerById(id);
            if (player) {
                player.disBox.showCards(cards, count);
            }
        }
        /**
         * 显示计牛栏
         */
        public showCalBox(): void {
            // if (this._logic.roomCfg.gameID == GAME_TYPE.NIUNIU) {
            this._calBox.show();
            this._btnBar.currentState = BTN_BAR_STATUS.CAL;
            this._btnAuto.visible = true;
            var cardType: any = this.gameDatas.cardType//(this._logic.handtype >> 12) & 0xf;
            if (cardType <= HANDVALUE.YINNIU) {
                this._btnYouniu.visible =
                    this._btnWuniu.visible = true;
                this._btnAuto.label = GameLangs.zidongsuanniu;
                // 
            } else {
                this._btnYouniu.visible =
                    this._btnWuniu.visible = this._btnAuto.visible = true;
                // this._cardBox.touchEnabled = this._cardBox.touchChildren = true;
            }
            this._handBox.touchEnabled = this._handBox.touchChildren = true;
            this._btnBar.startTimer(CAL_COUNT_DOWN, GameLangs.calTimeTip, true, BTNBAR_EVENT.CAL);
            // } else {
            //     this._btnZdbip.visible = this._btnZdbup.visible = true;
            // }

        }
        /**
         * 显示等待其他人下注提示条
         */
        public showWaitBetMenu(): void {
            this._btnBar.setTip(GameLangs.wait_bet_time_tip);
            this._btnBar.clearCbKey();
            this._btnBar.currentState = BTN_BAR_STATUS.WAITBET;
        }
        /*
         * 显示下注按钮
         */
        public showBetMenu(): void {
            this._btnBar.currentState = BTN_BAR_STATUS.BET;
            this._btnBar.startTimer(BET_COUNT_DOWN, GameLangs.bet_time_tip, true, BTNBAR_EVENT.BET);
        }
        /*
         * 显示抢庄按钮
         */
        public showRobMenu(): void {
            this._btnBar.currentState = BTN_BAR_STATUS.ROB;
            this._btnBar.startTimer(ROB_COUNT_DOWN, GameLangs.rob_time_tip, true, BTNBAR_EVENT.ROB);
        }
        public initBetBtns(list: number[]): void {
            if (list)
                this._btnBar.initBetBtns(list,
                    this.gameDatas.gameType === GAME_TYPE.CARD
                );
        }
        private onReady() {
            if (this.gameDatas.gameType === GAME_TYPE.COIN) {
                // createRoomConf
                egret.log("GameLangs.createRoomConf:::" + GameLangs.createRoomConf[GAME_ID.QZNN][this.gameDatas.roomInfo.createinfo.roomLevel].gold);
                if (Global.playerDto.gold < GameLangs.createRoomConf[GAME_ID.QZNN][this.gameDatas.roomInfo.createinfo.roomLevel].gold) {
                    Global.panduanJoinRoom(Global.playerDto.gold, this.gameDatas.roomInfo.createinfo.roomLevel, GAME_ID.QZNN)
                } else {
                    this.msgHandler.sendReadyGame();
                }
            } else {
                this.msgHandler.sendReadyGame();

            }

        }
        /**
         * 重置游戏的一些UI,跟数据
         */
        public reset() {
            this._calBox.youNiu = false;
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; i++) {
                var player = this.players[i];
                player.reset()
            }
            this._disBox.visible = false;
            this._handBox.visible = true;
            this._btnBar.RefreshQiangBarAvail(Global.playerDto.gold, this.gameDatas.roomInfo.createinfo.difen, this.gameDatas.getPlayIngGameCnt(), 25, 4, this.gameDatas.gameType === GAME_TYPE.COIN);

        }
        public dealCardById(id, delay: number, cards?: number[], handvalue?: number, callBack?: Function, target?: Object): void {
            var p: Player = this.getPlayerById(id);
            if (p) {
                p.disBox.dealAni(delay, cards, handvalue, callBack, target);
            }

        }

        /**
         * 设置庄家icon
         */
        public setPlayerDealerIcon(id: number, visible: boolean) {
            var p: Player = this.getPlayerById(id);
            if (p) {
                p.setDealerIcon(visible);
            }
        }
        /**
         * 播放开始游戏的一些动画游戏开始
         */
        public doStartGameAni() {
            return this.effectLayer.playAuiAsync("start");;;
        }
        // 充值后更新筹码
        public updataPlayMechip(value: number) {

            if (this.player0._chipsLb) {
                if (value > 100000) {
                    this.player0._chipsLb.text = Math.floor(value / 10000) + GameLangs.wan;
                } else {
                    this.player0._chipsLb.text = value + "";
                }
            }
        }
    }
}