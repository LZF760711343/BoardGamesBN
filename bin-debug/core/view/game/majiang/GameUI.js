var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var majiang;
(function (majiang) {
    var GameUI = (function (_super) {
        __extends(GameUI, _super);
        function GameUI() {
            return _super.call(this, 39 /* GAME_ID_GDMJ_FK */) || this;
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
        /**
         * 规则页面
         */
        GameUI.prototype.openruleBtn = function (event) {
            if (this.gameDatas.roomInfo.createinfo.gameId == 40 /* GAME_ID_GDMJ_GOLD */) {
                var layer = new majiang.RoomConfigLayer("3").open();
            }
            else {
                var data = this.gameDatas.roomInfo;
                var layer = new majiang.RoomConfigLayer("2").open();
                layer.setInfo(data);
            }
        };
        GameUI.prototype.openSetBtn = function (event) {
            new Layers.SettingLayer("majiang").open();
        };
        GameUI.prototype.openinviteBtn = function () {
            var conf = this.gameDatas.roomInfo;
            var str = [];
            var roomMode = conf.createinfo.roomMode - 1;
            var genMA = "";
            conf.createinfo.roomSubMode >= (2 << 4) ? genMA = "马跟底分" : "";
            var inning = GameLangs.createRoominning[39 /* GAME_ID_GDMJ_FK */][conf.createinfo.roomLevel];
            str.push(GameLangs.create_roomStr.format(inning.count, inning.cost)
                + GameLangs.playingMethod[39 /* GAME_ID_GDMJ_FK */][roomMode].playing + " "
                + genMA + " "
                + GameLangs.playingMethodHu[conf.createinfo.hufaFlag] + " "
                + GameLangs.playingMethodLai[conf.createinfo.guipaiType]);
            var roomid = conf.room_id;
            Global.initSharing({
                type: 'txt',
                scene: 0,
                title: GameLangs.inviteTip.format(roomid, GameLangs.gameNameMaps[conf.createinfo.gameId]),
                description: str.join(" "),
                url: Config.URLS.shareUrl + "?roomId=" + conf.room_id + "&appid=" + Config.WX_APPID
            }, false);
        };
        return GameUI;
    }(GameUIBase));
    majiang.GameUI = GameUI;
    __reflect(GameUI.prototype, "majiang.GameUI");
})(majiang || (majiang = {}));
//# sourceMappingURL=GameUI.js.map