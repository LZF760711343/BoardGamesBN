// TypeScript file
namespace ROBOT {
    let TAG = "ROBOT:"
    export function log(message?: any, ...optionalParams: any[]) {
        egret.log(TAG, message, ...optionalParams);
    }
    const delay = 1000;
    export let instance: Robot;
    let isInit:boolean = false;
    export function init() {
        if(isInit){
            return;
        }
        isInit = true;
        let robot = new Robot();
        robot.init();
    }
    export class Robot {
        protected timer: number;
        protected gameScene: GameSceneBase;
        protected gameDatas: GameDatasBase;
        protected msgHandler: GameMsgHandlerBase;
        protected logicList: model.Map<LogicBase>;
        /**
         *
         */
        constructor() {
            instance = this;
            this.logicList = {};
        }
        public init() {
            EventManager.register(net.WebSocket.SEND_MSG, this.addMsg, this);
            this.register(GAME_ID.GOLD_ZJH, new ZJHGoldLogic());
            this.register(GAME_ID.ZJH, new ZJHLogic());
            this.register(GAME_ID.SELECT, new SelectSceneLogic());
            this.register(GAME_ID.QZNN, new NiuniuLogic());
            
            // this.startTimer();
            // net._instance.socket.addEventListener(net.WebSocket.SEND_MSG, this.addMsg, this);
            // this.socket.addEventListener(WebSocket.SEND_MSG, this.addMsg, this);
            // this.gameScene = gameScene;
            // this.gameDatas = gameScene.gameDatas;
            // this.msgHandler = gameScene.msgHandler;
        }
        private addMsg(event: egret.Event) {
            let id = SceneManager.curScene.sceneTag;
            if (this.logicList[id]) {
                let result = event.data[0];
                let msg = <net.ReceiveMsg<any>>event.data[1];
                switch (result) {
                    case net.DIS_RESULT.NEXT://将消息派发到下一层处理
                    case net.DIS_RESULT.NONE:
                    case net.DIS_RESULT.STOP:
                        break;
                    default://如果没有返回值或者返回值为DIS_RESULT.REMOVE,将消息从消息列表移除,不派发到下一层
                        return this.logicList[id].dispatchMsg(msg);
                }
            }
        }

        public register(id: GAME_ID, logic: LogicBase) {
            this.logicList[id] = logic;
        }
        public startTimer() {
            if (this.timer) {
                return;
            }
            this.timer = egret.setInterval(this.update, this, delay);
        }
        public stopTimer() {
            if (this.timer) {
                egret.clearInterval(this.timer);
                this.timer = null;
            }
        }
        protected update() {
            let id = SceneManager.curScene.sceneTag;
            if (this.logicList[id]) {
                this.logicList[id].doAction(SceneManager.curScene);
            }
        }
        public desrtoy() {
            this.stopTimer();
        }
    }
}
