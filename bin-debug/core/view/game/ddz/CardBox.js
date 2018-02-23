var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author HE
 *
 */
var DDZ;
(function (DDZ) {
    var CARD_WIDTH = 120;
    var CARD_HEIGHT = 166;
    var CardBox = (function (_super) {
        __extends(CardBox, _super);
        function CardBox() {
            var _this = _super.call(this) || this;
            _this._isLandlord = false; // 是否是地主牌
            return _this;
        }
        CardBox.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchCardsBegin, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchCardsMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCardsEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchCardsEnd, this);
        };
        CardBox.prototype.onTouchCardsBegin = function (event) {
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchCardsMove, this);
            this._isMove = false;
            var card = event.target;
            this._selectList = [];
            this._moveIndex = this._startIndex = this.getChildIndex(card);
            card.mark();
        };
        CardBox.prototype.onTouchCardsMove = function (event) {
            var card = event.target;
            // if (card.isDisable)
            //     return;
            var index = this.getChildIndex(card);
            if (index > -1) {
                this._isMove = true;
                var length_1 = this.numChildren; //this.cards_datas.length;
                for (var i = 0; i < length_1; i++) {
                    this.getChildAt(i).setMark(false);
                }
                var maxCnt = this._startIndex;
                if (index > this._startIndex) {
                    maxCnt = index;
                    index = this._startIndex;
                }
                for (; index <= maxCnt; index++) {
                    var card = this.getChildAt(index);
                    if (card) {
                        card.setMark(true);
                    }
                }
            }
        };
        CardBox.prototype.onTouchCardsEnd = function (event) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchCardsMove, this);
            this._selectList = [];
            var length = this.numChildren; //
            for (var i = 0; i < length; i++) {
                var card = this.getChildAt(i);
                if (card.isMark()) {
                    card.setSelect();
                }
            }
            this.dispatchEventWith(CardBox.CARD_SELECT_FINISH, false, this._isMove);
            this._isMove = false;
            // SoundManage.playNormalEffect('card_click');
        };
        /**
         * 取消所有牌的选择
         */
        CardBox.prototype.unselectAllCards = function () {
            for (var i = this.numChildren - 1; i >= 0; i--) {
                var card = this.getChildAt(i);
                if (card.select) {
                    card.setSelect();
                }
            }
        };
        /**
         * 根据传进去的数组,自动选择数组里面的牌,
         * 如果当前有数组之外其他选中的牌,自动取消选中
         */
        CardBox.prototype.setSelectCards = function (pCards) {
            var index = pCards.length - 1;
            for (var i = this.numChildren - 1; i >= 0; i--) {
                var card = this.getChildAt(i);
                if (index < 0) {
                    if (card.select) {
                        card.setSelect();
                    }
                    continue;
                }
                if (card.cardValue === pCards[index].cardValue) {
                    if (!card.select) {
                        card.setSelect();
                    }
                    index--;
                }
                else {
                    if (card.select) {
                        card.setSelect();
                    }
                }
            }
            //  egret.log("onTips4")
        };
        CardBox.prototype.getSelectCards = function () {
            var selectList = [];
            var arrLen = this.numChildren;
            for (var i = 0; i < arrLen; i++) {
                var card = this.getChildAt(i);
                if (card.select) {
                    selectList.push(card.pCard);
                }
            }
            return selectList;
        };
        CardBox.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._isInit = false;
            this._isLandlord = false;
            this.clearCards();
        };
        CardBox.prototype.getCard = function () {
            var card = DDZ.Card.create();
            card.skinName = niuniu.CardSkin;
            card.setBack();
            card.touchChildren = false;
            return card;
        };
        CardBox.prototype.updatePosWithAni = function () {
            var self = this;
            var length = this.numChildren;
            var width = 120;
            var start_x = (self.width - self._cardPaddingX * (length - 1) - CARD_WIDTH) / 2;
            var tween;
            for (var i = 0; i < length; ++i) {
                var cardObj = this.getChildAt(i);
                tween = egret.Tween.get(cardObj).to({ x: start_x }, 50);
                start_x += self._cardPaddingX;
            }
        };
        CardBox.prototype.updateDisplay = function () {
            var self = this;
            var length = this.numChildren;
            var start_x = (self.width - self._cardPaddingX * (length - 1) - CARD_WIDTH) / 2;
            var tween;
            for (var i = 0; i < length; ++i) {
                var cardObj = this.getChildAt(i);
                cardObj.x = start_x;
                tween = egret.Tween.get(cardObj).to({ x: start_x }, 50);
                start_x += self._cardPaddingX;
            }
            // if (numElements < 10) {
            //     self.width = 90 * numElements;
            // } else {
            //     self.width = 900;
            // }
            // var gap = (target.width - width) / (numElements - 1);
            // for (var i: number = 0; i < numElements; i++) {
            //     var layoutElement: eui.UIComponent = <eui.UIComponent>(target.getVirtualElementAt(i));
            //     layoutElement.x = start_x;
            //     start_x += gap;
            // }
            // this.is_update_ui = false;
            //        }
        };
        //设置牌面地主标志
        CardBox.prototype.setLandlord = function () {
            this._isLandlord = true;
            this.setLandlordIcon();
        };
        CardBox.prototype.setLandlordIcon = function () {
            if (this._isLandlord && this.numChildren) {
                var card = this.getChildAt(this.numChildren - 1);
                card.setLandlordIcon(false);
            }
        };
        /**
         * 插入一定的牌,并且将牌选择起来,1500毫秒之后在取消选择
         * 用于确定
         */
        CardBox.prototype.insertAndSelectCards = function (pokerCards, allPokerCards) {
            var _this = this;
            egret.log("insertAndSelectCards", pokerCards.toString());
            egret.log(allPokerCards.toString());
            var cards = [];
            var length = allPokerCards.length;
            var p_lenght = pokerCards.length;
            this.getChildAt(this.numChildren - 1).removeLandlordIcon();
            for (var i = 0; i < length; ++i) {
                var pokerCard = allPokerCards[i];
                for (var j = 0; j < p_lenght; j++) {
                    if (pokerCard.cardValue === pokerCards[j].cardValue) {
                        var card = this.getCard();
                        card.y = this.height - CARD_HEIGHT;
                        pokerCards.splice(j, 1);
                        p_lenght--;
                        card.setPokerCard(pokerCard, false, false);
                        this.addChildAt(card, i);
                        card.setSelect();
                        // if(pokerCard.spec == SPEC_Y) {
                        //     card.setUnviSign();
                        // }
                        cards.push(card);
                        break;
                    }
                }
            }
            this.touchEnabled = false;
            // this.set();
            this.setLandlordIcon();
            egret.setTimeout(function (e) {
                _this.touchEnabled = true;
                for (var i = cards.length - 1; i > -1; --i) {
                    cards[i].setSelect();
                }
                cards = null;
            }, this, 1500);
            this.updateDisplay();
        };
        /**
       * 派牌
       * @param delay:延迟播放动画的时间
       */
        CardBox.prototype.dealCards = function (pokerCards, delay, callBack, target) {
            if (delay === void 0) { delay = 0; }
            // SoundManage.playEffectBySex("haigen", this.sex);
            if (!this._isInit) {
                egret.log("dealCards", pokerCards.toString());
                this._isInit = true;
                var tween = void 0;
                var self_1 = this;
                var length_2 = pokerCards.length;
                var start_x = (self_1.width - self_1._cardPaddingX * (length_2 - 1) - CARD_WIDTH) / 2;
                var pos = egret.Point.create(0, 0);
                for (var i = 0; i < length_2; ++i) {
                    SoundManage.playEffect("cardSound");
                    var cardObj = this.getCard();
                    cardObj.visible = true;
                    cardObj.setPokerCard(pokerCards[i]);
                    self_1.addChild(cardObj);
                    self_1.globalToLocal(Global.sWidth / 2, Global.sHeight / 2, pos);
                    cardObj.x = pos.x - CARD_WIDTH / 2;
                    cardObj.y = pos.y - CARD_HEIGHT / 2;
                    cardObj.scaleX = cardObj.scaleY = 0.4;
                    tween = egret.Tween.get(cardObj).wait(delay).to({ x: start_x, y: this.height - CARD_HEIGHT, scaleX: 1, scaleY: 1 }, 50);
                    start_x += self_1._cardPaddingX;
                    delay += 40;
                }
                this.setLandlordIcon();
            }
            else {
            }
        };
        /**
         * 删除传进去的牌
         */
        CardBox.prototype.delCardsByArray = function (pokerCards) {
            var disCnt = this.numChildren;
            var delCnt = pokerCards.length;
            if (disCnt > 0 && delCnt > 0) {
                var j = disCnt - 1;
                for (var i = 0; i < delCnt; i++) {
                    j = disCnt - 1;
                    while (j >= 0) {
                        var card = this.getChildAt(j);
                        if (card.pCard.cardValue == pokerCards[i].cardValue) {
                            this.removeChildAt(j);
                            disCnt -= 1;
                            break;
                        }
                        j--;
                    }
                }
                this.setLandlordIcon();
                this.updateDisplay();
            }
        };
        CardBox.prototype.clearCards = function () {
            for (var i = this.numChildren - 1; i >= 0; i--) {
                var card = this.getChildAt(i);
                card.destroy();
            }
            this._selectList = [];
        };
        CardBox.prototype.clearAllAni = function () {
            _super.prototype.clearAllAni.call(this);
        };
        /**
         * 销毁跟回收对象
         */
        CardBox.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return CardBox;
    }(base.DiscardBoxBase));
    /**
     * 牌选择完毕的事件
     */
    CardBox.CARD_SELECT_FINISH = "cardSelectFinish";
    DDZ.CardBox = CardBox;
    __reflect(CardBox.prototype, "DDZ.CardBox");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=CardBox.js.map