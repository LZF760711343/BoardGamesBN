namespace niuniu {
	interface ItemData {
		/**
		 * 昵称
		 */
		name?: string,
		/**
		 *庄家
		 */
		dealer?: string,
		/**
		 *庄家背景
		 */
		zhuangBg?: string,
		/**
		 * 输赢金额
		 */
		money?: string,
		// color?: number,
		cards?: number[],
		/**
		 * 牌型
		 */
		cardType?: number,
		isSelf?: boolean
	}
	export class RoundAccountLayer extends Layers.RoundAccountLayerBase {
		public constructor() {
			super();
			this.skinName = RoundAccountLayerSkin;
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGoBtn, this);
		}
		private onTouchGoBtn() {
			this.close();
			egret.Event.dispatchEvent(this, Layers.Event.CLOSE);
		}
		public calHandValue(handvalue: number, isMs: boolean) {
			if (handvalue) {
				// if (isMs) {
				// 	let handType: any = (handvalue >> 8 & 0xF);
				// 	var value = (handvalue >> 12 & 0xF);
				// 	if (handType < MS_HANDVALUE.SZ || handType == MS_HANDVALUE.STG || handType == MS_HANDVALUE.TG) {
				// 		if (value) {
				// 			return GameLangs.msCardTypes[handType] + value + GameLangs.dian;
				// 		} else {
				// 			return GameLangs.msCardTypes[handType] + GameLangs.mushi_str;
				// 		}
				// 	} else {
				// 		return GameLangs.msCardTypes[handType];
				// 	}
				// }
				let handType = (handvalue >> 12) & 0xf;
				if (handType == HANDVALUE.NIUX) {
					var value = (handvalue >> 8) & 0xf;
					return GameLangs.cardTypes[handType] + "" + value;
				} else {
					return GameLangs.cardTypes[handType];
				}
			}
		}
		protected complete() {
			egret.log("complete")
			this.onTouchGoBtn();
		}
		public setDatas(overDatas: model.NN_GAMEOVER, gameDatas: GameDatas) {
			// var scene = <niuniu.GameSceneUI>Main.instance.getCurrentScene();
			// //是否金币场
			// let isCoinRoom = roomType == ROOM_TYPE.NORMAL;
			// if (isCoinRoom) {
			// 	this.currentState = "niuniuCoin";
			// 	this.startTimer();
			// 	this.btn_quit.once(egret.TouchEvent.TOUCH_TAP, this.onExitGame, this);
			// } else {
			// 	this.currentState = "niuniu";
			// }
			// if(DEBUG){
			// 	this.startTimer(5);
			// }
			var datas: ItemData[] = [];
			let length = overDatas.gameResult.length;
			let sIndes = 0;
			for (var i = 0; i < length; i++) {
				let data: ItemData = datas[i] = {};
				let result = overDatas.gameResult[i];
				let id = result.playerId;
				let playerInfo = gameDatas.playerDatas[id];
				if (gameDatas.dealerId && gameDatas.dealerId == id) {
					data.dealer = "zhuan1_icon_png";
					data.zhuangBg="zhuanK_area_png"; 
				}
				data.cardType = this.calHandValue(result.handValue, false);
				data.cards = result.cards;
				data.money = this.toSingStr(result.balance);
				if (id == gameDatas.myPlyerId) {
					data.isSelf = true;
					sIndes = i;
					if (result.balance > 0) {//赢了
						this._title.source = "win_icon1_png";
					} else if (result.balance < 0) {
						this._title.source = "lost_topicon_png";
					} else {
						this._title.source = "pj_toptext_png";
					}
				}
				data.name = Utils.subString(playerInfo.UserInfo.nickName, 7);
			}
			let temp = datas[0];
			datas[0] = datas[sIndes];
			datas[sIndes] = temp;
			this._dataGroup.itemRenderer = AccountItem;
			this._dataGroup.dataProvider = new eui.ArrayCollection(datas);
		}
		private toSingStr(num: number) {
			if (num > 0)
				return '+' + num;
			else
				return num.toString();
		}




		public setDatas1(overDatas: model.ZJHGameOverInfo, gameDatas) {
			// var scene = <niuniu.GameSceneUI>Main.instance.getCurrentScene();
			// //是否金币场
			// let isCoinRoom = roomType == ROOM_TYPE.NORMAL;
			// if (isCoinRoom) {
			// 	this.currentState = "niuniuCoin";
			// 	this.startTimer();
			// 	this.btn_quit.once(egret.TouchEvent.TOUCH_TAP, this.onExitGame, this);
			// } else {
			// 	this.currentState = "niuniu";
			// }
			// if(DEBUG){
			// 	this.startTimer(5);
			// }
			let	len = overDatas.biPaiList.length;

			var datas: ItemData[] = [];
			let length = overDatas.gameResultList.length;
			let sIndes = 0;
			for (var i = 0; i < length; i++) {
				let data: ItemData = datas[i] = {};
				let result = overDatas.gameResultList[i];
				let id = result.playerId;
				let playerInfo = gameDatas.playerDatas[id];
				if (gameDatas.dealerId && gameDatas.dealerId == id) {
					data.dealer = "zhuan1_icon_png";
				}
				if(result.playerId==gameDatas.myPlyerId||this.checkIsCompCard(result.playerId, gameDatas.myPlyerId, overDatas.biPaiList)){
						data.cards = result.cards;
						egret.log("result.cards",result.cards);
				}else{
					data.cards = [999,999,999];
				}
				// data.cardType = this.calHandValue(result.handValue, false);
				// if(gameDatas.myPlyerId==overDatas.biPaiList[i][0]||result.playerId==overDatas.biPaiList[i][1]){
				// data.cards = result.cards;
				// }
				// else{
				// 		data.cards = [];
				// }
				egret.log("overDatas.biPaiList", overDatas.biPaiList);
				// this.checkIsCompCard(gameResult.playerId, this.gameDatas.myPlyerId, datas.biPaiList)
				// if ((result.playerId == overDatas.biPaiList[i][0] && gameDatas.myPlyerId == overDatas[i][1]) || (result.playerId == overDatas.biPaiList[i][0] && gameDatas.myPlyerId == overDatas[i][1])) {
					
				// }

				// 	   for (let i = 0; i < arrLen; i++) {
				//     if ((compList[i][0] === playerId1 && compList[i][1] === playerId2) || (compList[i][1] === playerId1 && compList[i][0] === playerId2)) {
				//         return true;
				//     }
				// }

				data.money = this.toSingStr(result.balance);
				if (id == gameDatas.myPlyerId) {
					data.isSelf = true;
					sIndes = i;
					if (result.balance > 0) {//赢了
						this._title.source = "win_icon1_png";
					} else if (result.balance < 0) {
						this._title.source = "lost_topicon_png";
					} else {
						this._title.source = "pj_toptext_png";
					}
				}
				data.name = Utils.subString(playerInfo.UserInfo.nickName, 7);
			}
			let temp = datas[0];
			datas[0] = datas[sIndes];
			datas[sIndes] = temp;
			this._dataGroup.itemRenderer = AccountItem;
			this._dataGroup.dataProvider = new eui.ArrayCollection(datas);
		}

		 private checkIsCompCard(playerId1: number, playerId2: number, compList: number[][]) {
            let arrLen = compList.length;
            for (let i = 0; i < arrLen; i++) {
                if ((compList[i][0] === playerId1 && compList[i][1] === playerId2) || (compList[i][1] === playerId1 && compList[i][0] === playerId2)) {
                    return true;
                }
            }
            return false;
        }
	}


	class AccountItem extends eui.ItemRenderer {
		private _group: eui.Group;
		private _rect: eui.Rect;
		private _moneyLab: eui.Label;
		public label0:eui.Label;

		public constructor() {
			super();
		}
		public dataChanged(): void {
			egret.log("this.data::::"+this.data.cardType)
			if (this.data.cards) {
				let data: ItemData = this.data;
				var length = this.data.cards.length;
				if (data.isSelf) {
					this._moneyLab.textColor = 0xf86c17;
				} else {
					this._rect.visible = false;
				}

				for (var i = 0; i < length; i++) {
					var card = Card.create();
					if (this.data.cards[i]!=999) {
						egret.log("this.data.cards[i]",this.data.cards[i]);
						card.setSmallIcon(this.data.cards[i])
					} else {
						card.setSmallBack();
					}
					this._group.addChild(card);
				}
			}
		}
	}
}