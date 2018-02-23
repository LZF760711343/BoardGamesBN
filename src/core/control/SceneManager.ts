// TypeScript file
namespace SceneManager {
    let sceneMaps = {};
    sceneMaps[GAME_ID.LOGIN] = LoginScene;
    sceneMaps[GAME_ID.SELECT] = SelectScene;
    sceneMaps[GAME_ID.QZNN] = sceneMaps[GAME_ID.NIUNIU] = sceneMaps[GAME_ID.GAME_ID_TWOMAN_QZNN] = niuniu.GameScene;
    sceneMaps[GAME_ID.GAME_ID_HZ_BRNN] = niuniu.brnn.GameScene;
    sceneMaps[GAME_ID.GOLD_ZJH] = sceneMaps[GAME_ID.ZJH] = zjh.GameScene;
    sceneMaps[GAME_ID.GOLD_DDZ] = sceneMaps[GAME_ID.DDZ] = DDZ.GameScene;

    sceneMaps[GAME_ID.GAME_ID_GDMJ_FK] = sceneMaps[GAME_ID.GAME_ID_GDMJ_GOLD] = majiang.GameScene;
    // sceneMaps[GAME_ID.GAME_ID_TWOMAN_QZNN] = sceneMaps[GAME_ID.DDZ] = DDZ.GameScene;

    export let curScene: BaseScene;
    // export let curResConf: ResManager.SceneResConf
    export let loadScene: LoginScene;
    //注册屏幕旋转事件
    // Main.instance.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, onOrientationChange, null);
    /**
     * 屏幕旋转回调
     */
    function onOrientationChange() {
        if (curScene) {
            curScene.onOrientationChange();
        }
    }
    export function loadGroup(conf: ResManager.SceneResConf) {
        let isGroupNotLoaded = !ResManager.isGroupLoaded(conf.preGroupName);
        if ((conf.preGroupName && isGroupNotLoaded)
            || net.getServerType() !== net.SERVER_TYPE.GAME
        ) {
            pushScene(loadScene);
            if (isGroupNotLoaded) {
                RES.loadGroup(conf.preGroupName, RES_PRIORITY.SCENE, loadScene);
            }
            egret.log("conf.preGroupName:", conf.preGroupName)
            return loadScene.waitReady(conf.preGroupName);//等待加载该场景需要加载的预加载资源组
        }
        return null;
    }
    /**
     * 打开一个场景
     * @param sceneTag:{GAME_ID}场景的id
     * @param callback:成功打开场景后的回调函数
     * @param target:回调函数this指向的对象
     * @param args:不定参数列表
     */
    export async function runScene(sceneTag: GAME_ID, callback?: Function, target?, ...args) {
        let scene: BaseScene;
        let conf: ResManager.SceneResConf = ResManager.getResConf(sceneTag);
        egret.log("runScene:" + GameLangs.gameNameMaps[sceneTag] + "  ,sceneTag:" + sceneTag);
        if (sceneTag == GAME_ID.LOGIN) {
            if (conf.preGroupName && !ResManager.isGroupLoaded(conf.preGroupName)) {
                await RES.loadGroup(conf.preGroupName, RES_PRIORITY.SCENE);//加载登陆界面资源组
                Toast.init(Main.instance);
            }
            if (!loadScene) {
                loadScene = new sceneMaps[sceneTag](args);
            } else {
                loadScene.init(args && args[0]);
                loadScene.sceneTag = sceneTag;
            }
            scene = loadScene;
        } else {
            let temp = loadGroup(conf);
            if (temp) {
                await temp;//等待加载该场景需要加载的预加载资源组
            }
            scene = new sceneMaps[sceneTag](args);
            scene.sceneTag = sceneTag;
        }
        pushScene(scene);
        if (callback) {
            callback.call(target, scene)
        }
        if (conf.lazyGroupName && !ResManager.isGroupLoaded(conf.lazyGroupName)) {
            RES.loadGroup(conf.lazyGroupName, RES_PRIORITY.LAZYLOAD);//加载延迟加载的资源组
        }

    }

    function pushScene(scene: BaseScene) {
        if (curScene && curScene.parent)
            Main.instance.removeChild(curScene);
        curScene = scene;
        Main.instance.addChildAt(scene, 0);
        // this._scenesStack.push(scene);
        // if (typeof DebugLayer.instance != "undefined" && DebugLayer.instance) {
        //     this.setChildIndex(DebugLayer.instance, 9999);
        // }
    }
    // export let curSceneSupportRes
}