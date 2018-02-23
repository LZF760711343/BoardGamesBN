var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ROBOT;
(function (ROBOT) {
    var timer;
    function wait(delay) {
        var _this = this;
        return new Promise(function (readyFunc) {
            if (timer) {
                egret.clearTimeout(timer);
            }
            timer = egret.setTimeout(function () {
                readyFunc();
                timer = null;
            }, _this, delay);
        });
    }
    ROBOT.wait = wait;
    var LogicBase = (function () {
        function LogicBase() {
        }
        LogicBase.prototype.addMsg = function (event) {
        };
        LogicBase.prototype.dispatchMsg = function (msg) {
            var funcName = 'on_' + OrderNameMap[msg.moduleId][msg.orderId];
            if (this[funcName]) {
                return this[funcName](msg);
            }
            return 0 /* NONE */;
        };
        return LogicBase;
    }());
    ROBOT.LogicBase = LogicBase;
    __reflect(LogicBase.prototype, "ROBOT.LogicBase");
})(ROBOT || (ROBOT = {}));
//# sourceMappingURL=LogicBase.js.map