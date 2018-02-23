var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GetGiftAni = (function (_super) {
    __extends(GetGiftAni, _super);
    function GetGiftAni(datas) {
        var _this = _super.call(this) || this;
        _this.datas = datas;
        _this.skinName = GetGiftAniSkin;
        _this.verticalCenter = _this.horizontalCenter = 0;
        _this.percentWidth = _this.percentHeight = 100;
        return _this;
    }
    GetGiftAni.prototype.onExit = function () {
        egret.Tween.removeTweens(this);
        if (this._image3)
            egret.Tween.removeTweens(this._image3);
    };
    GetGiftAni.prototype.onPlayComplete = function () {
        this.close();
    };
    GetGiftAni.prototype.close = function () {
        if (this.parent) {
            // this.parent.removeChild(this);
            egret.Tween.get(this).to({ alpha: 0 }, 600).call(this.parent.removeChild, this.parent, [this]);
        }
    };
    GetGiftAni.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        // egret.Tween.get(this._image3).to({
        // 	rotation: 420 
        // }, 1000 * 2).call(this.close, this);
        this.gongxihuode.once("complete", this.onPlayComplete, this);
        this.gongxihuode.play(0);
        this._dataGroup.dataProvider = new eui.ArrayCollection(this.datas);
    };
    return GetGiftAni;
}(eui.Component));
__reflect(GetGiftAni.prototype, "GetGiftAni");
//# sourceMappingURL=GetGiftAni.js.map