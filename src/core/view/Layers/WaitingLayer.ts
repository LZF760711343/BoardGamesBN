namespace Layers {
	/**
	 *
	 * @author HE
	 * 加载资源或者网络连接时候弹出来的页面
	 *
	 */
	export class WaitingLayer extends eui.Component {
		public runImg: eui.Image;//转的的图片
		private _isRunning:boolean;//图片是否在转动中
		private static _instance:WaitingLayer;
		public constructor() {
			super();
			var rect = new eui.Rect();
			this.percentWidth = this.percentHeight = rect.percentWidth = rect.percentHeight = 100;
			this.addChild(rect);
			rect.alpha = 0.5;
			let runImg = this.runImg = new eui.Image("loading2_png");
			runImg.verticalCenter = runImg.horizontalCenter = 0;
			// var load_img = this.load_img = new components.LoadingIcon();
			this.addChild(runImg);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
		}
		private onAddToStage(){
			this.run();
		}
		private onRemovedFromStage(){
			this.stop();
		}
		public static open(){
			if(!WaitingLayer._instance){
				WaitingLayer._instance = new WaitingLayer();
			}
			// if(!WaitingLayer._instance.pa)
			Main.instance.addChild(WaitingLayer._instance);
		}
		public static close(){
			if(WaitingLayer._instance && WaitingLayer._instance.parent){
				WaitingLayer._instance.parent.removeChild(WaitingLayer._instance);
			}
		}
		public stop(){
			if(this._isRunning){
				egret.Tween.removeTweens(this.runImg);
				this._isRunning = false;
			}
		}
		public run() {
			if(this._isRunning){
				return;
			}
			this._isRunning = true;
			egret.Tween.get(this.runImg,{ loop: true }).to({ rotation: 360 },2000);
		}
	}
}
