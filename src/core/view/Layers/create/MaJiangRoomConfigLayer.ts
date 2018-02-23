module majiang {
    export class RoomConfigLayer extends Layers.RoomConfigLayerBase {
        //鬼牌----------------------------
        private _wgRadio: eui.RadioButton;//无鬼
        private _bbgRadio: eui.RadioButton;//白板鬼
        private _fgRadio: eui.RadioButton;//翻鬼
        private _guiGroup: eui.RadioButtonGroup;
        //马牌------------------------
        private _wmRadio: eui.RadioButton;//无马
        private _mmRadio: eui.RadioButton;//买马
        private _mgdfTogBtn: eui.ToggleButton;//马跟底分
        private _2mRadio: eui.RadioButton;//买2马
        private _4mRadio: eui.RadioButton;//买4马
        private _6mRadio: eui.RadioButton;//买6马
        private _maGroup: eui.RadioButtonGroup;
        private MaTypegroup: eui.RadioButtonGroup;

        private _kchRadio: eui.RadioButton;//可吃胡
        private _jhzmRadio: eui.RadioButton;//鸡胡自摸
        private _zmRadio: eui.RadioButton;//自摸
        private _huGroup: eui.RadioButtonGroup;

        private _hys2bCBox: eui.CheckBox;
        //十三幺
        private _shisanyao: eui.CheckBox;
        private _wfbCBox: eui.CheckBox;

        private _fanGroup: eui.Group;//番数按钮组

        private _guiMode: number;
        private _roomConf: model.OPEN_SCORE_ROOM_GDMJ;

        private _maMode: string;
        private _maCnt: number;
        private _confs: { value: number, name: string, defvalue: number }[];

        public _levelRadio3: eui.RadioButton;
        // private _cardGorup: eui.Group;
        // private _roomGroup: eui.Group;
        // private _tabber: eui.TabBar;

        public constructor(str: string) {
            super();
            this._gameId = GAME_ID.GAME_ID_GDMJ_FK;
            this.skinName = RoomConfigLayerSkin;
            this.currentState = str;
            this._levelConf = [{ playerCnt: 3, count: 8, cost: 10 }, { playerCnt: 3, count: 16, cost: 20 }, { playerCnt: 3, count: 26, cost: 30 }];
        }

        protected childrenCreated(): void {
            super.childrenCreated();
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
        }

        // private onChange() {
        //     if (this._tabber.selectedIndex) {
        //         this._cardGorup.visible = true;
        //         this._roomGroup.visible = false;
        //     } else {
        //         this._cardGorup.visible = false;
        //         this._roomGroup.visible = true;
        //     }
        // }


        public init() {
            var self = this;
            var confs = self._confs = RoomConf;
            self._huGroup.selectedValue = GDMJ_HU_MODE.CHIHU_FLAG;
            var length = confs.length;
            for (var i = 0; i < length; i++) {
                let conf = confs[i];
                var checkBox = new eui.CheckBox();
                // if (conf.defvalue)
                checkBox.selected = !!conf.defvalue;
                checkBox.skinName = RRadioButtonMjSkin;
                checkBox.label = conf.name;
                self._fanGroup.addChild(checkBox);
                if (conf.value === GDMJ_FAN.WUFENG_TYPE) {
                    checkBox.addEventListener(egret.Event.CHANGE, self.onWfChange, self);;
                    // checkBox.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=>{
                    //     checkBox.removeEventListener(egret.Event.CHANGE, self.onWfChange, self);;
                    // }, self);
                }
                if (conf.value == GDMJ_FAN.HUNYISE_TYPE) {
                    this._hys2bCBox = checkBox;
                }
                if (conf.value == GDMJ_FAN.SHISANYAO_TYPE) {
                    this._shisanyao = checkBox;
                }
                if (conf.value == GDMJ_FAN.WUFENG_TYPE) {
                    this._wfbCBox = checkBox;
                }
            }

            // var group = self._wgRadio.group;
            this._guiGroup.addEventListener(eui.UIEvent.CHANGE, self.selectGuiMode, self);
            self._guiMode = GDMJ_GUI_MODE.YOUGUI_PAI;
            this.MaTypegroup = self._wmRadio.group;
            this.MaTypegroup.selectedValue = self._maMode = GDMJ_MA_MODE.MAIMA_PAI + "";
            this.MaTypegroup.addEventListener(eui.UIEvent.CHANGE, self.selectMaMode, self);
            self._maGroup.selectedValue = self._maCnt = 4;
            self._maGroup.addEventListener(eui.UIEvent.CHANGE, self.selectMaCnt, self);
            if (self._roomConf) {
                self.initWidthConf();
            } else {
                self.initLastInfo();
            }
        }

        public initWidthConf() {
            this._roomGroup.touchChildren = false;
            var roomConf = this._roomConf;
            this.setRadioGroupSelectAndEnable(this._huGroup, roomConf.hufaFlag);
            var length = this._fanGroup.numChildren;
            egret.log(roomConf.hupaiType, length)
            for (var i = 0; i < length; i++) {
                var checkBox = <eui.CheckBox>this._fanGroup.getChildAt(i);
                checkBox.enabled = checkBox.selected = !!(this._confs[i].value & roomConf.hupaiType);
            }
            var maMode = roomConf.roomMode;
            var roomSubMode = roomConf.roomSubMode;
            if (roomConf.roomSubMode >= (2 << 4)) {
                this._mgdfTogBtn.enabled = this._mgdfTogBtn.selected = true;
                roomSubMode = roomSubMode >> 4;
            } else {
                this._mgdfTogBtn.enabled = false;
            }
            this._4mRadio.enabled =
                this._2mRadio.enabled = this._6mRadio.enabled = maMode == GDMJ_MA_MODE.MAIMA_PAI;
            if (maMode == GDMJ_MA_MODE.MAIMA_PAI) {
                this._mmRadio.enabled = this._mmRadio.selected = true;
                this._wmRadio.enabled = this._wmRadio.selected = false;
                this._4mRadio.enabled = this._2mRadio.enabled = this._6mRadio.enabled = true;
                this._4mRadio.enabled = this._4mRadio.selected = roomSubMode == this._4mRadio.value;
                this._2mRadio.enabled = this._2mRadio.selected = roomSubMode == this._2mRadio.value;
                this._6mRadio.enabled = this._6mRadio.selected = roomSubMode == this._6mRadio.value;
            } else {
                this._wmRadio.enabled = this._wmRadio.selected = true;
                this._mmRadio.enabled = false;
            }
            this._wgRadio.enabled = this._wgRadio.selected = roomConf.guipaiType == this._wgRadio.value;
            this._bbgRadio.enabled = this._bbgRadio.selected = roomConf.guipaiType == this._bbgRadio.value;
            this._fgRadio.enabled = this._fgRadio.selected = roomConf.guipaiType == this._fgRadio.value;
            if (roomConf.hufaFlag & GDMJ_FAN.WUFENG_TYPE) {
                this._bbgRadio.enabled = false;
            }
        }

        protected setRadioGroupSelectAndEnable(group: eui.RadioButtonGroup, value) {
            var length = group.numRadioButtons;
            group.selectedValue = value;
            for (var i = 0; i < length; ++i) {
                var radio = group.getRadioButtonAt(i);
                radio.enabled = radio.value == value;
                egret.log("setRadioGroupSelectAndEnable:", group.$name, radio.enabled);
            }
        }

        //选择买码数
        private selectMaCnt(evt: eui.UIEvent) {
            var radioGroup: eui.RadioButtonGroup = evt.target;
            // SoundManage.playNormalEffect('Snd_commonbtn');
            this._maCnt = radioGroup.selectedValue;
        }

        //选择买马类型模式
        private selectMaMode(evt: eui.UIEvent) {
            var radioGroup: eui.RadioButtonGroup = evt.target;
            egret.log("selectMaMode:", radioGroup.selectedValue)
            if (radioGroup.selectedValue == GDMJ_MA_MODE.MAIMA_PAI) {
                this._4mRadio.enabled = this._mgdfTogBtn.enabled =
                    this._2mRadio.enabled = this._6mRadio.enabled = true;
            } else {
                this._4mRadio.enabled = this._mgdfTogBtn.enabled =
                    this._2mRadio.enabled = this._6mRadio.enabled = false;
            }
            // SoundManage.playNormalEffect('Snd_commonbtn');
            this._maMode = radioGroup.selectedValue;
        }

        private onWfChange(event: eui.UIEvent) {
            let cBox = <eui.CheckBox>event.target;
            if (cBox.selected) {
                if (this._guiMode == GDMJ_GUI_MODE.BAIBANGGUI_PAI) {
                    this._guiMode = this._guiGroup.selectedValue = this._wgRadio.value;
                }
                this._bbgRadio.enabled = false;
                if (this._hys2bCBox) {
                    this._hys2bCBox.selected = this._hys2bCBox.enabled = false;
                }
                if (this._shisanyao) {
                    this._shisanyao.selected = this._shisanyao.enabled = false;
                }
            } else {
                this._bbgRadio.enabled = true;
                if (this._hys2bCBox) {
                    this._hys2bCBox.enabled = true;
                    if (LocalDatas.sDatas.datas.gdmj_data) {
                        this._hys2bCBox.selected = !!(LocalDatas.sDatas.datas.gdmj_data.hupaiType & GDMJ_FAN.HUNYISE_TYPE);
                    } else {
                        this._hys2bCBox.selected = true;
                    }
                }

                if (this._shisanyao) {
                    this._shisanyao.enabled = true;
                    if (LocalDatas.sDatas.datas.gdmj_data) {
                        this._shisanyao.selected = !!(LocalDatas.sDatas.datas.gdmj_data.hupaiType & GDMJ_FAN.HUNYISE_TYPE);
                    } else {
                        this._shisanyao.selected = true;
                    }
                }

            }
        }

        //选择鬼牌类型
        private selectGuiMode(evt: eui.UIEvent) {
            var radioGroup: eui.RadioButtonGroup = evt.target;
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
        }


        // 如果有缓存，初始化
        public initLastInfo() {
            let data = LocalDatas.sDatas.datas.gdmj_data;
            if (data != null) {
                super.initLastInfo(data);

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
                var confs = this._confs = RoomConf;

                var length = this._fanGroup.numChildren;
                egret.log(data.hupaiType, length)
                for (var i = 0; i < length; i++) {
                    var checkBox = <eui.CheckBox>this._fanGroup.getChildAt(i);
                    checkBox.selected = !!(this._confs[i].value & data.hupaiType);

                    let conf = confs[i];
                    if (conf.value === GDMJ_FAN.WUFENG_TYPE) {
                        if(!!(this._confs[i].value & data.hupaiType)){
                             if (this._guiMode == GDMJ_GUI_MODE.BAIBANGGUI_PAI) {
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
                } else {
                    // this._mgdfTogBtn.enabled = false;
                }
                // this._4mRadio.enabled =
                //     this._2mRadio.enabled = this._6mRadio.enabled = maMode == GDMJ_MA_MODE.MAIMA_PAI;
                if (maMode == GDMJ_MA_MODE.MAIMA_PAI) {
                    this._mmRadio.selected = true;
                    this._wmRadio.selected = false;
                    //    this._2mRadio.enabled = this._6mRadio.enabled = true;
                    this._4mRadio.selected = roomSubMode == this._4mRadio.value;
                    this._2mRadio.selected = roomSubMode == this._2mRadio.value;
                    this._6mRadio.selected = roomSubMode == this._6mRadio.value;
                } else {
                    this._wmRadio.selected = true;
                    this._2mRadio.enabled = this._6mRadio.enabled = this._4mRadio.enabled = this._mgdfTogBtn.enabled = false;
                }
                this._wgRadio.selected = data.guipaiType == this._wgRadio.value;
                this._bbgRadio.selected = data.guipaiType == this._bbgRadio.value;
                this._fgRadio.selected = data.guipaiType == this._fgRadio.value;
                if (data.hufaFlag & GDMJ_FAN.WUFENG_TYPE) {
                    this._bbgRadio.enabled = false;
                }
            }
        }
        /**
         * 发送创建房间的消息
         */
        public sendOpenRoomMsg() {
            let self = this;

            let limitValue = 0;
            if (self._ipxzRadio.selected) {//添加ip限制
                limitValue = limitValue | EXTRALIMIT_MASK.IP;
            }
            // 00000011
            if (self._dlwzRadio.selected) {//添加地理位置限制
                limitValue |= EXTRALIMIT_MASK.GEOLOCATION;
            }

            let fan = 0;
            for (let i = self._fanGroup.numChildren - 1; i > -1; --i) {
                var checkBox = <eui.CheckBox>this._fanGroup.getChildAt(i);
                if (checkBox.selected) {
                    fan += this._confs[i].value;
                }
            }

            let level = parseInt(this._levelGroup.selectedValue);
            let huGroup = parseInt(this._huGroup.selectedValue);
            let guiGroup = parseInt(this._guiGroup.selectedValue);
            let maGroup = parseInt(this._maGroup.selectedValue);
            let MaTypegroup = parseInt(this.MaTypegroup.selectedValue);
            if (maGroup != GDMJ_MA_MODE.WUMA_PAI && this._mgdfTogBtn.selected) {
                maGroup = maGroup << 4;
            }
            egret.log("MaTypegroup", MaTypegroup);
            let sendData: model.OPEN_SCORE_ROOM_GDMJ = {
                gameId: this._gameId,
                extraLimit: limitValue,
                roomLevel: level,
                hufaFlag: huGroup,
                hupaiType: fan,
                guipaiType: guiGroup,
                roomMode: MaTypegroup,
                roomSubMode: maGroup,
            };
            net.SendMsg.create(sendData, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_OPEN_SCORE_ROOM).send();

            // LocalDatas.sDatas.datas = sendData;
            LocalDatas.sDatas.datas.gdmj_data = sendData;
            LocalDatas.sDatas.saveData();
        }
        public setInfo(data: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_GDMJ>) {
            super.setInfo(data);
            this._roomConf = data.createinfo;
            this._levelRadio3.enabled = this._levelRadio3.selected = this._levelRadio3.value == data.createinfo.roomLevel;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }

        protected onExit() {
            super.onExit();
            //内存泄露，清除事件绑定
            this._guiGroup.removeEventListener(eui.UIEvent.CHANGE, this.selectGuiMode, this);
            this.MaTypegroup.removeEventListener(eui.UIEvent.CHANGE, this.selectMaMode, this);
            this._maGroup.removeEventListener(eui.UIEvent.CHANGE, this.selectMaCnt, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            //移除chekbox上的事件
            for(let i = 0;i < this._fanGroup.numChildren;i++){
                this._fanGroup.getChildAt(i).removeEventListener(egret.Event.CHANGE, this.onWfChange, this);
            }
        }
    }
}