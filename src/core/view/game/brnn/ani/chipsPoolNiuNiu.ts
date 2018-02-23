namespace niuniu.brnn {
    export const SCPNStatu = {
		/**
		 * 不显示
		 */
        NONE: "none",
		/**
		 * 胜利
		 */
        PLAY: "play",
    }
    export class chipsPoolNiuNiu extends eui.Component {
        public _play: egret.tween.TweenGroup;

        public constructor() {
            super();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        }
        private onExit() {
            this._play.stop();
        }

        // public get curState(): string {
        // 	return this.currentState;
        // }
        public set curState(v: string) {
            switch (v) {
                case SCPNStatu.PLAY:
                    this._play.play(0);
                    break;
                case SCPNStatu.NONE:
                    this._play.stop();
                    break;
                default:
                    this._play.pause();
                    break;
            }
        }


    }
}