/**
 *
 * @author HE
 *
 */
namespace majiang {
    var cardMarkList: eui.Rect[] = [];
    var index = 0;
    export function getMark() {
        var shader = cardMarkList[index++];
        if (!shader) {
            shader = new eui.Rect();
            shader.verticalCenter = -2;
            shader.horizontalCenter = 0;
            shader.alpha = 0.3;
            shader.fillColor = 0x529ec1;
            shader.percentWidth = shader.percentHeight = 100;
            cardMarkList.push(shader);
        }
        return shader;
    }
    export function clearMark() {
        for (var i = cardMarkList.length - 1; i > -1; --i) {
            if (cardMarkList[i].parent) {
                cardMarkList[i].parent.removeChild(cardMarkList[i]);
            }
        }
        index = 0;
    }
    export class CardBox extends eui.Group {
        /**
         * 当前选中的牌
         */
        public selectList: CARD_VALUE[];
        protected _cardsValues: CARD_VALUE[];
        /**
         * 出牌事件
         */
        public static PLAY_CARD = "playcCard";
        /**
         * 拖动的牌
         */
        private moveCard: Card;
        /**
         * 拖动选中的那张牌
         */
        private _moveSelectCard: Card;
        private isMove: boolean;
        /**
         * 单击的时候选中的牌(触摸的时候没有移动)
         */
        private _selectCard: Card;//当前选中的牌
        public isCanPlayCard: boolean;
        protected point: egret.Point;
        protected start_pos: number;
        public isInit: boolean;
        protected _direct: string;
        /**
         * 碰/杠/勺/吃列表
         */
        protected _destList: MJActionItem[];
        /**
         * 给选中牌加入标志
         */
        public static ADD_CARD_MARK = "addCardMark";
        /**
         * 是否在选择摊牌中
         */
        private isTan: Boolean;
        constructor() {
            super();
            this._direct = DIRECT.BOTTOM;
        }
        protected createChildren(): void {
            super.createChildren();
            // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchCardsBegin, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCardsEnd, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchCardsEnd, this);
        }
        public init() {

            let card = this.moveCard = Card.create();
            this.start_pos = 0;
            this.point = egret.Point.create(0, 0);
            this.isCanPlayCard = true;
            this.addPlayCardTouchEvent();
        }
        /**
         * 进入选择摊牌状态
         */
        public addTanTouchEvent(cardValues: CARD_VALUE[]) {
            if (!this.isTan) {
                //先移除打牌的事件
                this.removePlayCardTouchEvent();
                clearMark();
                this.setSelectCards(cardValues);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTan, this);
                this.isTan = true;
            }

        }
        /**
         * 退出摊牌阶段
         */
        public quitTan() {
            if (this.isTan) {
                this.isTan = this.selectList = null;
                clearMark();
                this.addPlayCardTouchEvent();
                let arrLen = this.numChildren;
                for (let i = this._destList.length; i < arrLen; i++) {
                    let card = <Card>this.getChildAt(i);
                    if (card.select) {
                        card.changeSelect();
                    }
                }
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTan, this);
            }

        }
        private onTouchTan(event: egret.TouchEvent) {
            var card = <Card>event.target;
            if (card instanceof Card && !card.isMark) {
                if (card.select) {
                    Utils.removeItemByValue(this.selectList, card.cardValue);
                } else {
                    this.selectList.push(card.cardValue);
                }
                card.changeSelect();
            }
        }
        public setSelectCards(cardValues: CARD_VALUE[]) {
            let arrLen = this.numChildren;
            this.selectList = [];
            for (let i = this._destList.length; i < arrLen; i++) {
                let card = <Card>this.getChildAt(i);
                if (cardValues.indexOf(card.cardValue) > -1) {
                    if (!card.select) {
                        card.changeSelect();
                    }
                    this.selectList.push(card.cardValue);
                } else {
                    card.addChild(getMark());
                    card.isMark = true;
                }
            }
        }
        /**
         * 移除打牌的触摸事件
         */
        public removePlayCardTouchEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }
        /**
         * 添加打牌的触摸事件
         */
        public addPlayCardTouchEvent() {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }
        private onTouchBegin(event: egret.TouchEvent) {
            /**
             * 如果拖动牌的时候,手指或者鼠标移出屏幕外,那么就有可能接收不到TOUCH_END和TOUCH_RELEASE_OUTSIDE事件,
             * 从而this._moveSelectCard没有被设置为null,这里得检测一下,如果还存在做相应的处理
             */
            if (this._moveSelectCard) {
                this.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this._moveSelectCard = null;
                if (this.moveCard.parent) {
                    this.parent.removeChild(this.moveCard);
                }
            }
            this.isMove = null;
            var card = <Card>event.target;
            if (this.isCanPlayCard && this.getIsCanPlayCard() && card instanceof Card) {
                this._moveSelectCard = card;
                this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            }
        }
        public getIsCanPlayCard() {
            // return this._cardsValues.length % 3 == 2;
            return true;
        }
        private onTouchMove(event: egret.TouchEvent) {
            this.globalToLocal(event.stageX, event.stageY, this.point);
            if (this._selectCard) {
                this._selectCard.changeSelect();
                this._selectCard = null;
            }
            if (this.point.y < 30) {
                if (this.moveCard.parent) {
                    this.moveCard.y = event.stageY - this.moveCard.height / 2;
                    this.moveCard.x = event.stageX - this.moveCard.width / 2;
                } else {
                    if (this._moveSelectCard) {
                        this.parent.addChild(this.moveCard);
                        this.moveCard.icon = this._moveSelectCard.icon;
                        this.moveCard.y = event.stageY - this.moveCard.height / 2;
                        this.moveCard.x = event.stageX - this.moveCard.width / 2;
                    }
                }
            }
            this.isMove = true;
        }
        private playCard(card: Card): void {
            // this.isCanPlayCard = false;
            // var index = this.removeCard(card);
            // if (index != this._cards.length) {//不是刚刚摸到的牌,所以把摸到的牌排序
            //     this.sortLastCard();
            // }
            // var pos = this.localToGlobal(card.x, card.y, this.point);
            // card.x = pos.x;
            // card.y = pos.y;
            // this._chuCb.call(this._chuTarget, card);;
            this._selectCard = null;
            this.dispatchEventWith(CardBox.PLAY_CARD, false, card);
        }
        private onTouchEnd(event: egret.TouchEvent) {
            egret.log("onTouchEnd")
            this.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            if (this.isMove) {
                if (this.moveCard.parent) {
                    this.parent.removeChild(this.moveCard);
                    this.globalToLocal(event.stageX, event.stageY, this.point);
                    if (this.isCanPlayCard && this.getIsCanPlayCard() && this.point.y < -10) {
                        this.playCard(this._moveSelectCard);
                        // egret.Event.dispatchEvent(this, EVENT_DEFINE.CLEAR_TG_COUNT);
                    }
                    this._moveSelectCard = null;
                }
            } else {
                this._moveSelectCard = null;
                var card = <Card>event.target;
                if (card instanceof Card) {
                    clearMark();
                    if (card == this._selectCard) {//如果牌已经是选中状态
                        card.changeSelect();
                        if (this.isCanPlayCard && this.getIsCanPlayCard()) {
                            this.playCard(card);
                            // egret.Event.dispatchEvent(this, EVENT_DEFINE.CLEAR_TG_COUNT);
                        }
                        else {
                            this._selectCard = null;
                        }
                    } else {
                        // this.sendAddCardEvent(card.cardValue);
                        this.dispatchEventWith(CardBox.ADD_CARD_MARK, false, card.cardValue);
                        card.changeSelect();
                        if (this._selectCard)
                            this._selectCard.changeSelect();
                        this._selectCard = card;
                    }
                }
            }
        }
        public deleteCard(value: number) {
            let len = this._destList.length - 1;
            for (var i = this.numChildren - 1; i > len; --i) {
                let card = <Card>this.getChildAt(i);
                if (!card.cardValue || card.cardValue === value) {
                    this._cardsValues.splice(i - this._destList.length, 1);
                    this.removeChild(card);
                    var pos = this.localToGlobal(card.x, card.y, this.point);
                    card.x = pos.x;
                    card.y = pos.y;
                    return card;
                }
            }
        }
        public deleteCards(cardValues: CARD_VALUE[]) {
            let arrLen = cardValues.length;
            for (let i = 0; i < arrLen; i++) {
                this.deleteCard(cardValues[i]);
            }
        }
        /**
        * 增加一个碰/杠/胡/吃/勺牌型对象到手牌里面
        */
        public addCardTypeObj(item: MJActionItem) {
            let obj = this.getCardTypeObj(item);
            this.addChildAt(obj, this._destList.length);
            this._destList.push(item);
            if (item.delCards && item.delCards.length) {
                this.deleteCards(item.delCards);
            }
        }

        public updateCardType(item: MJActionItem) {
            let arrLen = this._destList.length;
            for (let i = 0; i < arrLen; i++) {
                let cardType = <CardType>this.getChildAt(i);
                egret.log("updateCardType:", cardType.dest.activeType, cardType.dest.cardValue, "item.cardValue:", item.cardValue)
                if (cardType.dest.cardValue == item.cardValue) {
                    egret.log("updateCardType_success")
                    cardType.setCards(item, this._direct);
                    break;
                }
            }
            egret.log("item:", item)
            if (item.delCards && item.delCards.length) {
                this.deleteCards(item.delCards);
            }
        }
        protected updateCardView() {

        }
        public sortLastCard() {
            if (this._cardsValues.length > 1) {
                Majiang.sort(this._cardsValues, this._LziCard);
                let arrLen = this.numChildren;
                let lastCard = <Card>this.getChildAt(arrLen - 1);
                for (let i = this._destList.length; i < arrLen - 1; i++) {
                    let card = <Card>this.getChildAt(i);
                    if (this._LziCard == lastCard.cardValue) {
                        this.addChildAt(lastCard, this._destList.length);
                    } else {
                        if (this._LziCard != card.cardValue) {
                            if (card.cardValue >= lastCard.cardValue) {
                                this.addChildAt(lastCard, i);
                                break;
                            }
                        }
                    }
                }

            }
        }
        // protected getCard() {
        //     let card = Card.create();
        //     return card;
        // }
        protected getCard(cardValue: CARD_VALUE) {
            let card = Card.create();
            // card.cardValue = cardValue;
            egret.log("cardValue111", cardValue);
            // this.addChild(card);
            card.cardValue = cardValue;
            card.setHandCardIcon(this._direct, cardValue, this._LziCard);
            // card.icon = `mj_bottom${cardValue}_png`;
            return card;
        }

        protected getCardTypeObj(dest: MJActionItem) {
            let cardType = CardType.create();
            cardType.setCards(dest, this._direct);
            return cardType;
        }

        /**
         * 增加一张牌,用于补牌的时候用的
         */
        public addCard(cardValue: CARD_VALUE) {
            egret.log("cardValue222", cardValue);
            this._cardsValues.push(cardValue);
            this.addChild(this.getCard(cardValue));
        }
        /**
         * 增加若干张牌
         */
        public addCards(cardValues: CARD_VALUE[]) {
            let arrLen = cardValues.length;
            for (let i = 0; i < arrLen; i++) {
                this.addCard(cardValues[i]);
                this.sortLastCard();
            }
        }
        private _LziCard;


        public initCards(LaziCardVal: number, handcards: CARD_VALUE[], destList: MJActionItem[], sortType: boolean = true) {
            if (this.isInit) {
                return;
            }
            this._LziCard = LaziCardVal;

            if (sortType) {
                Majiang.sort(handcards, this._LziCard);
            }
            // }else{
            //     Majiang.sortLazi(handcards, this._LziCard);
            // }
            this._destList = destList;
            this._cardsValues = handcards;
            this.clearCards();
            let arrLen = this._destList.length;
            for (let i = 0; i < arrLen; i++) {
                let cardType = this.getCardTypeObj(this._destList[i]);
                // if (this._direct == DIRECT.RIGHT) {
                //     // egret.log("this._direct",this._direct);
                //     this.addChildAt(cardType, 0);
                // } else {
                this.addChild(cardType);
                // }
            }
            arrLen = this._cardsValues.length;
            for (let i = 0; i < arrLen; i++) {
                let card = this.getCard(this._cardsValues[i]);
                this.addChild(card);
            }

            this.isInit = true;
        }

        /**
         * 碰/杠/吃等牌型之间的间隙
         */
        protected _deskPadding: number = -3;
        public get deskPadding(): number {
            return this._deskPadding;
        }
        public set deskPadding(v: number) {
            this._deskPadding = v;
            this.updateDisplayList(0, 0);
        }
        /**
         * 牌与牌之间的间隙
         */
        protected _cardPadding: number = 0;
        public get cardPadding(): number {
            return this._cardPadding;
        }
        public set cardPadding(v: number) {
            this._cardPadding = v;
            this.updateDisplayList(0, 0);
        }
        public reset() {
            this.clearCards();
            this._destList =
                // this.moveCard =
                this._moveSelectCard =
                this._selectCard =
                this._cardsValues =
                null;
            this.isInit = false;
        }
        public destroy() {
            if (this.point) {
                egret.Point.release(this.point);
                this.point = null;
            }
        }
        protected measure() {
            super.measure();
            egret.log("CardBox:measure");
        }
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number) {
            if (!this.isInit) {
                return;
            }
            let arrLen = this.numChildren;
            let x = 0;
            let deskLen = this._destList.length;
            for (let i = 0; i < deskLen; i++) {
                let cardType = <CardType>this.getChildAt(i);
                cardType.y = 10;
                cardType.x = x;
                x += cardType.width + this._deskPadding;
            }
            x += 10;
            let card: Card;
            let cardlen = this._cardsValues.length;
            for (let i = deskLen; i < arrLen; i++) {
                card = <Card>this.getChildAt(i);
                card.x = x;
                x += card.width + this._cardPadding;
            }
            if (cardlen % 3 == 2) {
                card.x += 10;
            }
        }
        public clearCards() {
            this.removeChildren();
            // let arrLen = Array.length;
            // for(let i = 0; i < arrLen; i++){

            // }
        }
    }
}