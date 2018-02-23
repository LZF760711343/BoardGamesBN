namespace Layers {
    export class GameAnnouncementLayer extends BaseLayer {
        private _notices: model.GameActConfTtem[];

        private _webSize: eui.Image;
        private _tabBar: eui.TabBar;
        private _webview: Utils.WebView;

        private _point: egret.Point;

        public constructor() {
            super(["paihang1_png", ResManager.GROUP_NAME.HALLSMALLSET]);
            this.skinName = GameAnnouncementSkin;


        }

        public initdatas(data: model.GameActConfTtem[]) {
            this._notices = [];
            let length = data.length;
            for (let i = 0; i < length; ++i) {//为防止内存泄露,将数组复制出来,用新数组作为tabbar的数据源
                this._notices.push({ title: data[i].title, url: data[i].url, type: data[i].type })
            }
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            if (Global.activity_conf.length!=0) {
                 if(!this._notices){
                    this.initdatas(Global.activity_conf);
                }
                this.once(eui.UIEvent.ENTER_FRAME, this.init, this);
                this._tabBar.dataProvider = new eui.ArrayCollection(this._notices);
                this._tabBar.addEventListener(egret.Event.CHANGE, this.chanTab, this);
            }

        }

        private chanTab(): void {
            this.showMsg(this._tabBar.selectedIndex);
        }

        private showMsg(index: number) {
            let url = this._notices[index].url;
            if (url.search(/(.jpg|.png)/) > -1) {
                this._webSize.source = url;
                this._webSize.visible = true;
                this._webview.hide();
            } else {
                this._webSize.visible = false;
                this._webview.show(url, this._point.x, this._point.y, this._webSize.width, this._webSize.height);
            }
        }

        private init() {
            this._point = this.localToGlobal(this._webSize.x, this._webSize.y, egret.Point.create(0, 0));
            this._webview = new Utils.WebView();
            this.showMsg(0);
        }

        public onExit() {
            if (this._point) {
                egret.Point.release(this._point);
                this._point = null;
            }
            if (this._webview) {
                this._webview.destroy();
                this._webview = null;
            }
        }
    }
}
