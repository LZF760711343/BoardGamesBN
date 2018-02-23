var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
/**
 * 牛牛游戏处理游戏协议的类
 */
var niuniu;
(function (niuniu) {
    var brnn;
    (function (brnn) {
        var GameMsgHandler = (function (_super) {
            __extends(GameMsgHandler, _super);
            function GameMsgHandler(scene, gameDatas) {
                var _this = _super.call(this, scene, gameDatas) || this;
                _this.isPlay = false;
                _this._delayMsgList = _this._delayMsgList.concat([
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
                Utils.removeItemByValue(_this._delayMsgList, PlayGameOrder.G2C_LEAVE_ROOM);
                _this.gameId = 41 /* GAME_ID_HZ_BRNN */;
                return _this;
            }
            /**********************发送消息区域**********************/
            /**
             * 发送上庄请求
             */
            GameMsgHandler.prototype.sendAskShangzhuang = function () {
                net.SendMsg.create({ shangZhuangType: 1 }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ASK_SHANGZHUANG).send();
            };
            /**
             * 发送坐下的消息
             */
            GameMsgHandler.prototype.sendSitDownMsg = function () {
                net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_SITDOWN).send();
            };
            /**
             * 发送下庄消息
             */
            GameMsgHandler.prototype.sendAskXiazhuang = function () {
                net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ASK_XIAZHUANG).send();
            };
            /**
             * 取得hz百人牛牛申请当庄列表
             */
            GameMsgHandler.prototype.sendShenQingList = function () {
                net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_HZ_BRNN_SHENQING_LIST).send();
            };
            /**
             * 发送下注消息
             */
            GameMsgHandler.prototype.sendBetMsg = function (chips, zuowei) {
                if (typeof chips === "string") {
                    chips = parseInt(chips);
                }
                net.SendMsg.create({
                    in_chips: chips,
                    zuowei: zuowei
                }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_NN_BET).send();
            };
            /**********************接收到的消息处理区域**********************/
            /**
             * 收到离开房间消息
             */
            GameMsgHandler.prototype.on_C2G_LEAVE_SCORE_ROOM = function (msg) {
                if (msg.datas.errorValue === 0) {
                    SceneManager.runScene(43 /* SELECT */);
                }
            };
            /**
              * 收到玩家列表消息
              */
            // @Decorators.printDatas(DEBUG)
            GameMsgHandler.prototype.on_G2C_GET_IN_ROOM_PLAYERS = function (msg) {
                // new Layers.GameListLayer(msg.datas).open();
                // this.scene.gamelistLayer.
                var arrLen = msg.datas.players.length;
                for (var i = 0; i < arrLen; i++) {
                    msg.datas.players[i].nickName = StringUtil.decodeBase64(msg.datas.players[i].nickName);
                    if (this.gameDatas.playerDatas[msg.datas.players[i].playerId]) {
                        msg.datas.players[i].chips = this.gameDatas.playerDatas[msg.datas.players[i].playerId].chips;
                    }
                }
                var layers = Layers.getLayer(niuniu.brnn.GameListLayer);
                if (layers != null) {
                    layers.updata(msg.datas, this.gameDatas);
                }
            };
            /** 收到百人牛牛申请列表 */
            GameMsgHandler.prototype.on_G2C_HZ_BRNN_SHENQING_LIST = function (msg) {
                this.gameDatas.shenqingShangzhuangList = msg.datas.shenqingShangzhuangList;
                this.scene.openWangList(msg.datas.shenqingShangzhuangList);
                // this.scene.updateWangList();
            };
            /**
             * 收到离开房间的消息
             */
            GameMsgHandler.prototype.on_G2C_LEAVE_ROOM = function (msg) {
                if (msg.datas.UserName == Global.playerDto.account) {
                    if (msg.datas.leaveType !== 1) {
                        SceneManager.runScene(43 /* SELECT */, function (scene) {
                        });
                        net.removeMsgBeforeMsg(2 /* SCENE */, 3 /* PLAY_GAME */, PlayGameOrder.G2C_LEAVE_ROOM);
                        return 3 /* STOP */;
                    }
                }
                else {
                    this.gameDatas.playingList[msg.datas.playerId] = false;
                    this.gameDatas.playerDatas[msg.datas.playerId] = null;
                    // this.scene.clearPlayer(msg.datas.playerId);
                    this.scene.updatePlayerInfo();
                }
            };
            // 收到玩家信息
            GameMsgHandler.prototype.on_G2C_PLAYER_INFO = function (msg) {
                // super.on_G2C_PLAYER_INFO(msg);
                msg.datas.UserInfo.nickName = StringUtil.decodeBase64(msg.datas.UserInfo.nickName);
                var info = this.gameDatas.playerDatas[msg.datas.playerId] = msg.datas;
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
                    }
                    // else {
                    //     // this.scene.updatePlayerInfo(msg.datas);
                    // }
                    this.scene.setPlayerVisible(msg.datas.playerId, true);
                    this.scene.updatePlayerInfo();
                }
            };
            /** 播放完毕移除事件 */
            GameMsgHandler.prototype.onSoundComplete = function (event) {
                this.isPlay = false;
                this.channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            };
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
            GameMsgHandler.prototype.sendShowMsg = function () {
                net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_NN_SHOW).send();
            };
            /**
             * 收到战绩列表更新消息
             */
            GameMsgHandler.prototype.on_G2C_UPDATE_ZHANJI_LIST = function (msg) {
                // if (msg.datas.winList.length == 1) {
                var arr = msg.datas.winList[0];
                this.gameDatas.brnWinResult = arr;
                // this.scene.updateHistroyListUI(arr);
                // } else {
                // }
            };
            /**
             * 收到断线重连后同步的协议
             */
            GameMsgHandler.prototype.on_G2C_BRNN_GAMEPROCESS = function (msg) {
                this.gameDatas.sumInChipsList = msg.datas.sumInChipsList;
                this.gameDatas.selfInChipsList = msg.datas.selfInChipsList;
                //计算自己总的下注额度
                msg.datas.selfInChipsList[0] =
                    msg.datas.selfInChipsList[1] + msg.datas.selfInChipsList[2];
                msg.datas.selfInChipsList[3] + msg.datas.selfInChipsList[4];
                //计算当前总的下注额度
                msg.datas.sumInChipsList[0] =
                    msg.datas.sumInChipsList[1] + msg.datas.sumInChipsList[2];
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
            };
            /**
            * 收到更新筹码
            */
            GameMsgHandler.prototype.on_G2C_CHIPS_UPDATE = function (msg) {
                Global.playerDto.gold = msg.datas.updateChips;
                this.scene._changeCHIPS(msg.datas.updateChips);
            };
            GameMsgHandler.prototype.on_G2C_UPDATE_PLAYER_GOLD = function (msg) {
                this.scene._changeCHIPS(msg.datas.gold);
                var layers = Layers.getLayer(Layers.RechargeLayer);
                if (layers) {
                    layers.updateLabel();
                }
            };
            /**
             * 收到上下庄消息
             */
            GameMsgHandler.prototype.on_G2C_ZHUANG_JIA_LIST = function (msg) {
                // if(msg.datas.wangNameList)
                this.gameDatas.brnnRoomInfo.wangNameList = msg.datas.wangNameList;
                this.gameDatas.updateKingInfo();
                this.scene.updatePlayerInfo();
                this.gameDatas.zhaungMoney = msg.datas.sumChips;
                if (this.gameDatas.isAutoApplyDeal) {
                    this.autoApplyDeal();
                }
                //如果是自己上庄,播放提示上庄动画
                if (this.gameDatas.brnnRoomInfo.wangNameList
                    && this.gameDatas.brnnRoomInfo.wangNameList[0]
                    && this.gameDatas.isSelfId(this.gameDatas.brnnRoomInfo.wangNameList[0].playerId)) {
                    var img = new egret.Bitmap(RES.getRes("gxnsz_hzpiaozi_png"));
                    this.scene.effectLayer.addChild(img);
                    img.y = (Global.sHeight - img.height) / 2;
                    Effect.showLeftToRight(img).call(this.scene.effectLayer.removeChild, this.scene.effectLayer, [img]);
                }
                this.scene.gameDatas.zhaungMoney = msg.datas.sumChips;
                // this.scene.changeStage();
                this.scene.updateKingBtn();
                // this.scene.updataKingHead();
                //更新UI界面的语音按钮
                this.scene.uiLayer.isShowVoiceBtn(this.gameDatas.isSelfKing);
                // this.scene.updateWangList();
            };
            /**
            * 收到坐下
            */
            GameMsgHandler.prototype.on_G2C_SITDOWN = function (msg) {
                this.gameDatas.weizhi = msg.datas.weizhi;
                this.scene.setIsSitDown();
                if (msg.datas.weizhi === -1) {
                    this.scene.showChangeDeskTip(GameLangs.roomFullTips);
                }
                else {
                    if (!this.gameDatas.brnnRoomInfo.wangNameList.length) {
                        this.scene.showChangeDeskTip(GameLangs.notKingTip);
                    }
                }
            };
            /**
             * 收到当前游戏状态切换的消息
             */
            GameMsgHandler.prototype.on_G2C_CHANGE_STATE = function (msg) {
                this.gameDatas.zhaungMoney = msg.datas.sumChips;
                this.gameDatas.gameStatus = msg.datas.stage;
                this.scene.changeStage();
                this.scene.startCountDown(msg.datas.waitTime);
                // if (this.gameDatas.gameStatus == GAME_STAGE.TOU_ZHU) {
                //     SoundManage.playEffect("nn_jetton");
                // }
            };
            /**
             * 收到玩家下注的消息
             */
            GameMsgHandler.prototype.on_G2C_BRNN_BET = function (msg) {
                if (msg.datas.playerId === Global.playerDto.id) {
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
            };
            /**
             * 收到自己的输赢总结果
             */
            GameMsgHandler.prototype.on_G2C_CALC_SUM_RESULT = function (msg) {
                this.gameDatas.gameOverDatas.calInfo = msg.datas;
            };
            /**
             * 收到结算翻牌消息
             */
            GameMsgHandler.prototype.on_G2C_BRNN_FANG_PAI = function (msg) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.gameDatas.gameOverDatas.list[msg.datas.zuoWeiId].cardsInfo = msg.datas;
                        return [2 /*return*/];
                    });
                });
            };
            /** 收到设置牌消息 */
            GameMsgHandler.prototype.on_G2C_SEND_CARDS = function (msg) {
                this.gameDatas.gameOverDatas.list[msg.datas.zuoWeiId].cardsInfo = msg.datas;
                this.gameDatas.gameCi++;
                var data = this.gameDatas.gameOverDatas;
                if (this.gameDatas.gameCi == 5) {
                    this.scene.doSendCardAui(data); //播放发牌动画
                }
            };
            /**
             * 收到游戏结束
             */
            GameMsgHandler.prototype.on_G2C_BRNN_GAMEOVER = function (msg) {
                this.gameDatas.gameStatus = 6 /* SHOW_ALL */;
                this.scene.changeStage();
                this.stopHandleMsg(); //暂停处理消息
                this.scene.doGameOverAni(); //开始播放结算动画
            };
            /**
             * 收到自己在每个筹码池的输赢结果消息
             */
            GameMsgHandler.prototype.on_G2C_ONE_HAND_RESULT = function (msg) {
                this.gameDatas.gameOverDatas.list[msg.datas.zuoWeiId].chipsPoolInfo = msg.datas;
            };
            /**
             * 更新hz百人牛牛玩家金币(里面记录了玩家的输赢金币)
             */
            GameMsgHandler.prototype.on_G2C_HZ_BRNN_UPDATE_CHIPS_LIST = function (msg) {
                var datas = msg.datas.hzBrNnMsgList;
                this.gameDatas.hzBrNnMsgList = datas;
                for (var i = 0; i < datas.length; i++) {
                    var info = this.gameDatas.playerDatas[datas[i].playerId];
                    info.chips = info.UserInfo.gold = datas[i].updateChips;
                    if (Global.playerDto.id == msg.datas.hzBrNnMsgList[i].playerId) {
                        Global.playerDto.gold = msg.datas.hzBrNnMsgList[i].updateChips;
                    }
                }
            };
            GameMsgHandler.prototype.on_G2C_CHONGZHI_TIPS = function (msg) {
                //关闭自动上庄开关
                // if (this.scene._autoApplyBtn.selected) {
                //     this.scene._autoApplyBtn.selected = false;
                // }
            };
            //         RECE<< ,命令ID:7,消息体长度:82模块ID:1
            // egret.js:13829 {"result":0,"tipsStr":"当庄需要 1000000"}
            /*********************其它区域**********************/
            /**
             * 换桌
             */
            GameMsgHandler.prototype.changeDesk = function () {
            };
            GameMsgHandler.prototype.sendChangeDeskMsg = function () {
                net.SendMsg.create({ roomType: this.gameId }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_CHANGE_ROOM).send();
            };
            /**
             * 自动上庄
             */
            GameMsgHandler.prototype.autoApplyDeal = function () {
                if (this.gameDatas.isSitDown && !this.gameDatas.isSelfKing && this.gameDatas.brnnRoomInfo.maxWangCount > this.gameDatas.brnnRoomInfo.wangNameList.length) {
                    this.sendAskShangzhuang();
                }
            };
            // 刷新钻石
            GameMsgHandler.prototype.on_G2C_UPDATE_PLAYER_DIAMOND = function (msg) {
                Global.playerDto.diamond = msg.datas.diamond;
                var layers = Layers.getLayer(Layers.RechargeLayer);
                if (layers) {
                    layers.updateLabel();
                }
                this.scene._changejewel(msg.datas.diamond);
            };
            return GameMsgHandler;
        }(GameMsgHandlerBase));
        __decorate([
            Decorators.printDatas(true)
        ], GameMsgHandler.prototype, "on_C2G_LEAVE_SCORE_ROOM", null);
        __decorate([
            Decorators.printDatas(true)
        ], GameMsgHandler.prototype, "on_G2C_LEAVE_ROOM", null);
        __decorate([
            Decorators.printDatas(true)
        ], GameMsgHandler.prototype, "on_G2C_PLAYER_INFO", null);
        __decorate([
            Decorators.printDatas(true)
        ], GameMsgHandler.prototype, "on_G2C_BRNN_GAMEPROCESS", null);
        __decorate([
            Decorators.printDatas(true)
        ], GameMsgHandler.prototype, "on_G2C_CHIPS_UPDATE", null);
        __decorate([
            Decorators.printDatas(true)
        ], GameMsgHandler.prototype, "on_G2C_ZHUANG_JIA_LIST", null);
        __decorate([
            Decorators.printDatas(true)
        ], GameMsgHandler.prototype, "on_G2C_SITDOWN", null);
        __decorate([
            Decorators.printDatas(true)
        ], GameMsgHandler.prototype, "on_G2C_ONE_HAND_RESULT", null);
        __decorate([
            Decorators.printDatas(true)
        ], GameMsgHandler.prototype, "on_G2C_HZ_BRNN_UPDATE_CHIPS_LIST", null);
        brnn.GameMsgHandler = GameMsgHandler;
        __reflect(GameMsgHandler.prototype, "niuniu.brnn.GameMsgHandler");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameMsgHandler.js.map