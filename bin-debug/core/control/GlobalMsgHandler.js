var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * 用于处理全局性消息
 */
var GlobalMsgHandler = (function () {
    function GlobalMsgHandler() {
        GlobalMsgHandler.instance = this;
    }
    GlobalMsgHandler.prototype.on_ALL2C_STR_ERROR = function (msg) {
        Toast.launch(msg.datas.content);
        // {"result":-1,"content":"金币不足以下此注"}
    };
    // 剩余福利补贴次数
    GlobalMsgHandler.prototype.on_G2C_HAS_POCHAN_COUNT = function (msg) {
        Global.getPoChanNumber = msg.datas.todayAskPochan;
    };
    /**
     * 钻石兑换房卡成功返回
     */
    GlobalMsgHandler.prototype.on_G2C_UPDATE_PLAYER_FANGKA = function (msg) {
        Global.playerDto.fangkaCount = msg.datas.fangkaCount;
        // Toast.launch(GameLangs.buySuccess);
        return 1 /* NEXT */;
    };
    /**
     * 充值成功通知
     */
    GlobalMsgHandler.prototype.on_G2C_GET_CHONGZHI = function (msg) {
        Toast.launch(GameLangs.buySuccess);
        if (Global.playerDto.rmb <= 2) {
            new Layers.FirstGiftLayer().open();
        }
    };
    /**
     * 获得首冲礼包
     */
    GlobalMsgHandler.prototype.on_G2C_GET_SHOUCHONG = function (msg) {
        Global.charge_conf.isGetFirstCharge = msg.datas.isShouchongSecced;
        if (msg.datas.result === 0) {
            if (msg.datas.addGold || msg.datas.addDiamond) {
                var list = [];
                if (msg.datas.addGold) {
                    list.push({ icon: "jb_icon3_png", label: msg.datas.addGold + GameLangs.jinbi });
                }
                if (msg.datas.addDiamond) {
                    list.push({ icon: "zs_icon3_png", label: msg.datas.addDiamond + GameLangs.zuanshi });
                }
                Main.instance.addChild(new GetGiftAni(list));
                var layer = Layers.getLayer(Layers.FirstGiftLayer);
                if (layer) {
                    layer.close();
                }
            }
        }
        else {
            if (SceneManager.curScene.sceneTag === 43 /* SELECT */) {
                // new Layers.RechargeLayer(1).open();
                var num = Global.charge_conf.diamond;
                for (var i = 0; i < num.length; i++) {
                    if (num[i].price == 8) {
                        nest.pay(num[i].pid, LocalDatas.datas.datas.unionid, LocalDatas.datas.datas.openid, GameLangs.rechargeDiamondBody.format(num[i].buy));
                    }
                }
            }
        }
        if (SceneManager.curScene.sceneTag === 43 /* SELECT */) {
            SceneManager.curScene.updateFirstGiftBtn();
        }
    };
    /**
         * 收到弹窗提示
         */
    GlobalMsgHandler.prototype.on_G2C_NORMAL_TIPS = function (msg) {
        var alert = Layers.HintLayer.create();
        alert.init({ tipsStr: msg.datas.content || msg.datas.tipsStr, curState: Layers.HintLayer.SURE2 });
        alert.open();
    };
    /**
     * 修改头像返回
     */
    GlobalMsgHandler.prototype.on_G2C_UPDATE_HEAD_IMAGES = function (msg) {
        Global.playerDto.headImages = msg.datas.headImages + "?v=" + Date.now();
        return 1 /* NEXT */;
    };
    /**
        * 打开充值页面
        */
    GlobalMsgHandler.prototype.openRechargeLayer = function () {
        new Layers.RechargeLayer(0).open();
    };
    /**
         * 收到充值弹窗提示
         */
    GlobalMsgHandler.prototype.on_G2C_CHONGZHI_TIPS = function (msg) {
        var alert = Layers.HintLayer.create();
        alert.init({
            curState: Layers.HintLayer.SURE_CANNEL2,
            leftBtnBg: "button_green_png",
            leftBtnIcon: "充值",
            rightBtnBg: "button_green_png",
            rightBtnIcon: "确定",
            leftFunc: this.openRechargeLayer,
            leftThisObj: this,
            rightFunc: alert.close,
            rightThisObj: alert,
            tipsStr: msg.datas.content
        });
        alert.open();
        if (SceneManager.curScene.sceneTag === 42 /* LOGIN */) {
            SceneManager.runScene(43 /* SELECT */);
        }
        return 1 /* NEXT */;
    };
    // 申请福利补贴
    GlobalMsgHandler.prototype.on_G2C_ASK_POCHAN = function (msg) {
        Global.getPoChanNumber = msg.datas.todayAskPochan;
        var layers = Layers.getLayer(Layers.WelfareCenterLayer);
        if (layers) {
            layers.initsubsidies(msg.datas);
        }
    };
    GlobalMsgHandler.prototype.on_G2C_UPDATE_PLAYER_GOLD = function (msg) {
        Global.playerDto.gold = msg.datas.gold;
        //派发到下一层
        return 1 /* NEXT */;
    };
    GlobalMsgHandler.prototype.dispatchMsg = function (msg) {
        var funcName = 'on_' + OrderNameMap[msg.moduleId][msg.orderId];
        if (this[funcName]) {
            return this[funcName](msg);
        }
        return 1 /* NEXT */;
    };
    return GlobalMsgHandler;
}());
__decorate([
    Decorators.printDatas(true)
], GlobalMsgHandler.prototype, "on_G2C_NORMAL_TIPS", null);
__reflect(GlobalMsgHandler.prototype, "GlobalMsgHandler", ["net.IMsgHandler"]);
//# sourceMappingURL=GlobalMsgHandler.js.map