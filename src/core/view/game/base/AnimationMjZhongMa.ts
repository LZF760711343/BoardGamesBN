namespace Game {
    export class AnimationMjZhongMa extends AnimationBase {
        private image2: eui.Image;
        private image6: eui.Image;
        private image10: eui.Image;
        private image14: eui.Image;
        private image18: eui.Image;
        private image26: eui.Image;

        private maCarsImg: eui.Image[];

        private image19: eui.Image;
        private image20: eui.Image;
        private image21: eui.Image;
        private image22: eui.Image;
        private image27: eui.Image;
        private image28: eui.Image;

        private zhongMaCardsImg: eui.Image[];

        public constructor() {
            super();
            this.skinName = zhongmapai;
            this.horizontalCenter = this.verticalCenter = 0;

            this.maCarsImg = [this.image2, this.image6, this.image10, this.image14, this.image18, this.image26];
            this.zhongMaCardsImg = [this.image19, this.image20, this.image21, this.image22, this.image27, this.image28];
        }
        public setImgSource(maCard: number[], zhongMaCard: number[]) {
            let len = maCard.length;

            if (len == 2) {
                this.currentState = "s2";
                this.image10.source = `mj_bottomD${maCard[0]}_png`;
                this.image14.source = `mj_bottomD${maCard[1]}_png`;
                if (zhongMaCard.indexOf(maCard[0]) != -1) {
                    this.image21.visible = true;
                    this.image10.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[1]) != -1) {
                    this.image22.visible = true;
                    this.image14.alpha = 1;
                }
            } else if (len == 4) {
                this.currentState = "s4";
                this.image6.source = `mj_bottomD${maCard[0]}_png`;
                this.image10.source = `mj_bottomD${maCard[1]}_png`;
                this.image14.source = `mj_bottomD${maCard[2]}_png`;
                this.image18.source = `mj_bottomD${maCard[3]}_png`;

                if (zhongMaCard.indexOf(maCard[0]) != -1) {
                    this.image20.visible = true;
                    this.image6.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[1]) != -1) {
                    this.image21.visible = true;
                    this.image10.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[2]) != -1) {
                    this.image22.visible = true;
                    this.image14.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[3]) != -1) {
                    this.image27.visible = true;
                    this.image18.alpha = 1;
                }
            } else if (len == 6) {
                this.currentState = "s6";
                this.image2.source = `mj_bottomD${maCard[0]}_png`;
                this.image6.source = `mj_bottomD${maCard[1]}_png`;
                this.image10.source = `mj_bottomD${maCard[2]}_png`;
                this.image14.source = `mj_bottomD${maCard[3]}_png`;
                this.image18.source = `mj_bottomD${maCard[4]}_png`;
                this.image26.source = `mj_bottomD${maCard[5]}_png`;

                if (zhongMaCard.indexOf(maCard[0]) != -1) {
                    this.image19.visible = true;
                    this.image2.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[1]) != -1) {
                    this.image20.visible = true;
                    this.image6.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[2]) != -1) {
                    this.image21.visible = true;
                    this.image10.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[3]) != -1) {
                    this.image22.visible = true;
                    this.image14.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[4]) != -1) {
                    this.image27.visible = true;
                    this.image18.alpha = 1;
                }
                if (zhongMaCard.indexOf(maCard[5]) != -1) {
                    this.image28.visible = true;
                    this.image26.alpha = 1;
                }
            }
        }
    }
}