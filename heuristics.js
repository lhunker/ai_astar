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

// Heuristic 2, Dan


/**
 * Heuristic 3 returns the maximum of the horizontal and vertical distance
 * @param square Object containing coordinates of current square
 * @param goal Object with goal coordinates
 * @returns Maximum of vertical/horizontal distance to goal
 */
function maxDistance(square, goal) {
    var horizDiff = Math.abs(goal.x - square.x);
    var vertDiff = Math.abs(goal.y - square.y);
    return Math.max(horizDiff, vertDiff);
}

/**
 * Returns the sum of ther vertical and horizontal differences
 * @param location the current location to check from
 * @param goal the location of the goal
 * @returns {number} the heuristic cost
 */
function h4(location, goal) {

    var horizDiff = Math.abs(goal.x - location.x);
    var vertDiff = Math.abs(goal.y - location.y);
    return horizDiff + vertDiff;
}

// Heuristic 5, Dan

// Heuristic 6, Brett

//TODO Replace h1 with your function when added
module.exports = [h1, h1, maxDistance, h4, h1, h1];