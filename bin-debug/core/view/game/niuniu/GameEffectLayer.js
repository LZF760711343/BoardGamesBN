var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var niuniu;
(function (niuniu) {
    /**
     * 游戏特效层
     */
    var GameEffectLayer = (function (_super) {
        __extends(GameEffectLayer, _super);
        function GameEffectLayer() {
            return _super.call(this) || this;
        }
        /**
         * 创建从一个玩家飞到另外一个玩家的飞金币动画,返回值为动画播放总时间
         */
        GameEffectLayer.prototype.createCoinsEffect = function (point1, point2, callBack, target, data) {
            var _this = this;
            //获取纹理
            var texture = RES.getRes("iconCoin_png");
            //获取配置
            var config = Config.coinsParticleConf;
            //启动粒子库
            var length = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
            var b1 = point2.x - point1.x;
            var b2 = point2.y - point1.y;
            var angle = Math.asin(b2 / length) * 180 / Math.PI;
            if (point1.x > point2.x) {
                angle = -180 - angle;
            }
            config.emitAngle = angle;
            config.speed = 1300;
            config.lifespan = length * 1000 / config.speed;
            config.emitAngleVariance = 4;
            config.maxParticles = 60;
            var particle = new Effect.Particle(texture, config);
            particle.start(400);
            particle.x = point1.x;
            particle.y = point1.y;
            this.addChild(particle);
            this._aniList.push(particle);
            egret.Point.release(point1);
            egret.Point.release(point2);
            return new Promise(function (finishFunc) {
                particle.addEventListener(egret.Event.COMPLETE, function () {
                    this.removeAni(particle);
                    if (callBack) {
                        callBack.call(target, data);
                    }
                    finishFunc();
                }, _this);
            });
        };
        return GameEffectLayer;
    }(GameEffectLayerBase));
    niuniu.GameEffectLayer = GameEffectLayer;
    __reflect(GameEffectLayer.prototype, "niuniu.GameEffectLayer");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameEffectLayer.js.map