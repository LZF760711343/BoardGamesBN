var GameLangs;
(function (GameLangs) {
    GameLangs.lookOnTip = "旁观中,无下注";
    GameLangs.betTip1 = "$1万";
    GameLangs.accountTip = "小结：$1";
    GameLangs.betTip2 = "$1万/";
    GameLangs.betTip3 = "$1万/$2万";
    GameLangs.chatsMj = {};
    GameLangs.chats = [{
            //斗地主聊天女
            "#100": "快点吧,我等到花儿都谢了！",
            "#101": "哎呀！这底牌要是被我拿到就逆天了！",
            "#102": "吐了个槽,整个一个杯具啊.",
            "#103": "不怕神一样的对手,就怕猪一样的队友！",
            "#104": "和你合作，真是太愉快了！",
            "#105": "天啊，跪求悔牌啊！",
            "#106": "唉....一手烂牌臭到底.",
            "#107": "出啊，好牌都留着下蛋呀！",
            "#108": "帅哥，交个朋友吧",
        }, {
            //斗地主聊天男
            "#100": "快点吧,我等到花儿都谢了！",
            "#101": "哎呀！这底牌要是被我拿到就逆天了！",
            "#102": "吐了个槽,整个一个杯具啊.",
            "#103": "不怕神一样的对手,就怕猪一样的队友！",
            "#104": "和你合作，真是太愉快了！",
            "#105": "天啊，跪求悔牌啊！",
            "#106": "唉....一手烂牌臭到底.",
            "#107": "出啊，好牌都留着下蛋呀！",
            "#108": "妹子，交个朋友吧",
        }, {
            // 牛牛聊天
            "#100": "快点打，别墨迹",
            "#101": "我要放招了，你们谁都接不住",
            "#102": "今天脑袋怎么不好使了呢",
            "#103": "老天保佑，给我把好牌吧",
            "#104": "催什么催,钱都跑到别人兜里去了",
            "#105": "我这把牌没治了，你们谁都不好使",
            "#106": "真郁闷，这都能行",
            "#107": "豁出去了，整把狠的",
            "#108": "点背不能怨社会呀",
        },
        {
            // 三张牌聊天女
            "#100": "快点吧！花儿谢了都又开了",
            "#101": "有种别看牌!",
            "#102": "投降输一半，赶紧弃牌吧",
            "#103": "搏一搏，单车变摩托",
            "#104": "不要迷恋姐，姐会让你吐血",
            "#105": "你牌技这么好，地球人都知道么",
            "#106": "人靓牌亮，不服就上",
            "#107": "小手一抖，锅底拿走",
            "#108": "看你存钱不容易，先放你一马",
            "#109": "哎，手气太差了",
            "#110": "女人要有钱，和谁都有缘",
            "#111": "看见帅哥就头晕,牌没看清我就跟",
        },
        {
            // 三张牌聊天男
            "#100": "快点吧！花儿谢了都又开了",
            "#101": "有种别看牌!",
            "#102": "投降输一半，赶紧弃牌吧",
            "#103": "搏一搏，单车变摩托",
            "#104": "不要迷恋哥，哥会让你吐血",
            "#105": "你牌技这么好，地球人都知道么",
            "#106": "人靓牌亮，不服就上",
            "#107": "小手一抖，锅底拿走",
            "#108": "看你存钱不容易，先放你一马",
            "#109": "哎，手气太差了",
            "#110": "哎哈哈，男人要有钱，和谁都有缘",
            "#111": "看见美女就头晕,牌没看清我就跟",
        },
        {
            // 麻将聊天
            "#100": "快点打,蚊子都睡着了",
            "#101": "让我教你输字怎样写",
            "#102": "省港澳雀神在此,问你怕了没",
            "#103": "碰什么啊,碰走我的好牌",
            "#104": "搏一搏，单车变摩托",
            "#105": "聪明点,给个牌来碰一下啦",
            "#106": "我们交个朋友吧,能不能告诉我你的联系方式",
            "#107": "大家好,很高兴见到各位!",
            "#108": "呵呵~",
            "#109": "打一个来碰噻",
            "#110": "我有一百种方法胡你，而你却无可奈何",
        }
    ];
    // let type = {
    //     "#100": { type: 0, str: "大家好,很高兴见到各位", sound: "" },
    //     "#200":{type: 1, str: ""},
    // };
    GameLangs.roomFullTips = "很抱歉,本桌人数已满！";
    GameLangs.not_close_score_room_tips = "【$1】申请解散房间失败,【$2】拒绝解散!";
    GameLangs.gift_diamond_tips = "送$1钻石";
    GameLangs.gift_egg_tips = "送$1金币";
    GameLangs.cn_wan = '万';
    GameLangs.close_score_room_tips = "【$1】成功解散房间,【$2】房间已关闭!";
    GameLangs.speak_too_fask = "您的发言频率过快,请稍后再试！";
    GameLangs.notKingTip = "本桌暂时无人当王\n请耐心等待或者选择换桌";
    GameLangs.not_Room_tips = "找不到合适的房间";
    /**
     * 游戏类型
     */
    GameLangs.gameNameMaps = {};
    GameLangs.gameNameMaps[1 /* NIUNIU */] = "牛牛";
    GameLangs.gameNameMaps[10 /* ZJH */] = "扎金花";
    GameLangs.gameNameMaps[11 /* GOLD_ZJH */] = "金币场扎金花";
    GameLangs.gameNameMaps[3 /* DDZ */] = "斗地主";
    GameLangs.gameNameMaps[13 /* GOLD_DDZ */] = "斗地主金币场";
    GameLangs.gameNameMaps[5 /* DZ */] = "德州扑克";
    GameLangs.gameNameMaps[39 /* GAME_ID_GDMJ_FK */] = "广东麻将";
    GameLangs.gameNameMaps[8 /* BRNN */] = "百人牛牛";
    GameLangs.gameNameMaps[9 /* QZNN */] = "金币场牛牛";
    GameLangs.gameNameMaps[38 /* GAME_ID_TWOMAN_QZNN */] = "二人牛牛";
    GameLangs.gameNameMaps[43 /* SELECT */] = "选场页面";
    GameLangs.gameNameMaps[42 /* LOGIN */] = "登陆加载页面";
    GameLangs.create_roomStr = "$1局($2房卡)";
    /**
     * 开房局数
     */
    GameLangs.createRoominning = [];
    GameLangs.createRoominning[1 /* NIUNIU */] = [{ playerCnt: 5, count: 10, cost: 3, }, { playerCnt: 5, count: 20, cost: 6 }, { playerCnt: 8, count: 30, cost: 9 }];
    GameLangs.createRoominning[10 /* ZJH */] = [{ count: 8, cost: 3 }, { count: 16, cost: 6 }, { count: 26, cost: 9 }];
    GameLangs.createRoominning[3 /* DDZ */] = [{ count: 8, cost: 3 }, { count: 16, cost: 5 }];
    GameLangs.createRoominning[39 /* GAME_ID_GDMJ_FK */] = [{ count: 8, cost: 2 }, { count: 16, cost: 3 }, { count: 26, cost: 5 }];
    /**
     * 游戏玩法
     */
    GameLangs.playingMethod = [];
    GameLangs.playingMethod[1 /* NIUNIU */] = [{ playing: "看牌抢庄" }, { playing: "无庄（混战）" }, { playing: "轮庄" }];
    GameLangs.playingMethod[10 /* ZJH */] = [{ playing: "三回合后可比" }];
    GameLangs.playingMethod[3 /* DDZ */] = [{ playing: "叫地主" }, { playing: "叫分（123分）" }];
    GameLangs.playingMethod[39 /* GAME_ID_GDMJ_FK */] = [{ playing: "无马" }, { playing: "买马" }];
    /**
     * 广东麻将胡牌
     */
    GameLangs.playingMethodHu = ["可吃胡", "鸡糊自摸", "自摸"];
    /**
   /**
    * 广东麻将赖子
    */
    GameLangs.playingMethodLai = ["没有赖子", "翻赖子", "白板赖子"];
    /**
    * 斗地主炸
    */
    GameLangs.playingfly = [];
    GameLangs.playingfly = [{ village: "3炸" }, { village: "4炸" }, { village: "5炸" }];
    /**
    * 抢庄牛牛轮庄后的玩法
    */
    GameLangs.playinghog = [];
    GameLangs.playinghog = [{ village: "顺序轮庄" }, { village: "牛九轮庄" }, { village: "牛牛换庄" }];
    /**
     * 游戏类型等级金币
     */
    GameLangs.createRoomConf = [];
    GameLangs.createRoomConf[8 /* BRNN */] = [{ gold: 2000 }, { gold: 500000 }];
    GameLangs.createRoomConf[9 /* QZNN */] = [{ gold: 5000 }, { gold: 300000 }, { gold: 600000 }];
    GameLangs.createRoomConf[10 /* ZJH */] = [{ gold: 5000 }, { gold: 100000 }, { gold: 200000 }];
    GameLangs.createRoomConf[3 /* DDZ */] = [{ gold: 2000 }, { gold: 50000 }, { gold: 200000 }];
    GameLangs.gameNotOverTip = "游戏还未结束，不能换桌！";
    GameLangs.gameNotOverTip2 = "游戏还未结束，不能离开房间！";
    GameLangs.notBetTip = "你还没有下过注";
    GameLangs.notBetTimeTip = "现在还不是下注时间,无法续押!";
})(GameLangs || (GameLangs = {}));
//# sourceMappingURL=GameLang.js.map