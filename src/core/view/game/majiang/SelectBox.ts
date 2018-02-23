namespace majiang {
	/**
	 * 选择碰/杠/胡/吃/过操作的面板
	 */
	export class SelectBox extends eui.Component {
		private _btnGuo: UI.CommonBtn;
		private _btnGroup: eui.Group;
		/**
		 * 勺牌按钮组
		 */
		private _shaoGroup: eui.Group;
		/**
		 * 杠牌按钮组
		 */
		private _gangGroup: eui.Group;
		/**
		 * 吃牌按钮组
		 */
		private _chiGroup: eui.Group;
		/**
		 * 碰牌按钮组,不过碰一般只会有一个按钮
		 */
		private _pengGroup: eui.Group;
		/**
		 * 摊牌按钮组,一样只有一个按钮
		 */
		private _tanGroup: eui.Group;
		/**
		 * 胡牌按钮组,只有一个按钮
		 */
		private _huGroup: eui.Group;
		public _btnCancel: UI.GrayBtn;
		public _btnSure: UI.GrayBtn;

		/**
		 * 点击按钮事件
		 */
		public static DO_ACTION: string = "doAction";
		/**
		 * 取消摊牌事件
		 */
		public static CANCEL_TAN: string = "cancelTan";
		/**
		 * 确定摊牌事件
		 */
		public static SURE_TAN: string = "sureTan";
		public constructor() {
			super();
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			this._btnGuo.data = { activeType: ACTIVE_TYPE.GUO }
			this._btnGuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doAction, this);
			this._btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSure, this);
			this._btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCancel, this);
		}
		private onTouchSure() {
			this.dispatchEventWith(SelectBox.SURE_TAN);
		}
		private onTouchCancel() {
			this.dispatchEventWith(SelectBox.CANCEL_TAN);
			this.currentState = "normal";
			// this.reset();
		}
		private doAction(event: egret.TouchEvent) {

			let item = event.target.data;
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
				case ACTIVE_TYPE.TAN:
					this.currentState = "tan";
					break;
			// 	case ACTIVE_TYPE.HU:
			// 	case ACTIVE_TYPE.GUO:
			// 		this.reset();
			// 		break;
			}
			this.dispatchEventWith(SelectBox.DO_ACTION, false, event.target.data);
			// for (let i = this._btnGroup.numChildren - 1; i >= 0; i--) {
			// 	if ((<eui.Group>this._btnGroup.getChildAt(i)).numChildren) {
			// 		return;
			// 	}
			// }
			// this.visible = false;
		}
		public reset() {
			for (let i = this._btnGroup.numChildren - 1; i >= 0; i--) {
				(<eui.Group>this._btnGroup.getChildAt(i)).removeChildren();
			}
			this.visible = false;
			this.dispatchEventWith(SelectBox.CANCEL_TAN);
		}
		public deleteBtnByItem(activeType: ACTIVE_TYPE) {
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
				case ACTIVE_TYPE.TAN:
					this._tanGroup.removeChildren();
					break;
				// case ACTIVE_TYPE.HU:
				// case ACTIVE_TYPE.GUO:
				// 	this.reset();
				// 	break;
			}
			this.dispatchEventWith(SelectBox.CANCEL_TAN);
			for (let i = this._btnGroup.numChildren - 1; i >= 0; i--) {
				if ((<eui.Group>this._btnGroup.getChildAt(i)).numChildren) {
					return;
				}
			}
			this.visible = false;
		}
		public addItems(_actionItem: MJActionItem[]) {
			let item = _actionItem.pop();
			this.currentState = "normal";
			while (item) {
				egret.log("SelectBox:", item);
				let btn = new SelectBtn();
				btn.skinName = SelectBtnSkin;
				switch (item.activeType) {
					case ACTIVE_TYPE.CHI:
						this._chiGroup.addChild(btn);
						break;
					case ACTIVE_TYPE.PENG:
						this._pengGroup.addChild(btn);
						break;
					case ACTIVE_TYPE.SHAO:
						this._shaoGroup.addChild(btn);
						break;
					case ACTIVE_TYPE.GANG:
					case ACTIVE_TYPE.AN_GANG:
						this._gangGroup.addChild(btn);
						break;
					case ACTIVE_TYPE.TAN:
						this._tanGroup.addChild(btn);
						break;
					case ACTIVE_TYPE.HU:
						this._huGroup.addChild(btn);
						break;
				}
				btn.init(item);
				btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doAction, this);
				item = _actionItem.pop();
			}
		}
	}
}