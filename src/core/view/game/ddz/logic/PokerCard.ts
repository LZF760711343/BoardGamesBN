namespace DDZ {
	let pool: PokerCard[] = [];
	export class PokerCard {
		/**
		 * 牌的信息,里面包含着牌的花色,牌值等信息
		 */
		public cardValue: number;
		/**
		 * 花色
		 */
		public suit: SUIT_VALUE;
		/**
		 * 牌值,用与实际显示牌用的
		 */
		public value: CARD_VALUE;
		/**
		 * 真正的牌值,value牌值的大小排序跟斗地主排序不一致(比如:value是2最小,斗地主的2只比小王小),
		 * 所以value并不能用来判断牌值大小,realValue是经过转换过的,根据斗地主大小排序的牌值
		 * ,可用于判断牌的大小
		 */
		public realValue:REAL_CARD_VALUE;
		// public spec;
		/**
		 * 用于比较牌大小的值
		 */
		public cmpValue: number;
		
		public constructor(cardValue: number) {
			this.init(cardValue);
			// this.spec = (cardValue >> 7) & 0x1;
		}
		public init(cardValue: number) {
			this.cardValue = cardValue;
			this.suit = cardValue & 0xf;
			this.value = cardValue >> 4;
			this.cmpValue = this.getCmpValue();
		}
		/**
		 * 创建一张扑克牌,后续应该会加入缓存池
		 */
		public static create(cardValue: number) {
			if (pool.length) {
				let card= pool.pop();
				card.init(cardValue);
				return card;
			} else {
				return new PokerCard(cardValue);
			}

		}

		public toString() {
			return SUIT_NAMES[this.suit] + VALUE_NAMES[this.value];
		}
		/**
		 * 获取用于牌与牌之间比较大小的值
		 * 因为要统一用同一套牌值,默认牌值是A最小,2排第二小
		 * 斗地主是2只比大小王小,A是比2跟大小王小,所以用于比较的值就要转换一下了
		 */
		public getCmpValue() {
			let cmpValue:any = this.value;
			if (cmpValue < CARD_VALUE.VALUE_XG) {
				if (cmpValue == CARD_VALUE.VALUE_2) {//如果是2,比较的牌值应该是相当与默认牌值里面的老K
					cmpValue = CARD_VALUE.VALUE_K;
				}
				else if (cmpValue == CARD_VALUE.VALUE_A) {//如果是A,比较的牌值应该是相当与默认牌值里面的Q
					cmpValue = CARD_VALUE.VALUE_Q;
				} else {//其它的都是当前牌值-2
					cmpValue -= 2;
				}
			}
			this.realValue = cmpValue;
			return (cmpValue << SUIT_SHIFT) + this.suit;
		}
		public destroy() {
			//目前对象回收还有bug,先暂时屏蔽掉,等有时间在进行处理
			// if (pool.indexOf(this) === -1) {
			// 	pool.push(this);
			// }
		}
		/**
		 * 获取当前牌的下一张牌的牌值
		 */
		public nextValue(){
			if(this.value === CARD_VALUE.VALUE_DG){//大王没有下一张牌
				DEBUG && egret.error("大王没有下一张牌");
				return CARD_VALUE.NONE;
			}else if(this.value === CARD_VALUE.VALUE_2){//2的下一张牌是小王
				return CARD_VALUE.VALUE_XG;
			}else if(this.value === CARD_VALUE.VALUE_K){//K的下一张是A
				return CARD_VALUE.VALUE_A;
			}
			else{//其他的牌牌值都是当前牌值加1
				return this.value + 1;
			}
		}
		/**
		 * 获取当前牌的上一张牌的牌值
		 */
		public preValue(){
			if(this.value === CARD_VALUE.VALUE_3){//3没有上一张牌
				DEBUG && egret.error("3没有上一张牌");
				return CARD_VALUE.NONE;
			}else if(this.value === CARD_VALUE.VALUE_A){//A的上一张牌是老K
				return CARD_VALUE.VALUE_K;
			}else if(this.value === CARD_VALUE.VALUE_2 || this.value >= CARD_VALUE.VALUE_XG){//小王的上一张牌是2
				return CARD_VALUE.NONE;
			}
			else{//其他的牌牌值都是当前牌值减1
				return this.value - 1;
			}
		}
		/*
		* 大于1 等于0 小于-1         */
		public compare(otherCard: PokerCard, mainValue?: number) {
			// if(this
		}
		public valueOf() {
			return this.cardValue;
		}
	}
}