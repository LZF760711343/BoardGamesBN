/**
 * Created by egret on 2016/1/26.
 */
class Toast extends egret.DisplayObjectContainer {

    public static init(cont: egret.DisplayObjectContainer, txtrToastBg: string = "toast_bg_png"): void {
        this._cont = cont;
        this._txtrToastBg = RES.getRes(txtrToastBg);
    }

    public static launch(msg: string, waitTime: number = 1600): void {
        if (this._cont) {
            var toast: Toast = new Toast(msg, this._cont.stage.stageWidth, this._cont.stage.stageHeight, waitTime);
            this._cont.addChild(toast);
        }
    }

    private static _txtrToastBg: egret.Texture;
    private static _cont: egret.DisplayObjectContainer;

    constructor(msg: string, w: number, h: number, waitTime: number) {
        super();
        egret.log("Toast:", msg);
        var bg: egret.Bitmap = new egret.Bitmap(Toast._txtrToastBg);
        this.addChild(bg);
        var tx: egret.TextField = new egret.TextField;
        tx.multiline = true;
        tx.size = 30;//之前是20，改了后整个游戏的提示都改了
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
        this.addChild(tx);
        bg.height = 12 + tx.height;
        this.anchorOffsetX = this.width * 0.25;
        this.anchorOffsetY = this.height * 0.5;
        this.x = w * .5;
        // this.y = h * .618;
        this.y = h * .64;
        this.alpha = 0;
        egret.Tween.get(this)
            .to({ alpha: 1 }, 800, egret.Ease.quintOut)
            .wait(waitTime)
            .to({ alpha: 0 }, 1200, egret.Ease.quintIn).call(() => {      /*  y: this.y - 50, */
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            });
    }
}