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
var Layers;
(function (Layers) {
    var BindingPhoneLayer = (function (_super) {
        __extends(BindingPhoneLayer, _super);
        function BindingPhoneLayer() {
            var _this = _super.call(this, ["h_area_png", ResManager.GROUP_NAME.WELFARE_CENTER]) || this;
            _this.skinName = BindingPhoneSkin;
            _this._CountDownBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.sendNote, _this);
            _this._quding.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.sendCode, _this);
            return _this;
        }
        BindingPhoneLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.count = 60;
        };
        BindingPhoneLayer.prototype.sendCode = function () {
            return __awaiter(this, void 0, void 0, function () {
                var params, response, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._yanzhengText.text == "" || this._phoneText.text == "")) return [3 /*break*/, 1];
                            Toast.launch("请输入正确的手机号或验证码！");
                            return [3 /*break*/, 7];
                        case 1:
                            params = "?tel=" + this._phoneText.text + "&playerid=" + Global.playerDto.id + "&serverid=" + Config.SERVER_ID + "&ver_code=" + this._yanzhengText.text;
                            if (!/^[0-9]*$/.test(this._yanzhengText.text)) return [3 /*break*/, 6];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, Global.requestDataAsync(Config.URLS.sendverifynote + params, {})];
                        case 3:
                            response = _a.sent();
                            data = JSON.parse(response);
                            egret.log("data", data);
                            if (data.return_code == 0) {
                                Global.playerDto.mobile = this._phoneText.text;
                                this.close();
                                if (this.timer) {
                                    egret.clearInterval(this.timer);
                                }
                            }
                            Toast.launch(data.return_msg);
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            egret.log(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            Toast.launch("验证码输入有误，请重填");
                            _a.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        BindingPhoneLayer.prototype.countdown = function () {
            this.count--;
            this._CountDownLab.text = this.count + "秒后重新获取";
            if (this.count <= 0) {
                this.count = 60; //重新赋值 
                this._CountDownBtn.visible = true;
                this._CountDownLab.visible = false;
                if (this.timer) {
                    egret.clearInterval(this.timer);
                }
            }
        };
        BindingPhoneLayer.prototype.onClose = function (aniType) {
            if (aniType === void 0) { aniType = 1 /* CENTER1 */; }
            if (this.timer) {
                egret.clearInterval(this.timer);
            }
            this.close();
        };
        BindingPhoneLayer.prototype.sendNote = function () {
            return __awaiter(this, void 0, void 0, function () {
                var params, response, data, self, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = "?tel=" + this._phoneText.text + "&playerid=" + Global.playerDto.id + "&serverid=" + Config.SERVER_ID;
                            if (!!(/^1[34578]\d{9}$/.test(this._phoneText.text))) return [3 /*break*/, 1];
                            Toast.launch("手机号码有误，请重填");
                            return [3 /*break*/, 4];
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, Global.requestDataAsync(Config.URLS.sendnote + params, {})];
                        case 2:
                            response = _a.sent();
                            data = JSON.parse(response);
                            self = this;
                            self._CountDownBtn.visible = false;
                            self._CountDownLab.visible = true;
                            self.timer = egret.setInterval(self.countdown, self, 1000);
                            // setTimeout(function () {
                            //     self._CountDownBtn.visible = true;
                            //     self._CountDownLab.visible = false;
                            //     if (self.timer) {
                            //         egret.clearInterval(self.timer);
                            //     }
                            // }, 60000);
                            Toast.launch(data.return_msg);
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            egret.log(error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return BindingPhoneLayer;
    }(Layers.BaseLayer));
    Layers.BindingPhoneLayer = BindingPhoneLayer;
    __reflect(BindingPhoneLayer.prototype, "Layers.BindingPhoneLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=BindingPhoneLayer.js.map