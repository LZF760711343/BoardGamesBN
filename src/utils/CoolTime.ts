/**
*  倒計時类
*/
class CoolTime {
	private totalTime: number;
	private thisObj: any;
	private everyFun: Function;
	private completeFun: Function;
	private _key: number;
	/**
	 * @param delayTime倒计时的间隔时间
	 */
	public constructor(private delayTime: number = 1000) {
		this.delayTime = delayTime;
	}
	/**
	 * 设置倒计时的间隔时间
	 * @param delayTime倒计时的间隔时间
	 */
	public setDelayTime(delayTime: number = 1000, ) {
		this.delayTime = delayTime;
	}
	/**
	* 添加监听 倒计时两个回调函数
	* @param everyFun
	* @param completeFun
	*/
	public addCallBack(everyFun: Function, thisObj: any, completeFun: Function = null): void {
		this.thisObj = thisObj;
		this.everyFun = everyFun;
		this.completeFun = completeFun;
	}
	public stop() {
		if (this._key) {
			FrameManager.getInstance().delayRemoveHandler(this._key);
			this._key = null;
		}
	}
	/**
	 * 开始倒计时
	 * @param 倒计时要循环几次
	 */
	public start(totalTime: number = 1) {
		this.totalTime = totalTime;
		this.stop();
		this._key = FrameManager.getInstance().addTimer(this.onCoolTimeHandler, this, this.delayTime, totalTime, this.completeFun, this.thisObj);
	}
	private onCoolTimeHandler(time: number): void {
		if(this.totalTime==4){
			SoundManage.playEffect("dididi");
		}
		this.totalTime--;
		if (this.everyFun) {
			this.everyFun.call(this.thisObj, this.totalTime);
		}
	}
}