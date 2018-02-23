namespace game {
    export class Start extends eui.Component {
        private _play: egret.tween.TweenGroup;
        // private _finish: Function;
        private _call: Function;
        private _this: Object;
        private _data: any;
        public constructor() {
            super();
            this.skinName = "start";
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._play.addEventListener('complete', this.onTweenGroupComplete, this);
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
            // return new Promise((finsih: Function) => {
            //     this._finish = finsih;
            this._play.play(0);
            // });

        }
    }
}