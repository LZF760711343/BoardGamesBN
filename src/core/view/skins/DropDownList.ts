module UI {
    export class DropDwonList extends UI.CommonBtn {

        //列表是否展开了
        private isShow: boolean = false;

        private _label1: eui.Label;

        private _list: eui.List;
        public _group: eui.Group;
        public _allGroup: eui.Group;

        private _groupbtn: eui.Group;


        private _btn1: UI.CommonBtn;


        constructor() {
            super();

        }
        protected childrenCreated() {
            super.childrenCreated();
            var self = this;

            self._list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectIndex, this);
            self.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutSide, this);
            self.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.roomSelectIdex();

        }

        private gameType;
        public init(valGame_ID: number, gameid: number) {
            // if (valGame_ID == GAME_ID.QZNN) {
                // var myCollection: eui.ArrayCollection = new eui.ArrayCollection(GameLangs.DropGameList[valGame_ID]);
                var myCollection: eui.ArrayCollection = new eui.ArrayCollection(Config.DropGameList[valGame_ID]);
                this.gameType = valGame_ID;
            // }
            // if (valGame_ID == GAME_ID.GOLD_ZJH) {
            //     var myCollection: eui.ArrayCollection = new eui.ArrayCollection(GameLangs.DropListSzp);
            //     this.gameType = valGame_ID;
            // }
            // if (valGame_ID == GAME_ID.GOLD_DDZ) {
            //     var myCollection: eui.ArrayCollection = new eui.ArrayCollection(GameLangs.DropListDDZ);
            //     this.gameType = valGame_ID;
            // }
            // if (valGame_ID == GAME_ID.GAME_ID_GDMJ_GOLD) {
            //     var myCollection: eui.ArrayCollection = new eui.ArrayCollection(GameLangs.DropListMj);
            //     this.gameType = valGame_ID;

            // }
            var dataGroup: eui.DataGroup = this._list;
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRenderer = DropDownClass;
        }

        private onTouchEnd(event: egret.TouchEvent) {
            if (!this._group.contains(event.target) && !this.isShow && event.target !== this._groupbtn && event.target !== this._btn1) {
                this.dispatchEventWith("EnterRoom", false, this._list.selectedIndex);
            }
        }

        private roomSelectIdex() {
            // if (this.gameType == GAME_ID.QZNN) {
            //     if (0 < Global.playerDto.gold && Global.playerDto.gold < GameLangs.DropListNN[1]) {
            //         this._list.selectedIndex = 0;

            //     } else if (GameLangs.DropListNN[1] <= Global.playerDto.gold && Global.playerDto.gold < GameLangs.DropListNN[2]) {
            //         this._list.selectedIndex = 1;
            //     } else {
            //         this._list.selectedIndex = 2;
            //     }

            // } else if (this.gameType == GAME_ID.GOLD_ZJH) {
            //     if (0 < Global.playerDto.gold && Global.playerDto.gold < GameLangs.DropListSzp[1]) {
            //         this._list.selectedIndex = 0;

            //     } else if (GameLangs.DropListSzp[1] <= Global.playerDto.gold && Global.playerDto.gold < GameLangs.DropListSzp[2]) {
            //         this._list.selectedIndex = 1;
            //     } else {
            //         this._list.selectedIndex = 2;
            //     }
            // } else {
            //     if (0 < Global.playerDto.gold && Global.playerDto.gold < GameLangs.DropListDDZ[1]) {
            //         this._list.selectedIndex = 0;

            //     } else if (GameLangs.DropListDDZ[1] <= Global.playerDto.gold && Global.playerDto.gold < GameLangs.DropListDDZ[2]) {
            //         this._list.selectedIndex = 1;
            //     } else {
            //         this._list.selectedIndex = 2;
            //     }
            // }

            // if (this._list.selectedIndex == 0) {
            //     this._label1.text = "初级场";
            // } else if (this._list.selectedIndex == 1) {
            //     this._label1.text = "中级场";
            // } else {
            //     this._label1.text = "高级场";
            // }
        }

        protected onTouchBegin(event: egret.TouchEvent): void {
            super.onTouchBegin(event);
            if (event.target === this._groupbtn || event.target === this._btn1) {
                this.changeListType();
                return;
            }
            if (!this._group.contains(event.target)) {
                if (this.isShow) {
                    this.changeListType();
                } else {
                    this._allGroup.scaleX = this._allGroup.scaleY = 0.9;
                }
            }

        }
        private onTouchOutSide() {
            this._allGroup.scaleX = this._allGroup.scaleY = 1;
        }
        protected buttonReleased(): void {
            super.buttonReleased();
            this.onTouchOutSide();
        }
        private changeListType(): void {
            if (this.isShow) {
                this._group.visible = false;
                this.isShow = false;

            } else {
                this._group.visible = true;
                this.isShow = true;
            }
        }

        private selectIndex(event: egret.TouchEvent): void {
            if (this.isShow) {
                this._group.visible = false;
                this.isShow = false;
                if (this._list.selectedIndex == 0) {
                    this._label1.text = "初级场";
                } else if (this._list.selectedIndex == 1) {
                    this._label1.text = "中级场";
                } else {
                    this._label1.text = "高级场";
                }

            }
        }
    }
}


class DropDownClass extends eui.ItemRenderer {

    private _str: eui.Label;

    public constructor() {
        super();
        //this.skinName = DorpDownLabel;
    }
    public childrenCreated(): void {
        super.childrenCreated();

    }
    public dataChanged(): void {
        if (this.itemIndex == 0) {
            this._str.text = "初级场-" + this.data + "入场";
        } else if (this.itemIndex == 1) {
            this._str.text = "中级场-" + Math.floor(this.data / 10000) + GameLangs.wan + "入场";
        } else {
            this._str.text = "高级场-" + Math.floor(this.data / 10000) + GameLangs.wan + "入场";
        }
    }
}