namespace niuniu {
	/**
	 *
	 * @author 
	 *
	 */
	export class CalBox extends eui.Component{
        private _lab1:eui.Label;
        private _lab2: eui.Label;
        private _lab3: eui.Label;
        private _labResult: eui.Label;
        private _labs:eui.Label[];
        public cardValues:number[];
        public youNiu:boolean;
//        public btnAuto:components.CommonBtn;
		public constructor() {
    		super();
		}
		protected childrenCreated(): void {
		    super.childrenCreated();
            this._labs = [this._lab1,this._lab2,this._lab3];
            this.youNiu = false;
            this.cardValues = [];
		}
		public show():void{
            this._lab1.text = 
            this._lab2.text = 
            this._lab3.text = 
		    this._labResult.text = "";
		    this.visible = true;
		}
		public hide(){
		    this.visible = false;
		}
		public setDatas(cards:Card[]){
            this.cardValues.length = 0;
            var result = 0;
		    for(var i = 0; i <3; i++) {
                if(cards[i]){
                    var value = cards[i].key;
                    value = value > 10 ? 10 :value;
                    result += value;
                    this._labs[i].text = "" + value;
                    this.cardValues[i] = cards[i].cardValue;
    		    }else{
                    this._labs[i].text = "";
    		    }
		    }
            if(result){
                this._labResult.text = "" + result;
                this.youNiu = result % 10 == 0 && this.cardValues.length == 3;
		    }else{
		        this._labResult.text = "";
		    }
		}
	}
}
