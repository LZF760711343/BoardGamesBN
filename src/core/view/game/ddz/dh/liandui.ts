namespace ddz {
    export class liandui extends eui.Component {
        private _ld: egret.tween.TweenGroup;
        public constructor() {
            super();
            this.skinName = "liandui";
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._ld.addEventListener('complete', this.onTweenGroupComplete, this);
        }

        public onTweenGroupComplete() {
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public start() {
            this._ld.play(0);
        }
    }
}