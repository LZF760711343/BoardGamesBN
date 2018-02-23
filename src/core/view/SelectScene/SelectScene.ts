
class SelectScene extends BaseScene {
    /**
	 * 分享礼包按钮
	 */
	private _shareGift: UI.CommonBtn;
    /**
	 * 约牌按钮
	 */
	private _JoinEnterIntoRoom: eui.Group;

	/**
	 * 比赛场按钮
	 */
	private _matchRoomBtn: eui.Group;

	/**
	 * 级数选择
	 */

	private _seriesSmall: UI.CommonBtn;
	private _seriesMible: UI.CommonBtn;
	private _seriesBig: UI.CommonBtn;
	/**
	 * 入场金币
	 */
	private _labelGlod1: eui.Label;
	private _labelGlod2: eui.Label;
	private _labelGlod3: eui.Label;
	/**
	 * 加入房间动画
	 */
	private _biibii: egret.tween.TweenGroup;
	private _niu: egret.tween.TweenGroup;
	private _szp: egret.tween.TweenGroup;
	private _bs: egret.tween.TweenGroup;
	private _fj: egret.tween.TweenGroup;
	private _ddz: egret.tween.TweenGroup;
	private _mj: egret.tween.TweenGroup;
	private _Pai: egret.tween.TweenGroup;
	private _left: egret.tween.TweenGroup;
	private _right: egret.tween.TweenGroup;
	private _deng1: egret.tween.TweenGroup;
	private _deng2: egret.tween.TweenGroup;
	private _Gift: egret.tween.TweenGroup;
	/**
	 * 加入房间动画遮罩
	 */
	private _zeRect: UI.CommonBtn;
	private _bibi: eui.Image;
	/**
	 * 大厅左右选择按钮 小图标指示
	 */
	private _clickLeft: eui.Group;
	private _clickRight: eui.Group;
	private _SelectRoom1: UI.CommonBtn;
	private _SelectRoom2: UI.CommonBtn;
	private _slither: eui.Scroller;
	// 游戏消息
	private _GameNews: UI.CommonBtn;


	/**
	  * 快速开始到各个游戏的选择级别
	  */

	// public _selectRoomFastChose: UI.CommonBtn;


	/**
	 * 遮罩头像
	 */

	public _roundMask: eui.Rect;


	/**
	 * 跑马灯
	 */
	public _speakerMan: SpeakerMan;



	private hd_label: eui.Label;
	/**
	* 金币余额
	*/
	public _GoldLabel: eui.Label;

	/**
   * 钻石余额
   */
	public _Diamondlabel: eui.Label;

	/**
	 * 名字标签
	 */
	private _nameLabel: eui.Label;

	/**
	 * ID标签
	 */
	private _IDLabel: eui.Label;
	/**
   * 头像
   */
	private _headIcon: eui.Image;

	/**
	 * 加入房间按钮/快速开始
	 */
	private _SelectRoomButton: eui.Button;
	/**
	 * 实名验证
	 */
	private _RealNameButton: eui.Button;
	/**
	 * 首充礼包
	 */
	private _FirstGiftButon: eui.Button;

	/**
	 * 玩法按钮
	 */
	// private _PlayMethodButton: eui.Button;


	/**
	 * 商城按钮
	 */
	private _ShopButton: UI.CommonBtn;

	/**
	 * 拍卖行按钮
	 */
	private _FeedbackButton: UI.CommonBtn;

	/**
	 * 福利按钮
	 */
	private _welfare: UI.CommonBtn;

	/**
	 * 战绩按钮
	 */
	private _CombatGainsButton: eui.Button;

	/**
	 * 设置按钮
	 */
	private _SetButton: eui.Button;

	/**
	 * 金币+按钮/商店
	 */
	private _GoldAddButton: eui.Button;
	/**
	 * 钻石+按钮/商店
	 */
	private _DiamondAddButton: eui.Button;

	/**
	 * 斗地主选择房间按钮
	 */
	private _DouDiZhuRoomButton: eui.Group;
	/**
	 * 三张牌选择房间按钮
	 */
	private _SanZhangPaiRoomButton: eui.Group;
	/**
	 * 德州扑克选择房间按钮
	 */
	// private _DeZhouPuKeRoomButton: eui.Button;

	/**
	 *	抢庄牛牛
	 */
	public _QZNiuNiuRoomButton: eui.Group;

	/**
	 * 麻将按钮
	 */
	private _MaJiangRoomButton: eui.Group;
	private _groud1111: eui.Group;
	/**
	 * 金币返回按钮
	 */
	private _backBtn: eui.Button;

	/**
	 * 金币场百人牛牛列表
	 */
	private _listTable: eui.List;
	/**
	 * 头像
	 */
	public _headBox: UI.HeadBox;
	/** 头像框 */
	private _headGroup: eui.Group;
	/**
	 * 保险箱
	 */
	private _safeBox: UI.CommonBtn;
	/**
	 * 下载
	 */
	private _downAppBtn: UI.CommonBtn;
	/**
	 * 排行榜
	 */
	private _inviteButton: UI.CommonBtn;
	/**
	 * 打开开房页面
	 */
	private _cardRoomBtn: UI.CommonBtn;
	/**
	 * 选择房间
	 */
	public _game: number;


	/**
	 * 快速开始Game_ID 记录
	 */
	public _valGame_ID: number;
	/**
	 * 拍卖行层级页面
	 */
	public paiMaiLayer: Layers.PaiMaiLayer;
	/**
	 * 选择游戏级数快速开始 
	 */
	public _selectRoomFastStart: UI.DropDwonList;

	/**
	 * 社交
	 */
	private _contactBtn: UI.CommonBtn;
	/**
	 * 百人牛牛初级高级场
	 */
	public _tabber: eui.TabBar;
	private qdData: model.QiandaoInfo;
	//版本号
	public _versionLab: eui.Label;
	/**
	 * 购买房卡按钮
	 */
	public _buyCardBtn: UI.CommonBtn;
	/**
	 * 选择游戏按钮组
	 */
	public changeButton: any[] = [];
	/**
	 * 房卡数量
	 */
	public _cardLab: eui.Label;
	/**
	 * 牛卡数量
	 */
	public _cardNiu: eui.Label;


	/**
	* 循环缓动动画表,用于离开场景时,清理缓动动画,防止内存泄漏
	*/
	public _tweenRemoveList: any[] = [];
	/**
	 * 战绩数据
	 */
	private zhanjiArray: {
		gameID?: number,
		roomID?: number,
		createTime?: number,
		playerName?: {
			id?: string,
			name?: string,
			score?: number,
		}[],
		zhanji?: {
			time?: number, record?: number[]
		}[]
	}[] = [];
	// 房间信息
	private _playText: eui.Group;

	private _QZNiuNiuRoomButton1: UI.CommonBtn;
	private _BrNiuNiuRoomButton: UI.CommonBtn;



	protected childrenCreated(): void {

		super.childrenCreated();
		egret.log("/--------------SelectScene childrenCreated!")
		if (Global.recordGift) {
			this.getGiftNews(Global.recordGift);
		}
		let self = this;
		self.changeButton = [self._MaJiangRoomButton, self._QZNiuNiuRoomButton1, self._SanZhangPaiRoomButton, self._DouDiZhuRoomButton];
		this._bibi.mask = this._zeRect;
		SoundManage.playMusic(SoundManage.keyMap.bgMusic);
		/**
		 * 点击事件
		 */
		for (let i = 0; i < self.changeButton.length; i++) {
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

		net.registerMsgHandler(net.MSG_LEVEL.SCENE, new SelectSceneMsgHandler(this));
		net.dispatchMsg();
		egret.log("/--------------SelectScene childrenCreated11111!")
		this._listTable.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.enterBrnnRoom, this);
		this.updateUserInfo();
		if (Global.enterRoomId) {
			net.SendMsg.create({ roomId: Global.enterRoomId }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ENTER_SCORE_ROOM).send();
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
		for (let i = 0; i < this._tweenRemoveList.length; i++) {
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
		} else {
			// this.removeChild(this._downAppBtn);
			this._downAppBtn.visible = false;
		}

		//注册监听用户修改信息后改变当前信息
		EventManager.register("UpdateUserInfo", this.updateUserInfo, this);
		egret.log("SelectScene childrenCreated finish!!!!!!!")
	}

	private openQZNiuNiuRoomLayer() {
		this.currentState = "brnnSelect";
	}

	/**
	* 打开公告入口
	*/
	public OpenNoticeLayer() {
		new Layers.GameAnnouncementLayer().open();
	}
	protected openAppDownLayer() {
		new Layers.AppDownLoadLayer().open();
	}

	public clearTween() {
		for (let i = this._tweenRemoveList.length - 1; i > -1; --i) {
			this._tweenRemoveList[i].stop();
		}
		this._tweenRemoveList = null;
	}
	public getGiftNews(isSan: boolean) {
		if (isSan) {
			Tween.playTweenGroup(this._Gift, true);
			this._tweenRemoveList.push(this._Gift);
		} else {
			this._Gift.stop();
		}
	}

	public changeSlither() {
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
		} else if (this._slither.viewport.scrollH <= 0) {
			this._clickLeft.visible = this._SelectRoom2.enabled = false;
			this._clickRight.visible = this._SelectRoom1.enabled = true;
			this._SelectRoom1.bgStr = "1deng_icon_png";
			this._SelectRoom2.bgStr = this._SelectRoom1.icon = "";
			this._SelectRoom2.icon = "yeshu2_text_png";
			this._deng1.play();
			this._deng2.stop();
		}
	}
	public ShareGift() {
		new Layers.ShareGift().open();
	}
	public updateFirstGiftBtn() {
		this._FirstGiftButon.visible = !Global.charge_conf.isGetFirstCharge;
	}
	// 游戏消息点击事件
	public GameNews() {
		new Layers.GameMessgeListLayer().open();
	}
	// protected getFirstRechargeInfo(){
	// 	net.SendMsg.create({ isNowGet : 0 }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GET_SHOUCHONG).send();
	// }

	public updateQiandaoInfo(data: model.QiandaoInfo) {
		this.qdData = data
		var layer: Layers.WelfareCenterLayer = Layers.getLayer(Layers.WelfareCenterLayer);
		if (layer) {
			layer.init(this.qdData);
		} else {
			if (data.canQd == 1) {
				new Layers.DrawLayer(this.qdData).open();
				// drawLayera.init(this.qdData);
			}
		}
		let drawLayera: Layers.DrawLayer = Layers.getLayer(Layers.DrawLayer);
		if (drawLayera) {
			drawLayera.init(this.qdData);
		}
	}
	private onAniComplete() {
		this._clickLeft.touchEnabled = this._clickRight.touchEnabled = true;

	}

	private openBrnnButtonLayer() {
		this.sendEnterRoomMsg({ roomId: 0, roomType: GAME_ID.GAME_ID_HZ_BRNN });
	}
	/**
	 * @param isEnterSelect:是否自动调回选场页面
	 */
	private sendEnterRoomMsg(data: Object, isEnterSelect?: boolean) {
		if (Global.playerDto.gold < 1000000000) {
			net.SendMsg.create(data, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ENTER_ROOM).send();
			return true;
		}
		if (isEnterSelect) {
			SceneManager.runScene(GAME_ID.SELECT);
		}
		Toast.launch(GameLangs.moneyTooMoreTip);
		return false;
	}
	private clickLeftGroup() {
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
	}
	private clickRightGroup() {
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
	}

	private canQd() {
		// this.openNiuNiuRoomLayer();

	}
	private JoinEnterIntoRoom() {
		SoundManage.playEffect('btnClick');
		// this.currentState="qznnSelect";
		// new Layers.CreateRoomLayer(GAME_ID.NIUNIU).open()
		new Layers.CreateRoomLayer().open();
	}

	private openRoomConfigLayer() {
		// this.openNiuNiuRoomLayer();
		new Layers.CreateRoomLayer().open();
	}
	private enterBrnnRoom() {
		this.sendEnterRoomMsg({ roomId: this._listTable.selectedItem.roomId, roomType: GAME_ID.BRNN });
	}


	private myCollection: eui.ArrayCollection;
	private init(sourceArr: model.BrannRoomInfo[]) {
		var myCollection: eui.ArrayCollection = this.myCollection = new eui.ArrayCollection(sourceArr);
		var dataGroup: eui.DataGroup = this._listTable;
		dataGroup.dataProvider = myCollection;
		dataGroup.itemRenderer = HunderNNSelectRoomItem;
	}

	private sarr: model.BrannRoomInfo[];
	public updateBrnnRoomInfo(sourceArr: model.BrannRoomInfo[]) {
		this.sarr = sourceArr;
		if (this.myCollection) {
			this.myCollection.source = sourceArr;
		} else {
			this.init(sourceArr);
		}
	}

	public constructor() {
		super();
		this.skinName = SelectSceneSkin;
		this.percentWidth = this.percentHeight = 100;
	}

	/**
	 * _tabber 初级高级场切换
	 */
	private chanTab() {
		egret.log("this._tabber.selectedIndex;", this._tabber.selectedIndex);

		net.SendMsg.create({ roomLevel: this._tabber.selectedIndex }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_BRNN_ROOMINFO).send();
		Layers.WaitingLayer.open();

	}


	protected update() {
		super.update();
		net.SendMsg.create({ roomLevel: this._tabber.selectedIndex }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_BRNN_ROOMINFO).send();
	}

	/**
	 * 打开商品 钻石
	 */
	private openShopLayer() {
		new Layers.RechargeLayer(1).open();
	}


	/**
	 * 打开社交页面
	 */
	private contactLayer() {
		let lyaers = new Layers.GameAnnouncementLayer().open();
		lyaers.initdatas(Global.activity_conf);
	}

	/**
	 * 快速开始 进入游戏
	 */
	private async selectRoomFastStartLayer(event: egret.Event) {
		egret.log("selectRoomFastStartLayer");
		let conf = ResManager.getResConf(this._valGame_ID);

		let roomId: number = 2;
		//自动根据金钱获得roomID
		for (roomId = 2; roomId >= 0; roomId--) {
			if (Global.playerDto.gold > Config.DropGameList[this._valGame_ID][roomId].minPlay) {//当前金币大于当前等级最少需求金币
				if (Config.DropGameList[this._valGame_ID][roomId].maxPlay != -1 && Global.playerDto.gold < Config.DropGameList[this._valGame_ID][roomId].maxPlay) {//当前等级是否拥有最大进房需求金币,并且要求要小于最大进房需求
					break;
				} else if (Config.DropGameList[this._valGame_ID][roomId].maxPlay == -1) {
					break;
				}
			}
		}
		//若都不符合roomId则为0；
		if (roomId == -1) {
			roomId = 0;
		}
		// egret.log("最终roomId2为："+roomId);
		//破产补贴
		// if (Global.welfareLevel(Global.playerDto.gold)) {

		if (Global.panduanJoinRoom(Global.playerDto.gold, roomId, this._valGame_ID) == true) {
			await SceneManager.loadGroup(conf);
			//SceneManager.runScene(GAME_ID.SELECT);
			this.sendEnterRoomMsg({ roomId: roomId, roomType: this._valGame_ID }, true);
		}
		egret.log("Global.playerDto.gold,this._valGame_ID:::" + Global.playerDto.gold, event.data);
		// }

	}

	/**
	 * 比赛场
	 */
	private matchRoomBtn(event: egret.Event) {
		SoundManage.playEffect('btnClick');
		let alert = Layers.HintLayer.create();
		alert.init({
			curState: Layers.HintLayer.SURE,
			leftBtnBg: "bigG_icon_png",
			leftBtnIcon: "确 定",
			rightFunc: alert.close,
			rightThisObj: alert,
			tipsStr: "暂未开放，敬请期待！！"
		});
		alert.open();
	}

	/**
	 * 选择级数页面
	 */
	private selectRoomFastChose(event: egret.Event) {
		// alert(event.target.name);
		SoundManage.playEffect('btnClick');

		if (event.currentTarget instanceof eui.Group) {
			this._valGame_ID = parseInt(event.currentTarget.name);
		} else {
			this._valGame_ID = parseInt(event.currentTarget.name);
		}
		this.currentState = "queryChose";
		if (this._valGame_ID == GAME_ID.GAME_ID_GDMJ_GOLD || this._valGame_ID == GAME_ID.GOLD_DDZ) {
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

	}

	private setLabelGlod(min: number, max: number): string {
		let str: string = "";
		// egret.log(`min=${min};max=${max}`);
		str += this.numberConversion(min);
		if (max != -1) {
			str += "-" + this.numberConversion(max);
		} else {
			str += "以上";
		}
		return str;
	}

	private numberConversion(number: number): string {
		let num = Math.floor(number / 10000);
		if (num > 0) {
			return num + "W";
		} else {
			return number + "";
		}
	}

	private async seriesSmall(event: egret.Event) {
		let level = parseInt(event.target.name);
		if (Global.panduanJoinRoom(Global.playerDto.gold, level, this._valGame_ID) == true) {
			let conf = ResManager.getResConf(this._valGame_ID);
			await SceneManager.loadGroup(conf);
			this.sendEnterRoomMsg({ roomId: level, roomType: this._valGame_ID }, true);
		}
	}


	/**
	 *  打开牛牛页面
	 */
	private openNiuNiuRoomLayer() {
		SoundManage.playEffect('btnClick');
		new Layers.CreateRoomLayer().open();
	}

	protected onExit() {
		super.onExit();
		this.stopTimer();
		egret.Tween.removeTweens(this._speakerMan);
		this.clearTween();
		EventManager.remove("UpdateUserInfo", this.updateUserInfo, this);
		// this.removeChildren();
	}
	private openBackButtonLayer(event: egret.TouchEvent): void {
		this.currentState = "hall";
		//结束定时发送
		this.stopTimer();
		if (!this._playText.visible) {
			this._playText.visible = true;
		}

	}

    /*
	 * 打开拍卖行
	 */
	public onOpenPaiMaiLayer() {
		net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_DINGDAN_LIST).send();
		if (!this.paiMaiLayer)
			this.paiMaiLayer = new Layers.PaiMaiLayer();
		this.paiMaiLayer.open();
	}

	public UpdateDaoJuList(msg: net.ReceiveMsg<model.DaoJuInfo>) {
		this.paiMaiLayer.list_sale.dataProvider = new eui.ArrayCollection(msg.datas.bagItemList);
	}
	/*
	 *  打开福利画面
	 */
	private openWelfareLayer(event: egret.TouchEvent): void {
		net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_QITIAN_QIANDAO_INFO).send();
		// Layers.WaitingLayer.open();
		let layer = new Layers.WelfareCenterLayer();
		// layer.init(this.qdData);
		layer.open();
	}

	/**
	 *  打开设置画面
	 */
	private openSetLayer(event: egret.TouchEvent): void {
		new Layers.SettingLayer("select").open();
	}

	public opensourceList(data: model.WealthListInfo) {
		let layers: Layers.RankingListLayer = Layers.getLayer(Layers.RankingListLayer);
		if (layers) {
			layers.initRanlist(data);
		}
	}
	/**
 	*  打开排行榜画面
 	*/
	private openInviteButtonLayer(event: egret.TouchEvent): void {
		net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GET_GOLD_PHB).send();
		new Layers.RankingListLayer().open();
	}

	/**
	 * 打开保险箱页面
	 */
	private openSafeBoxLayer(event: egret.TouchEvent): void {
		net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ADD_BAOXIANXIANG).send();
		new Layers.SafeBoxLayer().open();
	}


	/**
	 *  打开商品 金币
	 */
	private openGoldAddLayer(event: egret.TouchEvent): void {
		new Layers.RechargeLayer(0).open();

	}
	/**
	 *  打开商品 钻石
	 */
	private openDiamondAddLayer(event: egret.TouchEvent): void {
		new Layers.RechargeLayer(1).open();
	}
	/**
	 *  打开商品 房卡
	 */
	private openBuyCardLayer(event: egret.TouchEvent): void {
		new Layers.RechargeLayer(2).open();
	}

	/**
	 *  打开加入房间//快速进入
	 */
	private openSelectRoomLayer(event: egret.TouchEvent): void {

		if (this.currentState == "hundrednnSelect") {
			let len = this.sarr.length;
			//记录最大人数 // -1 == 找不到合适的房间
			let listPlayerMax: number = -1;
			//默认一号房
			let index: number = 10000;
			for (let i = 0; i < len; i++) {
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
				this.sendEnterRoomMsg({ roomId: index, roomType: GAME_ID.BRNN });;
			} else {
				egret.log("找不到合适的房间")
				Toast.launch(GameLangs.not_Room_tips);
			}

		} else {
			new Layers.EnterRoomLayer().open();
		}

	}

	/**
	 *  打开实名登录
	 */
	private openRealNameLayer(event: egret.TouchEvent) {
		// this._speakerMan.addMsg({text:"测试1",showCount:3});
	}

	/**
	 *  打开首充礼物
	 */
	private openFirstGiftLayer(event: egret.TouchEvent): void {
		new Layers.FirstGiftLayer().open();
		// this._speakerMan.addMsg({ text: "测试2", showCount: 3 });
	}

	/**
	 *  打开头像
	 */
	private openUserInfoLayer(event: egret.TouchEvent): void {
		new Layers.UserInfoLayer(Global.playerDto, 1).open();
	}

	/**
	 *  打开玩法
	 */
	private openPlayMethodLayer(event: egret.TouchEvent): void {
		new Layers.PlayMethodLayer().open();
		// console.log("点击openPlayMethodLayer");
	}

	/**
	 * 打开战绩页面
	 */
	private openCombatGainsLayer(event: egret.TouchEvent): void {
		net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ZHANJI_LIST).send();
	}
	public UpdateZhanjiDatas(msg: net.ReceiveMsg<model.UserZhanjiInfo>) {
		var layer = new Layers.PerforManceLayer();
		//数据结构化
		let j = 0;
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
				let l = 0;
				//添加基本信息
				for (var k in msg.datas.zhanjiList[i].playerNames) {
					if (msg.datas.zhanjiList[i].playerNames.hasOwnProperty(k)) {
						if (!this.zhanjiArray[j].playerName[l])
							this.zhanjiArray[j].playerName[l] = {};
						this.zhanjiArray[j].playerName[l].id = k;
						this.zhanjiArray[j].playerName[l].name = msg.datas.zhanjiList[i].playerNames[k];
						this.zhanjiArray[j].playerName[l].score = 0;
						// this.zhanjiArray[j].playerName[l].zhanji = [];
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
				for (var n = 0; n < msg.datas.zhanjiList[i].recordRoomList.length; n++) {//每个房间的战绩表遍历
					//添加时间戳
					if (!this.zhanjiArray[j].zhanji[n]) {
						this.zhanjiArray[j].zhanji[n] = {};
						this.zhanjiArray[j].zhanji[n].record = [];
						this.zhanjiArray[j].zhanji[n].time = msg.datas.zhanjiList[i].recordRoomList[n].time;
						// console.log("time:", this.zhanjiArray[j].zhanji[n].time);
					}
					// this.zhanjiArray[j].zhanji[n].record = msg.datas.zhanjiList[i].recordRoomList[n];
					for (var o = 0; o < this.zhanjiArray[j].playerName.length; o++) {//每局的玩家输赢遍历
						var isFound: boolean = false;
						for (var m in msg.datas.zhanjiList[i].recordRoomList[n]) {
							if (msg.datas.zhanjiList[i].recordRoomList[n].hasOwnProperty(m) && m == this.zhanjiArray[j].playerName[o].id) {//如果在当前战绩表找到自己的战绩
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

				j++;//每一个房间战绩的index
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
	}
	/**
	 *  用户信息显示
	 */
	public updateUserInfo() {
		var self = this;

		if (Global.playerDto.diamond > 100000) {
			this._Diamondlabel.text = Math.floor(Global.playerDto.diamond / 10000) + GameLangs.wan;
		} else {
			this._Diamondlabel.text = Global.playerDto.diamond + "";
		}

		if (Global.playerDto.gold > 100000) {
			this._GoldLabel.text = Math.floor(Global.playerDto.gold / 10000) + GameLangs.wan;
		} else {
			this._GoldLabel.text = Global.playerDto.gold + "";
		}
		self._IDLabel.text = Global.playerDto.id + "";
		self._nameLabel.text = Global.playerDto.nickName;
		self._cardLab.text = Global.playerDto.fangkaCount + "";
		self._cardNiu.text = Global.playerDto.niukaCount + ""
	}

	// public UpdateDingDanList(msg: net.ReceiveMsg<model.DingDanInfo>) {
	// 	this.paiMaiLayer.list_dingdan.dataProvider = new eui.ArrayCollection(msg.datas.dingdanList);
	// }

	// public UpdateSearchList(msg: net.ReceiveMsg<model.SearchDingDanInfo>) {
	// 	var result = [];
	// 	result.push(msg.datas.dingdan);
	// 	if(this.paiMaiLayer.isShowInFirst)
	// 		this.paiMaiLayer.list_dingdan.dataProvider = new eui.ArrayCollection(result);
	// 	else
	// 		this.paiMaiLayer.list_history.dataProvider = new eui.ArrayCollection(result);
	// }
}