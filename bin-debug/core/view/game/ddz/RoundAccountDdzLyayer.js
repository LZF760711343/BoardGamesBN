var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DDZ;
(function (DDZ) {
    var RoundAccountDdzLyayer = (function (_super) {
        __extends(RoundAccountDdzLyayer, _super);
        function RoundAccountDdzLyayer(data) {
            var _this = _super.call(this) || this;
            _this.skinName = RoundAccountDzdLayerSkin;
            _this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchGoBtn, _this);
            _this._rateLb.text = "x" + data;
            return _this;
        }
        RoundAccountDdzLyayer.prototype.onTouchGoBtn = function () {
            this.close();
            egret.Event.dispatchEvent(this, Layers.Event.CLOSE);
        };
        RoundAccountDdzLyayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        RoundAccountDdzLyayer.prototype.setDatas = function (overDatas, gameDatas) {
            var datas = [];
            var length = overDatas.gameResultList.length;
            var sIndes = 0;
            for (var i = 0; i < length; i++) {
                var data = datas[i] = {};
                var result = overDatas.gameResultList[i];
                var id = result.playerId;
                var playerInfo = gameDatas.playerDatas[i];
                if (id == gameDatas.myPlyerId) {
                    sIndes = i;
                    if (result.balance > 0) {
                        this._title.source = "win_icon1_png";
                    }
                    else if (result.balance < 0) {
                        this._title.source = "lost_topicon_png";
                    }
                    else {
                        this._title.source = "pj_toptext_png";
                    }
                }
                if (id == gameDatas.landlordId) {
                    datas[i].img = "touxian3_icon_png";
                }
                else {
                    datas[i].img = " ";
                }
                datas[i].name = result.nickName;
                datas[i].fenshu = result.balance + "";
                egret.log("result.nickName", result.nickName);
            }
            if ((overDatas.gameResultList[0].chunTianMode = overDatas.gameResultList[1].chunTianMode = overDatas.gameResultList[2].chunTianMode) == 0) {
                this._chuntianLb.text = 0 + "";
            }
            else {
                this._chuntianLb.text = 1 + "";
            }
            this._difenLb.text = overDatas.gameResultList[0].difen + "";
            this._group.itemRenderer = AccountItemDDZ;
            this._group.dataProvider = new eui.ArrayCollection(datas);
        };
        return RoundAccountDdzLyayer;
    }(Layers.RoundAccountLayerBase));
    DDZ.RoundAccountDdzLyayer = RoundAccountDdzLyayer;
    __reflect(RoundAccountDdzLyayer.prototype, "DDZ.RoundAccountDdzLyayer");
    var AccountItemDDZ = (function (_super) {
        __extends(AccountItemDDZ, _super);
        function AccountItemDDZ() {
            return _super.call(this) || this;
            // this.skinName = RoundAccountddzItem;
        }
        AccountItemDDZ.prototype.dataChanged = function () {
            var data = this.data;
            this._headImg.source = data.img + "";
            this._name.text = data.name;
            this._fenshu.text = data.fenshu;
        };
        return AccountItemDDZ;
    }(eui.ItemRenderer));
    __reflect(AccountItemDDZ.prototype, "AccountItemDDZ");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=RoundAccountDdzLyayer.js.map