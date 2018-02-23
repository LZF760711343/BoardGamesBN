namespace Layers {
    export class PreforManceSecondLayer extends BaseLayer {
        private _nameList: eui.DataGroup;
        private _dataGroup: eui.List;
        private _title:eui.Image;
        private data: any;
        public itemData: eui.ArrayCollection;
        public itemNameData:eui.ArrayCollection;
        public constructor(data:number) {
            super();
            // this.data = args[0];
            this.skinName = PerFormanceSecondLayerSkin;
             switch (data) {
                case GAME_ID.NIUNIU: { this._title.source = "niuniu_text_png"}; break;
                case GAME_ID.GAME_ID_TWOMAN_QZNN: { this._title.source = "niuniu2_text_png"}; break;
                case GAME_ID.ZJH: { this._title.source = "pingshanzhang_text_png" }; break;
                case GAME_ID.GAME_ID_GDMJ_FK: { this._title.source = "majiang_text_png" }; break;
                case GAME_ID.DDZ: { this._title.source = "doudizhu_text_png" }; break;
            }
        }

        protected childrenCreated(): void {
            super.childrenCreated();
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
        }
    }
    class PreforManceSeconditem extends eui.ItemRenderer {
        private _scoreLb1: eui.Label;
        private _scoreLb2: eui.Label;
        private _scoreLb3: eui.Label;
        private _scoreLb4: eui.Label;
        private _scoreLb5: eui.Label;
        private _scoreLb6: eui.Label;
        private _scoreLb7: eui.Label;
        private _scoreLb8: eui.Label;
        private _labels: eui.Label[];
        private _timeLb: eui.Label;
        private _bg: eui.Image;
        public constructor() {
            super();
            this.skinName = PerformanceSencondlistItemSkin;
            // console.log("PreforManceSeconditem:constructor");
        }
        protected childrenCreated(): void {
            super.createChildren();
            this._scoreLb1.textColor = 0xff0000;
            this._labels = [this._scoreLb1, this._scoreLb2, this._scoreLb3, this._scoreLb4, this._scoreLb5, this._scoreLb6, this._scoreLb7, this._scoreLb8,];
            // console.log("PreforManceSeconditem:childrenCreated");

        }
        protected dataChanged(): void {
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
             this._timeLb.text = new Date(this.data.time*1000).Format("MM-dd   hh:mm:ss");
            // this._btnReplay.visible = this.data[9] === GAME_TYPE.GD_MAJIANG || this.data[9] === GAME_TYPE.TDH_MAJIANG  || this.data[9] === GAME_TYPE.HZB;
        }
    }
}
