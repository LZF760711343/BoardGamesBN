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
    var _pool = [];
    var T_SCALE = 0.6;
    var T_CARD_WIDTH = 54 * T_SCALE;
    var T_CARD_HEIGHT = 83 * T_SCALE;
    var T_DIS_CARD_WIDTH = 37;
    var T_DIS_CARD_HEIGHT = 55;
    // const L_SCALE = 0.6;
    // const L_CARD_WIDTH = 74 * L_SCALE;
    // const L_CARD_HEIGHT = 58 * L_SCALE;
    // const SIZE_MAP = {
    // 	left: [L_CARD_WIDTH, L_CARD_HEIGHT],
    // 	right: [],
    // 	bottom: [54, 87],
    // 	top: [T_CARD_WIDTH, T_CARD_HEIGHT],
    // }
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            var _this = _super.call(this) || this;
            _this.icon = "";
            _this._icon = "";
            _this.direct = majiang.DIRECT.NONE;
            _this.touchChildren = false;
            return _this;
        }
        /**
         * 将自己从父节点移除,并且放入到缓存池中
         */
        Card.prototype.destroy = function () {
            // if (_pool.indexOf(this) === -1) {
            // 	_pool.push(this);
            // }
            // this.x = this.y = 0;
            // // this.pCard = null;
            // this.isMark = null;
            // this.scaleX = this.scaleY = 1;
            if (this.parent) {
                this.parent.removeChild(this);
            }
            // this.reset();
        };
        Card.prototype.setType = function (type) {
            if (this._type !== type) {
                this._type = type;
                switch (type) {
                    case 0 /* HAND */:
                        break;
                    case 2 /* PENG */:
                        break;
                    case 1 /* SHOW */:
                        break;
                }
            }
        };
        Card.prototype.setHandCardIcon = function (direct, value, laziValue) {
            this.width = this.height = NaN;
            if (laziValue) {
                if (laziValue == value) {
                    this._lazi.visible = true;
                }
                else {
                    this._lazi.visible = false;
                }
            }
            switch (direct) {
                case majiang.DIRECT.BOTTOM:
                    this.icon = "mj_bottom" + value + "_png";
                    break;
                case majiang.DIRECT.LEFT:
                    this.icon = "mj_icon" + value + "_png";
                    break;
                case majiang.DIRECT.RIGHT:
                    this.icon = "mj_right" + value + "_png";
                    break;
                case majiang.DIRECT.TOP:
                    this.icon = "mj_top" + value + "_png";
                    if (value === 0 /* NONE */) {
                        break;
                    }
                    this.width = T_CARD_WIDTH;
                    this.height = T_CARD_HEIGHT;
                    break;
            }
        };
        // public setLaziIcon(direct)
        /**
         * 设置碰/杠/吃/勺,牌的图标
         */
        Card.prototype.setPengIcon = function (direct, value) {
            this.width = this.height = NaN;
            switch (direct) {
                case majiang.DIRECT.BOTTOM:
                    if (value) {
                        this.icon = "mj_bottomD" + value + "_png";
                    }
                    else {
                        this.icon = "mj_peng_bottom0_png";
                    }
                    break;
                case majiang.DIRECT.TOP:
                    if (value) {
                        this.icon = "mj_bottomD" + value + "_png";
                    }
                    else {
                        this.icon = "mj_peng_top0_png";
                    }
                    this.width = T_CARD_WIDTH;
                    this.height = T_CARD_HEIGHT;
                    break;
                case majiang.DIRECT.LEFT:
                    if (value) {
                        this.icon = "mj_left" + value + "_png";
                    }
                    else {
                        this.icon = "mj_peng_left0_png";
                    }
                    this.width = 45;
                    this.height = 33;
                    break;
                case majiang.DIRECT.RIGHT:
                    if (value) {
                        this.icon = "mj_right" + value + "_png";
                    }
                    else {
                        this.icon = "mj_peng_right0_png";
                    }
                    this.width = 45;
                    this.height = 33;
                    break;
            }
            // this
        };
        /**
         * 设置打出的牌的图标
         */
        Card.prototype.setDisIcon = function (direct, value) {
            this._lazi.visible = false;
            this.width = this.height = NaN;
            switch (direct) {
                case majiang.DIRECT.BOTTOM:
                case majiang.DIRECT.TOP:
                    this.icon = "mj_bottomD" + value + "_png";
                    this.width = T_DIS_CARD_WIDTH;
                    this.height = T_DIS_CARD_HEIGHT;
                    break;
                case majiang.DIRECT.LEFT:
                    this.icon = "mj_leftD" + value + "_png";
                    this.width = 48;
                    this.height = 41;
                    break;
                case majiang.DIRECT.RIGHT:
                    this.icon = "mj_rightD" + value + "_png";
                    this.width = 48;
                    this.height = 41;
                    break;
            }
            this.cardValue = value;
        };
        Card.prototype.changeSelect = function () {
            this.select = !this.select;
            if (this.select) {
                this.y -= 20;
            }
            else {
                this.y += 20;
            }
        };
        Card.create = function () {
            if (_pool.length) {
                return _pool.pop();
            }
            else {
                var card = new Card();
                card.skinName = majiang.CardSkin;
                return card;
            }
        };
        return Card;
    }(eui.Component));
    majiang.Card = Card;
    __reflect(Card.prototype, "majiang.Card");
})(majiang || (majiang = {}));
//# sourceMappingURL=Card.js.map