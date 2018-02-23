namespace Layers {
	export class HistroyBox extends BaseLayer {
		private _list: eui.List;
		private myCollection: eui.ArrayCollection;
		private imgstrs: string[];
		public constructor() {
			super();
			this.skinName = niuniu.brnn.HistroyBoxSkin;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			EventManager.register("UPDATE_HISTROYLIST",this.updateList,this);
			// this._toggleBut.addEventListener(egret.TouchEvent.TOUCH_TAP, this.togleButOP, this)
		}

		/**
		 * 更新数据
		 */
		// public motion(winRewardList: number[]) {
		// 	let imgstrs = this.imgstrs;
		// 	let len = winRewardList.length;
		// 	for (let j = 0; j < len; j++) {
		// 		if (winRewardList[j]) {
		// 			imgstrs.push("x_text_png");
		// 		} else {
		// 			imgstrs.push("g_text_png");
		// 		}
		// 	}
		// 	this.updateUI()
		// 	// if (this.imgstrs.length === 14 * 4) {
		// 	// 	egret.Tween
		// 	// 		.get(this._scroller.viewport)
		// 	// 		.to({ scrollV: this._scroller.viewport.scrollV + 25 }, 800, egret.Ease.quadOut)
		// 	// 		.call(this.moveComplete, this);
		// 	// } else {
		// 	// 	this.onAny();
		// 	// }
		// }
		
		/**
		 * 删除第一行数据高度位置复原更新UI
		 */
		private moveComplete() {
			this.imgstrs.splice(0, 4);
			// this._scroller.viewport.scrollV = 0;
			this.updateUI();
			this.onAny();
		}
		/**
		 * 	更新UI页面
		 */
		private updateUI() {
			// this.myCollection.replaceAll(this.imgstrs);
		}
		private onAny() {
			// let num = 45;
			// let heg = 24.1;
			// this._blur.y = num + heg * (this.imgstrs.length / 4 - 1);
			// egret.Tween.get(this._blur)
			// 	.to({ alpha: 1 }, 300)
			// 	.wait(1500)
			// 	.to({ alpha: 0 }, 300);
		}
		/**
		 * 初始数据
		 */
		public initialization(winRewardList: number[][]) {
			let imgstrs = this.imgstrs = [];
			let length = winRewardList.length;
			for (let i = 0; i < length; i++) {
				let len = winRewardList[i].length;
				for (let j = 0; j < len - 1; j++) {
					if (winRewardList[i][j]) {
						imgstrs.push("cha_hzicon_png");
					} else {
						imgstrs.push("dui_hzicon_png");
					}
				}
			}
			// egret.log("imgstrs", imgstrs);
			let myCollection: eui.ArrayCollection = this.myCollection = new eui.ArrayCollection(imgstrs);
			let dataGroup: eui.DataGroup = this._list;
			dataGroup.dataProvider = myCollection;
		}

		public updateList(event){
			this.initialization(event.data);
		}

		private onAniComplete() {
			// this._toggleBut.touchEnabled = true;
		}
		// 切换按钮
		protected togleButOP() {
			// this._toggleBut.touchEnabled = false;
			// this._blur.visible=false;
			// if (this._toggleBut.selected) {
			// 	egret.Tween.get(this._Juan).to({ y: this._Juan.y - 370 }, 800, egret.Ease.quadOut).call(this.onAniComplete, this);
			// } else {
			// 	egret.Tween.get(this._Juan).to({ y: this._Juan.y + 370 }, 800, egret.Ease.quadOut).call(this.onAniComplete, this);
			// }
		}


		protected onExit(): void {
			super.onExit();
			EventManager.remove("UPDATE_HISTROYLIST",this.updateList,this);
		}
	}

}