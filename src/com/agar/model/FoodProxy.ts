module agar {
	/**
	 *
	 * @author 
	 *
	 */
    var QuadRect=function(left,top,right,bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    };
    var QuadNode = function() {
        this.rect = null;           //所表示的矩形区域
        this.data = new Array();           //相关数据
        this.childs = null;         //四个子节点，没有就是null
    };
    var QuadTree = function() {
        this.root = new QuadNode();     //根节点
        this.depth = 0;                 //数的深度
    };
	export class FoodProxy extends puremvc.Proxy implements puremvc.IProxy {
        public static NAME: string = "FoodProxy";
        public static EAT_FOOD:string ="EATFOOD";
        public static FIND_FOOD:string="FINDFOOD";
        
        private food = new Array();
        public g_tree = new QuadTree();
		public constructor() {
            super(FoodProxy.NAME);
            var rec = new QuadRect(0,0,4800,8000);
            this.quadTreeBuild(7,rec);
		}
        
        public setFood(x:number,y:number,rad:number) {
            var data = new Array();
            data[0] = x;
            data[1] = y;
            data[2] = rad;
            this.food.push(data);
            this.insertQuadTree(data,this.g_tree.root);
        }
        public getIndex(x:number,y:number,rad:number,rect):number {
            var index = -1,
                verticalMidpoint = (rect.left + rect.right) / 2,//垂直中点
                horizontalMidpoint = (rect.top + rect.bottom) / 2,//水平中点
                topQuadrant = (y + rad < horizontalMidpoint),//顶象限
                bottomQuadrant = (y - rad > horizontalMidpoint),//底象限
                leftQuadrant = (x + rad < verticalMidpoint),//左象限
                rightQuadrant = (x-rad>verticalMidpoint);//右象限 
            if(rect.left < x && x < rect.right && rect.top < y && y < rect.bottom) {
                index = 5;//在rect内,但是在轴上，加入父节点
                if(rightQuadrant) {
                    if(topQuadrant) {
                        index = 0;//一象限
                    } else if(bottomQuadrant) {
                        index = 3;//四象限
                    }
                }
                else if(leftQuadrant){
                    if(topQuadrant) {
                        index = 1;//二象限
                    }
                    else if(bottomQuadrant) {
                        index = 2;//三象限
                    }
                }                  
            }           
            return index;
        }
        public insertQuadTree(data,quadNode){
            var rect = quadNode.rect;           
             
              if(quadNode.childs == null) {
                  quadNode.data.push(data);
                  return;
              }
              else {
                 var  index = this.getIndex(data[0],data[1],data[2],rect);
                  if(index !=-1) {
                      if(index != 5) {
                          this.insertQuadTree(data,quadNode.childs[index]);
                          return;
                      } else {
                        quadNode.data.push(data);
                        return;
                      }
                  }
              }

            
        }
       public quadTreeBuild(depth,rect) {
        this.g_tree.depth = depth;
        this.quadCreateBranch(this.g_tree.root,depth,rect);
    }
        /**
    * [quadCreateBranch 递归方式创建给定节点的子节点]
    * @param  {[QuadNode]} node  [需要创建子节点的节点]
    * @param  {[type]} depth [description]
    * @param  {[type]} rect  [description]
    * @return {[type]}       [description]
    */
    public quadCreateBranch(node,depth,rect) {
        if(depth !== 1) {
            node.rect = rect;
            node.childs = [new QuadNode(),new QuadNode(),new QuadNode(),new QuadNode()];

            var childsRect = this.rectSubdivide(rect);

                this.quadCreateBranch(node.childs[0],depth - 1,childsRect[0]);
                this.quadCreateBranch(node.childs[1],depth - 1,childsRect[1]);
                this.quadCreateBranch(node.childs[2],depth - 1,childsRect[2]);
                this.quadCreateBranch(node.childs[3],depth - 1,childsRect[3]);
        }
    }

   public rectSubdivide(rect) {
        var firstRect = new QuadRect(
            (rect.left + rect.right) / 2,rect.top,rect.right,(rect.top + rect.bottom) / 2
            );
        var secondRect = new QuadRect(
            rect.left,rect.top,(rect.left + rect.right) / 2,(rect.top + rect.bottom) / 2
            );
        var thirdRect = new QuadRect(
            rect.left,(rect.top + rect.bottom) / 2,(rect.left + rect.right) / 2,rect.bottom
            );
        var fourthRect = new QuadRect(
            (rect.left + rect.right) / 2,(rect.top + rect.bottom) / 2,rect.right,rect.bottom
            );

        return [firstRect,secondRect,thirdRect,fourthRect];
    }


	}
}
