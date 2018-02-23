var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layers;
(function (Layers) {
    /**
     *
     * @author He
     * 解散房间页面
     *
     */
    var DissolveLayer = (function (_super) {
        __extends(DissolveLayer, _super);
        function DissolveLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = DissolveRoomSkin;
            return _this;
        }
        DissolveLayer.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            if (this._cTime) {
                this._cTime.stop();
            }
        };
        DissolveLayer.prototype.onTimer = function (value) {
            this._label0.text = GameLangs.dissolveTip1.format(3, value);
        };
        /**
         * 倒计时完成
         */
        DissolveLayer.prototype.complete = function () {
            if (this.currentState === "choice") {
                this.sendDelScoreRoom(1);
            }
        };
        // public setState(state:string){
        //     // dissolve,tip,dissolving,ownertip
        //     this.currentState = state;
        //     switch(state){
        //         case "dissolving"://已经做出决定,等待其他人做决定的状态
        //             break;
        //         case "tip"://点击解散房间按钮后,确认是否解散的状态
        //             this._label0.text = GameLangs.dissolveTip3;
        //             break;
        //         case "ownertip"://房主在还未开始游戏之前点击解散房间按钮后,弹出的确认是否解散的状态
        //             this._label0.text = GameLangs.dissolveTip2;
        //             break;
        //         case "dissolve"://在别人申请了解散房间后,确认是否同意解散房间的状态
        //             break;
        //     }
        // }
        /**
         * 同意解散房间
         */
        DissolveLayer.prototype.onAgree = function () {
            switch (this.currentState) {
                case "tip": //点击解散房间按钮后,确认是否解散的状态
                case "ownertip": //房主在还未开始游戏之前点击解散房间按钮后,弹出的确认是否解散的状态
                case "twoniu":
                case "liner":
                case "deduc":
                    this.sendLeaveScoreRoom();
                    break;
                case "choice":
                    this.sendDelScoreRoom(1);
                    break;
            }
        };
        /**
         * 收到一个G2C_DEL_SCORE_ROOM更新一次数据
         */
        DissolveLayer.prototype.updateData = function (result, playerId) {
            var item = Utils.getItemByKey(this._list, "playerId", playerId);
            item.result = result;
            this.updateUI();
            // this._list
        };
        /**
         * 初始化数据,刚开始所有人的状态都是等待状态
         * 每收到一个G2C_DEL_SCORE_ROOM更新一次数据
         */
        DissolveLayer.prototype.initData = function (originatorData, otherDatas) {
            // dissolveTip4
            this._label1.text = GameLangs.dissolveTip4.format(originatorData.UserInfo.nickName);
            var list = this._list = [];
            var arrLen = otherDatas.length;
            for (var i = 0; i < arrLen; i++) {
                list[i] = { result: 0, nickName: otherDatas[i].UserInfo.nickName, playerId: otherDatas[i].playerId };
            }
            this.updateUI();
            this.startTimer(180);
            this.onTimer(180);
        };
        /**
         * 刷新UI
         */
        DissolveLayer.prototype.updateUI = function () {
            //排序,将同意的数据排在前面
            this._list.sort(function (a, b) {
                return b.result - a.result;
            });
            var arrLen = this._group.numChildren;
            for (var i = 0; i < arrLen; i++) {
                var label = this._group.getChildAt(i);
                if (this._list[i]) {
                    label.text = GameLangs["dissolveTipResult" + this._list[i].result].format(this._list[i].nickName);
                    label.visible = true;
                }
                else {
                    label.visible = false;
                }
            }
        };
        DissolveLayer.prototype.sendLeaveScoreRoom = function () {
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_LEAVE_SCORE_ROOM).send();
        };
        /**
         * 发送投票消息给服务器
         * @param voteRes:0为拒绝解散房间,1为同意解散房间
         */
        DissolveLayer.prototype.sendDelScoreRoom = function (voteRes) {
            net.SendMsg.create({ voteRes: voteRes }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_DEL_SCORE_ROOM).send();
        };
        /**
         * 拒绝解散房间
         */
        DissolveLayer.prototype.onRefuse = function () {
            this.sendDelScoreRoom(0);
        };
        // private
        DissolveLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._btnRefuse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRefuse, this);
            this._btnAgree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgree, this);
        };
        return DissolveLayer;
    }(Layers.BaseLayer));
    Layers.DissolveLayer = DissolveLayer;
    __reflect(DissolveLayer.prototype, "Layers.DissolveLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=DissolveLayer.js.map