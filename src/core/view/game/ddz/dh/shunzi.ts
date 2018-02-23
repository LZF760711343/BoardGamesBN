namespace ddz {
    export class shunzi extends eui.Component {
        private _sz1: egret.tween.TweenGroup;
        public constructor() {
            super();
            this.skinName="sz";
             this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._sz1.addEventListener('complete', this.onTweenGroupComplete, this);
        }

        public onTweenGroupComplete() {
             this.visible = false;
             if (this.parent) {
                this.parent.removeChild(this);
             }
        }

        public start()
        {
            this._sz1.play(0);
        }
    }
}