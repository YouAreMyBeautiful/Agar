/**
*   @author zen
*   @date 2015.08.03
*   @desc 游戏界面
*
**/
var agar;
(function (agar) {
    var MainScreen = (function (_super) {
        __extends(MainScreen, _super);
        function MainScreen() {
            _super.call(this);
            this.map = new egret.Sprite();
            //舞台宽高
            this.stageW = 0;
            this.stageH = 0;
            this.rightBoundary = 0; //定义视口
            this.leftBoundary = 0;
            this.topBoundary = 0;
            this.bottomBoundary = 0;
            this.user = new Array(); //玩家圆
            this.food = new Array();
            this.skinName = skin.MainScreenSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }
        var __egretProto__ = MainScreen.prototype;
        __egretProto__.createCompleteEvent = function (event) {
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            this.m_main = new egret.DisplayObjectContainer;
            this.m_container.source = this.m_main;
            this.m_container.touchEnabled = true;
            //this.user_name.text = "";
            this.init();
            //  this.m_main.touchEnabled = true;
            //  this.map.touchEnabled = true;
            agar.ApplicationFacade.getInstance().registerMediator(new agar.MainScreenMediator(this));
        };
        __egretProto__.drawUser = function (cen_x, cen_y, rad, picture, name) {
            var shape = new egret.Bitmap();
            shape.texture = RES.getRes(picture);
            shape.x = cen_x;
            shape.y = cen_y;
            shape.width = 2 * rad;
            shape.height = 2 * rad;
            shape.anchorX = 0.5;
            shape.anchorY = 0.5;
            //  this.m_main.addChild(this.shape);
            var user_name = new egret.TextField();
            user_name.textColor = 0xffffff;
            user_name.text = name;
            user_name.size = rad / 2 + 10;
            user_name.x = cen_x;
            user_name.y = cen_y;
            user_name.anchorX = 0.5;
            user_name.anchorY = 0.5;
            var data = new Array();
            data[0] = shape;
            data[1] = user_name;
            return data;
            //this.user.push(data);
            //this.m_main.addChild(this.user[0][0]);
            //this.m_main.addChild(this.user[0][1]);
            //this.m_main.addChild(this.user_name);
        };
        __egretProto__.User = function (id, w, h) {
            this.user[id].width = w;
            this.user[id].height = h;
        };
        __egretProto__.addUser = function (id) {
            this.m_main.addChild(this.user[id][0]);
            this.m_main.addChild(this.user[id][1]);
        };
        __egretProto__.removeUser = function (id) {
            this.m_main.removeChild(this.user[id][0]);
            this.m_main.removeChild(this.user[id][1]);
            this.user.splice(id, 1);
        };
        __egretProto__.drawRound = function (cen_x, cen_y, rad, i) {
            this.round = new egret.Shape();
            var c = Math.random() * 255 * 255 * 255;
            this.round.graphics.beginFill(c, 1);
            this.round.graphics.drawCircle(cen_x, cen_y, rad);
            this.round.graphics.endFill();
            this.round.x = 0;
            this.round.y = 0;
            // this.m_main.addChild(this.round);
            this.map.addChild(this.round);
            //this.food.push(this.round);
            this.food[i] = this.round;
            //this.food.splice(i,1,this.round);
        };
        __egretProto__.drawMap = function (x, y) {
            var x1 = x - 240, y1 = y - 400;
            this.map.width = 4800;
            this.map.height = 8000;
            this.map.x -= x1;
            this.map.y -= y1;
            this.m_main.addChild(this.map);
        };
        __egretProto__.drwaHideArea = function (cen_x, cen_y, rad) {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x0ff00);
            shape.graphics.drawCircle(cen_x, cen_y, rad);
            //           shape.graphics.lineStyle(2,0x00ff00);
            //            shape.graphics.moveTo(cen_x + 50,cen_y);
            //           for(var i = 1;i < 36;i++) {
            //               var x1 = 55 * Math.cos(Math.PI / 18*i);
            //               var y1 = 55 * Math.sin(Math.PI / 18*i);
            //               shape.graphics.lineTo(cen_x + x1,cen_y + y1);
            //               
            //               var x2 = 50 * Math.cos(Math.PI / 18 * i + 1);
            //               var y2 = 50 * Math.sin(Math.PI / 18 * (i + 1));
            //               shape.graphics.lineTo(cen_x+x2,cen_y + y2);
            //           }
            shape.graphics.endFill();
            shape.x = 0;
            shape.y = 0;
            this.map.addChild(shape);
        };
        __egretProto__.init = function () {
            // this.m_main.setChildIndex(this.shape,2);
            console.log(_super.prototype.getChildIndex.call(this, this.map), _super.prototype.getChildIndex.call(this, this.shape), _super.prototype.getChildIndex.call(this, this.fenli)); //-1 -1 3                                    
        };
        __egretProto__.removeMediator = function () {
            agar.ApplicationFacade.getInstance().removeMediator(agar.MainScreenMediator.NAME);
        };
        return MainScreen;
    })(egret.gui.SkinnableComponent);
    agar.MainScreen = MainScreen;
    MainScreen.prototype.__class__ = "agar.MainScreen";
})(agar || (agar = {}));
