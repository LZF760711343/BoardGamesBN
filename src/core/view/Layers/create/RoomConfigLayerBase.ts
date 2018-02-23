namespace Layers {
    export class RoomConfigLayerBase extends BaseLayer {
        public _cardGorup: eui.Group;
        public _roomGroup: eui.Group;
        public gameDatas: GameDatasBase;
        protected _gameId: number = null;
        // protected _level: number;
        protected _levelRadio1: eui.RadioButton;
        protected _levelRadio2: eui.RadioButton;
        /**
         *游戏局数配置
         */
        protected _levelConf: { count: any, cost: number, playerCnt?: number }[];
        protected _levelGroup: eui.RadioButtonGroup;
        protected _type: string;
        /**
         * ip限制按钮
         */
        protected _ipxzRadio: eui.ToggleButton;
        /**
         * 地理位置限制按钮
         */
        protected _dlwzRadio: eui.ToggleButton;
        private _tabber: eui.TabBar;
        public constructor() {
            super([ResManager.GROUP_NAME.CREATEROOM]);
        }
        /**
         * 发送创建房间的消息
         */
        public sendOpenRoomMsg() {

        }
        protected childrenCreated(): void {
            super.childrenCreated();
            var self = this;
            var conf = self._levelConf = Config.ROOM_CONF[self._gameId];
            self._levelGroup = self._levelRadio1.group;
            self._levelRadio1.label = GameLangs.create_room_str.format(conf[0].count, conf[0].cost);
            self._levelRadio2.label = GameLangs.create_room_str.format(conf[1].count, conf[1].cost);
            self._tabber.addEventListener(egret.Event.CHANGE, this.onChange, this);
            self._levelGroup.selectedValue = 0 + "";
            self._dlwzRadio.visible = false;
        }
        private onChange() {
            if (this._tabber.selectedIndex) {
                this._cardGorup.visible = true;
                this._roomGroup.visible = false;
            } else {
                this._cardGorup.visible = false;
                this._roomGroup.visible = true;
            }
        }
        protected onExit() {
            super.onExit();
            //内存泄露，清除事件绑定
            this._tabber.removeEventListener(egret.Event.CHANGE, this.onChange,this);
        }
        protected sendOpenScoreRoom(sendData) {
            net.SendMsg.create(sendData, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_OPEN_SCORE_ROOM).send();
        }

        protected onTouchTap(event: egret.TouchEvent) {
            if (this._btnClose.hitTestPoint(event.stageX, event.stageY)) {
                this.close();
                // PopUpManager.removePopUp(<Layers.BaseLayer><any>this);
                return;
            }
            
        }
        protected initLastInfo(data: model.OPEN_SCORE_ROOM) {
            this._ipxzRadio.selected = !!(data.extraLimit & EXTRALIMIT_MASK.IP);
            this._dlwzRadio.selected = !!(data.extraLimit & EXTRALIMIT_MASK.GEOLOCATION);
        }

        protected setInfo(data: any) {
            this._levelRadio2.enabled = this._levelRadio2.selected = this._levelRadio2.value == data.createinfo.roomLevel;
            this._levelRadio1.enabled = this._levelRadio1.selected = this._levelRadio1.value == data.createinfo.roomLevel;

            this._ipxzRadio.enabled = this._ipxzRadio.selected = !!(data.createinfo.extraLimit & EXTRALIMIT_MASK.IP);
            this._dlwzRadio.enabled = this._dlwzRadio.selected = !!(data.createinfo.extraLimit & EXTRALIMIT_MASK.GEOLOCATION);
            if (this._levelGroup) {
                this._levelGroup.selectedValue = data.createinfo.roomLevel + "";
            }

        }
    }
}