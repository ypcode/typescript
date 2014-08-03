var ThePriceIsRight;
(function (ThePriceIsRight) {
    var Countdown = (function () {
        function Countdown(initialValue, container, autoDisplay) {
            this.initialValue = initialValue;
            this.currentValue = initialValue;
            this.container = container;
            if (autoDisplay)
                this.autoDisplay = autoDisplay;
        }
        Countdown.prototype.start = function () {
            var _this = this;
            this.timerToken = setInterval(function () {
                return _this.timerTick();
            }, 1000);
        };

        Countdown.prototype.timerTick = function () {
            this.decreaseCounter();
            if (this.autoDisplay)
                this.display();
            if (this.currentValue == 0) {
                this.stop();
            }
        };

        Countdown.prototype.stop = function () {
            clearInterval(this.timerToken);
        };

        Countdown.prototype.decreaseCounter = function () {
            this.currentValue--;
        };

        Countdown.prototype.display = function () {
            this.container.text(this.currentValue + "s");
        };

        Countdown.prototype.getCurrentValue = function () {
            return this.currentValue;
        };
        return Countdown;
    })();
    ThePriceIsRight.Countdown = Countdown;
})(ThePriceIsRight || (ThePriceIsRight = {}));
//# sourceMappingURL=Countdown.js.map
