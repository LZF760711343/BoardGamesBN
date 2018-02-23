namespace game {
    export class Lost extends eui.Component {
        private _lost: egret.tween.TweenGroup;

        private _call: Function;
        private _this: Object;
        private _data: any;

        public constructor() {
            super();
            this.skinName = "lost";
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._lost.addEventListener('complete', this.onTweenGroupComplete, this);
        }

        public onTweenGroupComplete() {
            this.visible = false;
            // this._call.call(this._this, this._data);
            //播放完移除掉动画
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this._call.call(this._this, this._data);
        }

        public init(callBack: Function, thisOjb: Object, data: any) {
            this._call = callBack;
            this._this = thisOjb;
            this._data = data;
        }

        public start() {
            this._lost.play(0);
        }
    }
}