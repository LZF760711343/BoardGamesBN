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
        brnn.SGStatu = {
            /**
             * 不显示
             */
            NONE: "none",
            /**
             * 胜利
             */
            WIN: "win",
        };
        var ZhuanJiaShanguang = (function (_super) {
            __extends(ZhuanJiaShanguang, _super);
            function ZhuanJiaShanguang() {
                var _this = _super.call(this) || this;
                _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onExit, _this);
                return _this;
            }
            ZhuanJiaShanguang.prototype.onExit = function () {
                this._play.stop();
            };
            Object.defineProperty(ZhuanJiaShanguang.prototype, "curState", {
                // public get curState(): string {
                // 	return this.currentState;
                // }
                set: function (v) {
                    // this.currentState = v;
                    switch (v) {
                        case brnn.SGStatu.WIN:
                            this._play.play(0);
                            break;
                        case brnn.SGStatu.NONE:
                            this._play.stop();
                            break;
                        default:
                            this._play.pause();
                            break;
                    }
                },
                enumerable: true,
                configurable: true
            });
            return ZhuanJiaShanguang;
        }(eui.Component));
        brnn.ZhuanJiaShanguang = ZhuanJiaShanguang;
        __reflect(ZhuanJiaShanguang.prototype, "niuniu.brnn.ZhuanJiaShanguang");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=ZhuanJiaShanguang.js.map