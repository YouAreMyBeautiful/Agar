/**
*   @author zen
*   @date 2015.08.03
*   @desc 显示层命令
*
**/
var agar;
(function (agar) {
    var ViewPrepCommand = (function (_super) {
        __extends(ViewPrepCommand, _super);
        function ViewPrepCommand() {
            _super.call(this);
        }
        var __egretProto__ = ViewPrepCommand.prototype;
        __egretProto__.execute = function (notification) {
            var main = notification.getBody();
            this.facade.registerMediator(new agar.ApplicationMediator(main));
        };
        return ViewPrepCommand;
    })(puremvc.SimpleCommand);
    agar.ViewPrepCommand = ViewPrepCommand;
    ViewPrepCommand.prototype.__class__ = "agar.ViewPrepCommand";
})(agar || (agar = {}));
