var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SZP;
(function (SZP) {
    var RoomConfigLayer = (function (_super) {
        __extends(RoomConfigLayer, _super);
        function RoomConfigLayer(str) {
            var _this = _super.call(this) || this;
            _this._gameId = 10 /* ZJH */;
            _this.skinName = SZP.RoomConfigLayerSkin;
            _this.currentState = str;
            var self = _this;
            self._roundMaxGroup = self._radioButton10.group;
            self._addChipsMaxGroup = self._radioButton5f.group;
            self._roundMaxGroup.selectedValue = 10 + "";
            self._addChipsMaxGroup.selectedValue = 5 + "";
            return _this;
            // this._levelConf = [{ playerCnt: 3, count: 8, cost: 10 }, { playerCnt: 3, count: 16, cost: 20 }];
        }
        RoomConfigLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (this.currentState === "1") {
                this.initLastInfo();
            }
        };
        // 如果有缓存，初始化
        RoomConfigLayer.prototype.initLastInfo = function () {
            var data = LocalDatas.sDatas.datas.zjh_data;
            if (data != null) {
                _super.prototype.initLastInfo.call(this, data);
                this._roundMaxGroup.selectedValue = data.roundMax + "";
                this._addChipsMaxGroup.selectedValue = data.addChipsMax + "";
                this._levelGroup.selectedValue = data.roomLevel + "";
            }
        };
        /**
         * 发送创建房间的消息
         */
        RoomConfigLayer.prototype.sendOpenRoomMsg = function () {
            var self = this;
            var limitValue = 0;
            if (self._ipxzRadio.selected) {
                limitValue = limitValue | 1 /* IP */;
            }
            // 00000011
            if (self._dlwzRadio.selected) {
                limitValue |= 2 /* GEOLOCATION */;
            }
            var level = parseInt(this._levelGroup.selectedValue);
            var _roundMax = parseInt(this._roundMaxGroup.selectedValue);
            var _addChipsMax = parseInt(this._addChipsMaxGroup.selectedValue);
            var sendData = {
                gameId: this._gameId,
                extraLimit: limitValue,
                roomLevel: level,
                roundMax: _roundMax,
                addChipsMax: _addChipsMax //加注封顶 5 10 20
            };
            net.SendMsg.create(sendData, 3 /* PLAY_GAME */, PlayGameOrder.C2G_OPEN_SCORE_ROOM).send();
            LocalDatas.sDatas.datas.zjh_data = sendData;
            LocalDatas.sDatas.saveData();
        };
        RoomConfigLayer.prototype.setInfo = function (data) {
            if (data != null) {
                _super.prototype.setInfo.call(this, data);
                this._roomGroup.touchChildren = this._roomGroup.touchEnabled = false;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                this._radioButton10.enabled = this._radioButton10.value == data.createinfo.roundMax;
                this._radioButton15.enabled = this._radioButton15.value == data.createinfo.roundMax;
                this._radioButton20.enabled = this._radioButton20.value == data.createinfo.roundMax;
                this._radioButton5f.enabled = this._radioButton5f.value == data.createinfo.addChipsMax;
                this._radioButton10f.enabled = this._radioButton10f.value == data.createinfo.addChipsMax;
                this._radioButton20f.enabled = this._radioButton20f.value == data.createinfo.addChipsMax;
                this._levelRadio3.enabled = this._levelRadio3.selected = this._levelRadio3.value == data.createinfo.roomLevel;
                // this._levelGroup.selectedValue = data.createinfo.roomLevel + "";
                this._addChipsMaxGroup.selectedValue = data.createinfo.addChipsMax + "";
                this._roundMaxGroup.selectedValue = data.createinfo.roundMax + "";
            }
        };
        RoomConfigLayer.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            //内存泄露，清除事件绑定
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        return RoomConfigLayer;
    }(Layers.RoomConfigLayerBase));
    SZP.RoomConfigLayer = RoomConfigLayer;
    __reflect(RoomConfigLayer.prototype, "SZP.RoomConfigLayer");
})(SZP || (SZP = {}));
//# sourceMappingURL=SZPRoomConfigLayer.js.map