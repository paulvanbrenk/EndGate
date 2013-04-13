var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Loopers) {
            var TimedCallback = (function (_super) {
                __extends(TimedCallback, _super);
                function TimedCallback(fps, callback) {
                                _super.call(this, callback);
                    this._type = "TimedCallback";
                    this.Fps = fps;
                    this.TimeoutID = 0;
                    this.Active = false;
                }
                return TimedCallback;
            })(Loopers.LooperCallback);
            Loopers.TimedCallback = TimedCallback;            
        })(Core.Loopers || (Core.Loopers = {}));
        var Loopers = Core.Loopers;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
