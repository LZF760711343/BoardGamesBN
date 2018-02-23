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
    var WelfareCenterLayer = (function (_super) {
        __extends(WelfareCenterLayer, _super);
        function WelfareCenterLayer() {
            var _this = _super.call(this, [ResManager.GROUP_NAME.WELFARE_CENTER]) || this;
            _this.qiandaoConst = ["3000", "4000", "5000", "6000", "7000", "8000", "9000", "3000"];
            _this.skinName = WelfareCenterSkin;
            if (Global.playerDto.mobile) {
                _this._bingPhone.visible = false;
            }
            return _this;
        }
        WelfareCenterLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._bingPhone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openbingDingPhone, this);
            this._allowance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openallowance, this);
            this._share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openshare, this);
            this._draw.addEventListener(egret.TouchEvent.TOUCH_TAP, this.opendraw, this);
            this.inittime();
        };
        WelfareCenterLayer.prototype.inittime = function () {
            this._allowance.label = "(" + Global.getPoChanNumber + "/2)";
            // this.surplusesnum = data.todayAskPochan;
            if (Global.getPoChanNumber == 0) {
                this._allowance.bgStr = "btn_bg_gray_png";
                this._allowance.touchEnabled = false;
            }
        };
        WelfareCenterLayer.prototype.openbingDingPhone = function () {
            new Layers.BindingPhoneLayer().open();
        };
        WelfareCenterLayer.prototype.openallowance = function () {
            if (Global.welfareLevel(Global.playerDto.gold) == true) {
                net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ASK_POCHAN).send();
            }
        };
        WelfareCenterLayer.prototype.initsubsidies = function (data) {
            this._allowance.label = "(" + data.todayAskPochan + "/2)";
            // this.surplusesnum = data.todayAskPochan;
            if (data.todayAskPochan == 0) {
                this._allowance.bgStr = "btn_bg_gray_png";
                this._allowance.touchEnabled = false;
            }
            // egret.log("initsubsidies。。。。this.surplusesnum" + this.surplusesnum);
        };
        WelfareCenterLayer.prototype.shareCb = function (data) {
            if (data.code == 0) {
                if (data.type === nest.SHARE_TYPE.TIMELINE && net.getServerType() === 3 /* GAME */) {
                    net.SendMsg.create({}, 3 /* PLAY_GAME */, PlayGameOrder.C2G_GET_FENXIANG).send();
                }
            }
        };
        WelfareCenterLayer.prototype.openshare = function () {
            Global.initSharing({
                type: 'txt',
                title: Global.gameName,
                description: "好友在线约局，手机实施对战，最经典的玩法，最真实的对碰~尽在HZ棋牌！",
                url: Config.URLS.shareUrl
            }, true, this.shareCb);
        };
        WelfareCenterLayer.prototype.opendraw = function () {
            var layers = new Layers.DrawLayer(this.QiandaoData).open();
            layers.init(this.QiandaoData);
        };
        WelfareCenterLayer.prototype.init = function (data) {
            this.QiandaoData = data;
            // let layer: Layers.DrawLayer = Layers.getLayer(Layers.DrawLayer);
            // if (layer) {
            //     layer.init(data);
            // }
            if (data.canQd == 0) {
                this._daySign.text = "\u60A8\u5DF2\u7ECF\u8FDE\u7EED\u7B7E\u5230" + data.qiandaoCount + "\u5929\uFF0C\u660E\u65E5\u7B7E\u5230\u53EF\u83B7\u5F97" + this.qiandaoConst[data.qiandaoCount] + "\u91D1\u5E01";
                this._draw.label = "已签到";
                this._draw.bgStr = "bigH_icon_png";
                this._draw.touchEnabled = false;
            }
            else {
                this._daySign.text = "\u60A8\u5DF2\u7ECF\u8FDE\u7EED\u7B7E\u5230" + data.qiandaoCount + "\u5929\uFF0C\u4ECA\u5929\u7B7E\u5230\u53EF\u83B7\u5F97" + this.qiandaoConst[data.qiandaoCount] + "\u91D1\u5E01";
            }
        };
        return WelfareCenterLayer;
    }(Layers.BaseLayer));
    Layers.WelfareCenterLayer = WelfareCenterLayer;
    __reflect(WelfareCenterLayer.prototype, "Layers.WelfareCenterLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=WelfareCenterLayer.js.map