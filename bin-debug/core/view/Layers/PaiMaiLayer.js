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
    var PaiMaiLayer = (function (_super) {
        __extends(PaiMaiLayer, _super);
        function PaiMaiLayer() {
            var _this = _super.call(this, ["kuangbg_area_png", ResManager.GROUP_NAME.HALLSMALLSET]) || this;
            _this.isShowInFirst = true;
            _this.skinName = PaiMaiSkin;
            _this._view.selectedIndex = 0;
            if (Global.playerDto.gold > 100000)
                _this.text_gold.text = Math.floor(Global.playerDto.gold / 10000) + GameLangs.wan;
            else
                _this.text_gold.text = Global.playerDto.gold.toString();
            return _this;
        }
        PaiMaiLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            console.log("salelist:", this.list_sale.dataProvider);
            this.list_sale.itemRenderer = PaiMaiSaleItem;
            this.list_dingdan.itemRenderer = PaiMaiDingDanItem;
            this.list_history.itemRenderer = PaiMaiHistoryItem;
            this.list_sale.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onEnter, this);
            this._tab.addEventListener(egret.TouchEvent.CHANGE, this.TabChange, this);
            this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSearch, this);
            this.btn_search2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSearch2, this);
            // this.input_search.addEventListener(egret.TouchEvent.TOUCH_TAP,this.CleanTips,this,);
            // this.input_search2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.CleanTips,this);
        };
        PaiMaiLayer.prototype.CleanTips = function (event) {
            if (event.target == this.input_search) {
                this.input_search.text = "";
            }
            else
                this.input_search2.text = "";
        };
        PaiMaiLayer.prototype.TabChange = function () {
            // this.input_search2.text = "输入订单号查询";
            // this.input_search.text = "输入订单号查询";
            this._view.selectedIndex = this._tab.selectedIndex;
            switch (this._tab.selectedIndex) {
                case 0: {
                    // net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_DINGDAN_LIST).send();
                    break;
                }
                case 1: {
                    net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_PLAYER_BAG).send();
                    console.log("消息已发送");
                    break;
                }
            }
        };
        //购买界面搜索按钮
        PaiMaiLayer.prototype.onSearch = function () {
            this.isShowInFirst = true;
            if (!this.input_search.text)
                net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_DINGDAN_LIST).send();
            else
                net.SendMsg.create({ dingdanId: parseInt(this.input_search.text) }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_SERACH_DINGDAN).send();
        };
        //历史记录界面搜索按钮
        PaiMaiLayer.prototype.onSearch2 = function () {
            this.isShowInFirst = false;
            net.SendMsg.create({ dingdanId: parseInt(this.input_search2.text) }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_SERACH_DINGDAN).send();
        };
        //出售项监听
        PaiMaiLayer.prototype.onEnter = function () {
            var saleWindowLayer = new Layers.PaiMaiSaleWindowLayer(this.list_sale.selectedItem.count);
            saleWindowLayer.open();
        };
        PaiMaiLayer.prototype.UpdateDingDanList = function (msg) {
            this.list_dingdan.dataProvider = new eui.ArrayCollection(msg.datas.dingdanList);
        };
        PaiMaiLayer.prototype.UpdateSearchList = function (msg) {
            var result = [];
            result.push(msg.datas.dingdan);
            if (this.isShowInFirst)
                this.list_dingdan.dataProvider = new eui.ArrayCollection(result);
            else
                this.list_history.dataProvider = new eui.ArrayCollection(result);
        };
        PaiMaiLayer.prototype.RefreshData = function () {
            this.text_gold.text = Global.playerDto.gold.toString();
        };
        return PaiMaiLayer;
    }(Layers.BaseLayer));
    Layers.PaiMaiLayer = PaiMaiLayer;
    __reflect(PaiMaiLayer.prototype, "Layers.PaiMaiLayer");
    //出售项呈示器
    var PaiMaiSaleItem = (function (_super) {
        __extends(PaiMaiSaleItem, _super);
        function PaiMaiSaleItem() {
            return _super.call(this) || this;
        }
        PaiMaiSaleItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // this.btn_item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnter, this);
        };
        PaiMaiSaleItem.prototype.dataChanged = function () {
            this.text_Count.label = this.data.count;
        };
        return PaiMaiSaleItem;
    }(eui.ItemRenderer));
    __reflect(PaiMaiSaleItem.prototype, "PaiMaiSaleItem");
    //订单列表项呈示器
    var PaiMaiDingDanItem = (function (_super) {
        __extends(PaiMaiDingDanItem, _super);
        function PaiMaiDingDanItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PaiMaiDingDanItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnter, this);
        };
        PaiMaiDingDanItem.prototype.dataChanged = function () {
            if (this.data.salePlayerId == Global.playerDto.id) {
                this.text_mine.visible = true;
                this.btn_buy.visible = false;
            }
            else {
                this.text_mine.visible = false;
                this.btn_buy.visible = true;
            }
            this.player.text = this.data.salePlayerNickName;
            this.dingdanID.text = this.data.dingdanId;
            this.cost.text = this.data.needGold;
            switch (this.data.daojuId) {
                case 0 /* MEN_PIAO */: {
                    this.cost.text = "门票";
                    break;
                }
            }
            if ((this.itemIndex + 1) % 2 == 0) {
                this._bgImg.visible = false;
            }
            else {
                this._bgImg.visible = true;
            }
        };
        PaiMaiDingDanItem.prototype.onEnter = function () {
            var buyWindowLayer = new Layers.PaiMaiBuyWindowLayer(this.cost.text);
            buyWindowLayer.dingdanID = this.data.dingdanId;
            buyWindowLayer.open();
        };
        return PaiMaiDingDanItem;
    }(eui.ItemRenderer));
    __reflect(PaiMaiDingDanItem.prototype, "PaiMaiDingDanItem");
    //历史列表项呈示器
    var PaiMaiHistoryItem = (function (_super) {
        __extends(PaiMaiHistoryItem, _super);
        function PaiMaiHistoryItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PaiMaiHistoryItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        PaiMaiHistoryItem.prototype.dataChanged = function () {
            this.order.text = this.data.dingdanId;
            this.cost.text = this.data.needGold;
            switch (this.data.daojuId) {
                case 0 /* MEN_PIAO */: {
                    this.cost.text = "门票";
                    break;
                }
            }
            if (this.data.isSale) {
                this.player.text = this.data.buyPlayerNickName;
                this.time.text = new Date(this.data.createTime * 1000).Format("MM-dd hh:mm:ss");
            }
            else {
                this.player.text = "未出售";
                this.time.text = "未出售";
            }
        };
        return PaiMaiHistoryItem;
    }(eui.ItemRenderer));
    __reflect(PaiMaiHistoryItem.prototype, "PaiMaiHistoryItem");
})(Layers || (Layers = {}));
//# sourceMappingURL=PaiMaiLayer.js.map