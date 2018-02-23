var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var ROBOT;
(function (ROBOT) {
    var TAG = "ROBOT:";
    function log(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        egret.log.apply(egret, [TAG, message].concat(optionalParams));
    }
    ROBOT.log = log;
    var delay = 1000;
    var isInit = false;
    function init() {
        if (isInit) {
            return;
        }
        isInit = true;
        var robot = new Robot();
        robot.init();
    }
    ROBOT.init = init;
    var Robot = (function () {
        /**
         *
         */
        function Robot() {
            ROBOT.instance = this;
            this.logicList = {};
        }
        Robot.prototype.init = function () {
            EventManager.register(net.WebSocket.SEND_MSG, this.addMsg, this);
            this.register(11 /* GOLD_ZJH */, new ROBOT.ZJHGoldLogic());
            this.register(10 /* ZJH */, new ROBOT.ZJHLogic());
            this.register(43 /* SELECT */, new ROBOT.SelectSceneLogic());
            this.register(9 /* QZNN */, new ROBOT.NiuniuLogic());
            // this.startTimer();
            // net._instance.socket.addEventListener(net.WebSocket.SEND_MSG, this.addMsg, this);
            // this.socket.addEventListener(WebSocket.SEND_MSG, this.addMsg, this);
            // this.gameScene = gameScene;
            // this.gameDatas = gameScene.gameDatas;
            // this.msgHandler = gameScene.msgHandler;
        };
        Robot.prototype.addMsg = function (event) {
            var id = SceneManager.curScene.sceneTag;
            if (this.logicList[id]) {
                var result = event.data[0];
                var msg = event.data[1];
                switch (result) {
                    case 1 /* NEXT */: //将消息派发到下一层处理
                    case 0 /* NONE */:
                    case 3 /* STOP */:
                        break;
                    default:
                        return this.logicList[id].dispatchMsg(msg);
                }
            }
        };
        Robot.prototype.register = function (id, logic) {
            this.logicList[id] = logic;
        };
        Robot.prototype.startTimer = function () {
            if (this.timer) {
                return;
            }
            this.timer = egret.setInterval(this.update, this, delay);
        };
        Robot.prototype.stopTimer = function () {
            if (this.timer) {
                egret.clearInterval(this.timer);
                this.timer = null;
            }
        };
        Robot.prototype.update = function () {
            var id = SceneManager.curScene.sceneTag;
            if (this.logicList[id]) {
                this.logicList[id].doAction(SceneManager.curScene);
            }
        };
        Robot.prototype.desrtoy = function () {
            this.stopTimer();
        };
        return Robot;
    }());
    ROBOT.Robot = Robot;
    __reflect(Robot.prototype, "ROBOT.Robot");
})(ROBOT || (ROBOT = {}));
//# sourceMappingURL=Robot.js.map