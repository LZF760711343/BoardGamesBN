
namespace UI {
	export class Zoom extends eui.Component {
		public _contractionBtn: UI.CommonBtn;
		public _bgImg: eui.Image;
		public _shirckGroup: eui.Group;
		public _dissolveBtn: UI.CommonBtn;
		public _ruleBtn: UI.CommonBtn;
		public _SetBtn: UI.CommonBtn;
		public isShow: boolean = false;
		public constructor() {
			super();
			// this.skinName = ZoomSkin;
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			this._shirckGroup.once(egret.Event.RENDER, () => {
				let func = (index: number) => {
					if (index < 0) {
						return;
					}
					let item = <eui.ItemRenderer>this._shirckGroup.getChildAt(index);
					egret.Tween.get(item).to({ y: item.y - item.height, alpha: 0 }, 1).call(() => {
						func(--index);
					});
				}
				func(this._shirckGroup.numChildren - 1);
			}, this)
			this._contractionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonChange, this);
		}
		public buttonChange() {
			if (this.isShow) {
				this._contractionBtn.touchEnabled = false;
				egret.Tween.get(this._contractionBtn).to({ rotation: 0 }, 200);
				egret.Tween.get(this._bgImg).to({ alpha: 0, visible: false }, 400);
				this._shirckGroup.once(egret.Event.RENDER, () => {
					let func = (index: number) => {
						if (index < 0) {
							this._contractionBtn.touchEnabled = true;
							return;
						}
						let item = <eui.ItemRenderer>this._shirckGroup.getChildAt(index);
						egret.Tween.get(item).to({ y: item.y - item.height, alpha: 0.5, visible: false }, 90, egret.Ease.sineOut).call(() => {
							func(--index);
						});

					}
					func(this._shirckGroup.numChildren - 1);

				}, this)
				this.isShow = false;
			} else {
				this._contractionBtn.touchEnabled = false;
				egret.Tween.get(this._contractionBtn).to({ rotation: -180 }, 200);
				this._bgImg.visible = true;
				egret.Tween.get(this._bgImg).to({ alpha: 1 }, 400);
				this._shirckGroup.once(egret.Event.RENDER, () => {
					let func = (index: number) => {
						if (index > this._shirckGroup.numChildren - 1) {
							this._contractionBtn.touchEnabled = true;
							return;
						}
						let item = <eui.ItemRenderer>this._shirckGroup.getChildAt(index);
						item.visible = true;
						egret.Tween.get(item).to({ y: item.y + item.height, alpha: 1 }, 90, egret.Ease.sineOut).call(() => {
							func(++index);
						});
					}
					func(0);
				}, this)
				this.isShow = true;
			}
		}


	}
}
