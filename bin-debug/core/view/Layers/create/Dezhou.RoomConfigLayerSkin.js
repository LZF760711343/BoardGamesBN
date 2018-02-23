var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dezhou;
(function (Dezhou) {
    var RoomConfigLayer = (function (_super) {
        __extends(RoomConfigLayer, _super);
        // private _ipxzRadio: eui.ToggleButton;
        // private _dlwzRadio: eui.ToggleButton;
        // private btnClose: UI.CommonBtn;
        function RoomConfigLayer() {
            var _this = _super.call(this) || this;
            _this._gameId = 5 /* DZ */;
            _this.skinName = Dezhou.RoomConfigLayerSkin;
            _this._levelConf = [{ playerCnt: 3, count: 8, cost: 10 }, { playerCnt: 3, count: 16, cost: 20 }];
            return _this;
        }
        RoomConfigLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
        };
        return RoomConfigLayer;
    }(Layers.RoomConfigLayerBase));
    Dezhou.RoomConfigLayer = RoomConfigLayer;
    __reflect(RoomConfigLayer.prototype, "Dezhou.RoomConfigLayer");
})(Dezhou || (Dezhou = {}));
//# sourceMappingURL=Dezhou.RoomConfigLayerSkin.js.map