namespace net {
	export class DataView2 extends DataView {
		public constructor(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number) {
			super(buffer, byteOffset, byteLength);
		}
		public getUint64(byteOffset: number, littleEndian?: boolean) {
			// if(littleEndian){

			// }else{
			// 0x11223344
			//   55667788;
			//   88776655
			//   44332211
			// }
		}
		public setUint64(byteOffset: number, value:number, littleEndian?: boolean) {
			this.setUint32(byteOffset, value >> 32 & 0xffffffff);
			this.setUint32(byteOffset + 4, value & 0xffffffff);
		}
		public setInt64(byteOffset: number, value:number,  littleEndian?: boolean) {
			this.setInt32(byteOffset, value >> 32 & 0xffffffff);
			this.setInt32(byteOffset + 4, value & 0xffffffff);
		}
	}
	export class ByteArray extends egret.ByteArray{
		/**
		 *
		 */
		private static SIZE_OF_LONG:number = 8;
		constructor(buffer?:ArrayBuffer) {
			super(buffer);
		}
		public writeLong(value:long):void {
			this.writeInt(value >> 32 & 0xffffffff);
			this.writeInt(value & 0xffffffff);
			// this.dataView.setInt32(this.position, value >> 32 & 0xffffffff);
			// this.dataView.setInt32(this.position + 4, value & 0xffffffff);
			// this.position += ByteArray.SIZE_OF_LONG;
        }
	}
}