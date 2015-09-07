var fs = require('fs');
var parse = require('csv-parse');
fs = require('fs')


function Board() {
    this.grid = [];
}

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
                _this.grid[_this.grid.length - 1].push(data[i][j]);
            }
        }
        console.log('Done');

        // Execute callback
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

Board.prototype.at = function(x, y) {
    return this.grid[y][x];
}

Board.prototype.getNeighborCosts = function(x, y) {
};

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
}

module.exports = Board
