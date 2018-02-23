var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DDZ;
(function (DDZ) {
    var RoomConfigLayer = (function (_super) {
        __extends(RoomConfigLayer, _super);
        function RoomConfigLayer(str) {
            var _this = _super.call(this) || this;
            _this.helpDescs = [];
            _this._gameId = 3 /* DDZ */;
            _this.skinName = DDZ.RoomConfigLayerSkin;
            _this.currentState = str;
            var self = _this;
            self.dzGroup = self._jdzRadio.group;
            self.zdGroup = self._3zRadio.group;
            // this._levelConf = [{ playerCnt: 3, count: 8, cost: 1 }, { playerCnt: 3, count: 16, cost: 2 }];
            _this.helpDescs = [
                { text: "●  基本玩法规则：\n" },
                { text: "简介：由三人玩一副牌，地主为一方，其余两家为另一方，双方对战，先出完手中牌的一方胜。\n\n" },
                { text: "游戏规则（一副牌规则）\n" },
                { text: "1、发牌\n" },
                { text: "一副牌 54 张，一人 17 张，留 3 张做底牌，在确定地主之前玩家不能看底牌。\n" },
                { text: "2、叫牌\n" },
                { text: "按出牌的顺序轮流进行，每人只能叫一次。叫牌时可以叫 “1 分 ” ， “2 分 ” ， “3 分 ” ， “ 不叫 ” 。后叫牌者只能叫比前面玩家高的分或者不叫。叫牌结束后所叫分值最大的玩家为地主；如果有玩家叫 “3 分 ” 则立即结束叫牌，该玩家为地主；如果都不叫，则重新发牌，重新叫牌。\n" },
                { text: "3、出牌\n" },
                { text: "将三张底牌交给地主，并亮出底牌让所有人都能看到。地主首先出牌，然后按逆时针顺序依次出牌，轮到用户跟牌时，用户可以选择 “ 不出 ” 或出比上一个玩家大的牌。某一玩家出完牌时结束本局。\n\n" },
                { text: "4、牌型\n" },
                { text: "火箭：即双王（大王和小王），最大的牌。\n" },
                { text: "炸弹：四张同数值牌（如四个 7 ）。\n" },
                { text: "单牌：单个牌（如红桃 5 ）。\n" },
                { text: "对牌：数值相同的两张牌（如梅花 4+ 方块 4 ）。\n" },
                { text: "三张牌：数值相同的三张牌（如三个 J ）。\n" },
                { text: "三带一：数值相同的三张牌 + 一张单牌。例如： 333+6\n" },
                { text: "单顺：五张或更多的连续单牌（如： 45678 或 78910JQK ）。不包括 2 点和双王。 \n" },
                { text: "双顺：三对或更多的连续对牌（如： 334455 、7788991010JJ ）。不包括 2 点和双王。\n" },
                { text: "三顺：二个或更多的连续三张牌（如： 333444 、 555666777888 ）。不包括 2 点和双王。\n" },
                { text: "飞机带翅膀：三顺＋同数量的单牌（或同数量的对牌）。如： 444555+79 或 333444555+7799JJ  \n" },
                { text: "四带二：四张牌＋两手牌。（注意：四带二不是炸弹）。如： 5555 ＋ 3 ＋ 8 或 4444 ＋ 55 ＋ 77 。\n\n" },
                { text: "5、牌型的大小\n" },
                { text: "火箭最大，可以打任意其他的牌。\n炸弹比火箭小，比其他牌大。都是炸弹时按牌的分值比大小。\n除火箭和炸弹外，其他牌必须要牌型相同且总张数相同才能比大小。\n单牌按分值比大小，依次是 大王 > 小王 >2>A>K>Q>J>10>9>8>7>6>5>4>3 ，不分花色\n对牌、三张牌都按分值比大小。\n顺牌按最大的一张牌的分值来比大小。\n飞机带翅膀和四带二按其中的三顺和四张部分来比，带的牌不影响大小。\n" },
                { text: "\n6、胜负判定\n" },
                { text: "任意一家出完牌后结束游戏，若是地主先出完牌则地主胜，否则另外两家胜。\n" },
            ];
            _this._label1.textFlow = _this.helpDescs;
            return _this;
        }
        RoomConfigLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (this.currentState === "1") {
                this.initLastInfo();
            }
        };
        // 如果有缓存，初始化
        RoomConfigLayer.prototype.initLastInfo = function () {
            var data = LocalDatas.sDatas.datas.ddz_data;
            if (data != null) {
                _super.prototype.initLastInfo.call(this, data);
                // egret.log("如果有缓存，初始化DDZ"+data.roomLevel+"=="+this._levelGroup.selectedValue );
                this.dzGroup.selectedValue = data.roomMode + "";
                this.zdGroup.selectedValue = data.roomSubMode + "";
                this._levelGroup.selectedValue = data.roomLevel + "";
            }
            else {
                this.dzGroup.selectedValue = 0 + "";
                this.zdGroup.selectedValue = 0 + "";
            }
        };
        /**
         * 发送创建房间的消息
         */
        RoomConfigLayer.prototype.sendOpenRoomMsg = function () {
            var self = this;
            var limitValue = 0;
            if (self._ipxzRadio.selected) {
                limitValue = limitValue | 1 /* IP */;
            }
            // 00000011
            if (self._dlwzRadio.selected) {
                limitValue |= 2 /* GEOLOCATION */;
            }
            var sendData = {
                gameId: this._gameId,
                extraLimit: limitValue,
                roomLevel: parseInt(this._levelGroup.selectedValue),
                roomMode: parseInt(this.dzGroup.selectedValue),
                roomSubMode: parseInt(this.zdGroup.selectedValue)
            };
            net.SendMsg.create(sendData, 3 /* PLAY_GAME */, PlayGameOrder.C2G_OPEN_SCORE_ROOM).send();
            LocalDatas.sDatas.datas.ddz_data = sendData;
            LocalDatas.sDatas.saveData();
        };
        RoomConfigLayer.prototype.setInfo = function (data) {
            if (data != null) {
                this._roomGroup.touchChildren = this._roomGroup.touchEnabled = false;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                _super.prototype.setInfo.call(this, data);
                this._jdzRadio.enabled = this._jdzRadio.value == data.createinfo.roomMode;
                this._jfRadio.enabled = this._jfRadio.value == data.createinfo.roomMode;
                this._3zRadio.enabled = this._3zRadio.value == data.createinfo.roomSubMode;
                this._4zRadio.enabled = this._4zRadio.value == data.createinfo.roomSubMode;
                this._5zRadio.enabled = this._5zRadio.value == data.createinfo.roomSubMode;
                this.zdGroup.selectedValue = data.createinfo.roomSubMode + "";
                this.dzGroup.selectedValue = data.createinfo.roomMode + "";
                egret.log("data.createinfo.roomSubMode::" + data.createinfo.roomSubMode, "data.createinfo.roomMode::" + data.createinfo.roomMode);
            }
        };
        RoomConfigLayer.prototype.onExit = function () {
            _super.prototype.onExit.call(this);
            //内存泄露，清除事件绑定
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        return RoomConfigLayer;
    }(Layers.RoomConfigLayerBase));
    DDZ.RoomConfigLayer = RoomConfigLayer;
    __reflect(RoomConfigLayer.prototype, "DDZ.RoomConfigLayer");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=DZZRoomConfigLayer.js.map