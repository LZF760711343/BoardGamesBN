namespace Layers {
    export class RankingListLayer extends BaseLayer {
        public _ranList: eui.List;
        private isShowBg: boolean = true;
        private RanList: any[]
        private myCollection: eui.ArrayCollection;
        public constructor() {
            super([ResManager.GROUP_NAME.SAFE_BOX]);
            this.skinName = RankingListLayerSkin;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.percentWidth = this.percentHeight = 100;
        }
        protected onExit(){
            super.onExit();
        }
        public initRanlist(data: model.WealthListInfo): void {
            for (let i = 0; i < data.goldPHBList.length; i++) {
                if (data.goldPHBList[i].headImages == "") {
                    data.goldPHBList[i].headImages = "defaultHead_png";
                }
            }
            egret.log("data.goldPHBList" + data.goldPHBList)
            let myCollection: eui.ArrayCollection = this.myCollection = new eui.ArrayCollection(data.goldPHBList);
            let dataGroup: eui.DataGroup = this._ranList;
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRenderer = RankingListItem;
        }

    }

    class RankingListItem extends eui.ItemRenderer {
        public _gold: eui.Label;
        public _id: eui.Label;
        public _bgwhite: eui.Rect;
        public _headImages: eui.Image;
        public _GroupHead: eui.Group;
        public _kuang: eui.Image;


        public constructor() {
            super();
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this._GroupHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ChangeBig, this);
             this._GroupHead.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onExit, this);
        }
        protected onExit(){
            //移除事件，避免内存泄露
            this._GroupHead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ChangeBig, this);
            this._GroupHead.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onExit, this);
        }
        public ChangeBig() {
            if (this._GroupHead.scaleX === 1.55) {
                this._GroupHead.scaleX = this._GroupHead.scaleY = 1
            } else {
                this._GroupHead.scaleX = this._GroupHead.scaleY = 1.55
            }

        }
        public dataChanged(): void {
            this._gold.text+="金币";
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
            } else {
                this._bgwhite.visible = true;
            }

        }
    }

}