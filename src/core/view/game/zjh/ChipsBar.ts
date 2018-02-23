module zjh {
	export class ChipsBar extends eui.Component{
		private _betChipsLab:eui.Label;
		public constructor() {
			super();
		}
		public setBetChips(value:number){
			this._betChipsLab.text = value+"";
		}
	}
}