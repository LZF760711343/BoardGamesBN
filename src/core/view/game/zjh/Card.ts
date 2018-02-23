namespace zjh {
	let _pool: Card[] = [];
	export class Card extends CardBase {
		// private static _pool:Card[] = [];
		public constructor() {
			super();
			// this.skinName = CardSkin;
		}
		public setIcon(cardValue: number): void {
			this.cardValue = cardValue;
			this.color = cardValue & 0xf;
			this.key = cardValue >> 4;
			var key: any = MAP_NAMES[this.key];
			this.bg.source = "big_card_bg_png";
			if (this.color == 1 || this.color == 3) {
				this.icon_key.source = `card_${key}_${1}_png`;
				this.currentState = "big";
			} else if (this.color == 2 || this.color == 4) {
				this.icon_key.source = `card_${key}_${2}_png`;
				this.currentState = "big";
			} else {
				this.icon_key.source = `card_${key}_${0}_png`;
				this.currentState = "big_w";
			}
			if (this.color) {
				if (this.key == 11 || this.key == 12 || this.key == 13) {
					this.icon_color.right = this.icon_color.bottom = 0;
					if (this.color == 2 || this.color == 4) {
						this.icon_color.source = `card_head${this.key}_png`;
					} else {
						this.icon_color.source = `card_headH${this.key}_png`;
					}

				} else {
					this.icon_color.right = 11;
					this.icon_color.bottom = 13;
					this.icon_color.source = `card_color${this.color}_png`;
				}
				this.icon.source = `card_icon${this.color}_png`;
			} else {
				if (key == 14) {
					this.icon_color.source = "card_color_x_png";
				} else {
					this.icon_color.source = "card_color_d_png";
				}
			}
		}
		public setSmallIcon(cardValue): void {
			// this.cardValue = cardValue;
			// this.color = cardValue & 0xf;
			// this.key = cardValue >> 4;
			// var key: any = MAP_NAMES[this.key];
			// // var key: any = MAP_NAMES[this.key];
			// this.bg.source = "card_bg_png";
			// if (this.color == 1 || this.color == 3) {
			// 	this.currentState = "small";
			// 	this.icon_key.source = `card_${key}_${1}_png`;
			// } else if (this.color == 2 || this.color == 4) {
			// 	this.icon_key.source = `card_${key}_${2}_png`;
			// 	this.currentState = "small";
			// } else {
			// 	this.icon_key.source = `card_${key}_${0}_png`;
			// 	this.currentState = "small_w";
			// }
			// if (this.color) {
			// 	this.icon_color.source = `card_color${this.color}_png`;
			// 	this.icon.source = `card_icon${this.color}_png`;
			// } else {
			// 	if (key == 14) {
			// 		this.icon_color.source = "card_color_x_png";
			// 	} else {
			// 		this.icon_color.source = "card_color_d_png";
			// 	}
			// }
		}
		public reset() {
			super.reset();

		}
		/**
		 * 将自己从父节点移除,并且放入到缓存池中
		 */
		public destroy() {
			if (_pool.indexOf(this) === -1) {
				_pool.push(this);
			}
			// this.scaleX = this.scaleY = 1;
			if (this.parent) {
				this.parent.removeChild(this);
			}
			this.reset();
		}
		public static create() {
			if (_pool.length) {
				return _pool.pop();
			} else {
				let card = new Card();
				card.skinName = niuniu.CardSkin;
				return card;
			}
		}
	}
}