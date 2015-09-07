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
 * Returns the costs for neighbors of a given coordinate
 * @param x the x coordinate
 * @param y the y coordinate
 * @returns An object representing the various movement costs
 */
Board.prototype.getNeighborCosts = function(x, y) {
    var turnCost = Math.ceil(this.at(x, y) / 3);
    var costs = {};
    // Calculate forward costs
    // At edge of map
    if (y == 0) {
        costs.forward = -1;
        costs.forwardBash = -1;
    } else {
        costs.forward = this.at(x, y - 1);
        // If one away from edge of map
        if (y == 1) {
            costs.forwardBash = -1;
        } else {
            costs.forwardBash = 3 + this.at(x, y - 2);
        }
    }

    // If at left edge of map
    if (x == 0) {
        costs.left = -1;
        costs.leftBash = -1;
    }
    // If almost at left edge of map
    else if (x < 2) {
        costs.left = Math.ceil(turnCost + this.at(x - 1, y));
        costs.leftBash = -1;
    } else {
        costs.left = Math.ceil(turnCost + this.at(x - 1, y));
        costs.leftBash = Math.ceil(turnCost + 3 + this.at(x - 2, y));
    }

    // If at right edge of map
    if (x == this.grid.length - 1) {
        costs.right = -1;
        costs.rightBash = -1;
    }
    // If almost at right edge of map
    else if (x > this.grid.length - 3) {
        costs.right = Math.ceil(turnCost + this.at(x + 1, y));
        costs.rightBash = -1;
    } else {
        costs.right = Math.ceil(turnCost + this.at(x + 1, y));
        costs.rightBash = Math.ceil(turnCost + 3 + this.at(x + 2, y));
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
