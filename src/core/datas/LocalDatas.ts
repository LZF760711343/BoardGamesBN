/**
 * 缓存一些本地数据的类
 */
namespace LocalDatas {
	/**
	 *
	 * @author HE
	 *
	 */

    interface Data {
        userName?: any;
        pwd?: string;
        openid?: string;
        unionid?: string;
        // nick?:string;
        loginInfo?: {
            unionid: string;
            openid: string;
        };
        msgStr?: string;
        debugInfo?: {
            ip: string;
            port: string;
        }
    }
    interface SelfData {
        music: number;
        effect: number;
        SoundType?: number;
        nn_data?: model.OPEN_SCORE_ROOM_NN;
        two_data?: model.OPEN_SCORE_ROOM_TWO;
        zjh_data?: model.OPEN_SCORE_ROOM_ZJH;
        ddz_data?: model.OPEN_SCORE_ROOM_DDZ;
        gdmj_data?: model.OPEN_SCORE_ROOM_GDMJ;

    }
    export var datas: DataObject<Data>;
    export var sDatas: DataObject<SelfData>;
    var key = "gzqd_bn";
    var _recordKey;
    if (DEBUG) {
        key = "debug_" + key
    }
    export function init() {
        datas = new DataObject<Data>(key, function () {
            let datas: Data = this.datas = {};
        });
    }
    export function initSelf(_key) {
        sDatas = new DataObject<SelfData>(key + _key, function () {
            let datas: SelfData = this.datas = {
                music: 1,
                effect: 1,
            };
        });
        SoundManage.isEffect = sDatas.datas.effect;
        SoundManage.isMusic = sDatas.datas.music;
    }
    /**
     * 删除缓存在本地的临时登陆信息
     */
    export function delTempLoginInfo() {
        datas.datas.unionid = datas.datas.loginInfo.unionid;
        datas.datas.openid = datas.datas.loginInfo.openid;
        delete datas.datas.loginInfo;
        datas.saveData();
    }
    /**
     * 删除缓存在本地的登陆信息
     */
    export function delLoginInfo() {
        delete LocalDatas.datas.datas.loginInfo;
        delete LocalDatas.datas.datas.openid;
        delete LocalDatas.datas.datas.pwd;
        delete LocalDatas.datas.datas.unionid;
        delete LocalDatas.datas.datas.userName;
        LocalDatas.datas.saveData();
    }
    /**
     * 删除缓存在本地的登陆信息
     */
    class DataObject<T> {
        private _key: string;
        public datas: T;
        private init: Function;
        constructor(key: string, init: Function) {
            this._key = key;
            this.init = init;
            this.loadData();
        }
        public loadData() {
            var tempDollNum = this.getItem();
            if (tempDollNum) {
                this.datas = tempDollNum;
            } else {
                this.init();
                this.saveData();
            }
        }
        public saveData() {
            // if (DEBUG) {
            egret.localStorage.setItem(this._key, JSON.stringify(this.datas));
            // } else {
            //     egret.localStorage.setItem(this._key, Base64.encode(JSON.stringify(this.datas)));
            // }
        }
        private getItem() {
            var tempDollNum = egret.localStorage.getItem(this._key);
            if (tempDollNum == null || tempDollNum == "") {
                return null;
            }
            try {
                // if (DEBUG) {
                return JSON.parse(tempDollNum);
                // } else {
                //     return JSON.parse(StringUtil.decodeBase64(tempDollNum));
                // }
            } catch (error) {
                return null;
            }
        }
    }
}
