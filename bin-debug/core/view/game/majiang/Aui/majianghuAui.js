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
    var majianghuAui = (function (_super) {
        __extends(majianghuAui, _super);
        function majianghuAui() {
            var _this = _super.call(this) || this;
            _this.skinName = hu;
            return _this;
        }
        majianghuAui.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return majianghuAui;
    }(AnimationBase));
    majiang.majianghuAui = majianghuAui;
    __reflect(majianghuAui.prototype, "majiang.majianghuAui");
})(majiang || (majiang = {}));
//# sourceMappingURL=majianghuAui.js.map