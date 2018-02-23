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
    var SafeBoxLayer = (function (_super) {
        __extends(SafeBoxLayer, _super);
        function SafeBoxLayer() {
            var _this = _super.call(this, [ResManager.GROUP_NAME.SAFE_BOX]) || this;
            _this.skinName = SafeBoxSkin;
            return _this;
        }
        SafeBoxLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            this.initdata();
            self._add.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchBtnAdd, self);
            self._reduce.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchBtnRed, self);
            self._res.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchBtnRes, self);
            self._hslider.addEventListener(egret.Event.CHANGE, self.changeHsLIDER, self);
            self._sub.addEventListener(egret.TouchEvent.TOUCH_TAP, self.subBtn, self);
            self._money.addEventListener(egret.Event.CHANGE, self.SaveMoney, self);
            self._Baoxianxiang.addEventListener(egret.Event.CHANGE, self.DownMoney, self);
        };
        SafeBoxLayer.prototype.SaveMoney = function () {
            if (this._money.text == "") {
                this._Baoxianxiang.text = this._hslider.maximum + "";
                this._hslider.value = this._hslider.maximum;
            }
            else {
                if (/^[0-9]*$/.test(this._money.text) && this._hslider.maximum > parseInt(this._money.text)) {
                    this._Baoxianxiang.text = this._hslider.maximum - parseInt(this._money.text) + "";
                    this._hslider.value = parseInt(this._Baoxianxiang.text);
                }
                else {
                    // this._money.text=this._money.text.substring(0,this._money.text.length-1);
                    this._money.text = "";
                    Toast.launch("输入有误，请重填");
                }
            }
        };
        SafeBoxLayer.prototype.DownMoney = function () {
            if (this._Baoxianxiang.text == "") {
                this._money.text = this._hslider.maximum + "";
                this._hslider.value = 0;
            }
            else {
                if (/^[0-9]*$/.test(this._Baoxianxiang.text) && this._hslider.maximum > parseInt(this._Baoxianxiang.text)) {
                    this._money.text = this._hslider.maximum - parseInt(this._Baoxianxiang.text) + "";
                    this._hslider.value = parseInt(this._money.text);
                }
                else {
                    // this._Baoxianxiang.text=this._money.text.substring(0,this._Baoxianxiang.text.length-1);
                    this._Baoxianxiang.text = "";
                    Toast.launch("输入有误，请重填");
                }
            }
        };
        // 数据初始值
        SafeBoxLayer.prototype.initdata = function () {
            this._money.text = Global.playerDto.gold + "";
            if (Global.playerDto.baoxianxiang == undefined) {
                this._Baoxianxiang.text = 0 + "";
            }
            else {
                this._Baoxianxiang.text = Global.playerDto.baoxianxiang + "";
            }
            this._hslider.maximum = parseInt(this._money.text) + parseInt(this._Baoxianxiang.text);
            this._hslider.value = parseInt(this._Baoxianxiang.text);
            this.money = this._money.text;
            this.cun = this._Baoxianxiang.text;
            this.hsliderMax = this._hslider.maximum;
            this.hsliderVal = this._hslider.value;
        };
        // 监听滚动事件
        SafeBoxLayer.prototype.changeHsLIDER = function (event) {
            this._Baoxianxiang.text = this._hslider.value + "";
            this._money.text = this._hslider.maximum - parseInt(this._Baoxianxiang.text) + "";
        };
        // 存入金额
        SafeBoxLayer.prototype.touchBtnAdd = function () {
            if (this._hslider.pendingValue < this._hslider.maximum) {
                if (parseInt(this._money.text) >= 10000) {
                    this._hslider.pendingValue += 10000;
                    this._Baoxianxiang.text = parseInt(this._Baoxianxiang.text) + 10000 + "";
                    this._money.text = parseInt(this._money.text) - 10000 + "";
                }
            }
        };
        ;
        // 取出金额
        SafeBoxLayer.prototype.touchBtnRed = function () {
            if (this._hslider.pendingValue >= 0) {
                if (parseInt(this._Baoxianxiang.text) >= 10000) {
                    this._hslider.pendingValue -= 10000;
                    this._Baoxianxiang.text = parseInt(this._Baoxianxiang.text) - 10000 + "";
                    this._money.text = parseInt(this._money.text) + 10000 + "";
                }
            }
        };
        // 重置按钮
        SafeBoxLayer.prototype.touchBtnRes = function () {
            this._money.text = this.money;
            this._Baoxianxiang.text = Global.playerDto.baoxianxiang + "";
            this._hslider.maximum = this.hsliderMax;
            this._hslider.value = this.hsliderVal;
        };
        //   确定按钮
        SafeBoxLayer.prototype.subBtn = function () {
            if (this._money.text == "" || this._Baoxianxiang.text == "") {
                Toast.launch("请输入金额！");
            }
            else {
                //  保存金币
                Global.playerDto.gold = parseInt(this._money.text);
                //  保存存款
                Global.playerDto.baoxianxiang = parseInt(this._Baoxianxiang.text);
                var ChangeMoney = parseInt(this.money) - Global.playerDto.gold + "";
                net.SendMsg.create({ gold: ChangeMoney }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ADD_BAOXIANXIANG).send();
                Layers.closeLayer(this);
            }
        };
        return SafeBoxLayer;
    }(Layers.BaseLayer));
    Layers.SafeBoxLayer = SafeBoxLayer;
    __reflect(SafeBoxLayer.prototype, "Layers.SafeBoxLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=SafeBoxLayer.js.map