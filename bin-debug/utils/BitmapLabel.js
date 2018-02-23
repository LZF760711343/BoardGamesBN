var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils;
(function (Utils) {
    /**
     *
     * @author
     *
     */
    var imgCache = [];
    var BitmapLabel = (function (_super) {
        __extends(BitmapLabel, _super);
        function BitmapLabel(_key) {
            if (_key === void 0) { _key = ""; }
            var _this = _super.call(this) || this;
            _this._text = "";
            _this._key = _key;
            _this._imgList = [];
            _this._letterSpacing = 0;
            return _this;
        }
        Object.defineProperty(BitmapLabel.prototype, "text", {
            get: function () {
                return 0;
            },
            set: function (value) {
                var key = this._key;
                var _text = Math.round(value) + "";
                var length = _text.length;
                if (this._text.length < length) {
                    this.createImage(length - this._text.length);
                }
                else if (this._text.length > length) {
                    this.removeImage(this._text.length - length);
                }
                this._text = _text;
                this._x = 0;
                for (var i = 0; i < length; i++) {
                    var img = this.getChildAt(i);
                    img.source = RES.getRes(this._key + _text[i] + "_png");
                    img.x = this._x;
                    this._x += (img.width + this._letterSpacing);
                }
            },
            enumerable: true,
            configurable: true
        });
        BitmapLabel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BitmapLabel.prototype.setLetterSpacing = function (value) {
            this._letterSpacing = value;
        };
        BitmapLabel.prototype.setKey = function (value) {
            this._key = value;
        };
        Object.defineProperty(BitmapLabel.prototype, "key", {
            get: function () {
                return this._key;
            },
            set: function (value) {
                this._key = value;
                if (this._text.length) {
                    this.setText(this._text);
                }
            },
            enumerable: true,
            configurable: true
        });
        BitmapLabel.prototype.setText = function (_text, _key) {
            var key = _key || this._key;
            var length = _text.length;
            if (this._text.length < length) {
                this.createImage(length - this._text.length);
            }
            else if (this._text.length > length) {
                this.removeImage(this._text.length - length);
            }
            this._text = _text;
            this._x = 0;
            for (var i = 0; i < length; i++) {
                var img = this.getChildAt(i);
                //                var texture = <egret.Texture>RES.getRes(this._key + _text[i]);
                img.source = RES.getRes(key + _text[i] + "_png");
                img.x = this._x;
                this._x += (img.width + this._letterSpacing);
            }
        };
        BitmapLabel.prototype.createImage = function (count) {
            for (var i = count - 1; i >= 0; --i) {
                var img = imgCache.pop();
                if (!img) {
                    img = new eui.Image();
                }
                this.addChild(img);
            }
        };
        BitmapLabel.prototype.removeImage = function (count) {
            for (var i = count - 1; i >= 0; --i) {
                imgCache.push(this.removeChildAt(this.numChildren - 1));
            }
        };
        return BitmapLabel;
    }(eui.Component));
    Utils.BitmapLabel = BitmapLabel;
    __reflect(BitmapLabel.prototype, "Utils.BitmapLabel");
})(Utils || (Utils = {}));
//# sourceMappingURL=BitmapLabel.js.map