/**
*   @author zen
*   @date 2015.08.03
*   @desc StartupCommand 启动命令,项目启动后用于初始化M,V,C 命令
*   
**/
module agar {

	export class StartupCommand extends puremvc.MacroCommand{

		public constructor(){
			super();			
		}

		public initializeMacroCommand():void{
			console.log("初始化");
			this.addSubCommand(ModelPrepCommand);
			this.addSubCommand(ViewPrepCommand);
			this.addSubCommand(ControllerPrepCommand);
		}
	}
}