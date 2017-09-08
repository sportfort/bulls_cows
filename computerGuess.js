var gameComputer = new ComputerGuessGame({
    showMessage: function (messageText) {
        document.getElementById("messageBox").textContent = messageText;
    },
    readBullsCows: function () {
        var result = document.getElementById("bullsCount").value + document.getElementById("cowsCount").value;
        document.getElementById("bullsCount").value = "";
        document.getElementById("cowsCount").value = "";
        return result;
    },
    showGame: function () {
        document.getElementById("userGuessUI").style.display = "none";
        document.getElementById("computerGuessUI").style.display = "block";
    },
    hideGame: function() {
        document.getElementById("computerGuessUI").style.display = "none";
    }
});

function ComputerGuessGame(ui) {
    var possibleNumbers;

    var generatePossibleNumbers = function () {
        //function generates all possible numbers
        possibleNumbers = [];
        for (var i = 1234; i <= 9876; i++) {
            var valid = true;
            var currentNumber = "" + i;
            for (var j = 0; j < 4; j++) {
                var c = currentNumber[j];
                //ignore numbers with duplicate digits and zeroes
                if (c === "0" || currentNumber.indexOf(c) !== currentNumber.lastIndexOf(c)) {
                    valid = false;
                    break;
                }
            }
            if (valid)
                possibleNumbers.push(currentNumber);
        }
        return possibleNumbers;
    }

    var validInputs = [
        "00", "01", "02", "03", "04",
        "10", "11", "12", "13",
        "20", "21", "22",
        "30",
        "40"
    ];

    var checkUserInput = function(input) {
        if (!input) {
            return {
                message: "Please enter something to the inputs!",
                valid: false
            };
        }

        if (validInputs.indexOf(input) < 0) {
            return {
                message: "Please enter correct amount of bulls and cows",
                valid: false
            }
        }

        return {
            valid: true
        }
    };

    var filterPossibleNumbers = function (guessNumber, userInput) {
        var i = possibleNumbers.length;
        while (i--) {
            var bullsAndCows = countBullsCows(possibleNumbers[i], guessNumber);
            if (bullsAndCows.bulls + "" + bullsAndCows.cows !== userInput) {
                possibleNumbers.splice(i, 1);
            }
        }
    };

    var guessNumber;
    var tryGuess = function() {
        var randomIndex = Math.ceil(Math.random() * possibleNumbers.length - 1);
        guessNumber = possibleNumbers[randomIndex];
        ui.showMessage("My guess is " + guessNumber + ". What is the result?");
    };

    var validateGuess = function (userInput) {
        var vaidationResult = checkUserInput(userInput);
        if (!vaidationResult.valid)
            return {
                message: vaidationResult.message,
                validationError: true,
                gameOver: false
            };

        filterPossibleNumbers(guessNumber, userInput);

        if (possibleNumbers.length === 1) {
            return {
                message: "I won! The number is " + possibleNumbers[0],
                gameOver: true
            };
        }

        if (possibleNumbers.length === 0) {
            return {
                message: "You trying to confuse me, no such number is possible. Game over.",
                gameOver: true
            };
        }

        return {
            gameOver: false
        };
    }

    var finishGame = function () {
        ui.hideGame();
    };

    this.startGame = function () {
        ui.showGame();
        possibleNumbers = generatePossibleNumbers();
        tryGuess();
    };

    this.processUserInput = function () {
        var userInput = ui.readBullsCows();
        var result = validateGuess(userInput);
        if (result.message)
            ui.showMessage(result.message);
        if (result.gameOver)
            finishGame();
        else if (!result.validationError)
            tryGuess();
    };
}