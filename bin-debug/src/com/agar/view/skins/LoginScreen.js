/**
*   @author zen
*   @date 2015.08.03
*   @desc 登录界面
*
**/
var agar;
(function (agar) {
    var LoginScreen = (function (_super) {
        __extends(LoginScreen, _super);
        function LoginScreen() {
            _super.call(this);
            this.skinName = skin.LoginScreenSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }
        var __egretProto__ = LoginScreen.prototype;
        __egretProto__.createCompleteEvent = function (event) {
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            agar.ApplicationFacade.getInstance().registerMediator(new agar.LoginScreenMediator(this));
            //            var c = this.user_name.text;
            //             console.log(c);
        };
        __egretProto__.removeMediator = function () {
            agar.ApplicationFacade.getInstance().removeMediator(agar.LoginScreenMediator.NAME);
        };
        return LoginScreen;
    })(egret.gui.SkinnableComponent);
    agar.LoginScreen = LoginScreen;
    LoginScreen.prototype.__class__ = "agar.LoginScreen";
})(agar || (agar = {}));
