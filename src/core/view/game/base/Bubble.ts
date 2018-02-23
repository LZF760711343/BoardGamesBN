/**
 *
 * @author 
 *
 */


interface ChatMsg {
    info: string;
    gameId?: number;
}


class Bubble extends eui.Component {
    public label: eui.Label;
    public _rect: egret.Rectangle;
    //    public msg_list: ChatMsg[];
    //    public mc1: egret.MovieClip;
    public constructor(private num: number) {
        super();
        this.skinName = BubbleSkin;
    }
    public _bgImg: eui.Image;
    public _boult: eui.Image;
    public set rect(value: number) {
        this._rect.x = value;
        this.label.scrollRect = this._rect;
    }
    public get rect() {
        return 0;
    }
    public parseMsg(msg: ChatMsg) {
        var tween = egret.Tween.get(this).to({ alpha: 1 }, 100).wait(2500);
        this.label.text = "";
        //聊天
        try{
            if(msg.info.indexOf('{')>-1 && JSON.parse(msg.info)){
                this.label.text =  JSON.parse(msg.info).context;            
                this.width = this.label.width + 25;
                this.height = this.label.height + 25;

                if (tween) {
                    tween.to({ alpha: 0 }, 500).call(egret.Event.dispatchEvent, egret.Event, [this, EVENT_DEFINE.MSG_SHOW_COMPLETE]);
                }

                return;
            }
        }   catch(e){
            egret.log("not JSON");
        }

        let data = msg.info.split("@");
        let type = parseInt(data[0].substr(1, msg.info.length));
        //文本
        if (100 <= type && type < 200) {
            // egret.log("msg.gameId" + msg.gameId + "this.num:" + this.num);
            switch (this.num) {
                case GAME_ID.DDZ:
                    if (msg.gameId == 2) {
                        GameLangs.chats[0]["#108"] = "帅哥，交个朋友吧";
                        this.label.text = GameLangs.chats[0][msg.info];

                    } else {

                        this.label.text = GameLangs.chats[1][msg.info];

                    }
                    SoundManage.playEffectBySex(SoundManage.keyMap[msg.info], msg.gameId);
                    break;
                case GAME_ID.NIUNIU:
                    this.label.text = GameLangs.chats[2][msg.info];
                    SoundManage.playEffectBySex(SoundManage.keyMap[msg.info] + 0, msg.gameId);
                    break;
                case GAME_ID.ZJH:
                    if (msg.gameId == 2) {
                        this.label.text = GameLangs.chats[3][msg.info];
                    } else {
                        this.label.text = GameLangs.chats[4][msg.info];
                    }
                    SoundManage.playEffectBySex(0 + SoundManage.keyMap[msg.info], msg.gameId);
                    break;
                case GAME_ID.GAME_ID_GDMJ_GOLD:
                    this.label.text = GameLangs.chats[5][msg.info];
                    SoundManage.playEffectBySex("mj_"+SoundManage.keyMap[msg.info], msg.gameId);
                    // SoundManage.playEffectBySex("mj_"+SoundManage.keyMap[msg.info], msg.gameId);
                    break;

            }
            this.width = this.label.width + 25;
            this.height = this.label.height + 25;
            //  SoundManage.playEffectBySex(msg.info + "",msg.gameId);
            //  egret.log("m_" + msg.info + msg.gameId);
        }
        //表情
        else if (200 <= type && type < 300) {
            var mc1: egret.MovieClip = Effect.getMCDate("expression", msg.info);
            let Type = type + "";
            SoundManage.playEffect(Type);
            egret.log("msg.infomsg.info" + type);
            this.addChild(mc1);
            this.width = mc1.width;
            this.height = mc1.height;
            this._bgImg.visible = this._boult.visible = false;
            if (this.currentState == "right") {
                mc1.x = (this.width - mc1.width);
            } else {
                mc1.x = (this.width - mc1.width) / 2;
            }
            mc1.y = (this.height - mc1.height) / 2 - 4;
            mc1.gotoAndPlay("run", -1);
            tween.call(() => {
                mc1.parent.removeChild(mc1);
                mc1 = null;
            });
        }
        //语音
        else if (type >= 300) {
            var img = new eui.Image("recordImg3_png");
            img.verticalCenter = -3;
            img.horizontalCenter = 0;
            this._boult.source = "bubble_arrows1_png";
            this._bgImg.source = "bubble_bg1_png";
            this.addChild(img);
            if (this.currentState.indexOf("right") == -1) {
                img.scaleX = -1;
            }
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                UI.Recorder.instance.playRecord(data[1], () => {
                    if (img.parent) {
                        img.parent.removeChild(img);
                    }
                    egret.Event.dispatchEvent(this, EVENT_DEFINE.MSG_SHOW_COMPLETE);
                }, this);
                tween = null;
            }
            this.width = 40 + 25;
            this.height = 20 + 25;
        } else {
            egret.log("错误");
        }
        if (tween) {
            tween.to({ alpha: 0 }, 300).call(egret.Event.dispatchEvent, egret.Event, [this, EVENT_DEFINE.MSG_SHOW_COMPLETE]);
        }
        //        return tween;
    }
    //    public showMsg():void{
    //        var str = this.msg_list.shift();
    //        if(str){
    //            var tween = egret.Tween.get(this).to({ alpha: 1 },100).wait(500);
    ////            this.label.text = str;
    //            this.width = this.label.width + 80;
    //            this.height = this.label.height + 80;
    //            if(this.label.width > 140) {
    //                var length = this.label.width - 140;
    //                tween = tween.to({ rect: length },length * 20).wait(500);
    //            }
    //            tween.to({ alpha: 0 },200).call(this.showMsg, this);
    //        }
    // 
    //    }
}