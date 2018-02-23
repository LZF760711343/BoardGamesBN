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
    var testId = 11 /* GOLD_ZJH */;
    var level = 0 /* PRIMARY */;
    function panduanJoinRoom(gold, roomid, gameid) {
        var joinRoomNeedGold = 0;
        var joinRoomMaxGold = 0;
        if (roomid == undefined || roomid >= 0) {
            if (roomid == undefined) {
                roomid = 0;
            }
            joinRoomNeedGold = Config.DropGameList[gameid][roomid].minPlay;
            joinRoomMaxGold = Config.DropGameList[gameid][roomid].maxPlay;
        }
        if (joinRoomNeedGold != -1 && gold < joinRoomNeedGold) {
            return false;
        }
        if (joinRoomMaxGold != -1 && gold > joinRoomMaxGold) {
            return false;
        }
        return true;
    }
    var SelectSceneLogic = (function (_super) {
        __extends(SelectSceneLogic, _super);
        function SelectSceneLogic() {
            return _super.call(this) || this;
        }
        SelectSceneLogic.prototype.on_G2C_ADD_BAOXIANXIANG = function (msg) {
            egret.log("////////////////////////取保险箱钱成功!");
            this.isWait = false;
        };
        SelectSceneLogic.prototype.doAction = function (scene) {
            return __awaiter(this, void 0, void 0, function () {
                var conf, joinRoomNeedGold, joinRoomMaxGold, money, ranMoney;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.isWait) {
                                return [2 /*return*/];
                            }
                            if (!panduanJoinRoom(Global.playerDto.gold, level, testId)) return [3 /*break*/, 2];
                            this.isWait = true;
                            conf = ResManager.getResConf(testId);
                            return [4 /*yield*/, SceneManager.loadGroup(conf)];
                        case 1:
                            _a.sent();
                            net.SendMsg.create({ roomId: level, roomType: testId }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ENTER_ROOM).send();
                            this.isWait = false;
                            return [3 /*break*/, 3];
                        case 2:
                            // this._Baoxianxiang.text = Global.playerDto.baoxianxiang + "";
                            egret.log("钱不够进场,尝试从保险箱取钱!");
                            joinRoomNeedGold = Config.DropGameList[testId][level].minPlay;
                            joinRoomMaxGold = Config.DropGameList[testId][level].maxPlay;
                            if ((Global.playerDto.baoxianxiang + Global.playerDto.gold) >= joinRoomNeedGold) {
                                egret.log("开始取保险箱钱!");
                                money = joinRoomNeedGold + (joinRoomMaxGold - joinRoomNeedGold) * 0.2 + Math.floor(Math.random() * (joinRoomMaxGold - joinRoomNeedGold) * 0.8) - Global.playerDto.gold;
                                ranMoney = money - Global.playerDto.gold;
                                this.isWait = true;
                                net.SendMsg.create({ gold: -(money > Global.playerDto.baoxianxiang ? Global.playerDto.baoxianxiang : money) + "" }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ADD_BAOXIANXIANG).send();
                            }
                            else {
                                egret.log("保险箱钱不够!");
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return SelectSceneLogic;
    }(ROBOT.LogicBase));
    ROBOT.SelectSceneLogic = SelectSceneLogic;
    __reflect(SelectSceneLogic.prototype, "ROBOT.SelectSceneLogic");
})(ROBOT || (ROBOT = {}));
//# sourceMappingURL=SelectSceneLogic.js.map