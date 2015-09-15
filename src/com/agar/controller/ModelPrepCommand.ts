/**
*   @author zen
*   @date 2015.08.03
*   @desc 数据层命令
*   
**/
module agar {

	export class ModelPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}

		public execute(notification : puremvc.INotification) : void
        {
			this.facade.registerProxy(new GameProxy());
			this.facade.registerProxy(new PreloadProxy());
            this.facade.registerProxy(new FoodProxy());
		
		}
	}
}
