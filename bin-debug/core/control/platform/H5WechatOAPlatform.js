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
var nest;
(function (nest) {
    /**
     * 微信公众号
     */
    var H5WechatOAPlatform = (function (_super) {
        __extends(H5WechatOAPlatform, _super);
        function H5WechatOAPlatform() {
            var _this = _super.call(this) || this;
            _this.appid = Config.WX_APPID;
            _this.redirectUri = Config.MAG_SERVER + "/QiDong/wx_login/index.php?appid=$1&url=$2";
            _this.wechatUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=$1&redirect_uri=$2&response_type=code&scope=snsapi_userinfo#wechat_redirect";
            return _this;
        }
        H5WechatOAPlatform.prototype.init = function () {
        };
        H5WechatOAPlatform.prototype.pay = function (pid, unionid, openid, body) {
            return __awaiter(this, void 0, void 0, function () {
                var url, response, data_1, jsApiCall, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = (Config.URLS.weChatRechargeUrl + "?pid=$1&body=$2&unionid=$3&openid=$4&playerid=$5&serverid=$6").format(pid, body, unionid, openid, Global.playerDto.id, Config.SERVER_ID);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, Global.requestDataAsync(url, {})];
                        case 2:
                            response = _a.sent();
                            data_1 = JSON.parse(response);
                            jsApiCall = function () {
                                WeixinJSBridge.invoke('getBrandWCPayRequest', data_1, function (res) {
                                    // if (res.err_msg == 'get_brand_wcpay_request:ok') {
                                    // 	alert("success!!!");
                                    // } else {
                                    // 	alert("fail!!!" + res.err_msg);
                                    // }
                                });
                            };
                            if (typeof WeixinJSBridge == "undefined") {
                                if (document.addEventListener) {
                                    document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                                }
                                else if (document["attachEvent"]) {
                                    document["attachEvent"]('WeixinJSBridgeReady', jsApiCall);
                                    document["attachEvent"]('onWeixinJSBridgeReady', jsApiCall);
                                }
                            }
                            else {
                                jsApiCall();
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            egret.log(error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return H5WechatOAPlatform;
    }(nest.H5WebBase));
    nest.H5WechatOAPlatform = H5WechatOAPlatform;
    __reflect(H5WechatOAPlatform.prototype, "nest.H5WechatOAPlatform");
    if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB && Gzqd && Gzqd.isWeiXin()) {
        nest.Platform = H5WechatOAPlatform;
    }
})(nest || (nest = {}));
//# sourceMappingURL=H5WechatOAPlatform.js.map