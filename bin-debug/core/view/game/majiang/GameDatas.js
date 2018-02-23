var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var majiang;
(function (majiang) {
    var GameDatas = (function (_super) {
        __extends(GameDatas, _super);
        function GameDatas() {
            var _this = _super.call(this) || this;
            _this.hasReceiveSeZi = false;
            _this.init();
            return _this;
        }
        GameDatas.prototype.init = function () {
            this.dealerId = null;
            this._actionItems = [];
            this.tanType = 0;
            this.remainCards = 136;
        };
        GameDatas.prototype.resetPlayerDatas = function () {
            _super.prototype.resetPlayerDatas.call(this);
            this.tanType = 0;
            this._actionItems = [];
            this.curActionId = -1;
            this.lastPlayCardId = null;
            this.dealerId = null;
            this.remainCards = 136;
            // this.fristQiangId = null;
        };
        return GameDatas;
    }(GameDatasBase));
    majiang.GameDatas = GameDatas;
    __reflect(GameDatas.prototype, "majiang.GameDatas");
})(majiang || (majiang = {}));
//# sourceMappingURL=GameDatas.js.map