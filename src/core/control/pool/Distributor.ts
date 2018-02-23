namespace Pool {
	export class Distributor implements IDistributor
{

	private _UsedPool:Object = null; //使用中的对象
	private _IdlePool:Object = null; //未使用的对象

	public constructor()
	{
		this._IdlePool = {};
		this._UsedPool = {};
	}

	public distribution( val:IPoolObject ):void
	{
		if( val.isIdle )
		{
			this._IdlePool[ val.hashc ] = val;
			delete this._UsedPool[ val.hashc ];
		}
		else
		{
			this._UsedPool[ val.hashc ] = val;
			delete this._IdlePool[ val.hashc ];
		}
	}

	public addVO( val:IPoolObject ):void
	{
		val.setProtocol( this );
		if( val.isIdle )
		{
			this._IdlePool[ val.hashc ] = val;
			
		}
		else
		{
			this._UsedPool[ val.hashc ] = val;
		}
	}

	public getVO( type:number ):IPoolObject
	{
		let obj:IPoolObject = null;
		for (let key in this._IdlePool) {
			obj = this._IdlePool[key] as IPoolObject;
			if ( obj.type == type ) {
				obj.reset();
				return obj;
			}
		}
		return null;
	}

	public clear():void
	{
		let obj:IPoolObject = null;
		for (let key in this._IdlePool) {
			obj = this._IdlePool[key] as IPoolObject;
			obj.del();
		}
		this._IdlePool = null;
		this._IdlePool = {};
	}

}
}