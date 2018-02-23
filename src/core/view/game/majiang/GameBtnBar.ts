/**
 *
 * @author he
 *
 */
namespace majiang {
    // export const BTNBAR_EVENT = {
    //     NONE: "NONE",
    //     /**
    //      * 抢/叫地主超时回调
    //      */
    //     CALL: "call",
    //     /**
    //      * 出牌超时的回调
    //      */
    //     PLAY: "play",//出牌
    //     // CAL: "cal",//算牛
    //     // BU: "bu",//补牌回调
    //     // BI: "bi",//比牌回调
    //     /**
    //      * 准备超时回调
    //      */
    //     READY: "ready",
    // }
    /**
     * 抢/叫地主超时时间
     */
    export const CALL_LANDLORD_TIME = 10;
    /**
     * 出牌的超时时间
     */
    export const PLAY_CARD_TIME = 15;
    export const BTN_BAR_STATUS = {
        NONE: "none",
        /**
         * 已经准备状态
         */
        READY: "ready",
        /**
         * 已经准备和换桌状态
         */
        GOLDREADY: "goldready",
        // /**
        //  * 显示抢/不抢地主按钮
        //  */
        // GRAB: "grab",
        // /**
        //  * 显示叫/不叫地主按钮
        //  */
        // CALL: "call",
        // /**
        //  * 显示加不加倍按钮
        //  */
        // DOUBLE: "double",
        // /**
        //  * 显示出牌/不要/提示按钮
        //  */
        // SHOWCARD: "showCard",
        // /**
        //  * 显示叫分按钮
        //  */
        // CALLFEN: "callfen",
    };
    export class GameBtnBar extends eui.Component {
        public btnChangeDesk: UI.GrayBtn;
        public btnReady: UI.GrayBtn;

        constructor() {
            super();
            // this._isCb = false;
        }
        public set curState(value: string) {
            this.currentState = value;
        }
        public get curState() {
            return this.currentState;
        }
        protected createChildren(): void {
            super.createChildren();
        }
    }
}
