var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 简单封装一个单例的事件管理器
 *
 * 所有的事件都交由该管理器完成，但是有一个缺陷不知是否是缺陷：就是没有具体的事件派发者，
 * 所有派发工作都交由管理器完成了，所有无法得到当前的事件引发目标。
 */
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        return _super.call(this) || this;
    }
    EventManager.getInstance = function () {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    };
    /**
     *  直接创建一个指定typeName的事件
     */
    EventManager.createEventByName = function (typeName, data) {
        //创建并缓存事件
        var event = egret.Event.create(egret.Event, typeName);
        if (data)
            event.data = data;
        egret.Event.release(event);
        return EventManager.instance;
    };
    /**
     * 派发事件
     * 可以选择派发stirng类型的事件名，
     * 也可以选择派发具体的event事件，派发具体的event事件时，data没有作用
     */
    EventManager.dispatchEvent = function (type, data) {
        if (data === void 0) { data = null; }
        if (typeof type === "string") {
            EventManager.getInstance().dispatchEventWith(type, false, data);
            return;
        }
        if (type instanceof egret.Event) {
            EventManager.getInstance().dispatchEvent(type);
            return;
        }
        egret.log("dispatchEvent:" + typeof type);
    };
    /**
     * 注册事件
     * type:事件类型
     * callBack:
     * thisObject:绑定的作用域范围（主要是解决callBack方法内this的引用）
     * priority:事件的优先级
     */
    EventManager.register = function (type, callBack, thisObject, priority) {
        if (priority)
            EventManager.getInstance().addEventListener(type, callBack, thisObject, false, priority);
        else
            EventManager.getInstance().addEventListener(type, callBack, thisObject);
        egret.log("register");
    };
    /**
     * 注册只使用一次即销毁的事件
     */
    EventManager.registerOnce = function (type, callBack, thisObject, priority) {
        if (priority)
            EventManager.getInstance().once(type, callBack, thisObject, false, priority);
        else
            EventManager.getInstance().once(type, callBack, thisObject);
    };
    /**
     * 移除监听器
     * 设置useCapture为true时，会同时移除捕获阶段的事件
     */
    EventManager.remove = function (type, callBack, thisObject, useCapture) {
        EventManager.getInstance().removeEventListener(type, callBack, thisObject, false);
        //若useCapture存在并且为true时，移除其捕获阶段的事件
        if (useCapture)
            EventManager.getInstance().removeEventListener(type, callBack, thisObject, true);
    };
    return EventManager;
}(egret.EventDispatcher));
EventManager.instance = null;
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map