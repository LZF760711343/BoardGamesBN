var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var net;
(function (net) {
    var DataView2 = (function (_super) {
        __extends(DataView2, _super);
        function DataView2(buffer, byteOffset, byteLength) {
            return _super.call(this, buffer, byteOffset, byteLength) || this;
        }
        DataView2.prototype.getUint64 = function (byteOffset, littleEndian) {
            // if(littleEndian){
            // }else{
            // 0x11223344
            //   55667788;
            //   88776655
            //   44332211
            // }
        };
        DataView2.prototype.setUint64 = function (byteOffset, value, littleEndian) {
            this.setUint32(byteOffset, value >> 32 & 0xffffffff);
            this.setUint32(byteOffset + 4, value & 0xffffffff);
        };
        DataView2.prototype.setInt64 = function (byteOffset, value, littleEndian) {
            this.setInt32(byteOffset, value >> 32 & 0xffffffff);
            this.setInt32(byteOffset + 4, value & 0xffffffff);
        };
        return DataView2;
    }(DataView));
    net.DataView2 = DataView2;
    __reflect(DataView2.prototype, "net.DataView2");
    var ByteArray = (function (_super) {
        __extends(ByteArray, _super);
        function ByteArray(buffer) {
            return _super.call(this, buffer) || this;
        }
        ByteArray.prototype.writeLong = function (value) {
            this.writeInt(value >> 32 & 0xffffffff);
            this.writeInt(value & 0xffffffff);
            // this.dataView.setInt32(this.position, value >> 32 & 0xffffffff);
            // this.dataView.setInt32(this.position + 4, value & 0xffffffff);
            // this.position += ByteArray.SIZE_OF_LONG;
        };
        return ByteArray;
    }(egret.ByteArray));
    /**
     *
     */
    ByteArray.SIZE_OF_LONG = 8;
    net.ByteArray = ByteArray;
    __reflect(ByteArray.prototype, "net.ByteArray");
})(net || (net = {}));
//# sourceMappingURL=DataView.js.map