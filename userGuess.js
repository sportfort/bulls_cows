var gameUser = new UserGuessGame();

function startUserGuess() {
    gameUser.startGame();
}

function UserGuessGame() {
    var generateNumber = function () {
        //There is also another algorithm, but for small numbers, there is no difference
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
            alert("Please enter exactly 4 different digits from 1 to 9. (letters, symbols, and digit zero (0) are not allowed)!");
            return false;
        }

        for (var i = 0; i < 3; i++) {
            var c = guessNumber[i];
            if (guessNumber.indexOf(c) !== guessNumber.lastIndexOf(c)) {
                alert("Please enter digits without duplicates. The digits must be all different!");
                return false;
            }
        }
        return true;
    }

    var guess = function () {
        var guessNumber = prompt("Please enter your guess!");
        if (!guessNumber) {
            alert("Game over");
            return true;
        }

        if (!checkDigits(guessNumber))
            return false;

        if (guessNumber === number) {
            alert("You won! The number is " + number);
            return true;
        }

        var result = countBullsCows(number, guessNumber);
        alert("Wrong guess. Bulls: " + result.bulls + ". Cows: " + result.cows);

        return false;
    };

    this.startGame = function () {
        var numberArray = generateNumber();
        number = numberArray.join("");

        console.log("Number is " + number);

        var gameOver = false;
        while (!gameOver)
            gameOver = guess();
    }
}