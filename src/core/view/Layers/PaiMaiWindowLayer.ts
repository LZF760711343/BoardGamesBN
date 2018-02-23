namespace Layers {
	//出售层
	export class PaiMaiSaleWindowLayer extends BaseLayer {
		private btn_sale: UI.CommonBtn;
		// private btn_add: UI.CommonBtn;
		// private btn_reduce: UI.CommonBtn;
		private text_up: eui.Label;
		public count: number;//持有道具数量
		private currentCount: number = 10;//当前已选择数量
		private text_down: eui.Label;
		private text_count: eui.Label;
		private createDingDan: {
			daojuId?: number;
			needGold?: number;
		}

		public constructor(count: number) {
			super();
			this.skinName = SaleWindowSkin;
			this.createDingDan = {};
			this.text_down.inputType = egret.TextFieldInputType.TEL;
			this.text_count.text = "门票：" + count;
		}

		protected childrenCreated(): void {
			super.childrenCreated();

			this.btn_sale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSale, this);
			// this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
			// this.btn_reduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduce, this);
			// this.text_count.text = "门票："+this.count;
		}

		protected onSale() {
			if (parseInt(this.text_down.text) < 100000000) {
				this.createDingDan.daojuId = 100001;
				this.createDingDan.needGold = parseInt(this.text_down.text);
				net.SendMsg.create(this.createDingDan, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_CREATE_DINGDAN).send();
			}
			else
				Toast.launch("出售最大价格不得超过9999万！");
			this.close();
		}

		// protected onAdd() {
		// 	if (this.currentCount < this.count) {
		// 		this.currentCount++;
		// 		this.text_up.text = this.currentCount.toString();
		// 	}
		// }

		// protected onReduce() {
		// 	if (this.currentCount > 0) {
		// 		this.currentCount--;
		// 		this.text_up.text = this.currentCount.toString();
		// 	}
		// }

	}
	//购买层
	export class PaiMaiBuyWindowLayer extends BaseLayer {
		private btn_buy: UI.CommonBtn;
		public dingdanID: number;
		public text_cost: eui.Label;
		private count;
		public constructor(count: string) {
			super();
			this.skinName = BuyWindowSkin;
			this.text_cost.text = count;
			this.count = count;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
		}

		protected onBuy() {
			if (Global.playerDto.gold >= this.count) {
				net.SendMsg.create({ "dingdanId": this.dingdanID }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_BUY_DINGDAN).send();
			}
			else
				Toast.launch("您的金币不足！");
			this.close();
		}
	}
}