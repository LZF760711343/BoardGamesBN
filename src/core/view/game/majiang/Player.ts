namespace majiang {
    export class Player extends PlayerBase {
		/**
		 * 玩家打出的牌的容器
		 */
        public disBox: DiscardBox;
        /**
         * 剩余牌数背景图片
         */
        private _cardCntBg: eui.Image;

        /**
         * 手上的牌的容器
         */
        public cardBox: CardBox;
        /**
         * 剩余牌数的label
         */
        private _cardCntLab: eui.Label;
        /**
         * 摊牌的容器
         */
        public tanBox: DiscardBox;
        public constructor() {
            super();
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            // if (this._frameAni) {
            //     this._frameAni.init("yanwu000$1_png", 9);
            //     this._frameAni.addEventListener(egret.Event.COMPLETE, this.playDealerAniCb, this);
            // }
        }
        /**
         * 显示出的牌
         */
        // public showPlayCards(cards: PokerCard[]) {
        //     this.disBox.showCards(cards);
        // }


        /**
         * 清理玩家出的牌
         */
        public clearDisCard() {
            // this.disBox.clearDiscard();
        }

        /**
         * type 0表示显示包不包牌提示,1表示不出
         */
        public showTip(value: number, type: number, gameType: GAME_TYPE, RoomByte: number) {
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
        }


        /**
         * 清理所有的动画
         */
        public clearAllAni(): void {
            // this._frameAni.stop();
        }
        /**
         * 销毁跟回收对象
         */
        public destroy() {
            super.destroy()
            this.disBox.destroy();
            this.cardBox.destroy();
        }
        public reset(): void {
            super.reset();
            this.disBox.reset();
            this.status = PLAYER_STATU.NONE;
            this._dealerImg.visible = false;
            this.stopTimer();
            this.cardBox.reset();
            // this.tanBox.reset();
            // this._frameAni.visible = false;
            //  this._you.source = "";
            //  this._jiangCount.text = "";
            //  this.jiang_rose.visible = false;
        }

        public Accountreset(): void {
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
        }

        public clear() {
            super.clear();
            this.reset();
            this.visible = false;
            this._guajiImg.visible = false;
        }
        public set status(value: number) {
            if (this.status === value)
                return;
            var self = this;
            switch (value) {
                case PLAYER_UI_STATU.NONE:
                    self._readyLb.visible = false;
                    //         self._tipImg.visible = false;
                    //         self._countDown.visible = false;
                    //         //             self._clock.visible = self._timeLb.visible = false;
                    //         self._cardCntBg.visible = self._cardCntLab.visible = false;
                    //         self.stopTimer();
                    break;
                case PLAYER_UI_STATU.READY:
                    //         self._tipImg.visible = false;
                    self._readyLb.visible = true;
                    //         self.stopTimer();
                    //         self._countDown.visible = false;
                    //         self._cardCntBg.visible = self._cardCntLab.visible = false;
                    //         //             self.cardRest = 0;
                    break;
                case PLAYER_UI_STATU.WAIT_READY:
                    //         self._tipImg.visible =
                    //             self._readyLb.visible = false;
                    //         self._countDown.visible = true;
                    //         self.startTimer(PLAY_CARD_TIME);
                    break;
                case PLAYER_UI_STATU.IDLE:
                    //         self._tipImg.visible = false;
                    self._readyLb.visible = false;
                    // self._countDown.visible = false;
                    //         self._cardCntBg.visible = self._cardCntLab.visible = true;
                    //         self.stopTimer();
                    break;
                //     case PLAYER_UI_STATU.WAIT_CHU:
                //     case PLAYER_UI_STATU.WAIT:
                //         self._countDown.visible = true;
                //         self._tipImg.visible = false;
                //         self.startTimer(PLAY_CARD_TIME);
                //         break;
            }

        }

        public addMessage(str: string, gameType?: number): boolean {
            if (super.addMessage(str, gameType)) {
                return true;
            }

            var bubble = this.bubble = new Bubble(GAME_ID.GAME_ID_GDMJ_GOLD);
            bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
            this.parent.addChild(bubble);
            if (this.horizontalCenter < 0 && this.verticalCenter > 0) {
                bubble.horizontalCenter = -300;
                bubble.verticalCenter = 0;
                bubble.currentState = "bottom";
            } else if (this.horizontalCenter < 0 && this.verticalCenter < 0) {
                bubble.horizontalCenter = -350;
                bubble.verticalCenter = -85;
                bubble.currentState = "left";
            } else if (this.horizontalCenter > 0 && this.verticalCenter > -100) {
                bubble.horizontalCenter = 350;
                bubble.verticalCenter = -85;
                bubble.currentState = "right";
            } else if (this.horizontalCenter > 0 && this.verticalCenter < -100) {
                bubble.horizontalCenter = 161;
                bubble.verticalCenter = -200;
                bubble.currentState = "top";
            }

            this.showMsg();
            return false;
        }
    }
}