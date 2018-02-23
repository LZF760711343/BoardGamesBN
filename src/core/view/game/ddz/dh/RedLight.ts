namespace ddz {
    export class RedLight extends eui.Component {
        private _rl: egret.tween.TweenGroup;
        public constructor() {
            super();
            this.skinName = "redlight";
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._rl.addEventListener('complete', this.onTweenGroupComplete, this);

        }

        public onTweenGroupComplete() {
            // egret.log("aaaaa");
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public start() {
            SoundManage.playEffect('timeWarn');
            this._rl.play(0);
        }
    }
}