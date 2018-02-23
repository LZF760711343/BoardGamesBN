/**
 *
 * @author 
 *
 */
namespace UI {
    export class ToggleButton extends eui.ToggleButton {
        private _colorFlilter: egret.ColorMatrixFilter;
        public constructor() {
            super();
            // this.touchChildren = false;
            // this.currentState
        }
        public get enabled(): boolean {
            return this.$Component[eui.sys.ComponentKeys.enabled];
        }
        protected buttonReleased(): void {
            super.buttonReleased();
            SoundManage.playEffect('btnClick');
        }
        public set enabled(value: boolean) {
            value = !!value;
            this.$setEnabled(value);
            if (value) {
                if (this.filters) {
                    this.filters = null;
                }
            } else {
                if (!this.filters) {
                    if (!this._colorFlilter) {
                        this._colorFlilter = new egret.ColorMatrixFilter(Filters.colorMatrix);
                    }
                    this.filters = [this._colorFlilter];
                }
            }
        }
    }
}