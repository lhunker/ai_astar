var fs = require('fs');

function generateBoard(width, height) {

    // variables for iterating through rows and columns
    var i;
    var j;

    // variable to hold the string that is the board
    var boardString = '';

    // variable to hold a given specific entry in the board
    var entry;

    // the position in the row for goal and start (I decided, at least for now,
    // that the start should be on the bottom row and the start should be on
    // the top row)
    var goalXLocation = randomNumber(0, width-1);
    console.log(goalXLocation);
    var goalYLocation = randomNumber(0, height-1);
    console.log(goalYLocation);
    var startXLocation = randomNumber(0, width-1);
    console.log(startXLocation);
    var startYLocation = randomNumber(0, height-1);
    console.log(startYLocation);

    // for each row
    for (i = 0; i < height; i++){

        // for each column
        for (j = 0; j < width; j++) {

            if (i === goalYLocation && j === goalXLocation) {
                boardString = boardString + 'G';
            }

            else if (i === startYLocation && j === startXLocation) {
                boardString = boardString + 'S';
            }

            else {
                // set a random value between 1 and 9 as the value for the current entry
                entry = randomNumber(1, 9);
                boardString = boardString + entry;
            }

            if (j < width - 1) {
                boardString = boardString + '\t';
            }
        }
        // for every row except the last one
        if(i < height - 1){
            // add a newline character at the end to start a new row
            boardString = boardString + '\n';
        }
    }

    return boardString;
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeBoardFile(width, height, file) {
    var boardString = generateBoard(width, height);
    fs.writeFile(file, boardString, function (err) {
        if(err){
            return console.log(err);
        }
        console.log('File grid.txt was saved!');
    });
}

//Actual script
if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
    console.error('Enter dimensions you idiot');
    process.exit(1);
}
makeBoardFile(process.argv[2], process.argv[3], process.argv[4]);