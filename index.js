var Board = require('./board');
var Square = require('./square');
var Queue = require('js-priority-queue');

var frontiers = new Queue({
    comparator: function (a, b) {
        return a.getCost() - b.getCost();
    }
});

var board = new Board();
board.loadGrid('grid', main);

/**
 * The main function for after the board is loaded
 */
function main() {
    var s = board.toString();
    console.log(s);

    //Find start - add to frontiers
    var start = board.getStart();
    var firstNode = new Square(start, 1, 'Start', 'N');
    frontiers.queue(firstNode);

    //TODO add global nodes expanded counter

    //sort in reverse order for pop
    while (!board.isGoal(frontiers.peek().getLocation())) {
        if (frontiers.length === 0) {
            console.error('No Solution!');
            exit(1);
        }
        var current = frontiers.dequeue();
        var newNodes = current.expand(board);
        pushToQueue(newNodes);
    }

    var result = frontiers.dequeue();
    console.info('Result: ' + JSON.stringify(result));
    //Print solution

    //TODO add print formatting
}

/**
 * Pushes an array onto the priority queue
 * @param arr the array to push
 */
function pushToQueue(arr) {
    arr.forEach(function (item) {
        frontiers.queue(item);
    });
}
