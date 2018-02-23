/**
 *
 * @author 
 *
 */
/**
 * 语音/表情聊天冷却时间（暂定为5秒）
 */
const CHAT_INTERVAL_TIME = 0;
class ChatBox extends eui.Component {
    public viewStack: eui.ViewStack;
    private scroller1: eui.Scroller;
    private list1: eui.List;
    private scroller2: eui.Scroller;
    private list2: eui.List;
    public tabBar: eui.TabBar;
    public loadKey: string;

    private _lastInputTime: number;
    private _lastTipsTime: number;

    private chatGroup:eui.Group;
    public chatTalkBox:ChatTalkBox;

    public constructor(private num: number) {
        super();
        this.skinName = ChatBoxSkin;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        var self = this;

        self._lastInputTime = self._lastTipsTime = -20;

        self.right = 0;
        self.top = 80;
        self.tabBar.addEventListener(egret.Event.CHANGE, self.chanTab, self);
        /**
         * 聊天语音
         */
        let list = this.createTxtList();

        /**
         * 聊天表情
         */
        self.list2.itemRenderer = BiaoqingItem;
        var data = [];
        var length = 15;
        for (var i = 0; i < length; i++) {
            if (i < 10) {
                data[i] = "#20" + i;
            } else {
                data[i] = "#2" + i;
            }
        }
        self.list2.dataProvider = new eui.ArrayCollection(data);

        self.list1.dataProvider = new eui.ArrayCollection(list);

        self.list1.addEventListener(eui.ItemTapEvent.ITEM_TAP, self.onChange1, self);
        self.list2.addEventListener(eui.ItemTapEvent.ITEM_TAP, self.onChange2, self);

        /**
         * 打字聊天
         */
        //聊天框
        this.chatTalkBox = new ChatTalkBox(GameUIBase.talkList);
        this.chatGroup.addChild(this.chatTalkBox);
        EventManager.register(TalkEvent.Send,this.onSendTalk,this,10);
        //加入舞台(为后面频繁移除该组件做准备)
        this.addEventListener(egret.Event.ADDED_TO_STAGE, ()=>{
            EventManager.register(TalkEvent.Send,this.onSendTalk,this,10);
        }, this);
        //移除舞台
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=>{
            EventManager.remove(TalkEvent.Send,this.onSendTalk,this);
        }, this);
    }

    private onSendTalk(event:egret.Event){
        egret.log("onSendTalk");
        let text =  JSON.stringify(event.data);
        // GameUIBase.talkList.addItem(event.data);
        this.on_C2G_CHAT(text);
    }

    private onChange1(e: eui.PropertyEvent): void {
        if (this.checkIsCanSend()) {
            // egret.log(this.list1.selectedItem.index);
            this.on_C2G_CHAT(this.list1.selectedItem.index);
        }

    }

    private sendEmoji(id, data): void {
        var event = egret.Event.create(egret.Event, "close");
        event.data = data;
        this.dispatchEvent(event);
        egret.Event.release(event);
    }
    private onChange2(e: eui.PropertyEvent): void {
        // let Str = this.list2.selectedItem.img.indexOf("#");
        // let str = this.list2.selectedItem.img.substring(Str, Str+4);

        if (this.checkIsCanSend()) {
            // this.sendEmoji(this.list2.selectedItem, { text: this.list2.selectedItem});
            this.on_C2G_CHAT(this.list2.selectedItem);
        }
    }

    public on_C2G_CHAT(text): void {
        //百人牛牛时，限制连续发超过三次表情
        if(this.num == GAME_ID.GAME_ID_HZ_BRNN){
            if(!this.isSend()) return;    //发超过三次的话，不发送聊天消息
        }
        if (typeof text != 'undefined' && text != null && text != '' && text.length) {
            egret.log("text", text);
            net.SendMsg.create({ chatStr: text }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_ROOM_CHAT).send();

            if(this.viewStack.selectedIndex != 2){
                var event = egret.Event.create(egret.Event, "close");
                event.data = { text: text };
                this.dispatchEvent(event);
                egret.Event.release(event);
            }
        }
    }

    /**
    * 检测现在是否能发送消息,如果发送间隔短短于5秒的话,不允许再次发送,并弹出间隔过短的提示
    */
    private checkIsCanSend() {
        let curTime = Date.now();
        let intervalTime = curTime - this._lastInputTime;
        if (intervalTime <= CHAT_INTERVAL_TIME) {
            if (curTime - this._lastTipsTime > 0) {
                this._lastTipsTime = this._lastInputTime + CHAT_INTERVAL_TIME;
                Toast.launch(GameLangs.speak_too_fask, CHAT_INTERVAL_TIME - intervalTime - 2000 > 0 ? CHAT_INTERVAL_TIME - intervalTime - 2000 : 0);
            }
            return false;
        } else {
            this._lastInputTime = curTime;
            return true;
        }
    }

    private createTxtList() {
        egret.log("this.numthis.numthis.numthis.num" + this.num);
        var _list: { index: string, str: string }[] = [];
        if (this.num == GAME_ID.DDZ) {
            if (Global.playerDto.sex == SEX_TYPE.FEMALE) {
                egret.log("nv");
                for (var key in GameLangs.chats[0]) {

                    _list.push({ index: key, str: GameLangs.chats[0][key] });
                }
            } else {
                egret.log("nan");
                for (var key in GameLangs.chats[1]) {
                    _list.push({ index: key, str: GameLangs.chats[1][key] });
                }
            }

        } else if (this.num == GAME_ID.NIUNIU || this.num == GAME_ID.GAME_ID_HZ_BRNN) {
            for (var key in GameLangs.chats[2]) {
                _list.push({ index: key, str: GameLangs.chats[2][key] });

            }
        } else if (this.num == GAME_ID.ZJH) {
            if (Global.playerDto.sex == SEX_TYPE.FEMALE) {
                for (var key in GameLangs.chats[3]) {
                    _list.push({ index: key, str: GameLangs.chats[3][key] });

                }
            } else {
                for (var key in GameLangs.chats[4]) {
                    _list.push({ index: key, str: GameLangs.chats[4][key] });

                }
            }

        } else if (this.num == GAME_ID.GAME_ID_GDMJ_FK) {
            for (var key in GameLangs.chats[5]) {
                _list.push({ index: key, str: GameLangs.chats[5][key] });

            }
        }

        else {
            for (var key in GameLangs.chats[0]) {
                _list.push({ index: key, str: GameLangs.chats[0][key] });

            }
        }

        egret.log(_list);

        return _list;
    }

    private chanTab(evt: eui.CollectionEvent): void {
        this.viewStack.selectedIndex = this.tabBar.selectedIndex;
        if(this.viewStack.selectedIndex == 2){
            this.chatTalkBox.updataContext();
        }
    }

    //=========================限制发出表情===========================
    private biaoqingCount:number = 0;
    // private sendStart:number = 0;
    //记录上次发表情的时间
    private sendEnd:number = 0;
    private isSend():boolean{
        let time;
        if(this.sendEnd > 0){ //非首次发表情	
            //上次发表情的时间和当前时间差
            time = egret.getTimer() - this.sendEnd;
            //记录当前发表情的时间
            this.sendEnd = egret.getTimer();
            //相隔3秒间隔后重置
            if(time>3000)
                this.biaoqingCount = 0;
            if(this.biaoqingCount >= 2){ 
                Toast.launch("短时间内屏幕上一个人连续发的表情不能超过三个！");
                return false;
            }
        }
        if(this.sendEnd == 0 ){
            this.sendEnd = egret.getTimer();				
            // if(type < 300)
                this.biaoqingCount++;
        } else{
            // 短时间内隔(2秒内)，连续成功发送表情（非语音），表情数增加
            if(/*type < 300 &&*/ time<=2000)
                this.biaoqingCount++;
            egret.log("间隔时间："+time);
        }
        egret.log("当前时间："+this.sendEnd);

        return true;
    }
}
class BiaoqingItem extends eui.ItemRenderer {
    public constructor() {
        super()
    }

    protected childrenCreated(): void {
        super.childrenCreated();

    }

    public dataChanged(): void {

        var mc1: egret.MovieClip = Effect.getMCDate("expression", this.data);
        mc1.scaleX = mc1.scaleY = 0.6;
        this.addChild(mc1);
        // mc1.x = (80 - mc1.width) / 2;
        // mc1.y = (80 - mc1.height) / 2;
        mc1.x = mc1.y = 0;
        mc1.gotoAndPlay("run", -1);
    }
}