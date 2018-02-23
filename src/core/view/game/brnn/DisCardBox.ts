namespace niuniu.brnn {
	export class DisCardBox extends eui.Component {
		private _cardsGroup: eui.Group;
		private _cards: Card[];
		//开牌动画
		private showCards: egret.tween.TweenGroup;
		private _finishFunc: Function;
		//牌型
		// private _typeImg: eui.Image;
		private _typeIcon: eui.Component;
		//牌型倍数
		private _rateBox: eui.Component;
		private _cardValues: number[];
		public constructor() {
			super();
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			this._cards = [];
			let arrLen = this._cardsGroup.numChildren;
			for (let i = 0; i < arrLen; i++) {
				let card = <Card>this._cardsGroup.getChildAt(i);
				this._cards[i] = card;
			}
			// this.showCards.addEventListener('complete', this.aniComplete, this);
			this.setCardsBack();
		}
		// private aniComplete() {
		// 	if (this._finishFunc) {
		// 		this._finishFunc();
		// 	}
		// 	// this._rateBox.visible = false;
		// 	egret.log("aniComplete")
		// 	// this.reset.play(0);
		// }
		public reset() {
			this.setCardsBack();
			this._rateBox.visible = false;
			this.clearAni();
			// this._typeImg.visible = false;
			if (this._typeIcon && this._typeIcon.parent) {
				this.removeChild(this._typeIcon);
			}
			//this.HideCard();
		}
		/**播放发牌动画 */
		public PlaySendCardAni(layer: eui.Component, cardIndex: number, cardValue: number, isSetIcon: boolean) {
			return new Promise((resolve: Function, reject: Function) => {
				var card = <Card>this._cards[cardIndex];
				if (isSetIcon) {
					card.setIconByBrnn(cardValue);
				}
				card.visible = true;
				card.scaleX = 0.3;
				card.scaleY = 0.3;
				var tw = egret.Tween.get(card);
				var desX = card.x;
				var desY = card.y;
				let _point = egret.Point.create(0, 0);
				this._cardsGroup.localToGlobal(desX, desY, _point);
				card.x = Global.sWidth / 4 * 3;
				card.y = -card.width;
				layer.addChild(card);

				tw.to({ x: _point.x, y: _point.y, scaleX: 0.6, scaleY: 0.6 }, 150);
				egret.Point.release(_point);
				tw.call(() => {
					this._cardsGroup.addChildAt(card, cardIndex);
					card.x = desX;
					card.y = desY;
					SoundManage.playEffect("nn_fapai");
					resolve();
				});
			})
		}
		public HideCard() {
			for (var i = 0; i < 5; i++) {
				this._cards[i].visible = false;
			}
		}
		/**
		 * 清理所有的动画
		 */
		public clearAni() {
			let arrLen = this._cards.length;
			for (let i = 0; i < arrLen; i++) {
				//如果父节点不是当前this对象,说明动画播放一半,还没有将牌加回this对象里面
				if (!this._cards[i].parent || this._cards[i].parent != this) {
					this.addChildAt(this._cards[i], i);
				}
				egret.Tween.removeTweens(this._cards[i]);
			}
			this.showCards.stop();//停止开牌动画
		}

		/**
		 *
		 */
		public destroy() {

			this._finishFunc = null;
			this.clearAni();
			// egret.Tween.removeTweens(this.card5);
			if (this._typeIcon) {
				(<egret.tween.TweenGroup>this._typeIcon["ani"]).stop();
			}
		}
		//-- 计算牌形
		public calHandValue(handvalue: number) {
			var handType: any = (handvalue >> 12) & 0xf;
			if (handType == HANDVALUE.NIUX) {
				var value = (handvalue >> 8) & 0xf;
				handType = handType + "" + value;
			}
			return handType;
		}
		/**
		 * 播放开牌动画
		 */

		public card4: niuniu.Card;
		public card5: niuniu.Card;

		public doShowCardAni(data: model.GameOverDataListItem, selfmoney?: number) {
			this.visible = true;
			return new Promise((finishFunc: Function) => {
				let arrLen = data.cardsInfo.cards.length;
				var card = this._cards[3];
				egret.Tween.get(this.card5)
					// .to({ x: 68 }, 500).call(function () { card.setIcon(data.cardsInfo.cards[3]) })
					.to({ x: 86 }, 500).call(function () { card.setIconByBrnn(data.cardsInfo.cards[3]) })
					.to({ x: 116 }, 500)
					.call(() => {
						finishFunc();
						//设置牌型(闲家不播放开牌动画，统一之后播放)
						this.setCardType(data.cardsInfo.handValue, selfmoney, data.cardsInfo.rewardRate);
					});
			})
		}

		public settTypeIconVisible(visible: boolean) {
			this._typeIcon["_money"].visible = visible;
		}

		public setCardType(handValue: number, money?: number, rewardRate?: number, sex?: number) {
			let self = this;
			let typeIcon = self._typeIcon;
			if (!typeIcon) {
				typeIcon = self._typeIcon = new eui.Component();
				typeIcon.skinName = "brnn.CardTypeAni";
				typeIcon.width = this.width;
			}
			let handType = self.calHandValue(handValue);
			typeIcon.name = `label_n_type${handType}_png`;
			(<egret.tween.TweenGroup>typeIcon["ani"]).play(0);
			//设置玩家输赢金钱
			if (money !== undefined && typeIcon["_money"]) {
				//播放牛牛动画
				let chipPool = <ChipsPool>this.parent;
				if (chipPool && handType >= 3 && handType <= 11) {
					chipPool._niuniu.visible = true;
					chipPool._niuniu.curState = SCPNStatu.PLAY;
					SoundManage.playEffect("brnn_nnsound");
				}
				typeIcon["_money"].visible = false;
				let newGold = "0";
				// money = Math.abs(money*rewardRate);//输赢几倍一起算进去
				money = money * rewardRate;//输赢几倍一起算进去(显示负号)
				if (Math.abs(money) > 10000) {
					newGold = Math.floor(money / 10000) + GameLangs.wan;
				} else {
					newGold = money.toString();
				}
				if (rewardRate >= 0) {
					typeIcon["_money"].textColor = 0x0E9A0A;
				} else {
					typeIcon["_money"].textColor = 0xba1e1d;
				}
				typeIcon["_money"].text = newGold;
				// EventManager.registerOnce("VISIBLE_RESULT", () => {
				// 	typeIcon["_money"].visible = true;
				// }, typeIcon);
			}
			self.addChild(typeIcon);
			typeIcon.horizontalCenter = 0;
			typeIcon.verticalCenter = 20;
			//播放音乐
			SoundManage.playEffectBySex(SoundManage.keyMap["n_" + handType], sex);
		}
		/**
		 * 将所有牌设置为背面状态
		 */
		public setCardsBack() {
			let arrLen = this._cards.length;
			for (let i = 0; i < arrLen; i++) {
				let card = this._cards[i];
				card.setBack();
			}
		}
	}
}