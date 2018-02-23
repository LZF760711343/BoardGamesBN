var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI;
(function (UI) {
    var Zoom = (function (_super) {
        __extends(Zoom, _super);
        function Zoom() {
            var _this = _super.call(this) || this;
            _this.isShow = false;
            return _this;
            // this.skinName = ZoomSkin;
        }
        Zoom.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            this._shirckGroup.once(egret.Event.RENDER, function () {
                var func = function (index) {
                    if (index < 0) {
                        return;
                    }
                    var item = _this._shirckGroup.getChildAt(index);
                    egret.Tween.get(item).to({ y: item.y - item.height, alpha: 0 }, 1).call(function () {
                        func(--index);
                    });
                };
                func(_this._shirckGroup.numChildren - 1);
            }, this);
            this._contractionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonChange, this);
        };
        Zoom.prototype.buttonChange = function () {
            var _this = this;
            if (this.isShow) {
                this._contractionBtn.touchEnabled = false;
                egret.Tween.get(this._contractionBtn).to({ rotation: 0 }, 200);
                egret.Tween.get(this._bgImg).to({ alpha: 0, visible: false }, 400);
                this._shirckGroup.once(egret.Event.RENDER, function () {
                    var func = function (index) {
                        if (index < 0) {
                            _this._contractionBtn.touchEnabled = true;
                            return;
                        }
                        var item = _this._shirckGroup.getChildAt(index);
                        egret.Tween.get(item).to({ y: item.y - item.height, alpha: 0.5, visible: false }, 90, egret.Ease.sineOut).call(function () {
                            func(--index);
                        });
                    };
                    func(_this._shirckGroup.numChildren - 1);
                }, this);
                this.isShow = false;
            }
            else {
                this._contractionBtn.touchEnabled = false;
                egret.Tween.get(this._contractionBtn).to({ rotation: -180 }, 200);
                this._bgImg.visible = true;
                egret.Tween.get(this._bgImg).to({ alpha: 1 }, 400);
                this._shirckGroup.once(egret.Event.RENDER, function () {
                    var func = function (index) {
                        if (index > _this._shirckGroup.numChildren - 1) {
                            _this._contractionBtn.touchEnabled = true;
                            return;
                        }
                        var item = _this._shirckGroup.getChildAt(index);
                        item.visible = true;
                        egret.Tween.get(item).to({ y: item.y + item.height, alpha: 1 }, 90, egret.Ease.sineOut).call(function () {
                            func(++index);
                        });
                    };
                    func(0);
                }, this);
                this.isShow = true;
            }
        };
        return Zoom;
    }(eui.Component));
    UI.Zoom = Zoom;
    __reflect(Zoom.prototype, "UI.Zoom");
})(UI || (UI = {}));
//# sourceMappingURL=Zoom.js.map