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
    var _pool = [];
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            var _this = _super.call(this) || this;
            // private static _pool:Card[] = [];
            _this._cardValue = 0;
            return _this;
        }
        Object.defineProperty(Card.prototype, "cardValue", {
            get: function () {
                return this._cardValue;
            },
            set: function (value) {
                if (value) {
                    this.color = value & 0xf;
                    this.key = value >> 4;
                    this.setIcon(this.color, this.key);
                }
                else {
                    this._cardValue = value;
                    this.setBack();
                }
            },
            enumerable: true,
            configurable: true
        });
        Card.prototype.setSelect = function () {
            this.select = !this.select;
            if (this.select) {
                this.y -= 30;
            }
            else {
                this.y += 30;
            }
            this.shader.visible = false;
        };
        Card.prototype.setPokerCard = function (pokerCard, isSmall, isLoanlord) {
            if (isSmall === void 0) { isSmall = false; }
            if (isLoanlord === void 0) { isLoanlord = false; }
            this._cardValue = pokerCard.cardValue;
            this.pCard = pokerCard;
            if (isSmall) {
                this.setSmallIcon(pokerCard.suit, pokerCard.value, isLoanlord);
            }
            else {
                this.setIcon(pokerCard.suit, pokerCard.value, isLoanlord);
            }
        };
        Card.prototype.setIcon = function (color, _key, isLoanlord) {
            if (isLoanlord === void 0) { isLoanlord = false; }
            this.color = color;
            this.key = _key;
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
                    this.icon_color.bottom = 10;
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
            isLoanlord && this.setLandlordIcon(false);
        };
        Card.prototype.removeLandlordIcon = function () {
            if (this._landlordIcon) {
                this.removeChild(this._landlordIcon);
                this._landlordIcon = null;
            }
        };
        Card.prototype.setSmallIcon = function (color, _key, isLoanlord) {
            if (isLoanlord === void 0) { isLoanlord = false; }
            // this._cardValue = cardValue;
            this.color = color;
            this.key = _key;
            var key = MAP_NAMES[this.key];
            // var key: any = MAP_NAMES[this.key];
            // this.bg.source = "big_card_bg_png";
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
            isLoanlord && this.setLandlordIcon(true);
        };
        /**
         * 设置地主牌标志         */
        Card.prototype.setLandlordIcon = function (isSmall) {
            //        this.addChild
            if (this._landlordIcon) {
                return;
            }
            var img = this._landlordIcon = new eui.Image("dizhu_pocker_png");
            if (isSmall) {
                img.right = 0;
                img.scaleX = img.scaleY = 0.6;
            }
            else {
                img.right = 1;
            }
            img.top = 0;
            this.addChild(img);
        };
        /**
         * 将自己从父节点移除,并且放入到缓存池中
         */
        Card.prototype.destroy = function () {
            if (_pool.indexOf(this) === -1) {
                _pool.push(this);
            }
            this.pCard = null;
            this.scaleX = this.scaleY = 1;
            if (this.parent) {
                this.parent.removeChild(this);
            }
            if (this._landlordIcon) {
                this.removeChild(this._landlordIcon);
                this._landlordIcon = null;
            }
            this.reset();
        };
        Card.create = function () {
            if (_pool.length) {
                return _pool.pop();
            }
            else {
                return new Card();
            }
        };
        return Card;
    }(CardBase));
    DDZ.Card = Card;
    __reflect(Card.prototype, "DDZ.Card");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=Card.js.map