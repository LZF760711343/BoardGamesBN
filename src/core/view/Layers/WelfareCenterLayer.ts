namespace Layers {
    export class WelfareCenterLayer extends BaseLayer {
        private _bingPhone: UI.CommonBtn;
        private _allowance: UI.CommonBtn;
        private _share: UI.CommonBtn;
        private _draw: UI.CommonBtn;
        // private roomid :String="draw";
        private _daySign: eui.Label;

        private QiandaoData: model.QiandaoInfo;
        private qiandaoConst = ["3000", "4000", "5000", "6000", "7000", "8000", "9000", "3000"];


        public constructor() {
            super([ResManager.GROUP_NAME.WELFARE_CENTER]);
            this.skinName = WelfareCenterSkin;
            if (Global.playerDto.mobile) {
                this._bingPhone.visible = false;
                // this._bingPhone.bgStr = "btn_bg_gray_png";
            }
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this._bingPhone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openbingDingPhone, this);
            this._allowance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openallowance, this);
            this._share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openshare, this);
            this._draw.addEventListener(egret.TouchEvent.TOUCH_TAP, this.opendraw, this);
            this.inittime();
        }
        private inittime() {
            this._allowance.label = "(" + Global.getPoChanNumber + "/2)";
            // this.surplusesnum = data.todayAskPochan;
            if (Global.getPoChanNumber == 0) {
                this._allowance.bgStr = "btn_bg_gray_png";
                this._allowance.touchEnabled = false;
            }
        }
        private openbingDingPhone() {
            new Layers.BindingPhoneLayer().open();
        }
        private openallowance() {
            if (Global.welfareLevel(Global.playerDto.gold) == true) {
                net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ASK_POCHAN).send();
            }


        }
        public initsubsidies(data: model.BrokeMoney) {
            this._allowance.label = "(" + data.todayAskPochan + "/2)";
            // this.surplusesnum = data.todayAskPochan;
            if (data.todayAskPochan == 0) {
                this._allowance.bgStr = "btn_bg_gray_png";
                this._allowance.touchEnabled = false;
            }
            // egret.log("initsubsidies。。。。this.surplusesnum" + this.surplusesnum);
        }
        private shareCb(data: any) {
            if (data.code == 0) {
                if (data.type === nest.SHARE_TYPE.TIMELINE && net.getServerType() === net.SERVER_TYPE.GAME) {
                    net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_GET_FENXIANG).send();
                }
            }
        }
        private openshare() {
            Global.initSharing({
                type: 'txt',
                title: Global.gameName,
                description: "好友在线约局，手机实施对战，最经典的玩法，最真实的对碰~尽在HZ棋牌！",
                url: Config.URLS.shareUrl
            }, true, this.shareCb);
        }


        private opendraw() {
            let layers = new Layers.DrawLayer(this.QiandaoData).open();

            layers.init(this.QiandaoData);
        }

        public init(data: model.QiandaoInfo) {
            this.QiandaoData = data;

            // let layer: Layers.DrawLayer = Layers.getLayer(Layers.DrawLayer);
            // if (layer) {
            //     layer.init(data);
            // }
            if (data.canQd == 0) {
                this._daySign.text = `您已经连续签到${data.qiandaoCount}天，明日签到可获得${this.qiandaoConst[data.qiandaoCount]}金币`;
                this._draw.label = "已签到";
                this._draw.bgStr = "bigH_icon_png";
                this._draw.touchEnabled = false;
            } else {
                this._daySign.text = `您已经连续签到${data.qiandaoCount}天，今天签到可获得${this.qiandaoConst[data.qiandaoCount]}金币`;
            }
        }
    }
}