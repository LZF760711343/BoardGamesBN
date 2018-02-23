namespace Layers {
    export class PaiMaiLayer extends BaseLayer {

        public _view: eui.ViewStack;
        public _tab: eui.TabBar;
        public text_gold: eui.Label;

        public list_sale: eui.List;
        public list_dingdan: eui.List;
        public list_history: eui.List;

        private input_search: eui.EditableText;
        private input_search2: eui.EditableText;
        private btn_search: UI.CommonBtn;
        private btn_search2: UI.CommonBtn;

        public isShowInFirst: boolean;

        public constructor() {
            super(["kuangbg_area_png",ResManager.GROUP_NAME.HALLSMALLSET]);
            this.isShowInFirst = true;
            this.skinName = PaiMaiSkin;

            this._view.selectedIndex = 0;
            if (Global.playerDto.gold > 100000)
                this.text_gold.text = Math.floor(Global.playerDto.gold / 10000) + GameLangs.wan;
            else
                this.text_gold.text = Global.playerDto.gold.toString();
        }

        protected childrenCreated(): void {
            super.childrenCreated();
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
        }

        protected CleanTips(event: egret.TouchEvent) {
            if (event.target == this.input_search) {
                this.input_search.text = "";
            }
            else
                this.input_search2.text = "";
        }

        private TabChange() {
            // this.input_search2.text = "输入订单号查询";
            // this.input_search.text = "输入订单号查询";
            this._view.selectedIndex = this._tab.selectedIndex;
            switch (this._tab.selectedIndex) {
                case 0: {
                    // net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_DINGDAN_LIST).send();
                    break;
                }
                case 1: {
                    net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_PLAYER_BAG).send();
                    console.log("消息已发送");
                    break;
                }
            }
        }

        //购买界面搜索按钮
        protected onSearch() {
            this.isShowInFirst = true;
            if (!this.input_search.text)
                net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_DINGDAN_LIST).send();
            else
                net.SendMsg.create({ dingdanId: parseInt(this.input_search.text) }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_SERACH_DINGDAN).send();
        }
        //历史记录界面搜索按钮
        protected onSearch2() {
            this.isShowInFirst = false;
            net.SendMsg.create({ dingdanId: parseInt(this.input_search2.text) }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_SERACH_DINGDAN).send();
        }

        //出售项监听
        public onEnter() {
            var saleWindowLayer = new PaiMaiSaleWindowLayer(this.list_sale.selectedItem.count);
            saleWindowLayer.open();
        }

        public UpdateDingDanList(msg: net.ReceiveMsg<model.DingDanInfo>) {
            this.list_dingdan.dataProvider = new eui.ArrayCollection(msg.datas.dingdanList);
        }

        public UpdateSearchList(msg: net.ReceiveMsg<model.SearchDingDanInfo>) {
            var result = [];
            result.push(msg.datas.dingdan);
            if (this.isShowInFirst)
                this.list_dingdan.dataProvider = new eui.ArrayCollection(result);
            else
                this.list_history.dataProvider = new eui.ArrayCollection(result);
        }

        public RefreshData() {
            this.text_gold.text = Global.playerDto.gold.toString();
        }
    }

    //出售项呈示器
    class PaiMaiSaleItem extends eui.ItemRenderer {
        private btn_item: UI.CommonBtn;
        private text_Count:UI.CommonBtn;

        public constructor() {
            super();
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            // this.btn_item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnter, this);
        }
        public dataChanged() {
            this.text_Count.label=this.data.count;
        }

        // public onEnter() {
        //     var saleWindowLayer = new PaiMaiSaleWindowLayer();
        //     saleWindowLayer.count = this.data.count;
        //     console.log("count=",this.data.count);
        //     saleWindowLayer.open();
        // }
    }

    //订单列表项呈示器
    class PaiMaiDingDanItem extends eui.ItemRenderer {
        private btn_buy: UI.CommonBtn;
        private type: eui.Label;
        private player: eui.Label;
        private dingdanID: eui.Label;
        private cost: eui.Label;
        private text_mine: eui.Label;
        private _bgImg:eui.Image;

        protected childrenCreated(): void {
            super.childrenCreated();
            this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnter, this);
        }
        public dataChanged() {
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
                case DAOJU_TYPE.MEN_PIAO: { this.cost.text = "门票"; break; }
            }
                if ((this.itemIndex + 1) % 2 == 0) {
                this._bgImg.visible = false;
            } else {
                this._bgImg.visible = true;
            }
        }

        public onEnter() {
            var buyWindowLayer = new PaiMaiBuyWindowLayer(this.cost.text);
            buyWindowLayer.dingdanID = this.data.dingdanId;
            buyWindowLayer.open();
        }
    }

    //历史列表项呈示器
    class PaiMaiHistoryItem extends eui.ItemRenderer {
        private type: eui.Label;
        private player: eui.Label;
        private order: eui.Label;
        private cost: eui.Label;
        private time: eui.Label;

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        public dataChanged() {
            this.order.text = this.data.dingdanId;
            this.cost.text = this.data.needGold;
            switch (this.data.daojuId) {
                case DAOJU_TYPE.MEN_PIAO: { this.cost.text = "门票"; break; }
            }
            if (this.data.isSale) {
                this.player.text = this.data.buyPlayerNickName;
                this.time.text = new Date(this.data.createTime * 1000).Format("MM-dd hh:mm:ss");
            }
            else {
                this.player.text = "未出售";
                this.time.text = "未出售";
            }
        }

    }


}
