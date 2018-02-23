/**
 * Created by cj on 2015/8/11.
 */
var StringUtil;
(function (StringUtil) {
    function stringToHex(str) {
        var val = "";
        for (var i = 0; i < str.length; i++) {
            val += str.charCodeAt(i).toString(16);
            val += ",";
        }
        return val;
    }
    StringUtil.stringToHex = stringToHex;
    function arrayBufferToHex(buf) {
        var val = "";
        var bytes = new Uint8Array(buf);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            val += bytes[i].toString(16);
            val += ",";
        }
        return val;
    }
    StringUtil.arrayBufferToHex = arrayBufferToHex;
    function arrayBufferToString(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }
    StringUtil.arrayBufferToString = arrayBufferToString;
    function stringToArrayBuffer(str) {
        var bytes = StringUtil.stringToBytes(str);
        var bufView = new Uint8Array(bytes);
        return bufView.buffer;
    }
    StringUtil.stringToArrayBuffer = stringToArrayBuffer;
    function arrayBufferTableConnect(bufTab) {
        var tlen = bufTab.length;
        var bufLen = 0;
        for (var i = 0; i < tlen; i++) {
            bufLen += bufTab[i].byteLength;
        }
        var buf = new ArrayBuffer(bufLen);
        var bufView = new Uint8Array(buf);
        bufLen = 0;
        for (var i = 0; i < tlen; i++) {
            var blen = bufTab[i].byteLength;
            var bufViewTmp = new Uint8Array(bufTab[i]);
            for (var j = 0; j < blen; j++) {
                bufView[bufLen] = bufViewTmp[j];
                bufLen++;
            }
        }
        return buf;
    }
    StringUtil.arrayBufferTableConnect = arrayBufferTableConnect;
    function arrayBufferConnect(buf1, buf2) {
        var bufView1 = new Uint8Array(buf1);
        var bufView2 = new Uint8Array(buf2);
        var len1 = bufView1.byteLength;
        var len2 = bufView2.byteLength;
        var len = len1 + len2;
        var buf = new ArrayBuffer(len);
        var bufView = new Uint8Array(buf);
        for (var i = 0; i < len1; i++) {
            bufView[i] = bufView1[i];
        }
        for (var i = 0; i < len2; i++) {
            bufView[len1 + i] = bufView2[i];
        }
        return buf;
    }
    StringUtil.arrayBufferConnect = arrayBufferConnect;
    function stringToBytes(str) {
        //var st=[];
        //for (var i = 0; i < str.length; i++) {
        //    var ch = str.charCodeAt(i);  // get char
        //    st.push(ch & 0xFF);  // push byte to stack
        //}
        //return st;
        var ch, st, re = [];
        for (var i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            st = [];
            do {
                st.push(ch & 0xFF);
                ch = ch >> 8;
            } while (ch);
            re = re.concat(st.reverse());
        }
        return re;
    }
    StringUtil.stringToBytes = stringToBytes;
    function bytesToString(bytes) {
        var len = bytes.byteLength;
        var st = "";
        for (var i = 0; i < len; i++) {
            st += String.fromCharCode(bytes[i] & 0xFF);
        }
        return st;
    }
    StringUtil.bytesToString = bytesToString;
    function stringToInt(str) {
        var ret = 0;
        var len = Math.min(4, str.length);
        for (var i = 0; i < len; i++) {
            var ch = str.charCodeAt(i);
            ret += ch << (8 * (3 - i));
        }
        return ret;
    }
    StringUtil.stringToInt = stringToInt;
    function intToString(i) {
        var ret = '';
        ret += String.fromCharCode((i >> 24) & 0xFF);
        ret += String.fromCharCode((i >> 16) & 0xFF);
        ret += String.fromCharCode((i >> 8) & 0xFF);
        ret += String.fromCharCode(i & 0xFF);
        return ret;
    }
    StringUtil.intToString = intToString;
    function stringToShort(str) {
        var ret = 0;
        var len = Math.min(2, str.length);
        for (var i = 0; i < len; i++) {
            var ch = str.charCodeAt(i);
            ret += ch << (8 * (1 - i));
        }
        return ret;
    }
    StringUtil.stringToShort = stringToShort;
    function shortToString(s) {
        var ret = '';
        ret += String.fromCharCode((s >> 8) & 0xFF);
        ret += String.fromCharCode(s & 0xFF);
        return ret;
    }
    StringUtil.shortToString = shortToString;
    function stringToByte(str) {
        var ret = 0;
        var len = Math.min(1, str.length);
        for (var i = 0; i < len; i++) {
            var ch = str.charCodeAt(i);
            ret += ch;
        }
        return ret;
    }
    StringUtil.stringToByte = stringToByte;
    function byteToString(b) {
        return String.fromCharCode(b & 0xFF);
    }
    StringUtil.byteToString = byteToString;
    function hex_string_to_buffer(str) {
        var bytes = [];
        // strip 0x prefix
        if (str.length >= 2 && str.substr(0, 2).toLowerCase() == "0x") {
            str = str.substr(2);
        }
        while (str.length > 0) {
            bytes.unshift(parseInt(str.slice(-2), 16));
            str = str.slice(0, -2);
        }
        return new Uint8Array(bytes).buffer;
    }
    StringUtil.hex_string_to_buffer = hex_string_to_buffer;
    function buffer_hex_string(buffer) {
        var bytes = new Uint8Array(buffer);
        var l = [];
        for (var i = 0; i < bytes.length; i++) {
            var b = bytes[i];
            l.push((b < 0x10 ? "0" : "") + b.toString(16));
        }
        return l.join("");
    }
    StringUtil.buffer_hex_string = buffer_hex_string;
    function buffPositive(buffer) {
        var bytes = new Uint8Array(buffer);
        var l = bytes.length;
        var k = 0; //进位用
        for (var i = l - 1; i >= 0; i--) {
            var v = 0xFF - bytes[i];
            if (i == l - 1) {
                if (bytes[i] != 0) {
                    bytes[i] = v + 1;
                }
                else {
                    k = 1;
                }
            }
            else {
                if (v + k > 0xFF) {
                    bytes[i] = 0;
                    k = 1;
                }
                else {
                    bytes[i] = v + k;
                    k = 0;
                }
            }
        }
        return bytes.buffer;
    }
    StringUtil.buffPositive = buffPositive;
    function buffer2int(buffer) {
        var bytes = new Uint8Array(buffer);
        var sign = 1;
        if (bytes.length > 0) {
            var binaryStr = bytes[0].toString(2);
            if (binaryStr.length < 8) {
                sign = 1;
            }
            else {
                sign = -1;
            }
        }
        var l = [];
        if (sign == -1) {
            buffer = this.buffPositive(buffer);
        }
        for (var i = 0; i < bytes.length; i++) {
            var b = bytes[i];
            l.push((b < 0x10 ? "0" : "") + b.toString(16));
        }
        var hexStr = l.join("");
        return sign * parseInt(hexStr, 16);
    }
    StringUtil.buffer2int = buffer2int;
    function buffer2uint(buffer) {
        var bytes = new Uint8Array(buffer);
        var l = [];
        for (var i = 0; i < bytes.length; i++) {
            var b = bytes[i];
            l.push((b < 0x10 ? "0" : "") + b.toString(16));
        }
        var hexStr = l.join("");
        return parseInt(hexStr, 16);
    }
    StringUtil.buffer2uint = buffer2uint;
    function encodeUTF8(str) {
        var temp = "", rs = "";
        for (var i = 0, len = str.length; i < len; i++) {
            temp = str.charCodeAt(i).toString(16);
            rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
        }
        return rs;
    }
    StringUtil.encodeUTF8 = encodeUTF8;
    function decodeUTF8(str) {
        return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
            return String.fromCharCode(parseInt($2, 16));
        });
    }
    StringUtil.decodeUTF8 = decodeUTF8;
    //UTF-16转UTF-8
    function utf16ToUtf8(s) {
        if (!s) {
            return;
        }
        var i, code, ret = [], len = s.length;
        for (i = 0; i < len; i++) {
            code = s.charCodeAt(i);
            if (code > 0x0 && code <= 0x7f) {
                //单字节
                //UTF-16 0000 - 007F
                //UTF-8  0xxxxxxx
                ret.push(s.charAt(i));
            }
            else if (code >= 0x80 && code <= 0x7ff) {
                //双字节
                //UTF-16 0080 - 07FF
                //UTF-8  110xxxxx 10xxxxxx
                ret.push(
                //110xxxxx
                String.fromCharCode(0xc0 | ((code >> 6) & 0x1f)), 
                //10xxxxxx
                String.fromCharCode(0x80 | (code & 0x3f)));
            }
            else if (code >= 0x800 && code <= 0xffff) {
                //三字节
                //UTF-16 0800 - FFFF
                //UTF-8  1110xxxx 10xxxxxx 10xxxxxx
                ret.push(
                //1110xxxx
                String.fromCharCode(0xe0 | ((code >> 12) & 0xf)), 
                //10xxxxxx
                String.fromCharCode(0x80 | ((code >> 6) & 0x3f)), 
                //10xxxxxx
                String.fromCharCode(0x80 | (code & 0x3f)));
            }
        }
        return ret.join('');
    }
    StringUtil.utf16ToUtf8 = utf16ToUtf8;
    //UTF-8转UTF-16
    function utf8ToUtf16(s) {
        if (!s) {
            return;
        }
        var i, codes, bytes, ret = [], len = s.length;
        for (i = 0; i < len; i++) {
            codes = [];
            codes.push(s.charCodeAt(i));
            if (((codes[0] >> 7) & 0xff) == 0x0) {
                //单字节  0xxxxxxx
                ret.push(s.charAt(i));
            }
            else if (((codes[0] >> 5) & 0xff) == 0x6) {
                //双字节  110xxxxx 10xxxxxx
                codes.push(s.charCodeAt(++i));
                bytes = [];
                bytes.push(codes[0] & 0x1f);
                bytes.push(codes[1] & 0x3f);
                ret.push(String.fromCharCode((bytes[0] << 6) | bytes[1]));
            }
            else if (((codes[0] >> 4) & 0xff) == 0xe) {
                //三字节  1110xxxx 10xxxxxx 10xxxxxx
                codes.push(s.charCodeAt(++i));
                codes.push(s.charCodeAt(++i));
                bytes = [];
                bytes.push((codes[0] << 4) | ((codes[1] >> 2) & 0xf));
                bytes.push(((codes[1] & 0x3) << 6) | (codes[2] & 0x3f));
                ret.push(String.fromCharCode((bytes[0] << 8) | bytes[1]));
            }
        }
        return ret.join('');
    }
    StringUtil.utf8ToUtf16 = utf8ToUtf16;
    //    StringUtil.utf16ToUtf8(StringUtil.arrayBufferToString
    function arrayBufferToUtf16(s) {
        return StringUtil.utf8ToUtf16(StringUtil.arrayBufferToString(s));
    }
    StringUtil.arrayBufferToUtf16 = arrayBufferToUtf16;
    function arrayBufferToBytes(buffer) {
        return stringToBytes(arrayBufferToString(buffer));
    }
    StringUtil.arrayBufferToBytes = arrayBufferToBytes;
    function decodeBase64(str) {
        if (str && str.length) {
            var dv = new egret.ByteArray(egret.Base64Util.decode(str));
            if (dv.length === 0) {
                return str;
            }
            return dv.readUTFBytes(dv.length - dv.position);
        }
        else {
            return "";
        }
    }
    StringUtil.decodeBase64 = decodeBase64;
})(StringUtil || (StringUtil = {}));
//# sourceMappingURL=StringUtil.js.map