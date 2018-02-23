namespace DDZ {
	let _pool: Card[] = [];
	export class Card extends CardBase {
		// private static _pool:Card[] = [];
		private _cardValue: number = 0;
		public pCard: PokerCard;
		private _landlordIcon: eui.Image;
		public constructor() {
			super();
		}
		public set cardValue(value) {
			if (value) {
				this.color = value & 0xf;
				this.key = value >> 4;
				this.setIcon(this.color, this.key);
			} else {
				this._cardValue = value;
				this.setBack();
			}

		}
		public setSelect() {
			this.select = !this.select;
			if (this.select) {
				this.y -= 30;
			} else {
				this.y += 30;
			}
			this.shader.visible = false;
		}
		public get cardValue() {
			return this._cardValue;
		}
		public setPokerCard(pokerCard: PokerCard, isSmall: boolean = false, isLoanlord = false) {
			this._cardValue = pokerCard.cardValue;
			this.pCard = pokerCard;
			if (isSmall) {
				this.setSmallIcon(pokerCard.suit, pokerCard.value, isLoanlord);
			} else {
				this.setIcon(pokerCard.suit, pokerCard.value, isLoanlord);
			}
		}
		public setIcon(color: SUIT_VALUE, _key: CARD_VALUE, isLoanlord: boolean = false): void {
			this.color = color;
			this.key = _key;
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
					this.icon_color.right=this.icon_color.bottom=0;
					if (this.color == 2 || this.color == 4) {
						this.icon_color.source = `card_head${this.key}_png`;
					}else{
						this.icon_color.source = `card_headH${this.key}_png`;
					}

				} else {
					this.icon_color.right=11;
					this.icon_color.bottom=10;
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
			isLoanlord && this.setLandlordIcon(false);
		}
		public removeLandlordIcon(){
			if(this._landlordIcon){
				this.removeChild(this._landlordIcon);
				this._landlordIcon = null;
			}
		}
		public setSmallIcon(color: SUIT_VALUE, _key: CARD_VALUE, isLoanlord: boolean = false): void {
			// this._cardValue = cardValue;
			this.color = color;
			this.key = _key;
			var key: any = MAP_NAMES[this.key];
			// var key: any = MAP_NAMES[this.key];
			// this.bg.source = "big_card_bg_png";
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
			isLoanlord && this.setLandlordIcon(true);
		}
		/**
         * 设置地主牌标志         */
		public setLandlordIcon(isSmall: boolean) {
			//        this.addChild
			if (this._landlordIcon) {
				return;
			}
			var img = this._landlordIcon = new eui.Image("dizhu_pocker_png");
			if (isSmall) {
				img.right = 0;
				img.scaleX = img.scaleY = 0.6;
			} else {
				img.right = 1;
			}
			img.top = 0;
			this.addChild(img);
		}
		/**
		 * 将自己从父节点移除,并且放入到缓存池中
		 */
		public destroy() {
			if (_pool.indexOf(this) === -1) {
				_pool.push(this);
			}
			this.pCard = null;
			this.scaleX = this.scaleY = 1;
			if (this.parent) {
				this.parent.removeChild(this);
			}
			if(this._landlordIcon){//移除地主标识
				this.removeChild(this._landlordIcon);
				this._landlordIcon = null;
			}
			this.reset();
		}
		public static create(): Card {
			if (_pool.length) {
				return _pool.pop();
			} else {
				return new Card();
			}
		}
	}
}