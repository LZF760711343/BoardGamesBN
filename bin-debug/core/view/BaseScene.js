var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @description 装饰器函数
 * 把这个放在这里是一个比较无奈之举,因为些装饰器函数都是在编译阶段就已经起作用了,
 * 所有必须得保证这些函数的定义必须得在其他用到这些函数的类之前,
 * 而BaseScene.ts这个文件在目前是最先加载的文件,所以先放到这里,后续再看有没有什么更好的解决方案
 */
var Decorators;
(function (Decorators) {
    /**
     * @description 自动打印函数的第一个参数
     */
    Decorators.printDatas = function (value) {
        return function (target, propertyKey, descriptor) {
            if (value) {
                var method_1 = descriptor.value;
                descriptor.value = function () {
                    var arg = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        arg[_i] = arguments[_i];
                    }
                    egret.log("dispatchMsg:", propertyKey, arg[0].datas);
                    return method_1.apply(this, arg);
                };
            }
            else {
                return descriptor.value;
            }
        };
    };
    /**
     *@description 检查第一个参数是否为空
     */
    Decorators.checkNull = function (target, propertyKey, descriptor) {
        var method = descriptor.value;
        descriptor.value = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            if (!arg[0]) {
                egret.warn("\u65B9\u6CD5" + propertyKey + "\u7684\u53C2\u6570\u4E0D\u80FD\u4E3Anull");
                return null;
            }
            else {
                return method.apply(this, arg);
            }
        };
    };
    /**
     * @description 调用一个函数时,自动打印这个函数的一些信息
     */
    Decorators.pringMsg = function (str) {
        return function (target, propertyKey, descriptor) {
            var method = descriptor.value;
            descriptor.value = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                egret.log(propertyKey + str);
                return method.apply(this, arg);
            };
        };
    };
})(Decorators || (Decorators = {}));
/**
 * @author HE
 * 所有场景的基类
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    // protected _timerKey: string;
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onExit, _this);
        _this.percentWidth = _this.percentHeight = 100;
        return _this;
    }
    BaseScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        Layers.init(this.panelLayer || this);
    };
    /**
     * 开启定时器
     * @param type:0 帧定时器, 1 毫秒定时器
     */
    BaseScene.prototype.startTimer = function (type, delay) {
        this.stopTimer();
        if (type) {
            FrameManager.getInstance().addTimerByKey("timer" + this.hashCode, this.update, this, delay);
        }
        else {
            FrameManager.getInstance().addFrameWithKey("timer" + this.hashCode, this.update, this, delay);
        }
    };
    BaseScene.prototype.stopTimer = function () {
        FrameManager.getInstance().delayRemoveHandler("timer" + this.hashCode);
    };
    BaseScene.prototype.update = function () {
    };
    /**
     * 安卓返回键回调
     */
    BaseScene.prototype.keyBackCB = function () {
        // if(this._endGameDialog) {
        //     return;
        // }
        // var alert = this._endGameDialog = Layers.AlertDialog.create(GameLangs.exitGameTip,Layers.AlertDialog.SURE_CANNEL);
        // alert.addSureCB(NativeBridge.endGame,NativeBridge);
        // alert.addCannelCB(() => {
        //     alert.close();
        //     this._endGameDialog = null;
        // },this);
    };
    BaseScene.prototype.dispatchMsg = function (msg) {
        return 0 /* NONE */;
    };
    /**
     * 屏幕旋转回调
     */
    BaseScene.prototype.onOrientationChange = function () {
    };
    // public executeFunc(value:string):void{
    //     egret.log(typeof (this[value]));
    //     if(typeof(this[value]) == "function"){
    //         this[value]();
    //     }
    // }
    BaseScene.prototype.onExit = function () {
        this.stopTimer();
    };
    /**
     * 切换到后台
     */
    BaseScene.prototype.onBackground = function (evt) {
    };
    /**
     * 从后台切换回游戏
     */
    BaseScene.prototype.onForeground = function (evt) {
    };
    return BaseScene;
}(eui.Component));
__reflect(BaseScene.prototype, "BaseScene", ["net.IMsgHandler"]);
//# sourceMappingURL=BaseScene.js.map