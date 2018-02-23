var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
     * 游戏特效层基类
     */
var GameEffectLayerBase = (function (_super) {
    __extends(GameEffectLayerBase, _super);
    function GameEffectLayerBase() {
        var _this = _super.call(this) || this;
        /**
             * 在播放中的动画特效列表
             */
        _this._aniList = [];
        return _this;
    }
    /**
         * 播放骨骼动画
         */
    GameEffectLayerBase.prototype.playDbAni = function (name, //骨骼动画文件名
        armName, //
        aniName, //要播放的动作名
        cb, //回调
        cbTarget, data, //回调透传的参数
        pos //骨骼动画的位置
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
    };
    GameEffectLayerBase.prototype.playAui = function (name, //动画文件名
        cb, //回调
        cbTarget, data) {
        var layer;
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
    };
    GameEffectLayerBase.prototype.playAuiAsync1 = function (name) {
        var layer = new AnimationBase();
        layer.horizontalCenter = layer.verticalCenter = 0;
        layer.skinName = name;
        this.addChild(layer);
        // layer.start();
        // layer.init(cb, cbTarget, data);
        return layer.startAsync();
    };
    GameEffectLayerBase.prototype.playAuiAsync2 = function (name, //动画文件名
        imgNameVal) {
        var layer = new Game.Animation();
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
    };
    GameEffectLayerBase.prototype.playAuiAsyncZhongMa = function (name, //动画文件名
        maCards, zhongmaCards) {
        var layer = new Game.AnimationMjZhongMa();
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
    };
    GameEffectLayerBase.prototype.playAuiAsync = function (name) {
        var _this = this;
        var layer;
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
            return new Promise(function (finish) {
                layer.visible = true;
                layer.x = Global.sWidth / 2;
                layer.y = Global.sHeight / 2;
                layer.start();
                _this.addChild(layer);
                if (layer.init) {
                    layer.init(function () {
                        finish();
                    }, null, null);
                }
                else {
                    finish();
                }
            });
        }
        return null;
    };
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
    GameEffectLayerBase.prototype.clearAllAni = function () {
        for (var i = this._aniList.length - 1; i >= 0; i--) {
            this._aniList[i].destroy();
        }
        this._aniList = [];
    };
    /**
     * 从特效播放列表中删除一个特效
     */
    GameEffectLayerBase.prototype.removeAni = function (ani) {
        for (var i = this._aniList.length - 1; i >= 0; i--) {
            if (ani == this._aniList[i]) {
                this._aniList.splice(i, 1);
                break;
            }
        }
    };
    return GameEffectLayerBase;
}(eui.Component));
__reflect(GameEffectLayerBase.prototype, "GameEffectLayerBase");
//# sourceMappingURL=GameEffectLayerBase.js.map