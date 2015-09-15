var skin;
(function (skin) {
    var PopLoadingSkin = (function (_super) {
        __extends(PopLoadingSkin, _super);
        function PopLoadingSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [800, 480]);
            this.elementsContent = [this.m_probar_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = PopLoadingSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return PopLoadingSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.m_probar_i = function () {
            var t = new egret.gui.ProgressBar();
            this.m_probar = t;
            this.__s(t, ["horizontalCenter", "verticalCenter", "width"], [0, 0, 400]);
            return t;
        };
        PopLoadingSkin._skinParts = ["m_probar"];
        return PopLoadingSkin;
    })(egret.gui.Skin);
    skin.PopLoadingSkin = PopLoadingSkin;
    PopLoadingSkin.prototype.__class__ = "skin.PopLoadingSkin";
})(skin || (skin = {}));
