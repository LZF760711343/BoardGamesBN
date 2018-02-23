/**
 *
 * @author HE
 *
 */
namespace DDZ {
    const CARD_WIDTH = 120;
    const CARD_HEIGHT = 166;
    export class CardBox extends base.DiscardBoxBase {
        // protected _cards: Card[];
        /**
         * 手指移动到的位置选牌的位置
         */
        protected _moveIndex: number;
        /**
         * 开始选牌的位置
         */
        protected _startIndex: number;
        /**
         * 当前选中的牌
         */
        protected _selectList: any[];
        /**
         * 是否已经初始化过了,用于判断牌是开始发牌还是抢完地主添加三张地主牌
         */
        private _isInit: boolean;
        private _isLandlord: boolean = false;// 是否是地主牌
        private _isMove: boolean;
        /**
         * 牌选择完毕的事件
         */
        public static CARD_SELECT_FINISH = "cardSelectFinish"
        constructor() {
            super();
        }
        protected createChildren(): void {
            super.createChildren();
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchCardsBegin, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchCardsMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCardsEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchCardsEnd, this);
        }

        private onTouchCardsBegin(event: egret.TouchEvent): void {
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchCardsMove, this);
            this._isMove = false;
            var card: Card = <Card>event.target;
            this._selectList = [];
            this._moveIndex = this._startIndex = this.getChildIndex(card);
            card.mark();
        }
        private onTouchCardsMove(event: egret.TouchEvent): void {
            var card: Card = <Card>event.target;
            // if (card.isDisable)
            //     return;
            var index = this.getChildIndex(card);
            if (index > -1) {
                this._isMove = true;
                let length = this.numChildren;//this.cards_datas.length;
                for (let i = 0; i < length; i++) {//重置所有牌
                    (<Card>this.getChildAt(i)).setMark(false);
                }
                var maxCnt = this._startIndex;
                if (index > this._startIndex) {
                    maxCnt = index;
                    index = this._startIndex;
                }
                for (; index <= maxCnt; index++) {
                    var card = <Card>this.getChildAt(index);
                    if (card) {
                        card.setMark(true);
                    }
                }
            }
        }
        private onTouchCardsEnd(event: egret.TouchEvent): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchCardsMove, this);
            this._selectList = [];
            var length = this.numChildren;//

            for (var i = 0; i < length; i++) {
                var card = <Card>this.getChildAt(i);
                if (card.isMark()) {
                    card.setSelect();
                    // this._selectList.push(card.pCard);
                }
            }
            this.dispatchEventWith(CardBox.CARD_SELECT_FINISH, false, this._isMove);
            this._isMove = false;
            // SoundManage.playNormalEffect('card_click');
        }
        /**
         * 取消所有牌的选择
         */
        public unselectAllCards() {
            for (var i = this.numChildren - 1; i >= 0; i--) {
                let card = <Card>this.getChildAt(i);
                if (card.select) {
                    card.setSelect();
                }
            }
        }
        /**
         * 根据传进去的数组,自动选择数组里面的牌,
         * 如果当前有数组之外其他选中的牌,自动取消选中
         */
        public setSelectCards(pCards: PokerCard[]) {
            let index = pCards.length - 1;
            for (var i = this.numChildren - 1; i >= 0; i--) {
                let card = <Card>this.getChildAt(i);
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
                } else {
                    if (card.select) {
                        card.setSelect();
                    }
                }
            }
            //  egret.log("onTips4")
        }
        public getSelectCards() {
            let selectList = [];
            let arrLen = this.numChildren;
            for (let i = 0; i < arrLen; i++) {
                let card = <Card>this.getChildAt(i);
                if (card.select) {
                    selectList.push(card.pCard);
                }
            }
            return selectList;
        }
        public reset(): void {
            super.reset();
            this._isInit = false;
            this._isLandlord = false;
            this.clearCards();
        }
        protected getCard() {
            let card = Card.create();
            card.skinName = niuniu.CardSkin;
            card.setBack();
            card.touchChildren = false;
            return card;
        }
        private updatePosWithAni() {
            var self = this;
            let length = this.numChildren;
            var width = 120;
            let start_x = (self.width - self._cardPaddingX * (length - 1) - CARD_WIDTH) / 2;
            let tween;
            for (let i = 0; i < length; ++i) {
                let cardObj = this.getChildAt(i);
                tween = egret.Tween.get(cardObj).to({ x: start_x }, 50);
                start_x += self._cardPaddingX;
            }
        }
        public updateDisplay(): void {
            var self = this;
            let length = this.numChildren;
            let start_x = (self.width - self._cardPaddingX * (length - 1) - CARD_WIDTH) / 2;
            let tween;
            for (let i = 0; i < length; ++i) {
                let cardObj = this.getChildAt(i);
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

        }
        //设置牌面地主标志
        public setLandlord() {
            this._isLandlord = true;
            this.setLandlordIcon();
        }
        private setLandlordIcon() {
            if (this._isLandlord && this.numChildren) {
                var card = <Card>this.getChildAt(this.numChildren - 1);
                card.setLandlordIcon(false);
            }
        }
        /**
         * 插入一定的牌,并且将牌选择起来,1500毫秒之后在取消选择
         * 用于确定
         */
        public insertAndSelectCards(pokerCards: PokerCard[], allPokerCards: PokerCard[]) {
            egret.log("insertAndSelectCards", pokerCards.toString());
            egret.log(allPokerCards.toString());
            var cards: Card[] = [];
            var length = allPokerCards.length;
            var p_lenght = pokerCards.length;
            (<Card>this.getChildAt(this.numChildren - 1)).removeLandlordIcon();
            for (var i = 0; i < length; ++i) {
                let pokerCard = allPokerCards[i];
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
            egret.setTimeout((e) => {
                this.touchEnabled = true;
                for (var i = cards.length - 1; i > -1; --i) {
                    cards[i].setSelect();
                }
                cards = null;
            }, this, 1500);
            this.updateDisplay();
        }
        /**
       * 派牌
       * @param delay:延迟播放动画的时间
       */
        public dealCards(pokerCards: any[], delay: number = 0, callBack?: Function, target?: Object): void {
            // SoundManage.playEffectBySex("haigen", this.sex);
            if (!this._isInit) {
                egret.log("dealCards", pokerCards.toString());
                this._isInit = true;
                let tween: egret.Tween;
                let self = this;
                let length = pokerCards.length;
                let start_x = (self.width - self._cardPaddingX * (length - 1) - CARD_WIDTH) / 2;
                let pos = egret.Point.create(0, 0);
                for (let i = 0; i < length; ++i) {
                    SoundManage.playEffect("cardSound");
                    let cardObj = this.getCard();
                    cardObj.visible = true;
                    cardObj.setPokerCard(pokerCards[i] as PokerCard);
                    self.addChild(cardObj);
                    self.globalToLocal(Global.sWidth / 2, Global.sHeight / 2, pos);
                    cardObj.x = pos.x - CARD_WIDTH / 2;
                    cardObj.y = pos.y - CARD_HEIGHT / 2;
                    cardObj.scaleX = cardObj.scaleY = 0.4;
                    tween = egret.Tween.get(cardObj).wait(delay).to({ x: start_x, y: this.height - CARD_HEIGHT, scaleX: 1, scaleY: 1 }, 50)
                    start_x += self._cardPaddingX;
                    delay += 40;
                }
                this.setLandlordIcon();
            } else {

            }

        }

        /**
         * 删除传进去的牌
         */
        public delCardsByArray(pokerCards: PokerCard[]) {
            var disCnt = this.numChildren;
            var delCnt = pokerCards.length;
            if (disCnt > 0 && delCnt > 0) {
                var j = disCnt - 1;
                for (var i = 0; i < delCnt; i++) {
                    j = disCnt - 1;
                    while (j >= 0) {
                        var card = <Card>this.getChildAt(j);
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
        }
        public clearCards() {
            for (let i = this.numChildren - 1; i >= 0; i--) {
                let card: Card = <Card>this.getChildAt(i);
                card.destroy();
            }
            this._selectList = [];
        }
        public clearAllAni(): void {
            super.clearAllAni();
        }
        /**
         * 销毁跟回收对象
         */
        public destroy() {
            super.destroy();
        }
    }
}