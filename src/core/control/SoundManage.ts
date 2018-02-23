namespace SoundManage {
	/**
	 *
	 * @author HE
	 *
	 */
    var channel: egret.SoundChannel;
    var sound: egret.Sound;
    export var soundKey: string;
    export var isEffect: number;
    export var isMusic: number;
    export function init() {
        if (egret.Capabilities.os == "iOS" && egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            // egret.native.SoundIosNative.init();
            // this.soundKey = "_mp3";
        } else {
            // this.soundKey = "_mp3";
        }
        soundKey = "_mp3";
    }
    export let keyMap = {
        bgMusic: "bgMusic",//选场页面背景音乐
        btnClick: "btnClick",//按钮点击的声音
        n_1: "n_1",
        n_21: "n_2_1",
        n_22: "n_2_2",
        n_23: "n_2_3",
        n_24: "n_2_4",
        n_25: "n_2_5",
        n_26: "n_2_6",
        n_27: "n_2_7",
        n_28: "n_2_8",
        n_29: "n_2_9",
        n_3: "n_3",
        n_5: "n_5",
        n_6: "n_6",
        n_7: "n_7",
        n_8: "n_8",
        n_9: "n_9",
        n_10: "n_10",
        n_11: "n_11",
        "#100": "1",
        "#101": "2",
        "#102": "3",
        "#103": "4",
        "#104": "5",
        "#105": "6",
        "#106": "7",
        "#107": "8",
        "#108": "9",
        "#109": "10",
        "#110": "11",
        "#111": "12",
        nn_bg: "mushi_bg_music",
        zjh_bg: "music_zjh_bg",
        ddz_bg: "ddz_bg_music",
        gdmj_bg: "playingInGame",
        brnn_bg: "brnn_bg_music",
    }

    export let majiangKeyMap = {
        mj_17: "1wan",
        mj_18: "2wan",
        mj_19: "3wan",
        mj_20: "4wan",
        mj_21: "5wan",
        mj_22: "6wan",
        mj_23: "7wan",
        mj_24: "8wan",
        mj_25: "9wan",
        mj_33: "1tong",
        mj_34: "2tong",
        mj_35: "3tong",
        mj_36: "4tong",
        mj_37: "5tong",
        mj_38: "6tong",
        mj_39: "7tong",
        mj_40: "8tong",
        mj_41: "9tong",
        mj_49: "1tiao",
        mj_50: "2tiao",
        mj_51: "3tiao",
        mj_52: "4tiao",
        mj_53: "5tiao",
        mj_54: "6tiao",
        mj_55: "7tiao",
        mj_56: "8tiao",
        mj_57: "9tiao",
        mj_65: "dongfeng",
        mj_66: "nanfeng",
        mj_67: "xifeng",
        mj_68: "beifeng",
        mj_69: "hongzhong",
        mj_70: "fa",
        mj_71: "bai",
    }


    export function playMusic(name: string) {
        sound = RES.getRes(name + soundKey);
        egret.log("playMusic:" + name + soundKey, isMusic)
        if (sound) {
            sound.type = egret.Sound.MUSIC;
            if (channel) {
                channel.stop();
                channel = null;
            }
            if (isMusic) {
                channel = sound.play();
                channel.volume = 0.4;
            }
        }
        return channel;
    }
    export function stopMusic() {
        if (channel) {
            channel.stop();
            channel = null;
        }
        sound = null;
    }
    export function pauseMusic() {
        if (channel) {
            channel.stop();
            channel = null;
        }
    }
    export function resumeMusic() {
        if (isMusic && sound && !channel) {
            channel = sound.play();
            channel.volume = 0.4;
        }
        return channel;
    }
    export function playEffectBySex(name: string, sex: SEX_TYPE, callback?: Function, target?: Object) {
        if (callback) {
            if (isEffect) {
                if (sex == SEX_TYPE.FEMALE) {
                    var sound = <egret.Sound>RES.getRes("m_" + name + soundKey);
                } else {
                    var sound = <egret.Sound>RES.getRes("f_" + name + soundKey);
                }

                if (sound) {
                    sound.type = egret.Sound.EFFECT;
                    var channel = sound.play(0, 1);
                    callback.call(target);
                    return channel;
                }
            }

        } else {
            if (isEffect) {
                if (sex == SEX_TYPE.FEMALE) {
                    var sound = <egret.Sound>RES.getRes("m_" + name + soundKey);
                } else {
                    var sound = <egret.Sound>RES.getRes("f_" + name + soundKey);
                }
                if (sound) {
                    sound.type = egret.Sound.EFFECT;
                    var channel = sound.play(0, 1);
                    return channel;
                }
            }
        }

        return null;
    }


    export function playEffectBySexByType(name: string, sex: SEX_TYPE, type: Sound_Type = Sound_Type.guoyu) {
        if (isEffect) {
            //男普通话
            if (sex == SEX_TYPE.MALE && type == Sound_Type.guoyu) {
                var sound = <egret.Sound>RES.getRes(name + soundKey);
            }

            //男粤语
            if (sex == SEX_TYPE.MALE && type == Sound_Type.yueyu) {
                var sound = <egret.Sound>RES.getRes("gd_" + "man_" + name + soundKey);
            }

            //女普通话
            if (sex == SEX_TYPE.FEMALE && type == Sound_Type.guoyu) {
                var sound = <egret.Sound>RES.getRes("g_" + name + soundKey);
            }

            //女粤语
            if (sex == SEX_TYPE.FEMALE && type == Sound_Type.yueyu) {
                var sound = <egret.Sound>RES.getRes("gd_" + "woman_" + name + soundKey);
            }

            if (sound) {
                sound.type = egret.Sound.EFFECT;
                let channel = sound.play(0, 1);
                channel.volume = isEffect;
                return channel;
            }
        }
        return null;
    }
    export function playEffect1(name: string, volume?: number) {
        var sound: egret.Sound = RES.getRes(name + soundKey);
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            if (DEBUG) {
                egret.log("playEffect:" + name + soundKey)
            }
            var channel = sound.play(0, 1);
            if (volume !== undefined)
                channel.volume = volume;
            return channel;
        }
        else {
            DEBUG && egret.log(TAG + ":not load" + name + soundKey);
        }
    }
    export function playEffect(name: string, volume?: number) {
        if (isEffect) {
            var sound: egret.Sound = RES.getRes(name + soundKey);
            if (sound) {
                sound.type = egret.Sound.EFFECT;
                if (DEBUG) {
                    egret.log("playEffect:" + name + soundKey)
                }
                var channel = sound.play(0, 1);
                if (volume !== undefined)
                    channel.volume = volume;
                return channel;
            }
            else {
                DEBUG && egret.log(TAG + ":not load" + name + soundKey);
            }
        }
        return null;
    }
}
namespace egret.native {
    export class ChannelIosNative {
        private static id: number = 0;
        public hashCode: number;
        public static cacheList: ChannelIosNative[] = [];
        public static list: ChannelIosNative[] = [];
        private _callBack: Function;
        private _target: Object;
        public constructor() {
            this.hashCode = ChannelIosNative.id++;
        }
        public static create() {
            var channel = ChannelIosNative.cacheList.pop();
            if (!channel) {
                channel = new ChannelIosNative();
            }
            ChannelIosNative.list.push(channel);
            return channel;
        }
        public stop() {
            egret.ExternalInterface.call("stopMusic", "");
        }
        public static init() {
            egret.ExternalInterface.addCallback("playEffectFinish", ChannelIosNative.playEffectFinish.bind(this));
        }
        public static playEffectFinish(message: string) {
            var data: { url: string, hashCode: number } = JSON.parse(message);
            for (var i = ChannelIosNative.list.length - 1; i > -1; --i) {
                if (ChannelIosNative.list[i].hashCode == data.hashCode) {
                    ChannelIosNative.list[i].doCallBack();
                    ChannelIosNative.cacheList.push(ChannelIosNative.list[i]);
                    ChannelIosNative.list.splice(i, 1);
                }
            }
            egret.log("SoundIosNative_effectfinish:" + message);
        }
        public addEventListener(eventName: string, callback: Function, target: Object) {
            this._callBack = callback;
            this._target = target;
        }
        public doCallBack() {
            if (this._callBack) {
                this._callBack.call(this._target);
                this._callBack = this._target = null;
            }
        }
    }
    export class SoundIosNative extends egret.EventDispatcher {
        public _type: string = "playEffect";
        public url: string;
        public static sendData: { url: string, hashCode: number, volume: number } = { url: "", hashCode: 0, volume: 1 };
        private loaded: boolean = false;
        //        public constructor() {
        //            sup
        //        }
        /**
         * @inheritDoc
         */
        public load(url: string): void {
            let self = this;
            this.url = url;
            if (DEBUG && !url) {
                egret.$error(3002);
            }
            if (!egret_native.isFileExists(url)) {
                download();
            }
            else {
                if (__global.setTimeout) {
                    __global.setTimeout(onLoadComplete, 0);
                }
                else {
                    $callAsync(onLoadComplete, self);
                }
            }
            function download() {
                let promise = PromiseObject.create();
                promise.onSuccessFunc = onLoadComplete;
                promise.onErrorFunc = function () {
                    egret.IOErrorEvent.dispatchIOErrorEvent(self);
                };
                egret_native.download(url, url, promise);
            }

            function onLoadComplete() {
                self.loaded = true;
                self.preload();
            }
        }
        private preload(): void {
            let self = this;
            //            if (self.type == egret.Sound.EFFECT) {
            //                let promise = new egret.PromiseObject();
            //                promise.onSuccessFunc = function (soundId) {
            //                    self.dispatchEventWith(egret.Event.COMPLETE);
            //                };
            //                egret_native.Audio.preloadEffectAsync(self.url, promise);
            //            }
            //            else {
            self.dispatchEventWith(egret.Event.COMPLETE);
            //            }
        }
        public static init() {
            // RES.registerAnalyzer(RES.ResourceItem.TYPE_SOUND,RES.SoundIosNativeAnalyzer);
            // ChannelIosNative.init();
        }
        public static playEffectFinish(message: string) {
            egret.log("SoundIosNative_effectfinish:" + message);
        }
        public set type(value: string) {
            if (value == egret.Sound.EFFECT) {
                this._type = "playEffect";
            } else {
                this._type = "playMusic";
            }
        }
        public play(startTime?: number, loops?: number) {
            egret.log("SoundIosNative:", this.url);
            var channel = new ChannelIosNative();
            SoundIosNative.sendData.url = this.url;
            SoundIosNative.sendData.hashCode = channel.hashCode;
            egret.ExternalInterface.call(this._type, JSON.stringify(SoundIosNative.sendData));
            return channel;
        }
        public stop() {
            egret.ExternalInterface.call("stopMusic", "");
        }
    }
}