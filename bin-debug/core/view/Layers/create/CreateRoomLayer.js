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
    var CreateRoomLayer = (function (_super) {
        __extends(CreateRoomLayer, _super);
        function CreateRoomLayer() {
            var _this = _super.call(this, [ResManager.GROUP_NAME.CREATEROOM]) || this;
            _this.num = 0;
            // this._gameTypeId = _gameTypeId;
            _this.skinName = Layers.CreateRoomLayerSkin;
            return _this;
        }
        CreateRoomLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            // self._gameConf = Config.gameConf;
            // if (Config.gameConf.cardRoom[this._gameTypeId]) {
            // 	self.init();
            // }
            for (var i = 1; i <= 5; i++) {
                switch (i) {
                    case 1:
                        this._gameTypeId = 1 /* NIUNIU */;
                        this._isInit = false;
                        this.init();
                        break;
                    case 2:
                        this._gameTypeId = 10 /* ZJH */;
                        this._isInit = false;
                        this.init();
                        break;
                    case 3:
                        this._gameTypeId = 3 /* DDZ */;
                        this._isInit = false;
                        this.init();
                        break;
                    case 4:
                        this._gameTypeId = 38 /* GAME_ID_TWOMAN_QZNN */;
                        this._isInit = false;
                        this.init();
                        break;
                    case 5:
                        this._gameTypeId = 39 /* GAME_ID_GDMJ_FK */;
                        this._isInit = false;
                        this.init();
                        break;
                }
            }
            self._tabBar.addEventListener(egret.Event.CHANGE, self.chanTab, self);
            self._createRoomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.sendOpenRoomMsg, self);
        };
        /**
         * 创建房间按钮回调
         */
        CreateRoomLayer.prototype.sendOpenRoomMsg = function () {
            this._viewStack.selectedChild.sendOpenRoomMsg();
        };
        CreateRoomLayer.prototype.chanTab = function (evt) {
            egret.log("this._tabBar.selectedIndex:::" + this._tabBar.selectedIndex);
            this._viewStack.selectedIndex = this._tabBar.selectedIndex;
            // SoundManage.playEffect(SoundManage.keyMap.btnClick);
        };
        CreateRoomLayer.prototype.init = function () {
            if (this._isInit) {
                return;
            }
            this._isInit = true;
            var conf = Config.gameConf.cardRoom[this._gameTypeId];
            egret.log("conf" + conf);
            var arrLen = conf.length;
            var datas = [];
            for (var i = 0; i < arrLen; i++) {
                var layer = void 0;
                var nameStr = void 0;
                egret.log("conf[i].gameIdconf[i].gameId" + conf[i].gameId);
                switch (conf[i].gameId) {
                    case 1 /* NIUNIU */:
                        layer = new niuniu.RoomConfigLayer("1");
                        nameStr = "ll_text1_png";
                        break;
                    case 38 /* GAME_ID_TWOMAN_QZNN */:
                        layer = new twoniuniu.RoomConfigLayer("4");
                        nameStr = "二人牛牛";
                        break;
                    case 3 /* DDZ */:
                        layer = new DDZ.RoomConfigLayer("1");
                        nameStr = "ddj_text1_png";
                        break;
                    case 10 /* ZJH */:
                        layer = new SZP.RoomConfigLayer("1");
                        nameStr = "szp_text1_png";
                        break;
                    case 5 /* DZ */:
                        layer = new Dezhou.RoomConfigLayer();
                        nameStr = "dzpk_text1_png";
                        break;
                    case 39 /* GAME_ID_GDMJ_FK */:
                        layer = new majiang.RoomConfigLayer("1");
                        nameStr = "二人牛牛";
                        break;
                }
                if (layer) {
                    datas.push({ name: nameStr, gameId: Config.gameConf.cardRoom[this._gameTypeId][i].gameId });
                    this._viewStack.addChild(layer);
                }
            }
            // this._tabBar.dataProvider = new eui.ArrayCollection(datas);
            // this._viewStack.selectedIndex = this._tabBar.selectedIndex
            //  = selectIndex;
            // gameConf
        };
        CreateRoomLayer.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            //内存泄露，清除事件绑定
            this._tabBar.removeEventListener(egret.Event.CHANGE, this.chanTab, this);
            this._createRoomBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendOpenRoomMsg, this);
        };
        return CreateRoomLayer;
    }(Layers.BaseLayer));
    Layers.CreateRoomLayer = CreateRoomLayer;
    __reflect(CreateRoomLayer.prototype, "Layers.CreateRoomLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=CreateRoomLayer.js.map