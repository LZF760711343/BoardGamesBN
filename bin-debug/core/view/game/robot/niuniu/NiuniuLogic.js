var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ROBOT;
(function (ROBOT) {
    var config = {};
    var NiuniuLogic = (function (_super) {
        __extends(NiuniuLogic, _super);
        // public static instance: ZJHRobot;
        function NiuniuLogic() {
            var _this = _super.call(this) || this;
            _this.poker = new ROBOT.NiuniuPoker();
            return _this;
            // Robot.instance = this;
        }
        NiuniuLogic.prototype.destroy = function (scene) {
            // super.desrtoy();
            // this.gameDatas = this.gameScene = this.msgHandler = ZJHRobot.instance = null;
        };
        NiuniuLogic.prototype.doAction = function (scene) {
            ROBOT.log(scene.gameDatas.gameStatus);
            switch (scene.gameDatas.gameStatus) {
                case 1 /* PRE_START */:
                    this.doPreStart(scene);
                    break;
                case 2 /* START */:
                    this.doStart(scene);
                    break;
                case 3 /* QIANG_ZHUANG */:
                    this.doQiangzhnuang(scene);
                    break;
                case 4 /* TOU_ZHU */:
                    this.touZhu(scene);
                    break;
                case 5 /* SHOW_ME */:
                    this.cal(scene);
                    break;
                case 6 /* SHOW_ALL */:
                    this.doPreStart(scene);
                    break;
            }
        };
        /**
         * 算牛阶段
         */
        NiuniuLogic.prototype.cal = function (scene) {
            if (this.isWait) {
                return;
            }
            var info = scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId];
            if (info.showed === 0) {
            }
            else {
                scene.msgHandler.sendCalMsg(0);
            }
            this.isWait = true;
        };
        NiuniuLogic.prototype.on_G2C_SEND_CARDS = function (msg) {
            // if (this.gameDatas.isSelfPlayingGame()) {
            if (msg.datas.playerId === Global.playerDto.id) {
                if (msg.datas.Cards.length === 1) {
                }
                else if (msg.datas.Cards.length > 1) {
                    this.poker.init(msg.datas.Cards);
                }
            }
            // }
        };
        NiuniuLogic.prototype.on_G2C_NN_LOOK = function (msg) {
            this.isWait = false;
        };
        NiuniuLogic.prototype.analysisCards = function (cards) {
        };
        NiuniuLogic.prototype.on_G2C_NN_GAMEOVER = function (msg) {
            this.poker.reset();
            this.isWait = false;
        };
        /**
       * 收到定庄消息
       */
        NiuniuLogic.prototype.on_G2C_NN_DEALER = function (msg) {
            this.isWait = false;
        };
        NiuniuLogic.prototype.doQiangzhnuang = function (scene) {
            if (this.isWait) {
                return;
            }
            var playerInfo = scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId];
            /**
             * 还没有抢庄
             */
            if (playerInfo.qiangZhuang === -1) {
                if (this.poker.isInit) {
                    this.isWait = true;
                    if (this.poker.getCardTypeUpProbalility(2 /* NIUX */ + "" + 5) > Math.random()) {
                        scene.msgHandler.sendCallMsg(this.getMaxCallRate(Global.playerDto.gold, scene.gameDatas.roomInfo.createinfo.difen, scene.gameDatas.getPlayIngGameCnt(), 25, 4, scene.gameDatas.gameType === 0 /* COIN */));
                    }
                    else {
                        scene.msgHandler.sendCallMsg(0);
                    }
                }
            }
        };
        /**获取能抢庄的最大倍率
         * @param playerGold 玩家金币
         * @param roomBeilv 房间倍率
         * @param playerCount 玩家人数
         * @param xianMaxBeilv 闲家最大倍率
         * @param cardTypeMaxBeilv 牌型最大倍率
         */
        NiuniuLogic.prototype.getMaxCallRate = function (playerGold, roomBeilv, playerCount, xianMaxBeilv, cardTypeMaxBeilv, isCoin) {
            return playerGold / (roomBeilv * xianMaxBeilv * cardTypeMaxBeilv);
        };
        NiuniuLogic.prototype.doPreStart = function (scene) {
            // log("doPreStart:", scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId])
            if (!scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId].ready) {
                scene.msgHandler.sendReadyGame();
            }
            // if (scene.gameDatas.myPlyerId && scene.gameDatas.myPlyerId === scene.gameDatas.curActionId) {
            // 	scene.msgHandler.sendBetMsg(scene.gameDatas.curBetCnt);
            // }
        };
        NiuniuLogic.prototype.doStart = function (scene) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        };
        /**刷新闲家按钮可用状态
         * @param zhuangGold 庄家金币
         * @param playerGold 玩家金币
         * @param playerCount 玩家人数
         * @param zhuangBeilv 庄家倍率
         * @param cardTypeMaxBeilv 牌型最大倍率
         * @param roomBeilv 房间倍率
         */
        NiuniuLogic.prototype.RefreshXianBarAvail = function (zhuangGold, playerGold, playerCount, zhuangBeilv, cardTypeMaxBeilv, roomBeilv, isCoin) {
            if (isCoin) {
                var min;
                var beilv;
                // min = (zhuangGold / (playerCount - 1) <= playerGold) ? zhuangGold/ (playerCount - 1 ) : playerGold;
                min = zhuangGold <= playerGold ? zhuangGold : playerGold;
                beilv = min / (roomBeilv * zhuangBeilv * cardTypeMaxBeilv);
                return beilv;
            }
            else {
                return 4;
            }
        };
        /**
         * 下注阶段
         */
        NiuniuLogic.prototype.touZhu = function (scene) {
            return __awaiter(this, void 0, void 0, function () {
                var info;
                return __generator(this, function (_a) {
                    info = scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId];
                    if (info.touZhu === 0) {
                        if (this.poker.isInit) {
                            this.isWait = true;
                            if (this.poker.getCardTypeUpProbalility(2 /* NIUX */ + "" + 5) > Math.random()) {
                                scene.msgHandler.sendBetMsg(this.RefreshXianBarAvail(scene.gameDatas.playerDatas[scene.gameDatas.dealerId].chips, Global.playerDto.gold, scene.gameDatas.getPlayIngGameCnt(), scene.gameDatas.zhuangBeilv, 4, scene.gameDatas.roomInfo.createinfo.difen, scene.gameDatas.gameType === 0 /* COIN */));
                            }
                            else {
                                scene.msgHandler.sendBetMsg(scene.gameDatas.roomInfo.createinfo.betChips[0]);
                            }
                        }
                    }
                    return [2 /*return*/];
                });
            });
        };
        return NiuniuLogic;
    }(ROBOT.LogicBase));
    ROBOT.NiuniuLogic = NiuniuLogic;
    __reflect(NiuniuLogic.prototype, "ROBOT.NiuniuLogic");
})(ROBOT || (ROBOT = {}));
//# sourceMappingURL=NiuniuLogic.js.map