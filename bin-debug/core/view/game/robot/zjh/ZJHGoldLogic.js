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
    var ZJHGoldLogic = (function (_super) {
        __extends(ZJHGoldLogic, _super);
        function ZJHGoldLogic() {
            return _super.call(this) || this;
            // Robot.instance = this;
        }
        ZJHGoldLogic.prototype.destroy = function () {
            // super.desrtoy();
            // this.gameDatas = this.gameScene = this.msgHandler = ZJHRobot.instance = null;
        };
        ZJHGoldLogic.prototype.doPreStart = function (scene) {
            _super.prototype.doPreStart.call(this, scene);
            //如果当前是轮到自己操作
            // if (!this.gameDatas.playerDatas[this.gameDatas.myPlyerId].ready) {
            //     this.msgHandler.sendReadyGame();
            //     // if()
            // }
            // if (this.gameDatas.myPlyerId && this.gameDatas.myPlyerId === this.gameDatas.curActionId) {
            //     this.msgHandler.sendBetMsg(this.gameDatas.curBetCnt);
            // }
        };
        ZJHGoldLogic.prototype.doStart = function (scene) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    _super.prototype.doStart.call(this, scene);
                    return [2 /*return*/];
                });
            });
        };
        return ZJHGoldLogic;
    }(ROBOT.ZJHLogic));
    ROBOT.ZJHGoldLogic = ZJHGoldLogic;
    __reflect(ZJHGoldLogic.prototype, "ROBOT.ZJHGoldLogic");
})(ROBOT || (ROBOT = {}));
//# sourceMappingURL=ZJHGoldLogic.js.map