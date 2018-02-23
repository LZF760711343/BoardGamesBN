/**
 *
 * @author HE
 *
 */
namespace majiang {
    const SCALE = 0.6;
    const CARD_WIDTH = 74 * SCALE;
    const CARD_HEIGHT = 58 * SCALE;
    export class CardBoxLeft extends CardBox {
        constructor() {
            super();
            this._direct = DIRECT.LEFT;
        }
        protected _deskPadding = -10;
        protected _cardPadding: number = -17;
        protected _cardPaddingX: number = 10;
        protected _deskPaddingX = -5;
        protected createChildren(): void {
            super.createChildren();
        }
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number) {
            if (!this.isInit) {
                return;
            }
            let arrLen = this.numChildren;
            let y = 0;
            let x = 0;
            let deskLen = this._destList.length;

            for (let i = 0; i < deskLen; i++) {
                let cardType = <CardType>this.getChildAt(i);
                cardType.y = y;
                cardType.x = x;

                if (i < 1) {
                    x += cardType.width - 9;
                    y = 0;
                } else {
                    if (i == 1) {
                        x = -24;
                    } else {
                        x += 36;
                    }
                    y = cardType.height - 10;
                }
            }
            //每张牌 X 9  Y =24
            // x = 24;
            // y = 23;
            x = 45;
            y = 60;
            //居中显示
            for (let i = 1; i < deskLen; i++) {
                if (deskLen < 4) {
                    x -= (9 * i);
                    y += (24 * i);
                } else {
                    x -= (9 * 2);
                    y += (24 * 2);
                }
            }

            let card: Card;
            let cardlen = this._cardsValues.length;
            for (let i = deskLen; i < arrLen; i++) {
                card = <Card>this.getChildAt(i);
                card.y = y;
                card.x = x;
                if (card.cardValue) {
                    y += card.height + this._cardPadding;
                    x += card.width = this._cardPaddingX;
                } else {
                    y += card.height + this._cardPadding - 20;
                    x += card.width = this._cardPaddingX - 20;
                }

            }
            if (cardlen % 3 == 2) {
                card.y += 10;
            }
        }
    }
}