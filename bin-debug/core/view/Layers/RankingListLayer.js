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
    var RankingListLayer = (function (_super) {
        __extends(RankingListLayer, _super);
        function RankingListLayer() {
            var _this = _super.call(this, [ResManager.GROUP_NAME.SAFE_BOX]) || this;
            _this.isShowBg = true;
            _this.skinName = RankingListLayerSkin;
            return _this;
        }
        RankingListLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.percentWidth = this.percentHeight = 100;
        };
        RankingListLayer.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
        };
        RankingListLayer.prototype.initRanlist = function (data) {
            for (var i = 0; i < data.goldPHBList.length; i++) {
                if (data.goldPHBList[i].headImages == "") {
                    data.goldPHBList[i].headImages = "defaultHead_png";
                }
            }
            egret.log("data.goldPHBList" + data.goldPHBList);
            var myCollection = this.myCollection = new eui.ArrayCollection(data.goldPHBList);
            var dataGroup = this._ranList;
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRenderer = RankingListItem;
        };
        return RankingListLayer;
    }(Layers.BaseLayer));
    Layers.RankingListLayer = RankingListLayer;
    __reflect(RankingListLayer.prototype, "Layers.RankingListLayer");
    var RankingListItem = (function (_super) {
        __extends(RankingListItem, _super);
        function RankingListItem() {
            return _super.call(this) || this;
        }
        RankingListItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._GroupHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ChangeBig, this);
            this._GroupHead.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onExit, this);
        };
        RankingListItem.prototype.onExit = function () {
            //移除事件，避免内存泄露
            this._GroupHead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ChangeBig, this);
            this._GroupHead.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onExit, this);
        };
        RankingListItem.prototype.ChangeBig = function () {
            if (this._GroupHead.scaleX === 1.55) {
                this._GroupHead.scaleX = this._GroupHead.scaleY = 1;
            }
            else {
                this._GroupHead.scaleX = this._GroupHead.scaleY = 1.55;
            }
        };
        RankingListItem.prototype.dataChanged = function () {
            this._gold.text += "金币";
            switch (this.itemIndex) {
                case 0:
                    this._kuang.source = "hz_jk1_png";
                    break;
                case 1:
                    this._kuang.source = "hz_jk2_png";
                    break;
                case 2:
                    this._kuang.source = "hz_jk3_png";
                    break;
                default:
                    this._kuang.visible = false;
                    break;
            }
            this._id.text = this.itemIndex + 1 + "";
            if ((this.itemIndex + 1) % 2 == 0) {
                this._bgwhite.visible = false;
            }
            else {
                this._bgwhite.visible = true;
            }
        };
        return RankingListItem;
    }(eui.ItemRenderer));
    __reflect(RankingListItem.prototype, "RankingListItem");
})(Layers || (Layers = {}));
//# sourceMappingURL=RankingListLayer.js.map