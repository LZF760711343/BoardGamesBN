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
    var majiangshaoAui = (function (_super) {
        __extends(majiangshaoAui, _super);
        function majiangshaoAui() {
            var _this = _super.call(this) || this;
            _this.skinName = shao;
            return _this;
        }
        majiangshaoAui.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return majiangshaoAui;
    }(AnimationBase));
    majiang.majiangshaoAui = majiangshaoAui;
    __reflect(majiangshaoAui.prototype, "majiang.majiangshaoAui");
})(majiang || (majiang = {}));
//# sourceMappingURL=majiangshaoAui.js.map