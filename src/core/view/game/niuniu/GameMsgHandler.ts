/**
 * 牛牛游戏处理游戏协议的类
 */

namespace niuniu {
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
         * 发送下注消息
         */
        public sendBetMsg(chips: number | string) {
            if (typeof chips == "string") {
                chips = parseInt(chips);
            }
            net.SendMsg.create({
                in_chips: chips
            }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_NN_BET).send();
        }
        /**
         * 发送下注消息
         */
        public sendShowMsg(handtype: number) {
            net.SendMsg.create({
                // handtype:handtype
            }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_NN_SHOW).send();
        }
        /**
         * 发送算牛消息
         */
        public sendCalMsg(handtype: number, cards?: any[]) {

            net.SendMsg.create({
                handtype: handtype,
                cards: cards
                // handtype:handtype
            }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_NN_SHOW).send();
        }
        protected on_G2C_PLAYER_INFO(msg: net.ReceiveMsg<model.PLAYER_INFO>) {
            super.on_G2C_PLAYER_INFO(msg);
            if (this.gameDatas.roomInfo.stage > GAME_STAGE.PRE_START) {
                this.scene.setPlayerStatu(msg.datas.playerId, PLAYER_UI_STATU.NONE);
            }       
            // if (!this.gameDatas.isSelfPlayingGame() && !this.gameDatas.isSelfId(msg.datas.playerId) && this.gameDatas.roomInfo.stage > GAME_STAGE.PRE_START) {
            //     this.scene.dealCardById(msg.datas.playerId, 0, [0, 0, 0, 0], null);
            //     egret.log("G2C_PLAYER_INFO111111");
            //     this.scene.isShowReadyMenu(true);
            // }    
        }

        /**
        * 收到定庄消息
        */
        @Decorators.printDatas(DEBUG)
        private on_G2C_NN_DEALER(msg: net.ReceiveMsg<model.NN_DEALER>): void {


            // if (this.gameDatas.isSelfPlayingGame()) {
            if (!this.gameDatas.isDoAction) {//如果客户端还没有做操作,说明是服务器超时进行自动回调
                this.scene.hideBtnBar();
                this.scene.showPlayerTip(this.gameDatas.myPlyerId, 0, 0);
            }
            this.gameDatas.gameStatus = GAME_STAGE.TOU_ZHU;
            this.gameDatas.dealerId = msg.datas.dealer;
            // egret.log("msg.datas.dealer_scpre"+msg.datas.dealer_scpre)
            this.gameDatas.zhuangBeilv = msg.datas.dealer_scpre;
            this.scene.doRobAni(msg.datas);
            if (this.gameDatas.isSelfPlayingGame()) {
                this.scene._btnBar.RefreshXianBarAvail(this.gameDatas.playerDatas[this.gameDatas.dealerId].chips,
                    Global.playerDto.gold,
                    this.gameDatas.getPlayIngGameCnt(),
                    this.gameDatas.zhuangBeilv,
                    4,
                    this.gameDatas.roomInfo.createinfo.difen);
            }

            // }
            this.gameDatas.isDoAction = false;
        }
        //收到叫庄消息
        @Decorators.printDatas(DEBUG)
        private on_G2C_NN_CALL(msg: net.ReceiveMsg<model.NN_CALL>) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (msg.datas.playerId == this.gameDatas.myPlyerId) {
                this.gameDatas.isDoAction = true;
                this.scene.hideBtnBar();
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.flag, 0);
            } else {
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.flag, 0);
            }
            // }
        }
        //收到开始算牌消息
        @Decorators.printDatas(DEBUG)
        private on_G2C_NN_LOOK(msg: net.ReceiveMsg<model.NN_LOOK>): void {

            // if (!this.gameDatas.isDoAction) {//如果客户端还没有做操作,说明是服务器超时进行自动回调
            //     this.scene.showWaitBetMenu();
            //     egret.log("this.gameDatas.roomInfo.createinfo.betChips[0]:",this.gameDatas.roomInfo.createinfo.betChips[0])
            //     this.scene.showPlayerTip(this.gameDatas.myPlyerId, this.gameDatas.roomInfo.createinfo.betChips[0], 1);
            // }
            this.gameDatas.gameStatus = GAME_STAGE.SHOW_ME;
            this.gameDatas.cardType = msg.datas.handType;
            if (this.gameDatas.isSelfPlayingGame()) {
                this.scene.showCalBox();
            }
            this.gameDatas.isDoAction = false;
        }
        //收到下注消息
        @Decorators.printDatas(DEBUG)
        private on_G2C_NN_BET(msg: net.ReceiveMsg<model.NN_BET>) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (msg.datas.playerId == this.gameDatas.myPlyerId) {
                this.gameDatas.isDoAction = true;
                this.scene.showWaitBetMenu();
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.in_chips, 1);
            } else {
                this.scene.showPlayerTip(msg.datas.playerId, msg.datas.in_chips, 1);
            }
            // }
        }
        @Decorators.printDatas(DEBUG)
        private on_G2C_NN_GAMEOVER(msg: net.ReceiveMsg<model.NN_GAMEOVER>) {
            this.gameDatas.isReconnect = false;
            if (this.gameDatas.isSelfPlayingGame() && !this.gameDatas.isDoAction) {//如果客户端还没有做操作,说明是服务器超时进行自动回调
                this.scene.hideCalMenu();
            }
            this.gameDatas.resetPlayerDatas();
            this.scene.gameOver(msg.datas);
            this.gameDatas.isDoAction = false;
        }
        /**
         * 算牛结束后,收到的消息
         */
        private on_G2C_NN_SHOW_DONE(msg: net.ReceiveMsg<model.NN_SHOW_DONE>): void {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (this.gameDatas.isSelfId(msg.datas.playerId)) {
                this.gameDatas.isDoAction = true;
                this.scene.hideCalMenu();
            } else {
                this.scene.showComeIcon(msg.datas.playerId);
            }
            // }
        }
        //收到出牌消息
        private on_G2C_NN_SHOW(msg: net.ReceiveMsg<model.NN_SHOW>) {
            SoundManage.playEffect("complete");
            // if (this.gameDatas.isSelfId(msg.datas.playerId)) {
            //     // if (this.roomCfg.gameID == GAME_TYPE.NIUNIU) {
            //     //     if (!this.isDoAction) {
            //     this.scene.hideCalMenu();
            //     //     }
            //     // } else {
            //     //     this._sceneUI.showCardType(msgContent.handvalue);
            //     // }
            //     // this._sceneUI.doDelayHandleMsg(500);
            // }
        }

        @Decorators.printDatas(DEBUG)
        private on_G2C_SEND_CARDS(msg: net.ReceiveMsg<model.G2C_SEND_CARDS>) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (msg.datas.Cards.length === 1) {
                this.scene.addCard(msg.datas.playerId, msg.datas.Cards[0]);
            } else if (msg.datas.Cards.length > 1) {
                // if(this.gameDatas.isPlayngGame(msg.datas.playerId)){
                //     this.scene.dealCardById(msg.datas.playerId, 0, msg.datas.Cards, null);
                // }

                if (this.gameDatas.isReconnect) {
                    this.scene.setCards(msg.datas.playerId, msg.datas.Cards, msg.datas.Cards.length);
                } else {
                    this.scene.dealCardById(msg.datas.playerId, 0, msg.datas.Cards, null);
                }

            }
            // }
        }

        //收到游戏开始信息
        @Decorators.printDatas(DEBUG)
        private async on_G2C_NN_STARTGAME(msg: net.ReceiveMsg<model.NN_STARTGAME>) {
            /**
             * 由于异步的await在非es7的实现方式为将当前函数拆分为多个部分,
             * 通过switch多次调用当前函数(具体可以去看编译后的js文件),而msg对象会在函数第一次调用后就执行destroy函数回收对象
             * 从而导致在await后面拿不到data数据,所有现在先把datas数据保持在一个datas的本地变量里面
             * 防止msg回收后拿不到数据
             */
            let datas = msg.datas;
            this.gameDatas.isReconnect = false;
            if (this.gameDatas.gameType === GAME_TYPE.COIN) {
                this.scene.hideWaitGameStartTip();
            }
            //游戏一旦开始了,当前所有的人都在参与游戏列表里面
            for (let key in this.gameDatas.playerDatas) {
                this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
            }
            // egret.log("on_G2C_NN_STARTGAME:", this.gameDatas.isSelfPlayingGame())
            SoundManage.playEffect("nnStartGame");
            this.scene.reset();
            //播放动画期间,停止处理消息
            this.stopHandleMsg();
            await this.scene.doStartGameAni();
            this.updateGameProcess(datas, false, false);
            //播放完动画,开始处理消息
            this.doAllowHandleMsg();

        }
        @Decorators.printDatas(DEBUG)
        private on_G2C_NN_GAMEPROCESS(msg: net.ReceiveMsg<model.NN_STARTGAME>) {
            this.updateGameProcess(msg.datas, true);
        }

        public updateGameProcess(datas: model.NN_STARTGAME, isReconnect: boolean = false, bAnimation?: boolean) {
            this.gameDatas.isReconnect = isReconnect;
            this.gameDatas.roomInfo.done_game_cnt = datas.game_cnt;
            this.gameDatas.gameStatus = datas.stage;
            this.gameDatas.zhuangBeilv = datas.dealer_scpre;
            this.gameDatas.dealerId = datas.dealer;
            this.scene.updateRoomInfoUI();
            //当前状态
            this.scene.initBetBtns(this.gameDatas.roomInfo.createinfo.betChips);
            // this.scene.initBetBtns([5,10,15,20,25]);
            if (this.gameDatas.gameStatus !== GAME_STAGE.PRE_START) {
                // if (this.gameDatas.isSelfPlayingGame()) {
                this.scene.hideWaitGameStartTip();
                let playerList = this.gameDatas.getPlayingList();
                let arrLen = playerList.length;
                for (let i = 0; i < arrLen; i++) {
                    let info = playerList[i];
                    let is_self = info.playerId == this.gameDatas.myPlyerId;
                    if (isReconnect) {
                        this.scene.setPlayerStatu(info.playerId, PLAYER_UI_STATU.NONE);
                    }
                    let isDealer = (this.gameDatas.gameStatus !== GAME_STAGE.START && this.gameDatas.gameStatus !== GAME_STAGE.QIANG_ZHUANG) && info.qiangZhuang >0;
                    //如果玩家是庄家
                    // egret.log("庄家图标庄家图标=="+isDealer+ info.playerId)
                    if (isDealer) {
                        this.gameDatas.dealerId = info.playerId;
                        // egret.log("庄家图标");
                        this.scene.setPlayerDealerIcon(info.playerId, true);
                    }
                    // if(is_self){
                    //     // egret.log("updateGameProcess:", info.qiangZhuang)
                    //     Utils.printObject(info)
                    // }
                    switch (this.gameDatas.gameStatus) {
                        case GAME_STAGE.QIANG_ZHUANG://抢庄
                            if (!isReconnect || info.qiangZhuang === -1) {//还未抢庄
                                if (is_self) {
                                    this.scene.showRobMenu();
                                }
                            } else {//已经抢庄
                                this.scene.showPlayerTip(info.playerId, info.qiangZhuang, 0);
                            }
                            break;
                        case GAME_STAGE.TOU_ZHU://下注
                            if (info.touZhu === 0) {//还未下注
                                if (is_self) {
                                    this.scene.showBetMenu();
                                    if (isDealer) {
                                        this.scene.showWaitBetMenu();
                                    }
                                }
                                this.scene._btnBar.RefreshXianBarAvail(this.gameDatas.playerDatas[this.gameDatas.dealerId].chips,
                                    Global.playerDto.gold,
                                    this.gameDatas.getPlayIngGameCnt(),
                                    this.gameDatas.zhuangBeilv,
                                    4,
                                    this.gameDatas.roomInfo.createinfo.difen);
                            }

                            break;
                        case GAME_STAGE.SHOW_ME:
                            // this.gameDatas.cardType = (actionValue >> 12) & 0xf;
                            if (info.showed === 0) {//还未算牛
                                if (is_self) {
                                    this.scene.showCalBox();
                                }
                            } else {//已经算牛
                                if (is_self) {
                                    this.scene.hideCalMenu();
                                }
                                else {
                                    this.scene.showComeIcon(info.playerId);

                                }
                            }
                            if (info.touZhu != 0 && info.playerId != this.gameDatas.myPlyerId) {
                                this.scene.showPlayerTip(info.playerId, info.touZhu, 1);
                            } 
                            break;
                        case GAME_STAGE.SHOW_ALL:
                            // if (info.touZhu != 0 && info.playerId != this.gameDatas.myPlyerId) {
                            //     this.scene.showPlayerTip(info.playerId, info.touZhu, 1);
                            // } else {
                            //     this.scene.showPlayerTip(info.playerId, info.qiangZhuang, 0);
                            //     this.scene.setPlayerDealerIcon(info.playerId, true);

                            // }
                            break;
                    }

                }
                // } else {
                //     this.scene.showWaitTip();
                // }
            } else {

            }
            this.scene.uiLayer.updateDissolveBtn();
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
        /**
        * 更新筹码
        */
        protected async on_G2C_CHIPS_UPDATE(msg: net.ReceiveMsg<model.ChipsUpdateInfo>) {
            super.on_G2C_CHIPS_UPDATE(msg);
            this.scene.saveChip.push({ id: msg.datas.playerId, chips: msg.datas.updateChips });
            // egret.log("更新筹码" + this.scene.gameDatas.getPlayIngGameCnt(), this.scene.saveChip.length);
            // if (this.scene.gameDatas.getPlayIngGameCnt() === this.scene.saveChip.length) {
            await this.scene.wait(500);
            // egret.log("msg.datas.updateChips" + msg.datas.updateChips, this.scene.saveChip.length);
            for (let i = 0; i < this.scene.saveChip.length; i++) {
                egret.log("this.scene.saveChip.length" + i, this.scene.saveChip[i].id);
                this.scene.updatePlayerChips(this.scene.saveChip[i].id, this.scene.saveChip[i].chips);
                // if (i == this.scene.saveChip.length) {
                //     this.scene.saveChip = [];
                // }
            }
            this.scene.saveChip = [];
            // }

        }

    }
}
