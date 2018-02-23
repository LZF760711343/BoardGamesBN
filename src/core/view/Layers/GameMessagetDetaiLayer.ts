namespace Layers {
    export class GameMessagetDetaiLayer extends BaseLayer {
        public _newMatter: eui.Label;
        public _delectNew: UI.CommonBtn;
        public constructor(private text:string,private num:number) {
            super();
            this.skinName = GameMessagetDetaiSkin;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this._newMatter.text=this.text;
            this._delectNew.addEventListener(egret.TouchEvent.TOUCH_TAP,this.DelectNew,this);
        }
        private DelectNew(){
            // 发送删除那条信息
            egret.log("发送删除那条信息"+this.num);
            EventManager.createEventByName("undataNew").dispatchEventWith("undataNew",false,this.num);
            this.close();
        }
    }
}

