namespace ResManager {
	/**
	 *
	 * @author He
	 *资源加载管理类,用于管理游戏中各种资源的加载
	 */
    /**
     * 所有资源加载组的组名
     */
    export const GROUP_NAME = {
        LOGIN: "login",//游戏登陆界面所需资源的资源组
        /**
         * 游戏的一些通用的一些资源
         */
        COMMON: "common",
        HALL: "hall",//游戏大厅的资源
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
        NIUNIU_COMMON_SOUNDS:"niuniuCommonSounds"
    }
    let _eventDispatcher: egret.EventDispatcher;
    let completeGroupList = {};
    export let sceneResConfs: SceneResConf[] = [];
    sceneResConfs[GAME_ID.LOGIN] = {
        preload: [GROUP_NAME.LOGIN],
        // lazyGroupName: "sceneGroup" + GAME_ID.SELECT
    };
    sceneResConfs[GAME_ID.SELECT] = {
        preload: [
            GROUP_NAME.SOUNDS_COMMON,
            GROUP_NAME.HALL,
            GROUP_NAME.COMMON,
            // GROUP_NAME.bq,
            // GROUP_NAME.HALLSMALLSET,
        ],
    };
    sceneResConfs[GAME_ID.GOLD_ZJH] = sceneResConfs[GAME_ID.ZJH] = {
        preload: [
            GROUP_NAME.SOUNDS_COMMON,
            GROUP_NAME.CARDS,
            GROUP_NAME.COMMON,
            GROUP_NAME.GAME_COMMON,
            GROUP_NAME.SOUNDS_GAME,
            "music_zjh_bg_mp3",
            GROUP_NAME.ZJH,
            GROUP_NAME.CARDS_NEW,
        ],
        lazyload: [
            GROUP_NAME.ZJH_SOUND_LAZY,
            GROUP_NAME.CHAT,
        ]
    };
    sceneResConfs[GAME_ID.QZNN] = sceneResConfs[GAME_ID.NIUNIU] = sceneResConfs[GAME_ID.GAME_ID_TWOMAN_QZNN] = {
        preload: [
            GROUP_NAME.SOUNDS_COMMON,
            GROUP_NAME.CARDS,
            GROUP_NAME.COMMON,
            GROUP_NAME.GAME_COMMON,
            GROUP_NAME.SOUNDS_GAME,
            GROUP_NAME.NIUNIU,
            GROUP_NAME.CARDS_NEW,
            "mushi_bg_music_mp3",
        ],
        lazyload: [
            GROUP_NAME.NIUNIU_SOUNDS_LAZY,
            GROUP_NAME.CHAT,
            GROUP_NAME.NIUNIU_COMMON_SOUNDS,
        ]
    };
    sceneResConfs[GAME_ID.GAME_ID_HZ_BRNN] = {
        preload: [
            GROUP_NAME.SOUNDS_COMMON,
            GROUP_NAME.CARDS,
            GROUP_NAME.COMMON,
            GROUP_NAME.GAME_COMMON,
            GROUP_NAME.SOUNDS_GAME,
            GROUP_NAME.BRNN,
            GROUP_NAME.NIUNIU,
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
            GROUP_NAME.BRNN_SOUNDS_LZY,
            GROUP_NAME.CHAT,
            GROUP_NAME.NIUNIU_COMMON_SOUNDS,
            "nnDealerReady_mp3",
        ]
    };
    sceneResConfs[GAME_ID.GOLD_DDZ] = sceneResConfs[GAME_ID.DDZ] = {
        preload: [
            GROUP_NAME.SOUNDS_COMMON,
            GROUP_NAME.CARDS,
            GROUP_NAME.COMMON,
            GROUP_NAME.GAME_COMMON,
            GROUP_NAME.SOUNDS_GAME,
            GROUP_NAME.DDZ,
            "ddz_bg_music_mp3",
            // GROUP_NAME.NIUNIU,
        ],
        lazyload: [
            GROUP_NAME.DDZ_SOUNDS_LAZY,
            GROUP_NAME.CHAT,
        ]
    };
    sceneResConfs[GAME_ID.GAME_ID_GDMJ_FK] = sceneResConfs[GAME_ID.GAME_ID_GDMJ_GOLD] = {
        preload: [
            GROUP_NAME.SOUNDS_COMMON,
            GROUP_NAME.COMMON,
            GROUP_NAME.GAME_COMMON,
            GROUP_NAME.SOUNDS_GAME,
            GROUP_NAME.MAJIANG,
            GROUP_NAME.MJ_CARDS,
            "playingInGame_mp3"
        ], lazyload: [
            GROUP_NAME.MAJIANG_SOUNDS_LAZY,
            GROUP_NAME.CHAT,
        ]
    };
    /**
     * 初始化资源管理器
     */
    export async function init() {
        await RES.loadConfig();//加载资源配置文件
        initConf();
        _eventDispatcher = new egret.EventDispatcher();
        await initTheme(Main.instance.stage);//初始化eui
        // RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResLoaded, null);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, null);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, null);
    }
    function onResourceLoadComplete(event: RES.ResourceEvent) {
        // let target = event.g
        completeGroupList[event.groupName] = true;
    }
    function onResourceLoadError(event: RES.ResourceEvent) {
        completeGroupList[event.groupName] = true;//有资源加载不成功也当资源组加载成功
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
    export function createGroup(name: string, keys: Array<string>, override?: boolean) {
        // RES.createGroup(name, keys, override);
        let config = RES.manager.config.config;
        if ((!override && config.groups[name]) || !keys || keys.length == 0) {
            return false;
        }
        let group: string[] = [];
        for (let key of keys) {
            if (config.groups[key]) {
                let g = config.groups[key];
                let len: number = g.length;
                for (let j: number = 0; j < len; j++) {
                    let item: any = g[j];
                    if (group.indexOf(item) == -1)
                        group.push(item);
                }
                // if (group.indexOf(groupInfo) === -1) {
                //     group = group.concat(groupInfo);
                // }
            }
            else {
                if (group.indexOf(key) === -1) {
                    group.push(key);
                }
                // group = group.concat(key);
            }
        }
        config.groups[name] = group;
        return true;
        // if ((!override && res.getGroupByName(name)) || !keys || keys.length == 0)
        // return false;
        // RES.ResourceConfig.
    }
    export function getResByUrl(key: string, type?: string): Promise<any>;
    export function getResByUrl(key: string, type?: string, compFunc?: RES.GetResAsyncCallback, thisObject?: any): void;
    export function getResByUrl(key: string, type: string = "", compFunc?: RES.GetResAsyncCallback, thisObject?: any): void | Promise<any> {
        if (!RES.hasRes(key)) {
            RES.$addResourceData({ name: key, type: type, url: key });
            let info: RES.ResourceInfo = RES.getResourceInfo(key);
            info.extra = true;
            info.url = key;
        }
        return RES.getResAsync(key, compFunc, thisObject);
    }
    function onResLoaded(event: RES.ResourceEvent) {
        egret.log(event);
        if (event.resItem) {
            egret.log("onResLoaded:", event.groupName, event.resItem.name, event.resItem.url);
        }

    }
    /**
     * 初始化各场景资源加载组配置
     */
    function initConf() {
        for (let gameId in sceneResConfs) {
            if (sceneResConfs[gameId].preload && sceneResConfs[gameId].preload.length) {
                sceneResConfs[gameId].preGroupName = "sceneGroup" + gameId;
                createGroup(sceneResConfs[gameId].preGroupName, sceneResConfs[gameId].preload);
            }
            if (sceneResConfs[gameId].lazyload && sceneResConfs[gameId].lazyload.length) {
                sceneResConfs[gameId].lazyGroupName = "sceneLazy" + gameId;
                createGroup(sceneResConfs[gameId].lazyGroupName, sceneResConfs[gameId].lazyload);
            }
        }
    }
    function initTheme(stage: egret.Stage, version?) {
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        return new Promise((resolve, reject) => {
            let info = RES.getResourceInfo("default.thm.json");
            // let configPath = RES.resourceRoot + "/" + info.url;
            if (DEBUG) {
                var configPath = "resource/default.thm.json";
            } else {
                if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                    var configPath = "resource/default.thm.json?v=" + MAP_CONFIG;
                } else {
                    var configPath = "resource/default.thm.json";
                }
            }
            new eui.Theme(configPath).addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, null);
        })
    }
    export function isGroupLoaded(groupName: string) {
        return completeGroupList[groupName] || RES.isGroupLoaded(groupName);
    }
    export function getResConf(sceneTag: GAME_ID) {
        return sceneResConfs[sceneTag];
    }
    export function addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number) {
        _eventDispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    }
    export function removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean) {
        _eventDispatcher.removeEventListener(type, listener, thisObject, useCapture);
    }
    export interface SceneResConf {
        /**
         * 该场景所需要预加载的资源组,如果有,这里面的资源子会被合并为一个资源组,
         * 并且在initGameResGroup函数里面,会自动检测是否有对应的"imgs"+key,"sounds"+keys的资源组,
         * 如果有的话,会将这些资源组也加入这个生成的资源组里面,
         * 生成的资源组名会加入dependGroups里面
         */
        preload: string[],
        /**
         * 需要延迟加载的资源组,这里面的资源组会被合并为一个资源组,合并的资源组名为"lazy"+对应的key值
         */
        lazyload?: string[],

        /**
         * 进入该场景所需要加载完成的资源组,只有这个资源组的资源都加载完成之后才进入相应场景,否则显示资源加载场景
         */
        preGroupName?: string,
        /**
         * 延迟加载组的组名
         */
        lazyGroupName?: string;
        /**
         * 资源是否已经都加载完成
         */
        isLoaded?: boolean;
    }
}
