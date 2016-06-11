/* tictac.js */
(function () {
    var whoWon = 0;
    var boardIndexes = ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"];
    var allowUserMove = true;
    var finished = false;
    var userChar;
    var computerChar;
    var userMoves = 0;

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

    $("#reset").click(function () {
        reset();
    });

    $("#x").on("click", function (e) {
        userChar = "X";
        computerChar = "O";
        $(".question").slideUp();
    });

    $("#o").on("click", function (e) {
        userChar = "O";
        computerChar = "X";
        $(".question").slideUp();
    });

    $("td").on("click", function (e) {
        if (allowUserMove && userChar !== undefined && finished === false) {
            var currentClick = boardMap[$(this).attr("id")];
            var checkBoard = boardIndexes[currentClick];
            if (checkBoard === "blank") {
                userMoves++;
                var displayUserMove = $(this).text(userChar);
                allowUserMove = false;
                boardIndexes[boardMap[$(this).attr("id")]] = "user";
                winChecker();
                if (whoWon !== 1 && whoWon !== 2) {
                    var nextComputerMove = computerMove();
                    boardIndexes[nextComputerMove] = "computer";
                    for (var prop in boardMap) {
                        if (boardMap[prop] === nextComputerMove) {
                            $("#" + prop).text(computerChar);
                        }
                    }
                    winChecker();
                    if (whoWon === 1) {
                        $("#result").text("Computer wins!");
                        finished = true;
                    } else if (whoWon === 2) {
                        $("#result").text("You win!");
                        allowUserMove = false;
                        finished = true;
                    } else if (userMoves === 5) {
                        $("#result").text("It's a scratch!");
                        userMoves = 0;
                    } else {
                        finished = false;
                    }
                } else {
                    $("#result").text("You win!");
                }
            }
        }

    });

    function winningMove(arr) {
        var index1 = arr[0];
        var index2 = arr[1];
        var index3 = arr[2];
        var holder = boardIndexes[index1] + boardIndexes[index2] + boardIndexes[index3];
        var findComputerWin;
        if (holder === "blankcomputercomputer") {
            findComputerWin = index1;
        } else if (holder === "computerblankcomputer") {
            findComputerWin = index2;
        } else if (holder === "computercomputerblank") {
            findComputerWin = index3;
        } else {
            findComputerWin = 10;
        }
        return findComputerWin;
    }

    function blockingMove(arr2) {
        var index1 = arr2[0];
        var index2 = arr2[1];
        var index3 = arr2[2];
        var holder = boardIndexes[index1] + boardIndexes[index2] + boardIndexes[index3];
        var findComputerBlock;
        if (holder == "blankuseruser") {
            findComputerBlock = index1;
        } else if (holder == "userblankuser") {
            findComputerBlock = index2;
        } else if (holder == "useruserblank") {
            findComputerBlock = index3;
        } else {
            findComputerBlock = 10;
        }
        return findComputerBlock;
    }

    function randomMove(boardIndexes) {
        var found = false;
        var findComputerRandom;
        switch (userMoves) {
        case 1:
            findComputerRandom = (boardIndexes[4] === "blank") ? 4 : 0;
            break;
        case 2:
            if (boardIndexes[4] === "user" && (boardIndexes[2] === "user" || boardIndexes[6] === "user" || boardIndexes[8] === "user")) {
                findComputerRandom = (boardIndexes[2] === "computer") ? 6 : 2;
                break;
            }
        default:
            if (boardIndexes.indexOf("blank") !== -1) {
                while (!found) {
                    var randomIndex = Math.floor((Math.random() * boardIndexes.length));
                    if (boardIndexes[randomIndex].indexOf("blank") !== -1) {
                        found = true;
                        findComputerRandom = randomIndex;
                    }
                }
            } 
        }
        return findComputerRandom;
    }

    function computerMove() {
        allowUserMove = true;
        var winExists = true;
        var blockExists = true;
        var wins = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];
        var winIndex = wins.filter(function (e) {
            return winningMove(e) !== 10;
        });
        (winIndex.length > 0) ? winIndex = winningMove(winIndex[0]) : winExists = false;
        var blockIndex = wins.filter(function (e) {
            return blockingMove(e) !== 10;
        });
       (blockIndex.length > 0) ?  blockIndex = blockingMove(blockIndex[0]) : blockExists = false;
        if (winExists || winIndex === 0) {
            return winIndex;
        } else if (blockExists || blockIndex === 0) {
            return blockIndex;
        } else {
            return randomMove(boardIndexes);;
        }
    }

    function winner(arr3) {
        var determineWinner;
        var index1 = arr3[0];
        var index2 = arr3[1];
        var index3 = arr3[2];
        var holder = boardIndexes[index1] + boardIndexes[index2] + boardIndexes[index3];
        if (holder == "computercomputercomputer") {
            determineWinner = 1;
        } else if (holder == "useruseruser") {
            determineWinner = 2;
        } else {
            determineWinner = 0;
        }
        return determineWinner;
    }

    function reset() {
        userMoves = 0;
        boardIndexes = ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"];
        $("td").text("");
        finished = false;
        $("#result").text("");
        whoWon = 0;
        allowUserMove = true;
    };

    function winChecker() {
        var wins = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];
        wins.forEach(function (e) {
            var focusNum = winner(e);
            whoWon += focusNum;
            return whoWon;
        });
        return whoWon;
    }
}());