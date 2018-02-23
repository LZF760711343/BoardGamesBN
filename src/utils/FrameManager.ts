class FrameManager {
	public constructor() {
	}

	private static instance: FrameManager = null;

	//方法集合
	private funsArray: Array<any> = [];

	private funsDic: Object = {};
	private static _key: number = 0;
	private _curTime: number;
	private lastTime: number;
	private totalTime: number = 0;

	private _currentFrame: number = 0;

	private _frameRate: number;
	private _delayRemoveList: any[] = [];

	public static getInstance(): FrameManager {
		if (!FrameManager.instance) {
			FrameManager.instance = new FrameManager();
		}
		return FrameManager.instance;
	}
	//初始化入口
	public init(stage: egret.Stage): void {
		this._curTime = egret.getTimer();
		this.lastTime = this._curTime;
		stage.addEventListener(egret.Event.ENTER_FRAME, this.onLoopHandler, this);
	}
	public onLoopHandler(event: egret.Event): void {
		this.doFps();
		this.doFrame();
	}
	//计算帧速
	private doFps(): void {
		this._currentFrame++;
		this._curTime = egret.getTimer();
		this.totalTime += this._curTime - this.lastTime;
		this.lastTime = this._curTime;
		this._frameRate = this._currentFrame * 1000 / this.totalTime;
	}
	private doFrame(): void {
		let arr: Array<any> = this.funsArray;
		if (arr.length == 0) return;
		let exeTime: number = 0;
		// if (arr.length > 0) {
		// 	// egret.log("doFrame",arr[0]);
		// }
		// egret.log("startDframe")
		for (let i: number = arr.length - 1; i >= 0; i--) {
			// try {
			let handler: Handler = arr[i];
			if (handler) {
				exeTime = handler.isTimer ? this._curTime : this._currentFrame;
				if (exeTime >= handler.executeTime) {
					handler.exeCallBackFun(this._curTime);
					if (!handler.isRepeat && handler.repeatCount-- <= 1) {
						handler.exeCompleteFun();
						// 
						this.removeHandler(handler.key);
					}
				}
			}

			// } catch (error) {
			// 	// egret.log("doFrame1111:", i);
			// }

		}
		// if (this._delayRemoveList.length) {
		// 	let arrLen = this._delayRemoveList.length;
		// 	for (let i = 0; i < arrLen; i++) {
		// 		this.removeHandler(this._delayRemoveList[i]);
		// 	}
		// 	this._delayRemoveList = [];
		// }
	}
	//设置帧调度
	private pool: Array<Handler> = [];
	public addFrame(func: Function, thisObject: any, delay: number = 0, reatCount: number = 0, completeFun: Function = null, completeFunObj: any = null): number {
		let key = egret.$hashCount++;
		return this.addFrameWithKey(key, func, thisObject, delay, reatCount, completeFun, completeFunObj);
	}
	public addFrameWithKey(key: any, func: Function, thisObject: any, delay: number = 0, reatCount: number = 0, completeFun: Function = null, completeFunObj: any = null) {
		if (!this.funsDic[key]) {
			var handler: Handler = this.pool.length == 0 ? new Handler() : this.pool.pop();
			handler.key = key;
			handler.method = func;
			handler.thisObject = thisObject;
			handler.delay = delay;
			handler.isTimer = false;
			handler.isRepeat = reatCount == 0;
			handler.repeatCount = reatCount;
			handler.executeTime = this._currentFrame + delay;
			handler.lastTime = this._curTime;
			handler.completeFun = completeFun;
			handler.completeObj = completeFunObj;
			this.funsDic[key] = handler;
			this.funsArray.push(handler);
			return key;
		}
		return null;
	}
	/**
	 * 延迟到当前帧所有的handler都处理完之后在移除定时回调
	 * 这个方法主要用于在定时回调里面需要移除定时回调是使用
	 */
	public delayRemoveHandler(key) {
		this.removeHandler(key);
		// var handler: Handler = this.funsDic[key];
		// if (!handler || this._delayRemoveList.indexOf(key) > -1) return;
		// this._delayRemoveList.push(key);
		// _delayRemoveList
	}

	//删除帧的调度
	public removeHandler(key: any): void {
		var handler: Handler = this.funsDic[key];
		if (!handler) return;
		var arr: Array<any> = this.funsArray;
		if (arr.length == 0) return;
		var index = arr.indexOf(handler);
		if (index != -1) {
			arr.splice(index, 1);
			handler.dispose();
			this.pool.push(handler);
			this.funsDic[key] = null;
			delete this.funsDic[key];
		}
	}



	//当前帧速
	public get frameRate(): number {
		return this._frameRate;
	}

	//当前帧
	public get currentFrame(): number {
		return this._currentFrame;
	}
	public get currentTime(): number {
		return this._curTime;
	}
	//添加秒循环
	public addTimerByKey(key: any, func: Function, thisObject: any, delay: number = 0, reatCount: number = 0, completeFun: Function = null, completeFunObj: any = null) {
		if (!this.funsDic[key]) {
			var handler: Handler = this.pool.length == 0 ? new Handler() : this.pool.pop();
			handler.key = key;
			handler.method = func;
			handler.thisObject = thisObject;
			handler.repeatCount = reatCount;
			handler.delay = delay;
			handler.isRepeat = reatCount == 0;
			handler.completeFun = completeFun;
			handler.completeObj = completeFunObj;
			handler.isTimer = true;
			handler.executeTime = delay + this._curTime;
			handler.lastTime = this._curTime;
			this.funsDic[key] = handler;
			this.funsArray.push(handler);
		}
	}

	//添加秒循环
	public addTimer(func: Function, thisObject: any, delay: number = 0, reatCount: number = 0, completeFun: Function = null, completeFunObj: any = null): number {
		let key = egret.$hashCount++;
		this.addTimerByKey(key, func, thisObject, delay, reatCount, completeFun, completeFunObj);
		return key;
	}
}
class Handler {
	constructor(method: Function = null, thisObject: any = null) {
		this.method = method;
		this.thisObject = thisObject;
	}
	//唯一标识
	public key: any;

	//处理的函数
	public method: Function;

	//处理函数所属对象
	public thisObject: any;

	//延迟的视图
	public delay: number = 0;
	public repeatCount: number = 0;

	//完成的回调函数
	public completeFun: Function;
	public completeObj: any;

	//上次执行的时间
	public lastTime: number = 0;

	//执行时间
	public executeTime: number = 0;

	//是否重复
	public isRepeat: boolean;

	public isTimer: boolean = false;
	public dispose(): void {
		this.method = null;
		this.thisObject = null;
		this.completeFun = null;
		this.completeObj = null;
	}
	//执行回调函数
	public exeCallBackFun(time: number): void {

		if (this.method) {
			this.method.call(this.thisObject, (time - this.lastTime));
		}
		this.lastTime = time;//记录当前的时间
		this.executeTime += this.delay;
	}
	//执行一个完成后的回调函数
	public exeCompleteFun(): void {

		if (this.completeFun) {
			this.completeFun.call(this.completeObj);
		}
	}
	//创建Handler 实体
	public static create(method: Function = null, thisObject: any = null): Handler {
		return new Handler(method, thisObject);
	}
}