module ThePriceIsRight {
    export class Game {
        settings: GameSettings;
        priceChecker: PriceChecker;
        priceGenerator: PriceGenerator;
        inputManager: PlayerInputManager;
        countdown: Countdown;
        gameFinished: boolean;
        hintMessage: string;
        updateIntervalToken: number;

        constructor(settings: GameSettings) {
            this.settings = settings;
            this.gameFinished = false;
            this.updateIntervalToken = null;
        }

        private nextUpdate() {
            if (this.gameFinished) {
                this.stop();
            }

            if (this.countdown.getCurrentValue() == 0) {
                this.showMessage("The time limit has been reached");
                this.stop();
            }

            if (this.hintMessage && this.hintMessage != "")
                this.settings.hintMessageDisplayer.text(this.hintMessage);
        }

        public validateInput(input: string) {
            try {
                var hint = this.priceChecker.checkPrice(parseInt(input));
                if (hint != 0) {
                    this.hintMessage = "the price to discover is " + (hint > 0 ? "lower" : "higher") + " than " + input;
                    this.inputManager.resetInput();
                }
                else {
                    this.showMessage("You Win!!!\nThe right price was " + this.priceChecker.priceToFind);
                    this.gameFinished = true;
                }
            } catch (error) {
                // An error is thrown when the max number of attempts is reached
                this.gameFinished = true;
                this.showMessage("You have reached the maximum allowed number of attempts");
            }
        }

        public showMessage(message: string) {
            this.settings.messageBox.css("display", "block");
            this.settings.messageBox.find(".message-content").text(message);
        }

        public closeMessage() {
            this.settings.messageBox.css("display", "none");
            this.settings.messageBox.find(".message-content").text("");
        }

        public start() {
            // Generate the expected price
            this.priceGenerator = new ThePriceIsRight.PriceGenerator(this.settings.getMinBound(), this.settings.getMaxBound());
            var priceToFind = this.priceGenerator.generate();

            // Instantiate the price checker
            this.priceChecker = new ThePriceIsRight.PriceChecker(priceToFind, this.settings.getMaxAttempts(),
                this.settings.maxAttemptsDisplayer, this.settings.currentAttemptsDisplayer);

            $(".game-menu").css("display", "none");
            $(".player-set").css("display", "block");

            // Instantiate the PlayerInputManager
            this.inputManager = new ThePriceIsRight.PlayerInputManager(this, $(".player-input").first());
            
            // Start the count down
            this.countdown = new ThePriceIsRight.Countdown(this.settings.getCountdownTime(), $(".countdown").first(), true);
            this.countdown.start();

            // Start the game update interval
            this.updateIntervalToken = setInterval(() => this.nextUpdate(), 100);
        }

        public stop() {
            this.inputManager.stopHandleInput();
            this.countdown.stop();
            if (this.updateIntervalToken)
                clearInterval(this.updateIntervalToken);
        }
    }
} 