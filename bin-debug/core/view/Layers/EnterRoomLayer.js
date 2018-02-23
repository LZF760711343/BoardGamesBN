var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layers;
(function (Layers) {
    var EnterRoomLayer = (function (_super) {
        __extends(EnterRoomLayer, _super);
        function EnterRoomLayer() {
            var _this = _super.call(this, ["kuang1_png"]) || this;
            _this._text = "";
            _this.skinName = EnterRoomLayerSkin;
            return _this;
        }
        EnterRoomLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self._btnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchBtns, self);
            // self._erLabels.
            this._erLabels = [this._roomLab1, this._roomLab2, this._roomLab3, this._roomLab4, this._roomLab5, this._roomLab6];
        };
        Object.defineProperty(EnterRoomLayer.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
                for (var i = 0; i < 6; i++) {
                    var ch = value[i];
                    if (ch) {
                        this._erLabels[i].visible = true;
                        this._erLabels[i].text = ch;
                    }
                    else {
                        this._erLabels[i].visible = false;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        EnterRoomLayer.prototype.sendEnterRoomMsg = function (roomId) {
            net.SendMsg.create({ roomId: roomId }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_ENTER_SCORE_ROOM).send();
        };
        EnterRoomLayer.prototype.touchBtns = function (event) {
            //重输
            if (event.target.name == "r") {
                this.text = "";
            }
            else if (event.target.name == "d") {
                if (this.text.length > 0) {
                    this.text = this.text.substr(0, this.text.length - 1);
                }
            }
            else {
                if (this._text.length < 6) {
                    this.text += event.target.name;
                    if (this._text.length == 6) {
                        this.sendEnterRoomMsg(parseInt(this._text));
                    }
                }
            }
        };
        return EnterRoomLayer;
    }(Layers.BaseLayer));
    Layers.EnterRoomLayer = EnterRoomLayer;
    __reflect(EnterRoomLayer.prototype, "Layers.EnterRoomLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=EnterRoomLayer.js.map