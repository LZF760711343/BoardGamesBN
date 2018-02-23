var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HunderNNSelectRoomItem = (function (_super) {
    __extends(HunderNNSelectRoomItem, _super);
    function HunderNNSelectRoomItem() {
        var _this = _super.call(this) || this;
        _this.skinName = hunderNNSelectRoomBtnSkin;
        return _this;
    }
    HunderNNSelectRoomItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    HunderNNSelectRoomItem.prototype.dataChanged = function () {
        var data = this.data;
        this._peopleNum.text = data.nowRoomPlayer + "/" + data.maxRoomPlayer;
        // this._peopleNum.text = data.roomId + "/" + data.maxRoomPlayer;
        if (data.maxWangCount == 1) {
            this._tablewang.text = "单王场";
        }
        else if (data.maxWangCount == 2) {
            this._tablewang.text = "双王场";
        }
        else if (data.maxWangCount == 4) {
            this._tablewang.text = "四王场";
        }
        this._tablenum.text = this.itemIndex + 1 + "号桌";
        var len = data.wangNameList.length;
        if (len == 0) {
            this._wangNameLabel.text = "王:";
        }
        else {
            for (var i = 0; i < len; i++) {
                this._wangNameLabel.text = "王:" + data.wangNameList[i].nickName;
            }
        }
    };
    return HunderNNSelectRoomItem;
}(eui.ItemRenderer));
__reflect(HunderNNSelectRoomItem.prototype, "HunderNNSelectRoomItem");
//# sourceMappingURL=HunderNNSelectRoomItem.js.map