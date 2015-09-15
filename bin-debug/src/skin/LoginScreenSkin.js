var skin;
(function (skin) {
    var LoginScreenSkin = (function (_super) {
        __extends(LoginScreenSkin, _super);
        function LoginScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [800, 480]);
            this.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.m_start_btn_i(), this.watch_btn_i(), this.setting_btn_i(), this.__9_i(), this.user_name_i(), this.__10_i(), this.__11_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = LoginScreenSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return LoginScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__11_i = function () {
            var t = new egret.gui.EditableText();
            this.__s(t, ["editable", "fontFamily", "height", "size", "text", "textColor", "width", "x", "y"], [false, "圆体", 32, 25, "多人混战", 0, 193, 128, 170]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.Rect();
            this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x333333, 800, 480, 0, 0]);
            return t;
        };
        __egretProto__.__4_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["horizontalCenter", "text", "textColor", "top"], [0, "登录页", 0xFFFFFF, 0]);
            return t;
        };
        __egretProto__.__5_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["horizontalCenter", "source"], [0, "start_png"]);
            return t;
        };
        __egretProto__.__6_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["horizontalCenter", "source", "y"], [0, "rec3_png", 95]);
            return t;
        };
        __egretProto__.__7_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["horizontalCenter", "source", "y"], [0, "rec3_png", 160]);
            return t;
        };
        __egretProto__.__8_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["horizontalCenter", "source", "y"], [100, "drop_png", 170]);
            return t;
        };
        __egretProto__.__9_i = function () {
            var t = new egret.gui.UIAsset();
            t.setStyle("fontFamily", "Andalus");
            t.setStyle("textAlign", "left");
            t.setStyle("textColor", 0xFFFFFF);
            t.setStyle("verticalAlign", "justify");
            this.__s(t, ["horizontalCenter", "source", "y"], [0, "playintroduction_png", 485]);
            return t;
        };
        __egretProto__.m_start_btn_i = function () {
            var t = new egret.gui.UIAsset();
            this.m_start_btn = t;
            this.__s(t, ["bottom", "horizontalCenter", "source"], [502, 0, "start_button_png"]);
            return t;
        };
        __egretProto__.setting_btn_i = function () {
            var t = new egret.gui.UIAsset();
            this.setting_btn = t;
            this.__s(t, ["horizontalCenter", "source", "y"], [0, "setting_button_png", 391]);
            return t;
        };
        __egretProto__.__10_i = function () {
            var t = new egret.gui.EditableText();
            this.__s(t, ["editable", "fontFamily", "height", "size", "text", "textColor", "width", "x", "y"], [false, "圆体", 76, 18, "通过移动手指控制你的圆的，大的吃掉小的，绿色圆的可以躲避追捕", 0x00000000, 330, 74, 532]);
            return t;
        };
        __egretProto__.user_name_i = function () {
            var t = new egret.gui.EditableText();
            this.user_name = t;
            this.__s(t, ["editable", "fontFamily", "height", "maxChars", "size", "text", "textColor", "width", "x", "y"], [true, "圆体", 33, 15, 25, "点此输入大名", 0x000000, 228, 127, 105]);
            return t;
        };
        __egretProto__.watch_btn_i = function () {
            var t = new egret.gui.UIAsset();
            this.watch_btn = t;
            this.__s(t, ["horizontalCenter", "source", "y"], [0, "watch_button_png", 313]);
            return t;
        };
        LoginScreenSkin._skinParts = ["m_start_btn", "watch_btn", "setting_btn", "user_name"];
        return LoginScreenSkin;
    })(egret.gui.Skin);
    skin.LoginScreenSkin = LoginScreenSkin;
    LoginScreenSkin.prototype.__class__ = "skin.LoginScreenSkin";
})(skin || (skin = {}));
