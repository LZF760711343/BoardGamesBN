namespace Layers {
    export class DrawLayer extends BaseLayer {
        private _get1: eui.Group;
        private _get2: eui.Group;
        private _get3: eui.Group;
        private _get4: eui.Group;
        private _get5: eui.Group;
        private _get6: eui.Group;
        private _get7: eui.Group;
        private _groud1: eui.Group;
        private _groud2: eui.Group;
        private _groud3: eui.Group;
        private _groud4: eui.Group;
        private _groud5: eui.Group;
        private _groud6: eui.Group;
        private _groud7: eui.Group;
        private grouds: eui.Group[];
        private gets: eui.Group[];
        private _qiandaolingqu: UI.CommonBtn;
        private _initFinish: boolean;
        private _data: model.QiandaoInfo;
        public constructor(data: model.QiandaoInfo) {
            super([ResManager.GROUP_NAME.WELFARE_CENTER, ResManager.GROUP_NAME.RECHARGE]);
            this.skinName = DrawDaySkin;
            this._data = data;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.gets = [this._get1, this._get2, this._get3, this._get4, this._get5, this._get6, this._get7];
            this._initFinish = true;
            this._qiandaolingqu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qiandao, this);
            this.init(this._data);
        }

        private qiandaoConst = ["3000", "4000", "5000", "6000", "7000", "8000", "9000", "3000"];

        private qiandao() {

            // if (this._data.canQd == 1) {
            //     Toast.launch(`恭喜您成功领取 ${this.qiandaoConst[this._data.qiandaoCount]}金币`);
            // }
            net.SendMsg.create({}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_QITIAN_QIANDAO).send();
            this.close();
            let particle = Effect.createSprayCoin(Global.sWidth / 2, Global.sHeight);
        }

        public init(data: model.QiandaoInfo) {
            this._data = data;
            if (this._initFinish) {
                let Count = data.qiandaoCount;
                let canQd = data.canQd;
                egret.log("this._data", this._data);
                // let l =Count % 7
                // if (){

                // }
                for (let i = 0; i < 7; i++) {
                    if (Count > i) {
                        this.gets[i].visible = true;
                    }
                    // else if (Count == i) {
                    //     if (canQd == 1) {
                    //         this.gets[i].visible = true;
                    //     }
                    // }

                }
            }

        }

    }

}