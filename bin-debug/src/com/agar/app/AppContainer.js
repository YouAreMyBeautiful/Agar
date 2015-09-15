/**
*   @desc view层viewroot,用于界面变换
*   @date 2015.08.03
*   @author zen
**/
var agar;
(function (agar) {
    var AppContainer = (function (_super) {
        __extends(AppContainer, _super);
        function AppContainer() {
            _super.call(this);
            this.allScreen = {
                //主场景
                "loginScreen": agar.LoginScreen,
                "mainScreen": agar.MainScreen,
                "endScreen": agar.EndScreen,
            };
        }
        var __egretProto__ = AppContainer.prototype;
        __egretProto__.enterScreen = function (screenName) {
            var screen = new this.allScreen[screenName];
            if (this.numElements > 0) {
                var last = this.removeElementAt(0);
            }
            this.addElementAt(screen, 0);
            if (!screen.initialized) {
                screen.validateNow();
            }
        };
        __egretProto__.showLoading = function () {
            if (!this.poploading) {
                this.poploading = new agar.PopLoading();
            }
            egret.gui.PopUpManager.addPopUp(this.poploading, true);
            if (!this.poploading.initialized) {
                this.poploading.validateNow();
            }
        };
        __egretProto__.hideLoading = function () {
            egret.gui.PopUpManager.removePopUp(this.poploading);
        };
        return AppContainer;
    })(egret.gui.UIStage);
    agar.AppContainer = AppContainer;
    AppContainer.prototype.__class__ = "agar.AppContainer";
})(agar || (agar = {}));
