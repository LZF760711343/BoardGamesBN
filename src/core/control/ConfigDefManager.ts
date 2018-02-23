/**
 * 游戏配置文件常量
 * json列表，里面是json文件的名字，自己手动添加吧，记得要把相应的json文件手动添加到gameConfig文件夹内
 */
const GAMECONFIGS = {
    /**
     * 游戏初中高级场金钱配置
     */
    GAMEROOMGLOLD:"GameRoomGloldConfig"
}

/**
 * 常量配置资源管理器
 */
class ConfigDefManager {
    private static configDefManager: ConfigDefManager;

    // public static GameConfigs:GameConfigManage[] = [];
    public static GameConfigs: any = {};

    private urlloader: egret.URLLoader;
    public static init() {
        ConfigDefManager.configDefManager = new ConfigDefManager();
    }
    private constructor() {
        this.init();
    }
    private async init() {
        await RES.loadGroup("gameConfig");
        //json列表
        let gameConfigs: string[] = [];
        let groups = RES.getGroupByName("gameConfig");
        let length = groups.length;
        for (let i = 0; i < length; i++) {
            let item = groups[i];
            this.onComplete(RES.getRes(item.data.name));    
        }
        //执行初始化游戏内配置
        Config.initGameRoomConfig();
    }
    /**
     * 返回一个ConfigDefManager实例，暂时没用上
     */
    // public static getInstance():ConfigDefManager{
    //     if(ConfigDefManager.configDefManager==null || ConfigDefManager.configDefManager==undefined){
    //         ConfigDefManager.configDefManager = new ConfigDefManager();
    //     }
    //     return ConfigDefManager.configDefManager;
    // }

    /**
     * json文件加载完成执行，将所有相关json对象存到GameConfigs
     */
    private onComplete(data: GameConfigManage) {
        // let data:GameConfigManage = JSON.parse(event.target.data);
        ConfigDefManager.GameConfigs[data.name] = data;

        //==============================为下面的GameConfigManage添加方法======================================
        //添加一个根据key获得对象
        ConfigDefManager.GameConfigs[data.name]["getDataByKey"] = function (value: any) {
            for (let i = 0; this.data.length; i++) {
                let obj = this.data[i];
                if (value === obj[this.data[i].id]) {
                    return obj;
                }
            }
        }
        //添加一个根据一个字段名获得该字段对应的对象的集合
        ConfigDefManager.GameConfigs[data.name]["getDataByNames"] = function (fieldName: string, value: any): any[] {
            //放回同一个字段的多个值
            let objs: any[] = [];
            for (let i = 0; i < this.data.length; i++) {
                let obj = this.data[i];
                if (value === obj[fieldName]) {
                    objs.push(obj);
                }
            }

            return objs;
        }
        //添加一个根据一个字段名获得该字段对应的对象
        ConfigDefManager.GameConfigs[data.name]["getDataByName"] = function (fieldName: string, value: any): any {          
            for (let i = 0; i < this.data.length; i++) {
                let obj = this.data[i];
                if (value === obj[fieldName]) {
                    return obj;
                }
            }
        }
    }
}

/**
 * 配置文件管理器
 */
interface GameConfigManage {
    name: string,
    dataSize: number,
    key: string,
    data: any[],
    /**
     * 根据json文件制定的key获得对应对象
     * 使用方法：
     * ConfigDefManager.GameConfigs[json文件的名字].getDataByKey(key的值)
     */
    getDataByKey?: Function,
    /**
     * 添加一个根据一个字段名获得该字段对应的对象
     * 返回的是一个对象的集合
     * 使用方法：
     * ConfigDefManager.GameConfigs[json文件的名字].getDataByNames(字段名,需要查找的值)
     */
    getDataByNames?: Function,
    /**
     * 添加一个根据一个字段名获得该字段对应的对象
     * 返回的是一个对象
     * 使用方法：
     * ConfigDefManager.GameConfigs[json文件的名字].getDataByName(字段名,需要查找的值)
     */
    getDataByName?: Function
}
