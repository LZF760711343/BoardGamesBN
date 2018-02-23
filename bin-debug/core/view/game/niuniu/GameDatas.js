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
    var GameDatas = (function (_super) {
        __extends(GameDatas, _super);
        function GameDatas() {
            var _this = _super.call(this) || this;
            /**
             * 各个玩家的手牌
             */
            _this.handCardList = [];
            return _this;
        }
        return GameDatas;
    }(GameDatasBase));
    niuniu.GameDatas = GameDatas;
    __reflect(GameDatas.prototype, "niuniu.GameDatas");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameDatas.js.map