var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var AnimationMjZhongMa = (function (_super) {
        __extends(AnimationMjZhongMa, _super);
        function AnimationMjZhongMa() {
            var _this = _super.call(this) || this;
            _this.skinName = zhongmapai;
            _this.horizontalCenter = _this.verticalCenter = 0;
            _this.maCarsImg = [_this.image2, _this.image6, _this.image10, _this.image14, _this.image18, _this.image26];
            _this.zhongMaCardsImg = [_this.image19, _this.image20, _this.image21, _this.image22, _this.image27, _this.image28];
            return _this;
        }
        AnimationMjZhongMa.prototype.setImgSource = function (maCard, zhongMaCard) {
            var len = maCard.length;
            if (len == 2) {
                this.currentState = "s2";
                this.image10.source = "mj_bottomD" + maCard[0] + "_png";
                this.image14.source = "mj_bottomD" + maCard[1] + "_png";
                if (zhongMaCard.indexOf(maCard[0]) != -1) {
                    this.image21.visible = true;
                    this.image10.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[1]) != -1) {
                    this.image22.visible = true;
                    this.image14.alpha = 1;
                }
            }
            else if (len == 4) {
                this.currentState = "s4";
                this.image6.source = "mj_bottomD" + maCard[0] + "_png";
                this.image10.source = "mj_bottomD" + maCard[1] + "_png";
                this.image14.source = "mj_bottomD" + maCard[2] + "_png";
                this.image18.source = "mj_bottomD" + maCard[3] + "_png";
                if (zhongMaCard.indexOf(maCard[0]) != -1) {
                    this.image20.visible = true;
                    this.image6.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[1]) != -1) {
                    this.image21.visible = true;
                    this.image10.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[2]) != -1) {
                    this.image22.visible = true;
                    this.image14.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[3]) != -1) {
                    this.image27.visible = true;
                    this.image18.alpha = 1;
                }
            }
            else if (len == 6) {
                this.currentState = "s6";
                this.image2.source = "mj_bottomD" + maCard[0] + "_png";
                this.image6.source = "mj_bottomD" + maCard[1] + "_png";
                this.image10.source = "mj_bottomD" + maCard[2] + "_png";
                this.image14.source = "mj_bottomD" + maCard[3] + "_png";
                this.image18.source = "mj_bottomD" + maCard[4] + "_png";
                this.image26.source = "mj_bottomD" + maCard[5] + "_png";
                if (zhongMaCard.indexOf(maCard[0]) != -1) {
                    this.image19.visible = true;
                    this.image2.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[1]) != -1) {
                    this.image20.visible = true;
                    this.image6.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[2]) != -1) {
                    this.image21.visible = true;
                    this.image10.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[3]) != -1) {
                    this.image22.visible = true;
                    this.image14.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[4]) != -1) {
                    this.image27.visible = true;
                    this.image18.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[5]) != -1) {
                    this.image28.visible = true;
                    this.image26.alpha = 1;
                }
            }
        };
        return AnimationMjZhongMa;
    }(AnimationBase));
    Game.AnimationMjZhongMa = AnimationMjZhongMa;
    __reflect(AnimationMjZhongMa.prototype, "Game.AnimationMjZhongMa");
})(Game || (Game = {}));
//# sourceMappingURL=AnimationMjZhongMa.js.map