/**
 * 斗地主游戏处理游戏协议的类
 */

namespace DDZ {
    export class GameMsgHandler extends GameMsgHandlerBase {
        public gameDatas: GameDatas;
        public scene: GameScene;
        // public 
        public constructor(scene: GameScene, gameDatas: GameDatas) {
            super(scene, gameDatas);
            this._delayMsgList = this._delayMsgList.concat([
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
            ])
        }
        /**
         * 发送抢庄消息
         */
        public sendCallMsg(flag: number) {
            if (typeof flag == "string") {
                flag = parseInt(flag);
            }
            let msg = net.SendMsg.create({
                flag: flag
            }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_NN_CALL);
            msg.send();
        }
        /**
         * 发送出牌消息
         */
        public sendChupai(cards: number[]) {
            net.SendMsg.create({
                cards: cards
            }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_CHU_PAI).send();
        }
        /**
         * 发送不出牌消息
         */
        public sendBuchupai() {
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_BUCHU_PAI).send();

        }
        /**
         * 收到不出牌的消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_BUCHU_PAI(msg: net.ReceiveMsg<model.NN_CALL>) {
            if (msg.datas.playerId === this.gameDatas.myPlyerId) {
                this.scene.hideBtnBar();//如果是自己,隐藏按钮栏
            } else {
                this.scene.setPlayerStatu(msg.datas.playerId, PLAYER_UI_STATU.IDLE);
            }

            this.scene.showPlayerTip(msg.datas.playerId, null, 2);
        }
        /**
         * 收到出牌的消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_CHU_PAI(msg: net.ReceiveMsg<{ cards: number[], playerId: number, handType: HAND_TYPE, handValue: number, handSubType: number }>) {
            if (msg.datas.handType === HAND_TYPE.BOMB || msg.datas.handType === HAND_TYPE.HUOJIAN) {
                this.gameDatas.currentBeilv = this.gameDatas.currentBeilv * 2;
                this.scene.RefreshBeiLv(this.gameDatas.myPlyerId == this.gameDatas.landlordId);
            }
            if (msg.datas.playerId === this.gameDatas.myPlyerId) {
                this.scene.hideBtnBar();//如果是自己,隐藏按钮栏
                this.gameDatas.poker.deleteCards(msg.datas.cards, this.gameDatas.lastPlayCards);
                this.scene.delCards(this.gameDatas.lastPlayCards);
            } else {
                this.scene.setPlayerStatu(msg.datas.playerId, PLAYER_UI_STATU.IDLE);
                Poker.createPokerCards(msg.datas.cards, this.gameDatas.lastPlayCards);
            }
            this.gameDatas.lastPlayCardId = msg.datas.playerId;
            this.gameDatas.poker.lastHandValue = msg.datas.handValue;
            this.gameDatas.poker.lastSubHandType = msg.datas.handSubType;
            this.gameDatas.poker.lastHandType = msg.datas.handType;
 

            let sex = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex;
            // let sex = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo
            this.scene.doChuCardsEffect(msg.datas.handType, msg.datas.handValue, sex, msg.datas.handSubType);
            this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.showPlayCards, this.gameDatas.lastPlayCards);
            this.gameDatas.cardRest[msg.datas.playerId] -= msg.datas.cards.length;
            this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.setLeftCardCnt, this.gameDatas.cardRest[msg.datas.playerId]);

        }
        /**
         * 收到抢地主的消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_NN_CALL(msg: net.ReceiveMsg<model.DDZCallInfo>): void {
            if (!this.gameDatas.isDoAction) {//如果客户端还没有做操作,说明是服务器超时进行自动回调
                //     this.scene.hideCalMenu();
            }
            if (msg.datas.playerId === this.gameDatas.myPlyerId) {
                this.scene.hideBtnBar();//如果是自己,隐藏按钮栏

            } else {
                this.scene.setPlayerStatu(msg.datas.playerId, PLAYER_UI_STATU.IDLE);


            }

            this.gameDatas.fristQiangId = msg.datas.fristQiang;
            this.gameDatas.playerDatas[msg.datas.playerId].qiangZhuang = msg.datas.flag;
            this.scene._btnBar.setCallBtnEnablByScore(msg.datas.flag);
            //显示叫/抢地主
            if (this.gameDatas.fristQiangId === msg.datas.playerId && msg.datas.nowDzRate === 15) {
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.flag, 1);
            } else {
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.flag, msg.datas.fristQiang ? 0 : 1);
            }
            if (msg.datas.flag != 0) {
                if (this.gameDatas.gameType == GAME_TYPE.COIN)
                    this.gameDatas.currentBeilv = msg.datas.nowDzRate;
                else
                    this.gameDatas.currentBeilv = msg.datas.flag;
                this.scene.RefreshBeiLv(this.gameDatas.myPlyerId == this.gameDatas.landlordId);
            }
            // 
            this.gameDatas.isDoAction = false;
        }
        /**
         * 收到确定地主消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_NN_DEALER(msg: net.ReceiveMsg<model.NN_DEALER>): void {
            this.gameDatas.gameStatus = GAME_STAGE.TOU_ZHU;//将游戏状态更改为游戏开始
            this.gameDatas.landlordId = msg.datas.playerIds[0];
            if (!this.gameDatas.isDoAction) {//如果客户端还没有做操作,说明是服务器超时进行自动回调
                //     this.scene.hideCalMenu();
            }
            this.scene.RefreshBeiLv(this.gameDatas.myPlyerId == this.gameDatas.landlordId);
            this.scene.hideBtnBar();
            // this.gameDatas.resetPlayerDatas();
            this.scene.updateRoleInfo(true);
            // this.scene.gameOver(msg.datas);
            this.gameDatas.isDoAction = false;
        }
        @Decorators.printDatas(DEBUG)
        private on_G2C_GAMEOVER(msg: net.ReceiveMsg<model.DDZGameOverInfo>): void {
            if (!this.gameDatas.isDoAction) {//如果客户端还没有做操作,说明是服务器超时进行自动回调
                //     this.scene.hideCalMenu();
            }
            let arrLen = msg.datas.gameResultList.length;
            for (let i = 0; i < arrLen; i++) {
                msg.datas.gameResultList[i].nickName = StringUtil.decodeBase64(msg.datas.gameResultList[i].nickName);
            }
            if (msg.datas.gameResultList[0].chunTianMode != 0) {
                this.gameDatas.currentBeilv = this.gameDatas.currentBeilv * 2;
                this.scene.RefreshBeiLv(this.gameDatas.myPlyerId == this.gameDatas.landlordId);
            }

            this.gameDatas.resetPlayerDatas();
            this.scene.gameOver(msg.datas);
            this.gameDatas.isDoAction = false;
        }

        @Decorators.printDatas(DEBUG)
        private on_G2C_SEND_CARDS(msg: net.ReceiveMsg<model.G2C_SEND_CARDS>) {
            if (!this.gameDatas.cardRest[msg.datas.playerId])
                this.gameDatas.cardRest[msg.datas.playerId] = 0;
            this.gameDatas.cardRest[msg.datas.playerId] += msg.datas.Cards.length;
            console.log("rest:", this.gameDatas.cardRest[msg.datas.playerId], "id", msg.datas.playerId);
            if (msg.datas.playerId === Global.playerDto.id) {
                if (!this.gameDatas.poker.isinit) {
                    this.gameDatas.poker.init(msg.datas.Cards);
                    this.scene.dealCard(msg.datas.playerId, 0, this.gameDatas.poker.pokerCards, null);
                }
            } else {
                this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.setLeftCardCnt, this.gameDatas.cardRest[msg.datas.playerId]);
            }
            //  //播放动画
            // if (this.gameDatas.cardRest[msg.datas.playerId] == 2) {
            //      this.scene.doRedLightAui();
            // }

            //播放动画
            // if (this.gameDatas.cardRest[msg.datas.playerId] == 1) {
            //      this.scene.doRedLightAui();
            // }
        }

        protected on_G2C_PLAYER_INFO(msg: net.ReceiveMsg<model.PLAYER_INFO>) {
            super.on_G2C_PLAYER_INFO(msg);
        }
        /**
         * 切换到下个人操作
         */
        @Decorators.printDatas(DEBUG)
        protected on_G2C_NOW_ACTION_ID(msg: net.ReceiveMsg<model.NoWActionIdInfo>) {
            this.gameDatas.curActionId = msg.datas.actionPlayerId;
            this.turnAction(msg.datas.actionPlayerId);
        }
        /**
         * 收到底牌
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_DIPAI_CARDS(msg: net.ReceiveMsg<model.DipaiCardsInfo>) {
            // Poker.createPokerCards(msg.datas.Cards, this.gameDatas.publicCards);
            if (this.gameDatas.landlordId === this.gameDatas.myPlyerId) {//如果自己是地主
                this.gameDatas.poker.addCards(msg.datas.Cards, this.gameDatas.publicCards);
                this.scene.insertAndSelectCards();
            } else {
                Poker.createPokerCards(msg.datas.Cards, this.gameDatas.publicCards);
            }
            this.scene.updatePublicCards();
        }
        private turnAction(playerId: number, isReconnect: boolean = false) {
            let info = this.gameDatas.playerDatas[playerId];
            let isSelf = playerId == this.gameDatas.myPlyerId;
            switch (this.gameDatas.gameStatus) {
                case GAME_STAGE.START:
                case GAME_STAGE.QIANG_ZHUANG://抢地主
                    if (this.gameDatas.curActionId === playerId) {//轮到这个玩家操作
                        if (isSelf) {
                            this.scene.showRobMenu();
                        } else {
                            this.scene.setPlayerStatu(playerId, PLAYER_UI_STATU.WAIT)
                        }
                    }
                    if (isReconnect) {
                        if (info.qiangZhuang !== -1) {//已经抢/叫地主

                            if (info.qiangZhuang === 0) {

                                let firstinfo = this.gameDatas.playerDatas[this.gameDatas.fristQiangId];
                                if (firstinfo) {
                                    this.scene.showPlayerTip(playerId, info.qiangZhuang,
                                        ((3 + info.zuoweiIndex - firstinfo.zuoweiIndex) % 3) === 1 ? 1 : 0);
                                } else {
                                    this.scene.showPlayerTip(playerId, info.qiangZhuang, 1);
                                }

                            } else {
                                if (this.gameDatas.fristQiangId) {
                                    if (this.gameDatas.fristQiangId === playerId) {//如果自己是第一个抢地主的,那么显示叫地主
                                        this.scene.showPlayerTip(playerId, info.qiangZhuang, 1);
                                    } else {//要不然就是抢地主
                                        this.scene.showPlayerTip(playerId, info.qiangZhuang, 0);
                                    }
                                }
                            }
                        }
                    }

                    break;
                case GAME_STAGE.TOU_ZHU://打牌阶段
                    if (this.gameDatas.lastPlayCardId === this.gameDatas.curActionId) {//如果最后出牌的id跟当前操作的人的id一样的话,说明打完一轮了
                        this.scene.setAllPlayerStatu(PLAYER_UI_STATU.IDLE);
                        this.gameDatas.poker.resetLastCardsInfo();
                        this.gameDatas.lastPlayCardId = null;
                        this.scene.setBuchuBtnEnable(false);
                    } else {
                        this.scene.setBuchuBtnEnable(true);
                    }
                    if (this.gameDatas.curActionId === playerId) {//轮到这个玩家操作
                        if (isSelf) {//如果是轮到自己出牌
                            this.gameDatas.poker.findProbHandCards();
                            this.scene.setPlayerStatu(playerId, PLAYER_UI_STATU.IDLE);
                            this.scene.showPlayCardMenu();
                            this.scene.onCardSelect();
                        } else {

                        }
                        this.scene.doPlayerMethod(playerId, Player.prototype.clearDisCard);
                    }
                    break;
                case GAME_STAGE.SHOW_ME:
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
                case GAME_STAGE.SHOW_ALL:
                    break;
            }
        }

        //收到游戏开始信息
        @Decorators.printDatas(DEBUG)
        private async on_G2C_STARTGAME(msg: net.ReceiveMsg<model.DDZStartGameInfo>) {
            /**
             * 由于异步的await在非es7的实现方式为将当前函数拆分为多个部分,
             * 通过switch多次调用当前函数(具体可以去看编译后的js文件),而msg对象会在函数第一次调用后就执行destroy函数回收对象
             * 从而导致在await后面拿不到data数据,所有现在先把datas数据保持在一个datas的本地变量里面
             * 防止msg回收后拿不到数据
             */
            let datas = msg.datas;
            this.gameDatas.isReconnect = false;
            // if (this.gameDatas.gameType === GAME_TYPE.COIN) {
            //     this.scene.hideWaitGameStartTip();
            // }
            //游戏一旦开始了,当前所有的人都在参与游戏列表里面
            for (let key in this.gameDatas.playerDatas) {
                this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
            }
            SoundManage.playEffect("nnStartGame");
            this.scene.reset();
            this.gameDatas.init();
            // this.scene.beilv = 15;
            if (this.gameDatas.gameType == GAME_TYPE.COIN)
                this.scene.text_beilv.text = "倍数:" + datas.baseRate + "";
            else
                this.scene.text_beilv.text = "倍数:" + 1 + "";
            this.scene.uiLayer._inviteBtn.visible = false;
            //播放动画期间,停止处理消息
            this.stopHandleMsg();
            await this.scene.doStartGameAni();
            this.updateGameProcess(datas, false, false);
            this.scene._pubCardsBox.visible = true;
            //播放完动画,开始处理消息
            this.doAllowHandleMsg();
        }
        @Decorators.printDatas(DEBUG)
        private on_G2C_GAMEPROCESS(msg: net.ReceiveMsg<model.DDZStartGameInfo>) {
            this.updateGameProcess(msg.datas, true);
        }
        public updateGameProcess(datas: model.DDZStartGameInfo, isReconnect: boolean = false, bAnimation?: boolean) {
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
            if (this.gameDatas.gameStatus !== GAME_STAGE.PRE_START) {
                if (this.gameDatas.isSelfPlayingGame()) {
                    let playerList = this.gameDatas.getPlayingList();
                    let arrLen = playerList.length;
                    for (let i = 0; i < arrLen; i++) {
                        let info = playerList[i];
                        let is_self = info.playerId == this.gameDatas.myPlyerId;
                        if (isReconnect) {
                            this.scene.setPlayerStatu(info.playerId, PLAYER_UI_STATU.IDLE);
                            this.scene._btnBar.setCallBtnEnablByScore(info.qiangZhuang);
                        }
                        if (info.qiangZhuang > 0 && this.gameDatas.gameStatus === GAME_STAGE.TOU_ZHU) {
                            this.gameDatas.landlordId = info.playerId;
                            this.scene.updateRoleInfo(false);
                        }



                        this.turnAction(info.playerId, isReconnect);

                        //             let isDealer = (this.gameDatas.gameStatus !== GAME_STAGE.START && this.gameDatas.gameStatus !== GAME_STAGE.QIANG_ZHUANG) && info.qiangZhuang === 1;
                        //             //如果玩家是庄家
                        //             if (isDealer) {
                        //                 this.gameDatas.dealerId = info.playerId;
                        //                 this.scene.setPlayerDealerIcon(info.playerId, true);
                        //             }

                    }

                    if (datas.diPaiCards && datas.diPaiCards.length) {
                        let pokerCards = Poker.createPokerCards(datas.diPaiCards, this.gameDatas.publicCards);
                        this.scene.updatePublicCards();
                    }

                    if (datas.cards && datas.cards.length && datas.playerId != datas.actionPlayerId) {
                        this.gameDatas.lastPlayCardId = datas.playerId;
                        this.gameDatas.poker.lastHandType = datas.handType;
                        this.gameDatas.poker.lastHandValue = datas.handValue;
                        this.gameDatas.poker.lastSubHandType = datas.handSubType;
                        Poker.createPokerCards(datas.cards, this.gameDatas.lastPlayCards);
                        this.scene.doPlayerMethod(datas.playerId, Player.prototype.showPlayCards, this.gameDatas.lastPlayCards);
                    }
                    if (isReconnect)
                        this.scene.RefreshBeiLv(this.gameDatas.myPlyerId == this.gameDatas.landlordId);
                } else {
                    // this.scene.showWaitTip();
                }
            } else {

            }
            // this.scene.uiLayer.updateDissolveBtn();
        }
        /**
     * 刷新钻石
     */
        private on_G2C_UPDATE_PLAYER_DIAMOND(msg: net.ReceiveMsg<model.PlayerDto>) {
            // egret.log("刷新niuniu", msg.datas.diamond);
            Global.playerDto.diamond = msg.datas.diamond;
            let layers: Layers.RechargeLayer = Layers.getLayer(Layers.RechargeLayer);

            if (layers) {
                layers.updateLabel();
            }

        }
        /**
         * 钻石兑换房卡成功返回
         */
        protected on_G2C_UPDATE_PLAYER_FANGKA(msg: net.ReceiveMsg<{ fangkaCount: number, result: number }>) {
            let layers: Layers.RechargeLayer = Layers.getLayer(Layers.RechargeLayer);
            // egret.log("on_G2C_UPDATE_PLAYER_FANGKA")
            if (layers) {
                layers.updateLabel();
            }

        }
        protected on_G2C_UPDATE_PLAYER_GOLD(msg: net.ReceiveMsg<{ result: number, gold: number }>) {
            // egret.log("刷新金币on_G2C_UPDATE_PLAYER_GOLD");
            let layers: Layers.RechargeLayer = Layers.getLayer(Layers.RechargeLayer);

            if (layers) {
                layers.updateLabel();
            }
            this.scene.updataPlayMechip(Global.playerDto.gold);
        }
        /*
        * 更新筹码
        */
        protected async on_G2C_CHIPS_UPDATE(msg: net.ReceiveMsg<model.ChipsUpdateInfo>) {
            super.on_G2C_CHIPS_UPDATE(msg);
            this.scene.updatePlayerChips(msg.datas.playerId, msg.datas.updateChips);
        }

    }
}
