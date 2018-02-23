namespace UI {
	export class BrnnCountDown extends UI.CountDown {
		private isPlay:boolean = false;
		private channel:egret.SoundChannel;
		public constructor() {
			super();
		}
		public onTimer() {	
			this.curTime--;
			if (this.curTime <= 3 && this.curTime >=0) {
				if(!this.isPlay){
					this.channel = SoundManage.playEffect("brnn_jinggao");
					if(this.channel){
						this.isPlay = true;
						this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
					}
					// SoundManage.playEffect("dididi");
				}
			}
			this.dispatchEventWith(egret.TimerEvent.TIMER, false, this.curTime);
		}
		/** 播放完毕移除事件 */
		private onSoundComplete(event:egret.Event):void {
			// egret.log("onSoundComplete");
			this.isPlay = false;
			this.channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
		}
		
	}
}