module ThePriceIsRight {
    export class Countdown {
        initialValue: number;
        currentValue: number;
        container: JQuery;
        timerToken: number;
        autoDisplay: boolean;

        constructor(initialValue: number, container: JQuery, autoDisplay?: boolean) {
            this.initialValue = initialValue;
            this.currentValue = initialValue;
            this.container = container;
            if (autoDisplay)
                this.autoDisplay = autoDisplay;
        }

        public start() {
            this.timerToken = setInterval(() => this.timerTick(), 1000);
        }

        private timerTick() {
            this.decreaseCounter();
            if (this.autoDisplay)
                this.display();
            if (this.currentValue == 0) {
                this.stop();
            }
            
        }

        public stop() {
            clearInterval(this.timerToken);
        }

        private decreaseCounter() {
            this.currentValue--;
        }

        public display() {
            this.container.text(this.currentValue + "s");
        }

        public getCurrentValue() {
            return this.currentValue;
        }
    }
}