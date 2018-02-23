var Gzqd;
(function (Gzqd) {
    var shareInfo;
    /**
     * 微信公众号分享是否已经初始化过了
     */
    var isWxInit;
    /**
     * 获得web配置参数请求url
     */
    var xhrPosturl = "http://www.hongzhegame.com/QiDong/wx_login/WX_mark.php";
    /**
     * 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     */
    var debug = false;
    /**
     * web端分享appKey
     */
    var appkey = '1eb3f69b89a44';
    /**
     * 分享成功后的回调
     */
    var shareCb;
    // 初始化
    function init(appid) {
        xhrPosturl = appid ? "http://www.hongzhegame.com/QiDong/wx_login/WX_mark.php?appid=" + appid : xhrPosturl;
        egret.log("xhrPosturl：：：" + xhrPosturl);
    }
    Gzqd.init = init;
    /**
     * array {
     * share_title:string, 分享标题
     * share_desc:string,  分享内容
     * share_url:string,   分享链接
     * share_img:string，  分享图片，使用逗号,隔开
     * }
     */
    function setShare(array) {
        shareInfo = array;
        if (Gzqd.isWeiXin()) {
            if (isWxInit) {
                share_wx();
            }
            else {
                uploadweiXin();
            }
        }
        else {
            webShare();
        }
    }
    Gzqd.setShare = setShare;
    // 判断是什么端
    function isWeiXin() {
        return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != null;
    }
    Gzqd.isWeiXin = isWeiXin;
    // web端分享
    function webShare() {
        console.log("turn into webShare");
        mobShare.config({
            debug: debug,
            appkey: appkey,
            params: {
                url: shareInfo.share_url,
                title: shareInfo.share_title,
                description: shareInfo.share_desc,
                pic: shareInfo.share_img,
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
    Gzqd.webShare = webShare;
    function uploadweiXin() {
        Gzqd.loadJs("http://res.wx.qq.com/open/js/jweixin-1.2.0.js", "jweixin", function () {
            Gzqd.xhrPost(xhrPosturl);
        });
    }
    Gzqd.uploadweiXin = uploadweiXin;
    function addShareCb(callBack) {
        shareCb = callBack;
        if (shareInfo) {
            setShare(shareInfo);
        }
    }
    Gzqd.addShareCb = addShareCb;
    function showShare() {
        if (isWeiXin()) {
            weiXinShare();
        }
        else {
            mobShare && mobShare.ui.open();
        }
    }
    Gzqd.showShare = showShare;
    // 微信端分享
    function weiXinShare() {
        var oDiv = document.createElement('div');
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
        var wxqrP1 = document.createElement("div");
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
    Gzqd.weiXinShare = weiXinShare;
    // 自定义微信分享内容及分享结果接口
    function share_wx() {
        var b = shareCb || function () { };
        var temp = {
            title: shareInfo.share_title,
            desc: shareInfo.share_desc,
            link: shareInfo.share_url,
            imgUrl: shareInfo.share_img,
            success: function () {
                b("0");
            },
            cancel: function () {
                b("-1");
            }
        };
        wx.onMenuShareAppMessage({ title: shareInfo.share_title, desc: shareInfo.share_desc, link: shareInfo.share_url, imgUrl: shareInfo.share_img, success: b, cancel: b });
        wx.onMenuShareTimeline({ title: shareInfo.share_title, desc: shareInfo.share_desc, link: shareInfo.share_url, imgUrl: shareInfo.share_img, success: b, cancel: b });
        wx.onMenuShareQQ({ title: shareInfo.share_title, desc: shareInfo.share_desc, link: shareInfo.share_url, imgUrl: shareInfo.share_img, success: b, cancel: b });
        wx.onMenuShareQZone({ title: shareInfo.share_title, desc: shareInfo.share_desc, link: shareInfo.share_url, imgUrl: shareInfo.share_img, success: b, cancel: b });
        wx.onMenuShareWeibo({ title: shareInfo.share_title, desc: shareInfo.share_desc, link: shareInfo.share_url, imgUrl: shareInfo.share_img, success: b, cancel: b });
    }
    Gzqd.share_wx = share_wx;
    function getCurFolder() {
        if (window && window.location) {
            var url = window.location.href.split("?")[0];
            var temp = url.split("/");
            temp[temp.length - 1] = null;
            return temp.join('/');
        }
        else {
            return null;
        }
    }
    Gzqd.getCurFolder = getCurFolder;
    ;
    /**
     * 微信分享接口注入权限验证配置
     * resArray {
     * appId:string,  必填，公众号的唯一标识
     * timestamp:string,   必填，生成签名的时间戳
     * nonceStr:string， 必填，生成签名的随机串
     * signature:string， 必填，签名
     * }
     */
    function init_wx(resArray) {
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
        });
    }
    Gzqd.init_wx = init_wx;
    // 微信分享接口注入权限验证配置参数请求
    function xhrPost(url) {
        var res = new XMLHttpRequest();
        res.onerror = function () { };
        res.open("POST", url, true);
        res.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        res.send();
        res.onreadystatechange = function (e, data) {
            if (res.readyState == 4 && res.status == 200) {
                var resArray = JSON.parse(res.responseText);
                console.log("resArray::::" + res.responseText);
                // egret.log("eeeeee::" + e, res.responseText);
                // console.log("11111" + res.responseText, e);
                Gzqd.init_wx(resArray);
            }
        };
    }
    Gzqd.xhrPost = xhrPost;
    function loadJs(url, urlId, fun) {
        if (document.getElementById("jweixin") == null) {
            var e_1 = document.createElement("script");
            e_1.id = urlId;
            e_1.src = url;
            document.getElementsByTagName("body")[0].appendChild(e_1);
            e_1.onload = e_1.onreadystatechange = function (a, b) {
                e_1 = e_1.onload = e_1.onreadystatechange = null;
                b || fun(200, "success");
            };
        }
        else {
            fun(200, "success");
        }
    }
    Gzqd.loadJs = loadJs;
    ;
})(Gzqd || (Gzqd = {}));
//# sourceMappingURL=GzqdSdk.js.map