var Board = require('./board')

board = new Board();
board.loadGrid('grid', function() {
        s = board.toString();
        console.log(s);
});
