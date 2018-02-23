namespace Utils {
	/**
	 *
	 * @author 
	 *
	 */
	var imgCache:eui.Image[] = [];
	export class BitmapLabel extends eui.Component{
    	private _key:string;
    	private _text:string = "";
    	private _imgList:eui.Image[];
    	private _x:number;
    	private _letterSpacing:number;
		public constructor(_key:string = "") {
    		super();
    		this._key = _key;
    	    this._imgList = [];
            this._letterSpacing = 0;
            
		}
        public set text(value:number){
            var key = this._key;
            var _text = Math.round(value) + "";
            var length = _text.length;
            if(this._text.length < length) {
                this.createImage(length - this._text.length);
            } else if(this._text.length > length) {
                this.removeImage(this._text.length - length);
            }
            this._text = _text;
            this._x = 0;
            for(var i = 0;i < length;i++) {
                var img = <eui.Image>this.getChildAt(i);
                img.source = RES.getRes(this._key + _text[i] + "_png");
                img.x = this._x;
                this._x += (img.width + this._letterSpacing);
            }
		}
		public get text(){
		    return 0;
		}
		protected createChildren(): void {
		    super.createChildren();

		}
		public setLetterSpacing(value:number){
		    this._letterSpacing = value;
		}
		public setKey(value:string):void{
            this._key = value;
		}
		public set key(value:string){
		    this._key = value;
		    if(this._text.length){
		        this.setText(this._text);
		    }
		}
		public get key(){
		    return this._key;
		}
        public setText(_text:string, _key?:string){
            var key = _key || this._key;
            var length = _text.length;
            if(this._text.length < length){
                this.createImage(length - this._text.length);
            } else if(this._text.length > length){
                this.removeImage(this._text.length - length);
            }
            this._text = _text;
            
            this._x = 0;
            for(var i = 0; i <length; i++) {
                var img = <eui.Image>this.getChildAt(i);
//                var texture = <egret.Texture>RES.getRes(this._key + _text[i]);
                img.source = RES.getRes(key + _text[i] + "_png");
                img.x = this._x;
                this._x += (img.width + this._letterSpacing);
            }
		}
		public createImage(count:number):void{
            for(var i = count - 1; i >= 0; --i){
                var img = imgCache.pop();
                if(!img) {
                    img = new eui.Image();
//                    img.v  = 0;
                }
                this.addChild(img);
            }
		}
        public removeImage(count: number): void {
            for(var i = count - 1;i >= 0;--i) {
                imgCache.push(<eui.Image>this.removeChildAt(this.numChildren - 1));
            }
        }
	}
}
