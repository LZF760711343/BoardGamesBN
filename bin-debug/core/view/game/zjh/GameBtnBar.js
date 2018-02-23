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
    function changeNumber(num, gameType) {
        var str;
        if (num >= 10000) {
            str = (num / 10000) + GameLangs.wan;
        }
        else if (num >= 1000) {
            str = (num / 1000) + GameLangs.qian;
        }
        else {
            str = num + "";
        }
        // if (gameType === GAME_TYPE.COIN) {
        // 	str += GameLangs.fen;
        // }
        return str;
    }
    zjh.changeNumber = changeNumber;
    var GameBtnBar = (function (_super) {
        __extends(GameBtnBar, _super);
        function GameBtnBar(betChips) {
            return _super.call(this) || this;
        }
        GameBtnBar.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            //移除事件
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        };
        GameBtnBar.prototype.onTouchBtnJia = function () {
            // egret.log("onTouchBtnJia")
            this.chipsGroup.visible = !this.chipsGroup.visible;
        };
        GameBtnBar.prototype.setBtnJiaGroupVisible = function (value) {
            this.chipsGroup.visible = value;
        };
        GameBtnBar.prototype.initChipsBtns = function (betList, gameType) {
            //把childrenCreated的移到这边来，以便创建动态加注按钮
            var btnLayout = new eui.HorizontalLayout();
            btnLayout.gap = 40;
            this.group_btn.layout = btnLayout;
            for (var i = 0; i < betList.length; i++) {
                var btn = new UI.CommonBtn();
                btn.skinName = "zjh.ChipsBtnSkin";
                btn.bgStr = "zjh_chouma_" + (i + 1) + "_png";
                // btn.width = btn.skin.width;
                // btn.height = btn.skin.height;
                this.group_btn.addChild(btn);
                console.log("betList长度", betList.length);
                //设置按钮背景的宽度
                if (i == betList.length - 1) {
                    this.btnBg.width = (74 + btnLayout.gap) * (betList.length) + btnLayout.gap;
                }
            }
            this.chipsBtnList = [];
            var arrLen1 = this.group_btn.numChildren;
            for (var i = 0; i < arrLen1; i++) {
                var btn = this.group_btn.getChildAt(i);
                if (btn instanceof UI.CommonBtn) {
                    this.chipsBtnList.push(btn);
                }
            }
            this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnJia, this);
            //------------------------------------------------
            var arrLen = betList.length;
            for (var i = 0; i < arrLen; i++) {
                this.chipsBtnList[i].icon = changeNumber(betList[i], gameType);
                this.chipsBtnList[i].data = betList[i];
                this.chipsBtnList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChipsBtn, this);
            }
        };
        GameBtnBar.prototype.onTouchChipsBtn = function (event) {
            this.dispatchEventWith(GameBtnBar.ADD_CHIPS, false, event.target.data);
            this.chipsGroup.visible = false;
        };
        /**
         * 刷新加注按钮的状态
         * @param curBet:当前的底注,如果小于当前底注的将按钮变成不可触摸
         * @param selfChips:当前自己剩下的筹码,如果下注的筹码额度大于自己的剩下的筹码,将按钮变成不可触摸
         */
        GameBtnBar.prototype.updateChipsGroup = function (curBet, selfChips) {
            var arrLen = this.chipsBtnList.length;
            for (var i = 1; i < arrLen; i++) {
                this.chipsBtnList[i].enabled = this.chipsBtnList[i].data > curBet && this.chipsBtnList[i].data < selfChips;
            }
        };
        GameBtnBar.prototype.onExit = function () {
            this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnJia, this);
            //移除筹码事件
            for (var i = 0; i < this.chipsBtnList.length; i++) {
                this.chipsBtnList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChipsBtn, this);
            }
        };
        return GameBtnBar;
    }(eui.Component));
    zjh.GameBtnBar = GameBtnBar;
    __reflect(GameBtnBar.prototype, "zjh.GameBtnBar");
})(zjh || (zjh = {}));
//# sourceMappingURL=GameBtnBar.js.map