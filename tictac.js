/* tictacto.js */
var ans = 0;
var indexes = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];
var state1 = true;
var win = false;
var side;
var computerChar;
var moves = 0;

var boardMap = {
    zero: 0
    , one: 1
    , two: 2
    , three: 3
    , four: 4
    , five: 5
    , six: 6
    , seven: 7
    , eight: 8
    , nine: 9
};

$("#reset").click(function() {
    reset();
});

$("#x").on("click", function (e) {
    side = "X";
    computerChar = "O";
    $(".question").slideUp();
});

$("#o").on("click", function (e) {
    side = "O";
    computerChar = "X";
    $(".question").slideUp();
});

$("td").on("click", function (e) {
    if (state1 && side !== undefined && win === false) {
        var currentClick = boardMap[$(this).attr("id")];
        var checker = indexes[currentClick];
        if (checker == "a") {
            moves++;
            var mark = $(this).text(side);
            state1 = false;
            indexes[boardMap[$(this).attr("id")]] = "c";
            winChecker();
            if (ans !==1 && ans !== 2) {
                var nextC = computerMove();
                indexes[nextC] = "b";
                for (var prop in boardMap) {
                    if (boardMap[prop] === nextC) {
                        $("#" + prop).text(computerChar);
                    }
                }
                winChecker();
                if (ans === 1) {
                    $("#result").text("Computer wins!");
                    win = true;
                } else if (ans === 2) {
                    $("#result").text("You win!");
                    state1 = false;
                    win = true;
                } else if (moves === 5) {
                    $("#result").text("It's a scratch!");
                    moves = 0;
                } else {
                    win = false;
                }
            }
            else {
                $("#result").text("You win!");
            }
        }
    }

});

function winningMove(arr) {
    var a = arr[0];
    var b = arr[1];
    var c = arr[2];
    var holder = indexes[a] + indexes[b] + indexes[c];
    var move;
    if (holder === "abb") {
        move = a;
    } else if (holder === "bab") {
        move = b;
    } else if (holder === "bba") {
        move = c;
    } else {
        move = false;
    }
    return move;
}

function blockingMove(arr2) {
    var a = arr2[0];
    var b = arr2[1];
    var c = arr2[2];
    var holder = indexes[a] + indexes[b] + indexes[c];
    var move;
    if (holder == "acc") {
        move = a;
    } else if (holder == "cac") {
        move = b;
    } else if (holder == "cca") {
        move = c;
    } else {
        move = false;
    }
    return move;
}

function randomMove(indexes) {
    var found = false;
    var move;
    switch (moves) {
    case 1:
        move = (indexes[4] === "a") ? 4 : 0;
        break;
    case 2:
        if (indexes[4] === "c" && (indexes[2] === "c" || indexes[6] === "c" || indexes[8] === "c")) {
            move = (indexes[2] === "c") ? 6 : 2;
            break;
        } 
    default:
        if (indexes.indexOf("a") !== -1) {
            while (!found) {
                var randomIndex = Math.floor((Math.random() * indexes.length));
                if (indexes[randomIndex].indexOf("a") !== -1) {
                    found = true;
                    move = randomIndex;
                }
            }
        } else {
            move = false;
        }
    }
    return move;
}

function computerMove() {
    state1 = true;
    var wins = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];
    var winIndex = wins.filter(function (e) {
        return winningMove(e) !== false;
    });
    winIndex = (winIndex.length > 0) ? winningMove(winIndex[0]) : false;
    var blockIndex = wins.filter(function (e) {
        return blockingMove(e) !== false;
    });
    blockIndex = (blockIndex.length > 0) ? blockingMove(blockIndex[0]) : false;
    if (winIndex || winIndex === 0) {
        return winIndex;
    } else if (blockIndex || blockIndex === 0) {
        return blockIndex;
    } else {
        return randomMove(indexes);;
    }
}

function winner(arr3) {
    var a = arr3[0];
    var b = arr3[1];
    var c = arr3[2];
    var holder = indexes[a] + indexes[b] + indexes[c];
    if (holder == "bbb") {
        win = 1;
    } else if (holder == "ccc") {
        win = 2;
    } else {
        win = 0;
    }
    return win;
}

function reset() {
    moves = 0;
    indexes = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];
    $("td").text("");
    win = false;
    $("#result").text("");
    ans = 0;
    state1 = true;
};

function winChecker() {
    var wins = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];
    wins.forEach(function (e) {
        var focusNum = winner(e);
        ans += focusNum;
        return ans;
    });
    return ans;
}
