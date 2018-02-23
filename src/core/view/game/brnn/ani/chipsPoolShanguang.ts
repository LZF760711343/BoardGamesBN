namespace niuniu.brnn {
	export const SCPSStatu = {
		/**
		 * 不显示
		 */
		NONE: "none",
		/**
		 * 胜利
		 */
		SHANG: "shang",
	}
	export class ChipsPoolShanguang extends eui.Component {
		public _play: egret.tween.TweenGroup;

		public constructor() {
			super();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
		}
		private onExit() {
			this._play.stop();
		}

		// public get curState(): string {
		// 	return this.currentState;
		// }
		public set curState(v: string) {
			// this.currentState = v;
			switch (v) {
				case SCPSStatu.SHANG:
					this._play.play(0);
					break;
				case SCPSStatu.NONE:
					this._play.stop();
					break;
				default:
					this._play.pause();
					break;
			}
		}


	}
}