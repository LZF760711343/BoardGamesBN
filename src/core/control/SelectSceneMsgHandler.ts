class SelectSceneMsgHandler implements net.IMsgHandler {
    // ;
    private sourceArr: model.BrannRoomInfo[] = [];
    public constructor(private scene: SelectScene) {
    }

    public dispatchMsg(msg: net.ReceiveMsg<any>): net.DIS_RESULT {
        var funcName = 'on_' + OrderNameMap[msg.moduleId][msg.orderId];
        if (this[funcName]) {
            return this[funcName](msg);
        }
        return net.DIS_RESULT.NONE;
    }
    protected on_G2C_CHONGZHI_TIPS(msg: net.ReceiveMsg<{ result: number, content: string }>) {
        Layers.WaitingLayer.close();
    }
    // private on_G2C_ENTER_SCORE_ROOM(msg: net.ReceiveMsg<model.EnterScoreRoomInfo<any>>) {
    //     egret.log("G2C_ENTER_SCORE_ROOM")
    //     // if (msg.datas.UserName == Global.playerDto.account) {
    //     SceneManager.runScene(msg.datas.createinfo.gameId, (scene: GameSceneBase) => {
    //         scene.init();
    //     }, null, msg.datas, GAME_TYPE.COIN);
    //     // }
    // }
    // 刷新金币
    private on_G2C_UPDATE_PLAYER_GOLD(msg: net.ReceiveMsg<model.DepositMoney>) {
        this.scene.updateUserInfo();
        if (msg.datas.gold > 100000) {
            this.scene._GoldLabel.text = Math.floor(msg.datas.gold / 10000) + GameLangs.wan;
            if (this.scene.paiMaiLayer)
                this.scene.paiMaiLayer.text_gold.text = Math.floor(msg.datas.gold / 10000) + GameLangs.wan;
        } else {
            this.scene._GoldLabel.text = msg.datas.gold + "";
            if (this.scene.paiMaiLayer)
                this.scene.paiMaiLayer.text_gold.text = msg.datas.gold + "";
        }
        let layers: Layers.RechargeLayer = Layers.getLayer(Layers.RechargeLayer);
        if (layers) {
            layers.updateLabel();
        }
    }
    private on_G2C_UPDATE_PLAYER_BAOXIANXIANG(msg: net.ReceiveMsg<model.SaveMoney>) {
        Global.playerDto.baoxianxiang = msg.datas.Baoxianxiang;
        egret.log("on_G2C_UPDATE_PLAYER_BAOXIANXIANG:::::::::" + msg.datas.Baoxianxiang);

    }
    private on_G2C_ADD_BAOXIANXIANG(msg: net.ReceiveMsg<any>){

    }
    private on_G2C_ONE_MSG_TO_CLIENT(msg: net.ReceiveMsg<{ result: number, msgStr: string }>){
        //    LocalDatas.datas.datas.gameNew.msgStr=msg.datas.msgStr;
        //    egret.log("G2C_ONE_MSG_TO_CLIENT"+msg.datas.msgStr)
           LocalDatas.datas.datas.msgStr=msg.datas.msgStr;
    }
    private on_G2C_MSGLIST_TO_CLIENT (msg: net.ReceiveMsg<{ result: number, msgListStr: any }>){
        //    LocalDatas.datas.datas.gameNew.msgStr=msg.datas.msgStr;
        //    egret.log("G2C_ONE_MSG_TO_CLIENT"+msg.datas.msgStr)
        //    LocalDatas.datas.datas.msgStr=msg.datas.msgStr;
    }

    private on_G2C_GET_GOLD_PHB(msg: net.ReceiveMsg<model.WealthListInfo>) {

        let arrLen = msg.datas.goldPHBList.length;
        for (let i = 0; i < arrLen; i++) {
            msg.datas.goldPHBList[i].nickName = StringUtil.decodeBase64(msg.datas.goldPHBList[i].nickName);
        }
        this.scene.opensourceList(msg.datas);
    }
    // 刷新钻石
    private on_G2C_UPDATE_PLAYER_DIAMOND(msg: net.ReceiveMsg<model.PlayerDto>) {
        Global.playerDto.diamond = msg.datas.diamond;

        if (msg.datas.diamond > 10000) {
            this.scene._Diamondlabel.text = Math.floor(msg.datas.gold / 10000) + GameLangs.wan;
        } else {
            this.scene._Diamondlabel.text = msg.datas.diamond + "";
        }
        let layers: Layers.RechargeLayer = Layers.getLayer(Layers.RechargeLayer);

        if (layers) {
            layers.updateLabel();
        }



    }

    private on_C2G_QITIAN_QIANDAO_INFO(msg: net.ReceiveMsg<model.QiandaoInfo>) {
        this.scene.updateQiandaoInfo(msg.datas);
    }
    private on_G2C_SYS_CHAT_MSG(msg: net.ReceiveMsg<model.CHATMsgInfo>) {
        this.scene._speakerMan.addMsg({ text: msg.datas.sendMsg, showCount: msg.datas.showCount });
    }

    @Decorators.printDatas(DEBUG)
    private on_G2C_ENTER_BRNN_ROOM(msg: net.ReceiveMsg<model.EnterBrnnRoomInfo>) {
        let arrLen = msg.datas.wangNameList.length;
        for (let i = 0; i < arrLen; i++) {
            msg.datas.wangNameList[i].nickName = StringUtil.decodeBase64(msg.datas.wangNameList[i].nickName);
        }
        msg.datas.NickName = StringUtil.decodeBase64(msg.datas.NickName);
        SceneManager.runScene(GAME_ID.GAME_ID_HZ_BRNN, (scene: GameSceneBase) => {
            Layers.WaitingLayer.close();
            scene.init();
        }, null, msg.datas);
        Global.enterRoomId = null;

    }
    @Decorators.printDatas(DEBUG)
    private on_G2C_ENTER_ROOM(msg: net.ReceiveMsg<model.EnterScoreRoomInfo<any>>) {
        SceneManager.runScene(msg.datas.createinfo.gameId, (scene: GameSceneBase) => {
            scene.init();
        }, null, msg.datas, GAME_TYPE.COIN);
        Global.enterRoomId = null;

    }
    private on_G2C_HAS_NEW_FENXIANG(msg) {
        Global.recordGift = true;
        this.scene.getGiftNews(Global.recordGift);

    }
    private on_G2C_UPDATE_PLAYER_NIUKA(msg: net.ReceiveMsg<{ niukaCount: number, result: number }>) {
        // egret.log("on_G2C_UPDATE_PLAYER_NIUKA");
        let layers: Layers.RechargeLayer = Layers.getLayer(Layers.RechargeLayer);
        if (layers) {
            layers.updateLabel();
        }
        Global.playerDto.niukaCount = msg.datas.niukaCount;
        this.scene.updateUserInfo();
    }
    private on_G2C_ONE_FENXIANG_LIBAO(msg: net.ReceiveMsg<model.GamePlayAward>) {
        Global.recordGift = false;
        this.scene.getGiftNews(Global.recordGift);
        let list = [];
        list.push({ icon: "jb_icon3_png", label: msg.datas.rewardGold + GameLangs.jinbi });
        Main.instance.addChild(new GetGiftAni(list)); 
        let layer = <Layers.ShareGift>Layers.getLayer(Layers.ShareGift);
        if (layer) {
            layer.initHeard();
        }
    }
    private on_G2C_FENXIANG_LIBAO_LIST(msg: net.ReceiveMsg<model.GamePlayList>) {
        let layer = <Layers.ShareGift>Layers.getLayer(Layers.ShareGift);
        if (layer) {
            layer.updataPlayList(msg);
        }

    }
    private on_G2C_ZHANJI_LIST(msg: net.ReceiveMsg<model.UserZhanjiInfo>) {

        let arrLen = msg.datas.zhanjiList.length;
        for (let i = 0; i < arrLen; i++) {
            for (let key in msg.datas.zhanjiList[i].playerNames) {
                msg.datas.zhanjiList[i].playerNames[key] = StringUtil.decodeBase64(msg.datas.zhanjiList[i].playerNames[key]);
            }
        }
        this.scene.UpdateZhanjiDatas(msg);
    }

    //拍卖行·····························································
    private on_G2C_PLAYER_BAG(msg: net.ReceiveMsg<model.DaoJuInfo>) {
        this.scene.UpdateDaoJuList(msg);
    }

    private on_G2C_DINGDAN_LIST(msg: net.ReceiveMsg<model.DingDanInfo>) {
        let arrLen = msg.datas.dingdanList.length;
        for (let i = 0; i < arrLen; i++) {
            msg.datas.dingdanList[i].salePlayerNickName = StringUtil.decodeBase64(msg.datas.dingdanList[i].salePlayerNickName);
            msg.datas.dingdanList[i].buyPlayerNickName = StringUtil.decodeBase64(msg.datas.dingdanList[i].buyPlayerNickName);
        }
        this.scene.paiMaiLayer.UpdateDingDanList(msg);
    }

    private on_G2C_SERACH_DINGDAN(msg: net.ReceiveMsg<model.SearchDingDanInfo>) {
        msg.datas.dingdan.salePlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.salePlayerNickName);
        msg.datas.dingdan.buyPlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.buyPlayerNickName);

        this.scene.paiMaiLayer.UpdateSearchList(msg);
    }

    private on_G2C_BUY_DINGDAN(msg: net.ReceiveMsg<model.SearchDingDanInfo>) {
        Toast.launch("购买成功！");
        msg.datas.dingdan.salePlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.salePlayerNickName);
        msg.datas.dingdan.buyPlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.buyPlayerNickName);
        this.scene.paiMaiLayer.RefreshData();
        net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_DINGDAN_LIST).send();
    }

    private on_G2C_CREATE_DINGDAN(msg: net.ReceiveMsg<model.SearchDingDanInfo>) {//仅仅为了更新订单列表
        msg.datas.dingdan.salePlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.salePlayerNickName);
        msg.datas.dingdan.buyPlayerNickName = StringUtil.decodeBase64(msg.datas.dingdan.buyPlayerNickName);
        net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_DINGDAN_LIST).send();
    }
    //拍卖行------------------------------------------------------------------------------------------
    private flag: number = -1;

    private sourceArr1: model.BrannRoomInfo[] = [];
    private on_G2C_BRNN_ROOMINFO(msg: net.ReceiveMsg<model.BrannRoomInfo>) {
        /**
         * 初级场
         */
        let arrLen = msg.datas.wangNameList.length;
        for (let i = 0; i < arrLen; i++) {
            msg.datas.wangNameList[i].nickName = StringUtil.decodeBase64(msg.datas.wangNameList[i].nickName);
        }
        if (msg.datas.roomLevel == 0) {
            let index = Utils.getIndexByKey(this.sourceArr, "roomId", msg.datas.roomId);
            if (index > -1) {
                this.sourceArr[index] = msg.datas;
            } else {
                this.sourceArr.push(msg.datas);
            }
        }
        /**
         * 高级场
         */
        if (msg.datas.roomLevel == 1) {
            let index2 = Utils.getIndexByKey(this.sourceArr1, "roomId", msg.datas.roomId);
            if (index2 > -1) {
                this.sourceArr1[index2] = msg.datas;
            } else {
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
    }
    /**
     * 钻石兑换房卡成功返回
     */
    protected on_G2C_UPDATE_PLAYER_FANGKA(msg: net.ReceiveMsg<{ fangkaCount: number, result: number }>) {
        let layers: Layers.RechargeLayer = Layers.getLayer(Layers.RechargeLayer);
        egret.log("on_G2C_UPDATE_PLAYER_FANGKA")
        if (layers) {
            layers.updateLabel();
        }
        this.scene.updateUserInfo();
    }
    /**
     * 修改头像返回
     */
    private on_G2C_UPDATE_HEAD_IMAGES(msg: net.ReceiveMsg<{ headImages: string, result: number }>) {
        Global.playerDto.headImages = msg.datas.headImages;
        let layers: Layers.UserInfoLayer = Layers.getLayer(Layers.UserInfoLayer);
        if (layers) {
            layers.updateUserImgs(msg.datas.headImages);
        }
        this.scene._headBox.setIcon(msg.datas.headImages);
        egret.log("msg.datas.headImages:::::" + msg.datas.headImages)
    }
}