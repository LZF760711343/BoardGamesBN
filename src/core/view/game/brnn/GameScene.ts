namespace niuniu.brnn {
    // const maxHealth: number = 100000000;
    export class GameScene extends GameSceneBase {
        public msgHandler: GameMsgHandler;
        public effectLayer: GameEffectLayer;
        public gameDatas: GameDatas;
        public uiLayer: GameUI;
        public players: Player[];
        private text_level: eui.Label;
        /**
         * 筹码按钮组
         */
        private _chipGroup: eui.Group;
        private _chipRadioButtonGroup: eui.RadioButtonGroup;
        /**
         * 庄家输赢历史记录
         */
        // private _hisBox: HistroyBox;
        private _pool0: ChipsPool;
        private _pool1: ChipsPool;
        private _pool2: ChipsPool;
        private _pool3: ChipsPool;
        /**
         * 筹码池列表
         */
        public _chipsPools: ChipsPool[];

        public delay = 0;
        public flytime = 0;

		/**
		 * 庄家的金币进度条
		 */
        public _dealerCoinsBar: eui.ProgressBar;
		/**
		 * 是否自动上庄的toggle按钮
		 */
        public _autoApplyBtn: eui.ToggleButton;
		/**
		 * 倒计时
		 */
        public _countDown: UI.BrnnCountDown;
		/**
		 * 按钮组
		 */
        public _btnBar: eui.Group;
		/**
		 * 换桌按钮
		 */
        public _changeDeskBtn: UI.CommonBtn;
		/**
		 * 加入游戏按钮
		 */
        public _joinGameBtn: UI.CommonBtn;
        /**
         * 申请当王按钮
         */
        public _applyBtn: UI.CommonBtn;

        /** 上局大赢家面板 */
        private _winerInfoGroup: eui.Group;
        /** 上局大赢家列表 */
        private _winerList: eui.List;

        /**申请王列表 */
        private _wangListGroup: eui.Group;
        private _wangList: eui.List;
        /** 房间号 */
        public _roomId: eui.Label;

        /** 庄家胜利时的闪光 */
        public _shanguang: niuniu.brnn.ZhuanJiaShanguang;

        private _zhuangChipGroup: eui.Group;
        private _chipsLb: eui.Label;
        private _chipIcon: eui.Image;

        /** 投筹码进度 */
        private _chipCountPgb: eui.ProgressBar;

        public constructor(args: any[]) {
            super(args);
            this.skinName = GameSceneSkin;
            // this._dealerCoinsBar.maximum = maxHealth;
        }
        public _jxyaBtn: UI.CommonBtn;

        protected childrenCreated(): void {
            super.childrenCreated();
            egret.log("childrenCreated!!!!!");
            this._chipsPools = [this._pool0, this._pool1, this._pool2, this._pool3];
            this._jxyaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jxYa, this);
            this.startTimer(1, 1000 / 24);
            // SoundManage.playMusic(SoundManage.keyMap.nn_bg);
            SoundManage.playMusic(SoundManage.keyMap.brnn_bg);

            // this._autoApplyBtn.addEventListener(egret.Event.CHANGE, this.onChangeAutoBtnChange, this);
            this.uiLayer.isShowVoiceBtn(this.gameDatas.isSelfKing);

            //为换桌按钮注册换桌事件
            if (this.uiLayer._huanZhouBtn) {
                this.uiLayer._huanZhouBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeDesk, this);
            }
        }
        private onChangeAutoBtnChange() {
            this.gameDatas.isAutoApplyDeal = this._autoApplyBtn.selected;
            if (this._autoApplyBtn.selected) {
                this.msgHandler.autoApplyDeal();
            }
        }
        protected update() {
            super.update();
            if (this.uiLayer) {
                this.uiLayer.timerFunc();
            }
        }
        /**
         * 换桌按钮回调
         */
        protected onChangeDesk() {
            //如果自己这一局下注了,那么得等下局开始才给换桌
            if (this.gameDatas.selfInChipsList[0]) {
                Toast.launch(GameLangs.gameNotOverTip);
                return;
            }
            super.onChangeDesk();
        }
        /**
         * 初始化筹码按钮组的数据
         */
        private initChipsBtns() {
            let arrLen = this.gameDatas.brnnRoomInfo.createinfo.betChips.length;
            // egret.log("arrLen", arrLen);
            for (let i = 0; i < arrLen; i++) {
                let btn = <eui.RadioButton>this._chipGroup.getChildAt(i);
                btn.value = this.gameDatas.brnnRoomInfo.createinfo.betChips[i];
            }
        }
        /** 初始化走势图UI的信息 */
        public initHistroyListUI() {
            this.gameDatas.winRewardList = this.gameDatas.brnnRoomInfo.winRewardList.reverse();
            for (; this.gameDatas.winRewardList.length > 9;) {
                this.gameDatas.winRewardList.pop();
            }
        }
        /** 更新走势图UI的信息 */
        public updateHistroyListUI(winRewardList: number[]) {
            this.gameDatas.winRewardList.unshift(winRewardList);
            for (; this.gameDatas.winRewardList.length > 9;) {
                this.gameDatas.winRewardList.pop()
            }
            //实时更新正在打开走势图面板的信息
            // EventManager.createEventByName("UPDATE_HISTROYLIST").dispatchEventWith("UPDATE_HISTROYLIST",false,this.gameDatas.winRewardList);
        }
        public reset() {
            this.updatePlayerInfo();
            this.updateMyPlayerInfor();
            this.gameDatas.reset();
            this._jxyaBtn.enabled = true;
            this.updateChipGroupUI();
            let arrLen = this._chipsPools.length;
            for (let i = 0; i < arrLen; i++) {
                this._chipsPools[i].reset();
                this._chipsPools[i].HideCard();
            }
            this._handCardBox.reset();
            // this._disBox.visible = false;
            this.HideCard();
            this.resetChipCountPgb();
        }


        /**
	 * 初始化一些游戏数据
	 */
        public initDatas(datas: model.EnterBrnnRoomInfo) {
            let gameDatas = this.gameDatas = new GameDatas();
            gameDatas.brnnRoomInfo = datas;
            this.gameDatas.zhaungMoney = this.gameDatas.brnnRoomInfo.sumChips;
            this.gameDatas.updateKingInfo();
        }
        /**
         * 初始化
         */
        public init() {
            egret.log("initGame!!!!!");
            this.initUI();//先初始化ui
            this.msgHandler = new GameMsgHandler(this, this.gameDatas);//创建游戏的消息派发器
            //下一帧才开始派发消息,因为有一些UI的数据在当前帧拿到的是不正确的
            net.dispatchMsg();
            // this.msgHandler.sendSitDownMsg();
            // FrameManager.getInstance().addFrame(net.dispatchMsg, net, 0, 1);
            // this.updateWangList();
        }
        /**
         * 更新坐下状态UI
         */
        public setIsSitDown() {
            // egret.log("IsSitDown:", this.gameDatas.isSitDown)
            let arrLen = this._chipsPools.length;
            this.gameDatas.isSitDown = this.gameDatas.weizhi > -1;
            for (let i = 0; i < arrLen; i++) {
                this._chipsPools[i].setIsSitDown(this.gameDatas.isSitDown);
            }
            // this._btnBar.visible = !this.gameDatas.isSitDown;
        }

        protected initUI() {
            super.initUI();
            egret.log("initUI!!!!!");
            let self = this;
            let eg = egret;
            self.uiLayer.gameDatas = self.gameDatas;
            self.initChipsBtns();
            self._chipRadioButtonGroup = (<eui.RadioButton>self._chipGroup.getChildAt(0)).group;
            let arrLen = self._chipsPools.length;

            self.players = [];
            for (let i = 0; i < 8; ++i) {
                let player: Player = self["_player" + i];
                self.players[i] = player;
                player.visible = !i;
                player._roleId.source = "role_$1_png".format(i + 1);
                player.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
            }
            //将庄家玩家面板也添加进players中
            if (self["_playerZhuang"]) {
                self.players[self.players.length] = self["_playerZhuang"];
            }
            this._handCardBox.disBox = this._disBox;
            this._player8.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
            // this._playerZhuang._headBox.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openUserInfoLayer, self);
            for (let i = 0; i < arrLen; i++) {
                self._chipsPools[i].reset();
                self._chipsPools[i].zuowei = i + 1;
            }

            if (self.gameDatas.gameType == GAME_TYPE.CARD) {
                self.text_level.visible = false;
            }
            self.addEventListener(eg.TouchEvent.TOUCH_TAP, self.onTouchTap, self);
            //添加倒计时回调
            self._countDown.addCompleteFunc(self.countDownComplete, self);
            if (self.gameDatas.brnnRoomInfo.wangNameList.length) {
                self._tipBar.curState = TipBarStatu.WAIT;
            } else {
                self._tipBar.curState = TipBarStatu.WAIT_KING;
            }
            this.initHistroyListUI();
            this.updateChipGroupUI();

            //因为列表是空的所以报错了
            // egret.log("this.gameDatas.brnnRoomInfo.wangNameList[0].playerId", this.gameDatas.brnnRoomInfo.wangNameList[0].playerId);
            if (this.gameDatas.brnnRoomInfo.wangNameList[0])
                this.updataKingHead();

            this._roomId.text = GameLangs.gameRoomId.format(this.gameDatas.brnnRoomInfo.roomId);

        }

        public _player8: Player;

        //更新玩家信息 自己
        public updateMyPlayerInfor() {
            let myInfo = this.gameDatas.playerDatas[this.gameDatas.myPlyerId];
            this._player8.updateChips(myInfo.chips, false);
            this._player8.updateInfo(myInfo.UserInfo);
        }

        public updateMyPlayerInfor1() {
            this._player8.updateChips(Global.playerDto.gold, false);
        }
        public updateMyPlayerInfor2(id) {
            let player: Player = this.getPlayerById(id);
            if (player) {
                player.updateChips(this.gameDatas.playerDatas[id].chips)
            }
        }

        //更新玩家信息
        public updatePlayerInfo() {
            let list = this.gameDatas.getMaxGoldPalyerId();
            for (let i = 0; i < 8; i++) {
                if (list[i]) {
                    let player = this.players[i];
                    player.visible = true;
                    var info = this.gameDatas.playerDatas[list[i]];
                    if (info) {
                        if (info.playerFlags !== -1 && info.playerFlags & 0x1) {
                            player.setOffTip();
                        } else {
                            player.removeOffTip();
                            info.playerFlags = (info.playerFlags >> 1) << 1;
                        }
                        player.updateChips(info.chips, false);
                        player.updateInfo(info.UserInfo);
                    }
                } else {
                    this.players[i].visible = false;
                }
            }
            this.updataKingHead();
            this.updateMyPlayerInfor();
        }
        /**
         * 更新申请当王按钮UI
         * 如果还不是王,显示申请当王
         * 如果已经是王了,则显示退位让贤
         */
        public updateKingBtn() {
            // this._applyBtn.icon = this.gameDatas.isSelfKing ? "brnn_twrx_png" : "sqdw_text1_png";
            this._applyBtn.icon = this.gameDatas.isSelfKing ? "twrx_text_png" : "sqsz_hztext_png";
            // this._applyBtn.label = this.gameDatas.isSelfKing ? "退位让贤" : "申请当庄";
        }
        public _playerZhuang: Player;
        public updataKingHead() {
            if (this.gameDatas.brnnRoomInfo.wangNameList[0]) {
                let id = this.gameDatas.brnnRoomInfo.wangNameList[0].playerId;

                if (this.gameDatas.playerDatas[id]) {
                    let Info = this.gameDatas.playerDatas[id];
                    // egret.log("Info1111", Info);
                    Info.UserInfo.gold = Info.chips;
                    // this._playerZhuang.updateChips(Info.chips, false);
                    this._playerZhuang.updateInfo(Info.UserInfo);
                    this._zhuangChipGroup.visible = true;
                    if (Info.chips > 100000) {
                        this._chipsLb.text = Math.floor(Info.chips / 10000) + GameLangs.wan;
                    } else {
                        this._chipsLb.text = Info.chips + "";
                    }
                    // this._chipsLb.text = Info.chips.toString();
                }
                // else {
                //     this._playerZhuang._headBox.setIcon(DEFAULT_HEAD_IMG);
                //     this._playerZhuang._nameLb.text = "";
                // }
            } else {
                // this._playerZhuang._headBox.setIcon(DEFAULT_HEAD_IMG);
                this._playerZhuang._headBox.setIcon("");
                this._playerZhuang._nameLb.text = "";
                this._playerZhuang.playerId = 0; //暂时给个不存在的id置空玩家面板
                this._zhuangChipGroup.visible = false;
            }

        }

        //倒计时完毕
        private countDownComplete() {
            this._countDown.visible = false;
        }
        /**
         * 刷新下注筹码按钮组的UI,
         * 玩家等级低于XX或游戏场次少于XX（可配置）时，应把部分面额锁住，不能选择。达到条件自动解锁。
		 * 玩家所能下柱的最大上限金额=背包金币数/10（可配置）. 当上限金额小于下注面额时，则次面额变灰。
         */
        public updateChipGroupUI() {
            //最大可下注额
            let maxBetCount = (Global.playerDto.gold + this.gameDatas.selfInChipsList[0]) / 10;
            //庄家剩下的可下注额度(破水翻一倍)
            let delearLeftCaNBetCount = this.gameDatas.zhaungMoney * 0.2 - this.gameDatas.sumInChipsList[0];
            //剩下的可下注的额度
            let leftCanBetCount = maxBetCount - this.gameDatas.selfInChipsList[0];
            for (let i = this.gameDatas.brnnRoomInfo.createinfo.betChips.length - 1; i >= 0; i--) {
                let btn = <eui.RadioButton>this._chipGroup.getChildAt(i);
                // || btn.value > delearLeftCaNBetCount
                if (btn.value > leftCanBetCount || btn.value > delearLeftCaNBetCount) {//如果下注按钮的下注额大于可下注的额度,将按钮设为不可点击
                    btn.enabled = false;
                    if (btn.selected && i != 0) {//如果这个按钮是当前选中的按钮,并且不是第一个按钮,自动将选中按钮设置为上一个额度的按钮
                        let preBtn = <eui.RadioButton>this._chipGroup.getChildAt(i - 1);
                        btn.selected = false;
                        preBtn.selected = true;
                    }
                } else {
                    btn.enabled = true;
                }
            }
        }
        /**
         * 点击筹码池的回调
         */
        private onBet(target) {
            if (this.gameDatas.gameStatus == GAME_STAGE.TOU_ZHU) {//当前是下注阶段才允许下注
                if (!this.gameDatas.goDoDettian) {
                    this.gameDatas.playerGoDetain.bets = [0, 0, 0, 0, 0];
                    this.gameDatas.goDoDettian = true;
                }
                this.gameDatas.playerGoDetain.bets[target.zuowei] += this._chipRadioButtonGroup.selection.value;
                this.msgHandler.sendBetMsg(this._chipRadioButtonGroup.selection.value, target.zuowei);
            }

        }
        /** 续押 */
        private jxYa() {

            if (this.gameDatas.gameStatus == GAME_STAGE.TOU_ZHU) {//当前是下注阶段才允许下注
                let bets = this.gameDatas.playerGoDetain.bets;
                let isShowTip = true;
                let arrLen = bets.length;
                //筹码列表
                let betChips: number[] = this.gameDatas.brnnRoomInfo.createinfo.betChips;
                let len = betChips.length - 1;
                for (let i = 0; i < arrLen; i++) {
                    let count = bets[i];
                    for (let j = len; j >= 0;) {
                        if (count >= betChips[j]) {
                            this.msgHandler.sendBetMsg(betChips[j], i);
                            count -= betChips[j];
                            isShowTip = false;
                        } else {
                            j--;
                        }
                    }
                }
                if (isShowTip) {
                    Toast.launch(GameLangs.notBetTip);
                } else {
                    this.gameDatas.playerGoDetain.curCount++;
                }
                if (this.gameDatas.playerGoDetain.curCount == this.gameDatas.playerGoDetain.maxCount) {
                    this._jxyaBtn.enabled = false;
                }

            } else {
                Toast.launch(GameLangs.notBetTimeTip);
            }
        }

        /**
         * 弹出提示换桌的弹窗
         * @param str:要提示的内容
         */
        public showChangeDeskTip(str: string) {
            let alert = Layers.HintLayer.create();
            alert.init({
                curState: Layers.HintLayer.SURE_CANNEL2,
                leftBtnBg: "orange_icon_png",
                rightBtnBg: "red_icon1_png",
                rightBtnIcon: "huanzhuo_text1_png",
                rightFunc: this.msgHandler.sendChangeDeskMsg,
                rightThisObj: this.msgHandler,
                tipsStr: str
            });
            alert.open();
        }
        /**
         * 检查是否已经坐下,如果坐下了就执行func函数,否则发送坐下的消息给服务器
         * @param func:如果已经坐下要执行的函数
         * @param thisObj:this执行的对象
         * @param 坐下后是否要检查当前有没有当王的玩家,如果没有人当王的话,弹出询问玩家是否换桌的弹窗
         */
        private checkIsDown(func: Function, thisObj: Object, isCheckKing?: boolean) {
            // egret.log("this.gameDatas.isSitDown:", this.gameDatas.isSitDown)
            if (this.gameDatas.isSitDown) {
                if (isCheckKing && this.gameDatas.brnnRoomInfo.wangNameList.length === 0) {
                    this.showChangeDeskTip(GameLangs.notKingTip);
                } else {
                    func.call(this, thisObj);
                }

            } else {
                this.msgHandler.sendSitDownMsg();
            }
        }
        private onTouchTap(event: egret.TouchEvent) {
            let target = event.target;
            if (target instanceof ChipsPool) {//如果点击到的是筹码池的话
                this.onBet(target)
                return
                // this.checkIsDown(this.onBet, target, true);
                // this.msgHandler.sendLeaveScoreRoom();
            }
            if (target === this._applyBtn) {//如果点击的是上庄按钮
                // if (this.gameDatas.isSelfKing) {//如果自己已经上庄的,就发送下庄消息
                this.msgHandler.sendShenQingList();
                let layer = new Layers.ShenQingListLayer();
                // layer.init();
                // layer.init(this.gameDatas.shenqingShangzhuangList);
                layer.open();

                // } 
                // this.checkIsDown(this.onApplyDealer, target);

            } else if (target === this._playerZhuang) {
                if (event.localX <= (this._playerZhuang.width / 3)) {
                    this.msgHandler.sendShenQingList();
                    let layer = new Layers.ShenQingListLayer();
                    layer.open();
                } else {
                    this.openUserInfoLayer(null, this._playerZhuang);
                }
            }
            // if (target === this._autoApplyBtn) {//自动上庄按钮
            //     this.checkIsDown(this.onChangeAutoBtnChange, target);
            // }
            // if(target ==== th
        }

        public openWangList(data: number[]) {
            let layers: Layers.ShenQingListLayer = Layers.getLayer(Layers.ShenQingListLayer);
            let names: string[] = [];
            let arrLen = data.length;
            for (let i = 0; i < arrLen; i++) {
                let playData = this.gameDatas.playerDatas[data[i]];
                if (playData) {
                    let name = playData.UserInfo.nickName;
                    if (name.length > 7) {
                        name = name.substring(0, 7) + "...";
                    }
                    names.push(name);
                } else {
                    names.push("");
                }
            }
            if (layers) {
                // layers.init(data, this.gameDatas.isSelfKing);
                layers.init(names, this.gameDatas.isSelfKing);
            }
        }

        public doDaJiDaLiAni() {
            SoundManage.playEffect("brnn_jiesuan");
            return this.effectLayer.playAuiAsync1("dajidali");
        }
        /**
            * 播放添加一个筹码的动画
            * @param index:筹码池的位置
            * @param chips:下注的额度
            * @param isSelf:是否自己下注的
            */
        public addChipAni(index: number, chips: number, id: number, type: number) {
            let chipsId = this.gameDatas.brnnRoomInfo.createinfo.betChips.indexOf(chips) + 1;
            // egret.log("betChips:",this.gameDatas.brnnRoomInfo.createinfo.betChips);
            // egret.log("chipsId:", chipsId);
            // this._chipsPools[index - 1].addChipAni(chipsId);
            let i = 0;
            for (i = 0; i < 8; i++) {
                if (id == this.players[i].playerId) {
                    var payer = this.players[i];
                    break;
                }
            }
            if (payer)
                this._chipsPools[index - 1].addChipAni(payer, type, chipsId, chips, i);
            else {
                this._chipsPools[index - 1].addChipAni(this.uiLayer._playGameLabelTabBtn, type, chipsId, chips, i);
            }
        }

        // public GetPlayerPosByID(playerID: number): number {
        //     for (var i = 0; i < 4; i++) {
        //         if (playerID == this.players[i].playerId) {
        //             return i;
        //         }
        //     }
        //     ret urn -1;
        // }
        /**
         * 播放添加一个筹码的玩家动画
         */
        public async addChipPlayAui(id: number) {
            let player = this.getPlayerById(id);

            if (player) {
                // player.updateInfo(id.UserInfo);
                player.start(player.name);
            } else {
                //如果投的筹码时场外玩家，也抖动一下场外玩家框
                this.uiLayer.start();
                // DEBUG && egret.error(`Player ${id} Is Not Exist!!!!`)
            }
        }

        /**
         * 开始倒计时
         */
        public startCountDown(count: number) {
            if (this.gameDatas.gameStatus === GAME_STAGE.TOU_ZHU || this.gameDatas.gameStatus === GAME_STAGE.START) {
                this._countDown.visible = true;
                let curTime = Math.ceil(count / 1000)

                this._countDown.startTimer(curTime);
            }
            if (this.gameDatas.gameStatus === GAME_STAGE.SHOW_ME) {
                this._countDown.visible = false;
            }
        }

        /**
        * 刷新庄家血条
        */
        public UpdateHealth() {
        }


        public _changeCHIPS(num: number) {
            this.uiLayer.changeCHIPS(num);

            // new GameUI().changeCHIPS(num);
        }
        public _changejewel(num: number) {
            this.uiLayer.changejewel(num);
        }
        private _cuopai: niuniu.brnn.ZhuanJiaCuoPai;

        private _yazhuImg: eui.Image;
        private _qddImg: eui.Image;
        private _zhunbeiImg: eui.Image;


        /**
         * 修改游戏当前状态
         */
        public changeStage() {
            let self = this;
            DEBUG && egret.log("当前状态:", self.gameDatas.gameStatus);
            switch (self.gameDatas.gameStatus) {
                case GAME_STAGE.PRE_START://等待开始游戏
                    self._chipGroup.visible = !self.gameDatas.isSelfKing;
                    self._qddImg.visible = false;
                    self._zhunbeiImg.visible = false;
                    //闪光动画停止
                    this._shanguang.visible = false;
                    this._shanguang.curState = SGStatu.NONE;
                    for (let i = 0; i < this._chipsPools.length; i++) {
                        this._chipsPools[i]._shangguang.visible = false;
                        this._chipsPools[i]._shangguang.curState = SCPSStatu.NONE;
                    }
                    self.reset();
                    self._yazhuImg.visible = false;
                    break;
                case GAME_STAGE.TOU_ZHU://可以投注
                    if (!this.gameDatas.isReconnect) {
                        this.startGame();
                    }
                    this.gameDatas.isReconnect = true;
                    self._chipGroup.visible = !self.gameDatas.isSelfKing;
                    self._yazhuImg.visible = true;
                    self._chipCountPgb.visible = true;
                    self._zhunbeiImg.visible = false;
                    SoundManage.playEffect("nn_jetton", 0.8);
                    break;
                case GAME_STAGE.SHOW_ALL://显示所有人的手牌
                    self._chipGroup.visible = !self.gameDatas.isSelfKing;
                    self._cuopai.visible = false;
                    self._cuopai.curState = CuoPaiStatu.NONE;
                    self._yazhuImg.visible = false;
                    break;
                case GAME_STAGE.SHOW_ME://搓牌
                    self._yazhuImg.visible = false;
                    self._chipCountPgb.visible = false;
                    break;
                case GAME_STAGE.START:
                    self._zhunbeiImg.visible = true;
                    self._chipGroup.visible = !self.gameDatas.isSelfKing;
                    if (self.gameDatas.gameStatus != self.gameDatas.lastGameStatus) {
                        SoundManage.playEffect("brnn_zhunbei", 0.8);
                    }
                    break;
            }
            // self._dealerCoinsBar.value = self.gameDatas.zhaungMoney > maxHealth ? maxHealth : self.gameDatas.zhaungMoney;
        }
        public startGame() {
            this.effectLayer.playAuiAsync("start");;
        }

        /**
         * 申请当庄按钮
         */
        private onApplyDealer() {
            if (this.gameDatas.isSelfKing) {//如果自己已经上庄的,就发送下庄消息
                this.msgHandler.sendAskXiazhuang();
            } else {
                this.msgHandler.sendAskShangzhuang();
            }
        }
        public _handCardBox: HandCardBox;
        public _disBox: DisCardBox;


        public async dealCardById(delay: number, cards?: number[], handvalue?: number, callBack?: Function, target?: Object) {
            if (this.gameDatas.isSelfKing) {
                return this._handCardBox.dealAni(delay, cards, handvalue, callBack, target);
            }
        }

        public async addCard(cardValue: number, callBack?: Function, target?: Object) {
            if (this.gameDatas.isSelfKing) {
                return this._handCardBox.addCardAni(cardValue, callBack, target);
                // this.msgHandler.sendShowMsg(0);

                // new Promise(this._handCardBox.addCardAni(cardValue, callBack, target).then(callBack () {
                //     egret.log("aaa");
                // }
                // let p1 = new Promise(this._handCardBox.addCardAni(cardValue, callBack, target));
            }
        }
        /**
         * 发牌动画跟搓牌动画
         */
        public async doSendCardAui(data: model.GameOverData) {
            let arrLen = this._chipsPools.length;
            let list = data.list;
            let waitTime: number = 0;
            this._disBox.visible =
                this._chipsPools[0]._disBox.visible =
                this._chipsPools[1]._disBox.visible =
                this._chipsPools[2]._disBox.visible =
                this._chipsPools[3]._disBox.visible =
                true;
            for (let j = 0; j < 5; j++) {
                await this._chipsPools[0].PlaySendCardAni(this.effectLayer, j, list[1].cardsInfo.cards[j], j != 3);
                await this._chipsPools[1].PlaySendCardAni(this.effectLayer, j, list[2].cardsInfo.cards[j], j != 3);
                await this._chipsPools[2].PlaySendCardAni(this.effectLayer, j, list[3].cardsInfo.cards[j], j != 3);
                await this._chipsPools[3].PlaySendCardAni(this.effectLayer, j, list[4].cardsInfo.cards[j], j != 3);
                await this._disBox.PlaySendCardAni(this.effectLayer, j, list[0].cardsInfo.cards[j], j != 3);
            }
            //如果自己是庄家,加上搓牌动画
            if (this.gameDatas.isSelfKing) {
                this.wait(1000);//给点时间看牌
                let cardValue = data.list[0].cardsInfo.cards[3];
                var cuopai = new niuniu.CuoPaiAni();
                cuopai.name = "sprite1";
                this.addChild(cuopai);
                cuopai.PlayCuoPai(cardValue, this.cuopaiFinish, this);
            } else {//显示庄家正在搓牌
                this._cuopai.visible = true;
                this._cuopai.curState = CuoPaiStatu.WAIT;
            }
        }
        private cuopaiFinish() {
            this.msgHandler.sendShowMsg();
        }

        public HideCard() {
            this._disBox.HideCard();
        }

        /**
         * 播放结束动画
         */
        public async doGameOverAni(callBack?: Function, target?: Object) {
            let arrLen = this._chipsPools.length;
            SoundManage.playEffect("brnn_kaipai", 0.8);
            let list = this.gameDatas.gameOverDatas.list;

            for (let i = 0; i < arrLen; i++) {
                if (list[i + 1].chipsPoolInfo) {
                    //更新下注信息框里面小结的label
                    this._chipsPools[i].updateAccountChipsLb(list[i + 1].chipsPoolInfo.win_chips);
                }
            }
            //闲家一个个的播放开牌动画
            for (let i = 0; i < arrLen; i++) {
                await this._chipsPools[i].doShowCardAni(list[i + 1], this.gameDatas.selfInChipsList[i + 1] ? this.gameDatas.selfInChipsList[i + 1] : 0);
            }
            //播放庄家开牌动画
            await this._disBox.doShowCardAni(list[0]);
            this.updateHistroyListUI(this.gameDatas.brnWinResult);
            let handType = this.calHandValue(list[0].cardsInfo.handValue);
            if (handType >= 3 && handType <= 11) {
                await this.doDaJiDaLiAni();
            }

            /** 上局大赢家 */
            //稍微停顿一下
            await this.wait(500);
            //开完牌后，发送显示输赢结果的信息
            for (let i = 0; i < arrLen; i++) {
                this._chipsPools[i]._disBox.settTypeIconVisible(true);
            }
            //播放赢的筹码池闪动动画
            for (let i = 0; i < arrLen; i++) {
                this._chipsPools[i].playChisAui(this.gameDatas.brnWinResult[i]);
            }
            SoundManage.playEffect("brnn_jiesuan");
            //回收所有筹码
            for (let i = 0; i < arrLen; i++) {
                //输赢结果,输赢倍率
                this._chipsPools[i].PlayFlyChip(this.gameDatas.brnWinResult[i], this.gameDatas.gameOverDatas.list[i + 1].cardsInfo.rewardRate);
            }
            //播放玩家面板飘字结算动画
            for (let i = 0; i < this.gameDatas.hzBrNnMsgList.length; i++) {
                let gameResult = this.gameDatas.hzBrNnMsgList[i];
                let player: Player = this.getPlayerById(gameResult.playerId);
                if (player) {
                    if (gameResult.roundWinChips) {
                        player.doEndAni(gameResult.roundWinChips);
                    }
                }
                if (gameResult.roundWinChips && gameResult.playerId == this._player8.playerId)
                    this._player8.doEndAni(gameResult.roundWinChips);
            }
            // egret.setTimeout(() => {
            //     let lll;
            //     lll.k;
            // }, this, 100)
            //播放庄家闪光动画
            //如果庄家赢了，播放庄家动画
            // egret.log("this.gameDatas.brnWinResult[this.gameDatas.brnWinResult.length-1]", this.gameDatas.brnWinResult[this.gameDatas.brnWinResult.length - 1]);
            if (!this.gameDatas.brnWinResult[4]) {
                this._shanguang.visible = true;
                this._shanguang.curState = SGStatu.WIN;
            }
            //在这里更新走势图
            //实时更新正在打开走势图面板的信息
            EventManager.createEventByName("UPDATE_HISTROYLIST").dispatchEventWith("UPDATE_HISTROYLIST", false, this.gameDatas.winRewardList);
            //显示上局大赢家面板
            this._winerInfoGroup.visible = true;
            let threeArr = this.getWinerList();
            // this.getWinerList().slice(0, 3).forEach((el, i) => {
            //     if (el) {
            //         let gold = el.gold;
            //         let newGold = "";
            //         if (gold > 100000) {
            //             newGold = Math.floor(gold / 10000) + GameLangs.wan;
            //         } else {
            //             newGold = gold.toString();
            //         }
            //         threeArr.push({ id: el.id, name: el.name, gold: newGold });
            //         // return { id: el.id, name: el.name, gold: newGold };
            //     }
            //     // return null;
            // });  //获取前三名的数据给列表
            let arrayList = new eui.ArrayCollection(threeArr);

            this._winerList.dataProvider = arrayList;
            //播放面板出现动画
            egret.Tween.get(this._winerInfoGroup).wait(1000).to({ y: 0 }, 1000).wait(4000).to({ y: -156 }, 1000).call(() => {
                this._winerInfoGroup.visible = false;
                this._winerList.dataProvider = null;
            });

            this._tipBar.curState = TipBarStatu.ACCOUNT;
            this._tipBar.setMoney(this.gameDatas.gameOverDatas.calInfo ? this.gameDatas.gameOverDatas.calInfo.roundWinChips : 0);
            await this.wait(2000);
            if (Global.playerDto.gold < GameLangs.createRoomConf[GAME_ID.BRNN][this.gameDatas.brnnRoomInfo.roomLevel].gold) {
                if (Global.panduanJoinRoom(Global.playerDto.gold, this.gameDatas.brnnRoomInfo.roomLevel, GAME_ID.BRNN) == false) {
                    this.updateChipGroupUI();
                }
            };
            this.msgHandler.doAllowHandleMsg();
        }

        /**
         * 判断该id是否是王
         */
        private isWang(id: number): boolean {
            let j = 0;
            if (this.gameDatas.brnnRoomInfo.wangNameList[j] && id === this.gameDatas.brnnRoomInfo.wangNameList[j].playerId) {
                //是王
                return true;
            }
            return false;//不是王
        }

        //-- 计算牌形
        public calHandValue(handvalue: number) {
            var handType: any = (handvalue >> 12) & 0xf;
            if (handType == HANDVALUE.NIUX) {
                var value = (handvalue >> 8) & 0xf;
                handType = handType + "" + value;
            }
            return handType;
        }
        /**
         * 刷新筹码池的信息
         */
        public updateChipsPools() {
            let arrLen = this.gameDatas.sumInChipsList.length;
            for (let i = 0; i < 4; i++) {
                let pool = this._chipsPools[i];
                //更新这个筹码池自己的下注的筹码
                // pool.updateAllChipsLb(this.gameDatas.sumInChipsList[i + 1]);
                // //更新这个筹码池总的下注的筹码
                // pool.updateSelfChipsLb(this.gameDatas.selfInChipsList[i + 1]);

                pool.updataChipsLb(this.gameDatas.selfInChipsList[i + 1], this.gameDatas.sumInChipsList[i + 1]);
            }
        }
        /**
         * 点击加入按钮回调
         */
        private onJoinGame() {
            // createRoomConf
            // egret.log("GameLangs.createRoomConf:::" + this.gameDatas.brnnRoomInfo.roomLevel);
            // egret.log("GameLangs.createRoomConf:::" + GameLangs.createRoomConf[GAME_ID.BRNN][this.gameDatas.roomInfo.createinfo.roomLevel].gold);
            if (Global.playerDto.gold < GameLangs.createRoomConf[GAME_ID.BRNN][this.gameDatas.brnnRoomInfo.roomLevel].gold) {
                if (Global.panduanJoinRoom(Global.playerDto.gold, this.gameDatas.brnnRoomInfo.roomLevel, GAME_ID.BRNN) == false) {
                    this.updateChipGroupUI();
                }
            } else {
                this.msgHandler.sendSitDownMsg();
            }

        }
        /**
         * 打开充值页面
         */
        public openRechargeLayer() {
            new Layers.RechargeLayer(0).open();
        }
        /**
         * 游戏退出时自动调用
         */
        protected onExit() {
            super.onExit();
            let arrLen = this.players.length;
            for (let i = 0; i < arrLen; i++) {
                this.players[i].destroy();
            }
            arrLen = this._chipsPools.length;
            for (let i = 0; i < arrLen; i++) {
                this._chipsPools[i].destroy();
            }
            this._disBox.destroy();
            this.effectLayer.clearAllAni();
            FrameManager.getInstance().delayRemoveHandler(this.hashCode);
            this._countDown.stopTimer();
            //开启脏矩形
            // Main.instance.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.ON;
        }

        // protected openUserInfoLayer() {

        // }

        /**
         * 获得本局赢家前三名
         */
        private getWinerList() {
            let windatas = this.gameDatas.hzBrNnMsgList;
            let list = [];
            let arrLen = windatas.length;
            for (let i = 0; i < arrLen; i++) {
                let el = windatas[i];
                if (/*!this.isWang(el.playerId) &&*/ el.roundWinChips > 0) {
                    let id = el.playerId;
                    let info = this.gameDatas.playerDatas[id];
                    if (info) {
                        var name = info.UserInfo.nickName;
                        if (name.length > 5) {
                            name = name.substring(0, 5) + "...";
                        }
                    } else {
                        var name = "";
                    }
                    let gold = el.roundWinChips;
                    let newGold = "";
                    if (gold > 100000) {
                        newGold = Math.floor(gold / 10000) + GameLangs.wan;
                    } else {
                        newGold = gold + "";
                    }
                    list.push({ id: id, name: name, gold: newGold, num: gold })
                }
            }
            list.sort(function (a, b) {
                return b.num - a.num; //按金币从大到小排序
            });

            return list.slice(0, 3);
        }

        /** 设置当前投筹码进度条的进度 */
        public setChipCountPgbValue(value) {
            if (!this.gameDatas.brnnRoomInfo.wangNameList[0]) {
                return; //没有王的话不执行
            }
            let id = this.gameDatas.brnnRoomInfo.wangNameList[0].playerId;
            let info = this.gameDatas.playerDatas[id];
            if (info) {
                let zChip = info.chips * 0.2;
                var num = Math.round((value / zChip) * 100);
                this._chipCountPgb.value = num;
                // egret.log("info:",info,"num:",num,"this.value:",this._chipCountPgb.value,"value:",value);
            }
        }

        /** 重置投筹码进度条 */
        public resetChipCountPgb() {
            this._chipCountPgb.visible = false;
            this._chipCountPgb.value = 0;
        }
        /**
         * 切换到后台的时间戳
         */
        private _backTime: number;
        /**
         * 切换到后台
         */
        public onBackground(evt: egret.TouchEvent) {
            this._backTime = Date.now();
        }
        /**
         * 从后台切换回游戏
         */
        public onForeground(evt: egret.TouchEvent) {
            egret.log("onForeground", net.getServerType(), Date.now() - this._backTime)
            if (net.getServerType() === net.SERVER_TYPE.GAME && Date.now() - this._backTime >= 20000) {
                net.close();
                Layers.HintLayer.create().init({ tipsStr: GameLangs.netCloseTip }).open();
            }
        }
    }
}