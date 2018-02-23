namespace DDZ {
    export class DiscardBox extends eui.Group {
        /**
         * 是否地主
         */
        private _isLandlord: boolean;
        constructor() {
            super();
        }
        protected createChildren(): void {
            super.createChildren();
            // let layout = new DiscardLayout();
            // layout.col = 10;
            // layout.horizontalGap = -38;
            // layout.direct =  egret.HorizontalAlign.RIGHT;
            // this.layout = layout;
        }
        // public
        public showCards(pokerCards: PokerCard[]) {
            this.clearDiscard();
            let arrLen = pokerCards.length;
            for (let i = 0; i < arrLen; i++) {
                let card = Card.create();
                card.skinName = niuniu.CardSkin;
                card.setSmallIcon(pokerCards[arrLen - i - 1].suit, pokerCards[arrLen - i - 1].value, false);
                this.addChild(card);
            }
            if (this._isLandlord) {
                let card = <Card>this.getChildAt(this.numChildren - 1);
                card.setLandlordIcon(true);
            }
        }
        public setIsLandlord(value) {
            this._isLandlord = value;
        }
        public reset() {
            this.clearDiscard();
            this._isLandlord = false;
        }
        public destroy() {
            this.clearDiscard();
        }
        /**
         * 清理所有显示的牌
         */
        public clearDiscard() {
            for (let i = this.numChildren - 1; i >= 0; i--) {
                let card: Card = <Card>this.getChildAt(i);
                card.destroy();
            }
        }
    }
    var UIComponentClass = "eui.UIComponent";
    const enum DIRECT {
        LEFT,
        RIGHT
    }
    export class DiscardLayout extends eui.LayoutBase {
        public row: number = 1;
        public col: number = 1;
        public horizontalAlign: egret.HorizontalAlign = egret.HorizontalAlign.LEFT;
        public horizontalGap: number = 0;
        public verticalGap: number = 0;
        public constructor() {
            super();
        }
        /**
         * 计算target的尺寸
         * 因为环形布局，依赖容器尺寸来定义半径，所以需要容器显式的设置width和height,在这种情况下measure方法将失去作用
         * 所以在这个例子里面，不需要重写measure方法
         * 如果您的自定义布局需要根据内部子项计算尺寸，请重写这个方法
         **/
        public measure(): void {
            super.measure();
            var layoutElement: eui.UIComponent = <eui.UIComponent>(this.target.getElementAt(0));
            if (layoutElement) {
                let columnWidth = layoutElement.width;
                let rowHeight = layoutElement.height;
                let width = this.col * (columnWidth + this.horizontalGap) - this.horizontalGap;
                let height = (Math.ceil(this.target.numElements / this.col)) * (rowHeight + this.verticalGap) - this.verticalGap;

                this.$target.setMeasuredSize(width, height)
            }

        }
        /**
         * 重写显示列表更新
         */
        public updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
            super.updateDisplayList(unscaledWidth, unscaledHeight);
            if (this.target == null)
                return;
            // egret.log("/----------------------updateDisplayList", this.horizontalAlign,egret.HorizontalAlign.LEFT, this.hashCode)
            var count: number = this.target.numElements;
            if (count) {
                let horizontalGap = this.horizontalGap;
                var verticalGap = this.verticalGap;
                let rowIndex = 0;
                let columnIndex = 0;
                var layoutElement: eui.UIComponent = <eui.UIComponent>(this.target.getElementAt(0));
                let columnWidth = layoutElement.width;
                let rowHeight = layoutElement.height;
                let columnCount = this.col;
                // let width = columnCount * (columnWidth + horizontalGap) - horizontalGap;
  
                
                let maxRowIndex = Math.ceil(count / columnCount);
                let pad = columnCount * maxRowIndex - count;
                let height = maxRowIndex * (rowHeight + verticalGap) - verticalGap;
                // max - count
                // maxRowIndex--;
                for (var i: number = 0; i < count; i++) {
                    var layoutElement: eui.UIComponent = <eui.UIComponent>(this.target.getElementAt(i));
                    columnIndex = Math.ceil((i + 1) % columnCount) - 1;
                    if (columnIndex == -1)
                        columnIndex = columnCount - 1;
                    rowIndex = Math.ceil((i + 1) / columnCount) - 1;
                    let x;
                    // let curRowIndex =
                    switch (this.horizontalAlign) {
                        case egret.HorizontalAlign.RIGHT:
                            if (rowIndex === maxRowIndex - 1) {
                                x = (columnIndex + pad) * (columnWidth + horizontalGap);
                            } else {
                                x = columnIndex * (columnWidth + horizontalGap);
                            }
                            // x = width - (columnIndex + 1) * (columnWidth + horizontalGap) + horizontalGap;
                            break;
                        // case egret.HorizontalAlign.CENTER:
                        // x = width / 2 -  (columnCount * columnWidth + (columnCount - 1) * horizontalGap) / 2 + columnIndex * (columnWidth + horizontalGap);
                        // break;
                        case egret.HorizontalAlign.LEFT:
                            x = columnIndex * (columnWidth + horizontalGap);
                            break;
                        // default:
                        // x = columnIndex * (columnWidth + horizontalGap) + paddingL;
                    }
                    let y = height / 2 - (maxRowIndex * rowHeight + (maxRowIndex - 1) * verticalGap) / 2 + rowIndex * (rowHeight + verticalGap);

                    layoutElement.setLayoutBoundsPosition(x, y);
                }
                // this.target.setContentSize(width, height);
            }
        }
    }
}