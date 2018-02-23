namespace zjh {
	export function changeNumber(num: number, gameType: GAME_TYPE) {
			let str;
			if (num >= 10000) {
				str = (num / 10000) + GameLangs.wan;
			} else if (num >= 1000) {
				str = (num / 1000) + GameLangs.qian;
			}else{
				str = num + "";
			}
			// if (gameType === GAME_TYPE.COIN) {
			// 	str += GameLangs.fen;
			// }
			return str;
		}
	export class GameBtnBar extends eui.Component {
		public btnQi: UI.CommonBtn;//弃牌按钮
		public btnBi: UI.CommonBtn;//比牌按钮
		public btnKan: UI.CommonBtn;//看牌按钮
		public btnJia: UI.CommonBtn;//加注按钮
		public btnGen: UI.CommonBtn;//跟注按钮
		public closeBi: UI.CommonBtn;//取消比牌按钮
		public tBtnGen: eui.ToggleButton;//跟注到底选择按钮
		public group_btn: eui.Group;//筹码按钮所在的Group
		public chipsGroup:eui.Group;
		public chipsBtnList: UI.CommonBtn[];//筹码按钮列表
		private btnBg:eui.Image;
		/**
		 * 发送加注消息
		 */
		public static ADD_CHIPS:"addChips"
		public constructor(betChips:number[]) {
			super();
		}
		protected childrenCreated(): void {
			super.childrenCreated();
			//移除事件
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onExit,this);
		}
		private onTouchBtnJia() {
			// egret.log("onTouchBtnJia")
			this.chipsGroup.visible = !this.chipsGroup.visible;
		}
		public setBtnJiaGroupVisible(value:boolean){
			this.chipsGroup.visible = value;
		}
		public initChipsBtns(betList: number[], gameType: GAME_TYPE) {

			//把childrenCreated的移到这边来，以便创建动态加注按钮
			var btnLayout = new eui.HorizontalLayout();
			btnLayout.gap = 40;
			this.group_btn.layout = btnLayout;
			for(let i=0;i<betList.length;i++){
				let btn = new UI.CommonBtn();
				btn.skinName = "zjh.ChipsBtnSkin";
				btn.bgStr = "zjh_chouma_" +(i+1)+"_png";
				// btn.width = btn.skin.width;
				// btn.height = btn.skin.height;
				this.group_btn.addChild(btn);
				console.log("betList长度",betList.length);
				//设置按钮背景的宽度
				if(i==betList.length-1){
					this.btnBg.width = (74+btnLayout.gap)*(betList.length)+btnLayout.gap;
				}
			}

			this.chipsBtnList = [];
			let arrLen1 = this.group_btn.numChildren;
			for (let i = 0; i < arrLen1; i++) {
				let btn = this.group_btn.getChildAt(i);
				if (btn instanceof UI.CommonBtn) {
					this.chipsBtnList.push(btn);
				}
			}
			this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnJia, this);

			//------------------------------------------------

			let arrLen = betList.length;
			for (let i = 0; i < arrLen; i++) {
				this.chipsBtnList[i].icon = changeNumber(betList[i], gameType);
				this.chipsBtnList[i].data = betList[i];
				this.chipsBtnList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChipsBtn, this);
			}
		}
		private onTouchChipsBtn(event:egret.TouchEvent){
			this.dispatchEventWith(GameBtnBar.ADD_CHIPS, false, event.target.data);
			this.chipsGroup.visible = false;
		}
		
		/**
		 * 刷新加注按钮的状态
		 * @param curBet:当前的底注,如果小于当前底注的将按钮变成不可触摸
		 * @param selfChips:当前自己剩下的筹码,如果下注的筹码额度大于自己的剩下的筹码,将按钮变成不可触摸
		 */
		public updateChipsGroup(curBet:number, selfChips: number) {
			let arrLen = this.chipsBtnList.length;
			for (let i = 1; i < arrLen; i++) {
				this.chipsBtnList[i].enabled = this.chipsBtnList[i].data > curBet && this.chipsBtnList[i].data < selfChips;
			}
		}

		private onExit(){
			this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnJia, this);
			//移除筹码事件
			for (let i = 0; i < this.chipsBtnList.length; i++) {
				this.chipsBtnList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChipsBtn, this);
			}
		}
	}
}