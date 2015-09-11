var fs = require('fs');

function generateBoard(){

    // variables for width and height of the board
    var width = 4;
    var height = 4;

    // variables for iterating through rows and columns
    var i;
    var j;

    // variable to hold the string that is the board
    var boardString = '';

    // variable to hold a given specific entry in the board
    var entry;

    // variables to hold whether or not the board has a start and goal yet
    var hasGoal = false;
    var hasStart = false;

    // the position in the row for goal and start (I decided, at least for now,
    // that the start should be on the bottom row and the start should be on
    // the top row)
    var goalLocation = randomNumber(0, width-1);
    var startLocation = randomNumber(0, width-1);

    // for each row
    for (i = 0; i < height; i++){

        // for each column
        for (j = 0; j < width; j++) {

            // if we're on the top row
            if (i === 0) {
                // and we don't have a goal yet
                if (!hasGoal) {
                    // and we're on the space where goal has been designated to go
                    if (j === goalLocation) {
                        // if this is the first entry in the row
                        if (j === 0) {
                            // just add 'G' for the goal space
                            boardString = boardString + 'G';
                        }
                        // for any other place in the row
                        else {
                            // add a tab character to separate entries, then 'G' for goal
                            boardString = boardString + '\t' + 'G';
                        }

                        // set hasGoal to true and move on to the next entry
                        hasGoal = true;
                        j++;
                    }
                }
            }

            // if we're on the bottom row
            if (i === height - 1) {
                // and we don't have a start yet
                if(!hasStart){
                    // and we're on the space where start has been designated to go
                    if (j === startLocation) {
                        // if this is the first entry in the row
                        if (j === 0) {
                            // just add 'S' for the start space
                            boardString = boardString + 'S';
                        }
                        // for any other place in the row
                        else {
                            // add a tab character to separate entries, then 'S' for start
                            boardString = boardString + '\t' + 'S';
                        }

                        // set hasStart to true and move on to the next entry
                        hasStart = true;
                        j++;
                    }
                }
            }

            // checker added since we're skipping entries for start and goal; there
            // is potential that goal or start lands on the last entry in a row, and
            // if we don't check this, then we'll have entries outside the board. Which
            // is bad.
            if (j < width) {

                // set a random value between 1 and 9 as the value for the current entry
                entry = randomNumber(1, 9);

                // if this is the first entry in the row
                if (j === 0) {
                    // just add the entry value
                    boardString = boardString + entry;
                }
                // for any other place in the row
                else {
                    // add a tab character to separate entries, then the entry value
                    boardString = boardString + '\t' + entry;
                }
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

function makeBoardFile(){
    var boardString = generateBoard();
    fs.writeFile('grid.txt', boardString, function (err) {
        if(err){
            return console.log(err);
        }
        console.log('File grid.txt was saved!');
    });
}

//Actual script
makeBoardFile();