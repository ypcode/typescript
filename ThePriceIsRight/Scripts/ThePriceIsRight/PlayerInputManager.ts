module ThePriceIsRight {
    export class PlayerInputManager {
        currentInput: string;
        validatedInput: string;
        inputDisplayer: JQuery;
        gameContext: Game;

        constructor(gameContext: Game, inputDisplayer?: JQuery) {
            if (inputDisplayer)
                this.inputDisplayer = inputDisplayer;

            this.gameContext = gameContext;
            this.startHandleInput();
            this.resetInput();
        }

        private keyPressHandler(evt: JQueryEventObject) {
            if (evt.key >= 0 && evt.key <= 9) {
                if (this.currentInput.length == 10)
                    return;

                this.currentInput = this.currentInput.toString() + evt.key;
                if (this.inputDisplayer)
                    this.inputDisplayer.text(this.currentInput);
            }
        }

        private keyUpHandler(evt: JQueryEventObject) {
            if (evt.which == 13) {
                this.validateInput();
            } else if (evt.which == 8) {
                if (this.currentInput != null && this.currentInput != "") {
                    this.currentInput = this.currentInput.slice(0, this.currentInput.length - 1);
                    if (this.inputDisplayer)
                        this.inputDisplayer.text(this.currentInput);
                }
            }
        }

        public startHandleInput() {
            // bind the keypress event
            $(window).bind("keypress", evt => this.keyPressHandler(evt));
            $(window).bind("keyup", evt => this.keyUpHandler(evt));
        }

        public stopHandleInput() {
            $(window).unbind("keypress");
            $(window).unbind("keyup");
        }

        public validateInput() {
            this.validatedInput = this.currentInput;
            this.gameContext.validateInput(this.validatedInput);
        }

        public getValidatedInput() {
            return this.validatedInput;
        }

        public resetInput() {
            this.currentInput = "";
            if (this.inputDisplayer)
                this.inputDisplayer.text("");
            this.validatedInput = null;
        }
    }
} 