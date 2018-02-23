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
    //出售层
    var PaiMaiSaleWindowLayer = (function (_super) {
        __extends(PaiMaiSaleWindowLayer, _super);
        function PaiMaiSaleWindowLayer(count) {
            var _this = _super.call(this) || this;
            _this.currentCount = 10; //当前已选择数量
            _this.skinName = SaleWindowSkin;
            _this.createDingDan = {};
            _this.text_down.inputType = egret.TextFieldInputType.TEL;
            _this.text_count.text = "门票：" + count;
            return _this;
        }
        PaiMaiSaleWindowLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.btn_sale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSale, this);
            // this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
            // this.btn_reduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduce, this);
            // this.text_count.text = "门票："+this.count;
        };
        PaiMaiSaleWindowLayer.prototype.onSale = function () {
            if (parseInt(this.text_down.text) < 100000000) {
                this.createDingDan.daojuId = 100001;
                this.createDingDan.needGold = parseInt(this.text_down.text);
                net.SendMsg.create(this.createDingDan, 3 /* PLAY_GAME */, PlayGameOrder.C2G_CREATE_DINGDAN).send();
            }
            else
                Toast.launch("出售最大价格不得超过9999万！");
            this.close();
        };
        return PaiMaiSaleWindowLayer;
    }(Layers.BaseLayer));
    Layers.PaiMaiSaleWindowLayer = PaiMaiSaleWindowLayer;
    __reflect(PaiMaiSaleWindowLayer.prototype, "Layers.PaiMaiSaleWindowLayer");
    //购买层
    var PaiMaiBuyWindowLayer = (function (_super) {
        __extends(PaiMaiBuyWindowLayer, _super);
        function PaiMaiBuyWindowLayer(count) {
            var _this = _super.call(this) || this;
            _this.skinName = BuyWindowSkin;
            _this.text_cost.text = count;
            _this.count = count;
            return _this;
        }
        PaiMaiBuyWindowLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
        };
        PaiMaiBuyWindowLayer.prototype.onBuy = function () {
            if (Global.playerDto.gold >= this.count) {
                net.SendMsg.create({ "dingdanId": this.dingdanID }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_BUY_DINGDAN).send();
            }
            else
                Toast.launch("您的金币不足！");
            this.close();
        };
        return PaiMaiBuyWindowLayer;
    }(Layers.BaseLayer));
    Layers.PaiMaiBuyWindowLayer = PaiMaiBuyWindowLayer;
    __reflect(PaiMaiBuyWindowLayer.prototype, "Layers.PaiMaiBuyWindowLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=PaiMaiWindowLayer.js.map