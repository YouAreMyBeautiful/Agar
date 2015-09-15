/**
 * 项目基本配置
 * @date 2015.08.03
 * @author zen
 **/
var agar;
(function (agar) {
    var AppConfig = (function () {
        function AppConfig() {
        }
        var __egretProto__ = AppConfig.prototype;
        AppConfig.depends = {};
        return AppConfig;
    })();
    agar.AppConfig = AppConfig;
    AppConfig.prototype.__class__ = "agar.AppConfig";
})(agar || (agar = {}));
