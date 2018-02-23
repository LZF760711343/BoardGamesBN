class HunderNNSelectRoomItem extends eui.ItemRenderer {

    private _wangNameLabel: eui.Label;
    private _peopleNum: eui.Label;
    private _tablenum: eui.BitmapLabel;
    private _tablewang: eui.BitmapLabel;


    public constructor() {
        super();
        this.skinName = hunderNNSelectRoomBtnSkin;
    }
    public childrenCreated(): void {
        super.childrenCreated();
        
    }
    public dataChanged(): void {
        var data: model.BrannRoomInfo = this.data;
        this._peopleNum.text = data.nowRoomPlayer + "/" + data.maxRoomPlayer;
        // this._peopleNum.text = data.roomId + "/" + data.maxRoomPlayer;

        if (data.maxWangCount == 1) {
            this._tablewang.text = "单王场"
        } else if (data.maxWangCount == 2) {
            this._tablewang.text = "双王场"
        } else if (data.maxWangCount == 4) {
            this._tablewang.text = "四王场"
        }

        this._tablenum.text = this.itemIndex + 1 + "号桌";

        let len = data.wangNameList.length;
        if (len == 0) {
            this._wangNameLabel.text = "王:"
        }
        else {
            for (let i = 0; i < len; i++) {
                this._wangNameLabel.text = "王:" + data.wangNameList[i].nickName;
            }
        }
    }
}