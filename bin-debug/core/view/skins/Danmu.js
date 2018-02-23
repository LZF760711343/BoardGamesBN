var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI;
(function (UI) {
    var Danmu = (function (_super) {
        __extends(Danmu, _super);
        function Danmu(head, text, id, danmuInfo) {
            var _this = _super.call(this) || this;
            _this.head_png = "defaultHead_png";
            _this.text = "";
            /** 游戏类型，以后其他地方可能也会用到，先暂时就这样给个固定值 */
            _this.num = 1 /* NIUNIU */;
            _this.skinName = UI.DanmuSkin;
            _this.init(head, text, id, danmuInfo);
            return _this;
        }
        Object.defineProperty(Danmu.prototype, "danmuInfo", {
            get: function () {
                return this._danmuInfo;
            },
            enumerable: true,
            configurable: true
        });
        Danmu.create = function (head, text, id, danmuInfo) {
            var danmu;
            if (Danmu.DANMU_POOL.length) {
                danmu = Danmu.DANMU_POOL.pop();
                danmu.init(head, text, id, danmuInfo);
            }
            else {
                danmu = new Danmu(head, text, id, danmuInfo);
            }
            return danmu;
        };
        Danmu.prototype.init = function (head, text, id, danmuInfo) {
            if (head)
                this.head_png = head;
            if (text)
                this.text = text;
            if (id) {
                this._danmuInfo = { id: id, context: text };
            }
            if (danmuInfo)
                this._danmuInfo = danmuInfo;
        };
        Danmu.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.touchChildren = this.touchEnabled = false;
            this._head.source = this.head_png;
            // this._talk.text = this.text;
            this.parseMsg({ info: this.text, gameId: this.num });
            this.timer = new egret.Timer(40, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            // this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.startMove();
        };
        Danmu.prototype.move = function () {
            if (this.parent && this.x >= -this.width) {
                this.x -= 2;
            }
            else {
                //移除表情动画
                if (this.mc1) {
                    this.mc1.parent.removeChild(this.mc1);
                    this.mc1 = null;
                }
                //清除对象所以tween动画
                // egret.Tween.removeTweens(this);
                // this.tween = null;
                this.stopMove();
                this.timer = null;
                this.parent.removeChild(this);
                Danmu.DANMU_POOL.push(this);
            }
        };
        Danmu.prototype.startMove = function () {
            if (this.timer)
                this.timer.start();
        };
        Danmu.prototype.stopMove = function () {
            if (this.timer)
                this.timer.stop();
        };
        Danmu.prototype.timerFunc = function () {
            this.move();
        };
        /** 输出信息，可以输出表情和语音语句,场外的玩家不能有语音 */
        Danmu.prototype.parseMsg = function (msg) {
            this._talk.text = "";
            //聊天
            try {
                if (msg.info.indexOf('{') > -1 && JSON.parse(msg.info)) {
                    this._talk.text = JSON.parse(msg.info).context;
                    return;
                }
            }
            catch (e) {
                egret.log("not JSON");
            }
            var data = msg.info.split("@");
            var type = parseInt(data[0].substr(1, msg.info.length));
            //文本（场外玩家发的表情无语音）
            if (100 <= type && type < 200) {
                switch (this.num) {
                    case 3 /* DDZ */:
                        if (msg.gameId == 2) {
                            GameLangs.chats[0]["#108"] = "帅哥，交个朋友吧";
                            this._talk.text = GameLangs.chats[0][msg.info];
                        }
                        else {
                            this._talk.text = GameLangs.chats[1][msg.info];
                        }
                        break;
                    case 1 /* NIUNIU */:
                        this._talk.text = GameLangs.chats[2][msg.info];
                        break;
                    case 10 /* ZJH */:
                        if (msg.gameId == 2) {
                            this._talk.text = GameLangs.chats[3][msg.info];
                        }
                        else {
                            this._talk.text = GameLangs.chats[4][msg.info];
                        }
                        break;
                    case 40 /* GAME_ID_GDMJ_GOLD */:
                        this._talk.text = GameLangs.chats[5][msg.info];
                        break;
                }
            }
            else if (200 <= type && type < 300) {
                this._talk.visible = false;
                this.mc1 = Effect.getMCDate("expression", msg.info);
                var Type = type + "";
                //手动调节表情的大小和整个框的大小
                this.mc1.x = this._talk.left;
                this.mc1.y = 0;
                this.mc1.scaleX = 0.3;
                this.mc1.scaleY = 0.3;
                this.mc1.alpha = 0.5;
                this.width += 50;
                this.addChild(this.mc1);
                this.mc1.gotoAndPlay("run", -1);
            }
            else {
                egret.log("错误");
            }
        };
        return Danmu;
    }(eui.Component));
    Danmu.DANMU_POOL = [];
    Danmu.DAMUN_HEIGHT = 50;
    UI.Danmu = Danmu;
    __reflect(Danmu.prototype, "UI.Danmu");
})(UI || (UI = {}));
//# sourceMappingURL=Danmu.js.map