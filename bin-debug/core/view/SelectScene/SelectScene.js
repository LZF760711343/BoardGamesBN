var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var SelectScene = (function (_super) {
    __extends(SelectScene, _super);
    function SelectScene() {
        var _this = _super.call(this) || this;
        /**
         * 选择游戏按钮组
         */
        _this.changeButton = [];
        /**
        * 循环缓动动画表,用于离开场景时,清理缓动动画,防止内存泄漏
        */
        _this._tweenRemoveList = [];
        /**
         * 战绩数据
         */
        _this.zhanjiArray = [];
        _this.skinName = SelectSceneSkin;
        _this.percentWidth = _this.percentHeight = 100;
        return _this;
    }
    SelectScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        egret.log("/--------------SelectScene childrenCreated!");
        if (Global.recordGift) {
            this.getGiftNews(Global.recordGift);
        }
        var self = this;
        self.changeButton = [self._MaJiangRoomButton, self._QZNiuNiuRoomButton1, self._SanZhangPaiRoomButton, self._DouDiZhuRoomButton];
        this._bibi.mask = this._zeRect;
        SoundManage.playMusic(SoundManage.keyMap.bgMusic);
        /**
         * 点击事件
         */
        for (var i = 0; i < self.changeButton.length; i++) {
            self.changeButton[i].addEventListener(egret.TouchEvent.TOUCH_TAP, self.selectRoomFastChose, self);
        }
        /**
         * 約牌点击事件
         */
        this._JoinEnterIntoRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.JoinEnterIntoRoom, this);
        /**
         * 消息点击事件
         */
        this._GameNews.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GameNews, this);
        /**
         * 头像点击事件
         */
        this._headBox.setIcon(Global.playerDto.headImages);
        this._headBox.mask = this._roundMask;
        // this._headBox.$children[0].addEventListener(egret.TouchEvent.TOUCH_TAP, this.openUserInfoLayer, this);
        this._headGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openUserInfoLayer, this);
        /**
         * 左右按钮
         */
        this._clickLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeftGroup, this);
        this._clickRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRightGroup, this);
        /**
         * 保险箱点击事件
         */
        this._safeBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSafeBoxLayer, this);
        /**
         * 排行榜点击事件
         */
        this._inviteButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openInviteButtonLayer, this);
        /**
         * 福利点击事件
         */
        this._welfare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openWelfareLayer, this);
        this._SelectRoomButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSelectRoomLayer, this);
        this._RealNameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRealNameLayer, this);
        this._FirstGiftButon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFirstGiftLayer, this);
        this._ShopButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openShopLayer, this);
        this._CombatGainsButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openCombatGainsLayer, this);
        this._QZNiuNiuRoomButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openQZNiuNiuRoomLayer, this);
        this._SetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSetLayer, this);
        this._FeedbackButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenPaiMaiLayer, this);
        this._matchRoomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.matchRoomBtn, this);
        this._GoldAddButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openGoldAddLayer, this);
        this._DiamondAddButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openDiamondAddLayer, this);
        this._buyCardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBuyCardLayer, this);
        // this._DouDiZhuRoomButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openDouDiZhuRoomLayer, this);
        // this._SanZhangPaiRoomButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSanZhangPaiRoomLayer, this);
        // this._DeZhouPuKeRoomButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openDeZhouPuKeRoomLayer, this);
        this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBackButtonLayer, this);
        this._cardRoomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRoomConfigLayer, this);
        this._tabber.addEventListener(egret.Event.CHANGE, this.chanTab, this);
        this._selectRoomFastStart.addEventListener("EnterRoom", this.selectRoomFastStartLayer, this);
        this._contactBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.contactLayer, this);
        // this._selectRoomFastChose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectRoomFastChose, this);
        this._BrNiuNiuRoomButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBrnnButtonLayer, this);
        this._seriesSmall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.seriesSmall, this);
        this._seriesMible.addEventListener(egret.TouchEvent.TOUCH_TAP, this.seriesSmall, this);
        this._seriesBig.addEventListener(egret.TouchEvent.TOUCH_TAP, this.seriesSmall, this);
        this._shareGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ShareGift, this);
        this._slither.addEventListener(egret.Event.CHANGE, this.changeSlither, this);
        net.registerMsgHandler(2 /* SCENE */, new SelectSceneMsgHandler(this));
        net.dispatchMsg();
        egret.log("/--------------SelectScene childrenCreated11111!");
        this._listTable.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.enterBrnnRoom, this);
        this.updateUserInfo();
        if (Global.enterRoomId) {
            net.SendMsg.create({ roomId: Global.enterRoomId }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ENTER_SCORE_ROOM).send();
            Global.enterRoomId = null;
        }
        // if (egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE) {
        // 	this._versionLab.text = GameLangs.versionTip.format(Config.nativeVersion, Config.channel);
        // } else {
        // 	 this._versionLab.text = GameLangs.versionTip.format("debug", Config.channel);
        // }
        this.updateFirstGiftBtn();
        // egret.log("this._QZNiuNiuRoomButton",this._QZNiuNiuRoomButton["_play"])._play);
        this._tweenRemoveList = [this._biibii, this._niu, this._szp, this._bs, this._fj, this._ddz, this._mj, this._Pai, this._left, this._right, this._deng1, this._QZNiuNiuRoomButton1["_play"], this._BrNiuNiuRoomButton["_play"]];
        for (var i = 0; i < this._tweenRemoveList.length; i++) {
            // egret.log("tweenItem:"+i);
            Tween.playTweenGroup(this._tweenRemoveList[i], true);
        }
        //下载app
        if (egret.RuntimeType.WEB === egret.Capabilities.runtimeType) {
            if (Global.isShowDownAppLayer) {
                this.openAppDownLayer();
                Global.isShowDownAppLayer = false;
            }
            this._downAppBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAppDownLayer, this);
        }
        else {
            // this.removeChild(this._downAppBtn);
            this._downAppBtn.visible = false;
        }
        //注册监听用户修改信息后改变当前信息
        EventManager.register("UpdateUserInfo", this.updateUserInfo, this);
        egret.log("SelectScene childrenCreated finish!!!!!!!");
    };
    SelectScene.prototype.openQZNiuNiuRoomLayer = function () {
        this.currentState = "brnnSelect";
    };
    /**
    * 打开公告入口
    */
    SelectScene.prototype.OpenNoticeLayer = function () {
        new Layers.GameAnnouncementLayer().open();
    };
    SelectScene.prototype.openAppDownLayer = function () {
        new Layers.AppDownLoadLayer().open();
    };
    SelectScene.prototype.clearTween = function () {
        for (var i = this._tweenRemoveList.length - 1; i > -1; --i) {
            this._tweenRemoveList[i].stop();
        }
        this._tweenRemoveList = null;
    };
    SelectScene.prototype.getGiftNews = function (isSan) {
        if (isSan) {
            Tween.playTweenGroup(this._Gift, true);
            this._tweenRemoveList.push(this._Gift);
        }
        else {
            this._Gift.stop();
        }
    };
    SelectScene.prototype.changeSlither = function () {
        if (this._tweenRemoveList.indexOf(this._deng2) == -1) {
            this._tweenRemoveList.push(this._deng2);
        }
        // egret.log("this._slither.viewport.scrollH::" + this._slither.viewport.scrollH);
        if (this._slither.viewport.scrollH > 0) {
            this._clickLeft.visible = this._SelectRoom2.enabled = true;
            this._clickRight.visible = this._SelectRoom1.enabled = false;
            this._SelectRoom1.bgStr = this._SelectRoom2.icon = "";
            this._SelectRoom2.bgStr = "2deng_icon_png";
            this._SelectRoom1.icon = "yeshu1_text_png";
            this._deng2.play();
            this._deng1.stop();
        }
        else if (this._slither.viewport.scrollH <= 0) {
            this._clickLeft.visible = this._SelectRoom2.enabled = false;
            this._clickRight.visible = this._SelectRoom1.enabled = true;
            this._SelectRoom1.bgStr = "1deng_icon_png";
            this._SelectRoom2.bgStr = this._SelectRoom1.icon = "";
            this._SelectRoom2.icon = "yeshu2_text_png";
            this._deng1.play();
            this._deng2.stop();
        }
    };
    SelectScene.prototype.ShareGift = function () {
        new Layers.ShareGift().open();
    };
    SelectScene.prototype.updateFirstGiftBtn = function () {
        this._FirstGiftButon.visible = !Global.charge_conf.isGetFirstCharge;
    };
    // 游戏消息点击事件
    SelectScene.prototype.GameNews = function () {
        new Layers.GameMessgeListLayer().open();
    };
    // protected getFirstRechargeInfo(){
    // 	net.SendMsg.create({ isNowGet : 0 }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GET_SHOUCHONG).send();
    // }
    SelectScene.prototype.updateQiandaoInfo = function (data) {
        this.qdData = data;
        var layer = Layers.getLayer(Layers.WelfareCenterLayer);
        if (layer) {
            layer.init(this.qdData);
        }
        else {
            if (data.canQd == 1) {
                new Layers.DrawLayer(this.qdData).open();
            }
        }
        var drawLayera = Layers.getLayer(Layers.DrawLayer);
        if (drawLayera) {
            drawLayera.init(this.qdData);
        }
    };
    SelectScene.prototype.onAniComplete = function () {
        this._clickLeft.touchEnabled = this._clickRight.touchEnabled = true;
    };
    SelectScene.prototype.openBrnnButtonLayer = function () {
        this.sendEnterRoomMsg({ roomId: 0, roomType: 41 /* GAME_ID_HZ_BRNN */ });
    };
    /**
     * @param isEnterSelect:是否自动调回选场页面
     */
    SelectScene.prototype.sendEnterRoomMsg = function (data, isEnterSelect) {
        if (Global.playerDto.gold < 1000000000) {
            net.SendMsg.create(data, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ENTER_ROOM).send();
            return true;
        }
        if (isEnterSelect) {
            SceneManager.runScene(43 /* SELECT */);
        }
        Toast.launch(GameLangs.moneyTooMoreTip);
        return false;
    };
    SelectScene.prototype.clickLeftGroup = function () {
        this._SelectRoom1.bgStr = "1deng_icon_png";
        this._SelectRoom2.bgStr = this._SelectRoom1.icon = "";
        this._SelectRoom2.icon = "yeshu2_text_png";
        this._deng1.play();
        this._deng2.stop();
        this._clickLeft.visible =
            this._SelectRoom2.enabled =
                this._clickLeft.touchEnabled =
                    this._clickRight.touchEnabled = false;
        this._clickRight.visible = this._SelectRoom2.enabled = true;
        egret.Tween.get(this._slither.viewport).to({ scrollH: 0, alpha: 0.7 }, 800, egret.Ease.quadOut).to({ alpha: 1 }, 100, egret.Ease.quadOut).call(this.onAniComplete, this);
    };
    SelectScene.prototype.clickRightGroup = function () {
        if (this._tweenRemoveList.indexOf(this._deng2) == -1) {
            this._tweenRemoveList.push(this._deng2);
        }
        this._deng2.play();
        this._deng1.stop();
        this._SelectRoom1.bgStr = this._SelectRoom2.icon = "";
        this._SelectRoom1.icon = "yeshu1_text_png";
        this._SelectRoom2.bgStr = "2deng_icon_png";
        this._clickLeft.visible = this._SelectRoom1.enabled = true;
        this._clickRight.visible =
            this._SelectRoom1.enabled =
                this._clickLeft.touchEnabled =
                    this._clickRight.touchEnabled = false;
        egret.Tween.get(this._slither.viewport).to({ scrollH: 1040, alpha: 0.7 }, 800, egret.Ease.quadOut).to({ alpha: 1 }, 100, egret.Ease.quadOut).call(this.onAniComplete, this);
    };
    SelectScene.prototype.canQd = function () {
        // this.openNiuNiuRoomLayer();
    };
    SelectScene.prototype.JoinEnterIntoRoom = function () {
        SoundManage.playEffect('btnClick');
        // this.currentState="qznnSelect";
        // new Layers.CreateRoomLayer(GAME_ID.NIUNIU).open()
        new Layers.CreateRoomLayer().open();
    };
    SelectScene.prototype.openRoomConfigLayer = function () {
        // this.openNiuNiuRoomLayer();
        new Layers.CreateRoomLayer().open();
    };
    SelectScene.prototype.enterBrnnRoom = function () {
        this.sendEnterRoomMsg({ roomId: this._listTable.selectedItem.roomId, roomType: 8 /* BRNN */ });
    };
    SelectScene.prototype.init = function (sourceArr) {
        var myCollection = this.myCollection = new eui.ArrayCollection(sourceArr);
        var dataGroup = this._listTable;
        dataGroup.dataProvider = myCollection;
        dataGroup.itemRenderer = HunderNNSelectRoomItem;
    };
    SelectScene.prototype.updateBrnnRoomInfo = function (sourceArr) {
        this.sarr = sourceArr;
        if (this.myCollection) {
            this.myCollection.source = sourceArr;
        }
        else {
            this.init(sourceArr);
        }
    };
    /**
     * _tabber 初级高级场切换
     */
    SelectScene.prototype.chanTab = function () {
        egret.log("this._tabber.selectedIndex;", this._tabber.selectedIndex);
        net.SendMsg.create({ roomLevel: this._tabber.selectedIndex }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_BRNN_ROOMINFO).send();
        Layers.WaitingLayer.open();
    };
    SelectScene.prototype.update = function () {
        _super.prototype.update.call(this);
        net.SendMsg.create({ roomLevel: this._tabber.selectedIndex }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_BRNN_ROOMINFO).send();
    };
    /**
     * 打开商品 钻石
     */
    SelectScene.prototype.openShopLayer = function () {
        new Layers.RechargeLayer(1).open();
    };
    /**
     * 打开社交页面
     */
    SelectScene.prototype.contactLayer = function () {
        var lyaers = new Layers.GameAnnouncementLayer().open();
        lyaers.initdatas(Global.activity_conf);
    };
    /**
     * 快速开始 进入游戏
     */
    SelectScene.prototype.selectRoomFastStartLayer = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var conf, roomId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        egret.log("selectRoomFastStartLayer");
                        conf = ResManager.getResConf(this._valGame_ID);
                        roomId = 2;
                        //自动根据金钱获得roomID
                        for (roomId = 2; roomId >= 0; roomId--) {
                            if (Global.playerDto.gold > Config.DropGameList[this._valGame_ID][roomId].minPlay) {
                                if (Config.DropGameList[this._valGame_ID][roomId].maxPlay != -1 && Global.playerDto.gold < Config.DropGameList[this._valGame_ID][roomId].maxPlay) {
                                    break;
                                }
                                else if (Config.DropGameList[this._valGame_ID][roomId].maxPlay == -1) {
                                    break;
                                }
                            }
                        }
                        //若都不符合roomId则为0；
                        if (roomId == -1) {
                            roomId = 0;
                        }
                        if (!(Global.panduanJoinRoom(Global.playerDto.gold, roomId, this._valGame_ID) == true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, SceneManager.loadGroup(conf)];
                    case 1:
                        _a.sent();
                        //SceneManager.runScene(GAME_ID.SELECT);
                        this.sendEnterRoomMsg({ roomId: roomId, roomType: this._valGame_ID }, true);
                        _a.label = 2;
                    case 2:
                        egret.log("Global.playerDto.gold,this._valGame_ID:::" + Global.playerDto.gold, event.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 比赛场
     */
    SelectScene.prototype.matchRoomBtn = function (event) {
        SoundManage.playEffect('btnClick');
        var alert = Layers.HintLayer.create();
        alert.init({
            curState: Layers.HintLayer.SURE,
            leftBtnBg: "bigG_icon_png",
            leftBtnIcon: "确 定",
            rightFunc: alert.close,
            rightThisObj: alert,
            tipsStr: "暂未开放，敬请期待！！"
        });
        alert.open();
    };
    /**
     * 选择级数页面
     */
    SelectScene.prototype.selectRoomFastChose = function (event) {
        // alert(event.target.name);
        SoundManage.playEffect('btnClick');
        if (event.currentTarget instanceof eui.Group) {
            this._valGame_ID = parseInt(event.currentTarget.name);
        }
        else {
            this._valGame_ID = parseInt(event.currentTarget.name);
        }
        this.currentState = "queryChose";
        if (this._valGame_ID == 40 /* GAME_ID_GDMJ_GOLD */ || this._valGame_ID == 13 /* GOLD_DDZ */) {
            this._playText.visible = false;
        }
        this._seriesSmall.icon = this._valGame_ID + "cjc_icon_png";
        this._seriesMible.icon = this._valGame_ID + "zjc_icon_png";
        this._seriesBig.icon = this._valGame_ID + "gjc_icon_png";
        // this._labelGlod1.text = GameLangs.gameNameMapList[this._valGame_ID][0];
        // this._labelGlod2.text = GameLangs.gameNameMapList[this._valGame_ID][1];
        // this._labelGlod3.text = GameLangs.gameNameMapList[this._valGame_ID][2];
        // this._labelGlod1.text = Config.gameNameMapList[this._valGame_ID][0];
        // this._labelGlod2.text = Config.gameNameMapList[this._valGame_ID][1];
        // this._labelGlod3.text = Config.gameNameMapList[this._valGame_ID][2];
        // for(let key in Config.DropGameList){
        //     egret.log(`key=${key};value=${Config.DropGameList[key]};minplay=${Config.DropGameList[key][0].minPlay};maxplay=${Config.DropGameList[key][1].maxPlay}`);
        // }
        this._labelGlod1.text = this.setLabelGlod(Config.DropGameList[this._valGame_ID][0].minPlay, Config.DropGameList[this._valGame_ID][0].maxPlay);
        this._labelGlod2.text = this.setLabelGlod(Config.DropGameList[this._valGame_ID][1].minPlay, Config.DropGameList[this._valGame_ID][1].maxPlay);
        this._labelGlod3.text = this.setLabelGlod(Config.DropGameList[this._valGame_ID][2].minPlay, Config.DropGameList[this._valGame_ID][2].maxPlay);
    };
    SelectScene.prototype.setLabelGlod = function (min, max) {
        var str = "";
        // egret.log(`min=${min};max=${max}`);
        str += this.numberConversion(min);
        if (max != -1) {
            str += "-" + this.numberConversion(max);
        }
        else {
            str += "以上";
        }
        return str;
    };
    SelectScene.prototype.numberConversion = function (number) {
        var num = Math.floor(number / 10000);
        if (num > 0) {
            return num + "W";
        }
        else {
            return number + "";
        }
    };
    SelectScene.prototype.seriesSmall = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var level, conf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        level = parseInt(event.target.name);
                        if (!(Global.panduanJoinRoom(Global.playerDto.gold, level, this._valGame_ID) == true)) return [3 /*break*/, 2];
                        conf = ResManager.getResConf(this._valGame_ID);
                        return [4 /*yield*/, SceneManager.loadGroup(conf)];
                    case 1:
                        _a.sent();
                        this.sendEnterRoomMsg({ roomId: level, roomType: this._valGame_ID }, true);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *  打开牛牛页面
     */
    SelectScene.prototype.openNiuNiuRoomLayer = function () {
        SoundManage.playEffect('btnClick');
        new Layers.CreateRoomLayer().open();
    };
    SelectScene.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
        this.stopTimer();
        egret.Tween.removeTweens(this._speakerMan);
        this.clearTween();
        EventManager.remove("UpdateUserInfo", this.updateUserInfo, this);
        // this.removeChildren();
    };
    SelectScene.prototype.openBackButtonLayer = function (event) {
        this.currentState = "hall";
        //结束定时发送
        this.stopTimer();
        if (!this._playText.visible) {
            this._playText.visible = true;
        }
    };
    /*
     * 打开拍卖行
     */
    SelectScene.prototype.onOpenPaiMaiLayer = function () {
        net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_DINGDAN_LIST).send();
        if (!this.paiMaiLayer)
            this.paiMaiLayer = new Layers.PaiMaiLayer();
        this.paiMaiLayer.open();
    };
    SelectScene.prototype.UpdateDaoJuList = function (msg) {
        this.paiMaiLayer.list_sale.dataProvider = new eui.ArrayCollection(msg.datas.bagItemList);
    };
    /*
     *  打开福利画面
     */
    SelectScene.prototype.openWelfareLayer = function (event) {
        net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_QITIAN_QIANDAO_INFO).send();
        // Layers.WaitingLayer.open();
        var layer = new Layers.WelfareCenterLayer();
        // layer.init(this.qdData);
        layer.open();
    };
    /**
     *  打开设置画面
     */
    SelectScene.prototype.openSetLayer = function (event) {
        new Layers.SettingLayer("select").open();
    };
    SelectScene.prototype.opensourceList = function (data) {
        var layers = Layers.getLayer(Layers.RankingListLayer);
        if (layers) {
            layers.initRanlist(data);
        }
    };
    /**
    *  打开排行榜画面
    */
    SelectScene.prototype.openInviteButtonLayer = function (event) {
        net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_GET_GOLD_PHB).send();
        new Layers.RankingListLayer().open();
    };
    /**
     * 打开保险箱页面
     */
    SelectScene.prototype.openSafeBoxLayer = function (event) {
        net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ADD_BAOXIANXIANG).send();
        new Layers.SafeBoxLayer().open();
    };
    /**
     *  打开商品 金币
     */
    SelectScene.prototype.openGoldAddLayer = function (event) {
        new Layers.RechargeLayer(0).open();
    };
    /**
     *  打开商品 钻石
     */
    SelectScene.prototype.openDiamondAddLayer = function (event) {
        new Layers.RechargeLayer(1).open();
    };
    /**
     *  打开商品 房卡
     */
    SelectScene.prototype.openBuyCardLayer = function (event) {
        new Layers.RechargeLayer(2).open();
    };
    /**
     *  打开加入房间//快速进入
     */
    SelectScene.prototype.openSelectRoomLayer = function (event) {
        if (this.currentState == "hundrednnSelect") {
            var len = this.sarr.length;
            //记录最大人数 // -1 == 找不到合适的房间
            var listPlayerMax = -1;
            //默认一号房
            var index = 10000;
            for (var i = 0; i < len; i++) {
                //当前房间人数<房间容纳的最大人数
                if (this.sarr[i].nowRoomPlayer < this.sarr[i].maxRoomPlayer) {
                    //找到最大人数的房间号
                    if (listPlayerMax < this.sarr[i].nowRoomPlayer) {
                        listPlayerMax = this.sarr[i].nowRoomPlayer;
                        index = this.sarr[i].roomId;
                    }
                }
            }
            if (listPlayerMax != -1) {
                this.sendEnterRoomMsg({ roomId: index, roomType: 8 /* BRNN */ });
                ;
            }
            else {
                egret.log("找不到合适的房间");
                Toast.launch(GameLangs.not_Room_tips);
            }
        }
        else {
            new Layers.EnterRoomLayer().open();
        }
    };
    /**
     *  打开实名登录
     */
    SelectScene.prototype.openRealNameLayer = function (event) {
        // this._speakerMan.addMsg({text:"测试1",showCount:3});
    };
    /**
     *  打开首充礼物
     */
    SelectScene.prototype.openFirstGiftLayer = function (event) {
        new Layers.FirstGiftLayer().open();
        // this._speakerMan.addMsg({ text: "测试2", showCount: 3 });
    };
    /**
     *  打开头像
     */
    SelectScene.prototype.openUserInfoLayer = function (event) {
        new Layers.UserInfoLayer(Global.playerDto, 1).open();
    };
    /**
     *  打开玩法
     */
    SelectScene.prototype.openPlayMethodLayer = function (event) {
        new Layers.PlayMethodLayer().open();
        // console.log("点击openPlayMethodLayer");
    };
    /**
     * 打开战绩页面
     */
    SelectScene.prototype.openCombatGainsLayer = function (event) {
        net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ZHANJI_LIST).send();
    };
    SelectScene.prototype.UpdateZhanjiDatas = function (msg) {
        var layer = new Layers.PerforManceLayer();
        //数据结构化
        var j = 0;
        for (var i in msg.datas.zhanjiList) {
            if (msg.datas.zhanjiList.hasOwnProperty(i)) {
                //创建一组战绩数据
                if (!this.zhanjiArray[j])
                    this.zhanjiArray[j] = {};
                this.zhanjiArray[j].gameID = msg.datas.zhanjiList[i].gameId;
                this.zhanjiArray[j].roomID = msg.datas.zhanjiList[i].roomId;
                this.zhanjiArray[j].createTime = msg.datas.zhanjiList[i].createTime;
                this.zhanjiArray[j].playerName = [];
                this.zhanjiArray[j].zhanji = [];
                var l = 0;
                //添加基本信息
                for (var k in msg.datas.zhanjiList[i].playerNames) {
                    if (msg.datas.zhanjiList[i].playerNames.hasOwnProperty(k)) {
                        if (!this.zhanjiArray[j].playerName[l])
                            this.zhanjiArray[j].playerName[l] = {};
                        this.zhanjiArray[j].playerName[l].id = k;
                        this.zhanjiArray[j].playerName[l].name = msg.datas.zhanjiList[i].playerNames[k];
                        this.zhanjiArray[j].playerName[l].score = 0;
                    }
                    l++;
                }
                //玩家排序，把自己的名字排在前面
                for (var pIndex = 0; pIndex < this.zhanjiArray[j].playerName.length; pIndex++) {
                    if (Global.playerDto.id.toString() == this.zhanjiArray[j].playerName[pIndex].id) {
                        var playerTemp = this.zhanjiArray[j].playerName[0];
                        this.zhanjiArray[j].playerName[0] = this.zhanjiArray[j].playerName[pIndex];
                        this.zhanjiArray[j].playerName[pIndex] = playerTemp;
                        break;
                    }
                }
                //添加战绩
                for (var n = 0; n < msg.datas.zhanjiList[i].recordRoomList.length; n++) {
                    //添加时间戳
                    if (!this.zhanjiArray[j].zhanji[n]) {
                        this.zhanjiArray[j].zhanji[n] = {};
                        this.zhanjiArray[j].zhanji[n].record = [];
                        this.zhanjiArray[j].zhanji[n].time = msg.datas.zhanjiList[i].recordRoomList[n].time;
                    }
                    // this.zhanjiArray[j].zhanji[n].record = msg.datas.zhanjiList[i].recordRoomList[n];
                    for (var o = 0; o < this.zhanjiArray[j].playerName.length; o++) {
                        var isFound = false;
                        for (var m in msg.datas.zhanjiList[i].recordRoomList[n]) {
                            if (msg.datas.zhanjiList[i].recordRoomList[n].hasOwnProperty(m) && m == this.zhanjiArray[j].playerName[o].id) {
                                this.zhanjiArray[j].playerName[o].score += msg.datas.zhanjiList[i].recordRoomList[n][m];
                                // this.zhanjiArray[j].playerName[o].zhanji.push(msg.datas.zhanjiList[i].recordRoomList[n][m]);//添加战绩
                                this.zhanjiArray[j].zhanji[n].record[o] = msg.datas.zhanjiList[i].recordRoomList[n][m];
                                // console.log("查询到战绩:", msg.datas.zhanjiList[i].recordRoomList[n][m]);
                                isFound = true;
                                break;
                            }
                        }
                        if (!isFound)
                            // this.zhanjiArray[j].playerName[o].zhanji.push(0);
                            this.zhanjiArray[j].zhanji[n].record[o] = 0;
                    }
                }
                //排列二级页面数据
                // this.zhanjiArray[j].zhanji = [];
                // if (this.zhanjiArray[j].playerName) {
                // 	for (var ii = 0; ii < this.zhanjiArray[j].playerName[0].zhanji.length; ii++) {
                // 		for (var jj = 0; jj < this.zhanjiArray[j].playerName.length; jj++) {
                // 			this.zhanjiArray[j].zhanji[ii].record[jj] = this.zhanjiArray[j].playerName[jj].zhanji[ii];
                // 			console.log("recordTemp：", this.zhanjiArray[j].zhanji[ii].record);
                // 		}
                // 	}
                // }
                j++; //每一个房间战绩的index
            }
        }
        if (this.zhanjiArray)
            this.zhanjiArray.reverse();
        layer._listItemData = new eui.ArrayCollection(this.zhanjiArray);
        // console.log("总：", this.zhanjiArray);
        // var list = msg.datas.zhanjiList;
        // for (var i in list) {
        // 	if (list.hasOwnProperty(i)) {
        // 		console.log("有房间号:", list[i].roomId);
        // 	}
        // }
        layer.open();
    };
    /**
     *  用户信息显示
     */
    SelectScene.prototype.updateUserInfo = function () {
        var self = this;
        if (Global.playerDto.diamond > 100000) {
            this._Diamondlabel.text = Math.floor(Global.playerDto.diamond / 10000) + GameLangs.wan;
        }
        else {
            this._Diamondlabel.text = Global.playerDto.diamond + "";
        }
        if (Global.playerDto.gold > 100000) {
            this._GoldLabel.text = Math.floor(Global.playerDto.gold / 10000) + GameLangs.wan;
        }
        else {
            this._GoldLabel.text = Global.playerDto.gold + "";
        }
        self._IDLabel.text = Global.playerDto.id + "";
        self._nameLabel.text = Global.playerDto.nickName;
        self._cardLab.text = Global.playerDto.fangkaCount + "";
        self._cardNiu.text = Global.playerDto.niukaCount + "";
    };
    return SelectScene;
}(BaseScene));
__reflect(SelectScene.prototype, "SelectScene");
//# sourceMappingURL=SelectScene.js.map