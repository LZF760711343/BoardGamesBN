namespace majiang {
	export class SelectBtn extends eui.Component {
		private _icon: eui.Image;
		private _cardType: majiang.CardType;
		public data: MJActionItem;
		public constructor() {
			super();
			this.touchChildren = false;
		}
		/**
		 * @param type:类型 碰/杠/胡/吃/勺/摊
		 * @param cardValues:碰/杠/胡/吃/勺/摊的牌
		 * @param chiValue:如果是吃的话,才会用到这个参数,用于表示显示池哪一张牌
		 */
		public init(data: MJActionItem) {
			this.data = data;
			switch (data.activeType) {
				case ACTIVE_TYPE.CHI://吃
					this._icon.source = "chi_mjz_png";
					this.currentState = "normal";
					break;
				case ACTIVE_TYPE.PENG://碰
					this._icon.source = "peng_mjz_png";
					this.currentState = "normal";
					break;
				case ACTIVE_TYPE.SHAO://勺
					this._icon.source = "shao_mjz_png";
					this.currentState = "normal";
					break;
				case ACTIVE_TYPE.GANG://杠
					this._icon.source = "gan_mjz_png";
					this.currentState = "normal";
					break;
				case ACTIVE_TYPE.TAN:
					this._icon.source = "tang_icon1_png";
					this.currentState = "noBg";
					break;
				case ACTIVE_TYPE.HU:
					this._icon.source = "hu_mjz1_png";
					this.currentState = "noBg";
					break;
			}
			if (data.activeType !== ACTIVE_TYPE.TAN && data.activeType !== ACTIVE_TYPE.HU) {
				this._cardType.setCards(data, DIRECT.BOTTOM);
			}
		}
	}
}