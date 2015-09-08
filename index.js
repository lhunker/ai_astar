var Board = require('./board');

board = new Board();
board.loadGrid('grid', main);

/**
 * The main function for after the board is loaded
 */
function main() {
        s = board.toString();
        console.log(s);

        //Find start - add to frontiers

        //while top frontiers !== goal
        //pop top node and expand
        //sort list

        //take top node and print solution
}
