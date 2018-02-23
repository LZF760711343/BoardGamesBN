var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChatTalkBox = (function (_super) {
    __extends(ChatTalkBox, _super);
    function ChatTalkBox(talkList) {
        var _this = _super.call(this) || this;
        //聊天人列表
        // public static talkerList:eui.ArrayCollection = new eui.ArrayCollection();
        /**
         * 聊天对话的数据集合
         */
        _this.array = new eui.ArrayCollection();
        _this.skinName = chatSkin;
        if (talkList) {
            _this.array = talkList;
        }
        return _this;
    }
    ChatTalkBox.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ChatTalkBox.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        // this.array = new eui.ArrayCollection();
        // this.array.addItem({id:"first",currentState1:"left",context:"111111111111"});
        // this.array.addItem({id:"first2",currentState1:"left",context:"56565656"});
        // this.array.addItem({id:"first3",currentState1:"right",context:"hahhahhaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"});
        // this.array.addItem({id:"first4",currentState1:"left",context:"2323"});
        // this.array.addItem({id:"first5",currentState1:"right",context:"77777777777777777777777777"});
        this._chatdg.dataProvider = this.array;
        this._chatdg.itemRenderer = ChatItem;
        this._send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendContext, this);
        //加入舞台
        this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            EventManager.register(TalkEvent.Talk, _this.updataTalkContext, _this, 11);
            EventManager.register(TalkEvent.Send, _this.updataTalkContext, _this, 2);
        }, this);
        //移除舞台
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
            EventManager.remove(TalkEvent.Talk, _this.updataTalkContext, _this);
            EventManager.remove(TalkEvent.Send, _this.updataTalkContext, _this);
        }, this);
        //模拟用
        //用定时器模拟没3s接收到一次信息
        // let timer:egret.Timer = new egret.Timer(3000,10);
        // timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        // timer.start();
        // this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        //注册接收其他人发出的信息
    };
    /**
     * 输出聊天内容
     */
    ChatTalkBox.prototype.sendContext = function (event) {
        if (!this._talkInput.text.trim().length)
            return;
        var text = { id: Global.playerDto.id, context: this._talkInput.text };
        var talkevent = new TalkEvent(TalkEvent.Send);
        talkevent.data = text;
        EventManager.dispatchEvent(talkevent);
        this._talkInput.text = null;
    };
    /**
     * 更新聊天室
     */
    ChatTalkBox.prototype.updataTalkContext = function (event) {
        egret.log("updataTalkContext run!");
        egret.setTimeout(this.updataContext, this, 300);
        // this.updataContext();
    };
    // public updataTalkContext2(event:egret.Event){
    //     egret.log("updataTalkContext2 run!");
    //     let context = event.data;
    //     this.array.addItem(context);
    //     this.updataContext();
    // }
    ChatTalkBox.prototype.updataContext = function () {
        this._chatdg.validateNow();
        if (this._chatdg.contentHeight > this._scroll.viewport.height) {
            egret.Tween.get(this._scroll.viewport).to({ scrollV: (this._chatdg.contentHeight - this._scroll.viewport.height) }, 300, egret.Ease.sineIn);
        }
    };
    return ChatTalkBox;
}(eui.Component));
__reflect(ChatTalkBox.prototype, "ChatTalkBox");
var ChatItem = (function (_super) {
    __extends(ChatItem, _super);
    function ChatItem() {
        return _super.call(this) || this;
    }
    ChatItem.prototype.childrenCreated = function () {
        _super.prototype.createChildren.call(this);
    };
    ChatItem.prototype.dataChanged = function () {
        var _this = this;
        // egret.log("当前的索引位置："+this.itemIndex);
        this.setChatTalk(this.data);
        this._head.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // if(this.data.id == Global.playerDto.id){
            //     new Layers.UserInfoLayer(Global.playerDto).open();
            // } else {
            //     egret.log("other send run??");
            //     new Layers.UserInfoLayer(this.data.playerDto).open();
            // }
            new Layers.UserInfoLayer(_this.data.playerDto).open();
        }, this);
    };
    ChatItem.prototype.setChatTalk = function (data) {
        // egret.log(data);
        if (this.data.id != Global.playerDto.id) {
            this.currentState = "right";
        }
        else {
            this.currentState = "left";
        }
        this._head.source = this.data.playerDto.headImages ? this.data.playerDto.headImages : "defaultHead_png";
        this._context.text = this.data.context;
        egret.log("why not run？context:" + this._context.text);
    };
    return ChatItem;
}(eui.ItemRenderer));
__reflect(ChatItem.prototype, "ChatItem");
//创建一个事件
var TalkEvent = (function (_super) {
    __extends(TalkEvent, _super);
    function TalkEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    return TalkEvent;
}(egret.Event));
TalkEvent.Talk = "OtherTalk";
TalkEvent.Send = "SendTalk";
__reflect(TalkEvent.prototype, "TalkEvent");
//# sourceMappingURL=ChatTalkBox.js.map