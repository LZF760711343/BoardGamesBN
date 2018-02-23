namespace zjh {
    export const enum PlayerActionMask {
        //已经输了
        LOSE = 0x01,
        //已经弃牌了
        QI = 0x02,
        //已经看牌了
        LOOK = 0x04,

    }
    export class Player extends PlayerBase {
        /**
		 * 玩家打出的牌的容器
		 */
        public disBox: DiscardBox;
        /**
         * 
         */
        private _waitingTip: eui.Group;
        private _tipLabel: eui.Label;
        /**
         * 显示下了多少注的筹码栏
         */
        private _betChipsBar: ChipsBar;
        //倒计时进度条
        public _proBar: UI.ProgressBar;
        public _gameTime: eui.Group;

        private _compImg: eui.Image;
        private _blinkAni: egret.tween.TweenGroup;
        public isDoBlinkAni: boolean = false;
        private action: number = 0;//是否已经看牌了
        public constructor() {
            super();
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this._headBox.mask = this._roundMask;
        }
        public setBetChips(value: number) {
            this._betChipsBar.setBetChips(value);
        }
        public destroy() {
            super.destroy();
            this.stopBlinkCompAni();
            this._proBar.stopTimer();
        }
        public reset(): void {
            super.reset();
            this.status = PLAYER_STATU.NONE;
            this._dealerImg.visible = false;
            this.action = 0;
            this.disBox.reset();
            this.stopTimer();
        }

        public stopTimer() {
            // this._proBar.visible = false;
            // this._proBar.stopTimer();
            super.stopTimer();
            this._gameTime.visible = false;
            this._timeLb.text = "15";
        }
        /**
         * 开启倒计时
         * @param countDown 倒计时时间
         */
        protected startTimer(countDown: number = 15) {
            this.cTime.start(countDown);
            egret.log("startTimer1" + countDown, this.playerId);
            // this.
            // this._proBar.visible = true;
            // this._proBar.startTimer(15000);
            this._gameTime.visible = true;
        }
        public startBlinkCompAni() {
            if (this.isDoBlinkAni) {
                return;
            }
            this.isDoBlinkAni = true;
            this._blinkAni.play(0);
            this._compImg.visible = true;
        }
        public stopBlinkCompAni() {
            if (this.isDoBlinkAni) {
                this._blinkAni.stop();
                this.isDoBlinkAni = false;
                this._compImg.visible = false;
            }
        }
        public showCardAni(cardValues: number[], isShowCard: boolean = true, sex?: number) {
            this.disBox.showCardAni(cardValues, isShowCard, sex);
        }
        public setAction(mask: PlayerActionMask) {
            this.action |= mask;
            this._waitingTip.visible = true;
            if (this.action & PlayerActionMask.LOSE) {
                this._tipLabel.text = GameLangs.zjhLoseTip;
                if (!(this.action & PlayerActionMask.LOOK)) {
                    this.disBox.setCardsGray();
                }
            } else if (this.action & PlayerActionMask.QI) {
                this._tipLabel.text = GameLangs.zjhQiTip;
                if (!(this.action & PlayerActionMask.LOOK)) {
                    this.disBox.setCardsGray();
                }
            } else if (this.action & PlayerActionMask.LOOK) {
                this._tipLabel.text = GameLangs.zjhLookTip;
            } else {
                this._waitingTip.visible = false;
            }
        }
        public set status(value: number) {
            egret.log("status:", value, this.playerId)
            if (this.status === value)
                return;
            var self = this;
            switch (value) {
                case PLAYER_UI_STATU.NONE:
                    self._waitingTip.visible = false;
                    self._betChipsBar.visible = false;
                    // self._proBar.visible = false;
                    self.stopTimer();
                    self.stopBlinkCompAni();
                    self._readyLb.visible = false;
                    self._tipImg.visible = false;
                    // self._clock.visible = self._timeLb.visible = false;

                    break;
                case PLAYER_UI_STATU.READY:
                    self._tipImg.visible = false;
                    self._readyLb.visible = true;
                    self._betChipsBar.visible = false;
                    self.stopTimer();
                    // self._clock.visible = self._timeLb.visible = false;
                    break;
                case PLAYER_UI_STATU.WAIT_READY:
                    self._tipImg.visible =
                        self._readyLb.visible = false;
                    self._betChipsBar.visible = false;
                    egret.log("WAIT_READY");
                    // self._clock.visible = self._timeLb.visible = true;
                    self.startTimer();
                    break;
                case PLAYER_UI_STATU.IDLE:
                    self._betChipsBar.visible = true;
                    self._waitingTip.visible = false;
                    self._readyLb.visible = false;
                    // self._proBar.visible = false;
                    self.stopBlinkCompAni();
                    self.stopTimer();
                    self.setTipLab();
                    break;
                case PLAYER_UI_STATU.WAIT:
                    egret.log("WAIT");
                    self.startTimer();
                    self._waitingTip.visible = true;
                    self._tipLabel.text = GameLangs.thinkTip;
                    // self._proBar.visible = true;
                    break;
            }
        }
        private setTipLab() {
            this._waitingTip.visible = true;
            if (this.action & PlayerActionMask.LOSE) {
                this._tipLabel.text = GameLangs.zjhLoseTip;
            } else if (this.action & PlayerActionMask.QI) {
                this._tipLabel.text = GameLangs.zjhQiTip;
            } else if (this.action & PlayerActionMask.LOOK) {
                this._tipLabel.text = GameLangs.zjhLookTip;
            } else {
                this._waitingTip.visible = false;
            }
        }
        public clear() {
            super.clear();
            this.reset();
            this.stopBlinkCompAni();
            this.visible = false;
            this.action = 0;
            // this._proBar.st
        }

        public addMessage(str: string, gameType?: number): boolean {
            if (super.addMessage(str, gameType)) {
                return true;
            }
            var bubble = this.bubble = new Bubble(GAME_ID.ZJH);
            bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
            // this.parent.addChildAt(bubble,this.parent.getChildIndex(this)+1);
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
                bubble.right = this.right + 90;
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

    }
}