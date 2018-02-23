var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layers;
(function (Layers) {
    var DrawLayer = (function (_super) {
        __extends(DrawLayer, _super);
        function DrawLayer(data) {
            var _this = _super.call(this, [ResManager.GROUP_NAME.WELFARE_CENTER, ResManager.GROUP_NAME.RECHARGE]) || this;
            _this.qiandaoConst = ["3000", "4000", "5000", "6000", "7000", "8000", "9000", "3000"];
            _this.skinName = DrawDaySkin;
            _this._data = data;
            return _this;
        }
        DrawLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.gets = [this._get1, this._get2, this._get3, this._get4, this._get5, this._get6, this._get7];
            this._initFinish = true;
            this._qiandaolingqu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qiandao, this);
            this.init(this._data);
        };
        DrawLayer.prototype.qiandao = function () {
            // if (this._data.canQd == 1) {
            //     Toast.launch(`恭喜您成功领取 ${this.qiandaoConst[this._data.qiandaoCount]}金币`);
            // }
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_QITIAN_QIANDAO).send();
            this.close();
            var particle = Effect.createSprayCoin(Global.sWidth / 2, Global.sHeight);
        };
        DrawLayer.prototype.init = function (data) {
            this._data = data;
            if (this._initFinish) {
                var Count = data.qiandaoCount;
                var canQd = data.canQd;
                egret.log("this._data", this._data);
                // let l =Count % 7
                // if (){
                // }
                for (var i = 0; i < 7; i++) {
                    if (Count > i) {
                        this.gets[i].visible = true;
                    }
                }
            }
        };
        return DrawLayer;
    }(Layers.BaseLayer));
    Layers.DrawLayer = DrawLayer;
    __reflect(DrawLayer.prototype, "Layers.DrawLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=DrawLayer.js.map