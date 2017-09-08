var gameUser = new UserGuessGame({
    showMessage: function (messageText) {
        document.getElementById("messageBox").textContent = messageText;
    },
    readUserGuess: function () {
        var result = document.getElementById("userInput").value;
        document.getElementById("userInput").value = "";
        return result;
    },
    showGame: function () {
        document.getElementById("userGuessUI").style.display = "block";
        document.getElementById("computerGuessUI").style.display = "none";
    },
    hideGame: function () {
        document.getElementById("userGuessUI").style.display = "none";
    }
});

function UserGuessGame(ui) {
    var generateRandomNumber = function () {
        //There are also another algorithms, but for small numbers, there is no difference
        var arr = [];
        while (arr.length < 4) {
            var randomnumber = Math.ceil(Math.random() * 9);
            if (arr.indexOf(randomnumber) > -1 || randomnumber === 0) continue;
            arr[arr.length] = randomnumber;
        }
        return arr;
    };
    var number;

    var checkDigits = function (guessNumber) {
        if (!/^[1-9]{4}$/.test(guessNumber)) {
            return {
                message: "Please enter exactly 4 different digits from 1 to 9 (letters, symbols, and digit zero (0) are not allowed)!",
                valid: false
            };
        }

        for (var i = 0; i < 3; i++) {
            var c = guessNumber[i];
            if (guessNumber.indexOf(c) !== guessNumber.lastIndexOf(c)) {
                alert();
                return {
                    message: "Please enter digits without duplicates. The digits must be all different!",
                    valid: false
                };
            }
        }
        return {
            valid: true
        };
    }

    var guess = function() {
        ui.showMessage("Please enter your guess!");
    }

    var validateGuess = function (guessNumber) {
        if (!guessNumber) {
            return {
                message: "No user input - Game over",
                gameOver: true
            };
        }

        var validationResult = checkDigits(guessNumber);
        if (!validationResult.valid)
            return {
                message: validationResult.message,
                gameOver: false
            };

        if (guessNumber === number) {
            return {
                message: "You won! The number is " + number,
                gameOver: true
            };
        }

        var result = countBullsCows(number, guessNumber);
        return {
            message: "Wrong guess. Bulls: " + result.bulls + ". Cows: " + result.cows,
            gameOver: false
        };
    };

    var finishGame = function () {
        ui.hideGame();
    };

    this.startGame = function () {
        ui.showGame();
        var numberArray = generateRandomNumber();
        number = numberArray.join("");

        console.log("Number is " + number);
        guess();
    };

    this.processUserInput = function () {
        var userInput = ui.readUserGuess();
        var result = validateGuess(userInput);
        if (result.message)
            ui.showMessage(result.message);
        if (result.gameOver)
            finishGame();
    };

}