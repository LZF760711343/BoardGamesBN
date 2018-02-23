namespace UI {
	export class CountDown extends eui.Component {
		// private _cTime:CoolTime;
		public curTime: number = 0;
		private _cFunc: Function;
		private _cThisObj: Object;

		public constructor() {
			super();
		}
		public onTimer() {	
			this.curTime--;
			if (this.curTime ==3) {
				SoundManage.playEffect("dididi");
			}
			this.dispatchEventWith(egret.TimerEvent.TIMER, false, this.curTime);
		}
		
		public addCompleteFunc(cFunc: Function, cThisObj: Object) {
			this._cFunc = cFunc;
			this._cThisObj = cThisObj;
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			// this.startTimer(100);
		}
		/**
		 * 开始倒计时
		 * @param count:倒计时的次数
		 * @param delay:倒计时的间隔
		 */
		public startTimer(count: number, delay: number = 1000) {
			this.curTime = count;
			this.stopTimer();
			FrameManager.getInstance().addTimerByKey(this.hashCode, this.onTimer, this, delay, count, this._cFunc, this._cThisObj);
		}
		public stopTimer() {
			FrameManager.getInstance().delayRemoveHandler(this.hashCode);
		}
	}
}