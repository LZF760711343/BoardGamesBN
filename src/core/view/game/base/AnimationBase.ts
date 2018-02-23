class AnimationBase extends eui.Component {
    protected _play: egret.tween.TweenGroup;
    protected _call: Function;
    protected _this: Object;
    protected _data: any;
    protected _finish: Function;

    public constructor() {
        super();
        // this.anchorOffsetX = this.width / 2;
        // this.anchorOffsetY = this.height / 2;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this._play.addEventListener('complete', this.onTweenGroupComplete, this);
    }

    protected onTweenGroupComplete() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this._call) {
            this._call.call(this._this, this._data);
            // this._call = this._this = this._data = null;
        }
        if (this._finish) {
            this._finish();
            this._finish = null;
        }
    }

    public start() {
        this._play.play(0);
    }
    public stop() {
        this._play.stop();
        this._finish = null;
        this._call = this._this = this._data = null;
    }
    public startAsync() {
        return new Promise((_finish: Function) => {
            this._finish = _finish;
            this._play.play(0);
        })
    }
    public init(callBack: Function, thisOjb: Object, data: any) {
        this._call = callBack;
        this._this = thisOjb;
        this._data = data;
    }

}
