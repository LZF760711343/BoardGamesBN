namespace zjh {
	// const chipsBgMap = [];
	let cWidth = 70;
	let cHeight = 15;
	export class ChipsPool extends eui.Group {
		public constructor() {
			super();
		}
		/**
		 * 往筹码池里面丢一个筹码
		 * @param chipsIndex:这个筹码的序号,这个需要是跟图片命名对应的
		 * @param chips:筹码具体的显示数值
		 * @param startPos:这个筹码从那里丢出来的,这个坐标是Global坐标
		 * @param delay:延迟多久播放动画
		 */
		public addChips(chipsIndex: number, label: string, startPos: egret.Point, delay: number = 0) {
			let chipsObj = ChipsObj.create(`zjh_chouma_${chipsIndex}_png`, label);
			this.addChild(chipsObj);
			chipsObj.x = startPos.x;
			chipsObj.y = startPos.y;
			egret.Point.release(startPos);
			var rx = Utils.getNumberInNormalDistribution((Global.sWidth - chipsObj.width) / 2, cWidth);
			var ry = Utils.getNumberInNormalDistribution((Global.sHeight - chipsObj.height) / 2, cHeight);
			egret.Tween.get(chipsObj).wait(delay).to({ x: rx, y: ry }, 400);
		}
		public move(pos: egret.Point) {
			return new Promise((resolve: Function, reject: Function) => {
				for (let i = 0; i < this.$children.length; i++) {
					egret.Tween.get(this.$children[i]).to({ x: pos.x, y: pos.y}, 400).call(resolve);
				}
				egret.Point.release(pos);
			});
		}
		public destroy() {
			egret.Tween.removeTweens(this);
		}
		public reset() {
			this.x = this.y = 0;
			let arrLen = this.numChildren;
			for (let i = this.numChildren - 1; i >= 0; --i) {
				let chipsOjb = <ChipsObj>this.getChildAt(i);
				chipsOjb.destroy();
			}
			this.visible = true;
		}
	}
}