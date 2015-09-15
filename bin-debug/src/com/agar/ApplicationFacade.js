/**
*	@author zen
*   @date 2015.08.03
*	@desc 引擎面门，用于启动整个项目
*
**/
var agar;
(function (agar) {
    var ApplicationFacade = (function (_super) {
        __extends(ApplicationFacade, _super);
        function ApplicationFacade() {
            _super.call(this);
        }
        var __egretProto__ = ApplicationFacade.prototype;
        ApplicationFacade.getInstance = function () {
            if (this.instance == null) {
                this.instance = new ApplicationFacade();
            }
            return (this.instance);
        };
        __egretProto__.initializeController = function () {
            _super.prototype.initializeController.call(this);
            this.registerCommand(ApplicationFacade.STARTUP, agar.StartupCommand);
        };
        /**
         * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
         * @param	rootView	-	PureMVC应用程序的根视图root，包含其它所有的View Componet
         */
        __egretProto__.startUp = function (rootView) {
            this.sendNotification(ApplicationFacade.STARTUP, rootView);
            this.removeCommand(ApplicationFacade.STARTUP);
        };
        ApplicationFacade.STARTUP = "startup";
        return ApplicationFacade;
    })(puremvc.Facade);
    agar.ApplicationFacade = ApplicationFacade;
    ApplicationFacade.prototype.__class__ = "agar.ApplicationFacade";
})(agar || (agar = {}));
