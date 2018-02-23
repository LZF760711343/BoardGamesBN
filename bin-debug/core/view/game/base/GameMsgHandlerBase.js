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
/**
 * 处理游戏协议的基类
 */
var GameMsgHandlerBase = (function (_super) {
    __extends(GameMsgHandlerBase, _super);
    function GameMsgHandlerBase(scene, gameDatas) {
        var _this = _super.call(this) || this;
        _this._isStopHandleMsg = false; //是否暂停处理消息
        _this.gameDatas = gameDatas;
        _this.scene = scene;
        _this._delayMsgList = [
            PlayGameOrder.G2C_LEAVE_ROOM,
            PlayGameOrder.G2C_READY_GAME,
            PlayGameOrder.G2C_PLAYER_INFO,
            PlayGameOrder.G2C_CHIPS_UPDATE,
            PlayGameOrder.G2C_SEND_CARDS,
            PlayGameOrder.G2C_SCORE_ROOM_HIS,
        ];
        net.registerMsgHandler(2 /* SCENE */, _this);
        return _this;
    }
    GameMsgHandlerBase.prototype.checkProtocols = function () {
        var igList = [
            PlayGameOrder.G2C_LEAVE_ROOM,
            PlayGameOrder.G2C_READY_GAME,
            PlayGameOrder.G2C_PLAYER_INFO,
            PlayGameOrder.G2C_CHIPS_UPDATE,
            PlayGameOrder.G2C_SEND_CARDS,
            PlayGameOrder.G2C_SCORE_ROOM_HIS,
            PlayGameOrder.G2C_LEAVE_SCORE_ROOM,
            PlayGameOrder.G2C_DEL_SCORE_ROOM,
            PlayGameOrder.G2C_DEL_SCORE_ROOM_RES,
        ];
        var str1 = "";
        var str2 = "";
        for (var key in this) {
            if (typeof this[key] === "function" && key.indexOf("on_G2C") > -1) {
                var name_1 = key.slice(3);
                if (igList.indexOf(PlayGameOrder[name_1]) > -1) {
                    continue;
                }
                if (this._delayMsgList.indexOf(PlayGameOrder[name_1]) === -1) {
                    str1 += ",PlayGameOrder." + name_1;
                }
            }
        }
        egret.warn("checkProtocols:", str1);
    };
    /**********************发送消息区域**********************/
    //发送准备游戏消息
    GameMsgHandlerBase.prototype.sendReadyGame = function () {
        net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_READY_GAME).send();
    };
    /**
     * 发送离开房间消息
     */
    GameMsgHandlerBase.prototype.sendLeaveScoreRoom = function () {
        net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_LEAVE_SCORE_ROOM).send();
    };
    /**********************接收到的消息处理区域**********************/
    /**
    * 更新筹码
    */
    GameMsgHandlerBase.prototype.on_G2C_CHIPS_UPDATE = function (msg) {
        if (this.gameDatas.gameType == 0 /* COIN */) {
            this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.gold = msg.datas.updateChips;
        }
        this.gameDatas.playerDatas[msg.datas.playerId].chips = msg.datas.updateChips;
        if (Global.playerDto.id == msg.datas.playerId && this.gameDatas.gameType == 0 /* COIN */) {
            Global.playerDto.gold = msg.datas.updateChips;
        }
    };
    GameMsgHandlerBase.prototype.on_G2C_UPDATE_PLAYER_NIUKA = function (msg) {
        // egret.log("on_G2C_UPDATE_PLAYER_NIUKA111");
        var layers = Layers.getLayer(Layers.RechargeLayer);
        if (layers) {
            layers.updateLabel();
        }
        Global.playerDto.niukaCount = msg.datas.niukaCount;
    };
    GameMsgHandlerBase.prototype.on_G2C_ENTER_ROOM = function (msg) {
        SceneManager.runScene(msg.datas.createinfo.gameId, function (scene) {
            scene.init();
        }, null, msg.datas, 0 /* COIN */);
        Global.enterRoomId = null;
    };
    /**
     * 收到离开房间的消息
     */
    GameMsgHandlerBase.prototype.on_G2C_LEAVE_ROOM = function (msg) {
        if (msg.datas.UserName == Global.playerDto.account) {
            if (msg.datas.leaveType !== 1) {
                SceneManager.runScene(43 /* SELECT */, function (scene) {
                    scene.currentState = "hall";
                    if (msg.datas.gameId == 3 /* DDZ */ || msg.datas.gameId == 13 /* GOLD_DDZ */) {
                        scene._game = 3 /* DDZ */;
                        scene._valGame_ID = 13 /* GOLD_DDZ */;
                        scene._selectRoomFastStart.init(scene._valGame_ID, scene._game);
                    }
                    else if (msg.datas.gameId == 10 /* ZJH */ || msg.datas.gameId == 11 /* GOLD_ZJH */) {
                        scene._game = 10 /* ZJH */;
                        scene._valGame_ID = 11 /* GOLD_ZJH */;
                        scene._selectRoomFastStart.init(scene._valGame_ID, scene._game);
                    }
                    else if (msg.datas.gameId == 1 /* NIUNIU */ || msg.datas.gameId == 9 /* QZNN */) {
                        scene._game = 1 /* NIUNIU */;
                        scene._valGame_ID = 9 /* QZNN */;
                        scene._selectRoomFastStart.init(scene._valGame_ID, scene._game);
                    }
                });
                net.removeMsgBeforeMsg(2 /* SCENE */, 3 /* PLAY_GAME */, PlayGameOrder.G2C_LEAVE_ROOM);
                return 3 /* STOP */;
            }
        }
        else {
            this.scene.clearPlayer(msg.datas.playerId);
            delete this.gameDatas.playingList[msg.datas.playerId];
            delete this.gameDatas.playerDatas[msg.datas.playerId];
        }
    };
    GameMsgHandlerBase.prototype.on_G2C_GUAJI_TYPE = function (msg) {
        this.scene.OpenGuajiBtn(msg.datas.guajiType, msg.datas.playerId);
    };
    GameMsgHandlerBase.prototype.on_G2C_DEL_SCORE_ROOM = function (msg) {
        var layer = Layers.getLayer(Layers.DissolveLayer);
        if (layer) {
            layer.updateData(1, msg.datas.playerId);
            if (this.gameDatas.isSelfId(msg.datas.playerId)) {
                layer.currentState = "waiting";
            }
        }
    };
    /**
     * 解散房间最终结果
     */
    GameMsgHandlerBase.prototype.on_G2C_DEL_SCORE_ROOM_RES = function (msg) {
        if (msg.datas.voteRes == 0) {
            var str = GameLangs.not_close_score_room_tips;
            // {"result":0,"voteCnt":2,"agreeCnt":2,"playerStateList":[{"leaveType":1,"nickName":"测试1号"},{"leaveType":3,"nickName":"测试2号"}],"voteRes":1}
            for (var i = 0; i < msg.datas.playerStateList.length; i++) {
                msg.datas.playerStateList[i].nickName = StringUtil.decodeBase64(msg.datas.playerStateList[i].nickName);
                if (msg.datas.playerStateList[i].leaveType == 3) {
                    str = str.replace("$1", msg.datas.playerStateList[i].nickName);
                }
                if (msg.datas.playerStateList[i].leaveType == 2) {
                    str = str.replace("$2", msg.datas.playerStateList[i].nickName);
                }
            }
        }
        else {
            for (var i = 0; i < msg.datas.playerStateList.length; i++) {
                msg.datas.playerStateList[i].nickName = StringUtil.decodeBase64(msg.datas.playerStateList[i].nickName);
                if (msg.datas.playerStateList[i].leaveType == 3) {
                    str = GameLangs.close_score_room_tips.format(msg.datas.playerStateList[i].nickName, this.gameDatas.roomInfo.room_id);
                }
            }
        }
        Toast.launch(str);
        Layers.closeLayer(Layers.DissolveLayer);
    };
    /**
     * 收到解散
     */
    GameMsgHandlerBase.prototype.on_G2C_LEAVE_SCORE_ROOM = function (msg) {
        if (msg.datas.errorValue === 0) {
            SceneManager.runScene(43 /* SELECT */);
        }
        else {
            // if (this.gameDatas.isSelfPlayingGame()) {
            var layer = Layers.getLayer(Layers.DissolveLayer);
            //获取所有游戏中的人,只有游戏中的人才有投票解散房间的权限
            var players = [];
            for (var key in this.gameDatas.playerDatas) {
                players.push(this.gameDatas.playerDatas[key]);
            }
            //拿到解散房间的发起者的玩家信息
            var originatorData = Utils.removeItemByKey(players, "playerId", msg.datas.playerId)[0];
            if (layer) {
                layer.currentState = "waiting";
            }
            else {
                layer = new Layers.DissolveLayer();
                if (this.gameDatas.isSelfId(msg.datas.playerId)) {
                    layer.currentState = "waiting";
                }
                else {
                    layer.currentState = "choice";
                }
                layer.open();
            }
            layer.initData(originatorData, players);
        }
    };
    /**
     * 收到最终结算消息
     */
    GameMsgHandlerBase.prototype.on_G2C_SCORE_ROOM_HIS = function (msg) {
        if (this.gameDatas.roomInfo.createinfo.gameId !== 38 /* GAME_ID_TWOMAN_QZNN */) {
            if (this.gameDatas.roomInfo.done_game_cnt > 0) {
                var arrLen = msg.datas.playerMsg.length;
                var isShow = false;
                for (var i = 0; i < arrLen; i++) {
                    if (msg.datas.playerMsg[i].winLoseResult !== 0) {
                        isShow = true;
                        break;
                    }
                }
                if (isShow) {
                    this.scene.openAccountLayer(msg.datas);
                }
            }
        }
    };
    /**
     * 发送换桌消息
     */
    GameMsgHandlerBase.prototype.sendChangeDeskMsg = function () {
        net.SendMsg.create({ roomType: this.gameDatas.roomInfo.createinfo.gameId }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_CHANGE_ROOM).send();
    };
    /**
     * 收到玩家离线消息
     */
    GameMsgHandlerBase.prototype.on_PLAYER_OFF_LINE = function (msg) {
        var info = this.gameDatas.playerDatas[msg.datas.playerId];
        if (info) {
            this.scene.doPlayerMethod(msg.datas.playerId, PlayerBase.prototype.setOffTip);
            info.playerFlags |= 0x1;
        }
    };
    /**
    * 收到玩家上线消息
    */
    GameMsgHandlerBase.prototype.on_PLAYER_ON_LINE = function (msg) {
        var info = this.gameDatas.playerDatas[msg.datas.playerId];
        if (info) {
            this.scene.doPlayerMethod(msg.datas.playerId, PlayerBase.prototype.removeOffTip);
            info.playerFlags = (info.playerFlags >> 1) << 1;
        }
    };
    GameMsgHandlerBase.prototype.on_G2C_ROOM_CHAT = function (msg) {
        // egret.log("on_G2C_ROOM_CHAT::" + msg.datas.playerId);
        this.scene.uiLayer.on_G2C_CHAT(msg.datas.chatStr, msg.datas.playerId);
    };
    // 收到玩家信息
    GameMsgHandlerBase.prototype.on_G2C_PLAYER_INFO = function (msg) {
        msg.datas.UserInfo.nickName = StringUtil.decodeBase64(msg.datas.UserInfo.nickName);
        var info = this.gameDatas.playerDatas[msg.datas.playerId] = msg.datas;
        //游戏局数大于0,并且playerFlags不等与-1,说明该玩家有参与游戏中,不是旁观状态,或者游戏还未正式开始
        this.gameDatas.playingList[msg.datas.playerId] = this.gameDatas.roomInfo.done_game_cnt != 0 && msg.datas.playerFlags != -1;
        if (msg.datas.playerId >= 0) {
            //判断是否是自己的玩家信息
            if (msg.datas.UserInfo.account == Global.playerDto.account) {
                this.gameDatas.myPlyerId = msg.datas.playerId;
                this.gameDatas.myPos = msg.datas.zuoweiIndex;
                // this.scene.allotPlayerPos(this.gameDatas.roomInfo.zuoweiIndex);//初始化玩家座位
                this.scene.isShowReadyMenu(!msg.datas.ready);
                this.scene.uiLayer.updateDissolveBtn();
                this.scene.updatePlayerInfo(msg.datas);
            }
            else {
                this.scene.updatePlayerInfo(msg.datas);
                this.scene.setPlayerVisible(msg.datas.playerId, true);
            }
            if (this.gameDatas.gameStatus != 6 /* SHOW_ALL */ && msg.datas.ready) {
                this.scene.setPlayerStatu(msg.datas.playerId, 2 /* READY */);
            }
            if (msg.datas.playerFlags !== -1) {
                if (msg.datas.playerFlags & 0x1) {
                    this.scene.doPlayerMethod(msg.datas.playerId, PlayerBase.prototype.setOffTip);
                }
            }
            this.scene.updatePlayerChips(msg.datas.playerId, msg.datas.chips);
        }
        if (info) {
            this.scene.doPlayerMethod(msg.datas.playerId, PlayerBase.prototype.removeOffTip);
            info.playerFlags = (info.playerFlags >> 1) << 1;
        }
    };
    GameMsgHandlerBase.prototype.on_G2C_CHONGZHI_TIPS = function (msg) {
    };
    //收到准备游戏消息
    GameMsgHandlerBase.prototype.on_G2C_READY_GAME = function (msg) {
        if (this.gameDatas.playerDatas[msg.datas.playerId]) {
            this.gameDatas.playerDatas[msg.datas.playerId].playerFlags |= 4 /* READY */;
            this.gameDatas.playerDatas[msg.datas.playerId].ready = 1;
        }
        this.scene.setPlayerStatu(msg.datas.playerId, 2 /* READY */);
        if (msg.datas.playerId == this.gameDatas.myPlyerId) {
            this.scene.isShowReadyMenu(false);
        }
        else {
            this.scene.setPlayerVisible(msg.datas.playerId, true);
        }
    };
    /*********************消息控制区域**********************/
    /**
    * 暂停处理部分消息delay毫秒
    * @param delay 要延迟的毫秒数
    */
    GameMsgHandlerBase.prototype.delayHandleMsg = function (delay) {
        egret.log("delayHandleMsg");
        this.stopHandleTimeout(); //先检查是否之前已经有定时器了,如果有,清除掉
        this._timeKey = egret.setTimeout(this.$doAllowHandleMsg, this, delay);
        // FrameManager.getInstance().delayRemoveHandler(this.hashCode);//先删除之前的延时函数
        // FrameManager.getInstance().addTimerByKey(this.hashCode, this.$doAllowHandleMsg, this, delay, 1);
        this._isStopHandleMsg = true;
    };
    GameMsgHandlerBase.prototype.stopHandleTimeout = function () {
        if (this._timeKey) {
            egret.clearTimeout(this._timeKey);
        }
    };
    /**
     * 暂停处理部分消息
     */
    GameMsgHandlerBase.prototype.stopHandleMsg = function () {
        egret.log("stopHandleMsg");
        this.stopHandleTimeout();
        // FrameManager.getInstance().delayRemoveHandler(this.hashCode);//先删除之前的延时函数
        this._isStopHandleMsg = true;
    };
    /**
     * 允许处理消息
     */
    GameMsgHandlerBase.prototype.doAllowHandleMsg = function () {
        egret.log("doAllowHandleMsg");
        // this.delayHandleMsg(0);
        this._isStopHandleMsg = false;
        net.dispatchMsg();
        this.stopHandleTimeout(); //先检查是否之前已经有定时器了,如果有,清除掉
        // //延迟到下一帧请求派发消息,防止在没有加入延迟列表的消息处理函数里面调用时造成的死循环
        // FrameManager.getInstance().addTimerByKey(this.hashCode, this.$doAllowHandleMsg, this, 0, 1);
    };
    GameMsgHandlerBase.prototype.$doAllowHandleMsg = function () {
        egret.log("$doAllowHandleMsg");
        this._isStopHandleMsg = false;
        net.dispatchMsg();
    };
    GameMsgHandlerBase.prototype.destroy = function () {
        egret.log("/----GameMsgHandlerBase Destroy!!!!!!");
        this.stopHandleTimeout();
        net.unRegisterMsgHandler(2 /* SCENE */);
    };
    /**
     * 派发消息
     */
    GameMsgHandlerBase.prototype.dispatchMsg = function (msg) {
        if (this._isStopHandleMsg && this._delayMsgList.indexOf(msg.orderId) > -1) {
            if (true) {
                egret.log("/--Delay DispatchMsg:" + this._isStopHandleMsg + ", msgName:" + OrderNameMap[msg.moduleId][msg.orderId]);
            }
            return 0 /* NONE */;
        }
        var funcName = 'on_' + OrderNameMap[msg.moduleId][msg.orderId];
        if (this[funcName]) {
            if (true) {
                egret.log("dispatchMsg:" + this._isStopHandleMsg + ", msgName:" + OrderNameMap[msg.moduleId][msg.orderId], this.hashCode);
            }
            return this[funcName](msg);
        }
        return 0 /* NONE */;
    };
    return GameMsgHandlerBase;
}(egret.HashObject));
__decorate([
    Decorators.printDatas(true)
], GameMsgHandlerBase.prototype, "on_G2C_CHIPS_UPDATE", null);
__decorate([
    Decorators.printDatas(true)
], GameMsgHandlerBase.prototype, "on_G2C_ENTER_ROOM", null);
__decorate([
    Decorators.printDatas(true)
], GameMsgHandlerBase.prototype, "on_G2C_LEAVE_ROOM", null);
__decorate([
    Decorators.printDatas(true)
], GameMsgHandlerBase.prototype, "on_G2C_DEL_SCORE_ROOM", null);
__decorate([
    Decorators.printDatas(true)
], GameMsgHandlerBase.prototype, "on_G2C_DEL_SCORE_ROOM_RES", null);
__decorate([
    Decorators.printDatas(true)
], GameMsgHandlerBase.prototype, "on_G2C_LEAVE_SCORE_ROOM", null);
__decorate([
    Decorators.printDatas(true)
], GameMsgHandlerBase.prototype, "on_G2C_PLAYER_INFO", null);
__decorate([
    Decorators.printDatas(true)
], GameMsgHandlerBase.prototype, "on_G2C_READY_GAME", null);
__reflect(GameMsgHandlerBase.prototype, "GameMsgHandlerBase", ["net.IMsgHandler"]);
//# sourceMappingURL=GameMsgHandlerBase.js.map