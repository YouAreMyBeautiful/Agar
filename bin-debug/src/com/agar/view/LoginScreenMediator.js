/**
*   @author zen
*   @date 2015.08.03
*   @desc 主页界面Mediator
*
**/
var agar;
(function (agar) {
    var LoginScreenMediator = (function (_super) {
        __extends(LoginScreenMediator, _super);
        function LoginScreenMediator(viewComponent) {
            _super.call(this, LoginScreenMediator.NAME, viewComponent);
            this.init_view();
            this.init_listener();
        }
        var __egretProto__ = LoginScreenMediator.prototype;
        Object.defineProperty(__egretProto__, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.onRemove = function () {
        };
        __egretProto__.listNotificationInterests = function () {
            return [];
        };
        __egretProto__.handleNotification = function (notification) {
            var data = notification.getBody();
            //switch(notification.getName()){
            //}
        };
        __egretProto__.init_view = function () {
        };
        //初始化活动和场景的监听
        __egretProto__.init_listener = function () {
            this.view.m_start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enter_main, this);
        };
        //
        __egretProto__.enter_main = function () {
            console.log(this.view.user_name.text);
            this.sendNotification(agar.SceneCommand.CHANGE, agar.SceneCommand.MAIN_SCENE_ID);
            this.sendNotification(agar.GameProxy.USER_NAME, this.view.user_name.text);
        };
        LoginScreenMediator.NAME = "LoginScreenMediator";
        return LoginScreenMediator;
    })(puremvc.Mediator);
    agar.LoginScreenMediator = LoginScreenMediator;
    LoginScreenMediator.prototype.__class__ = "agar.LoginScreenMediator";
})(agar || (agar = {}));
