namespace zjh {
	let pool = [];
	export class ChipsObj extends eui.Component {
		public bgStr: string = '';
		public icon: string = "";
		public constructor() {
			super();
			this.skinName = ChipsBtnSkin;
			this.touchEnabled = this.touchChildren = false;
		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
		public destroy() {
			if (this.parent) {
				this.parent.removeChild(this);
				pool.push(this);
			}
		}
		public static clearPool() {
			// pool = []
		}
		public static create(bgStr: string, icon: string) {
			let chipsObj:ChipsObj;
			if (pool.length) {
				chipsObj = pool.pop();
			} else {
				chipsObj = new ChipsObj();
			}
			chipsObj.bgStr = bgStr;
			chipsObj.icon = icon;
			return chipsObj;
		}
	}
}