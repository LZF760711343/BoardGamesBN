module UI {
	export class Danmu extends eui.Component {
		public static DANMU_POOL = [];
		public static DAMUN_HEIGHT:number = 50;
		
		private _head:eui.Image;
		private _talk:eui.Label;

		public head_png:string = "defaultHead_png";
		public text:string = "";

		/** 游戏类型，以后其他地方可能也会用到，先暂时就这样给个固定值 */
		private num = GAME_ID.NIUNIU;

		private timer:egret.Timer;

		//弹幕的具体信息，附id，个人所有信息暂且不放进去：
		//具体格式：{id:playerId,context:chatStr,playerDto:this.gameDatas.playerDatas[playerId].UserInfo}
		private _danmuInfo:{id:number,context:string,playerDto?:model.PlayerDto};

		public get danmuInfo(){
			return this._danmuInfo;
		}

		public constructor(head?:string,text?:string,id?:number,danmuInfo?:{id:number,context:string,playerDto?:model.PlayerDto}) {
			super();
			this.skinName = UI.DanmuSkin;
			this.init(head,text,id,danmuInfo);
		}

		public static create(head?:string,text?:string,id?:number,danmuInfo?:{id:number,context:string,playerDto?:model.PlayerDto}) {
			let danmu: Danmu;
			if (Danmu.DANMU_POOL.length) {
				danmu = Danmu.DANMU_POOL.pop();
				danmu.init(head,text,id,danmuInfo);
			} else {
				danmu = new Danmu(head,text,id,danmuInfo);
			}
			return danmu;
		}

		private init(head?:string,text?:string,id?:number,danmuInfo?:{id:number,context:string,playerDto?:model.PlayerDto}){
			if(head) this.head_png = head;
			if(text) this.text = text;
			if(id){
				this._danmuInfo = {id:id,context:text};
			}
			if(danmuInfo) this._danmuInfo = danmuInfo;
		}

		protected childrenCreated() {
            super.childrenCreated();
			this.touchChildren = this.touchEnabled = false;

			this._head.source = this.head_png;
			// this._talk.text = this.text;
			this.parseMsg({info:this.text,gameId:this.num});

			this.timer = new egret.Timer(40,0);
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        	// this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
			this.startMove();
		}


		private move(){	
			if(this.parent && this.x >= -this.width){
				this.x -= 2;
			} else {
				//移除表情动画
				if(this.mc1){
					this.mc1.parent.removeChild(this.mc1);
					this.mc1 = null;
				}
				//清除对象所以tween动画
				// egret.Tween.removeTweens(this);
				// this.tween = null;
				this.stopMove();
				this.timer = null;
				this.parent.removeChild(this);
				Danmu.DANMU_POOL.push(this);
			}
		}

		public startMove(){
			if(this.timer)
				this.timer.start();
		}

		public stopMove(){
			if(this.timer)
				this.timer.stop();
		}

		private timerFunc(){
			this.move();
		}

		private mc1;

		/** 输出信息，可以输出表情和语音语句,场外的玩家不能有语音 */
		public parseMsg(msg: ChatMsg) {
			this._talk.text = "";
			//聊天
			try{
				if(msg.info.indexOf('{')>-1 && JSON.parse(msg.info)){
					this._talk.text =  JSON.parse(msg.info).context;            
					
					return;
				}
			}   catch(e){
				egret.log("not JSON");
			}

			let data = msg.info.split("@");
			let type = parseInt(data[0].substr(1, msg.info.length));
			//文本（场外玩家发的表情无语音）
			if (100 <= type && type < 200) {
				switch (this.num) {
					case GAME_ID.DDZ:
						if (msg.gameId == 2) {
							GameLangs.chats[0]["#108"] = "帅哥，交个朋友吧";
							this._talk.text = GameLangs.chats[0][msg.info];
						} else {
							this._talk.text = GameLangs.chats[1][msg.info];
						}
						break;
					case GAME_ID.NIUNIU:
						this._talk.text = GameLangs.chats[2][msg.info];
						break;
					case GAME_ID.ZJH:
						if (msg.gameId == 2) {
							this._talk.text = GameLangs.chats[3][msg.info];
						} else {
							this._talk.text = GameLangs.chats[4][msg.info];
						}
						break;
					case GAME_ID.GAME_ID_GDMJ_GOLD:
						this._talk.text = GameLangs.chats[5][msg.info];
						break;
				}
				
			}
			//表情
			else if (200 <= type && type < 300) {
				this._talk.visible = false;
				this.mc1 = Effect.getMCDate("expression", msg.info);
				let Type = type + "";
				
				//手动调节表情的大小和整个框的大小
				this.mc1.x = this._talk.left;
				this.mc1.y = 0;
				this.mc1.scaleX = 0.3;
				this.mc1.scaleY = 0.3;
				this.mc1.alpha = 0.5;
				this.width += 50;
				this.addChild(this.mc1);

				this.mc1.gotoAndPlay("run", -1);		
			}
			//语音(场外不存在语音)
			else {
				egret.log("错误");
			}
			
		}
	}
}