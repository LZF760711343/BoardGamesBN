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
    /**
     * 玩的局数
     */
    var playCnt = 0;
    /**
     * 初始金币数
     */
    var baseCoins = 0;
    /**
     * 开始玩的时间
     */
    var startTime = 0;
    var config = {};
    var ZJHLogic = (function (_super) {
        __extends(ZJHLogic, _super);
        // public static instance: ZJHRobot;
        function ZJHLogic() {
            var _this = _super.call(this) || this;
            baseCoins = Global.playerDto.gold + Global.playerDto.baoxianxiang;
            startTime = Date.now();
            return _this;
            // Robot.instance = this;
        }
        ZJHLogic.prototype.destroy = function (scene) {
            // super.desrtoy();
            // this.gameDatas = this.gameScene = this.msgHandler = ZJHRobot.instance = null;
        };
        ZJHLogic.prototype.doAction = function (scene) {
            ROBOT.log(scene.gameDatas.gameStatus);
            switch (scene.gameDatas.gameStatus) {
                case 1 /* PRE_START */:
                    this.doPreStart(scene);
                    break;
                case 2 /* START */:
                    this.doStart(scene);
                    break;
                case 3 /* QIANG_ZHUANG */:
                    break;
                case 4 /* TOU_ZHU */:
                    this.doStart(scene);
                    break;
                case 5 /* SHOW_ME */:
                    break;
                case 6 /* SHOW_ALL */:
                    this.doPreStart(scene);
                    break;
            }
        };
        /**
         * 检查是否要换房
         */
        ZJHLogic.prototype.checkIsChangeRoom = function () {
            if (this.isWaitChangeRoom) {
                return;
            }
        };
        ZJHLogic.prototype.on_G2C_STARTGAME = function (msg) {
            ROBOT.log("\u73A9\u4E86" + playCnt++ + "\u5C40, \u73A9\u4E86" + (Date.now() - startTime) / 60 / 1000 + "\u5206\u949F, \u8F93\u8D62\u60C5\u51B5:" + (Global.playerDto.gold + Global.playerDto.baoxianxiang - baseCoins) + "\u91D1\u5E01");
        };
        ZJHLogic.prototype.doPreStart = function (scene) {
            ROBOT.log("doPreStart:", scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId]);
            if (!scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId].ready) {
                scene.msgHandler.sendReadyGame();
            }
            if (scene.gameDatas.myPlyerId && scene.gameDatas.myPlyerId === scene.gameDatas.curActionId) {
                scene.msgHandler.sendBetMsg(scene.gameDatas.curBetCnt);
            }
        };
        ZJHLogic.prototype.doStart = function (scene) {
            return __awaiter(this, void 0, void 0, function () {
                var layer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // if(scene.gameDatas.myPlyerId !== scene.gameDatas.curActionId){
                            // 	return ;
                            // }
                            //如果当前是轮到自己操作
                            if (scene.gameDatas.myPlyerId && scene.gameDatas.myPlyerId === scene.gameDatas.curActionId) {
                                scene.msgHandler.sendBetMsg(scene.gameDatas.curBetCnt);
                            }
                            if (this.isWaitClose) {
                                return [2 /*return*/];
                            }
                            ROBOT.log("this.isWaitCloseAni:", this.isWaitCloseAni);
                            if (!this.isWaitCloseAni) return [3 /*break*/, 3];
                            layer = Layers.getLayer(niuniu.RoundAccountLayer);
                            if (!layer) return [3 /*break*/, 2];
                            this.isWaitClose = true;
                            return [4 /*yield*/, scene.wait(600)];
                        case 1:
                            _a.sent();
                            this.isWaitClose = false;
                            layer.onTouchGoBtn();
                            _a.label = 2;
                        case 2: return [3 /*break*/, 6];
                        case 3:
                            ROBOT.log("scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId].kanPai:", scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId].kanPai);
                            if (!scene.gameDatas.cuopai) return [3 /*break*/, 5];
                            this.isWaitCloseAni = true;
                            return [4 /*yield*/, ROBOT.wait(1500)];
                        case 4:
                            _a.sent();
                            this.isWaitCloseAni = false;
                            if (scene.gameDatas.cuopai) {
                                scene.gameDatas.cuopai.CuoPaiFinished();
                                scene.gameDatas.cuopai = null;
                            }
                            egret.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
                            return [3 /*break*/, 6];
                        case 5:
                            if (scene.gameDatas.isSelfPlayingGame() && !scene.gameDatas.playerDatas[scene.gameDatas.myPlyerId].kanPai && scene.gameDatas.roundCnt > 2) {
                                scene.msgHandler.sendKanMsg(false);
                            }
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        return ZJHLogic;
    }(ROBOT.LogicBase));
    ROBOT.ZJHLogic = ZJHLogic;
    __reflect(ZJHLogic.prototype, "ROBOT.ZJHLogic");
})(ROBOT || (ROBOT = {}));
//# sourceMappingURL=ZJHLogic.js.map