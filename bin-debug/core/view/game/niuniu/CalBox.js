var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var niuniu;
(function (niuniu) {
    /**
     *
     * @author
     *
     */
    var CalBox = (function (_super) {
        __extends(CalBox, _super);
        //        public btnAuto:components.CommonBtn;
        function CalBox() {
            return _super.call(this) || this;
        }
        CalBox.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._labs = [this._lab1, this._lab2, this._lab3];
            this.youNiu = false;
            this.cardValues = [];
        };
        CalBox.prototype.show = function () {
            this._lab1.text =
                this._lab2.text =
                    this._lab3.text =
                        this._labResult.text = "";
            this.visible = true;
        };
        CalBox.prototype.hide = function () {
            this.visible = false;
        };
        CalBox.prototype.setDatas = function (cards) {
            this.cardValues.length = 0;
            var result = 0;
            for (var i = 0; i < 3; i++) {
                if (cards[i]) {
                    var value = cards[i].key;
                    value = value > 10 ? 10 : value;
                    result += value;
                    this._labs[i].text = "" + value;
                    this.cardValues[i] = cards[i].cardValue;
                }
                else {
                    this._labs[i].text = "";
                }
            }
            if (result) {
                this._labResult.text = "" + result;
                this.youNiu = result % 10 == 0 && this.cardValues.length == 3;
            }
            else {
                this._labResult.text = "";
            }
        };
        return CalBox;
    }(eui.Component));
    niuniu.CalBox = CalBox;
    __reflect(CalBox.prototype, "niuniu.CalBox");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=CalBox.js.map