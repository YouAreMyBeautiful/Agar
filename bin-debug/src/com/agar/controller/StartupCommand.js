/**
*   @author zen
*   @date 2015.08.03
*   @desc StartupCommand 启动命令,项目启动后用于初始化M,V,C 命令
*
**/
var agar;
(function (agar) {
    var StartupCommand = (function (_super) {
        __extends(StartupCommand, _super);
        function StartupCommand() {
            _super.call(this);
        }
        var __egretProto__ = StartupCommand.prototype;
        __egretProto__.initializeMacroCommand = function () {
            console.log("初始化");
            this.addSubCommand(agar.ModelPrepCommand);
            this.addSubCommand(agar.ViewPrepCommand);
            this.addSubCommand(agar.ControllerPrepCommand);
        };
        return StartupCommand;
    })(puremvc.MacroCommand);
    agar.StartupCommand = StartupCommand;
    StartupCommand.prototype.__class__ = "agar.StartupCommand";
})(agar || (agar = {}));
