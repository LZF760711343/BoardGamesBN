namespace Layers {
    export class FirstGiftLayer extends BaseLayer {
        private _getBtn:UI.CommonBtn;
        public constructor() {
            super([ResManager.GROUP_NAME.RECHARGE]);
            this.skinName = FirstGiftLayerSkin;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendGetGift, this);
        }
        private onSendGetGift(){
            net.SendMsg.create({isNowGet:1}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GET_SHOUCHONG).send();
        }
    }
}
