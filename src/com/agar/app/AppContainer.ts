/**
*   @desc view层viewroot,用于界面变换
*   @date 2015.08.03
*   @author zen
**/
module agar {

	export class AppContainer extends egret.gui.UIStage{

        public allScreen : any;

		public constructor(){
			super();

            this.allScreen = {
                //主场景
                "loginScreen"         : LoginScreen ,//主页
                "mainScreen"          : MainScreen ,//创建角色
                "endScreen"           : EndScreen ,//主页         
            };

		}

        public enterScreen(screenName : string) : void
        {
            var screen : egret.gui.SkinnableComponent = <egret.gui.SkinnableComponent><any> new this.allScreen[screenName];
            
            if(this.numElements > 0){
                var last = this.removeElementAt(0);
            }

            this.addElementAt(screen,0);
            
            if(!screen.initialized){
                screen.validateNow();
            }

        }



        /**
         * 加载进度条
         */
        private poploading : PopLoading;

        public showLoading() : void
        {
            if(!this.poploading){
                this.poploading = new PopLoading();
            }
            
            egret.gui.PopUpManager.addPopUp(this.poploading,true);

            if(!this.poploading.initialized){
                this.poploading.validateNow();
            }
        }

        public hideLoading() : void
        {
            egret.gui.PopUpManager.removePopUp(this.poploading);
        }

	}
}