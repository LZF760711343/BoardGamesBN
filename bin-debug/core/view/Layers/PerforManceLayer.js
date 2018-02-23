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
    var PerforManceLayer = (function (_super) {
        __extends(PerforManceLayer, _super);
        function PerforManceLayer() {
            var _this = _super.call(this, [ResManager.GROUP_NAME.PERFORMANCE]) || this;
            _this.skinName = performanceLayerSkin;
            return _this;
        }
        PerforManceLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.percentWidth = this.percentHeight = 100;
            this._listItem.dataProvider = this._listItemData;
            this._listItem.itemRenderer = PreforManceitem;
            console.log("long:", this._listItemData.length);
            if (!this._listItemData.length)
                this.noneTips.visible = true;
            else
                this.noneTips.visible = false;
        };
        return PerforManceLayer;
    }(Layers.BaseLayer));
    Layers.PerforManceLayer = PerforManceLayer;
    __reflect(PerforManceLayer.prototype, "Layers.PerforManceLayer");
    var PreforManceitem = (function (_super) {
        __extends(PreforManceitem, _super);
        function PreforManceitem() {
            var _this = _super.call(this) || this;
            _this.playNameArray = [];
            _this.isSetDataProvider = false;
            return _this;
            // console.log("可以进入");
        }
        PreforManceitem.prototype.childrenCreated = function () {
            _super.prototype.createChildren.call(this);
            this._listUserinfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listItem, this);
            // this._listUserinfo.dataProvider = new eui.ArrayCollection(this.data.playerName);
            this._listUserinfo.itemRenderer = PerformanceListItem;
            // var list = [
            //     {
            //         username: "我是帅哥:",
            //         userscore: "20"
            //     },
            // ];
            // (<eui.ArrayCollection>this._listUserinfo.dataProvider).replaceAll(list);
        };
        PreforManceitem.prototype.dataChanged = function () {
            this._roomNumber.text = "房间号:" + this.data.roomID;
            this._gameTime.text = "时间:" + new Date(this.data.createTime).Format("yy-MM-dd  hh:mm:ss");
            if (!this.isSetDataProvider) {
                this._listUserinfo.dataProvider = new eui.ArrayCollection(this.data.playerName);
                this.isSetDataProvider = true;
            }
            switch (this.data.gameID) {
                case 1 /* NIUNIU */:
                    {
                        this._gameName.text = "牛牛";
                        this._gameHead.source = "nn_Area_png";
                    }
                    ;
                    break;
                case 38 /* GAME_ID_TWOMAN_QZNN */:
                    {
                        this._gameName.text = "二人牛牛";
                        this._gameHead.source = "nn_Area_png";
                    }
                    ;
                    break;
                case 10 /* ZJH */:
                    {
                        this._gameName.text = "拼三张";
                        this._gameHead.source = "psz_area_png";
                    }
                    ;
                    break;
                case 39 /* GAME_ID_GDMJ_FK */:
                    {
                        this._gameName.text = "广东麻将";
                        this._gameHead.source = "gdmj_area_png";
                    }
                    ;
                    break;
                case 3 /* DDZ */:
                    {
                        this._gameName.text = "斗地主";
                        this._gameHead.source = "ddz_area_png";
                    }
                    ;
                    break;
            }
            // console.log("oo=", this.data.playerName);
        };
        PreforManceitem.prototype.listItem = function () {
            var secondLayer = new Layers.PreforManceSecondLayer(this.data.gameID);
            secondLayer.itemData = new eui.ArrayCollection(this.data.zhanji);
            var nameListTemp = [];
            var i = 0;
            for (var k in this.data.playerName) {
                if (this.data.playerName.hasOwnProperty(k)) {
                    nameListTemp[i] = this.data.playerName[k].name;
                }
                i++;
            }
            secondLayer.itemNameData = new eui.ArrayCollection(nameListTemp);
            secondLayer.open();
        };
        return PreforManceitem;
    }(eui.ItemRenderer));
    Layers.PreforManceitem = PreforManceitem;
    __reflect(PreforManceitem.prototype, "Layers.PreforManceitem");
    var PerformanceListItem = (function (_super) {
        __extends(PerformanceListItem, _super);
        function PerformanceListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = PerformancelistItemSkin;
            return _this;
        }
        PerformanceListItem.prototype.childrenCreated = function () {
            _super.prototype.createChildren.call(this);
        };
        PerformanceListItem.prototype.dataChanged = function () {
            this._userName.text = this.data.name;
            if (this.itemIndex == 0) {
                this._score.textColor = 0xff0000;
            }
            this._score.text = this.data.score;
        };
        return PerformanceListItem;
    }(eui.ItemRenderer));
    __reflect(PerformanceListItem.prototype, "PerformanceListItem");
})(Layers || (Layers = {}));
//# sourceMappingURL=PerforManceLayer.js.map