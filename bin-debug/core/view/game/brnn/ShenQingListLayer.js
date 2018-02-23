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
    var ShenQingListLayer = (function (_super) {
        __extends(ShenQingListLayer, _super);
        function ShenQingListLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = niuniu.brnn.ShenQingListSkin;
            return _this;
        }
        ShenQingListLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._applyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplyDealer, this);
        };
        ShenQingListLayer.prototype.onApplyDealer = function () {
            if (this.isSelfKing) {
                net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ASK_XIAZHUANG).send();
                this.close();
            }
            else {
                net.SendMsg.create({ shangZhuangType: 1 }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ASK_SHANGZHUANG).send();
                this.close();
            }
        };
        ShenQingListLayer.prototype.updateKingBtn = function () {
            this._applyBtn.label = this.isSelfKing ? "退位" : "申请上庄";
        };
        ShenQingListLayer.prototype.init = function (val, val2) {
            this.isSelfKing = val2;
            this.updateKingBtn();
            var myCollection = new eui.ArrayCollection(val);
            var dataGroup = this._list;
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRenderer = ShenQingListClass;
        };
        return ShenQingListLayer;
    }(Layers.BaseLayer));
    Layers.ShenQingListLayer = ShenQingListLayer;
    __reflect(ShenQingListLayer.prototype, "Layers.ShenQingListLayer");
    var ShenQingListClass = (function (_super) {
        __extends(ShenQingListClass, _super);
        function ShenQingListClass() {
            return _super.call(this) || this;
            //this.skinName = DorpDownLabel;
        }
        ShenQingListClass.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ShenQingListClass.prototype.dataChanged = function () {
            // egret.log("data", this.itemIndex);
            // egret.log("data", this.data);
            this._id.text = (this.itemIndex + 1) + "";
            this._name.text = "" + this.data;
        };
        return ShenQingListClass;
    }(eui.ItemRenderer));
    __reflect(ShenQingListClass.prototype, "ShenQingListClass");
})(Layers || (Layers = {}));
//# sourceMappingURL=ShenQingListLayer.js.map