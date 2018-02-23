/**
 *
 * @author HE
 *
 */
namespace majiang {
    const SCALE = 0.8;
    const CARD_WIDTH = 54 * SCALE;
    const CARD_HEIGHT = 83 * SCALE;
    export class CardBoxTop extends CardBox {
        /**
         *
         */
        constructor() {
            super();
            this._direct = DIRECT.TOP;
        }
        protected _cardPadding = -1;
        protected createChildren(): void {
            super.createChildren();
        }
        // /**
        //  * 增加一个碰/杠/胡/吃/勺牌型对象到手牌里面
        //  */
        // public addCardTypeObj(item: MJActionItem) {
        //     this._destList.push(item);
        //     let obj = this.getCardTypeObj(item);
        //     this.addChildAt(obj, this._cardsValues.length);
        //     if (item.delCards && item.delCards.length) {
        //         this.deleteCards(item.delCards);
        //     }
        // }
        // public updateCardType(item: MJActionItem) {
        //     let arrLen = this.numChildren;
        //     for (let i = this._cardsValues.length; i < arrLen; i++) {
        //         let cardType = <CardType>this.getChildAt(i);
        //         if (cardType.dest.activeType === ACTIVE_TYPE.SHAO && cardType.dest.cardValue === item.cardValue) {
        //             cardType.setCards(item, this._direct);
        //             break;
        //         }
        //     }
        //     if (item.delCards && item.delCards.length) {
        //         this.deleteCards(item.delCards);
        //     }
        // }
        // public deleteCard(value: number) {
        //     for (var i = this.numChildren - 1; i > -1; --i) {
        //         let card = <Card>this.getChildAt(i);
        //         if (!card.cardValue || card.cardValue === value) {
        //             this._cardsValues.splice(i - this._destList.length, 1);
        //             this.removeChild(card);
        //             var pos = this.localToGlobal(card.x, card.y, this.point);
        //             card.x = pos.x;
        //             card.y = pos.y;
        //             return card;
        //         }
        //     }
        // }
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number) {
            if (!this.isInit) {
                return;
            }
            let arrLen = this.numChildren;
            let x = this.width;
            let deskLen = this._destList.length;
            let cardType: CardType;
            for (let i = 0; i < deskLen; i++) {
                cardType = <CardType>this.getChildAt(i);
                x -= cardType.width;
                cardType.x = x;
                x -= this._deskPadding;
            }
            if (cardType) {
                x -= (10);
            }

            let card: Card;
            let cardlen = this._cardsValues.length;
            for (let i = deskLen; i < arrLen; i++) {
                card = <Card>this.getChildAt(i);
                x -= card.width;
                card.x = x;
                x -= this._cardPadding;
            }
            if (cardlen % 3 == 2) {
                card.x -= 10;
            }
        }
    }
}