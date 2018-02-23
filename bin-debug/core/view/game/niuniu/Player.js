var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var niuniu;
(function (niuniu) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            return _super.call(this) || this;
        }
        Player.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._headBox.mask = this._roundMask;
        };
        /**
         * type 0表示显示抢庄提示,1表示显示投注提示
         */
        Player.prototype.showTip = function (value, type, gameType) {
            this._tipImg.visible = true;
            this._readyLb.visible = false;
            if (type === 0) {
                if (value === 0) {
                    this._tipImg.source = "buqian_yishutext2_png";
                }
                else {
                    // if (gameType === GAME_TYPE.COIN) {
                    this._tipImg.source = value + "bei_yishutext2_png";
                }
            }
            else {
                this._tipImg.source = "label_g_x" + value + "_png";
            }
        };
        /**
         * 清理所有的动画
         */
        Player.prototype.clearAllAni = function () {
            // if (this.aniMoneyLabel) {
            //     egret.Tween.removeTweens(this.aniMoneyLabel);
            // }
            // if (this.aniTimer) {
            //     egret.clearInterval(this.aniTimer);
            //     this.aniTimer = null;
            // }
            // egret.Tween.removeTweens(this._aniImg);
            this.disBox.clearAllAni();
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
            this._dealerImg.visible = false;
            this.stopTimer();
            // this.reSetTimer(this.count_down);
            // this._aniImg.source = "mj_head_ani_box0_png";
            // this._aniImg.visible = false;
        };
        /**
        * 设置庄家icon
        */
        Player.prototype.setDealerIcon = function (visible) {
            this._dealerImg.visible = this._tipImg.visible = visible;
            if (this._tipImg.source == "buqian_yishutext2_png") {
                this._tipImg.source = "1bei_yishutext2_png";
            }
            ;
        };
        Player.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.reset();
            this.visible = false;
        };
        Player.prototype.addMessage = function (str, gameType) {
            if (_super.prototype.addMessage.call(this, str, gameType)) {
                return true;
            }
            var bubble = this.bubble = new Bubble(1 /* NIUNIU */);
            bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
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
                bubble.right = this.right + 10;
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
        Object.defineProperty(Player.prototype, "status", {
            set: function (value) {
                if (this.status === value)
                    return;
                var self = this;
                switch (value) {
                    case 0 /* NONE */:
                        self._readyLb.visible = false;
                        self._tipImg.visible = false;
                        self._clock.visible = self._timeLb.visible = false;
                        self.stopTimer();
                        break;
                    case 2 /* READY */:
                        self._tipImg.visible = false;
                        self._readyLb.visible = true;
                        self.startTimer();
                        self._clock.visible = self._timeLb.visible = false;
                        break;
                    case 1 /* WAIT_READY */:
                        self._tipImg.visible =
                            self._readyLb.visible = false;
                        self._clock.visible = self._timeLb.visible = true;
                        self.startTimer();
                        break;
                    case 3 /* IDLE */:
                        self._tipImg.visible =
                            self._readyLb.visible = false;
                        self._clock.visible = self._timeLb.visible = true;
                        self.stopTimer();
                        break;
                    case 4 /* WAIT */:
                        self.startTimer();
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        return Player;
    }(PlayerBase));
    niuniu.Player = Player;
    __reflect(Player.prototype, "niuniu.Player");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=Player.js.map