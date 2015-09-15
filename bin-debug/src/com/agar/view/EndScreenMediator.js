/**
*   @author zen
*   @date 2015.08.03
*   @desc 主页界面Mediator
*
**/
var agar;
(function (agar) {
    var EndScreenMediator = (function (_super) {
        __extends(EndScreenMediator, _super);
        function EndScreenMediator(viewComponent) {
            _super.call(this, EndScreenMediator.NAME, viewComponent);
            this.init_view();
            this.init_listener();
        }
        var __egretProto__ = EndScreenMediator.prototype;
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
        };
        EndScreenMediator.NAME = "EndScreenMediator";
        return EndScreenMediator;
    })(puremvc.Mediator);
    agar.EndScreenMediator = EndScreenMediator;
    EndScreenMediator.prototype.__class__ = "agar.EndScreenMediator";
})(agar || (agar = {}));
