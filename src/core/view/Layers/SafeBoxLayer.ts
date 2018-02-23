namespace Layers {
    export class SafeBoxLayer extends BaseLayer {
        private _res: UI.CommonBtn;
        private _sub: UI.CommonBtn;
        private _Baoxianxiang: eui.EditableText;
        private _add: UI.CommonBtn;
        private _reduce: UI.CommonBtn;
        private _hslider: eui.HSlider;
        private _money: eui.EditableText;
        private money: string;
        private cun: string;
        private hsliderMax: number;
        private hsliderVal: number;
        public constructor() {
            super([ResManager.GROUP_NAME.SAFE_BOX]);
            this.skinName = SafeBoxSkin;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            var self = this;
            this.initdata();
            self._add.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchBtnAdd, self);
            self._reduce.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchBtnRed, self);
            self._res.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchBtnRes, self);
            self._hslider.addEventListener(egret.Event.CHANGE, self.changeHsLIDER, self);
            self._sub.addEventListener(egret.TouchEvent.TOUCH_TAP, self.subBtn, self);
            self._money.addEventListener(egret.Event.CHANGE, self.SaveMoney, self);
            self._Baoxianxiang.addEventListener(egret.Event.CHANGE, self.DownMoney, self);
        }
        private SaveMoney() {
            if (this._money.text == "") {
                this._Baoxianxiang.text = this._hslider.maximum + "";
                this._hslider.value = this._hslider.maximum;
            } else {
                if (/^[0-9]*$/.test(this._money.text) && this._hslider.maximum > parseInt(this._money.text)) {
                    this._Baoxianxiang.text = this._hslider.maximum - parseInt(this._money.text) + "";
                    this._hslider.value = parseInt(this._Baoxianxiang.text);
                }else{
                    // this._money.text=this._money.text.substring(0,this._money.text.length-1);
                    this._money.text="";
                    Toast.launch("输入有误，请重填");
                }
            }
        }
        private DownMoney() {
            if (this._Baoxianxiang.text == "") {
                this._money.text = this._hslider.maximum + "";
                this._hslider.value = 0;
            } else {
                if (/^[0-9]*$/.test(this._Baoxianxiang.text) && this._hslider.maximum > parseInt(this._Baoxianxiang.text)) {
                    this._money.text = this._hslider.maximum - parseInt(this._Baoxianxiang.text) + "";
                    this._hslider.value = parseInt(this._money.text);
                }else{
                    // this._Baoxianxiang.text=this._money.text.substring(0,this._Baoxianxiang.text.length-1);
                    this._Baoxianxiang.text="";
                    Toast.launch("输入有误，请重填");
                }
            }
        }
        // 数据初始值
        private initdata() {
            this._money.text = Global.playerDto.gold + "";
            if (Global.playerDto.baoxianxiang == undefined) {
                this._Baoxianxiang.text = 0 + "";
            } else {
                this._Baoxianxiang.text = Global.playerDto.baoxianxiang + "";
            }
            this._hslider.maximum = parseInt(this._money.text) + parseInt(this._Baoxianxiang.text);
            this._hslider.value = parseInt(this._Baoxianxiang.text);
            this.money = this._money.text;
            this.cun = this._Baoxianxiang.text;
            this.hsliderMax = this._hslider.maximum;
            this.hsliderVal = this._hslider.value;
        }
        // 监听滚动事件
        private changeHsLIDER(event: egret.TouchEvent) {
            this._Baoxianxiang.text = this._hslider.value + "";
            this._money.text = this._hslider.maximum - parseInt(this._Baoxianxiang.text) + "";
        }


        // 存入金额
        private touchBtnAdd() {
            if (this._hslider.pendingValue < this._hslider.maximum) {
                if (parseInt(this._money.text) >= 10000) {
                    this._hslider.pendingValue += 10000;
                    this._Baoxianxiang.text = parseInt(this._Baoxianxiang.text) + 10000 + "";
                    this._money.text = parseInt(this._money.text) - 10000 + "";
                }
            }
        };
        // 取出金额
        private touchBtnRed() {
            if (this._hslider.pendingValue >= 0) {
                if (parseInt(this._Baoxianxiang.text) >= 10000) {
                    this._hslider.pendingValue -= 10000;
                    this._Baoxianxiang.text = parseInt(this._Baoxianxiang.text) - 10000 + "";
                    this._money.text = parseInt(this._money.text) + 10000 + "";
                }

            }
        }
        // 重置按钮
        private touchBtnRes() {
            this._money.text = this.money;
            this._Baoxianxiang.text = Global.playerDto.baoxianxiang + "";
            this._hslider.maximum = this.hsliderMax;
            this._hslider.value = this.hsliderVal;
        }
        //   确定按钮
        private subBtn() {
            if(this._money.text==""||this._Baoxianxiang.text==""){
                Toast.launch("请输入金额！");
            }else{
                //  保存金币
            Global.playerDto.gold = parseInt(this._money.text);
            //  保存存款
            Global.playerDto.baoxianxiang = parseInt(this._Baoxianxiang.text);
            let ChangeMoney = parseInt(this.money) - Global.playerDto.gold + "";
            net.SendMsg.create({ gold: ChangeMoney }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ADD_BAOXIANXIANG).send();
            closeLayer(this);
            }
            
        }

    }


}