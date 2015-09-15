/**
*   @author zen
*   @date 2015.08.03
*   @desc 显示层命令
*   
**/
module agar {

	export class ViewPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		
		public execute(notification:puremvc.INotification):void{
			var main:AppContainer = notification.getBody();
			this.facade.registerMediator( new ApplicationMediator(main) );
		}
	}
}