/**
*	@author zen
*   @date 2015.08.03
*	@desc 引擎面门，用于启动整个项目
*	
**/

module agar {

	export class ApplicationFacade extends puremvc.Facade implements puremvc.IFacade{
		public static STARTUP:string = "startup";

		public constructor(){
			super();
		}		
		
		public static getInstance():ApplicationFacade{
			if ( this.instance == null ) {
				this.instance = new ApplicationFacade();
			}

			return <ApplicationFacade><any> (this.instance);
		}
		
		public initializeController():void{
			super.initializeController();
			
			this.registerCommand(ApplicationFacade.STARTUP, StartupCommand);
		}
		
		/**
		 * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
		 * @param	rootView	-	PureMVC应用程序的根视图root，包含其它所有的View Componet
		 */
		public startUp(rootView:egret.DisplayObjectContainer):void{
			this.sendNotification(ApplicationFacade.STARTUP, rootView);
			this.removeCommand(ApplicationFacade.STARTUP); 
		}
	}
}