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
        brnn.CuoPaiStatu = {
            /**
             * 不显示
             */
            NONE: "none",
            /**
             * 搓牌
             */
            WAIT: "cuopai",
        };
        var ZhuanJiaCuoPai = (function (_super) {
            __extends(ZhuanJiaCuoPai, _super);
            function ZhuanJiaCuoPai() {
                return _super.call(this) || this;
            }
            Object.defineProperty(ZhuanJiaCuoPai.prototype, "curState", {
                get: function () {
                    return this.currentState;
                },
                set: function (v) {
                    this.currentState = v;
                    switch (v) {
                        case brnn.CuoPaiStatu.WAIT:
                            this._play.play(0);
                            break;
                        case brnn.CuoPaiStatu.NONE:
                            this._play.pause();
                            break;
                        default:
                            this._play.pause();
                            break;
                    }
                },
                enumerable: true,
                configurable: true
            });
            return ZhuanJiaCuoPai;
        }(eui.Component));
        brnn.ZhuanJiaCuoPai = ZhuanJiaCuoPai;
        __reflect(ZhuanJiaCuoPai.prototype, "niuniu.brnn.ZhuanJiaCuoPai");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=ZhuanJiaCuoPai.js.map