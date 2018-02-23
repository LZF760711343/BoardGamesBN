namespace ddz {
    export class plane extends eui.Component {
        private _plane: egret.tween.TweenGroup;
        public constructor() {
            super();
            this.skinName = "plane";
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._plane.addEventListener('complete', this.onTweenGroupComplete, this);
        }

        public onTweenGroupComplete() {
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public start() {
            this._plane.play(0);
        }
    }
}