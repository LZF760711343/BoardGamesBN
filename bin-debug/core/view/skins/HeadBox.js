var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var UI;
(function (UI) {
    var HeadBox = (function (_super) {
        __extends(HeadBox, _super);
        function HeadBox() {
            return _super.call(this) || this;
        }
        HeadBox.prototype.childrenCreated = function () {
            var self = this;
            _super.prototype.childrenCreated.call(this);
        };
        HeadBox.prototype.getImgSuccess = function (data) {
            if (typeof data != "undefined") {
                this._img.source = data;
            }
            else {
            }
        };
        HeadBox.prototype.getImgError = function (data) {
        };
        HeadBox.prototype.setIcon = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var data, data_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!value) return [3 /*break*/, 4];
                            this._icon = value;
                            data = RES.getRes(value);
                            if (!data) return [3 /*break*/, 1];
                            this._img.source = data;
                            return [3 /*break*/, 3];
                        case 1:
                            this._img.source = DEFAULT_HEAD_IMG;
                            return [4 /*yield*/, ResManager.getResByUrl(value, RES.ResourceItem.TYPE_IMAGE)];
                        case 2:
                            data_1 = _a.sent();
                            if (this._icon === value) {
                                if (typeof data_1 != "undefined") {
                                    this._img.source = data_1;
                                }
                            }
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            this._icon = this._img.source = DEFAULT_HEAD_IMG;
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        // public setIcon(value: string) {
        // 	if (value) {
        // 		let data = RES.getRes(value);
        // 		if (data) {
        // 			this._img.source = data;
        // 		}
        // 		else {
        // 			this._img.source = DEFAULT_HEAD_IMG;
        // 			ResManager.getResByUrl(value, RES.ResourceItem.TYPE_IMAGE).then(this.getImgSuccess.bind(this));
        // 		}
        // 	}else{
        // 		this._img.source = DEFAULT_HEAD_IMG;
        // 	}
        // }
        /**
         * 设置离线标识
         */
        HeadBox.prototype.setOffTip = function () {
            if (this._offTip)
                return;
            var _offLineTip = this._offTip = new eui.Rect();
            _offLineTip.alpha = 0.5;
            _offLineTip.percentWidth = _offLineTip.percentHeight = 100;
            this.addChildAt(_offLineTip, this.getChildIndex(this._img) + 1);
            var label = new eui.Label();
            label.size = 30;
            label.fontFamily = "微软雅黑";
            label.text = GameLangs.offLine;
            _offLineTip.addChild(label);
            label.textColor = 0xe6e6e6;
            label.x = (this.width - label.width) / 2;
            label.y = (this.height - label.height) / 2;
        };
        /**
         * 移除离线标识
         */
        HeadBox.prototype.removeOffTip = function () {
            if (this._offTip) {
                this.removeChild(this._offTip);
                this._offTip = null;
            }
        };
        return HeadBox;
    }(eui.Component));
    UI.HeadBox = HeadBox;
    __reflect(HeadBox.prototype, "UI.HeadBox");
})(UI || (UI = {}));
//# sourceMappingURL=HeadBox.js.map