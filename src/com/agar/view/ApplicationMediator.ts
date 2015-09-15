/**
*   @author zen
*   @date 2015.08.03
*   @desc 主Mediator
*   
**/
module agar {

	export class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator
    {
		public static NAME : string = "ApplicationMediator";

		private gameProxy : GameProxy;
		
		public constructor(viewComponent : any)
        {
			super(ApplicationMediator.NAME, viewComponent);

			this.gameProxy = <GameProxy><any> (this.facade.retrieveProxy(GameProxy.NAME));
        }

        public get main() : AppContainer
        {
			return <AppContainer><any> (this.viewComponent);
		}

		public listNotificationInterests() : Array<any>
        {
			return [
			];
		}
		
		public handleNotification(notification : puremvc.INotification) : void
        {
			var data : any = notification.getBody();

		}	

		
	}
}
