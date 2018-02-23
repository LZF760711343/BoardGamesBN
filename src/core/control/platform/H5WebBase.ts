namespace nest {
	const params = [
		["roomId", ""],
		["chl", Config.channel],
		["aid", ""],
		["upplayerid", ""],
		["playerid", ""],
		["serverid", Config.SERVER_ID],
		["debug", ""],
	];
	export abstract class H5WebBase implements IPlatform {
		/**
		 * 重定向地址,跳转到wechatUrl后,微信会将code放到这个地址,跳转过去
		 */
		protected redirectUri: string;
		protected appid: string;
		/**
		 * 微信跳转的url
		 */
		protected wechatUrl: string;
		public constructor() {
		}
		/**
		 * 是否自动登陆
		 */
		public isAutoLogin() {
			return egret.getOption("unionid") || LocalDatas.datas.datas.loginInfo;
		}
		init() {

		}
		/**
		 * 购买商品
		 */
		pay(pid: string, unionid: string, openid: string, body: string) { };
		public getRoomId() {
			if (egret.getOption("roomId")) {
				Global.enterRoomId = parseInt(egret.getOption("roomId"));
			}
			egret.log("Global.enterRoomId:" + Global.enterRoomId)
		}
		public getVersion() {

		}
		public share(shareInfo: any) {
			Gzqd.setShare({
				share_title: shareInfo.title,
				share_desc: shareInfo.description,
				share_url: shareInfo.url,
				share_img: Gzqd.getCurFolder() + "favicon.ico",
			});
		}
		public uploadHeadImg(callBack: Function, thisObj: Object) {
			Uplad.LPAS(callBack, thisObj);
		}
		public addShareCb(cb: Function) {
			if (Gzqd) {
				Gzqd.addShareCb(cb);
			}
		}
		protected getOption() {
			let list = [];
			let arrLen = params.length;
			for (let i = 0; i < arrLen; i++) {
				let key = params[i][0];
				let str = egret.getOption(key);
				if (str) {
					list.push(key + "=" + str);
				} else if (params[i][1]) {
					list.push(key + "=" + params[i][1]);
				}
			}
			return list.join("&");
		}
		/**
		 * 
		 */
		public login(callBack: (info: LoginInfo) => void, thisObj: Object) {
			if (egret.getOption("unionid")) {
				LocalDatas.datas.datas.loginInfo = {
					unionid: egret.getOption("unionid"),
					openid: egret.getOption("openid"),
				}
				LocalDatas.datas.saveData();
				var game_url = location.href.split("?")[0];
				let paramStr = this.getOption();
				if (paramStr) {
					game_url += ("?" + paramStr);
				}
				location.href = game_url;
			} else if (LocalDatas.datas.datas.loginInfo) {
				let data = {
					loginKey: LocalDatas.datas.datas.loginInfo.unionid,
				};
				LocalDatas.delTempLoginInfo();
				callBack.call(thisObj, data);
			}
			else if (LocalDatas.datas.datas.pwd && LocalDatas.datas.datas.userName) {
				callBack.call(thisObj, {
					loginKey: LocalDatas.datas.datas.userName,
				});
			}
			else {
				var redirectUri = this.redirectUri;
				var game_url = location.href.split("?")[0];
				let paramStr = this.getOption();
				if (paramStr) {
					redirectUri += ("&" + paramStr);
				}
				let href = this.wechatUrl.format(this.appid, encodeURIComponent(redirectUri.format(this.appid, encodeURIComponent(game_url))));
				location.href = href;
			}
		}
		public initGameFinish() {
			//Main.instance.initFinish();
			// alert("ddd");
			if (document.getElementsByClassName("egret-img")) {
				var img = document.getElementsByClassName("egret-img")[0];
				if (img) {
					img.parentNode.removeChild(img);
				}

			}

		}
		public getChannel() {
			let message = egret.getOption("chl");
			if (message) {
				Config.channel = message;
			} else {

			}
		}
	}
}