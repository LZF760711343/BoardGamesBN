var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var niuniu;
(function (niuniu) {
    var GameUI = (function (_super) {
        __extends(GameUI, _super);
        function GameUI() {
            return _super.call(this, 1 /* NIUNIU */) || this;
        }
        GameUI.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            if (self._zoomButton._SetBtn) {
                self._zoomButton._SetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openSetBtn, self);
            }
            if (self._zoomButton._dissolveBtn) {
                self._zoomButton._dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openDissolveBtn, self);
            }
            // if (self._zoomButton._ruleBtn) {
            // 	self._zoomButton._ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openruleBtn, self);
            // }
        };
        GameUI.prototype.openinviteBtn = function () {
            var conf = this.gameDatas.roomInfo;
            var str = [];
            var roomMode = conf.createinfo.roomMode - 1;
            var inning = GameLangs.createRoominning[1 /* NIUNIU */][conf.createinfo.roomLevel];
            if (this.gameDatas.roomInfo.createinfo.gameId == 38 /* GAME_ID_TWOMAN_QZNN */) {
                str.push("2人");
            }
            else {
                str.push(GameLangs.create_roomStr.format(inning.count, inning.cost)
                    + "看牌抢庄");
                // egret.log("111::::" + inning.playerCnt + "人" + GameLangs.create_roomStr.format(inning.count, inning.cost));
                egret.log("conf", conf.createinfo, conf.createinfo.roomMode);
                if (conf.createinfo.roomMode == 3) {
                    str.push(GameLangs.playinghog[conf.createinfo.roomSubMode].village);
                }
                for (var i = 0; i < conf.createinfo.betChips.length; i++) {
                    var val = conf.createinfo.betChips[i];
                    str.push(val + "倍");
                }
            }
            var roomid = conf.room_id;
            Global.initSharing({
                type: 'txt',
                scene: 0,
                title: GameLangs.inviteTip.format(roomid, GameLangs.gameNameMaps[conf.createinfo.gameId]),
                description: str.join(" "),
                url: Config.URLS.shareUrl + "?roomId=" + conf.room_id
            }, false);
        };
        GameUI.prototype.openruleBtn = function (event) {
            var data = this.gameDatas.roomInfo;
            if (data.createinfo.gameId == 38 /* GAME_ID_TWOMAN_QZNN */) {
                new twoniuniu.RoomConfigLayer("5").open().setInfo(data);
            }
            else if (data.createinfo.gameId == 1 /* NIUNIU */) {
                new niuniu.RoomConfigLayer("2").open().setInfo(data);
            }
            else {
                new niuniu.RoomConfigLayer("4").open();
            }
        };
        return GameUI;
    }(GameUIBase));
    niuniu.GameUI = GameUI;
    __reflect(GameUI.prototype, "niuniu.GameUI");
})(niuniu || (niuniu = {}));
//# sourceMappingURL=GameUI.js.map