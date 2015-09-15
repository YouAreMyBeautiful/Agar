/**
*   @author zen
*   @date 2015.08.03
*   @desc 结束界面
*   
**/
module agar {

    export class EndScreen extends egret.gui.SkinnableComponent {
        public bar : egret.gui.UIAsset;


        public constructor() {
            super();
            this.skinName = skin.EndScreenSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new EndScreenMediator(this) );
            
        }

        public removeMediator() : void
        {
            ApplicationFacade.getInstance().removeMediator(EndScreenMediator.NAME);
        }

    }
}