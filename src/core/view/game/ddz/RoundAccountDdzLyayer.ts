namespace DDZ {
    interface ItemData {
        name?: string;
        img?: string;
        fenshu?: string;
    }

    export class RoundAccountDdzLyayer extends Layers.RoundAccountLayerBase {

        // private _title: eui.Image;
        private _group: eui.DataGroup;
        // private btn_left: UI.CommonBtn;
        private _difenLb: eui.Label;//底分
        private _zhadanLb: eui.Label;//炸弹  
        private _chuntianLb: eui.Label;//春天
        private _rateLb: eui.Label;//倍率
        private _zdImg: eui.Image;
        private _ctImg: eui.Image;


        public constructor(data:number) {
            super();
            this.skinName = RoundAccountDzdLayerSkin;
            this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGoBtn, this);
            this._rateLb.text="x"+data;
        }

        private onTouchGoBtn() {
            this.close();
            egret.Event.dispatchEvent(this, Layers.Event.CLOSE);
        }

        protected childrenCreated(): void {
            super.childrenCreated();

        }

        public setDatas(overDatas: model.DDZGameOverInfo, gameDatas: GameDatas) {

            let datas: ItemData[] = [];
            let length = overDatas.gameResultList.length;
            let sIndes = 0;

            for (let i = 0; i < length; i++) {
                let data: ItemData = datas[i] = {};
                let result = overDatas.gameResultList[i];
                let id = result.playerId;
                let playerInfo = gameDatas.playerDatas[i];
                	if (id == gameDatas.myPlyerId) {
					sIndes = i;
					if (result.balance > 0) {//赢了
						this._title.source = "win_icon1_png";
					} else if (result.balance < 0) {
						this._title.source = "lost_topicon_png";
					} else {
						this._title.source = "pj_toptext_png";
					}
				}

                if (id == gameDatas.landlordId) {
                    datas[i].img = "touxian3_icon_png";
                } else {
                    datas[i].img = " ";
                }
                datas[i].name = result.nickName;
                datas[i].fenshu = result.balance + "";
                egret.log("result.nickName", result.nickName);
            }
            if((overDatas.gameResultList[0].chunTianMode=overDatas.gameResultList[1].chunTianMode=overDatas.gameResultList[2].chunTianMode)==0){
                this._chuntianLb.text=0+"";
            }else{
                this._chuntianLb.text=1+"";
            }
            this._difenLb.text=overDatas.gameResultList[0].difen+"";
            this._group.itemRenderer = AccountItemDDZ;
            this._group.dataProvider = new eui.ArrayCollection(datas);
        }

    }

    class AccountItemDDZ extends eui.ItemRenderer {
        private _headImg: eui.Image;
        private _name: eui.Label;
        private _fenshu: eui.Label;


        public constructor() {
            super();
            // this.skinName = RoundAccountddzItem;
        }

        public dataChanged(): void {
            let data: ItemData = this.data;
            this._headImg.source = data.img + "";
            this._name.text = data.name;
            this._fenshu.text = data.fenshu;

        }


    }
}