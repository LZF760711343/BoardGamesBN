namespace ddz {
    export class wangzha extends eui.Component {
        private _wz: egret.tween.TweenGroup;
        public constructor() {
            super();
            this.skinName = "wangzha";
           this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            
            this._wz.addEventListener('complete', this.onTweenGroupComplete, this);
        }

        public onTweenGroupComplete() {
             this.visible = false;
             if (this.parent) {
                 this.parent.removeChild(this);
             }
        }

        public start()
        {
            this._wz.play(0);
        }
    }
}