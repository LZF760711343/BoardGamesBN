namespace majiang {
	const _pool: Card[] = [];

	const T_SCALE = 0.6;
	const T_CARD_WIDTH = 54 * T_SCALE;
	const T_CARD_HEIGHT = 83 * T_SCALE;
	const T_DIS_CARD_WIDTH = 37;
	const T_DIS_CARD_HEIGHT = 55;
	// const L_SCALE = 0.6;
	// const L_CARD_WIDTH = 74 * L_SCALE;
	// const L_CARD_HEIGHT = 58 * L_SCALE;
	// const SIZE_MAP = {
	// 	left: [L_CARD_WIDTH, L_CARD_HEIGHT],
	// 	right: [],
	// 	bottom: [54, 87],
	// 	top: [T_CARD_WIDTH, T_CARD_HEIGHT],
	// }
	export class Card extends eui.Component {
		public icon: string = "";
		private _icon: string = "";
		public cardValue: number;
		public direct: string = DIRECT.NONE;
		private _type: CARD_TYPE;
		public select: boolean;
		public isMark: boolean;
		public _lazi: eui.Image;

		public constructor() {
			super();
			this.touchChildren = false;
		}

		/**
		 * 将自己从父节点移除,并且放入到缓存池中
		 */
		public destroy() {
			// if (_pool.indexOf(this) === -1) {
			// 	_pool.push(this);
			// }
			// this.x = this.y = 0;
			// // this.pCard = null;
			// this.isMark = null;
			// this.scaleX = this.scaleY = 1;
			if (this.parent) {
				this.parent.removeChild(this);
			}
			// this.reset();
		}
		public setType(type: CARD_TYPE) {
			if (this._type !== type) {
				this._type = type;
				switch (type) {
					case CARD_TYPE.HAND:
						break;
					case CARD_TYPE.PENG:
						break;
					case CARD_TYPE.SHOW:
						break;
				}
			}
		}

		public setHandCardIcon(direct: string, value: CARD_VALUE, laziValue: number) {
			this.width = this.height = NaN;
			if (laziValue) {
				if (laziValue == value) {
					this._lazi.visible = true;
				} else {
					this._lazi.visible = false;
				}
			}
			switch (direct) {
				case DIRECT.BOTTOM:
					this.icon = `mj_bottom${value}_png`;
					break;
				case DIRECT.LEFT:
					this.icon = `mj_icon${value}_png`;
					break;
				case DIRECT.RIGHT:
					this.icon = `mj_right${value}_png`;
					break;
				case DIRECT.TOP:
					this.icon = `mj_top${value}_png`;
					if (value === CARD_VALUE.NONE) {
						break;
					}
					this.width = T_CARD_WIDTH;
					this.height = T_CARD_HEIGHT;
					break;
			}
		}

		// public setLaziIcon(direct)

		/**
		 * 设置碰/杠/吃/勺,牌的图标
		 */
		public setPengIcon(direct: string, value: CARD_VALUE) {
			this.width = this.height = NaN;
			switch (direct) {
				case DIRECT.BOTTOM:
					if (value) {
						this.icon = `mj_bottomD${value}_png`;
					} else {
						this.icon = "mj_peng_bottom0_png";
					}
					break;
				case DIRECT.TOP:
					if (value) {
						this.icon = `mj_bottomD${value}_png`;
					} else {
						this.icon = "mj_peng_top0_png";
					}
					this.width = T_CARD_WIDTH;
					this.height = T_CARD_HEIGHT;
					break;
				case DIRECT.LEFT:
					if (value) {
						this.icon = `mj_left${value}_png`;
					} else {
						this.icon = "mj_peng_left0_png";
					}
					this.width = 45;
					this.height = 33;
					break;
				case DIRECT.RIGHT:
					if (value) {
						this.icon = `mj_right${value}_png`;
					} else {
						this.icon = "mj_peng_right0_png";
					}
					this.width = 45;
					this.height = 33;
					break;
			}

			// this
		}



		/**
		 * 设置打出的牌的图标
		 */
		public setDisIcon(direct: string, value: CARD_VALUE) {
			this._lazi.visible = false;
			this.width = this.height = NaN;
			switch (direct) {
				case DIRECT.BOTTOM:
				case DIRECT.TOP:
					this.icon = `mj_bottomD${value}_png`;
					this.width = T_DIS_CARD_WIDTH;
					this.height = T_DIS_CARD_HEIGHT;
					break;
				case DIRECT.LEFT:
					this.icon = `mj_leftD${value}_png`;
					this.width = 48;
					this.height = 41;
					break;
				case DIRECT.RIGHT:
					this.icon = `mj_rightD${value}_png`;
					this.width = 48;
					this.height = 41;
					break;
			}
			this.cardValue = value;
		}
		public changeSelect() {
			this.select = !this.select;
			if (this.select) {
				this.y -= 20;
			} else {
				this.y += 20;
			}
		}
		public static create(): Card {
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