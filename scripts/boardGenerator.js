function generateBoard(){

    // variables for width and height of the board
    var width = Math.random();
    var height = Math.random();

    // variables for iterating through rows and columns
    var i;
    var j;

    // variable to hold the string that is the board
    var boardString = "";

    // variable to hold a given specific entry in the board
    var entry;

    // variables to hold whether or not the board has a start and goal yet
    var hasGoal = false;
    var hasStart = false;

    // the position in the row for goal and start (I decided, at least for now,
    // that the start should be on the bottom row and the start should be on
    // the top row)
    var goalLocation = Math.random()%width;
    var startLocation = Math.random()%width;

    // for each row
    for (i = 0; i < height; i++){

        // for each column
        for (j = 0; j < width; j++) {

            // if we're on the top row
            if (i == 0) {
                // and we don't have a goal yet
                if (!hasGoal) {
                    // and we're on the space where goal has been designated to go
                    if (j == goalLocation) {
                        // if this is the first entry in the row
                        if (j == 0) {
                            // just add "G" for the goal space
                            boardString.concat("G");
                        }
                        // for any other place in the row
                        else {
                            // add a tab character to separate entries, then "G" for goal
                            boardString.concat("\t" + "G");
                        }

                        // set hasGoal to true and move on to the next entry
                        hasGoal = true;
                        j++;
                    }
                }
            }

            // if we're on the bottom row
            if(i == height - 1){
                // and we don't have a start yet
                if(!hasStart){
                    // and we're on the space where start has been designated to go
                    if(j == startLocation){
                        // if this is the first entry in the row
                        if(j == 0){
                            // just add "S" for the start space
                            boardString.concat("S");
                        }
                        // for any other place in the row
                        else {
                            // add a tab character to separate entries, then "S" for start
                            boardString.concat("\t" + "S");
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
                entry = ((Math.random()) % 9) + 1;

                // if this is the first entry in the row
                if (j == 0) {
                    // just add the entry value
                    boardString.concat(entry);
                }
                // for any other place in the row
                else {
                    // add a tab character to separate entries, then the entry value
                    boardString.concat("\t" + entry);
                }
            }
        }
        // for every row except the last one
        if(i < height - 1){
            // add a newline character at the end to start a new row
            boardString.concat("\n");
        }
    }

    return boardString;
}

function makeBoardFile(){
    var fs = require('fs');
    fs.writeFile("", generateBoard(), function(err){
        if(err){
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}