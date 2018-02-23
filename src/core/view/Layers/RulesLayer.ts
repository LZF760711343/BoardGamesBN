namespace Layers {
    export class RulesLayer extends BaseLayer {
        public constructor() {
            super();
            this.skinName =RulesLayerSkin;
            this.loadKey = ResManager.GROUP_NAME.BRNN;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
    
    }

}