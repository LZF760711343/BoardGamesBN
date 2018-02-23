var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var majiang;
(function (majiang) {
    // const CARD_W = 74;
    // const CARD_H = 98;
    // export const SHOW_CARD_SIZE = {
    //     LEFT_RIGHT_WIDTH : 46,
    //     LEFT_RIGHT_HEIGHT: 38,
    //     TOP_BOTTOM_WIDTH: 41,
    //     TOP_BOTTOM_HEIGHT: 56,
    // }
    var SCALE = 1;
    var TanDiscardBox = (function (_super) {
        __extends(TanDiscardBox, _super);
        function TanDiscardBox() {
            return _super.call(this) || this;
        }
        TanDiscardBox.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return TanDiscardBox;
    }(majiang.DiscardBox));
    majiang.TanDiscardBox = TanDiscardBox;
    __reflect(TanDiscardBox.prototype, "majiang.TanDiscardBox");
})(majiang || (majiang = {}));
//# sourceMappingURL=TanDiscardBox.js.map