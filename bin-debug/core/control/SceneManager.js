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
// TypeScript file
var SceneManager;
(function (SceneManager) {
    var sceneMaps = {};
    sceneMaps[42 /* LOGIN */] = LoginScene;
    sceneMaps[43 /* SELECT */] = SelectScene;
    sceneMaps[9 /* QZNN */] = sceneMaps[1 /* NIUNIU */] = sceneMaps[38 /* GAME_ID_TWOMAN_QZNN */] = niuniu.GameScene;
    sceneMaps[41 /* GAME_ID_HZ_BRNN */] = niuniu.brnn.GameScene;
    sceneMaps[11 /* GOLD_ZJH */] = sceneMaps[10 /* ZJH */] = zjh.GameScene;
    sceneMaps[13 /* GOLD_DDZ */] = sceneMaps[3 /* DDZ */] = DDZ.GameScene;
    sceneMaps[39 /* GAME_ID_GDMJ_FK */] = sceneMaps[40 /* GAME_ID_GDMJ_GOLD */] = majiang.GameScene;
    //注册屏幕旋转事件
    // Main.instance.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, onOrientationChange, null);
    /**
     * 屏幕旋转回调
     */
    function onOrientationChange() {
        if (SceneManager.curScene) {
            SceneManager.curScene.onOrientationChange();
        }
    }
    function loadGroup(conf) {
        var isGroupNotLoaded = !ResManager.isGroupLoaded(conf.preGroupName);
        if ((conf.preGroupName && isGroupNotLoaded)
            || net.getServerType() !== 3 /* GAME */) {
            pushScene(SceneManager.loadScene);
            if (isGroupNotLoaded) {
                RES.loadGroup(conf.preGroupName, RES_PRIORITY.SCENE, SceneManager.loadScene);
            }
            egret.log("conf.preGroupName:", conf.preGroupName);
            return SceneManager.loadScene.waitReady(conf.preGroupName); //等待加载该场景需要加载的预加载资源组
        }
        return null;
    }
    SceneManager.loadGroup = loadGroup;
    /**
     * 打开一个场景
     * @param sceneTag:{GAME_ID}场景的id
     * @param callback:成功打开场景后的回调函数
     * @param target:回调函数this指向的对象
     * @param args:不定参数列表
     */
    function runScene(sceneTag, callback, target) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var scene, conf, temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        conf = ResManager.getResConf(sceneTag);
                        egret.log("runScene:" + GameLangs.gameNameMaps[sceneTag] + "  ,sceneTag:" + sceneTag);
                        if (!(sceneTag == 42 /* LOGIN */)) return [3 /*break*/, 3];
                        if (!(conf.preGroupName && !ResManager.isGroupLoaded(conf.preGroupName))) return [3 /*break*/, 2];
                        return [4 /*yield*/, RES.loadGroup(conf.preGroupName, RES_PRIORITY.SCENE)];
                    case 1:
                        _a.sent(); //加载登陆界面资源组
                        Toast.init(Main.instance);
                        _a.label = 2;
                    case 2:
                        if (!SceneManager.loadScene) {
                            SceneManager.loadScene = new sceneMaps[sceneTag](args);
                        }
                        else {
                            SceneManager.loadScene.init(args && args[0]);
                            SceneManager.loadScene.sceneTag = sceneTag;
                        }
                        scene = SceneManager.loadScene;
                        return [3 /*break*/, 6];
                    case 3:
                        temp = loadGroup(conf);
                        if (!temp) return [3 /*break*/, 5];
                        return [4 /*yield*/, temp];
                    case 4:
                        _a.sent(); //等待加载该场景需要加载的预加载资源组
                        _a.label = 5;
                    case 5:
                        scene = new sceneMaps[sceneTag](args);
                        scene.sceneTag = sceneTag;
                        _a.label = 6;
                    case 6:
                        pushScene(scene);
                        if (callback) {
                            callback.call(target, scene);
                        }
                        if (conf.lazyGroupName && !ResManager.isGroupLoaded(conf.lazyGroupName)) {
                            RES.loadGroup(conf.lazyGroupName, RES_PRIORITY.LAZYLOAD); //加载延迟加载的资源组
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    SceneManager.runScene = runScene;
    function pushScene(scene) {
        if (SceneManager.curScene && SceneManager.curScene.parent)
            Main.instance.removeChild(SceneManager.curScene);
        SceneManager.curScene = scene;
        Main.instance.addChildAt(scene, 0);
        // this._scenesStack.push(scene);
        // if (typeof DebugLayer.instance != "undefined" && DebugLayer.instance) {
        //     this.setChildIndex(DebugLayer.instance, 9999);
        // }
    }
    // export let curSceneSupportRes
})(SceneManager || (SceneManager = {}));
//# sourceMappingURL=SceneManager.js.map