/**
 * MydataLayer
 */
namespace Layers {
    export class ModifyUserInfoLayer extends BaseLayer {

        private _modifyBtn: UI.CommonBtn;
        private _nameText: eui.EditableText;
        private _qianMingText: eui.EditableText;
        private _ManRadio: eui.RadioButton;
        private _GirdRadio: eui.RadioButton;
        public _btnClose:UI.CommonBtn;
        private _modifyInfoGroup:eui.Group;


        private sex_Gourp: eui.RadioButtonGroup;

        public constructor() {
            super();
            this.skinName = ModifyUserInfoSkin;
            this.loadKey = ResManager.GROUP_NAME.COMMON;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._modifyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Sure, this);
            this.sex_Gourp = this._ManRadio.group;
            this.sex_Gourp.selectedValue = Global.playerDto.sex;
            this._nameText.text = Global.playerDto.nickName;
            this._qianMingText.text = Base64.decode(Global.playerDto.qianming);
            // this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.);
        }

        //定时器标记
        private timeNum:number;
        private Sure() {
            // Global.playerDto.sex = this.sex_Gourp.selectedValue;
            // //修改名称
            // Global.playerDto.nickName =  this._nameText.text;

            let strArr: string[] = Filters.FilterZi;
            //目前个性签名不要被屏蔽了
            // if (strArr.indexOf(this._nameText.text) == -1 && strArr.indexOf(this._qianMingText.text) == -1) {
            //该判断没有个性签名
            if (strArr.indexOf(this._nameText.text) == -1) {
                if(this._nameText.text.length >= 15){
                    Toast.launch("名字最长为15个字符",1000);
                    return;
                }
                if(this._qianMingText.text.length >= 30){
                    Toast.launch("签名最长为30个字符",1000);
                    return;
                }
                let sex = parseInt(this.sex_Gourp.selectedValue);
                net.SendMsg.create({
                    sex: sex,
                    nickName: Base64.encode(this._nameText.text),
                    qianming: Base64.encode(this._qianMingText.text),
                }, ModuleInfo.PLAYER, PlayerOrder.C2G_CHANGE_PLAYER_ATTR).send();
                Global.playerDto.nickName = this._nameText.text;
                Global.playerDto.sex = this.sex_Gourp.selectedValue;
                Global.playerDto.qianming = Base64.encode(this._qianMingText.text);
                // this._modifyInfoGroup.touchChildren = false;
                //发送更新消息事件
                EventManager.createEventByName("UpdateUserInfo").dispatchEventWith("UpdateUserInfo");
                // this.timeNum = egret.setTimeout(() => {
                //     this.close();
                //     EventManager.createEventByName("CloseParent").dispatchEventWith("CloseParent");
                // },this,3600);
            }else{
                Toast.launch("有敏感词请重输");
            }

        }

        /**
         * 停止定时器防止关闭上一层
         */
        // protected onClose() {
        //     if(this.timeNum){
        //         egret.clearTimeout(this.timeNum);
        //     }
		// 	super.onClose();
		// }
    }
}
