namespace nest {
	/**
	 * 分享类型
	 */
	export const SHARE_TYPE = {
		/**
		 * 发送给朋友
		 */
		APPMESSAGE: "sendAppMessage",
		/**
		 * 分享到朋友圈
		 */
		TIMELINE: "shareTimeline",
		/**
		 * 分享到QQ
		 */
		QQ: "shareQQ",
		/**
		 * 分享到Weibo
		 */
		WEIBOAPP: "shareWeiboApp",
		/**
		 * 收藏
		 */
		// FAVORITE: "menuItem:favorite",
		/**
		 * 分享到FB
		 */
		FACEBOOK: "shareFacebook",
		/**
		 * 分享到 QQ 空间
		 */
		QZONE: "shareQZone"
	}
	/**
	 * 用于与其他第三方平台进行交互的类的接口
	 */
	export interface IPlatform {
		/**
		 * 登陆
		 */
		login(callBack: (info: LoginInfo) => void, thisObj: Object);
		/**
		 * 是否自动登陆
		 */
		isAutoLogin();
		init();
		/**
		 * 购买商品
		 */
		pay(pid: string, unionid: string, openid: string, body: string);
		/**
		 * 获取分享链接传进来的roomId
		 */
		getRoomId();
		/**
		 * 获取当前的渠道号
		 */
		getChannel();
		/**
		 * 分享回调
		 */
		addShareCb(cb: Function);
		/**
		 * 分享
		*/
		share(shareInfo: any);
		/**
		 * 上传用户头像
		 */
		uploadHeadImg(callBack: Function, thisObj: Object);
		/**
		 * 游戏初始化完成
		 */
		initGameFinish();
		// /**
		//  * 关闭游戏
		//  * @platform Native
		//  */
		// endGame();
		// /**
		//  * 获取电池的电量
		//  *  @platform Native
		//  */
		// getBatteryQuantity();
		// /**
		//  * 开始录音
		//  */
		// startRecord();
		// /**
		//  * 结束录音
		//  */
		// stopRecord();
		// /**
		//  * 播放录音
		//  */
		// playRecord();
		// /**
		//  * 停止播放录音
		//  */
		// stopPlayRecord();
		getVersion();

	}
	interface ShareResult {
        /**
         * 分享结果:0为成功,-1为取消分享
         */
		code: number;
        /**
         * 分享的类型
         */
		type: string;
	}
	export interface LoginInfo {
		/**
		 * 用户头像
		 */
		// headimgurl?: string;
		/**
		 * 登陆凭据
		 */
		loginKey: string;
		/**
		 * 昵称
		 */
		// nickName: string;
		/**
		 * 性别
		 */
		// sex: number;
	}
	export type ShareCallBackFunc = (result: ShareResult) => void;
	export let loginInfo: LoginInfo;
	// headimgurl: info.headimgurl.replace("/0", "/96"),
	// 			loginKey: info.unionid,
	// 			nickName: info.nickname,
	// 			sex: info.sex
	export interface Platform extends IPlatform {

	}
	export function addShareCb(cb: ShareCallBackFunc) {
		_instance.addShareCb(cb);
	}
	export function share(shareInfo: any) {
		_instance.share(shareInfo);
	}

	let _instance: Platform;
	export function login(callBack: (info: LoginInfo) => void, thisObj: Object) {
		return _instance.login(callBack, thisObj);
		// return _instance.login((info: LoginInfo) => {
		// 	loginInfo = info;
		// 	callBack.call(thisObj, info);
		// }, null);
	}
	export function pay(pid: string, unionid: string, openid: string, body: string) {
		return _instance.pay(pid, unionid, openid, body);
	}
	export function uploadHeadImg(callBack: Function, thisObj: Object) {
		return _instance.uploadHeadImg(callBack, thisObj);
	}
	export function initGameFinish() {
		return _instance.initGameFinish();
	}
	export function getRoomId() {
		return _instance.getRoomId();
	}

	export function isAutoLogin() {
		return _instance.isAutoLogin();
	}
	export function init() {
		_instance = new Platform();
		if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {

			// if (egret.getOption("unionid")) {
			// 	Global.playerDto.account = egret.getOption("unionid");
			// }
		}
		_instance.getRoomId();
		_instance.getChannel();
		_instance.getVersion();
		Global.upplayerid = parseInt(egret.getOption("upplayerid"));
	}
	/**
     * @author HE
     * Platform
     * @version gzqd 1.0.0
     * @platform Web,Native
     */
	export let Platform: {
        /**
         * Constructor initialization
         * @language en_US
         */
        /**
         * 初始化构造函数
         * @language zh_CN
         */
		new (): Platform
	};

}