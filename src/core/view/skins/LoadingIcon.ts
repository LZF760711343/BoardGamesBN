namespace components {
	/**
	 *
	 * @author 
	 *
	 */
    export class LoadingIcon extends eui.Component {
        private loadImage: eui.Image;
        private is_run: boolean;
		public constructor(){
		    super();
            this.is_run = false;
            var loadImage = this.loadImage = new eui.Image("loading2_png");
//            loadImage.percentWidth = loadImage.percentHeight = 100;
            this.addChild(loadImage);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        } 
        // public setSource(value: string) {
        //     this.run();
        //     RES.getResByUrl(value,this.loadComplete,this,RES.ResourceItem.TYPE_IMAGE)
        // }
        public loadComplete(data:egret.Texture): void {
            this.is_run = false;
            if(typeof data == "undefined") {
                //this.loadImage.source = "head_default1_png";
            } else {
                this.loadImage.source = data;
                this.width = data.textureWidth;
                this.height = data.textureHeight;
            }
            egret.Tween.removeTweens(this.loadImage);
            this.loadImage.rotation = 0;
        }
        public onExit(){
            egret.Tween.removeTweens(this.loadImage);
            this.is_run = null;
        }
        public run(): void {
            if(this.is_run) {
                return;
            }
            this.loadImage.rotation = 0;
            this.is_run = true;
            egret.Tween.get(this.loadImage,{ loop: true }).to({ rotation: 360 },2000);

        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.loadImage.x = this.loadImage.y = this.loadImage.anchorOffsetX = this.loadImage.anchorOffsetY = 75;
            
//            this.addChild()
        }
        public stop(): void {
            this.is_run = false;
            egret.Tween.removeTweens(this.loadImage);
        }
	}
}
