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
    /**
     * 选择碰/杠/胡/吃/过操作的面板
     */
    var SelectBox = (function (_super) {
        __extends(SelectBox, _super);
        function SelectBox() {
            return _super.call(this) || this;
        }
        SelectBox.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._btnGuo.data = { activeType: 32 /* GUO */ };
            this._btnGuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doAction, this);
            this._btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSure, this);
            this._btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCancel, this);
        };
        SelectBox.prototype.onTouchSure = function () {
            this.dispatchEventWith(SelectBox.SURE_TAN);
        };
        SelectBox.prototype.onTouchCancel = function () {
            this.dispatchEventWith(SelectBox.CANCEL_TAN);
            this.currentState = "normal";
            // this.reset();
        };
        SelectBox.prototype.doAction = function (event) {
            var item = event.target.data;
            switch (item.activeType) {
                // 	case ACTIVE_TYPE.GANG:
                // 		this._huGroup.removeChildren();
                // 	case ACTIVE_TYPE.CHI:
                // 	case ACTIVE_TYPE.PENG:
                // 		this._chiGroup.removeChildren();
                // 		this._pengGroup.removeChildren();
                // 		for (let i = this._gangGroup.numChildren - 1; i >= 0; i--) {
                // 			let btn = <SelectBtn>this._gangGroup.getChildAt(i);
                // 			if (btn.data.cardValue === item.cardValue) {
                // 				this._gangGroup.removeChildAt(i);
                // 				break;
                // 			}
                // 		}
                // 		break;
                // 	case ACTIVE_TYPE.SHAO:
                // 		for (let i = this._shaoGroup.numChildren - 1; i >= 0; i--) {
                // 			let btn = <SelectBtn>this._shaoGroup.getChildAt(i);
                // 			if (btn.data.cardValue === item.cardValue) {
                // 				this._shaoGroup.removeChildAt(i);
                // 				break;
                // 			}
                // 		}
                // 		break;
                // 	case ACTIVE_TYPE.AN_GANG:
                // 		for (let i = this._gangGroup.numChildren - 1; i >= 0; i--) {
                // 			let btn = <SelectBtn>this._gangGroup.getChildAt(i);
                // 			if (btn.data.cardValue === item.cardValue) {
                // 				this._gangGroup.removeChildAt(i);
                // 				break;
                // 			}
                // 		}
                // 		this._huGroup.removeChildren();
                // 		// this._tanGroup.removeChildren();
                // 		break;
                case 5 /* TAN */:
                    this.currentState = "tan";
                    break;
            }
            this.dispatchEventWith(SelectBox.DO_ACTION, false, event.target.data);
            // for (let i = this._btnGroup.numChildren - 1; i >= 0; i--) {
            // 	if ((<eui.Group>this._btnGroup.getChildAt(i)).numChildren) {
            // 		return;
            // 	}
            // }
            // this.visible = false;
        };
        SelectBox.prototype.reset = function () {
            for (var i = this._btnGroup.numChildren - 1; i >= 0; i--) {
                this._btnGroup.getChildAt(i).removeChildren();
            }
            this.visible = false;
            this.dispatchEventWith(SelectBox.CANCEL_TAN);
        };
        SelectBox.prototype.deleteBtnByItem = function (activeType) {
            this.currentState = "normal";
            switch (activeType) {
                // case ACTIVE_TYPE.GANG:
                // 	this._huGroup.removeChildren();
                // case ACTIVE_TYPE.CHI:
                // case ACTIVE_TYPE.PENG:
                // 	this._chiGroup.removeChildren();
                // 	this._pengGroup.removeChildren();
                // 	for (let i = this._gangGroup.numChildren - 1; i >= 0; i--) {
                // 		let btn = <SelectBtn>this._gangGroup.getChildAt(i);
                // 		if (btn.data.cardValue === item.cardValue) {
                // 			this._gangGroup.removeChildAt(i);
                // 			break;
                // 		}
                // 	}
                // 	break;
                // case ACTIVE_TYPE.SHAO:
                // 	for (let i = this._shaoGroup.numChildren - 1; i >= 0; i--) {
                // 		let btn = <SelectBtn>this._shaoGroup.getChildAt(i);
                // 		if (btn.data.cardValue === item.cardValue) {
                // 			this._shaoGroup.removeChildAt(i);
                // 			break;
                // 		}
                // 	}
                // 	break;
                // case ACTIVE_TYPE.AN_GANG:
                // 	for (let i = this._gangGroup.numChildren - 1; i >= 0; i--) {
                // let btn = <SelectBtn>this._gangGroup.getChildAt(i);
                // 		if (btn.data.cardValue === item.cardValue) {
                // 			this._gangGroup.removeChildAt(i);
                // 			break;
                // 		}
                // 	}
                // 	this._huGroup.removeChildren();
                // 	break;
                case 5 /* TAN */:
                    this._tanGroup.removeChildren();
                    break;
            }
            this.dispatchEventWith(SelectBox.CANCEL_TAN);
            for (var i = this._btnGroup.numChildren - 1; i >= 0; i--) {
                if (this._btnGroup.getChildAt(i).numChildren) {
                    return;
                }
            }
            this.visible = false;
        };
        SelectBox.prototype.addItems = function (_actionItem) {
            var item = _actionItem.pop();
            this.currentState = "normal";
            while (item) {
                egret.log("SelectBox:", item);
                var btn = new majiang.SelectBtn();
                btn.skinName = majiang.SelectBtnSkin;
                switch (item.activeType) {
                    case 7 /* CHI */:
                        this._chiGroup.addChild(btn);
                        break;
                    case 8 /* PENG */:
                        this._pengGroup.addChild(btn);
                        break;
                    case 6 /* SHAO */:
                        this._shaoGroup.addChild(btn);
                        break;
                    case 9 /* GANG */:
                    case 25 /* AN_GANG */:
                        this._gangGroup.addChild(btn);
                        break;
                    case 5 /* TAN */:
                        this._tanGroup.addChild(btn);
                        break;
                    case 10 /* HU */:
                        this._huGroup.addChild(btn);
                        break;
                }
                btn.init(item);
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doAction, this);
                item = _actionItem.pop();
            }
        };
        return SelectBox;
    }(eui.Component));
    /**
     * 点击按钮事件
     */
    SelectBox.DO_ACTION = "doAction";
    /**
     * 取消摊牌事件
     */
    SelectBox.CANCEL_TAN = "cancelTan";
    /**
     * 确定摊牌事件
     */
    SelectBox.SURE_TAN = "sureTan";
    majiang.SelectBox = SelectBox;
    __reflect(SelectBox.prototype, "majiang.SelectBox");
})(majiang || (majiang = {}));
//# sourceMappingURL=SelectBox.js.map