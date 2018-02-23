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
    var CuoPaiAni = (function (_super) {
        __extends(CuoPaiAni, _super);
        function CuoPaiAni() {
            var _this = _super.call(this) || this;
            _this.isTouch = false;
            _this.hasFinished = false;
            _this.cardBgSrcPos = egret.Point.create(0, 0);
            _this.startPoint = egret.Point.create(0, 0);
            return _this;
        }
        CuoPaiAni.prototype.OnTouchBegin = function (event) {
            if (!this.hasFinished) {
                this.isTouch = true;
                this.startPoint.x = event.stageX;
                this.startPoint.y = event.stageY;
            }
        };
        CuoPaiAni.prototype.OnTouchEnd = function (event) {
            if (!this.hasFinished) {
                this.isTouch = false;
                if (this.CheckHasSaw(80)) {
                    this.CuoPaiFinished();
                }
                else {
                    this.cardBg.x = this.cardBgSrcPos.x;
                    this.cardBg.y = this.cardBgSrcPos.y;
                }
            }
        };
        CuoPaiAni.prototype.stopTimer = function () {
            if (this.timer) {
                egret.clearTimeout(this.timer);
                this.timer = null;
            }
        };
        //检测是否超过所能看到牌的区域占整张牌的百分比
        CuoPaiAni.prototype.CheckHasSaw = function (percentArea) {
            var sHorizontial = Math.abs(this.cardBg.x - this.cardBgSrcPos.x);
            var sVeritical = Math.abs(this.cardBg.y - this.cardBgSrcPos.y);
            if (sHorizontial >= this.cardBg.height || sVeritical >= this.cardBg.width) {
                return true;
            }
            else {
                var areaWidth = this.cardBg.height - sHorizontial;
                var areaHeight = this.cardBg.width - sVeritical;
                var area = areaHeight * areaWidth;
                var cardArea = this.cardBg.width * this.cardBg.height;
                egret.log("面积占比：", (1 - area / cardArea));
                if ((1 - area / cardArea) >= percentArea / 100) {
                    return true;
                }
            }
            return false;
        };
        CuoPaiAni.prototype.CuoPaiFinished = function () {
            var _this = this;
            if (!this.hasFinished) {
                this.hasFinished = true;
                this.rect1.visible = this.rect2.visible = false;
                egret.Tween.get(this.cardBg).to({ alpha: 0 }, 300).call(function () {
                    egret.Tween.get(_this).wait(300).call(function () {
                        _this.stopTimer();
                        _this.parent.removeChild(_this);
                        if (_this.callBack)
                            _this.callBack.call(_this.tar, _this.arg);
                        // net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_NN_SHOW).send();
                    }, _this);
                }, this);
            }
            if (this.cardBgSrcPos) {
                egret.Point.release(this.cardBgSrcPos);
                egret.Point.release(this.startPoint);
                this.startPoint = this.cardBgSrcPos = null;
            }
        };
        CuoPaiAni.prototype.OnTouchMove = function (event) {
            if (this.isTouch && !this.hasFinished) {
                // var offset = new egret.Point(event.stageX - this.startPoint.x, event.stageY - this.startPoint.y);
                this.cardBg.x = this.cardBgSrcPos.x + event.stageX - this.startPoint.x;
                this.cardBg.y = this.cardBgSrcPos.y + event.stageY - this.startPoint.y;
            }
        };
        CuoPaiAni.prototype.PlayCuoPai = function (value, call, target, params) {
            var mask = new eui.Rect();
            mask.width = Global.sWidth;
            mask.height = Global.sHeight;
            mask.alpha = 0.75;
            this.addChild(mask);
            this.callBack = call;
            this.tar = target;
            this.arg = params;
            this.cardBg = new eui.Image("pocker_cpbei1_png");
            this.card = niuniu.Card.create();
            this.rect1 = new eui.Image("cardMask_png");
            this.rect2 = new eui.Image("cardMask_png");
            this.addChild(this.card);
            this.addChild(this.rect1);
            this.addChild(this.rect2);
            this.addChild(this.cardBg);
            this.card.currentState = "back";
            this.card.setIcon2(value);
            this.card.width = this.cardBg.width;
            this.card.height = this.cardBg.height;
            this.card.anchorOffsetX = this.card.width / 2;
            this.card.anchorOffsetY = this.card.height / 2;
            this.cardBg.anchorOffsetX = this.cardBg.width / 2;
            this.cardBg.anchorOffsetY = this.cardBg.height / 2;
            this.cardBgSrcPos.x = this.card.x = this.cardBg.x = (Global.sWidth) / 2;
            this.cardBgSrcPos.y = this.card.y = this.cardBg.y = (Global.sHeight) / 2.3;
            this.card.rotation = this.cardBg.rotation = 90;
            this.rect1.x = this.card.x - 217;
            this.rect1.y = this.card.y - (-114);
            this.rect2.x = this.card.x + (217) - 149;
            this.rect2.y = this.card.y - (144);
            this.stopTimer();
            this.timer = egret.setTimeout(this.CuoPaiFinished, this, 8000);
            this.cardBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
            this.cardBg.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
        };
        return CuoPaiAni;
    }(eui.Component));
    niuniu.CuoPaiAni = CuoPaiAni;
    __reflect(CuoPaiAni.prototype, "niuniu.CuoPaiAni");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=CuoPaiAni.js.map