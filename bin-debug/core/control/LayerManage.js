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
var Layers;
(function (Layers) {
    var _layerList;
    var layer = new eui.Component();
    function init(_layer) {
        layer = _layer;
        // layer.removeChildren();
        _layerList = {};
        quitTipsLayer = null;
    }
    Layers.init = init;
    /**
     * 添加一个层级面板
     * @param baseLayer:要添加的面板
     * @param bgType:背景类型 {BG_TYPE} 默认会添加灰色的背景
     */
    function openLayer(baseLayer, bgType, aniType) {
        if (bgType === void 0) { bgType = 1 /* GRAY */; }
        return __awaiter(this, void 0, void 0, function () {
            var layerName, curSceneTag, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layerName = baseLayer["__proto__"]["__class__"];
                        egret.log("OpenLayer:" + layerName);
                        if (_layerList[layerName]) {
                            return [2 /*return*/];
                        }
                        _layerList[layerName] = baseLayer;
                        if (bgType != 0 /* NONE */) {
                            baseLayer.bg = addBg(bgType);
                        }
                        if (!(baseLayer.loadKey && !ResManager.isGroupLoaded(baseLayer.loadKey))) return [3 /*break*/, 6];
                        curSceneTag = SceneManager.curScene.sceneTag;
                        Layers.WaitingLayer.open();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, RES.loadGroup(baseLayer.loadKey)];
                    case 2:
                        _a.sent(); //等待资源加载
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        egret.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                        return [3 /*break*/, 5];
                    case 4:
                        Layers.WaitingLayer.close();
                        return [7 /*endfinally*/];
                    case 5:
                        if (curSceneTag !== SceneManager.curScene.sceneTag) {
                            _layerList[layerName] = null;
                            return [2 /*return*/];
                        }
                        _a.label = 6;
                    case 6:
                        layer.addChild(baseLayer);
                        popEffect(baseLayer, aniType);
                        egret.log("openLayer finish");
                        return [2 /*return*/];
                }
            });
        });
    }
    Layers.openLayer = openLayer;
    function popEffect(layer, aniType) {
        switch (aniType) {
            case 0:
                break;
            case 1:
                // layer.alpha = 0.5;
                layer.scaleX = 0.5;
                layer.scaleY = 0.5;
                egret.Tween.get(layer).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
                break;
            case 2:
                // layer.alpha = 0.5;
                layer.scaleX = 0.5;
                layer.scaleY = 0.5;
                egret.Tween.get(layer).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.elasticOut);
                break;
        }
    }
    var quitTipsLayer;
    /**
     * 打开关闭app提示,只在安卓端会会用到,当用户点击返回键的时候,提示用户是否关闭应用
     * @platform Android
     */
    function openQuitTipsLayer() {
        if (quitTipsLayer) {
            if (quitTipsLayer.bg && quitTipsLayer.bg.parent) {
                quitTipsLayer.bg.parent.removeChild(quitTipsLayer.bg);
            }
            if (quitTipsLayer.parent) {
                quitTipsLayer.parent.removeChild(quitTipsLayer);
            }
            quitTipsLayer = null;
        }
        else {
            quitTipsLayer = new Layers.HintLayer();
            quitTipsLayer.init({
                tipsStr: GameLangs.exitGameTip,
                leftFunc: NativeBridge.endGame,
                leftThisObj: NativeBridge,
                curState: Layers.HintLayer.SURE,
            });
            quitTipsLayer.once(egret.Event.CLOSE, openQuitTipsLayer, null);
            quitTipsLayer.bg = addBg(1 /* GRAY */);
            layer.addChild(quitTipsLayer);
            popEffect(quitTipsLayer, 2 /* CENTER2 */);
        }
    }
    Layers.openQuitTipsLayer = openQuitTipsLayer;
    /**
     * 将层级面板移除
     */
    function closeLayer(baseLayer) {
        var layerName = baseLayer["prototype"] ? baseLayer["prototype"]["__class__"] : baseLayer["__proto__"]["__class__"];
        egret.log("CloseLayer:" + layerName);
        var _baseLayer = _layerList[layerName];
        if (_baseLayer) {
            delete _layerList[layerName];
            if (_baseLayer.parent) {
                _baseLayer.parent.removeChild(_baseLayer);
            }
            if (_baseLayer.bg && _baseLayer.bg.parent) {
                _baseLayer.bg.parent.removeChild(_baseLayer.bg);
            }
        }
    }
    Layers.closeLayer = closeLayer;
    function getLayer(layerClass) {
        return _layerList[layerClass.prototype["__class__"]];
    }
    Layers.getLayer = getLayer;
    /**
     * 添加背景
     * @param bgType:{BG_TYPE}对应BgSkin.exml这个皮肤文件里面的各个状态
     */
    function addBg(bgType) {
        var bg = new eui.Component();
        bg.skinName = UI.BgSkin;
        bg.percentWidth = bg.percentHeight = 100;
        bg.currentState = bgType + "";
        layer.addChild(bg);
        if (bgType === 1 /* GRAY */) {
            bg.alpha = 0;
            egret.Tween.get(bg).to({ alpha: 1 }, 150);
        }
        return bg;
    }
})(Layers || (Layers = {}));
//# sourceMappingURL=LayerManage.js.map