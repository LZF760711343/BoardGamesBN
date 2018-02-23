
/**
 * @author HE
 * WebView接口
 * @version mumu 1.0.0
 * @platform Web,Native
 */
namespace Utils {
    export interface IWebView{
        /**
         * 显示webView
         */
        show(src:string,x:number,y:number,width:number,height:number):void;

        /**
         * 销毁webView
         */
        destroy(): void;
        /**
         * 隐藏webView
         */
        hide():void;
        x:number;
        y:number;
        width:number;
        height:number;
        
        /**
         * 设置webView的地址
         */
        src:string;
    }
    export interface WebView extends IWebView {

    }
    /**
     * @author HE
     * WebView的类
     * @version mumu 1.0.0
     * @platform Web,Native
     */
    export let WebView:{
        /**
         * Constructor initialization
         * @language en_US
         */
        /**
         * 初始化构造函数
         * @language zh_CN
         */
        new():WebView
    };
}
