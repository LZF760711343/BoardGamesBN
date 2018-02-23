namespace Config {
    const enum LOGIN_TYPE {

    };
    export let debug = false;
    export let debugLogin = false;

    /**
     * 管理后台域名|IP
     */

    export let MAG_SERVER = "http://www.hongzhegame.com";

    if (DEBUG) {
        MAG_SERVER = "http://www.hongzhegame.com";
        debug = true;
        debugLogin = true;
    }
    /**
    * 微信公众号appid
    */
    export let WX_APPID = "wx91a28c2d6fea4ca7";
    /**
    * 微信web应用appid
    */
    export let WX_WEB_APPID = "wx27ec9cbbf959d3ab";


    export const GAME_DOMAIN = "http://www.hongzhegame.com";
    // export const GAME_DOMAIN = "http://192.168.0.200";

    export let SERVER_ID = "ww01";
    /**
     * 开发联调(辉哥的电脑)游戏服务器的地址 
     */
    // export const SERVER_URL = "192.168.0.193";
    /**
     * 内网测试服务器地址
     */
    // export const SERVER_URL = "192.168.0.200";
    /**
     * 正式服务器地址
     */

    export let SERVER_URL = "www.hongzhegame.com"

    if (debug) {
        // MAG_SERVER = "http://www.hongzhegame.com";
        MAG_SERVER = "http://192.168.0.200";
        // GAME_DOMAIN = "http://www.hongzhegame.com";
        SERVER_ID = "ww02"
        // /**
        //  * 开发联调(辉哥的电脑)游戏服务器的地址
        //  */  
        SERVER_URL = "192.168.0.200";
        // SERVER_URL = "192.168.0.182";
        // SERVER_URL = "192.168.0.282";
        /**
         * 内网测试服务器地址
         */
        // SERVER_URL = "192.168.0.200";

        // WX_APPID = "wx1c8ae50de2082be2";
        // WX_APPID = "wx91a28c2d6fea4ca7";
        // WX_WEB_APPID = "wx27ec9cbbf959d3ab";
    }
    /**
     * 游戏服务器的端口
     */
    // export const SERVER_PORT = 10102;
    export let SERVER_PORT = 10103;

    // private _loginIp: string = "192.168.0.193";//游戏登陆服务器ip
    // private _loginIp: string = "192.168.0.200";//游戏登陆服务器ip	
    // 		// private _loginIp: string = "119.23.10.226";//游戏登陆服务器ip
    // 		private _loginPort: number = 10102;//游戏登陆服务器端口
    // 		// private _loginPort: number = 10101;//游戏登陆服务器端口

    /**
     * 包的版本号
     * @platform Native
     */
    export let nativeVersion;
    /**
     * 渠道号(在native是包的渠道号,web端是链接里面带的渠道号,这个渠道号不一定跟用户的渠道号一致)
     */
    export let channel = "HZ";
    // export let channel = "123";
    export let key = "boardgames";
    export const URLS = {
        /**
         * app充值链接,用于获取充值参数
         */
        getRechargeUrl: MAG_SERVER + "/QiDong/Game_pay/pay/order.php",
        /**
         * 获取游戏公告地址
         */
        getActUrl: MAG_SERVER + "/QiDong/index.php/interface/Client/announcement",
        /**
        * 获取充值配置链接
        */
        getRechargeConfUrl: MAG_SERVER + "/QiDong/index.php/interface/Client/gamePayconf",
        /**
         * 微信端公众号支付链接
         */
        weChatRechargeUrl: MAG_SERVER + "/QiDong/WX_pay/pay/jsapi1.php",
        /**
         * 下载app的地址
         */
        downAppUrl: GAME_DOMAIN + `/${key}/share/downShare.html`,
        /**
         * 分享链接
         */
        shareUrl: GAME_DOMAIN + `/${key}/share/publicity.html`,
        h5GameUrl: GAME_DOMAIN + `/${key}/web/index.html`,
        sendnote: GAME_DOMAIN + `/QiDong/wx_login/sendmsg/SendMsg.php`,
        sendverifynote: GAME_DOMAIN + `/QiDong/wx_login/sendmsg/SendMsg_send2server.php`,
        /**
         * 游客登录
         */
        VisitorsLoginUrl: "http://192.168.0.200/QiDong/Game_reg/tourist.php",
    }

    export function init() {
    }
    init();
    /**
     * 获取首冲礼包信息
     */
    export function getFirstChargeInfo() {
        net.SendMsg.create({ isNowGet: 0 }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GET_SHOUCHONG).send();
    }
    /**
     * 获取游戏充值配置
     */
    export async function getRechargeConfig() {
        try {
            let response = await Global.requestDataAsync(URLS.getRechargeConfUrl + "?serverid=" + SERVER_ID, {});
            let data: model.CharegConfItem[] = JSON.parse(response);
            [
                Global.charge_conf.diamond,
                Global.charge_conf.gold,
                Global.charge_conf.niucards,
                Global.charge_conf.cards
            ] = [[], [], [], []]
            for (let i = 0; i < data.length; i++) {
                if (data[i].buytype == CURRENCY_TYPE.DIAMOND) {
                    Global.charge_conf.diamond.push(data[i]);
                    egret.log("data[i].price" + data[i].price)
                } else if (data[i].buytype == CURRENCY_TYPE.COIN) {
                    Global.charge_conf.gold.push(data[i]);
                } else if (data[i].buytype == CURRENCY_TYPE.CARD) {
                    Global.charge_conf.cards.push(data[i]);
                } else {
                    Global.charge_conf.niucards.push(data[i]);
                }
            }
            let layer = <Layers.RechargeLayer>Layers.getLayer(Layers.RechargeLayer);
            if (layer) {
                layer.update();
            }
        } catch (error) {
            egret.log(error);
        }
    }

    /**
     * 获取游戏公告服务器获取玩数据返回
     */
    export async function getGameActConfig() {
        try {
            let response = await Global.requestDataAsync(URLS.getActUrl + "?serverid=" + SERVER_ID, {});
            let data: model.GameActConfTtem[] = JSON.parse(response);
            Global.activity_conf = data;
            if (SceneManager.curScene.sceneTag === GAME_ID.SELECT) {
                (<SelectScene>SceneManager.curScene).OpenNoticeLayer();
            }
        } catch (error) {
            egret.log(error);
        }
    }


    /**
     * 游戏配置,这个配置是在游戏后台配置,每次登陆游戏服务器会由服务器发送过来,根据这个配置决定那些游戏可以玩
     */
    export let gameConf: model.GameConf = {
        cardRoom: [
        ]
    }
    gameConf.cardRoom[GAME_ID.NIUNIU] = [
        {
            gameId: GAME_ID.NIUNIU,
            isHot: 0
        }
    ]

    gameConf.cardRoom[GAME_ID.DDZ] = [
        {
            gameId: GAME_ID.DDZ,
            isHot: 0,
        }
    ]

    gameConf.cardRoom[GAME_ID.ZJH] = [
        {
            gameId: GAME_ID.ZJH,
            isHot: 0,
        }
    ]

    gameConf.cardRoom[GAME_ID.DZ] = [
        {
            gameId: GAME_ID.DZ,
            isHot: 0,
        }
    ]
    gameConf.cardRoom[GAME_ID.GAME_ID_TWOMAN_QZNN] = [
        {
            gameId: GAME_ID.GAME_ID_TWOMAN_QZNN,
            isHot: 0,
        }
    ]
    gameConf.cardRoom[GAME_ID.GAME_ID_GDMJ_FK] = [
        {
            gameId: GAME_ID.GAME_ID_GDMJ_FK,
            isHot: 0,
        }
    ]

    //金币粒子动画配置表
    export var coinsParticleConf = {
        "texture": "",
        "emitAngleVariance": 6
        , "minRadiusVariance": 10
        , "endSizeVariance": 0
        , "startRotation": 0
        , "duration": 2000
        , "startRotationVariance": 0
        , "startAlpha": 1
        , "endRotation": 263.58
        , "startRed": 255
        , "endRotationVariance": 292.07
        , "startAlphaVariance": 0
        , "startGreen": 255
        , "endAlpha": 1
        , "emitter": { "x": 0, "y": 0 }
        , "speedVariance": 0
        , "maxParticles": 25
        , "endRed": 255
        , "startSize": 39
        , "blendFactorSource": "one"
        , "gravity": { "x": 0, "y": 0 }
        , "radialAcceleration": 0
        , "blendFactorDestination": "oneMinusSourceAlpha"
        , "startBlue": 255
        , "radialAccelerationVariance": 0
        , "endBlueVariance": 0
        , "tangentialAcceleration": 0
        , "emitterVariance": { "x": 10, "y": 2 }
        , "tangentialAccelerationVariance": 0
        , "endBlue": 255
        , "endAlphaVariance": 0
        , "maxRadiusVariance": 30
        , "lifespan": 1000
        , "engGreenVariance": 0
        , "minRadius": 20
        , "lifespanVariance": 0
        , "maxRadius": 100
        , "speed": 500
        , "endRedVariance": 0
        , "rotatePerSecond": 30
        , "startSizeVariance": 0
        , "rotatePerSecondVariance": 10
        , "endSize": 39
        , "startBlueVariance": 0
        , "endGreen": 255
        , "emitterType": 0
        , "startRedVariance": 0
        , "emitAngle": -45
        , "startGreenVariance": 0
    }

    export let ROOM_CONF = {};
    ROOM_CONF[GAME_ID.DDZ] = [{ playerCnt: 3, count: 8, cost: 3 }, { playerCnt: 3, count: 16, cost: 5 }];
    ROOM_CONF[GAME_ID.NIUNIU] = [{ playerCnt: 5, count: 10, cost: 3 }, { playerCnt: 5, count: 20, cost: 6 }, { playerCnt: 8, count: 30, cost: 9 }, { playerCnt: 8, count: 30, cost: 2 }];
    ROOM_CONF[GAME_ID.ZJH] = [{ playerCnt: 3, count: 8, cost: 3 }, { playerCnt: 3, count: 16, cost: 6 }, { playerCnt: 3, count: 26, cost: 9 }];
    ROOM_CONF[GAME_ID.GAME_ID_GDMJ_FK] = [{ playerCnt: 3, count: 8, cost: 2 }, { playerCnt: 3, count: 16, cost: 3 }, { playerCnt: 3, count: 26, cost: 5 }];

    /**
     * 进房金币限制条件
     */
    export const DropGameList: { minPlay: number, maxPlay: number }[][] = [];
    export function initGameRoomConfig() {
        //初始化
        let ddzRoom: GameRoomGloldConfig = ConfigDefManager.GameConfigs[GAMECONFIGS.GAMEROOMGLOLD].getDataByName("GameID", GAME_ID.GOLD_DDZ);
        let niuniuRoom: GameRoomGloldConfig = ConfigDefManager.GameConfigs[GAMECONFIGS.GAMEROOMGLOLD].getDataByName("GameID", GAME_ID.QZNN);
        let zjhRoom: GameRoomGloldConfig = ConfigDefManager.GameConfigs[GAMECONFIGS.GAMEROOMGLOLD].getDataByName("GameID", GAME_ID.GOLD_ZJH);
        let mjRoom: GameRoomGloldConfig = ConfigDefManager.GameConfigs[GAMECONFIGS.GAMEROOMGLOLD].getDataByName("GameID", GAME_ID.GAME_ID_GDMJ_GOLD);
        DropGameList[GAME_ID.QZNN] = [{ minPlay: niuniuRoom.chuJi_minPlay, maxPlay: niuniuRoom.chuJi_maxPlay }, { minPlay: niuniuRoom.zhongJi_minPlay, maxPlay: niuniuRoom.zhongJi_maxPlay }, { minPlay: niuniuRoom.gaoJi_minPlay, maxPlay: niuniuRoom.gaoJi_maxPlay }];
        DropGameList[GAME_ID.GOLD_ZJH] = [{ minPlay: zjhRoom.chuJi_minPlay, maxPlay: zjhRoom.chuJi_maxPlay }, { minPlay: zjhRoom.zhongJi_minPlay, maxPlay: zjhRoom.zhongJi_maxPlay }, { minPlay: zjhRoom.gaoJi_minPlay, maxPlay: zjhRoom.gaoJi_maxPlay }];
        DropGameList[GAME_ID.GAME_ID_GDMJ_GOLD] = [{ minPlay: mjRoom.chuJi_minPlay, maxPlay: mjRoom.chuJi_maxPlay }, { minPlay: mjRoom.zhongJi_minPlay, maxPlay: mjRoom.zhongJi_maxPlay }, { minPlay: mjRoom.gaoJi_minPlay, maxPlay: mjRoom.gaoJi_maxPlay }];
        DropGameList[GAME_ID.GOLD_DDZ] = [{ minPlay: ddzRoom.chuJi_minPlay, maxPlay: ddzRoom.chuJi_maxPlay }, { minPlay: ddzRoom.zhongJi_minPlay, maxPlay: ddzRoom.zhongJi_maxPlay }, { minPlay: ddzRoom.gaoJi_minPlay, maxPlay: ddzRoom.gaoJi_maxPlay }];
    }
    // DropGameList[GAME_ID.QZNN]=DropGameList[GAME_ID.GOLD_ZJH]=[{minPlay:10000,maxPlay: 300000},{minPlay:300000,maxPlay: 1000000},{minPlay:1000000,maxPlay: 0}];
    // DropGameList[GAME_ID.GAME_ID_GDMJ_GOLD]=[{minPlay:2000,maxPlay: 300000},{minPlay:300000,maxPlay: 1000000},{minPlay:10000000,maxPlay: 0}];
    // DropGameList[GAME_ID.GOLD_DDZ]=[{minPlay:2000,maxPlay: 0},{minPlay:50000,maxPlay: 0},{minPlay:200000,maxPlay: 0}];

    // 选择游戏等级进入房间条件
    // export const gameNameMapList= [];
    // gameNameMapList[GAME_ID.QZNN]=gameNameMapList[GAME_ID.GOLD_ZJH]=["1W-30W","30W-100W","100W以上"];
    // gameNameMapList[GAME_ID.GAME_ID_GDMJ_GOLD]=["2000","300000","1000000"];
    // gameNameMapList[GAME_ID.GOLD_DDZ]=["2千","5W","20W"];
}