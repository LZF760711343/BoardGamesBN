namespace GameLangs {
    export let lookOnTip = "旁观中,无下注";
    export let betTip1 = "$1万";
    export let accountTip = "小结：$1";
    export let betTip2 = "$1万/";
    export let betTip3 = "$1万/$2万"

    export let chatsMj = {

    }

    export let chats = [{
        //斗地主聊天女
        "#100": "快点吧,我等到花儿都谢了！",//1
        "#101": "哎呀！这底牌要是被我拿到就逆天了！",//2
        "#102": "吐了个槽,整个一个杯具啊.",//3
        "#103": "不怕神一样的对手,就怕猪一样的队友！",//4
        "#104": "和你合作，真是太愉快了！",//5
        "#105": "天啊，跪求悔牌啊！",//6
        "#106": "唉....一手烂牌臭到底.",//7
        "#107": "出啊，好牌都留着下蛋呀！",//8
        "#108": "帅哥，交个朋友吧",//9
    }, {
        //斗地主聊天男
        "#100": "快点吧,我等到花儿都谢了！",//1
        "#101": "哎呀！这底牌要是被我拿到就逆天了！",//2
        "#102": "吐了个槽,整个一个杯具啊.",//3
        "#103": "不怕神一样的对手,就怕猪一样的队友！",//4
        "#104": "和你合作，真是太愉快了！",//5
        "#105": "天啊，跪求悔牌啊！",//6
        "#106": "唉....一手烂牌臭到底.",//7
        "#107": "出啊，好牌都留着下蛋呀！",//8
        "#108": "妹子，交个朋友吧",//9
    }, {
        // 牛牛聊天
        "#100": "快点打，别墨迹",//10
        "#101": "我要放招了，你们谁都接不住",//11
        "#102": "今天脑袋怎么不好使了呢",//12
        "#103": "老天保佑，给我把好牌吧",//13
        "#104": "催什么催,钱都跑到别人兜里去了",//14
        "#105": "我这把牌没治了，你们谁都不好使",//15
        "#106": "真郁闷，这都能行",//16
        "#107": "豁出去了，整把狠的",//17
        "#108": "点背不能怨社会呀",//18
    }
        , {
        // 三张牌聊天女
        "#100": "快点吧！花儿谢了都又开了",//10
        "#101": "有种别看牌!",//11
        "#102": "投降输一半，赶紧弃牌吧",//12
        "#103": "搏一搏，单车变摩托",//13
        "#104": "不要迷恋姐，姐会让你吐血",//14
        "#105": "你牌技这么好，地球人都知道么",//15
        "#106": "人靓牌亮，不服就上",//16
        "#107": "小手一抖，锅底拿走",//17
        "#108": "看你存钱不容易，先放你一马",//18
        "#109": "哎，手气太差了",//18
        "#110": "女人要有钱，和谁都有缘",//18
        "#111": "看见帅哥就头晕,牌没看清我就跟",//18
    }
        , {
        // 三张牌聊天男
        "#100": "快点吧！花儿谢了都又开了",//10
        "#101": "有种别看牌!",//11
        "#102": "投降输一半，赶紧弃牌吧",//12
        "#103": "搏一搏，单车变摩托",//13
        "#104": "不要迷恋哥，哥会让你吐血",//14
        "#105": "你牌技这么好，地球人都知道么",//15
        "#106": "人靓牌亮，不服就上",//16
        "#107": "小手一抖，锅底拿走",//17
        "#108": "看你存钱不容易，先放你一马",//18
        "#109": "哎，手气太差了",//18
        "#110": "哎哈哈，男人要有钱，和谁都有缘",//18
        "#111": "看见美女就头晕,牌没看清我就跟",//18
    }
        , {
        // 麻将聊天
        "#100": "快点打,蚊子都睡着了",//10
        "#101": "让我教你输字怎样写",//11
        "#102": "省港澳雀神在此,问你怕了没",//12
        "#103": "碰什么啊,碰走我的好牌",//13
        "#104": "搏一搏，单车变摩托",//14
        "#105": "聪明点,给个牌来碰一下啦",//15
        "#106": "我们交个朋友吧,能不能告诉我你的联系方式",//16
        "#107": "大家好,很高兴见到各位!",//17
        "#108": "呵呵~",//18
        "#109": "打一个来碰噻",//18
        "#110": "我有一百种方法胡你，而你却无可奈何",//18
    }
    ];




    // let type = {
    //     "#100": { type: 0, str: "大家好,很高兴见到各位", sound: "" },
    //     "#200":{type: 1, str: ""},
    // };
    export const roomFullTips = "很抱歉,本桌人数已满！";
    export let not_close_score_room_tips = "【$1】申请解散房间失败,【$2】拒绝解散!";
    export let gift_diamond_tips: string = "送$1钻石";
    export let gift_egg_tips: string = "送$1金币";
    export let cn_wan = '万';
    export let close_score_room_tips = "【$1】成功解散房间,【$2】房间已关闭!";
    export let speak_too_fask = "您的发言频率过快,请稍后再试！";
    export let notKingTip = "本桌暂时无人当王\n请耐心等待或者选择换桌";

    export let not_Room_tips = "找不到合适的房间";
    /**
     * 游戏类型
     */
    export const gameNameMaps = {};
    gameNameMaps[GAME_ID.NIUNIU] = "牛牛";
    gameNameMaps[GAME_ID.ZJH] = "扎金花";
    gameNameMaps[GAME_ID.GOLD_ZJH] = "金币场扎金花";
    gameNameMaps[GAME_ID.DDZ] = "斗地主";
    gameNameMaps[GAME_ID.GOLD_DDZ] = "斗地主金币场";
    gameNameMaps[GAME_ID.DZ] = "德州扑克";
    gameNameMaps[GAME_ID.GAME_ID_GDMJ_FK] = "广东麻将";
    gameNameMaps[GAME_ID.BRNN] = "百人牛牛";
    gameNameMaps[GAME_ID.QZNN] = "金币场牛牛";
    gameNameMaps[GAME_ID.GAME_ID_TWOMAN_QZNN] = "二人牛牛";
    gameNameMaps[GAME_ID.SELECT] = "选场页面";
    gameNameMaps[GAME_ID.LOGIN] = "登陆加载页面";


    export let create_roomStr = "$1局($2房卡)";
    /**
     * 开房局数
     */
    export let createRoominning: { count: any, cost: number, playerCnt?: number }[][] = [];
    createRoominning[GAME_ID.NIUNIU] = [{ playerCnt: 5, count: 10, cost: 3, }, { playerCnt: 5, count: 20, cost: 6 }, { playerCnt: 8, count: 30, cost: 9 }];
    createRoominning[GAME_ID.ZJH] = [{ count: 8, cost: 3 }, { count: 16, cost: 6 }, { count: 26, cost: 9 }];
    createRoominning[GAME_ID.DDZ] = [{ count: 8, cost: 3 }, { count: 16, cost: 5 }];
    createRoominning[GAME_ID.GAME_ID_GDMJ_FK] = [{ count: 8, cost: 2 }, { count: 16, cost: 3 }, { count: 26, cost: 5 }];
    /**
     * 游戏玩法
     */
    export let playingMethod: { playing: string }[][] = [];
    playingMethod[GAME_ID.NIUNIU] = [{ playing: "看牌抢庄" }, { playing: "无庄（混战）" }, { playing: "轮庄" }];
    playingMethod[GAME_ID.ZJH] = [{ playing: "三回合后可比" }];
    playingMethod[GAME_ID.DDZ] = [{ playing: "叫地主" }, { playing: "叫分（123分）" }];
    playingMethod[GAME_ID.GAME_ID_GDMJ_FK] = [{ playing: "无马" }, { playing: "买马" }];
    /**
     * 广东麻将胡牌
     */
    export let playingMethodHu = ["可吃胡", "鸡糊自摸", "自摸"];
    /**
   /**
    * 广东麻将赖子
    */
    export let playingMethodLai = ["没有赖子", "翻赖子", "白板赖子"];
    /**
    * 斗地主炸
    */
    export let playingfly: { village: string }[] = [];
    playingfly = [{ village: "3炸" }, { village: "4炸" }, { village: "5炸" }];
    /**
    * 抢庄牛牛轮庄后的玩法
    */
    export let playinghog: { village: string }[] = [];
    playinghog = [{ village: "顺序轮庄" }, { village: "牛九轮庄" }, { village: "牛牛换庄" }];
    /**
     * 游戏类型等级金币
     */
    export let createRoomConf: { gold: number }[][] = [];
    createRoomConf[GAME_ID.BRNN] = [{ gold: 2000 }, { gold: 500000 }];
    createRoomConf[GAME_ID.QZNN] = [{ gold: 5000 }, { gold: 300000 }, { gold: 600000 }];
    createRoomConf[GAME_ID.ZJH] = [{ gold: 5000 }, { gold: 100000 }, { gold: 200000 }];
    createRoomConf[GAME_ID.DDZ] = [{ gold: 2000 }, { gold: 50000 }, { gold: 200000 }];

    export const gameNotOverTip = "游戏还未结束，不能换桌！";
    export const gameNotOverTip2 = "游戏还未结束，不能离开房间！";
    export const notBetTip = "你还没有下过注";
    export const notBetTimeTip = "现在还不是下注时间,无法续押!";
}