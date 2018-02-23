namespace Layers {
    export class UserInfoLayer extends BaseLayer {

        // private _nameLabel: eui.Label;
        private _nameLabel: eui.Component;
        // private _idLabel: eui.Label;
        private _idLabel: eui.Component;
        private _ipLabel: eui.Label;

        private _gold:eui.Component;
        private _nameLabel2:eui.Component;
        // private _phone:eui.Component;
        private _sex:eui.Component;
        private _qianMingText:eui.Label;

        private _headGroup:eui.Group;

        private _iconSex: eui.Image;
        private _head: UI.HeadBox;
        private _uploadPhoto: eui.Group;
        public _roundMask: eui.Rect;
        private _userInfo: model.PlayerDto;

        private _modifyBtn:UI.CommonBtn;

        private change: boolean = true;
        public constructor(data: any,state?:number) {
            super(["d1_icon_png"]);
            this.skinName = UserInfoLayerSkin;
            this._userInfo = data;
            this._head.mask = this._roundMask;
            if (data == Global.playerDto && state && state==1) {
                this._uploadPhoto.visible = true;
                this._modifyBtn.visible = true;
                this._uploadPhoto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.uploadPhoto, this);
            }
            if (!this._uploadPhoto.visible) {
                this._head.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ChangeHead, this);
            }

            this._modifyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OpenModifyUserInfoLayer, this);
            EventManager.register("UpdateUserInfo",this.updateUserInfo,this);           
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,()=>{
                EventManager.remove("UpdateUserInfo",this.updateUserInfo,this);
            },this);
            // EventManager.registerOnce("CloseParent",()=>{
            //     egret.log("close");
            //     this.close();
            // },this);
        }


        protected childrenCreated(): void {
            super.childrenCreated();

            this.updateUserInfo();
        }
        private ChangeHead() {
            if (this.change) {
                this.change = false;
                this._headGroup.scaleX = this._headGroup.scaleY = 1.4;
                // this._head.scaleX = this._head.scaleY = this._roundMask.scaleX = this._roundMask.scaleY = 2;
            } else {
                this.change = true;
                this._headGroup.scaleX = this._headGroup.scaleY = 1;
                // this._head.scaleX = this._head.scaleY = this._roundMask.scaleX = this._roundMask.scaleY = 1.4;
            }
        }

        private OpenModifyUserInfoLayer() {
            new Layers.ModifyUserInfoLayer().open();
        }
        /**
         * 字符串中间插入字符
         */
        public Splice(ID:number){
            var id:string="";
            var array=ID.toString();
            // var array=ID.toString().split('').splice(2,3,"***").join("");
            
            // var num=array.substr(3,3);
            egret.log("array"+array);
            for(let i=0;i<array.length;i++){
                if(i==2||i==3||i==4){
                    id+="*";
                }else{
                    id+=array[i];
                }
            }
            return array;
        }

        public updateUserInfo() {
            //2、重写后代码如下：

            var self = this;

            var url = self._userInfo.headImages;
            self._head.setIcon(url);
            self._idLabel["_context"].text = "ID:" + self._userInfo.id;
            if(this._uploadPhoto.visible){
                self._idLabel["_context"].text = "ID:" + self._userInfo.id;
            }
            // else{
            //     self._idLabel["_context"].text = "ID:" + this.Splice(self._userInfo.id);
            // } 
            self._nameLabel["_context"].text = self._nameLabel2["_context"].text = this.showName(self._userInfo.nickName);
            self._ipLabel.text = self._userInfo.gold + GameLangs.jinbi;
            // self._phone["_context"].text = self._userInfo.mobile;
            // self._qianMingText.text = Base64.decode(self._userInfo.qianming);

            if (self._userInfo.sex == SEX_TYPE.MALE) {
                self._iconSex.source = "nan_area_png"
                self._sex["_context"].text = "男";
            } else {
                self._iconSex.source = "nv_area_png"
                self._sex["_context"].text = "女";
            }
            if (self._userInfo.gold > 100000) {
                this._gold["_context"].text = Math.floor(self._userInfo.gold / 10000) + GameLangs.wan;
            } else {
                this._gold["_context"].text = self._userInfo.gold + "";
            }
        }

        private showName(name:string):string{
            let newName = name;
            if(name.length >5){
                newName = name.substring(0,5)+"...";
            }
            
            return newName;
        }

        public updateUserImgs(headImages) {
            egret.log("headImages:::::" + headImages);
            this._head.setIcon(headImages);
        }

        private uploadFinish(url: string) {
            egret.log("uploadPhoto:" + url)
            this.updateUserImgs(url);
            net.SendMsg.create({ headImages: url }, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_UPDATE_HEAD_IMAGES).send();
        }
        private uploadPhoto() {
            nest.uploadHeadImg(this.uploadFinish, this);
        }
    }
}