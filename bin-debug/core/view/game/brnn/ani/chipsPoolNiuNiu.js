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
        brnn.SCPNStatu = {
            /**
             * 不显示
             */
            NONE: "none",
            /**
             * 胜利
             */
            PLAY: "play",
        };
        var chipsPoolNiuNiu = (function (_super) {
            __extends(chipsPoolNiuNiu, _super);
            function chipsPoolNiuNiu() {
                var _this = _super.call(this) || this;
                _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onExit, _this);
                return _this;
            }
            chipsPoolNiuNiu.prototype.onExit = function () {
                this._play.stop();
            };
            Object.defineProperty(chipsPoolNiuNiu.prototype, "curState", {
                // public get curState(): string {
                // 	return this.currentState;
                // }
                set: function (v) {
                    switch (v) {
                        case brnn.SCPNStatu.PLAY:
                            this._play.play(0);
                            break;
                        case brnn.SCPNStatu.NONE:
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
            return chipsPoolNiuNiu;
        }(eui.Component));
        brnn.chipsPoolNiuNiu = chipsPoolNiuNiu;
        __reflect(chipsPoolNiuNiu.prototype, "niuniu.brnn.chipsPoolNiuNiu");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=chipsPoolNiuNiu.js.map