var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layers;
(function (Layers) {
    var SettingLayer = (function (_super) {
        __extends(SettingLayer, _super);
        function SettingLayer(str) {
            var _this = _super.call(this, [ResManager.GROUP_NAME.SAFE_BOX]) || this;
            _this.skinName = SystemSetSkin;
            _this.currentState = str;
            return _this;
        }
        SettingLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self._btnMusic.selected = !!LocalDatas.sDatas.datas.music;
            self._btnEffect.selected = !!LocalDatas.sDatas.datas.effect;
            egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas);
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
                this._versionLab.text = "版本号:" + Config.nativeVersion;
            }
            else {
                // if(VERSION && VERSION !== "$VERSION"){
                //     this._versionLab.text = GameLangs.versionTip.format(VERSION, Config.channel);
                // }else{
                // this._versionLab.text = GameLangs.versionTip.format("debug", Config.channel);
                // }
                this._versionLab.visible = false;
            }
        };
        SettingLayer.prototype.changeAccount = function () {
            net.close();
            LocalDatas.delLoginInfo();
        };
        SettingLayer.prototype.changeMusic = function () {
            egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas);
            if (LocalDatas.sDatas.datas.music) {
                SoundManage.isMusic = LocalDatas.sDatas.datas.music = 0;
                SoundManage.pauseMusic();
            }
            else {
                SoundManage.isMusic = LocalDatas.sDatas.datas.music = 1;
                SoundManage.resumeMusic();
            }
            LocalDatas.sDatas.saveData();
        };
        SettingLayer.prototype.changeEffect = function () {
            egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas);
            if (LocalDatas.sDatas.datas.effect) {
                SoundManage.isEffect = LocalDatas.sDatas.datas.effect = 0;
            }
            else {
                SoundManage.isEffect = LocalDatas.sDatas.datas.effect = 1;
            }
            LocalDatas.sDatas.saveData();
        };
        SettingLayer.prototype.changeLocalism = function () {
            egret.log("LocalDatas.sDatas.datas:", LocalDatas.sDatas.datas);
            if (LocalDatas.sDatas.datas.SoundType) {
                LocalDatas.sDatas.datas.SoundType = 0;
            }
            else {
                LocalDatas.sDatas.datas.SoundType = 1;
            }
            egret.log("LocalDatas.sDatas.datas.SoundType" + LocalDatas.sDatas.datas.SoundType);
            LocalDatas.sDatas.saveData();
        };
        SettingLayer.prototype.onExit = function () {
            //清除切换开关的事件
            this._btnMusic.removeEventListener(eui.UIEvent.CHANGE, this.changeMusic, this);
            this._btnEffect.removeEventListener(eui.UIEvent.CHANGE, this.changeEffect, this);
            this._btnLocalism.removeEventListener(eui.UIEvent.CHANGE, this.changeLocalism, this);
        };
        return SettingLayer;
    }(Layers.BaseLayer));
    Layers.SettingLayer = SettingLayer;
    __reflect(SettingLayer.prototype, "Layers.SettingLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=SettingLayer.js.map