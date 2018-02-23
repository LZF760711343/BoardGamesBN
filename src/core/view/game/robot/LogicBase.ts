namespace ROBOT {
	let timer;
	export function wait(delay: number) {
		return new Promise((readyFunc: Function) => {
			if(timer){
				egret.clearTimeout(timer);
			}
			timer = egret.setTimeout(() => {
				readyFunc();
				timer = null;
			}, this, delay);
		})
	}
	export abstract class LogicBase {
		public gameId: GAME_ID;
		public constructor() {
		}
		abstract doAction(scene: BaseScene);
		protected addMsg(event: egret.Event) {

		}
		public dispatchMsg(msg: net.ReceiveMsg<any>): net.DIS_RESULT {
			var funcName = 'on_' + OrderNameMap[msg.moduleId][msg.orderId];
			if (this[funcName]) {
				return this[funcName](msg);
			}
			return net.DIS_RESULT.NONE;
		}
	}
}