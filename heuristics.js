/*
 heuristics.js
 contains the heuristic functions that can be selected
 */

/**
 * Heuristic 1 - simply returns 0
 * @returns {number}
 */
function h1() {
    return 0;
}

/**
 * Heuristic 2 returns the minimum of the horizontal and vertical distance to goal
 * @param square Object containing coordinates of current square
 * @param goal Object with goal coordinates
 * @returns number Minimum of vertical/horizontal distance to goal
 */
function minDistance(square, goal) {
    var horizDiff = Math.abs(goal.x - square.x);
    var vertDiff = Math.abs(goal.y - square.y);
    return Math.min(horizDiff, vertDiff);
}


/**
 * Heuristic 3 returns the maximum of the horizontal and vertical distance
 * @param square Object containing coordinates of current square
 * @param goal Object with goal coordinates
 * @returns number Maximum of vertical/horizontal distance to goal
 */
function maxDistance(square, goal) {
    var horizDiff = Math.abs(goal.x - square.x);
    var vertDiff = Math.abs(goal.y - square.y);
    return Math.max(horizDiff, vertDiff);
}

/**
 * Returns the sum of the vertical and horizontal differences
 * @param location the current location to check from
 * @param goal the location of the goal
 * @returns {number} the heuristic cost
 */
function h4(location, goal) {

    var horizDiff = Math.abs(goal.x - location.x);
    var vertDiff = Math.abs(goal.y - location.y);
    return horizDiff + vertDiff;
}

/**
 * Heuristic 5 returns the sum of the vertical and horizontal distances to the
 * goal plus the cost of one turn, being the minimum requirement for the agent
 * to move vertically and horizontally.
 * @param square Object containing the coordinates of the current square
 * @param goal Object containing the coordinates of the goal
 * @returns number The estimated cost of the path according to the heuristic
 */
function h5(square, goal, direction) {

    var horizDiff = Math.abs(goal.x - square.x);
    var vertDiff = Math.abs(goal.y - square.y);
    var turns = 0;
    if (goal.x < square.x) {
        if (goal.y < square.y) {
            if (direction === 'N' || direction === 'W') {
                turns += 1;
            }
            else {
                turns += 2;
            }
        }
    }
    else if (goal.x > square.x) {
        if (goal.y < square.y) {
            if (direction === 'N' || direction === 'E') {
                turns += 1;
            }
            else {
                turns += 2;
            }
        }
    }
    else if (goal.x < square.x) {
        if (goal.y > square.y) {
            if (direction === 'S' || direction === 'W') {
                turns += 1;
            }
            else {
                turns += 2;
            }
        }
    }
    else if (goal.x > square.x) {
        if (goal.y > square.y) {
            if (direction === 'S' || direction === 'E') {
                turns += 1;
            }
            else {
                turns += 2;
            }
        }
    }
    else if ((goal.x < square.x && direction === 'E') || (goal.x > square.x && direction === 'W') || (goal.y < square.y && direction === 'S') || (goal.y > square.y && direction === 'N')) {
        turns += 2;
    }
    else if ((goal.x < square.x && direction === 'W') || (goal.x > square.x && direction === 'E') || (goal.y < square.y && direction === 'N') || (goal.y > square.y && direction === 'S')) {
        turns += 0;
    }
    else {
        turns += 1;
    }
    return horizDiff + vertDiff + turns;
}

/**
 * Heuristic 6 - h5 multiplied by 3
 * @param square the square
 * @param goal the goal
 * @returns {number}
 */
function h6(square, goal) {
    return 3 * h5(square, goal);
}

module.exports = [h1, minDistance, maxDistance, h4, h5, h6];