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
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            return _super.call(this) || this;
        }
        Player.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // if (this._frameAni) {
            //     this._frameAni.init("yanwu000$1_png", 9);
            //     this._frameAni.addEventListener(egret.Event.COMPLETE, this.playDealerAniCb, this);
            // }
        };
        /**
         * 显示出的牌
         */
        // public showPlayCards(cards: PokerCard[]) {
        //     this.disBox.showCards(cards);
        // }
        /**
         * 清理玩家出的牌
         */
        Player.prototype.clearDisCard = function () {
            // this.disBox.clearDiscard();
        };
        /**
         * type 0表示显示包不包牌提示,1表示不出
         */
        Player.prototype.showTip = function (value, type, gameType, RoomByte) {
            // this._tipImg.visible = true;
            // this._readyLb.visible = false;
            // switch (type) {
            //     case 0:
            //         if (value === 0) {//不包牌
            //             //                 SoundManage.playEffectBySex('ddz_buqiang', 1);
            //             this._tipImg.source = "bubao_text1_png";
            //         } else {//包牌
            //             //                 SoundManage.playEffectBySex('ddz_qiangdizhu', 1);
            //             this._tipImg.source = "baopai_text1_png";
            //         }
            //         break;
            //     case 1:
            //         this._tipImg.source = "bc_icon1_png";
            //         // SoundManage.playEffectBySex('ddz_buyao', 1);
            //         break;
            // }
        };
        /**
         * 清理所有的动画
         */
        Player.prototype.clearAllAni = function () {
            // this._frameAni.stop();
        };
        /**
         * 销毁跟回收对象
         */
        Player.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.disBox.destroy();
            this.cardBox.destroy();
        };
        Player.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.disBox.reset();
            this.status = 0 /* NONE */;
            this._dealerImg.visible = false;
            this.stopTimer();
            this.cardBox.reset();
            // this.tanBox.reset();
            // this._frameAni.visible = false;
            //  this._you.source = "";
            //  this._jiangCount.text = "";
            //  this.jiang_rose.visible = false;
        };
        Player.prototype.Accountreset = function () {
            this.disBox.reset();
            // this.status = PLAYER_STATU.NONE;
            this._dealerImg.visible = false;
            this.stopTimer();
            this.cardBox.reset();
            this._guajiImg.visible = false;
            // this.tanBox.reset();
            // this._frameAni.visible = false;
            //  this._you.source = "";
            //  this._jiangCount.text = "";
            //  this.jiang_rose.visible = false;
        };
        Player.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.reset();
            this.visible = false;
            this._guajiImg.visible = false;
        };
        Object.defineProperty(Player.prototype, "status", {
            set: function (value) {
                if (this.status === value)
                    return;
                var self = this;
                switch (value) {
                    case 0 /* NONE */:
                        self._readyLb.visible = false;
                        //         self._tipImg.visible = false;
                        //         self._countDown.visible = false;
                        //         //             self._clock.visible = self._timeLb.visible = false;
                        //         self._cardCntBg.visible = self._cardCntLab.visible = false;
                        //         self.stopTimer();
                        break;
                    case 2 /* READY */:
                        //         self._tipImg.visible = false;
                        self._readyLb.visible = true;
                        //         self.stopTimer();
                        //         self._countDown.visible = false;
                        //         self._cardCntBg.visible = self._cardCntLab.visible = false;
                        //         //             self.cardRest = 0;
                        break;
                    case 1 /* WAIT_READY */:
                        //         self._tipImg.visible =
                        //             self._readyLb.visible = false;
                        //         self._countDown.visible = true;
                        //         self.startTimer(PLAY_CARD_TIME);
                        break;
                    case 3 /* IDLE */:
                        //         self._tipImg.visible = false;
                        self._readyLb.visible = false;
                        // self._countDown.visible = false;
                        //         self._cardCntBg.visible = self._cardCntLab.visible = true;
                        //         self.stopTimer();
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.addMessage = function (str, gameType) {
            if (_super.prototype.addMessage.call(this, str, gameType)) {
                return true;
            }
            var bubble = this.bubble = new Bubble(40 /* GAME_ID_GDMJ_GOLD */);
            bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
            this.parent.addChild(bubble);
            if (this.horizontalCenter < 0 && this.verticalCenter > 0) {
                bubble.horizontalCenter = -300;
                bubble.verticalCenter = 0;
                bubble.currentState = "bottom";
            }
            else if (this.horizontalCenter < 0 && this.verticalCenter < 0) {
                bubble.horizontalCenter = -350;
                bubble.verticalCenter = -85;
                bubble.currentState = "left";
            }
            else if (this.horizontalCenter > 0 && this.verticalCenter > -100) {
                bubble.horizontalCenter = 350;
                bubble.verticalCenter = -85;
                bubble.currentState = "right";
            }
            else if (this.horizontalCenter > 0 && this.verticalCenter < -100) {
                bubble.horizontalCenter = 161;
                bubble.verticalCenter = -200;
                bubble.currentState = "top";
            }
            this.showMsg();
            return false;
        };
        return Player;
    }(PlayerBase));
    majiang.Player = Player;
    __reflect(Player.prototype, "majiang.Player");
})(majiang || (majiang = {}));
//# sourceMappingURL=Player.js.map