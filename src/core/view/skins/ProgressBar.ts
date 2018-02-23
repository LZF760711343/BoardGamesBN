namespace UI {

	export class ProgressBar extends eui.Component {
		protected _imgRect: egret.Rectangle;
		private _mask: egret.Shape;
		private _pointList: egret.Point[]
		private _allTime: number;
		private _startTimer: number;
		private _rectLength: number;
		private _startPoint: egret.Point;
		private _movePoint: egret.Point;
		public _target: eui.Rect;
		constructor() {
			super();
			this._imgRect = egret.Rectangle.create();
			this._startPoint = egret.Point.create(0, 0);
			this._movePoint = egret.Point.create(0, 0);
			// this._pointList = [];
		}
		protected childrenCreated() {
			super.childrenCreated();
		}
		private createMask() {
			let mask = this._mask = new egret.Shape();
			this._imgRect.x = 0;
			this._imgRect.y = 0;
			this._imgRect.width = this.width;
			this._imgRect.height = this.height;
			this.addChild(mask);
			this._target.mask = mask;
		}
		public startTimer(time: number) {
			if (!this._mask) {
				this.createMask();
			}
			this._mask.graphics.clear();
			this._allTime = time;
			this._movePoint.x = this._startPoint.x;
			this._movePoint.y = this._startPoint.y;
			this._rectLength = (this._imgRect.width + this._imgRect.height) * 2;
			this._pointList = [
				this._startPoint,
				egret.Point.create(this._imgRect.width / 2, this._imgRect.height / 2),
				this._movePoint,
				egret.Point.create(this._imgRect.width, 0),
				egret.Point.create(this._imgRect.width, this._imgRect.height),
				egret.Point.create(0, this._imgRect.height),
				egret.Point.create(0, 0),
			];
			this._target.strokeColor = 0x6CFF00;
			this._startTimer = Date.now();
			FrameManager.getInstance().addTimerByKey(this.hashCode, this.update, this, 1000 / 24);
			this.draw();
		}
		private getPointByLength(length: number) {
			if (length > this._rectLength) {
				this._mask.graphics.clear();
				this.stopTimer();
				return;
			}
			let realLen = length + this._startPoint.x;
			this.draw();

			if (this._pointList.length === 7) {
				if (realLen <= this._imgRect.width) {
					this._movePoint.x = realLen;
				} else {
					this._pointList.splice(3, 1);
					this._movePoint.x = this._imgRect.width;
				}
				return;
			}

			if (this._pointList.length === 6) {
				if (realLen <= this._imgRect.width + this._imgRect.height) {
					this._movePoint.y = realLen - this._imgRect.width;

				} else {
					this._movePoint.y = this._imgRect.height;
					this._pointList.splice(3, 1);
				}
				return;
			}
			if (this._pointList.length === 5) {
				if (realLen <= this._imgRect.width * 2 + this._imgRect.height) {
					this._movePoint.x = this._imgRect.width * 2 + this._imgRect.height - realLen;
				} else {
					this._movePoint.x = 0;
					this._pointList.splice(3, 1);
				}
				return;
			}
			if (this._pointList.length === 4) {
				if (realLen < this._rectLength) {
					this._movePoint.y = (this._imgRect.width + this._imgRect.height) * 2 - realLen;
				} else {
					this._movePoint.y = 0;
					this._pointList.splice(3, 1);
				}
				return;
			}
			if (this._pointList.length === 3) {
				this._movePoint.x = realLen - (this._imgRect.width + this._imgRect.height) * 2;
			}

		}
		public stopTimer() {
			FrameManager.getInstance().delayRemoveHandler(this.hashCode);
		}
		private update(curTime: number) {
			let paddingTimer = Date.now() - this._startTimer;
			let percent = paddingTimer / this._allTime;
			if (percent >= 0.666) {
				this._target.strokeColor = 0xFF0000;
			} else if (percent >= 0.333) {
				this._target.strokeColor = 0xFFEA00;
			}
			this.getPointByLength(percent * this._rectLength);
		}
		private draw() {
			let graphics = this._mask.graphics;
			graphics.clear();
			graphics.beginFill(0xff0000);
			graphics.moveTo(this._pointList[0].x, this._pointList[0].y);
			let arrLen = this._pointList.length;
			for (let i = 1; i < arrLen; i++) {
				graphics.lineTo(this._pointList[i].x, this._pointList[i].y);
			}
			graphics.lineTo(this._pointList[0].x, this._pointList[0].y);
			graphics.endFill();
		}

	}
}