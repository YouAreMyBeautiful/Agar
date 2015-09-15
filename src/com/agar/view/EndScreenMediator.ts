 /**
*   @author zen
*   @date 2015.08.03
*   @desc 主页界面Mediator
*   
**/

module agar {

    export class EndScreenMediator extends puremvc.Mediator implements puremvc.IMediator
    {
        public static NAME : string = "EndScreenMediator";

        public constructor(viewComponent : any)
        {
            super(EndScreenMediator.NAME, viewComponent);           
            this.init_view();
            this.init_listener();
        }

        public get view() : EndScreen
        {
            return <EndScreen><any> (this.viewComponent);
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
        }
        
    }
}
