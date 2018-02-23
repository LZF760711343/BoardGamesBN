/**
 * 斗地主游戏处理游戏协议的类
 */

namespace majiang {
    export class GameMsgHandler extends GameMsgHandlerBase {
        public gameDatas: GameDatas;
        public scene: GameScene;
        // public 
        public constructor(scene: GameScene, gameDatas: GameDatas) {
            super(scene, gameDatas);
            this._delayMsgList = this._delayMsgList.concat([
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
            this.checkProtocols();
        }

        /**
         * 发送吃牌消息
         */

        public sendChiMsg(cardValues: CARD_VALUE[]) {
            net.SendMsg.create({
                cards: cardValues
            }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_MJ_CHIPAI).send();
        }

        /**
         * 发送出牌消息
         */
        public sendChupai(cardValue: number) {
            net.SendMsg.create({
                cardValue: cardValue
            }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_MJ_CHU_PAI).send();

        }
        /**
         * 发送过的消息
         */
        public sendMjGuoMsg() {
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_MJ_GAOJI_ACTION_JUMP).send();
            this.scene.resetSelectBox();


        }
        /**
 * 发送过的消息
 */
        public sendMjHuMsg() {
            net.SendMsg.create({ playerId: this.gameDatas.myPlyerId }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_MJ_HU_PAI).send();
            this.scene.resetSelectBox();
            this.scene.removeLastPlayCard();
        }
        /**
         * 发送碰的消息
         */
        public sendMjPengMsg(cardValues: CARD_VALUE[]) {
            net.SendMsg.create({ cards: cardValues }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_MJ_PENGPAI).send();
        }
        /**
         * 发送杠的消息
         */
        public sendMjGangMsg(cardValues: CARD_VALUE[]) {
            net.SendMsg.create({ cardValue: cardValues[0] }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_MJ_GANGPAI).send();
        }
        /**
         * 发送勺的消息
         */
        public sendMjShaoMsg(cardValues: CARD_VALUE[]) {
            net.SendMsg.create({ cards: cardValues }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_MJ_SHAOPAI).send();
        }
        /**
         * 发送摊牌的消息
         */
        public sendMjTanMsg(cardValues: number[][]) {
            egret.log("cardsValueAndCount:", cardValues);
            net.SendMsg.create({ cardsValueAndCount: cardValues }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_MJ_TANPAI).send();
        }
        /**
         * 收到出牌的消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_CHU_PAI(msg: net.ReceiveMsg<{ result: number, cardValue: number, playerId: number }>) {
            this.scene.resetSortLastCard();
            this.gameDatas.lastPlayCardId = msg.datas.playerId;
            this.gameDatas.lastCardValue = msg.datas.cardValue;
            this.scene.playCard(msg.datas.playerId, msg.datas.cardValue);
            let sex = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex;
            this.scene.doChuCardsEffect(msg.datas.cardValue, sex);
        }
        /**
         * 收到吃的消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_MJ_CHIPAI(msg: net.ReceiveMsg<{ cards: CARD_VALUE[], cardValue: CARD_VALUE, playerId: number }>) {
            let deleteCards = [];
            let arrLen = msg.datas.cards.length;
            for (let i = 0; i < arrLen; i++) {
                if (msg.datas.cards[i] !== msg.datas.cardValue) {
                    deleteCards.push(msg.datas.cards[i]);
                }
            }
            this.scene.doMjchiAui(msg.datas.playerId);
            let item = MJActionItem.create();
            item.init(ACTIVE_TYPE.CHI, msg.datas.cards, msg.datas.cardValue);
            item.delCards = deleteCards;
            this.scene.addCardType(msg.datas.playerId, item);
            this.scene.removeLastPlayCard();
            this.scene.resetSelectBox();
        }
        /**
         * 收到碰牌的消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_MJ_PENGPAI(msg: net.ReceiveMsg<{ cardValue: CARD_VALUE, playerId: number }>) {
            let item = MJActionItem.create();
            item.init(ACTIVE_TYPE.PENG, [msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue], msg.datas.cardValue);
            item.delCards = [msg.datas.cardValue, msg.datas.cardValue];
            this.scene.addCardType(msg.datas.playerId, item);
            this.scene.doMjPengAui(msg.datas.playerId);
            this.scene.removeLastPlayCard();
        }
        /**
         * 收到摊牌的消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_MJ_TANPAI(msg: net.ReceiveMsg<model.mjtanInfo>) {
            this.scene.delCards(msg.datas.playerId, msg.datas.cards);
            this.scene.addTanCards(msg.datas.playerId, msg.datas.cards);
            this.scene.doMjtanAui(msg.datas.playerId, msg.datas.cards);
        }
        private on_G2C_MJ_CLEAR_GAOJI_ACTION(msg: net.ReceiveMsg<{ cardValue: CARD_VALUE, playerId: number }>) {
            this.scene.resetSelectBox();
        }
        /**
         * 将牌加入到牌桌上
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_MJ_ADD_CHUPAI(msg: net.ReceiveMsg<{ cardValue: CARD_VALUE, playerId: number }>) {
            this.gameDatas.lastCardValue = null;
            this.scene.addDisCard(msg.datas.playerId, msg.datas.cardValue);
        }
        /**
         * 收到勺牌的消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_MJ_SHAOPAI(msg: net.ReceiveMsg<{ cards: CARD_VALUE[], playerId: number }>) {
            //  let sex = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex;
            let item = MJActionItem.create();
            item.init(ACTIVE_TYPE.SHAO, [CARD_VALUE.NONE, msg.datas.cards[0], CARD_VALUE.NONE], msg.datas.cards[0]);
            // msg.datas.cards.splice(1);
            item.delCards = msg.datas.cards;
            this.scene.doMjshaoAui(msg.datas.playerId);
            this.scene.addCardType(msg.datas.playerId, item);
            this.scene.removeLastPlayCard();
        }
        /**
         * 收到杠牌的消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_MJ_GANGPAI(msg: net.ReceiveMsg<{ cards: CARD_VALUE[], cardValue: CARD_VALUE, playerId: number, isAnGang: number }>) {
            let sex = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex;
            let item = MJActionItem.create();
            if (msg.datas.isAnGang == 1) {
                item.init(ACTIVE_TYPE.AN_GANG, [CARD_VALUE.NONE, CARD_VALUE.NONE, CARD_VALUE.NONE, msg.datas.cardValue], msg.datas.cardValue);
                item.delCards = [msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue];
                SoundManage.playEffectBySexByType("angang", sex, LocalDatas.sDatas.datas.SoundType);
                this.scene.addCardType(msg.datas.playerId, item);

            } else if (msg.datas.isAnGang == 0) {
                item.init(ACTIVE_TYPE.GANG, [msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue], msg.datas.cardValue);
                item.delCards = [msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue];
                SoundManage.playEffectBySexByType("gang", sex, LocalDatas.sDatas.datas.SoundType);
                this.scene.addCardType(msg.datas.playerId, item);
            } else {
                item.init(ACTIVE_TYPE.GANG, [msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue, msg.datas.cardValue], msg.datas.cardValue);
                item.delCards = [msg.datas.cardValue];
                SoundManage.playEffectBySexByType("gang", sex, LocalDatas.sDatas.datas.SoundType);
                this.scene.updateCardType(msg.datas.playerId, item);
            }

            this.scene.doMjgangAui(msg.datas.playerId);
            this.scene.removeLastPlayCard();
        }

        /**
        * 更新筹码
        */
        public on_G2C_CHIPS_UPDATE(msg: net.ReceiveMsg<model.ChipsUpdateInfo>) {
            super.on_G2C_CHIPS_UPDATE(msg);

            this.scene.updatePlayerChips(msg.datas.playerId, msg.datas.updateChips);
        }

        @Decorators.printDatas(DEBUG)
        private on_G2C_NN_GAMEOVER(msg: net.ReceiveMsg<model.MJGameOverInfo>): void {
            // let arrLen = msg.datas.gameResultList.length;
            // for (let i = 0; i < arrLen; i++) {
            //     msg.datas.gameResultList[i].nickName =  StringUtil.decodeBase64(msg.datas.gameResultList[i].nickName);
            // }
            this.gameDatas.resetPlayerDatas();
            this.scene.gameOver(msg.datas);
            this.gameDatas.isDoAction = false;
        }
        /**摇骰子 */
        public on_G2C_YAO_SEZI(msg: net.ReceiveMsg<{ shaiziDianshuList: number[], weizhi: number }>) {
            this.gameDatas.seziList = msg.datas.shaiziDianshuList;
            // this.scene.btn_sezi.visible = false;
            this.gameDatas.hasReceiveSeZi = true;
            // this.scene.ShowSeZiCount();
            this.scene.PlayYaoSeZi();
        }
        private async on_G2C_MJ_MAPAI(msg: net.ReceiveMsg<{ maCards: number[], zhongmaCards: number[] }>) {
            if (msg.datas.maCards) {
                this.gameDatas.maCards = msg.datas.maCards;
                this.gameDatas.zhongmaCards = msg.datas.zhongmaCards;
                // this.delayHandleMsg(20000);
                // await this.scene.doZhongMaAui(msg.datas.maCards, msg.datas.zhongmaCards);
                // this.scene.initLaziCard1(msg.datas.gostCards);
                // this.doAllowHandleMsg();
            }
        }


        private async on_G2C_MJ_LAIZI(msg: net.ReceiveMsg<{ gostCards: number }>) {
            if (msg.datas.gostCards) {
                this.gameDatas.laziCard = msg.datas.gostCards;
                this.delayHandleMsg(10000);
                await this.scene.initLaziCard(this.gameDatas.laziCard);
                this.scene.initLaziCard1(this.gameDatas.laziCard);
                this.doAllowHandleMsg();
            }
        }

        @Decorators.printDatas(DEBUG)
        private async on_G2C_SEND_CARDS(msg: net.ReceiveMsg<model.MJSendCards>) {
            let datas = msg.datas;
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
                // let destList: MJActionItem[] = [];
                let destList: MJActionItem[] = Majiang.getDestList(datas);

                this.scene.dealCard(datas.playerId, datas.Cards, destList);
                this.scene.iniDisCards(datas.playerId, datas.chuCards);

            } else {
                if (datas.Cards.length > 1) {
                    this.scene.addCards(datas.playerId, datas.Cards);
                } else {
                    this.scene.addCard(datas.playerId, datas.Cards[0]);
                    this.scene.addCardSound(datas.Cards[0]);
                    if (this.gameDatas.lastCardValue) {
                        this.scene.addDisCard(this.gameDatas.lastPlayCardId, this.gameDatas.lastCardValue);
                    }
                }
            }
        }

        protected on_G2C_PLAYER_INFO(msg: net.ReceiveMsg<model.PLAYER_INFO>) {
            super.on_G2C_PLAYER_INFO(msg);
        }
        /**
         * 切换到下个人操作
         */
        @Decorators.printDatas(DEBUG)
        protected on_G2C_NOW_ACTION_ID(msg: net.ReceiveMsg<model.MjNoWActionIdInfo>) {
            this.gameDatas.curActionId = msg.datas.actionPlayerId;
            // this.gameDatas.lastPlayCardId = msg.datas.preChuPaiPlayerId;
            this.turnAction(msg.datas.actionPlayerId);
        }
        /**
         * 
         */
        @Decorators.printDatas(DEBUG)
        public on_G2C_MJ_GAOJI_ACTION(msg: net.ReceiveMsg<model.MjGaojiActionIdInfo>) {
            Majiang.changeCardsByType(msg.datas.cardsValueAndCount, msg.datas.activeType, msg.datas.cardValue, this.gameDatas._actionItems);
            this.scene.addSelectItems();
            // this.gameDatas._actionItems.push(msg.datas);
        }
        private turnAction(playerId: number, isReconnect: boolean = false) {
            let info = this.gameDatas.playerDatas[playerId];
            let isSelf = playerId == this.gameDatas.myPlyerId;
            egret.log("this.gameDatas.gameStatus", this.gameDatas.gameStatus);
            switch (this.gameDatas.gameStatus) {
                case GAME_STAGE.PRE_START:
                    break;
                default:
                    if (this.gameDatas.curActionId == 0) {
                        this.gameDatas.curActionId = this.gameDatas.dealerId;
                    }
                    if (this.gameDatas.curActionId === playerId) {//轮到这个玩家操作
                        this.scene.updateTimeBoxUI();
                        this.scene.startTimeBoxTimer();

                    }
                    break;
            }
        }

        //收到游戏开始信息
        @Decorators.printDatas(DEBUG)
        private async on_G2C_STARTGAME(msg: net.ReceiveMsg<model.MjStartGameInfo>) {
            /**
             * 由于异步的await在非es7的实现方式为将当前函数拆分为多个部分,
             * 通过switch多次调用当前函数(具体可以去看编译后的js文件),而msg对象会在函数第一次调用后就执行destroy函数回收对象
             * 从而导致在await后面拿不到data数据,所有现在先把datas数据保持在一个datas的本地变量里面
             * 防止msg回收后拿不到数据
             */
            let datas = msg.datas;
            this.gameDatas.isReconnect = false;
            //游戏一旦开始了,当前所有的人都在参与游戏列表里面
            for (let key in this.gameDatas.playerDatas) {
                this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
            }
            SoundManage.playEffect("nnStartGame");
            this.gameDatas.gameStatus = 2;
            this.scene.reset();
            this.gameDatas.init();
            //播放动画期间,停止处理消息
            this.delayHandleMsg(10000);
            await this.scene.doStartGameAni();
            this.updateGameProcess(datas, false, false);
            //播放完动画,开始处理消息
            this.doAllowHandleMsg();
        }
        @Decorators.printDatas(DEBUG)
        private on_G2C_GAMEPROCESS(msg: net.ReceiveMsg<model.MjStartGameInfo>) {
            this.updateGameProcess(msg.datas, true);
        }
        public updateGameProcess(datas: model.MjStartGameInfo, isReconnect: boolean = false, bAnimation?: boolean) {
            this.gameDatas.isReconnect = isReconnect;
            this.gameDatas.roomInfo.done_game_cnt = datas.game_cnt;
            this.gameDatas.gameStatus = datas.stage;
            this.scene.updateRoomInfoUI();
            this.scene.updateDifenLable();
            this.gameDatas.curActionId = datas.actionPlayerId;
            this.gameDatas.dealerId = datas.dealer;
            this.gameDatas.lastPlayCardId = datas.prePlayerId;
            this.scene.uiLayer.updateDissolveBtn();
            if (this.gameDatas.gameStatus !== GAME_STAGE.PRE_START) {
                if (this.gameDatas.isSelfPlayingGame()) {
                    // if()
                    if (datas.prePlayerId) {
                        this.scene.initLastPlayCard(datas.prePlayerId, datas.preCardValue);
                    }
                    this.scene.setAllPlayerStatu(PLAYER_UI_STATU.IDLE);
                    let playerList = this.gameDatas.getPlayingList();
                    let arrLen = playerList.length;
                    for (let i = 0; i < arrLen; i++) {
                        let info = playerList[i];
                        let is_self = info.playerId == this.gameDatas.myPlyerId;
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
                        // }
                        //             if (info.qiangZhuang > 0) {
                        //                 this.scene.doBaoPaiAui(datas.dealer_scpre);
                        //             }

                        //         }

                        //         if (datas.cards && datas.cards.length && datas.playerId != datas.actionPlayerId) {
                        //             this.gameDatas.lastPlayCardId = datas.preChuPaiPlayerId;

                        //             this.gameDatas.poker.lastHandType = datas.handType;
                        //             this.gameDatas.poker.lastHandValue = datas.handValue;
                        //             this.gameDatas.poker.lastSubHandType = datas.handSubType;
                        //             Poker.createPokerCards(datas.cards, this.gameDatas.lastPlayCards);
                        //             this.scene.doPlayerMethod(datas.playerId, Player.prototype.showPlayCards, this.gameDatas.lastPlayCards);
                    }
                }
            }
        }

    }
}
