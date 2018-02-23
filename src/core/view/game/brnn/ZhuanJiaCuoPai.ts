namespace niuniu.brnn {
	export const CuoPaiStatu = {
		/**
		 * 不显示
		 */
		NONE: "none",
		/**
		 * 搓牌
		 */
		WAIT: "cuopai",
	}
	export class ZhuanJiaCuoPai extends eui.Component {
		public _play: egret.tween.TweenGroup;

		public constructor() {
			super();

		}

		public get curState(): string {
			return this.currentState;
		}
		public set curState(v: string) {
			this.currentState = v;
			switch (v) {
				case CuoPaiStatu.WAIT:
					this._play.play(0);
					break;
				case CuoPaiStatu.NONE:
					this._play.pause();
					break;
				default:
					this._play.pause();
					break;
			}
		}


	}
}