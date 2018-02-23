namespace ROBOT {
	let config = {
		
	}
	export class ZJHGoldLogic extends ZJHLogic{
        constructor() {
            super();
            // Robot.instance = this;
        }
        public destroy() {
            // super.desrtoy();
            // this.gameDatas = this.gameScene = this.msgHandler = ZJHRobot.instance = null;
        }
        protected doPreStart(scene: zjh.GameScene) {
            super.doPreStart(scene);
            //如果当前是轮到自己操作
            // if (!this.gameDatas.playerDatas[this.gameDatas.myPlyerId].ready) {
            //     this.msgHandler.sendReadyGame();
            //     // if()
            // }
            // if (this.gameDatas.myPlyerId && this.gameDatas.myPlyerId === this.gameDatas.curActionId) {
            //     this.msgHandler.sendBetMsg(this.gameDatas.curBetCnt);
            // }
        }
        protected async doStart(scene: zjh.GameScene) {
            super.doStart(scene);
            //如果当前是轮到自己操作
            // if (this.gameDatas.myPlyerId && this.gameDatas.myPlyerId === this.gameDatas.curActionId) {
            //     this.msgHandler.sendBetMsg(this.gameDatas.curBetCnt);
            // }
            // if (this.isWaitClose) {
            //     return;
            // }
            // let layer = Layers.getLayer(niuniu.RoundAccountLayer);
            // if (layer) {
            //     this.isWaitClose = true;
            //     await this.gameScene.wait(600);
            //     this.isWaitClose = false;
            //     layer.onTouchGoBtn();
            // }
        }
	}
}