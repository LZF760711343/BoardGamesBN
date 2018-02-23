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
    var ChipsBar = (function (_super) {
        __extends(ChipsBar, _super);
        function ChipsBar() {
            return _super.call(this) || this;
        }
        ChipsBar.prototype.setBetChips = function (value) {
            this._betChipsLab.text = value + "";
        };
        return ChipsBar;
    }(eui.Component));
    zjh.ChipsBar = ChipsBar;
    __reflect(ChipsBar.prototype, "zjh.ChipsBar");
})(zjh || (zjh = {}));
//# sourceMappingURL=ChipsBar.js.map