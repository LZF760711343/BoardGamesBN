declare const VERSION: string;
namespace Layers {
    export class SettingLayer extends BaseLayer {
        private _btnChange: UI.CommonBtn;//切换房间按钮
        private _btnMusic: eui.ToggleButton;//音量开关
        private _btnEffect: eui.ToggleButton;//音效开关
        private _versionLab: eui.Label;
        private _btnLocalism: eui.ToggleButton;//方言开关

        public constructor(str: string) {
            super([ResManager.GROUP_NAME.SAFE_BOX]);
            this.skinName = SystemSetSkin;
            this.currentState = str;
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            var self = this;

            self._btnMusic.selected = !!LocalDatas.sDatas.datas.music;
            self._btnEffect.selected = !!LocalDatas.sDatas.datas.effect;
            egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas)
            //音量开关点击
            // self._btnMusic.addEventListener(eui.UIEvent.CHANGE, (e) => {
            //     egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas)
            //     if (LocalDatas.sDatas.datas.music) {
            //         SoundManage.isMusic = LocalDatas.sDatas.datas.music = 0;
            //         SoundManage.pauseMusic();
            //     } else {
            //         SoundManage.isMusic = LocalDatas.sDatas.datas.music = 1;
            //         SoundManage.resumeMusic();
            //     }
            //     LocalDatas.sDatas.saveData();
            // }, self);
            self._btnMusic.addEventListener(eui.UIEvent.CHANGE, this.changeMusic, self);

            //音效开关点击
            // self._btnEffect.addEventListener(eui.UIEvent.CHANGE, (e) => {
            //     egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas)
            //     if (LocalDatas.sDatas.datas.effect) {
            //         SoundManage.isEffect = LocalDatas.sDatas.datas.effect = 0;
            //     }
            //     else {
            //         SoundManage.isEffect = LocalDatas.sDatas.datas.effect = 1;
            //     }
            //     LocalDatas.sDatas.saveData();
            // }, self);
            self._btnEffect.addEventListener(eui.UIEvent.CHANGE, this.changeEffect, self);

            self._btnLocalism.selected = !!LocalDatas.sDatas.datas.SoundType;
            //方言开关点击
            // self._btnLocalism.addEventListener(eui.UIEvent.CHANGE, (e) => {
            //     egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas)
            //     if (LocalDatas.sDatas.datas.SoundType) {
            //         LocalDatas.sDatas.datas.SoundType = 0;
            //     }
            //     else {
            //         LocalDatas.sDatas.datas.SoundType = 1;
            //     }
            //     egret.log("LocalDatas.sDatas.datas.SoundType" + LocalDatas.sDatas.datas.SoundType);
            //     LocalDatas.sDatas.saveData();
            // }, self);
            self._btnLocalism.addEventListener(eui.UIEvent.CHANGE, this.changeLocalism, self);

            self._btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, self.changeAccount, self);
            if (egret.Capabilities.runtimeType === egret.RuntimeType.NATIVE) {
                // this._versionLab.text = GameLangs.versionTip.format(Config.nativeVersion, Config.channel);
                this._versionLab.text = "版本号:"+Config.nativeVersion;
            } else {
                // if(VERSION && VERSION !== "$VERSION"){
                //     this._versionLab.text = GameLangs.versionTip.format(VERSION, Config.channel);
                // }else{
                // this._versionLab.text = GameLangs.versionTip.format("debug", Config.channel);
                // }
                this._versionLab.visible=false;
            }

        }
        private changeAccount() {
            net.close();
            LocalDatas.delLoginInfo()
        }
        private changeMusic(){
            egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas)
            if (LocalDatas.sDatas.datas.music) {
                SoundManage.isMusic = LocalDatas.sDatas.datas.music = 0;
                SoundManage.pauseMusic();
            } else {
                SoundManage.isMusic = LocalDatas.sDatas.datas.music = 1;
                SoundManage.resumeMusic();
            }
            LocalDatas.sDatas.saveData();
        }
        private changeEffect(){
            egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas)
            if (LocalDatas.sDatas.datas.effect) {
                SoundManage.isEffect = LocalDatas.sDatas.datas.effect = 0;
            }
            else {
                SoundManage.isEffect = LocalDatas.sDatas.datas.effect = 1;
            }
            LocalDatas.sDatas.saveData();
        }
        private changeLocalism(){
            egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas)
            if (LocalDatas.sDatas.datas.SoundType) {
                LocalDatas.sDatas.datas.SoundType = 0;
            }
            else {
                LocalDatas.sDatas.datas.SoundType = 1;
            }
            egret.log("LocalDatas.sDatas.datas.SoundType" + LocalDatas.sDatas.datas.SoundType);
            LocalDatas.sDatas.saveData();
        }
        protected onExit(): void {
            //清除切换开关的事件
            this._btnMusic.removeEventListener(eui.UIEvent.CHANGE, this.changeMusic, this);
            this._btnEffect.removeEventListener(eui.UIEvent.CHANGE, this.changeEffect, this);
            this._btnLocalism.removeEventListener(eui.UIEvent.CHANGE, this.changeLocalism, this);
		}
    }
}