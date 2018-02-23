namespace Layers {
    export class RechargeLayer extends BaseLayer {

        private _tabBar: eui.TabBar;
        public _buyCoinsList: eui.List;
        public _buyDiamondsList: eui.List;
        public _moneyLb: eui.Label;
        public _diamondLb: eui.Label;
        private _viewStack: eui.ViewStack;
        private _openType: number;
        public load_ani: components.LoadingIcon;
        public _cardLb: eui.Label;
        public _buyCardList: eui.List;
        public _buyniuCardList: eui.List;
        public _cardNiu: eui.Label;


        public constructor(type: number) {
            super([ResManager.GROUP_NAME.RECHARGE]);
            this._openType = type;
            this.skinName = RechargeLayerSkin;

        }
        public updateLabel() {
            this._cardLb.text = Global.playerDto.fangkaCount + "";
            this._cardNiu.text = Global.playerDto.niukaCount + "";
            let gold = Global.playerDto.gold;
            if (gold > 10000) {
                this._moneyLb.text = Math.floor(gold / 10000) + GameLangs.wan;
            } else {
                this._moneyLb.text = gold + "";
            }
            if (Global.playerDto.diamond > 100000) {
                this._diamondLb.text = Math.floor(Global.playerDto.diamond / 10000) + GameLangs.wan;
            } else {
                this._diamondLb.text = Global.playerDto.diamond + "";
            }
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            let self = this;
            this._tabBar.selectedIndex = this._viewStack.selectedIndex = this._openType;
            this._tabBar.addEventListener(egret.Event.CHANGE, this.chanTab, this);
            self.init();
        }




        private chanTab(evt: eui.CollectionEvent): void {
            this._viewStack.selectedIndex = this._tabBar.selectedIndex;
        }



        private init() {
            if (Global.charge_conf.is_load) {
                var myCollection: eui.ArrayCollection = new eui.ArrayCollection(Global.charge_conf.diamond.slice().sort(this.sort));
                var dataGroup: eui.DataGroup = this._buyDiamondsList;
                dataGroup.dataProvider = myCollection;
                dataGroup.itemRenderer = RechargeItem;
                var myCollection: eui.ArrayCollection = new eui.ArrayCollection(Global.charge_conf.gold.slice().sort(this.sort));
                var dataGroup: eui.DataGroup = this._buyCoinsList;
                dataGroup.dataProvider = myCollection;
                dataGroup.itemRenderer = RechargeItem;
                var myCollection: eui.ArrayCollection = new eui.ArrayCollection(Global.charge_conf.cards.slice().sort(this.sort));
                var dataGroup: eui.DataGroup = this._buyCardList;
                dataGroup.dataProvider = myCollection;
                dataGroup.itemRenderer = RechargeItem;
                var myCollection: eui.ArrayCollection = new eui.ArrayCollection(Global.charge_conf.niucards.slice().sort(this.sort));
                var dataGroup: eui.DataGroup = this._buyniuCardList;
                dataGroup.dataProvider = myCollection;
                dataGroup.itemRenderer = RechargeItem;
            } else {
                var load_ani = this.load_ani = new components.LoadingIcon();
                this.addChild(load_ani);
                load_ani.horizontalCenter = 0;
                load_ani.verticalCenter = 46.5;
                load_ani.run();
                load_ani.height = load_ani.width = 150;
            }
            this.updateLabel();
        }

        private sort(a: model.CharegConfItem, b: model.CharegConfItem) {
            return a.index - b.index;
        }

        public update(): void {
            if (this.load_ani) {
                this.removeChild(this.load_ani);
                this.load_ani = null;
                this.init();
            } else {
                var array = <eui.ArrayCollection>this._buyDiamondsList.dataProvider;
                array.replaceAll(Global.charge_conf.diamond.slice().sort(this.sort));

                var array = <eui.ArrayCollection>this._buyCoinsList.dataProvider;
                array.replaceAll(Global.charge_conf.gold.slice().sort(this.sort));

                var array = <eui.ArrayCollection>this._buyCardList.dataProvider;
                array.replaceAll(Global.charge_conf.cards.slice().sort(this.sort));

                var array = <eui.ArrayCollection>this._buyniuCardList.dataProvider;
                array.replaceAll(Global.charge_conf.niucards.slice().sort(this.sort));
            }
        }
        protected onExit(): void {
            //移除事件，防止内存泄露
            this._tabBar.removeEventListener(egret.Event.CHANGE, this.chanTab, this);
		}
    }



    class RechargeItem extends eui.ItemRenderer {
        public _golDscope: eui.Label;
        public _imgBg: eui.Image;
        public _changeBIg: eui.Group;
        private _clickConversion: eui.Group;
        private _moneyLb: eui.Label;
        private _priceLb: eui.Label;
        private _img: eui.Image;
        private _icon: eui.Image;
        private _tipBox: eui.Image;
        private _giftTipLb: eui.Label;
        /**
         * 是否热销
         */
        private _imgHotTip: eui.Label;
        public constructor() {
            super();
            this.skinName = RechargeItemSkin;
        }
        public childrenCreated(): void {
            super.createChildren();
            this._changeBIg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickConversion, this);
            this._changeBIg.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onExit, this);
        }
        public onExit(){
            //移除事件，避免内存泄露
            this._changeBIg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickConversion, this);
            this._changeBIg.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onExit, this);
        }
        /**
         * 点击兑换按钮
         */
        private ClickConversion(event: egret.TouchEvent): void {
            egret.log(this.data);
            let data: model.CharegConfItem = this.data;
            if (data.buytype === CURRENCY_TYPE.COIN) {//如果是钻石兑换金币
                egret.log("data::" + data)
                if (Global.playerDto.diamond >= data.price ) {
                    net.SendMsg.create({ diamond: data.price }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_DIAMOND2GOLD).send();
                } else {
                    Toast.launch(GameLangs.diamondNotEnough);
                }
            } else if (data.buytype === CURRENCY_TYPE.DIAMOND) {//购买钻石
                nest.pay(data.pid, LocalDatas.datas.datas.unionid, LocalDatas.datas.datas.openid, GameLangs.rechargeDiamondBody.format(data.buy));
            } else if (data.buytype === CURRENCY_TYPE.CARD) {//购买房卡
                nest.pay(data.pid, LocalDatas.datas.datas.unionid, LocalDatas.datas.datas.openid, GameLangs.rechargeFangkaBody.format(data.buy));
                // if (Global.playerDto.diamond >= data.price) {
                //     net.SendMsg.create({ fangkaCount: data.buy }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_DIAMOND2FANGKA).send();
                // } else {
                //     Toast.launch(GameLangs.diamondNotEnough);
                // }
            } else {//购买牛卡
                nest.pay(data.pid, LocalDatas.datas.datas.unionid, LocalDatas.datas.datas.openid, GameLangs.rechargeNiuBody.format(data.buy));
            }
            egret.Tween.get(this._changeBIg).to({ scaleX: 0.9, scaleY: 0.9 }, 100, egret.Ease.quadOut).to({ scaleX: 1, scaleY: 1, }, 100, egret.Ease.quadOut);
        }
        public dataChanged(): void {
            var data: model.CharegConfItem = this.data;
            var now = Date.now() / 1000;
            let self = this;
            // egret.log("data.priceunit" + data.priceunit)
            if (data.priceunit == CURRENCY_TYPE.DIAMOND) {
                self._icon.source = "zs_licon_png";
                self._priceLb.text = data.price + "";
            } else {
                self._icon.source = "rmb_area_png";
                self._priceLb.text =parseFloat(data.price+"")  + "";
                egret.log("data.price"+data.price)
            }
            //金币钻石的IMG显示
            if (data.buytype == CURRENCY_TYPE.DIAMOND) {
                // if (data.buytype ==0) {

                self._img.source = `zs_icon${data.icon}_png`;
            } else if (data.buytype == CURRENCY_TYPE.COIN) {
                self._img.source = `jb_icon${data.icon}_png`;
            } else if (data.buytype == CURRENCY_TYPE.CARD) {
                self._img.source = "fangka_icon1_png";
                // self._img.scaleX=self._img.scaleY=2;
            } else {
                self._golDscope.visible = true;
                self._golDscope.text = data.off_title;
                self._img.source = `niuka_icon${data.icon}_png`;
                
            }
            this._moneyLb.text = data.buy  + "";
            //赠送的钻石
            let gift_diamond = 0;
            //赠送的金币
            let gift_coins = 0;
            if (data.offnum && now < data.off_endtime && now > data.off_starttime) {//该商品有充值活动,并且在充值活动期间
                if (data.offtype == CURRENCY_TYPE.COIN) {
                    gift_coins += data.offnum;
                } else {
                    gift_diamond += data.offnum;
                }
            }
            if (data.gift) {//如果有赠送的商品
                if (data.gifttype === CURRENCY_TYPE.COIN) {//赠送金币
                    gift_coins += data.gift;
                } else {//赠送钻石
                    gift_diamond += data.gift;
                }
            }
            //热卖
            if (data.status == 0) {
                this._imgHotTip.visible = false;
            } else {
                this._imgHotTip.visible = true;
            }
            let text = "";
            // if (gift_diamond) {
            //     text = GameLangs.gift_diamond_tips.format(data.gift);
            //     if (gift_coins) {
            //         text += "\n";
            //     }
            // }
            if(data.buytype!=CURRENCY_TYPE.NIUKA&&data.off_title){
                text=data.off_title;
            }
            if (gift_coins) {
                text += GameLangs.gift_egg_tips.format(data.gift < 10000 ? data.gift : (Math.floor(data.gift / 10000) + GameLangs.cn_wan));
            }
            if (text) {
                self._giftTipLb.visible = self._tipBox.visible = true;
                self._giftTipLb.text = text;
                self._tipBox.height = self._giftTipLb.height + 15;
            } else {
                self._giftTipLb.visible = self._tipBox.visible = false;
            }
        }
    }

}