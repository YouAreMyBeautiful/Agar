/**
 *圆移动命令
 */
module agar{
    export class RoundMoveCommand extends puremvc.SimpleCommand implements puremvc.ICommand {
        public static NAME: string = "RoundMoveCommand";
        private gameProxy: GameProxy;
        public constructor() {
            super();
        }
        public register(): void {
            this.facade.registerCommand(GameProxy.NEXT_CENTER,RoundMoveCommand);
            this.facade.registerCommand(GameProxy.FENLIE,RoundMoveCommand);
            this.facade.registerCommand(GameProxy.HEBING,RoundMoveCommand);
        }        
        public execute(notification: puremvc.INotification): void {
            var data = notification.getBody();
            this.gameProxy = <GameProxy><any>(this.facade.retrieveProxy(GameProxy.NAME)); 
            var v=this.gameProxy.getSpeed();         
            switch(notification.getName()) {
                
                case GameProxy.NEXT_CENTER: {
                    
                    var angleSpeed = this.gameProxy.getAngleSpeed();
                    var x1:number=Math.round(Math.cos(angleSpeed)*v*10000)/10000;
                    var y1:number=Math.round(Math.sin(angleSpeed)*v*10000)/10000;
                    this.sendNotification(GameProxy.ROUND_MOVE,[x1,y1]);
                    break;
                }
                case GameProxy.FENLIE:{                                        
                    var angleSpeed = this.gameProxy.getAngleSpeed();
                    var x1:number=Math.round(Math.cos(angleSpeed)*2*v*10000)/10000;
                    var y1:number=Math.round(Math.sin(angleSpeed)*2*v*10000)/10000;
                    this.sendNotification(GameProxy.FENLIE_MOVE,[data,x1,y1]);
                    break;
                }
                case GameProxy.HEBING:{
                    var cen_x = this.gameProxy.getUserData()[0][0];
                    var cen_y = this.gameProxy.getUserData()[0][1];
                    var cen_r = this.gameProxy.getUserData()[0][2];
                     
                    var x = this.gameProxy.getUserData()[data][0];
                    var y = this.gameProxy.getUserData()[data][1];
                    var r = this.gameProxy.getUserData()[data][2];
                    
                    var angleSpeed = Math.atan2(cen_y - y,cen_x - x);
                    angleSpeed = Math.round(angleSpeed * 10000) / 10000;
                    var vx: number = Math.round(Math.cos(angleSpeed) * 2*10000)/10000;
                    var vy: number = Math.round(Math.sin(angleSpeed) * 2*10000)/10000;
                    this.sendNotification(GameProxy.HEBING_USER,[data,vx,vy]);
                    
                }
            }
        }
       
          
    }
}