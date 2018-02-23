class ChatTalkBox extends eui.Component{

    // public _chatdg:eui.List;
    public _chatdg:eui.DataGroup;
    public _talkInput:eui.TextInput;
    public _send:eui.Button;
    public _scroll:eui.Scroller;

    //聊天人列表
    // public static talkerList:eui.ArrayCollection = new eui.ArrayCollection();
    /**
     * 聊天对话的数据集合
     */
    public array:eui.ArrayCollection= new eui.ArrayCollection();

    public constructor(talkList?:eui.ArrayCollection){
        super();
        this.skinName = chatSkin;
        if(talkList){
            this.array = talkList;
        }
    }

    public createChildren(){
        super.createChildren();
    }

    public childrenCreated(){
        super.childrenCreated();

        // this.array = new eui.ArrayCollection();
        // this.array.addItem({id:"first",currentState1:"left",context:"111111111111"});
        // this.array.addItem({id:"first2",currentState1:"left",context:"56565656"});
        // this.array.addItem({id:"first3",currentState1:"right",context:"hahhahhaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"});
        // this.array.addItem({id:"first4",currentState1:"left",context:"2323"});
        // this.array.addItem({id:"first5",currentState1:"right",context:"77777777777777777777777777"});

        this._chatdg.dataProvider = this.array;
        this._chatdg.itemRenderer = ChatItem;

        this._send.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendContext,this);

        //加入舞台
        this.addEventListener(egret.Event.ADDED_TO_STAGE, ()=>{
            EventManager.register(TalkEvent.Talk,this.updataTalkContext,this,11);
            EventManager.register(TalkEvent.Send,this.updataTalkContext,this,2);
        }, this);
        //移除舞台
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=>{
            EventManager.remove(TalkEvent.Talk,this.updataTalkContext,this);
            EventManager.remove(TalkEvent.Send,this.updataTalkContext,this);
        }, this);

        //模拟用
        //用定时器模拟没3s接收到一次信息
        // let timer:egret.Timer = new egret.Timer(3000,10);
        // timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        // timer.start();
		// this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        //注册接收其他人发出的信息
    }

    /**
     * 输出聊天内容
     */
    private sendContext(event:egret.TouchEvent){
        if(!this._talkInput.text.trim().length)
            return;

        let text =  {id:Global.playerDto.id,context:this._talkInput.text};    
        let talkevent:TalkEvent =  new TalkEvent(TalkEvent.Send);
        talkevent.data = text;
        EventManager.dispatchEvent(talkevent);
        
        this._talkInput.text = null;
    }

    /**
     * 更新聊天室
     */
    private updataTalkContext(event:egret.Event){
        egret.log("updataTalkContext run!");
        egret.setTimeout(this.updataContext,this,300);
        // this.updataContext();
    }
    // public updataTalkContext2(event:egret.Event){
    //     egret.log("updataTalkContext2 run!");
    //     let context = event.data;
    //     this.array.addItem(context);
    //     this.updataContext();
    // }

    public updataContext(){
        this._chatdg.validateNow();
        if(this._chatdg.contentHeight>this._scroll.viewport.height){
            egret.Tween.get(this._scroll.viewport).to({scrollV:(this._chatdg.contentHeight-this._scroll.viewport.height)},300,egret.Ease.sineIn);
        }
    }

    /**
     * 显示自己发送的内容
     */
    // private showSendContext(event:egret.Event){
    //     let context = event.data;
    //     this.array.addItem(context);
    //     // this._chatdg.updateRenderer(new ChatItem(),this.array.length-1,{id:"first",context:this._talkInput.text});
    //     this._chatdg.validateNow();
    //     egret.Tween.get(this._scroll.viewport).to({scrollV:(this._chatdg.contentHeight-this._scroll.viewport.height)},300,egret.Ease.sineIn);
    // }
    // private count:number = 0;
    // private timerFunc(){
    //     this.updataTalkContext();
    //     //模拟发出事件
    //     let text = {id:"first2",context:"模拟别人发送的内容"+this.count++};
    //     let talkevent:TalkEvent =  new TalkEvent(TalkEvent.Talk);
    //     talkevent.data = text;
    //     EventManager.dispatchEvent(talkevent);
    //     EventManager.createEventByName(TalkEvent.Send,{id:"first2",context:"模拟别人发送的内容"+this.count++}).dispatchEventWith(TalkEvent.Send);
    // }
}

class ChatItem extends eui.ItemRenderer {
    private _context:eui.Label;
    private _head:eui.Image;


    public constructor() {
        super();
    }

    public childrenCreated(): void {
        super.createChildren();
    }

    public dataChanged() {
        // egret.log("当前的索引位置："+this.itemIndex);
        this.setChatTalk(this.data);
        this._head.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            // if(this.data.id == Global.playerDto.id){
            //     new Layers.UserInfoLayer(Global.playerDto).open();
            // } else {
            //     egret.log("other send run??");
            //     new Layers.UserInfoLayer(this.data.playerDto).open();
            // }
            new Layers.UserInfoLayer(this.data.playerDto).open();
        },this);
    }

    private setChatTalk(data:any){
        // egret.log(data);
        if(this.data.id != Global.playerDto.id){
            this.currentState = "right";
        } else{
            this.currentState = "left";
        }
        this._head.source = this.data.playerDto.headImages?this.data.playerDto.headImages:"defaultHead_png";      
        this._context.text = this.data.context;
        egret.log("why not run？context:"+this._context.text);
    }
}

interface TalkContext{
    id:number,
    context:string,
    playerDto?:model.PlayerDto
}
//创建一个事件
class TalkEvent extends egret.Event{
    public static Talk:string = "OtherTalk";
    public static Send:string = "SendTalk";

    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}
