class Tween{
    public constructor(){
        // 
    }
    public static playTweenGroup(tweenGroup:egret.tween.TweenGroup,isLoop:boolean=false,callBack?:Function,thisObject?:any,argArray?:any):void{
        if(isLoop){
            for(var key in tweenGroup.items){
                tweenGroup.items[key].props={loop:true}
            }
        }
        if(callBack){
            tweenGroup.addEventListener("complete",(event)=>{
                callBack.apply(thisObject,argArray);
            },thisObject)
        }
        tweenGroup.play();
    }
}