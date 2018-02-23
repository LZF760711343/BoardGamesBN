// TypeScript file
namespace Layers {
    export class HintLayer extends BaseLayer {
        private _rightBtn: UI.CommonBtn;
        private _leftBtn: UI.CommonBtn;
        private _tipslabel: eui.Label;
        private _topText:eui.Label;
        public data: model.COMMON_BOX;
        private openLayer:egret.tween.TweenGroup;
        /**
         * 只有一个按钮,有标题
         */
        public static SURE: string = "sure";
        /**
         * 两个按钮,有标题
         */
        public static SURE_CANNEL: string = "sureCannel";
        /**
         * 只有一个按钮,没有标题
         */
        public static SURE2: string = "sure2";
        /**
         * 两个按钮,没有标题
         */
        public static SURE_CANNEL2: string = "sureCannel2";
         /**
         * 只有一个按钮,有标题,宽度高度缩小版
         */
        public static SURE3: string = "sure3";
        
        public constructor() {
            super();
            this.data = {
                leftBtnBg: "button_Bred_png",
                leftBtnIcon: "确 定",
                rightBtnBg: "button_Bred_png",
                rightBtnIcon: "拒 绝",
                title: "tishi_text_png",
                tipsStr: "",
                curState: HintLayer.SURE,
            };
            this.skinName = HintLayerSkin;
        }
        public close(): void {
            closeLayer(this);
            this.dispatchEventWith(egret.Event.CLOSE);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        public static create() {
            let alert = new HintLayer();
            // alert.init(params);
            return alert;
        }
		public open(bgType: BG_TYPE = BG_TYPE.GRAY, aniType:ANI_TYPE = ANI_TYPE.CENTER1) {
			openLayer(this, bgType, aniType);
			return this;
		}
        public recharge(){
             new Layers.RechargeLayer(0).open();
             this.close();
        }
        /**
         * @param params:
         */
        public init(params: model.COMMON_BOX) {
            for (let key in params) {
                this.data[key] = params[key];
            }
            if(params.leftFunc){
                this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, params.leftFunc, params.leftThisObj);
            }
            if(params.rightFunc){
                this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, params.rightFunc, params.rightThisObj);
            }
            this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            return this;
        }
         public initrecharge(params: model.COMMON_BOX) {
            for (let key in params) {
                this.data[key] = params[key];
            }
            if(params.leftFunc){
                this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, params.leftFunc, params.leftThisObj);
            }
            if(params.rightFunc){
                this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, params.rightFunc, params.rightThisObj);
            }
            this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.recharge, this);
            this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            return this;
        }
    }
}
