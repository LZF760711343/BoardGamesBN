var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
var Utils;
(function (Utils) {
    var url = "http://www.gzqidong.cn/test/SaveLog.php";
    var saveKey = "jianyiDebugKey";
    var id;
    var gameName;
    var LogManage = (function () {
        function LogManage() {
            this.max_size = 1024 * 10;
            this.str = "";
            this.warnStr = "";
            //this.initWebSocket();
        }
        /**
        * @private
        *
        */
        LogManage.prototype.onConnect = function () {
            this._log("onConnect");
            this.isConnect = true;
        };
        /**
         * @private
         *
         */
        LogManage.prototype.onClose = function () {
        };
        /**
         * @private
         *
         */
        LogManage.prototype.onError = function () {
            this._log("onError");
        };
        /**
         * @private
         *
         * @param message
         */
        LogManage.prototype.onSocketData = function (message) {
            // egret.log("onSocketData")
            // var dv = new net.ByteArray(message);
            // egret.log(message,dv.length ,dv.position)
            // egret.log(dv.readUTFBytes(dv.length - dv.position))
            // this._msgParse.parse(message);
            // let msg = this._msgParse.next();
            // while (msg) {
            //     this.isDispatchEvent && this.dispatchEventWith(WebSocket.SEND_MSG, false, msg);
            //     msg = this._msgParse.next();
            // }
        };
        LogManage.prototype.initWebSocket = function () {
            this.socket = new egret.ISocket();
            this.socket.addCallBacks(this.onConnect, this.onClose, this.onSocketData, this.onError, this);
            this.socket.connectByUrl("ws://192.168.0.178:10102");
            // egret.log("ws://192.168.0.178:10102")
            // let _webSocket = this._webSocket = new net.WebSocket();
            // _webSocket.connectByUrl("ws://localhost:10102");
            // _webSocket.addEventListener(net.WebSocket.SEND_MSG, this.addMsg, this);
            // _webSocket.once(egret.Event.CONNECT, onSuccess, this);
            // _webSocket.once(egret.IOErrorEvent.IO_ERROR, onError, this);
        };
        LogManage.prototype.addMsg = function () {
        };
        Object.defineProperty(LogManage, "instance", {
            get: function () {
                if (!LogManage._instance) {
                    LogManage._instance = new LogManage();
                    LogManage._instance.init();
                }
                return LogManage._instance;
            },
            enumerable: true,
            configurable: true
        });
        LogManage.init = function (_saveKey, _gameName, uploadUrl) {
            saveKey = _saveKey;
            gameName = _gameName;
            if (uploadUrl) {
                url = uploadUrl;
            }
            id = egret.localStorage.getItem(saveKey);
            if (!id) {
                id = Date.now() + "" + Math.floor(Math.random() * 100000);
                egret.localStorage.setItem(saveKey, id);
            }
            if (!LogManage._instance) {
                LogManage._instance = new LogManage();
                LogManage._instance.init();
            }
            // window.onerror = (error, url, line) => {
            // 	alert(error);
            // 	alert(url);
            // 	alert(line);
            // }
            window.onerror = function (error, url, line) {
                var sendData = {
                    PlayerId: Global.playerDto.id,
                    LocalId: id,
                    errorMsg: error,
                    errorFileName: url,
                    line: line,
                    gameName: gameName
                };
                var str = "{\n";
                for (var key in sendData) {
                    str += ("    " + key + ":" + sendData[key] + "\n");
                }
                str += "}";
                // alert(str);
                egret.log(str);
                // egret.log("playerId:$1\nid:$2\nerror:$3\nurl:$4\nline:$5".format(Global.playerDto.id, id, error, url, line));
                LogManage._instance.sendLog();
                return true;
            };
        };
        LogManage.prototype.init = function () {
            var _this = this;
            this._log = egret.log;
            this._date = new Date();
            var _log = egret.log;
            egret.log = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                _log.apply(void 0, [message].concat(optionalParams));
                _this.log(message + "   " + optionalParams.join("    "));
            };
        };
        LogManage.prototype.log = function (str) {
            this._date.setTime(Date.now());
            if (this.str.length >= this.max_size) {
                this.str = this._date.Format("hh:mm:ss:  ") + str;
            }
            else {
                this.str += ("\n" + this._date.Format("hh:mm:ss:  ") + str);
            }
            if (this.isConnect) {
                this.socket.send(str);
            }
        };
        /**
         * 发送数据到后台
         */
        LogManage.prototype.sendMsgToServer = function (str) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Global.requestDataAsync(url, { info: str })];
                        case 1:
                            response = _a.sent();
                            Toast.launch("发送成功!");
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 发送log到后台保存
         */
        LogManage.prototype.sendLog = function () {
            this.sendMsgToServer("/-------------------PlayerId:$1   NickName:$2\n".format(Global.playerDto.id, Global.playerDto.nickName) + this.str);
        };
        return LogManage;
    }());
    Utils.LogManage = LogManage;
    __reflect(LogManage.prototype, "Utils.LogManage");
})(Utils || (Utils = {}));
//# sourceMappingURL=LogManage.js.map