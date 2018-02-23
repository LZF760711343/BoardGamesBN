var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SoundManage;
(function (SoundManage) {
    /**
     *
     * @author HE
     *
     */
    var channel;
    var sound;
    function init() {
        if (egret.Capabilities.os == "iOS" && egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
        }
        else {
        }
        SoundManage.soundKey = "_mp3";
    }
    SoundManage.init = init;
    SoundManage.keyMap = {
        bgMusic: "bgMusic",
        btnClick: "btnClick",
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
    };
    SoundManage.majiangKeyMap = {
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
    };
    function playMusic(name) {
        sound = RES.getRes(name + SoundManage.soundKey);
        egret.log("playMusic:" + name + SoundManage.soundKey, SoundManage.isMusic);
        if (sound) {
            sound.type = egret.Sound.MUSIC;
            if (channel) {
                channel.stop();
                channel = null;
            }
            if (SoundManage.isMusic) {
                channel = sound.play();
                channel.volume = 0.4;
            }
        }
        return channel;
    }
    SoundManage.playMusic = playMusic;
    function stopMusic() {
        if (channel) {
            channel.stop();
            channel = null;
        }
        sound = null;
    }
    SoundManage.stopMusic = stopMusic;
    function pauseMusic() {
        if (channel) {
            channel.stop();
            channel = null;
        }
    }
    SoundManage.pauseMusic = pauseMusic;
    function resumeMusic() {
        if (SoundManage.isMusic && sound && !channel) {
            channel = sound.play();
            channel.volume = 0.4;
        }
        return channel;
    }
    SoundManage.resumeMusic = resumeMusic;
    function playEffectBySex(name, sex, callback, target) {
        if (callback) {
            if (SoundManage.isEffect) {
                if (sex == 2 /* FEMALE */) {
                    var sound = RES.getRes("m_" + name + SoundManage.soundKey);
                }
                else {
                    var sound = RES.getRes("f_" + name + SoundManage.soundKey);
                }
                if (sound) {
                    sound.type = egret.Sound.EFFECT;
                    var channel = sound.play(0, 1);
                    callback.call(target);
                    return channel;
                }
            }
        }
        else {
            if (SoundManage.isEffect) {
                if (sex == 2 /* FEMALE */) {
                    var sound = RES.getRes("m_" + name + SoundManage.soundKey);
                }
                else {
                    var sound = RES.getRes("f_" + name + SoundManage.soundKey);
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
    SoundManage.playEffectBySex = playEffectBySex;
    function playEffectBySexByType(name, sex, type) {
        if (type === void 0) { type = 0 /* guoyu */; }
        if (SoundManage.isEffect) {
            //男普通话
            if (sex == 1 /* MALE */ && type == 0 /* guoyu */) {
                var sound = RES.getRes(name + SoundManage.soundKey);
            }
            //男粤语
            if (sex == 1 /* MALE */ && type == 1 /* yueyu */) {
                var sound = RES.getRes("gd_" + "man_" + name + SoundManage.soundKey);
            }
            //女普通话
            if (sex == 2 /* FEMALE */ && type == 0 /* guoyu */) {
                var sound = RES.getRes("g_" + name + SoundManage.soundKey);
            }
            //女粤语
            if (sex == 2 /* FEMALE */ && type == 1 /* yueyu */) {
                var sound = RES.getRes("gd_" + "woman_" + name + SoundManage.soundKey);
            }
            if (sound) {
                sound.type = egret.Sound.EFFECT;
                var channel_1 = sound.play(0, 1);
                channel_1.volume = SoundManage.isEffect;
                return channel_1;
            }
        }
        return null;
    }
    SoundManage.playEffectBySexByType = playEffectBySexByType;
    function playEffect1(name, volume) {
        var sound = RES.getRes(name + SoundManage.soundKey);
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            if (true) {
                egret.log("playEffect:" + name + SoundManage.soundKey);
            }
            var channel = sound.play(0, 1);
            if (volume !== undefined)
                channel.volume = volume;
            return channel;
        }
        else {
            true && egret.log(TAG + ":not load" + name + SoundManage.soundKey);
        }
    }
    SoundManage.playEffect1 = playEffect1;
    function playEffect(name, volume) {
        if (SoundManage.isEffect) {
            var sound = RES.getRes(name + SoundManage.soundKey);
            if (sound) {
                sound.type = egret.Sound.EFFECT;
                if (true) {
                    egret.log("playEffect:" + name + SoundManage.soundKey);
                }
                var channel = sound.play(0, 1);
                if (volume !== undefined)
                    channel.volume = volume;
                return channel;
            }
            else {
                true && egret.log(TAG + ":not load" + name + SoundManage.soundKey);
            }
        }
        return null;
    }
    SoundManage.playEffect = playEffect;
})(SoundManage || (SoundManage = {}));
var egret;
(function (egret) {
    var native;
    (function (native) {
        var ChannelIosNative = (function () {
            function ChannelIosNative() {
                this.hashCode = ChannelIosNative.id++;
            }
            ChannelIosNative.create = function () {
                var channel = ChannelIosNative.cacheList.pop();
                if (!channel) {
                    channel = new ChannelIosNative();
                }
                ChannelIosNative.list.push(channel);
                return channel;
            };
            ChannelIosNative.prototype.stop = function () {
                egret.ExternalInterface.call("stopMusic", "");
            };
            ChannelIosNative.init = function () {
                egret.ExternalInterface.addCallback("playEffectFinish", ChannelIosNative.playEffectFinish.bind(this));
            };
            ChannelIosNative.playEffectFinish = function (message) {
                var data = JSON.parse(message);
                for (var i = ChannelIosNative.list.length - 1; i > -1; --i) {
                    if (ChannelIosNative.list[i].hashCode == data.hashCode) {
                        ChannelIosNative.list[i].doCallBack();
                        ChannelIosNative.cacheList.push(ChannelIosNative.list[i]);
                        ChannelIosNative.list.splice(i, 1);
                    }
                }
                egret.log("SoundIosNative_effectfinish:" + message);
            };
            ChannelIosNative.prototype.addEventListener = function (eventName, callback, target) {
                this._callBack = callback;
                this._target = target;
            };
            ChannelIosNative.prototype.doCallBack = function () {
                if (this._callBack) {
                    this._callBack.call(this._target);
                    this._callBack = this._target = null;
                }
            };
            return ChannelIosNative;
        }());
        ChannelIosNative.id = 0;
        ChannelIosNative.cacheList = [];
        ChannelIosNative.list = [];
        native.ChannelIosNative = ChannelIosNative;
        __reflect(ChannelIosNative.prototype, "egret.native.ChannelIosNative");
        var SoundIosNative = (function (_super) {
            __extends(SoundIosNative, _super);
            function SoundIosNative() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = "playEffect";
                _this.loaded = false;
                return _this;
            }
            //        public constructor() {
            //            sup
            //        }
            /**
             * @inheritDoc
             */
            SoundIosNative.prototype.load = function (url) {
                var self = this;
                this.url = url;
                if (true && !url) {
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
                        egret.$callAsync(onLoadComplete, self);
                    }
                }
                function download() {
                    var promise = egret.PromiseObject.create();
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
            };
            SoundIosNative.prototype.preload = function () {
                var self = this;
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
            };
            SoundIosNative.init = function () {
                // RES.registerAnalyzer(RES.ResourceItem.TYPE_SOUND,RES.SoundIosNativeAnalyzer);
                // ChannelIosNative.init();
            };
            SoundIosNative.playEffectFinish = function (message) {
                egret.log("SoundIosNative_effectfinish:" + message);
            };
            Object.defineProperty(SoundIosNative.prototype, "type", {
                set: function (value) {
                    if (value == egret.Sound.EFFECT) {
                        this._type = "playEffect";
                    }
                    else {
                        this._type = "playMusic";
                    }
                },
                enumerable: true,
                configurable: true
            });
            SoundIosNative.prototype.play = function (startTime, loops) {
                egret.log("SoundIosNative:", this.url);
                var channel = new ChannelIosNative();
                SoundIosNative.sendData.url = this.url;
                SoundIosNative.sendData.hashCode = channel.hashCode;
                egret.ExternalInterface.call(this._type, JSON.stringify(SoundIosNative.sendData));
                return channel;
            };
            SoundIosNative.prototype.stop = function () {
                egret.ExternalInterface.call("stopMusic", "");
            };
            return SoundIosNative;
        }(egret.EventDispatcher));
        SoundIosNative.sendData = { url: "", hashCode: 0, volume: 1 };
        native.SoundIosNative = SoundIosNative;
        __reflect(SoundIosNative.prototype, "egret.native.SoundIosNative");
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=SoundManage.js.map