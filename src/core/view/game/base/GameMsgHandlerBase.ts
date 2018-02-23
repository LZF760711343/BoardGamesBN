/**
 * 处理游戏协议的基类
 */
class GameMsgHandlerBase extends egret.HashObject implements net.IMsgHandler {
    public gameDatas: GameDatasBase;
    public scene: GameSceneBase;
    protected _delayMsgList: PlayGameOrder[];//需要暂停处理的消息列表
    protected _isStopHandleMsg: boolean = false;//是否暂停处理消息
    protected _timeKey: number;
    public constructor(scene: GameSceneBase, gameDatas: GameDatasBase) {
        super();
        this.gameDatas = gameDatas;
        this.scene = scene;
        this._delayMsgList = [
            PlayGameOrder.G2C_LEAVE_ROOM,
            PlayGameOrder.G2C_READY_GAME,
            PlayGameOrder.G2C_PLAYER_INFO,
            PlayGameOrder.G2C_CHIPS_UPDATE,
            PlayGameOrder.G2C_SEND_CARDS,
            PlayGameOrder.G2C_SCORE_ROOM_HIS,
            // PlayGameOrder.G2C_LEAVE_SCORE_ROOM,
            // PlayGameOrder.G2C_DEL_SCORE_ROOM,
            // PlayGameOrder.G2C_DEL_SCORE_ROOM_RES,
        ];
        net.registerMsgHandler(net.MSG_LEVEL.SCENE, this);
    }
    protected checkProtocols() {
        let igList = [
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
        let str1: string = "";
        let str2: string = "";
        for (let key in this) {
            if (typeof this[key] === "function" && key.indexOf("on_G2C") > -1) {
                let name = key.slice(3);
                if (igList.indexOf(PlayGameOrder[name]) > -1) {
                    continue;
                }
                if (this._delayMsgList.indexOf(PlayGameOrder[name]) === -1) {
                    str1 += ",PlayGameOrder." + name;
                }
            }
        }
        egret.warn("checkProtocols:", str1);
    }
    /**********************发送消息区域**********************/
    //发送准备游戏消息
    public sendReadyGame() {
        net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_READY_GAME).send();
    }
    /**
     * 发送离开房间消息
     */
    public sendLeaveScoreRoom() {
        net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_LEAVE_SCORE_ROOM).send();
    }
    /**********************接收到的消息处理区域**********************/
    /**
    * 更新筹码
    */
    @Decorators.printDatas(DEBUG)
    protected on_G2C_CHIPS_UPDATE(msg: net.ReceiveMsg<model.ChipsUpdateInfo>) {
        if (this.gameDatas.gameType == GAME_TYPE.COIN) {
            this.gameDatas.playerDatas[msg.datas.playerId].UserInfo.gold = msg.datas.updateChips;
        }
        this.gameDatas.playerDatas[msg.datas.playerId].chips = msg.datas.updateChips;
        if (Global.playerDto.id == msg.datas.playerId && this.gameDatas.gameType == GAME_TYPE.COIN) {
            Global.playerDto.gold = msg.datas.updateChips;
        }

    }
    private on_G2C_UPDATE_PLAYER_NIUKA(msg: net.ReceiveMsg<{ niukaCount: number, result: number }>) {
        // egret.log("on_G2C_UPDATE_PLAYER_NIUKA111");
        let layers: Layers.RechargeLayer = Layers.getLayer(Layers.RechargeLayer);
        if (layers) {
            layers.updateLabel();
        }
        Global.playerDto.niukaCount = msg.datas.niukaCount;
    }
    @Decorators.printDatas(DEBUG)
    private on_G2C_ENTER_ROOM(msg: net.ReceiveMsg<model.EnterScoreRoomInfo<any>>) {
        SceneManager.runScene(msg.datas.createinfo.gameId, (scene: GameSceneBase) => {
            scene.init();
        }, null, msg.datas, GAME_TYPE.COIN);
        Global.enterRoomId = null;
    }
    /**
     * 收到离开房间的消息
     */
    @Decorators.printDatas(DEBUG)
    protected on_G2C_LEAVE_ROOM(msg: net.ReceiveMsg<model.LeaveRoomInfo>) {
        if (msg.datas.UserName == Global.playerDto.account) {
            if (msg.datas.leaveType !== 1) {
                SceneManager.runScene(GAME_ID.SELECT, (scene: SelectScene) => {
                    scene.currentState = "hall";
                    if (msg.datas.gameId == GAME_ID.DDZ || msg.datas.gameId == GAME_ID.GOLD_DDZ) {
                        scene._game = GAME_ID.DDZ;
                        scene._valGame_ID = GAME_ID.GOLD_DDZ;
                        scene._selectRoomFastStart.init(scene._valGame_ID, scene._game);
                    } else if (msg.datas.gameId == GAME_ID.ZJH || msg.datas.gameId == GAME_ID.GOLD_ZJH) {
                        scene._game = GAME_ID.ZJH;
                        scene._valGame_ID = GAME_ID.GOLD_ZJH;
                        scene._selectRoomFastStart.init(scene._valGame_ID, scene._game);
                    } else if (msg.datas.gameId == GAME_ID.NIUNIU || msg.datas.gameId == GAME_ID.QZNN) {
                        scene._game = GAME_ID.NIUNIU;
                        scene._valGame_ID = GAME_ID.QZNN;
                        scene._selectRoomFastStart.init(scene._valGame_ID, scene._game);
                    }
                });
                net.removeMsgBeforeMsg(net.MSG_LEVEL.SCENE, ModuleInfo.PLAY_GAME, PlayGameOrder.G2C_LEAVE_ROOM);
                return net.DIS_RESULT.STOP;
            }
        } else {
            this.scene.clearPlayer(msg.datas.playerId);
            delete this.gameDatas.playingList[msg.datas.playerId];
            delete this.gameDatas.playerDatas[msg.datas.playerId];
        }
    }

    protected on_G2C_GUAJI_TYPE(msg: net.ReceiveMsg<{ guajiType: number, playerId: number }>) {
        this.scene.OpenGuajiBtn(msg.datas.guajiType, msg.datas.playerId);
    }

    @Decorators.printDatas(DEBUG)
    protected on_G2C_DEL_SCORE_ROOM(msg: net.ReceiveMsg<model.DelScoreRoomInfo>) {
        let layer: Layers.DissolveLayer = Layers.getLayer(Layers.DissolveLayer);
        if (layer) {
            layer.updateData(1, msg.datas.playerId);
            if (this.gameDatas.isSelfId(msg.datas.playerId)) {
                layer.currentState = "waiting";
            }
        }
    }
    /**
     * 解散房间最终结果
     */
    @Decorators.printDatas(DEBUG)
    protected on_G2C_DEL_SCORE_ROOM_RES(msg: net.ReceiveMsg<model.DelScoreRoomResInfo>) {

        if (msg.datas.voteRes == 0) {//关闭房间失败
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
        } else {//关闭房间成功
            for (var i = 0; i < msg.datas.playerStateList.length; i++) {
                msg.datas.playerStateList[i].nickName = StringUtil.decodeBase64(msg.datas.playerStateList[i].nickName);
                if (msg.datas.playerStateList[i].leaveType == 3) {
                    str = GameLangs.close_score_room_tips.format(msg.datas.playerStateList[i].nickName, this.gameDatas.roomInfo.room_id);
                }
            }
            // this.doAllowHandleMsg();
        }
        Toast.launch(str);
        Layers.closeLayer(Layers.DissolveLayer);
    }
    /**
     * 收到解散
     */
    @Decorators.printDatas(DEBUG)
    protected on_G2C_LEAVE_SCORE_ROOM(msg: net.ReceiveMsg<model.LeaveScoreRoomInfo>) {
        if (msg.datas.errorValue === 0) {//直接离开房间
            SceneManager.runScene(GAME_ID.SELECT);
        } else {//否则的话弹出解散房间面板
            // if (this.gameDatas.isSelfPlayingGame()) {
            let layer: Layers.DissolveLayer = Layers.getLayer(Layers.DissolveLayer);
            //获取所有游戏中的人,只有游戏中的人才有投票解散房间的权限
            let players = [];
            for (let key in this.gameDatas.playerDatas) {
                players.push(this.gameDatas.playerDatas[key]);
            }
            //拿到解散房间的发起者的玩家信息
            let originatorData = Utils.removeItemByKey(players, "playerId", msg.datas.playerId)[0];

            if (layer) {//如果解散房间面板已经存在了,说明是发起解散房间的人或者已经做过决定的人将当前皮肤状态设置为等待其他人做决定的状态
                layer.currentState = "waiting";
            } else {
                layer = new Layers.DissolveLayer();
                if (this.gameDatas.isSelfId(msg.datas.playerId)) {
                    layer.currentState = "waiting";
                } else {
                    layer.currentState = "choice";
                }
                layer.open();
            }
            layer.initData(originatorData, players);
        }
    }
    /**
     * 收到最终结算消息
     */
    protected on_G2C_SCORE_ROOM_HIS(msg: net.ReceiveMsg<model.GameAccountInfo>) {
        if (this.gameDatas.roomInfo.createinfo.gameId !== GAME_ID.GAME_ID_TWOMAN_QZNN) {
            if (this.gameDatas.roomInfo.done_game_cnt > 0) {
                let arrLen = msg.datas.playerMsg.length;
                let isShow = false;
                for (let i = 0; i < arrLen; i++) {
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

    }
    /**
     * 发送换桌消息
     */
    public sendChangeDeskMsg() {
        net.SendMsg.create({ roomType: this.gameDatas.roomInfo.createinfo.gameId }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_CHANGE_ROOM).send();
    }
    /**
     * 收到玩家离线消息
     */
    protected on_PLAYER_OFF_LINE(msg: net.ReceiveMsg<{ result: number, playerId: number }>) {
        let info = this.gameDatas.playerDatas[msg.datas.playerId];
        if (info) {
            this.scene.doPlayerMethod(msg.datas.playerId, PlayerBase.prototype.setOffTip);
            info.playerFlags |= 0x1;
        }
    }
    /**
    * 收到玩家上线消息
    */
    protected on_PLAYER_ON_LINE(msg: net.ReceiveMsg<{ result: number, playerId: number }>) {
        let info = this.gameDatas.playerDatas[msg.datas.playerId];
        if (info) {
            this.scene.doPlayerMethod(msg.datas.playerId, PlayerBase.prototype.removeOffTip);
            info.playerFlags = (info.playerFlags >> 1) << 1;
        }
    }
    protected on_G2C_ROOM_CHAT(msg: net.ReceiveMsg<model.ROOM_CHAT>) {
        // egret.log("on_G2C_ROOM_CHAT::" + msg.datas.playerId);
        this.scene.uiLayer.on_G2C_CHAT(msg.datas.chatStr, msg.datas.playerId);
    }

    // 收到玩家信息
    @Decorators.printDatas(DEBUG)
    protected on_G2C_PLAYER_INFO(msg: net.ReceiveMsg<model.PLAYER_INFO>) {
        msg.datas.UserInfo.nickName = StringUtil.decodeBase64(msg.datas.UserInfo.nickName);
        let info = this.gameDatas.playerDatas[msg.datas.playerId] = msg.datas;
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
            } else {
                this.scene.updatePlayerInfo(msg.datas);
                this.scene.setPlayerVisible(msg.datas.playerId, true);
            }
            if (this.gameDatas.gameStatus != GAME_STAGE.SHOW_ALL && msg.datas.ready) {
                this.scene.setPlayerStatu(msg.datas.playerId, PLAYER_UI_STATU.READY);
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

    }
    protected on_G2C_CHONGZHI_TIPS(msg: net.ReceiveMsg<{ result: number, content: string }>) {

    }
    //收到准备游戏消息
    @Decorators.printDatas(DEBUG)
    protected on_G2C_READY_GAME(msg: net.ReceiveMsg<{ playerId: number }>) {
        if (this.gameDatas.playerDatas[msg.datas.playerId]) {
            this.gameDatas.playerDatas[msg.datas.playerId].playerFlags |= PLAYER_STATU.READY;
            this.gameDatas.playerDatas[msg.datas.playerId].ready = 1;
        }
        this.scene.setPlayerStatu(msg.datas.playerId, PLAYER_UI_STATU.READY);
        if (msg.datas.playerId == this.gameDatas.myPlyerId) {
            this.scene.isShowReadyMenu(false);
        } else {
            this.scene.setPlayerVisible(msg.datas.playerId, true);
        }
    }
    /*********************消息控制区域**********************/
    /**
    * 暂停处理部分消息delay毫秒
    * @param delay 要延迟的毫秒数
    */
    public delayHandleMsg(delay: number) {
        egret.log("delayHandleMsg")
        this.stopHandleTimeout();//先检查是否之前已经有定时器了,如果有,清除掉
        this._timeKey = egret.setTimeout(this.$doAllowHandleMsg, this, delay);
        // FrameManager.getInstance().delayRemoveHandler(this.hashCode);//先删除之前的延时函数
        // FrameManager.getInstance().addTimerByKey(this.hashCode, this.$doAllowHandleMsg, this, delay, 1);
        this._isStopHandleMsg = true;
    }
    public stopHandleTimeout() {
        if (this._timeKey) {
            egret.clearTimeout(this._timeKey);
        }
    }
    /**
     * 暂停处理部分消息
     */
    public stopHandleMsg() {
        egret.log("stopHandleMsg")
        this.stopHandleTimeout();
        // FrameManager.getInstance().delayRemoveHandler(this.hashCode);//先删除之前的延时函数
        this._isStopHandleMsg = true;
    }
    /**
     * 允许处理消息
     */
    public doAllowHandleMsg() {
        egret.log("doAllowHandleMsg");
        // this.delayHandleMsg(0);
        this._isStopHandleMsg = false;
        net.dispatchMsg();
        this.stopHandleTimeout();//先检查是否之前已经有定时器了,如果有,清除掉
        // //延迟到下一帧请求派发消息,防止在没有加入延迟列表的消息处理函数里面调用时造成的死循环
        // FrameManager.getInstance().addTimerByKey(this.hashCode, this.$doAllowHandleMsg, this, 0, 1);

    }
    private $doAllowHandleMsg() {
        egret.log("$doAllowHandleMsg");
        this._isStopHandleMsg = false;
        net.dispatchMsg();
    }
    public destroy() {
        egret.log("/----GameMsgHandlerBase Destroy!!!!!!");
        this.stopHandleTimeout();
        net.unRegisterMsgHandler(net.MSG_LEVEL.SCENE);
    }
    /**
     * 派发消息
     */
    public dispatchMsg(msg: net.ReceiveMsg<any>): net.DIS_RESULT {

        if (this._isStopHandleMsg && this._delayMsgList.indexOf(msg.orderId) > -1) {//如果需要暂停处理,并且该消息在暂停列表里面,不处理消息
            if (DEBUG) {
                egret.log("/--Delay DispatchMsg:" + this._isStopHandleMsg + ", msgName:" + OrderNameMap[msg.moduleId][msg.orderId])
            }
            return net.DIS_RESULT.NONE;
        }
        var funcName = 'on_' + OrderNameMap[msg.moduleId][msg.orderId];

        if (this[funcName]) {
            if (DEBUG) {
                egret.log("dispatchMsg:" + this._isStopHandleMsg + ", msgName:" + OrderNameMap[msg.moduleId][msg.orderId], this.hashCode)
            }
            return this[funcName](msg);
        }
        return net.DIS_RESULT.NONE;
    }


}