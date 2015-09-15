/**
*   @author zen
*   @date 2015.08.04
*   @desc 场景跳转控制
 */
var agar;
(function (agar) {
    var SceneCommand = (function (_super) {
        __extends(SceneCommand, _super);
        function SceneCommand() {
            _super.call(this);
        }
        var __egretProto__ = SceneCommand.prototype;
        /**
         * 注册消息
         */
        __egretProto__.register = function () {
            this.facade.registerCommand(SceneCommand.CHANGE, SceneCommand);
            this.facade.registerCommand(SceneCommand.RESOURSE_COMPLETE, SceneCommand);
        };
        //准备进入新界面
        __egretProto__.enterScreen = function (screenName) {
            var appMediator = this.facade.retrieveMediator(agar.ApplicationMediator.NAME);
            //AppContainer 实例
            appMediator.main.showLoading();
            var preloadProxy = (this.facade.retrieveProxy(agar.PreloadProxy.NAME));
            preloadProxy.loadScreenAssets(screenName);
        };
        //进入界面
        __egretProto__.doEnterScreen = function (screenName) {
            var appMediator = this.facade.retrieveMediator(agar.ApplicationMediator.NAME);
            appMediator.main.hideLoading();
            appMediator.main.enterScreen(screenName);
        };
        __egretProto__.execute = function (notification) {
            var data = notification.getBody();
            var gameProxy = (this.facade.retrieveProxy(agar.GameProxy.NAME));
            switch (notification.getName()) {
                case SceneCommand.CHANGE: {
                    switch (data) {
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
                case SceneCommand.RESOURSE_COMPLETE: {
                    this.doEnterScreen(data.screen);
                    break;
                }
            }
        };
        SceneCommand.NAME = "SceneCommand";
        SceneCommand.CHANGE = "scene_change";
        SceneCommand.RESOURSE_COMPLETE = "resource_complete";
        //----------------------------界面id------------------------------------
        //开始页
        SceneCommand.LOGIN_SCENE_ID = 100;
        //主界面
        SceneCommand.MAIN_SCENE_ID = 101;
        //战斗界面
        SceneCommand.END_SCENE_ID = 102;
        return SceneCommand;
    })(puremvc.SimpleCommand);
    agar.SceneCommand = SceneCommand;
    SceneCommand.prototype.__class__ = "agar.SceneCommand";
})(agar || (agar = {}));
