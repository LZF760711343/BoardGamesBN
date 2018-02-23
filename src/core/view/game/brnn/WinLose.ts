
namespace niuniu.brnn {
	export class WinLose extends eui.Component {
		private _add: eui.Image;
		private _fail: eui.Image;
		public _moneyList: eui.List;
		public constructor() {
			super();
		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
		/**
		 * 结算金币动画
		 */
		public animation(count) {
			if (count >= 0) {
				count = "+" + count;
			} else {
				count = count + "";
			}
			let items = [];
			for (var i = 1; i < count.length; i++) {
				if (count[0] == "-") {
					this._add.visible = false;
					this._fail.visible = true;
					items.push({ Str: `fail_${count[i]}_png` })
				} else {
					this._fail.visible = false;
					this._add.visible = true;
					items.push({ Str: `add_${count[i]}_png` })
				}
			}

			this._moneyList.dataProvider = new eui.ArrayCollection(items);
			this._moneyList.once(egret.Event.RENDER, () => {
				this.width = this._moneyList.width;
				for (let i = this._moneyList.numChildren - 1; i > -1; i--) {
					let item = <eui.ItemRenderer>this._moneyList.getChildAt(i);
					if (i == this._moneyList.numChildren - 1) {
						this._add.x = item.x - item.width / 2;
						this._fail.x = item.x - item.width / 2;
					} else {
						item.visible = false;
					}
				}
				let func = (index: number) => {
					if (index < 0) {
						return;
					}
					let item = <eui.ItemRenderer>this._moneyList.getChildAt(index);
					if (this._add.visible) {
						egret.Tween.get(this._add).to({ x: this._add.x - item.width }, 190);
					} else {
						egret.Tween.get(this._fail).to({ x: this._fail.x - item.width }, 190);
					}
					item.visible = true;
					item["Dong"].play(0);
					item["Dong"].addEventListener('complete', () => {
						func(--index);
					}, this);
				}
				func(this._moneyList.numChildren - 1);

			}, this)
		}
	}
}