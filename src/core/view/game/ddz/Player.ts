namespace DDZ {
    export class Player extends PlayerBase {
		/**
		 * 玩家打出的牌的容器
		 */
        public disBox: DiscardBox;
        /**
         * 剩余牌数背景图片
         */
        public _cardCntBg: eui.Group;

        /**
         * 剩余牌数的label
         */
        private _cardCntLab: eui.Label;
        private cardRest: number;
        /**
         * 是否地主
         */
        private _isLandlord: boolean;

        /**
         * 
         */
        public _redlight: ddz.RedLight;

        public constructor() {
            super();
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            if (this._frameAni) {
                this._frameAni.init("yanwu000$1_png", 9);
                this._frameAni.addEventListener(egret.Event.COMPLETE, this.playDealerAniCb, this);
            }
            this._headBox.mask = this._roundMask;
        }
        /**
         * 显示出的牌
         */
        public showPlayCards(cards: PokerCard[]) {
            this.disBox.showCards(cards);
        }


        /**
         * 清理玩家出的牌
         */
        public clearDisCard() {
            this.disBox.clearDiscard();
        }
		/**
         * type 0表示显示抢地主提示,1表示显示叫地主提示,3表示不出
         */
        public showTip(value: number, type: number, gameType: GAME_TYPE, RoomByte: number) {
            this._tipImg.visible = true;
            this._readyLb.visible = false;
            switch (type) {
                case 0:
                    if (value === 0) {//不抢地主

                        SoundManage.playEffectBySex('ddz_buqiang', this.sex);
                        this._tipImg.source = "buqian_jintext_png";
                    } else {//抢地主
                        SoundManage.playEffectBySex('ddz_qiangdizhu', this.sex);
                        this._tipImg.source = "qiangdizhu_jintext_png";
                    }
                    break;
                case 1:
                    if (gameType === GAME_TYPE.COIN) {
                        if (value === 0) {//不叫地主
                            SoundManage.playEffectBySex('ddz_fen_0', this.sex);
                            this._tipImg.source = "0feng_text_png";
                        } else {//叫/抢地主
                            // if (value  === 15) {//抢庄倍数是15倍的说明是第一个叫,所以是叫地主
                            SoundManage.playEffectBySex('ddz_jiaodizhu', this.sex);
                            this._tipImg.source = "jiaodizhu_jintext_png";
                            // } else {//抢地主
                            //     this._tipImg.source = "qiangdizhu_jintext_png";
                            // }

                        }
                        // this._tipImg.source = value + "bei_yishutext2_png";
                    } else {//叫积分地主
                        if (RoomByte == 0) {
                            if (value === 0) {//不叫地主
                                SoundManage.playEffectBySex('ddz_fen_0', this.sex);
                                this._tipImg.source = "0feng_text_png";
                            } else {//叫/抢地主
                                // if (value  === 15) {//抢庄倍数是15倍的说明是第一个叫,所以是叫地主
                                SoundManage.playEffectBySex('ddz_jiaodizhu', this.sex);
                                this._tipImg.source = "jiaodizhu_jintext_png";
                                // } else {//抢地主
                                //     this._tipImg.source = "qiangdizhu_jintext_png";
                                // }

                            }
                        } else {
                            this._tipImg.source = value + "feng_jintext_png";
                            SoundManage.playEffectBySex("ddz_fen_" + value, this.sex);
                        }
                        egret.log("/叫积分地主");


                    }
                    break;
                case 2:
                    let num = Math.random() * 2;
                    egret.log("numnum:::" + num);
                    if (num < 1) {
                        SoundManage.playEffectBySex('ddz_buyao', this.sex);
                        this._tipImg.source = "buyao_jintext_png";
                    } else {
                        SoundManage.playEffectBySex('ddz_guo', this.sex);
                        this._tipImg.source = "guo_jintext_png";
                    }
                    break;

            }
        }
        protected playDealerAniCb() {
            if (this.sex === SEX_TYPE.FEMALE) {
                this._frameAni.source = this._isLandlord ? "touxian3_icon_png" : "";
            } else {
                this._frameAni.source = this._isLandlord ? "touxian3_icon_png" : "";
            }
        }


        /**
         * 清理所有的动画
         */
        public clearAllAni(): void {
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
        }
        /**
         * 销毁跟回收对象
         */
        public destroy() {
            super.destroy()
            this.disBox.destroy();
        }
        public reset(): void {
            super.reset();
            this.disBox.reset();
            this.status = PLAYER_STATU.NONE;
            // this._dealerImg.visible = false;
            this.stopTimer();
            this._frameAni.visible = false;
            this._timeLb.text = "15";
        }
        public clear() {
            super.clear();
            this.reset();

            this.visible = false;
        }
        public setTipsX(value: number) {
            egret.log("this._tipImg.width:", this._tipImg.width)
            this._tipImg.x = this.globalToLocal(value, 0).x - 50;
        }
        /**
         * 开启倒计时
         * @param countDown 倒计时时间
         */
        protected startTimer(countDown: number = 15) {
            this.cTime.start(countDown);
        }
        public set status(value: number) {
            if (this.status === value)
                return;
            var self = this;
            egret.log("valuevalue" + value);
            switch (value) {
                case PLAYER_UI_STATU.NONE:
                    self._readyLb.visible = false;
                    self._tipImg.visible = false;
                    self._clock.visible = self._timeLb.visible = false;
                    self._cardCntBg.visible = self._cardCntLab.visible = false;
                    self.stopTimer();
                    break;
                case PLAYER_UI_STATU.READY:
                    self._tipImg.visible = false;
                    self._readyLb.visible = true;
                    self.stopTimer();
                    self._clock.visible = self._timeLb.visible = false;
                    self._cardCntBg.visible = self._cardCntLab.visible = false;
                    self.cardRest = 0;
                    break;
                case PLAYER_UI_STATU.WAIT_READY:
                    self._tipImg.visible = self._readyLb.visible = false;
                    self._clock.visible = self._timeLb.visible = false;
                    self.startTimer();
                    break;
                case PLAYER_UI_STATU.IDLE:
                    self._tipImg.visible = false;
                    self._readyLb.visible = false;
                    self._clock.visible = self._timeLb.visible = false;
                    self._cardCntBg.visible = self._cardCntLab.visible = true;
                    self.stopTimer();
                    break;
                case PLAYER_UI_STATU.WAIT_CHU:
                case PLAYER_UI_STATU.WAIT:
                    self._clock.visible = self._timeLb.visible = true;
                    self._tipImg.visible = false;
                    self.startTimer();
                    break;
            }
        }
        /**
         * 设置角色:是农民还是地主
         * @param isLandlord:是否地主
         * @param isAni:是否需要播放动画
         */
        public setRole(isLandlord: boolean, isAni: boolean) {
            this._isLandlord = isLandlord;
            this._frameAni.visible = true;
            if (isAni) {
                this._frameAni.start(1);
            } else {
                this.playDealerAniCb();
            }
            this.disBox.setIsLandlord(isLandlord);

        }
        /**
         * 设置剩余的牌数
         */
        public setLeftCardCnt(cnt: number) {
            egret.log("this.sex", this.sex);
            this._cardCntLab.text = cnt + "";
            if (cnt == 2) {

                SoundManage.playEffectBySex('ddz_wojiu2zhangpaile', this.sex, this.doRedleghtAui, this);

            }
            if (cnt == 1) {

                SoundManage.playEffectBySex('ddz_wojiu1zhangpaile', this.sex, this.doRedleghtAui, this);
            }
        }

        public doRedleghtAui() {
            this._redlight.visible = true;
            this._redlight.start();
        }

        public addMessage(str: string, gameType?: number): boolean {
            if (super.addMessage(str, gameType)) {
                return true;
            }

            var bubble = this.bubble = new Bubble(GAME_ID.DDZ);
            bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
            this.parent.addChild(bubble);
            if (!isNaN(this.left)) {
                bubble.left = 20;
                if (!isNaN(this.bottom)) {
                    bubble.bottom = this.bottom + this.height + 15;
                } else {
                    bubble.top = 150;
                    bubble.left = 100;
                }
                bubble.currentState = "left";
            } else if (!isNaN(this.right)) {
                bubble.right = 120;
                bubble.top = 150;
                bubble.currentState = "right";
            } else {
                bubble.top = 100;
                bubble.verticalCenter = 100;
                bubble.currentState = "top";
            }

            this.showMsg();
            return false;
        }
    }
}