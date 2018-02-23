namespace DDZ {
	let _pool: HandCard[] = [];
	export class HandCard {
		public handType: HAND_TYPE;
		public handValue: number = 0;
		public cards: PokerCard[];
		public handSubType: number;
		public sortNum: number;
		public constructor() {
		}
		public init(cards: PokerCard[]) {
			if (cards.length === 0) {
				DEBUG && egret.error(`HandCard:cards 的长度不能为0!!!!`);
				return;
			}
			this.handType = HAND_TYPE.NONE;
			this.handSubType = 0;
			//先对扑克牌排序
			// Poker.sortCards(cards);
			cards.sort((card1, card2) => { return card1.cmpValue - card2.cmpValue });
			/**
			 * 创建一个二维数组,
			 * 将cards里面相同的牌放在一个数组里面,
			 * 然后把这个数组放到二维数组里面
			 */
			let someCard = [cards[0]];
			let allCards = [someCard];
			let preCard = cards[0];
			let arrLen = cards.length;
			// this.cards = cards;
			for (let i = 1; i < arrLen; i++) {
				if (cards[i].value != preCard.value) {
					someCard = [];
					allCards.push(someCard);
					preCard = cards[i];
				}
				someCard.push(cards[i]);
			}

			switch (allCards.length) {
				//如果数组长度只有一,说明所有的牌都是一样的
				case 1:
					let sumCnt = allCards[0].length;
					this.calOne(allCards[0].length, allCards[0][0]);
					break;
				case 2:
					this.calTwo(allCards, cards.length);
					break;
				default:
					this.calOther(allCards, cards);
					break;
			}
			if (this.handType !== HAND_TYPE.NONE)
				this.cards = cards;
			this.handSubType = cards.length;
		}
		// public 
		/**
		 * 所有牌都相同的情况下
		 */
		private calOne(cnt: number, card: PokerCard) {
			switch (cnt) {
				case 1://单牌(散牌)
					this.handType = HAND_TYPE.SINGLE;
					break;
				case 2://对子
					this.handType = HAND_TYPE.YIDUI;
					break;
				case 3://三张牌
					this.handType = HAND_TYPE.SANZHANG;
					break;
				case 4://炸弹
					this.handType = HAND_TYPE.BOMB;
					break;
			}
			this.handValue = (this.handType << TYPE_SHIFT) + (card.cmpValue >> SUIT_SHIFT);
		}
		/**
		 * 在有两种牌情况下
		 */
		private calTwo(allCards: PokerCard[][], cardCnt: number) {
			let cardCnt1 = allCards[0].length;
			let card1 = allCards[0][0];
			let cardCnt2 = allCards[1].length;
			let card2 = allCards[1][0];
			if (card1.value === CARD_VALUE.VALUE_XG && card2.value === CARD_VALUE.VALUE_DG) {//如果是大小王,牌型是火箭
				this.setHandInfo(HAND_TYPE.HUOJIAN, 0);
			}
			//如果都是3张牌,并且是连续的,说明是三顺牌型
			else if (cardCnt1 === 3 && cardCnt2 === 3 && card1.nextValue() === card2.value) {
				// this.handSubType = cardCnt;
				this.setHandInfo(HAND_TYPE.SANSHUN, card2.realValue);
			}
			else if (cardCnt1 === 3 && cardCnt2 < 3) {//三带一
				this.setHandInfo(HAND_TYPE.SANDAIYI, card1.realValue);
			} else if (cardCnt2 === 3 && cardCnt1 < 3) {//三带一
				this.setHandInfo(HAND_TYPE.SANDAIYI, card2.realValue);
			} else if (cardCnt1 === 4 && cardCnt2 === 2) {//四带二
				this.setHandInfo(HAND_TYPE.SIDAIER, card1.realValue);

			} else if (cardCnt2 === 4 && cardCnt1 === 2) {//四带二
				this.setHandInfo(HAND_TYPE.SIDAIER, card2.realValue);
			}
		}
		/**
		 * 在有三种牌或者三种牌以上的情况下
		 */
		private calOther(allCards: PokerCard[][], cards: PokerCard[]) {
			let maxCount = 0;		//牌最多的数量
			let i = 0;
			let maxInIndex = 0;
			let maxCard: PokerCard = null;
			let noSameCount = allCards.length;
			for (let key in allCards) {
				let count = allCards[key].length;
				if (count >= maxCount) {
					maxCount = count;
					maxCard = allCards[key][0];
					maxInIndex = i;
				}
				i++;
			}

			if (maxCount === 4) {
				if (noSameCount === 3) {
					let secondMax = 0;		//第二多的牌
					for (let key in allCards) {
						let count = allCards[key].length;
						if (count != maxCount) {
							if (secondMax == 0) {//找到第二多的牌的数量
								secondMax = count;
							}
							else if (secondMax == count) {//除了最多的牌,剩下的两种牌的数量一样的话,说明是四带二
								this.setHandInfo(HAND_TYPE.SIDAIER, maxCard.realValue);
							}
						}
					}
				}
			} else if (maxCount === 3) {
				if (maxInIndex >= 1 && cards.length > 5) {
					let sanCount = 1;	//3张的数量
					let tempPreCard = maxCard;
					let secondMax = 0;		//第二大的牌
					for (let k = maxInIndex - 1; k >= 0; k--) {
						let tempCard = allCards[k][0];
						let count = allCards[k].length;
						if (count === maxCount) {
							if (tempPreCard.preValue() === tempCard.value) {
								tempPreCard = tempCard;
								sanCount++;
							} else {
								return;
							}
						}
						// if (count != maxCount) {
						// 	if (secondMax == 0) {
						// 		secondMax = count;
						// 	}
						// 	else if (secondMax != count) {
						// 		return;
						// 	}
						// }
					}
					//三顺
					if (noSameCount === sanCount) {
						this.setHandInfo(HAND_TYPE.SANSHUN, maxCard.realValue);
					} else if (cards.length == sanCount * 4 || cards.length == sanCount * 5) {//飞机可以有count*2种不同的牌
						// let arrLen = Array.length;
						if (cards.length === sanCount * 5) {
							for (let i = 0; i < noSameCount; i++) {
								if (allCards[i].length !== 2 && allCards[i].length != maxCount) {
									return;
								}
							}
						}

						this.setHandInfo(HAND_TYPE.FEIJIDAICHIBANG, maxCard.realValue);
					}
				} else {

				}
			} else if (maxCount == 2 || maxCount == 1 && cards.length >= 5) {
				let count = 0;
				//首先相同最大牌的序号要等于不同牌的数量
				if (maxInIndex + 1 == noSameCount) {
					let tempPreCard = maxCard;
					for (let k = maxInIndex - 1; k >= 0; k--) {
						let tempCard = allCards[k][0];
						if (allCards[k].length == maxCount && tempPreCard.preValue() == tempCard.value) {
							tempPreCard = tempCard;
						}
						else {
							return;
						}
					}
					if (maxCount == 2) {
						this.setHandInfo(HAND_TYPE.SHUANGSHUN, maxCard.realValue);
					}
					else if (maxCount == 1) {
						this.setHandInfo(HAND_TYPE.DANSHUN, maxCard.realValue);
					}
				}
			}
		}
		public setHandInfo(handType: HAND_TYPE, realValue: number) {
			this.handValue = (handType << TYPE_SHIFT) + realValue;
			this.handType = handType;
			// this.handSubType = handSubType;
		}
		public destroy() {
			// this.cards = 
			this.handType = this.handSubType = this.handValue = null;
			_pool.push(this);
		}
		public reset() {
			this.handType = this.handSubType = this.handValue = null;
		}
		public static create() {
			if (_pool.length) {
				return _pool.pop();
			} else {
				return new HandCard();
			}
		}
	}
}