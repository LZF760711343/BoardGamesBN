var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 *
 * @author HE
 *
 */
var niuniu;
(function (niuniu) {
    var CARD_W = 120;
    var CARD_H = 166;
    // const CARD_SCALE = 0.6;
    // const PADING_X = (CARD_W - 20) * CARD_SCALE;
    var CARD_SCALE = 1.1;
    var PADING_X = (CARD_W - 30) * CARD_SCALE + CARD_W / 3;
    var HandCardBox = (function (_super) {
        __extends(HandCardBox, _super);
        function HandCardBox() {
            return _super.call(this) || this;
        }
        HandCardBox.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this._pos = MuUtil.getPos(this);
            this._selectList = [];
            this.paddingX = 0;
            this._centerPos = egret.Point.create(0, 0);
            this._cards = [niuniu.Card.create(), niuniu.Card.create(), niuniu.Card.create(), niuniu.Card.create(), niuniu.Card.create()];
            for (var i = 0; i < 5; i++) {
                this._cards[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardSound, this);
                this._cards[i].setBack();
                this._cards[i].scaleX = this._cards[i].scaleY = CARD_SCALE;
                this.addChild(this._cards[i]);
                this._cards[i].visible = false;
            }
            this.touchChildren = this.touchEnabled = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTounhTap, this);
        };
        HandCardBox.prototype.cardSound = function () {
            SoundManage.playEffect("card_Click");
        };
        HandCardBox.prototype.getCardCnt = function () {
            return this._cardCnt;
        };
        HandCardBox.prototype.showCardType = function (handvalue, isMs) {
            var typeCom = this.typeCom;
            if (!typeCom) {
                typeCom = this.typeCom = new eui.Component();
                var img_1 = new eui.Image("img_ms_card_type_bg_png");
                typeCom.addChild(img_1);
                img_1.scale9Grid = new egret.Rectangle(14, 15, 90, 15);
                typeCom.y = this.height - 43;
                var lab_1 = new eui.Label();
                typeCom.addChild(lab_1);
                lab_1.textColor = 0xedf56b;
                lab_1.verticalCenter = lab_1.horizontalCenter = 0;
            }
            this.addChild(typeCom);
            var card = this._cards[this._cardCnt - 1];
            typeCom.x = (this.width + PADING_X * (this._cardCnt - 1) - CARD_W) / 2 + card.width * card.scaleX + 10 + this.paddingX;
            var img = typeCom.getChildAt(0);
            var lab = typeCom.getChildAt(1);
            lab.text = this.calHandValue(handvalue, true);
            img.width = lab.width + 30;
        };
        HandCardBox.prototype.onTounhTap = function (event) {
            if (event.target instanceof niuniu.Card) {
                var card = event.target;
                if (!card.select && this._selectList.length >= 3) {
                    Toast.launch(GameLangs.card_select_error_tip);
                    return;
                }
                card.setSelect();
                if (card.select) {
                    this._selectList.push(card);
                }
                else {
                    Utils.removeItemByValue(this._selectList, card);
                }
                this.calBox.setDatas(this._selectList);
            }
        };
        /**
         *添加一张牌的动画
         *@param cardValue:牌的牌值
         *@param callBack:回调函数
         *@param tagget:回调函数绑定的this对象
         *@param aniType:动画类型 1：直接从屏幕中心飞到过去； 2、加上搓牌动画
         */
        //
        HandCardBox.prototype.addCardAni = function (cardValue, callBack, target, aniType) {
            var _this = this;
            if (aniType === void 0) { aniType = 1; }
            SoundManage.playEffect("cardSound");
            egret.log(TAG, "addCardAni");
            var card = this._cards[this._cardCnt++];
            if (card) {
                if (this.typeCom && this.typeCom.parent) {
                    this.removeChild(this.typeCom);
                }
                card.visible = true;
                var tween;
                var length = this._cardCnt;
                var start_x = (this.width - PADING_X * (length - 1) - CARD_W) / 2 + this.paddingX;
                var card_x = start_x + PADING_X * (length - 1);
                if (aniType == 1) {
                    card.setBack();
                    var pos = this.globalToLocal(Global.sWidth / 2, Global.sHeight / 2, this._centerPos);
                    card.x = pos.x - CARD_W / 2;
                    card.y = pos.y - CARD_H / 2;
                    card.scaleX = card.scaleY = CARD_SCALE / 2;
                    //牌移动到目标位置
                    tween = egret.Tween.get(card).to({ x: card_x, y: -60, scaleX: CARD_SCALE, scaleY: CARD_SCALE }, 200)
                        .call(function (e) {
                        //移动调整其它牌的位置
                        for (var i = 0; i < length - 1; ++i) {
                            var _card = _this._cards[i];
                            tween = egret.Tween.get(_card).to({ x: start_x }, 250);
                            start_x += PADING_X;
                        }
                        //位置移动完毕后的回调,开始加的那张牌的翻牌动画
                        tween = tween.call(function () {
                            var cuopai = new niuniu.CuoPaiAni();
                            cuopai.name = "sprite1";
                            _this.parent.addChild(cuopai);
                            cuopai.PlayCuoPai(cardValue, _this.ShowLastCard, _this, [card, cardValue, card_x]);
                            // egret.Tween.get(card).to({ scaleX: 0, x: card_x + card.width / 2 * CARD_SCALE }, 150)
                            //     .call(card.setIcon, card, [cardValue])
                            //     .to({ x: card_x, scaleX: CARD_SCALE }, 150);
                        });
                        if (callBack) {
                            egret.log("aaaaaaaaaaaaaafdsfsadfa");
                            tween.call(callBack, target);
                        }
                    });
                }
            }
        };
        HandCardBox.prototype.ShowLastCard = function (arg) {
            egret.Tween.get(arg[0]).to({ scaleX: 0, x: arg[2] + arg[0].width / 2 * CARD_SCALE }, 150)
                .call(arg[0].setIcon, arg[0], [arg[1]])
                .to({ x: arg[2], scaleX: CARD_SCALE }, 150);
            //<Card>arg[0].setIcon(arg[1]);
        };
        HandCardBox.prototype.showCards = function (cards, count) {
            var length = this._cardCnt = cards.length;
            for (var i = 0; i < count; i++) {
                if (cards[i]) {
                    this._cards[i].setIcon(cards[i]);
                }
                else {
                    this._cards[i].setBack();
                }
                this._cards[i].visible = true;
            }
            this.updatePos();
        };
        HandCardBox.prototype.updatePos = function () {
            var start_x = (this.width - PADING_X * (this._cardCnt - 1) - CARD_W) / 2 + this.paddingX;
            for (var i = 0; i < this._cardCnt; ++i) {
                var card = this._cards[i];
                card.x = start_x;
                start_x += PADING_X;
                card.y = -60;
            }
        };
        HandCardBox.prototype.dealAni = function (_delay, cards, handvalue, callBack, target) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var delay, tween, length, start_x, pos, list, i, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            delay = _delay;
                            length = this._cardCnt = cards.length;
                            start_x = (this.width - PADING_X * (length - 1) - CARD_W) / 2 + this.paddingX;
                            pos = this.globalToLocal(Global.sWidth / 2 - CARD_W / 2, Global.sHeight / 2 - CARD_H / 2, this._centerPos);
                            list = [];
                            for (i = 0; i < length; ++i) {
                                list.push(new Promise(function (finish) {
                                    SoundManage.playEffect("nn_fapai");
                                    var card = _this._cards[i];
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
                            return [4 /*yield*/, Promise.all(list)];
                        case 1:
                            _a.sent();
                            list = [];
                            for (i = 0; i < length; ++i) {
                                list.push(new Promise(function (finish) {
                                    var card = _this._cards[i];
                                    tween = egret.Tween.get(card).to({ x: start_x }, 250).call(finish);
                                    start_x += PADING_X;
                                }));
                            }
                            return [4 /*yield*/, Promise.all(list)];
                        case 2:
                            _a.sent();
                            if (cards && cards[0]) {
                                this.showCardAni(cards, 0, handvalue, callBack, target);
                            }
                            else if (callBack) {
                                callBack.call(target);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        HandCardBox.prototype.reset = function () {
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
        };
        //-- 计算牌形
        HandCardBox.prototype.calHandValue = function (handvalue, isMs) {
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
                var handType = (handvalue >> 12) & 0xf;
                if (handType == 2 /* NIUX */) {
                    var value = (handvalue >> 8) & 0xf;
                    return GameLangs.cardTypes[handType] + "" + value;
                }
                else {
                    return GameLangs.cardTypes[handType];
                }
            }
        };
        HandCardBox.prototype.clearAllAni = function () {
            for (var i = this._cards.length - 1; i > -1; --i) {
                egret.Tween.removeTweens(this._cards[i]);
            }
            this.disBox.clearAllAni();
        };
        /**
         * 销毁跟回收对象
         */
        HandCardBox.prototype.destroy = function () {
            if (this._centerPos) {
                egret.Point.release(this._centerPos);
                this._centerPos = null;
            }
            var arrLen = this._cards.length;
            for (var i = 0; i < arrLen; i++) {
                this._cards[i].destroy();
            }
            this.disBox.destroy();
            this._cards = null;
        };
        HandCardBox.prototype.updateCards = function (cards) {
            var length = cards.length;
            for (var i = 0; i < length; i++) {
                this._cards[i].setIcon(cards[i]);
            }
        };
        return HandCardBox;
    }(eui.Component));
    niuniu.HandCardBox = HandCardBox;
    __reflect(HandCardBox.prototype, "niuniu.HandCardBox");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=HandCardBox.js.map