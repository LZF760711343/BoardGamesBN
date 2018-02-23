/**
 *
 * @author HE
 *
 */
namespace majiang {
    export class CardBoxRight extends CardBox {
        /**
         *
         */
        constructor() {
            super();

            this._direct = DIRECT.RIGHT;

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
            let card: Card;
            let arrLen = this.numChildren;
            let deskLen = this._destList.length;

            let y = 0;
            let x = 0;
            for (let i = 1; i < deskLen; i++) {
                if (deskLen < 4) {
                    x += (9 * i);
                    y += (24 * i);
                } else {
                    x += (9 * 2);
                    y += (24 * 2);
                }
            }

            let cardlen = this._cardsValues.length;
            for (let i = deskLen; i < arrLen; i++) {
                card = <Card>this.getChildAt(i);
                card.y = y;
                card.x = x;
                if (card.cardValue) {
                    y += card.height + this._cardPadding;
                    x -= card.width = this._cardPaddingX;
                } else {
                    y += card.height + this._cardPadding - 20;
                    x -= card.width = this._cardPaddingX - 20;
                }

            }
            if (cardlen % 3 == 2) {
                card.y += 10;
            }
            if (deskLen) {
                y = 300;

                let cardType = <CardType>this.getChildAt(deskLen - 1);
                let padding = 27 - cardType.width;
                // x = 150 + padding * 2;
                if (deskLen < 3) {
                    x = 150 + padding * (deskLen - 1);
                } else {
                    x = 150 + padding * 2;
                }
                for (let i = 0; i < deskLen; i++) {
                    cardType = <CardType>this.getChildAt(deskLen - i - 1);
                    cardType.y = y;
                    cardType.x = x;
                    if (i == 2) {
                        x = 120 + padding * (2 - deskLen + i);
                        y = y - cardType.height + 10;
                    } else {
                        x -= padding;
                    }
                }
            }


        }
    }
}