/**
	 * 游戏特效层基类
	 */
class GameEffectLayerBase extends eui.Component {

	/**
		 * 在播放中的动画特效列表
		 */
	protected _aniList: { destroy: Function }[] = [];
	public constructor() {
		super();
	}
	/**
		 * 播放骨骼动画
		 */
	public playDbAni(
		name: string,//骨骼动画文件名
		armName: string,//
		aniName: string,//要播放的动作名
		cb?: Function,//回调
		cbTarget?: Object,
		data?: any,//回调透传的参数
		pos?: egret.Point//骨骼动画的位置
	) {
		// let dbNode = new Effect.DBNode(name, armName);
		// if (pos) {
		// 	dbNode.setPostion(pos.x, pos.y);
		// } else {
		// 	dbNode.setPostion(Global.sWidth / 2, Global.sHeight / 2);
		// }
		// this.addChild(dbNode.getDisplay());
		// dbNode.play(aniName);
		// dbNode.setFinishedCallBack(() => {
		// 	if (cb) {
		// 		cb.call(cbTarget, data);
		// 	}
		// 	this.removeAni(dbNode);
		// }, this);
		// this._aniList.push(dbNode);

		// return dbNode;
	}

	public playAui(
		name: string,//动画文件名
		cb?: Function,//回调
		cbTarget?: Object,
		data?: any,//回调透传的参数
	) {

		let layer;
		switch (name) {
			case "start":
				layer = new game.Start();
				layer.init(cb, cbTarget, data);
				break;
			case "lost":
				layer = new game.Lost();
				layer.init(cb, cbTarget, data);
				break;
			case "win":
				layer = new game.Win();
				layer.init(cb, cbTarget, data);
				break;
			case "liandui":
				layer = new ddz.liandui();
				break;
			case "shunzi":
				layer = new ddz.shunzi();
				break;
			case "plane":
				layer = new ddz.plane();
				break;
			case "zhadan":
				layer = new ddz.zhadan();
				break;
			case "wangzha":
				layer = new ddz.wangzha();
				break;
			case "redlight":
				layer = new ddz.RedLight();
		}

		if (layer != null) {
			layer.visible = true;
			layer.x = Global.sWidth / 2;
			layer.y = Global.sHeight / 2;
			layer.start();
			this.addChild(layer);
		}
	}

	public playAuiAsync1(
		name: string,//动画文件名
	) {
		let layer = new AnimationBase();
		layer.horizontalCenter = layer.verticalCenter = 0;
		layer.skinName = name;
		this.addChild(layer);
		// layer.start();
		// layer.init(cb, cbTarget, data);
		return layer.startAsync();
	}

	public playAuiAsync2(
		name: string,//动画文件名
		imgNameVal: string) {
		let layer = new Game.Animation();
		layer.horizontalCenter = layer.verticalCenter = 0;
		// let skinName;
		// let imgName: string;
		// imgName = "imgNameVal";
		layer.skinName = name;
		this.addChild(layer);
		// if (imgNameVal) {
		layer.setImgSource(imgNameVal);
		// }
		// layer.start();
		return layer.startAsync();

	}

	public playAuiAsyncZhongMa(
		name: string,//动画文件名
		maCards: number[], zhongmaCards: number[]) {
		let layer = new Game.AnimationMjZhongMa();
		// let bg = new eui.Component();
		// bg.skinName = UI.BgSkin;
		// bg.percentWidth = bg.percentHeight = 100;
		// this.addChild(bg);
		// bg.alpha = 0;
		// egret.Tween.get(bg).to({ alpha: 1 }, 150);

		this.addChild(layer);

		layer.setImgSource(maCards, zhongmaCards);
		// }
		return layer.startAsync();

	}


	public playAuiAsync(
		name: string,//动画文件名
	) {
		let layer;
		switch (name) {
			case "start":
				layer = new game.Start();
				// layer.init(cb, cbTarget, data);
				break;
			case "lost":
				layer = new game.Lost();
				// layer.init(cb, cbTarget, data);
				break;
			case "win":
				layer = new game.Win();
				// layer.init(cb, cbTarget, data);
				break;
			case "liandui":
				layer = new ddz.liandui();
				break;
			case "shunzi":
				layer = new ddz.shunzi();
				break;
			case "plane":
				layer = new ddz.plane();
				break;
			case "zhadan":
				layer = new ddz.zhadan();
				break;
			case "wangzha":
				layer = new ddz.wangzha();
				break;
			case "redlight":
				layer = new ddz.RedLight();
				break;

		}

		if (layer != null) {
			return new Promise((finish: Function) => {
				layer.visible = true;
				layer.x = Global.sWidth / 2;
				layer.y = Global.sHeight / 2;
				layer.start();
				this.addChild(layer);
				if (layer.init) {
					layer.init(() => {
						finish();
					}, null, null);
				} else {
					finish();
				}

			});
		}
		return null;

	}
	// /**
	// 	 * 播放骨骼动画
	// 	 */
	// public playDbAniAsync(
	// 	name: string,//骨骼动画文件名
	// 	armName: string,//
	// 	aniName: string,//要播放的动作名
	// 	data?: any,//回调透传的参数
	// 	pos?: egret.Point//骨骼动画的位置
	// ) {
	// 	return new Promise((finsih: Function) => {
	// 		let dbNode = new Effect.DBNode(name, armName);
	// 		if (pos) {
	// 			dbNode.setPostion(pos.x, pos.y);
	// 		} else {
	// 			dbNode.setPostion(Global.sWidth / 2, Global.sHeight / 2);
	// 		}
	// 		this.addChild(dbNode.getDisplay());
	// 		dbNode.play(aniName);

	// 		this._aniList.push(dbNode);
	// 		dbNode.setFinishedCallBack(() => {
	// 			finsih();
	// 			this.removeAni(dbNode);
	// 		}, this);
	// 	})
	// }
	/**
	 * 清理特效播放列表中所有的特效
	 */
	public clearAllAni() {
		for (var i = this._aniList.length - 1; i >= 0; i--) {
			this._aniList[i].destroy();
		}
		this._aniList = [];
	}
	/**
	 * 从特效播放列表中删除一个特效
	 */
	public removeAni(ani: any) {
		for (var i = this._aniList.length - 1; i >= 0; i--) {
			if (ani == this._aniList[i]) {
				this._aniList.splice(i, 1);
				break;
			}
		}
	}
}