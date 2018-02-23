/**
 * 用于处理全局性消息
 */
class GlobalMsgHandler implements net.IMsgHandler {
    public static instance: GlobalMsgHandler;
    private decrypted: string;
    private randomKey: string;
    public constructor() {
        GlobalMsgHandler.instance = this;
    }
    protected on_ALL2C_STR_ERROR(msg: net.ReceiveMsg<{ result: number, content: string }>) {

        Toast.launch(msg.datas.content);
        // {"result":-1,"content":"金币不足以下此注"}
    }
    // 剩余福利补贴次数
    private on_G2C_HAS_POCHAN_COUNT(msg: net.ReceiveMsg<model.BrokeMoney>) {
        Global.getPoChanNumber = msg.datas.todayAskPochan;
    }
    /**
     * 钻石兑换房卡成功返回
     */
    protected on_G2C_UPDATE_PLAYER_FANGKA(msg: net.ReceiveMsg<{ fangkaCount: number, result: number }>) {
        Global.playerDto.fangkaCount = msg.datas.fangkaCount;
        // Toast.launch(GameLangs.buySuccess);
        return net.DIS_RESULT.NEXT;
    }
    /**
     * 充值成功通知
     */
    protected on_G2C_GET_CHONGZHI(msg: net.ReceiveMsg<{ tipsStr: number, result: number }>) {
        Toast.launch(GameLangs.buySuccess);
        if (Global.playerDto.rmb <= 2) {
            new Layers.FirstGiftLayer().open();
        }
    }

    /**
     * 获得首冲礼包
     */
    protected on_G2C_GET_SHOUCHONG(msg: net.ReceiveMsg<{ addGold: number, addDiamond: number, result: number, isShouchongSecced: boolean }>) {
        Global.charge_conf.isGetFirstCharge = msg.datas.isShouchongSecced;
        if (msg.datas.result === 0) {
            if (msg.datas.addGold || msg.datas.addDiamond) {
                let list = [];
                if (msg.datas.addGold) {
                    list.push({ icon: "jb_icon3_png", label: msg.datas.addGold + GameLangs.jinbi });
                }
                if (msg.datas.addDiamond) {
                    list.push({ icon: "zs_icon3_png", label: msg.datas.addDiamond + GameLangs.zuanshi });
                }
                Main.instance.addChild(new GetGiftAni(list));
                let layer = Layers.getLayer(Layers.FirstGiftLayer);
                if (layer) {
                    layer.close();
                }
            }
        } else {
            if (SceneManager.curScene.sceneTag === GAME_ID.SELECT) {
                // new Layers.RechargeLayer(1).open();
                let num = Global.charge_conf.diamond;
                for (let i = 0; i < num.length; i++) {
                    if (num[i].price == 8) {
                        nest.pay(num[i].pid, LocalDatas.datas.datas.unionid, LocalDatas.datas.datas.openid, GameLangs.rechargeDiamondBody.format(num[i].buy));
                    }
                }

            }
        }
        if (SceneManager.curScene.sceneTag === GAME_ID.SELECT) {
            (<SelectScene>SceneManager.curScene).updateFirstGiftBtn();
        }
    }
    /**
         * 收到弹窗提示
         */
    @Decorators.printDatas(DEBUG)
    private on_G2C_NORMAL_TIPS(msg: net.ReceiveMsg<{ result: number, content: string, tipsStr: string }>) {
        let alert = Layers.HintLayer.create();
        alert.init({ tipsStr: msg.datas.content || msg.datas.tipsStr, curState: Layers.HintLayer.SURE2 });
        alert.open();
    }
    /**
     * 修改头像返回
     */
    private on_G2C_UPDATE_HEAD_IMAGES(msg: net.ReceiveMsg<{ headImages: string, result: number }>) {
        Global.playerDto.headImages = msg.datas.headImages + "?v=" + Date.now();
        return net.DIS_RESULT.NEXT;
    }
    /**
        * 打开充值页面
        */
    public openRechargeLayer() {
        new Layers.RechargeLayer(0).open();
    }
    /**
         * 收到充值弹窗提示
         */
    private on_G2C_CHONGZHI_TIPS(msg: net.ReceiveMsg<{ result: number, content: string }>) {
        let alert = Layers.HintLayer.create();
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
        if (SceneManager.curScene.sceneTag === GAME_ID.LOGIN) {
            SceneManager.runScene(GAME_ID.SELECT);
        }
        return net.DIS_RESULT.NEXT;
    }
    // 申请福利补贴
    private on_G2C_ASK_POCHAN(msg: net.ReceiveMsg<model.BrokeMoney>) {
        Global.getPoChanNumber = msg.datas.todayAskPochan;
        let layers: Layers.WelfareCenterLayer = Layers.getLayer(Layers.WelfareCenterLayer);
        if (layers) {
            layers.initsubsidies(msg.datas);
        }
    }
    protected on_G2C_UPDATE_PLAYER_GOLD(msg: net.ReceiveMsg<{ result: number, gold: number }>) {
        Global.playerDto.gold = msg.datas.gold;
        //派发到下一层
        return net.DIS_RESULT.NEXT;
    }
    public dispatchMsg(msg: net.ReceiveMsg<any>): net.DIS_RESULT {
        var funcName = 'on_' + OrderNameMap[msg.moduleId][msg.orderId];
        if (this[funcName]) {
            return this[funcName](msg);
        }
        return net.DIS_RESULT.NEXT;
    }
}