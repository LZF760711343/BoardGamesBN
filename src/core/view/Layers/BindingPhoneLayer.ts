namespace Layers {
    export class BindingPhoneLayer extends BaseLayer {
        public _quding: UI.CommonBtn;
        public _CountDownBtn: UI.CommonBtn;
        public _phoneText: eui.EditableText;
        public _yanzhengText: eui.EditableText;
        public _CountDownLab: eui.Label;
        private timer;
        private count: number;
        public constructor() {
            super(["h_area_png", ResManager.GROUP_NAME.WELFARE_CENTER]);
            this.skinName = BindingPhoneSkin;
            this._CountDownBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendNote, this);
            this._quding.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendCode, this);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.count = 60;
        }
        private async sendCode() {
            if (this._yanzhengText.text == "" || this._phoneText.text == "") {
                Toast.launch("请输入正确的手机号或验证码！");
            } else {
                let params = "?tel=" + this._phoneText.text + "&playerid=" + Global.playerDto.id + "&serverid=" + Config.SERVER_ID + "&ver_code=" + this._yanzhengText.text;
                // let params = "?tel=" + this._phoneText.text + "&playerid=2015584&serverid=" + Config.SERVER_ID + "&ver_code=" + this._yanzhengText.text;
                if (/^[0-9]*$/.test(this._yanzhengText.text)) {
                    try {
                        let response = await Global.requestDataAsync(Config.URLS.sendverifynote + params, {});
                        let data = JSON.parse(response);
                        egret.log("data", data);
                        if (data.return_code == 0) {
                            Global.playerDto.mobile = this._phoneText.text;
                            this.close();
                            if (this.timer) {
                                egret.clearInterval(this.timer);
                            }
                        }
                        Toast.launch(data.return_msg);
                    } catch (error) {
                        egret.log(error);
                    }
                } else {
                    Toast.launch("验证码输入有误，请重填");
                }
            }



        }

        private countdown() {

            this.count--;
            this._CountDownLab.text = this.count + "秒后重新获取";
            if (this.count <= 0) {
                this.count = 60; //重新赋值 
                this._CountDownBtn.visible = true;
                this._CountDownLab.visible = false;
                if (this.timer) {
                    egret.clearInterval(this.timer);
                }
            }
        }


        public onClose(aniType: ANI_TYPE = ANI_TYPE.CENTER1) {
            if (this.timer) {
                egret.clearInterval(this.timer);
            }
            this.close();
        }

        private async sendNote() {
            // var params = "?tel=" + this._phoneText.text + "&playerid=2015584&serverid=" + Config.SERVER_ID;
            var params = "?tel=" + this._phoneText.text + "&playerid=" + Global.playerDto.id + "&serverid=" + Config.SERVER_ID;

            if (!(/^1[34578]\d{9}$/.test(this._phoneText.text))) {
                Toast.launch("手机号码有误，请重填");
            } else {
                try {
                    let response = await Global.requestDataAsync(Config.URLS.sendnote + params, {});
                    let data = JSON.parse(response);
                    var self = this;
                    self._CountDownBtn.visible = false;
                    self._CountDownLab.visible = true;
                    self.timer = egret.setInterval(self.countdown, self, 1000);
                    // setTimeout(function () {
                    //     self._CountDownBtn.visible = true;
                    //     self._CountDownLab.visible = false;
                    //     if (self.timer) {
                    //         egret.clearInterval(self.timer);
                    //     }
                    // }, 60000);
                    Toast.launch(data.return_msg);
                } catch (error) {
                    egret.log(error);
                }

            }

        }
    }
}