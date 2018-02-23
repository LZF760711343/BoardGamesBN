class GetGiftAni extends eui.Component {
	// private _ani:
	public _image3: eui.Image;
	public _dataGroup: eui.DataGroup;
	private gongxihuode:egret.tween.TweenGroup;
	public constructor(private datas: { icon: string, label: string }[]) {
		super();
		this.skinName = GetGiftAniSkin;
		this.verticalCenter = this.horizontalCenter = 0;
		this.percentWidth = this.percentHeight = 100;
	}
	private onExit() {
		egret.Tween.removeTweens(this);
		if (this._image3)
			egret.Tween.removeTweens(this._image3);
	}
	private onPlayComplete(){
		this.close();
	}
	public close(){
		if(this.parent){
			// this.parent.removeChild(this);
			egret.Tween.get(this).to({alpha:0}, 600).call(this.parent.removeChild, this.parent, [this]);
		}
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
		// egret.Tween.get(this._image3).to({
		// 	rotation: 420 
		// }, 1000 * 2).call(this.close, this);
		this.gongxihuode.once("complete", this.onPlayComplete, this);
		this.gongxihuode.play(0);
		this._dataGroup.dataProvider = new eui.ArrayCollection(this.datas);
	}
}