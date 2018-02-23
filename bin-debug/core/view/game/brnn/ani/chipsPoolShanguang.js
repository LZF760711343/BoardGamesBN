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
        brnn.SCPSStatu = {
            /**
             * 不显示
             */
            NONE: "none",
            /**
             * 胜利
             */
            SHANG: "shang",
        };
        var ChipsPoolShanguang = (function (_super) {
            __extends(ChipsPoolShanguang, _super);
            function ChipsPoolShanguang() {
                var _this = _super.call(this) || this;
                _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onExit, _this);
                return _this;
            }
            ChipsPoolShanguang.prototype.onExit = function () {
                this._play.stop();
            };
            Object.defineProperty(ChipsPoolShanguang.prototype, "curState", {
                // public get curState(): string {
                // 	return this.currentState;
                // }
                set: function (v) {
                    // this.currentState = v;
                    switch (v) {
                        case brnn.SCPSStatu.SHANG:
                            this._play.play(0);
                            break;
                        case brnn.SCPSStatu.NONE:
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
            return ChipsPoolShanguang;
        }(eui.Component));
        brnn.ChipsPoolShanguang = ChipsPoolShanguang;
        __reflect(ChipsPoolShanguang.prototype, "niuniu.brnn.ChipsPoolShanguang");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=chipsPoolShanguang.js.map