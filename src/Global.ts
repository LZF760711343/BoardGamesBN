// TypeScript file
namespace Global {
    // export let socket:net.WebSocket = null;
    export let playerDto: model.PlayerDto = {
        account: null
    };
    // export let 
    export let testUsers = [];
    // export let unionid:string;
    /**
     * 
     */
    export let enterRoomId: number;
    /**
     * 
     */
    export let recordGift: boolean=false;
    export let upplayerid:number; 

    /**
     * 上传头像的图片路径
     */
    export let imgPath: string;
    /**
     * 获取次数
     */
    export let getPoChanNumber: number = 0;
    /**
     * 屏幕宽度
     */
    export let sWidth: number;
    /**
     * 屏幕高度
     */
    export let sHeight: number;
    initDebugUsers();
    export function getRequestUrlTail(params: ObjectURLOptions) {
        const para_filter = [];
        for (let key in params) {
            let value = params[key];
            para_filter.push(key + "=" + encodeURIComponent(value) + "&");
        }
        para_filter.sort();
        let arg = para_filter.join('');
        arg = arg.substr(0, arg.length - 1);
        return arg;
    }

    /**
     * 是否显示下载app按钮
     */
    export let isShowDownAppLayer: boolean = true;

    export function panduanJoinRoom(gold, roomid, gameid) {

        if (welfareLevel(gold) == false) {
            return false;
        }

        let joinRoomNeedGold = 0;
        let joinRoomMaxGold = 0;
        if (roomid == undefined || roomid >= 0) {
            if (roomid == undefined) {
                roomid = 0;
            }
            // joinRoomNeedGold = GameLangs.DropGameList[gameid][roomid].minPlay;
            // joinRoomMaxGold = GameLangs.DropGameList[gameid][roomid].maxPlay;
            joinRoomNeedGold = Config.DropGameList[gameid][roomid].minPlay;
            joinRoomMaxGold = Config.DropGameList[gameid][roomid].maxPlay;
        }
        if (joinRoomNeedGold != -1 && gold < joinRoomNeedGold) {
 
            let alert = Layers.HintLayer.create();
            alert.initrecharge({
                // title: "btjb_toptext4_png",
                curState: Layers.HintLayer.SURE_CANNEL2,
                leftBtnBg: "button_green_png",
                leftBtnIcon: "充值",
                rightBtnBg: "button_green_png",
                rightBtnIcon: "确定",
                // leftFunc: this.scene.openRechargeLayer,
                // leftThisObj: this.scene,
                rightFunc: alert.close,
                rightThisObj: alert,
                tipsStr: "金币不足请充值"
            });
            alert.open();
            return false;
        }
        if (joinRoomMaxGold != -1 && gold > joinRoomMaxGold) {

            let alert = Layers.HintLayer.create();
            alert.init({
                // title: "btjb_toptext4_png",
                curState: Layers.HintLayer.SURE2,
                leftBtnBg: "button_green_png",
                leftBtnIcon: "确定",
                // leftFunc: this.scene.openRechargeLayer,
                // leftThisObj: this.scene,
                rightFunc: alert.close,
                rightThisObj: alert,
                tipsStr: "请选择相应的区间进房"
            });
            alert.open();
            return false;

        }
        return true;
    }
    /**
     * 弹出领取福利层
     */
    export function welfareLevel(gold) {
        if (Global.playerDto.baoxianxiang + gold < 2000 && Global.getPoChanNumber > 0) {
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ASK_POCHAN).send();
            let alert = Layers.HintLayer.create();
            alert.init({
                // title: "btjb_toptext4_png",
                curState: Layers.HintLayer.SURE3,
                leftBtnBg: "button_green_png",
                leftBtnIcon: "领取",
                // leftFunc: this.scene.openRechargeLayer,
                // leftThisObj: this.scene,
                rightFunc: alert.close,
                rightThisObj: alert,
                tipsStr: "今天给您补贴8000金币！"
            });
            alert.open();
            return false;
        }
        return true;

    }
    //游戏名字
    export var gameName: string = "HZ棋牌";

    //活动配置
    export var activity_conf: model.GameActConfTtem[];
    /**
    * 充值信息
    */
    export var charge_conf: model.CharegConf;
    /**
     * 切换账号的时候,重置一些数据
     */
    export function reset() {
        playerDto = {
            account: null
        };
        activity_conf = [];
        enterRoomId = null;

        charge_conf = {
            diamond: [],
            gold: [],
            quick: [],
            tools: [],
            cards: [],
            niucards: [],
            is_load: false,
            isGetFirstCharge: false

        };
    }
    reset();

    export function requestData(url: string, params: any, respHandler: Function, target) {
        const httpRequest: egret.HttpRequest = new egret.HttpRequest();
        httpRequest.once(egret.Event.COMPLETE, respHandler, target);
        httpRequest.once(egret.IOErrorEvent.IO_ERROR, respHandler, target);
        httpRequest.open(url, egret.HttpMethod.POST);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send(getRequestUrlTail(params));
    }

    export function requestDataAsync(url: string, params: any): Promise<string> {
        return new Promise((successFunc: Function, fialFunc: Function) => {
            const httpRequest: egret.HttpRequest = new egret.HttpRequest();
            httpRequest.once(egret.Event.COMPLETE, (e: egret.Event) => {
                successFunc(e.target.response);
            }, null);
            httpRequest.once(egret.IOErrorEvent.IO_ERROR, (e: egret.Event) => {
                fialFunc(e.type);
            }, null);
            httpRequest.open(url, egret.HttpMethod.POST);
            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            httpRequest.send(getRequestUrlTail(params));
            if (DEBUG) {
                egret.log("requestDataAsync:" + url, getRequestUrlTail(params));
            }
        })
    }
    export function initSharing(shareInfo: {
        url?: string,
        title?: string,
        description?: string,
        type?: string,
        scene?: number
    }, isSelect: boolean, shareCb?: nest.ShareCallBackFunc, isShowView: boolean = true) {
        if (shareInfo.url.indexOf("?") > -1) {
            shareInfo.url += ("&upplayerid=" + Global.playerDto.id);
        } else {
            shareInfo.url += ("?upplayerid=" + Global.playerDto.id);
        }
        if (Global.playerDto && Global.playerDto.channel) {
            shareInfo.url += ("&chl=" + Global.playerDto.channel);
        } else if (Config.channel) {
            shareInfo.url += ("&chl=" + Config.channel);
        }
        if (Config.debug) {
            shareInfo.url += ("&debug=1");
        }
        shareInfo.url += "&serverid=" + Config.SERVER_ID;
        nest.addShareCb(shareCb);
        if (isNATIVE()) {
            if (isSelect) {
                new Layers.ShareDayLayer(shareInfo).open();
            } else {
                nest.share(shareInfo);
            }
        } else {
            nest.share(shareInfo);
            if (isShowView) {
                Gzqd.showShare();
            }
        }
    }
    export function isNATIVE() {
        return egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE;
    }

}
