var Board = require('./board');
var Square = require('./square');
var Queue = require('js-priority-queue');

var frontiers = new Queue({
    comparator: function (a, b) {
        return a.getCost() - b.getCost();
    }
});

board = new Board();
board.loadGrid('grid', main);

/**
 * The main function for after the board is loaded
 */
function main() {
    s = board.toString();
    console.log(s);
    console.log(board.getStart());
    console.info(board.isGoal({x: 1, y: 0}));

    //Find start - add to frontiers
    var start = board.getStart();
    var firstNode = new Square(start, 1, 'Start', 'N');
    var test2 = new Square(start, 5, 'Start', 'N');
    frontiers.queue(test2);
    frontiers.queue(firstNode);


    //sort in reverse order for pop
    while (!board.isGoal(frontiers.peek().getLocation())) {
        var current = frontiers.dequeue();
        var newNodes = current.expand(board);
        //pushToQueue(newNodes);
    }

    var result = frontiers.dequeue();
    //take top node and print solution
}

/**
 * Pushes an array onto the priority queue
 * @param arr the array to push
 */
function pushToQueue(arr) {
    arr.forEach(function (item) {
        frontiers.queue(item);
    })
}
