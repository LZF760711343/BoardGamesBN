namespace Layers {
    interface UserInfo {
        headImages: string;
        playerId: number;
        getJiangliType: number
    }
    export class ShareGift extends BaseLayer {
        private _yaoqing: UI.CommonBtn;
        private _shraeHeard: eui.List;
        public data: UserInfo[];
        private myCollection: eui.ArrayCollection;
        public constructor() {
            super(["yaoqiu_png","guang_area_png","jb_icon3_png","kuangbg_area_png"]);
            this.skinName = ShareGiftSkin;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this._yaoqing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.YaoQing, this);
            this.initHeard();
            this.updataList([]);
        }
        public updataList(PlatList) {
            let ArreyList = [];
            this.data = PlatList;
            for (let i = 0; i < 30; i++) {
                if (this.data.length) {
                    if (i < this.data.length) {
                        
                        if (this.data[i].headImages) {
                            ArreyList.push({ headImages: this.data[i].headImages, playerId: this.data[i].playerId, getJiangliType: this.data[i].getJiangliType });
                        } else {
                            ArreyList.push({ headImages: DEFAULT_HEAD_IMG, playerId: this.data[i].playerId, getJiangliType: this.data[i].getJiangliType });
                        }

                    } else {
                        ArreyList.push({ headImages: "", playerId: 0, getJiangliType: 0 });
                    }

                } else {
                    ArreyList.push({ headImages: "", playerId: 0, getJiangliType: 0 });
                }

            }
            this.myCollection.replaceAll(ArreyList);
        }
        public initHeard() {
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_FENXIANG_LIBAO_LIST).send();
            this.myCollection = <eui.ArrayCollection>this._shraeHeard.dataProvider;
            this._shraeHeard.itemRenderer = ShareHeardItem;
        }
        public updataPlayList(msg: net.ReceiveMsg<model.GamePlayList>) {
            egret.log("this.data" + msg.datas.tuiguangyuanList.length)
            this.updataList(msg.datas.tuiguangyuanList);
            // this.myCollection.replaceAll(msg.datas.tuiguangyuanList);
            for(let i=0;i<msg.datas.tuiguangyuanList.length;i++){
                egret.log(Base64.encode(msg.datas.tuiguangyuanList[i].nickName))
            }
        }
        /**
         * 邀请
         */
        public YaoQing() {
            Global.initSharing({
                type: 'txt',
                title: Global.gameName,
                description: "好友在线约局，手机实施对战，最经典的玩法，最真实的对碰~尽在HZ棋牌！",
                url: Config.URLS.shareUrl,
                scene: 0
            }, false, null, egret.Capabilities.runtimeType === egret.RuntimeType.WEB);
        }
    }
}
class ShareHeardItem extends eui.ItemRenderer {
    public _clickMinute: eui.Group;
    public _roundMask: eui.Rect;
    public _heardBox: eui.Image;
    public _moneyBlock: eui.Group;
    public _isDraw: eui.Label;
    public constructor() {
        super();
    }
    public childrenCreated(): void {
        super.childrenCreated();
        this._heardBox.mask = this._roundMask;
        this._clickMinute.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ClickMinute, this);
    }
    public ClickMinute() {
        if (this._heardBox.source) {
            this._moneyBlock.visible = true;
            net.SendMsg.create(
                {
                    playerId: this.data.playerId
                },
                ModuleInfo.PLAY_GAME,
                PlayGameOrder.C2G_ONE_FENXIANG_LIBAO
            ).send();
            // egret.log("显示详细数据" + this.itemIndex, this._heardBox.source);
        } else {
            // egret.log("点击没反应");
        }

    }
    public dataChanged(): void {
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
        } else {
            this._moneyBlock.visible = false;
        }

    }
}

