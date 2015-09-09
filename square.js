/**
 * Created by lhunker on 9/7/15.
 * square.js
 * A class to hold the frontier nodes
 */

/**
 * Class to represent a frontier node
 * @param location The coordinate of the node expressed as {x, y}
 * @param cost The cost to get to this square
 * @param path the path taken to get here (as a string)
 * @param direction The direction the agent is facing as a string (N, S, E, W)
 * @constructor
 */
function Square(location, cost, path, direction) {
    this.location = location;
    this.cost = cost;
    this.path = path;
    this.direction = direction;
    this.totcost = 0;

}

/**
 * @param board the board to find neighbors on
 * @param heuristic a function that takes a location, and goal and returns the heuristic cost
 * @returns [square] and array of squares for the expanded nodes
 */
Square.prototype.expand = function (board, heuristic) {
    var _this = this;
    var neighbors = board.getNeighbors(this.location.x, this.location.y, this.path, this.direction);

    //Calculate cost
    neighbors.forEach(function (n) {
        var h = heuristic(n.location, board.getGoal());
        n.cost = n.cost + _this.cost;
        n.totcost = h + n.cost;
    });

    return neighbors;
};

/**
 * Returns the square's location
 * @returns {x, y} the x, y coordinates of the node
 */
Square.prototype.getLocation = function () {
    return this.location;
};

/**
 * Gets the cost of the node
 * @returns The cost of the node as a number
 */
Square.prototype.getCost = function () {
    return this.totcost;
};

module.exports = Square;
