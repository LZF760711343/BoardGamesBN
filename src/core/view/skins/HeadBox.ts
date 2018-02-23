namespace UI {
	export class HeadBox extends eui.Component {
		// public icon: string = "";
		private _offTip: eui.Rect;
		private _img: eui.Image;
		private _icon: string;
		public constructor() {
			super();

		}
		protected childrenCreated(): void {
			var self = this;
			super.childrenCreated();
		}
		private getImgSuccess(data) {
			if (typeof data != "undefined") {
				this._img.source = data;
			} else {
			}
		}
		private getImgError(data) {

		}
		public async setIcon(value: string) {
			if (value) {
				this._icon = value;
				let data = RES.getRes(value);
				if (data) {
					this._img.source = data;
				}
				else {
					this._img.source = DEFAULT_HEAD_IMG;
					let data = await ResManager.getResByUrl(value, RES.ResourceItem.TYPE_IMAGE);
					if (this._icon === value) {
						if (typeof data != "undefined") {
							this._img.source = data;
						}
					}
				}
			} else {
				this._icon = this._img.source = DEFAULT_HEAD_IMG;
			}
		}
		// public setIcon(value: string) {
		// 	if (value) {
		// 		let data = RES.getRes(value);
		// 		if (data) {
		// 			this._img.source = data;
		// 		}
		// 		else {
		// 			this._img.source = DEFAULT_HEAD_IMG;
		// 			ResManager.getResByUrl(value, RES.ResourceItem.TYPE_IMAGE).then(this.getImgSuccess.bind(this));
		// 		}
		// 	}else{
		// 		this._img.source = DEFAULT_HEAD_IMG;
		// 	}
		// }
		/**
		 * 设置离线标识
		 */
		public setOffTip(): void {
			if (this._offTip)
				return;
			var _offLineTip = this._offTip = new eui.Rect();
			_offLineTip.alpha = 0.5;
			_offLineTip.percentWidth = _offLineTip.percentHeight = 100;
			this.addChildAt(_offLineTip, this.getChildIndex(this._img) + 1);
			var label = new eui.Label();
			label.size = 30;
			label.fontFamily = "微软雅黑";
			label.text = GameLangs.offLine;
			_offLineTip.addChild(label);
			label.textColor = 0xe6e6e6;
			label.x = (this.width - label.width) / 2;
			label.y = (this.height - label.height) / 2;
		}
		/**
		 * 移除离线标识
		 */
		public removeOffTip(): void {
			if (this._offTip) {
				this.removeChild(this._offTip);
				this._offTip = null;
			}
		}

		// 	public setUserInfo(userInfo:model.PlayerDto):void{
		// 		  egret.log("userInfo.icon_url",userInfo.headImages);
		//     if(userInfo.headImages[0] == '\0' || userInfo.headImages.length == 0) {

		//         this.head_icon.setSource2("defaultHead_png");
		//     } else {
		//         this.head_icon.setSource(userInfo.headImages );
		//     }
		// }
	}
}