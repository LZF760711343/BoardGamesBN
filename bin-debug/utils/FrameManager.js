var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FrameManager = (function () {
    function FrameManager() {
        //方法集合
        this.funsArray = [];
        this.funsDic = {};
        this.totalTime = 0;
        this._currentFrame = 0;
        this._delayRemoveList = [];
        //设置帧调度
        this.pool = [];
    }
    FrameManager.getInstance = function () {
        if (!FrameManager.instance) {
            FrameManager.instance = new FrameManager();
        }
        return FrameManager.instance;
    };
    //初始化入口
    FrameManager.prototype.init = function (stage) {
        this._curTime = egret.getTimer();
        this.lastTime = this._curTime;
        stage.addEventListener(egret.Event.ENTER_FRAME, this.onLoopHandler, this);
    };
    FrameManager.prototype.onLoopHandler = function (event) {
        this.doFps();
        this.doFrame();
    };
    //计算帧速
    FrameManager.prototype.doFps = function () {
        this._currentFrame++;
        this._curTime = egret.getTimer();
        this.totalTime += this._curTime - this.lastTime;
        this.lastTime = this._curTime;
        this._frameRate = this._currentFrame * 1000 / this.totalTime;
    };
    FrameManager.prototype.doFrame = function () {
        var arr = this.funsArray;
        if (arr.length == 0)
            return;
        var exeTime = 0;
        // if (arr.length > 0) {
        // 	// egret.log("doFrame",arr[0]);
        // }
        // egret.log("startDframe")
        for (var i = arr.length - 1; i >= 0; i--) {
            // try {
            var handler = arr[i];
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
        }
        // if (this._delayRemoveList.length) {
        // 	let arrLen = this._delayRemoveList.length;
        // 	for (let i = 0; i < arrLen; i++) {
        // 		this.removeHandler(this._delayRemoveList[i]);
        // 	}
        // 	this._delayRemoveList = [];
        // }
    };
    FrameManager.prototype.addFrame = function (func, thisObject, delay, reatCount, completeFun, completeFunObj) {
        if (delay === void 0) { delay = 0; }
        if (reatCount === void 0) { reatCount = 0; }
        if (completeFun === void 0) { completeFun = null; }
        if (completeFunObj === void 0) { completeFunObj = null; }
        var key = egret.$hashCount++;
        return this.addFrameWithKey(key, func, thisObject, delay, reatCount, completeFun, completeFunObj);
    };
    FrameManager.prototype.addFrameWithKey = function (key, func, thisObject, delay, reatCount, completeFun, completeFunObj) {
        if (delay === void 0) { delay = 0; }
        if (reatCount === void 0) { reatCount = 0; }
        if (completeFun === void 0) { completeFun = null; }
        if (completeFunObj === void 0) { completeFunObj = null; }
        if (!this.funsDic[key]) {
            var handler = this.pool.length == 0 ? new Handler() : this.pool.pop();
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
    };
    /**
     * 延迟到当前帧所有的handler都处理完之后在移除定时回调
     * 这个方法主要用于在定时回调里面需要移除定时回调是使用
     */
    FrameManager.prototype.delayRemoveHandler = function (key) {
        this.removeHandler(key);
        // var handler: Handler = this.funsDic[key];
        // if (!handler || this._delayRemoveList.indexOf(key) > -1) return;
        // this._delayRemoveList.push(key);
        // _delayRemoveList
    };
    //删除帧的调度
    FrameManager.prototype.removeHandler = function (key) {
        var handler = this.funsDic[key];
        if (!handler)
            return;
        var arr = this.funsArray;
        if (arr.length == 0)
            return;
        var index = arr.indexOf(handler);
        if (index != -1) {
            arr.splice(index, 1);
            handler.dispose();
            this.pool.push(handler);
            this.funsDic[key] = null;
            delete this.funsDic[key];
        }
    };
    Object.defineProperty(FrameManager.prototype, "frameRate", {
        //当前帧速
        get: function () {
            return this._frameRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameManager.prototype, "currentFrame", {
        //当前帧
        get: function () {
            return this._currentFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameManager.prototype, "currentTime", {
        get: function () {
            return this._curTime;
        },
        enumerable: true,
        configurable: true
    });
    //添加秒循环
    FrameManager.prototype.addTimerByKey = function (key, func, thisObject, delay, reatCount, completeFun, completeFunObj) {
        if (delay === void 0) { delay = 0; }
        if (reatCount === void 0) { reatCount = 0; }
        if (completeFun === void 0) { completeFun = null; }
        if (completeFunObj === void 0) { completeFunObj = null; }
        if (!this.funsDic[key]) {
            var handler = this.pool.length == 0 ? new Handler() : this.pool.pop();
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
    };
    //添加秒循环
    FrameManager.prototype.addTimer = function (func, thisObject, delay, reatCount, completeFun, completeFunObj) {
        if (delay === void 0) { delay = 0; }
        if (reatCount === void 0) { reatCount = 0; }
        if (completeFun === void 0) { completeFun = null; }
        if (completeFunObj === void 0) { completeFunObj = null; }
        var key = egret.$hashCount++;
        this.addTimerByKey(key, func, thisObject, delay, reatCount, completeFun, completeFunObj);
        return key;
    };
    return FrameManager;
}());
FrameManager.instance = null;
FrameManager._key = 0;
__reflect(FrameManager.prototype, "FrameManager");
var Handler = (function () {
    function Handler(method, thisObject) {
        if (method === void 0) { method = null; }
        if (thisObject === void 0) { thisObject = null; }
        //延迟的视图
        this.delay = 0;
        this.repeatCount = 0;
        //上次执行的时间
        this.lastTime = 0;
        //执行时间
        this.executeTime = 0;
        this.isTimer = false;
        this.method = method;
        this.thisObject = thisObject;
    }
    Handler.prototype.dispose = function () {
        this.method = null;
        this.thisObject = null;
        this.completeFun = null;
        this.completeObj = null;
    };
    //执行回调函数
    Handler.prototype.exeCallBackFun = function (time) {
        if (this.method) {
            this.method.call(this.thisObject, (time - this.lastTime));
        }
        this.lastTime = time; //记录当前的时间
        this.executeTime += this.delay;
    };
    //执行一个完成后的回调函数
    Handler.prototype.exeCompleteFun = function () {
        if (this.completeFun) {
            this.completeFun.call(this.completeObj);
        }
    };
    //创建Handler 实体
    Handler.create = function (method, thisObject) {
        if (method === void 0) { method = null; }
        if (thisObject === void 0) { thisObject = null; }
        return new Handler(method, thisObject);
    };
    return Handler;
}());
__reflect(Handler.prototype, "Handler");
//# sourceMappingURL=FrameManager.js.map