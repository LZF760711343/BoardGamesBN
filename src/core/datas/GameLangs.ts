namespace GameLangs {
	export const ren = "人";
	export const create_room_str = "$1局($2房卡)";
	export const create_room_str2 = "打到$1($2房卡)";
	export const roomBetNotSelectTip = "请至少选择一项下注限制!";
	export const qian = "千";
	export const wan = "万";
	export const offLine: string = "离线";
	export const cardTypes = [];
	cardTypes[niuniu.HANDVALUE.SANPAI] = "没牛";
	cardTypes[niuniu.HANDVALUE.NIUX] = "牛";
	cardTypes[niuniu.HANDVALUE.NIUNIU] = "牛牛";
	cardTypes[niuniu.HANDVALUE.SHUNZI] = "顺子";
	cardTypes[niuniu.HANDVALUE.TONGHUA] = "同花";
	cardTypes[niuniu.HANDVALUE.WXN] = "五小牛";
	cardTypes[niuniu.HANDVALUE.BOMB] = "炸弹";
	cardTypes[niuniu.HANDVALUE.JINNIU] = "五花牛";
	cardTypes[niuniu.HANDVALUE.HULU] = "葫芦";
	cardTypes[niuniu.HANDVALUE.TONGHUASHUN] = "同花顺";

	export const cardTypesSzp = [];
	cardTypesSzp[zjh.HANDVALUE.BOMB] = "豹子";
	cardTypesSzp[zjh.HANDVALUE.TONGHUASHUN] = "同花顺";
	cardTypesSzp[zjh.HANDVALUE.TONGHUA] = "金花";
	cardTypesSzp[zjh.HANDVALUE.SHUNZI] = "顺子";
	cardTypesSzp[zjh.HANDVALUE.YIDUI] = "对子";
	cardTypesSzp[zjh.HANDVALUE.SINGLE] = "散牌";
	cardTypesSzp[zjh.HANDVALUE.JINGHUA_235] = "金花235";

	export const nn_room_Info_lb = "玩法：$1        炸弹上限：$2                 倍数：x1";
	export const card_select_error_tip = "没办法选择更多牌!";
	export const gameRoomId = "房间号：$1";
	export const gamePlayCntInfo = "第 $1/$2 局";
	export const rob_time_tip = "请抢庄";
	export const roc_time_tip = "抢叫分";
	export const bet_time_tip = "请下注";
	export const wait_bet_time_tip = "请等待其他玩家下注";
	export const calTimeTip = "$1";
	export const wait_cal_time_tip = "其他人还在苦思冥想中";
	export const moreThinkTip = "再想想吧!";
	export const waitPlayGameTip = "请等待其他人玩完游戏!";
	
	export const moneyTooMoreTip = "金币超出进房限制,请进入更高级的房间";

	export const account_best = "最大倍率：";
	export const account_tip1 = "最高积分：";
	export const account_tip2 = "最大牌型：";
	export const account_tip22 = "最大番数：";
	export const account_tip3 = "胜负局数：";
	export const account_tip4 = "$1平";
	export const account_tip5 = "$1胜$2负";
	export const dissolveTip1 = "（超过$1分钟未作出决定，则默认同意，计时：$2）";
	export const dissolveTip2 = "解散房间不扣钻石，是否确定解散？";
	export const dissolveTip3 = "是否确定要发起投票,关闭房间!\n\n  (所有人同意即可关闭房间)";
	export const dissolveTip4 = "玩家【$1】申请解散房间，请问是否同意？";
	export const dissolveTipResult2 = "【$1】拒绝";
	export const dissolveTipResult1 = "【$1】同意";
	export const dissolveTipResult0 = "【$1】等待选择";
	export const dissolveTip8 = "【$1】申请解散房间失败，【$2】拒绝解散!";
	export const dissolveTip9 = "【$1】成功解散房间，【$2】房间已关闭!";
	export const bei = "倍";
	export const fen = "分";
	export const zidongsuanniu = "自动算牛";
	export const buqiang = "不抢";
	export const rechargeDiamondBody = "购买$1钻石";
	export const rechargeNiuBody = "购买$1牛卡";
	export const rechargeFangkaBody = "购买$1房卡";
	export const diamondNotEnough = "钻石不足!";
	export const exitGameTip = "是否确定要离开游戏?";
	export const buySuccess = "购买成功!";
	export const firstChargeErrorTips = "需要充值两元或两元以上才可以领取首冲礼包!!!";

	export const recordTooShort = "录音时间过短!";
	export const record_not_suport_tip = "请下载客户端才可使用录音功能!";

	export const versionTip = "版本号:$1($2)";

	export const inviteTip = "HZ棋牌$1房间号：$2【点击进入房间】";
	export const zuanshi = '房卡';
	export const yuan = "元";
	export const jinbi = "金币";
	
	
}