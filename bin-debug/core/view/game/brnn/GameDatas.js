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
        var GameDatas = (function (_super) {
            __extends(GameDatas, _super);
            function GameDatas() {
                var _this = _super.call(this) || this;
                /**
                 * 自己当前的位置,如果为-1则为没有坐下
                 */
                _this.weizhi = -1;
                _this._gameStatus = 1 /* PRE_START */;
                /**
                 * 上一次的状态
                 */
                _this.lastGameStatus = 1 /* PRE_START */;
                /**
                 * 自己的下注信息
                 * 位置0存放的是自己的总下注额度
                 */
                _this.selfInChipsList = [];
                _this.isChangeDesk = false;
                _this.brnWinResult = [];
                // private _selfInChipsList : number[];
                // public get selfInChipsList() : number[] {
                // 	return this._selfInChipsList;
                // }
                // public set selfInChipsList(v : number[]) {
                // 	this._selfInChipsList = v;
                // }
                /**
                 * 下注信息
                 */
                _this.playerGoDetain = {
                    maxCount: 2, curCount: 0, bets: [0, 0, 0, 0, 0]
                };
                _this.shenqingShangzhuangList = [];
                _this.sumInChipsList = [];
                /**
                 * 收到G2C_SEND_CARDS的次数,为5时,说明所有牌都收到了
                 */
                _this.gameCi = 0;
                _this.zhuangjiaCards = [];
                /**
                 * 是否自动上庄
                 */
                _this.isAutoApplyDeal = false;
                _this.reset();
                return _this;
            }
            Object.defineProperty(GameDatas.prototype, "gameStatus", {
                // public gameStatus: GAME_STAGE = GAME_STAGE.PRE_START;
                /**
                 * 游戏的当前状态
                 */
                get: function () {
                    return this._gameStatus;
                },
                set: function (value) {
                    this.lastGameStatus = this._gameStatus;
                    this._gameStatus = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 更新自己某个筹码池的下注额度
             * @param value:要更新的数值
             * @param index:筹码池的位置
             */
            GameDatas.prototype.setSelfInChips = function (value, index) {
                //重新计算总下注额度
                this.selfInChipsList[0] = this.selfInChipsList[0] - this.selfInChipsList[index] + value;
                this.selfInChipsList[index] = value;
            };
            /**
             * 更新某个筹码池总的下注额度
             * @param value:要更新的数值
             * @param index:筹码池的位置
             */
            GameDatas.prototype.setSumInChipsList = function (value, index) {
                //重新计算总下注额度
                this.sumInChipsList[0] = this.sumInChipsList[0] - this.sumInChipsList[index] + value;
                this.sumInChipsList[index] = value;
            };
            GameDatas.prototype.reset = function () {
                this.brnWinResult = [];
                this.gameCi = 0;
                this.playerGoDetain.curCount = 0;
                this.goDoDettian = false;
                this.selfInChipsList = [0, 0, 0, 0, 0];
                this.sumInChipsList = [0, 0, 0, 0, 0];
                this.gameOverDatas = {
                    calInfo: null,
                    list: [
                        {},
                        {},
                        {},
                        {},
                        {},
                    ]
                };
            };
            /**
             *
             */
            GameDatas.prototype.updateKingInfo = function () {
                var arrLen = this.brnnRoomInfo.wangNameList.length;
                this.hasKing = arrLen > 0;
                for (var i = 0; i < arrLen; i++) {
                    if (this.brnnRoomInfo.wangNameList[i].playerId === Global.playerDto.id) {
                        this.isSelfKing = true;
                        return;
                    }
                }
                this.isSelfKing = false;
            };
            GameDatas.prototype.getMaxGoldPalyerId = function () {
                var datas = this.playerDatas;
                var idArr = [];
                var idArrTemp = [];
                for (var key in this.playerDatas) {
                    if (this.playerDatas[key]) {
                        idArrTemp.push(this.playerDatas[key]);
                    }
                }
                idArrTemp.sort(function (temp1, temp2) {
                    return temp2.chips - temp1.chips;
                });
                var arrLen = this.brnnRoomInfo.wangNameList.length;
                for (var i = 0; i < idArrTemp.length; i++) {
                    if (arrLen) {
                        for (var j = 0; j < arrLen; j++) {
                            if (this.brnnRoomInfo.wangNameList[j].playerId != idArrTemp[i].playerId) {
                                idArr.push(idArrTemp[i].playerId);
                            }
                        }
                    }
                    else {
                        idArr.push(idArrTemp[i].playerId);
                    }
                    if (idArr.length >= 8) {
                        break;
                    }
                }
                return idArr;
            };
            return GameDatas;
        }(GameDatasBase));
        brnn.GameDatas = GameDatas;
        __reflect(GameDatas.prototype, "niuniu.brnn.GameDatas");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameDatas.js.map