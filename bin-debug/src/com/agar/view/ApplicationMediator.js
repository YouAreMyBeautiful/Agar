/**
*   @author zen
*   @date 2015.08.03
*   @desc 主Mediator
*
**/
var agar;
(function (agar) {
    var ApplicationMediator = (function (_super) {
        __extends(ApplicationMediator, _super);
        function ApplicationMediator(viewComponent) {
            _super.call(this, ApplicationMediator.NAME, viewComponent);
            this.gameProxy = (this.facade.retrieveProxy(agar.GameProxy.NAME));
        }
        var __egretProto__ = ApplicationMediator.prototype;
        Object.defineProperty(__egretProto__, "main", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.listNotificationInterests = function () {
            return [];
        };
        __egretProto__.handleNotification = function (notification) {
            var data = notification.getBody();
        };
        ApplicationMediator.NAME = "ApplicationMediator";
        return ApplicationMediator;
    })(puremvc.Mediator);
    agar.ApplicationMediator = ApplicationMediator;
    ApplicationMediator.prototype.__class__ = "agar.ApplicationMediator";
})(agar || (agar = {}));
