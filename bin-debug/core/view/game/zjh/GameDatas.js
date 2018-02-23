var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zjh;
(function (zjh) {
    var GameDatas = (function (_super) {
        __extends(GameDatas, _super);
        function GameDatas() {
            var _this = _super.call(this) || this;
            /**
             * 玩家信息列表
             */
            _this.playerDatas = {};
            /**
             * 各个玩家的手牌
             */
            _this.handCardList = [];
            /**
             * 当前总的下注额度
             */
            _this.sumChips = 0;
            _this.Num = 0; //开始游戏扔筹码取消跟注声音
            _this.firstTime = 0; //游戏开始筹码为底分
            return _this;
        }
        GameDatas.prototype.resetPlayerDatas = function () {
            _super.prototype.resetPlayerDatas.call(this);
            //默认的下注额度为最小的额度
            this.curBetCnt = this.roomInfo.createinfo.betChips[0];
            this.roundCnt = 1;
            this.sumChips = 0;
            this.handCardList = [];
            for (var key in this.playerDatas) {
                this.playerDatas[key].loseOrQiPai = 0;
                this.playerDatas[key].kanPai = 0;
                this.playerDatas[key].ready = 0;
            }
        };
        return GameDatas;
    }(GameDatasBase));
    zjh.GameDatas = GameDatas;
    __reflect(GameDatas.prototype, "zjh.GameDatas");
})(zjh || (zjh = {}));
//# sourceMappingURL=GameDatas.js.map