/**
 *
 * @author 
 *
 */
namespace UI {
    export class CommonBtn extends eui.Button{
        public bgStr:string = '';
        // public extData: any;
        public bgGrayStr:string = '';
        public upStr:string = "";
        public downStr:string= "";
        public disabledStr:string= "";
        public data:any;
    	public constructor() {
            super();
            // this.touchChildren = false;
    	}
    	/**
         * @language en_US
         * This method is called when handling a <code>egret.TouchEvent.TOUCH_END</code> event
         * when the user touches on the button. It is only called when the button
         * is the target and when <code>touchCaptured</code> is <code>true</code>.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当在用户单击按钮之后处理 <code>egret.TouchEvent.TOUCH_END</code> 事件时，将调用此方法。
         * 仅当以按钮为目标，并且 <code>touchCaptured</code> 为 <code>true</code> 时，才会调用此方法。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected buttonReleased():void {
            egret.log("buttonReleased")
            SoundManage.playEffect('btnClick');
        }
    }
}