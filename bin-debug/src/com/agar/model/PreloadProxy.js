/**
*   @author zen
*   @date 2015.08.03
*   @desc 预加载处理
**/
var agar;
(function (agar) {
    var PreloadProxy = (function (_super) {
        __extends(PreloadProxy, _super);
        function PreloadProxy() {
            _super.call(this, PreloadProxy.NAME);
            this.loadIndex = 0;
        }
        var __egretProto__ = PreloadProxy.prototype;
        //加载
        __egretProto__.loadScreenAssets = function (screen) {
            this.loadIndex = 0;
            this.loadScreen = screen;
            if (agar.AppConfig.depends[screen]) {
                this.loadAssets = agar.AppConfig.depends[screen].concat();
            }
            else {
                this.loadAssets = [];
            }
            if (this.loadAssets.length == 0) {
                this.sendNotification(agar.SceneCommand.RESOURSE_COMPLETE, { "screen": screen });
            }
            else {
                this.load(this.loadAssets[this.loadIndex]);
            }
        };
        __egretProto__.load = function (asset) {
            this.sendNotification(PreloadProxy.RESET_PROGRESS);
            var arr = asset.split(".");
            var newtype = arr[0];
            switch (newtype) {
                case "assets":
                    this.loadRes(arr[1]);
                    break;
            }
        };
        /**
        * 加载美术资源
        *
        **/
        __egretProto__.loadRes = function (group) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            if (RES.isGroupLoaded(group)) {
                this.onResourceLoadComplete(null);
            }
            else {
                RES.loadGroup(group);
            }
        };
        __egretProto__.onResourceLoadComplete = function (evt) {
            this.loadIndex++;
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            this.sendNotification(PreloadProxy.TOTAL_PROGRESS, { "p": this.loadIndex, "t": this.loadAssets.length });
            if (!this.checkFinished()) {
                this.load(this.loadAssets[this.loadIndex]);
            }
            else {
                this.sendNotification(PreloadProxy.COMPE_PROGRESS, { "screen": this.loadScreen, "data": this.obj });
            }
        };
        __egretProto__.onResourceProgress = function (evt) {
            this.sendNotification(PreloadProxy.SUB_PROGRESS, { "p": evt.itemsLoaded, "t": evt.itemsTotal });
        };
        __egretProto__.checkFinished = function () {
            if (this.loadIndex < this.loadAssets.length) {
                return false;
            }
            else {
                return true;
            }
        };
        PreloadProxy.NAME = "PreloadProxy";
        PreloadProxy.TOTAL_PROGRESS = "total_progress";
        PreloadProxy.SUB_PROGRESS = "sub_progress";
        PreloadProxy.RESET_PROGRESS = "reset_progress";
        PreloadProxy.COMPE_PROGRESS = "compe_progress";
        return PreloadProxy;
    })(puremvc.Proxy);
    agar.PreloadProxy = PreloadProxy;
    PreloadProxy.prototype.__class__ = "agar.PreloadProxy";
})(agar || (agar = {}));
