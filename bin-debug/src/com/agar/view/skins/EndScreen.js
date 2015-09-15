/**
*   @author zen
*   @date 2015.08.03
*   @desc 结束界面
*
**/
var agar;
(function (agar) {
    var EndScreen = (function (_super) {
        __extends(EndScreen, _super);
        function EndScreen() {
            _super.call(this);
            this.skinName = skin.EndScreenSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }
        var __egretProto__ = EndScreen.prototype;
        __egretProto__.createCompleteEvent = function (event) {
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            agar.ApplicationFacade.getInstance().registerMediator(new agar.EndScreenMediator(this));
        };
        __egretProto__.removeMediator = function () {
            agar.ApplicationFacade.getInstance().removeMediator(agar.EndScreenMediator.NAME);
        };
        return EndScreen;
    })(egret.gui.SkinnableComponent);
    agar.EndScreen = EndScreen;
    EndScreen.prototype.__class__ = "agar.EndScreen";
})(agar || (agar = {}));
