namespace majiang {

	interface Labes extends eui.Component {
		iconBei: eui.Image;//4
		iconXi: eui.Image;//3
		iconNan: eui.Image;//2
		iconDong: eui.Image;//1
		// _imgArrows: eui.Image;
	}
	export class TimeBox extends eui.Component {
		/**
		 * 倒计时
		 */
		private icons: eui.Image[];
		private config: string[][];
		private _countDown: UI.CountDown;
		private _labels: Labes;
		private _direct: number;
		public constructor() {
			super();
		}
		public startTimer(count: number = 10) {
			this._countDown.startTimer(count);
		}
		public stopTimer() {
			this._countDown.stopTimer();
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.icons = [this._labels.iconDong, this._labels.iconBei, this._labels.iconXi, this._labels.iconNan];
			this.config = [
				["icon_mj_dong_png", "icon_mj_dong_light_png"],
				["icon_mj_bei_png", "icon_mj_bei_light_png"],
				["icon_mj_xi_png", "icon_mj_xi_light_png"],
				["icon_mj_nan_png", "icon_mj_nan_light_png"],
			]
		}

		public setDirect(value): void {
			egret.log("caonimabi", value);
			// this.currentState = value + "";
			// this._direct = value;
			// this._labels.currentState = "s" + (((4 - value) % 4) + 1);
			this._labels.currentState = "s" + (((value) % 4) + 1);

		}
		public setArrowsDirect(value): void {
			var length = this.icons.length;
			for (var i = 0; i < length; i++) {
				let index = (this._direct + i) % 4;
				if (i == value) {
					// this._labels._imgArrows.rotation = (value) * 90;
					// this.icons[index].source = this.config[index][1];
					// } else {
					// this.icons[index].source = this.config[index][0];
					egret.log("value", value);
				}

			}

		}
	}
}