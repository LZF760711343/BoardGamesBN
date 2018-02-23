namespace Pool {

	export interface IPoolObject extends egret.HashObject  {
		hashc: number; //hashCode
		type: number; //类型标识
		isIdle: boolean; //标记是否空闲
		dispose(): void; //释放对象内部引用
		del(): void; //彻底释放对象
		reset(): void;   //重置
		setProtocol(val: IDistributor): void; //设置协议
		action(): void; //动作
	}
}