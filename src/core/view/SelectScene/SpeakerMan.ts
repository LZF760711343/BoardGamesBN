interface NotifyMsg {
    text: string;
    showCount: number;
}
class SpeakerMan extends eui.Component {
    private label: eui.Label;
    private _rect: egret.Rectangle;
    private msg_list: NotifyMsg[];//跑马灯消息列表
    public constructor() {
        super();
        this._rect = new egret.Rectangle(0, 0, 1136 - 450, 40);
        this.msg_list = [];
    }
    protected childrenCreated(): void {
        super.childrenCreated();
        this.run();
    }
    public set rect(value: number) {
        this._rect.x = value;
        this.label.scrollRect = this._rect;
    }
    public get rect() {
        return this._rect.x;
    }
    public onExit(): void {
        egret.Tween.removeTweens(this.label);
        egret.Tween.removeTweens(this);
    }
    public addMsg(msg: NotifyMsg): void {
        this.msg_list.push(msg);
    }
    //记录
    private index = -1;
    public run(): void {
        let len = this.msg_list.length;
        let j = 0;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
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
        } else {
            this.msg_list[this.index].showCount--;
            this.label.text = this.msg_list[this.index].text;
        }
        var r_width = 0;
        this._rect.x = r_width - this.width;
        this.label.scrollRect = this._rect;
        egret.Tween.get(this)
            .to({ rect: this.label.width }, (this._rect.width + this.label.width) * 20).wait(5000)
            .call(this.run, this);
    }
}