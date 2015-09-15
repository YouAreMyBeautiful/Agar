/**
*   @author zen
*   @date 2015.08.03
*   @desc 控制层命令
*   
**/
module agar {

	export class ControllerPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
		    super();
		}

		public execute(notification:puremvc.INotification):void{
                  (new SceneCommand()).register();
                  (new RoundMoveCommand()).register();
                  (new RoundEatCommand()).register();
                  /*
                  (new APICommand()).register();
                  (new NetCommand()).register();
                  (new GameCommand()).register();
                  (new TimeCommand()).register();
                  (new UICommand()).register();
                  */
            }
	}
}