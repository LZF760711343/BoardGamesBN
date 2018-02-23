abstract class PlayerBase extends eui.Component {

    // 显示框
    public _roundMask: eui.Rect;
    //庄家标志
    protected _dealerImg: eui.Image;
    protected _bg: eui.Image;
    protected _readyLb: eui.Image;
    //头像框
    public _headBox: UI.HeadBox;
    //昵称
    public _nameLb: eui.Label;
    //筹码数
    public _chipsLb: eui.Label;

    protected _tipImg: eui.Image;
    //结束时,飘字动画节点
    protected aniMoneyLb: eui.BitmapLabel;
    // public mx: number;
    // public my: number;
    public playerId: number;
    protected cTime: CoolTime;
    //聊天消息列表
    // protected msg_list: ChatMsg[];
    public sex: number;
    /**
     * 玩家在UI上对应的位置
     */
    public pos: number;
    //聊天气泡
    public bubble: Bubble;
    //播抢庄动画的图片
    protected _frameAni: Effect.FrameAni;
    protected pay: egret.tween.TweenGroup;
    protected aniTimer: number;
    public chips: number;
    protected _isShowTimer: boolean = true;
    //挂机头像
    public _guajiImg: eui.Image;
    /**
     * 筹码图标,在金币场是金币,在房卡模式是分
     */
    private _chipIcon: eui.Image;
    public status;


    //聊天消息列表
    protected msg_list: ChatMsg[];
    /**
     * 倒计时label
     */
    protected _timeLb: eui.BitmapLabel;

    /**
     * 闹钟图标
     */
    protected _clock: eui.Image;
    public constructor() {
        super();

        this.msg_list = [];
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        this.cTime = new CoolTime(1000);
        this.cTime.addCallBack(this.onTimer, this);
    }
    /**
     * 将筹码图标设置为金币
     */
    public setChipIcon(source: string) {
        this._chipIcon.source = source;
    }
    public setIsShowTimer(value: boolean) {
        this._isShowTimer = value;
    }
    public reset(): void {
        if (this._guajiImg) {
            this._guajiImg.visible = false
        }
    }
    public setFrameAniVisible(value: boolean) {
        this._frameAni.visible = value;
    }
    protected onTimer(time: number): void {
        this._timeLb.text = "" + time;
        if (time < 1) {
            egret.Event.dispatchEvent(this, game.GameEvent.DOWN_COUNT_COMPLETE);
        }
    }
    public stopTimer() {
        this.cTime.stop();
    }
    /**
     * 开启倒计时
     * @param countDown 倒计时时间
     */
    protected startTimer(countDown: number = 20) {
        this.cTime.start(countDown);
    }
    protected playDealerAniCb() {
        this._frameAni.source = "mj_head_ani_box0_png";
        this._frameAni.visible = false;
        this.pay.play(0);
    }
    public clear() {
        if (this._guajiImg) {
            this._guajiImg.visible = false
        }
    }
    public playDealerAni(callBack: Function, thisObj: Object) {
        SoundManage.playEffect("nnDealerReady");
        egret.log("this.playerId:", this.playerId)
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
    }
    /**
     * 获取头像的中心点
     */
    public getHeadPos() {
        return egret.Point.create(this.x + this._headBox.width / 2 + this._headBox.x, this.y + this._headBox.height / 2 + this._headBox.y);
    }
    /**
     * 设置庄家icon
     */
    public setDealerIcon(visible: boolean): void {
        this._dealerImg.visible = visible;
    }
    /**
     * 设置头像上的离线标识
     */
    public setOffTip(): void {
        this._headBox.setOffTip();
    }
    /**
     * 移除头像上的离线标识
     */
    public removeOffTip(): void {
        this._headBox.removeOffTip();
    }
    /**
     * 播放结算飘字动画
     */
    public doEndAni(money): egret.Tween {
        var lab = this.aniMoneyLb;
        if (!lab) {
            this.aniMoneyLb = lab = new eui.BitmapLabel();
            //lab.width = 130;
            let point = egret.Point.create(0, 0);
            this.localToGlobal((this._bg.width - lab.width) / 2, 0, point);
            lab.x = point.x;
            egret.Point.release(point);
            lab.textAlign = "left";
        }
        if (money > 0) {
            lab.text = "+" + this.formatMoney(money);
            lab.font = "AddNum_fnt";
        } else {
            lab.text = "" + this.formatMoney(money);
            lab.font = "SubNum_fnt";
        }
        lab.y = 50;

        let point = egret.Point.create(0, 0);
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
        let tween = egret.Tween.get(lab).to({ y: point.y - 90 }, 2500).to({ alpha: 0 }, 500).call(this.finishedCallback, this);
        egret.Point.release(point);
        return tween;
    }

    private formatMoney(money: number): string {
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

    }

    private finishedCallback() {
        if (this.aniMoneyLb && this.aniMoneyLb.parent)
            this.aniMoneyLb.parent.removeChild(this.aniMoneyLb)
    }
    protected onExit() {
        this.stopTimer();
    }
    public updateChips(value: number, isDoAni?: boolean) {
        // egret.log("updateChipsupdateChips+"+value);
        if (this._chipsLb) {
            if (value > 100000) {
                this._chipsLb.text = Math.floor(value / 10000) + GameLangs.wan;
            } else {
                this._chipsLb.text = value + "";
            }
        }
        if (isDoAni) {
            this.doEndAni(value - this.chips);
        }
        this.chips = value;
    }
    protected childrenCreated(): void {
        super.childrenCreated();
        this.touchChildren = false;
        if (this._frameAni) {
            this._frameAni.init("mj_head_ani_box$1_png", 1);

            this._frameAni.addEventListener(egret.Event.COMPLETE, this.playDealerAniCb, this);
        }
    }
    public setPlayerId(id: number): void {
        this.playerId = id;
    }
    public getPlayerId(): number {
        return this.playerId;
    }
    public addMsg(str: string, type: number, gameType?: number): boolean {
        // this.msg_list.push({ type: type, info: str, gameType: gameType });
        // if (this.bubble) {
        //     return true;
        // }
        // var bubble = this.bubble = new Bubble();
        // bubble.addEventListener(EVENT_DEFINE.MSG_SHOW_COMPLETE, this.showMsg, this);
        // this.parent.addChild(bubble);
        return false;
    }
    public updateInfo(playerDto: model.PlayerDto): void {
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
    }
    public destroy() {
        if (this._frameAni) {
            this._frameAni.stop();
        }
    }


    ////////////////////////////////////
    protected addMessage(str: string, gameid?: number): boolean {
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
    }
    protected showMsg(): void {
        egret.log("this.msg_list" + this.msg_list + "HHHH" + this.msg_list.length + "OOOOOO");
        var msg = this.msg_list.shift();
        // egret.log("msg::::", msg);
        if (msg) {
            this.bubble.parseMsg(msg);
        } else {
            if (this.bubble && this.bubble.parent) {
                this.bubble.parent.removeChild(this.bubble);
            }
            this.bubble = null;
        }
    }
    public clearMsg(): void {
        this.msg_list.length = 0;
        if (this.bubble) {
            this.removeChild(this.bubble);
            this.bubble = null;
            egret.Tween.removeTweens(this.bubble);
            return;
        }
    }

}
