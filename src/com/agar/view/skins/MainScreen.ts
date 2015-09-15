/**
*   @author zen
*   @date 2015.08.03
*   @desc 游戏界面
*   
**/
module agar {

    export class MainScreen extends egret.gui.SkinnableComponent {
        public m_container : egret.gui.UIAsset;
        public m_main: egret.DisplayObjectContainer;
        private gameProxy: GameProxy;
        public shape: egret.Bitmap;//玩家每个圆的大小
        public round: egret.Shape;
        public map: egret.Sprite=new  egret.Sprite();
        public h: egret.Shape;
     //   public user_name: egret.TextField= new egret.TextField();
        public fenli: egret.gui.EditableText;
        //舞台宽高
        public  stageW:number = 0;
        public stageH:number = 0;
        
        private rightBoundary:number = 0;//定义视口
        private leftBoundary:number = 0;
        private topBoundary:number = 0;
        private bottomBoundary:number = 0;
        
        public user = new Array();//玩家圆
        public food = new Array();
      
        public constructor() {
            super();
            this.skinName = skin.MainScreenSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
                  
         }
        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            
            this.m_main = new egret.DisplayObjectContainer;
            this.m_container.source = this.m_main;
            this.m_container.touchEnabled = true;
            //this.user_name.text = "";
            this.init();
          //  this.m_main.touchEnabled = true;
          //  this.map.touchEnabled = true;
            
            ApplicationFacade.getInstance().registerMediator( new MainScreenMediator(this) );
        
        }
        public drawUser(cen_x:number,cen_y:number,rad:number,picture:string,name:string){
                var shape = new egret.Bitmap();
                shape.texture = RES.getRes(picture);
                shape.x = cen_x;
                shape.y = cen_y;
                shape.width = 2*rad;
                shape.height = 2*rad;
               shape.anchorX = 0.5;
                shape.anchorY = 0.5;
              //  this.m_main.addChild(this.shape);
                
            var user_name: egret.TextField= new egret.TextField();
              user_name.textColor = 0xffffff;
              user_name.text = name;
              user_name.size = rad/2+10;
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
            
             
            
        }
        
        public User(id: number,w: number,h: number) {
            this.user[id].width = w;
            this.user[id].height = h;
        }
        public addUser(id: number) {
            this.m_main.addChild(this.user[id][0]);
            this.m_main.addChild(this.user[id][1]);
        }
        public removeUser(id: number) {
            this.m_main.removeChild(this.user[id][0]);
            this.m_main.removeChild(this.user[id][1]);
            this.user.splice(id,1);
        }
       public drawRound(cen_x:number,cen_y:number,rad:number,i:number) {
           this.round = new egret.Shape();
            var c=Math.random()*255*255*255;
           this.round.graphics.beginFill(c,1);
           this.round.graphics.drawCircle(cen_x,cen_y,rad);
           this.round.graphics.endFill();
           this.round.x = 0;
           this.round.y = 0;
          // this.m_main.addChild(this.round);
           this.map.addChild(this.round);
           //this.food.push(this.round);
          this.food[i]=this.round;
        //this.food.splice(i,1,this.round);
        }
       public drawMap(x:number,y:number) {
           var x1 = x - 240,
               y1 = y - 400;           
            this.map.width = 4800;
            this.map.height = 8000;
            this.map.x -= x1;
            this.map.y -= y1;
            this.m_main.addChild(this.map);
        }
       public drwaHideArea(cen_x:number,cen_y:number,rad:number) {
           var shape: egret.Shape = new egret.Shape();
           shape.graphics.beginFill(0x0ff00);
           shape.graphics.drawCircle(cen_x,cen_y,rad);
           
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
            
       }
       public init() {
           // this.m_main.setChildIndex(this.shape,2);
           console.log(super.getChildIndex(this.map),super.getChildIndex(this.shape),super.getChildIndex(this.fenli))//-1 -1 3                                    
                
          }
        public removeMediator() : void
        {
            ApplicationFacade.getInstance().removeMediator(MainScreenMediator.NAME);
        }

    }
}