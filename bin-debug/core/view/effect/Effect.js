var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Effect;
(function (Effect) {
    // interface EffectBase {
    // 	cb: Function;
    // 	cbTarget: Object;
    // 	data: any;
    // 	playComplete();
    // 	destroy();
    // }
    var MCFactory = {};
    function getMCDate(name, key) {
        var fac = MCFactory[name];
        if (!fac) {
            MCFactory[name] = fac = new egret.MovieClipDataFactory(RES.getRes(name + "_json"), RES.getRes(name + "_png"));
        }
        return new egret.MovieClip(fac.generateMovieClipData(key));
    }
    Effect.getMCDate = getMCDate;
    // var DGFactory = {};
    // function getDGFactory(name, is_data: boolean = true) {
    // 	var fac = DGFactory[name];
    // 	if (fac) {
    // 		return fac;
    // 	} else {
    // 		var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
    // 		dragonbonesFactory.addDragonBonesData(
    // 			dragonBones.DataParser.parseDragonBonesData(RES.getRes(name + "_ske_json"))
    // 		);
    // 		if (is_data) {
    // 			dragonbonesFactory.addTextureAtlas(
    // 				new dragonBones.EgretTextureAtlas(
    // 					RES.getRes(name + "_tex_png"),
    // 					RES.getRes(name + "_tex_json")
    // 				)
    // 			);
    // 		}
    // 		DGFactory[name] = dragonbonesFactory;
    // 		return dragonbonesFactory;
    // 	}
    // }
    // export class JindanEffect1 {
    // 	public fac: Start.EgretFactory;
    // 	public constructor(name, arm_name: string = "armature", is_data: boolean = false) {
    // 		var fac = this.fac = getDGFactory(name, is_data);
    // 		// var armature = this.armature = fac.buildArmature(arm_name);
    // 		// dragonBones.WorldClock.clock.add(armature);
    // 	}
    // }
    // export class JindanEffect {
    // 	public armature: dragonBones.Armature;
    // 	private cb: Function;
    // 	private cbTarget: Object;
    // 	public fac: dragonBones.EgretFactory;
    // 	public constructor(name, arm_name: string = "armature", is_data: boolean = false) {
    // 		var fac = this.fac = getDGFactory(name, is_data);
    // 		var armature = this.armature = fac.buildArmature(arm_name);
    // 		dragonBones.WorldClock.clock.add(armature);
    // 		//  this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onExit,this);
    // 	}
    // 	public destroy(): void {
    // 		var display = <egret.DisplayObject>this.armature.display;
    // 		if (display.parent) {
    // 			display.parent.removeChild(display);
    // 		}
    // 		display = null;
    // 	}
    // 	public get width() {
    // 		return this.armature.display.width;
    // 	}
    // 	public get height() {
    // 		return this.armature.display.height;
    // 	}
    // 	public setAnchorPoint(x: number, y: number): void {
    // 		this.armature.display.anchorOffsetX = x;
    // 		this.armature.display.anchorOffsetY = y;
    // 	}
    // 	public registerOnExit(): void {
    // 		this.armature.display.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
    // 	}
    // 	public onExit(): void {
    // 		dragonBones.WorldClock.clock.remove(this.armature);
    // 		this.armature.dispose();
    // 	}
    // 	public playAndStop(name = "newAnimation", times: number = 1) {
    // 		this.armature.animation.gotoAndStop(name, 0);
    // 	}
    // 	public play(name = "newAnimation", times: number = 1): void {
    // 		this.armature.animation.gotoAndPlay(name, -1, -1, times);
    // 	}
    // 	public getDisplay() {
    // 		return this.armature.display;
    // 	}
    // 	public setPostion(x: number, y: number): void {
    // 		this.armature.display.x = x;
    // 		this.armature.display.y = y;
    // 	}
    // 	public setFinishedCallBack(cb: Function, cbTarget: Object) {
    // 		this.cb = cb;
    // 		this.cbTarget = cbTarget;
    // 	}
    // }
    // -------------------------------------------------------------------------
    // export class DBNode {
    // 	private disPlayNode: dragonBones.Movie;
    // 	private cb: Function;
    // 	private cbTarget: Object;
    // 	private data: any;
    // 	private cbName: string
    // 	public isAnimationFinished: boolean;
    // 	private resName: string;
    // 	private armName: string;
    // 	private _isAutoDestroy: boolean = true;
    // 	private static _pool: {} = {};
    // 	public constructor(name, armName: string) {
    // 		dragonBones.addMovieGroup(RES.getRes(name + "_ske_dbmv"), RES.getRes(name + "_tex_png"));
    // 		var movie = this.disPlayNode = dragonBones.buildMovie(armName);
    // 		this.disPlayNode.addEventListener(dragonBones.MovieEvent.COMPLETE, this.playComplete, this);
    // 		this.armName = armName;
    // 		this.resName = name;
    // 	}
    // 	public once(name: string, func: Function, target): void {
    // 		this.disPlayNode.once(name, func, target);
    // 		// this.disPlayNode.removeEventListener(this.cbName,this.cb, this.cbTarget);
    // 		this.cbName = name;
    // 		this.cbTarget = target;
    // 		this.cb = func;
    // 	}
    // 	public static create(name, armName: string) {
    // 		if (DBNode._pool[name] && DBNode._pool[name][armName] && DBNode._pool[name][armName].length) {
    // 			return DBNode._pool[name][armName].pop();
    // 		} else {
    // 			return new DBNode(name, armName);
    // 		}
    // 	}
    // 	public removeEventListener(name: string, func: Function, target) {
    // 		this.disPlayNode.removeEventListener(name, func, target);
    // 		// this.disPlayNode.once()
    // 		// this.disPlayNode.remove
    // 	}
    // 	public setIsAtuoDestroy(value: boolean) {
    // 		this._isAutoDestroy = value;
    // 	}
    // 	private playComplete() {
    // 		if (this.cb) {
    // 			this.cb.call(this.cbTarget, this.data);
    // 		}
    // 		if (this._isAutoDestroy) {
    // 			this.destroy();
    // 		}
    // 	}
    // 	public destroy() {
    // 		var display = this.disPlayNode;
    // 		if (display.isPlaying) {
    // 			display.stop();
    // 		}
    // 		if (display && display.parent) {
    // 			display.parent.removeChild(display);
    // 		}
    // 		this.cbTarget = this.cb = this.cbName = this.data = null;
    // 		if (!DBNode._pool[this.resName]) {
    // 			DBNode._pool[this.resName] = {};
    // 		}
    // 		if (!DBNode._pool[this.resName][this.resName]) {
    // 			DBNode._pool[this.resName][this.resName] = [];
    // 		}
    // 		DBNode._pool[this.resName][this.resName].push(this);
    // 	}
    // 	public play(name: string, loop: number = 1): void {
    // 		this.disPlayNode.play(name, loop);
    // 	}
    // 	public getWidth() {
    // 		return this.disPlayNode.width;
    // 	}
    // 	public getHeiht() {
    // 		return this.disPlayNode.height;
    // 	}
    // 	public setRotation(value: number) {
    // 		this.disPlayNode.rotation = value;
    // 	}
    // 	public getDisplay() {
    // 		return this.disPlayNode;
    // 	}
    // 	public setPostion(x: number, y: number): void {
    // 		this.disPlayNode.x = x;
    // 		this.disPlayNode.y = y;
    // 	}
    // 	public setVisible(value: boolean) {
    // 		this.disPlayNode.visible = value;
    // 	}
    // 	public setFinishedCallBack(cb: Function, cbTarget: Object, data?: any) {
    // 		this.cb = cb;
    // 		this.cbTarget = cbTarget;
    // 		this.data = data;
    // 	}
    // }
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle(texture, config) {
            var _this = _super.call(this, texture, config) || this;
            _this.addEventListener(egret.Event.COMPLETE, _this.playComplete, _this);
            return _this;
            // this.conf
        }
        Particle.prototype.playComplete = function () {
            if (this.cb) {
                this.cb.call(this.cbTarget, this.data);
            }
            this.destroy();
        };
        Particle.prototype.setFinishedCallBack = function (cb, cbTarget, data) {
            this.cb = cb;
            this.cbTarget = cbTarget;
            this.data = data;
        };
        Particle.clear = function () {
            //粒子动画播放会有bug,播放完必须得创建一个全屏大小的舞台,刷新真个舞台
            var rect = Particle._rect;
            if (!rect) {
                rect = new eui.Rect(Main.instance.stage.stageWidth, Main.instance.stage.stageHeight, 0x0000);
            }
            if (rect.parent) {
                return;
            }
            Main.instance.addChild(rect);
            rect.alpha = 1 / 255;
            rect.once(egret.Event.ENTER_FRAME, function (e) {
                if (rect.parent) {
                    rect.parent.removeChild(rect);
                }
            }, this);
        };
        Particle.prototype.destroy = function () {
            this.stop(true);
            if (this.parent) {
                this.parent.removeChild(this);
            }
            Particle.clear();
            this.cbTarget = this.cb = this.data = null;
        };
        return Particle;
    }(particle.GravityParticleSystem));
    Effect.Particle = Particle;
    __reflect(Particle.prototype, "Effect.Particle");
    /**
     * 播放帧动画
     */
    var FrameAni = (function (_super) {
        __extends(FrameAni, _super);
        // private
        function FrameAni() {
            var _this = _super.call(this) || this;
            /**
             *播放的帧率,默认为24帧
             */
            _this._frameRate = 1000 / 24;
            return _this;
        }
        FrameAni.prototype.setKey = function (_key) {
            this._key = _key;
        };
        /**
         *初始化帧动画
         *@param key:帧动画的key,通过这个key和maxFrame获取播放动画的贴图
         *@param maxFrame:帧动画最多有maxFrame帧,通过这个key和maxFrame获取播放动画的贴图
         *@param defaultSource:默认的贴图,播放帧动画之前的贴图
         */
        FrameAni.prototype.init = function (key, maxFrame, defaultSource) {
            this._key = key;
            this._maxFrame = maxFrame;
            if (defaultSource) {
                this._defaultSource = this.source = defaultSource;
            }
            else {
                this._defaultSource = this.source;
            }
            this.initFrameTexture();
        };
        /**
         * 获取所有播放的贴图
         * 根据拿到的贴图数量,更新_maxFrame的值
         */
        FrameAni.prototype.initFrameTexture = function () {
            var textures = this._textures = [];
            for (var i = 0; i < this._maxFrame; i++) {
                var texture = RES.getRes(this._key.format(i));
                if (texture) {
                    textures.push(texture);
                }
            }
            this._maxFrame = textures.length;
        };
        FrameAni.prototype.update = function () {
            this._curFrame++;
            if (this._curFrame === this._maxFrame) {
                this._curFrame = 0;
            }
            this.source = this._textures[this._curFrame];
        };
        /**
         * 停止播放动画
         */
        FrameAni.prototype.stop = function () {
            FrameManager.getInstance().delayRemoveHandler(this.hashCode);
        };
        /**
         * @param count:动画播放的次数,为0的话循环播放,默认为0
         * @param frameRate:动画播放的帧率,默认为24帧
         * @param startFrame:从哪一帧开始播放动画
         */
        FrameAni.prototype.start = function (count, frameRate, startFrame) {
            if (count === void 0) { count = 0; }
            if (frameRate === void 0) { frameRate = 1000 / 48; }
            if (startFrame === void 0) { startFrame = 0; }
            if (!this._key) {
                true && egret.error("You need to set frame key!!!!!");
                return;
            }
            if (startFrame >= this._maxFrame || this._maxFrame === 0) {
                true && egret.error("StartFrame outsize!!!!!");
                return;
            }
            this._curFrame = startFrame;
            FrameManager.getInstance().addTimerByKey(this.hashCode, this.update, this, frameRate, count * this._maxFrame - startFrame, this.complete, this);
        };
        /**
         * 动画播放完成
         */
        FrameAni.prototype.complete = function () {
            egret.log("complete");
            egret.Event.dispatchEvent(this, egret.Event.COMPLETE);
        };
        return FrameAni;
    }(eui.Image));
    Effect.FrameAni = FrameAni;
    __reflect(FrameAni.prototype, "Effect.FrameAni");
    /**
     * 创建一个喷金币的粒子效果
     *
     */
    function createSprayCoin(x, y) {
        var textureS = RES.getRes("jinbi_area_png");
        var config = RES.getRes("coinEruption_json");
        var _particle = new particle.GravityParticleSystem(textureS, config);
        SoundManage.playEffect("addGold");
        // particle.emitterX = Global.sWidth / 2;
        // particle.emitterY = Global.sHeight;
        _particle.emitterX = x;
        _particle.emitterY = y;
        _particle.start(1500);
        SceneManager.curScene.addChild(_particle);
        return _particle;
    }
    Effect.createSprayCoin = createSprayCoin;
    /**
     * 将一个对象,从屏幕左边移动到右边,移动到中间的时候,会停留一会
     */
    function showLeftToRight(object, cb, target, data, delay) {
        if (delay === void 0) { delay = 1000; }
        var width = Global.sWidth;
        var height = Global.sHeight;
        var tween = egret.Tween.get(object)
            .to({ x: (width - object.width) / 2, alpha: 1 }, 300, egret.Ease.sineInOut)
            .wait(delay)
            .to({ x: (width - object.width) / 2 + 100 }, 500)
            .to({ x: width }, 300, egret.Ease.sineIn);
        if (cb) {
            tween = tween.call(cb, target, data);
        }
        return tween;
    }
    Effect.showLeftToRight = showLeftToRight;
})(Effect || (Effect = {}));
//# sourceMappingURL=Effect.js.map