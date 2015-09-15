/*
圆碰撞
 */
var agar;
(function (agar) {
    var RoundEatCommand = (function (_super) {
        __extends(RoundEatCommand, _super);
        function RoundEatCommand() {
            _super.call(this);
        }
        var __egretProto__ = RoundEatCommand.prototype;
        __egretProto__.register = function () {
            this.facade.registerCommand(agar.GameProxy.ROUND_EAT, RoundEatCommand);
            this.facade.registerCommand(agar.GameProxy.ROUND_HIDE, RoundEatCommand);
        };
        __egretProto__.execute = function (notification) {
            var data = notification.getBody();
            this.gameProxy = (this.facade.retrieveProxy(agar.GameProxy.NAME));
            switch (notification.getName()) {
                case agar.GameProxy.ROUND_EAT: {
                    var j = data;
                    // var food = this.gameProxy.getFood();
                    var food = new Array();
                    if (j < 1000) {
                        this.gameProxy.retriveObject(this.gameProxy.getUserData()[j], this.gameProxy.g_tree.root, food);
                        var x = this.gameProxy.getUserData()[j][0];
                        var y = this.gameProxy.getUserData()[j][1];
                        var r = this.gameProxy.getUserData()[j][2];
                    }
                    else {
                        this.gameProxy.retriveObject(this.gameProxy.getFood()[j], this.gameProxy.g_tree.root, food);
                        var x = this.gameProxy.getFood()[j][0];
                        var y = this.gameProxy.getFood()[j][1];
                        var r = this.gameProxy.getFood()[j][2];
                    }
                    for (var i in food) {
                        var x1 = food[i][0];
                        var y1 = food[i][1];
                        var r1 = food[i][2];
                        //  console.log(x1,y1,r1);
                        var res = this.contain(x, y, r, x1, y1, r1);
                        //    console.log(res);
                        if (res) {
                            //this.sendNotification(GameProxy.EAT,[j,i]);
                            if (j < 1000)
                                this.sendNotification(agar.GameProxy.EAT, [j, food[i]]);
                            else
                                this.sendNotification(agar.GameProxy.FOOD_EAT, [j, food[i]]);
                        }
                    }
                    break;
                }
                case agar.GameProxy.ROUND_HIDE: {
                    var hide = this.gameProxy.getHide();
                    var j = data;
                    var x = this.gameProxy.getUserData()[j][0];
                    var y = this.gameProxy.getUserData()[j][1];
                    var r = this.gameProxy.getUserData()[j][2];
                    for (var i in hide) {
                        var x1 = hide[i][0];
                        var y1 = hide[i][1];
                        var r1 = hide[i][2];
                        var res = this.contain(x1, y1, r1, x, y, r);
                        if (res) {
                            this.sendNotification(agar.GameProxy.FEN, [j, i]);
                        }
                    }
                    break;
                }
            }
        };
        __egretProto__.contain = function (x, y, rad, x1, y1, rad1) {
            var s = Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
            if (rad > rad1) {
                if (rad >= s)
                    return true;
                else
                    return false;
            }
            else if (rad < rad1) {
                if (rad1 >= s)
                    return true;
                else
                    return false;
            }
            else
                return false;
        };
        RoundEatCommand.NAME = "RoundEatCommand";
        return RoundEatCommand;
    })(puremvc.SimpleCommand);
    agar.RoundEatCommand = RoundEatCommand;
    RoundEatCommand.prototype.__class__ = "agar.RoundEatCommand";
})(agar || (agar = {}));
