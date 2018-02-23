namespace Utils {
/**
 *
 * @author HE
 * @version mumu 1.0.0
 * @platform Native
 * WebView
 */
	export class NativeWebView implements IWebView {

		private _x: number = 0;
		private _y: number = 0;
		private _width: number = 0;
		private _height: number = 0;
		private _src: string = "";
		private _sx:number;
		private _sy:number;
		private _sendDatas:{url?:string,x?:number,y?:number, w?:number, h?:number};

        /**
         * @param src
         */
		public constructor() {
		}

		public onRemoveToStage() {
			this.width = this._width;
			this.height = this._height;
			this.x = this._x;
			this.y = this._y;
		}

		public show(src:string,x:number,y:number,width:number,height:number): void {
            this._sendDatas.x = x * this._sx;
            this._sendDatas.y = y * this._sy;
            this._sendDatas.w = width * this._sx;
            this._sendDatas.h = height * this._sy;
			this._sendDatas.url = src;
			NativeBridge.openWebView(JSON.stringify(this._sendDatas));
        }
		public hide(){
			NativeBridge.closeWebView();
		}
		public destroy(): void {
			NativeBridge.closeWebView();
		}

		public get width(): number {
			return this._width;
		}

		public set width(value: number) {
			this._width = value;
		}

		public get height(): number {
			return this._height;
		}

		public set height(value: number) {
			this._height = value;
		}

		public set x(value: number) {
			this._x = value;
		}

		public set y(value: number) {
			this._y = value;
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
		}
	}
	if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
		WebView = NativeWebView;
	}
}
