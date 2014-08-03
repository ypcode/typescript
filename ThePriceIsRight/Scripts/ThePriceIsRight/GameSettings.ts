module ThePriceIsRight {
    export enum EGameLevel { Easy, Medium, Hard };

    export class GameSettings {
        public maxAttemptsDisplayer: JQuery;
        public currentAttemptsDisplayer: JQuery;
        public hintMessageDisplayer: JQuery;
        public messageBox: JQuery;
        private level: EGameLevel;

        constructor(level: EGameLevel, maxAttemptsDisplayer: JQuery, currentAttemptsDisplayer: JQuery, hintMessageDisplayer: JQuery, messageBox: JQuery) {
            this.maxAttemptsDisplayer = maxAttemptsDisplayer;
            this.currentAttemptsDisplayer = currentAttemptsDisplayer;
            this.hintMessageDisplayer = hintMessageDisplayer;
            this.messageBox = messageBox;
            this.level = level;
        }

        public getMinBound() {
            switch (this.level) {
                case EGameLevel.Medium:
                    return 1000;
                case EGameLevel.Hard:
                    return 100;
                case EGameLevel.Easy:
                default:
                    return 5000;
            }
        }

        public getMaxBound() {
            switch (this.level) {
                case EGameLevel.Medium:
                    return 60000;
                case EGameLevel.Hard:
                    return 100000;
                case EGameLevel.Easy:
                default:
                    return 20000;
            }
        }

        public getMaxAttempts() {
            switch (this.level) {
                case EGameLevel.Medium:
                    return 30;
                case EGameLevel.Hard:
                    return 15;
                case EGameLevel.Easy:
                default:
                    return 50;
            }
        }

        public getCountdownTime() {
            switch (this.level) {
                case EGameLevel.Medium:
                    return 150;
                case EGameLevel.Hard:
                    return 60;
                case EGameLevel.Easy:
                default:
                    return 300;
            }
        }
    }
} 