/**
 * @description 装饰器函数
 * 把这个放在这里是一个比较无奈之举,因为些装饰器函数都是在编译阶段就已经起作用了,
 * 所有必须得保证这些函数的定义必须得在其他用到这些函数的类之前,
 * 而BaseScene.ts这个文件在目前是最先加载的文件,所以先放到这里,后续再看有没有什么更好的解决方案
 */
namespace Decorators {
	/**
     * @description 自动打印函数的第一个参数
     */
    export let printDatas = (value: boolean) => {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            if (value) {
                const method = descriptor.value;
                descriptor.value = function (...arg) {
                    egret.log("dispatchMsg:", propertyKey, arg[0].datas);
                    return method.apply(this, arg);
                }
            } else {
                    return descriptor.value;
            }
        };
    }
    /**
     *@description 检查第一个参数是否为空
     */
    export let checkNull = (target, propertyKey, descriptor) => {
        const method = descriptor.value;
        descriptor.value = function (...arg) {
            if (!arg[0]) {
                egret.warn(`方法${propertyKey}的参数不能为null`)
                return null;
            }
            else {
                return method.apply(this, arg);
            }

        }
    }
    /**
     * @description 调用一个函数时,自动打印这个函数的一些信息
     */
    export let pringMsg = (str?: string) => {
        return (target, propertyKey, descriptor) => {
            const method = descriptor.value;
            descriptor.value = function (...arg) {
                egret.log(propertyKey + str)
                return method.apply(this, arg);
            }
        }
    }
}
/**
 * @author HE
 * 所有场景的基类
 */
class BaseScene extends eui.Component implements net.IMsgHandler {
    /**
     * 场景id
     */
    public sceneTag: GAME_ID;
    /**
     * UI层
     */
    public uiLayer: eui.Component;
    /**
     * 面板层
     */
    public panelLayer: eui.Component;

    /**
     * 特效动画层
     */
    public effectLayer: eui.Component;
    /**
     * 提示跟弹窗
     */
    public tipLayer: eui.Component;

    // protected _timerKey: string;
    public constructor() {
        super();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        this.percentWidth = this.percentHeight = 100;
    }
    protected childrenCreated(): void {
        super.childrenCreated();
        Layers.init(this.panelLayer || this);
    }
    /**
     * 开启定时器
     * @param type:0 帧定时器, 1 毫秒定时器
     */
    public startTimer(type: number, delay?: number) {
        this.stopTimer();
        if (type) {
            FrameManager.getInstance().addTimerByKey("timer" + this.hashCode, this.update, this, delay);
        } else {
            FrameManager.getInstance().addFrameWithKey("timer" + this.hashCode, this.update, this, delay);
        }
    }
    public stopTimer() {
        FrameManager.getInstance().delayRemoveHandler("timer" + this.hashCode);
    }
    protected update() {

    }
    
    /**
     * 安卓返回键回调
     */
    protected keyBackCB() {
        // if(this._endGameDialog) {
        //     return;
        // }
        // var alert = this._endGameDialog = Layers.AlertDialog.create(GameLangs.exitGameTip,Layers.AlertDialog.SURE_CANNEL);
        // alert.addSureCB(NativeBridge.endGame,NativeBridge);
        // alert.addCannelCB(() => {
        //     alert.close();
        //     this._endGameDialog = null;
        // },this);
    }
    public dispatchMsg(msg: net.ReceiveMsg<any>): net.DIS_RESULT {
        return net.DIS_RESULT.NONE;
    }
    /**
     * 屏幕旋转回调
     */
    public onOrientationChange() {

    }
    // public executeFunc(value:string):void{
    //     egret.log(typeof (this[value]));
    //     if(typeof(this[value]) == "function"){
    //         this[value]();
    //     }
    // }


    protected onExit(): void {
        this.stopTimer();
    }

    /**
     * 切换到后台
     */
    public onBackground(evt: egret.TouchEvent) {
    }
    /**
     * 从后台切换回游戏
     */
    public onForeground(evt: egret.TouchEvent) {
    }
}

