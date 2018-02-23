namespace ddz {
    export class zhadan extends eui.Component {
        private _zd: egret.tween.TweenGroup;
        public constructor() {
            super();
            this.skinName="zd";
             this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._zd.addEventListener('complete', this.onTweenGroupComplete, this);
        }

        public onTweenGroupComplete() {
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public start()
        {
            this._zd.play(0);
        }

    }
}