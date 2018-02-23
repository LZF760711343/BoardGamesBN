module SZP {
    export class RoomConfigLayer extends Layers.RoomConfigLayerBase {
        private _radioButton5f: eui.RadioButton;
        private _radioButton10f: eui.RadioButton;
        private _radioButton20f: eui.RadioButton;
        private _radioButton1f: eui.RadioButton;
        private _radioButton3bout: eui.RadioButton;

        private _radioButton10: eui.RadioButton;
        private _radioButton15: eui.RadioButton;
        private _radioButton20: eui.RadioButton;
        private _levelRadio3:eui.RadioButton;

        private szp_level: eui.RadioButtonGroup;
        private szp_z: eui.RadioButtonGroup;
        private szp_f: eui.RadioButtonGroup;

        private _roundMaxGroup: eui.RadioButtonGroup;
        private _addChipsMaxGroup: eui.RadioButtonGroup;

        public constructor(str: string) {
            super();
            this._gameId = GAME_ID.ZJH;
            this.skinName = RoomConfigLayerSkin;
            this.currentState = str;
            var self = this;
            self._roundMaxGroup = self._radioButton10.group;
            self._addChipsMaxGroup = self._radioButton5f.group;
            self._roundMaxGroup.selectedValue = 10 + "";
            self._addChipsMaxGroup.selectedValue = 5 + "";
            // this._levelConf = [{ playerCnt: 3, count: 8, cost: 10 }, { playerCnt: 3, count: 16, cost: 20 }];
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            if (this.currentState === "1") {
                this.initLastInfo();
            }
        }


        // 如果有缓存，初始化
        public initLastInfo() {
            let data = LocalDatas.sDatas.datas.zjh_data;

            if (data != null) {
                super.initLastInfo(data);

                this._roundMaxGroup.selectedValue = data.roundMax + "";
                this._addChipsMaxGroup.selectedValue = data.addChipsMax + "";
                this._levelGroup.selectedValue = data.roomLevel + "";
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

            let level = parseInt(this._levelGroup.selectedValue);
            let _roundMax = parseInt(this._roundMaxGroup.selectedValue);
            let _addChipsMax = parseInt(this._addChipsMaxGroup.selectedValue);
            let sendData: model.OPEN_SCORE_ROOM_ZJH = {
                gameId: this._gameId,
                extraLimit: limitValue,
                roomLevel: level,
                roundMax: _roundMax,//回合封顶 10 15 20
                addChipsMax: _addChipsMax//加注封顶 5 10 20
            };
            net.SendMsg.create(sendData, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_OPEN_SCORE_ROOM).send();

            LocalDatas.sDatas.datas.zjh_data = sendData;
            LocalDatas.sDatas.saveData();
        }
        public setInfo(data: model.EnterScoreRoomInfo<model.OPEN_SCORE_ROOM_ZJH>) {

            if (data != null) {
                super.setInfo(data);
                this._roomGroup.touchChildren = this._roomGroup.touchEnabled = false;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                this._radioButton10.enabled = this._radioButton10.value == data.createinfo.roundMax;
                this._radioButton15.enabled = this._radioButton15.value == data.createinfo.roundMax;
                this._radioButton20.enabled = this._radioButton20.value == data.createinfo.roundMax;
                this._radioButton5f.enabled = this._radioButton5f.value == data.createinfo.addChipsMax;
                this._radioButton10f.enabled = this._radioButton10f.value == data.createinfo.addChipsMax;
                this._radioButton20f.enabled = this._radioButton20f.value == data.createinfo.addChipsMax;
                this._levelRadio3.enabled = this._levelRadio3.selected= this._levelRadio3.value == data.createinfo.roomLevel;
                // this._levelGroup.selectedValue = data.createinfo.roomLevel + "";
                this._addChipsMaxGroup.selectedValue = data.createinfo.addChipsMax + "";
                this._roundMaxGroup.selectedValue = data.createinfo.roundMax + "";

            }

        }
        protected onExit() {
            super.onExit();
            //内存泄露，清除事件绑定
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }
    }
}