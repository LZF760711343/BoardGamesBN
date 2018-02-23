var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tween = (function () {
    function Tween() {
        // 
    }
    Tween.playTweenGroup = function (tweenGroup, isLoop, callBack, thisObject, argArray) {
        if (isLoop === void 0) { isLoop = false; }
        if (isLoop) {
            for (var key in tweenGroup.items) {
                tweenGroup.items[key].props = { loop: true };
            }
        }
        if (callBack) {
            tweenGroup.addEventListener("complete", function (event) {
                callBack.apply(thisObject, argArray);
            }, thisObject);
        }
        tweenGroup.play();
    };
    return Tween;
}());
__reflect(Tween.prototype, "Tween");
//# sourceMappingURL=Tween.js.map