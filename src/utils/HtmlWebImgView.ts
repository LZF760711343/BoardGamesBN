namespace Utils {
    /**
     *
     * @author HE
     * @version mumu 1.0.0
     * @platform Web
     * WebView
     */
    export class HtmlWebImgView{

        private _x: number = 0;
        private _y: number = 0;
        private _width: number = 0;
        private _height: number = 0;
        private _src: string = "";

        private _scaleMode: string = egret.MainContext.instance.stage.scaleMode;
        private _stageW: number;
        private _stageH: number;
        private _windowW: number;
        private _windowH: number;
        private _displayH: number;
        private _displayW: number;
        private _designH: number;
        private _designW: number;

        private _iframeWrapper: HTMLDivElement = null;
        private _iframe: HTMLIFrameElement = null;

        /**
         * @param src
         */
        public constructor() {
        }
        public init() {
            let stageDelegateDom: HTMLElement = document.getElementById("StageDelegateDiv");
            let playerContainer: HTMLElement = stageDelegateDom.parentElement;
            var iframeWrapperDom = document.getElementById("iframe-wrapper");
            if (!iframeWrapperDom) {
                iframeWrapperDom = document.createElement("div");
                iframeWrapperDom.style.display = "none";
                iframeWrapperDom.attributes['style'].value += 'position:absolute;-webkit-overflow-scrolling: touch;';//解决iframe在ios下的显示问题
                iframeWrapperDom.id = "img-wrapper";
                iframeWrapperDom.setAttribute("data-scale-mode", "showAll");
                stageDelegateDom.appendChild(iframeWrapperDom);
            }
            this._iframeWrapper = <HTMLDivElement>iframeWrapperDom;
            this._iframeWrapper.style.display = "none";
            this._iframeWrapper.style.opacity = "0";
            var img = document.createElement("img"), t = new Date().getTime();
            img.id = "webview-img-" + t;
            img.name = "webview-img-" + t;
            img.style.position = "absolute";
            img.style.opacity = "0";
            img.style.display = 'none';
            img.style.width = img.style.height = "100%";
            img.border = "0";
            this._iframeWrapper.appendChild(img);

            this._iframe = <HTMLIFrameElement>document.getElementById("webview-img-" + t);
            var self = this;
            this._iframe.onload = function () {
                self._iframeWrapper.style.opacity = "1";
                self._iframe.style.opacity = "1";
            }

            this._stageW = egret.MainContext.instance.stage.stageWidth;
            this._stageH = egret.MainContext.instance.stage.stageHeight;
            //屏幕高度大于宽带,说明没有转屏
            if (egret.Capabilities.isMobile && window.innerHeight > window.innerWidth) {
                this._windowW = window.innerHeight;
                this._windowH = window.innerWidth;
            } else {
                this._windowW = window.innerWidth;
                this._windowH = window.innerHeight;
            }

            this._designH = parseInt(playerContainer.attributes['data-content-height'].value);
            this._designW = parseInt(playerContainer.attributes['data-content-width'].value);

            var stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, this._windowW, this._windowH, this._designW, this._designH);
            this._displayH = stageSize.displayHeight;
            this._displayW = stageSize.displayWidth;
            Main.instance.addEventListener(egret.Event.RESIZE, this.onRemoveToStage, this);
        }
        public onRemoveToStage() {
            //屏幕高度大于宽带,说明没有转屏
            if (egret.Capabilities.isMobile && window.innerHeight > window.innerWidth) {
                this._windowW = window.innerHeight;
                this._windowH = window.innerWidth;
            } else {
                this._windowW = window.innerWidth;
                this._windowH = window.innerHeight;
            }
            var stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, this._windowW, this._windowH, this._designW, this._designH);
            this._displayH = stageSize.displayHeight;
            this._displayW = stageSize.displayWidth;
            this.width = this._width;
            this.height = this._height;
            this.x = this._x;
            this.y = this._y;
        }

        public show(src: string, x: number, y: number, width: number, height: number): void {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.src = src;
            this._iframe.style.display = 'block';
            this._iframeWrapper.style.display = 'block';
        }
        public hide() {
            if (this._iframe) {
                this._iframeWrapper.style.display = "none";
            }
        }
        public destroy(): void {
            if (this._iframe) {
                this._iframeWrapper.style.display = "none";
                this._iframeWrapper.removeChild(this._iframe);
            }
            Main.instance.removeEventListener(egret.Event.RESIZE,this.onRemoveToStage, this);
        }

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_NARROW || this._scaleMode == egret.StageScaleMode.FIXED_WIDE || this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                // this._iframe.width = this._width / this._stageW * this._windowW + "px";
                this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowW == this._displayW) {
                    // this._iframe.style.width = this._width / this._stageW * this._windowW + "px";
                    this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
                } else {
                    // this._iframe.style.width = this._width / this._stageW * this._displayW + "px";
                    this._iframeWrapper.style.width = this._width / this._stageW * this._displayW + "px";
                }
            }
            egret.log("this._iframe.width:", this._iframeWrapper.style.width, this._scaleMode == egret.StageScaleMode.SHOW_ALL)
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_NARROW || this._scaleMode == egret.StageScaleMode.FIXED_WIDE || this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                // this._iframe.height = this._height / this._stageH * this._windowH + "px";
                this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowH == this._displayH) {
                    // this._iframe.style.height = this._height / this._stageH * this._windowH + "px";
                    this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
                } else {
                    // this._iframe.style.height = this._height / this._stageH * this._displayH + "px";
                    this._iframeWrapper.style.height = this._height / this._stageH * this._displayH + "px";
                }
            }
        }

        public set x(value: number) {
            egret.log("x", value)
            this._x = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_NARROW || this._scaleMode == egret.StageScaleMode.FIXED_WIDE || this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowW == this._displayW) {
                    this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
                } else {
                    this._iframeWrapper.style.left = this._x / this._stageW * this._displayW + "px";
                }
            }
        }

        public set y(value: number) {
            this._y = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_NARROW || this._scaleMode == egret.StageScaleMode.FIXED_WIDE || this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowH == this._displayH) {
                    this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
                } else {
                    this._iframeWrapper.style.top = this._y / this._stageH * this._displayH + "px";
                }
            }
        }

        public get x(): number {
            return this._x;
        }

        public get y(): number {
            return this._y;
        }

        public get src(): string {
            return this._src;
        }

        public set src(value: string) {
            this._iframe.src = this._src = value;
        }
    }
    // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
    //     WebImgView = HtmlWebImgView;
    // }
}
