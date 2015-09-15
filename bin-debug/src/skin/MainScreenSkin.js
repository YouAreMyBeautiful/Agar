var skin;
(function (skin) {
    var MainScreenSkin = (function (_super) {
        __extends(MainScreenSkin, _super);
        function MainScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [800, 480]);
            this.elementsContent = [this.__3_i(), this.__4_i(), this.m_container_i(), this.fenli_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = MainScreenSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return MainScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__4_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["horizontalCenter", "text", "textColor", "top"], [0, "游戏主界面", 0xFFFFFF, 0]);
            return t;
        };
        __egretProto__.fenli_i = function () {
            var t = new egret.gui.EditableText();
            this.fenli = t;
            this.__s(t, ["bold", "editable", "height", "size", "text", "textColor", "touchEnabled", "verticalAlign", "width", "x", "y"], [true, false, 43, 35, "分离", 0xD41D1D, true, "middle", 80, 396, 754]);
            return t;
        };
        __egretProto__.m_container_i = function () {
            var t = new egret.gui.UIAsset();
            this.m_container = t;
            this.__s(t, ["height", "width", "x", "y"], [800, 480, 0, 0]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.Rect();
            this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x333333, 800, 480, 0, 0]);
            return t;
        };
        MainScreenSkin._skinParts = ["m_container", "fenli"];
        return MainScreenSkin;
    })(egret.gui.Skin);
    skin.MainScreenSkin = MainScreenSkin;
    MainScreenSkin.prototype.__class__ = "skin.MainScreenSkin";
})(skin || (skin = {}));
