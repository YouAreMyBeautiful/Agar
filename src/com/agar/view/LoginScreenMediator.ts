 /**
*   @author zen
*   @date 2015.08.03
*   @desc 主页界面Mediator
*   
**/

module agar {

    export class LoginScreenMediator extends puremvc.Mediator implements puremvc.IMediator
    {
        public static NAME : string = "LoginScreenMediator";

        public constructor(viewComponent : any)
        {
            super(LoginScreenMediator.NAME, viewComponent);           
            this.init_view();
            this.init_listener();
        }

        public get view() : LoginScreen
        {
            return <LoginScreen><any> (this.viewComponent);
        }

        public onRemove() : void{
        }

        public listNotificationInterests() : Array<any>
        {
            return [
            ];
        }       

        public handleNotification(notification : puremvc.INotification) : void
        {
            var data : any = notification.getBody();
            //switch(notification.getName()){
            //}
        }


        private init_view() : void
        {
        }

        //初始化活动和场景的监听
        private init_listener() : void
        {
            this.view.m_start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enter_main, this);
        }
        

        //
        private enter_main():void{
            console.log(this.view.user_name.text);
            this.sendNotification(SceneCommand.CHANGE,SceneCommand.MAIN_SCENE_ID);
            this.sendNotification(GameProxy.USER_NAME,this.view.user_name.text);
        }
    }
}
