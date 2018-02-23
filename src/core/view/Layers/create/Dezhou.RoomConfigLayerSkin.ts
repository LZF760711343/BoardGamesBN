module Dezhou {
    export class RoomConfigLayer extends Layers.RoomConfigLayerBase {
        // private _radioButton1: eui.RadioButton;
        // private _radioButton2: eui.RadioButton;
        private _12Radio: eui.RadioButton;
        private _510Radio: eui.RadioButton;
        private _15ScoreRadio: eui.RadioButton;
        private _21ScoreRadio: eui.RadioButton;
        private _wmzRadio: eui.RadioButton;
        private _150ScoreRadio: eui.RadioButton;
        // private _ipxzRadio: eui.ToggleButton;
        // private _dlwzRadio: eui.ToggleButton;
        // private btnClose: UI.CommonBtn;

        public constructor() {
            super();
            this._gameId = GAME_ID.DZ;
            this.skinName = RoomConfigLayerSkin;

            this._levelConf = [{ playerCnt: 3, count: 8, cost: 10 }, { playerCnt: 3, count: 16, cost: 20 }];
        }

         protected childrenCreated(): void {
            super.childrenCreated();
            var self = this;
        }
    }
}