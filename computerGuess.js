var gameComputer = new ComputerGuessGame();

function startComputerGuess() {
    gameComputer.startGame();
}

function ComputerGuessGame() {
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
        return validInputs.indexOf(input) >= 0;
    };

    var filterPossibleNumbers = function(guessNumber, userInput) {
        var i = possibleNumbers.length;
        while (i--) {
            var bullsAndCows = countBullsCows(possibleNumbers[i], guessNumber);
            if (bullsAndCows.bulls + "" + bullsAndCows.cows !== userInput) {
                possibleNumbers.splice(i, 1);
            }
        }
    };

    var tryGuess = function () {
        var randomIndex = Math.ceil(Math.random() * possibleNumbers.length - 1);
        var guessNumber = possibleNumbers[randomIndex];
        var userInput = prompt("My guess is " + guessNumber + ". What is the result?");

        if (!userInput) {
            alert("Game over");
            return true;
        }

        if (!checkUserInput(userInput))
            return false;

        filterPossibleNumbers(guessNumber, userInput);

        if (possibleNumbers.length === 1) {
            alert("I won! The number is " + possibleNumbers[0]);
            return true;
        }

        if (possibleNumbers.length === 0) {
            alert("You trying to confuse me, no such number is possible. Game over.");
            return true;
        }
        return false;
    }

    this.startGame = function () {
        possibleNumbers = generatePossibleNumbers();

        var gameOver = false;
        while (!gameOver)
            gameOver = tryGuess();
    }
}