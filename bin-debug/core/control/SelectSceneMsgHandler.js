var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SelectSceneMsgHandler = (function () {
    function SelectSceneMsgHandler(scene) {
        this.scene = scene;
        // ;
        this.sourceArr = [];
        //拍卖行------------------------------------------------------------------------------------------
        this.flag = -1;
        this.sourceArr1 = [];
    }
    SelectSceneMsgHandler.prototype.dispatchMsg = function (msg) {
        var funcName = 'on_' + OrderNameMap[msg.moduleId][msg.orderId];
        if (this[funcName]) {
            return this[funcName](msg);
        }
        return 0 /* NONE */;
    };
    SelectSceneMsgHandler.prototype.on_G2C_CHONGZHI_TIPS = function (msg) {
        Layers.WaitingLayer.close();
    };
    // private on_G2C_ENTER_SCORE_ROOM(msg: net.ReceiveMsg<model.EnterScoreRoomInfo<any>>) {
    //     egret.log("G2C_ENTER_SCORE_ROOM")
    //     // if (msg.datas.UserName == Global.playerDto.account) {
    //     SceneManager.runScene(msg.datas.createinfo.gameId, (scene: GameSceneBase) => {
    //         scene.init();
    //     }, null, msg.datas, GAME_TYPE.COIN);
    //     // }
    // }
    // 刷新金币
    SelectSceneMsgHandler.prototype.on_G2C_UPDATE_PLAYER_GOLD = function (msg) {
        this.scene.updateUserInfo();
        if (msg.datas.gold > 100000) {
            this.scene._GoldLabel.text = Math.floor(msg.datas.gold / 10000) + GameLangs.wan;
            if (this.scene.paiMaiLayer)
                this.scene.paiMaiLayer.text_gold.text = Math.floor(msg.datas.gold / 10000) + GameLangs.wan;
        }
        else {
            this.scene._GoldLabel.text = msg.datas.gold + "";
            if (this.scene.paiMaiLayer)
                this.scene.paiMaiLayer.text_gold.text = msg.datas.gold + "";
        }
        var layers = Layers.getLayer(Layers.RechargeLayer);
        if (layers) {
            layers.updateLabel();
        }
    };
    SelectSceneMsgHandler.prototype.on_G2C_UPDATE_PLAYER_BAOXIANXIANG = function (msg) {
        Global.playerDto.baoxianxiang = msg.datas.Baoxianxiang;
        egret.log("on_G2C_UPDATE_PLAYER_BAOXIANXIANG:::::::::" + msg.datas.Baoxianxiang);
    };
    SelectSceneMsgHandler.prototype.on_G2C_ADD_BAOXIANXIANG = function (msg) {
    };
    SelectSceneMsgHandler.prototype.on_G2C_ONE_MSG_TO_CLIENT = function (msg) {
        //    LocalDatas.datas.datas.gameNew.msgStr=msg.datas.msgStr;
        //    egret.log("G2C_ONE_MSG_TO_CLIENT"+msg.datas.msgStr)
        LocalDatas.datas.datas.msgStr = msg.datas.msgStr;
    };
    SelectSceneMsgHandler.prototype.on_G2C_MSGLIST_TO_CLIENT = function (msg) {
        //    LocalDatas.datas.datas.gameNew.msgStr=msg.datas.msgStr;
        //    egret.log("G2C_ONE_MSG_TO_CLIENT"+msg.datas.msgStr)
        //    LocalDatas.datas.datas.msgStr=msg.datas.msgStr;
    };
    SelectSceneMsgHandler.prototype.on_G2C_GET_GOLD_PHB = function (msg) {
        var arrLen = msg.datas.goldPHBList.length;
        for (var i = 0; i < arrLen; i++) {
            msg.datas.goldPHBList[i].nickName = StringUtil.decodeBase64(msg.datas.goldPHBList[i].nickName);
        }
        this.scene.opensourceList(msg.datas);
    };
    // 刷新钻石
    SelectSceneMsgHandler.prototype.on_G2C_UPDATE_PLAYER_DIAMOND = function (msg) {
        Global.playerDto.diamond = msg.datas.diamond;
        if (msg.datas.diamond > 10000) {
            this.scene._Diamondlabel.text = Math.floor(msg.datas.gold / 10000) + GameLangs.wan;
        }
        else {
            this.scene._Diamondlabel.text = msg.datas.diamond + "";
        }
        var layers = Layers.getLayer(Layers.RechargeLayer);
        if (layers) {
            layers.updateLabel();
        }
    };
    SelectSceneMsgHandler.prototype.on_C2G_QITIAN_QIANDAO_INFO = function (msg) {
        this.scene.updateQiandaoInfo(msg.datas);
    };
    SelectSceneMsgHandler.prototype.on_G2C_SYS_CHAT_MSG = function (msg) {
        this.scene._speakerMan.addMsg({ text: msg.datas.sendMsg, showCount: msg.datas.showCount });
    };
    SelectSceneMsgHandler.prototype.on_G2C_ENTER_BRNN_ROOM = function (msg) {
        var arrLen = msg.datas.wangNameList.length;
        for (var i = 0; i < arrLen; i++) {
            msg.datas.wangNameList[i].nickName = StringUtil.decodeBase64(msg.datas.wangNameList[i].nickName);
        }
        msg.datas.NickName = StringUtil.decodeBase64(msg.datas.NickName);
        SceneManager.runScene(41 /* GAME_ID_HZ_BRNN */, function (scene) {
            Layers.WaitingLayer.close();
            scene.init();
        }, null, msg.datas);
        Global.enterRoomId = null;
    };
    SelectSceneMsgHandler.prototype.on_G2C_ENTER_ROOM = function (msg) {
        SceneManager.runScene(msg.datas.createinfo.gameId, function (scene) {
            scene.init();
        }, null, msg.datas, 0 /* COIN */);
        Global.enterRoomId = null;
    };
    SelectSceneMsgHandler.prototype.on_G2C_HAS_NEW_FENXIANG = function (msg) {
        Global.recordGift = true;
        this.scene.getGiftNews(Global.recordGift);
    };
    SelectSceneMsgHandler.prototype.on_G2C_UPDATE_PLAYER_NIUKA = function (msg) {
        // egret.log("on_G2C_UPDATE_PLAYER_NIUKA");
        var layers = Layers.getLayer(Layers.RechargeLayer);
        if (layers) {
            layers.updateLabel();
        }
        Global.playerDto.niukaCount = msg.datas.niukaCount;
        this.scene.updateUserInfo();
    };
    SelectSceneMsgHandler.prototype.on_G2C_ONE_FENXIANG_LIBAO = function (msg) {
        Global.recordGift = false;
        this.scene.getGiftNews(Global.recordGift);
        var list = [];
        list.push({ icon: "jb_icon3_png", label: msg.datas.rewardGold + GameLangs.jinbi });
        Main.instance.addChild(new GetGiftAni(list));
        var layer = Layers.getLayer(Layers.ShareGift);
        if (layer) {
            layer.initHeard();
        }
    };
    SelectSceneMsgHandler.prototype.on_G2C_FENXIANG_LIBAO_LIST = function (msg) {
        var layer = Layers.getLayer(Layers.ShareGift);
        if (layer) {
            layer.updataPlayList(msg);
        }
    };
    SelectSceneMsgHandler.prototype.on_G2C_ZHANJI_LIST = function (msg) {
        var arrLen = msg.datas.zhanjiList.length;
        for (var i = 0; i < arrLen; i++) {
            for (var key in msg.datas.zhanjiList[i].playerNames) {
                msg.datas.zhanjiList[i].playerNames[key] = StringUtil.decodeBase64(msg.datas.zhanjiList[i].playerNames[key]);
            }
        }
        this.scene.UpdateZhanjiDatas(msg);
    };
    //拍卖行·····························································
    SelectSceneMsgHandler.prototype.on_G2C_PLAYER_BAG = function (msg) {
        this.scene.UpdateDaoJuList(msg);
    };
    SelectSceneMsgHandler.prototype.on_G2C_DINGDAN_LIST = function (msg) {
        var arrLen = msg.datas.dingdanList.length;
        for (var i = 0; i < arrLen; i++) {
            msg.datas.dingdanList[i].salePlayerNickName = StringUtil.decodeBase64(msg.datas.dingdanList[i].salePlayerNickName);
            msg.datas.dingdanList[i].buyPlayerNickName = StringUtil.decodeBase64(msg.datas.dingdanList[i].buyPlayerNickName);
        }
        this.scene.paiMaiLayer.UpdateDingDanList(msg);
    };
    SelectSceneMsgHandler.prototype.on_G2C_SERACH_DINGDAN = function (msg) {
        msg.datas.dingdan.salePlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.salePlayerNickName);
        msg.datas.dingdan.buyPlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.buyPlayerNickName);
        this.scene.paiMaiLayer.UpdateSearchList(msg);
    };
    SelectSceneMsgHandler.prototype.on_G2C_BUY_DINGDAN = function (msg) {
        Toast.launch("购买成功！");
        msg.datas.dingdan.salePlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.salePlayerNickName);
        msg.datas.dingdan.buyPlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.buyPlayerNickName);
        this.scene.paiMaiLayer.RefreshData();
        net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_DINGDAN_LIST).send();
    };
    SelectSceneMsgHandler.prototype.on_G2C_CREATE_DINGDAN = function (msg) {
        msg.datas.dingdan.salePlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.salePlayerNickName);
        msg.datas.dingdan.buyPlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.buyPlayerNickName);
        net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_DINGDAN_LIST).send();
    };
    SelectSceneMsgHandler.prototype.on_G2C_BRNN_ROOMINFO = function (msg) {
        /**
         * 初级场
         */
        var arrLen = msg.datas.wangNameList.length;
        for (var i = 0; i < arrLen; i++) {
            msg.datas.wangNameList[i].nickName = StringUtil.decodeBase64(msg.datas.wangNameList[i].nickName);
        }
        if (msg.datas.roomLevel == 0) {
            var index = Utils.getIndexByKey(this.sourceArr, "roomId", msg.datas.roomId);
            if (index > -1) {
                this.sourceArr[index] = msg.datas;
            }
            else {
                this.sourceArr.push(msg.datas);
            }
        }
        /**
         * 高级场
         */
        if (msg.datas.roomLevel == 1) {
            var index2 = Utils.getIndexByKey(this.sourceArr1, "roomId", msg.datas.roomId);
            if (index2 > -1) {
                this.sourceArr1[index2] = msg.datas;
            }
            else {
                this.sourceArr1.push(msg.datas);
            }
        }
        Layers.WaitingLayer.close();
        if (msg.datas.roomLevel == 0) {
            this.scene.updateBrnnRoomInfo(this.sourceArr);
        }
        if (msg.datas.roomLevel == 1) {
            this.scene.updateBrnnRoomInfo(this.sourceArr1);
        }
    };
    /**
     * 钻石兑换房卡成功返回
     */
    SelectSceneMsgHandler.prototype.on_G2C_UPDATE_PLAYER_FANGKA = function (msg) {
        var layers = Layers.getLayer(Layers.RechargeLayer);
        egret.log("on_G2C_UPDATE_PLAYER_FANGKA");
        if (layers) {
            layers.updateLabel();
        }
        this.scene.updateUserInfo();
    };
    /**
     * 修改头像返回
     */
    SelectSceneMsgHandler.prototype.on_G2C_UPDATE_HEAD_IMAGES = function (msg) {
        Global.playerDto.headImages = msg.datas.headImages;
        var layers = Layers.getLayer(Layers.UserInfoLayer);
        if (layers) {
            layers.updateUserImgs(msg.datas.headImages);
        }
        this.scene._headBox.setIcon(msg.datas.headImages);
        egret.log("msg.datas.headImages:::::" + msg.datas.headImages);
    };
    return SelectSceneMsgHandler;
}());
__decorate([
    Decorators.printDatas(true)
], SelectSceneMsgHandler.prototype, "on_G2C_ENTER_BRNN_ROOM", null);
__decorate([
    Decorators.printDatas(true)
], SelectSceneMsgHandler.prototype, "on_G2C_ENTER_ROOM", null);
__reflect(SelectSceneMsgHandler.prototype, "SelectSceneMsgHandler", ["net.IMsgHandler"]);
//# sourceMappingURL=SelectSceneMsgHandler.js.map