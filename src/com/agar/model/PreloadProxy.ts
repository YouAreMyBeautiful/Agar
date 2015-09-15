/**
*   @author zen
*   @date 2015.08.03
*   @desc 预加载处理
**/
module agar {

	export class PreloadProxy extends puremvc.Proxy implements puremvc.IProxy
    {
		public static NAME : string = "PreloadProxy";

		public static TOTAL_PROGRESS : string = "total_progress";
		public static SUB_PROGRESS : string = "sub_progress";
		public static RESET_PROGRESS : string = "reset_progress";
		public static COMPE_PROGRESS : string = "compe_progress";

		private loadAssets : string[];
		private loadScreen : string;
		private loadIndex : number = 0;
        private obj : any;//传递进来的参数
		


		public constructor(){
			super(PreloadProxy.NAME);
		}

		//加载
		public loadScreenAssets(screen : string) : void
        {
			this.loadIndex = 0;
			this.loadScreen = screen;

            if(AppConfig.depends[screen]){
                this.loadAssets = AppConfig.depends[screen].concat();
            }else{
                this.loadAssets = [];
            }

			if(this.loadAssets.length == 0){
	            this.sendNotification(SceneCommand.RESOURSE_COMPLETE, {"screen" : screen});
			}else{
				this.load(this.loadAssets[this.loadIndex]);
			}
		}

		private load(asset : string) : void
        {
			this.sendNotification(PreloadProxy.RESET_PROGRESS);

			var arr : string[] = asset.split(".");
			var newtype = arr[0];

			switch(newtype){
				case "assets":
					this.loadRes(arr[1])
					break;
			}
		}
		/**
		* 加载美术资源
		*
		**/
		private loadRes(group : string) : void
        {
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);

			if(RES.isGroupLoaded(group)){
				this.onResourceLoadComplete(null);
			}else{
				RES.loadGroup(group);
			}
		}

		private onResourceLoadComplete(evt : RES.ResourceEvent) : void
        {
			this.loadIndex ++ ;

			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);

			this.sendNotification(PreloadProxy.TOTAL_PROGRESS, {"p" : this.loadIndex, "t" : this.loadAssets.length});

			if(!this.checkFinished()){
				this.load(this.loadAssets[this.loadIndex]);
			}else{
				this.sendNotification(PreloadProxy.COMPE_PROGRESS, {"screen" : this.loadScreen, "data" : this.obj});
			}
		}

		private onResourceProgress(evt:RES.ResourceEvent) : void
        {
			this.sendNotification(PreloadProxy.SUB_PROGRESS, {"p" : evt.itemsLoaded, "t" : evt.itemsTotal});
		}

		private checkFinished() : boolean
        {
			if(this.loadIndex < this.loadAssets.length){
				return false;
			}else{
				return true;
			}
		}
		
	}
}

