/**
*   @author zen
*   @date 2015.08.03
*   @desc 加载小界面Mediator
*   
**/

module agar {

    export class PopLoadingMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME:string = "PopLoadingMediator";

        private curr_data : any;

        public constructor(viewComponent:any){
            super(PopLoadingMediator.NAME, viewComponent);
            
        }

        public listNotificationInterests():Array<any>{
            return [
            ];
        }

        public handleNotification(notification:puremvc.INotification):void{
        	var data:any = notification.getBody();

            //switch(notification.getName()){
            	
            //}
        }

        private compeProgress():void{
            var data:any = this.curr_data;
            /*
            if(data.data){
                this.sendNotification(PopCommand.RESOURSE_COMPLETE,{"screen":data.screen,"data":data.data});
            }else{
                this.sendNotification(SceneCommand.RESOURSE_COMPLETE,{"screen":data.screen});
            }
            */
        }

        private setProgress(data:any):void {
            //this.view.setProgress(data.p,data.t);
        }

        private resetProgress():void {
            //this.view.reset();
        }

        public get view():PopLoading{
            return <PopLoading><any> (this.viewComponent);
        }
    }
}