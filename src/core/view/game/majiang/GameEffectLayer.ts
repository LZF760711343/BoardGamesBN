namespace majiang {
	/**
	 * 游戏特效层
	 */

	export class GameEffectLayer extends GameEffectLayerBase {
		private _point: egret.Point;

		public constructor() {
			super();
		}

		public playLocalityAui(
			name: string,//动画文件名
			location: number
		) {
			let layer;
			switch (name) {
				case "peng":
					layer = new majiang.majiangpengAui();
					break;
				case "hu":
					layer = new majiang.majianghuAui();
					break;
				case "chi":
					layer = new majiang.majiangchiAui();
					break;
				case "shao":
					layer = new majiang.majiangshaoAui();
					break;
				case "gang":
					layer = new majiang.majiangGangAui();
					break;
				case "tan":
					layer = new majiang.majiangtanAui();
			}
			if (layer != null) {
				if (location == 1) {
					layer.verticalCenter = 150;
					layer.horizontalCenter = 0;
				} else if (location == 2) {
					layer.verticalCenter = 0;
					layer.horizontalCenter = -250;
				} else if (location == 3) {
					layer.verticalCenter = -150;
					layer.horizontalCenter = 0;
				} else {
					layer.verticalCenter = -250;
					layer.horizontalCenter = 0;
				}
				layer.visible = true;
				layer.start();
				this.addChild(layer);
			}
		}
	}
}
