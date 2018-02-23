namespace majiang {
    // const CARD_W = 74;
    // const CARD_H = 98;
    // export const SHOW_CARD_SIZE = {
    //     LEFT_RIGHT_WIDTH : 46,
    //     LEFT_RIGHT_HEIGHT: 38,
    //     TOP_BOTTOM_WIDTH: 41,
    //     TOP_BOTTOM_HEIGHT: 56,
    // }
    const SCALE = 1;
    export class DiscardBox extends eui.Group {
        /**
         * 方向  带_tan是弹
         */
        public _direct: string;
        protected cards: Card[];
        protected _colKey: string;
        protected _rowKey: string;
        protected _colPadding: number;
        /**
         * 换行间距
         */
        protected _rowPadding: number;
        protected _colXpading: number;
        protected _colPos: number;
        protected _rowPos: number;
        public layer: eui.Component;
        public lastTipImg: eui.Image;
        protected _rect: egret.Rectangle;
        public guiCardValue: number;
        /**
         * 每一行最大的牌数,超过这个就换行排列
         */
        public maxCnt: number;
        constructor() {
            super();
            this._rect = egret.Rectangle.create();

        }
        protected createChildren(): void {
            super.createChildren();
            // this._colPos = this[this._colKey];
            // this._rowPos = this[this._rowKey];
            // this.cards = [];
        }
        public get direct() {
            return this._direct;
        }
        public set direct(value: string) {
            this._direct = value;
            switch (value) {
                case "left":
                    this._colKey = "top";
                    this._rowKey = "left";
                    this._colPadding = 23;
                    this._rowPadding = 76;
                    this._colXpading = -4;
                    this._rect.width = 38;
                    this._rect.height = 46;
                    this.maxCnt = 9;
                    break;
                case "right":
                    this._colKey = "bottom";
                    this._rowKey = "right";
                    this._colPadding = 23;
                    this._rowPadding = -76;
                    this._colXpading = -4;
                    this._rect.width = 38;
                    this._rect.height = 46;
                    this.maxCnt = 9;
                    break;
                case "top":
                    this._colKey = "right";
                    this._rowKey = "top";
                    this._colPadding = 37;
                    this._rowPadding = -(-15 + 56);
                    this._colXpading = -4;
                    this._rect.width = 38;
                    this._rect.height = 46;
                    this.maxCnt = 9;
                    break;
                case "bottom":
                    this._colKey = "left";
                    this._rowKey = "bottom";
                    this._colPadding = -5 + 41;
                    this._rowPadding = -(-15 + 56);
                    this._rect.width = 41;
                    this._rect.height = 56;
                    this.maxCnt = 9;
                    break;
                case "left_tan":
                    this._colKey = "top";
                    this._rowKey = "left";
                    this._colPadding = 18;
                    this._rowPadding = 74;
                    this._colXpading = -7;
                    this._rect.width = 38;
                    this._rect.height = 46;
                    this.maxCnt = 18;
                    break;
                case "right_tan":
                    this._colKey = "bottom";
                    this._rowKey = "right";
                    this._colPadding = 18;
                    this._rowPadding = -78;
                    this._colXpading = -7;
                    this._rect.width = 38;
                    this._rect.height = 46;
                    this.maxCnt = 18;
                    break;
                case "bottom_tan":
                    this._colKey = "left";
                    this._rowKey = "bottom";
                    this._colPadding = -5 + 41;
                    this._rowPadding = -10 + 56;
                    this._rect.width = 41;
                    this._rect.height = 56;
                    this.maxCnt = 18;
                    break;
            }
            this.reset();
        }
        public getLastCardPos() {
            var card: Card | DiscardBox;

            if (this.cards.length) {
                card = this.cards[this.cards.length - 1];
                var col: number = this[this._colKey] + card[this._colKey];
                var row: number = this[this._rowKey] + card[this._rowKey];
            } else {
                card = this;
                var col = 0;
                var row = 0;
            }
            // let x = 
            switch (this._direct) {
                case "left":
                    this._rect.x = row;
                    this._rect.y = col;
                    break;
                case "right":
                    this._rect.x = Global.sWidth - row - card.width;
                    this._rect.y = Global.sHeight - col - card.height;
                    break;
                case "top":
                    this._rect.x = Global.sWidth - col - card.width;
                    this._rect.y = row;
                    break;
                case "bottom":
                    this._rect.x = col;
                    this._rect.y = Global.sHeight - row - card.height;
                    break;
            }
            return this._rect;
        }
        public setTip(): void {
            if (this.cards.length) {
                let object = this.lastTipImg;
                var card = this.cards[this.cards.length - 1];
                object.x = card.width / 2 - 27 / 2;
                object.y = -33 + card.height / 2 - 5;
                card.addChild(object);

                egret.log("card.height / 2", card.height / 2, "object.height", object.height);
                egret.Tween.get(object, { loop: true })
                    .to({ y: object.y - 10 }, 500)
                    .to({ y: object.y }, 300);
            }
        }
        public addCardWithAni(showCard: Card, cardValue): egret.Tween {
            let pos = this.parent.globalToLocal(this.x, this.y);
            var card = this.cards[this.cards.length - 1];
            
            let x;
            let y;
            egret.log("this._colPos", this._colPos);
            egret.log("this._rowPos", this._rowPos);
            if (card) {
                x = pos.x + card.x;
                y = pos.y + card.y;
            } else {
                x = pos.x
                y = pos.y
            }
            return egret.Tween.get(showCard)
                .to({ x: x, y: y, scaleX: SCALE, scaleY: SCALE }, 250)
                .call(() => {
                    this.addCard(showCard);
                    showCard.setDisIcon(this._direct, cardValue);
                    this.setTip()
                });
        }

        
        public getRowCnt() {
            egret.log("getRowCnt:", this.cards.length, this.maxCnt, this.cards.length / this.maxCnt)
            return this.cards.length / this.maxCnt;
        }
        public addCard(card: Card) {
            card[this._colKey] = this._colPos;
            card[this._rowKey] = this._rowPos;
            this.cards.push(card);
            if (this._direct == "left" || this._direct == "left_tan") {
                if (this.cards.length % this.maxCnt == 0) {
                    this._colPos = 0;
                    this._rowPos += this._rowPadding
                } else {
                    this._colPos += this._colPadding;
                    this._rowPos += this._colXpading;
                }
            } else if (this._direct == "right" || this._direct == "right_tan") {
                if (this.cards.length % this.maxCnt == 0) {
                    this._colPos = 0;
                    this._rowPos += this._rowPadding
                } else {
                    this._colPos += this._colPadding;
                    this._rowPos -= this._colXpading;
                }
            } else {
                if (this.cards.length % this.maxCnt == 0) {
                    this._colPos = 0;
                    this._rowPos += this._rowPadding
                } else {
                    this._colPos += this._colPadding;
                }
            }

            if (this._direct == "right" || this._direct == "right_tan" && this.cards.length > 1) {
                this.addChildAt(card, this.getChildIndex(this.cards[this.cards.length - 2]));
            } else if (this._direct == "top") {
                this.addChildAt(card, 0);
                // this.addChild(card);
            } else {
                this.addChild(card);
            }
        }
        public addCardByValues(values: CARD_VALUE[]) {
            let arrLen = values.length;
            for (let i = 0; i < arrLen; i++) {
                this.addCardByValue(values[i]);
            }
        }
        public addCardByValue(value: CARD_VALUE): Card {
            var card = Card.create();
            card.cardValue = value;
            egret.log("card.cardValue", card.cardValue);
            this.addCard(card);

            if (this._direct.indexOf("_tan") != -1) {
                let val = this._direct.substring(0, this._direct.indexOf("_tan"));
                // card.setTanIcon(val, value);
            } else {
                card.setDisIcon(this._direct, value);
            }

            card.scaleX = card.scaleY = SCALE;
            return card;
        }

        /**
         * 删除最后一张牌
         */
        public deleteLastCard(cardValue: number): Card {
            if (this.cards.length) {
                if (this.cards[this.cards.length - 1].cardValue === cardValue) {
                    var card = this.cards.pop();
                    this._colPos = card[this._colKey];
                    this._rowPos = card[this._rowKey];
                    this.removeChild(card);
                    return card;
                }

            }
            return null;
        }
        public initCards(cards: number[]) {
            this.clearDiscard();
            if (cards) {
                var length = cards.length;
                for (var i = 0; i < length; ++i) {
                    this.addCardByValue(cards[i]);
                }
            }
        }
        public addCardMark(event: egret.Event): void {
            let cardValue = event.data;
            for (var i = this.cards.length - 1; i > -1; --i) {
                egret.log("this.cards[i].cardValue", this.cards[i].cardValue);
                egret.log("cardValue", cardValue);
                if (this.cards[i].cardValue === cardValue) {
                    this.cards[i].addChild(getMark());
                }
            }
        }
        public reset(): void {//13533525704
            this._colPos = 0;
            this._rowPos = 0;
            if (this.cards && this.cards.length) {
                let num = this.cards.length;
                for (let i = num - 1; i > -1; i--) {
                    let card = this.cards[i];
                    card.destroy();
                }
            }
            this.cards = [];
            if (this.lastTipImg) {
                if (this.lastTipImg.parent) {
                    this.lastTipImg.parent.removeChild(this.lastTipImg);
                }
                egret.Tween.removeTweens(this.lastTipImg);
            }
        }
        public destroy() {
            if (this.lastTipImg) {
                if (this.lastTipImg.parent) {
                    this.lastTipImg.parent.removeChild(this.lastTipImg);
                }
                egret.Tween.removeTweens(this.lastTipImg);
            }

        }
        public clearDiscard() {
            let length = this.cards.length;
            for (let i = 0; i < length; ++i) {
                this.removeChild(this.cards[i]);
            }
            this._colPos = 0;
            this._rowPos = 0;
            this.cards = [];
        }
    }
}