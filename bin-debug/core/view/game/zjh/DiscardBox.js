var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zjh;
(function (zjh) {
    var DiscardBox = (function (_super) {
        __extends(DiscardBox, _super);
        function DiscardBox() {
            return _super.call(this) || this;
        }
        DiscardBox.prototype.getCard = function () {
            var card = zjh.Card.create();
            card.setBack();
            return card;
        };
        /**
         * 销毁跟回收对象
         */
        DiscardBox.prototype.destroy = function () {
            this.clearAllAni();
            _super.prototype.destroy.call(this);
        };
        return DiscardBox;
    }(base.DiscardBoxBase));
    zjh.DiscardBox = DiscardBox;
    __reflect(DiscardBox.prototype, "zjh.DiscardBox");
})(zjh || (zjh = {}));
//# sourceMappingURL=DiscardBox.js.map