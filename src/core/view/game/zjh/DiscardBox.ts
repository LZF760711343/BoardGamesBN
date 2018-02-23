namespace zjh {
    export class DiscardBox extends base.DiscardBoxBase {
        protected _cards: Card[];

        constructor() {
            super();
        }
        protected getCard(): CardBase {
            let card = Card.create();
            card.setBack();
            return card;
        }
        /**
         * 销毁跟回收对象
         */
        public destroy() {
            this.clearAllAni();
            super.destroy();
        }
    }
}