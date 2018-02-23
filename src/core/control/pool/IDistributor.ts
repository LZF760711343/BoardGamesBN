namespace Pool {
	export interface IDistributor {
		distribution( val:IPoolObject ):void; //分配
		addVO(val:IPoolObject):void; //添加元素
		getVO(type:number):IPoolObject; //获取元素
		clear():void; //清除所有未使用的对象
	}
}