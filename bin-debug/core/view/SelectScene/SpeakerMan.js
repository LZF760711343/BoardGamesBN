var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SpeakerMan = (function (_super) {
    __extends(SpeakerMan, _super);
    function SpeakerMan() {
        var _this = _super.call(this) || this;
        //记录
        _this.index = -1;
        _this._rect = new egret.Rectangle(0, 0, 1136 - 450, 40);
        _this.msg_list = [];
        return _this;
    }
    SpeakerMan.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.run();
    };
    Object.defineProperty(SpeakerMan.prototype, "rect", {
        get: function () {
            return this._rect.x;
        },
        set: function (value) {
            this._rect.x = value;
            this.label.scrollRect = this._rect;
        },
        enumerable: true,
        configurable: true
    });
    SpeakerMan.prototype.onExit = function () {
        egret.Tween.removeTweens(this.label);
        egret.Tween.removeTweens(this);
    };
    SpeakerMan.prototype.addMsg = function (msg) {
        this.msg_list.push(msg);
    };
    SpeakerMan.prototype.run = function () {
        var len = this.msg_list.length;
        var j = 0;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                if (this.msg_list[i].showCount == 0) {
                    this.msg_list.splice(i, 1);
                    len = this.msg_list.length;
                }
            }
        }
        this.index++;
        if (len <= this.index) {
            this.index = -1;
        }
        if (this.index == -1) {
            this.label.text = "禁止任何利用本平台进行赌博活动，如有发现立刻封杀账号。请大家自觉维护良好游戏环境 谢谢";
        }
        else {
            this.msg_list[this.index].showCount--;
            this.label.text = this.msg_list[this.index].text;
        }
        var r_width = 0;
        this._rect.x = r_width - this.width;
        this.label.scrollRect = this._rect;
        egret.Tween.get(this)
            .to({ rect: this.label.width }, (this._rect.width + this.label.width) * 20).wait(5000)
            .call(this.run, this);
    };
    return SpeakerMan;
}(eui.Component));
__reflect(SpeakerMan.prototype, "SpeakerMan");
//# sourceMappingURL=SpeakerMan.js.map