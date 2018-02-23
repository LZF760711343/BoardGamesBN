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
    var PreforManceSecondLayer = (function (_super) {
        __extends(PreforManceSecondLayer, _super);
        function PreforManceSecondLayer(data) {
            var _this = _super.call(this) || this;
            // this.data = args[0];
            _this.skinName = PerFormanceSecondLayerSkin;
            switch (data) {
                case 1 /* NIUNIU */:
                    {
                        _this._title.source = "niuniu_text_png";
                    }
                    ;
                    break;
                case 38 /* GAME_ID_TWOMAN_QZNN */:
                    {
                        _this._title.source = "niuniu2_text_png";
                    }
                    ;
                    break;
                case 10 /* ZJH */:
                    {
                        _this._title.source = "pingshanzhang_text_png";
                    }
                    ;
                    break;
                case 39 /* GAME_ID_GDMJ_FK */:
                    {
                        _this._title.source = "majiang_text_png";
                    }
                    ;
                    break;
                case 3 /* DDZ */:
                    {
                        _this._title.source = "doudizhu_text_png";
                    }
                    ;
                    break;
            }
            return _this;
        }
        PreforManceSecondLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._dataGroup.itemRenderer = PreforManceSeconditem;
            this._dataGroup.dataProvider = this.itemData;
            this._nameList.dataProvider = this.itemNameData;
            console.log("secondlayer:", this.itemData);
            // var list = ["大佬","张三", "李四", "赵武", "高脚七", "王八", "九妹", "十弟"];
            // var list2 = [];
            // var startTime = new Date().getTime();
            //  for (var i = 0; i < 9; i++) {
            //     list2[i] = [1,2,3,4,5,6,7,8,startTime];
            // }
            // this._dataGroup.itemRenderer = PreforManceSeconditem;
            // (<eui.ArrayCollection>this._nameList.dataProvider).replaceAll(list);
            // (<eui.ArrayCollection>this._dataGroup.dataProvider).replaceAll(list2.reverse());
        };
        return PreforManceSecondLayer;
    }(Layers.BaseLayer));
    Layers.PreforManceSecondLayer = PreforManceSecondLayer;
    __reflect(PreforManceSecondLayer.prototype, "Layers.PreforManceSecondLayer");
    var PreforManceSeconditem = (function (_super) {
        __extends(PreforManceSeconditem, _super);
        function PreforManceSeconditem() {
            var _this = _super.call(this) || this;
            _this.skinName = PerformanceSencondlistItemSkin;
            return _this;
            // console.log("PreforManceSeconditem:constructor");
        }
        PreforManceSeconditem.prototype.childrenCreated = function () {
            _super.prototype.createChildren.call(this);
            this._scoreLb1.textColor = 0xff0000;
            this._labels = [this._scoreLb1, this._scoreLb2, this._scoreLb3, this._scoreLb4, this._scoreLb5, this._scoreLb6, this._scoreLb7, this._scoreLb8,];
            // console.log("PreforManceSeconditem:childrenCreated");
        };
        PreforManceSeconditem.prototype.dataChanged = function () {
            // for (var i = 0; i < 8; i++) {
            //     this._labels[i].text = (this.data[i] || this.data[i] == 0) ? this.data[i] : " ";
            // }
            // for(var i=0;i<this.data.record.length;i++){
            //     let n    = 0;
            // console.log("PreforManceSeconditem:dataChanged"+this.data.record[0]);
            for (var i = 0; i < 8; i++) {
                if (i >= this.data.record.length)
                    this._labels[i].text = " ";
                else
                    this._labels[i].text = this.data.record[i];
            }
            this._timeLb.text = this.data.time;
            // this._bg.visible = true;
            this._bg.visible = (this.itemIndex % 2 == 0);
            // this._timeLb.text = new Date(this.data[8] * 1000).Format("MM-dd   hh:mm:ss");
            this._timeLb.text = new Date(this.data.time * 1000).Format("MM-dd   hh:mm:ss");
            // this._btnReplay.visible = this.data[9] === GAME_TYPE.GD_MAJIANG || this.data[9] === GAME_TYPE.TDH_MAJIANG  || this.data[9] === GAME_TYPE.HZB;
        };
        return PreforManceSeconditem;
    }(eui.ItemRenderer));
    __reflect(PreforManceSeconditem.prototype, "PreforManceSeconditem");
})(Layers || (Layers = {}));
//# sourceMappingURL=PreforManceSecondLayer.js.map