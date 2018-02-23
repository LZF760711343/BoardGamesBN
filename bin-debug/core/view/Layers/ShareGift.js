var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layers;
(function (Layers) {
    var ShareGift = (function (_super) {
        __extends(ShareGift, _super);
        function ShareGift() {
            var _this = _super.call(this, ["yaoqiu_png", "guang_area_png", "jb_icon3_png", "kuangbg_area_png"]) || this;
            _this.skinName = ShareGiftSkin;
            return _this;
        }
        ShareGift.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._yaoqing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.YaoQing, this);
            this.initHeard();
            this.updataList([]);
        };
        ShareGift.prototype.updataList = function (PlatList) {
            var ArreyList = [];
            this.data = PlatList;
            for (var i = 0; i < 30; i++) {
                if (this.data.length) {
                    if (i < this.data.length) {
                        if (this.data[i].headImages) {
                            ArreyList.push({ headImages: this.data[i].headImages, playerId: this.data[i].playerId, getJiangliType: this.data[i].getJiangliType });
                        }
                        else {
                            ArreyList.push({ headImages: DEFAULT_HEAD_IMG, playerId: this.data[i].playerId, getJiangliType: this.data[i].getJiangliType });
                        }
                    }
                    else {
                        ArreyList.push({ headImages: "", playerId: 0, getJiangliType: 0 });
                    }
                }
                else {
                    ArreyList.push({ headImages: "", playerId: 0, getJiangliType: 0 });
                }
            }
            this.myCollection.replaceAll(ArreyList);
        };
        ShareGift.prototype.initHeard = function () {
            net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_FENXIANG_LIBAO_LIST).send();
            this.myCollection = this._shraeHeard.dataProvider;
            this._shraeHeard.itemRenderer = ShareHeardItem;
        };
        ShareGift.prototype.updataPlayList = function (msg) {
            egret.log("this.data" + msg.datas.tuiguangyuanList.length);
            this.updataList(msg.datas.tuiguangyuanList);
            // this.myCollection.replaceAll(msg.datas.tuiguangyuanList);
            for (var i = 0; i < msg.datas.tuiguangyuanList.length; i++) {
                egret.log(Base64.encode(msg.datas.tuiguangyuanList[i].nickName));
            }
        };
        /**
         * 邀请
         */
        ShareGift.prototype.YaoQing = function () {
            Global.initSharing({
                type: 'txt',
                title: Global.gameName,
                description: "好友在线约局，手机实施对战，最经典的玩法，最真实的对碰~尽在HZ棋牌！",
                url: Config.URLS.shareUrl,
                scene: 0
            }, false, null, egret.Capabilities.runtimeType === egret.RuntimeType.WEB);
        };
        return ShareGift;
    }(Layers.BaseLayer));
    Layers.ShareGift = ShareGift;
    __reflect(ShareGift.prototype, "Layers.ShareGift");
})(Layers || (Layers = {}));
var ShareHeardItem = (function (_super) {
    __extends(ShareHeardItem, _super);
    function ShareHeardItem() {
        return _super.call(this) || this;
    }
    ShareHeardItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._heardBox.mask = this._roundMask;
        this._clickMinute.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickMinute, this);
    };
    ShareHeardItem.prototype.ClickMinute = function () {
        if (this._heardBox.source) {
            this._moneyBlock.visible = true;
            net.SendMsg.create({
                playerId: this.data.playerId
            }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ONE_FENXIANG_LIBAO).send();
        }
        else {
        }
    };
    ShareHeardItem.prototype.dataChanged = function () {
        // egret.log("this._heardBox.source" + this._heardBox.source);
        switch (this.data.getJiangliType) {
            case -1:
                this._isDraw.text = "未玩";
                break;
            case 0:
                this._isDraw.text = "可领取";
                break;
            case 1:
                this._isDraw.text = "已领取";
                break;
        }
        if (this._heardBox.source) {
            this._moneyBlock.visible = true;
        }
        else {
            this._moneyBlock.visible = false;
        }
    };
    return ShareHeardItem;
}(eui.ItemRenderer));
__reflect(ShareHeardItem.prototype, "ShareHeardItem");
//# sourceMappingURL=ShareGift.js.map