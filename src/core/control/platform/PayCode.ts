namespace nest {
	/**
	 * 二维码,用于扫码支付
	 */
	export class PayCode extends eui.Component {
		// private bg: eui.Rect;
		public constructor() {
			super();
		}
		public init(source: string) {
			let bg = new eui.Rect();
			this.addChild(bg);
			bg.fillColor = 0x0;
			bg.alpha = 0.6;
			bg.percentWidth = bg.percentHeight = 100;
			let img = new eui.Image(source);
			img.verticalCenter = img.horizontalCenter = 0;
			this.addChild(img);

		}
		protected childrenCreated(): void {
			super.childrenCreated();
			this.percentWidth = this.percentHeight = 100;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		}
		private onTouchTap() {
			if (this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}