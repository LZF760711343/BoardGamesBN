namespace Layers {
	let group = {};
	/**
	 *
	 * @author 
	 *
	 */
	export class BaseLayer extends eui.Component {
		/**
		 * 需要加载的资源组名称
		 */
		public loadKey: string;
		public bg: eui.Component;
		protected _cTime: CoolTime;
		protected _btnClose: UI.CommonBtn;//关闭按钮
		/**
		 * @param preResList: 打开这个layer所需要加载的资源列表（可以是资源组，也可以是某个资源名）
		 */
		public constructor(preResList?:string[]) {
			super();
			if (preResList) {
				let loadKey = "pre" + egret.getQualifiedClassName(this);

				if(!group[loadKey]){
					ResManager.createGroup(loadKey, preResList);
					group[loadKey] = true;
				}
				this.loadKey = loadKey;
			}
			this.verticalCenter = this.horizontalCenter = 0;
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
		}
		protected startTimer(count: number) {
			if (!this._cTime) {
				this._cTime = new CoolTime();
				this._cTime.addCallBack(this.onTimer, this, this.complete);
			}
			this._cTime.start(count);
		}
		protected onTimer(value) {
		}
		/**
 * 倒计时完成
 */
		protected complete() {
		}
		//         public registerOutCtrlClose(): void {
		//             this.dark_layer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
		//         }
		// 		public closeOutside(){

		// 		}
		//         /**
		//          * 
		//          */
		// 		public createLoidImg(paddingX:number = 0, paddingY:number = 0):void{
		//             var loadImg = this.loadImg = new components.LoadingIcon();
		//             loadImg.verticalCenter = paddingY;
		//             loadImg.horizontalCenter = paddingX;
		//             loadImg.width = loadImg.height = 150;
		//             loadImg.run();
		//             this.addChild(loadImg);
		// 		}
		//         public destroyLoidImg(): void {
		//             if(this.loadImg){
		//                 if(this.loadImg.parent){
		//                     this.removeChild(this.loadImg);
		//                 }
		//                 this.loadImg = null;
		//             }
		//         }
		/**
		 * 点击关闭按钮的回调
		 */
		protected onClose() {
			this.close();
		}
		/**
		 * 移除舞台是的回调
		 */
		protected onExit(): void {

		}
		protected childrenCreated(): void {
			super.childrenCreated();
			if (this._btnClose) {
				this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			}
		}
		public close(): void {
			closeLayer(this);
		}
		/**
		 * 打开层级面板
		 * @param bgType:背景类型 {BG_TYPE} 默认会添加灰色的背景
		 * @param aniType:动画类型${ANI_TYPE}
		 */
		public open(bgType: BG_TYPE = BG_TYPE.GRAY, aniType: ANI_TYPE = ANI_TYPE.NONE) {
			openLayer(this, bgType, aniType);
			return this;
		}
	}
	export let Event = {
		/**
		 * 关闭时候派发的消息
		 */
		CLOSE: "Close",
	}
}
