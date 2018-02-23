namespace Layers {
    export class WangListLayer extends eui.Component {
        public _list: eui.List;
        public _applyBtn: UI.CommonBtn;

        public constructor() {
            super();
            this.skinName = WangListSkin;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            // this._applyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplyDealer, this);
        }


        // private onApplyDealer() {
        //     if (this.gameDatas.isSelfKing) {//如果自己已经上庄的,就发送下庄消息
        //         this.msgHandler.sendAskXiazhuang();
        //     } else {
        //         this.msgHandler.sendAskShangzhuang();
        //     }
        // }
    }
}
