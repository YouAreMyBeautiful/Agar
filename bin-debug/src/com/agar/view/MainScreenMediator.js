/**
*   @author zen
*   @date 2015.08.03
*   @desc 主页界面Mediator
*
**/
var agar;
(function (agar) {
    var MainScreenMediator = (function (_super) {
        __extends(MainScreenMediator, _super);
        function MainScreenMediator(viewComponent) {
            _super.call(this, MainScreenMediator.NAME, viewComponent);
            this.num = 0; //分离标志
            this.he_bing = false; //合并标志
            this.hebing_user = false;
            this.gameProxy = (this.facade.retrieveProxy(agar.GameProxy.NAME));
            this.foodProxy = (this.facade.retrieveProxy(agar.FoodProxy.NAME));
            //  var x = Math.random() * 4500,
            //     y = Math.random() * 5000,
            var x = 500, y = 1995, r = 25;
            this.gameProxy.setRoundCenter(x, y);
            this.gameProxy.init();
            this.init_listener();
            this.view.drawMap(x, y);
            var data = this.view.drawUser(240, 400, this.gameProxy.getUserData()[0][2], "s1_png", this.gameProxy.getUserName());
            this.view.user.push(data);
            this.view.addUser(0);
            this.init_view();
            this.robot();
            egret.setInterval(this.ai, this, 10000);
            //  this.ai();
        }
        var __egretProto__ = MainScreenMediator.prototype;
        Object.defineProperty(__egretProto__, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.onRemove = function () {
        };
        __egretProto__.listNotificationInterests = function () {
            return [
                agar.GameProxy.ROUND_MOVE,
                agar.GameProxy.EAT,
                agar.GameProxy.USER_NAME,
                agar.GameProxy.FENLIE_MOVE,
                agar.GameProxy.HEBING_USER,
                agar.GameProxy.FEN,
                agar.GameProxy.FOOD_EAT
            ];
        };
        __egretProto__.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case agar.GameProxy.ROUND_MOVE: {
                    var user_data = this.gameProxy.getUserData();
                    this.next_x = user_data[0][0] + data[0];
                    this.next_y = user_data[0][1] + data[1];
                    this.view.map.x -= data[0];
                    this.view.map.y -= data[1];
                    for (var j = 0; j < this.gameProxy.getUserNum(); ++j) {
                        var next_x = user_data[j][0] + data[0];
                        var next_y = user_data[j][1] + data[1];
                        var next = new egret.Point(next_x, next_y);
                        this.gameProxy.setUserDataCenter(j, next_x, next_y);
                        if (this.gameProxy.getUserData()[j][2] > this.gameProxy.getHideRad()) {
                            this.sendNotification(agar.GameProxy.ROUND_HIDE, j);
                        }
                        this.sendNotification(agar.GameProxy.ROUND_EAT, j);
                    }
                    this.view.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                    this.view.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                    break;
                }
                case agar.GameProxy.FENLIE_MOVE: {
                    var i = data[0]; //分裂的第几个圆
                    var vx = data[1];
                    var vy = data[2];
                    var user_data = this.gameProxy.getUserData();
                    var next_x = user_data[i][0] + vx;
                    var next_y = user_data[i][1] + vy;
                    this.fenlie_next_x = next_x;
                    this.fenlie_next_y = next_y;
                    //var next = new egret.Point(next_x,next_y);
                    this.gameProxy.setUserDataCenter(i, next_x, next_y);
                    this.sendNotification(agar.GameProxy.ROUND_EAT, i);
                    this.view.user[i][0].x += vx;
                    this.view.user[i][0].y += vy;
                    this.view.user[i][1].x += vx;
                    this.view.user[i][1].y += vy;
                    this.num++;
                    this.f = i;
                    this.view.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                    this.view.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                    break;
                }
                case agar.GameProxy.FOOD_EAT: {
                    //机器人吃food
                    var i = data[0], i_x = this.gameProxy.getFood()[i][0], i_y = this.gameProxy.getFood()[i][1], i_r = this.gameProxy.getFood()[i][2], i_n = this.gameProxy.getFood()[i][3];
                    var f_x = data[1][0], f_y = data[1][1], f_r = data[1][2], f_n = data[1][3];
                    var r = Math.sqrt(f_r * f_r + i_r * i_r);
                    this.gameProxy.setFood(i_x, i_y, i_n, r); //数据更新
                    var x1 = Math.random() * 4500, y1 = Math.random() * 7000, angleSpeed = Math.atan2(y1 - i_y, x1 - i_r);
                    angleSpeed = Math.round(angleSpeed * 10000) / 10000;
                    this.gameProxy.getFood()[i][4] = angleSpeed;
                    this.view.food[i][0].height = r * 2;
                    this.view.food[i][0].width = r * 2;
                    this.view.food[i][1].size = r * 0.5 + 10; //吃food后变化
                    if (f_n < 1000) {
                        this.view.map.removeChild(this.view.food[f_n]);
                        var x = Math.random() * 4800, y = Math.random() * 8000, c = Math.random() * 255 * 255 * 255;
                        this.gameProxy.setFood(x, y, f_n, 5);
                        this.view.drawRound(x, y, 5, f_n);
                    }
                    else {
                        this.view.map.removeChild(this.view.food[f_n][0]);
                        this.view.map.removeChild(this.view.food[f_n][1]);
                        this.gameProxy.deleteFood(f_n);
                        this.view.food.splice(f_n, 1, 0);
                    }
                    break;
                }
                case agar.GameProxy.HEBING_USER: {
                    var i = data[0]; //合并的第几个圆
                    var vx = data[1];
                    var vy = data[2];
                    var user_data = this.gameProxy.getUserData();
                    var next_x = user_data[i][0] + vx;
                    var next_y = user_data[i][1] + vy;
                    var next = new egret.Point(next_x, next_y);
                    this.gameProxy.setUserDataCenter(i, next_x, next_y);
                    this.sendNotification(agar.GameProxy.ROUND_EAT, i);
                    this.view.user[i][0].x += vx;
                    this.view.user[i][0].y += vy;
                    this.view.user[i][1].x += vx;
                    this.view.user[i][1].y += vy;
                    this.h = i;
                    var user = new egret.Point(user_data[0][0], user_data[0][1]);
                    var l = egret.Point.distance(next, user);
                    if (l < user_data[0][2] + user_data[i][2] + 20 && !this.he_bing) {
                        egret.clearTimeout(this.time);
                        this.time = egret.setTimeout(this.send, this, 5000);
                    }
                    else {
                        if (l < 2) {
                            this.hebing(i);
                            if (this.gameProxy.getUserNum() > 1) {
                                this.sendNotification(agar.GameProxy.HEBING, i);
                            }
                            this.he_bing = false;
                        }
                        else {
                            this.hebing_user = true;
                        }
                        this.view.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                        this.view.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                    }
                    break;
                }
                case agar.GameProxy.EAT: {
                    var i = data[0];
                    // var f = data[1];
                    var f_x = data[1][0], f_y = data[1][1], f_r = data[1][2], f_n = data[1][3];
                    //var f_r = this.gameProxy.getFood()[f][2];//获取食物的半径
                    var s_r = this.gameProxy.getUserData()[i][2];
                    var r = Math.sqrt(f_r * f_r + s_r * s_r); //吃掉食物后的半径
                    //  console.log(r);
                    //   if(this.gameProxy.getFood().length < 1000)
                    //       this.init_view();
                    // this.gameProxy.setRoundRad(r);
                    this.gameProxy.setUserDataRad(i, r);
                    this.view.user[i][0].height = r * 2;
                    this.view.user[i][0].width = r * 2;
                    this.view.user[i][1].size = r * 0.5 + 10; //吃food后变化
                    if (f_n < 1000) {
                        this.view.map.removeChild(this.view.food[f_n]);
                        var x = Math.random() * 4800, y = Math.random() * 8000, c = Math.random() * 255 * 255 * 255;
                        this.gameProxy.setFood(x, y, f_n, 5);
                        this.view.drawRound(x, y, 5, f_n);
                    }
                    else {
                        this.view.map.removeChild(this.view.food[f_n][0]);
                        this.view.map.removeChild(this.view.food[f_n][1]);
                        this.gameProxy.deleteFood(f_n);
                        this.view.food.splice(f_n, 1, 0);
                    }
                    break;
                }
                case agar.GameProxy.FEN: {
                    console.log("fen");
                    ;
                    break;
                }
                case agar.GameProxy.USER_NAME: {
                    this.gameProxy.setUserName(data);
                    this.view.user[0][1].text = data;
                    break;
                }
            }
        };
        __egretProto__.onEnterFrame = function () {
            if (this.hebing_user) {
                this.hebing_user = false;
                this.sendNotification(agar.GameProxy.HEBING, this.h);
            }
            if (0 < this.next_x && this.next_x < 4800 && 0 < this.next_y && this.next_y < 8000) {
                this.sendNotification(agar.GameProxy.NEXT_CENTER);
            }
            if ((this.num < 25 && this.num > 0)) {
                this.sendNotification(agar.GameProxy.FENLIE, this.f);
            }
            else {
                if (this.num >= 25) {
                    console.log("发送back消息");
                    var n = this.gameProxy.getUserNum();
                    for (var i = 1; i < n; i++) {
                        this.sendNotification(agar.GameProxy.HEBING, i);
                    }
                    this.num = 0;
                }
            }
        };
        __egretProto__.send = function () {
            this.he_bing = true;
            for (var k = this.gameProxy.getUserNum() - 1; k > 0; k--) {
                this.sendNotification(agar.GameProxy.HEBING, k);
            }
        };
        __egretProto__.hebing = function (k) {
            var user_data = this.gameProxy.getUserData();
            //for(var k = 1;k < this.gameProxy.getUserNum();) {
            var cen_r = user_data[0][2];
            var i_r = user_data[k][2];
            var he_r = Math.sqrt(cen_r * cen_r + i_r * i_r);
            this.view.user[0][0].height = he_r * 2;
            this.view.user[0][0].width = he_r * 2;
            this.view.user[0][1].size = he_r * 0.5 + 10;
            this.gameProxy.setUserDataRad(0, he_r);
            this.gameProxy.deleteUser(k);
            this.gameProxy.setUserNum(this.gameProxy.getUserNum() - 1);
            this.view.removeUser(k);
            //   }
        };
        __egretProto__.init_view = function () {
            var rad = Math.random() * 3000;
            console.log("food:" + rad);
            for (var i = 0; i < 1000; ++i) {
                var x1 = Math.random() * 4800;
                var y1 = Math.random() * 8000;
                var c = Math.random() * 255 * 255 * 255;
                this.gameProxy.setFood(x1, y1, i, 5);
                this.view.drawRound(x1, y1, 5, i);
            }
            var hide = Math.random() * 50;
            console.log("hide" + hide);
            for (var j = 0; j < hide; ++j) {
                var x2 = Math.random() * 4700;
                var y2 = Math.random() * 7900;
                this.gameProxy.setHide(x2, y2, this.gameProxy.getHideRad());
                this.view.drwaHideArea(x2, y2, this.gameProxy.getHideRad());
            }
            this.view.m_main.setChildIndex(this.view.map, 2);
        };
        __egretProto__.angleView = function (cen_x, cen_y) {
            var food = this.gameProxy.getFood();
            for (var i in food) {
                var food_x = food[i][0];
                var food_y = food[i][1];
                if (cen_x - 240 < food_x && food_x < cen_x + 240 && cen_y - 400 < food_y && food_y < cen_y + 400) {
                    this.view.drawRound(food_x, food_y, food[i][2], i);
                }
            }
        };
        //初始化活动和场景的监听
        __egretProto__.init_listener = function () {
            this.view.fenli.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fen, this);
            this.view.addEventListener(egret.TouchEvent.TOUCH_TAP, this.newCenter, this);
        };
        __egretProto__.broken = function () {
            for (var i = 0; i < 3; i++) {
                this.newUser(0);
                for (var j = 0; j < this.gameProxy.getUserNum() - 1; j++) {
                    this.newUser(j);
                }
            }
        };
        __egretProto__.fen = function (evt) {
            console.log("分离");
            evt.stopImmediatePropagation();
            evt.stopPropagation();
            // if(this.gameProxy.getUserData()[0][1]>35){
            this.newUser(0); //从主圆0分裂
            //      }     
        };
        __egretProto__.newUser = function (k) {
            var i = this.gameProxy.getUserNum() - 1;
            var rad = this.gameProxy.getUserData()[k][2];
            var new_r = Math.sqrt(rad * rad / 2);
            this.gameProxy.setUserDataRad(k, new_r);
            this.view.user[k][0].width = new_r * 2;
            this.view.user[k][0].height = new_r * 2;
            this.view.user[k][1].size = new_r * 0.5 + 10;
            var data = new Array();
            var new_x = this.view.user[k][0].x;
            var new_y = this.view.user[k][0].y;
            //var new_cen = new egret.Point(new_x - this.view.map.x,new_y - this.view.map.y);
            data.push(new_x - this.view.map.x, new_y - this.view.map.y, new_r);
            this.gameProxy.setUserData(data);
            var data = this.view.drawUser(new_x, new_y, new_r, "s1_png", this.gameProxy.getUserName());
            this.view.user.push(data);
            this.view.addUser(i + 1);
            this.he_bing = false;
            egret.clearTimeout(this.time); //重新计时
            this.gameProxy.setUserNum(this.gameProxy.getUserNum() + 1);
            this.sendNotification(agar.GameProxy.FENLIE, i + 1);
        };
        __egretProto__.newCenter = function (event) {
            var NEW_X = event.stageX - this.view.map.x;
            var NEW_Y = event.stageY - this.view.map.y;
            if (NEW_X < 0)
                this.NEW_X = 0;
            if (NEW_X > 4800)
                this.NEW_X = 4800;
            if (NEW_Y < 0)
                this.NEW_Y = 0;
            if (NEW_Y > 8000)
                this.NEW_Y = 8000;
            var cen_x = this.gameProxy.getUserData()[0][0];
            var cen_y = this.gameProxy.getUserData()[0][1];
            var angleSpeed = Math.atan2(NEW_Y - cen_y, NEW_X - cen_x);
            angleSpeed = Math.round(angleSpeed * 10000) / 10000;
            this.gameProxy.setAngleSpeed(angleSpeed);
            this.sendNotification(agar.GameProxy.NEXT_CENTER);
            //  console.log("发送消息",this.NEW_X,this.NEW_Y);
            //   console.log(this.gameProxy.getRoundRad());
            //  console.log(this.gameProxy.getRoundCenterX(),this.gameProxy.getRoundCenterY());
        };
        __egretProto__.robot = function () {
            for (var i = 1000; i < 1100; i++) {
                var x = Math.random() * 4000, y = Math.random() * 5000;
                var data = this.view.drawUser(x, y, 25, "s3_png", i.toString());
                this.gameProxy.setFood(x, y, i, 25);
                this.view.food[i] = data;
                this.view.map.addChild(this.view.food[i][0]);
                this.view.map.addChild(this.view.food[i][1]);
                //this.ai(x,y,i);
                var x1 = Math.random() * 4000, y1 = Math.random() * 5000, angleSpeed = Math.atan2(y1 - y, x1 - x);
                angleSpeed = Math.round(angleSpeed * 10000) / 10000;
                this.gameProxy.getFood()[i][4] = angleSpeed;
            }
        };
        __egretProto__.foodMove = function () {
            for (var k = 1000; k < this.gameProxy.getFood().length; k++) {
                if (this.gameProxy.getFood()[k] != 0) {
                    var angleSpeed = this.gameProxy.getFood()[k][4];
                    var vx = Math.round(Math.cos(angleSpeed) * 3 * 10000) / 10000;
                    var vy = Math.round(Math.sin(angleSpeed) * 3 * 10000) / 10000;
                    var new_x = this.gameProxy.getFood()[k][0] + vx, new_y = this.gameProxy.getFood()[k][1] + vy, new_r = this.gameProxy.getFood()[k][2];
                    if (new_x < 10)
                        new_x = 10;
                    if (new_x > 4700)
                        new_x = 4700;
                    if (new_y < 10)
                        new_y = 10;
                    if (new_y > 7900)
                        new_y = 7900;
                    this.view.food[k][0].x = new_x;
                    this.view.food[k][0].y = new_y;
                    this.view.food[k][1].x = new_x;
                    this.view.food[k][1].y = new_y;
                    this.gameProxy.setFood(new_x, new_y, k, new_r);
                    this.gameProxy.getFood()[k][4] = angleSpeed;
                    this.sendNotification(agar.GameProxy.ROUND_EAT, k);
                }
            }
        };
        __egretProto__.ai = function () {
            for (var i = 1000; i < this.gameProxy.getFood().length; i++) {
                if (this.gameProxy.getFood()[i] != 0) {
                    var x1 = Math.random() * 4500, y1 = Math.random() * 7000, x = this.gameProxy.getFood()[i][0], y = this.gameProxy.getFood()[i][1], angleSpeed = Math.atan2(y1 - y, x1 - x);
                    angleSpeed = Math.round(angleSpeed * 10000) / 10000;
                    this.gameProxy.getFood()[i][4] = angleSpeed;
                }
            }
        };
        MainScreenMediator.NAME = "MainScreenMediator";
        return MainScreenMediator;
    })(puremvc.Mediator);
    agar.MainScreenMediator = MainScreenMediator;
    MainScreenMediator.prototype.__class__ = "agar.MainScreenMediator";
})(agar || (agar = {}));
