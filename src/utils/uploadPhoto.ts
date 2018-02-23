namespace Uplad {
    export function LPAS(callBack:Function, thisObj:Object) {
        let iframe = document.createElement("iframe");
        iframe.style.cssText = "position: absolute;left: 0;top: 0;z-index: 1000;width:100%;height:100%";
        iframe.className = "iframeUpload";
        iframe.src = "../share/paramIsIcon.html";
        iframe.frameBorder = "no";
        document.getElementsByTagName("body")[0].appendChild(iframe);
        window["deIframe"] = function () {
            document.getElementsByTagName("body")[0].removeChild(iframe);
            window["deIframe"] = null;
        }
        window["uploadPhoto"] = function (dataURL) {
            let res: any = new XMLHttpRequest();
            res.onerror = function () { };
            let dataUrl = dataURL.split(',')[1];
            dataUrl = window.atob(dataUrl);
            var ia = new Uint8Array(dataUrl.length);
            for (var i = 0; i < dataUrl.length; i++) {
                ia[i] = dataUrl.charCodeAt(i);
            };

            res.open("POST", "http://www.hongzhegame.com/QiDong/headImg/HeadImg_Upload.php?username=" + Global.playerDto.id + "&filesize=" + ia.length+"&serverid"+Config.SERVER_ID, true);
            res.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            res.onreadystatechange = function (e, data) {
                if (res.readyState == 4 && res.status == 200) {
                    let resArray = JSON.parse(res.responseText ); 
                    if(resArray.code === 0){
                        callBack.call(thisObj, resArray.data);
                    }
                    // console.log("resArray::::" + resArray.data + "   " + resArray.code + resArray.msg);
                    // imgData=resArray.data;
                    // net.SendMsg.create({headImages:resArray.data}, ModuleInfo.PLAY_GAME, PlayGameOrder.C2G_UPDATE_HEAD_IMAGES).send();
                    // Global.playerDto.headImages=resArray.data;
                }
            };
            res.send(ia);        
        }

    }

}
