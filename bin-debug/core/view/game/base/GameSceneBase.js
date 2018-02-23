var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameSceneBase = (function (_super) {
    __extends(GameSceneBase, _super);
    // public game
    function GameSceneBase(args) {
        var _this = _super.call(this) || this;
        _this.saveChip = [];
        _this.initDatas(args[0], args[1]);
        return _this;
    }
    GameSceneBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this._phoneInfoBox) {
            this._phoneInfoBox.visible = egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        }
    };
    /**
     * 换桌按钮回调
     */
    GameSceneBase.prototype.onChangeDesk = function () {
        SoundManage.playEffect("brnn_huanfang");
        this.msgHandler.sendChangeDeskMsg();
    };
    /**
     * 用于异步函数,等待多少毫秒
     */
    GameSceneBase.prototype.wait = function (delay) {
        var _this = this;
        if (this._waitTimer) {
            egret.clearTimeout(this._waitTimer);
        }
        return new Promise(function (readyFunc) {
            _this._waitTimer = egret.setTimeout(function () {
                readyFunc();
            }, _this, delay);
        });
    };
    // private 
    /**
         * 显示等待游戏开始提示条
         */
    GameSceneBase.prototype.showWaitGameStartTip = function () {
        var _tipBar = this._tipBar;
        if (!_tipBar) {
            _tipBar = this._tipBar = new niuniu.brnn.TipBar;
            _tipBar.skinName = niuniu.brnn.TipBarSkin;
            this.uiLayer.addChildAt(_tipBar, 0);
            _tipBar.verticalCenter = _tipBar.horizontalCenter = 0;
        }
        else {
            _tipBar.visible = true;
        }
        _tipBar.curState = niuniu.brnn.TipBarStatu.WAIT;
    };
    /**
     * 隐藏等待游戏开始提示条
     */
    GameSceneBase.prototype.hideWaitGameStartTip = function () {
        if (this._tipBar) {
            this._tipBar.visible = false;
            this._tipBar.curState = niuniu.brnn.TipBarStatu.NONE;
        }
    };
    /**
     * 打开用户信息页面
     */
    GameSceneBase.prototype.openUserInfoLayer = function (e, _player) {
        if (this.gameDatas && this.gameDatas.playerDatas) {
            var player = _player || e.target;
            var data = this.gameDatas.playerDatas[player.getPlayerId()];
            if (data && data.UserInfo) {
                //金币等更新时，可以及时显示改变
                if (data.UserInfo.id == Global.playerDto.id)
                    new Layers.UserInfoLayer(Global.playerDto).open();
                else
                    new Layers.UserInfoLayer(data.UserInfo).open();
            }
        }
    };
    /**
     * 初始化一些游戏数据
     * @param datas:房间的信息
     * @param gameType:游戏是金币场还是房卡模式
     */
    GameSceneBase.prototype.initDatas = function (datas, gameType) {
    };
    /**
     * 初始化
     */
    GameSceneBase.prototype.init = function () {
    };
    /**
     * 根据自己的playerId给其他人分配座位信息
     */
    GameSceneBase.prototype.allotPlayerPos = function (id) {
        var pCnt = this.gameDatas.roomInfo.createinfo.RoomSize;
        for (var i = 0; i < pCnt; i++) {
            egret.log("allotPlayerPos:", id);
            this.players[i].setPlayerId(id % pCnt);
            id++;
        }
    };
    GameSceneBase.prototype.initUI = function () {
        this.uiLayer.init(this.gameDatas, this);
        this.updateRoomInfoUI();
    };
    GameSceneBase.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
        this.msgHandler.destroy();
        if (this._waitTimer) {
            egret.clearTimeout(this._waitTimer);
            this._waitTimer = null;
        }
    };
    GameSceneBase.prototype.OpenGuajiBtn = function (guajiType, id) {
        if (id == Global.playerDto.id) {
            if (guajiType == 1) {
                this.uiLayer._guajiBtn.visible = true;
                this.uiLayer._guajiImg.visible = true;
            }
            else {
                this.uiLayer._guajiBtn.visible = false;
                this.uiLayer._guajiImg.visible = false;
            }
        }
        var length = this.gameDatas.roomInfo.createinfo.roomSize;
        for (var i = 0; i < length; i++) {
            if (this.players[i] && this.players[i].visible) {
                if (this.players[i].getPlayerId() == id) {
                    if (guajiType == 1) {
                        this.players[i]._guajiImg.visible = true;
                    }
                    else {
                        this.players[i]._guajiImg.visible = false;
                    }
                }
            }
        }
    };
    /**
     * 更新房间信息UI
     */
    GameSceneBase.prototype.updateRoomInfoUI = function () {
        var self = this;
        if (self.gameDatas.gameType == 0 /* COIN */) {
            if (self.uiLayer._ruleBtn) {
                self.uiLayer._ruleBtn.visible = true;
            }
            if (self.uiLayer._voiceBtn) {
                self.uiLayer._voiceBtn.visible = false;
            }
            if (self.uiLayer._inviteBtn) {
                self.uiLayer._inviteBtn.visible = false;
            }
            if (self.uiLayer.roomIdLab) {
                self.uiLayer.roomIdLab.visible = false;
            }
        }
        else {
            // egret.log("self.gameDatas.roomInfo.room_id" + self.gameDatas.roomInfo.room_id);
            if (self.gameDatas.roomInfo) {
                self.uiLayer.roomIdLab.text = GameLangs.gameRoomId.format(self.gameDatas.roomInfo.room_id);
                self.uiLayer.gameCntLab.text = GameLangs.gamePlayCntInfo.format(self.gameDatas.roomInfo.done_game_cnt, self.gameDatas.roomInfo.can_game_cnt);
            }
        }
    };
    GameSceneBase.prototype.openAccountLayer = function (datas) {
        this.msgHandler.stopHandleMsg();
        var layer = new Layers.AccountLayer();
        layer.open();
        layer.setDatas(datas, this.gameDatas);
        layer.addEventListener(Layers.Event.CLOSE, this.closeAccountLayer, this);
        // var blurFliter = new egret.BlurFilter(1, 1);
        // //颜色矩阵数组
        // var colorMatrix = [
        //     0.3, 0.6, 0, 0, 0,
        //     0.3, 0.6, 0, 0, 0,
        //     0.3, 0.6, 0, 0, 0,
        //     0, 0, 0, 1, 0
        // ];
        // var blurFliter = new egret.BlurFilter(5 , 5);
        // // var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        // this.filters = [blurFliter];
    };
    GameSceneBase.prototype.closeAccountLayer = function () {
        this.msgHandler.doAllowHandleMsg();
    };
    //更新玩家信息
    GameSceneBase.prototype.updatePlayerInfo = function (info) {
        if (this.gameDatas.myPos > -1) {
            var index = (this.gameDatas.roomInfo.createinfo.roomSize + info.zuoweiIndex - this.gameDatas.myPos) % this.gameDatas.roomInfo.createinfo.roomSize;
            var player = this.players[index];
            if (player) {
                player.updateInfo(info.UserInfo);
            }
            else {
                true && egret.error("Player " + info.playerId + " Is Not Exist!!!!");
            }
        }
    };
    //通过playerid获取
    GameSceneBase.prototype.getPlayerById = function (id) {
        for (var key in this.players) {
            if (this.players[key].getPlayerId() && this.players[key].getPlayerId() == id)
                return this.players[key];
        }
        return null;
    };
    //通过playerid获取性别
    GameSceneBase.prototype.getPlayerByIdSex = function (id) {
        var arrLen = Array.length;
        for (var key in this.players) {
            if (this.players[key].getPlayerId() == id) {
                return this.players[key].sex;
            }
        }
        return null;
    };
    /**
     * 设置是否显示准备菜单
     */
    GameSceneBase.prototype.isShowReadyMenu = function (visible) {
    };
    //更新玩家筹码数
    GameSceneBase.prototype.updatePlayerChips = function (id, chips, isDoAni) {
        var player = this.getPlayerById(id);
        if (player) {
            player.updateChips(chips, isDoAni);
        }
        else {
            true && egret.error("Player " + id + " Is Not Exist!!!!");
        }
    };
    /**
     * 设置用户是否可见
     */
    GameSceneBase.prototype.setPlayerVisible = function (id, visible) {
        var player = this.getPlayerById(id);
        if (player) {
            player.visible = visible;
        }
        else {
            true && egret.error("Player " + id + " Is Not Exist!!!!");
        }
    };
    //设置玩家状态
    GameSceneBase.prototype.setPlayerStatu = function (id, status) {
        var player = this.getPlayerById(id);
        if (player) {
            player.status = status;
        }
        else {
            true && egret.error("Player " + id + " Is Not Exist!!!!");
        }
    };
    GameSceneBase.prototype.doPlayerMethod = function (playerId, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var p = this.getPlayerById(playerId);
        if (p) {
            func.apply(p, args);
        }
        else {
            true && egret.error("Player " + playerId + " Is Not Exist!!!!");
        }
    };
    /**
     * 设置所有玩家的状态
     */
    GameSceneBase.prototype.setAllPlayerStatu = function (status) {
        var length = this.gameDatas.roomInfo.createinfo.roomSize;
        for (var i = 0; i < length; i++) {
            if (this.players[i] && this.players[i].visible) {
                this.players[i].status = status;
            }
        }
    };
    GameSceneBase.prototype.clearPlayer = function (id) {
        var player = this.getPlayerById(id);
        if (player) {
            player.clear();
        }
        else {
        }
    };
    return GameSceneBase;
}(BaseScene));
__reflect(GameSceneBase.prototype, "GameSceneBase");
//# sourceMappingURL=GameSceneBase.js.map