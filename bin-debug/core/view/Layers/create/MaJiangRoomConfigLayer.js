var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var majiang;
(function (majiang) {
    var RoomConfigLayer = (function (_super) {
        __extends(RoomConfigLayer, _super);
        // private _cardGorup: eui.Group;
        // private _roomGroup: eui.Group;
        // private _tabber: eui.TabBar;
        function RoomConfigLayer(str) {
            var _this = _super.call(this) || this;
            _this._gameId = 39 /* GAME_ID_GDMJ_FK */;
            _this.skinName = majiang.RoomConfigLayerSkin;
            _this.currentState = str;
            _this._levelConf = [{ playerCnt: 3, count: 8, cost: 10 }, { playerCnt: 3, count: 16, cost: 20 }, { playerCnt: 3, count: 26, cost: 30 }];
            return _this;
        }
        RoomConfigLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            this._huGroup = this._kchRadio.group;
            this._maGroup = this._2mRadio.group;
            this._guiGroup = this._wgRadio.group;
            // this.initLastInfo();
            // this._tabber.addEventListener(egret.Event.CHANGE, this.onChange, this);
            this.once(eui.UIEvent.ENTER_FRAME, this.init, this);
            // this._levelRadio3
            var conf = self._levelConf = Config.ROOM_CONF[self._gameId];
            self._levelRadio3.label = GameLangs.create_room_str.format(conf[2].count, conf[2].cost);
        };
        // private onChange() {
        //     if (this._tabber.selectedIndex) {
        //         this._cardGorup.visible = true;
        //         this._roomGroup.visible = false;
        //     } else {
        //         this._cardGorup.visible = false;
        //         this._roomGroup.visible = true;
        //     }
        // }
        RoomConfigLayer.prototype.init = function () {
            var self = this;
            var confs = self._confs = majiang.RoomConf;
            self._huGroup.selectedValue = 0 /* CHIHU_FLAG */;
            var length = confs.length;
            for (var i = 0; i < length; i++) {
                var conf = confs[i];
                var checkBox = new eui.CheckBox();
                // if (conf.defvalue)
                checkBox.selected = !!conf.defvalue;
                checkBox.skinName = RRadioButtonMjSkin;
                checkBox.label = conf.name;
                self._fanGroup.addChild(checkBox);
                if (conf.value === 512 /* WUFENG_TYPE */) {
                    checkBox.addEventListener(egret.Event.CHANGE, self.onWfChange, self);
                    ;
                }
                if (conf.value == 8 /* HUNYISE_TYPE */) {
                    this._hys2bCBox = checkBox;
                }
                if (conf.value == 128 /* SHISANYAO_TYPE */) {
                    this._shisanyao = checkBox;
                }
                if (conf.value == 512 /* WUFENG_TYPE */) {
                    this._wfbCBox = checkBox;
                }
            }
            // var group = self._wgRadio.group;
            this._guiGroup.addEventListener(eui.UIEvent.CHANGE, self.selectGuiMode, self);
            self._guiMode = 1 /* YOUGUI_PAI */;
            this.MaTypegroup = self._wmRadio.group;
            this.MaTypegroup.selectedValue = self._maMode = 2 /* MAIMA_PAI */ + "";
            this.MaTypegroup.addEventListener(eui.UIEvent.CHANGE, self.selectMaMode, self);
            self._maGroup.selectedValue = self._maCnt = 4;
            self._maGroup.addEventListener(eui.UIEvent.CHANGE, self.selectMaCnt, self);
            if (self._roomConf) {
                self.initWidthConf();
            }
            else {
                self.initLastInfo();
            }
        };
        RoomConfigLayer.prototype.initWidthConf = function () {
            this._roomGroup.touchChildren = false;
            var roomConf = this._roomConf;
            this.setRadioGroupSelectAndEnable(this._huGroup, roomConf.hufaFlag);
            var length = this._fanGroup.numChildren;
            egret.log(roomConf.hupaiType, length);
            for (var i = 0; i < length; i++) {
                var checkBox = this._fanGroup.getChildAt(i);
                checkBox.enabled = checkBox.selected = !!(this._confs[i].value & roomConf.hupaiType);
            }
            var maMode = roomConf.roomMode;
            var roomSubMode = roomConf.roomSubMode;
            if (roomConf.roomSubMode >= (2 << 4)) {
                this._mgdfTogBtn.enabled = this._mgdfTogBtn.selected = true;
                roomSubMode = roomSubMode >> 4;
            }
            else {
                this._mgdfTogBtn.enabled = false;
            }
            this._4mRadio.enabled =
                this._2mRadio.enabled = this._6mRadio.enabled = maMode == 2 /* MAIMA_PAI */;
            if (maMode == 2 /* MAIMA_PAI */) {
                this._mmRadio.enabled = this._mmRadio.selected = true;
                this._wmRadio.enabled = this._wmRadio.selected = false;
                this._4mRadio.enabled = this._2mRadio.enabled = this._6mRadio.enabled = true;
                this._4mRadio.enabled = this._4mRadio.selected = roomSubMode == this._4mRadio.value;
                this._2mRadio.enabled = this._2mRadio.selected = roomSubMode == this._2mRadio.value;
                this._6mRadio.enabled = this._6mRadio.selected = roomSubMode == this._6mRadio.value;
            }
            else {
                this._wmRadio.enabled = this._wmRadio.selected = true;
                this._mmRadio.enabled = false;
            }
            this._wgRadio.enabled = this._wgRadio.selected = roomConf.guipaiType == this._wgRadio.value;
            this._bbgRadio.enabled = this._bbgRadio.selected = roomConf.guipaiType == this._bbgRadio.value;
            this._fgRadio.enabled = this._fgRadio.selected = roomConf.guipaiType == this._fgRadio.value;
            if (roomConf.hufaFlag & 512 /* WUFENG_TYPE */) {
                this._bbgRadio.enabled = false;
            }
        };
        RoomConfigLayer.prototype.setRadioGroupSelectAndEnable = function (group, value) {
            var length = group.numRadioButtons;
            group.selectedValue = value;
            for (var i = 0; i < length; ++i) {
                var radio = group.getRadioButtonAt(i);
                radio.enabled = radio.value == value;
                egret.log("setRadioGroupSelectAndEnable:", group.$name, radio.enabled);
            }
        };
        //选择买码数
        RoomConfigLayer.prototype.selectMaCnt = function (evt) {
            var radioGroup = evt.target;
            // SoundManage.playNormalEffect('Snd_commonbtn');
            this._maCnt = radioGroup.selectedValue;
        };
        //选择买马类型模式
        RoomConfigLayer.prototype.selectMaMode = function (evt) {
            var radioGroup = evt.target;
            egret.log("selectMaMode:", radioGroup.selectedValue);
            if (radioGroup.selectedValue == 2 /* MAIMA_PAI */) {
                this._4mRadio.enabled = this._mgdfTogBtn.enabled =
                    this._2mRadio.enabled = this._6mRadio.enabled = true;
            }
            else {
                this._4mRadio.enabled = this._mgdfTogBtn.enabled =
                    this._2mRadio.enabled = this._6mRadio.enabled = false;
            }
            // SoundManage.playNormalEffect('Snd_commonbtn');
            this._maMode = radioGroup.selectedValue;
        };
        RoomConfigLayer.prototype.onWfChange = function (event) {
            var cBox = event.target;
            if (cBox.selected) {
                if (this._guiMode == 2 /* BAIBANGGUI_PAI */) {
                    this._guiMode = this._guiGroup.selectedValue = this._wgRadio.value;
                }
                this._bbgRadio.enabled = false;
                if (this._hys2bCBox) {
                    this._hys2bCBox.selected = this._hys2bCBox.enabled = false;
                }
                if (this._shisanyao) {
                    this._shisanyao.selected = this._shisanyao.enabled = false;
                }
            }
            else {
                this._bbgRadio.enabled = true;
                if (this._hys2bCBox) {
                    this._hys2bCBox.enabled = true;
                    if (LocalDatas.sDatas.datas.gdmj_data) {
                        this._hys2bCBox.selected = !!(LocalDatas.sDatas.datas.gdmj_data.hupaiType & 8 /* HUNYISE_TYPE */);
                    }
                    else {
                        this._hys2bCBox.selected = true;
                    }
                }
                if (this._shisanyao) {
                    this._shisanyao.enabled = true;
                    if (LocalDatas.sDatas.datas.gdmj_data) {
                        this._shisanyao.selected = !!(LocalDatas.sDatas.datas.gdmj_data.hupaiType & 8 /* HUNYISE_TYPE */);
                    }
                    else {
                        this._shisanyao.selected = true;
                    }
                }
            }
        };
        //选择鬼牌类型
        RoomConfigLayer.prototype.selectGuiMode = function (evt) {
            var radioGroup = evt.target;
            // SoundManage.playNormalEffect('Snd_commonbtn');
            // this._guiMode = radioGroup.selectedValue;
            // if (this._guiMode == GDMJ_GUI_MODE.BAIBANGGUI_PAI) {//如果有白板鬼,那么无风的选项变灰
            //     if (this._wfbCBox) {
            //         this._wfbCBox.selected = this._wfbCBox.enabled = false;
            //     }
            // } else {
            //     if (!this._wfbCBox.enabled) {
            //         this._wfbCBox.enabled = true;
            //         if (LocalDatas.sDatas.datas.gdmj_data) {
            //             this._wfbCBox.selected = !!(LocalDatas.sDatas.datas.gdmj_data.hupaiType & GDMJ_FAN.WUFENG_TYPE);
            //         } else {
            //             this._wfbCBox.selected = true;
            //         }
            //     }
            // }
        };
        // 如果有缓存，初始化
        RoomConfigLayer.prototype.initLastInfo = function () {
            var data = LocalDatas.sDatas.datas.gdmj_data;
            if (data != null) {
                _super.prototype.initLastInfo.call(this, data);
                // this._roundMaxGroup.selectedValue = data.roundMax + "";
                // this._addChipsMaxGroup.selectedValue = data.addChipsMax + "";
                this._levelGroup.selectedValue = data.roomLevel + "";
                // this.setRadioGroupSelectAndEnable(this._huGroup, data.hufaFlag);
                var length = this._huGroup.numRadioButtons;
                this._huGroup.selectedValue = data.hufaFlag;
                for (var i = 0; i < length; ++i) {
                    var radio = this._huGroup.getRadioButtonAt(i);
                    radio.value == data.hufaFlag;
                }
                var confs = this._confs = majiang.RoomConf;
                var length = this._fanGroup.numChildren;
                egret.log(data.hupaiType, length);
                for (var i = 0; i < length; i++) {
                    var checkBox = this._fanGroup.getChildAt(i);
                    checkBox.selected = !!(this._confs[i].value & data.hupaiType);
                    var conf = confs[i];
                    if (conf.value === 512 /* WUFENG_TYPE */) {
                        if (!!(this._confs[i].value & data.hupaiType)) {
                            if (this._guiMode == 2 /* BAIBANGGUI_PAI */) {
                                this._guiMode = this._guiGroup.selectedValue = this._wgRadio.value;
                            }
                            this._bbgRadio.enabled = false;
                            if (this._hys2bCBox) {
                                this._hys2bCBox.selected = this._hys2bCBox.enabled = false;
                            }
                            if (this._shisanyao) {
                                this._shisanyao.selected = this._shisanyao.enabled = false;
                            }
                        }
                    }
                }
                var maMode = data.roomMode;
                var roomSubMode = data.roomSubMode;
                if (data.roomSubMode >= (2 << 4)) {
                    this._mgdfTogBtn.selected = true;
                    roomSubMode = roomSubMode >> 4;
                }
                else {
                }
                // this._4mRadio.enabled =
                //     this._2mRadio.enabled = this._6mRadio.enabled = maMode == GDMJ_MA_MODE.MAIMA_PAI;
                if (maMode == 2 /* MAIMA_PAI */) {
                    this._mmRadio.selected = true;
                    this._wmRadio.selected = false;
                    //    this._2mRadio.enabled = this._6mRadio.enabled = true;
                    this._4mRadio.selected = roomSubMode == this._4mRadio.value;
                    this._2mRadio.selected = roomSubMode == this._2mRadio.value;
                    this._6mRadio.selected = roomSubMode == this._6mRadio.value;
                }
                else {
                    this._wmRadio.selected = true;
                    this._2mRadio.enabled = this._6mRadio.enabled = this._4mRadio.enabled = this._mgdfTogBtn.enabled = false;
                }
                this._wgRadio.selected = data.guipaiType == this._wgRadio.value;
                this._bbgRadio.selected = data.guipaiType == this._bbgRadio.value;
                this._fgRadio.selected = data.guipaiType == this._fgRadio.value;
                if (data.hufaFlag & 512 /* WUFENG_TYPE */) {
                    this._bbgRadio.enabled = false;
                }
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
            var fan = 0;
            for (var i = self._fanGroup.numChildren - 1; i > -1; --i) {
                var checkBox = this._fanGroup.getChildAt(i);
                if (checkBox.selected) {
                    fan += this._confs[i].value;
                }
            }
            var level = parseInt(this._levelGroup.selectedValue);
            var huGroup = parseInt(this._huGroup.selectedValue);
            var guiGroup = parseInt(this._guiGroup.selectedValue);
            var maGroup = parseInt(this._maGroup.selectedValue);
            var MaTypegroup = parseInt(this.MaTypegroup.selectedValue);
            if (maGroup != 1 /* WUMA_PAI */ && this._mgdfTogBtn.selected) {
                maGroup = maGroup << 4;
            }
            egret.log("MaTypegroup", MaTypegroup);
            var sendData = {
                gameId: this._gameId,
                extraLimit: limitValue,
                roomLevel: level,
                hufaFlag: huGroup,
                hupaiType: fan,
                guipaiType: guiGroup,
                roomMode: MaTypegroup,
                roomSubMode: maGroup,
            };
            net.SendMsg.create(sendData, 3 /* PLAY_GAME */, PlayGameOrder.C2G_OPEN_SCORE_ROOM).send();
            // LocalDatas.sDatas.datas = sendData;
            LocalDatas.sDatas.datas.gdmj_data = sendData;
            LocalDatas.sDatas.saveData();
        };
        RoomConfigLayer.prototype.setInfo = function (data) {
            _super.prototype.setInfo.call(this, data);
            this._roomConf = data.createinfo;
            this._levelRadio3.enabled = this._levelRadio3.selected = this._levelRadio3.value == data.createinfo.roomLevel;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        RoomConfigLayer.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            //内存泄露，清除事件绑定
            this._guiGroup.removeEventListener(eui.UIEvent.CHANGE, this.selectGuiMode, this);
            this.MaTypegroup.removeEventListener(eui.UIEvent.CHANGE, this.selectMaMode, this);
            this._maGroup.removeEventListener(eui.UIEvent.CHANGE, this.selectMaCnt, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            //移除chekbox上的事件
            for (var i = 0; i < this._fanGroup.numChildren; i++) {
                this._fanGroup.getChildAt(i).removeEventListener(egret.Event.CHANGE, this.onWfChange, this);
            }
        };
        return RoomConfigLayer;
    }(Layers.RoomConfigLayerBase));
    majiang.RoomConfigLayer = RoomConfigLayer;
    __reflect(RoomConfigLayer.prototype, "majiang.RoomConfigLayer");
})(majiang || (majiang = {}));
//# sourceMappingURL=MaJiangRoomConfigLayer.js.map