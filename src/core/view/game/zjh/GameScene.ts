namespace zjh {
    export class GameScene extends GameSceneBase {
        // public _logic: GameLogic;
        public players: Player[];
        public _player0: zjh.Player;
        private _gameNameImg: eui.Image;
        public msgHandler: GameMsgHandler;
        public effectLayer: GameEffectLayer;
        public gameDatas: GameDatas;
        public uiLayer: GameUI;
        /**
         * 按钮栏
         */
        public _btnBar: GameBtnBar;
        /**
         * 显示轮数跟单注的控件
         */
        public _roundTipBar: eui.Group;
        private _betRoundLab: eui.Label;
        /**
         * 总下注筹码栏
         */
        private _allChipsBar: ChipsBar;
        //筹码池
        private _chipsPool: ChipsPool;

        /**
         * 准备
         */
        private _btnReady: UI.CommonBtn;
        /**
         * 换桌
         */
        private btnChangeDesk: UI.CommonBtn;

        public _pkAnuLayer: zjh.PKAniLayer;


        public constructor(args: any[]) {
            super(args);
            this.skinName = GameSceneSkin;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.BackRoomChips();
            this._btnReady.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReady, this);
            this.btnChangeDesk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
            SoundManage.playMusic(SoundManage.keyMap.zjh_bg);

            if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                this.uiLayer._voiceBtn.visible = false;
                this.uiLayer._inviteBtn.bottom = 90;
            }

            // this.uiLayer.
        }
        protected isReady: boolean;
        private onReady(event: egret.TouchEvent): void {
            this.gameDatas.roomInfo.chipsList
            if (this.gameDatas.gameType === GAME_TYPE.COIN) {
                egret.log("GameLangs.createRoomConf:::" + Global.playerDto.gold, this.gameDatas.roomInfo.createinfo.roomLevel, GAME_ID.GOLD_ZJH);
                if (Global.playerDto.gold < GameLangs.createRoomConf[GAME_ID.ZJH][this.gameDatas.roomInfo.createinfo.roomLevel].gold) {
                    Global.panduanJoinRoom(Global.playerDto.gold, this.gameDatas.roomInfo.createinfo.roomLevel, GAME_ID.GOLD_ZJH)
                } else {
                    this.msgHandler.sendReadyGame();
                }
            } else {
                this.msgHandler.sendReadyGame();
            }



            // if (!this.isReady) {
            //     this.isReady = true;
            //     this._logic.readyGameByClickBtn();
            //     this.showReadyMenu(false);
            //     this.players[1].status = PLAYER_STATUS.READY;
            //     SoundManage.playNormalEffect('Snd_commonbtn');
            // }

        }

        protected openUserInfoLayer(e: egret.TouchEvent) {
            var player: Player = e.target;
            if (player.isDoBlinkAni) {//如果当前在播放比牌动画中,发送比牌消息
                this._btnBar.visible = false;
                this.msgHandler.sendBi(player.getPlayerId());
                egret.log(player.getPlayerId());
            } else {
                super.openUserInfoLayer(e);
                // this._chipsPool.addChips(1, "1分", player.getHeadPos());
            }
        }
        /**
         * 播放下注时扔筹码的动画
         */
        public doPlayerBetAni(playerId: number, chips: number) {
            let player: Player = this.getPlayerById(playerId);
            let chipsNum = this.gameDatas.roomInfo.createinfo.betChips.indexOf(chips);
            egret.log("chipsNum", chipsNum === -1 ? 0 : chipsNum, chipsNum === -1, chipsNum)
            SoundManage.playEffect("szp_jjb");
            if (player) {
                let datas = this.gameDatas.playerDatas[playerId];
                if (datas.kanPai) {//如果这个用户已经看牌了,那么多发一个筹码
                    this._chipsPool.addChips(chipsNum + 1, changeNumber(chips, this.gameDatas.gameType), player.getHeadPos(), 100)
                }
                if (chipsNum < 0) {
                    chipsNum = 0
                }
                this._chipsPool.addChips(chipsNum + 1, changeNumber(chips, this.gameDatas.gameType), player.getHeadPos()
                )
            } else {
                DEBUG && egret.error(`PlayerId ${playerId} Not Exist!!!!!`);
            }
        }
        /**
         * 重新进房看到之前的筹码池里的筹码
         */
        public BackRoomChips() {
            for (let i = 0; i < this.gameDatas.roomInfo.chipsList.length; i++) {
                let chipsNum = this.gameDatas.roomInfo.createinfo.betChips.indexOf(this.gameDatas.roomInfo.chipsList[i]);
                if (chipsNum < 0) {
                    chipsNum = 0;
                }
                let chipsObj = ChipsObj.create(`zjh_chouma_${chipsNum + 1}_png`, changeNumber(this.gameDatas.roomInfo.chipsList[i], this.gameDatas.gameType));
                chipsObj.x = Utils.getNumberInNormalDistribution((Global.sWidth - chipsObj.width) / 2, 70);
                chipsObj.y = Utils.getNumberInNormalDistribution((Global.sHeight - chipsObj.height) / 2.25, 15);
                this._chipsPool.addChild(chipsObj);
            }
        }
        /**
         * 初始化一些游戏数据
         */
        public initDatas(datas: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_NN>, gameType: GAME_TYPE) {
            egret.log("initDatas:", datas);
            let gameDatas = this.gameDatas = new GameDatas();
            gameDatas.gameType = datas.createinfo.gameId === GAME_ID.GOLD_ZJH ? GAME_TYPE.COIN : GAME_TYPE.CARD;
            // gameDatas.gameType = gameType;
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

        /**
         * 是否显示准备
         */
        public isShowReadyMenu(visible: boolean) {
            // egret.log("11111");
            if (this.gameDatas.gameType === GAME_TYPE.CARD) {
                if (visible) {
                    this._btnReady.visible = true;
                } else {
                    this._btnReady.visible = false;
                }
                this.btnChangeDesk.includeInLayout = false;
                this.btnChangeDesk.visible = false;
            } else {
                egret.log("visible" + visible);
                if (visible) {
                    this._btnReady.visible = this.btnChangeDesk.visible = true;
                } else {
                    this._btnReady.visible = this.btnChangeDesk.visible = false;
                }

            }
        }
        protected initUI() {
            super.initUI();
            let self = this;
            let eg = egret;
            self.players = [];
            self._btnBar.visible = false;
            for (let i = 0; i < self.gameDatas.roomInfo.createinfo.roomSize; ++i) {
                let player: Player = self["_player" + i];
                self.players[i] = player;
                player.disBox = self["_disBox" + i];
                player.pos = i;
                player.addEventListener(eg.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
                player.visible = !i;
                player.disBox.init();
                if (this.gameDatas.gameType === GAME_TYPE.COIN) {
                    player.setChipIcon("iconCoin_png");
                    this.uiLayer.gameCntLab.text = "游戏底分：" + this.gameDatas.roomInfo.createinfo.difen;
                    this.uiLayer._rechargeBtn.visible = true;
                    this.uiLayer._chatBtn.bottom = 90;
                }
            }

            self.players[0].disBox.setCardPaddingX(130)
            egret.log("initUI!!!!!");
            self._btnBar.btnBi.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBi, self);
            self._btnBar.btnQi.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onQi, self);
            self._btnBar.btnKan.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onKan, self);
            // self._btnBar.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onJia, self);
            self._btnBar.btnGen.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onGen, self);
            self._btnBar.closeBi.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCloseBi, self);
            self._btnBar.initChipsBtns(this.gameDatas.roomInfo.createinfo.betChips, this.gameDatas.gameType);
            self._btnBar.addEventListener(GameBtnBar.ADD_CHIPS, this.onJia, this);
            if (self.gameDatas.gameType === GAME_TYPE.COIN) {
                // self.showWaitGameStartTip();
            }
            this.setChipsBarAndRoundBarVisible(false);

        }
        /**
		 * 刷新加注按钮的状态
		 */
        public updateChipsGroup() {
            if (this.gameDatas.isSelfPlayingGame()) {
                this._btnBar.updateChipsGroup(this.gameDatas.curBetCnt, this.gameDatas.gameType === GAME_TYPE.COIN ? Global.playerDto.gold : 100000000);
            }
        }
        /**
		 * 取消比牌
		 */
        public onCloseBi() {
            let arrLen = this.players.length;
            let list: Player[] = [];
            for (let i = 0; i < arrLen; i++) {
                let player = this.players[i];
                let playerId = player.getPlayerId();
                if (
                    this.gameDatas.playingList[playerId] && //该玩家在玩游戏中,不是旁观
                    playerId !== this.gameDatas.myPlyerId && //不是自己
                    this.gameDatas.playerDatas[playerId] &&
                    !this.gameDatas.playerDatas[playerId].loseOrQiPai//没有弃牌或者已经比牌输了
                ) {
                    list.push(player);
                }
            }
            if (list.length > 1) {//当前可以比牌的人数大于1的时候,播放闪烁动画,让玩家选择要跟谁比牌
                list.forEach((player: Player) => {
                    egret.log("player:", player.getPlayerId());
                    player.stopBlinkCompAni();
                    this._btnBar.currentState = "normal";
                })
            }
        }
        /**
         * 比牌按钮回调
         */
        private onBi(e?: egret.TouchEvent) {
            // this.getChildAt(this.numChildren - 1).visible = 
            // this._btnBar.visible = this._btnBar.btnKan.touchEnabled = false;
            let arrLen = this.players.length;
            let list: Player[] = [];
            for (let i = 0; i < arrLen; i++) {
                let player = this.players[i];
                let playerId = player.getPlayerId();
                if (
                    this.gameDatas.playingList[playerId] && //该玩家在玩游戏中,不是旁观
                    playerId !== this.gameDatas.myPlyerId && //不是自己
                    this.gameDatas.playerDatas[playerId] &&
                    !this.gameDatas.playerDatas[playerId].loseOrQiPai//没有弃牌或者已经比牌输了
                ) {
                    list.push(player);
                }
            }
            if (list.length > 1) {//当前可以比牌的人数大于1的时候,播放闪烁动画,让玩家选择要跟谁比牌
                list.forEach((player: Player) => {
                    egret.log("player:", player.getPlayerId());
                    player.startBlinkCompAni();
                    this._btnBar.currentState = "closeBi";
                })
            } else {//如果只有1个人需要比牌的话,直接发送比牌消息
                this.msgHandler.sendBi(list[0].getPlayerId());
            }
        }
        /**
         * 弃牌按钮回调函数
         */
        private onQi(e?: egret.TouchEvent) {

            this.msgHandler.sendQiMsg();
        }
        /**
         * 看牌按钮回调
         */
        private onKan(e?: egret.TouchEvent) {
            if (this.gameDatas.gameType === GAME_TYPE.COIN) {
                if (this._player0._proBar._target.strokeColor == 0xFF0000) {
                    this.msgHandler.sendKanMsg(true);
                } else {
                    this.msgHandler.sendKanMsg(false);
                }
            } else {
                this.msgHandler.sendKanMsg(false);
            }

        }
        /**
         * 加注
         */
        private onJia(e?: egret.TouchEvent) {

            this.msgHandler.sendBetMsg(e.data);

        }
        /**
         * 跟注按钮回调
         */
        private onGen(e?: egret.TouchEvent) {

            this.msgHandler.sendBetMsg(this.gameDatas.curBetCnt);
        }
        /**
         * 是否自动跟注
         */
        public async isAutoBet() {

            //延迟一段时间再判断需不需要自动跟牌,防止所有人都点自动跟牌之后,一瞬间牌局就因为自动跟牌太快而结束了
            await this.wait(800);
            if (this._btnBar.tBtnGen.selected && this.gameDatas.curActionId === this.gameDatas.myPlyerId) {
                this.msgHandler.sendBetMsg(this.gameDatas.curBetCnt);
            }
        }
        /**
         * 更新按钮栏各个按钮的状态
         */
        public updateBtnBar() {
            console.log("gengxin");
            if (this.gameDatas.gameStatus > GAME_STAGE.PRE_START && this.gameDatas.isSelfPlayingGame()) {
                let selfPlayerData = <model.ZJH_PLAYER_INFO>this.gameDatas.getSelfPlayerDatas();
                this._btnBar.visible = true;
                this._btnBar.currentState = "normal";
                if (selfPlayerData.loseOrQiPai) {//如果已经弃牌的话,所有的按钮都变灰
                    this._btnBar.btnQi.enabled =
                        this._btnBar.btnBi.enabled =
                        this._btnBar.btnKan.enabled =
                        this._btnBar.btnGen.enabled =
                        this._btnBar.btnJia.enabled =
                        this._btnBar.tBtnGen.enabled = false;
                } else {
                    //如果已经输了的话,弃牌按钮变为不可操作
                    this._btnBar.btnQi.enabled = !selfPlayerData.loseOrQiPai;
                    this._btnBar.btnKan.enabled = !selfPlayerData.kanPai;
                    this._btnBar.tBtnGen.enabled = true;
                    if (this.gameDatas.isSelfId(this.gameDatas.curActionId)) {
                        this._btnBar.btnBi.enabled = this.gameDatas.roundCnt >= 3;
                        this._btnBar.btnJia.enabled = this.gameDatas.curBetCnt !== this.gameDatas.roomInfo.createinfo.betChips[this.gameDatas.roomInfo.createinfo.betChips.length - 1];

                        if (selfPlayerData.chips < this.gameDatas.curBetCnt && this.gameDatas.gameType == GAME_TYPE.COIN) {
                            console.log("不够钱啊");
                            this._btnBar.btnBi.enabled =
                                this._btnBar.btnKan.enabled =
                                this._btnBar.btnGen.enabled =
                                this._btnBar.btnJia.enabled =
                                this._btnBar.tBtnGen.enabled =
                                false;
                        }
                        else {
                            this._btnBar.btnGen.enabled = true;
                            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.betChips.length; i++) {
                                if (selfPlayerData.chips < this.gameDatas.roomInfo.createinfo.betChips[i]) {
                                    for (var j = i; j < this.gameDatas.roomInfo.createinfo.betChips.length; j++) {
                                        this._btnBar.chipsBtnList[j].enabled = false;
                                    }
                                }
                            }
                        }
                    } else {
                        this._btnBar.setBtnJiaGroupVisible(false);
                        this._btnBar.btnBi.enabled =
                            this._btnBar.btnGen.enabled =
                            this._btnBar.btnJia.enabled = false;
                    }

                }
            } else {
                this._btnBar.visible = false;
            }
        }
        /**
         * 重置游戏的一些UI,跟数据
         */
        public reset() {
            console.log("reset了啊");
            for (var i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; i++) {
                var player = this.players[i];
                player.reset()
            }
            this._chipsPool.reset();
            // this._allChipsBar.visible = true;
            // this._roundTipBar.visible = true;
        }
        public setChipsBarAndRoundBarVisible(value: boolean) {
            this._roundTipBar.visible = this._allChipsBar.visible = value;
        }
        /**
         * 更新当前下注额跟当前轮数的ui
         */
        public updateRoundBetInof() {
            this._betRoundLab.text = GameLangs.zjhRoundAndBetStr.format(this.gameDatas.curBetCnt, this.gameDatas.roundCnt, this.gameDatas.maxRoundCnt);
        }
        /**
         * 更新当前总下注额UI
         */
        public updateSumChipsUI() {
            this._allChipsBar.setBetChips(this.gameDatas.sumChips);
        }
        /**
         * 将某个玩家的状态设置为输
         */
        public setPlayerLose(playerId: number) {
            let player: Player = this.getPlayerById(playerId);
            if (player) {
                player.setAction(PlayerActionMask.LOSE);
                player.disBox.setCardsGray();
            } else {
                DEBUG && egret.error(`PlayerId ${playerId} Not Exist!!!!`);
            }
        }
        /**
         * 判断两个人是否比过牌
         */
        private checkIsCompCard(playerId1: number, playerId2: number, compList: number[][]) {
            let arrLen = compList.length;
            for (let i = 0; i < arrLen; i++) {
                if ((compList[i][0] === playerId1 && compList[i][1] === playerId2) || (compList[i][1] === playerId1 && compList[i][0] === playerId2)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 游戏结束
         */
        public async gameOver(datas: model.ZJHGameOverInfo) {
            var self = this;
            self.msgHandler.stopHandleMsg();
            self.setChipsBarAndRoundBarVisible(false);
            this.gameDatas.curActionId = null;
            this.gameDatas.resetPlayerDatas();
            this.updateRoundBetInof();
            //关闭玩家计时条
            this.setAllPlayerStatu(PLAYER_UI_STATU.IDLE);

            //游戏结束的时候,还存在的人则都默认是游戏中的
            // for (let key in this.gameDatas.playerDatas) {
            //     this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
            // }
            this._btnBar.visible = false;
            let arrLen = datas.gameResultList.length;
            egret.log("arrLen" + arrLen);
            let winPlayer: Player;//最后赢钱的那个人
            for (let i = 0; i < arrLen; i++) {
                let gameResult = datas.gameResultList[i];

                let player: Player = this.getPlayerById(gameResult.playerId);
                let disBox: DiscardBox = player.disBox;
                egret.log("gameResult" + player)
                await disBox.showCardAni(
                    gameResult.cards,
                    gameResult.playerId === this.gameDatas.myPlyerId || this.checkIsCompCard(gameResult.playerId, this.gameDatas.myPlyerId, datas.biPaiList) || !this.gameDatas.isSelfPlayingGame(),
                    player.sex);//播放开牌动画
                //播放漂字动画
                player.doEndAni(gameResult.balance);
                if (gameResult.balance > 0) {
                    winPlayer = player;
                }
            }

            // await this.wait(1000);
            //将筹码移动到赢的人头像上
            if (this.gameDatas.gameType === GAME_TYPE.CARD) {
                await this.wait(2000);
            } else {
                await this.wait(400);
            }
            this._chipsPool.move(winPlayer.getHeadPos());
            this._btnBar.tBtnGen.selected = false;
            SoundManage.playEffect("szp_flywincoin");
            // //获取自己的结算信息
            egret.log("this.gameDatas.myPos" + this.gameDatas.myPos)
            if (this.gameDatas.isSelfPlayingGame()) {
                let gameResult = Utils.getItemByKey(datas.gameResultList, "playerId", this.gameDatas.myPlyerId);
                //播放游戏结束的胜利跟失败的动画
                await self.effectLayer.playAui(gameResult.balance > 0 ? "win" : "lost", self.openRoundAccountLayer, self, datas);
                SoundManage.playEffect(gameResult.balance > 0 ? "biwin" : "bilose");
            } else {
                await this.wait(1200);
                self.openRoundAccountLayer(datas);
            }
            // } else {
            //     
            //     //游戏结束的时候,还存在的人则都默认是游戏中的
            //     for (let key in this.gameDatas.playerDatas) {
            //         this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
            //     }
            // }
        }
        //打开玩家结算页面
        public async openRoundAccountLayer(datas: model.ZJHGameOverInfo) {
            if (this.gameDatas.gameType === GAME_TYPE.CARD) {
                let accLayer = new niuniu.RoundAccountLayer();
                accLayer.open();
                //设置结算数据
                accLayer.setDatas1(datas, this.gameDatas);
                accLayer.addEventListener(Layers.Event.CLOSE, () => {
                    this.msgHandler.sendReadyGame();
                    this.reset();
                    this.msgHandler.doAllowHandleMsg();
                }, this);
            } else {
                //让游戏结果显示一段时间,之后再进行其他的处理

                this.reset();
                this._btnReady.visible = this.btnChangeDesk.visible = true;
                this.msgHandler.doAllowHandleMsg();
            }
            this.gameDatas.gameStatus = GAME_STAGE.PRE_START;
        }
        /**
         * 播放开始游戏的一些动画游戏开始
         */
        public doStartGameAni() {
            this._btnBar.btnKan.touchEnabled = true;
            return this.effectLayer.playAuiAsync("start");
        }

        protected onExit() {
            super.onExit();
            //清理所有还在播放中的特效,并且回收一些对象
            this.effectLayer.clearAllAni();
            // FrameManager.getInstance().removeHandler(this.hashCode);
            for (let i = 0; i < this.gameDatas.roomInfo.createinfo.roomSize; ++i) {
                // this.players[i].clearAllAni();
                this.players[i].destroy();
            }
            ChipsObj.clearPool();
            this._pkAnuLayer.destroy();
        }
        public doBiPaiGameAni(win, playerId, otherId, callBack: Function, thisOjb: Object) {
            this._pkAnuLayer.visible = true;
            egret.log("playerId", this.gameDatas.playerDatas[playerId]);
            egret.log("otherId", this.gameDatas.playerDatas[otherId]);
            let playerdata = this.gameDatas.playerDatas[playerId];
            let Oplayerdata = this.gameDatas.playerDatas[otherId];
            egret.log("开始比牌动画！！！")
            this._pkAnuLayer.init(playerdata, Oplayerdata, callBack, thisOjb);
            egret.log("11111")
            if (win) {
                this._pkAnuLayer.curState = zjh.PKAuiStatu.LEFT_WIN;
            } else {
                this._pkAnuLayer.curState = zjh.PKAuiStatu.LEFT_LOSE;
            }
        }

        public pkAnuLayervisiblef() {
            this._pkAnuLayer.visible = false;
        }

        public pkAnuLayervisiblet() {
            this._pkAnuLayer.visible = true;
        }
        public setCards(playerId: number, cardValues?: number[]) {
            var p: Player = this.getPlayerById(playerId);
            if (p) {
                p.disBox.setCards(cardValues);
            }
        }
        // setBetChips
        public dealCardById(playerId: number, cardValues?: number[], delay: number = 0, callBack?: Function, target?: Object): void {
            var p: Player = this.getPlayerById(playerId);
            if (p) {
                p.disBox.dealCards(cardValues, delay, callBack, target);
            }
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
        /**
         * 隐藏按钮栏
         */
        public HideButs() {
            this._btnBar.visible = false;
        }
    }
}