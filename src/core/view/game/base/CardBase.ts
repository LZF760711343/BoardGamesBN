abstract class CardBase extends eui.Component {
    public icon: eui.Image;
    public icon_key: eui.Image;
    public icon_color: eui.Image;

    public select: boolean;
    public shader: eui.Rect;
    public key: number;
    public color: number;
    //    public cardData: PokerCard;
    public isDisable: boolean;
    public bg: eui.Image;
    public cardValue: number;
    //    private _flushIcon:eui.Image;
    constructor() {
        super();
        this.select = false;
        // this.skinName = CardSkin;
        //        this.cardData = null;
    }
    public setGray() {
        this.currentState = "bigGray";
        this.bg.source = "card_bg_gray_png";
    }

    public setSmallBack(): void {
        this.currentState = "back";
        this.bg.source = "card_bg_png";
    }
    public setBack(): void {
        this.currentState = "big_back";
        this.bg.source = "card_bg_png";
    }
    //    publish 
    protected createChildren(): void {
        super.createChildren();
        this.touchChildren = false;
    }
    // -- 根据类型返回牌数和花色
    public getNumSuit(cardValue: number) {
        this.color = (cardValue >> 4) & 0x7;
        this.key = cardValue & 0xF;
    }
    public setSmallUnviSign(): void {
        var icon = new eui.Image(RES.getRes('univ_sign_png'));
        icon.scaleX = 0.8;
        icon.scaleY = 0.8;
        icon.left = 1;
        icon.bottom = 5;
        this.addChild(icon);
    }

    public setSmallMainSign(): void {
        var icon = new eui.Image(RES.getRes('main_sign_png'));
        icon.left = 5;
        icon.bottom = 10;
        this.addChild(icon);
    }
    public changeIntoGold() {
        if (this.bg.source != "big_bg_vip_png")
            this.bg.source = "big_bg_vip_png";
    }
    public set cardIcon(cardValue: number) {
        this.setSmallIcon(cardValue);
    }
    public get cardIcon() {
        return this.cardValue;
    }
    abstract setIcon(cardValue: number, value2?: number): void;
    abstract setSmallIcon(cardValue: number, value2?: number): void;

    public mark(): void {
        this.shader.visible = !this.shader.visible;
    }
    public setMark(value: boolean): void {
        this.shader.visible = value;
    }
    protected reset() {
        this.scaleX = this.scaleY = 1;
        this.width = this.height = NaN;
        if (this.shader.visible) {
            this.shader.visible = false;
        }
        if (this.select) {
            this.select = false;
            // this.setSelect();
        }
        this.x = this.y = 0;
    }
    public isMark(): boolean {
        return this.shader.visible;
    }
    public resetMark(): void {
        this.shader.visible = false;
    }
    public setSelect() {
        this.select = !this.select;
        if (this.select) {
            this.y -= 30;
        } else {
            this.y += 30;
        }
    }
    public getSelect(): boolean {
        return this.select;
    }
    public destroy() {

    }
}
