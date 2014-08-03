module ThePriceIsRight {
    export class PriceChecker {
        priceToFind: number;
        maxAttempts: number;
        maxAttemptsDisplayer: JQuery;
        currentAttempts: number;
        currentAttemptsDisplayer: JQuery;
        warningThreshold: number;
        criticalThreshold: number;

        constructor(priceToFind: number, maxAttempts: number, maxAttemptsDisplayer? : JQuery, currentAttemptsDisplayer? : JQuery) {
            this.priceToFind = priceToFind;
            this.maxAttempts = maxAttempts;
            this.currentAttempts = 0;
            this.warningThreshold = 4;
            this.criticalThreshold = 1;
            this.maxAttemptsDisplayer = maxAttemptsDisplayer ? maxAttemptsDisplayer : null;
            if (this.maxAttemptsDisplayer != null)
                this.maxAttemptsDisplayer.text(this.maxAttempts);
            this.currentAttemptsDisplayer = currentAttemptsDisplayer ? currentAttemptsDisplayer : null;
            if (this.currentAttemptsDisplayer != null)
                this.currentAttemptsDisplayer.text(this.currentAttempts);
        }

        public checkPrice(priceAttempt: number) {
            var tmpResult = priceAttempt - this.priceToFind;
            if (tmpResult != 0) {
                this.currentAttempts++;
                if (this.currentAttemptsDisplayer) {
                    this.currentAttemptsDisplayer.text(this.currentAttempts);
                    var currentDelta = this.maxAttempts - this.currentAttempts;
                    if (currentDelta == this.warningThreshold)
                        this.currentAttemptsDisplayer.addClass("warning");
                    else if (currentDelta == this.criticalThreshold)
                        this.currentAttemptsDisplayer.addClass("critical");
                }
                if (this.currentAttempts == this.maxAttempts)
                    throw new Error("The maximum allowed number of attempts has been reached");

                if (tmpResult > 0)
                    return 1;
                else
                    return -1;
            } else {
                return 0;
            }
        }
    }

} 