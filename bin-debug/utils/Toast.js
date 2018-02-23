var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by egret on 2016/1/26.
 */
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast(msg, w, h, waitTime) {
        var _this = _super.call(this) || this;
        egret.log("Toast:", msg);
        var bg = new egret.Bitmap(Toast._txtrToastBg);
        _this.addChild(bg);
        var tx = new egret.TextField;
        tx.multiline = true;
        tx.size = 30; //之前是20，改了后整个游戏的提示都改了
        tx.bold = true;
        tx.textColor = 0xFFFFFF;
        tx.stroke = 2;
        tx.strokeColor = 0;
        tx.text = msg;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;
        tx.width = w * .84;
        tx.x = (Toast._txtrToastBg.textureWidth - tx.width) / 2;
        tx.y = 6;
        _this.addChild(tx);
        bg.height = 12 + tx.height;
        _this.anchorOffsetX = _this.width * 0.25;
        _this.anchorOffsetY = _this.height * 0.5;
        _this.x = w * .5;
        // this.y = h * .618;
        _this.y = h * .64;
        _this.alpha = 0;
        egret.Tween.get(_this)
            .to({ alpha: 1 }, 800, egret.Ease.quintOut)
            .wait(waitTime)
            .to({ alpha: 0 }, 1200, egret.Ease.quintIn).call(function () {
            if (_this.parent) {
                _this.parent.removeChild(_this);
            }
        });
        return _this;
    }
    Toast.init = function (cont, txtrToastBg) {
        if (txtrToastBg === void 0) { txtrToastBg = "toast_bg_png"; }
        this._cont = cont;
        this._txtrToastBg = RES.getRes(txtrToastBg);
    };
    Toast.launch = function (msg, waitTime) {
        if (waitTime === void 0) { waitTime = 1600; }
        if (this._cont) {
            var toast = new Toast(msg, this._cont.stage.stageWidth, this._cont.stage.stageHeight, waitTime);
            this._cont.addChild(toast);
        }
    };
    return Toast;
}(egret.DisplayObjectContainer));
__reflect(Toast.prototype, "Toast");
//# sourceMappingURL=Toast.js.map