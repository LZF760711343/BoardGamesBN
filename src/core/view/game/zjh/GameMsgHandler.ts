/**
 * 扎金花游戏处理游戏协议的类
 */

namespace zjh {
    export class GameMsgHandler extends GameMsgHandlerBase {
        public gameDatas: GameDatas;
        public scene: GameScene;

        // public 
        public constructor(scene: GameScene, gameDatas: GameDatas) {
            super(scene, gameDatas);
            this._delayMsgList = this._delayMsgList.concat([
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
            this.checkProtocols();
        }
        //收到下注消息
        @Decorators.printDatas(DEBUG)
        private on_G2C_NN_BET(msg: net.ReceiveMsg<model.ZJHBetInfo>) {
            // this.gameDatas.playerDatas[msg.datas.playerId].chips = msg.datas.ownChips;
            if (this.gameDatas.gameType == GAME_TYPE.COIN) {
                this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.gold = msg.datas.ownChips;
            }
            if (Global.playerDto.id == msg.datas.playerId && this.gameDatas.gameType == GAME_TYPE.COIN) {
                Global.playerDto.gold = msg.datas.ownChips;
            }
            // if (this.gameDatas.isSelfPlayingGame()) {
            // egret.log("111111111111111");
            if (this.gameDatas.curBetCnt != msg.datas.actionCoin) {
                var num = Math.random() * 3;
                if (num < 1) {
                    SoundManage.playEffectBySex("jiazhu", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                } else if (num < 2) {
                    SoundManage.playEffectBySex("jiazhu1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                } else {
                    SoundManage.playEffectBySex("jiazhu2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                }
            } else {
                if (this.gameDatas.roundCnt === 1) {
                    this.gameDatas.Num++;
                    // egret.log("this.gameDatas.num" + this.gameDatas.Num);
                    if (this.gameDatas.Num <= this.gameDatas.getPlayIngGameCnt()) {
                    } else {
                        SoundManage.playEffectBySex("genzhu", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    }
                } else {
                    if (this.gameDatas.playerDatas[msg.datas.playerId].kanPai) {
                        // egret.log("22222222222222");
                        if (this.gameDatas.sumChips != (msg.datas.sumChips - this.gameDatas.curBetCnt * 4)) {
                            if (this.gameDatas.roundCnt <= 5 && this.gameDatas.roundCnt >= 1) {
                                SoundManage.playEffectBySex("genzhu", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                            } else if (this.gameDatas.roundCnt > 5) {
                                SoundManage.playEffectBySex("haigen", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                            }
                        }
                    } else if (this.gameDatas.sumChips != msg.datas.sumChips - this.gameDatas.curBetCnt * 2 && this.gameDatas.sumChips != msg.datas.sumChips - this.gameDatas.curBetCnt * 4) {
                        // egret.log("33333333", this.gameDatas.roundCnt);
                        if (this.gameDatas.roundCnt <= 5 && this.gameDatas.roundCnt >= 1) {
                            SoundManage.playEffectBySex("genzhu", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                        } else if (this.gameDatas.roundCnt > 5) {
                            SoundManage.playEffectBySex("haigen", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                        }
                        if (this.gameDatas.roundCnt == undefined) {
                            SoundManage.playEffectBySex("haigen", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                        }
                    }
                }
                // }

            }
            if (this.gameDatas.roundCnt === 1) {
                this.gameDatas.firstTime++;
                if (this.gameDatas.firstTime <= this.gameDatas.getPlayIngGameCnt()) {
                    if (msg.datas.actionCoin < msg.datas.inChips) {
                        msg.datas.inChips -= msg.datas.actionCoin;
                    }
                    this.scene.doPlayerBetAni(msg.datas.playerId, msg.datas.inChips);
                    egret.log("this.gameDatas.roundCntStart" + this.gameDatas.roundCnt, msg.datas.inChips);
                } else {
                    this.scene.doPlayerBetAni(msg.datas.playerId, msg.datas.actionCoin);
                }
            } else {
                this.scene.doPlayerBetAni(msg.datas.playerId, msg.datas.actionCoin);
            }
            egret.log("this.gameDatas.roundCnt" + this.gameDatas.roundCnt);

            //更新当前下的注
            this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.setBetChips, msg.datas.inChips);
            this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.updateChips, msg.datas.ownChips);
            this.gameDatas.sumChips = msg.datas.sumChips;
            this.gameDatas.curActionId = msg.datas.actionPlayerId;
            this.gameDatas.curBetCnt = msg.datas.actionCoin;
            this.turnAction();
            let player = this.scene.getPlayerById(msg.datas.playerId);
            if (player) {
                player.updateChips(msg.datas.ownChips);
            }

        }
        /**
         * 轮到谁操作
         */
        @Decorators.printDatas(DEBUG)
        protected on_G2C_NOW_ACTION_ID(msg: net.ReceiveMsg<model.NoWActionIdInfo>) {
            if (this.gameDatas.isSelfPlayingGame()) {
                this.gameDatas.curActionId = msg.datas.actionPlayerId;
                this.turnAction();
            }
        }
        /**
         * 收到看牌的消息
         */
        @Decorators.printDatas(DEBUG)
        protected on_G2C_PSZ_KANPAI(msg: net.ReceiveMsg<model.ZJHKanpaiInfo>) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (this.gameDatas.noTime) {
                var num = Math.random() * 3;
                if (num < 1) {
                    SoundManage.playEffectBySex("kanpai", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                } else if (num < 2) {
                    SoundManage.playEffectBySex("kanpai1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                } else {
                    SoundManage.playEffectBySex("kanpai2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                }

                this.OnKanPai([msg.datas]);
            } else {
                if (msg.datas.playerId == Global.playerDto.id) {
                    this.gameDatas.cuopai = new zjh.CuoPaiAni();
                    this.scene.addChild(this.gameDatas.cuopai);
                    // egret.log("111111");
                    var num = Math.random() * 3;
                    if (num < 1) {
                        SoundManage.playEffectBySex("kanpai", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    } else if (num < 2) {
                        SoundManage.playEffectBySex("kanpai1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    } else {
                        SoundManage.playEffectBySex("kanpai2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    }
                    this.gameDatas.cuopai.PlayCuoPai(msg.datas.cards, this.OnKanPai, this, [msg.datas]);
                }
                else {
                    var num = Math.random() * 3;
                    if (num < 1) {
                        SoundManage.playEffectBySex("kanpai", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    } else if (num < 2) {
                        SoundManage.playEffectBySex("kanpai1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    } else {
                        SoundManage.playEffectBySex("kanpai2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
                    }
                    this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.setAction, PlayerActionMask.LOOK);
                    this.gameDatas.handCardList[msg.datas.playerId] = msg.datas.cards;
                    this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.showCardAni, msg.datas.cards, true);

                    this.scene.updateBtnBar();
                }
            }
            this.gameDatas.playerDatas[msg.datas.playerId].kanPai = msg.datas.kanPai;
            // }
        }

        private OnKanPai(arg: any[]) {
            var datas = <model.ZJHKanpaiInfo>arg[0];
            this.scene.doPlayerMethod(datas.playerId, Player.prototype.setAction, PlayerActionMask.LOOK);
            this.gameDatas.handCardList[datas.playerId] = datas.cards;
            this.scene.doPlayerMethod(datas.playerId, Player.prototype.showCardAni, datas.cards, true);
            this.scene.updateBtnBar();
        }

        // 
        /**
         * 收到发牌消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_SEND_CARDS(msg: net.ReceiveMsg<model.G2C_SEND_CARDS>) {
            if (this.gameDatas.gameStatus > GAME_STAGE.PRE_START) {
                SoundManage.playEffect("start_szp");
                this.gameDatas.handCardList[msg.datas.playerId] = msg.datas.Cards;
                if (this.gameDatas.isPlayngGame(msg.datas.playerId)) {
                    if (this.gameDatas.isReconnect) {
                        this.scene.setCards(msg.datas.playerId, msg.datas.Cards);
                    } else {
                        this.scene.dealCardById(msg.datas.playerId, msg.datas.Cards);
                    }

                }
            }
        }
        /*
        * 更新筹码
        */
        protected async on_G2C_CHIPS_UPDATE(msg: net.ReceiveMsg<model.ChipsUpdateInfo>) {
            super.on_G2C_CHIPS_UPDATE(msg);
            // this.scene.updatePlayerChips(this.scene.saveChip[i].id, this.scene.saveChip[i].chips);
            // egret.log("this.gameDatas.isDoAction" + this.gameDatas.isDoAction);
            let datas = msg.datas;
            if (this.scene.gameDatas.really) {
                await this.scene.wait(500);
                this.scene.updatePlayerChips(datas.playerId, datas.updateChips);
            } else {
                this.scene.updatePlayerChips(datas.playerId, datas.updateChips);
            }
        }
        /**
         * 收到游戏结束的消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_GAMEOVER(msg: net.ReceiveMsg<model.ZJHGameOverInfo>) {
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

        }
        //收到游戏开始信息
        @Decorators.printDatas(DEBUG)
        private async on_G2C_STARTGAME(msg: net.ReceiveMsg<model.ZJH_STARTGAME>) {
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
            let datas = msg.datas;
            this.gameDatas.isReconnect = false;
            //游戏一旦开始了,当前所有的人都在参与游戏列表里面
            for (let key in this.gameDatas.playerDatas) {
                this.gameDatas.playingList[this.gameDatas.playerDatas[key].playerId] = true;
            }
            SoundManage.playEffect("nnStartGame");
            this.gameDatas.resetPlayerDatas();
            this.scene._roundTipBar.visible = true;
            this.scene.reset();
            //播放动画期间,停止处理消息
            this.stopHandleMsg();
            this.scene.hideWaitGameStartTip();
            await this.scene.doStartGameAni();
            this.updateGameProcess(datas, false, false);
            // //播放完动画,开始处理消息
            this.doAllowHandleMsg();
        }
        @Decorators.printDatas(DEBUG)
        private on_G2C_GAMEPROCESS(msg: net.ReceiveMsg<model.ZJH_STARTGAME>) {
            this.updateGameProcess(msg.datas, true);
        }
        protected on_G2C_PLAYER_INFO(msg: net.ReceiveMsg<model.ZJH_PLAYER_INFO>) {
            super.on_G2C_PLAYER_INFO(msg);
            if (msg.datas.touZhu) {
                this.gameDatas.sumChips += msg.datas.touZhu;
            }

            if (msg.datas.loseOrQiPai) {
                this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.setAction, msg.datas.loseOrQiPai);
            }
            if (msg.datas.kanPai) {
                this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.setAction, PlayerActionMask.LOOK);
            }
            this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.setBetChips, msg.datas.touZhu || 0);
            if (this.gameDatas.roomInfo.stage > GAME_STAGE.PRE_START) {
                this.scene.setPlayerStatu(msg.datas.playerId, PLAYER_UI_STATU.IDLE);
            }
            // if (!this.gameDatas.isSelfPlayingGame() && !this.gameDatas.isSelfId(msg.datas.playerId) && this.gameDatas.roomInfo.stage > GAME_STAGE.PRE_START) {
            //     this.scene.dealCardById(msg.datas.playerId, [0, 0, 0]);
            //     this.scene.isShowReadyMenu(true);
            // }
        }
        /**
         * 更新当前轮数
         */
        @Decorators.printDatas(DEBUG)
        protected on_G2C_ROUND_COUNT(msg: net.ReceiveMsg<model.RoundCountInfo>) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            this.gameDatas.roundCnt = msg.datas.round;
            egret.log("this.gameDatas.roundCntthis.gameDatas.roundCnt" + this.gameDatas.roundCnt)
            this.gameDatas.maxRoundCnt = msg.datas.roundMax;
            this.scene.updateRoundBetInof();
            this.scene.updateBtnBar();
            if (this.gameDatas.roundCnt === COMP_CARD_CNT) {
                Toast.launch(GameLangs.zjhCompCardTip);
            } else if (this.gameDatas.roundCnt === this.gameDatas.maxRoundCnt) {
                Toast.launch(GameLangs.zjhLastRoundTip);
            }
            // }

        }
        /**
         * 收到比牌的消息
         */
        @Decorators.printDatas(DEBUG)
        protected on_G2C_PSZ_BIPAI(msg: net.ReceiveMsg<model.BiPaiInfo>) {

            // if (this.gameDatas.isSelfPlayingGame()) {
            this.scene._btnBar.visible = false;
            this.scene.gameDatas.really = true;
            var num = Math.random() * 3;
            if (num < 1) {
                SoundManage.playEffectBySex("bipai", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            } else if (num < 2) {
                SoundManage.playEffectBySex("bipai1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            } else {
                SoundManage.playEffectBySex("bipai2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            }
            let datas = msg.datas;
            //播放动画期间,停止处理消息
            this.scene.setAllPlayerStatu(PLAYER_UI_STATU.IDLE);
            SoundManage.playEffect("bidian");
            this.stopHandleMsg();
            this.scene.doBiPaiGameAni(datas.isWin, datas.playerId, datas.otherId, () => {
                egret.log("播放比牌动画结束！！！");
                if (datas.isWin) {
                    this.scene.doPlayerMethod(datas.otherId, Player.prototype.setAction, PlayerActionMask.LOSE);
                    this.gameDatas.playerDatas[datas.otherId].loseOrQiPai |= PlayerActionMask.LOSE;
                } else {
                    this.scene.doPlayerMethod(datas.playerId, Player.prototype.setAction, PlayerActionMask.LOSE);
                    this.gameDatas.playerDatas[datas.playerId].loseOrQiPai |= PlayerActionMask.LOSE;
                }
                if (this.gameDatas.curActionId != datas.actionPlayerId) {
                    this.gameDatas.curActionId = datas.actionPlayerId;
                    this.turnAction()
                }

                this.doAllowHandleMsg();
            }, this);

            // }

        }
        /**
         * 收到弃牌的消息
         */
        @Decorators.printDatas(DEBUG)
        protected on_G2C_PSZ_QIPAI(msg: net.ReceiveMsg<model.QiPaiInfo>) {
            SoundManage.playEffect("fold");
            // if (this.gameDatas.isSelfPlayingGame()) {
            this.scene.gameDatas.really = false;
            var num = Math.random() * 3;
            if (num < 1) {
                SoundManage.playEffectBySex("qipai", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            } else if (num < 2) {
                SoundManage.playEffectBySex("qipai1", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            } else {
                SoundManage.playEffectBySex("qipai2", this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.sex);
            }
            this.scene.HideButs();
            this.scene.doPlayerMethod(msg.datas.playerId, Player.prototype.setAction, msg.datas.loseOrQiPai);
            this.gameDatas.playerDatas[msg.datas.playerId].loseOrQiPai = msg.datas.loseOrQiPai;
            if (this.gameDatas.curActionId != msg.datas.actionPlayerId) {
                this.gameDatas.curActionId = msg.datas.actionPlayerId;
                this.turnAction()
            } else {
                this.scene.updateBtnBar();
            }
            // }
        }

        /**
         * 切换到下个人进行操作
         */
        private turnAction() {
            this.scene.setAllPlayerStatu(PLAYER_UI_STATU.IDLE);
            this.scene.updateRoundBetInof();
            this.scene.updateSumChipsUI();
            this.scene.updateBtnBar();
            this.scene.updateChipsGroup();
            if (this.gameDatas.curActionId) {
                this.scene.setPlayerStatu(this.gameDatas.curActionId, PLAYER_UI_STATU.WAIT);
            }

            // if (this.gameDatas.curActionId === this.gameDatas.myPlyerId) {//如果是轮到自己
            this.scene.isAutoBet();
            // } else {

            // }
        }
        public updateGameProcess(datas: model.ZJH_STARTGAME, isReconnect: boolean = false, bAnimation?: boolean) {
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
            if (this.gameDatas.gameStatus !== GAME_STAGE.PRE_START) {
                if (this.gameDatas.isSelfPlayingGame()) {
                    if (isReconnect && datas.round === 1) {
                        this.gameDatas.Num = this.gameDatas.getPlayIngGameCnt();
                        // let playerList = this.gameDatas.getPlayingList();
                        // let arrLen = playerList.length;
                        // for (let i = 0; i < arrLen; i++) {
                        //     if(playerList[i].)
                        // }
                    }

                    this.scene.setChipsBarAndRoundBarVisible(true);
                    this.scene.hideWaitGameStartTip();
                    this.turnAction();
                } else {
                    // this.scene.showWaitTip();
                }
            } else {

            }
            this.scene.uiLayer.updateDissolveBtn();
        }
        /**
         * 发送下注消息,加注也是用这个消息
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
         * 发送看牌消息
         */
        public sendKanMsg(num: boolean) {
            this.gameDatas.noTime = num;
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_PSZ_KANPAI).send();
        }
        /**
         * 发送比牌消息
         */
        public sendBi(playerId: number) {
            net.SendMsg.create({ otherId: playerId }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_PSZ_BIPAI).send();
        }
        /**
         * 发送弃牌消息
         */
        public sendQiMsg() {
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_PSZ_QIPAI).send();
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
            this.scene.updateBtnBar();
            this.scene.updataPlayMechip(Global.playerDto.gold);
        }
    }
}
