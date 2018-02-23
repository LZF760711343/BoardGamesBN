namespace Layers {
    export class GameMessgeListLayer extends BaseLayer {
        public _listNew: eui.List;
        private myCollection: eui.ArrayCollection;
        private GameNew: any[];
        public constructor() {
            super([ResManager.GROUP_NAME.SAFE_BOX, "new_area_png"]);
            this.skinName = GameMessageListSkin;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.initNew();
            EventManager.register("undataNew", this.undataNew, this);
        }
        protected onExit() {
            super.onExit();
            EventManager.remove("undataNew", this.undataNew, this);
        }
        public undataNew(index: number) {
            egret.log("回调");
            this.GameNew.splice(index, 1);
            this.myCollection.refresh();
            LocalDatas.datas.datas.msgStr = "";
            if (LocalDatas.datas.datas.msgStr) {

            } else {
                this.currentState = "empty";
            }
        }


        public initNew() {
            this.myCollection = <eui.ArrayCollection>this._listNew.dataProvider;
            this._listNew.itemRenderer = GameNewListitem;
            // for(let i=0;i<LocalDatas.datas.datas.gameNew.length;i++){
            if (LocalDatas.datas.datas.msgStr) {
                this.GameNew = [{ msgStr: LocalDatas.datas.datas.msgStr, new: new Date().Format("yyyy-MM-dd"), new1: new Date().Format("hh:mm:ss") }];
                this.myCollection.replaceAll(this.GameNew);
            } else {
                this.currentState = "empty";
            }
            // }
        };
    }
    class GameNewListitem extends eui.ItemRenderer {
        public _newGroup: eui.Group;
        public _headline: eui.Label;
        public _headline0: eui.Label;
        public _headline1: eui.Label;

        public constructor() {
            super();
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this._newGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minuteNewOpen, this);
        }
        private minuteNewOpen() {
            // new Layers.GameMessagetDetaiLayer(this._headline.text,this.itemIndex).open();
            new Layers.GameMessagetDetaiLayer(this._headline.text, this.itemIndex).open();
        }
        public dataChanged(): void {


        }


    }
}

