var _FORMAT_SEPARATOR = String.fromCharCode(0x1f);
var _FORMAT_ARGS_PATTERN = new RegExp('^[^' + _FORMAT_SEPARATOR + ']*'
    + new Array(100).join('(?:.([^' + _FORMAT_SEPARATOR + ']*))?'));
String.prototype.format = function () {
    return (_FORMAT_SEPARATOR +
        Array.prototype.join.call(arguments, _FORMAT_SEPARATOR)).
        replace(_FORMAT_ARGS_PATTERN, this);
};
String.prototype.endWith = function (endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d);
};
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var Utils;
(function (Utils) {
    function cloneObject(obj) {
        function Clone() { }
        Clone.prototype = obj;
        var o = new Clone();
        for (var a in o) {
            if (typeof o[a] == "object") {
                o[a] = cloneObject(o[a]);
            }
        }
        return o;
    }
    Utils.cloneObject = cloneObject;
    function getItemByKey(list, key, value) {
        for (var i = list.length - 1; i > -1; --i) {
            if (list[i][key] == value) {
                return list[i];
            }
        }
        return null;
    }
    Utils.getItemByKey = getItemByKey;
    function getIndexByKey(list, key, value) {
        for (var i = list.length - 1; i > -1; --i) {
            if (list[i][key] == value) {
                return i;
            }
        }
        return -1;
    }
    Utils.getIndexByKey = getIndexByKey;
    // export function getIndexByKeyGroup(list: any[], key, value, key1, value2) {
    //     for (var i = list.length - 1; i > -1; --i) {
    //         if (list[i][key] == value&&list[i][key1] == value2) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }
    function removeItemByKey(list, key, value) {
        for (var i = list.length - 1; i > -1; --i) {
            if (list[i][key] == value) {
                return list.splice(i, 1);
            }
        }
        return null;
    }
    Utils.removeItemByKey = removeItemByKey;
    function removeItemByValue(list, value) {
        for (var i = list.length - 1; i > -1; --i) {
            if (list[i] == value) {
                list.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    Utils.removeItemByValue = removeItemByValue;
    // export function getPos(object: eui.UIComponent): egret.Point {
    // return egret.Point.create(getPosX(object), getPosY(object));
    // }
    // export function getPosX(object: eui.UIComponent): number {
    // if (!isNaN(object.left)) {
    //     return object.left;
    // } else if (!isNaN(object.right)) {
    //     return Global.stageWidth - object.right - object.width;
    // } else if (!isNaN(object.horizontalCenter)) {
    //     return (Global.stageWidth - object.width) / 2 + object.horizontalCenter;
    // } else {
    //     return object.x;
    // }
    // }
    // export function getPosY(object: eui.UIComponent): number {
    // if (!isNaN(object.top)) {
    //     return object.top;
    // } else if (!isNaN(object.bottom)) {
    //     return Global.stageHeight - object.bottom - object.height;
    // } else if (!isNaN(object.verticalCenter)) {
    //     return (Global.stageHeight - object.height) / 2 + object.verticalCenter;
    // } else {
    //     return object.y;
    // }
    // }
    function printObject(obj, section) {
        if (section === void 0) { section = 0; }
        var space = "";
        for (var i = 0; i < section; i++) {
            space = "    " + space;
        }
        egret.log(space + "{");
        for (var k in obj) {
            if (typeof obj[k] != "undefined" && typeof obj[k] != "function") {
                egret.log(space + "    " + k + " : " + obj[k] + "(" + typeof (obj[k]) + ")");
                if (typeof obj[k] == "object") {
                    printObject(obj[k], section + 1);
                }
            }
        }
        egret.log(space + "}");
    }
    Utils.printObject = printObject;
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    Utils.getRandom = getRandom;
    function mergeMap(map1) {
        var map2;
        for (var i = 1; i < arguments.length; i++) {
            map2 = arguments[i];
            for (var k in map2) {
                map1[k] = map2[k];
            }
        }
        return map1;
    }
    Utils.mergeMap = mergeMap;
    function isArray(target) {
        return Object.prototype.toString.call(target) === '[object Array]';
    }
    Utils.isArray = isArray;
    function isObject(target) {
        return Object.prototype.toString.call(target) === '[object Object]';
    }
    Utils.isObject = isObject;
    function tableConcat(tab1, tab2) {
        return tab1;
    }
    Utils.tableConcat = tableConcat;
    //过万转成数字+万，仅过千转成数字+千
    function toNumWithUint(num, qianStr, wanStr, yiStr) {
        var n;
        if (yiStr) {
            n = num / 100000000;
            if (n >= 1) {
                var nW = Math.ceil(Math.floor(n).toString().length / 4) - 1;
                if (nW > 0) {
                    n = Math.floor(n / Math.pow(10000, nW));
                    return Math.floor(n).toString() + new Array(nW + 1).join(wanStr) + yiStr;
                }
                else {
                    return Math.floor(n).toString() + yiStr;
                }
            }
        }
        if (wanStr) {
            n = num / 10000;
            if (n >= 1) {
                return Math.floor(n).toString() + wanStr;
            }
        }
        n = num / 1000;
        if (n >= 1) {
            return Math.floor(n).toString() + qianStr;
        }
        return num.toString();
    }
    Utils.toNumWithUint = toNumWithUint;
    function doDelayCallback(time, cb, cbTarget) {
        var delayTimer = new egret.Timer(time, 1);
        delayTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, cb, cbTarget);
        delayTimer.start();
        return delayTimer;
    }
    Utils.doDelayCallback = doDelayCallback;
    /**
     * 将字符串截取到固定长度,如果字符串长度小于指定长度,则在字符串后面添加空格补全
     */
    function subStringToLength(str, len) {
        var _str = subString(str, len);
        if (_str.length < len) {
            _str += new Array(len - _str.length).join(" ");
        }
        return _str;
    }
    Utils.subStringToLength = subStringToLength;
    function subString(str, len, tailStr) {
        if (!str || !len) {
            return '';
        }
        var byteLen = 0;
        var temp = '';
        for (var i = 0; i < str.length; i++) {
            byteLen++;
            if (byteLen > len) {
                if (tailStr)
                    return temp + tailStr;
                else
                    return temp;
            }
            temp += str.charAt(i);
        }
        return str;
    }
    Utils.subString = subString;
    function getCommasString(nvalue) {
        var tmpStr = nvalue + '';
        var comasStr = '';
        if (nvalue < 0) {
            tmpStr = tmpStr.substr(1, tmpStr.length - 1);
            comasStr = "-";
        }
        var modValue = tmpStr.length % 3;
        if (modValue === 0) {
            modValue = 3;
        }
        comasStr += tmpStr.substr(0, modValue);
        while (modValue < tmpStr.length - 1) {
            comasStr += ',' + tmpStr.substr(modValue, 3);
            modValue += 3;
        }
        return comasStr;
    }
    Utils.getCommasString = getCommasString;
    function getNumberInNormalDistribution(mean, std_dev) {
        return mean + (randomNormalDistribution() * std_dev);
    }
    Utils.getNumberInNormalDistribution = getNumberInNormalDistribution;
    /**
     * 将字符串分割为int类型数组
     * @param str 要分割的字符串
     * @param key 分割字符串的key
     */
    function splitStrToIntArray(str, key) {
        var strList = str.split(key);
        strList.forEach(function (data, index, arr) {
            strList[index] = parseInt(data);
        });
        return strList;
    }
    Utils.splitStrToIntArray = splitStrToIntArray;
    function randomNormalDistribution() {
        var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
        do {
            //获得两个（-1,1）的独立随机变量
            u = Math.random() * 2 - 1.0;
            v = Math.random() * 2 - 1.0;
            w = u * u + v * v;
        } while (w == 0.0 || w >= 1.0);
        //这里就是 Box-Muller转换
        c = Math.sqrt((-2 * Math.log(w)) / w);
        //返回2个标准正态分布的随机数，封装进一个数组返回
        //当然，因为这个函数运行较快，也可以扔掉一个
        //return [u*c,v*c];
        return u * c;
    }
})(Utils || (Utils = {}));
//# sourceMappingURL=Util.js.map