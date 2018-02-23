var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 缓存一些本地数据的类
 */
var LocalDatas;
(function (LocalDatas) {
    /**
     *
     * @author HE
     *
     */
    var key = "gzqd_bn";
    var _recordKey;
    if (true) {
        key = "debug_" + key;
    }
    function init() {
        LocalDatas.datas = new DataObject(key, function () {
            var datas = this.datas = {};
        });
    }
    LocalDatas.init = init;
    function initSelf(_key) {
        LocalDatas.sDatas = new DataObject(key + _key, function () {
            var datas = this.datas = {
                music: 1,
                effect: 1,
            };
        });
        SoundManage.isEffect = LocalDatas.sDatas.datas.effect;
        SoundManage.isMusic = LocalDatas.sDatas.datas.music;
    }
    LocalDatas.initSelf = initSelf;
    /**
     * 删除缓存在本地的临时登陆信息
     */
    function delTempLoginInfo() {
        LocalDatas.datas.datas.unionid = LocalDatas.datas.datas.loginInfo.unionid;
        LocalDatas.datas.datas.openid = LocalDatas.datas.datas.loginInfo.openid;
        delete LocalDatas.datas.datas.loginInfo;
        LocalDatas.datas.saveData();
    }
    LocalDatas.delTempLoginInfo = delTempLoginInfo;
    /**
     * 删除缓存在本地的登陆信息
     */
    function delLoginInfo() {
        delete LocalDatas.datas.datas.loginInfo;
        delete LocalDatas.datas.datas.openid;
        delete LocalDatas.datas.datas.pwd;
        delete LocalDatas.datas.datas.unionid;
        delete LocalDatas.datas.datas.userName;
        LocalDatas.datas.saveData();
    }
    LocalDatas.delLoginInfo = delLoginInfo;
    /**
     * 删除缓存在本地的登陆信息
     */
    var DataObject = (function () {
        function DataObject(key, init) {
            this._key = key;
            this.init = init;
            this.loadData();
        }
        DataObject.prototype.loadData = function () {
            var tempDollNum = this.getItem();
            if (tempDollNum) {
                this.datas = tempDollNum;
            }
            else {
                this.init();
                this.saveData();
            }
        };
        DataObject.prototype.saveData = function () {
            // if (DEBUG) {
            egret.localStorage.setItem(this._key, JSON.stringify(this.datas));
            // } else {
            //     egret.localStorage.setItem(this._key, Base64.encode(JSON.stringify(this.datas)));
            // }
        };
        DataObject.prototype.getItem = function () {
            var tempDollNum = egret.localStorage.getItem(this._key);
            if (tempDollNum == null || tempDollNum == "") {
                return null;
            }
            try {
                // if (DEBUG) {
                return JSON.parse(tempDollNum);
            }
            catch (error) {
                return null;
            }
        };
        return DataObject;
    }());
    __reflect(DataObject.prototype, "DataObject");
})(LocalDatas || (LocalDatas = {}));
//# sourceMappingURL=LocalDatas.js.map