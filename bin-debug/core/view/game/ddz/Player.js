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
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            return _super.call(this) || this;
        }
        Player.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (this._frameAni) {
                this._frameAni.init("yanwu000$1_png", 9);
                this._frameAni.addEventListener(egret.Event.COMPLETE, this.playDealerAniCb, this);
            }
            this._headBox.mask = this._roundMask;
        };
        /**
         * 显示出的牌
         */
        Player.prototype.showPlayCards = function (cards) {
            this.disBox.showCards(cards);
        };
        /**
         * 清理玩家出的牌
         */
        Player.prototype.clearDisCard = function () {
            this.disBox.clearDiscard();
        };
        /**
         * type 0表示显示抢地主提示,1表示显示叫地主提示,3表示不出
         */
        Player.prototype.showTip = function (value, type, gameType, RoomByte) {
            this._tipImg.visible = true;
            this._readyLb.visible = false;
            switch (type) {
                case 0:
                    if (value === 0) {
                        SoundManage.playEffectBySex('ddz_buqiang', this.sex);
                        this._tipImg.source = "buqian_jintext_png";
                    }
                    else {
                        SoundManage.playEffectBySex('ddz_qiangdizhu', this.sex);
                        this._tipImg.source = "qiangdizhu_jintext_png";
                    }
                    break;
                case 1:
                    if (gameType === 0 /* COIN */) {
                        if (value === 0) {
                            SoundManage.playEffectBySex('ddz_fen_0', this.sex);
                            this._tipImg.source = "0feng_text_png";
                        }
                        else {
                            // if (value  === 15) {//抢庄倍数是15倍的说明是第一个叫,所以是叫地主
                            SoundManage.playEffectBySex('ddz_jiaodizhu', this.sex);
                            this._tipImg.source = "jiaodizhu_jintext_png";
                        }
                    }
                    else {
                        if (RoomByte == 0) {
                            if (value === 0) {
                                SoundManage.playEffectBySex('ddz_fen_0', this.sex);
                                this._tipImg.source = "0feng_text_png";
                            }
                            else {
                                // if (value  === 15) {//抢庄倍数是15倍的说明是第一个叫,所以是叫地主
                                SoundManage.playEffectBySex('ddz_jiaodizhu', this.sex);
                                this._tipImg.source = "jiaodizhu_jintext_png";
                            }
                        }
                        else {
                            this._tipImg.source = value + "feng_jintext_png";
                            SoundManage.playEffectBySex("ddz_fen_" + value, this.sex);
                        }
                        egret.log("/叫积分地主");
                    }
                    break;
                case 2:
                    var num = Math.random() * 2;
                    egret.log("numnum:::" + num);
                    if (num < 1) {
                        SoundManage.playEffectBySex('ddz_buyao', this.sex);
                        this._tipImg.source = "buyao_jintext_png";
                    }
                    else {
                        SoundManage.playEffectBySex('ddz_guo', this.sex);
                        this._tipImg.source = "guo_jintext_png";
                    }
                    break;
            }
        };
        Player.prototype.playDealerAniCb = function () {
            if (this.sex === 2 /* FEMALE */) {
                this._frameAni.source = this._isLandlord ? "touxian3_icon_png" : "";
            }
            else {
                this._frameAni.source = this._isLandlord ? "touxian3_icon_png" : "";
            }
        };
        /**
         * 清理所有的动画
         */
        Player.prototype.clearAllAni = function () {
            this._frameAni.stop();
            // if (this.aniMoneyLabel) {
            //     egret.Tween.removeTweens(this.aniMoneyLabel);
            // }
            // if (this.aniTimer) {
            //     egret.clearInterval(this.aniTimer);
            //     this.aniTimer = null;
            // }
            // egret.Tween.removeTweens(this._aniImg);
            // this.disBox.clearAllAni();
        };
        /**
         * 销毁跟回收对象
         */
        Player.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.disBox.destroy();
        };
        Player.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.disBox.reset();
            this.status = 0 /* NONE */;
            // this._dealerImg.visible = false;
            this.stopTimer();
            this._frameAni.visible = false;
            this._timeLb.text = "15";
        };
        Player.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.reset();
            this.visible = false;
        };
        Player.prototype.setTipsX = function (value) {
            egret.log("this._tipImg.width:", this._tipImg.width);
            this._tipImg.x = this.globalToLocal(value, 0).x - 50;
        };
        /**
         * 开启倒计时
         * @param countDown 倒计时时间
         */
        Player.prototype.startTimer = function (countDown) {
            if (countDown === void 0) { countDown = 15; }
            this.cTime.start(countDown);
        };
        Object.defineProperty(Player.prototype, "status", {
            set: function (value) {
                if (this.status === value)
                    return;
                var self = this;
                egret.log("valuevalue" + value);
                switch (value) {
                    case 0 /* NONE */:
                        self._readyLb.visible = false;
                        self._tipImg.visible = false;
                        self._clock.visible = self._timeLb.visible = false;
                        self._cardCntBg.visible = self._cardCntLab.visible = false;
                        self.stopTimer();
                        break;
                    case 2 /* READY */:
                        self._tipImg.visible = false;
                        self._readyLb.visible = true;
                        self.stopTimer();
                        self._clock.visible = self._timeLb.visible = false;
                        self._cardCntBg.visible = self._cardCntLab.visible = false;
                        self.cardRest = 0;
                        break;
                    case 1 /* WAIT_READY */:
                        self._tipImg.visible = self._readyLb.visible = false;
                        self._clock.visible = self._timeLb.visible = false;
                        self.startTimer();
                        break;
                    case 3 /* IDLE */:
                        self._tipImg.visible = false;
                        self._readyLb.visible = false;
                        self._clock.visible = self._timeLb.visible = false;
                        self._cardCntBg.visible = self._cardCntLab.visible = true;
                        self.stopTimer();
                        break;
                    case 5 /* WAIT_CHU */:
                    case 4 /* WAIT */:
                        self._clock.visible = self._timeLb.visible = true;
                        self._tipImg.visible = false;
                        self.startTimer();
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置角色:是农民还是地主
         * @param isLandlord:是否地主
         * @param isAni:是否需要播放动画
         */
        Player.prototype.setRole = function (isLandlord, isAni) {
            this._isLandlord = isLandlord;
            this._frameAni.visible = true;
            if (isAni) {
                this._frameAni.start(1);
            }
            else {
                this.playDealerAniCb();
            }
            this.disBox.setIsLandlord(isLandlord);
        };
        /**
         * 设置剩余的牌数
         */
        Player.prototype.setLeftCardCnt = function (cnt) {
            egret.log("this.sex", this.sex);
            this._cardCntLab.text = cnt + "";
            if (cnt == 2) {
                SoundManage.playEffectBySex('ddz_wojiu2zhangpaile', this.sex, this.doRedleghtAui, this);
            }
            if (cnt == 1) {
                SoundManage.playEffectBySex('ddz_wojiu1zhangpaile', this.sex, this.doRedleghtAui, this);
            }
        };
        Player.prototype.doRedleghtAui = function () {
            this._redlight.visible = true;
            this._redlight.start();
        };
        Player.prototype.addMessage = function (str, gameType) {
            if (_super.prototype.addMessage.call(this, str, gameType)) {
                return true;
            }
            var bubble = this.bubble = new Bubble(3 /* DDZ */);
            bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
            this.parent.addChild(bubble);
            if (!isNaN(this.left)) {
                bubble.left = 20;
                if (!isNaN(this.bottom)) {
                    bubble.bottom = this.bottom + this.height + 15;
                }
                else {
                    bubble.top = 150;
                    bubble.left = 100;
                }
                bubble.currentState = "left";
            }
            else if (!isNaN(this.right)) {
                bubble.right = 120;
                bubble.top = 150;
                bubble.currentState = "right";
            }
            else {
                bubble.top = 100;
                bubble.verticalCenter = 100;
                bubble.currentState = "top";
            }
            this.showMsg();
            return false;
        };
        return Player;
    }(PlayerBase));
    DDZ.Player = Player;
    __reflect(Player.prototype, "DDZ.Player");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=Player.js.map