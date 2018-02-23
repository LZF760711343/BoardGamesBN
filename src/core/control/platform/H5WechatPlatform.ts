namespace nest {

	/**
	 * 微信网页
	 */
	export class H5WechatPlatform extends H5WebBase {
		private payUrl: string;
		public constructor() {
			super();
			this.payUrl = Config.MAG_SERVER + "/QiDong/WX_pay/pay/codepay.php/?pid=$1&playerid=$2&body=$3&serverid=$4";
			this.appid = Config.WX_WEB_APPID;
			this.redirectUri = Config.MAG_SERVER + "/QiDong/wx_login/WX_saoLogin.php?appid=$1&url=$2";
			this.wechatUrl = "https://open.weixin.qq.com/connect/qrconnect?appid=$1&redirect_uri=$2&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
		}


		public init() {

		}
		public async pay(pid: string, unionid: string, openid: string, body: string) {
			let url = await Global.requestDataAsync(this.payUrl.format(pid, Global.playerDto.id, body, Config.SERVER_ID), null);
			let payCode = new PayCode();
			payCode.init(url);
			Main.instance.addChild(payCode);
		}

	}
	if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB && Gzqd && !Gzqd.isWeiXin()) {
		Platform = H5WechatPlatform;
	}
}