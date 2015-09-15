/**
*   @author zen
*   @date 2015.08.03
*   @desc 游戏通用数据
*   
**/

module agar {
    var QuadRect=function(left,top,right,bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    };
    var QuadNode = function() {
//        this.MAX_OBJECT = 10;        //最大对象数
//        this.MAX_LEAVE = 5;          //四叉树最大层数
        this.rect = null;          
        this.data = new Array();    //相关对象
        this.childs = null;         //四个子节点，没有就是null
    };
    var QuadTree = function() {
        this.root = new QuadNode();     //根节点
     
    };
	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy
    {
		public static NAME: string = "GameProxy";
        public static ROUND_MOVE: string = "ROUND_MOVE";
        public static NEW_CENTER: string = "NEW_CENTER";
        public static NEXT_CENTER: string = "NEXT_CENTER";
        public static ROUND_EAT:string="ROUND_EAT";
        public static ROUND_HIDE:string="ROUND_HIDE";
        public static FEN:string="FEN";
        public static FENLIE: string = "FENLIE";
        public static FENLIE_MOVE: string = "FENLIE_MOVE";
        public static EAT:string="EAT";
        public static USER_NAME: string = "USER_NAME";
        public static HEBING: string = "HEBING";
        public static HEBING_USER: string = "HEBING_USER";
        public static FOOD_EAT:string="FOOD_EAT";
        private ROUND_CENTER_X:number=240;
        private ROUND_CENTER_Y: number=400;
        private ROUND_RAD: number=25;//半径
        private HIDE_RAD: number = 70;
      //  private NEW_X: number;
     
        private angleSpeed:number;//角速度
        private SPEED: number=6;//速度
        private FOOD=new Array();//食物的位置
        private HIDE=new Array();
        private USER_NUM:number=1;//表示分裂成了几个圆
        //用户数据为二维数组，每行表示分裂成的每个圆的信息，round_center,rad
        private user_data = new Array();//用户数据
        private food_data = new Array();//食物数据
        public g_tree = new QuadTree();//四叉树
        public user_node = new Array();//玩家上一次节点
        private user_name: string;
        private user_id: number;
        public constructor() {
            super(GameProxy.NAME);
            var rec = new QuadRect(0,0,4800,8000);
            this.quadTreeBuild(4,rec);//初始化满四叉树
        }
  public getIndex(x:number,y:number,rad:number,rect):number {//获取象限
            var index = -1,
                verticalMidpoint = (rect.left + rect.right) / 2,//垂直中点
                horizontalMidpoint = (rect.top + rect.bottom) / 2,//水平中点
                topQuadrant = (y + rad < horizontalMidpoint),//顶象限
                bottomQuadrant = (y - rad > horizontalMidpoint),//底象限
                leftQuadrant = (x + rad < verticalMidpoint),//左象限
                rightQuadrant = (x-rad>verticalMidpoint);//右象限 
//            if(rect.left < x && x < rect.right && rect.top < y && y < rect.bottom) {
//                index = 5;//在rect内,但是在轴上，加入父节点
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
     //       }           
            return index;
        }
        public insertQuadTree(data,quadNode){
            var rect = quadNode.rect;                       
            if(quadNode.childs != null) {
                var  index = this.getIndex(data[0],data[1],data[2],rect);
                if(index !=-1) 
                    this.insertQuadTree(data,quadNode.childs[index]);
                else
                    quadNode.data.push(data);
                         return;                  
            }
            quadNode.data.push(data);
    }
  public quadTreeBuild(depth,rect) {//建树
        this.quadCreateBranch(this.g_tree.root,depth,rect);
         }
    public quadCreateBranch(node,depth,rect) {//建立子节点
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

   public rectSubdivide(rect) {//将父节点分隔成四个象限
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
    
   public retriveObject(data,node,returnObjects) {
    if(node.childs!=null){
            var index = this.getIndex(data[0],data[1],data[2],node.rect);
            if(index != -1) {
                this.retriveObject(data,node.childs[index],returnObjects);
            }
            else{
                this.retriveObject1(data,node,returnObjects);
            }
   }
    
           for(var i in node.data) {
               if(node.data[i] != data&&node.data[i].length!=3) {//
                   returnObjects.push(node.data[i]);    
               }
           }
           
   }  
   public retriveObject1(data,node,returnObjects){
        for(var i in node.data) {
               if(node.data[i] != data&&node.data[i].length!=3) {//
                   returnObjects.push(node.data[i]);    
               }
           }
        if(node.childs!=null){
            for(var j=0;j<4;j++){
                this.retriveObject1(data,node.childs[j],returnObjects);
            }
        }
    
   }   
   public retriveUser(data,node) {
       if(node.childs!=null&&index != -1){
            var index = this.getIndex(data[0],data[1],data[2],node.rect);
            
                this.retriveUser(data,node.childs[index]);
            } 
                this.user_node.push(node);
   }
   public removeQuadNode(data,node) {
           
       if(node.childs == null) {
           for(var i in node.data) {
               if(data == node.data[i])
                   node.data.splice(i,1);
           }
       } else {
           var index = this.getIndex(data[0],data[1],data[2],node.rect);
           if(index != -1) {
               this.removeQuadNode(data,node.childs[index]);
           } else {
                    for(var i in node.data) {
                        if(data == node.data[i])
                            node.data.splice(i,1);
                        }
           }
       }
       
   }
        public init(){
           // var round_center = new egret.Point(240,400);
           
            var data = new Array();
            data[0] = this.ROUND_CENTER_X;
            data[1] = this.ROUND_CENTER_Y;
            data[2] = this.ROUND_RAD;
            this.user_data.push(data);
            this.insertQuadTree(data,this.g_tree.root);
         // this.retriveUser(data,this.g_tree.root);
      

        }
        public setHide(x:number,y:number,r:number){
           var f=new Array();
           f[0]=x;
           f[1]=y;
           f[2]=r;
            this.HIDE.push(f);
        }
        public setUserData(data){
            this.user_data.push(data);
            this.insertQuadTree(data,this.g_tree.root);//把用户插入四叉树
        }
        public setUserNum(n:number){
            this.USER_NUM = n;
        }
        public setUserName(name:string){
            this.user_name = name;
        }
        public setUserDataCenter(i:number,cen_x:number,cen_y:number){
            
            this.removeQuadNode(this.user_data[i],this.g_tree.root);
            
            this.user_data[i][0] = cen_x;
            this.user_data[i][1] = cen_y;
            
            this.insertQuadTree(this.user_data[i],this.g_tree.root);
        }
        public setUserDataRad(i: number,rad: number) {
            this.removeQuadNode(this.getUserData()[i],this.g_tree.root);
            this.user_data[i][2] = rad;
            this.insertQuadTree(this.user_data[i],this.g_tree.root);
        }
        public setFood(post_x:number,post_y:number,num:number,rad:number):void{
             if(this.FOOD[num]){
             this.removeQuadNode(this.FOOD[num],this.g_tree.root);
         }
            var f=new Array();
            f[0]=post_x;
            f[1]=post_y;
            f[2]=rad;
            f[3]=num;
            //this.FOOD.push(f);
            this.FOOD[num]=f;
            this.insertQuadTree(f,this.g_tree.root);//把food插入四叉树
        }
        public setSpeed(speed: number): void {
            this.SPEED = speed;
        }
        public setAngleSpeed(v:number): void {
            this.angleSpeed = v;
        }
        public setRoundCenter(round_center_x:number,round_center_y:number): void {
            this.ROUND_CENTER_X = round_center_x;
            this.ROUND_CENTER_Y = round_center_y;
        }
        public setRoundRad(round_rad: number): void {
            this.ROUND_RAD = round_rad;
        }
//        public getRoundCenterX(): number {
//            return this.ROUND_CENTER_X;
//        }
//        public getRoundCenterY(): number{
//            return this.ROUND_CENTER_Y;
//        }
        public getAngleSpeed(): number {
            return this.angleSpeed;
        }
        public getSpeed(): number {
            return this.SPEED;
        }
//        public getRoundRad(): number {
//            return this.ROUND_RAD;
//        }
        public getFood(){
            return this.FOOD;
        }
        public getImpactFood() {
        }
        public getUserName():string{
            return this.user_name;
        }
        public getUserNum():number{
            return this.USER_NUM;
        }
        public getUserData(){
            return this.user_data;
        }
        public getHide(){
            return this.HIDE;
        }
        public getHideRad() {
            return this.HIDE_RAD;
        }
        public deleteUser(i:number){
            this.user_data.splice(i,1);
    }
        public deleteFood(i:number) {
             this.removeQuadNode(this.FOOD[i],this.g_tree.root);
            this.FOOD.splice(i,1,0);
        }
        
    }
}





