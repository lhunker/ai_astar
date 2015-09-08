var fs = require('fs');
var parse = require('csv-parse');
fs = require('fs');


function Board() {
    this.grid = [];
}

/**
 * Loads the grid from a text file
 * @param file The filename
 * @param callback The callback to call when finished
 */
Board.prototype.loadGrid = function(file, callback) {
    // To maintain scoping
    var _this = this;

    // Create parser for each line
    var parser = parse({delimiter: '\t'});
    var data = [];

    // While parsing, append data
    parser.on('readable', function() {
        while (record = parser.read()) {
            data.push(record);
        }
    });

    // Log errors
    parser.on('error', function(err) {
        console.log(err.message);
    });

    // On finish, parse each line
    parser.on('finish', function() {
        console.log('Loading grid');
        for (var i = 0; i < data.length; i++) {
            // Add empty array
            _this.grid.push([]);
            // For each entry in line
            for (var j = 0; j < data[i].length; j++) {
                // Set value in grid
                _this.grid[_this.grid.length - 1].push(parseInt(data[i][j]));
            }
        }
        console.log('Done');

        // Kick off the rest of the program
        callback();
    });

    // Read specified grid file
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }

        console.log('Parsing file');
        // Add file data to parser, then end
        parser.write(data);
        parser.end();
    });
};

/**
 * Returns the value at a given coordinate
 * @param x the x coordinate
 * @param y the y coordinate
 * @returns A string with the value in that square
 */
Board.prototype.at = function(x, y) {
    return this.grid[y][x];
};

/**
 * Returns whether a move is valid
 * @param x the x coordinate
 * @param y the y coordinate
 * @param sq coordinates after attempted move/bash
 * @returns 0 if off map, 1 if bash off map, 2 if all valid
 */
Board.prototype.checkMove = function(x, y, sq) {
    if (0 > sq.y || sq.y >= this.grid.length) return 0;
    if (0 > sq.x || sq.x >= this.grid[sq.y].length) return 0;
    if (0 > sq.yBash || sq.yBash >= this.grid.length) return 1;
    if (0 > sq.xBash || sq.xBash >= this.grid[sq.yBash].length) return 1;
    return 2;
}

/**
 * Returns the costs for neighbors of a given coordinate
 * @param x the x coordinate
 * @param y the y coordinate
 * @param facing NSEW representing current direction
 * @returns An object representing the various movement costs
 */
Board.prototype.getNeighborCosts = function(x, y, facing) {
    var turnCost = Math.ceil(this.at(x, y) / 3);
    var bashCost = 3;
    var costs = {};

    var leftSq = {}, forwardSq = {}, rightSq = {};
    if (facing == 'N' || facing == 'S') {
        // For N and S facings, Y values don't change for left/right
        leftSq.y = y;
        rightSq.y = y;
        leftSq.yBash = y;
        rightSq.yBash = y;
        // If moving forward, X values don't change
        forwardSq.x = x;
        forwardSq.xBash = x;

        // Calculate new X values
        leftSq.x = x + (facing == 'N' ? -1 : 1);
        leftSq.xBash = x + 2 * (facing == 'N' ? -1 : 1);
        rightSq.x = x - (facing == 'N' ? -1 : 1);
        rightSq.xBash = x - 2 * (facing == 'N' ? -1 : 1);
        // Calculate new Y values
        forwardSq.y = y + (facing == 'N' ? -1 : 1);
        forwardSq.yBash = y + 2 * (facing == 'N' ? -1 : 1);
    } else if (facing == 'E' || facing == 'W') {
        // If facing E or W, X location doesn't change
        leftSq.x = x;
        rightSq.x = x;
        leftSq.xBash = x;
        rightSq.xBash = x;
        // If moving forwards, Y value does not change
        forwardSq.y = y;
        forwardSq.yBash = y;

        // Calculate new Y values
        leftSq.y = y + (facing == 'E' ? -1 : 1);
        leftSq.yBash = y + 2 * (facing == 'E' ? -1 : 1);
        rightSq.y = y - (facing == 'E' ? -1 : 1);
        rightSq.yBash = y - 2 * (facing == 'E' ? -1 : 1);
        // Calculate new X values
        forwardSq.x = x + (facing == 'W' ? -1 : 1);
        forwardSq.xBash = x + 2 * (facing == 'W' ? -1 : 1);
    }

    // Check validity of forward motion
    var forwardValid = this.checkMove(x, y, forwardSq);
    // If forward is not valid
    if (forwardValid == 0) {
        costs.forward = -1;
        costs.forwardBash = -1;
    } else {
        costs.forward = this.at(forwardSq.x, forwardSq.y);
        // If can move but not bash
        if (forwardValid == 1) {
            costs.forwardBash = -1;
        } else {
            costs.forwardBash = bashCost + this.at(forwardSq.xBash, forwardSq.yBash);
        }
    }

    // Check validity of left motion
    var leftValid = this.checkMove(x, y, leftSq);
    if (leftValid == 0) {
        costs.left = -1;
        costs.leftBash = -1;
    } else {
        costs.left = Math.ceil(turnCost + this.at(leftSq.x, leftSq.y));
        if (leftValid == 1) {
            costs.leftBash = -1;
        } else {
            costs.leftBash = Math.ceil(turnCost + bashCost + this.at(leftSq.xBash, leftSq.yBash));
        }
    }

    // Check validity of right turn
    var rightValid = this.checkMove(x, y, rightSq);
    if (rightValid == 0) {
        costs.right = -1;
        costs.rightBash = -1;
    } else {
        costs.right = Math.ceil(turnCost + this.at(rightSq.x, rightSq.y));
        if (rightValid == 1) {
            costs.rightBash = -1;
        } else {
            costs.rightBash = Math.ceil(turnCost + bashCost + this.at(rightSq.xBash, rightSq.yBash));
        }
    }

    return costs;
};

/**
 * Serializes the board to a string
 * @returns {string} The board serialized
 */
Board.prototype.toString = function() {
    s = '';
    // Iterate through grid
    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 4; x++) {
            s += board.at(x, y) + ' ';
        }   
        s += '\n';
    }
    return s;
};

module.exports = Board;
