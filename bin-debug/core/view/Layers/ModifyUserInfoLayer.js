var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * MydataLayer
 */
var Layers;
(function (Layers) {
    var ModifyUserInfoLayer = (function (_super) {
        __extends(ModifyUserInfoLayer, _super);
        function ModifyUserInfoLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = ModifyUserInfoSkin;
            _this.loadKey = ResManager.GROUP_NAME.COMMON;
            return _this;
        }
        ModifyUserInfoLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._modifyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Sure, this);
            this.sex_Gourp = this._ManRadio.group;
            this.sex_Gourp.selectedValue = Global.playerDto.sex;
            this._nameText.text = Global.playerDto.nickName;
            this._qianMingText.text = Base64.decode(Global.playerDto.qianming);
            // this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.);
        };
        ModifyUserInfoLayer.prototype.Sure = function () {
            // Global.playerDto.sex = this.sex_Gourp.selectedValue;
            // //修改名称
            // Global.playerDto.nickName =  this._nameText.text;
            var strArr = Filters.FilterZi;
            //目前个性签名不要被屏蔽了
            // if (strArr.indexOf(this._nameText.text) == -1 && strArr.indexOf(this._qianMingText.text) == -1) {
            //该判断没有个性签名
            if (strArr.indexOf(this._nameText.text) == -1) {
                if (this._nameText.text.length >= 15) {
                    Toast.launch("名字最长为15个字符", 1000);
                    return;
                }
                if (this._qianMingText.text.length >= 30) {
                    Toast.launch("签名最长为30个字符", 1000);
                    return;
                }
                var sex = parseInt(this.sex_Gourp.selectedValue);
                net.SendMsg.create({
                    sex: sex,
                    nickName: Base64.encode(this._nameText.text),
                    qianming: Base64.encode(this._qianMingText.text),
                }, 1 /* PLAYER */, PlayerOrder.C2G_CHANGE_PLAYER_ATTR).send();
                Global.playerDto.nickName = this._nameText.text;
                Global.playerDto.sex = this.sex_Gourp.selectedValue;
                Global.playerDto.qianming = Base64.encode(this._qianMingText.text);
                // this._modifyInfoGroup.touchChildren = false;
                //发送更新消息事件
                EventManager.createEventByName("UpdateUserInfo").dispatchEventWith("UpdateUserInfo");
            }
            else {
                Toast.launch("有敏感词请重输");
            }
        };
        return ModifyUserInfoLayer;
    }(Layers.BaseLayer));
    Layers.ModifyUserInfoLayer = ModifyUserInfoLayer;
    __reflect(ModifyUserInfoLayer.prototype, "Layers.ModifyUserInfoLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=ModifyUserInfoLayer.js.map