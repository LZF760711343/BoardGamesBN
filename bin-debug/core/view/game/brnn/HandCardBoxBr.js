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
    var brnn;
    (function (brnn) {
        var CARD_W = 120;
        var CARD_H = 166;
        var CARD_SCALE = 1.1;
        var PADING_X = (CARD_W - 30) * CARD_SCALE + CARD_W / 3;
        var HandCardBox = (function (_super) {
            __extends(HandCardBox, _super);
            // private _drawCardAni: DrawCardAni;
            function HandCardBox() {
                return _super.call(this) || this;
            }
            HandCardBox.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                // this._pos = MuUtil.getPos(this);
            };
            HandCardBox.prototype.ShowLastCard = function (arg) {
                egret.Tween.get(arg[0]).to({ scaleX: 0, x: arg[2] + arg[0].width / 2 * CARD_SCALE }, 150)
                    .call(arg[0].setIconByBrnn, arg[0], [arg[1]])
                    .to({ x: arg[2], scaleX: CARD_SCALE }, 150);
            };
            HandCardBox.prototype.showCards = function (cards, count) {
                var length = this._cardCnt = cards.length;
                for (var i = 0; i < count; i++) {
                    if (cards[i]) {
                        this._cards[i].setIconByBrnn(cards[i]);
                    }
                    else {
                        this._cards[i].setBack();
                    }
                    this._cards[i].visible = true;
                }
                this.updatePos();
            };
            HandCardBox.prototype.showCardAni = function (cards, startCount, handvalue, callBack, target) {
                if (startCount === void 0) { startCount = 0; }
                var delay = 0;
                var length = cards.length;
                var tween;
                for (var i = 0; i < length; i++) {
                    if (cards[i]) {
                        var card = this._cards[i];
                        if (card.currentState.indexOf("back") >= 0) {
                            tween = egret.Tween.get(card).wait(delay)
                                .to({ scaleX: 0, x: card.x + (card.width * card.scaleX) / 2 }, 150)
                                .call(card.setIconByBrnn, card, [cards[i]])
                                .to({ x: card.x, scaleX: CARD_SCALE }, 150);
                            delay += 70;
                        }
                    }
                }
                if (handvalue) {
                    tween = tween.wait(40).call(this.showCardType, this, [handvalue]);
                }
                if (callBack) {
                    tween.call(callBack, target);
                }
            };
            HandCardBox.prototype.updateCards = function (cards) {
                var length = cards.length;
                for (var i = 0; i < length; i++) {
                    this._cards[i].setIconByBrnn(cards[i]);
                }
            };
            return HandCardBox;
        }(niuniu.HandCardBox));
        brnn.HandCardBox = HandCardBox;
        __reflect(HandCardBox.prototype, "niuniu.brnn.HandCardBox");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=HandCardBoxBr.js.map