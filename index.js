var Board = require('./board');
var Square = require('./square');
var heuristic = require('./heuristics');
var Queue = require('js-priority-queue');

var frontiers = new Queue({
    comparator: function (a, b) {
        return a.getCost() - b.getCost();
    }
});

//TODO add command line arg for board
if (!process.argv[2] || !process.argv[3]) {
    console.error('Usage node index.js \<filename\> \<heuristic\>');
    process.exit(1);
}


var hNum = parseInt(process.argv[3]) - 1;
if (hNum < 0 || hNum > 5) {
    console.error('Must select valid heuristic');
    process.exit(1);
}


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
            process.exit(1);
        }
        var current = frontiers.dequeue();
        var newNodes = current.expand(board, heuristic[hNum]);
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

