var Board = require('./board');

board = new Board();
board.loadGrid('grid', main);

/**
 * The main function for after the board is loaded
 */
function main() {
        s = board.toString();
        console.log(s);
}
