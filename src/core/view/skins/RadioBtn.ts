module UI {
	export class RadioBtn extends eui.RadioButton {
		public bgStr: string = '';
		public bgGrayStr: string = '';
		public upStr: string = "";
		public downStr: string = "";
		public disabledStr: string = "";
		public constructor() {
			super();
		}
		protected buttonReleased():void {
            super.buttonReleased();
			SoundManage.playEffect('btnClick');
        }
	}
}