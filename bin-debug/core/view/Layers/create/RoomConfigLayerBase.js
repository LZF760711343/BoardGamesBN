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
    var RoomConfigLayerBase = (function (_super) {
        __extends(RoomConfigLayerBase, _super);
        function RoomConfigLayerBase() {
            var _this = _super.call(this, [ResManager.GROUP_NAME.CREATEROOM]) || this;
            _this._gameId = null;
            return _this;
        }
        /**
         * 发送创建房间的消息
         */
        RoomConfigLayerBase.prototype.sendOpenRoomMsg = function () {
        };
        RoomConfigLayerBase.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var conf = self._levelConf = Config.ROOM_CONF[self._gameId];
            self._levelGroup = self._levelRadio1.group;
            self._levelRadio1.label = GameLangs.create_room_str.format(conf[0].count, conf[0].cost);
            self._levelRadio2.label = GameLangs.create_room_str.format(conf[1].count, conf[1].cost);
            self._tabber.addEventListener(egret.Event.CHANGE, this.onChange, this);
            self._levelGroup.selectedValue = 0 + "";
            self._dlwzRadio.visible = false;
        };
        RoomConfigLayerBase.prototype.onChange = function () {
            if (this._tabber.selectedIndex) {
                this._cardGorup.visible = true;
                this._roomGroup.visible = false;
            }
            else {
                this._cardGorup.visible = false;
                this._roomGroup.visible = true;
            }
        };
        RoomConfigLayerBase.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            //内存泄露，清除事件绑定
            this._tabber.removeEventListener(egret.Event.CHANGE, this.onChange, this);
        };
        RoomConfigLayerBase.prototype.sendOpenScoreRoom = function (sendData) {
            net.SendMsg.create(sendData, 3 /* PLAY_GAME */, PlayGameOrder.C2G_OPEN_SCORE_ROOM).send();
        };
        RoomConfigLayerBase.prototype.onTouchTap = function (event) {
            if (this._btnClose.hitTestPoint(event.stageX, event.stageY)) {
                this.close();
                // PopUpManager.removePopUp(<Layers.BaseLayer><any>this);
                return;
            }
        };
        RoomConfigLayerBase.prototype.initLastInfo = function (data) {
            this._ipxzRadio.selected = !!(data.extraLimit & 1 /* IP */);
            this._dlwzRadio.selected = !!(data.extraLimit & 2 /* GEOLOCATION */);
        };
        RoomConfigLayerBase.prototype.setInfo = function (data) {
            this._levelRadio2.enabled = this._levelRadio2.selected = this._levelRadio2.value == data.createinfo.roomLevel;
            this._levelRadio1.enabled = this._levelRadio1.selected = this._levelRadio1.value == data.createinfo.roomLevel;
            this._ipxzRadio.enabled = this._ipxzRadio.selected = !!(data.createinfo.extraLimit & 1 /* IP */);
            this._dlwzRadio.enabled = this._dlwzRadio.selected = !!(data.createinfo.extraLimit & 2 /* GEOLOCATION */);
            if (this._levelGroup) {
                this._levelGroup.selectedValue = data.createinfo.roomLevel + "";
            }
        };
        return RoomConfigLayerBase;
    }(Layers.BaseLayer));
    Layers.RoomConfigLayerBase = RoomConfigLayerBase;
    __reflect(RoomConfigLayerBase.prototype, "Layers.RoomConfigLayerBase");
})(Layers || (Layers = {}));
//# sourceMappingURL=RoomConfigLayerBase.js.map