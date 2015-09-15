/**
*   @author zen
*   @date 2015.08.03
*   @desc 加载小界面
*   
**/
module agar {

    export class PopLoading extends egret.gui.SkinnableComponent {
        public bar : egret.gui.UIAsset;
        public effect : egret.gui.UIAsset;


        public constructor() {
            super();
            this.skinName = skin.PopLoadingSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new PopLoadingMediator(this) );
            
        }

        public removeMediator() : void
        {
            ApplicationFacade.getInstance().removeMediator(PopLoadingMediator.NAME);
        }

    }
}