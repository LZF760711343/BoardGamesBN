namespace Layers {
    export class SharePost extends BaseLayer {
        private _shareFrieds: eui.Group;
        private _weChatFriends: eui.Group;
        private shareInfo: any;
        public constructor(shareInfo) {
            super();
            this.skinName = SharePostSkin;
            this.shareInfo = shareInfo;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this._shareFrieds.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onshareFriend, this);
            this._weChatFriends.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onweChatFriends, this);
        }
        private onshareFriend() {
            this.shareInfo.scene = 0;
            nest.addShareCb(null)
            egret.ExternalInterface.call("shareWx", JSON.stringify(this.shareInfo));
        };
        private onweChatFriends() {
            this.shareInfo.scene = 1;
            // nest.addShareCb((code: string) => {
            //     if (code == '0') {
            //         if (net.getServerType() === net.SERVER_TYPE.GAME) {
            //             net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GET_FENXIANG).send();
            //         }
            //     }
            // });
            egret.ExternalInterface.call("shareWx", JSON.stringify(this.shareInfo));
        };

    }
}

