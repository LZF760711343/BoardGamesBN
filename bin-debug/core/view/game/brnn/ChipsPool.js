var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 百人牛牛的筹码池
 */
var niuniu;
(function (niuniu) {
    var brnn;
    (function (brnn) {
        var ChipsPool = (function (_super) {
            __extends(ChipsPool, _super);
            function ChipsPool() {
                var _this = _super.call(this) || this;
                _this.bgStr = "";
                /**
                 * 筹码列表
                 */
                _this.chipsImgList = [];
                _this._point = egret.Point.create(0, 0);
                return _this;
            }
            ChipsPool.prototype.updataChipsLb = function (MyValue, Allvalue) {
                // if (MyValue == 0)
                // 	this._allChipsLb.text = GameLangs.betTip3.format(MyValue / 10000, Allvalue / 10000);
                // else {
                // 	//使用富文本
                // 	this._allChipsLb.textFlow = (new egret.HtmlTextParser).parser("<font color='#ffe289'>$1万</font>/$2万".format(MyValue / 10000, Allvalue / 10000));
                // }
                this._allChipsLb.textFlow = (new egret.HtmlTextParser).parser("<font color='#ffe289'>$1<font style='font-size:25px;'>万</font></font>/$2<font style='font-size:25px;'>万</font>".format(MyValue / 10000, Allvalue / 10000));
            };
            ChipsPool.prototype.PlaySendCardAni = function (layer, cardIndex, cardValue, isSetIcon) {
                return this._disBox.PlaySendCardAni(layer, cardIndex, cardValue, isSetIcon);
            };
            ChipsPool.prototype.setIsSitDown = function (isSitDown) {
                this._isSitDown = isSitDown;
                // this.updateSelfChipsLb(this._selfChip);
            };
            /**
             * 更新自己输赢的筹码数
             * @param value:输赢的数值
             */
            ChipsPool.prototype.updateAccountChipsLb = function (value) {
                // this._accountChipsLb.text = GameLangs.accountTip.format(value);
            };
            ChipsPool.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                this.touchChildren = false;
                // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                // this.boxMove.addEventListener('complete', this.boxMoveComplete, this);
            };
            /**
             * 重置这个控件,在游戏重新开局的时候调用
             */
            ChipsPool.prototype.reset = function () {
                this._group.y = 260;
                this._disBox.reset();
                this._disBox.visible = false;
                this.updataChipsLb(0, 0);
                // this.updateAllChipsLb(0);
                this.updateAccountChipsLb(0);
                var arrLen = this.chipsImgList.length;
                for (var i = 0; i < arrLen; i++) {
                    // this._chipLayer.removeChild(this.chipsImgList[i]);
                    this.chipsImgList[i].destroy();
                }
                this.chipsImgList = [];
            };
            ChipsPool.prototype.HideCard = function () {
                return this._disBox.HideCard();
            };
            /**
             * 播放移动下注信息框的动画
             */
            ChipsPool.prototype.boxMoveComplete = function () {
                if (this._finishFunc) {
                    this._finishFunc();
                }
            };
            /**
             * 播放开牌动画
             */
            ChipsPool.prototype.doShowCardAni = function (data, selfmoney) {
                return this._disBox.doShowCardAni(data, selfmoney);
            };
            //-- 计算牌形
            ChipsPool.prototype.calHandValue = function (handvalue) {
                var handType = (handvalue >> 12) & 0xf;
                if (handType == 2 /* NIUX */) {
                    var value = (handvalue >> 8) & 0xf;
                    handType = handType + "" + value;
                }
                return handType;
            };
            ChipsPool.prototype.playChisAui = function (data) {
                // egret.log("datadata", data);
                // return new Promise((finishFunc: Function) => {
                //当前没人投筹码到筹码池里，其data.chipsPoolInfo.win_chips会不存在
                if (!data) {
                    // this._play.play(0);
                    this._shangguang.visible = true;
                    this._shangguang.curState = brnn.SCPSStatu.SHANG;
                }
                // })
            };
            /**
             * 播放将下注信息框移开的动画
             */
            ChipsPool.prototype.playMoveBoxAni = function () {
                var _this = this;
                return new Promise(function (finishFunc) {
                    _this._finishFunc = finishFunc;
                    // this.boxMove.play(0);
                });
            };
            ChipsPool.prototype.destroy = function () {
                this._finishFunc = null;
                // this.boxMove.stop();
                this._disBox.destroy();
                if (this._point) {
                    egret.Point.release(this._point);
                    this._point = null;
                }
                var arrLen = this.chipsImgList.length;
                for (var i = 0; i < arrLen; i++) {
                    // this._chipLayer.removeChild(this.chipsImgList[i]);
                    this.chipsImgList[i].destroy();
                }
            };
            ChipsPool.prototype.onTouchTap = function () {
                // this.boxMove.play(0);
            };
            ChipsPool.prototype.addChipAni = function (player, chipsID, chipNum, chips, srcId) {
                // var chip = new Chip(chipsID, true, chipNum);
                var chip = Chip.create(chips, true, chipNum);
                this._chipLayer.addChild(chip);
                //设置中点
                // chip.anchorOffsetX = this.width/2;
                // chip.anchorOffsetY = this.height/2;
                var DesX;
                var DesY;
                //尽量控制落点在中间
                DesX = (this.width - chip.width) * ((Math.random() * 10.5) / 10); //0.0-1.05
                DesY = (this.height - chip.height) * ((Math.random() * 9) / 10); //0.0-0.9
                // DesX = (this._bg.width - chip.width) * Math.random();
                // DesY = (this._bg.height - chip.height) * Math.random();
                // if (player instanceof Player) { //若是场内玩家，传入的是游戏玩家面板
                // 	// this.globalToLocal(player.x, player.y, this._point);
                // 	chip.srcId = player.playerId;
                // } else {
                // 	// this.globalToLocal(20, 500, this._point);
                // 	chip.srcId = 8;//场外玩家
                // }
                chip.srcId = srcId;
                this.globalToLocal(player.x, player.y, this._point);
                chip.x = this._point.x;
                chip.y = this._point.y;
                chip.srcPoint.x = this._point.x;
                chip.srcPoint.y = this._point.y;
                this.chipsImgList.push(chip);
                // if(chipNum>4){
                // 	chip.anchorOffsetX = chip.width/2;
                // 	chip.anchorOffsetY = chip.height/2;
                // 	chip.rotation = Math.floor(Math.random() * 10) / 2 > 0 ? (Math.random() * 30) : (Math.random() * -30);
                // }
                chip.FlyTo(DesX, DesY);
            };
            ChipsPool.prototype.PlayFlyChip = function (isWin, rewardRate) {
                // let arrlen = this.chipsImgList.length;
                //如果该筹码池赢了,按赢的倍率创建筹码数
                if (rewardRate > 0) {
                    // Chip.createChips();
                    //飞到某个位置的筹码如果抽过这个大小,就不创建额外的筹码了
                    var maxCount = 20;
                    //记录飞的筹码的数量
                    var chipCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    var len = this.chipsImgList.length;
                    for (var i_1 = 0; i_1 < len; i_1++) {
                        var chip = this.chipsImgList[i_1];
                        chipCounts[chip.srcId]++; //计算飞到各个位置筹码的个数
                    }
                    for (var i_2 = 0; i_2 < len; i_2++) {
                        var chip = this.chipsImgList[i_2];
                        if (chip.srcId != 8) {
                            for (var j = 0; j < rewardRate; j++) {
                                if (chipCounts[chip.srcId] < maxCount) {
                                    chipCounts[chip.srcId]++;
                                    var tempChip = chip.copy();
                                    tempChip.x = (this.width - tempChip.width) * ((Math.random() * 10.5) / 10); //0.0-1.05
                                    tempChip.y = (this.height - tempChip.height) * ((Math.random() * 9) / 10); //0.0-0.9
                                    this.chipsImgList.push(tempChip);
                                    this._chipLayer.addChild(tempChip);
                                }
                            }
                        }
                    }
                }
                var arrlen = this.chipsImgList.length;
                /** 筹码飞行到指定区域间隔 0-7是玩家面板，8是场外玩家，9是庄家 */
                var CHIP_BACK_DELAYS_TIME = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var i = 0; i < arrlen; i++) {
                    var chip = this.chipsImgList[i];
                    //间隔计算
                    //		let delay = Math.abs(Math.sqrt(Math.pow((chip.x - chip.srcPoint.x),2)+Math.pow((chip.y-chip.srcPoint.y),2)))*ChipsPool.CHIP_BACK_DELAY_POINT;
                    chip.FlyBack(CHIP_BACK_DELAYS_TIME[chip.srcId], ChipsPool.CHIP_BACK_TIME, !isWin);
                    CHIP_BACK_DELAYS_TIME[chip.srcId] += ChipsPool.CHIP_BACK_DELAY_TIME;
                }
            };
            return ChipsPool;
        }(eui.Component));
        /** 筹码返回时间 */
        ChipsPool.CHIP_BACK_TIME = 300;
        /** 筹码之间的间隔(自己算) */
        ChipsPool.CHIP_BACK_DELAY_TIME = 20;
        /** 间隔系数 */
        ChipsPool.CHIP_BACK_DELAY_POINT = 10;
        brnn.ChipsPool = ChipsPool;
        __reflect(ChipsPool.prototype, "niuniu.brnn.ChipsPool");
        var pool = [];
        var Chip = (function (_super) {
            __extends(Chip, _super);
            function Chip(chips, b, chipNum) {
                var _this = _super.call(this) || this;
                _this.srcPoint = egret.Point.create(0, 0);
                _this.point = egret.Point.create(0, 0);
                _this.img = new eui.Image();
                _this.img.horizontalCenter = _this.img.verticalCenter = 0;
                _this.lable = new eui.BitmapLabel();
                _this.lable.font = "zjhChips_fnt";
                _this.lable.horizontalCenter = 0;
                _this.lable.verticalCenter = -8;
                _this.height = _this.img.height = 87;
                _this.width = _this.img.width = 77;
                _this.addChild(_this.img);
                _this.addChild(_this.lable);
                _this.init(chipNum, chips);
                return _this;
            }
            Chip.prototype.copy = function () {
                var chip = Chip.create(this.chips, false, this._chipNum);
                chip.srcId = this.srcId;
                chip.srcPoint.x = this.srcPoint.x;
                chip.srcPoint.y = this.srcPoint.y;
                return chip;
            };
            Chip.prototype.init = function (chipNum, chips) {
                this._chipNum = chipNum;
                this.chips = chips;
                // this.source = `cm_${chipNum}_png`;
                var newGold = "";
                if (chips >= 10000) {
                    newGold = Math.floor(chips / 10000) + GameLangs.wan;
                }
                else {
                    newGold = chips.toString();
                }
                this.lable.text = newGold;
                // this.img.source = `zjh_chouma_${chipNum}_png`;
                //调整100w，500w的大小不缩放
                if (chipNum < 5) {
                    //随机旋转
                    // this.rotation = Math.random() * 3600;
                    if (chipNum == 1) {
                        this.img.source = "1w_hzcm1_png";
                    }
                    else {
                        this.img.source = "zjh_chouma_" + chipNum + "_png";
                    }
                    this.height = this.img.height = 87;
                    this.width = this.img.width = 77;
                    this.scaleX = 0.8;
                    this.scaleY = 0.8;
                }
                else {
                    this.lable.text = "";
                    this.height = this.img.height = 48;
                    this.width = this.img.width = 95;
                    this.scaleX = this.scaleY = 1;
                    // this.anchorOffsetX = this.width/2;
                    // this.anchorOffsetY = this.height/2;
                    this.img.source = "cm_4_png";
                    //随机旋转+30~-30
                    this.rotation = Math.floor(Math.random() * 10) / 2 > 0 ? (Math.random() * 30) : (Math.random() * -30);
                }
            };
            Chip.create = function (chips, b, chipNum) {
                var chipsObj;
                true && egret.log("chipsObj cache count:" + pool.length);
                if (pool.length) {
                    chipsObj = pool.pop();
                    chipsObj.init(chipNum, chips);
                }
                else {
                    chipsObj = new Chip(chips, b, chipNum);
                }
                return chipsObj;
            };
            Chip.prototype.destroy = function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                    pool.push(this);
                }
                egret.Tween.removeTweens(this);
            };
            Chip.prototype.changeNumber = function (num) {
                var str;
                if (num > 10000) {
                    str = (num / 10000) + GameLangs.wan;
                }
                else if (num > 1000) {
                    str = (num / 1000) + GameLangs.qian;
                }
                else {
                    str = num + "";
                }
                return str;
            };
            /**
             * //从当前位置飞向目标位置（传进来的参数为全局坐标）
             */
            Chip.prototype.FlyTo = function (DesX, DesY, delay, time) {
                if (delay === void 0) { delay = 0; }
                if (time === void 0) { time = 300; }
                return egret.Tween.get(this).wait(delay).to({ x: DesX, y: DesY }, 300).call(this.flyFinish, this);
            };
            /**
             * 筹码从下注地方飞到筹码池后的回调
             */
            Chip.prototype.flyFinish = function () {
                if (Chip._betSoundCount < 2) {
                    var channel = SoundManage.playEffect("nn_bet_chip", 0.4);
                    if (channel) {
                        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
                        Chip._betSoundCount++;
                    }
                }
                // egret.log("sound:"+Chip._betSoundCount)
                // channel
            };
            Chip.prototype.onSoundComplete = function () {
                Chip._betSoundCount--;
            };
            Chip.prototype.playFinish = function () {
                //保证该筹码池存在
                if (this.parent) {
                    var arr = this.parent.parent.chipsImgList;
                    if (arr) {
                        //删除chipsImgList集合中的元素
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] == this) {
                                arr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    //删除筹码池中的筹码
                    // this.parent.removeChild(this);
                    this.destroy();
                }
            };
            /**
             * //从当前位置飞回上一次位置
             */
            Chip.prototype.FlyBack = function (delay, time, flag) {
                if (delay === void 0) { delay = 0; }
                if (time === void 0) { time = 800; }
                if (flag === void 0) { flag = true; }
                // this.parent.globalToLocal(this.x, this.y, this.point);
                // delay = Math.min(750,delay);
                // let tween: egret.Tween;
                var x = 0;
                var y = 0;
                //true的时候飞回原位，false的时候，飞到庄家位置
                if (flag) {
                    x = this.srcPoint.x;
                    y = this.srcPoint.y;
                }
                else {
                    //全局坐标变本地坐标
                    x = (this.stage.stageWidth - this.width) / 2;
                    y = 30;
                    this.parent.globalToLocal(x, y, this.point);
                    x = this.point.x;
                    y = this.point.y;
                }
                //计算间隔
                // let long = this.x-x/
                return egret.Tween.get(this).wait(delay).to({ x: x, y: y }, time).call(this.playFinish, this);
            };
            return Chip;
        }(eui.Component));
        /**
         * 当前在播放的筹码声个数
         */
        Chip._betSoundCount = 0;
        brnn.Chip = Chip;
        __reflect(Chip.prototype, "niuniu.brnn.Chip");
    })(brnn = niuniu.brnn || (niuniu.brnn = {}));
})(niuniu || (niuniu = {}));
//# sourceMappingURL=ChipsPool.js.map