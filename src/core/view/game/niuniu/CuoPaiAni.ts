namespace niuniu {
	export class CuoPaiAni extends eui.Component {

		private cardBg: eui.Image;
		private card: Card;
		private rect1: eui.Image;
		private rect2: eui.Image;

		private startPoint: egret.Point;
		private isTouch: boolean = false;
		private cardBgSrcPos: egret.Point;

		protected callBack: Function;
		protected tar: Object;
		protected arg: any[];
		private timer: number;
		private hasFinished: boolean;

		public constructor() {
			super();
			this.hasFinished = false;
			this.cardBgSrcPos = egret.Point.create(0, 0);
			this.startPoint = egret.Point.create(0, 0);
		}

		private OnTouchBegin(event: egret.TouchEvent) {
			if (!this.hasFinished) {

				this.isTouch = true;
				this.startPoint.x = event.stageX;
				this.startPoint.y = event.stageY;
			}
		}

		private OnTouchEnd(event: egret.TouchEvent) {
			if (!this.hasFinished) {
				this.isTouch = false;
				if (this.CheckHasSaw(80)) {
					this.CuoPaiFinished();
				}
				else {
					this.cardBg.x = this.cardBgSrcPos.x;
					this.cardBg.y = this.cardBgSrcPos.y;
				}
			}
		}

		private stopTimer() {
			if (this.timer) {
				egret.clearTimeout(this.timer);
				this.timer = null;
			}
		}

		//检测是否超过所能看到牌的区域占整张牌的百分比
		private CheckHasSaw(percentArea: number): boolean {
			let sHorizontial = Math.abs(this.cardBg.x - this.cardBgSrcPos.x);
			let sVeritical = Math.abs(this.cardBg.y - this.cardBgSrcPos.y);
			if (sHorizontial >= this.cardBg.height || sVeritical >= this.cardBg.width) {
				return true;
			}
			else {
				let areaWidth = this.cardBg.height - sHorizontial;
				let areaHeight = this.cardBg.width - sVeritical;
				let area = areaHeight * areaWidth;
				let cardArea = this.cardBg.width * this.cardBg.height;
				egret.log("面积占比：", (1 - area / cardArea));
				if ((1 - area / cardArea) >= percentArea / 100) {
					return true;
				}
			}
			return false;
		}

		public CuoPaiFinished() {
			if (!this.hasFinished) {
				this.hasFinished = true;
				this.rect1.visible = this.rect2.visible = false;
				egret.Tween.get(this.cardBg).to({ alpha: 0 }, 300).call(() => {
					egret.Tween.get(this).wait(300).call(() => {
						this.stopTimer();
						this.parent.removeChild(this);
						if (this.callBack)
							this.callBack.call(this.tar, this.arg);
						// net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_NN_SHOW).send();
					}, this);
				}, this)
			}
			if(this.cardBgSrcPos){
				egret.Point.release(this.cardBgSrcPos);
				egret.Point.release(this.startPoint);
				this.startPoint = this.cardBgSrcPos = null;
			}
		}
		private OnTouchMove(event: egret.TouchEvent) {
			if (this.isTouch && !this.hasFinished) {
				// var offset = new egret.Point(event.stageX - this.startPoint.x, event.stageY - this.startPoint.y);
				this.cardBg.x = this.cardBgSrcPos.x + event.stageX - this.startPoint.x;
				this.cardBg.y = this.cardBgSrcPos.y + event.stageY - this.startPoint.y;
			}
		}

		public PlayCuoPai(value: number, call?: Function, target?: Object, params?: any[]) {
			let mask = new eui.Rect();
			mask.width = Global.sWidth;
			mask.height = Global.sHeight;
			mask.alpha = 0.75;
			this.addChild(mask);
			this.callBack = call;
			this.tar = target;
			this.arg = params;
			this.cardBg = new eui.Image("pocker_cpbei1_png");
			this.card = niuniu.Card.create();
			this.rect1 = new eui.Image("cardMask_png");
			this.rect2 = new eui.Image("cardMask_png");
			this.addChild(this.card);
			this.addChild(this.rect1);
			this.addChild(this.rect2);
			this.addChild(this.cardBg);
			this.card.currentState = "back";
			this.card.setIcon2(value);
			this.card.width = this.cardBg.width;
			this.card.height = this.cardBg.height;

			this.card.anchorOffsetX = this.card.width / 2;
			this.card.anchorOffsetY = this.card.height / 2;
			this.cardBg.anchorOffsetX = this.cardBg.width / 2;
			this.cardBg.anchorOffsetY = this.cardBg.height / 2;

			this.cardBgSrcPos.x = this.card.x = this.cardBg.x = (Global.sWidth) / 2;
			this.cardBgSrcPos.y = this.card.y = this.cardBg.y = (Global.sHeight) / 2.3;

			this.card.rotation = this.cardBg.rotation = 90;

			this.rect1.x = this.card.x - 217;
			this.rect1.y = this.card.y - (-114);
			this.rect2.x = this.card.x + (217) - 149;
			this.rect2.y = this.card.y - (144);

			this.stopTimer();
			this.timer = egret.setTimeout(this.CuoPaiFinished, this, 8000);
			this.cardBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
			this.cardBg.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);

		}
	}
}