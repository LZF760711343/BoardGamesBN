declare let xmlhttp
declare let mobShare;
declare let wx;
namespace Gzqd {
	let shareInfo;
	/**
	 * 微信公众号分享是否已经初始化过了
	 */
	let isWxInit: boolean;
	/**
     * 获得web配置参数请求url
     */
	let xhrPosturl: string = "http://www.hongzhegame.com/QiDong/wx_login/WX_mark.php";
	/**
     * 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     */
	let debug: boolean = false;
	/**
     * web端分享appKey
     */
	let appkey: string = '1eb3f69b89a44';
	/**
	 * 分享成功后的回调
	 */
	let shareCb: Function;
	// 初始化
	export function init(appid?: string) {
		xhrPosturl = appid ? "http://www.hongzhegame.com/QiDong/wx_login/WX_mark.php?appid=" + appid : xhrPosturl;
		egret.log("xhrPosturl：：：" + xhrPosturl);
	}
	/**
     * array {
	 * share_title:string, 分享标题
	 * share_desc:string,  分享内容
	 * share_url:string,   分享链接
	 * share_img:string，  分享图片，使用逗号,隔开
	 * }
     */
	export function setShare(array: { share_title: string, share_desc: string, share_url: string, share_img: string }) {
		shareInfo = array;
		if (Gzqd.isWeiXin()) {
			if (isWxInit) {
				share_wx();
			} else {
				uploadweiXin();
			}
		} else {
			webShare();
		}
	}
	// 判断是什么端
	export function isWeiXin() {
		return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != null;
	}
	// web端分享
	export function webShare() {
		console.log("turn into webShare");
		mobShare.config({
			debug: debug, // 开启调试，将在浏览器的控制台输出调试信息
			appkey: appkey, // appkey
			params: {
				url: shareInfo.share_url, // 分享链接
				title: shareInfo.share_title, // 分享标题
				description: shareInfo.share_desc, // 分享内容
				pic: shareInfo.share_img, // 分享图片，使用逗号,隔开
			},

			/**
			 * 分享时触发的回调函数
			 * 分享是否成功，目前第三方平台并没有相关接口，因此无法知道分享结果
			 * 所以此函数只会提供分享时的相关信息
			 * 
			 * @param {String} plat 平台名称
			 * @param {Object} params 实际分享的参数 { url: 链接, title: 标题, description: 内容, pic: 图片连接 }
			 */
			callback: function (plat, params) {
				if (shareCb) {
					shareCb("0");
				}
			}
		});

	}
	export function uploadweiXin() {
		Gzqd.loadJs("http://res.wx.qq.com/open/js/jweixin-1.2.0.js", "jweixin", () => {
			Gzqd.xhrPost(xhrPosturl);
		});

	}
	export function addShareCb(callBack: Function) {
		shareCb = callBack;
		if (shareInfo) {
			setShare(shareInfo);
		}
	}
	export function showShare() {
		if (isWeiXin()) {
			weiXinShare();
		} else {
			mobShare && mobShare.ui.open();
		}
	}
	// 微信端分享
	export function weiXinShare() {



		let oDiv = document.createElement('div');
		oDiv.style.cssText = "background:rgba(0,0,0,0.4); position:fixed;top:0px; left:0px; width:100%;height:"
			+ document.documentElement.clientHeight + "px; z-index:10000;";
		oDiv.id = "share-wx";
		oDiv.className = "ewm_fenxiang";
		oDiv.onclick = function () {
			oDiv.innerHTML = "";
			document.getElementsByTagName("body")[0].removeChild(oDiv);
		};
		oDiv.innerHTML = "<img src='http://www.hongzhegame.com/qdsdk/imgs/jiantou_icon.png' style='position:fixed;left:5px;top:5px;width:78px;height:78px;' />";
		document.body.appendChild(oDiv);
		let wxqrP1 = document.createElement("div");
		wxqrP1.className = "fenxiang1";
		wxqrP1.innerHTML = "点击左上角，约战好友！";
		if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
			wxqrP1.style.cssText = "position:fixed;font-size:40px ;color:#ffffff ;transform: rotate(90deg);top:50%;left:50%;letter-spacing:3px;width:478px;margin-left: -239px; margin-top: 0px;";
			oDiv.innerHTML = "<img src='http://www.hongzhegame.com/qdsdk/imgs/jiantou_icon.png' style='position:fixed;right:5px;top:5px;width:78px;height:78px;-webkit-transform: rotate(90deg)' />";

		}
		else {
			wxqrP1.style.cssText = "position:fixed;font-size:40px ;color:#ffffff ;transform: translate(-50%, -50%);top:50%;left:50%;letter-spacing:3px;width:478px";
		}
		oDiv.appendChild(wxqrP1);
	}
	// 自定义微信分享内容及分享结果接口
	export function share_wx() {
		let b = shareCb || function () { };
		let temp = {
			title: shareInfo.share_title,
			desc: shareInfo.share_desc,
			link: shareInfo.share_url,
			imgUrl: shareInfo.share_img,
			success: () => {
				b("0");
			},
			cancel: () => {
				b("-1");
			}
		}
		wx.onMenuShareAppMessage({ title: shareInfo.share_title, desc: shareInfo.share_desc, link: shareInfo.share_url, imgUrl: shareInfo.share_img, success: b, cancel: b });
		wx.onMenuShareTimeline({ title: shareInfo.share_title, desc: shareInfo.share_desc, link: shareInfo.share_url, imgUrl: shareInfo.share_img, success: b, cancel: b });
		wx.onMenuShareQQ({ title: shareInfo.share_title, desc: shareInfo.share_desc, link: shareInfo.share_url, imgUrl: shareInfo.share_img, success: b, cancel: b });
		wx.onMenuShareQZone({ title: shareInfo.share_title, desc: shareInfo.share_desc, link: shareInfo.share_url, imgUrl: shareInfo.share_img, success: b, cancel: b });
		wx.onMenuShareWeibo({ title: shareInfo.share_title, desc: shareInfo.share_desc, link: shareInfo.share_url, imgUrl: shareInfo.share_img, success: b, cancel: b })
	}
	export function getCurFolder() {
		if (window && window.location) {
			var url = window.location.href.split("?")[0];
			var temp = url.split("/");
			temp[temp.length - 1] = null;
			return temp.join('/');
		} else {
			return null;
		}

	};
	/**
	 * 微信分享接口注入权限验证配置
     * resArray {  
	 * appId:string,  必填，公众号的唯一标识
	 * timestamp:string,   必填，生成签名的时间戳
	 * nonceStr:string， 必填，生成签名的随机串
	 * signature:string， 必填，签名
	 * }
     */
	export function init_wx(resArray: { appid: string; timestamp: string; nonceStr: string; signature: string }) {
		// console.log(resArray);
		isWxInit = true;
		wx.config({
			debug: debug,
			appId: resArray.appid,
			timestamp: resArray.timestamp,
			nonceStr: resArray.nonceStr,
			signature: resArray.signature,
			jsApiList: "checkJsApi onMenuShareQZone onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo getNetworkType".split(" ")
		});
		wx.ready(function () {
			Gzqd.share_wx();
		});
		wx.error(function () {

		})
	}
	// 微信分享接口注入权限验证配置参数请求
	export function xhrPost(url: string) {
		let res: any = new XMLHttpRequest();
		res.onerror = function () { };
		res.open("POST", url, true);
		res.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		res.send();
		res.onreadystatechange = function (e, data) {
			if (res.readyState == 4 && res.status == 200) {
				let resArray = JSON.parse(res.responseText);
				console.log("resArray::::" + res.responseText);
				// egret.log("eeeeee::" + e, res.responseText);
				// console.log("11111" + res.responseText, e);
				Gzqd.init_wx(resArray)
			}
		};
	}
	export function loadJs(url: string, urlId: string, fun: Function) {
		if (document.getElementById("jweixin") == null) {
			let e: any = document.createElement("script");
			e.id = urlId;
			e.src = url;
			document.getElementsByTagName("body")[0].appendChild(e);
			e.onload = e.onreadystatechange = function (a, b) {
				e = e.onload = e.onreadystatechange = null;
				b || fun(200, "success")
			}
		} else {
			fun(200, "success")
		}

	};


}