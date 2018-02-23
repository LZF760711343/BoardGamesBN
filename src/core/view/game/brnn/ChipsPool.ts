/**
 * 百人牛牛的筹码池
 */
namespace niuniu.brnn {
	export class ChipsPool extends eui.Component {
		/** 筹码返回时间 */
		public static CHIP_BACK_TIME = 300;
		/** 筹码之间的间隔(自己算) */
		public static CHIP_BACK_DELAY_TIME = 20;
		/** 间隔系数 */
		public static CHIP_BACK_DELAY_POINT = 10;
		public bgStr: string = "";
		private _mask: eui.Rect;
		private _box: eui.Group;
		// private boxMove: egret.tween.TweenGroup;
		private bet: egret.tween.TweenGroup;
		// private reset:egret.tween.TweenGroup;
		public _disBox: DisCardBox;
		private _group: eui.Group;
		//总下注的筹码数Label
		public _allChipsLb: eui.Label;
		//自己下注的筹码数Label
		public _selfChipsLb: eui.Label;
		//自己输赢的的筹码数Label
		public _accountChipsLb: eui.Label;
		public zuowei: number;
		private _isSitDown: boolean;
		private _allChip: number;
		private _selfChip: number;
		public _bg: eui.Image;
		private _finishFunc: Function;
		public _chipLayer: eui.Component;
		private _point: egret.Point;
		public _play: egret.tween.TweenGroup;
		public _shangguang: niuniu.brnn.ChipsPoolShanguang;
		public _niuniu: niuniu.brnn.chipsPoolNiuNiu;

		/**
		 * 筹码列表
		 */
		public chipsImgList: Chip[] = [];
		public constructor() {
			super();
			this._point = egret.Point.create(0, 0);
		}
		public updataChipsLb(MyValue: number, Allvalue: number) {
			// if (MyValue == 0)
			// 	this._allChipsLb.text = GameLangs.betTip3.format(MyValue / 10000, Allvalue / 10000);
			// else {
			// 	//使用富文本
			// 	this._allChipsLb.textFlow = (new egret.HtmlTextParser).parser("<font color='#ffe289'>$1万</font>/$2万".format(MyValue / 10000, Allvalue / 10000));
			// }
			this._allChipsLb.textFlow = (new egret.HtmlTextParser).parser("<font color='#ffe289'>$1<font style='font-size:25px;'>万</font></font>/$2<font style='font-size:25px;'>万</font>".format(MyValue / 10000, Allvalue / 10000));
		}
		public PlaySendCardAni(layer: eui.Component, cardIndex: number, cardValue: number, isSetIcon: boolean) {
			return this._disBox.PlaySendCardAni(layer, cardIndex, cardValue, isSetIcon);
		}
		public setIsSitDown(isSitDown: boolean) {
			this._isSitDown = isSitDown;
			// this.updateSelfChipsLb(this._selfChip);
		}
		/**
		 * 更新自己输赢的筹码数
		 * @param value:输赢的数值
		 */
		public updateAccountChipsLb(value: number) {
			// this._accountChipsLb.text = GameLangs.accountTip.format(value);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			this.touchChildren = false;
			// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
			// this.boxMove.addEventListener('complete', this.boxMoveComplete, this);
		}
		/**
		 * 重置这个控件,在游戏重新开局的时候调用
		 */
		public reset() {
			this._group.y = 260;
			this._disBox.reset();
			this._disBox.visible = false;
			this.updataChipsLb(0, 0);
			// this.updateAllChipsLb(0);
			this.updateAccountChipsLb(0);
			let arrLen = this.chipsImgList.length;
			for (let i = 0; i < arrLen; i++) {
				// this._chipLayer.removeChild(this.chipsImgList[i]);
				this.chipsImgList[i].destroy();
			}
			this.chipsImgList = [];
		}

		public HideCard() {
			return this._disBox.HideCard();
		}
		/**
		 * 播放移动下注信息框的动画
		 */
		private boxMoveComplete() {
			if (this._finishFunc) {
				this._finishFunc();
			}
		}
		/**
		 * 播放开牌动画
		 */
		public doShowCardAni(data: model.GameOverDataListItem, selfmoney?: number) {
			return this._disBox.doShowCardAni(data, selfmoney);
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

		public playChisAui(data: number) {
			// egret.log("datadata", data);
			// return new Promise((finishFunc: Function) => {
			//当前没人投筹码到筹码池里，其data.chipsPoolInfo.win_chips会不存在
			if (!data) {
				// this._play.play(0);
				this._shangguang.visible = true;
				this._shangguang.curState = SCPSStatu.SHANG;
			}

			// })
		}

		/**
		 * 播放将下注信息框移开的动画
		 */
		public playMoveBoxAni() {
			return new Promise((finishFunc: Function) => {
				this._finishFunc = finishFunc;
				// this.boxMove.play(0);
			})
		}
		public destroy() {
			this._finishFunc = null;
			// this.boxMove.stop();
			this._disBox.destroy();
			if (this._point) {
				egret.Point.release(this._point);
				this._point = null;
			}
			let arrLen = this.chipsImgList.length;
			for (let i = 0; i < arrLen; i++) {
				// this._chipLayer.removeChild(this.chipsImgList[i]);
				this.chipsImgList[i].destroy();
			}
		}
		private onTouchTap() {
			// this.boxMove.play(0);
		}


		public addChipAni(player: any, chipsID: number, chipNum: number, chips: number, srcId: number) {
			// var chip = new Chip(chipsID, true, chipNum);
			var chip = Chip.create(chips, true, chipNum);
			this._chipLayer.addChild(chip);
			//设置中点
			// chip.anchorOffsetX = this.width/2;
			// chip.anchorOffsetY = this.height/2;
			var DesX; var DesY;
			//尽量控制落点在中间
			DesX = (this.width - chip.width) * ((Math.random() * 10.5) / 10);//0.0-1.05
			DesY = (this.height - chip.height) * ((Math.random() * 9) / 10);//0.0-0.9
			// DesX = (this._bg.width - chip.width) * Math.random();
			// DesY = (this._bg.height - chip.height) * Math.random();

			// if (player instanceof Player) { //若是场内玩家，传入的是游戏玩家面板
			// 	// this.globalToLocal(player.x, player.y, this._point);
			// 	chip.srcId = player.playerId;
			// } else {
			// 	// this.globalToLocal(20, 500, this._point);
			// 	chip.srcId = 8;//场外玩家
			// }
			chip.srcId = srcId;
			this.globalToLocal(player.x, player.y, this._point);
			chip.x = this._point.x;
			chip.y = this._point.y;
			chip.srcPoint.x = this._point.x;
			chip.srcPoint.y = this._point.y;
			this.chipsImgList.push(chip);
			// if(chipNum>4){
			// 	chip.anchorOffsetX = chip.width/2;
			// 	chip.anchorOffsetY = chip.height/2;
			// 	chip.rotation = Math.floor(Math.random() * 10) / 2 > 0 ? (Math.random() * 30) : (Math.random() * -30);
			// }
			chip.FlyTo(DesX, DesY);

		}

		public PlayFlyChip(isWin: number, rewardRate: number) {
			// let arrlen = this.chipsImgList.length;
			//如果该筹码池赢了,按赢的倍率创建筹码数
			if (rewardRate > 0) {
				// Chip.createChips();
				//飞到某个位置的筹码如果抽过这个大小,就不创建额外的筹码了
				let maxCount = 20;
				//记录飞的筹码的数量
				let chipCounts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
				let len = this.chipsImgList.length;
				for (let i = 0; i < len; i++) {
					let chip = this.chipsImgList[i];
					chipCounts[chip.srcId]++;//计算飞到各个位置筹码的个数
				}
				for (let i = 0; i < len; i++) {
					let chip = this.chipsImgList[i];
					if (chip.srcId != 8) {
						for (let j = 0; j < rewardRate; j++) {
							if (chipCounts[chip.srcId] < maxCount) {//飞到某个位置的筹码超过maxCount个之后,就不额外创建新的
								chipCounts[chip.srcId]++;
								let tempChip = chip.copy();
								tempChip.x = (this.width - tempChip.width) * ((Math.random() * 10.5) / 10);//0.0-1.05
								tempChip.y = (this.height - tempChip.height) * ((Math.random() * 9) / 10);//0.0-0.9
								this.chipsImgList.push(tempChip);
								this._chipLayer.addChild(tempChip);
							}

						}
					}
				}
			}

			let arrlen = this.chipsImgList.length;
			/** 筹码飞行到指定区域间隔 0-7是玩家面板，8是场外玩家，9是庄家 */
			let CHIP_BACK_DELAYS_TIME = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			for (var i = 0; i < arrlen; i++) {
				let chip = this.chipsImgList[i];
				//间隔计算
				//		let delay = Math.abs(Math.sqrt(Math.pow((chip.x - chip.srcPoint.x),2)+Math.pow((chip.y-chip.srcPoint.y),2)))*ChipsPool.CHIP_BACK_DELAY_POINT;
				chip.FlyBack(CHIP_BACK_DELAYS_TIME[chip.srcId], ChipsPool.CHIP_BACK_TIME, !isWin);

				CHIP_BACK_DELAYS_TIME[chip.srcId] += ChipsPool.CHIP_BACK_DELAY_TIME;
			}
		}

	}
	let pool = [];
	export class Chip extends eui.Component {
		public img: eui.Image;
		public lable: eui.BitmapLabel;
		private chips: number;//筹码注码
		// private chipNum: eui.Label;
		// private isInPool: boolean;//是否为筹码池中的筹码
		/**此筹码的来源位置,0-3分别表示来自坐下玩家的位置，4表示来自自己，5表示旁观者*/
		public srcPoint: egret.Point;
		/**来源id */
		public srcId: number;
		private point: egret.Point;
		private tw: egret.Tween;
		private _chipNum: number;
		public constructor(chips: number, b: boolean, chipNum: number) {
			super();
			this.srcPoint = egret.Point.create(0, 0);
			this.point = egret.Point.create(0, 0);
			this.img = new eui.Image();
			this.img.horizontalCenter = this.img.verticalCenter = 0;
			this.lable = new eui.BitmapLabel();
			this.lable.font = "zjhChips_fnt";
			this.lable.horizontalCenter = 0;
			this.lable.verticalCenter = -8;
			this.height = this.img.height = 87;
			this.width = this.img.width = 77;
			this.addChild(this.img);
			this.addChild(this.lable);

			this.init(chipNum, chips);
		}
		public copy() {
			let chip = Chip.create(this.chips, false, this._chipNum);
			chip.srcId = this.srcId;
			chip.srcPoint.x = this.srcPoint.x;
			chip.srcPoint.y = this.srcPoint.y;
			return chip;
		}
		public init(chipNum: number, chips) {
			this._chipNum = chipNum;
			this.chips = chips;
			// this.source = `cm_${chipNum}_png`;
			let newGold = "";
			if (chips >= 10000) {
				newGold = Math.floor(chips / 10000) + GameLangs.wan;
			} else {
				newGold = chips.toString();
			}
			this.lable.text = newGold;
			// this.img.source = `zjh_chouma_${chipNum}_png`;

			//调整100w，500w的大小不缩放
			if (chipNum < 5) {
				//随机旋转
				// this.rotation = Math.random() * 3600;
				if (chipNum == 1) {
					this.img.source = "1w_hzcm1_png";
				} else {
					this.img.source = `zjh_chouma_${chipNum}_png`;
				}
				this.height = this.img.height = 87;
				this.width = this.img.width = 77;
				this.scaleX = 0.8; this.scaleY = 0.8;
			} else {
				this.lable.text = "";
				this.height = this.img.height = 48;
				this.width = this.img.width = 95;
				this.scaleX = this.scaleY = 1;
				// this.anchorOffsetX = this.width/2;
				// this.anchorOffsetY = this.height/2;
				this.img.source = `cm_4_png`;
				//随机旋转+30~-30
				this.rotation = Math.floor(Math.random() * 10) / 2 > 0 ? (Math.random() * 30) : (Math.random() * -30);
			}
		}

		public static create(chips: number, b: boolean, chipNum: number) {
			let chipsObj: Chip;
			DEBUG && egret.log("chipsObj cache count:" + pool.length);
			if (pool.length) {
				chipsObj = pool.pop();
				chipsObj.init(chipNum, chips);
			} else {
				chipsObj = new Chip(chips, b, chipNum);
			}
			return chipsObj;
		}

		public destroy() {
			if (this.parent) {
				this.parent.removeChild(this);
				pool.push(this);
			}
			egret.Tween.removeTweens(this);
		}

		public changeNumber(num: number) {
			let str;
			if (num > 10000) {
				str = (num / 10000) + GameLangs.wan;
			} else if (num > 1000) {
				str = (num / 1000) + GameLangs.qian;
			} else {
				str = num + "";
			}
			return str;
		}
		/**
		 * //从当前位置飞向目标位置（传进来的参数为全局坐标）
		 */
		public FlyTo(DesX: number, DesY: number, delay: number = 0, time = 300) {
			return egret.Tween.get(this).wait(delay).to({ x: DesX, y: DesY }, 300).call(this.flyFinish, this);
		}
		/**
		 * 当前在播放的筹码声个数
		 */
		private static _betSoundCount: number = 0;
		/**
		 * 筹码从下注地方飞到筹码池后的回调
		 */
		private flyFinish() {
			
			if (Chip._betSoundCount < 2) {
				let channel = SoundManage.playEffect("nn_bet_chip", 0.4);
				if (channel) {
					channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
					Chip._betSoundCount++;
				}
			}
			// egret.log("sound:"+Chip._betSoundCount)
			// channel
		}
		private onSoundComplete() {
			Chip._betSoundCount--;
		}
		private playFinish() {
			//保证该筹码池存在
			if (this.parent) {
				let arr = (<ChipsPool>this.parent.parent).chipsImgList;
				if (arr) {
					//删除chipsImgList集合中的元素
					for (var i = 0; i < arr.length; i++) {
						if (arr[i] == this) {
							arr.splice(i, 1);
							break;
						}
					}
				}
				//删除筹码池中的筹码
				// this.parent.removeChild(this);
				this.destroy();
			}
		}

		/**
		 * //从当前位置飞回上一次位置
		 */
		public FlyBack(delay: number = 0, time = 800, flag: boolean = true) {
			// this.parent.globalToLocal(this.x, this.y, this.point);
			// delay = Math.min(750,delay);
			// let tween: egret.Tween;
			let x = 0;
			let y = 0;
			//true的时候飞回原位，false的时候，飞到庄家位置
			if (flag) {
				x = this.srcPoint.x;
				y = this.srcPoint.y;
			} else {
				//全局坐标变本地坐标
				x = (this.stage.stageWidth - this.width) / 2;
				y = 30;
				this.parent.globalToLocal(x, y, this.point);
				x = this.point.x;
				y = this.point.y;
				// egret.log("将要飞过去的x=" + x + ";将要飞过去的y=" + y);
				// delay = ChipsPool.CHIP_BACK_DELAYS_TIME[9];
			}
			//计算间隔
			// let long = this.x-x/
			return egret.Tween.get(this).wait(delay).to({ x: x, y: y }, time).call(this.playFinish, this);
		}
	}
}