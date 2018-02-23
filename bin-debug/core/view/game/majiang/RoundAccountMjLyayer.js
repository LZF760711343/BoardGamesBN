var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var majiang;
(function (majiang) {
    var RoundAccountMjLyayer = (function (_super) {
        __extends(RoundAccountMjLyayer, _super);
        function RoundAccountMjLyayer(id) {
            var _this = _super.call(this) || this;
            _this.creeai = id;
            _this.skinName = RoundAccountmjSkin;
            return _this;
        }
        RoundAccountMjLyayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGoBtn, this);
            this.btnChangeDesk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendChangeDeskMsg, this);
            this.cardBox = [this._cardBox0, this._cardBox1, this._cardBox2, this._cardBox3];
            this.players = [this._player0, this._player1, this._player2, this._player3];
            this.huTypeS = [this._huType1, this._huType2, this._huType3, this._huType4];
            this.fanPaoS = [this._fanpao1, this._fanpao2, this._fanpao3, this._fanpao4];
        };
        RoundAccountMjLyayer.prototype.onTouchGoBtn = function () {
            this.close();
            egret.Event.dispatchEvent(this, Layers.Event.CLOSE);
        };
        RoundAccountMjLyayer.prototype.sendChangeDeskMsg = function () {
            net.SendMsg.create({ roomType: this.creeai }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_CHANGE_ROOM).send();
        };
        RoundAccountMjLyayer.prototype.setDatas = function (overDatas, gameDatas) {
            var datas = overDatas.gameResult;
            var length = overDatas.gameResult.length;
            var pan_score_list = [];
            for (var i = 0; i < length; i++) {
                var result = overDatas.gameResult[i];
                var id = result.playerId;
                var playerInfo = gameDatas.playerDatas[i];
                if (id == gameDatas.myPlyerId) {
                    if (result.balance > 0) {
                        this._title.source = "nyl_icon_png";
                    }
                    else if (result.balance < 0) {
                        this._title.source = "nsl_icon_png";
                    }
                    else {
                        this._title.source = "pj_toptext_png";
                    }
                }
                if (id == datas[i].fangPaoPlayerId) {
                    this.fanPaoS[i].visible = true;
                }
                else {
                    this.fanPaoS[i].visible = false;
                }
                if (id == datas[i].huPlayerId) {
                    this.huTypeS[i].visible = true;
                }
                else {
                    this.huTypeS[i].visible = false;
                }
                if (id == datas[i].dealer) {
                    this.players[i].setDealerIcon(true);
                }
                else {
                    this.players[i].setDealerIcon(false);
                }
                pan_score_list[i] = { leiStr: datas[i].handValue + "分", fenStr: datas[i].balance + "" };
                var destList = majiang.Majiang.getDestList(datas[i]);
                this.cardBox[i].initCards(gameDatas.laziCard, overDatas.gameResult[i].cards, destList, false);
                this.players[i].updateInfo(gameDatas.playerDatas[overDatas.gameResult[i].playerId].UserInfo);
            }
            this._dataGroup.dataProvider = new eui.ArrayCollection(pan_score_list);
            if (gameDatas.laziCard) {
                this._LaziGourp.visible = true;
                this._laziCard.source = "mj_bottomD" + gameDatas.laziCard + "_png";
            }
            else {
                this._LaziGourp.visible = false;
            }
            var Ma_list = [];
            egret.log("gameDatas.maCards", gameDatas.maCards);
            if (gameDatas.maCards) {
                this._dataGroupMaCard.visible = true;
                for (var i = 0; i < gameDatas.maCards.length; i++) {
                    if (gameDatas.zhongmaCards) {
                        // for (let j = 0; i < gameDatas.zhongmaCards.length; i++) {
                        if (gameDatas.zhongmaCards.indexOf(gameDatas.maCards[i]) != -1) {
                            Ma_list[i] = { maStr: "mj_bottomD" + gameDatas.maCards[i] + "_png", apl: 1 };
                        }
                        else {
                            Ma_list[i] = { maStr: "mj_bottomD" + gameDatas.maCards[i] + "_png", apl: 0.5 };
                        }
                    }
                    else {
                        Ma_list[i] = { maStr: "mj_bottomD" + gameDatas.maCards[i] + "_png", apl: 0.5 };
                    }
                }
                this._dataGroupMaCard.dataProvider = new eui.ArrayCollection(Ma_list);
                egret.log("Ma_list", Ma_list);
            }
            else {
                this._dataGroupMaCard.visible = false;
            }
            var confs = this._confs = majiang.RoomConf;
            for (var i = 0; i < this._confs.length; i++) {
                if (!!(this._confs[i].value & datas[0].lastHuPaiFlag)) {
                    egret.log(this._confs[i].name, "this._confs[i].value");
                }
            }
            // let a = <eui.Image>this._dataGroupMaCard.getElementAt(0);
            // a.alpha = 0.5;
        };
        return RoundAccountMjLyayer;
    }(Layers.RoundAccountLayerBase));
    majiang.RoundAccountMjLyayer = RoundAccountMjLyayer;
    __reflect(RoundAccountMjLyayer.prototype, "majiang.RoundAccountMjLyayer");
})(majiang || (majiang = {}));
//# sourceMappingURL=RoundAccountMjLyayer.js.map