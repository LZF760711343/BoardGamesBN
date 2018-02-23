namespace zjh {
    /**
	 * 提示条的状态
	 */
    export const PKAuiStatu = {
		/**
		 * 赢,
		 */
        LEFT_WIN: "left_win",
		/**
		 *  输
		 */
        LEFT_LOSE: "left_lose",
    }

    export class PKAniLayer extends eui.Component {
        public _playImgs: UI.HeadBox;
        public _OplayImgs: UI.HeadBox;
        private _playerName: eui.Label;
        private _playerGlod: eui.Label;
        private _OplayerName: eui.Label;
        private _OplayerGlod: eui.Label;
        // private _card = 
        private _card1: zjh.Card;
        private _card2: zjh.Card;
        private _card3: zjh.Card;
        private _card4: zjh.Card;
        private _card5: zjh.Card;
        private _card6: zjh.Card;

        private callb: Function;
        private thisO: Object;

        private Win: boolean = false;
        public _win: egret.tween.TweenGroup;


        public constructor() {
            super();
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._card1.setBack();
            this._card2.setBack();
            this._card3.setBack();
            this._card4.setBack();
            this._card5.setBack();
            this._card6.setBack();
            this._win.addEventListener('complete', this.onTweenGroupComplete, this);
        }

        public onTweenGroupComplete() {
            this.visible = false;
            this.callb.call(this.thisO);
        }

        public init(py: model.ZJH_PLAYER_INFO, py1: model.ZJH_PLAYER_INFO, callBack: Function, thisOjb: Object) {
            this._playImgs.setIcon(py.UserInfo.headImages)
            this._playerName.text = py.UserInfo.nickName;
            this._playerGlod.text = py.chips + "";
            this._OplayImgs.setIcon(py1.UserInfo.headImages)
            this._OplayerName.text = py1.UserInfo.nickName;
            this._OplayerGlod.text = py1.chips + "";
            this.callb = callBack;
            this.thisO = thisOjb;
        }
        public destroy() {
        //     if (this._card1) {
        //         this._card1.destroy();
        //         this._card2.destroy();
        //         this._card3.destroy();
        //         this._card4.destroy();
        //         this._card5.destroy();
        //         this._card6.destroy();
        //         this._card1
        //             = this._card2
        //             = this._card3
        //             = this._card4
        //             = this._card5
        //             = this._card6
        //             = null;
        //     }
        }
        public get curState(): string {
            return this.currentState;
        }
        public set curState(v: string) {
            this.currentState = v;
            switch (v) {
                case PKAuiStatu.LEFT_WIN:
                    this._win.play(0);

                    break;
                case PKAuiStatu.LEFT_LOSE:
                    this._win.play(0);
                    break;
            }
        }
    }
}