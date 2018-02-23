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
var ResManager;
(function (ResManager) {
    /**
     *
     * @author He
     *资源加载管理类,用于管理游戏中各种资源的加载
     */
    /**
     * 所有资源加载组的组名
     */
    ResManager.GROUP_NAME = {
        LOGIN: "login",
        /**
         * 游戏的一些通用的一些资源
         */
        COMMON: "common",
        HALL: "hall",
        /**
         * 创建房间页面的资源
         */
        CREATEROOM: "createRoom",
        /**
         * 通用的声音资源
         */
        SOUNDS_COMMON: "soundsCommon",
        /**
         * 游戏的一些通用预加载资源
         */
        GAME_COMMON: "gameCommon",
        /**
         * 扑克牌
         */
        CARDS: "cards",
        CARDS_NEW: "cardsNew",
        /**
         * 牛牛需要预加载的资源
         */
        NIUNIU: "niuniu",
        /**
         * 牛牛延迟加载的声音资源
         */
        NIUNIU_SOUNDS_LAZY: "niuniuSoundsLazy",
        /**
        * 斗地主延迟加载的声音资源
        */
        DDZ_SOUNDS_LAZY: "ddzSoundsLazy",
        /**
         * 聊天的声音资源
         */
        CHAT: "chat",
        /**
         * 游戏里面的一些通用的预加载声音资源
         */
        SOUNDS_GAME: "soundsGame",
        /**
        * 游戏里面的商店首充资源
        */
        RECHARGE: "Recharge",
        /**
        * 拍卖行需加载资源
        */
        HALLSMALLSET: "hallsmallset",
        /**
         * 百人牛牛预加载资源
         */
        BRNN: "brnn",
        /**
         * 百人牛牛声音预加载资源
         */
        BRNN_SOUNDS_LZY: "brnnSoundsLazy",
        /**
         * 表情预加载资源
         */
        bq: "biaoqing",
        /**
         * 斗地主预加载资源
         */
        DDZ: "ddz",
        /**
         * 麻将预加载资源
         */
        MAJIANG: "majiang",
        /**
         * 麻将声音预加载资源
         */
        MAJIANG_SOUNDS_LAZY: "majiangSoundsLazy",
        /**
         * 麻将牌
         */
        MJ_CARDS: "mjcards",
        /**
         * 三张牌延迟加载声音资源
         */
        ZJH_SOUND_LAZY: "zjhSoundLazy",
        /**
         * 战绩资源
         */
        PERFORMANCE: "perFormance",
        /**
         * 琐碎资源放一起
         */
        SAFE_BOX: "safeBox",
        /**
         * 福利中心加载资源
         */
        WELFARE_CENTER: "welfarecenter",
        /**
         * 三张牌预加载资源
         */
        ZJH: "zjh",
        /** 牛牛通用语言加载资源 */
        NIUNIU_COMMON_SOUNDS: "niuniuCommonSounds"
    };
    var _eventDispatcher;
    var completeGroupList = {};
    ResManager.sceneResConfs = [];
    ResManager.sceneResConfs[42 /* LOGIN */] = {
        preload: [ResManager.GROUP_NAME.LOGIN],
    };
    ResManager.sceneResConfs[43 /* SELECT */] = {
        preload: [
            ResManager.GROUP_NAME.SOUNDS_COMMON,
            ResManager.GROUP_NAME.HALL,
            ResManager.GROUP_NAME.COMMON,
        ],
    };
    ResManager.sceneResConfs[11 /* GOLD_ZJH */] = ResManager.sceneResConfs[10 /* ZJH */] = {
        preload: [
            ResManager.GROUP_NAME.SOUNDS_COMMON,
            ResManager.GROUP_NAME.CARDS,
            ResManager.GROUP_NAME.COMMON,
            ResManager.GROUP_NAME.GAME_COMMON,
            ResManager.GROUP_NAME.SOUNDS_GAME,
            "music_zjh_bg_mp3",
            ResManager.GROUP_NAME.ZJH,
            ResManager.GROUP_NAME.CARDS_NEW,
        ],
        lazyload: [
            ResManager.GROUP_NAME.ZJH_SOUND_LAZY,
            ResManager.GROUP_NAME.CHAT,
        ]
    };
    ResManager.sceneResConfs[9 /* QZNN */] = ResManager.sceneResConfs[1 /* NIUNIU */] = ResManager.sceneResConfs[38 /* GAME_ID_TWOMAN_QZNN */] = {
        preload: [
            ResManager.GROUP_NAME.SOUNDS_COMMON,
            ResManager.GROUP_NAME.CARDS,
            ResManager.GROUP_NAME.COMMON,
            ResManager.GROUP_NAME.GAME_COMMON,
            ResManager.GROUP_NAME.SOUNDS_GAME,
            ResManager.GROUP_NAME.NIUNIU,
            ResManager.GROUP_NAME.CARDS_NEW,
            "mushi_bg_music_mp3",
        ],
        lazyload: [
            ResManager.GROUP_NAME.NIUNIU_SOUNDS_LAZY,
            ResManager.GROUP_NAME.CHAT,
            ResManager.GROUP_NAME.NIUNIU_COMMON_SOUNDS,
        ]
    };
    ResManager.sceneResConfs[41 /* GAME_ID_HZ_BRNN */] = {
        preload: [
            ResManager.GROUP_NAME.SOUNDS_COMMON,
            ResManager.GROUP_NAME.CARDS,
            ResManager.GROUP_NAME.COMMON,
            ResManager.GROUP_NAME.GAME_COMMON,
            ResManager.GROUP_NAME.SOUNDS_GAME,
            ResManager.GROUP_NAME.BRNN,
            ResManager.GROUP_NAME.NIUNIU,
            // "mushi_bg_music_mp3",
            "brnn_bg_music_mp3",
            // "brnn_jinggao_mp3",
            // "nn_bet_chip_mp3",
            // "nn_timeout_mp3",
            // "zjh_chouma_1_png",
            "zjh_chouma_2_png",
            "zjh_chouma_3_png",
            "zjh_chouma_4_png",
            "zjh_chouma_5_png",
            "zjhChips_fnt",
        ],
        lazyload: [
            // GROUP_NAME.NIUNIU_SOUNDS_LAZY,
            ResManager.GROUP_NAME.BRNN_SOUNDS_LZY,
            ResManager.GROUP_NAME.CHAT,
            ResManager.GROUP_NAME.NIUNIU_COMMON_SOUNDS,
            "nnDealerReady_mp3",
        ]
    };
    ResManager.sceneResConfs[13 /* GOLD_DDZ */] = ResManager.sceneResConfs[3 /* DDZ */] = {
        preload: [
            ResManager.GROUP_NAME.SOUNDS_COMMON,
            ResManager.GROUP_NAME.CARDS,
            ResManager.GROUP_NAME.COMMON,
            ResManager.GROUP_NAME.GAME_COMMON,
            ResManager.GROUP_NAME.SOUNDS_GAME,
            ResManager.GROUP_NAME.DDZ,
            "ddz_bg_music_mp3",
        ],
        lazyload: [
            ResManager.GROUP_NAME.DDZ_SOUNDS_LAZY,
            ResManager.GROUP_NAME.CHAT,
        ]
    };
    ResManager.sceneResConfs[39 /* GAME_ID_GDMJ_FK */] = ResManager.sceneResConfs[40 /* GAME_ID_GDMJ_GOLD */] = {
        preload: [
            ResManager.GROUP_NAME.SOUNDS_COMMON,
            ResManager.GROUP_NAME.COMMON,
            ResManager.GROUP_NAME.GAME_COMMON,
            ResManager.GROUP_NAME.SOUNDS_GAME,
            ResManager.GROUP_NAME.MAJIANG,
            ResManager.GROUP_NAME.MJ_CARDS,
            "playingInGame_mp3"
        ], lazyload: [
            ResManager.GROUP_NAME.MAJIANG_SOUNDS_LAZY,
            ResManager.GROUP_NAME.CHAT,
        ]
    };
    /**
     * 初始化资源管理器
     */
    function init() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.loadConfig()];
                    case 1:
                        _a.sent(); //加载资源配置文件
                        initConf();
                        _eventDispatcher = new egret.EventDispatcher();
                        return [4 /*yield*/, initTheme(Main.instance.stage)];
                    case 2:
                        _a.sent(); //初始化eui
                        // RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResLoaded, null);
                        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, null);
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, null);
                        return [2 /*return*/];
                }
            });
        });
    }
    ResManager.init = init;
    function onResourceLoadComplete(event) {
        // let target = event.g
        completeGroupList[event.groupName] = true;
    }
    function onResourceLoadError(event) {
        completeGroupList[event.groupName] = true; //有资源加载不成功也当资源组加载成功
        egret.log("onResourceLoadError");
    }
    /**
     * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
     *
     * <br>可以监听 ResourceEvent.CONFIG_COMPLETE 事件来确认配置加载完成。
     * @param name 要创建的加载资源组的组名。
     * @param keys 要包含的键名列表，key 对应配置文件里的 name 属性或 sbuKeys 属性的一项或一个资源组名。
     * @param override 是否覆盖已经存在的同名资源组,默认 false。
     * @returns 是否创建成功。
     * @see #setMaxRetryTimes
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    function createGroup(name, keys, override) {
        // RES.createGroup(name, keys, override);
        var config = RES.manager.config.config;
        if ((!override && config.groups[name]) || !keys || keys.length == 0) {
            return false;
        }
        var group = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (config.groups[key]) {
                var g = config.groups[key];
                var len = g.length;
                for (var j = 0; j < len; j++) {
                    var item = g[j];
                    if (group.indexOf(item) == -1)
                        group.push(item);
                }
            }
            else {
                if (group.indexOf(key) === -1) {
                    group.push(key);
                }
            }
        }
        config.groups[name] = group;
        return true;
        // if ((!override && res.getGroupByName(name)) || !keys || keys.length == 0)
        // return false;
        // RES.ResourceConfig.
    }
    ResManager.createGroup = createGroup;
    function getResByUrl(key, type, compFunc, thisObject) {
        if (type === void 0) { type = ""; }
        if (!RES.hasRes(key)) {
            RES.$addResourceData({ name: key, type: type, url: key });
            var info = RES.getResourceInfo(key);
            info.extra = true;
            info.url = key;
        }
        return RES.getResAsync(key, compFunc, thisObject);
    }
    ResManager.getResByUrl = getResByUrl;
    function onResLoaded(event) {
        egret.log(event);
        if (event.resItem) {
            egret.log("onResLoaded:", event.groupName, event.resItem.name, event.resItem.url);
        }
    }
    /**
     * 初始化各场景资源加载组配置
     */
    function initConf() {
        for (var gameId in ResManager.sceneResConfs) {
            if (ResManager.sceneResConfs[gameId].preload && ResManager.sceneResConfs[gameId].preload.length) {
                ResManager.sceneResConfs[gameId].preGroupName = "sceneGroup" + gameId;
                createGroup(ResManager.sceneResConfs[gameId].preGroupName, ResManager.sceneResConfs[gameId].preload);
            }
            if (ResManager.sceneResConfs[gameId].lazyload && ResManager.sceneResConfs[gameId].lazyload.length) {
                ResManager.sceneResConfs[gameId].lazyGroupName = "sceneLazy" + gameId;
                createGroup(ResManager.sceneResConfs[gameId].lazyGroupName, ResManager.sceneResConfs[gameId].lazyload);
            }
        }
    }
    function initTheme(stage, version) {
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        return new Promise(function (resolve, reject) {
            var info = RES.getResourceInfo("default.thm.json");
            // let configPath = RES.resourceRoot + "/" + info.url;
            if (true) {
                var configPath = "resource/default.thm.json";
            }
            else {
                if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                    var configPath = "resource/default.thm.json?v=" + MAP_CONFIG;
                }
                else {
                    var configPath = "resource/default.thm.json";
                }
            }
            new eui.Theme(configPath).addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, null);
        });
    }
    function isGroupLoaded(groupName) {
        return completeGroupList[groupName] || RES.isGroupLoaded(groupName);
    }
    ResManager.isGroupLoaded = isGroupLoaded;
    function getResConf(sceneTag) {
        return ResManager.sceneResConfs[sceneTag];
    }
    ResManager.getResConf = getResConf;
    function addEventListener(type, listener, thisObject, useCapture, priority) {
        _eventDispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    }
    ResManager.addEventListener = addEventListener;
    function removeEventListener(type, listener, thisObject, useCapture) {
        _eventDispatcher.removeEventListener(type, listener, thisObject, useCapture);
    }
    ResManager.removeEventListener = removeEventListener;
})(ResManager || (ResManager = {}));
//# sourceMappingURL=ResManager.js.map