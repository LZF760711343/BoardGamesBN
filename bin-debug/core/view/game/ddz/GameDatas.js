var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DDZ;
(function (DDZ) {
    var GameDatas = (function (_super) {
        __extends(GameDatas, _super);
        function GameDatas() {
            var _this = _super.call(this) || this;
            /**
             * 抢完地主后的公共牌
             */
            _this.publicCards = [];
            /**
             * 上个人打出的牌
             */
            _this.lastPlayCards = [];
            _this.poker = new DDZ.Poker();
            /**
             * 各个玩家的手牌
             */
            _this.handCardList = [];
            _this.cardRest = []; //每个玩家的剩余牌数(索引下标为玩家id)
            /**当前倍率 */
            _this.currentBeilv = 0; //(指农名的倍率)
            return _this;
        }
        GameDatas.prototype.init = function () {
            this.cardRest = [];
        };
        GameDatas.prototype.resetPlayerDatas = function () {
            _super.prototype.resetPlayerDatas.call(this);
            this.poker.reset();
            // this.publicCards = [];
            this.cardRest = [];
            this.curActionId = -1;
            this.lastPlayCardId = null;
            this.fristQiangId = null;
            // for (let key in this.playerDatas) {
            // 	this.playerDatas[key].qiangZhuang = -1;
            // 	// this.playerDatas[key].kanPai = 0;
            // }
            // this.playerDatas
        };
        return GameDatas;
    }(GameDatasBase));
    DDZ.GameDatas = GameDatas;
    __reflect(GameDatas.prototype, "DDZ.GameDatas");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=GameDatas.js.map