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
    var GameMessgeListLayer = (function (_super) {
        __extends(GameMessgeListLayer, _super);
        function GameMessgeListLayer() {
            var _this = _super.call(this, [ResManager.GROUP_NAME.SAFE_BOX, "new_area_png"]) || this;
            _this.skinName = GameMessageListSkin;
            return _this;
        }
        GameMessgeListLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initNew();
            EventManager.register("undataNew", this.undataNew, this);
        };
        GameMessgeListLayer.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            EventManager.remove("undataNew", this.undataNew, this);
        };
        GameMessgeListLayer.prototype.undataNew = function (index) {
            egret.log("回调");
            this.GameNew.splice(index, 1);
            this.myCollection.refresh();
            LocalDatas.datas.datas.msgStr = "";
            if (LocalDatas.datas.datas.msgStr) {
            }
            else {
                this.currentState = "empty";
            }
        };
        GameMessgeListLayer.prototype.initNew = function () {
            this.myCollection = this._listNew.dataProvider;
            this._listNew.itemRenderer = GameNewListitem;
            // for(let i=0;i<LocalDatas.datas.datas.gameNew.length;i++){
            if (LocalDatas.datas.datas.msgStr) {
                this.GameNew = [{ msgStr: LocalDatas.datas.datas.msgStr, new: new Date().Format("yyyy-MM-dd"), new1: new Date().Format("hh:mm:ss") }];
                this.myCollection.replaceAll(this.GameNew);
            }
            else {
                this.currentState = "empty";
            }
            // }
        };
        ;
        return GameMessgeListLayer;
    }(Layers.BaseLayer));
    Layers.GameMessgeListLayer = GameMessgeListLayer;
    __reflect(GameMessgeListLayer.prototype, "Layers.GameMessgeListLayer");
    var GameNewListitem = (function (_super) {
        __extends(GameNewListitem, _super);
        function GameNewListitem() {
            return _super.call(this) || this;
        }
        GameNewListitem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._newGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minuteNewOpen, this);
        };
        GameNewListitem.prototype.minuteNewOpen = function () {
            // new Layers.GameMessagetDetaiLayer(this._headline.text,this.itemIndex).open();
            new Layers.GameMessagetDetaiLayer(this._headline.text, this.itemIndex).open();
        };
        GameNewListitem.prototype.dataChanged = function () {
        };
        return GameNewListitem;
    }(eui.ItemRenderer));
    __reflect(GameNewListitem.prototype, "GameNewListitem");
})(Layers || (Layers = {}));
//# sourceMappingURL=GameMessgeListLayer.js.map