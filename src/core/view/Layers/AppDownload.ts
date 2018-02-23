namespace Layers {
	export class AppDownLoadLayer extends BaseLayer {
		private des: string;
		private _des: eui.Label;
		private _btnDown: UI.CommonBtn;
		public constructor() {
			super();
			this.skinName = AppDownloadSkin;
		}
		protected createChildren(): void {
			super.createChildren();
			if (this._des) {
				this._des.textFlow = (new egret.HtmlTextParser).parser(
					'终于等到您!' + '\n\n下载'
					+ '《HZ棋牌》App版本,更流畅\n\n的体验等着您！');
			}
			this._btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.downApp, this);
		}
		private downApp() {
			// location.href = Config.downAppUrl + "?chl=" + Global.playerDto.channel;
			location.href = Config.URLS.downAppUrl + "?chl=" + Global.playerDto.channel + "&serverid="+Config.SERVER_ID;
		}

		// public close(): void {
		// 	PanelManager.closeLayer(PanelManager.AppDownLoadLayer);
		// }

		// //用于回调关闭页面
		// public onDownloadSuccess(): void {
		// 	PanelManager.closeLayer(PanelManager.AppDownLoadLayer);
		// }
	}
}