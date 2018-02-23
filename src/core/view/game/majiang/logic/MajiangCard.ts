module majiang {
	/**
	 * 这个类用于
	 */
	let pools: MajiangCard[] = [];
	export class MajiangCard {
		// public disObj: Card;
		public cardValue:number;
		public suit:SUIT;
		public value:CARD_VALUE;
		public constructor() {

		}
		public init(cardValue:number) {
			this.cardValue = cardValue;
			this.value = cardValue & 0xf;
			this.suit = cardValue >> 4;
			// this.disObj = disObj;
		}
		
		public distroy() {
			// pools.push(this);
			// if (this.disObj && this.disObj.parent) {
			// 	this.disObj.parent.removeChild(this.disObj);
			// }
			// this.disObj = null;
		}
		public static create() {
			if (pools.length) {
				return pools.pop();
			}
			return new MajiangCard();
		}
	}
}