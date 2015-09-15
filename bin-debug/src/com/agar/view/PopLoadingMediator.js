/**
*   @author zen
*   @date 2015.08.03
*   @desc 加载小界面Mediator
*
**/
var agar;
(function (agar) {
    var PopLoadingMediator = (function (_super) {
        __extends(PopLoadingMediator, _super);
        function PopLoadingMediator(viewComponent) {
            _super.call(this, PopLoadingMediator.NAME, viewComponent);
        }
        var __egretProto__ = PopLoadingMediator.prototype;
        __egretProto__.listNotificationInterests = function () {
            return [];
        };
        __egretProto__.handleNotification = function (notification) {
            var data = notification.getBody();
            //switch(notification.getName()){
            //}
        };
        __egretProto__.compeProgress = function () {
            var data = this.curr_data;
            /*
            if(data.data){
                this.sendNotification(PopCommand.RESOURSE_COMPLETE,{"screen":data.screen,"data":data.data});
            }else{
                this.sendNotification(SceneCommand.RESOURSE_COMPLETE,{"screen":data.screen});
            }
            */
        };
        __egretProto__.setProgress = function (data) {
            //this.view.setProgress(data.p,data.t);
        };
        __egretProto__.resetProgress = function () {
            //this.view.reset();
        };
        Object.defineProperty(__egretProto__, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        PopLoadingMediator.NAME = "PopLoadingMediator";
        return PopLoadingMediator;
    })(puremvc.Mediator);
    agar.PopLoadingMediator = PopLoadingMediator;
    PopLoadingMediator.prototype.__class__ = "agar.PopLoadingMediator";
})(agar || (agar = {}));
