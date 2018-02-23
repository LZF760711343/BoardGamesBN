namespace Pool {
	export class ObjectGenerator {
		private _dis: IDistributor = null;

		public constructor(val: IDistributor) {
			this.init(val);
		}

		private init(val: IDistributor): void {
			this._dis = val;
		}

		public getBall(type: number): IPoolObject {
			let vo: IPoolObject = this._dis.getVO(type);
			if (vo == null) {
				// create new Object
				vo = this.createVO(type);
				this._dis.addVO(vo);
				vo.reset();
			}
			return vo;
		}

		protected createVO(type: number): IPoolObject {
			// switch (type) {
			// 	case BallType.foot:
			// 		return new FootBall();
			// 	case BallType.basket:
			// 		return new BasketBall();
			// 	case BallType.base:
			// 		return new BaseBall();
			// }
			return null;
		}
	}
}