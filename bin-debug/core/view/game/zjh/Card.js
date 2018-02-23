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
    var _pool = [];
    var Card = (function (_super) {
        __extends(Card, _super);
        // private static _pool:Card[] = [];
        function Card() {
            return _super.call(this) || this;
            // this.skinName = CardSkin;
        }
        Card.prototype.setIcon = function (cardValue) {
            this.cardValue = cardValue;
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
        Card.prototype.setSmallIcon = function (cardValue) {
            // this.cardValue = cardValue;
            // this.color = cardValue & 0xf;
            // this.key = cardValue >> 4;
            // var key: any = MAP_NAMES[this.key];
            // // var key: any = MAP_NAMES[this.key];
            // this.bg.source = "card_bg_png";
            // if (this.color == 1 || this.color == 3) {
            // 	this.currentState = "small";
            // 	this.icon_key.source = `card_${key}_${1}_png`;
            // } else if (this.color == 2 || this.color == 4) {
            // 	this.icon_key.source = `card_${key}_${2}_png`;
            // 	this.currentState = "small";
            // } else {
            // 	this.icon_key.source = `card_${key}_${0}_png`;
            // 	this.currentState = "small_w";
            // }
            // if (this.color) {
            // 	this.icon_color.source = `card_color${this.color}_png`;
            // 	this.icon.source = `card_icon${this.color}_png`;
            // } else {
            // 	if (key == 14) {
            // 		this.icon_color.source = "card_color_x_png";
            // 	} else {
            // 		this.icon_color.source = "card_color_d_png";
            // 	}
            // }
        };
        Card.prototype.reset = function () {
            _super.prototype.reset.call(this);
        };
        /**
         * 将自己从父节点移除,并且放入到缓存池中
         */
        Card.prototype.destroy = function () {
            if (_pool.indexOf(this) === -1) {
                _pool.push(this);
            }
            // this.scaleX = this.scaleY = 1;
            if (this.parent) {
                this.parent.removeChild(this);
            }
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
    zjh.Card = Card;
    __reflect(Card.prototype, "zjh.Card");
})(zjh || (zjh = {}));
//# sourceMappingURL=Card.js.map