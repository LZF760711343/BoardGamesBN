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
var Config;
(function (Config) {
    ;
    Config.debug = false;
    Config.debugLogin = false;
    /**
     * 管理后台域名|IP
     */
    Config.MAG_SERVER = "http://www.hongzhegame.com";
    if (true) {
        Config.MAG_SERVER = "http://www.hongzhegame.com";
        Config.debug = true;
        Config.debugLogin = true;
    }
    /**
    * 微信公众号appid
    */
    Config.WX_APPID = "wx91a28c2d6fea4ca7";
    /**
    * 微信web应用appid
    */
    Config.WX_WEB_APPID = "wx27ec9cbbf959d3ab";
    Config.GAME_DOMAIN = "http://www.hongzhegame.com";
    // export const GAME_DOMAIN = "http://192.168.0.200";
    Config.SERVER_ID = "ww01";
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
    Config.SERVER_URL = "www.hongzhegame.com";
    if (Config.debug) {
        // MAG_SERVER = "http://www.hongzhegame.com";
        Config.MAG_SERVER = "http://192.168.0.200";
        // GAME_DOMAIN = "http://www.hongzhegame.com";
        Config.SERVER_ID = "ww02";
        // /**
        //  * 开发联调(辉哥的电脑)游戏服务器的地址
        //  */  
        Config.SERVER_URL = "192.168.0.200";
    }
    /**
     * 游戏服务器的端口
     */
    // export const SERVER_PORT = 10102;
    Config.SERVER_PORT = 10103;
    /**
     * 渠道号(在native是包的渠道号,web端是链接里面带的渠道号,这个渠道号不一定跟用户的渠道号一致)
     */
    Config.channel = "HZ";
    // export let channel = "123";
    Config.key = "boardgames";
    Config.URLS = {
        /**
         * app充值链接,用于获取充值参数
         */
        getRechargeUrl: Config.MAG_SERVER + "/QiDong/Game_pay/pay/order.php",
        /**
         * 获取游戏公告地址
         */
        getActUrl: Config.MAG_SERVER + "/QiDong/index.php/interface/Client/announcement",
        /**
        * 获取充值配置链接
        */
        getRechargeConfUrl: Config.MAG_SERVER + "/QiDong/index.php/interface/Client/gamePayconf",
        /**
         * 微信端公众号支付链接
         */
        weChatRechargeUrl: Config.MAG_SERVER + "/QiDong/WX_pay/pay/jsapi1.php",
        /**
         * 下载app的地址
         */
        downAppUrl: Config.GAME_DOMAIN + ("/" + Config.key + "/share/downShare.html"),
        /**
         * 分享链接
         */
        shareUrl: Config.GAME_DOMAIN + ("/" + Config.key + "/share/publicity.html"),
        h5GameUrl: Config.GAME_DOMAIN + ("/" + Config.key + "/web/index.html"),
        sendnote: Config.GAME_DOMAIN + "/QiDong/wx_login/sendmsg/SendMsg.php",
        sendverifynote: Config.GAME_DOMAIN + "/QiDong/wx_login/sendmsg/SendMsg_send2server.php",
        /**
         * 游客登录
         */
        VisitorsLoginUrl: "http://192.168.0.200/QiDong/Game_reg/tourist.php",
    };
    function init() {
    }
    Config.init = init;
    init();
    /**
     * 获取首冲礼包信息
     */
    function getFirstChargeInfo() {
        net.SendMsg.create({ isNowGet: 0 }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_GET_SHOUCHONG).send();
    }
    Config.getFirstChargeInfo = getFirstChargeInfo;
    /**
     * 获取游戏充值配置
     */
    function getRechargeConfig() {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, i, layer, error_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Global.requestDataAsync(Config.URLS.getRechargeConfUrl + "?serverid=" + Config.SERVER_ID, {})];
                    case 1:
                        response = _b.sent();
                        data = JSON.parse(response);
                        _a = [[], [], [], []], Global.charge_conf.diamond = _a[0], Global.charge_conf.gold = _a[1], Global.charge_conf.niucards = _a[2], Global.charge_conf.cards = _a[3];
                        for (i = 0; i < data.length; i++) {
                            if (data[i].buytype == 1 /* DIAMOND */) {
                                Global.charge_conf.diamond.push(data[i]);
                                egret.log("data[i].price" + data[i].price);
                            }
                            else if (data[i].buytype == 2 /* COIN */) {
                                Global.charge_conf.gold.push(data[i]);
                            }
                            else if (data[i].buytype == 3 /* CARD */) {
                                Global.charge_conf.cards.push(data[i]);
                            }
                            else {
                                Global.charge_conf.niucards.push(data[i]);
                            }
                        }
                        layer = Layers.getLayer(Layers.RechargeLayer);
                        if (layer) {
                            layer.update();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        egret.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    Config.getRechargeConfig = getRechargeConfig;
    /**
     * 获取游戏公告服务器获取玩数据返回
     */
    function getGameActConfig() {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Global.requestDataAsync(Config.URLS.getActUrl + "?serverid=" + Config.SERVER_ID, {})];
                    case 1:
                        response = _a.sent();
                        data = JSON.parse(response);
                        Global.activity_conf = data;
                        if (SceneManager.curScene.sceneTag === 43 /* SELECT */) {
                            SceneManager.curScene.OpenNoticeLayer();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        egret.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    Config.getGameActConfig = getGameActConfig;
    /**
     * 游戏配置,这个配置是在游戏后台配置,每次登陆游戏服务器会由服务器发送过来,根据这个配置决定那些游戏可以玩
     */
    Config.gameConf = {
        cardRoom: []
    };
    Config.gameConf.cardRoom[1 /* NIUNIU */] = [
        {
            gameId: 1 /* NIUNIU */,
            isHot: 0
        }
    ];
    Config.gameConf.cardRoom[3 /* DDZ */] = [
        {
            gameId: 3 /* DDZ */,
            isHot: 0,
        }
    ];
    Config.gameConf.cardRoom[10 /* ZJH */] = [
        {
            gameId: 10 /* ZJH */,
            isHot: 0,
        }
    ];
    Config.gameConf.cardRoom[5 /* DZ */] = [
        {
            gameId: 5 /* DZ */,
            isHot: 0,
        }
    ];
    Config.gameConf.cardRoom[38 /* GAME_ID_TWOMAN_QZNN */] = [
        {
            gameId: 38 /* GAME_ID_TWOMAN_QZNN */,
            isHot: 0,
        }
    ];
    Config.gameConf.cardRoom[39 /* GAME_ID_GDMJ_FK */] = [
        {
            gameId: 39 /* GAME_ID_GDMJ_FK */,
            isHot: 0,
        }
    ];
    //金币粒子动画配置表
    Config.coinsParticleConf = {
        "texture": "",
        "emitAngleVariance": 6,
        "minRadiusVariance": 10,
        "endSizeVariance": 0,
        "startRotation": 0,
        "duration": 2000,
        "startRotationVariance": 0,
        "startAlpha": 1,
        "endRotation": 263.58,
        "startRed": 255,
        "endRotationVariance": 292.07,
        "startAlphaVariance": 0,
        "startGreen": 255,
        "endAlpha": 1,
        "emitter": { "x": 0, "y": 0 },
        "speedVariance": 0,
        "maxParticles": 25,
        "endRed": 255,
        "startSize": 39,
        "blendFactorSource": "one",
        "gravity": { "x": 0, "y": 0 },
        "radialAcceleration": 0,
        "blendFactorDestination": "oneMinusSourceAlpha",
        "startBlue": 255,
        "radialAccelerationVariance": 0,
        "endBlueVariance": 0,
        "tangentialAcceleration": 0,
        "emitterVariance": { "x": 10, "y": 2 },
        "tangentialAccelerationVariance": 0,
        "endBlue": 255,
        "endAlphaVariance": 0,
        "maxRadiusVariance": 30,
        "lifespan": 1000,
        "engGreenVariance": 0,
        "minRadius": 20,
        "lifespanVariance": 0,
        "maxRadius": 100,
        "speed": 500,
        "endRedVariance": 0,
        "rotatePerSecond": 30,
        "startSizeVariance": 0,
        "rotatePerSecondVariance": 10,
        "endSize": 39,
        "startBlueVariance": 0,
        "endGreen": 255,
        "emitterType": 0,
        "startRedVariance": 0,
        "emitAngle": -45,
        "startGreenVariance": 0
    };
    Config.ROOM_CONF = {};
    Config.ROOM_CONF[3 /* DDZ */] = [{ playerCnt: 3, count: 8, cost: 3 }, { playerCnt: 3, count: 16, cost: 5 }];
    Config.ROOM_CONF[1 /* NIUNIU */] = [{ playerCnt: 5, count: 10, cost: 3 }, { playerCnt: 5, count: 20, cost: 6 }, { playerCnt: 8, count: 30, cost: 9 }, { playerCnt: 8, count: 30, cost: 2 }];
    Config.ROOM_CONF[10 /* ZJH */] = [{ playerCnt: 3, count: 8, cost: 3 }, { playerCnt: 3, count: 16, cost: 6 }, { playerCnt: 3, count: 26, cost: 9 }];
    Config.ROOM_CONF[39 /* GAME_ID_GDMJ_FK */] = [{ playerCnt: 3, count: 8, cost: 2 }, { playerCnt: 3, count: 16, cost: 3 }, { playerCnt: 3, count: 26, cost: 5 }];
    /**
     * 进房金币限制条件
     */
    Config.DropGameList = [];
    function initGameRoomConfig() {
        //初始化
        var ddzRoom = ConfigDefManager.GameConfigs[GAMECONFIGS.GAMEROOMGLOLD].getDataByName("GameID", 13 /* GOLD_DDZ */);
        var niuniuRoom = ConfigDefManager.GameConfigs[GAMECONFIGS.GAMEROOMGLOLD].getDataByName("GameID", 9 /* QZNN */);
        var zjhRoom = ConfigDefManager.GameConfigs[GAMECONFIGS.GAMEROOMGLOLD].getDataByName("GameID", 11 /* GOLD_ZJH */);
        var mjRoom = ConfigDefManager.GameConfigs[GAMECONFIGS.GAMEROOMGLOLD].getDataByName("GameID", 40 /* GAME_ID_GDMJ_GOLD */);
        Config.DropGameList[9 /* QZNN */] = [{ minPlay: niuniuRoom.chuJi_minPlay, maxPlay: niuniuRoom.chuJi_maxPlay }, { minPlay: niuniuRoom.zhongJi_minPlay, maxPlay: niuniuRoom.zhongJi_maxPlay }, { minPlay: niuniuRoom.gaoJi_minPlay, maxPlay: niuniuRoom.gaoJi_maxPlay }];
        Config.DropGameList[11 /* GOLD_ZJH */] = [{ minPlay: zjhRoom.chuJi_minPlay, maxPlay: zjhRoom.chuJi_maxPlay }, { minPlay: zjhRoom.zhongJi_minPlay, maxPlay: zjhRoom.zhongJi_maxPlay }, { minPlay: zjhRoom.gaoJi_minPlay, maxPlay: zjhRoom.gaoJi_maxPlay }];
        Config.DropGameList[40 /* GAME_ID_GDMJ_GOLD */] = [{ minPlay: mjRoom.chuJi_minPlay, maxPlay: mjRoom.chuJi_maxPlay }, { minPlay: mjRoom.zhongJi_minPlay, maxPlay: mjRoom.zhongJi_maxPlay }, { minPlay: mjRoom.gaoJi_minPlay, maxPlay: mjRoom.gaoJi_maxPlay }];
        Config.DropGameList[13 /* GOLD_DDZ */] = [{ minPlay: ddzRoom.chuJi_minPlay, maxPlay: ddzRoom.chuJi_maxPlay }, { minPlay: ddzRoom.zhongJi_minPlay, maxPlay: ddzRoom.zhongJi_maxPlay }, { minPlay: ddzRoom.gaoJi_minPlay, maxPlay: ddzRoom.gaoJi_maxPlay }];
    }
    Config.initGameRoomConfig = initGameRoomConfig;
    // DropGameList[GAME_ID.QZNN]=DropGameList[GAME_ID.GOLD_ZJH]=[{minPlay:10000,maxPlay: 300000},{minPlay:300000,maxPlay: 1000000},{minPlay:1000000,maxPlay: 0}];
    // DropGameList[GAME_ID.GAME_ID_GDMJ_GOLD]=[{minPlay:2000,maxPlay: 300000},{minPlay:300000,maxPlay: 1000000},{minPlay:10000000,maxPlay: 0}];
    // DropGameList[GAME_ID.GOLD_DDZ]=[{minPlay:2000,maxPlay: 0},{minPlay:50000,maxPlay: 0},{minPlay:200000,maxPlay: 0}];
    // 选择游戏等级进入房间条件
    // export const gameNameMapList= [];
    // gameNameMapList[GAME_ID.QZNN]=gameNameMapList[GAME_ID.GOLD_ZJH]=["1W-30W","30W-100W","100W以上"];
    // gameNameMapList[GAME_ID.GAME_ID_GDMJ_GOLD]=["2000","300000","1000000"];
    // gameNameMapList[GAME_ID.GOLD_DDZ]=["2千","5W","20W"];
})(Config || (Config = {}));
//# sourceMappingURL=Config.js.map