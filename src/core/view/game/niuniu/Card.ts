namespace niuniu {
	let _pool: Card[] = [];
	export class Card extends CardBase {
		// private static _pool:Card[] = [];
		public constructor() {
			super();
		}
		public setIcon(cardValue: number): void {
			this.cardValue = cardValue;
			// this.color = (cardValue >> 4) & 0x7;
			// var key = this.key = cardValue & 0xF;
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
			// egret.log("this.color" + this.color, 'FF' + this.key)
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

		public setIcon2(cardValue: number): void {
			this.cardValue = cardValue;
			// this.color = (cardValue >> 4) & 0x7;
			// var key = this.key = cardValue & 0xF;
			this.color = cardValue & 0xf;
			this.bg.source = "big_card_bg_png";
			this.key = cardValue >> 4;
			if (this.key == CARD_VALUE.VALUE_DG) {
				this.bg.source = "wang_1_png";
			}
			else if (this.key == CARD_VALUE.VALUE_XG) {
				this.bg.source = "wang_hui_png";
			}
			else {
				this.bg.source = `${this.key}_${this.color}_png`;
			}
		}

		public setIconByBrnn(cardValue: number): void {
			this.cardValue = cardValue;
			// this.color = (cardValue >> 4) & 0x7;
			// var key = this.key = cardValue & 0xF;
			this.color = cardValue & 0xf;
			this.key = cardValue >> 4;
			var key: any = MAP_NAMES[this.key];
			this.bg.source = "big_card_bg_png";
			if (this.color == 1 || this.color == 3) {
				this.icon_key.source = `brnncard_${key}_${1}_png`;
				this.currentState = "big_brnn";
				this.icon_key.scaleX = this.icon_key.scaleY = 1;
			} else if (this.color == 2 || this.color == 4) {
				this.icon_key.source = `brnncard_${key}_${2}_png`;
				this.currentState = "big_brnn";
				this.icon_key.scaleX = this.icon_key.scaleY = 1;
			} else {
				this.icon_key.source = `card_${key}_${0}_png`;
				this.currentState = "big_w";
				this.icon_key.scaleX = this.icon_key.scaleY = 1.2;
			}
			// egret.log("this.color" + this.color, 'FF' + this.key)
			if (this.color) {
				if (this.key == 11 || this.key == 12 || this.key == 13) {
					this.icon_color.right = this.icon_color.bottom = 0;
					if (this.color == 2 || this.color == 4) {
						this.icon_color.source = `card_head${this.key}_png`;
					} else {
						this.icon_color.source = `card_headH${this.key}_png`;
					}
				} else {
					this.icon_color.right = 5;
					this.icon_color.bottom = 6;
					// this.icon_color.scaleX = this.icon_color.scaleY = 1;
					this.icon_color.source = `card_color${this.color}_png`;
				}
				this.icon.source = `card_icon${this.color}_png`;
			} else {
				if (key == 14) {
					this.icon_color.source = "card_color_x_png";
				} else {
					this.icon_color.source = "card_color_d_png";
				}
				// this.icon_color.scaleX = this.icon_color.scaleY = 1.2;
			}
		}

		public setSmallIcon(cardValue): void {
			this.cardValue = cardValue;
			this.color = cardValue & 0xf;
			this.key = cardValue >> 4;
			var key: any = MAP_NAMES[this.key];
			// var key: any = MAP_NAMES[this.key];
			this.bg.source = "big_card_bg_png";
			if (this.color == 1 || this.color == 3) {
				this.currentState = "small";
				this.icon_key.source = `card_${key}_${1}_png`;
			} else if (this.color == 2 || this.color == 4) {
				this.icon_key.source = `card_${key}_${2}_png`;
				this.currentState = "small";
			} else {
				this.icon_key.source = `card_${key}_${0}_png`;
				this.currentState = "small_w";
			}
			if (this.color) {
				this.icon_color.source = `card_color${this.color}_png`;
				this.icon.source = `card_icon${this.color}_png`;
			} else {
				if (key == 14) {
					this.icon_color.source = "card_color_x_png";
				} else {
					this.icon_color.source = "card_color_d_png";
				}
			}
		}

		/**
		 * 将自己从父节点移除,并且放入到缓存池中
		 */
		public destroy() {
			if (_pool.indexOf(this) === -1) {
				_pool.push(this);
			}
			if (this.parent) {
				this.parent.removeChild(this);
			}
			egret.Tween.removeTweens(this);
			this.reset();
		}
		public static create() {
			if (_pool.length) {
				return _pool.pop();
			} else {
				let card = new Card();
				card.skinName = CardSkin;
				return card;
			}
		}
	}
}