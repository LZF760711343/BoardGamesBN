var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DDZ;
(function (DDZ) {
    var GameUI = (function (_super) {
        __extends(GameUI, _super);
        function GameUI() {
            return _super.call(this, 3 /* DDZ */) || this;
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
            var inning = GameLangs.createRoominning[3 /* DDZ */][conf.createinfo.roomLevel];
            str.push(GameLangs.create_roomStr.format(inning.count, inning.cost)
                + GameLangs.playingMethod[3 /* DDZ */][conf.createinfo.roomMode].playing
                + GameLangs.playingfly[conf.createinfo.roomSubMode].village);
            var roomid = conf.room_id;
            egret.log("initSharing");
            Global.initSharing({
                type: 'txt',
                scene: 0,
                title: GameLangs.inviteTip.format(roomid, GameLangs.gameNameMaps[conf.createinfo.gameId]),
                description: str.join(" "),
                url: Config.URLS.shareUrl + "?roomId=" + conf.room_id
            }, false);
        };
        GameUI.prototype.openruleBtn = function (event) {
            if (this.gameDatas.roomInfo.createinfo.gameId == 13 /* GOLD_DDZ */) {
                var layer = new DDZ.RoomConfigLayer("4").open();
            }
            else {
                var data = this.gameDatas.roomInfo;
                var layer = new DDZ.RoomConfigLayer("2").open();
                layer.setInfo(data);
            }
        };
        return GameUI;
    }(GameUIBase));
    DDZ.GameUI = GameUI;
    __reflect(GameUI.prototype, "DDZ.GameUI");
})(DDZ || (DDZ = {}));
//# sourceMappingURL=GameUI.js.map