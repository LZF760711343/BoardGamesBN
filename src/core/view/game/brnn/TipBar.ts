namespace niuniu.brnn {
	/**
	 * 提示条的状态
	 */
	export const TipBarStatu = {
		/**
		 * 不显示
		 */
		NONE: "none",
		/**
		 * 提示等待玩家当王
		 */
		WAIT_KING: "waitKing",
		/**
		 * 等待游戏开局
		 */
		WAIT: "wait",
		/**
		 * 結算
		 */
		ACCOUNT: "account",
	}
	export class TipBar extends eui.Component {
		public _waitOpen: eui.Group;
		public _moneyLb: niuniu.brnn.WinLose;
		public Wait: egret.tween.TweenGroup;

		public constructor() {
			super();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
		}
		private onExit(){
			this.Wait.stop();
		}
		
		public setMoney(count: number) {
			this._moneyLb.animation(count);
		}
	    
		public get curState(): string {
			return this.currentState;
		}
		public set curState(v: string) {
			this.currentState = v;
			switch (v) {
				case TipBarStatu.WAIT:
				case TipBarStatu.WAIT_KING:
					this.Wait.play();
					
					break;
				case TipBarStatu.NONE:
					this.Wait.pause();
					break;
				default:
					this.Wait.pause();
					break;
			}
		}


	}
}