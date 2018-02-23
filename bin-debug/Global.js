// TypeScript file
var Global;
(function (Global) {
    // export let socket:net.WebSocket = null;
    Global.playerDto = {
        account: null
    };
    // export let 
    Global.testUsers = [];
    /**
     *
     */
    Global.recordGift = false;
    /**
     * 获取次数
     */
    Global.getPoChanNumber = 0;
    initDebugUsers();
    function getRequestUrlTail(params) {
        var para_filter = [];
        for (var key in params) {
            var value = params[key];
            para_filter.push(key + "=" + encodeURIComponent(value) + "&");
        }
        para_filter.sort();
        var arg = para_filter.join('');
        arg = arg.substr(0, arg.length - 1);
        return arg;
    }
    Global.getRequestUrlTail = getRequestUrlTail;
    /**
     * 是否显示下载app按钮
     */
    Global.isShowDownAppLayer = true;
    function panduanJoinRoom(gold, roomid, gameid) {
        if (welfareLevel(gold) == false) {
            return false;
        }
        var joinRoomNeedGold = 0;
        var joinRoomMaxGold = 0;
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
            var alert_1 = Layers.HintLayer.create();
            alert_1.initrecharge({
                // title: "btjb_toptext4_png",
                curState: Layers.HintLayer.SURE_CANNEL2,
                leftBtnBg: "button_green_png",
                leftBtnIcon: "充值",
                rightBtnBg: "button_green_png",
                rightBtnIcon: "确定",
                // leftFunc: this.scene.openRechargeLayer,
                // leftThisObj: this.scene,
                rightFunc: alert_1.close,
                rightThisObj: alert_1,
                tipsStr: "金币不足请充值"
            });
            alert_1.open();
            return false;
        }
        if (joinRoomMaxGold != -1 && gold > joinRoomMaxGold) {
            var alert_2 = Layers.HintLayer.create();
            alert_2.init({
                // title: "btjb_toptext4_png",
                curState: Layers.HintLayer.SURE2,
                leftBtnBg: "button_green_png",
                leftBtnIcon: "确定",
                // leftFunc: this.scene.openRechargeLayer,
                // leftThisObj: this.scene,
                rightFunc: alert_2.close,
                rightThisObj: alert_2,
                tipsStr: "请选择相应的区间进房"
            });
            alert_2.open();
            return false;
        }
        return true;
    }
    Global.panduanJoinRoom = panduanJoinRoom;
    /**
     * 弹出领取福利层
     */
    function welfareLevel(gold) {
        if (Global.playerDto.baoxianxiang + gold < 2000 && Global.getPoChanNumber > 0) {
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ASK_POCHAN).send();
            var alert_3 = Layers.HintLayer.create();
            alert_3.init({
                // title: "btjb_toptext4_png",
                curState: Layers.HintLayer.SURE3,
                leftBtnBg: "button_green_png",
                leftBtnIcon: "领取",
                // leftFunc: this.scene.openRechargeLayer,
                // leftThisObj: this.scene,
                rightFunc: alert_3.close,
                rightThisObj: alert_3,
                tipsStr: "今天给您补贴8000金币！"
            });
            alert_3.open();
            return false;
        }
        return true;
    }
    Global.welfareLevel = welfareLevel;
    //游戏名字
    Global.gameName = "HZ棋牌";
    /**
     * 切换账号的时候,重置一些数据
     */
    function reset() {
        Global.playerDto = {
            account: null
        };
        Global.activity_conf = [];
        Global.enterRoomId = null;
        Global.charge_conf = {
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
    Global.reset = reset;
    reset();
    function requestData(url, params, respHandler, target) {
        var httpRequest = new egret.HttpRequest();
        httpRequest.once(egret.Event.COMPLETE, respHandler, target);
        httpRequest.once(egret.IOErrorEvent.IO_ERROR, respHandler, target);
        httpRequest.open(url, egret.HttpMethod.POST);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send(getRequestUrlTail(params));
    }
    Global.requestData = requestData;
    function requestDataAsync(url, params) {
        return new Promise(function (successFunc, fialFunc) {
            var httpRequest = new egret.HttpRequest();
            httpRequest.once(egret.Event.COMPLETE, function (e) {
                successFunc(e.target.response);
            }, null);
            httpRequest.once(egret.IOErrorEvent.IO_ERROR, function (e) {
                fialFunc(e.type);
            }, null);
            httpRequest.open(url, egret.HttpMethod.POST);
            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            httpRequest.send(getRequestUrlTail(params));
            if (true) {
                egret.log("requestDataAsync:" + url, getRequestUrlTail(params));
            }
        });
    }
    Global.requestDataAsync = requestDataAsync;
    function initSharing(shareInfo, isSelect, shareCb, isShowView) {
        if (isShowView === void 0) { isShowView = true; }
        if (shareInfo.url.indexOf("?") > -1) {
            shareInfo.url += ("&upplayerid=" + Global.playerDto.id);
        }
        else {
            shareInfo.url += ("?upplayerid=" + Global.playerDto.id);
        }
        if (Global.playerDto && Global.playerDto.channel) {
            shareInfo.url += ("&chl=" + Global.playerDto.channel);
        }
        else if (Config.channel) {
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
            }
            else {
                nest.share(shareInfo);
            }
        }
        else {
            nest.share(shareInfo);
            if (isShowView) {
                Gzqd.showShare();
            }
        }
    }
    Global.initSharing = initSharing;
    function isNATIVE() {
        return egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE;
    }
    Global.isNATIVE = isNATIVE;
})(Global || (Global = {}));
//# sourceMappingURL=Global.js.map