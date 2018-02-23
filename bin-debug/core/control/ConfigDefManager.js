var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
/**
 * 游戏配置文件常量
 * json列表，里面是json文件的名字，自己手动添加吧，记得要把相应的json文件手动添加到gameConfig文件夹内
 */
var GAMECONFIGS = {
    /**
     * 游戏初中高级场金钱配置
     */
    GAMEROOMGLOLD: "GameRoomGloldConfig"
};
/**
 * 常量配置资源管理器
 */
var ConfigDefManager = (function () {
    function ConfigDefManager() {
        this.init();
    }
    ConfigDefManager.init = function () {
        ConfigDefManager.configDefManager = new ConfigDefManager();
    };
    ConfigDefManager.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gameConfigs, groups, length, i, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.loadGroup("gameConfig")];
                    case 1:
                        _a.sent();
                        gameConfigs = [];
                        groups = RES.getGroupByName("gameConfig");
                        length = groups.length;
                        for (i = 0; i < length; i++) {
                            item = groups[i];
                            this.onComplete(RES.getRes(item.data.name));
                        }
                        //执行初始化游戏内配置
                        Config.initGameRoomConfig();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 返回一个ConfigDefManager实例，暂时没用上
     */
    // public static getInstance():ConfigDefManager{
    //     if(ConfigDefManager.configDefManager==null || ConfigDefManager.configDefManager==undefined){
    //         ConfigDefManager.configDefManager = new ConfigDefManager();
    //     }
    //     return ConfigDefManager.configDefManager;
    // }
    /**
     * json文件加载完成执行，将所有相关json对象存到GameConfigs
     */
    ConfigDefManager.prototype.onComplete = function (data) {
        // let data:GameConfigManage = JSON.parse(event.target.data);
        ConfigDefManager.GameConfigs[data.name] = data;
        //==============================为下面的GameConfigManage添加方法======================================
        //添加一个根据key获得对象
        ConfigDefManager.GameConfigs[data.name]["getDataByKey"] = function (value) {
            for (var i = 0; this.data.length; i++) {
                var obj = this.data[i];
                if (value === obj[this.data[i].id]) {
                    return obj;
                }
            }
        };
        //添加一个根据一个字段名获得该字段对应的对象的集合
        ConfigDefManager.GameConfigs[data.name]["getDataByNames"] = function (fieldName, value) {
            //放回同一个字段的多个值
            var objs = [];
            for (var i = 0; i < this.data.length; i++) {
                var obj = this.data[i];
                if (value === obj[fieldName]) {
                    objs.push(obj);
                }
            }
            return objs;
        };
        //添加一个根据一个字段名获得该字段对应的对象
        ConfigDefManager.GameConfigs[data.name]["getDataByName"] = function (fieldName, value) {
            for (var i = 0; i < this.data.length; i++) {
                var obj = this.data[i];
                if (value === obj[fieldName]) {
                    return obj;
                }
            }
        };
    };
    return ConfigDefManager;
}());
// public static GameConfigs:GameConfigManage[] = [];
ConfigDefManager.GameConfigs = {};
__reflect(ConfigDefManager.prototype, "ConfigDefManager");
//# sourceMappingURL=ConfigDefManager.js.map