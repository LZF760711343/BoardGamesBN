/**
 * 碰/杠/吃/勺,等牌
 */
namespace majiang {
	export class CardType extends eui.Component {
		private _cards: Card[];
		private _direct: string;

		private _pCenter: number = 0;
		public dest: MJActionItem;
		//麻将的之间的Y
		private _cardPadding: number = 0;
		//麻将的之间的X
		private _cardPaddingX: number = 0;

		public get cardPaddingX(): number {
			return this._cardPaddingX;
		}

		public set cardPaddingX(v: number) {
			this._cardPaddingX = v;
			this.updateDisplayList(0, 0);
		}

		public get cardPadding(): number {
			return this._cardPadding;
		}

		public set cardPadding(v: number) {
			this._cardPadding = v;
			this.updateDisplayList(0, 0);
		}

		public get pCenter(): number {
			return this._pCenter;
		}
		public set pCenter(v: number) {
			this._pCenter = v;
			this.updateDisplayList(0, 0);
		}

		public constructor() {
			super();
			this.init();
			this.touchChildren = false;
		}
		private init() {
			this._cards = [];
			for (let i = 0; i < 4; i++) {
				let card = Card.create();
				this.addChild(card);
				this._cards[i] = card;
			}
		}
		protected updateDisplayList(unscaledWidth: number, unscaledHeight: number) {
			if (this._direct && this._cards && this._cards.length) {
				if (this._direct === DIRECT.BOTTOM || this._direct === DIRECT.TOP) {
					let startX = 0;
					let arrLen = this._cards.length;
					for (let i = 0; i < 3; i++) {
						this._cards[i].x = startX;
						if (i === 1) {
							this._cards[3].x = startX;
							this._cards[3].y = this._pCenter;
						}
						startX += this._cards[i].width + this._cardPadding;
						egret.log(startX)
					}
				} else {
					let startX = 0;
					let startY = 0;
					let arrLen = this._cards.length;
					for (let i = 0; i < 3; i++) {
						this._cards[i].x = startX;
						this._cards[i].y = startY;
						if (i === 1) {
							this._cards[3].x = startX;
							this._cards[3].y = startY + this._pCenter;
						}
						startX +=  this._cardPaddingX;
						egret.log("startX",startX,"this._cards[i].width",this._cards[i].width,"this._cardPaddingX",this._cardPaddingX);
						startY += this._cards[i].height + this._cardPadding;
					}
				}
			}
		}
		public setCards(dest: MJActionItem, direct: string) {
			this._direct = direct;
			this.dest = dest;
			switch (direct) {
				case DIRECT.BOTTOM:
				case DIRECT.TOP:
					this._pCenter = -15;
					break;
				case DIRECT.LEFT:
					this._pCenter = -10;
					this._cardPadding = -13; //13 
					this._cardPaddingX = -8;
					break;
				case DIRECT.RIGHT:
					this._pCenter = -20;
					this._cardPadding = -12;
					this._cardPaddingX = 8;
					break;
			}
			for (let i = 0; i < 4; i++) {
				let card = this._cards[i];
				if (typeof this.dest.cardValues[i] === "undefined") {
					card.visible = false;
				} else {
					card.visible = true;
					card.cardValue = this.dest.cardValues[i];
					card.setPengIcon(direct, this.dest.cardValues[i]);
					egret.log("activeType",this.dest.activeType);
				}
			}
		}
		public static create() {
			return new CardType();
		}
	}
}