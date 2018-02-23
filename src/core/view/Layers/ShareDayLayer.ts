namespace Layers {
    export class ShareDayLayer extends BaseLayer {
        private _shareFriend: UI.CommonBtn;
        private _weChatFriends: UI.CommonBtn;
        private shareInfo: any;
        public constructor(shareInfo) {
            super();
            this.skinName = ShareDaySkin;
            this.shareInfo = shareInfo;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this._shareFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onshareFriend, this);
            this._weChatFriends.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onweChatFriends, this);
        }
         private onshareFriend() {
            this.shareInfo.scene = 0;
            nest.share(this.shareInfo);
        };
        private onweChatFriends() {
            this.shareInfo.scene = 1;
            nest.share(this.shareInfo);
        };
    }

}

