namespace Layers {
    export class EnterRoomLayer extends BaseLayer {
        private _erLabel: eui.Label;
        private _erLabels: eui.Label[];
        private _roomLab1: eui.Label;
        private _roomLab2: eui.Label;
        private _roomLab3: eui.Label;
        private _roomLab4: eui.Label;
        private _roomLab5: eui.Label;
        private _roomLab6: eui.Label;
        private _btnGroup: eui.Group;
        private _text: string = "";
        public constructor() {
            super(["kuang1_png"]);
            this.skinName = EnterRoomLayerSkin;
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            var self = this;

            self._btnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchBtns, self);
            // self._erLabels.
            this._erLabels = [this._roomLab1, this._roomLab2, this._roomLab3, this._roomLab4, this._roomLab5, this._roomLab6];
        }
        public set text(value: string) {
            this._text = value;
            for (let i = 0; i < 6; i++) {
                let ch = value[i];
                
                if (ch) {
                    this._erLabels[i].visible = true;
                    this._erLabels[i].text = ch;
                } else {
                    this._erLabels[i].visible = false;
                }
            }

        }
        public get text() {
            return this._text;
        }
        public sendEnterRoomMsg(roomId: number) {
            net.SendMsg.create({ roomId: roomId }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ENTER_SCORE_ROOM).send();
        }
        private touchBtns(event: egret.TouchEvent) {
            //重输
            if (event.target.name == "r") {
                this.text = "";
            }
            //删除
            else if (event.target.name == "d") {
                if (this.text.length > 0) {
                    this.text = this.text.substr(0, this.text.length - 1)

                }
            }
            else {
                if (this._text.length < 6) {
                    this.text += event.target.name;
                    if (this._text.length == 6) {
                        this.sendEnterRoomMsg(parseInt(this._text))
                    }
                }
            }
        }
    }
}