var countBullsCows = function (a, b) {
    var bulls = 0;
    var cows = 0;
    for (var i = 0; i < a.length; i++) {
        if (a[i] === b[i])
            bulls++;

        for (var j = 0; j < a.length; j++) {
            if (i !== j && a[i] === b[j])
                cows++;
        }
    }
    return { bulls: bulls, cows: cows };
};