var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zjh;
(function (zjh) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.call(this) || this;
            _this.isDoBlinkAni = false;
            _this.action = 0; //是否已经看牌了
            return _this;
        }
        Player.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._headBox.mask = this._roundMask;
        };
        Player.prototype.setBetChips = function (value) {
            this._betChipsBar.setBetChips(value);
        };
        Player.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.stopBlinkCompAni();
            this._proBar.stopTimer();
        };
        Player.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.status = 0 /* NONE */;
            this._dealerImg.visible = false;
            this.action = 0;
            this.disBox.reset();
            this.stopTimer();
        };
        Player.prototype.stopTimer = function () {
            // this._proBar.visible = false;
            // this._proBar.stopTimer();
            _super.prototype.stopTimer.call(this);
            this._gameTime.visible = false;
            this._timeLb.text = "15";
        };
        /**
         * 开启倒计时
         * @param countDown 倒计时时间
         */
        Player.prototype.startTimer = function (countDown) {
            if (countDown === void 0) { countDown = 15; }
            this.cTime.start(countDown);
            egret.log("startTimer1" + countDown, this.playerId);
            // this.
            // this._proBar.visible = true;
            // this._proBar.startTimer(15000);
            this._gameTime.visible = true;
        };
        Player.prototype.startBlinkCompAni = function () {
            if (this.isDoBlinkAni) {
                return;
            }
            this.isDoBlinkAni = true;
            this._blinkAni.play(0);
            this._compImg.visible = true;
        };
        Player.prototype.stopBlinkCompAni = function () {
            if (this.isDoBlinkAni) {
                this._blinkAni.stop();
                this.isDoBlinkAni = false;
                this._compImg.visible = false;
            }
        };
        Player.prototype.showCardAni = function (cardValues, isShowCard, sex) {
            if (isShowCard === void 0) { isShowCard = true; }
            this.disBox.showCardAni(cardValues, isShowCard, sex);
        };
        Player.prototype.setAction = function (mask) {
            this.action |= mask;
            this._waitingTip.visible = true;
            if (this.action & 1 /* LOSE */) {
                this._tipLabel.text = GameLangs.zjhLoseTip;
                if (!(this.action & 4 /* LOOK */)) {
                    this.disBox.setCardsGray();
                }
            }
            else if (this.action & 2 /* QI */) {
                this._tipLabel.text = GameLangs.zjhQiTip;
                if (!(this.action & 4 /* LOOK */)) {
                    this.disBox.setCardsGray();
                }
            }
            else if (this.action & 4 /* LOOK */) {
                this._tipLabel.text = GameLangs.zjhLookTip;
            }
            else {
                this._waitingTip.visible = false;
            }
        };
        Object.defineProperty(Player.prototype, "status", {
            set: function (value) {
                egret.log("status:", value, this.playerId);
                if (this.status === value)
                    return;
                var self = this;
                switch (value) {
                    case 0 /* NONE */:
                        self._waitingTip.visible = false;
                        self._betChipsBar.visible = false;
                        // self._proBar.visible = false;
                        self.stopTimer();
                        self.stopBlinkCompAni();
                        self._readyLb.visible = false;
                        self._tipImg.visible = false;
                        // self._clock.visible = self._timeLb.visible = false;
                        break;
                    case 2 /* READY */:
                        self._tipImg.visible = false;
                        self._readyLb.visible = true;
                        self._betChipsBar.visible = false;
                        self.stopTimer();
                        // self._clock.visible = self._timeLb.visible = false;
                        break;
                    case 1 /* WAIT_READY */:
                        self._tipImg.visible =
                            self._readyLb.visible = false;
                        self._betChipsBar.visible = false;
                        egret.log("WAIT_READY");
                        // self._clock.visible = self._timeLb.visible = true;
                        self.startTimer();
                        break;
                    case 3 /* IDLE */:
                        self._betChipsBar.visible = true;
                        self._waitingTip.visible = false;
                        self._readyLb.visible = false;
                        // self._proBar.visible = false;
                        self.stopBlinkCompAni();
                        self.stopTimer();
                        self.setTipLab();
                        break;
                    case 4 /* WAIT */:
                        egret.log("WAIT");
                        self.startTimer();
                        self._waitingTip.visible = true;
                        self._tipLabel.text = GameLangs.thinkTip;
                        // self._proBar.visible = true;
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.setTipLab = function () {
            this._waitingTip.visible = true;
            if (this.action & 1 /* LOSE */) {
                this._tipLabel.text = GameLangs.zjhLoseTip;
            }
            else if (this.action & 2 /* QI */) {
                this._tipLabel.text = GameLangs.zjhQiTip;
            }
            else if (this.action & 4 /* LOOK */) {
                this._tipLabel.text = GameLangs.zjhLookTip;
            }
            else {
                this._waitingTip.visible = false;
            }
        };
        Player.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.reset();
            this.stopBlinkCompAni();
            this.visible = false;
            this.action = 0;
            // this._proBar.st
        };
        Player.prototype.addMessage = function (str, gameType) {
            if (_super.prototype.addMessage.call(this, str, gameType)) {
                return true;
            }
            var bubble = this.bubble = new Bubble(10 /* ZJH */);
            bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
            // this.parent.addChildAt(bubble,this.parent.getChildIndex(this)+1);
            this.parent.addChild(bubble);
            if (!isNaN(this.left)) {
                if (isNaN(this.bottom)) {
                    bubble.left = this.left + 15;
                    bubble.verticalCenter = this.verticalCenter - this.height / 2 - 30;
                    bubble.currentState = "bottom_left";
                }
                else {
                    bubble.left = this.left + this.width / 8;
                    bubble.bottom = this.bottom + this.height + 8;
                    bubble.currentState = "bottom";
                }
            }
            else if (!isNaN(this.right)) {
                bubble.verticalCenter = this.verticalCenter - this.height / 2 - 30;
                bubble.right = this.right + 90;
                bubble.currentState = "bottom_right";
            }
            else if (this.horizontalCenter < 0) {
                bubble.horizontalCenter = this.horizontalCenter - this.width;
                bubble.top = this.top + 30;
                bubble.currentState = "right";
            }
            else if (this.horizontalCenter > 0) {
                bubble.horizontalCenter = this.horizontalCenter + this.width;
                bubble.top = this.top + 30;
                bubble.currentState = "left";
            }
            else {
                bubble.horizontalCenter = 0;
                bubble.top = this.top + this.height + 30;
                bubble.currentState = "top";
            }
            this.showMsg();
        };
        return Player;
    }(PlayerBase));
    zjh.Player = Player;
    __reflect(Player.prototype, "zjh.Player");
})(zjh || (zjh = {}));
//# sourceMappingURL=Player.js.map