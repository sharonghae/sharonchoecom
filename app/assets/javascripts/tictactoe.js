/**
 * Created by Sharon on 6/29/2016.
 */

app.controller("TicTacToeCtrl", ["$scope", function($scope){
    var grid = 3, //number of squares per row
        size = 100, //size of each square in pixels
        intelligence = 6, //algorithm recursion fail condition (higher number = slower)
        board = [],
        die = alert,
        winningCombinations = [],
        undef;

    function init() {
        board = [];
        winningCombinations = [];
        calculateWinCombos();
    }

    function calculateWinCombos() {
        for (i = 0, c = [], d = []; i < grid; i++) {
            for (j = 0, a = [], b = []; j < grid; j++) {
                a.push(i * grid + j);
                b.push(j * grid + i);
            }
            winningCombinations.push(a, b);
            c.push(i * grid + i);
            d.push((grid - i - 1) * grid + i);
        }
        winningCombinations.push(c, d);
    }

    function doMove(cell, player) {
        board[cell] = player || 1;
    }

    function checkBoard(depth) {
        for (var z in winningCombinations) {
            var j = x = o = grid;
            while (j--) {
                k = winningCombinations[z][j];
                board[k] > 0 && x--;
                board[k] < 0 && o--;
            }
            if (!x) return size - depth; // x won
            if (!o) return depth - size; // o won
        }
    }

    //negamax search with alpha-beta pruning
    //http://en.wikipedia.org/wiki/Negamax
    //http://en.wikipedia.org/wiki/Alpha-beta_pruning
    function nextMove(depth, player, alpha, beta) {
        var i = grid * grid,
            min = -size,
            max, value, next;
        if (value = checkBoard(depth)) // either player won
            return value * player;
        if (intelligence > depth) { // recursion cutoff
            while (i--) {
                if (!board[i]) {
                    board[i] = player;
                    value = -nextMove(depth + 1, -player, -beta, -alpha);
                    board[i] = undef;
                    if (max === undef || value > max) max = value;
                    if (value > alpha) alpha = value;
                    if (alpha >= beta) return alpha; // prune branch
                    if (max > min) {
                        min = max;
                        next = i;
                    } // best odds for next move
                }
            }
        }
        return depth ? max || 0 : next; // 0 is tie game
    }

    $scope.selectCell = function(cell) {
        var next;
        if(!board[cell]) {
            doMove(cell, -1); //o = -1, x = 1

            //computer moves
            next = nextMove(0, 1, -size, size);
            doMove(next);

            //TODO: change die to not use alert()
            if(checkBoard(0) < 0) return die("won");
            if(next === undef) return die("tie");
            if(checkBoard(0) > 0) return die("lost");
        }
    }

    $scope.getCellValue = function(cell) {
        return board[cell];
    }

    //call initialize to setup a new board
    init();

    return

}]);