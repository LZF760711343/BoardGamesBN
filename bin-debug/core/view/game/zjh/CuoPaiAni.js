var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zjh;
(function (zjh) {
    var wid = 302;
    var hei = 452;
    var CuoPaiAni = (function (_super) {
        __extends(CuoPaiAni, _super);
        function CuoPaiAni() {
            var _this = _super.call(this) || this;
            _this.isTouch = false;
            // this.cardSrcPos = [egret.Point.create(0, 0), egret.Point.create(0, 0), egret.Point.create(0, 0)];
            _this.cardSrcPos = egret.Point.create(0, 0);
            _this.startPoint = egret.Point.create(0, 0);
            _this.hasFinished = false;
            _this.hasDrag = [false, false, false];
            return _this;
        }
        CuoPaiAni.prototype.OnTouchBegin = function (event) {
            if (!this.hasFinished && event.target instanceof niuniu.Card) {
                this.isTouch = true;
                this.curToucher = event.target;
                this.startPoint.x = event.stageX;
                this.startPoint.y = event.stageY;
                this.cardSrcPos.x = this.curToucher.x;
                this.cardSrcPos.y = this.curToucher.y;
            }
        };
        CuoPaiAni.prototype.OnTouchMove = function (event) {
            if (this.isTouch && !this.hasFinished) {
                this.curToucher.x = this.cardSrcPos.x + event.stageX - this.startPoint.x;
                this.curToucher.y = this.cardSrcPos.y + event.stageY - this.startPoint.y;
            }
        };
        CuoPaiAni.prototype.OnTouchEnd = function (event) {
            if (!this.hasFinished && this.isTouch) {
                egret.log("OnTouchEnd");
                this.isTouch = false;
                this.hasDrag[this.curToucher.name] = true;
                if (this.hasDrag[1]) {
                    this.CuoPaiFinished();
                }
                this.curToucher = null;
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
        };
        CuoPaiAni.prototype.destroy = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            if (this.startPoint) {
                egret.Point.release(this.startPoint);
                egret.Point.release(this.cardSrcPos);
                this.cardSrcPos = this.startPoint = null;
            }
            var arrLen = this.card.length;
            for (var i = 0; i < arrLen; i++) {
                this.card[i].rotation = 0;
                this.card[i].anchorOffsetX = this.card[i].anchorOffsetY = 0;
                this.card[i].name = null;
                this.card[i].destroy();
            }
            this.stopTimer();
            this.hasFinished = true;
        };
        CuoPaiAni.prototype.CuoPaiFinished = function () {
            var _this = this;
            var twee;
            this.stopTimer();
            if (!this.hasFinished) {
                this.hasFinished = true;
                for (var i = 0; i < 3; i++) {
                    var tw = egret.Tween.get(this.card[i]).to({ x: Global.sWidth / 2, y: Global.sHeight / 2 + this.card[i].height / 2 }, 200);
                    if (i == 0) {
                        twee = tw.to({ rotation: -20 }, 200);
                    }
                    if (i == 2) {
                        twee = tw.to({ rotation: 20 }, 200).wait(800);
                    }
                    if (i == 1) {
                        twee = tw.wait(100);
                    }
                }
                twee.call(function () {
                    _this.destroy();
                    if (_this.callBack) {
                        _this.callBack.call(_this.tar, _this.arg);
                    }
                }, this);
            }
        };
        CuoPaiAni.prototype.PlayCuoPai = function (value, call, target, params) {
            this.callBack = call;
            this.tar = target;
            this.arg = params;
            this.card = [];
            var mask = new eui.Rect();
            mask.width = Global.sWidth;
            mask.height = Global.sHeight;
            mask.alpha = 0.75;
            this.addChild(mask);
            for (var i = 0; i < value.length; i++) {
                this.card.push(niuniu.Card.create());
                this.card[i].currentState = "back";
                this.addChild(this.card[i]);
                this.card[i].setIcon2(value[i]);
                this.card[i].rotation = i;
                this.card[i].width = wid;
                this.card[i].height = hei;
                this.card[i].anchorOffsetX = this.card[i].width / 2;
                this.card[i].anchorOffsetY = this.card[i].height;
                this.card[i].name = i + "";
                this.card[i].x = Global.sWidth / 2;
                this.card[i].y = Global.sHeight / 2 + this.card[i].height / 2;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
            this.timer = egret.setTimeout(this.CuoPaiFinished, this, 10000);
        };
        return CuoPaiAni;
    }(eui.Component));
    zjh.CuoPaiAni = CuoPaiAni;
    __reflect(CuoPaiAni.prototype, "zjh.CuoPaiAni");
})(zjh || (zjh = {}));
//# sourceMappingURL=CuoPaiAni.js.map