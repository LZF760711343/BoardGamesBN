namespace zjh {
	const wid = 302;
	const hei = 452;
	export class CuoPaiAni extends eui.Component {

		private card: niuniu.Card[];

		private startPoint: egret.Point;
		private isTouch: boolean = false;
		private cardSrcPos: egret.Point;
		private curToucher: niuniu.Card;

		protected callBack: Function;
		protected tar: Object;
		protected arg: any[];
		public timer: number;
		private hasDrag: boolean[];
		private hasFinished: boolean;

		public constructor() {
			super();
			// this.cardSrcPos = [egret.Point.create(0, 0), egret.Point.create(0, 0), egret.Point.create(0, 0)];
			this.cardSrcPos = egret.Point.create(0, 0);
			this.startPoint = egret.Point.create(0, 0);
			this.hasFinished = false;
			this.hasDrag = [false, false, false];
		}

		private OnTouchBegin(event: egret.TouchEvent) {
			if (!this.hasFinished && event.target instanceof niuniu.Card) {
				this.isTouch = true;
				this.curToucher = event.target;
				this.startPoint.x = event.stageX;
				this.startPoint.y = event.stageY;
				this.cardSrcPos.x = this.curToucher.x;
				this.cardSrcPos.y = this.curToucher.y;
			}
		}

		private OnTouchMove(event: egret.TouchEvent) {
			if (this.isTouch && !this.hasFinished) {
				this.curToucher.x = this.cardSrcPos.x + event.stageX - this.startPoint.x;
				this.curToucher.y = this.cardSrcPos.y + event.stageY - this.startPoint.y;
			}
		}

		private OnTouchEnd(event: egret.TouchEvent) {
			if (!this.hasFinished && this.isTouch) {
				egret.log("OnTouchEnd");
				this.isTouch = false;
				this.hasDrag[this.curToucher.name] = true;
				if (this.hasDrag[1]) {
					this.CuoPaiFinished();
				}
				this.curToucher = null;
			}
		}

		public stopTimer() {
			if (this.timer) {
				egret.clearTimeout(this.timer);
				this.timer = null;
			}
		}

		//检测是否超过所能看到牌的区域占整张牌的百分比
		private CheckHasSaw(percentArea: number) {

		}
		public destroy() {
			if (this.parent) {
				this.parent.removeChild(this);
			}
			if (this.startPoint) {
				egret.Point.release(this.startPoint);
				egret.Point.release(this.cardSrcPos);
				this.cardSrcPos = this.startPoint = null;
			}
			let arrLen = this.card.length;
			for(let i = 0; i < arrLen; i++){
				this.card[i].rotation = 0;
				this.card[i].anchorOffsetX = this.card[i].anchorOffsetY = 0;
				this.card[i].name = null;
				this.card[i].destroy();
			}
			this.stopTimer();
			this.hasFinished = true;
		}
		public CuoPaiFinished() {
			var twee: egret.Tween;
			this.stopTimer();
			if (!this.hasFinished) {
				this.hasFinished = true;
				for (var i = 0; i < 3; i++) {
					var tw = egret.Tween.get(this.card[i]).to({ x: Global.sWidth / 2, y: Global.sHeight / 2 + this.card[i].height / 2 }, 200)
					if (i == 0) {
						twee = tw.to({ rotation: -20 }, 200);
					}
					if (i == 2) {
						twee = tw.to({ rotation: 20 }, 200).wait(800);
					}
					if (i == 1) {
						twee = tw.wait(100);
					}
				}
				twee.call(() => {
					this.destroy();
					if (this.callBack) {
						this.callBack.call(this.tar, this.arg);
					}
				}, this);
			}
		}


		public PlayCuoPai(value: number[], call?: Function, target?: Object, params?: any[]) {
			this.callBack = call;
			this.tar = target;
			this.arg = params;
			this.card = [];
			let mask = new eui.Rect();
			mask.width = Global.sWidth;
			mask.height = Global.sHeight;
			mask.alpha = 0.75;
			this.addChild(mask);
			for (var i = 0; i < value.length; i++) {
				this.card.push(niuniu.Card.create());
				this.card[i].currentState = "back";
				this.addChild(this.card[i]);
				this.card[i].setIcon2(value[i]);
				this.card[i].rotation = i;
				this.card[i].width = wid;
				this.card[i].height = hei;
				this.card[i].anchorOffsetX = this.card[i].width / 2;
				this.card[i].anchorOffsetY = this.card[i].height;
				this.card[i].name = i + "";
				this.card[i].x = Global.sWidth / 2;
				this.card[i].y = Global.sHeight / 2 + this.card[i].height / 2;
			}
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
			this.timer = egret.setTimeout(this.CuoPaiFinished, this, 10000);
		}
	}
}