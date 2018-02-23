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
        var WinLose = (function (_super) {
            __extends(WinLose, _super);
            function WinLose() {
                return _super.call(this) || this;
            }
            WinLose.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
            };
            /**
             * 结算金币动画
             */
            WinLose.prototype.animation = function (count) {
                var _this = this;
                if (count >= 0) {
                    count = "+" + count;
                }
                else {
                    count = count + "";
                }
                var items = [];
                for (var i = 1; i < count.length; i++) {
                    if (count[0] == "-") {
                        this._add.visible = false;
                        this._fail.visible = true;
                        items.push({ Str: "fail_" + count[i] + "_png" });
                    }
                    else {
                        this._fail.visible = false;
                        this._add.visible = true;
                        items.push({ Str: "add_" + count[i] + "_png" });
                    }
                }
                this._moneyList.dataProvider = new eui.ArrayCollection(items);
                this._moneyList.once(egret.Event.RENDER, function () {
                    _this.width = _this._moneyList.width;
                    for (var i_1 = _this._moneyList.numChildren - 1; i_1 > -1; i_1--) {
                        var item = _this._moneyList.getChildAt(i_1);
                        if (i_1 == _this._moneyList.numChildren - 1) {
                            _this._add.x = item.x - item.width / 2;
                            _this._fail.x = item.x - item.width / 2;
                        }
                        else {
                            item.visible = false;
                        }
                    }
                    var func = function (index) {
                        if (index < 0) {
                            return;
                        }
                        var item = _this._moneyList.getChildAt(index);
                        if (_this._add.visible) {
                            egret.Tween.get(_this._add).to({ x: _this._add.x - item.width }, 190);
                        }
                        else {
                            egret.Tween.get(_this._fail).to({ x: _this._fail.x - item.width }, 190);
                        }
                        item.visible = true;
                        item["Dong"].play(0);
                        item["Dong"].addEventListener('complete', function () {
                            func(--index);
                        }, _this);
                    };
                    func(_this._moneyList.numChildren - 1);
                }, this);
            };
            return WinLose;
        }(eui.Component));
        brnn.WinLose = WinLose;
        __reflect(WinLose.prototype, "niuniu.brnn.WinLose");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=WinLose.js.map