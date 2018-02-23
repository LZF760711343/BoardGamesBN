var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayerBase = (function (_super) {
    __extends(PlayerBase, _super);
    function PlayerBase() {
        var _this = _super.call(this) || this;
        _this._isShowTimer = true;
        _this.msg_list = [];
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onExit, _this);
        _this.cTime = new CoolTime(1000);
        _this.cTime.addCallBack(_this.onTimer, _this);
        return _this;
    }
    /**
     * 将筹码图标设置为金币
     */
    PlayerBase.prototype.setChipIcon = function (source) {
        this._chipIcon.source = source;
    };
    PlayerBase.prototype.setIsShowTimer = function (value) {
        this._isShowTimer = value;
    };
    PlayerBase.prototype.reset = function () {
        if (this._guajiImg) {
            this._guajiImg.visible = false;
        }
    };
    PlayerBase.prototype.setFrameAniVisible = function (value) {
        this._frameAni.visible = value;
    };
    PlayerBase.prototype.onTimer = function (time) {
        this._timeLb.text = "" + time;
        if (time < 1) {
            egret.Event.dispatchEvent(this, game.GameEvent.DOWN_COUNT_COMPLETE);
        }
    };
    PlayerBase.prototype.stopTimer = function () {
        this.cTime.stop();
    };
    /**
     * 开启倒计时
     * @param countDown 倒计时时间
     */
    PlayerBase.prototype.startTimer = function (countDown) {
        if (countDown === void 0) { countDown = 20; }
        this.cTime.start(countDown);
    };
    PlayerBase.prototype.playDealerAniCb = function () {
        this._frameAni.source = "mj_head_ani_box0_png";
        this._frameAni.visible = false;
        this.pay.play(0);
    };
    PlayerBase.prototype.clear = function () {
        if (this._guajiImg) {
            this._guajiImg.visible = false;
        }
    };
    PlayerBase.prototype.playDealerAni = function (callBack, thisObj) {
        SoundManage.playEffect("nnDealerReady");
        egret.log("this.playerId:", this.playerId);
        this._frameAni.start(2);
        if (callBack) {
            this._frameAni.once(egret.Event.COMPLETE, callBack, thisObj);
        }
        // this._frameAni
        // var curIndex = 1;
        // this._aniImg.source = "kuang_00000_png";
        // var count = 0;
        // SoundManage.playEffect("nnDealerReady");
        // this.aniTimer = egret.setInterval(() => {
        //     this._aniImg.source = `kuang_0000${curIndex}_png`;
        //     curIndex++;
        //     if (curIndex >= 10) {
        //         curIndex = 0;
        //         count++;
        //         if (count > 3) {
        //             this._aniImg.source = "mj_head_ani_box0_png";
        //             this._aniImg.visible = false;
        //             egret.clearInterval(this.aniTimer);
        //             this.aniTimer = null;
        //             if (callBack) {
        //                 callBack.call(target);
        //             }
        //         }
        //     }
        // }, this, 1000 / 24);
    };
    /**
     * 获取头像的中心点
     */
    PlayerBase.prototype.getHeadPos = function () {
        return egret.Point.create(this.x + this._headBox.width / 2 + this._headBox.x, this.y + this._headBox.height / 2 + this._headBox.y);
    };
    /**
     * 设置庄家icon
     */
    PlayerBase.prototype.setDealerIcon = function (visible) {
        this._dealerImg.visible = visible;
    };
    /**
     * 设置头像上的离线标识
     */
    PlayerBase.prototype.setOffTip = function () {
        this._headBox.setOffTip();
    };
    /**
     * 移除头像上的离线标识
     */
    PlayerBase.prototype.removeOffTip = function () {
        this._headBox.removeOffTip();
    };
    /**
     * 播放结算飘字动画
     */
    PlayerBase.prototype.doEndAni = function (money) {
        var lab = this.aniMoneyLb;
        if (!lab) {
            this.aniMoneyLb = lab = new eui.BitmapLabel();
            //lab.width = 130;
            var point_1 = egret.Point.create(0, 0);
            this.localToGlobal((this._bg.width - lab.width) / 2, 0, point_1);
            lab.x = point_1.x;
            egret.Point.release(point_1);
            lab.textAlign = "left";
        }
        if (money > 0) {
            lab.text = "+" + this.formatMoney(money);
            lab.font = "AddNum_fnt";
        }
        else {
            lab.text = "" + this.formatMoney(money);
            lab.font = "SubNum_fnt";
        }
        lab.y = 50;
        var point = egret.Point.create(0, 0);
        this.localToGlobal(0, lab.y, point);
        lab.letterSpacing = -7;
        lab.x = point.x;
        lab.y = point.y;
        lab.height = 24;
        this.parent.addChild(lab);
        //如果label长度超出界面(当前的的玩家面板是在最右面时)，调整x的位置（靠在当前视图最右面）
        // egret.log("当前play的加上文本的整体位置为："+(this.x + lab.width + 194.5));
        if (this.x > 900) {
            // egret.log("当前player位置："+this.x + "；当前宽度："+lab.width+";窗口的宽度："+this.stage.width+";"+"超出范围："+(this.x + lab.width - this.stage.width)+";当前lab的的x："+lab.x+";测试宽度："+lab.measuredWidth);
            // lab.x = lab.x - (this.x + lab.width - this.stage.width);
            lab.right = 10;
        }
        lab.alpha = 1;
        var tween = egret.Tween.get(lab).to({ y: point.y - 90 }, 2500).to({ alpha: 0 }, 500).call(this.finishedCallback, this);
        egret.Point.release(point);
        return tween;
    };
    PlayerBase.prototype.formatMoney = function (money) {
        // let newMoney:string = money.toString();
        // egret.log("newMoney="+newMoney);
        // // let tempMoney:number = money;
        // let number = Math.floor(Math.abs(money)/1000);
        // egret.log("number="+number);
        // // let numberStr = number.toString();
        // if(number > 0 ){
        //     newMoney = newMoney.substring(0,newMoney.length-3) +"," + newMoney.substring(newMoney.length-3,newMoney.length);
        // 	egret.log("newMoney1="+newMoney);
        //     if(number>=10000){
        //         newMoney = newMoney.substring(0,newMoney.length-8) +"," + newMoney.substring(newMoney.length-8,newMoney.length);
        // 		egret.log("newMoney2="+newMoney);
        //     } 
        // }
        // return newMoney;
        // /[-+]?(\d)(?=(?:\d{3})+$)/g;
        //n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var reg = /(\d)(?=(?:\d{3})+$)/g;
        return money.toString().replace(reg, '$1,');
    };
    PlayerBase.prototype.finishedCallback = function () {
        if (this.aniMoneyLb && this.aniMoneyLb.parent)
            this.aniMoneyLb.parent.removeChild(this.aniMoneyLb);
    };
    PlayerBase.prototype.onExit = function () {
        this.stopTimer();
    };
    PlayerBase.prototype.updateChips = function (value, isDoAni) {
        // egret.log("updateChipsupdateChips+"+value);
        if (this._chipsLb) {
            if (value > 100000) {
                this._chipsLb.text = Math.floor(value / 10000) + GameLangs.wan;
            }
            else {
                this._chipsLb.text = value + "";
            }
        }
        if (isDoAni) {
            this.doEndAni(value - this.chips);
        }
        this.chips = value;
    };
    PlayerBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchChildren = false;
        if (this._frameAni) {
            this._frameAni.init("mj_head_ani_box$1_png", 1);
            this._frameAni.addEventListener(egret.Event.COMPLETE, this.playDealerAniCb, this);
        }
    };
    PlayerBase.prototype.setPlayerId = function (id) {
        this.playerId = id;
    };
    PlayerBase.prototype.getPlayerId = function () {
        return this.playerId;
    };
    PlayerBase.prototype.addMsg = function (str, type, gameType) {
        // this.msg_list.push({ type: type, info: str, gameType: gameType });
        // if (this.bubble) {
        //     return true;
        // }
        // var bubble = this.bubble = new Bubble();
        // bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
        // this.parent.addChild(bubble);
        return false;
    };
    PlayerBase.prototype.updateInfo = function (playerDto) {
        this._nameLb.text = Utils.subString(playerDto.nickName, 6);
        this.sex = playerDto.sex;
        this._headBox.setIcon(playerDto.headImages);
        this.playerId = playerDto.id;
        if (this._guajiImg) {
            this._guajiImg.visible = false;
        }
        this.removeOffTip();
        // this._chipsLb 
        // this.updateChips(playerDto.gold,false);
    };
    PlayerBase.prototype.destroy = function () {
        if (this._frameAni) {
            this._frameAni.stop();
        }
    };
    ////////////////////////////////////
    PlayerBase.prototype.addMessage = function (str, gameid) {
        this.msg_list.push({ info: str, gameId: gameid });
        egret.log("msg_list", this.msg_list);
        if (this.bubble) {
            return true;
        }
        // var bubble = this.bubble = new Bubble(0);
        // bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
        // this.parent.addChild(bubble);
        return false;
        //        bubble.msg_list = this.msg_list;
    };
    PlayerBase.prototype.showMsg = function () {
        egret.log("this.msg_list" + this.msg_list + "HHHH" + this.msg_list.length + "OOOOOO");
        var msg = this.msg_list.shift();
        // egret.log("msg::::", msg);
        if (msg) {
            this.bubble.parseMsg(msg);
        }
        else {
            if (this.bubble && this.bubble.parent) {
                this.bubble.parent.removeChild(this.bubble);
            }
            this.bubble = null;
        }
    };
    PlayerBase.prototype.clearMsg = function () {
        this.msg_list.length = 0;
        if (this.bubble) {
            this.removeChild(this.bubble);
            this.bubble = null;
            egret.Tween.removeTweens(this.bubble);
            return;
        }
    };
    return PlayerBase;
}(eui.Component));
__reflect(PlayerBase.prototype, "PlayerBase");
//# sourceMappingURL=PlayerBase.js.map