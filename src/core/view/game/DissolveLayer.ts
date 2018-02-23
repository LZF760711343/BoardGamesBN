namespace Layers {
	/**
	 *
	 * @author He 
     * 解散房间页面
	 *
	 */
    export class DissolveLayer extends BaseLayer {

        private _btnAgree: UI.CommonBtn;
        private _btnRefuse: UI.CommonBtn;
        private _label1: eui.Label;
        private _label0: eui.Label;
        
        private _group:eui.Group;
        private _list:{result:number, nickName:string, playerId:number}[];

        public constructor() {
            super();
            this.skinName = DissolveRoomSkin;
        }
        protected onExit() {
            super.onExit();
            if (this._cTime) {
                this._cTime.stop();
            }
        }
        

        protected onTimer(value) {
            this._label0.text = GameLangs.dissolveTip1.format(3, value);
        }
        /**
         * 倒计时完成
         */
        protected complete() {
            if (this.currentState === "choice") {
                this.sendDelScoreRoom(1);
            }
        }
        // public setState(state:string){
        //     // dissolve,tip,dissolving,ownertip
        //     this.currentState = state;
        //     switch(state){
        //         case "dissolving"://已经做出决定,等待其他人做决定的状态
        //             break;
        //         case "tip"://点击解散房间按钮后,确认是否解散的状态
        //             this._label0.text = GameLangs.dissolveTip3;
        //             break;
        //         case "ownertip"://房主在还未开始游戏之前点击解散房间按钮后,弹出的确认是否解散的状态
        //             this._label0.text = GameLangs.dissolveTip2;
        //             break;
        //         case "dissolve"://在别人申请了解散房间后,确认是否同意解散房间的状态
        //             break;
        //     }
        // }
        /**
         * 同意解散房间
         */
        private onAgree() {
            switch (this.currentState) {
                case "tip"://点击解散房间按钮后,确认是否解散的状态
                case "ownertip"://房主在还未开始游戏之前点击解散房间按钮后,弹出的确认是否解散的状态
                case "twoniu":
                case "liner":
                case "deduc":
                    this.sendLeaveScoreRoom();
                    break;
                case "choice"://在别人申请了解散房间后,确认是否同意解散房间的状态
                    this.sendDelScoreRoom(1);
                    break;
            }
        }
        /**
         * 收到一个G2C_DEL_SCORE_ROOM更新一次数据
         */
        public updateData(result:number, playerId:number){
           let item = Utils.getItemByKey(this._list, "playerId", playerId);
           item.result = result;
           this.updateUI();
            // this._list
        }
        /**
         * 初始化数据,刚开始所有人的状态都是等待状态
         * 每收到一个G2C_DEL_SCORE_ROOM更新一次数据
         */
        public initData(originatorData:model.PLAYER_INFO, otherDatas:model.PLAYER_INFO[]){
            // dissolveTip4
            this._label1.text = GameLangs.dissolveTip4.format(originatorData.UserInfo.nickName);
            let list:{result:number, nickName:string, playerId:number}[] = this._list = [];
            let arrLen = otherDatas.length;
            for(let i = 0; i < arrLen; i++){
                list[i] = {result:0, nickName:otherDatas[i].UserInfo.nickName, playerId:otherDatas[i].playerId};
            }
            this.updateUI();
            this.startTimer(180);
            this.onTimer(180);
        }
        /**
         * 刷新UI
         */
        private updateUI(){
            //排序,将同意的数据排在前面
            this._list.sort((a,b)=>{
                return b.result - a.result;
            });
            let arrLen = this._group.numChildren;
            for(let i = 0; i < arrLen; i++){
                let label = <eui.Label>this._group.getChildAt(i);
                if(this._list[i]){
                    label.text = GameLangs["dissolveTipResult" + this._list[i].result].format(this._list[i].nickName);
                    label.visible = true;
                }else{//
                    label.visible = false;
                }
            }
        }
        private sendLeaveScoreRoom() {
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_LEAVE_SCORE_ROOM).send();
        }
        /**
         * 发送投票消息给服务器
         * @param voteRes:0为拒绝解散房间,1为同意解散房间
         */
        private sendDelScoreRoom(voteRes: number) {
            net.SendMsg.create({ voteRes: voteRes }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_DEL_SCORE_ROOM).send();
        }
        /**
         * 拒绝解散房间
         */
        private onRefuse() {
            this.sendDelScoreRoom(0);
        }
        // private
        protected childrenCreated(): void {
            super.childrenCreated();
            this._btnRefuse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRefuse, this);
            this._btnAgree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgree, this);
        }
    }
}