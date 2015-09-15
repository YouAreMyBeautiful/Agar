var skin;
(function (skin) {
    var EndScreenSkin = (function (_super) {
        __extends(EndScreenSkin, _super);
        function EndScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [800, 480]);
            this.elementsContent = [this.__3_i(), this.__4_i(), this.m_replyBtn_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = EndScreenSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return EndScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__4_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["horizontalCenter", "text", "textColor", "top"], [0, "结束界面", 0xFFFFFF, 0]);
            return t;
        };
        __egretProto__.m_replyBtn_i = function () {
            var t = new egret.gui.Button();
            this.m_replyBtn = t;
            this.__s(t, ["bottom", "horizontalCenter", "label"], [200, 0, "重新游戏"]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.Rect();
            this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x333333, 800, 480, 0, 0]);
            return t;
        };
        EndScreenSkin._skinParts = ["m_replyBtn"];
        return EndScreenSkin;
    })(egret.gui.Skin);
    skin.EndScreenSkin = EndScreenSkin;
    EndScreenSkin.prototype.__class__ = "skin.EndScreenSkin";
})(skin || (skin = {}));
