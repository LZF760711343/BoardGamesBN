namespace Layers {
    export class ShenQingListLayer extends BaseLayer {
        public _list: eui.List;
        public _applyBtn: UI.CommonBtn;

        private isSelfKing: boolean;
        public constructor() {
            super();
            this.skinName = niuniu.brnn.ShenQingListSkin;
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._applyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplyDealer, this);
        }


        private onApplyDealer() {
            if (this.isSelfKing) {//如果自己已经上庄的,就发送下庄消息
                net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ASK_XIAZHUANG).send();
                this.close();

            } else {
                net.SendMsg.create({ shangZhuangType: 1 }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ASK_SHANGZHUANG).send();
                this.close();
         }
        }

        public updateKingBtn() {
            this._applyBtn.label = this.isSelfKing ? "退位" : "申请上庄";
        }

        public init(val, val2: boolean) {
            this.isSelfKing = val2;
            this.updateKingBtn();
            var myCollection: eui.ArrayCollection = new eui.ArrayCollection(val);
            var dataGroup: eui.DataGroup = this._list;
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRenderer = ShenQingListClass;
        }


    }

    class ShenQingListClass extends eui.ItemRenderer {
        public _id: eui.Label;
        public _name: eui.Label;


        public constructor() {
            super();
            //this.skinName = DorpDownLabel;
        }
        public childrenCreated(): void {
            super.childrenCreated();

        }
        public dataChanged(): void {
            // egret.log("data", this.itemIndex);
            // egret.log("data", this.data);
            this._id.text = (this.itemIndex + 1) + "";
            this._name.text = "" + this.data;   
            
        }
    }
}
