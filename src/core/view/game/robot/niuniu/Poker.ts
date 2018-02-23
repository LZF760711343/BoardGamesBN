namespace ROBOT {
	export class NiuniuPoker {
		protected cards: number[];
		/**
		 * 
		 */
		protected probabilitys: model.Map<number>;
		public isInit:boolean;
		public constructor() {
		}
		//是不是五小牛
		protected isWuxiaoniu(tempValues: CARD_VALUE[]) {
			let arrLen = tempValues.length;
			let sum = 0;
			for (let i = 0; i < arrLen; i++) {
				sum += tempValues[i];
				if (sum > 10 || tempValues[i] > CARD_VALUE.VALUE_4) {
					return niuniu.HANDVALUE.NONE;
				}
			}
			return niuniu.HANDVALUE.WXN;;
		}


		// export const enum HANDVALUE {
		// 		NONE = 0,
		// 		SANPAI = 1,//-- #散牌
		// 		NIUX = 2,// -- #牛1-牛9
		// 		NIUNIU = 3, //,-- #牛牛
		// 		YINNIU = 4,// -- #银牛--四花牛
		// 		SHUNZI = 5, //--顺子
		// 		TONGHUA = 6, //同花
		// 		HULU = 7,//葫芦
		// 		BOMB = 8,//四梅
		// 		JINNIU = 9,//金牛
		// 		WXN = 10,//五小牛
		// 		TONGHUASHUN = 11,//同花顺
		// 	}

		private getCmpValue(key: string) {
			let cardType = parseInt(key);
			if (cardType !== niuniu.HANDVALUE.SANPAI && cardType < 21) {
				cardType += 27;
			}
			return cardType;
		}
		/**
		 * 获取出现某牌型及其以上牌型的概率
		 */
		public getCardTypeUpProbalility(cardType: string) {
			if (this.probabilitys) {
				let tempCardType = this.getCmpValue(cardType);
				let sum = 0;
				let total = 0;
				for (let key in this.probabilitys) {
					if (this.getCmpValue(key) >= tempCardType) {
						total += this.probabilitys[key];
					}
					sum += this.probabilitys[key];
				}
				log("getCardTypeUpProbalility:",total, sum);
				return total / sum;
			}
			return 0;
		}
		/**
		 * 是不是五花牛
		 */
		protected isWuhuaniu(tempValues: CARD_VALUE[]) {
			let arrLen = tempValues.length;
			for (let i = 0; i < arrLen; i++) {
				if (tempValues[i] < CARD_VALUE.VALUE_10) {
					return niuniu.HANDVALUE.NONE;
				}
			}
			return niuniu.HANDVALUE.JINNIU;
		}
		/**
		 * 是不是炸弹牛
		 */
		protected isZhadanniu(tempValues: CARD_VALUE[]) {
			let arrLen = tempValues.length;
			// tempValues.concat
			let sumCnt = 0;
			// let temp = tempValues[0];
			for (let i = 1; i < arrLen; i++) {
				if (tempValues[0] == tempValues[i]) {
					sumCnt++;
				}
			}
			if (sumCnt == 4 || (
				tempValues[1] == tempValues[2] &&
				tempValues[1] == tempValues[3] &&
				tempValues[1] == tempValues[4]
			)) {
				return niuniu.HANDVALUE.BOMB;
			}
			return niuniu.HANDVALUE.NONE;
		}
		/**
		 * 是否niuniu
		 */
		protected isNiuniu(tempValues: CARD_VALUE[]) {
			let arrLen = tempValues.length;
			let sum = 0;
			for (let i = 0; i < arrLen; i++) {
				// sum += (tempValues[i] > CARD_VALUE.VALUE_10 ? 10 : tempValues[i]);
				sum = this.addValue(sum, tempValues[i]);
			}
			if (sum % 10) {
				return niuniu.HANDVALUE.NONE;
			} else {
				return niuniu.HANDVALUE.NIUNIU;
			}
			// return niuniu.HANDVALUE.JINNIU;
		}
		protected addValue(sum: number, cardValue: CARD_VALUE) {
			return sum += (cardValue > CARD_VALUE.VALUE_10 ? 10 : cardValue)
		}
		/**
		 * 是否有牛,是什么牛
		 */
		protected hasNiu(tempValues: CARD_VALUE[]) {
			let arrLen = tempValues.length;
			for (let i = 0; i < arrLen - 2; i++) {
				let sum = this.addValue(0, tempValues[i]);
				for (let j = i + 1; j < arrLen - 1; j++) {
					// sum += tempValues[j] > CARD_VALUE.VALUE_10 ? 10 : tempValues[j];
					sum = this.addValue(sum, tempValues[j]);
					for (let k = j + 1; k < arrLen; k++) {
						// sum += tempValues[j] > CARD_VALUE.VALUE_10 ? 10 : tempValues[j];
						sum = this.addValue(sum, tempValues[j]);
						if (sum % 10 === 0) {//有牛
							return niuniu.HANDVALUE.NIUX;
						}
					}
				}
			}
			return niuniu.HANDVALUE.SANPAI;
		}
		protected analysis(tempValues: CARD_VALUE[]) {
			return this.isWuxiaoniu(tempValues)
				|| this.isWuhuaniu(tempValues)
				|| this.isZhadanniu(tempValues)
				|| this.isNiuniu(tempValues)
				|| this.hasNiu(tempValues);
			// let arrLen = tempValues.length;
			// for (let i = 0; i < arrLen - 2; i++) {
			// 	// let temp = [tempValues[i]];
			// 	// let tempList = [cardValues[i]];
			// 	for (let j = i + 1; j < arrLen - 1; j++) {
			// 		// temp.push(tempValues[j]);
			// 		for (let k = j + 1; k < arrLen; k++) {
			// 			// temp.push(tempValues[k]);
			// 			// temp.sort();
			// 		}
			// 	}
			// }
			// let sum = 10 - (tempValues[0] + tempValues[1] + tempValues[2]) % 10;
		}
		protected resetCards() {
			this.cards = [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2];
		}
		public reset(){
			this.probabilitys = null;
			this.cards = null;
			this.isInit = false;
		}
		public init(cardValues: CARD_VALUE[]) {
			this.resetCards();
			this.probabilitys = {};
			let sum = 0;
			let tempValues = [];
			this.isInit = true;
			// this.key = cardValue >> 4;
			cardValues.forEach((value: number, index: number) => {
				let newValue = tempValues[index] = value >> 4;
				this.cards[newValue]--;
				sum = this.addValue(sum, newValue);
				log(VALUE_NAMES[newValue]);
			});
			for (let i = CARD_VALUE.VALUE_A; i <= CARD_VALUE.VALUE_DG; i++) {
				if (this.cards[i]) {
					tempValues.push(i);
					let result = this.analysis(tempValues);
					log("result:", result);
					if (result === niuniu.HANDVALUE.NIUX) {
						result = 20 + this.addValue(sum, i) % 10;
						// result = result + "" + ((sum + i) % 10);
					}
					if (!this.probabilitys[result]) {
						this.probabilitys[result] = this.cards[i];
					} else {
						this.probabilitys[result] += this.cards[i];
					}
					tempValues.pop();
				}
			}
			log(this.probabilitys);
		}
	}
}