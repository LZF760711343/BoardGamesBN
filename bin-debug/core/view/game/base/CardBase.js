var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CardBase = (function (_super) {
    __extends(CardBase, _super);
    //    private _flushIcon:eui.Image;
    function CardBase() {
        var _this = _super.call(this) || this;
        _this.select = false;
        return _this;
        // this.skinName = CardSkin;
        //        this.cardData = null;
    }
    CardBase.prototype.setGray = function () {
        this.currentState = "bigGray";
        this.bg.source = "card_bg_gray_png";
    };
    CardBase.prototype.setSmallBack = function () {
        this.currentState = "back";
        this.bg.source = "card_bg_png";
    };
    CardBase.prototype.setBack = function () {
        this.currentState = "big_back";
        this.bg.source = "card_bg_png";
    };
    //    publish 
    CardBase.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.touchChildren = false;
    };
    // -- 根据类型返回牌数和花色
    CardBase.prototype.getNumSuit = function (cardValue) {
        this.color = (cardValue >> 4) & 0x7;
        this.key = cardValue & 0xF;
    };
    CardBase.prototype.setSmallUnviSign = function () {
        var icon = new eui.Image(RES.getRes('univ_sign_png'));
        icon.scaleX = 0.8;
        icon.scaleY = 0.8;
        icon.left = 1;
        icon.bottom = 5;
        this.addChild(icon);
    };
    CardBase.prototype.setSmallMainSign = function () {
        var icon = new eui.Image(RES.getRes('main_sign_png'));
        icon.left = 5;
        icon.bottom = 10;
        this.addChild(icon);
    };
    CardBase.prototype.changeIntoGold = function () {
        if (this.bg.source != "big_bg_vip_png")
            this.bg.source = "big_bg_vip_png";
    };
    Object.defineProperty(CardBase.prototype, "cardIcon", {
        get: function () {
            return this.cardValue;
        },
        set: function (cardValue) {
            this.setSmallIcon(cardValue);
        },
        enumerable: true,
        configurable: true
    });
    CardBase.prototype.mark = function () {
        this.shader.visible = !this.shader.visible;
    };
    CardBase.prototype.setMark = function (value) {
        this.shader.visible = value;
    };
    CardBase.prototype.reset = function () {
        this.scaleX = this.scaleY = 1;
        this.width = this.height = NaN;
        if (this.shader.visible) {
            this.shader.visible = false;
        }
        if (this.select) {
            this.select = false;
        }
        this.x = this.y = 0;
    };
    CardBase.prototype.isMark = function () {
        return this.shader.visible;
    };
    CardBase.prototype.resetMark = function () {
        this.shader.visible = false;
    };
    CardBase.prototype.setSelect = function () {
        this.select = !this.select;
        if (this.select) {
            this.y -= 30;
        }
        else {
            this.y += 30;
        }
    };
    CardBase.prototype.getSelect = function () {
        return this.select;
    };
    CardBase.prototype.destroy = function () {
    };
    return CardBase;
}(eui.Component));
__reflect(CardBase.prototype, "CardBase");
//# sourceMappingURL=CardBase.js.map