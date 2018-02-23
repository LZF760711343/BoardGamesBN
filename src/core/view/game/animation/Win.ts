namespace game {
    export class Win extends eui.Component {
        private _win: egret.tween.TweenGroup;

        private _call: Function;
        private _this: Object;
        private _data: any;
        public constructor() {
            super();
            this.skinName = "win";
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._win.addEventListener('complete', this.onTweenGroupComplete, this);
        }

        public onTweenGroupComplete() {
            this.visible = false;

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
            this._win.play(0);
        }
    }
}