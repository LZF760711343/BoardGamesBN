var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layers;
(function (Layers) {
    var UserInfoLayer = (function (_super) {
        __extends(UserInfoLayer, _super);
        function UserInfoLayer(data, state) {
            var _this = _super.call(this, ["d1_icon_png"]) || this;
            _this.change = true;
            _this.skinName = UserInfoLayerSkin;
            _this._userInfo = data;
            _this._head.mask = _this._roundMask;
            if (data == Global.playerDto && state && state == 1) {
                _this._uploadPhoto.visible = true;
                _this._modifyBtn.visible = true;
                _this._uploadPhoto.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.uploadPhoto, _this);
            }
            if (!_this._uploadPhoto.visible) {
                _this._head.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ChangeHead, _this);
            }
            _this._modifyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.OpenModifyUserInfoLayer, _this);
            EventManager.register("UpdateUserInfo", _this.updateUserInfo, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                EventManager.remove("UpdateUserInfo", _this.updateUserInfo, _this);
            }, _this);
            return _this;
            // EventManager.registerOnce("CloseParent",()=>{
            //     egret.log("close");
            //     this.close();
            // },this);
        }
        UserInfoLayer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.updateUserInfo();
        };
        UserInfoLayer.prototype.ChangeHead = function () {
            if (this.change) {
                this.change = false;
                this._headGroup.scaleX = this._headGroup.scaleY = 1.4;
            }
            else {
                this.change = true;
                this._headGroup.scaleX = this._headGroup.scaleY = 1;
            }
        };
        UserInfoLayer.prototype.OpenModifyUserInfoLayer = function () {
            new Layers.ModifyUserInfoLayer().open();
        };
        /**
         * 字符串中间插入字符
         */
        UserInfoLayer.prototype.Splice = function (ID) {
            var id = "";
            var array = ID.toString();
            // var array=ID.toString().split('').splice(2,3,"***").join("");
            // var num=array.substr(3,3);
            egret.log("array" + array);
            for (var i = 0; i < array.length; i++) {
                if (i == 2 || i == 3 || i == 4) {
                    id += "*";
                }
                else {
                    id += array[i];
                }
            }
            return array;
        };
        UserInfoLayer.prototype.updateUserInfo = function () {
            //2、重写后代码如下：
            var self = this;
            var url = self._userInfo.headImages;
            self._head.setIcon(url);
            self._idLabel["_context"].text = "ID:" + self._userInfo.id;
            if (this._uploadPhoto.visible) {
                self._idLabel["_context"].text = "ID:" + self._userInfo.id;
            }
            // else{
            //     self._idLabel["_context"].text = "ID:" + this.Splice(self._userInfo.id);
            // } 
            self._nameLabel["_context"].text = self._nameLabel2["_context"].text = this.showName(self._userInfo.nickName);
            self._ipLabel.text = self._userInfo.gold + GameLangs.jinbi;
            // self._phone["_context"].text = self._userInfo.mobile;
            // self._qianMingText.text = Base64.decode(self._userInfo.qianming);
            if (self._userInfo.sex == 1 /* MALE */) {
                self._iconSex.source = "nan_area_png";
                self._sex["_context"].text = "男";
            }
            else {
                self._iconSex.source = "nv_area_png";
                self._sex["_context"].text = "女";
            }
            if (self._userInfo.gold > 100000) {
                this._gold["_context"].text = Math.floor(self._userInfo.gold / 10000) + GameLangs.wan;
            }
            else {
                this._gold["_context"].text = self._userInfo.gold + "";
            }
        };
        UserInfoLayer.prototype.showName = function (name) {
            var newName = name;
            if (name.length > 5) {
                newName = name.substring(0, 5) + "...";
            }
            return newName;
        };
        UserInfoLayer.prototype.updateUserImgs = function (headImages) {
            egret.log("headImages:::::" + headImages);
            this._head.setIcon(headImages);
        };
        UserInfoLayer.prototype.uploadFinish = function (url) {
            egret.log("uploadPhoto:" + url);
            this.updateUserImgs(url);
            net.SendMsg.create({ headImages: url }, 3 /* PLAY_GAME */, PlayGameOrder.C2G_UPDATE_HEAD_IMAGES).send();
        };
        UserInfoLayer.prototype.uploadPhoto = function () {
            nest.uploadHeadImg(this.uploadFinish, this);
        };
        return UserInfoLayer;
    }(Layers.BaseLayer));
    Layers.UserInfoLayer = UserInfoLayer;
    __reflect(UserInfoLayer.prototype, "Layers.UserInfoLayer");
})(Layers || (Layers = {}));
//# sourceMappingURL=UserInfoLayer.js.map