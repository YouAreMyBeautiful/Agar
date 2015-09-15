/**
*   @author zen
*   @date 2015.08.04
*   @desc 场景跳转控制
 */

module agar {

    export class SceneCommand extends puremvc.SimpleCommand implements puremvc.ICommand
    {
        public static NAME : string = "SceneCommand";

        public static CHANGE : string = "scene_change";

        public static RESOURSE_COMPLETE : string = "resource_complete";

        //----------------------------界面id------------------------------------
        //开始页
        public static LOGIN_SCENE_ID : number = 100;
        //主界面
        public static MAIN_SCENE_ID : number = 101;
        //战斗界面
        public static END_SCENE_ID : number = 102;

        public constructor()
        {
            super();
        }

        /**
         * 注册消息
         */
        public register() : void
        {
            this.facade.registerCommand(SceneCommand.CHANGE             , SceneCommand);
            this.facade.registerCommand(SceneCommand.RESOURSE_COMPLETE  , SceneCommand);
        }

        //准备进入新界面
        private enterScreen(screenName : string) : void
        {
            var appMediator:ApplicationMediator = <ApplicationMediator><any> this.facade.retrieveMediator(ApplicationMediator.NAME);
            //AppContainer 实例
            appMediator.main.showLoading();
            var preloadProxy : PreloadProxy = <PreloadProxy><any> (this.facade.retrieveProxy(PreloadProxy.NAME));
            preloadProxy.loadScreenAssets(screenName);
        }

        //进入界面
        private doEnterScreen(screenName : string) : void
        {
            var appMediator:ApplicationMediator = <ApplicationMediator><any>this.facade.retrieveMediator(ApplicationMediator.NAME);
            appMediator.main.hideLoading();
            appMediator.main.enterScreen(screenName);
        }

        public execute(notification : puremvc.INotification) : void
        {
            var data : any = notification.getBody();
        
            var gameProxy : GameProxy = <GameProxy><any> (this.facade.retrieveProxy(GameProxy.NAME));

            switch(notification.getName()){
                case SceneCommand.CHANGE:{
                    switch(data){
                        case SceneCommand.LOGIN_SCENE_ID:
                            //开始界面
                            this.enterScreen("loginScreen");
                            break;
                        case SceneCommand.MAIN_SCENE_ID:
                            //传建角色界面
                            this.enterScreen("mainScreen");
                            break;
                        case SceneCommand.END_SCENE_ID:
                            //主界面
                            this.enterScreen("endScreen");                           
                            break;
                    }
                    break;
                }
                case SceneCommand.RESOURSE_COMPLETE:{
                    this.doEnterScreen(data.screen);
                    break;
                }
            }
        }

    }
}
