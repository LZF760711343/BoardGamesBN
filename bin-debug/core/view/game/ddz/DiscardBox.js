var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DDZ;
(function (DDZ) {
    var DiscardBox = (function (_super) {
        __extends(DiscardBox, _super);
        function DiscardBox() {
            return _super.call(this) || this;
        }
        DiscardBox.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // let layout = new DiscardLayout();
            // layout.col = 10;
            // layout.horizontalGap = -38;
            // layout.direct =  egret.HorizontalAlign.RIGHT;
            // this.layout = layout;
        };
        // public
        DiscardBox.prototype.showCards = function (pokerCards) {
            this.clearDiscard();
            var arrLen = pokerCards.length;
            for (var i = 0; i < arrLen; i++) {
                var card = DDZ.Card.create();
                card.skinName = niuniu.CardSkin;
                card.setSmallIcon(pokerCards[arrLen - i - 1].suit, pokerCards[arrLen - i - 1].value, false);
                this.addChild(card);
            }
            if (this._isLandlord) {
                var card = this.getChildAt(this.numChildren - 1);
                card.setLandlordIcon(true);
            }
        };
        DiscardBox.prototype.setIsLandlord = function (value) {
            this._isLandlord = value;
        };
        DiscardBox.prototype.reset = function () {
            this.clearDiscard();
            this._isLandlord = false;
        };
        DiscardBox.prototype.destroy = function () {
            this.clearDiscard();
        };
        /**
         * 清理所有显示的牌
         */
        DiscardBox.prototype.clearDiscard = function () {
            for (var i = this.numChildren - 1; i >= 0; i--) {
                var card = this.getChildAt(i);
                card.destroy();
            }
        };
        return DiscardBox;
    }(eui.Group));
    DDZ.DiscardBox = DiscardBox;
    __reflect(DiscardBox.prototype, "DDZ.DiscardBox");
    var UIComponentClass = "eui.UIComponent";
    var DiscardLayout = (function (_super) {
        __extends(DiscardLayout, _super);
        function DiscardLayout() {
            var _this = _super.call(this) || this;
            _this.row = 1;
            _this.col = 1;
            _this.horizontalAlign = egret.HorizontalAlign.LEFT;
            _this.horizontalGap = 0;
            _this.verticalGap = 0;
            return _this;
        }
        /**
         * 计算target的尺寸
         * 因为环形布局，依赖容器尺寸来定义半径，所以需要容器显式的设置width和height,在这种情况下measure方法将失去作用
         * 所以在这个例子里面，不需要重写measure方法
         * 如果您的自定义布局需要根据内部子项计算尺寸，请重写这个方法
         **/
        DiscardLayout.prototype.measure = function () {
            _super.prototype.measure.call(this);
            var layoutElement = (this.target.getElementAt(0));
            if (layoutElement) {
                var columnWidth = layoutElement.width;
                var rowHeight = layoutElement.height;
                var width = this.col * (columnWidth + this.horizontalGap) - this.horizontalGap;
                var height = (Math.ceil(this.target.numElements / this.col)) * (rowHeight + this.verticalGap) - this.verticalGap;
                this.$target.setMeasuredSize(width, height);
            }
        };
        /**
         * 重写显示列表更新
         */
        DiscardLayout.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            if (this.target == null)
                return;
            // egret.log("/----------------------updateDisplayList", this.horizontalAlign,egret.HorizontalAlign.LEFT, this.hashCode)
            var count = this.target.numElements;
            if (count) {
                var horizontalGap = this.horizontalGap;
                var verticalGap = this.verticalGap;
                var rowIndex = 0;
                var columnIndex = 0;
                var layoutElement = (this.target.getElementAt(0));
                var columnWidth = layoutElement.width;
                var rowHeight = layoutElement.height;
                var columnCount = this.col;
                // let width = columnCount * (columnWidth + horizontalGap) - horizontalGap;
                var maxRowIndex = Math.ceil(count / columnCount);
                var pad = columnCount * maxRowIndex - count;
                var height = maxRowIndex * (rowHeight + verticalGap) - verticalGap;
                // max - count
                // maxRowIndex--;
                for (var i = 0; i < count; i++) {
                    var layoutElement = (this.target.getElementAt(i));
                    columnIndex = Math.ceil((i + 1) % columnCount) - 1;
                    if (columnIndex == -1)
                        columnIndex = columnCount - 1;
                    rowIndex = Math.ceil((i + 1) / columnCount) - 1;
                    var x = void 0;
                    // let curRowIndex =
                    switch (this.horizontalAlign) {
                        case egret.HorizontalAlign.RIGHT:
                            if (rowIndex === maxRowIndex - 1) {
                                x = (columnIndex + pad) * (columnWidth + horizontalGap);
                            }
                            else {
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
                    }
                    var y = height / 2 - (maxRowIndex * rowHeight + (maxRowIndex - 1) * verticalGap) / 2 + rowIndex * (rowHeight + verticalGap);
                    layoutElement.setLayoutBoundsPosition(x, y);
                }
            }
        };
        return DiscardLayout;
    }(eui.LayoutBase));
    DDZ.DiscardLayout = DiscardLayout;
    __reflect(DiscardLayout.prototype, "DDZ.DiscardLayout");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=DiscardBox.js.map