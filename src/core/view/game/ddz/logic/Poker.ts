namespace DDZ {
	// type IgetHandTypeIterator
	export function getHandTypeIterator(arr: HandCard[]) {
		let _cIndex: number = 0;
		return () => {
			if (_cIndex === arr.length) {
				_cIndex = 0;
			}
			egret.log(arr)
			return arr[_cIndex++].cards;
		}
	}
	// export class HandTypeIterator extends Array{
	// 	private _curIndex:number;
	// }
	export class Poker {
		private _cardValues: number[];
		public pokerCards: PokerCard[];
		public handCard: HandCard;
		/**
		 * 上一次出牌的牌型
		 */
		public lastHandValue: number;
		//牌长度
		public lastSubHandType: number;
		public lastHandType: HAND_TYPE;
		public isinit: boolean;
		public allCards: PokerCard[][];
		/**
		 * 抢完地主后的公共牌
		 */
		public publicCards: PokerCard[] = [];
		/**
		 * 提示的候选牌型的迭代器,假如不存在,说明没有牌可以打得起上家的
		 */
		public probHandCardsIterator: () => PokerCard[];
		public probHandCards: HandCard[];
		/**
		 * 上个人打出的牌
		 */
		public lastPlayCards: PokerCard[] = [];
		/**
		 * 炸弹牌型的缓存表,因为炸弹是每次查找牌型都有找的,所以将结果缓存起来,
		 * 在手牌增加了或者减少了再进行重新查找一次
		 */
		protected bombList: HandCard[];
		public constructor() {
			this.handCard = HandCard.create();
		}
		public init(cardValues: number[]) {
			this.isinit = true;
			this._cardValues = cardValues;
			this.pokerCards = [];
			this.handCard.reset();
			this.allCards = null;
			this.bombList = null;
			Poker.createPokerCards(cardValues, this.pokerCards);

			egret.log("", this.pokerCards.toString());
		}
		protected getFirstBestOption(cards: PokerCard[]) {
			// let result = this.findHandtype(this.pokerCards, this.lastHandValue, this.lastHandType, this.lastSubHandType, this.bombList);
			// let result = this.findSlide(cards, handType, realValue, subHandType, 1, subHandType);
			let arrLen = cards.length;
			let allcards = this.allCards = this.allCards || this.mergeSameCard(this.pokerCards);
			let allCardLen = allcards.length;
			var tmpHandCard = this.handCard;
			//多加一张牌
			for (let i = allCardLen - 1; i >= 0; i--) {
				let card = allcards[i][0];
				if (cards.indexOf(card) === -1) {
					let tmpCards: PokerCard[] = cards.concat(card);
					tmpHandCard.init(tmpCards);
				}
				if (tmpHandCard.handType !== HAND_TYPE.NONE) {
					return tmpHandCard;
				}
			}
			// 2. 少一张可成选项
			for (let i = arrLen - 1; i >= 0; i--) {
				var tmpCards: PokerCard[] = cards.slice(0, i).concat(cards.slice(i + 1));
				tmpHandCard.init(tmpCards);
				if (tmpHandCard.handType !== HAND_TYPE.NONE) {
					return tmpHandCard;
				}
			}
			// 3. 加一张同时少一张可成选项
			for (let i = allCardLen - 1; i >= 0; i--) {
				let card = allcards[i][0];
				if (cards.indexOf(card) === -1) {
					let tmpCards: PokerCard[] = cards.concat(card);
					tmpHandCard.init(tmpCards);
					for (let j = tmpCards.length - 1; j >= 0; j--) {
						let tmpcards2 = tmpCards.slice(0, j).concat(cards.slice(j + 1));
						// var tmpCards: PokerCard[] = cards.slice(0, i).concat(cards.slice(i + 1));
						tmpHandCard.init(tmpCards);
						if (tmpHandCard.handType !== HAND_TYPE.NONE) {
							return tmpHandCard;
						}
					}
				}
			}
		}
		/**
		 * 检查牌的牌型是否正确
		 * @param cards:要检查的扑克牌列表
		 * @param handType:要检查的牌型,如果传了这个值的话,
		 * 	      会检查cards是否是这个牌型,如果没有传,就只检测牌是否符合出牌规则
		 */
		public checkCardsValid(cards: PokerCard[], isMove: boolean) {
			if (cards.length) {
				this.handCard.init(cards);
				if (this.handCard.handType === HAND_TYPE.NONE) {//牌型不符合出牌的规则
					if (isMove) {
						//智能选牌
						if (this.lastHandType) {
							let allCards = this.mergeSameCard(cards);
							let result = this.findHandtype(allCards, cards, this.lastHandValue, this.lastHandType, this.lastSubHandType, null);
							egret.log(result);
							if (result && result.length) {
								return result[0].cards;
							}
						} else {
							if (cards.length > 4) {
								let result = this.getFirstBestOption(cards);
								if (result) {
									// Poker.sortCards(result.cards);
									return result.cards;
								}
							}
						}
					}
					return;
				}
				if (this.lastHandType) {//如果是要打上家的牌的
					if (this.handCard.handType >= HAND_TYPE.BOMB) {
						if (this.lastHandValue >= HAND_TYPE.BOMB) {
							if (this.handCard.handValue > this.lastHandValue) {
								return cards;
							} else {
								return;
							}
						}
						return cards;
					} else if (this.handCard.handType === this.lastHandType && this.handCard.handValue > this.lastHandValue && this.handCard.handSubType === this.lastSubHandType) {
						return cards;
					}
					return null;
				}
				return cards;
			}
		}
		public findProbHandCards() {
			if (this.lastHandType) {
				if (this.lastHandType === HAND_TYPE.HUOJIAN) {
					this.probHandCards = this.probHandCardsIterator = null;
					return null;
				}
				let allCards = this.allCards = this.allCards || this.mergeSameCard(this.pokerCards);
				if (!this.bombList) {
					this.bombList = this.findBomb(allCards, REAL_CARD_VALUE.NONE);
				}
				egret.log(this.bombList);
				let result = this.findHandtype(allCards, this.pokerCards, this.lastHandValue, this.lastHandType, this.lastSubHandType, this.bombList);
				// if (this.bombList && this.bombList.length) {
				// 	result = result.concat(this.bombList);
				// }
				if (this.bombList && this.bombList.length && this.lastHandType < HAND_TYPE.BOMB) {
					let arrLen = this.bombList.length;
					for (let i = 0; i < arrLen; i++) {
						if (this.bombList[i].handValue > this.lastHandValue) {
							result.push(this.bombList[i]);
						}
					}
				}

				if (result && result.length) {
					this.probHandCards = result;
					this.probHandCardsIterator = getHandTypeIterator(result);
				} else {
					this.probHandCards = this.probHandCardsIterator = null;
				}
			}
		}
		/**
		 * 查找某一个牌型能出的起的所有选项
		 */
		public findHandtype(allCards: PokerCard[][], cards: PokerCard[], lastHandValue: number, handType: HAND_TYPE, subHandType: number, bombList: HandCard[]) {
			egret.log("findHandtype")
			if (this.lastHandType) {
				let realValue: REAL_CARD_VALUE = lastHandValue & 0xfff;
				let result: HandCard[] = [];
				switch (handType) {
					case HAND_TYPE.SINGLE://单牌(散牌)
						result = this.findSingle(allCards, handType, realValue, subHandType);
						break;
					case HAND_TYPE.YIDUI://对子
						result = this.findPair(allCards, handType, realValue, subHandType);
						break;
					case HAND_TYPE.DANSHUN://顺子
						result = this.findSlide(allCards, handType, realValue, subHandType, 1, subHandType);
						break;
					case HAND_TYPE.SANDAIYI://三带一/二
					case HAND_TYPE.SANZHANG://三张牌
						result = this.findTriple(allCards, handType, realValue, subHandType);
						break;
					case HAND_TYPE.SHUANGSHUN://连对
						result = this.findSlide(allCards, handType, realValue, subHandType, 2, subHandType / 2);
						break;
					case HAND_TYPE.SANSHUN://三顺
						result = this.findSlide(allCards, handType, realValue, subHandType, 3, subHandType / 3);
						break;
					case HAND_TYPE.FEIJIDAICHIBANG://飞机带翅膀
						result = this.findPlane(allCards, cards, handType, realValue, subHandType);
						break;
					case HAND_TYPE.SIDAIER://四带二
						result = this.findFour2(allCards, handType, realValue, subHandType);
						break;
					case HAND_TYPE.BOMB://炸弹
						result = [];
						let arrLen = this.bombList.length;
						for (let i = 0; i < arrLen; i++) {
							egret.log(this.bombList[i].handValue, lastHandValue)
							if (this.bombList[i].handValue > lastHandValue) {
								result.push(this.bombList[i]);
								// result.push.apply(result, this.bombList.splice(i, arrLen - i));
								// break;
							}
						}
						break;
					case HAND_TYPE.HUOJIAN://

						return;
				}
				return result;
			}
		}


		/**
		 * 把相同的牌合并为一个数组
		 */
		public mergeSameCard(cards: PokerCard[]) {
			// if (this.allCards) {
			// 	return this.allCards;
			// }
			// let cards = this.pokerCards;
			let someCard = [cards[0]];
			let temp = [someCard];
			let preCard = cards[0];
			let arrLen = cards.length;
			for (let i = 1; i < arrLen; i++) {
				if (cards[i].value != preCard.value) {
					someCard = [];
					temp.push(someCard);
					preCard = cards[i];
				}
				someCard.push(cards[i]);
			}
			return temp;
		}
		/**
		 * 查找所有打得起的单牌
		 * @param handType:要查找的牌型
		 * @param realValue:牌值
		 */
		protected findSingle(allCards: PokerCard[][], handType: number, realValue: number, handSubType: number) {
			return this.findSameCard(1, handType, realValue, handSubType, allCards);
		}
		/**
		 * 查找所有打得起的对子
		 * 
		 */
		protected findPair(allCards: PokerCard[][], handType: number, realValue: number, handSubType: number) {
			return this.findSameCard(2, handType, realValue, handSubType, allCards);
			// return this.findSameCard(2, realValue, allCards);
		}
		/**
		 * 查找所有打得起的顺子(包过连顺,三顺)
		 * @param handType:牌型
		 * @param realValue顺子结束的那张牌的牌值
		 * @param handSubType:牌型子类型,在顺子里面表示顺子的长度(这里的长度指的是不同牌的数量)
		 * @param len:要找的是单顺,连顺,还是三顺
		 * @param cnt:要找的顺子是几连的,比如  3,4,5,6,7,8就是6连, 33,44,55,66是4连的
		 */
		protected findSlide(allCards: PokerCard[][], handType: number, realValue: REAL_CARD_VALUE, handSubType: number, len: number, cnt: number) {
			allCards = allCards.concat().reverse();
			let result: HandCard[] = [];
			let startValue = realValue + 2 - cnt;
			let arrLen = allCards.length;
			for (let i = 0; i < arrLen; i++) {
				egret.log(allCards[i][0].realValue, startValue)
				if (allCards[i][0].realValue >= startValue) {
					let endValue = allCards[i][0].realValue + cnt - 1;
					if (endValue > REAL_CARD_VALUE.VALUE_A) {//如果结束的牌值大于A的话,后面的都成不了顺子的,没必要继续遍历下去了
						break;
					}
					let jLen = i + cnt - 1;
					egret.log("jLen:", jLen)
					if (!allCards[jLen]) {//后面剩余的牌的数量不够组成顺子了
						break;
					}
					if (allCards[jLen][0].realValue === endValue) {
						let isSlide = true;
						let extraCnt = 0;
						let cards = [];
						for (let j = i; j <= jLen; j++) {
							if (allCards[j].length >= len) {
								extraCnt += (allCards[j].length - len);
								cards.push.apply(cards, allCards[j].slice(0, len));
							} else {
								isSlide = false;
								break;
							}
						}
						if (isSlide) {
							let handcard = HandCard.create();
							handcard.cards = cards;
							Poker.sortCards(cards);
							handcard.setHandInfo(handType, endValue);
							handcard.handSubType = handSubType;
							handcard.sortNum = (extraCnt << 4) + endValue;
							result.push(handcard);
						}
					}
				}
			}
			return result;
		}
		/**
		 * 查找所有的炸弹
		 */
		protected findBomb(allCards: PokerCard[][],realValue: REAL_CARD_VALUE) {
			let rocket = this.findRocket(allCards);
			egret.log("rocket:", rocket)
			let list = this.findSameCard(4, HAND_TYPE.BOMB, realValue, 4, allCards);
			if (rocket) {
				list.push(rocket);
			}
			return list;
		}
		/**
		 * 查找自己牌组中的火箭
		 */
		protected findRocket(allCards: PokerCard[][], ) {
			let length = allCards.length;
			if (length > 1) {
				let card1 = allCards[0][0];//最后一张牌
				let card2 = allCards[1][0]//倒数第二张牌
				//大王跟小王一定是放在最后跟倒数第二这两个位置
				if (card1.value === CARD_VALUE.VALUE_DG && card2.value === CARD_VALUE.VALUE_XG) {
					let handCard = HandCard.create();
					handCard.setHandInfo(HAND_TYPE.HUOJIAN, 0);
					handCard.cards = [card1, card2];
					handCard.handSubType = 2;
					return handCard;
				}
			}
			return null;
		}
		/**
		 * 查找飞机带翅膀
		 */
		protected findPlane(allCards: PokerCard[][], cards: PokerCard[], handType: number, realValue: REAL_CARD_VALUE, handSubType: number) {
			//计算带的副牌的数量,是带一对还是带单张
			let cnt: number = (handSubType % 4) === 0 ? 1 : 2;
			//计算这个飞机是几连的
			let lianCnt = handSubType / (3 + cnt);
			// handType: number, realValue: REAL_CARD_VALUE, handSubType: number, len: number
			//先找到可以组成飞机的所有的三顺牌型组合
			let planeList = this.findSlide(allCards, handType, realValue, handSubType, 3, lianCnt);
			//找到所有的副牌组合
			// let singleList = this.findSameCard(cnt, handType, REAL_CARD_VALUE.NONE, 0, allCards);
			// let jLen = singleList.length;
			//如果
			// if (jLen < lianCnt) {
			// 	return [];
			// }
			let jLen = allCards.length;
			/**
			 * 递归查找副牌
			 * findCnt:要找多少张牌
			 * cardCnt:现在找的牌最少有多少张,比如说,cardCnt等于2的时候,那么之会找你手牌中,牌数等于二的牌
			 * cardList:找到的牌放在这个数组里面
			 * igList:忽略的牌值列表
			 */
			let findCard = (findCnt: number, cardCnt: number, cardList: PokerCard[], igList: PokerCard[]) => {
				if (cardCnt > 3) {
					return;
				}
				for (let j = 0; j < jLen; j++) {
					//副牌的牌值不能跟主牌的牌值一样
					let items = allCards[j];
					if (items.length === cardCnt && Utils.getIndexByKey(igList, "value", items[0].value) === -1) {
						if (cardList.length + items.length > findCnt) {
							egret.log("cardList.length + items.length - findCnt:", cardList.length + items.length - findCnt)
							cardList.push.apply(cardList, items.splice(0, findCnt - cardList.length));
						} else {
							cardList.push.apply(cardList, items.splice(0, 2));
						}

						egret.log(cardList.toString())
						if (cardList.length >= findCnt) {
							return;
						}
					}
				}
				findCard(findCnt, cardCnt + 1, cardList, igList);
			}


			for (let i = planeList.length - 1; i >= 0; i--) {
				//副牌列表
				let cardsList = [];
				let handCard = planeList[i];
				//找到的副牌的数量
				findCard(lianCnt, cnt, cardsList, handCard.cards);
				if (cardsList.length < lianCnt) {
					planeList.splice(i, 1);
				} else {
					handCard.cards.push.apply(handCard.cards, cardsList);
				}
			}
			return planeList;
		}
		/**
		 * 查找所有打得起的三不带
		 * 
		 */
		protected findTriple(allCards: PokerCard[][], handType: number, realValue: REAL_CARD_VALUE, handSubType: number) {

			let tripleList = this.findSameCard(3, handType, realValue, handSubType, allCards);
			//计算是三带几
			let cnt = handSubType % 3;
			if (cnt !== 0) {//如果不是三不带
				let list = this.findSameCard(cnt, handType, REAL_CARD_VALUE.NONE, 0, allCards);
				let arrLen = tripleList.length;
				// 
				for (let i = tripleList.length - 1; i >= 0; i--) {
					let jLen = list.length;
					let handCard = tripleList[i];
					let isFind: boolean;//是否有找到合适的副牌
					for (let j = 0; j < jLen; j++) {
						if (list[j].cards[0].value !== handCard.cards[0].value) {
							handCard.cards.push.apply(handCard.cards, list[j].cards);
							Poker.sortCards(handCard.cards);
							isFind = true;
							break;
						}
					}
					if (!isFind) {//如果没有找到合适的副牌,将这个选项从提示候选项里面移除
						tripleList.splice(i, 1);
					}
				}
				// if (!isFind) {
				// 	return [];
				// }
			}
			return tripleList;
			// return this.findSameCard(2, realValue, allCards);
		}
		/**
		 * 查找所有的四带二
		 */
		protected findFour2(allCards: PokerCard[][], handType: number, realValue: REAL_CARD_VALUE, handSubType: number) {
			//现在到所有的四张牌的列表
			let fourList = this.findSameCard(4, handType, realValue, handSubType, allCards);
			//计算是四带几
			let cnt = (handSubType - 4) / 2;
			let list = this.findSameCard(cnt, handType, REAL_CARD_VALUE.NONE, 0, allCards);
			let arrLen = fourList.length;
			for (let i = arrLen - 1; i >= 0; i--) {
				let jLen = list.length;
				let handCard = fourList[i];
				//四带二的第一组副牌
				let cards1: PokerCard[];
				//四带二的第二组副牌
				let cards2: PokerCard[];
				//查找四带二的副牌
				for (let j = 0; j < jLen; j++) {
					if (list[j].cards[0].value !== handCard.cards[0].value) {
						if (cards1) {//如果已经找到了第一组底牌
							cards2 = list[j].cards;
							break;
						} else {//
							cards1 = list[j].cards;
						}
						// Poker.sortCards(handCard.cards);
					}
				}
				if (cards1 && cards2) {//成功的找到了两组副牌
					handCard.cards.push.apply(handCard.cards, cards1);
					handCard.cards.push.apply(handCard.cards, cards2);
				} else {//否则将候选项移除
					handCard.cards.splice(i, 1);
				}
			}
			return fourList;
		}
		// 
		public findSameCard(count: number, handType: number, realValue: REAL_CARD_VALUE, handSubType: number, allCards: PokerCard[][]) {
			let arrLen = allCards.length;
			let result: HandCard[] = [];
			for (let i = 0; i < arrLen; i++) {
				if (allCards[i].length >= count && allCards[i][0].realValue > realValue) {
					let handCard = HandCard.create();
					handCard.cards = allCards[i].slice(0, count);
					egret.log("findSameCard:",handType, allCards[i][0].realValue)
					handCard.setHandInfo(handType, allCards[i][0].realValue);
					handCard.handSubType = handSubType;
					handCard.sortNum = allCards[i][0].realValue + (allCards[i].length << 4);
					result.push(handCard);
				}
			}
			result.sort((hand1: HandCard, hand2: HandCard) => {
				return hand1.sortNum - hand2.sortNum;
			});
			return result;
		}
		/**
		 * 添加若干张扑克牌,主要是用于抢完地主后,加入地主牌用的
		 */
		public addCards(cardValues: number[], pokerCards: PokerCard[]) {
			Poker.createPokerCards(cardValues, pokerCards);
			this.pokerCards.push.apply(this.pokerCards, pokerCards);
			Poker.sortCards(this.pokerCards);
			this.allCards = null;
			this.bombList = null;
			return pokerCards;
		}
		public reset() {
			this._cardValues = null;
			this.isinit = false;
			this.pokerCards = null;
			this.resetLastCardsInfo();
			this.probHandCards = this.probHandCardsIterator = null;
		}
		public static sortCards(pokerCards: PokerCard[]) {
			pokerCards.sort(Poker.sortCardFunc);
		}
		/**
		 * 删除若干张扑克牌
		 */
		public deleteCards(cardValues: number[], delCards: PokerCard[]) {
			Poker.releaseListPokerCard(delCards, 0);
			let arrLen = cardValues.length;
			let j = 0;
			for (let i = 0; i < arrLen; i++) {
				let list = Utils.removeItemByKey(this.pokerCards, "cardValue", cardValues[i]);
				if (list) {
					delCards.push(list[0]);
				}
			}
			this.allCards = null;
			this.bombList = null;
			return delCards;
		}
		private static sortCardFunc(card1: PokerCard, card2: PokerCard) {
			return card2.cmpValue - card1.cmpValue;
		}
		public getCardValues() {
			return this._cardValues;
		}
		public resetLastCardsInfo() {
			this.lastHandType = this.lastHandValue = this.lastSubHandType = null;
			this.probHandCards = this.probHandCardsIterator = null;
			// Poker.resetLastCardsInfo(this.last)
		}
		/**
		 * 用于释放数组中多余的扑克牌对象
		 */
		public static releaseListPokerCard(pokerCards: PokerCard[], length: number) {
			// let length = cardValues.length;
			if (pokerCards.length > length) {
				let arrLen = pokerCards.length - length;
				for (let i = 0; i < arrLen; i++) {
					pokerCards.pop().destroy();
				}
			}
		}
		/**
		 * 将一组牌值解析成一个扑克牌类列表
		 * @param cardValues:要解析的牌值数组
		 * @param pokerCards:扑克牌列表,如果这个参数不传进来的话,会自动创建一个新的列表,
		 * 					 如果传进来的话,会根据cardValues的大小,将pokerCards里面多余的对象释放掉
		 */
		public static createPokerCards(cardValues: number[], pokerCards: PokerCard[] = []) {
			let length = cardValues.length;
			Poker.releaseListPokerCard(pokerCards, length);
			for (let i = 0; i < length; ++i) {
				if (pokerCards[i]) {
					pokerCards[i].init(cardValues[i]);
				} else {
					let card = PokerCard.create(cardValues[i]);
					pokerCards.push(card);
				}
			}
			Poker.sortCards(pokerCards);
			egret.log("createPokerCards:", pokerCards.toString())
			return pokerCards;
		}
	}
}