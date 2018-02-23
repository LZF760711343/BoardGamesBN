var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layers;
(function (Layers) {
    var HistroyBox = (function (_super) {
        __extends(HistroyBox, _super);
        function HistroyBox() {
            var _this = _super.call(this) || this;
            _this.skinName = niuniu.brnn.HistroyBoxSkin;
            return _this;
        }
        HistroyBox.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            EventManager.register("UPDATE_HISTROYLIST", this.updateList, this);
            // this._toggleBut.addEventListener(egret.TouchEvent.TOUCH_TAP, this.togleButOP, this)
        };
        /**
         * 更新数据
         */
        // public motion(winRewardList: number[]) {
        // 	let imgstrs = this.imgstrs;
        // 	let len = winRewardList.length;
        // 	for (let j = 0; j < len; j++) {
        // 		if (winRewardList[j]) {
        // 			imgstrs.push("x_text_png");
        // 		} else {
        // 			imgstrs.push("g_text_png");
        // 		}
        // 	}
        // 	this.updateUI()
        // 	// if (this.imgstrs.length === 14 * 4) {
        // 	// 	egret.Tween
        // 	// 		.get(this._scroller.viewport)
        // 	// 		.to({ scrollV: this._scroller.viewport.scrollV + 25 }, 800, egret.Ease.quadOut)
        // 	// 		.call(this.moveComplete, this);
        // 	// } else {
        // 	// 	this.onAny();
        // 	// }
        // }
        /**
         * 删除第一行数据高度位置复原更新UI
         */
        HistroyBox.prototype.moveComplete = function () {
            this.imgstrs.splice(0, 4);
            // this._scroller.viewport.scrollV = 0;
            this.updateUI();
            this.onAny();
        };
        /**
         * 	更新UI页面
         */
        HistroyBox.prototype.updateUI = function () {
            // this.myCollection.replaceAll(this.imgstrs);
        };
        HistroyBox.prototype.onAny = function () {
            // let num = 45;
            // let heg = 24.1;
            // this._blur.y = num + heg * (this.imgstrs.length / 4 - 1);
            // egret.Tween.get(this._blur)
            // 	.to({ alpha: 1 }, 300)
            // 	.wait(1500)
            // 	.to({ alpha: 0 }, 300);
        };
        /**
         * 初始数据
         */
        HistroyBox.prototype.initialization = function (winRewardList) {
            var imgstrs = this.imgstrs = [];
            var length = winRewardList.length;
            for (var i = 0; i < length; i++) {
                var len = winRewardList[i].length;
                for (var j = 0; j < len - 1; j++) {
                    if (winRewardList[i][j]) {
                        imgstrs.push("cha_hzicon_png");
                    }
                    else {
                        imgstrs.push("dui_hzicon_png");
                    }
                }
            }
            // egret.log("imgstrs", imgstrs);
            var myCollection = this.myCollection = new eui.ArrayCollection(imgstrs);
            var dataGroup = this._list;
            dataGroup.dataProvider = myCollection;
        };
        HistroyBox.prototype.updateList = function (event) {
            this.initialization(event.data);
        };
        HistroyBox.prototype.onAniComplete = function () {
            // this._toggleBut.touchEnabled = true;
        };
        // 切换按钮
        HistroyBox.prototype.togleButOP = function () {
            // this._toggleBut.touchEnabled = false;
            // this._blur.visible=false;
            // if (this._toggleBut.selected) {
            // 	egret.Tween.get(this._Juan).to({ y: this._Juan.y - 370 }, 800, egret.Ease.quadOut).call(this.onAniComplete, this);
            // } else {
            // 	egret.Tween.get(this._Juan).to({ y: this._Juan.y + 370 }, 800, egret.Ease.quadOut).call(this.onAniComplete, this);
            // }
        };
        HistroyBox.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            EventManager.remove("UPDATE_HISTROYLIST", this.updateList, this);
        };
        return HistroyBox;
    }(Layers.BaseLayer));
    Layers.HistroyBox = HistroyBox;
    __reflect(HistroyBox.prototype, "Layers.HistroyBox");
})(Layers || (Layers = {}));
//# sourceMappingURL=HistroyBox.js.map