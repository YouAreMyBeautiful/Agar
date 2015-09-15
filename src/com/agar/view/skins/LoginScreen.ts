/**
*   @author zen
*   @date 2015.08.03
*   @desc 登录界面
*   
**/
module agar {

    export class LoginScreen extends egret.gui.SkinnableComponent {
        public m_start_btn : egret.gui.UIAsset;
        public user_name: egret.gui.EditableText;

        public constructor() {
            super();
            this.skinName = skin.LoginScreenSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new LoginScreenMediator(this) );
//            var c = this.user_name.text;
//             console.log(c);
        }

        public removeMediator() : void
        {
            ApplicationFacade.getInstance().removeMediator(LoginScreenMediator.NAME);
        }

    }
}