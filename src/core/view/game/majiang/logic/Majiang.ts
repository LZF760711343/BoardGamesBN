module majiang {
	export class Majiang {
		public constructor() {
		}
		public static sort(cardValue: CARD_VALUE[], laziCard: CARD_VALUE) {
			cardValue.sort((a: CARD_VALUE, b: CARD_VALUE) => {
				if (laziCard) {
					if (laziCard == a) {
						if (laziCard == b) {
							return 0;
						}
						return -1;
					}
					if (laziCard == b) {
						return 1;
					}
				}
				return a - b;

			});
		}
		// public static sortLazi(cardValue: CARD_VALUE[], laziCard: CARD_VALUE) {
		// 	cardValue.sort((a: CARD_VALUE, b: CARD_VALUE) => {
		// 		if (laziCard) {
		// 			if (laziCard == a) {
		// 				if (laziCard == b) {
		// 					return 0;
		// 				}
		// 				return -1;
		// 			}
		// 			if (laziCard == b) {
		// 				return 1;
		// 			}
		// 		}
		// 		return -1;

		// 	});
		// }
		public static cardValueToStr(cardValue: CARD_VALUE) {
			let value = cardValue & 0xf;
			let suit = cardValue >> 4;
			if (suit === SUIT.ZIPAI) {
				return ZI_NAMES[value];
			}
			return VALUE_NAMES[value] + SUIT_NAMES[suit];
		}
		public static cardValuesToStr(cardValues: CARD_VALUE[]) {
			let arrLen = cardValues.length;
			let temp = [];
			// cardValues.toString(()=>{});
			for (let i = 0; i < arrLen; i++) {
				temp[i] = Majiang.cardValueToStr(cardValues[i]);
			}
			return temp.join(",");
		}
		public checkHu(cardValues: CARD_VALUE[]) {
			// Majiang.sort(cardValues);
			// let mjCards: MajiangCard[] = [];
			// let arrLen = cardValues.length;
			// for (let i = 0; i < arrLen; i++) {
			// 	let card = new MajiangCard();
			// 	card.init(cardValues[i]);
			// 	mjCards.push(card);
			// }
			// let allCards: MajiangCard[][] = this.mergeSameCard(mjCards);
			// return this.check(allCards, false, mjCards.length);
		}
		public check(allCards: MajiangCard[][], hasTwo: boolean, cnt: number) {
			if (cnt === 0) {
				return true;
			}
			let result = [];
			let arrLen = allCards.length;
			for (let i = 0; i < arrLen; i++) {
				if (!allCards[i].length) {
					continue;
				}
				if (!hasTwo && allCards[i].length > 1) {
					let temp = allCards[i].splice(0, 2);
					cnt -= 2;
					if (this.check(allCards, true, cnt)) {
						return true;
					}
					cnt += 2;
					allCards[i].push.apply(allCards[i], temp);
				}
				if (allCards[i].length > 2) {
					let temp = allCards[i].splice(0, 3);
					cnt -= 3;
					if (this.check(allCards, hasTwo, cnt)) {
						return true;
					}
					cnt += 3;
					allCards[i].push.apply(allCards[i], temp);
				}
				let card = allCards[i][0];
				if (card.cardValue > CARD_VALUE.W_7 || card.cardValue > CARD_VALUE.T_7 || card.cardValue > CARD_VALUE.S_7) {
					continue;
				}
				let index = i + 2;
				if (!allCards[index] || !allCards[index].length || !allCards[index - 1].length) {
					continue;
				}
				let endCard = allCards[index][0];
				if (card.suit === endCard.suit && card.cardValue + 2 === endCard.cardValue) {
					let card1 = allCards[i].splice(0, 1)[0];
					let card2 = allCards[i + 1].splice(0, 1)[0];
					let card3 = allCards[index].splice(0, 1)[0];
					cnt -= 3;
					if (this.check(allCards, hasTwo, cnt)) {
						return true;
					}
					cnt += 3;
					allCards[i].push(card1);
					allCards[i + 1].push(card2);
					allCards[index].push(card3);
				}
				return false;
			}
		}
		/**
		 */
		protected findSlide(allCards: MajiangCard[][]) {
			let result = [];
			let arrLen = allCards.length;
			for (let i = 0; i < arrLen; i++) {
				let card = allCards[i][0];
				if (card.cardValue > CARD_VALUE.S_7) {
					break;
				}
				if (card.cardValue > CARD_VALUE.W_7 || card.cardValue > CARD_VALUE.T_7) {
					continue;
				}
				let index = i + 2;
				if (!allCards[index]) {
					break;
				}
				let endCard = allCards[index][0];
				if (card.suit === endCard.suit && card.cardValue + 2 === endCard.cardValue) {
					result.push([card, allCards[i + 1][0], endCard]);
				}
			}
			return result;
		}
		public findSameCard(allCards: MajiangCard[][], cnt: number) {
			let arrLen = allCards.length;
			let result = [];
			for (let i = 0; i < arrLen; i++) {
				if (allCards[i].length >= cnt) {
					result.push(allCards[i].slice(0, cnt));
				}
			}
			return result;
		}
		/**
		 * 把相同的牌合并为一个数组
		 */
		public mergeSameCard(cards: MajiangCard[]) {
			if (cards && cards.length) {
				let someCard = [cards[0]];
				// this.cardCnts = {};
				let temp = [someCard];
				let preCard = cards[0];
				let arrLen = cards.length;
				for (let i = 1; i < arrLen; i++) {
					if (cards[i].value != preCard.value) {
						// this.cardCnts[preCard.value] = someCard.length;
						someCard = [];
						temp.push(someCard);
						preCard = cards[i];

					}
					someCard.push(cards[i]);
				}
				// this.cardCnts[preCard.value] = someCard.length;
				// temp.reverse();
				return temp;
			} else {
				return null;
			}
		}
		/**
		 * 
		 */
		public static changeCardsByType(cardsValueAndCount: CARD_VALUE[][], type: ACTIVE_TYPE, cardValue: CARD_VALUE, itemList: MJActionItem[]) {
			//  {"result":0,"cardsValueAndCount":[[49,2,4]],"activeType":5,"playerId":1000472}
			if (type === ACTIVE_TYPE.TAN) {
				let item = MJActionItem.create();
				item.init(type, null, cardValue);
				itemList.push(item);
				let temp = item.cardsValueAndCount = [];
				let arrLen = cardsValueAndCount.length;
				for (let i = 0; i < arrLen; i++) {
					let jLen = cardsValueAndCount[i][1];
					for (let j = 0; j < jLen; j++) {
						temp.push(cardsValueAndCount[i][0]);
					}
				}
			} else if (type === ACTIVE_TYPE.HU) {
				let item = MJActionItem.create();
				item.init(type, null, cardValue);
				itemList.push(item);
			}
			else {
				let arrLen = cardsValueAndCount.length;
				for (let i = 0; i < arrLen; i++) {
					let disCardValue: CARD_VALUE[];
					let cardValues = cardsValueAndCount[i];
					switch (type) {
						case ACTIVE_TYPE.CHI://吃不需要填充
							disCardValue = [cardValues[0], cardValues[1], cardValue];
							disCardValue.sort();
							break;
						case ACTIVE_TYPE.PENG://碰填充到三张牌
							disCardValue = [cardValues[0], cardValues[0], cardValues[0]];
							break;
						case ACTIVE_TYPE.SHAO://勺的话,只显示中间的那张
							disCardValue = [CARD_VALUE.NONE, cardValues[0], CARD_VALUE.NONE];
							cardValues.splice(1);
							cardValue = cardValues[0];
							// cardValues[1] = cardValues[0];
							// cardValues[1] = cardValues[2] = null;
							break;
						case ACTIVE_TYPE.GANG:
							if (cardValues[0]) {
								disCardValue = [CARD_VALUE.NONE, CARD_VALUE.NONE, CARD_VALUE.NONE, cardValues[0]];
							} else {
								disCardValue = [cardValues[0], cardValues[0], cardValues[0], cardValues[0]];
								type = ACTIVE_TYPE.AN_GANG;
							}
							cardValues.splice(1);
							cardValue = cardValues[0];
							break;
					}
					let item = MJActionItem.create();
					item.init(type, disCardValue, cardValue);
					item.cardsValueAndCount = cardValues;
					itemList.push(item);
				}
			}

		}
		/**
		 * 将传进来的数组cardValues里面的数据,转换为发送给服务器的数据,每张牌都转换成为数组,
		 * 数组第一个元素为牌值,第二个为牌的数量,第三个为牌的类型
		 * @param cardValues:要处理的数组
		 * @param tanType:已经摊过的牌型
		 */
		public static getTanInfo(cardValues: CARD_VALUE[], tanType: ACTIVE_TYPE) {
			let arrLen = cardValues.length;
			let temp: any = {};
			//东南西北的类型数量,如果已经摊过东南西北,那边这个值就直接为4
			let cnt1 = ((tanType & ACTIVE_TYPE.DNXB) === 1) ? 4 : 0;
			//中发白的类型数量,如果已经摊过中发白,那边这个值就直接为3,这两个值用于后面判断摊的牌是否是7星
			let cnt2 = ((tanType & ACTIVE_TYPE.ZFB) === 1) ? 3 : 0;
			for (let i = 0; i < arrLen; i++) {
				let value = cardValues[i];
				if (!temp[value]) {
					temp[value] = [value, 1, 0];
					if (value === CARD_VALUE.S_1) {//一条
						temp[value][2] = ACTIVE_TYPE.NAIO;
					} else if (value < CARD_VALUE.ZHONG) {//东南西北
						temp[value][2] = ACTIVE_TYPE.DNXB;
						cnt1++;
					} else {//中发白
						temp[value][2] = ACTIVE_TYPE.ZFB;
						cnt2++;
					}
				} else {
					temp[value][1]++;
				}
			}
			let result = [];
			for (let key in temp) {
				//如果东南西北中发白都有,说明是7星
				if (temp[key][2] !== ACTIVE_TYPE.NAIO && cnt1 >= 4 && cnt2 >= 3) {
					temp[key][2] = ACTIVE_TYPE.DNXBZFB;
				}
				result.push(temp[key]);
			}
			return result;
		}

		/**
		 * 处理服务器给的数据
		 */
		public static getDestList(datas): MJActionItem[] {
			let destList: MJActionItem[] = [];

			// if (datas.chiCards.length) {
			// 	let arrLen = datas.chiCards.length;
			// 	for (let i = 0; i < arrLen; i += 3) {
			// 		let item = MJActionItem.create();
			// 		item.init(ACTIVE_TYPE.CHI, [datas.chiCards[i], datas.chiCards[i + 1], datas.chiCards[i + 2]], null);
			// 		destList.push(item);
			// 		// destList[
			// 	}
			// }
			/**
			 * 处理碰/勺/杠牌的数据,服务器发的都是是一个一维数组,并且只有一张牌
			 */
			// if (datas.shaoCards.length) {
			// 	let arrLen = datas.shaoCards.length;
			// 	for (let i = 0; i < arrLen; i++) {
			// 		let item = MJActionItem.create();
			// 		item.init(ACTIVE_TYPE.SHAO, [CARD_VALUE.NONE, datas.shaoCards[i], CARD_VALUE.NONE], datas.shaoCards[i]);
			// 		destList.push(item);
			// 	}
			// }
			if (datas.gangCards.length) {
				let arrLen = datas.gangCards.length;
				for (let i = 0; i < arrLen; i++) {
					let item = MJActionItem.create();
					item.init(ACTIVE_TYPE.GANG, [datas.gangCards[i], datas.gangCards[i], datas.gangCards[i], datas.gangCards[i]], null);
					destList.push(item);
				}
			}
			if (datas.anGangCards.length) {
				let arrLen = datas.anGangCards.length;
				for (let i = 0; i < arrLen; i++) {
					let item = MJActionItem.create();
					item.init(ACTIVE_TYPE.GANG, [CARD_VALUE.NONE, CARD_VALUE.NONE, CARD_VALUE.NONE, datas.anGangCards[i]], null);
					destList.push(item);
				}
			}
			if (datas.pengCards.length) {
				let arrLen = datas.pengCards.length;
				for (let i = 0; i < arrLen; i++) {
					let item = MJActionItem.create();
					item.init(ACTIVE_TYPE.GANG, [datas.pengCards[i], datas.pengCards[i], datas.pengCards[i]], null);
					destList.push(item);
				}
			}

			return destList;
		}
	}




	/**
	* 玩家可进行的操作
	*/
	export class MJActionItem {
        /**
         * 是进行什么操作
         */
		activeType: ACTIVE_TYPE;
        /**
         * 传回服务器的数组
         */
		cardsValueAndCount?: number[];
        /**
         * 相应要显示的牌值
         */
		cardValues: CARD_VALUE[];
        /**
         * 吃/碰/明杠别人打出的那张牌
         */
		cardValue?: CARD_VALUE;
		/**
		 * 要删除的牌,用与碰/吃/勺的时候,在手牌里面需要删除掉的牌
		 */
		delCards?: CARD_VALUE[];
		public static create() {
			return new MJActionItem();
		}
		public init(activeType: ACTIVE_TYPE, cardValues: CARD_VALUE[], cardValue?: CARD_VALUE) {
			this.activeType = activeType;
			this.cardValue = cardValue;
			this.cardValues = cardValues;
		}
		public getDeleteCard() {
			let delCards = [];
			// if(this.activeType === ACTIVE_TYPE.CHI){
			// 	let arrLen = this.cardValues.length;
			// 	for(let i = 0; i < arrLen; i++){
			// 		if(this.cardValues[i] !== this.cardValue){
			// 			delCards.push(this.cardValues[i]);
			// 		}
			// 	}
			// }else{
			// }
			// switch(this.activeType){
			// 	case 
			// }
		}
	}
}