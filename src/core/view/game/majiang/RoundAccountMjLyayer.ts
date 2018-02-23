namespace majiang {
    export class RoundAccountMjLyayer extends Layers.RoundAccountLayerBase {

        private _cardBox0: majiang.CardBox;
        private _cardBox1: majiang.CardBox;
        private _cardBox2: majiang.CardBox;
        private _cardBox3: majiang.CardBox;
        private cardBox: majiang.CardBox[];
        private _player0: majiang.Player;
        private _player1: majiang.Player;
        private _player2: majiang.Player;
        private _player3: majiang.Player;
        private players: majiang.Player[];

        private _dataGroupMaCard: eui.DataGroup;

        private _LaziGourp: eui.Group;
        private _laziCard: eui.Image;

        private _huType1: eui.Image;
        private _huType2: eui.Image;
        private _huType3: eui.Image;
        private _huType4: eui.Image;
        private huTypeS: eui.Image[];
        private _fanpao1: eui.Image;
        private _fanpao2: eui.Image;
        private _fanpao3: eui.Image;
        private _fanpao4: eui.Image;
        private fanPaoS: eui.Image[];
        private btnChangeDesk: UI.GrayBtn;

        private _confs: { value: number, name: string, defvalue: number }[];
        private creeai: number;
        public constructor(id: number) {
            super();
            this.creeai = id;
            this.skinName = RoundAccountmjSkin;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGoBtn, this);
            this.btnChangeDesk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendChangeDeskMsg, this);
            this.cardBox = [this._cardBox0, this._cardBox1, this._cardBox2, this._cardBox3];
            this.players = [this._player0, this._player1, this._player2, this._player3];

            this.huTypeS = [this._huType1, this._huType2, this._huType3, this._huType4];
            this.fanPaoS = [this._fanpao1, this._fanpao2, this._fanpao3, this._fanpao4];

        }

        private onTouchGoBtn() {
            this.close();
            egret.Event.dispatchEvent(this, Layers.Event.CLOSE);

        }

        public sendChangeDeskMsg() {
            net.SendMsg.create({ roomType: this.creeai }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_CHANGE_ROOM).send();
        }

        private datas;

        public setDatas(overDatas: model.MJGameOverInfo, gameDatas: GameDatas) {

            let datas = overDatas.gameResult;
           
            let length = overDatas.gameResult.length;
            let pan_score_list = [];
            for (let i = 0; i < length; i++) {
                let result = overDatas.gameResult[i];
                let id = result.playerId;
                let playerInfo = gameDatas.playerDatas[i];
                if (id == gameDatas.myPlyerId) {
                    if (result.balance > 0) {//赢了
                        this._title.source = "nyl_icon_png";
                    } else if (result.balance < 0) {
                        this._title.source = "nsl_icon_png";
                    } else {
                        this._title.source = "pj_toptext_png";
                    }
                }
                if (id == datas[i].fangPaoPlayerId) {
                    this.fanPaoS[i].visible = true;
                } else {
                    this.fanPaoS[i].visible = false;
                }

                if (id == datas[i].huPlayerId) {
                    this.huTypeS[i].visible = true;
                } else {
                    this.huTypeS[i].visible = false;
                }


                if (id == datas[i].dealer) {
                    this.players[i].setDealerIcon(true);
                } else {
                    this.players[i].setDealerIcon(false);
                }
                pan_score_list[i] = { leiStr: datas[i].handValue + "分", fenStr: datas[i].balance + "" };
                let destList: MJActionItem[] = Majiang.getDestList(datas[i]);
                this.cardBox[i].initCards(gameDatas.laziCard, overDatas.gameResult[i].cards, destList, false);
                this.players[i].updateInfo(gameDatas.playerDatas[overDatas.gameResult[i].playerId].UserInfo);
            }


            this._dataGroup.dataProvider = new eui.ArrayCollection(pan_score_list);

            if (gameDatas.laziCard) {
                this._LaziGourp.visible = true;
                this._laziCard.source = `mj_bottomD${gameDatas.laziCard}_png`
            } else {
                this._LaziGourp.visible = false;
            }
            let Ma_list = [];
            egret.log("gameDatas.maCards", gameDatas.maCards);
            if (gameDatas.maCards) {
                this._dataGroupMaCard.visible = true;
                for (let i = 0; i < gameDatas.maCards.length; i++) {
                    if (gameDatas.zhongmaCards) {
                        // for (let j = 0; i < gameDatas.zhongmaCards.length; i++) {
                        if (gameDatas.zhongmaCards.indexOf(gameDatas.maCards[i]) != -1) {
                            Ma_list[i] = { maStr: `mj_bottomD${gameDatas.maCards[i]}_png`, apl: 1 };
                        }
                        else {
                            Ma_list[i] = { maStr: `mj_bottomD${gameDatas.maCards[i]}_png`, apl: 0.5 };
                        }
                        // }
                    } else {
                        Ma_list[i] = { maStr: `mj_bottomD${gameDatas.maCards[i]}_png`, apl: 0.5 };
                    }
                }
                this._dataGroupMaCard.dataProvider = new eui.ArrayCollection(Ma_list);
                egret.log("Ma_list", Ma_list);
            } else {
                this._dataGroupMaCard.visible = false;
            }

            var confs = this._confs = RoomConf;
            for (let i = 0; i < this._confs.length; i++) {
                if (!!(this._confs[i].value & datas[0].lastHuPaiFlag)) {
                    egret.log(this._confs[i].name, "this._confs[i].value");
                }
            }
            // let a = <eui.Image>this._dataGroupMaCard.getElementAt(0);
            // a.alpha = 0.5;
        }
    }

}