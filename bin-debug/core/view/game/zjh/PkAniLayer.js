var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zjh;
(function (zjh) {
    /**
     * 提示条的状态
     */
    zjh.PKAuiStatu = {
        /**
         * 赢,
         */
        LEFT_WIN: "left_win",
        /**
         *  输
         */
        LEFT_LOSE: "left_lose",
    };
    var PKAniLayer = (function (_super) {
        __extends(PKAniLayer, _super);
        function PKAniLayer() {
            var _this = _super.call(this) || this;
            _this.Win = false;
            return _this;
        }
        PKAniLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._card1.setBack();
            this._card2.setBack();
            this._card3.setBack();
            this._card4.setBack();
            this._card5.setBack();
            this._card6.setBack();
            this._win.addEventListener('complete', this.onTweenGroupComplete, this);
        };
        PKAniLayer.prototype.onTweenGroupComplete = function () {
            this.visible = false;
            this.callb.call(this.thisO);
        };
        PKAniLayer.prototype.init = function (py, py1, callBack, thisOjb) {
            this._playImgs.setIcon(py.UserInfo.headImages);
            this._playerName.text = py.UserInfo.nickName;
            this._playerGlod.text = py.chips + "";
            this._OplayImgs.setIcon(py1.UserInfo.headImages);
            this._OplayerName.text = py1.UserInfo.nickName;
            this._OplayerGlod.text = py1.chips + "";
            this.callb = callBack;
            this.thisO = thisOjb;
        };
        PKAniLayer.prototype.destroy = function () {
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
        };
        Object.defineProperty(PKAniLayer.prototype, "curState", {
            get: function () {
                return this.currentState;
            },
            set: function (v) {
                this.currentState = v;
                switch (v) {
                    case zjh.PKAuiStatu.LEFT_WIN:
                        this._win.play(0);
                        break;
                    case zjh.PKAuiStatu.LEFT_LOSE:
                        this._win.play(0);
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        return PKAniLayer;
    }(eui.Component));
    zjh.PKAniLayer = PKAniLayer;
    __reflect(PKAniLayer.prototype, "zjh.PKAniLayer");
})(zjh || (zjh = {}));
//# sourceMappingURL=PkAniLayer.js.map