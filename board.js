var fs = require('fs');
var parse = require('csv-parse');
var Square = require('./square');
fs = require('fs');


function Board() {
    this.grid = [];
    this.start = {};
    this.goal = {};
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
        var record;
        while ((record = parser.read())) {
            data.push(record);
        }
    });

    // Log errors
    parser.on('error', function(err) {
        console.error(err.message);
    });

    // On finish, parse each line
    parser.on('finish', function() {
        for (var i = 0; i < data.length; i++) {
            // Add empty array
            _this.grid.push([]);
            // For each entry in line
            for (var j = 0; j < data[i].length; j++) {
                // Set value in grid
                if (data[i][j] === 'G') {
                    _this.goal = {x: j, y: i};
                    _this.grid[_this.grid.length - 1].push(1);
                } else if (data[i][j] === 'S') {
                    _this.start = {x: j, y: i};
                    _this.grid[_this.grid.length - 1].push(1);
                } else {
                    _this.grid[_this.grid.length - 1].push(parseInt(data[i][j]));
                }

            }
        }

        // Kick off the rest of the program
        callback();
    });

    // Read specified grid file
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.error('Error opening board - ' + err);
            process.exit(2);
        }

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
 * gets the starting position on the board
 * @returns {{}|*} the x,y coordinates of the start
 */
Board.prototype.getStart = function () {
    return this.start;
};

/**
 * Checks whether a given square is the goal
 * @param loc the location to check
 * @returns true if the location is the goal, false otherwise
 */
Board.prototype.isGoal = function (loc) {
    return (loc.x === this.goal.x && loc.y === this.goal.y) || !this.isOnBoard(loc);
};

/**
 * Getter for goal
 * @returns {*} the gol location
 */
Board.prototype.getGoal = function () {
    return this.goal;
};

/**
 * Returns whether a square is inside the grid
 * @param loc Object with x and y coordinates
 * @Returns boolean true if on map
 */
Board.prototype.isOnBoard = function(loc) {
    if (0 > loc.y || loc.y >= this.grid.length) return false;
    return !(0 > loc.x || loc.x >= this.grid[loc.y].length);

};

/**
 * Returns whether a move is valid
 * @param x the x coordinate
 * @param y the y coordinate
 * @param sq coordinates after attempted move/bash
 * @returns number if off map, 1 if bash off map, 2 if all valid
 */
Board.prototype.checkMove = function(x, y, sq) {
    if (!this.isOnBoard(sq)) return 0;
    if (!this.isOnBoard({'x': sq.xBash, 'y': sq.yBash})) return 1;
    return 2;
};


/**
 * Calculates relative directions
 * @param dir Current direction as NSEW
 * @returns An object with relative directions for heading
 */
Board.prototype.changeDirection = function(dir) {
    var dirs = {'forward': dir};
    switch(dir) {
        case 'N':
            dirs.left = 'W';
            dirs.right = 'E';
            break;
        case 'S':
            dirs.left = 'E';
            dirs.right = 'W';
            break;
        case 'E':
            dirs.left = 'N';
            dirs.right = 'S';
            break;
        case 'W':
            dirs.left = 'S';
            dirs.right = 'N';
            break;
    }

    return dirs;
};

/**
 * Returns the costs for neighbors of a given coordinate
 * @param x the x coordinate
 * @param y the y coordinate
 * @param path Current path as a string
 * @param facing NSEW representing current direction
 * @returns {*} object containing squares for each possible movement from this square
 */
Board.prototype.getNeighbors = function(x, y, path, facing) {
    var turnCost = Math.ceil(this.at(x, y) / 3);
    var bashCost = 3;
    var costs = {};

    // Determine new direction for a given facing/move
    var dirs = this.changeDirection(facing);

    var leftSq = {}, forwardSq = {}, rightSq = {};
    // Set coordinates for every possible move
    if (facing === 'N' || facing === 'S') {
        // For N and S facings, Y values don't change for left/right
        leftSq.y = y;
        rightSq.y = y;
        leftSq.yBash = y;
        rightSq.yBash = y;
        // If moving forward, X values don't change
        forwardSq.x = x;
        forwardSq.xBash = x;

        // Calculate new X values
        leftSq.x = x + (facing === 'N' ? -1 : 1);
        leftSq.xBash = x + 2 * (facing === 'N' ? -1 : 1);
        rightSq.x = x - (facing === 'N' ? -1 : 1);
        rightSq.xBash = x - 2 * (facing === 'N' ? -1 : 1);
        // Calculate new Y values
        forwardSq.y = y + (facing === 'N' ? -1 : 1);
        forwardSq.yBash = y + 2 * (facing === 'N' ? -1 : 1);
    } else if (facing === 'E' || facing === 'W') {
        // If facing E or W, X location doesn't change
        leftSq.x = x;
        rightSq.x = x;
        leftSq.xBash = x;
        rightSq.xBash = x;
        // If moving forwards, Y value does not change
        forwardSq.y = y;
        forwardSq.yBash = y;

        // Calculate new Y values
        leftSq.y = y + (facing === 'E' ? -1 : 1);
        leftSq.yBash = y + 2 * (facing === 'E' ? -1 : 1);
        rightSq.y = y - (facing === 'E' ? -1 : 1);
        rightSq.yBash = y - 2 * (facing === 'E' ? -1 : 1);
        // Calculate new X values
        forwardSq.x = x + (facing === 'W' ? -1 : 1);
        forwardSq.xBash = x + 2 * (facing === 'W' ? -1 : 1);
    }

    // Check validity of forward motion
    var forwardValid = this.checkMove(x, y, forwardSq);
    // If forward is not valid
    if (forwardValid === 0) {
        costs.forward = 200;
        costs.forwardBash = -1;
    } else {
        costs.forward = this.at(forwardSq.x, forwardSq.y);
        // If can move but not bash
        if (forwardValid === 1) {
            costs.forwardBash = 203;
        } else {
            costs.forwardBash = bashCost + this.at(forwardSq.xBash, forwardSq.yBash);
        }
    }

    // Check validity of left motion
    var leftValid = this.checkMove(x, y, leftSq);
    if (leftValid === 0) {
        costs.left = 200;
        costs.leftBash = -1;
    } else {
        costs.left = Math.ceil(turnCost + this.at(leftSq.x, leftSq.y));
        if (leftValid === 1) {
            costs.leftBash = 203;
        } else {
            costs.leftBash = Math.ceil(turnCost + bashCost + this.at(leftSq.xBash, leftSq.yBash));
        }
    }

    // Check validity of right turn
    var rightValid = this.checkMove(x, y, rightSq);
    if (rightValid === 0) {
        costs.right = 200;
        costs.rightBash = -1;
    } else {
        costs.right = Math.ceil(turnCost + this.at(rightSq.x, rightSq.y));
        if (rightValid === 1) {
            costs.rightBash = 203;
        } else {
            costs.rightBash = Math.ceil(turnCost + bashCost + this.at(rightSq.xBash, rightSq.yBash));
        }
    }

    costs.back = -1;
    costs.backBash = -1;
    // If starting at top of board facing north
    if (this.start.x === x && this.start.y === y && facing === 'N') {
        if (this.isOnBoard({x: x, y: y + 1})) {
            costs.back = turnCost * 2 + this.at(x, y + 1);
        } else {
            costs.back = turnCost * 2 + 200;
        }

        if (this.isOnBoard({x: x, y: y + 2})) {
            costs.backBash = turnCost * 2 + bashCost + this.at(x, y + 2);
        } else {
            costs.backBash = turnCost * 2 + bashCost + 200;
        }
    }

    // Create object containing new squares
    var squares = [];
    if (costs.left > 0)
        squares.push(new Square({x: leftSq.x, y: leftSq.y}, costs.left, path + ', Turn left, Forward', dirs.left, 2));
    if (costs.leftBash > 0)
        squares.push(new Square({x: leftSq.xBash, y: leftSq.yBash}, costs.leftBash, path +
            ', Turn left, Bash, Forward', dirs.left, 3));
    if (costs.right > 0)
        squares.push(new Square({x: rightSq.x, y: rightSq.y}, costs.right, path +
            ', Turn right, Forward', dirs.right, 2));
    if (costs.rightBash > 0)
        squares.push(new Square({x: rightSq.xBash, y: rightSq.yBash}, costs.rightBash, path +
            ', Turn Right, Bash, Forward ', dirs.right, 3));
    if (costs.forward > 0)
        squares.push(new Square({x: forwardSq.x, y: forwardSq.y}, costs.forward, path + ', Forward', dirs.forward, 1));
    if (costs.forwardBash > 0)
        squares.push(new Square({x: forwardSq.xBash, y: forwardSq.yBash}, costs.forwardBash, path +
            ', Bash, Forward', dirs.forward, 2));
    if (costs.back > 0) {
        squares.push(new Square({x: x, y: y + 1}, costs.back, path + ', Turn right, Turn right, Forward', 'S', 3));
        squares.push(new Square({x: x, y: y + 2}, costs.backBash, path + ', Turn right, Turn right, Bash, Forward', 'S', 4));
    }

    return squares;
};

/**
 * Serializes the board to a string
 * @returns {string} The board serialized
 */
Board.prototype.toString = function() {
    var s = '';
    // Iterate through grid
    for (var y = 0; y < this.grid.length; y++) {
        for (var x = 0; x < this.grid[y].length; x++) {
            s += this.at(x, y) + ' ';
        }   
        s += '\n';
    }
    return s;
};

module.exports = Board;
