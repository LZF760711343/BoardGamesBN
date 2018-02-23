namespace Layers {
	// export class LayerManage {
	// 	public constructor() {
	// 	}
	// }
	export const enum BG_TYPE {
		/**
		 * 没有背景
		 */
		NONE,
		/**
		 * 灰色透明的背景
		 */
		GRAY,
		/**
		 * 背景图片1
		 */
		IMG1,
		/**
		 * 背景图片2
		 */
		IMG2
	}
	/**
	 * 弹窗动画类型
	 */
	export const enum ANI_TYPE {
		/**
		 * 没有动画
		 */
		NONE,
		/**
		 * 从中间由小到大从中间轻微弹出
		 */
		CENTER1,
		/**
		 * 从中间由小到大从中间猛烈弹出
		 */
		CENTER2,
	}
	let _layerList;

	let layer: eui.Component = new eui.Component();
	export function init(_layer) {
		layer = _layer;
		// layer.removeChildren();
		_layerList = {};
		quitTipsLayer = null;
	}
	/**
	 * 添加一个层级面板
	 * @param baseLayer:要添加的面板
	 * @param bgType:背景类型 {BG_TYPE} 默认会添加灰色的背景
	 */
	export async function openLayer(baseLayer: BaseLayer, bgType: BG_TYPE = BG_TYPE.GRAY, aniType: ANI_TYPE) {
		let layerName = baseLayer["__proto__"]["__class__"];
		egret.log("OpenLayer:" + layerName);
		if (_layerList[layerName]) {
			return;
		}
		_layerList[layerName] = baseLayer;
		if (bgType != BG_TYPE.NONE) {
			baseLayer.bg = addBg(bgType);
		}

		if (baseLayer.loadKey && !ResManager.isGroupLoaded(baseLayer.loadKey)) {
			let curSceneTag = SceneManager.curScene.sceneTag;
			WaitingLayer.open();
			try {
				await RES.loadGroup(baseLayer.loadKey);//等待资源加载
			} catch (error) {
				egret.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
			} finally {
				WaitingLayer.close();
			}
			if (curSceneTag !== SceneManager.curScene.sceneTag) {
				_layerList[layerName] = null;
				return;
			}
		}

		layer.addChild(baseLayer);
		popEffect(baseLayer, aniType);
		egret.log("openLayer finish");
	}
	function popEffect(layer: BaseLayer, aniType: ANI_TYPE) {
		switch (aniType) {
			case 0:
				break;
			case 1:
				// layer.alpha = 0.5;
				layer.scaleX = 0.5;
				layer.scaleY = 0.5;
				egret.Tween.get(layer).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
				break;
			case 2:
				// layer.alpha = 0.5;
				layer.scaleX = 0.5;
				layer.scaleY = 0.5;
				egret.Tween.get(layer).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.elasticOut);
				break;
		}
	}
	let quitTipsLayer: HintLayer;
	/**
	 * 打开关闭app提示,只在安卓端会会用到,当用户点击返回键的时候,提示用户是否关闭应用
	 * @platform Android
	 */
	export function openQuitTipsLayer() {
		if (quitTipsLayer) {
			if (quitTipsLayer.bg && quitTipsLayer.bg.parent) {//如果存在背景,将背景也移除了
				quitTipsLayer.bg.parent.removeChild(quitTipsLayer.bg);
			}
			if (quitTipsLayer.parent) {
				quitTipsLayer.parent.removeChild(quitTipsLayer);
			}
			quitTipsLayer = null;
		} else {
			quitTipsLayer = new HintLayer();
			quitTipsLayer.init({
				tipsStr: GameLangs.exitGameTip,
				leftFunc: NativeBridge.endGame,
				leftThisObj: NativeBridge,
				curState: Layers.HintLayer.SURE,
			});
			quitTipsLayer.once(egret.Event.CLOSE, openQuitTipsLayer, null);
			quitTipsLayer.bg = addBg(BG_TYPE.GRAY);
			layer.addChild(quitTipsLayer);
			popEffect(quitTipsLayer, ANI_TYPE.CENTER2);
		}
	}
	/**
	 * 将层级面板移除
	 */
	export function closeLayer(baseLayer: BaseLayer | { new () }) {
		let layerName = baseLayer["prototype"] ? baseLayer["prototype"]["__class__"] : baseLayer["__proto__"]["__class__"];
		egret.log("CloseLayer:" + layerName);
		let _baseLayer: BaseLayer = _layerList[layerName];
		if (_baseLayer) {
			delete _layerList[layerName];
			if (_baseLayer.parent) {
				_baseLayer.parent.removeChild(_baseLayer);
			}
			if (_baseLayer.bg && _baseLayer.bg.parent) {//如果存在背景,将背景也移除了
				_baseLayer.bg.parent.removeChild(_baseLayer.bg);
			}
		}

	}
	export function getLayer(layerClass: { new (...args) }) {
		return _layerList[layerClass.prototype["__class__"]];
	}
	/**
	 * 添加背景
	 * @param bgType:{BG_TYPE}对应BgSkin.exml这个皮肤文件里面的各个状态
	 */
	function addBg(bgType: BG_TYPE) {
		let bg = new eui.Component();
		bg.skinName = UI.BgSkin;
		bg.percentWidth = bg.percentHeight = 100;
		bg.currentState = bgType + "";
		layer.addChild(bg);
		if (bgType === BG_TYPE.GRAY) {
			bg.alpha = 0;
			egret.Tween.get(bg).to({ alpha: 1 }, 150);
		}

		return bg;
	}
}