/**
*   @author zen
*   @date 2015.08.03
*   @desc 加载小界面
*
**/
var agar;
(function (agar) {
    var PopLoading = (function (_super) {
        __extends(PopLoading, _super);
        function PopLoading() {
            _super.call(this);
            this.skinName = skin.PopLoadingSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }
        var __egretProto__ = PopLoading.prototype;
        __egretProto__.createCompleteEvent = function (event) {
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            agar.ApplicationFacade.getInstance().registerMediator(new agar.PopLoadingMediator(this));
        };
        __egretProto__.removeMediator = function () {
            agar.ApplicationFacade.getInstance().removeMediator(agar.PopLoadingMediator.NAME);
        };
        return PopLoading;
    })(egret.gui.SkinnableComponent);
    agar.PopLoading = PopLoading;
    PopLoading.prototype.__class__ = "agar.PopLoading";
})(agar || (agar = {}));
