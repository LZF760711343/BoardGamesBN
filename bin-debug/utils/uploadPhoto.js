var Uplad;
(function (Uplad) {
    function LPAS(callBack, thisObj) {
        var iframe = document.createElement("iframe");
        iframe.style.cssText = "position: absolute;left: 0;top: 0;z-index: 1000;width:100%;height:100%";
        iframe.className = "iframeUpload";
        iframe.src = "../share/paramIsIcon.html";
        iframe.frameBorder = "no";
        document.getElementsByTagName("body")[0].appendChild(iframe);
        window["deIframe"] = function () {
            document.getElementsByTagName("body")[0].removeChild(iframe);
            window["deIframe"] = null;
        };
        window["uploadPhoto"] = function (dataURL) {
            var res = new XMLHttpRequest();
            res.onerror = function () { };
            var dataUrl = dataURL.split(',')[1];
            dataUrl = window.atob(dataUrl);
            var ia = new Uint8Array(dataUrl.length);
            for (var i = 0; i < dataUrl.length; i++) {
                ia[i] = dataUrl.charCodeAt(i);
            }
            ;
            res.open("POST", "http://www.hongzhegame.com/QiDong/headImg/HeadImg_Upload.php?username=" + Global.playerDto.id + "&filesize=" + ia.length + "&serverid" + Config.SERVER_ID, true);
            res.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            res.onreadystatechange = function (e, data) {
                if (res.readyState == 4 && res.status == 200) {
                    var resArray = JSON.parse(res.responseText);
                    if (resArray.code === 0) {
                        callBack.call(thisObj, resArray.data);
                    }
                }
            };
            res.send(ia);
        };
    }
    Uplad.LPAS = LPAS;
})(Uplad || (Uplad = {}));
//# sourceMappingURL=uploadPhoto.js.map