
namespace UI {
	export class BrnnZoom extends UI.Zoom {

		public constructor() {
			super();
		}
		
		protected childrenCreated(): void {
			super.childrenCreated();
			//初始化brnn的UI
			this._contractionBtn.bgStr = "shang_hzicon1_png";
			this._SetBtn.icon = "brsz_hzicon_png";
			this._dissolveBtn.icon = "exit_hziconxl_png";
		}

	}
}
