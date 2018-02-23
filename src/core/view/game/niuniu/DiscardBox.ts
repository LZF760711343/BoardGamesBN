namespace niuniu {
    const CARD_W = 74;
    const CARD_H = 98;
    const PADING_X = 30;

    // const enum ADD_CARD_ANI_TYPE{
    //     NONE,
    //     FROM_CENTER,

    // }
    export class DiscardBox extends eui.Component {
        private _cards: Card[];
        // private _pos:egret.Point;
        private _centerPos: egret.Point;
        /**
         * 完成算牛的标识
         */
        private _cIcon: eui.Image;
        private _typeIcon: eui.Component;
        private _cardCnt: number;
        // private _aniNode: Effect.DBNode;
        constructor() {
            super();
        }
        protected createChildren(): void {
            super.createChildren();
            this._centerPos = egret.Point.create(0, 0);
            this._cards = [
                // new Card(),new Card(),new Card(),new Card(),new Card(),
                Card.create(), Card.create(), Card.create(), Card.create(), Card.create()
            ];
            for (let i = 0; i < 5; i++) {
                this.addChild(this._cards[i]);
                this._cards[i].setSmallBack();
                this._cards[i].visible = false;
            }
        }
        public getCardCnt() {
            return this._cardCnt;
        }
        public showCards(cards: number[], count: number): void {
            var length = this._cardCnt = count;
            for (let i = 0; i < count; i++) {
                if (cards[i]) {
                    this._cards[i].setSmallIcon(cards[i]);
                } else {
                    this._cards[i].setSmallBack();
                }
                this._cards[i].visible = true;
            }
            this.updatePos();
        }
        public updatePos(): void {
            var start_x = (this.width - PADING_X * (this._cardCnt - 1) - CARD_W) / 2;
            for (var i = 0; i < this._cardCnt; ++i) {
                var card = this._cards[i];
                card.x = start_x;
                start_x += PADING_X;
            }
        }
        /**
         * 播放发牌动画
         */
        public dealAni(_delay: number, cards?: number[], handvalue?: number, callBack?: Function, target?: Object): void {
            let delay = _delay;
            let tween: egret.Tween;
            let self = this;
            let length = self._cardCnt = cards.length;
            let start_x = (self.width - PADING_X * (length - 1) - CARD_W) / 2;
            for (let i = 0; i < length; ++i) {
                // SoundManage.playEffect("cardSound");
                let card = self._cards[i];
                card.visible = true;
                card.setSmallBack();
                // self.addChild(card);
                let pos = self.globalToLocal(Global.sWidth / 2, Global.sHeight / 2, self._centerPos);
                card.x = pos.x - CARD_W / 2;
                card.y = pos.y - CARD_H / 2;
                tween = egret.Tween.get(card).wait(delay).to({ x: start_x, y: 0 }, 200)
                delay += 60;
            }
            SoundManage.playEffect("cardSound");
            tween.call((e) => {
                for (let i = 0; i < length; ++i) {
                    let card = self._cards[i];
                    tween = egret.Tween.get(card).to({ x: start_x }, 250);
                    start_x += PADING_X;
                }
                if (cards && cards[0]) {
                    tween.wait(40).call(self.showCardAni, self, [cards, 0, handvalue]);
                }
            });
        }
        /**
         * 显示完成标志
         */
        public showComeIcon(): void {
            let icon = this._cIcon;
            if (!icon) {
                // egret.log(RES.getRes("label_g_complete_png"))
                icon = this._cIcon = new eui.Image("label_g_complete_png");
                this.addChild(icon);
                icon.x = (this.width - icon.width) / 2;
                icon.y = this.height - icon.height;
            } else {
                this.addChild(icon);
            }
        }
        /**
         * 隐藏完成标志
         */
        public hideCompleteIcon(): void {
            if (this._cIcon && this._cIcon.parent) {
                this.removeChild(this._cIcon);
            }
        }
        public addCards(cards: number[], aniType: number, callBack?: Function, thisObject?: Object) {
            switch (aniType) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
            }
        }

        //添加一张牌的动画
        public addCardAni(cardValue: number, callBack?: Function, target?: Object) {
            // egret.log("我日");
            var card = this._cards[this._cardCnt++];
            if (card) {
                card.visible = true;
                card.setSmallBack();
                this.setChildIndex(card, this._cardCnt + 1);
                this.globalToLocal(Global.sWidth / 2, Global.sHeight / 2, this._centerPos);
                card.x = this._centerPos.x - CARD_W / 2;
                card.y = this._centerPos.y - CARD_H / 2;
                card.scaleX = card.scaleY = 0.5;
                var tween: egret.Tween;
                var length = this._cardCnt;
                var start_x = (this.width - PADING_X * (length - 1) - CARD_W) / 2;
                var card_x = start_x + PADING_X * (length - 1);
                tween = egret.Tween.get(card).to({ x: card_x, y: 0, scaleX: 1, scaleY: 1 }, 200);
                tween.call((e) => {
                    for (var i = 0; i < length - 1; ++i) {
                        var _card = this._cards[i];
                        tween = egret.Tween.get(_card).to({ x: start_x }, 250);
                        start_x += PADING_X;
                    }
                    // tween.call(this.showCompleteIcon, this)
                    if (callBack) {
                        tween.call(callBack, target);
                    }
                });
            }
            // egret.log("我a  a ");
        }
        /**
         * 播放翻牌动画
         */
        public showCardAni(cards: number[], startCount: number = 0, handvalue?: number, isMs?: boolean, sex?: number) {
            // egret.log("没错是我干的");
            let delay = 0;
            let length = this._cardCnt = cards.length;
            let tween: egret.Tween;
            if (isMs) {
                this.updatePos();
            }
            for (let i = 0; i < length; i++) {
                if (cards[i]) {
                    let card = this._cards[i];
                    card.visible = true;
                    tween = egret.Tween.get(card)
                        .wait(delay)
                        .to({ scaleX: 0, x: card.x + CARD_W / 2 }, 150)
                        .call(card.setSmallIcon, card, [cards[i]])
                        .to({ x: card.x * 1.2, scaleX: 1 }, 150);
                    delay += 70;
                }
            }
            if (handvalue) {
                tween = tween.wait(40).call(this.showCardType, this, [handvalue, isMs, sex]);
            }
            return new Promise((resolve: Function, reject: Function) => {
                tween.wait(200).call(resolve);
            })
            // return tween;
        }
        //-- 计算牌形
        public calHandValue(handvalue: number) {
            var handType: any = (handvalue >> 12) & 0xf;
            if (handType == HANDVALUE.NIUX) {
                var value = (handvalue >> 8) & 0xf;
                handType = handType + "" + value;
            }
            return handType;
        }
        public showCardType(handvalue: number, isMs?: boolean, sex?: number): void {
            let self = this;
            let typeIcon = self._typeIcon;
            if (!typeIcon) {
                typeIcon = self._typeIcon = new eui.Component();
                typeIcon.skinName = CardTypeAni;
            }
            let handType = self.calHandValue(handvalue);
            typeIcon.name = `label_n_type${handType}_png`;
            SoundManage.playEffectBySex(SoundManage.keyMap["n_" + handType], sex);
            (<egret.tween.TweenGroup>typeIcon["ani"]).play(0);
            self.addChild(typeIcon);
            typeIcon.x = (self.width - typeIcon.width) / 2;
            typeIcon.y = self.height - typeIcon.height + 20;
        }
        public updateCards(cards: number[]) {
            let length = cards.length;
            for (let i = 0; i < length; i++) {
                this._cards[i].setSmallIcon(cards[i]);
            }
        }
        public reset(): void {
            for (let i = 0; i < 5; ++i) {
                var card = this._cards[i];
                card.visible = false;
                card.setSmallBack();
            }
            if (this._typeIcon && this._typeIcon.parent) {
                this.removeChild(this._typeIcon);
            }
            if (this._cIcon && this._cIcon.parent) {
                this.removeChild(this._cIcon);
            }
        }
        /**
         * 销毁跟回收对象
         */
        public destroy() {
            let arrLen = this._cards.length;
            for (let i = 0; i < arrLen; i++) {
                this._cards[i].visible = true;
                this._cards[i].destroy();
            }
            this._cards = null;
        }
        /**
         * 清理所有的动画
         */
        public clearAllAni(): void {
            for (let i = this._cards.length - 1; i > -1; --i) {
                egret.Tween.removeTweens(this._cards[i]);
            }
            // if (this._aniNode) {
            //     this._aniNode.destroy();
            //     this._aniNode = null;
            // }
        }
    }
}