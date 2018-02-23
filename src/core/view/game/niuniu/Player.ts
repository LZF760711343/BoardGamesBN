module niuniu {
    export class Player extends PlayerBase {
		/**
		 * 玩家打出的牌的容器
		 */
        public disBox: DiscardBox;
        public constructor() {
            super();
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this._headBox.mask = this._roundMask;
        }
		/**
         * type 0表示显示抢庄提示,1表示显示投注提示
         */
        public showTip(value: number, type: number, gameType: GAME_TYPE) {
            this._tipImg.visible = true;
            this._readyLb.visible = false;
            if (type === 0) {
                if (value === 0) {
                    this._tipImg.source = "buqian_yishutext2_png";
                } else {
                    // if (gameType === GAME_TYPE.COIN) {
                    this._tipImg.source = value + "bei_yishutext2_png";
                    // } else {
                    //     this._tipImg.source = `${value}bei_yishutext2_png`;
                    // }

                }
            } else {
                this._tipImg.source = `label_g_x${value}_png`;
            }
        }
        /**
         * 清理所有的动画
         */
        public clearAllAni(): void {
            // if (this.aniMoneyLabel) {
            //     egret.Tween.removeTweens(this.aniMoneyLabel);
            // }
            // if (this.aniTimer) {
            //     egret.clearInterval(this.aniTimer);
            //     this.aniTimer = null;
            // }
            // egret.Tween.removeTweens(this._aniImg);
            this.disBox.clearAllAni();
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
            this._dealerImg.visible = false;
            this.stopTimer();
            // this.reSetTimer(this.count_down);
            // this._aniImg.source = "mj_head_ani_box0_png";
            // this._aniImg.visible = false;
        }
        /**
        * 设置庄家icon
        */
        public setDealerIcon(visible: boolean): void {
            this._dealerImg.visible = this._tipImg.visible = visible;
            if (this._tipImg.source == "buqian_yishutext2_png") {
                this._tipImg.source = "1bei_yishutext2_png"
            };

        }
        public clear() {
            super.clear();
            this.reset();
            this.visible = false;
        }


        public addMessage(str: string, gameType?: number): boolean {
            if (super.addMessage(str, gameType)) {
                return true;
            }
            var bubble = this.bubble = new Bubble(GAME_ID.NIUNIU);
            bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
            this.parent.addChild(bubble);
            if (!isNaN(this.left)) {
                if (isNaN(this.bottom)) {
                    bubble.left = this.left + 15;
                    bubble.verticalCenter = this.verticalCenter - this.height / 2 - 30;
                    bubble.currentState = "bottom_left";
                } else {
                    bubble.left = this.left + this.width / 8;
                    bubble.bottom = this.bottom + this.height + 8;
                    bubble.currentState = "bottom";
                }
            } else if (!isNaN(this.right)) {
                bubble.verticalCenter = this.verticalCenter - this.height / 2 - 30;
                bubble.right = this.right + 10;
                bubble.currentState = "bottom_right";
            } else if (this.horizontalCenter < 0) {
                bubble.horizontalCenter = this.horizontalCenter - this.width;
                bubble.top = this.top + 30;
                bubble.currentState = "right";
            } else if (this.horizontalCenter > 0) {
                bubble.horizontalCenter = this.horizontalCenter + this.width;
                bubble.top = this.top + 30;
                bubble.currentState = "left";
            } else {
                bubble.horizontalCenter = 0;
                bubble.top = this.top + this.height + 30;
                bubble.currentState = "top";
            }
            this.showMsg();
        }


        public set status(value: number) {
            if (this.status === value)
                return;
            var self = this;
            switch (value) {
                case PLAYER_UI_STATU.NONE:
                    self._readyLb.visible = false;
                    self._tipImg.visible = false;
                    self._clock.visible = self._timeLb.visible = false;
                    self.stopTimer();
                    break;
                case PLAYER_UI_STATU.READY:
                    self._tipImg.visible = false;
                    self._readyLb.visible = true;
                    self.startTimer();
                    self._clock.visible = self._timeLb.visible = false;
                    break;
                case PLAYER_UI_STATU.WAIT_READY:
                    self._tipImg.visible =
                        self._readyLb.visible = false;
                    self._clock.visible = self._timeLb.visible = true;
                    self.startTimer();
                    break;
                case PLAYER_UI_STATU.IDLE:
                    self._tipImg.visible =
                        self._readyLb.visible = false;
                    self._clock.visible = self._timeLb.visible = true;
                    self.stopTimer();
                    break;
                case PLAYER_UI_STATU.WAIT:
                    self.startTimer();
                    break;
            }
        }
    }
}