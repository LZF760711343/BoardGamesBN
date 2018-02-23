var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var net;
(function (net) {
    var changeList = [
        "NickName",
        "nickName",
        "salePlayerNickName",
        "buyPlayerNickName",
    ];
    // if (this.datas["NickName"]) {
    // 			this.datas["NickName"] = StringUtil.decodeBase64(this.datas["NickName"]);
    // 		} else if (this.datas["nickName"]) {
    // 			this.datas["nickName"] = StringUtil.decodeBase64(this.datas["nickName"]);
    // 		}else if (this.datas["salePlayerNickName"]) {
    // 			this.datas["salePlayerNickName"] = StringUtil.decodeBase64(this.datas["salePlayerNickName"]);
    // 		}else if (this.datas["buyPlayerNickName"]) {
    // 			this.datas["buyPlayerNickName"] = StringUtil.decodeBase64(this.datas["buyPlayerNickName"]);
    // 		}
    var ReceiveMsg = (function () {
        function ReceiveMsg(headCode, //包头标识[int]
            msgLen, //消息体长度[int]
            serialNum, //流水号[int]
            reqTime, //客户端请求时间[long]
            repTime, //服务器响应时间[long]
            msgType, //消息对象类型[int]
            compressType, //压缩标示[byte]
            moduleId, //模块ID[int]
            orderId, //命令ID[int]
            stateCode, //状态码[int]
            datas) {
            this.headCode = headCode;
            this.msgLen = msgLen;
            this.serialNum = serialNum;
            this.reqTime = reqTime;
            this.repTime = repTime;
            this.msgType = msgType;
            this.compressType = compressType;
            this.moduleId = moduleId;
            this.orderId = orderId;
            this.stateCode = stateCode;
            if (datas) {
                this.datas = JSON.parse(datas);
                this.check();
            }
        }
        ReceiveMsg.prototype.setDatas = function (headCode, //包头标识[int]
            msgLen, //消息体长度[int]
            serialNum, //流水号[int]
            reqTime, //客户端请求时间[long]
            repTime, //服务器响应时间[long]
            msgType, //消息对象类型[int]
            compressType, //压缩标示[byte]
            moduleId, //模块ID[int]
            orderId, //命令ID[int]
            stateCode, //状态码[int]
            datas) {
            this.serialNum = serialNum;
            this.headCode = headCode;
            this.msgLen = msgLen;
            this.reqTime = reqTime;
            this.repTime = repTime;
            this.msgType = msgType;
            this.compressType = compressType;
            this.moduleId = moduleId;
            this.orderId = orderId;
            this.stateCode = stateCode;
            // this.datas = JSON.parse(datas);
            if (datas) {
                this.datas = JSON.parse(datas);
            }
            // this.msgCode = msgCode;
            // this.msgName = msgName;
            // this.datas = datas;
            // this.cvt_result = [];
            // this.curReadPos = 0;
        };
        /**
         * 由于emoji字符原因,暂时将NickName转为base64编码存入数据库,后续有时间再进行优化
         */
        ReceiveMsg.prototype.check = function () {
            // if(this.datas){
            var arrLen = changeList.length;
            for (var i = 0; i < arrLen; i++) {
                if (this.datas[changeList[i]]) {
                    this.datas[changeList[i]] = StringUtil.decodeBase64(this.datas[changeList[i]]);
                }
            }
            // if (this.datas["NickName"]) {
            // 	this.datas["NickName"] = StringUtil.decodeBase64(this.datas["NickName"]);
            // } else if (this.datas["nickName"]) {
            // 	this.datas["nickName"] = StringUtil.decodeBase64(this.datas["nickName"]);
            // }else if (this.datas["salePlayerNickName"]) {
            // 	this.datas["salePlayerNickName"] = StringUtil.decodeBase64(this.datas["salePlayerNickName"]);
            // }else if (this.datas["buyPlayerNickName"]) {
            // 	this.datas["buyPlayerNickName"] = StringUtil.decodeBase64(this.datas["buyPlayerNickName"]);
            // }
            // }
        };
        ReceiveMsg.prototype.print = function () {
            if (true) {
                egret.log("RECE<< " + this);
                egret.log(JSON.stringify(this.datas));
            }
            // if(this.datas){
            // 	Utils.printObject(this.datas);
            // }
        };
        ReceiveMsg.prototype.toString = function () {
            return OrderNameMap[this.moduleId][this.orderId] + ",\u547D\u4EE4ID:" + this.orderId + ",\u6D88\u606F\u4F53\u957F\u5EA6:" + this.msgLen + "\u6A21\u5757ID:" + this.moduleId + ",\u72B6\u6001\u7801:" + this.stateCode;
        };
        ReceiveMsg.prototype.destroy = function () {
            this.datas = null;
            ReceiveMsg._pool.push(this);
        };
        /**
         * 从对象池中取出或创建一个新的消息对象。
         * @param msgCode 消息协议值
         * @param msgName 消息协议名
         * @param datas 消息数据
         */
        ReceiveMsg.create = function (headCode, //包头标识[int]
            msgLen, //消息体长度[int]
            serialNum, //流水号[int]
            reqTime, //客户端请求时间[long]
            repTime, //服务器响应时间[long]
            msgType, //消息对象类型[int]
            compressType, //压缩标示[byte]
            moduleId, //模块ID[int]
            orderId, //命令ID[int]
            stateCode, //状态码[int]
            datas) {
            if (true) {
                if (!(moduleId == 1 /* PLAYER */ && orderId == PlayerOrder.HEART_BEAT)) {
                    egret.log("RECE<< " + (OrderNameMap[moduleId][orderId] + ",\u547D\u4EE4ID:" + orderId + ",\u6D88\u606F\u4F53\u957F\u5EA6:" + msgLen + "\u6A21\u5757ID:" + moduleId));
                    egret.log(datas);
                }
            }
            if (ReceiveMsg._pool.length) {
                var msg = ReceiveMsg._pool.pop();
                msg.setDatas(headCode, msgLen, serialNum, reqTime, repTime, msgType, compressType, moduleId, orderId, stateCode, datas);
                return msg;
            }
            else {
                return new ReceiveMsg(headCode, msgLen, serialNum, reqTime, repTime, msgType, compressType, moduleId, orderId, stateCode, datas);
            }
        };
        /**
         * 释放一个事件对象，并缓存到对象池。
         * 注意：此方法只能传入由ReceiveMsg.create()创建的事件实例，传入非法对象实例可能会导致报错。
         * @param msg 缓存的对象
         * */
        ReceiveMsg.release = function (msg) {
            msg.datas = null;
            ReceiveMsg._pool.push(msg);
        };
        return ReceiveMsg;
    }());
    ReceiveMsg._pool = [];
    net.ReceiveMsg = ReceiveMsg;
    __reflect(ReceiveMsg.prototype, "net.ReceiveMsg");
})(net || (net = {}));
//# sourceMappingURL=ReceiveMsg.js.map