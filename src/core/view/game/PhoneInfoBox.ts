/**
 * 显示手机当前电量、当前时间、当前网络状况的控件
 * */
class PhoneInfoBox extends eui.Component{
	private _netImg:eui.Image;
	private _kWhObj:eui.Rect;
	private _timeLab:eui.Label;
	private _timer:egret.Timer;
	private _date:Date;
	public static _instance:PhoneInfoBox;
	public constructor() {
		super();
		
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		egret.log("PhoneInfoBox")
		this._timer = new egret.Timer(5000);
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
		this._timer.start();
		this.once(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
		this._date = new Date();
		PhoneInfoBox._instance = this;
		this.update();
	}
	public static init(){
		egret.ExternalInterface.addCallback("getBatteryQuantity",PhoneInfoBox.getBatteryQuantityCB);
		egret.ExternalInterface.addCallback("getInternetStatus",PhoneInfoBox.getInternetStatusCB);
	}
	private static getBatteryQuantityCB(message:string){
		if(PhoneInfoBox._instance){
			PhoneInfoBox._instance.setBetteryQuantity(message);
		}
	}
	private static getInternetStatusCB(message:string){
		if(PhoneInfoBox._instance){
			PhoneInfoBox._instance.setInternetStatus(message);
		}
	}
	public setInternetStatus(netType:string){
		switch(netType){
			case "wifi": 
				this._netImg.source = "wifi_3_png";
				break;
			case "wwan":
				this._netImg.source = "signal_4_png";
				break;
			case "notReachable": 
				this._netImg.source = "signal_0_png";
				break;
		}
	}
	public setBetteryQuantity(count:string){
		var _count = parseFloat(count);
		this._kWhObj.width = 26 * _count;
		if(_count < 0.25){
			this._kWhObj.fillColor = 0xff0202;
		}else if(_count < 0.5){
			this._kWhObj.fillColor = 0xfff787;
		}else{
			this._kWhObj.fillColor = 0x86FF99;
		}
	}
	private onExit(){
		PhoneInfoBox._instance = null;
		if(this._timer){
			this._timer.stop();
			this._timer = null;
		}
	}
	private update(){
		this._date.setTime(Date.now());
		this._timeLab.text = this._date.Format("hh:mm");
		NativeBridge.getBatteryQuantity();
		NativeBridge.getInternetStatus();
	}
}
PhoneInfoBox.init();