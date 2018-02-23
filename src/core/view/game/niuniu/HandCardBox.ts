/**
 *
 * @author HE
 *
 */
namespace niuniu {
    const CARD_W = 120;
    const CARD_H = 166;
    // const CARD_SCALE = 0.6;
    // const PADING_X = (CARD_W - 20) * CARD_SCALE;
    const CARD_SCALE = 1.1;
    const PADING_X = (CARD_W - 30) * CARD_SCALE + CARD_W / 3;
    export class HandCardBox extends eui.Component {
        protected _cards: Card[];
        // private _pos: egret.Point;
        protected _centerPos: egret.Point;
        public calBox: CalBox;
        public disBox: any;
        protected typeCom: eui.Component;
        protected _cardCnt: number;
        public _selectList: Card[];
        // private _drawCardAni: DrawCardAni;
        public paddingX: number;
        constructor() {
            super();
        }
        protected createChildren(): void {
            super.createChildren();
            // this._pos = MuUtil.getPos(this);
            this._selectList = [];
            this.paddingX = 0;
            this._centerPos = egret.Point.create(0, 0);
            this._cards = [Card.create(), Card.create(), Card.create(), Card.create(), Card.create()];
            for (var i = 0; i < 5; i++) {
                this._cards[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardSound, this);
                this._cards[i].setBack();
                this._cards[i].scaleX = this._cards[i].scaleY = CARD_SCALE;
                this.addChild(this._cards[i]);
                this._cards[i].visible = false;

            }
            this.touchChildren = this.touchEnabled = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTounhTap, this);
        }
        public cardSound() {
            SoundManage.playEffect("card_Click");
        }
        public getCardCnt() {
            return this._cardCnt;
        }
        public showCardType(handvalue: number, isMs?: boolean): void {
            var typeCom = this.typeCom;
            if (!typeCom) {
                typeCom = this.typeCom = new eui.Component();
                let img = new eui.Image("img_ms_card_type_bg_png");
                typeCom.addChild(img);
                img.scale9Grid = new egret.Rectangle(14, 15, 90, 15);
                typeCom.y = this.height - 43;
                let lab = new eui.Label();
                typeCom.addChild(lab);
                lab.textColor = 0xedf56b;
                lab.verticalCenter = lab.horizontalCenter = 0;
            }
            this.addChild(typeCom);
            let card = this._cards[this._cardCnt - 1];
            typeCom.x = (this.width + PADING_X * (this._cardCnt - 1) - CARD_W) / 2 + card.width * card.scaleX + 10 + this.paddingX;
            var img = <eui.Image>typeCom.getChildAt(0);
            let lab = <eui.Label>typeCom.getChildAt(1);
            lab.text = this.calHandValue(handvalue, true);
            img.width = lab.width + 30;
        }

        public onTounhTap(event: egret.TouchEvent): void {
            if (event.target instanceof Card) {
                var card = <Card>event.target;
                if (!card.select && this._selectList.length >= 3) {
                    Toast.launch(GameLangs.card_select_error_tip);
                    return;
                }
                card.setSelect()
                if (card.select) {
                    this._selectList.push(card)
                } else {
                    Utils.removeItemByValue(this._selectList, card);
                }
                this.calBox.setDatas(this._selectList);
            }
        }
        /**
         *添加一张牌的动画
         *@param cardValue:牌的牌值
         *@param callBack:回调函数
         *@param tagget:回调函数绑定的this对象
         *@param aniType:动画类型 1：直接从屏幕中心飞到过去； 2、加上搓牌动画 
         */
        //
        public addCardAni(cardValue: number, callBack: Function, target: Object, aniType: number = 1) {
            SoundManage.playEffect("cardSound");
            egret.log(TAG, "addCardAni")
            var card = this._cards[this._cardCnt++];
            if (card) {
                if (this.typeCom && this.typeCom.parent) {
                    this.removeChild(this.typeCom);
                }
                card.visible = true;
                var tween: egret.Tween;
                var length = this._cardCnt;
                var start_x = (this.width - PADING_X * (length - 1) - CARD_W) / 2 + this.paddingX;
                var card_x = start_x + PADING_X * (length - 1);
                if (aniType == 1) {
                    card.setBack();
                    let pos = this.globalToLocal(Global.sWidth / 2, Global.sHeight / 2, this._centerPos);
                    card.x = pos.x - CARD_W / 2;
                    card.y = pos.y - CARD_H / 2;
                    card.scaleX = card.scaleY = CARD_SCALE / 2;
                    //牌移动到目标位置
                    tween = egret.Tween.get(card).to({ x: card_x, y: -60, scaleX: CARD_SCALE, scaleY: CARD_SCALE }, 200)
                        //移动到目标位置后的回调
                        .call((e) => {
                            //移动调整其它牌的位置
                            for (var i = 0; i < length - 1; ++i) {
                                var _card = this._cards[i];
                                tween = egret.Tween.get(_card).to({ x: start_x }, 250);
                                start_x += PADING_X;
                            }
                            //位置移动完毕后的回调,开始加的那张牌的翻牌动画
                            tween = tween.call(() => {
                                var cuopai = new niuniu.CuoPaiAni();
                                cuopai.name = "sprite1";
                                this.parent.addChild(cuopai);
                                cuopai.PlayCuoPai(cardValue, this.ShowLastCard, this, [card, cardValue, card_x]);
                                // egret.Tween.get(card).to({ scaleX: 0, x: card_x + card.width / 2 * CARD_SCALE }, 150)
                                //     .call(card.setIcon, card, [cardValue])
                                //     .to({ x: card_x, scaleX: CARD_SCALE }, 150);
                            })
                            if (callBack) {
                                egret.log("aaaaaaaaaaaaaafdsfsadfa");
                                tween.call(callBack, target);
                                // return callBack;

                            }
                        });
                }
            }
        }

        public ShowLastCard(arg?: any[]) {
            egret.Tween.get(<Card>arg[0]).to({ scaleX: 0, x: arg[2] + (<Card>arg[0]).width / 2 * CARD_SCALE }, 150)
                .call((<Card>arg[0]).setIcon, <Card>arg[0], [arg[1]])
                .to({ x: arg[2], scaleX: CARD_SCALE }, 150);
            //<Card>arg[0].setIcon(arg[1]);
        }

        public showCards(cards: number[], count: number): void {
            var length = this._cardCnt = cards.length;
            for (var i = 0; i < count; i++) {
                if (cards[i]) {
                    this._cards[i].setIcon(cards[i]);
                } else {
                    this._cards[i].setBack();
                }
                this._cards[i].visible = true;
            }
            this.updatePos();
        }
        public updatePos(): void {
            var start_x = (this.width - PADING_X * (this._cardCnt - 1) - CARD_W) / 2 + this.paddingX;
            for (var i = 0; i < this._cardCnt; ++i) {
                var card = this._cards[i];
                card.x = start_x;
                start_x += PADING_X;
                card.y = -60;
            }
        }
        public async dealAni(_delay: number, cards?: number[], handvalue?: number, callBack?: Function, target?: Object) {
            var delay = _delay;
            var tween: egret.Tween;
            var length = this._cardCnt = cards.length;
            var start_x = (this.width - PADING_X * (length - 1) - CARD_W) / 2 + this.paddingX;
            let pos = this.globalToLocal(Global.sWidth / 2 - CARD_W / 2, Global.sHeight / 2 - CARD_H / 2, this._centerPos);
            let list = [];
            for (var i = 0; i < length; ++i) {
                list.push(new Promise((finish: Function) => {
                    SoundManage.playEffect("nn_fapai");
                    var card = this._cards[i];
                    card.visible = true;
                    card.scaleX = card.scaleY = CARD_SCALE / 2;
                    card.x = pos.x;
                    card.y = pos.y;
                    tween = egret.Tween.get(card)
                        .call(card.setBack, card).wait(delay)
                        .to({ x: start_x, y: -60, scaleX: CARD_SCALE, scaleY: CARD_SCALE }, 200).call(finish);
                    ;
                    delay += 60;
                }));
            }
            await Promise.all(list);
            list = [];
            for (var i = 0; i < length; ++i) {
                list.push(new Promise(
                    (finish: Function) => {
                        var card = this._cards[i];
                        tween = egret.Tween.get(card).to({ x: start_x }, 250).call(finish);
                        start_x += PADING_X;
                    }
                ));
            }
            await Promise.all(list);
            if (cards && cards[0]) {
                this.showCardAni(cards, 0, handvalue, callBack, target);
            } else if (callBack) {
                callBack.call(target);
            }
        }
        public reset(): void {
            for (var i = 0; i < 5; ++i) {
                var card = this._cards[i];
                card.visible = false;
                card.setBack();
                if (card.getSelect()) {
                    card.setSelect();
                }
            }
            this.touchChildren = this.touchEnabled = false;
            this._selectList.length = 0;
            this.disBox.reset();
            if (this.typeCom && this.typeCom.parent) {
                this.removeChild(this.typeCom);
            }
        }
        public showCardAni(cards: number[], startCount: number = 0, handvalue?: number, callBack?: Function, target?: Object): void {
            var delay = 0;
            var length = cards.length;
            var tween: egret.Tween;
            for (var i = 0; i < length; i++) {
                if (cards[i]) {
                    var card = this._cards[i];
                    if (card.currentState.indexOf("back") >= 0) {
                        tween = egret.Tween.get(card).wait(delay)
                            .to({ scaleX: 0, x: card.x + (card.width * card.scaleX) / 2 }, 150)
                            .call(card.setIcon, card, [cards[i]])
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
        }
        //-- 计算牌形
        public calHandValue(handvalue: number, isMs: boolean) {
            if (handvalue) {
                // if (isMs) {
                //     let handType: any = (handvalue >> 8 & 0xF);
                //     var value = (handvalue >> 12 & 0xF);
                //     if (handType < MS_HANDVALUE.SZ || handType == MS_HANDVALUE.STG || handType == MS_HANDVALUE.TG) {
                //         if (value) {
                //             return GameLangs.msCardTypes[handType] + value + GameLangs.dian;
                //         } else {
                //             return GameLangs.msCardTypes[handType] + GameLangs.mushi_str;
                //         }
                //     } else {
                //         return GameLangs.msCardTypes[handType];
                //     }
                // }
                let handType = (handvalue >> 12) & 0xf;
                if (handType == HANDVALUE.NIUX) {
                    var value = (handvalue >> 8) & 0xf;
                    return GameLangs.cardTypes[handType] + "" + value;
                } else {
                    return GameLangs.cardTypes[handType];
                }
            }
        }
        public clearAllAni(): void {
            for (var i = this._cards.length - 1; i > -1; --i) {
                egret.Tween.removeTweens(this._cards[i]);
            }
            this.disBox.clearAllAni();
        }
        /**
         * 销毁跟回收对象
         */
        public destroy() {
            if (this._centerPos) {
                egret.Point.release(this._centerPos);
                this._centerPos = null;
            }
            let arrLen = this._cards.length;
            for (let i = 0; i < arrLen; i++) {
                this._cards[i].destroy();
            }
            this.disBox.destroy();
            this._cards = null;
        }
        public updateCards(cards: number[]) {
            var length = cards.length;
            for (var i = 0; i < length; i++) {
                this._cards[i].setIcon(cards[i]);
            }
        }
    }
}