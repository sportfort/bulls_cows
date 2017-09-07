var game = new BullsAndCows();

function startNewGame() {
    game.start();
}

function BullsAndCows() {
    var generateNumber = function () {
        //Got algorithm from here 
        //https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
        //There was also another algorithm, but for small numbers, there is no difference

        var arr = [];
        while (arr.length < 4) {
            var randomnumber = Math.ceil(Math.random() * 9);
            if (arr.indexOf(randomnumber) > -1 || randomnumber === 0) continue;
            arr[arr.length] = randomnumber;
        }
        return arr;
    };

    var numberArray;
    var number;

    var countBulls = function (guessNumber) {
        var result = 0;
        for (var i = 0; i < number.length; i++) {
            if (number[i] === guessNumber[i])
                result++;
        }
        return result;
    };

    var countCows = function (guessNumber) {
        var result = 0;
        for (var i = 0; i < number.length; i++) {
            for (var j = 0; j < number.length; j++) {
                if (i !== j && number[i] === guessNumber[j])
                    result++;
            }
        }
        return result;
    };

    var checkLength = function (guessNumber) {
        if (guessNumber.length !== number.length) {
            alert("Please enter exactly 4 digits.");
            return false;
        }
        return true;
    }

    var checkDuplicates = function (guessNumber) {
        for (var i = 0; i < guessNumber.length; i++) {
            for (var j = 0; j < guessNumber.length; j++) {
                if (i !== j && guessNumber[i] === guessNumber[j]) {
                    alert("Please enter different number. The digits must be all different!");
                    return false;
                }
            }
        }
        return true;
    }

    var checkNumberNoZeroes = function (guessNumber) {
        for (var i = 0; i < guessNumber.length; i++) {
            var d = parseInt(guessNumber[i]);
            if (!(d > 0 && d <= 9)) {
                alert("Please enter different number. Only digits from 1 to 9 allowed. (letters, symbols, and digit zero (0) is not allowed)!");
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

        if (!checkLength(guessNumber) ||
            !checkNumberNoZeroes(guessNumber) ||
            !checkDuplicates(guessNumber))
            return false;

        if (guessNumber === number) {
            alert("You won! The number is " + number);
            return true;
        }

        var bulls = countBulls(guessNumber);
        var cows = countCows(guessNumber);
        alert("Wrong guess. Bulls: " + bulls + ". Cows: " + cows);

        return false;
    };

    var start = function () {
        numberArray = generateNumber();
        number = numberArray.join("");

        console.log("Number is " + number);

        var gameOver = false;
        while (!gameOver)
            gameOver = guess();
    }

    return {
        start: start,
        guess: guess
    };
}