module UI {
	export class BrnnRadioBtn extends UI.RadioBtn {
		public image:eui.Image;

		public constructor() {
			super();
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			//初始化brnn的UI
			if(this.image){
				egret.Tween.get(this.image,{loop:true}).to({scaleX:1.05,scaleY:1.05},1000).to({scaleX:1,scaleY:1},1000);
				// egret.Tween.get(this.image,{loop:true}).to({height:103.6035,width:119.343},1000).to({height:98.7,width:113.66},1000);//1.05
			}

			this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onExit,this);
		}

		private onExit(){
			egret.Tween.removeTweens(this.image);
		}
		
	}
}