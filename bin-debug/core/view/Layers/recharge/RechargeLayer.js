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
    var RechargeLayer = (function (_super) {
        __extends(RechargeLayer, _super);
        function RechargeLayer(type) {
            var _this = _super.call(this, [ResManager.GROUP_NAME.RECHARGE]) || this;
            _this._openType = type;
            _this.skinName = RechargeLayerSkin;
            return _this;
        }
        RechargeLayer.prototype.updateLabel = function () {
            this._cardLb.text = Global.playerDto.fangkaCount + "";
            this._cardNiu.text = Global.playerDto.niukaCount + "";
            var gold = Global.playerDto.gold;
            if (gold > 10000) {
                this._moneyLb.text = Math.floor(gold / 10000) + GameLangs.wan;
            }
            else {
                this._moneyLb.text = gold + "";
            }
            if (Global.playerDto.diamond > 100000) {
                this._diamondLb.text = Math.floor(Global.playerDto.diamond / 10000) + GameLangs.wan;
            }
            else {
                this._diamondLb.text = Global.playerDto.diamond + "";
            }
        };
        RechargeLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            this._tabBar.selectedIndex = this._viewStack.selectedIndex = this._openType;
            this._tabBar.addEventListener(egret.Event.CHANGE, this.chanTab, this);
            self.init();
        };
        RechargeLayer.prototype.chanTab = function (evt) {
            this._viewStack.selectedIndex = this._tabBar.selectedIndex;
        };
        RechargeLayer.prototype.init = function () {
            if (Global.charge_conf.is_load) {
                var myCollection = new eui.ArrayCollection(Global.charge_conf.diamond.slice().sort(this.sort));
                var dataGroup = this._buyDiamondsList;
                dataGroup.dataProvider = myCollection;
                dataGroup.itemRenderer = RechargeItem;
                var myCollection = new eui.ArrayCollection(Global.charge_conf.gold.slice().sort(this.sort));
                var dataGroup = this._buyCoinsList;
                dataGroup.dataProvider = myCollection;
                dataGroup.itemRenderer = RechargeItem;
                var myCollection = new eui.ArrayCollection(Global.charge_conf.cards.slice().sort(this.sort));
                var dataGroup = this._buyCardList;
                dataGroup.dataProvider = myCollection;
                dataGroup.itemRenderer = RechargeItem;
                var myCollection = new eui.ArrayCollection(Global.charge_conf.niucards.slice().sort(this.sort));
                var dataGroup = this._buyniuCardList;
                dataGroup.dataProvider = myCollection;
                dataGroup.itemRenderer = RechargeItem;
            }
            else {
                var load_ani = this.load_ani = new components.LoadingIcon();
                this.addChild(load_ani);
                load_ani.horizontalCenter = 0;
                load_ani.verticalCenter = 46.5;
                load_ani.run();
                load_ani.height = load_ani.width = 150;
            }
            this.updateLabel();
        };
        RechargeLayer.prototype.sort = function (a, b) {
            return a.index - b.index;
        };
        RechargeLayer.prototype.update = function () {
            if (this.load_ani) {
                this.removeChild(this.load_ani);
                this.load_ani = null;
                this.init();
            }
            else {
                var array = this._buyDiamondsList.dataProvider;
                array.replaceAll(Global.charge_conf.diamond.slice().sort(this.sort));
                var array = this._buyCoinsList.dataProvider;
                array.replaceAll(Global.charge_conf.gold.slice().sort(this.sort));
                var array = this._buyCardList.dataProvider;
                array.replaceAll(Global.charge_conf.cards.slice().sort(this.sort));
                var array = this._buyniuCardList.dataProvider;
                array.replaceAll(Global.charge_conf.niucards.slice().sort(this.sort));
            }
        };
        RechargeLayer.prototype.onExit = function () {
            //移除事件，防止内存泄露
            this._tabBar.removeEventListener(egret.Event.CHANGE, this.chanTab, this);
        };
        return RechargeLayer;
    }(Layers.BaseLayer));
    Layers.RechargeLayer = RechargeLayer;
    __reflect(RechargeLayer.prototype, "Layers.RechargeLayer");
    var RechargeItem = (function (_super) {
        __extends(RechargeItem, _super);
        function RechargeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = RechargeItemSkin;
            return _this;
        }
        RechargeItem.prototype.childrenCreated = function () {
            _super.prototype.createChildren.call(this);
            this._changeBIg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickConversion, this);
            this._changeBIg.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onExit, this);
        };
        RechargeItem.prototype.onExit = function () {
            //移除事件，避免内存泄露
            this._changeBIg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickConversion, this);
            this._changeBIg.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onExit, this);
        };
        /**
         * 点击兑换按钮
         */
        RechargeItem.prototype.ClickConversion = function (event) {
            egret.log(this.data);
            var data = this.data;
            if (data.buytype === 2 /* COIN */) {
                egret.log("data::" + data);
                if (Global.playerDto.diamond >= data.price) {
                    net.SendMsg.create({ diamond: data.price }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_DIAMOND2GOLD).send();
                }
                else {
                    Toast.launch(GameLangs.diamondNotEnough);
                }
            }
            else if (data.buytype === 1 /* DIAMOND */) {
                nest.pay(data.pid, LocalDatas.datas.datas.unionid, LocalDatas.datas.datas.openid, GameLangs.rechargeDiamondBody.format(data.buy));
            }
            else if (data.buytype === 3 /* CARD */) {
                nest.pay(data.pid, LocalDatas.datas.datas.unionid, LocalDatas.datas.datas.openid, GameLangs.rechargeFangkaBody.format(data.buy));
            }
            else {
                nest.pay(data.pid, LocalDatas.datas.datas.unionid, LocalDatas.datas.datas.openid, GameLangs.rechargeNiuBody.format(data.buy));
            }
            egret.Tween.get(this._changeBIg).to({ scaleX: 0.9, scaleY: 0.9 }, 100, egret.Ease.quadOut).to({ scaleX: 1, scaleY: 1, }, 100, egret.Ease.quadOut);
        };
        RechargeItem.prototype.dataChanged = function () {
            var data = this.data;
            var now = Date.now() / 1000;
            var self = this;
            // egret.log("data.priceunit" + data.priceunit)
            if (data.priceunit == 1 /* DIAMOND */) {
                self._icon.source = "zs_licon_png";
                self._priceLb.text = data.price + "";
            }
            else {
                self._icon.source = "rmb_area_png";
                self._priceLb.text = parseFloat(data.price + "") + "";
                egret.log("data.price" + data.price);
            }
            //金币钻石的IMG显示
            if (data.buytype == 1 /* DIAMOND */) {
                // if (data.buytype ==0) {
                self._img.source = "zs_icon" + data.icon + "_png";
            }
            else if (data.buytype == 2 /* COIN */) {
                self._img.source = "jb_icon" + data.icon + "_png";
            }
            else if (data.buytype == 3 /* CARD */) {
                self._img.source = "fangka_icon1_png";
            }
            else {
                self._golDscope.visible = true;
                self._golDscope.text = data.off_title;
                self._img.source = "niuka_icon" + data.icon + "_png";
            }
            this._moneyLb.text = data.buy + "";
            //赠送的钻石
            var gift_diamond = 0;
            //赠送的金币
            var gift_coins = 0;
            if (data.offnum && now < data.off_endtime && now > data.off_starttime) {
                if (data.offtype == 2 /* COIN */) {
                    gift_coins += data.offnum;
                }
                else {
                    gift_diamond += data.offnum;
                }
            }
            if (data.gift) {
                if (data.gifttype === 2 /* COIN */) {
                    gift_coins += data.gift;
                }
                else {
                    gift_diamond += data.gift;
                }
            }
            //热卖
            if (data.status == 0) {
                this._imgHotTip.visible = false;
            }
            else {
                this._imgHotTip.visible = true;
            }
            var text = "";
            // if (gift_diamond) {
            //     text = GameLangs.gift_diamond_tips.format(data.gift);
            //     if (gift_coins) {
            //         text += "\n";
            //     }
            // }
            if (data.buytype != 4 /* NIUKA */ && data.off_title) {
                text = data.off_title;
            }
            if (gift_coins) {
                text += GameLangs.gift_egg_tips.format(data.gift < 10000 ? data.gift : (Math.floor(data.gift / 10000) + GameLangs.cn_wan));
            }
            if (text) {
                self._giftTipLb.visible = self._tipBox.visible = true;
                self._giftTipLb.text = text;
                self._tipBox.height = self._giftTipLb.height + 15;
            }
            else {
                self._giftTipLb.visible = self._tipBox.visible = false;
            }
        };
        return RechargeItem;
    }(eui.ItemRenderer));
    __reflect(RechargeItem.prototype, "RechargeItem");
})(Layers || (Layers = {}));
//# sourceMappingURL=RechargeLayer.js.map