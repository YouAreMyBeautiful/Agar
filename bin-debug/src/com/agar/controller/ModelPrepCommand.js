/**
*   @author zen
*   @date 2015.08.03
*   @desc 数据层命令
*
**/
var agar;
(function (agar) {
    var ModelPrepCommand = (function (_super) {
        __extends(ModelPrepCommand, _super);
        function ModelPrepCommand() {
            _super.call(this);
        }
        var __egretProto__ = ModelPrepCommand.prototype;
        __egretProto__.execute = function (notification) {
            this.facade.registerProxy(new agar.GameProxy());
            this.facade.registerProxy(new agar.PreloadProxy());
            this.facade.registerProxy(new agar.FoodProxy());
        };
        return ModelPrepCommand;
    })(puremvc.SimpleCommand);
    agar.ModelPrepCommand = ModelPrepCommand;
    ModelPrepCommand.prototype.__class__ = "agar.ModelPrepCommand";
})(agar || (agar = {}));
