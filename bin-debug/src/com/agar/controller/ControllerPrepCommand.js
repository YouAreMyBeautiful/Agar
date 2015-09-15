/**
*   @author zen
*   @date 2015.08.03
*   @desc 控制层命令
*
**/
var agar;
(function (agar) {
    var ControllerPrepCommand = (function (_super) {
        __extends(ControllerPrepCommand, _super);
        function ControllerPrepCommand() {
            _super.call(this);
        }
        var __egretProto__ = ControllerPrepCommand.prototype;
        __egretProto__.execute = function (notification) {
            (new agar.SceneCommand()).register();
            (new agar.RoundMoveCommand()).register();
            (new agar.RoundEatCommand()).register();
            /*
            (new APICommand()).register();
            (new NetCommand()).register();
            (new GameCommand()).register();
            (new TimeCommand()).register();
            (new UICommand()).register();
            */
        };
        return ControllerPrepCommand;
    })(puremvc.SimpleCommand);
    agar.ControllerPrepCommand = ControllerPrepCommand;
    ControllerPrepCommand.prototype.__class__ = "agar.ControllerPrepCommand";
})(agar || (agar = {}));
