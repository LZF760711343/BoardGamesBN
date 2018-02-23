/**
 * 装饰器
 */
// namespace Decorators {
// 	/**
//      * 自动打印函数的第一个参数
//      */
// 	export let printDatas= (value: boolean) => {
// 		return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
// 			if (value) {
// 				const method = descriptor.value;
// 				descriptor.value = function (...arg) {
// 					egret.log("dispatchMsg:", propertyKey, arg[0].datas);
// 					return method.apply(this, arg);
// 				}
// 			} else {
// 				return descriptor.value;
// 			}
// 		};
// 	}
// } 
//# sourceMappingURL=Decorators.js.map