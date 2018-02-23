namespace Layers {
	export class RoundAccountLayerBase extends BaseLayer {

		/**
		 * 标题
		 */
		protected _title: eui.Image;
		/**
		 * 
		 */
		protected _dataGroup: eui.DataGroup;
		/**
		 * 继续按钮
		 */
		protected _goBtn: UI.CommonBtn;
		protected  _cTime:CoolTime;
		public constructor() {
			super();
		}
		/**
		 * 开始倒计时
		 */
		protected startTimer(count:number){
			if(!this._cTime){
				this._cTime = new CoolTime(1000);
				this._cTime.addCallBack(this.onTimer, this, this.complete);
			}
			this._cTime.start(count);
		}
		/**
		 * 停止倒计时
		 */
		protected stopTimer(){
			if(this._cTime){
				this._cTime.stop();
			}
		}
		/**
		 * 倒计时完成时候的回调
		 */
		protected complete(){

		}
		/**
		 * 每次倒计时的回调
		 * @param value:倒计时剩下的时间
		 */
		protected onTimer(value:number){

		}
	}
}