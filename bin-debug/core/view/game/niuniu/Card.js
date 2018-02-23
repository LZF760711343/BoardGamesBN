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
    var _pool = [];
    var Card = (function (_super) {
        __extends(Card, _super);
        // private static _pool:Card[] = [];
        function Card() {
            return _super.call(this) || this;
        }
        Card.prototype.setIcon = function (cardValue) {
            this.cardValue = cardValue;
            // this.color = (cardValue >> 4) & 0x7;
            // var key = this.key = cardValue & 0xF;
            this.color = cardValue & 0xf;
            this.key = cardValue >> 4;
            var key = MAP_NAMES[this.key];
            this.bg.source = "big_card_bg_png";
            if (this.color == 1 || this.color == 3) {
                this.icon_key.source = "card_" + key + "_" + 1 + "_png";
                this.currentState = "big";
            }
            else if (this.color == 2 || this.color == 4) {
                this.icon_key.source = "card_" + key + "_" + 2 + "_png";
                this.currentState = "big";
            }
            else {
                this.icon_key.source = "card_" + key + "_" + 0 + "_png";
                this.currentState = "big_w";
            }
            // egret.log("this.color" + this.color, 'FF' + this.key)
            if (this.color) {
                if (this.key == 11 || this.key == 12 || this.key == 13) {
                    this.icon_color.right = this.icon_color.bottom = 0;
                    if (this.color == 2 || this.color == 4) {
                        this.icon_color.source = "card_head" + this.key + "_png";
                    }
                    else {
                        this.icon_color.source = "card_headH" + this.key + "_png";
                    }
                }
                else {
                    this.icon_color.right = 11;
                    this.icon_color.bottom = 13;
                    this.icon_color.source = "card_color" + this.color + "_png";
                }
                this.icon.source = "card_icon" + this.color + "_png";
            }
            else {
                if (key == 14) {
                    this.icon_color.source = "card_color_x_png";
                }
                else {
                    this.icon_color.source = "card_color_d_png";
                }
            }
        };
        Card.prototype.setIcon2 = function (cardValue) {
            this.cardValue = cardValue;
            // this.color = (cardValue >> 4) & 0x7;
            // var key = this.key = cardValue & 0xF;
            this.color = cardValue & 0xf;
            this.bg.source = "big_card_bg_png";
            this.key = cardValue >> 4;
            if (this.key == 15 /* VALUE_DG */) {
                this.bg.source = "wang_1_png";
            }
            else if (this.key == 14 /* VALUE_XG */) {
                this.bg.source = "wang_hui_png";
            }
            else {
                this.bg.source = this.key + "_" + this.color + "_png";
            }
        };
        Card.prototype.setIconByBrnn = function (cardValue) {
            this.cardValue = cardValue;
            // this.color = (cardValue >> 4) & 0x7;
            // var key = this.key = cardValue & 0xF;
            this.color = cardValue & 0xf;
            this.key = cardValue >> 4;
            var key = MAP_NAMES[this.key];
            this.bg.source = "big_card_bg_png";
            if (this.color == 1 || this.color == 3) {
                this.icon_key.source = "brnncard_" + key + "_" + 1 + "_png";
                this.currentState = "big_brnn";
                this.icon_key.scaleX = this.icon_key.scaleY = 1;
            }
            else if (this.color == 2 || this.color == 4) {
                this.icon_key.source = "brnncard_" + key + "_" + 2 + "_png";
                this.currentState = "big_brnn";
                this.icon_key.scaleX = this.icon_key.scaleY = 1;
            }
            else {
                this.icon_key.source = "card_" + key + "_" + 0 + "_png";
                this.currentState = "big_w";
                this.icon_key.scaleX = this.icon_key.scaleY = 1.2;
            }
            // egret.log("this.color" + this.color, 'FF' + this.key)
            if (this.color) {
                if (this.key == 11 || this.key == 12 || this.key == 13) {
                    this.icon_color.right = this.icon_color.bottom = 0;
                    if (this.color == 2 || this.color == 4) {
                        this.icon_color.source = "card_head" + this.key + "_png";
                    }
                    else {
                        this.icon_color.source = "card_headH" + this.key + "_png";
                    }
                }
                else {
                    this.icon_color.right = 5;
                    this.icon_color.bottom = 6;
                    // this.icon_color.scaleX = this.icon_color.scaleY = 1;
                    this.icon_color.source = "card_color" + this.color + "_png";
                }
                this.icon.source = "card_icon" + this.color + "_png";
            }
            else {
                if (key == 14) {
                    this.icon_color.source = "card_color_x_png";
                }
                else {
                    this.icon_color.source = "card_color_d_png";
                }
            }
        };
        Card.prototype.setSmallIcon = function (cardValue) {
            this.cardValue = cardValue;
            this.color = cardValue & 0xf;
            this.key = cardValue >> 4;
            var key = MAP_NAMES[this.key];
            // var key: any = MAP_NAMES[this.key];
            this.bg.source = "big_card_bg_png";
            if (this.color == 1 || this.color == 3) {
                this.currentState = "small";
                this.icon_key.source = "card_" + key + "_" + 1 + "_png";
            }
            else if (this.color == 2 || this.color == 4) {
                this.icon_key.source = "card_" + key + "_" + 2 + "_png";
                this.currentState = "small";
            }
            else {
                this.icon_key.source = "card_" + key + "_" + 0 + "_png";
                this.currentState = "small_w";
            }
            if (this.color) {
                this.icon_color.source = "card_color" + this.color + "_png";
                this.icon.source = "card_icon" + this.color + "_png";
            }
            else {
                if (key == 14) {
                    this.icon_color.source = "card_color_x_png";
                }
                else {
                    this.icon_color.source = "card_color_d_png";
                }
            }
        };
        /**
         * 将自己从父节点移除,并且放入到缓存池中
         */
        Card.prototype.destroy = function () {
            if (_pool.indexOf(this) === -1) {
                _pool.push(this);
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
            egret.Tween.removeTweens(this);
            this.reset();
        };
        Card.create = function () {
            if (_pool.length) {
                return _pool.pop();
            }
            else {
                var card = new Card();
                card.skinName = niuniu.CardSkin;
                return card;
            }
        };
        return Card;
    }(CardBase));
    niuniu.Card = Card;
    __reflect(Card.prototype, "niuniu.Card");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=Card.js.map