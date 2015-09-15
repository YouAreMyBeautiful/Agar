/**
 *圆移动命令
 */
var agar;
(function (agar) {
    var RoundMoveCommand = (function (_super) {
        __extends(RoundMoveCommand, _super);
        function RoundMoveCommand() {
            _super.call(this);
        }
        var __egretProto__ = RoundMoveCommand.prototype;
        __egretProto__.register = function () {
            this.facade.registerCommand(agar.GameProxy.NEXT_CENTER, RoundMoveCommand);
            this.facade.registerCommand(agar.GameProxy.FENLIE, RoundMoveCommand);
            this.facade.registerCommand(agar.GameProxy.HEBING, RoundMoveCommand);
        };
        __egretProto__.execute = function (notification) {
            var data = notification.getBody();
            this.gameProxy = (this.facade.retrieveProxy(agar.GameProxy.NAME));
            var v = this.gameProxy.getSpeed();
            switch (notification.getName()) {
                case agar.GameProxy.NEXT_CENTER: {
                    var angleSpeed = this.gameProxy.getAngleSpeed();
                    var x1 = Math.round(Math.cos(angleSpeed) * v * 10000) / 10000;
                    var y1 = Math.round(Math.sin(angleSpeed) * v * 10000) / 10000;
                    this.sendNotification(agar.GameProxy.ROUND_MOVE, [x1, y1]);
                    break;
                }
                case agar.GameProxy.FENLIE: {
                    var angleSpeed = this.gameProxy.getAngleSpeed();
                    var x1 = Math.round(Math.cos(angleSpeed) * 2 * v * 10000) / 10000;
                    var y1 = Math.round(Math.sin(angleSpeed) * 2 * v * 10000) / 10000;
                    this.sendNotification(agar.GameProxy.FENLIE_MOVE, [data, x1, y1]);
                    break;
                }
                case agar.GameProxy.HEBING: {
                    var cen_x = this.gameProxy.getUserData()[0][0];
                    var cen_y = this.gameProxy.getUserData()[0][1];
                    var cen_r = this.gameProxy.getUserData()[0][2];
                    var x = this.gameProxy.getUserData()[data][0];
                    var y = this.gameProxy.getUserData()[data][1];
                    var r = this.gameProxy.getUserData()[data][2];
                    var angleSpeed = Math.atan2(cen_y - y, cen_x - x);
                    angleSpeed = Math.round(angleSpeed * 10000) / 10000;
                    var vx = Math.round(Math.cos(angleSpeed) * 2 * 10000) / 10000;
                    var vy = Math.round(Math.sin(angleSpeed) * 2 * 10000) / 10000;
                    this.sendNotification(agar.GameProxy.HEBING_USER, [data, vx, vy]);
                }
            }
        };
        RoundMoveCommand.NAME = "RoundMoveCommand";
        return RoundMoveCommand;
    })(puremvc.SimpleCommand);
    agar.RoundMoveCommand = RoundMoveCommand;
    RoundMoveCommand.prototype.__class__ = "agar.RoundMoveCommand";
})(agar || (agar = {}));
