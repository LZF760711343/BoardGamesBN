/**
 * 牛牛游戏处理游戏协议的类
 */
namespace niuniu.brnn {
    export class GameMsgHandler extends GameMsgHandlerBase {
        public gameDatas: GameDatas;
        public scene: GameScene;
        public gameId: number;
        public constructor(scene: GameScene, gameDatas: GameDatas) {
            super(scene, gameDatas);
            this._delayMsgList = this._delayMsgList.concat([
                PlayGameOrder.G2C_ONE_HAND_RESULT,
                PlayGameOrder.G2C_BRNN_FANG_PAI,
                PlayGameOrder.G2C_BRNN_GAMEOVER,
                PlayGameOrder.G2C_CALC_SUM_RESULT,
                PlayGameOrder.G2C_CHANGE_STATE,
                PlayGameOrder.G2C_ENTER_BRNN_ROOM,
                // PlayGameOrder.G2C_SITDOWN,
                PlayGameOrder.G2C_BRNN_STARTGAME,
                PlayGameOrder.G2C_BRNN_GAMEPROCESS,
                PlayGameOrder.G2C_UPDATE_PLAYER_GOLD,
                PlayGameOrder.G2C_ZHUANG_JIA_LIST,
                PlayGameOrder.G2C_BRNN_BET,
                PlayGameOrder.G2C_UPDATE_ZHANJI_LIST,
                PlayGameOrder.G2C_SEND_CARDS,

            ]);
            Utils.removeItemByValue(this._delayMsgList, PlayGameOrder.G2C_LEAVE_ROOM);
            this.gameId = GAME_ID.GAME_ID_HZ_BRNN;
        }

        /**********************发送消息区域**********************/

        /**
         * 发送上庄请求
         */
        public sendAskShangzhuang() {
            net.SendMsg.create({ shangZhuangType: 1 }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ASK_SHANGZHUANG).send();
        }
        /**
         * 发送坐下的消息
         */
        public sendSitDownMsg() {
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_SITDOWN).send();
        }
        /**
         * 发送下庄消息
         */
        public sendAskXiazhuang() {
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ASK_XIAZHUANG).send();
        }

        /** 
         * 取得hz百人牛牛申请当庄列表
         */
        public sendShenQingList() {
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_HZ_BRNN_SHENQING_LIST).send();
        }

        /**
         * 发送下注消息
         */
        public sendBetMsg(chips: number | string, zuowei: number) {
            if (typeof chips === "string") {
                chips = parseInt(chips);
            }
            net.SendMsg.create({
                in_chips: chips,
                zuowei: zuowei
            }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_NN_BET).send();
        }
        /**********************接收到的消息处理区域**********************/
        /**
         * 收到离开房间消息
         */
        @Decorators.printDatas(DEBUG)
        private on_C2G_LEAVE_SCORE_ROOM(msg: net.ReceiveMsg<model.LeaveScoreRoomInfo>) {
            if (msg.datas.errorValue === 0) {
                SceneManager.runScene(GAME_ID.SELECT);
            }
        }

        /**
          * 收到玩家列表消息
          */
        // @Decorators.printDatas(DEBUG)
        private on_G2C_GET_IN_ROOM_PLAYERS(msg: net.ReceiveMsg<model.BRNN_ROOM_PLAYERS_List>) {

            // new Layers.GameListLayer(msg.datas).open();
            // this.scene.gamelistLayer.
            let arrLen = msg.datas.players.length;
            for (let i = 0; i < arrLen; i++) {
                msg.datas.players[i].nickName = StringUtil.decodeBase64(msg.datas.players[i].nickName);
                if (this.gameDatas.playerDatas[msg.datas.players[i].playerId]) {
                    msg.datas.players[i].chips = this.gameDatas.playerDatas[msg.datas.players[i].playerId].chips;
                }
            }
            let layers = <niuniu.brnn.GameListLayer>Layers.getLayer(niuniu.brnn.GameListLayer);
            if (layers != null) {
                layers.updata(msg.datas, this.gameDatas);
            }
        }

        /** 收到百人牛牛申请列表 */
        private on_G2C_HZ_BRNN_SHENQING_LIST(msg: net.ReceiveMsg<{ shenqingShangzhuangList: number[] }>) {
            this.gameDatas.shenqingShangzhuangList = msg.datas.shenqingShangzhuangList;
            this.scene.openWangList(msg.datas.shenqingShangzhuangList);
            // this.scene.updateWangList();
        }

        /**
         * 收到离开房间的消息
         */
        @Decorators.printDatas(DEBUG)
        protected on_G2C_LEAVE_ROOM(msg: net.ReceiveMsg<model.LeaveRoomInfo>) {
            if (msg.datas.UserName == Global.playerDto.account) {
                if (msg.datas.leaveType !== 1) {
                    SceneManager.runScene(GAME_ID.SELECT, (scene: SelectScene) => {
                    });
                    net.removeMsgBeforeMsg(net.MSG_LEVEL.SCENE, ModuleInfo.PLAY_GAME, PlayGameOrder.G2C_LEAVE_ROOM);
                    return net.DIS_RESULT.STOP;
                }
            } else {
                this.gameDatas.playingList[msg.datas.playerId] = false;
                this.gameDatas.playerDatas[msg.datas.playerId] = null;
                // this.scene.clearPlayer(msg.datas.playerId);
                this.scene.updatePlayerInfo();
            }
        }

        private isPlay: boolean = false;
        private channel: egret.SoundChannel;
        // 收到玩家信息
        @Decorators.printDatas(DEBUG)
        public on_G2C_PLAYER_INFO(msg: net.ReceiveMsg<model.PLAYER_INFO>) {
            // super.on_G2C_PLAYER_INFO(msg);
            msg.datas.UserInfo.nickName = StringUtil.decodeBase64(msg.datas.UserInfo.nickName);
            let info = this.gameDatas.playerDatas[msg.datas.playerId] = msg.datas;
            // 播放坐下的声音，目前不要，暂时屏蔽掉
            // if(this.gameDatas.getPlayingList.length <=9){
            //     if(!this.isPlay){
            //         this.isPlay = true;
            //         this.channel = SoundManage.playEffect("nn_timeout");
            //         this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            //     }
            // }
            if (msg.datas.playerId >= 0) {
                //判断是否是自己的玩家信息
                if (msg.datas.UserInfo.account == Global.playerDto.account) {
                    this.gameDatas.myPlyerId = msg.datas.playerId;
                    this.gameDatas.myPos = msg.datas.zuoweiIndex;
                    // this.scene.updateMyPlayerInfor();
                    // this.scene.setPlayerVisible(msg.datas.playerId, true);
                    // this.scene.updatePlayerInfo();
                }
                // else {
                //     // this.scene.updatePlayerInfo(msg.datas);
                // }
                this.scene.setPlayerVisible(msg.datas.playerId, true);
                this.scene.updatePlayerInfo();
                // if (msg.datas.playerFlags !== -1) {
                //     if (msg.datas.playerFlags & 0x1) {
                //         this.scene.doPlayerMethod(msg.datas.playerId, PlayerBase.prototype.setOffTip);
                //     }
                // }
                // if (info) {
                //     this.scene.doPlayerMethod(msg.datas.playerId, PlayerBase.prototype.removeOffTip);
                //     info.playerFlags = (info.playerFlags >> 1) << 1;
                // }
            }

        }

        /** 播放完毕移除事件 */
        private onSoundComplete(event: egret.Event): void {
            this.isPlay = false;
            this.channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        }

        // @Decorators.printDatas(DEBUG)
        // protected on_G2C_ENTER_BRNN_ROOM(msg: net.ReceiveMsg<model.EnterBrnnRoomInfo>) {
        //     egret.log("G2C_ENTER_BRNN_ROOM 的 msg",msg);
        //     let arrLen = msg.datas.wangNameList.length;
        //     for (let i = 0; i < arrLen; i++) {
        //         msg.datas.wangNameList[i].nickName = StringUtil.decodeBase64(msg.datas.wangNameList[i].nickName);
        //     }
        //     msg.datas.NickName = StringUtil.decodeBase64(msg.datas.NickName);
        //     SceneManager.runScene(GAME_ID.BRNN, (scene: GameSceneBase) => {
        //         Layers.WaitingLayer.close();
        //         scene.init();
        //     }, null, msg.datas);
        // }

        /**
         * 发送下注消息
         */
        public sendShowMsg() {
            net.SendMsg.create({
                // handtype:handtype
            }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_NN_SHOW).send();
        }
        /**
         * 收到战绩列表更新消息
         */
        private on_G2C_UPDATE_ZHANJI_LIST(msg: net.ReceiveMsg<model.UpdateZhanjiListInfo>) {
            // if (msg.datas.winList.length == 1) {
            let arr = msg.datas.winList[0];
            this.gameDatas.brnWinResult = arr;
            // this.scene.updateHistroyListUI(arr);
            // } else {

            // }
        }
        /**
         * 收到断线重连后同步的协议
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_BRNN_GAMEPROCESS(msg: net.ReceiveMsg<model.BrnnGameprocessInfo>) {
            this.gameDatas.sumInChipsList = msg.datas.sumInChipsList;
            this.gameDatas.selfInChipsList = msg.datas.selfInChipsList;
            //计算自己总的下注额度
            msg.datas.selfInChipsList[0] =
                msg.datas.selfInChipsList[1] + msg.datas.selfInChipsList[2]
            msg.datas.selfInChipsList[3] + msg.datas.selfInChipsList[4];
            //计算当前总的下注额度
            msg.datas.sumInChipsList[0] =
                msg.datas.sumInChipsList[1] + msg.datas.sumInChipsList[2]
            msg.datas.sumInChipsList[3] + msg.datas.sumInChipsList[4];
            this.gameDatas.gameStatus = msg.datas.stage;
            this.gameDatas.weizhi = msg.datas.weizhi;
            this.gameDatas.isReconnect = true;
            this.scene.updateChipGroupUI();
            this.scene.setIsSitDown();
            this.gameDatas.updateKingInfo();
            this.scene.updateKingBtn();
            this.scene.updateChipsPools();
            // this.scene.updatePlayerInfo();
            this.scene.changeStage();
            //更新进度条
            this.scene.setChipCountPgbValue(this.gameDatas.sumInChipsList[0]);
        }

        /**
        * 收到更新筹码
        */
        @Decorators.printDatas(DEBUG)
        protected on_G2C_CHIPS_UPDATE(msg: net.ReceiveMsg<model.ChipsUpdateInfo>) {
            Global.playerDto.gold = msg.datas.updateChips;
            this.scene._changeCHIPS(msg.datas.updateChips);
        }
        protected on_G2C_UPDATE_PLAYER_GOLD(msg: net.ReceiveMsg<{ result: number, gold: number }>) {
            this.scene._changeCHIPS(msg.datas.gold);
            let layers: Layers.RechargeLayer = Layers.getLayer(Layers.RechargeLayer);

            if (layers) {
                layers.updateLabel();
            }
        }

        /**
         * 收到上下庄消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_ZHUANG_JIA_LIST(msg: net.ReceiveMsg<model.ZhuangJiaListInfo>) {

            // if(msg.datas.wangNameList)
            this.gameDatas.brnnRoomInfo.wangNameList = msg.datas.wangNameList;
            this.gameDatas.updateKingInfo();
            this.scene.updatePlayerInfo();
            this.gameDatas.zhaungMoney = msg.datas.sumChips;
            if (this.gameDatas.isAutoApplyDeal) {//如果选择了自动当王的按钮
                this.autoApplyDeal();
            }
            //如果是自己上庄,播放提示上庄动画
            if (this.gameDatas.brnnRoomInfo.wangNameList
                && this.gameDatas.brnnRoomInfo.wangNameList[0]
                && this.gameDatas.isSelfId(this.gameDatas.brnnRoomInfo.wangNameList[0].playerId)) {
                let img = new egret.Bitmap(RES.getRes("gxnsz_hzpiaozi_png"));
                this.scene.effectLayer.addChild(img);
                img.y = (Global.sHeight - img.height) / 2;
                Effect.showLeftToRight(img).call(this.scene.effectLayer.removeChild, this.scene.effectLayer, [img]);
                // 
            }
            this.scene.gameDatas.zhaungMoney = msg.datas.sumChips;
            // this.scene.changeStage();
            this.scene.updateKingBtn();
            // this.scene.updataKingHead();
            //更新UI界面的语音按钮
            this.scene.uiLayer.isShowVoiceBtn(this.gameDatas.isSelfKing);
            // this.scene.updateWangList();
        }
        /**
        * 收到坐下
        */
        @Decorators.printDatas(DEBUG)
        private on_G2C_SITDOWN(msg: net.ReceiveMsg<{ result: number, weizhi: number }>) {
            this.gameDatas.weizhi = msg.datas.weizhi;
            this.scene.setIsSitDown();
            if (msg.datas.weizhi === -1) {
                this.scene.showChangeDeskTip(GameLangs.roomFullTips)
                // let alert = Layers.HintLayer.create();
                // alert.init({
                //     curState: Layers.HintLayer.SURE_CANNEL2,
                //     leftBtnBg: "orange_icon_png",
                //     rightBtnBg: "red_icon1_png",
                //     rightBtnIcon: "huanzhuo_text1_png",
                //     rightFunc: this.sendChangeRoom,
                //     rightThisObj: this,
                //     tipsStr: GameLangs.roomFullTips
                // });
                // alert.open();
            } else {
                if (!this.gameDatas.brnnRoomInfo.wangNameList.length) {
                    this.scene.showChangeDeskTip(GameLangs.notKingTip);
                    // 
                }
            }
        }

        /**
         * 收到当前游戏状态切换的消息
         */
        private on_G2C_CHANGE_STATE(msg: net.ReceiveMsg<model.ChangeStateInfo>) {
            this.gameDatas.zhaungMoney = msg.datas.sumChips;
            this.gameDatas.gameStatus = msg.datas.stage;
            this.scene.changeStage();
            this.scene.startCountDown(msg.datas.waitTime);
            // if (this.gameDatas.gameStatus == GAME_STAGE.TOU_ZHU) {
            //     SoundManage.playEffect("nn_jetton");
            // }
        }

        /**
         * 收到玩家下注的消息
         */
        private on_G2C_BRNN_BET(msg: net.ReceiveMsg<model.BrnnBetInfo>) {

            if (msg.datas.playerId === Global.playerDto.id) {//如果是自己投注的话
                //更新自己的下注消息
                this.gameDatas.setSelfInChips(msg.datas.self_chips, msg.datas.zuoweiIndex);
            }
            this.gameDatas.setSumInChipsList(msg.datas.sum_in_chips, msg.datas.zuoweiIndex);
            //实时更新筹码
            if (Global.playerDto.id == msg.datas.playerId) {
                Global.playerDto.gold -= msg.datas.in_chips;
                this.scene.updateMyPlayerInfor1();
            }
            this.gameDatas.playerDatas[msg.datas.playerId].chips = this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.gold -= msg.datas.in_chips;
            this.scene.updateMyPlayerInfor2(msg.datas.playerId);
            //别人投注时，也能实时刷新筹码UI（庄家破水超过的话）
            this.scene.updateChipGroupUI();
            // //播放下注动画
            // this.scene.addChipAni(msg.datas.zuoweiIndex, msg.datas.in_chips, msg.datas.playerId === Global.playerDto.id);
            //播放下注动画
            this.scene.addChipAni(msg.datas.zuoweiIndex, msg.datas.in_chips, msg.datas.playerId, 4);
            // 单个单个播放筹码的声音，目前不要，暂时屏蔽掉
            // if (!this.isPlay) {
            //     if (this.channel) {
            //         this.isPlay = true;
            //         this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            //     }
            // }
            this.scene.addChipPlayAui(msg.datas.playerId);
            //更新筹码池的UI
            this.scene.updateChipsPools();
            //更新进度条
            this.scene.setChipCountPgbValue(this.gameDatas.sumInChipsList[0]);
        }
        /**
         * 收到自己的输赢总结果
         */
        private on_G2C_CALC_SUM_RESULT(msg: net.ReceiveMsg<model.CalcSumResultInfo>) {
            this.gameDatas.gameOverDatas.calInfo = msg.datas;

        }
        /**
         * 收到结算翻牌消息
         */
        private async on_G2C_BRNN_FANG_PAI(msg: net.ReceiveMsg<model.BrnnFangPaiInfo>) {

            this.gameDatas.gameOverDatas.list[msg.datas.zuoWeiId].cardsInfo = msg.datas;
            // this.stopHandleMsg();
            // if (msg.datas.zuoWeiId >= 1) {
            //     await this.scene._chipsPools[msg.datas.zuoWeiId - 1].doShowCardAni(this.gameDatas.gameOverDatas.list[msg.datas.zuoWeiId]);
            // }
            // this.doAllowHandleMsg();
        }

        /** 收到设置牌消息 */
        private on_G2C_SEND_CARDS(msg: net.ReceiveMsg<model.BrnnFangPaiInfo>) {
            this.gameDatas.gameOverDatas.list[msg.datas.zuoWeiId].cardsInfo = msg.datas;
            this.gameDatas.gameCi++;
            let data = this.gameDatas.gameOverDatas;
            if (this.gameDatas.gameCi == 5) {
                this.scene.doSendCardAui(data);//播放发牌动画
            }
        }

        /**
         * 收到游戏结束
         */
        private on_G2C_BRNN_GAMEOVER(msg: net.ReceiveMsg<any>) {
            this.gameDatas.gameStatus = GAME_STAGE.SHOW_ALL;
            this.scene.changeStage();

            this.stopHandleMsg();//暂停处理消息
            this.scene.doGameOverAni();//开始播放结算动画
        }
        /**
         * 收到自己在每个筹码池的输赢结果消息
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_ONE_HAND_RESULT(msg: net.ReceiveMsg<model.OneHandResultInfo>) {
            this.gameDatas.gameOverDatas.list[msg.datas.zuoWeiId].chipsPoolInfo = msg.datas;
        }
        /**
         * 更新hz百人牛牛玩家金币(里面记录了玩家的输赢金币)
         */
        @Decorators.printDatas(DEBUG)
        private on_G2C_HZ_BRNN_UPDATE_CHIPS_LIST(msg: net.ReceiveMsg<model.HZ_BRNN_UPDATE_CHIPS_LIST>) {
            let datas = msg.datas.hzBrNnMsgList;
            this.gameDatas.hzBrNnMsgList = datas;
            for (let i = 0; i < datas.length; i++) {
                let info = this.gameDatas.playerDatas[datas[i].playerId];
                info.chips = info.UserInfo.gold = datas[i].updateChips;
                if (Global.playerDto.id == msg.datas.hzBrNnMsgList[i].playerId) {
                    Global.playerDto.gold = msg.datas.hzBrNnMsgList[i].updateChips;
                }
                //如果庄家赢了，播放庄家动画
                // if(this.gameDatas.brnnRoomInfo.wangNameList[0]){
                //     if(this.gameDatas.brnnRoomInfo.wangNameList[0].playerId == msg.datas.hzBrNnMsgList[i].playerId && msg.datas.hzBrNnMsgList[i].updateChips>0){
                //         this.scene._shanguang.visible = true;
                //         this.scene._shanguang.curState = SGStatu.WIN;
                //     }
                // }
            }

        }
        protected on_G2C_CHONGZHI_TIPS(msg: net.ReceiveMsg<{ result: number, content: string }>) {
            //关闭自动上庄开关
            // if (this.scene._autoApplyBtn.selected) {
            //     this.scene._autoApplyBtn.selected = false;
            // }
        }

        //         RECE<< ,命令ID:7,消息体长度:82模块ID:1
        // egret.js:13829 {"result":0,"tipsStr":"当庄需要 1000000"}

        /*********************其它区域**********************/
        /**
         * 换桌
         */
        public changeDesk() {

        }
        public sendChangeDeskMsg() {
            net.SendMsg.create({ roomType: this.gameId }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_CHANGE_ROOM).send();
        }
        /**
         * 自动上庄
         */
        public autoApplyDeal() {
            if (this.gameDatas.isSitDown && !this.gameDatas.isSelfKing && this.gameDatas.brnnRoomInfo.maxWangCount > this.gameDatas.brnnRoomInfo.wangNameList.length) {//如果自己不是王,并且当前王的位置还有
                this.sendAskShangzhuang();
            }
        }

        // 刷新钻石
        private on_G2C_UPDATE_PLAYER_DIAMOND(msg: net.ReceiveMsg<model.PlayerDto>) {
            Global.playerDto.diamond = msg.datas.diamond;
            let layers: Layers.RechargeLayer = Layers.getLayer(Layers.RechargeLayer);

            if (layers) {
                layers.updateLabel();
            }
            this.scene._changejewel(msg.datas.diamond);
        }
    }
}
