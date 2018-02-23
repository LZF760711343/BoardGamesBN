namespace base {
    // const enum ADD_CARD_ANI_TYPE{
    //     NONE,
    //     FROM_CENTER,

    // }
    export class DiscardBoxBase extends eui.Component {
        protected _cards: CardBase[];
        /**
         * 牌与牌之间的间隔
         */
        protected _cardPaddingX: number = 44;
        constructor() {
            super();
        }
        public setCardPaddingX(value: number) {
            this._cardPaddingX = value;
        }
        protected createChildren(): void {
            super.createChildren();
        }
        protected getCard(): CardBase {
            return null;
        }
        public init(cardCnt: number = 3) {
            this._cards = [];
            for (let i = 0; i < cardCnt; i++) {
                this._cards[i] = this.getCard();
            }
        }
        /**
         * 播放翻牌动画
         */
        public showCardAni(cardValues: any, isShowCard: boolean, sex?: number) {
            let delay = 0;
            let length = cardValues.length;
            let tween: egret.Tween;
            let cardWidth = this._cards[0].width;
            egret.log("showCardAni:")
            for (let i = 0; i < length; i++) {
                egret.log(cardValues[i] && isShowCard)
                if (cardValues[i] && isShowCard) {
                    let card = this._cards[i];
                    card.visible = true;
                    tween = egret.Tween.get(card)
                        .wait(delay)
                        .to({ scaleX: 0, x: card.x + cardWidth / 2 }, 150)
                        .call(card.setIcon, card, [cardValues[i]])
                        .to({ x: card.x, scaleX: 1 }, 150);
                    delay += 70;
                }
            }
            return new Promise((resolve: Function, reject: Function) => {
                if (tween) {
                    tween.wait(200).call(resolve);
                } else {
                    resolve();
                }
            })
            // return tween;
        }
        public updatePos() {
            let cardLen = this._cards.length;
            for (let i = 0; i < cardLen; i++) {

            }
        }
        public setCardsGray() {
            let length = this._cards.length;
            for (let i = 0; i < length; ++i) {
                this._cards[i].setGray();
            }
        }
        /**
         * 直接设置牌,不播放发牌动画
         */
        public setCards(cardValues?: number[], callBack?: Function, target?: Object) {
            let tween: egret.Tween;
            let self = this;
            let length = cardValues.length;
            let cardWidth = this._cards[0].width;
            // let cardHeight = this._cards[0].height;
            let start_x = (self.width - self._cardPaddingX * (length - 1) - cardWidth) / 2;
            let pos = egret.Point.create(0, 0);
            for (let i = 0; i < length; ++i) {
                let card = self._cards[i];
                card.visible = true;
                self.addChild(card);
                card.x = start_x;
                card.y = 0;
                start_x += self._cardPaddingX;
            }
            egret.Point.release(pos);
        }
        /**
         * 派牌
         * @param delay:延迟播放动画的时间
         */
        public dealCards(cardValues?: number[], delay: number = 0, callBack?: Function, target?: Object): void {
            // let delay = _delay;
            let tween: egret.Tween;
            let self = this;
            let length = cardValues.length;
            let cardWidth = this._cards[0].width;
            // let cardHeight = this._cards[0].height;
            let start_x = (self.width - self._cardPaddingX * (length - 1) - cardWidth) / 2;
            let pos = egret.Point.create(0, 0);
            for (let i = 0; i < length; ++i) {
                let cardObj = self._cards[i];
                cardObj.visible = true;
                self.addChild(cardObj);
                self.globalToLocal(Global.sWidth / 2, Global.sHeight / 2, pos);
                cardObj.x = pos.x - cardWidth / 2;
                cardObj.y = pos.y - cardWidth / 2;
                tween = egret.Tween.get(cardObj).wait(delay).to({ x: start_x, y: 0 }, 200)
                // .call(function () {
                //     egret.log("cardSound")
                //     SoundManage.playEffect("cardSound");
                // }, this);
                delay += 60;

            }
            tween.call((e) => {
                SoundManage.playEffect("cardSound");
                for (let i = 0; i < length; ++i) {
                    let card = self._cards[i];
                    tween = egret.Tween.get(card).to({ x: start_x }, 250);
                    start_x += self._cardPaddingX;
                }
                if (cardValues && cardValues[0]) {
                    tween.wait(40).call(this.showCardAni, this, [cardValues, true]);
                }
            });
        }
        public reset(): void {
            if (this._cards) {
                for (let key in this._cards) {
                    var card = this._cards[key];
                    card.visible = false;
                    card.setBack();
                }
            }

        }
        /**
         * 销毁跟回收对象
         */
        public destroy() {
            let arrLen = this._cards.length;
            for (let i = 0; i < arrLen; i++) {
                this._cards[i].destroy();
            }
            this._cards = null;
        }
        /**
         * 清理所有的动画
         */
        public clearAllAni(): void {
            for (let i = this._cards.length - 1; i > -1; --i) {
                egret.Tween.removeTweens(this._cards[i]);
            }
        }
    }
}