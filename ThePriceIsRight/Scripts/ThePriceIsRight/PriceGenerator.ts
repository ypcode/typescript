module ThePriceIsRight {
    export class PriceGenerator {
        minBound: number;
        maxBound: number;

        constructor(minBound: number, maxBound: number) {
            this.minBound = minBound;
            this.maxBound = maxBound;
        }

        public generate() {
            return Math.round(Math.random() * (this.maxBound - this.minBound) + this.minBound);
        }
    }
}