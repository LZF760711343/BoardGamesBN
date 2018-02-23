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
    var pool = [];
    var ChipsObj = (function (_super) {
        __extends(ChipsObj, _super);
        function ChipsObj() {
            var _this = _super.call(this) || this;
            _this.bgStr = '';
            _this.icon = "";
            _this.skinName = zjh.ChipsBtnSkin;
            _this.touchEnabled = _this.touchChildren = false;
            return _this;
        }
        ChipsObj.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ChipsObj.prototype.destroy = function () {
            if (this.parent) {
                this.parent.removeChild(this);
                pool.push(this);
            }
        };
        ChipsObj.clearPool = function () {
            // pool = []
        };
        ChipsObj.create = function (bgStr, icon) {
            var chipsObj;
            if (pool.length) {
                chipsObj = pool.pop();
            }
            else {
                chipsObj = new ChipsObj();
            }
            chipsObj.bgStr = bgStr;
            chipsObj.icon = icon;
            return chipsObj;
        };
        return ChipsObj;
    }(eui.Component));
    zjh.ChipsObj = ChipsObj;
    __reflect(ChipsObj.prototype, "zjh.ChipsObj");
})(zjh || (zjh = {}));
//# sourceMappingURL=ChipsObj.js.map