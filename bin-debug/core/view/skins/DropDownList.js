var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI;
(function (UI) {
    var DropDwonList = (function (_super) {
        __extends(DropDwonList, _super);
        function DropDwonList() {
            var _this = _super.call(this) || this;
            //列表是否展开了
            _this.isShow = false;
            return _this;
        }
        DropDwonList.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self._list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectIndex, this);
            self.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutSide, this);
            self.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.roomSelectIdex();
        };
        DropDwonList.prototype.init = function (valGame_ID, gameid) {
            // if (valGame_ID == GAME_ID.QZNN) {
            // var myCollection: eui.ArrayCollection = new eui.ArrayCollection(GameLangs.DropGameList[valGame_ID]);
            var myCollection = new eui.ArrayCollection(Config.DropGameList[valGame_ID]);
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
            var dataGroup = this._list;
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRenderer = DropDownClass;
        };
        DropDwonList.prototype.onTouchEnd = function (event) {
            if (!this._group.contains(event.target) && !this.isShow && event.target !== this._groupbtn && event.target !== this._btn1) {
                this.dispatchEventWith("EnterRoom", false, this._list.selectedIndex);
            }
        };
        DropDwonList.prototype.roomSelectIdex = function () {
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
        };
        DropDwonList.prototype.onTouchBegin = function (event) {
            _super.prototype.onTouchBegin.call(this, event);
            if (event.target === this._groupbtn || event.target === this._btn1) {
                this.changeListType();
                return;
            }
            if (!this._group.contains(event.target)) {
                if (this.isShow) {
                    this.changeListType();
                }
                else {
                    this._allGroup.scaleX = this._allGroup.scaleY = 0.9;
                }
            }
        };
        DropDwonList.prototype.onTouchOutSide = function () {
            this._allGroup.scaleX = this._allGroup.scaleY = 1;
        };
        DropDwonList.prototype.buttonReleased = function () {
            _super.prototype.buttonReleased.call(this);
            this.onTouchOutSide();
        };
        DropDwonList.prototype.changeListType = function () {
            if (this.isShow) {
                this._group.visible = false;
                this.isShow = false;
            }
            else {
                this._group.visible = true;
                this.isShow = true;
            }
        };
        DropDwonList.prototype.selectIndex = function (event) {
            if (this.isShow) {
                this._group.visible = false;
                this.isShow = false;
                if (this._list.selectedIndex == 0) {
                    this._label1.text = "初级场";
                }
                else if (this._list.selectedIndex == 1) {
                    this._label1.text = "中级场";
                }
                else {
                    this._label1.text = "高级场";
                }
            }
        };
        return DropDwonList;
    }(UI.CommonBtn));
    UI.DropDwonList = DropDwonList;
    __reflect(DropDwonList.prototype, "UI.DropDwonList");
})(UI || (UI = {}));
var DropDownClass = (function (_super) {
    __extends(DropDownClass, _super);
    function DropDownClass() {
        return _super.call(this) || this;
        //this.skinName = DorpDownLabel;
    }
    DropDownClass.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    DropDownClass.prototype.dataChanged = function () {
        if (this.itemIndex == 0) {
            this._str.text = "初级场-" + this.data + "入场";
        }
        else if (this.itemIndex == 1) {
            this._str.text = "中级场-" + Math.floor(this.data / 10000) + GameLangs.wan + "入场";
        }
        else {
            this._str.text = "高级场-" + Math.floor(this.data / 10000) + GameLangs.wan + "入场";
        }
    };
    return DropDownClass;
}(eui.ItemRenderer));
__reflect(DropDownClass.prototype, "DropDownClass");
//# sourceMappingURL=DropDownList.js.map