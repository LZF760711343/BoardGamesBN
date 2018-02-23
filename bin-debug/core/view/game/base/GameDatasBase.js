var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameDatasBase = (function () {
    function GameDatasBase() {
        /**
         * 用于判断客户端是否已经做过操作了
         * 主要是用来服务器超时时,用来判断时候需要更新一些UI
         */
        this.isDoAction = false;
        /**
         * 玩家信息列表
         */
        this.playerDatas = {};
        /**
         * 用来记录玩家是否在游戏中
         */
        this.playingList = [];
    }
    /**
     * 游戏结束后,重置playerDatas里面的一些数据
     */
    GameDatasBase.prototype.resetPlayerDatas = function () {
        for (var key in this.playerDatas) {
            this.playerDatas[key].touZhu = 0;
            this.playerDatas[key].qiangZhuang = -1;
            this.playerDatas[key].showed = 0;
        }
    };
    /**
     * 判断玩家是否在游戏中
     */
    GameDatasBase.prototype.isPlayngGame = function (id) {
        return this.playingList[id];
    };
    /**
     * 获取当前游戏的人数
     */
    GameDatasBase.prototype.getPlayIngGameCnt = function () {
        var cnt = 0;
        for (var key in this.playingList) {
            if (this.playingList[key]) {
                cnt++;
            }
        }
        return cnt;
    };
    /**
     * 获取游戏前房间人数
     */
    GameDatasBase.prototype.getNOPlayIngGameCnt = function () {
        var cnt = 0;
        for (var key in this.playerDatas) {
            if (this.playerDatas[key]) {
                cnt++;
            }
        }
        return cnt;
    };
    /**
     * 获取自己的玩家数据
     */
    GameDatasBase.prototype.getSelfPlayerDatas = function () {
        return this.playerDatas[this.myPlyerId];
    };
    /**
     * 自己是否已经开始游戏了
     */
    GameDatasBase.prototype.isSelfPlayingGame = function () {
        return this.playingList[this.myPlyerId];
    };
    /**
     * 游戏是否已经正式开始了
     */
    GameDatasBase.prototype.isGameStart = function () {
        return this.roomInfo.done_game_cnt > 0;
    };
    /**
     *
     */
    GameDatasBase.prototype.isSelfId = function (id) {
        return this.myPlyerId === id;
    };
    /**
     * 获取所有游戏中的人的玩家信息列表
     */
    GameDatasBase.prototype.getPlayingList = function () {
        var list = [];
        for (var key in this.playerDatas) {
            if (this.playingList[this.playerDatas[key].playerId]) {
                list.push(this.playerDatas[key]);
            }
        }
        return list;
    };
    return GameDatasBase;
}());
__reflect(GameDatasBase.prototype, "GameDatasBase");
//# sourceMappingURL=GameDatasBase.js.map