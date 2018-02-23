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
    var SelectBtn = (function (_super) {
        __extends(SelectBtn, _super);
        function SelectBtn() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            return _this;
        }
        /**
         * @param type:类型 碰/杠/胡/吃/勺/摊
         * @param cardValues:碰/杠/胡/吃/勺/摊的牌
         * @param chiValue:如果是吃的话,才会用到这个参数,用于表示显示池哪一张牌
         */
        SelectBtn.prototype.init = function (data) {
            this.data = data;
            switch (data.activeType) {
                case 7 /* CHI */:
                    this._icon.source = "chi_mjz_png";
                    this.currentState = "normal";
                    break;
                case 8 /* PENG */:
                    this._icon.source = "peng_mjz_png";
                    this.currentState = "normal";
                    break;
                case 6 /* SHAO */:
                    this._icon.source = "shao_mjz_png";
                    this.currentState = "normal";
                    break;
                case 9 /* GANG */:
                    this._icon.source = "gan_mjz_png";
                    this.currentState = "normal";
                    break;
                case 5 /* TAN */:
                    this._icon.source = "tang_icon1_png";
                    this.currentState = "noBg";
                    break;
                case 10 /* HU */:
                    this._icon.source = "hu_mjz1_png";
                    this.currentState = "noBg";
                    break;
            }
            if (data.activeType !== 5 /* TAN */ && data.activeType !== 10 /* HU */) {
                this._cardType.setCards(data, majiang.DIRECT.BOTTOM);
            }
        };
        return SelectBtn;
    }(eui.Component));
    majiang.SelectBtn = SelectBtn;
    __reflect(SelectBtn.prototype, "majiang.SelectBtn");
})(majiang || (majiang = {}));
//# sourceMappingURL=SelectBtn.js.map