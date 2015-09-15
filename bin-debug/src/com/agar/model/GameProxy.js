/**
*   @author zen
*   @date 2015.08.03
*   @desc 游戏通用数据
*
**/
var agar;
(function (agar) {
    var QuadRect = function (left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    };
    var QuadNode = function () {
        //        this.MAX_OBJECT = 10;        //最大对象数
        //        this.MAX_LEAVE = 5;          //四叉树最大层数
        this.rect = null;
        this.data = new Array(); //相关对象
        this.childs = null; //四个子节点，没有就是null
    };
    var QuadTree = function () {
        this.root = new QuadNode(); //根节点
    };
    var GameProxy = (function (_super) {
        __extends(GameProxy, _super);
        function GameProxy() {
            _super.call(this, GameProxy.NAME);
            this.ROUND_CENTER_X = 240;
            this.ROUND_CENTER_Y = 400;
            this.ROUND_RAD = 25; //半径
            this.HIDE_RAD = 70;
            this.SPEED = 6; //速度
            this.FOOD = new Array(); //食物的位置
            this.HIDE = new Array();
            this.USER_NUM = 1; //表示分裂成了几个圆
            //用户数据为二维数组，每行表示分裂成的每个圆的信息，round_center,rad
            this.user_data = new Array(); //用户数据
            this.food_data = new Array(); //食物数据
            this.g_tree = new QuadTree(); //四叉树
            this.user_node = new Array(); //玩家上一次节点
            var rec = new QuadRect(0, 0, 4800, 8000);
            this.quadTreeBuild(4, rec); //初始化满四叉树
        }
        var __egretProto__ = GameProxy.prototype;
        __egretProto__.getIndex = function (x, y, rad, rect) {
            var index = -1, verticalMidpoint = (rect.left + rect.right) / 2, horizontalMidpoint = (rect.top + rect.bottom) / 2, topQuadrant = (y + rad < horizontalMidpoint), bottomQuadrant = (y - rad > horizontalMidpoint), leftQuadrant = (x + rad < verticalMidpoint), rightQuadrant = (x - rad > verticalMidpoint); //右象限 
            //            if(rect.left < x && x < rect.right && rect.top < y && y < rect.bottom) {
            //                index = 5;//在rect内,但是在轴上，加入父节点
            if (rightQuadrant) {
                if (topQuadrant) {
                    index = 0; //一象限
                }
                else if (bottomQuadrant) {
                    index = 3; //四象限
                }
            }
            else if (leftQuadrant) {
                if (topQuadrant) {
                    index = 1; //二象限
                }
                else if (bottomQuadrant) {
                    index = 2; //三象限
                }
            }
            //       }           
            return index;
        };
        __egretProto__.insertQuadTree = function (data, quadNode) {
            var rect = quadNode.rect;
            if (quadNode.childs != null) {
                var index = this.getIndex(data[0], data[1], data[2], rect);
                if (index != -1)
                    this.insertQuadTree(data, quadNode.childs[index]);
                else
                    quadNode.data.push(data);
                return;
            }
            quadNode.data.push(data);
        };
        __egretProto__.quadTreeBuild = function (depth, rect) {
            this.quadCreateBranch(this.g_tree.root, depth, rect);
        };
        __egretProto__.quadCreateBranch = function (node, depth, rect) {
            if (depth !== 1) {
                node.rect = rect;
                node.childs = [new QuadNode(), new QuadNode(), new QuadNode(), new QuadNode()];
                var childsRect = this.rectSubdivide(rect);
                this.quadCreateBranch(node.childs[0], depth - 1, childsRect[0]);
                this.quadCreateBranch(node.childs[1], depth - 1, childsRect[1]);
                this.quadCreateBranch(node.childs[2], depth - 1, childsRect[2]);
                this.quadCreateBranch(node.childs[3], depth - 1, childsRect[3]);
            }
        };
        __egretProto__.rectSubdivide = function (rect) {
            var firstRect = new QuadRect((rect.left + rect.right) / 2, rect.top, rect.right, (rect.top + rect.bottom) / 2);
            var secondRect = new QuadRect(rect.left, rect.top, (rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2);
            var thirdRect = new QuadRect(rect.left, (rect.top + rect.bottom) / 2, (rect.left + rect.right) / 2, rect.bottom);
            var fourthRect = new QuadRect((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2, rect.right, rect.bottom);
            return [firstRect, secondRect, thirdRect, fourthRect];
        };
        __egretProto__.retriveObject = function (data, node, returnObjects) {
            if (node.childs != null) {
                var index = this.getIndex(data[0], data[1], data[2], node.rect);
                if (index != -1) {
                    this.retriveObject(data, node.childs[index], returnObjects);
                }
                else {
                    this.retriveObject1(data, node, returnObjects);
                }
            }
            for (var i in node.data) {
                if (node.data[i] != data && node.data[i].length != 3) {
                    returnObjects.push(node.data[i]);
                }
            }
        };
        __egretProto__.retriveObject1 = function (data, node, returnObjects) {
            for (var i in node.data) {
                if (node.data[i] != data && node.data[i].length != 3) {
                    returnObjects.push(node.data[i]);
                }
            }
            if (node.childs != null) {
                for (var j = 0; j < 4; j++) {
                    this.retriveObject1(data, node.childs[j], returnObjects);
                }
            }
        };
        __egretProto__.retriveUser = function (data, node) {
            if (node.childs != null && index != -1) {
                var index = this.getIndex(data[0], data[1], data[2], node.rect);
                this.retriveUser(data, node.childs[index]);
            }
            this.user_node.push(node);
        };
        __egretProto__.removeQuadNode = function (data, node) {
            if (node.childs == null) {
                for (var i in node.data) {
                    if (data == node.data[i])
                        node.data.splice(i, 1);
                }
            }
            else {
                var index = this.getIndex(data[0], data[1], data[2], node.rect);
                if (index != -1) {
                    this.removeQuadNode(data, node.childs[index]);
                }
                else {
                    for (var i in node.data) {
                        if (data == node.data[i])
                            node.data.splice(i, 1);
                    }
                }
            }
        };
        __egretProto__.init = function () {
            // var round_center = new egret.Point(240,400);
            var data = new Array();
            data[0] = this.ROUND_CENTER_X;
            data[1] = this.ROUND_CENTER_Y;
            data[2] = this.ROUND_RAD;
            this.user_data.push(data);
            this.insertQuadTree(data, this.g_tree.root);
            // this.retriveUser(data,this.g_tree.root);
        };
        __egretProto__.setHide = function (x, y, r) {
            var f = new Array();
            f[0] = x;
            f[1] = y;
            f[2] = r;
            this.HIDE.push(f);
        };
        __egretProto__.setUserData = function (data) {
            this.user_data.push(data);
            this.insertQuadTree(data, this.g_tree.root); //把用户插入四叉树
        };
        __egretProto__.setUserNum = function (n) {
            this.USER_NUM = n;
        };
        __egretProto__.setUserName = function (name) {
            this.user_name = name;
        };
        __egretProto__.setUserDataCenter = function (i, cen_x, cen_y) {
            this.removeQuadNode(this.user_data[i], this.g_tree.root);
            this.user_data[i][0] = cen_x;
            this.user_data[i][1] = cen_y;
            this.insertQuadTree(this.user_data[i], this.g_tree.root);
        };
        __egretProto__.setUserDataRad = function (i, rad) {
            this.removeQuadNode(this.getUserData()[i], this.g_tree.root);
            this.user_data[i][2] = rad;
            this.insertQuadTree(this.user_data[i], this.g_tree.root);
        };
        __egretProto__.setFood = function (post_x, post_y, num, rad) {
            if (this.FOOD[num]) {
                this.removeQuadNode(this.FOOD[num], this.g_tree.root);
            }
            var f = new Array();
            f[0] = post_x;
            f[1] = post_y;
            f[2] = rad;
            f[3] = num;
            //this.FOOD.push(f);
            this.FOOD[num] = f;
            this.insertQuadTree(f, this.g_tree.root); //把food插入四叉树
        };
        __egretProto__.setSpeed = function (speed) {
            this.SPEED = speed;
        };
        __egretProto__.setAngleSpeed = function (v) {
            this.angleSpeed = v;
        };
        __egretProto__.setRoundCenter = function (round_center_x, round_center_y) {
            this.ROUND_CENTER_X = round_center_x;
            this.ROUND_CENTER_Y = round_center_y;
        };
        __egretProto__.setRoundRad = function (round_rad) {
            this.ROUND_RAD = round_rad;
        };
        //        public getRoundCenterX(): number {
        //            return this.ROUND_CENTER_X;
        //        }
        //        public getRoundCenterY(): number{
        //            return this.ROUND_CENTER_Y;
        //        }
        __egretProto__.getAngleSpeed = function () {
            return this.angleSpeed;
        };
        __egretProto__.getSpeed = function () {
            return this.SPEED;
        };
        //        public getRoundRad(): number {
        //            return this.ROUND_RAD;
        //        }
        __egretProto__.getFood = function () {
            return this.FOOD;
        };
        __egretProto__.getImpactFood = function () {
        };
        __egretProto__.getUserName = function () {
            return this.user_name;
        };
        __egretProto__.getUserNum = function () {
            return this.USER_NUM;
        };
        __egretProto__.getUserData = function () {
            return this.user_data;
        };
        __egretProto__.getHide = function () {
            return this.HIDE;
        };
        __egretProto__.getHideRad = function () {
            return this.HIDE_RAD;
        };
        __egretProto__.deleteUser = function (i) {
            this.user_data.splice(i, 1);
        };
        __egretProto__.deleteFood = function (i) {
            this.removeQuadNode(this.FOOD[i], this.g_tree.root);
            this.FOOD.splice(i, 1, 0);
        };
        GameProxy.NAME = "GameProxy";
        GameProxy.ROUND_MOVE = "ROUND_MOVE";
        GameProxy.NEW_CENTER = "NEW_CENTER";
        GameProxy.NEXT_CENTER = "NEXT_CENTER";
        GameProxy.ROUND_EAT = "ROUND_EAT";
        GameProxy.ROUND_HIDE = "ROUND_HIDE";
        GameProxy.FEN = "FEN";
        GameProxy.FENLIE = "FENLIE";
        GameProxy.FENLIE_MOVE = "FENLIE_MOVE";
        GameProxy.EAT = "EAT";
        GameProxy.USER_NAME = "USER_NAME";
        GameProxy.HEBING = "HEBING";
        GameProxy.HEBING_USER = "HEBING_USER";
        GameProxy.FOOD_EAT = "FOOD_EAT";
        return GameProxy;
    })(puremvc.Proxy);
    agar.GameProxy = GameProxy;
    GameProxy.prototype.__class__ = "agar.GameProxy";
})(agar || (agar = {}));
