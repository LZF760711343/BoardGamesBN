namespace nest {

	declare namespace WeixinJSBridge {
		function invoke(key: string, payInfo: any, callBack: Function);
	}
	/**
	 * 微信公众号
	 */
	export class H5WechatOAPlatform extends H5WebBase {

		public constructor() {
			super();
			this.appid = Config.WX_APPID;
			this.redirectUri = Config.MAG_SERVER+"/QiDong/wx_login/index.php?appid=$1&url=$2";
			this.wechatUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=$1&redirect_uri=$2&response_type=code&scope=snsapi_userinfo#wechat_redirect";
		}
		public init() {

		}
		public async pay(pid: string, unionid: string, openid: string, body: string) {
			let url = (Config.URLS.weChatRechargeUrl + `?pid=$1&body=$2&unionid=$3&openid=$4&playerid=$5&serverid=$6`).format(pid, body, unionid, openid, Global.playerDto.id, Config.SERVER_ID);
			try {
				let response = await Global.requestDataAsync(url, {});
				let data = JSON.parse(response);
				let jsApiCall = () => {
					WeixinJSBridge.invoke('getBrandWCPayRequest', data,
						function (res) {
							// if (res.err_msg == 'get_brand_wcpay_request:ok') {
							// 	alert("success!!!");
							// } else {
							// 	alert("fail!!!" + res.err_msg);
							// }
						}
					);
				};
				if (typeof WeixinJSBridge == "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
					} else if (document["attachEvent"]) {
						document["attachEvent"]('WeixinJSBridgeReady', jsApiCall);
						document["attachEvent"]('onWeixinJSBridgeReady', jsApiCall);
					}
				} else {
					jsApiCall();
				}
			} catch (error) {
				egret.log(error);
			}
		}


	}
	if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB && Gzqd && Gzqd.isWeiXin()) {
		Platform = H5WechatOAPlatform;
	}
}