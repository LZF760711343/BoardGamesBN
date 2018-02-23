var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI;
(function (UI) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar() {
            var _this = _super.call(this) || this;
            _this._imgRect = egret.Rectangle.create();
            _this._startPoint = egret.Point.create(0, 0);
            _this._movePoint = egret.Point.create(0, 0);
            return _this;
            // this._pointList = [];
        }
        ProgressBar.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ProgressBar.prototype.createMask = function () {
            var mask = this._mask = new egret.Shape();
            this._imgRect.x = 0;
            this._imgRect.y = 0;
            this._imgRect.width = this.width;
            this._imgRect.height = this.height;
            this.addChild(mask);
            this._target.mask = mask;
        };
        ProgressBar.prototype.startTimer = function (time) {
            if (!this._mask) {
                this.createMask();
            }
            this._mask.graphics.clear();
            this._allTime = time;
            this._movePoint.x = this._startPoint.x;
            this._movePoint.y = this._startPoint.y;
            this._rectLength = (this._imgRect.width + this._imgRect.height) * 2;
            this._pointList = [
                this._startPoint,
                egret.Point.create(this._imgRect.width / 2, this._imgRect.height / 2),
                this._movePoint,
                egret.Point.create(this._imgRect.width, 0),
                egret.Point.create(this._imgRect.width, this._imgRect.height),
                egret.Point.create(0, this._imgRect.height),
                egret.Point.create(0, 0),
            ];
            this._target.strokeColor = 0x6CFF00;
            this._startTimer = Date.now();
            FrameManager.getInstance().addTimerByKey(this.hashCode, this.update, this, 1000 / 24);
            this.draw();
        };
        ProgressBar.prototype.getPointByLength = function (length) {
            if (length > this._rectLength) {
                this._mask.graphics.clear();
                this.stopTimer();
                return;
            }
            var realLen = length + this._startPoint.x;
            this.draw();
            if (this._pointList.length === 7) {
                if (realLen <= this._imgRect.width) {
                    this._movePoint.x = realLen;
                }
                else {
                    this._pointList.splice(3, 1);
                    this._movePoint.x = this._imgRect.width;
                }
                return;
            }
            if (this._pointList.length === 6) {
                if (realLen <= this._imgRect.width + this._imgRect.height) {
                    this._movePoint.y = realLen - this._imgRect.width;
                }
                else {
                    this._movePoint.y = this._imgRect.height;
                    this._pointList.splice(3, 1);
                }
                return;
            }
            if (this._pointList.length === 5) {
                if (realLen <= this._imgRect.width * 2 + this._imgRect.height) {
                    this._movePoint.x = this._imgRect.width * 2 + this._imgRect.height - realLen;
                }
                else {
                    this._movePoint.x = 0;
                    this._pointList.splice(3, 1);
                }
                return;
            }
            if (this._pointList.length === 4) {
                if (realLen < this._rectLength) {
                    this._movePoint.y = (this._imgRect.width + this._imgRect.height) * 2 - realLen;
                }
                else {
                    this._movePoint.y = 0;
                    this._pointList.splice(3, 1);
                }
                return;
            }
            if (this._pointList.length === 3) {
                this._movePoint.x = realLen - (this._imgRect.width + this._imgRect.height) * 2;
            }
        };
        ProgressBar.prototype.stopTimer = function () {
            FrameManager.getInstance().delayRemoveHandler(this.hashCode);
        };
        ProgressBar.prototype.update = function (curTime) {
            var paddingTimer = Date.now() - this._startTimer;
            var percent = paddingTimer / this._allTime;
            if (percent >= 0.666) {
                this._target.strokeColor = 0xFF0000;
            }
            else if (percent >= 0.333) {
                this._target.strokeColor = 0xFFEA00;
            }
            this.getPointByLength(percent * this._rectLength);
        };
        ProgressBar.prototype.draw = function () {
            var graphics = this._mask.graphics;
            graphics.clear();
            graphics.beginFill(0xff0000);
            graphics.moveTo(this._pointList[0].x, this._pointList[0].y);
            var arrLen = this._pointList.length;
            for (var i = 1; i < arrLen; i++) {
                graphics.lineTo(this._pointList[i].x, this._pointList[i].y);
            }
            graphics.lineTo(this._pointList[0].x, this._pointList[0].y);
            graphics.endFill();
        };
        return ProgressBar;
    }(eui.Component));
    UI.ProgressBar = ProgressBar;
    __reflect(ProgressBar.prototype, "UI.ProgressBar");
})(UI || (UI = {}));
//# sourceMappingURL=ProgressBar.js.map