namespace zjh {
	/**
	 * 游戏特效层
	 */
	export class GameEffectLayer extends GameEffectLayerBase {
		
		public constructor() {
			super();
		}
		/**
		 * 创建从一个玩家飞到另外一个玩家的飞金币动画,返回值为动画播放总时间
		 */
		public createCoinsEffect(point1: egret.Point, point2: egret.Point, callBack?: Function, target?: Object, data?: any) {
			//获取纹理
			let texture = RES.getRes("iconCoin_png");
			//获取配置
			let config = Config.coinsParticleConf;
			//启动粒子库
			let length = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
			let b1 = point2.x - point1.x;
			let b2 = point2.y - point1.y;
			let angle = Math.asin(b2 / length) * 180 / Math.PI;
			if (point1.x > point2.x) {
				angle = -180 - angle;
			}
			config.emitAngle = angle;
			config.speed = 1300;
			config.lifespan = length * 1000 / config.speed;
			config.emitAngleVariance = 4;
			config.maxParticles = 60;
			let particle = new Effect.Particle(texture, config);
			particle.start(600);
			particle.x = point1.x;
			particle.y = point1.y;
			this.addChild(particle);
			this._aniList.push(particle);
			egret.Point.release(point1);
			egret.Point.release(point2);
			return new Promise((finishFunc:Function) => {
				particle.addEventListener(egret.Event.COMPLETE, function () {
					this.removeAni(particle);
					if (callBack) {
						callBack.call(target, data);
					}
					finishFunc();
				}, this);
			});
		}

		
	}
}