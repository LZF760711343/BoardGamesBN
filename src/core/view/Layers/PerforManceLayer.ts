namespace Layers {
    export class PerforManceLayer extends BaseLayer {
        private _listItem: eui.List;
        public _listItemData: eui.ArrayCollection;
        // private _layerBgImg: UI.LayerBgImg;
        private noneTips: eui.Group;
        public constructor() {
            super([ResManager.GROUP_NAME.PERFORMANCE]);
            this.skinName = performanceLayerSkin;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.percentWidth = this.percentHeight = 100;
            this._listItem.dataProvider = this._listItemData;
            this._listItem.itemRenderer = PreforManceitem;
            console.log("long:", this._listItemData.length);
            if (!this._listItemData.length)
                this.noneTips.visible = true;
            else
                this.noneTips.visible = false;
        }

    }
    export class PreforManceitem extends eui.ItemRenderer {
        private _gameName:eui.Label;
        private _gameHead: eui.Image;
        private _roomNumber: eui.Label;
        private _gameTime: eui.Label;
        public _listUserinfo: eui.List;
        private playNameArray: { id?: string, name?: string }[] = [];
        private isSetDataProvider: boolean;
        public constructor() {
            super();
            this.isSetDataProvider = false;
            // console.log("可以进入");
        }
        protected childrenCreated(): void {
            super.createChildren();
            this._listUserinfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listItem, this);

            // this._listUserinfo.dataProvider = new eui.ArrayCollection(this.data.playerName);
            this._listUserinfo.itemRenderer = PerformanceListItem;
            // var list = [
            //     {
            //         username: "我是帅哥:",
            //         userscore: "20"
            //     },
            // ];
            // (<eui.ArrayCollection>this._listUserinfo.dataProvider).replaceAll(list);
        }
        protected dataChanged(): void {
            this._roomNumber.text = "房间号:" + this.data.roomID;
            this._gameTime.text = "时间:" + new Date(this.data.createTime).Format("yy-MM-dd  hh:mm:ss");
            if (!this.isSetDataProvider) {
                this._listUserinfo.dataProvider = new eui.ArrayCollection(this.data.playerName);
                this.isSetDataProvider = true;
            }
            switch (this.data.gameID) {
                case GAME_ID.NIUNIU:{ this._gameName.text = "牛牛"; this._gameHead.source = "nn_Area_png" }; break;
                case GAME_ID.GAME_ID_TWOMAN_QZNN:{ this._gameName.text = "二人牛牛"; this._gameHead.source = "nn_Area_png" }; break;
                case GAME_ID.ZJH: { this._gameName.text = "拼三张"; this._gameHead.source = "psz_area_png" }; break;
                case GAME_ID.GAME_ID_GDMJ_FK: { this._gameName.text = "广东麻将"; this._gameHead.source = "gdmj_area_png" }; break;
                case GAME_ID.DDZ: { this._gameName.text = "斗地主"; this._gameHead.source = "ddz_area_png" }; break;
            }
            // console.log("oo=", this.data.playerName);
        }
        private listItem() {
 
            var secondLayer = new Layers.PreforManceSecondLayer(this.data.gameID);
            secondLayer.itemData = new eui.ArrayCollection(this.data.zhanji);

            var nameListTemp: string[] = [];
            let i = 0;
            for (var k in this.data.playerName) {
                if (this.data.playerName.hasOwnProperty(k)) {
                    nameListTemp[i] = this.data.playerName[k].name;
                }
                i++;
            }

            secondLayer.itemNameData = new eui.ArrayCollection(nameListTemp);
            secondLayer.open();
        }
    }
    class PerformanceListItem extends eui.ItemRenderer {
        private _userName: eui.Label;
        private _score: eui.Label;
        private bg:eui.Image;
        public constructor() {
            super();
            this.skinName = PerformancelistItemSkin;
        }
        protected childrenCreated(): void {
            super.createChildren();

        }

        protected dataChanged(): void {
            this._userName.text = this.data.name;
            if (this.itemIndex == 0){
                this._score.textColor = 0xff0000;
            }
            this._score.text = this.data.score;
        }
    }
}
