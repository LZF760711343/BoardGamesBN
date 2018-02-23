namespace Game {
    export class Animation extends AnimationBase {
        private _image8: eui.Image;
        public constructor() {
            super();
        }
        public setImgSource(imgName: string) {
            this._image8.source = imgName;
        }
    }
}