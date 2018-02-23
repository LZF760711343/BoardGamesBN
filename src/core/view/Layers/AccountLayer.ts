/**
 * 最终结算页面
 */
namespace Layers {
	const MASK = 0XFF;
	const MOVE = 8;
	interface AccountItemData {
		score?: number;
		nickName?: string;
		account?: number;
		alpha?: number;
		isSelf: boolean;
		bigWinner: boolean;
		roomSize: number;
		isOwner: boolean;
		headImages: string;
		list?: { headStr: string, tailStr: string }[];
	}
	export class AccountLayer extends BaseLayer {
		/**
		 *
		 */
		protected _dataGroup: eui.DataGroup;
		/**
		 * 分享按钮
		 */
		protected _btnShare: UI.CommonBtn;
		/**
		 * 房间id
		 */
		protected _roomIdLab: eui.Label;

		/**
		 * 日期
		 */
		protected _timeLab: eui.Label;

		public constructor() {
			super([ResManager.GROUP_NAME.SAFE_BOX]);
			this.skinName = AccountLayerSkin;

		}
		protected childrenCreated(): void {
			super.childrenCreated();
			this.percentWidth = this.percentHeight = 100;
			if (egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE) {
				this._btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
			} else {
				this.removeChild(this._btnShare);
			}

			// this._btnShare.visible = egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE;
		}
		//-- 计算牌形
		public calHandValue(handvalue: number, isMs: boolean) {
			if (handvalue) {
				// if (isMs) {
				// 	let handType: any = (handvalue >> 8 & 0xF);
				// 	var value = (handvalue >> 12 & 0xF);
				// 	if (handType < MS_HANDVALUE.SZ) {
				// 		if (value) {
				// 			return GameLangs.msCardTypes[handType] + value + GameLangs.dian;
				// 		} else {
				// 			return GameLangs.msCardTypes[handType] + GameLangs.mushi_str;
				// 		}

				// 	} else if (handType == MS_HANDVALUE.STG || handType == MS_HANDVALUE.TG) {
				// 		return GameLangs.msCardTypes[handType] + value;
				// 	}
				// 	else {
				// 		return GameLangs.msCardTypes[handType];
				// 	}
				// }
				let handType = (handvalue >> 12) & 0xf;
				if (handType == niuniu.HANDVALUE.NIUX) {
					var value = (handvalue >> 8) & 0xf;
					return GameLangs.cardTypes[handType] + "" + value;
				} else {
					return GameLangs.cardTypes[handType];
				}
			}
		}

		//-- 计算牌形_三张牌
		public calHandValue_szp(handvalue: number, isMs: boolean) {
			if (handvalue) {
				let handType = (handvalue >> 12) & 0xf;
				return GameLangs.cardTypesSzp[handType];

			}
		}

		public close() {
			super.close();
			egret.Event.dispatchEvent(this, Event.CLOSE);
		}
		public analysisResult(winLoseResult: number) {
			// egret.log(winLoseResult+"===winLoseResult1=="+(winLoseResult& 0xff),winLoseResult>>8,winLoseResult>>16)
			return [winLoseResult & 0xff, (winLoseResult >> 8) & 0xff, (winLoseResult >> 16) & 0xff];
		}
		/**
		 * 
		 */
		public setDatas(datas: model.GameAccountInfo, gameDatas: GameDatasBase) {
			if (gameDatas.roomInfo.createinfo.roomSize === 8) {
				this.currentState = "8";
			} else {
				this.currentState = "5";
			}
			let arrLen = datas.playerMsg.length;

			//显示当前时间
			this._timeLab.text = new Date().Format("yyyy-MM-dd\nhh:mm:ss");
			//房间号
			this._roomIdLab.text = GameLangs.gameRoomId.format(gameDatas.roomInfo.room_id);
			//赢的最多的筹码数,用于显示大赢家辨识用
			let maxChips = 0;
			for (let i = 0; i < arrLen; i++) {
				if (maxChips < datas.playerMsg[i].cur_chips) {
					maxChips = datas.playerMsg[i].cur_chips;
					egret.log("maxChips", maxChips, "datas.playerMsg[i].cur_chips", datas.playerMsg[i].cur_chips)
				}
			}

			let itemDatas: AccountItemData[] = [];
			for (let i = 0; i < arrLen; i++) {
				let info = datas.playerMsg[i];
				// egret.log("maxChips",maxChips,"maxChips == info.cur_chips",maxChips == info.cur_chips)
				let list: { headStr: string, tailStr: string }[];
				switch (datas.gameId) {
					case GAME_ID.NIUNIU:
						var [winCnt, lostCnt, pingCnt] = this.analysisResult(info.winLoseResult);
						// let winCnt = info.winLoseResult & 0xf;
						// let lostCnt = (info.winLoseResult >> 8) & 0xf;
						// let pingCnt = (info.winLoseResult >> 16) & 0xf;
						var str = GameLangs.account_tip5.format(winCnt, lostCnt);
						if (pingCnt) {
							str += GameLangs.account_tip4.format(pingCnt);
						}
						list = [
							{ headStr: GameLangs.account_tip1, tailStr: info.best_score + "" },
							{ headStr: GameLangs.account_tip2, tailStr: this.calHandValue(info.best_handvalue, false) },
							{ headStr: GameLangs.account_tip3, tailStr: str }
						];
						break;
					case GAME_ID.ZJH:
						var [winCnt, lostCnt, pingCnt] = this.analysisResult(info.winLoseResult);
						var str = GameLangs.account_tip5.format(winCnt, lostCnt);
						if (pingCnt) {
							str += GameLangs.account_tip4.format(pingCnt);
						}
						list = [
							{ headStr: GameLangs.account_tip1, tailStr: info.best_score + "" },
							{ headStr: GameLangs.account_tip2, tailStr: this.calHandValue_szp(info.best_handvalue, false) },
							{ headStr: GameLangs.account_tip3, tailStr: str }
						];
						break;
					case GAME_ID.DDZ:
						var [winCnt, lostCnt, pingCnt] = this.analysisResult(info.winLoseResult);
						var str = GameLangs.account_tip5.format(winCnt, lostCnt);
						if (pingCnt) {
							str += GameLangs.account_tip4.format(pingCnt);
						}
						list = [
							{ headStr: GameLangs.account_tip1, tailStr: info.best_score + "" },
							{ headStr: GameLangs.account_best, tailStr: info.best_handvalue + "" },
							{ headStr: GameLangs.account_tip3, tailStr: str }
						];
						break;
					case GAME_ID.GAME_ID_GDMJ_FK:
						var [winCnt, lostCnt, pingCnt] = this.analysisResult(info.winLoseResult);
						var str = GameLangs.account_tip5.format(winCnt, lostCnt);
						if (pingCnt) {
							str += GameLangs.account_tip4.format(pingCnt);
						}
						list = [
							{ headStr: GameLangs.account_tip1, tailStr: info.best_score + "" },
							{ headStr: GameLangs.account_tip22, tailStr: info.best_handvalue + "" },
							{ headStr: GameLangs.account_tip3, tailStr: str }
						];
						break;
				}
				itemDatas[i] = {
					score: info.cur_chips,
					alpha: i % 2 == 0 ? 1 : 0,
					nickName: gameDatas.playerDatas[info.playerId].UserInfo.nickName,
					account: gameDatas.playerDatas[info.playerId].UserInfo.id,
					isSelf: gameDatas.isSelfId(info.playerId),
					bigWinner: maxChips == info.cur_chips,
					roomSize: gameDatas.roomInfo.createinfo.roomSize,
					isOwner: gameDatas.playerDatas[info.playerId].zuoweiIndex === 0,
					headImages: gameDatas.playerDatas[info.playerId].UserInfo.headImages,
					list: list,

				};
			}
			this._dataGroup.itemRenderer = AccountItem;
			this._dataGroup.dataProvider = new eui.ArrayCollection(itemDatas);
		}

		private onShare() {
			var renderTexture: egret.RenderTexture = new egret.RenderTexture();
			renderTexture.drawToTexture(Main.instance);
			renderTexture.saveToFile("image/jpeg", "shareImg.jpg", new egret.Rectangle(0, 0, 1136, 640));
			egret.ExternalInterface.call("shareWx", JSON.stringify({
				type: "img",
				path: "shareImg.jpg",
				title: "分享图片",
				description: "分享图片"
			}));
			// if (egret.Capabilities.os == "iOS") {
			// 	renderTexture.saveToFile("image/jpeg", "shareImg.jpg");
			// 	egret.ExternalInterface.call("shareWx", JSON.stringify({
			// 		type: "img",
			// 		path: "shareImg.jpg",
			// 		title: "分享图片",
			// 		description: "分享图片",
			// 		imgData: renderTexture.toDataURL("image/jpg")
			// 	}));
			// } else {

			// }
		}
	}
	class AccountItem extends eui.ItemRenderer {
		protected _bg: eui.Rect;
		protected _headBox: UI.HeadBox;
		protected _nickName: eui.Label;
		protected _id: eui.Label;
		protected _score: eui.Label;
		protected lab1: eui.Label;
		protected lab2: eui.Label;
		protected lab3: eui.Label;
		protected _roomOnwerImg: eui.Image;//房主标识
		protected _clearImg: eui.Image;//被清空标识
		protected _winerImg: eui.Image;//大赢家标识

		public dataChanged(): void {
			let data: AccountItemData = this.data;
			this._headBox.setIcon(data.headImages);
			this._winerImg.visible = data.bigWinner;
			this._roomOnwerImg.visible = data.isOwner;
			if (data.roomSize === 8) {
				this.lab1.text = data.list[0].tailStr;
				this.lab2.text = data.list[1].tailStr;
				this.lab3.text = data.list[2].tailStr;
			} else {
				this.lab1.textFlow = <Array<egret.ITextElement>>[
					{ text: data.list[0].headStr },
					{ text: data.list[0].tailStr, style: { "textColor": 0x57e37d } },
				];
				this.lab2.textFlow = <Array<egret.ITextElement>>[
					{ text: data.list[1].headStr },
					{ text: data.list[1].tailStr, style: { "textColor": 0x57e37d } },
				];
				this.lab3.textFlow = <Array<egret.ITextElement>>[
					{ text: data.list[2].headStr },
					{ text: data.list[2].tailStr, style: { "textColor": 0x57e37d } },
				];
				if (this.lab1.width > 168) {
					this.lab1.scaleX = 168 / this.lab1.width;
				}
				if (this.lab2.width > 168) {
					this.lab2.scaleX = 168 / this.lab2.width;
				}
				if (this.lab3.width > 168) {
					this.lab3.scaleX = 168 / this.lab3.width;
				}
			}
			if (data.isSelf) {
				this._id.textColor =
					this._nickName.textColor = 0xc74b63;
				if (data.roomSize === 8) {
					this.lab1.textColor =
						this.lab2.textColor =
						this.lab3.textColor =
						this._score.textColor = 0xc74b63;
				}
			}
		}
	}
}