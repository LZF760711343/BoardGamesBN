var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var niuniu;
(function (niuniu) {
    var RoomConfigLayer = (function (_super) {
        __extends(RoomConfigLayer, _super);
        function RoomConfigLayer(str) {
            var _this = _super.call(this) || this;
            _this.str = str;
            _this._gameId = 1 /* NIUNIU */;
            _this.skinName = niuniu.RoomConfigLayerSkin;
            _this.currentState = str;
            var self = _this;
            self.zhuangGroup = self._kpqzRadio.group;
            self.subGroup = self._nnhzRadio.group;
            self.nn_level = self._levelRadio1.group;
            self._betConf = [5, 10, 15, 20, 25];
            self._scoreCBoxList = [self["_scoreCBox1"], self["_scoreCBox2"], self["_scoreCBox3"], self["_scoreCBox4"], self["_scoreCBox5"]];
            return _this;
            // this._levelConf = [{ playerCnt: 5, count: 15, cost: 10 }, { playerCnt: 5, count: 30, cost: 20 }, { playerCnt: 8, count: 15, cost: 15 }, { playerCnt: 8, count: 30, cost: 30 }];
        }
        RoomConfigLayer.prototype.selectScoreBoxCB = function (evt) {
            if (this.zhuangGroup.selectedValue == 0 /* NONE */) {
                var radioGroup = evt.target;
                if (radioGroup.selected) {
                    var length_1 = this._scoreCBoxList.length;
                    for (var i = 0; i < length_1; ++i) {
                        this._scoreCBoxList[i].selected = this._scoreCBoxList[i] == radioGroup;
                    }
                }
            }
        };
        RoomConfigLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var conf = self._levelConf;
            // for(let i=0;i<conf.length;i++){
            // 	egret.log("confconf"+conf[i].count, conf[i].cost);
            // }
            self.zhuangGroup.selectedValue = 1 + "";
            self._levelRadio1.label = GameLangs.create_room_str.format(conf[0].count, conf[0].cost);
            self._levelRadio2.label = GameLangs.create_room_str.format(conf[1].count, conf[1].cost);
            self._levelRadio3.label = GameLangs.create_room_str.format(conf[2].count, conf[2].cost);
            self._levelRadio4.label = GameLangs.create_room_str.format(conf[3].count, conf[3].cost);
            // self._tabBar.addEventListener(egret.Event.CHANGE, self.chanTab, self);
            var length = self._scoreCBoxList.length;
            for (var i = 0; i < length; ++i) {
                self._scoreCBoxList[i].addEventListener(eui.UIEvent.CHANGE, self.selectScoreBoxCB, self);
            }
            // self._fzzjRadio.value = GAME_MODE.NONE;
            self._sxlzRadio.value = 0 /* SXLZ */;
            self._njhzRadio.value = 1 /* NJHZ */;
            self._nnhzRadio.value = 2 /* NNHZ */;
            self.zhuangGroup.addEventListener(eui.UIEvent.CHANGE, self.selectGameMode, self);
            self.zhuangGroup.selectedValue = 1 /* KP */ + "";
            self.subGroup.selectedValue = 0 /* SXLZ */ + "";
            if (this.currentState == "1") {
                this.initLastInfo();
            }
        };
        // 如果有缓存，初始化
        RoomConfigLayer.prototype.initLastInfo = function () {
            var data = LocalDatas.sDatas.datas.nn_data;
            if (data != null) {
                _super.prototype.initLastInfo.call(this, data);
                for (var i = 0; i < this._scoreCBoxList.length; i++) {
                    var value = this._betConf[i];
                    this._scoreCBoxList[i].selected = data.betChips.indexOf(value) > -1;
                }
                this.zhuangGroup.selectedValue = data.roomMode + "";
                if (data.roomMode == 3) {
                    this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = true;
                }
                this.subGroup.selectedValue = "" + data.roomSubMode;
                this._levelGroup.selectedValue = data.roomLevel + "";
            }
            else {
                this._levelRadio1.selected = true;
            }
        };
        RoomConfigLayer.prototype.setInfo = function (data) {
            egret.log("data", data.createinfo);
            if (data != null) {
                this._roomGroup.touchChildren = this._roomGroup.touchEnabled = false;
                _super.prototype.setInfo.call(this, data);
                if (data.createinfo.roomMode == 3 /* LZ */) {
                    this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = true;
                    this._sxlzRadio.enabled = data.createinfo.roomSubMode == this._sxlzRadio.value;
                    this._njhzRadio.enabled = data.createinfo.roomSubMode == this._njhzRadio.value;
                    this._nnhzRadio.enabled = data.createinfo.roomSubMode == this._nnhzRadio.value;
                }
                else {
                    this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = false;
                }
                this._fzzjRadio.enabled = data.createinfo.roomMode == this._fzzjRadio.value;
                this._lzRadio.enabled = data.createinfo.roomMode == this._lzRadio.value;
                this._kpqzRadio.enabled = data.createinfo.roomMode == this._kpqzRadio.value;
                this._levelRadio3.enabled = this._levelRadio3.value == data.createinfo.roomLevel;
                this._levelRadio4.enabled = this._levelRadio4.value == data.createinfo.roomLevel;
                this.subGroup.selectedValue = "" + data.createinfo.roomSubMode;
                this.nn_level.selectedValue = data.createinfo.roomLevel + "";
                // this.zhuangGroup.selectedValue = data.createinfo.roomMode + "";
                var length = data.createinfo.betChips.length;
                var length2 = this._scoreCBoxList.length;
                for (var j = 0; j < length2; j++) {
                    this._scoreCBoxList[j].enabled = this._scoreCBoxList[j].selected = false;
                    egret.log("this._scoreCBoxList", data.createinfo);
                }
                for (var i = 0; i < length; i++) {
                    for (var j = 0; j < length2; j++) {
                        if (this._betConf[j] == data.createinfo.betChips[i]) {
                            this._scoreCBoxList[j].enabled = this._scoreCBoxList[j].selected = true;
                            break;
                        }
                    }
                }
            }
        };
        /**
         * 发送创建房间的消息
         */
        RoomConfigLayer.prototype.sendOpenRoomMsg = function () {
            var self = this;
            var length = self._scoreCBoxList.length;
            var count = 0;
            var bet_chip = [];
            var betli = [];
            for (var i = 0; i < length; i++) {
                if (self._scoreCBoxList[i].selected) {
                    count++;
                    bet_chip.push(this._betConf[i]);
                }
            }
            if (count) {
                var limitValue = 0;
                if (self._ipxzRadio.selected) {
                    limitValue = limitValue | 1 /* IP */;
                }
                // 00000011
                if (self._dlwzRadio.selected) {
                    limitValue |= 2 /* GEOLOCATION */;
                }
                var level = parseInt(this._levelGroup.selectedValue);
                var sendData = {
                    gameId: this._gameId,
                    extraLimit: limitValue,
                    // bet_cnt: count,
                    betChips: bet_chip,
                    roomLevel: level,
                    roomMode: parseInt(this.zhuangGroup.selectedValue),
                    roomSubMode: parseInt(this.subGroup.selectedValue),
                };
                net.SendMsg.create(sendData, 3 /* PLAY_GAME */, PlayGameOrder.C2G_OPEN_SCORE_ROOM).send();
                LocalDatas.sDatas.datas.nn_data = sendData;
                LocalDatas.sDatas.saveData();
            }
            else {
                Toast.launch(GameLangs.roomBetNotSelectTip);
            }
        };
        //选择庄家模式
        RoomConfigLayer.prototype.selectGameMode = function (evt) {
            var radioGroup = evt.target;
            var value = parseInt(radioGroup.selectedValue);
            switch (value) {
                case 3 /* LZ */:
                    // this._chipLabel.source = "label_c_xzxz_png";
                    this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = true;
                    break;
                case 0 /* NONE */:
                    // this._chipLabel.source = "label_c_dizhu_png";
                    var length_2 = this._scoreCBoxList.length;
                    var select = true;
                    for (var i = 0; i < length_2; i++) {
                        if (this._scoreCBoxList[i].selected && select) {
                            select = false;
                            continue;
                        }
                        this._scoreCBoxList[i].selected = false;
                    }
                    this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = false;
                    break;
                case 1 /* KP */:
                    // this._chipLabel.source = "label_c_xzxz_png";
                    this._sxlzRadio.enabled = this._njhzRadio.enabled = this._nnhzRadio.enabled = false;
                    break;
            }
            SoundManage.playEffect(SoundManage.keyMap.btnClick);
        };
        RoomConfigLayer.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            //内存泄露，清除事件绑定
            //移除选项的事件
            var length = this._scoreCBoxList.length;
            for (var i = 0; i < length; ++i) {
                this._scoreCBoxList[i].removeEventListener(eui.UIEvent.CHANGE, this.selectScoreBoxCB, this);
            }
            //移除选择抢庄模式的选项事件
            this.zhuangGroup.removeEventListener(eui.UIEvent.CHANGE, this.selectGameMode, this);
        };
        return RoomConfigLayer;
    }(Layers.RoomConfigLayerBase));
    niuniu.RoomConfigLayer = RoomConfigLayer;
    __reflect(RoomConfigLayer.prototype, "niuniu.RoomConfigLayer");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=NiuniuRoomcConfigLayer.js.map